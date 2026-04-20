import { useFuturesStore, computeNextDayPrices } from '../store/futuresStore';
import { useDisplayPriceStore } from '../store/displayPriceStore';
import { runTween } from './tweenAnimation';
import { simulateTickPath, type TickPath } from './simulateTickPath';
import type { FuturesPosition } from '../types';

const ANIMATION_DURATION_MS = 1800;
const TICK_FRAMES = 60;
const TICK_NOISE_AMP = 0.004;

interface PathCrossing {
  posId: string;
  frameIdx: number;
  crossPrice: number;
}

/**
 * Scan a precomputed tick path for positions whose trajectory crosses their
 * liquidationPrice. Returns a list sorted by ascending `frameIdx` so the
 * orchestrator can fire liquidations in order as the animation progresses.
 *
 * Long positions liquidate on the first frame where `price <= liquidationPrice`.
 * Short positions on the first frame where `price >= liquidationPrice`.
 */
export function detectCrossings(
  path: TickPath,
  positions: Record<string, FuturesPosition>,
): PathCrossing[] {
  const crossings: PathCrossing[] = [];

  for (const pos of Object.values(positions)) {
    if (pos.isLiquidated) continue;
    const series = path.pricesBySymbol[pos.symbol];
    if (!series) continue;

    // Cheap reject via path extrema before the per-frame scan.
    if (pos.direction === 'long') {
      if (path.minBySymbol[pos.symbol] > pos.liquidationPrice) continue;
    } else {
      if (path.maxBySymbol[pos.symbol] < pos.liquidationPrice) continue;
    }

    for (let i = 0; i <= path.frames; i++) {
      const price = series[i];
      const crossed = pos.direction === 'long'
        ? price <= pos.liquidationPrice
        : price >= pos.liquidationPrice;
      if (crossed) {
        crossings.push({ posId: pos.id, frameIdx: i, crossPrice: price });
        break;
      }
    }
  }

  crossings.sort((a, b) => a.frameIdx - b.frameIdx);
  return crossings;
}

/**
 * Orchestrates a Next-Day transition with a visual tween animation.
 *
 * Phase 2 flow (path-crossing liquidation):
 *  1. Snapshot committed `fromPrices`.
 *  2. Preview `targetPrices` via the pure `computeNextDayPrices` helper — no
 *     mutation yet, identical rng order to what `nextDay()` will ultimately use.
 *  3. `simulateTickPath(from, targetPrices, seed)` → deterministic trajectory.
 *  4. `detectCrossings(path, openPositions)` → ordered liquidation queue.
 *  5. Seed `displayPriceStore`, begin animation.
 *  6. Per rAF frame: push display prices; fire any queued crossings whose
 *     `frameIdx` has been reached. Each crossing calls
 *     `liquidateByPathCrossing` so the position PnL locks at its liquidation
 *     price (mirroring close-price liquidation semantics).
 *  7. After the tween completes, call `nextDay()`. Any survivors are subject
 *     to the existing close-price liquidation / funding pass — path-liquidated
 *     positions have already been removed, so legacy behaviour is preserved
 *     for positions that never crossed.
 *  8. `reset()` clears display prices; UI falls back to committed values.
 *
 * This function is fire-and-forget from the caller's perspective. Callers must
 * prevent re-entry for the same day (e.g. disable the Next-Day button while
 * `useIsAnimatingPrices()` is true).
 */
export async function runNextDayAnimated(): Promise<void> {
  const futures = useFuturesStore.getState();
  if (futures.gamePhase !== 'playing') return;

  // 1. Snapshot committed prices.
  const fromPrices: Record<string, number> = {};
  for (const sym of Object.keys(futures.stocks)) {
    fromPrices[sym] = futures.stocks[sym].price;
  }

  // 2. Preview the post-nextDay target prices WITHOUT mutating the store.
  //    computeNextDayPrices uses the same seed/rng order as nextDay() so the
  //    eventual committed prices will match `targetPrices` exactly.
  const { targetPrices } = computeNextDayPrices(
    futures.stocks,
    futures.allNews,
    futures.currentDay,
    futures.prngState,
  );

  // Stable seed for deterministic noise per day.
  const tweenSeed = futures.prngState + futures.currentDay * 997;

  // 3. Generate tick path.
  const path = simulateTickPath({
    from: fromPrices,
    to: targetPrices,
    frames: TICK_FRAMES,
    seed: tweenSeed,
    noiseAmp: TICK_NOISE_AMP,
  });

  // 4. Path-crossing liquidation queue.
  const crossings = detectCrossings(path, futures.positions);
  let nextCrossingIdx = 0;

  // 5. Seed display store and begin animation.
  const display = useDisplayPriceStore.getState();
  display.setPrices(fromPrices);
  display.setAnimating(true);

  // Reset the per-turn liquidation log so path-crossing entries accumulate
  // from a clean slate. nextDay() will append its close-price liquidations
  // via the mergePreExisting branch inside the store action.
  useFuturesStore.setState((draft) => {
    draft.liquidatedThisTurn = [];
  });

  // 6. Run tween driven by the precomputed path. Fire crossings in order.
  try {
    await runTween({
      from: fromPrices,
      to: targetPrices,
      durationMs: ANIMATION_DURATION_MS,
      seed: tweenSeed,
      precomputedPath: path,
      onFrame: (prices, frameIdx) => {
        useDisplayPriceStore.getState().setPrices(prices);

        while (
          nextCrossingIdx < crossings.length &&
          crossings[nextCrossingIdx].frameIdx <= frameIdx
        ) {
          const c = crossings[nextCrossingIdx];
          useFuturesStore.getState().liquidateByPathCrossing(c.posId, c.crossPrice);
          nextCrossingIdx += 1;
        }
      },
    });

    // Flush any crossings the rAF loop never reached (e.g. tween aborted early
    // but game should still honour deterministic liquidation semantics).
    while (nextCrossingIdx < crossings.length) {
      const c = crossings[nextCrossingIdx];
      useFuturesStore.getState().liquidateByPathCrossing(c.posId, c.crossPrice);
      nextCrossingIdx += 1;
    }

    // 7. Commit the day. Survivors face close-price liquidation / funding.
    useFuturesStore.getState().nextDay();
  } finally {
    // 8. Clear display prices so UI falls back to committed values.
    useDisplayPriceStore.getState().reset();
  }
}
