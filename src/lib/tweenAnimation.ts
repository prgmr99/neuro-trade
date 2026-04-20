import { mulberry32 } from './prng';

export interface TweenOptions {
  from: Record<string, number>;
  to: Record<string, number>;
  durationMs: number;
  /** Seed for deterministic micro-noise (mulberry32). */
  seed: number;
  onFrame: (prices: Record<string, number>) => void;
  /** Optional abort signal. When aborted the tween resolves without extra frames. */
  signal?: AbortSignal;
  /** Peak micro-noise amplitude (fraction). Default ±0.3%. Decays to 0 at t=1. */
  noiseAmp?: number;
}

/**
 * Runs a deterministic ease-out-cubic tween for a set of symbol prices.
 *
 * Behaviour:
 *  - Uses `requestAnimationFrame` + `performance.now()` for scheduling.
 *  - Resolves immediately (with a single `onFrame(to)`) when the user has
 *    `prefers-reduced-motion: reduce` set.
 *  - If the tab is hidden, rAF naturally pauses; a `visibilitychange` listener
 *    snaps straight to the `to` frame on return (the elapsed-time branch at the
 *    top of the loop is the actual terminator so no extra code is needed).
 *  - Micro-noise is seeded via `mulberry32(seed)` (NEVER `Math.random`), applied
 *    uniformly across symbols for Phase 1 and attenuated linearly by `(1 - t)`.
 */
export function runTween(opts: TweenOptions): Promise<void> {
  const { from, to, durationMs, seed, onFrame, signal, noiseAmp = 0.003 } = opts;

  return new Promise<void>((resolve) => {
    if (signal?.aborted) {
      resolve();
      return;
    }

    // prefers-reduced-motion: skip the animation entirely.
    if (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      onFrame({ ...to });
      resolve();
      return;
    }

    // SSR / non-browser guard.
    if (typeof window === 'undefined' || typeof window.requestAnimationFrame !== 'function') {
      onFrame({ ...to });
      resolve();
      return;
    }

    const symbols = Object.keys(to);
    const rng = mulberry32(seed);
    const startTime = performance.now();
    let rafId = 0;
    let finished = false;

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
          onFrame({ ...to });
          finish();
        }
      }
    };
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', visibilityHandler);
    }

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
      onFrame(frame);

      if (t >= 1) {
        // Snap to exact target at the end so rounding/noise doesn't leave residue.
        onFrame({ ...to });
        finish();
        return;
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
  });
}
