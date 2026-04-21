import { mulberry32 } from './prng';
import type { TickPath } from './simulateTickPath';

export interface TweenOptions {
  from: Record<string, number>;
  to: Record<string, number>;
  durationMs: number;
  /** Seed for deterministic micro-noise (mulberry32). */
  seed: number;
  /**
   * Invoked each frame with the current displayed prices.
   *
   * When `precomputedPath` is supplied, also receives the discrete `frameIdx`
   * and `totalFrames` so callers can drive path-indexed side effects (e.g.
   * Phase 2 path-crossing liquidation). These args are present on every call
   * — callers that only need the prices map can ignore the trailing args.
   */
  onFrame: (prices: Record<string, number>, frameIdx: number, totalFrames: number) => void;
  /** Optional abort signal. When aborted the tween resolves without extra frames. */
  signal?: AbortSignal;
  /** Peak micro-noise amplitude (fraction). Default ±0.3%. Decays to 0 at t=1. */
  noiseAmp?: number;
  /**
   * Optional precomputed tick path (Phase 2). When supplied, the tween plays
   * back the stored `pricesBySymbol` at each rAF frame — no internal noise is
   * generated, `seed` / `noiseAmp` are ignored. Using a precomputed path is
   * required when path-crossing liquidation detection runs against the same
   * trajectory the user sees on screen.
   */
  precomputedPath?: TickPath;
}

/**
 * Runs a deterministic ease-out-cubic tween for a set of symbol prices.
 *
 * Behaviour:
 *  - Uses `requestAnimationFrame` + `performance.now()` for scheduling.
 *  - Resolves immediately (with a single `onFrame(to, frames, frames)`) when the
 *    user has `prefers-reduced-motion: reduce` set.
 *  - If the tab is hidden, rAF naturally pauses; a `visibilitychange` listener
 *    snaps straight to the `to` frame on return (the elapsed-time branch at the
 *    top of the loop is the actual terminator so no extra code is needed).
 *  - When `precomputedPath` is provided the tween reads frame index from the
 *    elapsed time and emits `pricesBySymbol[sym][frameIdx]` verbatim. `onFrame`
 *    is only fired when the frame index changes (deduplicated) to avoid
 *    redundant React work.
 *  - Otherwise, micro-noise is seeded via `mulberry32(seed)` (NEVER
 *    `Math.random`), applied uniformly across symbols and attenuated linearly
 *    by `(1 - t)`.
 */
export function runTween(opts: TweenOptions): Promise<void> {
  const { from, to, durationMs, seed, onFrame, signal, noiseAmp = 0.003, precomputedPath } = opts;

  return new Promise<void>((resolve) => {
    if (signal?.aborted) {
      resolve();
      return;
    }

    const totalFrames = precomputedPath ? precomputedPath.frames : 0;

    // prefers-reduced-motion: skip the animation entirely.
    if (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      onFrame({ ...to }, totalFrames, totalFrames);
      resolve();
      return;
    }

    // SSR / non-browser guard.
    if (typeof window === 'undefined' || typeof window.requestAnimationFrame !== 'function') {
      onFrame({ ...to }, totalFrames, totalFrames);
      resolve();
      return;
    }

    const symbols = Object.keys(to);
    const startTime = performance.now();
    let rafId = 0;
    let finished = false;
    let lastEmittedFrameIdx = -1;

    const finish = () => {
      if (finished) return;
      finished = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (signal && abortHandler) signal.removeEventListener('abort', abortHandler);
      if (visibilityHandler) document.removeEventListener('visibilitychange', visibilityHandler);
      resolve();
    };

    const abortHandler = signal
      ? () => {
          finish();
        }
      : null;
    if (signal && abortHandler) signal.addEventListener('abort', abortHandler);

    // On tab return, jump to final frame if we're already past duration.
    const visibilityHandler = () => {
      if (!document.hidden) {
        const elapsed = performance.now() - startTime;
        if (elapsed >= durationMs) {
          onFrame({ ...to }, totalFrames, totalFrames);
          finish();
        }
      }
    };
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', visibilityHandler);
    }

    // ── Precomputed path branch ────────────────────────────────────────────
    if (precomputedPath) {
      const path = precomputedPath;
      const stepPath = () => {
        if (finished) return;
        const elapsed = performance.now() - startTime;
        const t = Math.min(1, elapsed / Math.max(1, durationMs));
        const rawIdx = Math.floor(t * path.frames);
        const frameIdx = Math.min(path.frames, rawIdx);

        if (frameIdx !== lastEmittedFrameIdx) {
          const frame: Record<string, number> = {};
          for (const sym of symbols) {
            const series = path.pricesBySymbol[sym];
            if (series) {
              frame[sym] = series[frameIdx] ?? to[sym];
            } else {
              frame[sym] = to[sym];
            }
          }
          onFrame(frame, frameIdx, path.frames);
          lastEmittedFrameIdx = frameIdx;
        }

        if (t >= 1) {
          // Ensure the exact `to` is the final emitted snapshot.
          if (lastEmittedFrameIdx !== path.frames) {
            onFrame({ ...to }, path.frames, path.frames);
          }
          finish();
          return;
        }
        rafId = requestAnimationFrame(stepPath);
      };
      rafId = requestAnimationFrame(stepPath);
      return;
    }

    // ── Legacy (Phase 1) noise-on-the-fly branch ───────────────────────────
    const rng = mulberry32(seed);
    const step = () => {
      if (finished) return;
      const elapsed = performance.now() - startTime;
      const t = Math.min(1, elapsed / Math.max(1, durationMs));
      const eased = 1 - Math.pow(1 - t, 3);
      const noiseFactor = (rng() - 0.5) * 2 * noiseAmp * (1 - t);

      const frame: Record<string, number> = {};
      for (const sym of symbols) {
        const fromVal = from[sym] ?? to[sym];
        const toVal = to[sym];
        const interp = fromVal + (toVal - fromVal) * eased;
        frame[sym] = interp * (1 + noiseFactor);
      }
      onFrame(frame, 0, 0);

      if (t >= 1) {
        // Snap to exact target at the end so rounding/noise doesn't leave residue.
        onFrame({ ...to }, 0, 0);
        finish();
        return;
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
  });
}
