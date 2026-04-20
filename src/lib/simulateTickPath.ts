import { mulberry32, hashSeed } from './prng';

/**
 * Discrete tick path between "from" and "to" prices for every symbol.
 *
 * Layout:
 *  - `frames` — integer sample count; path has `frames + 1` samples (index 0..frames).
 *  - `pricesBySymbol[sym][i]` — price for `sym` at frame index `i`.
 *  - `minBySymbol[sym]` / `maxBySymbol[sym]` — extrema across the full path.
 *
 * Boundaries:
 *  - `pricesBySymbol[sym][0]           === from[sym]` (noise factor is 0 at t=0).
 *  - `pricesBySymbol[sym][frames]      === to[sym]`   (noise factor is 0 at t=1).
 */
export interface TickPath {
  frames: number;
  pricesBySymbol: Record<string, number[]>;
  minBySymbol: Record<string, number>;
  maxBySymbol: Record<string, number>;
}

export interface SimulateTickPathOptions {
  from: Record<string, number>;
  to: Record<string, number>;
  /** Sample count (default 60). Path array length is frames + 1. */
  frames?: number;
  seed: number;
  /** Peak noise amplitude (fraction). Default 0.004 (±0.4%). Decays to 0 at t=0 and t=1. */
  noiseAmp?: number;
}

/**
 * Deterministic tween path generator. Each symbol gets an independent noise
 * channel seeded from `mulberry32(seed + hashSeed(symbol))`, so different
 * symbols never share a noise sequence and seed reuse is reproducible.
 *
 * Easing: ease-out-cubic — `eased = 1 - (1 - t)^3`.
 * Per-frame value for a symbol:
 *   `lerp(from, to, eased) * (1 + (rng() - 0.5) * 2 * noiseAmp * (1 - t))`
 * with `t = frameIdx / frames`. Noise factor is forced to 0 at t=0 and t=1
 * (see "Boundaries" above). Same (from, to, seed, frames) → same path.
 */
export function simulateTickPath(opts: SimulateTickPathOptions): TickPath {
  const { from, to, seed, frames = 60, noiseAmp = 0.004 } = opts;
  const symbols = Object.keys(to);

  const pricesBySymbol: Record<string, number[]> = {};
  const minBySymbol: Record<string, number> = {};
  const maxBySymbol: Record<string, number> = {};

  for (const sym of symbols) {
    const rng = mulberry32(seed + hashSeed(sym));
    const fromVal = from[sym] ?? to[sym];
    const toVal = to[sym];

    const prices: number[] = new Array(frames + 1);
    let minV = Infinity;
    let maxV = -Infinity;

    for (let i = 0; i <= frames; i++) {
      const t = i / frames;
      const eased = 1 - Math.pow(1 - t, 3);
      const interp = fromVal + (toVal - fromVal) * eased;
      // Noise decays linearly with (1 - t). Endpoint snapping (below) forces
      // noise to 0 at both t=0 and t=1 so liquidation detection never triggers
      // on a spurious endpoint wiggle.
      const noise = (rng() - 0.5) * 2 * noiseAmp * (1 - t);
      let v = interp * (1 + noise);

      // Snap endpoints to the caller-provided values. Guarantees
      // path[0] === from and path[frames] === to (see Boundaries docs).
      if (i === 0) v = fromVal;
      else if (i === frames) v = toVal;

      prices[i] = v;
      if (v < minV) minV = v;
      if (v > maxV) maxV = v;
    }

    pricesBySymbol[sym] = prices;
    minBySymbol[sym] = minV;
    maxBySymbol[sym] = maxV;
  }

  return { frames, pricesBySymbol, minBySymbol, maxBySymbol };
}
