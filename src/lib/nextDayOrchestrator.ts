import { useFuturesStore } from '../store/futuresStore';
import { useDisplayPriceStore } from '../store/displayPriceStore';
import { runTween } from './tweenAnimation';

const ANIMATION_DURATION_MS = 1800;

/**
 * Orchestrates a Next-Day transition with a visual tween animation.
 *
 * Flow:
 *  1. Snapshot current prices (fromPrices).
 *  2. Commit the day transition via `futuresStore.nextDay()` — game logic runs
 *     synchronously (liquidations, funding, history all settled on committed
 *     `stocks[sym].price`).
 *  3. Snapshot the new committed prices (toPrices).
 *  4. Seed `displayPriceStore` with fromPrices and mark `isAnimating = true`.
 *  5. Run the rAF tween from -> to, writing to `displayPriceStore.prices` each
 *     frame. The UI reads these via `useDisplayPrice(sym)`.
 *  6. When the tween resolves (or the game was already over), `reset()` clears
 *     display prices. Components then fall back to committed prices naturally.
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

  // Stable seed for deterministic noise per day.
  const tweenSeed = futures.prngState + futures.currentDay * 997;

  // 2. Commit game transition.
  futures.nextDay();

  // 3. Snapshot post-commit prices.
  const futuresAfter = useFuturesStore.getState();
  const toPrices: Record<string, number> = {};
  for (const sym of Object.keys(futuresAfter.stocks)) {
    toPrices[sym] = futuresAfter.stocks[sym].price;
  }

  // 4. Seed display store and begin animation.
  const display = useDisplayPriceStore.getState();
  display.setPrices(fromPrices);
  display.setAnimating(true);

  // 5. Run tween. Always cleanup via reset() in `finally`.
  try {
    await runTween({
      from: fromPrices,
      to: toPrices,
      durationMs: ANIMATION_DURATION_MS,
      seed: tweenSeed,
      onFrame: (prices) => {
        useDisplayPriceStore.getState().setPrices(prices);
      },
    });
  } finally {
    // 6. Clear display prices so UI falls back to committed values.
    useDisplayPriceStore.getState().reset();
  }
}
