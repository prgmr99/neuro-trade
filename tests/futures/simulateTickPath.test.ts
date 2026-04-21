import { describe, it, expect } from 'vitest';
import { simulateTickPath } from '../../src/lib/simulateTickPath';

describe('simulateTickPath', () => {
  it('is deterministic — identical (from, to, seed, frames) produces identical path', () => {
    const opts = {
      from: { TECH: 100, ECOM: 50 },
      to: { TECH: 110, ECOM: 45 },
      frames: 60,
      seed: 42,
    };
    const a = simulateTickPath(opts);
    const b = simulateTickPath(opts);

    expect(a.frames).toBe(60);
    expect(a.pricesBySymbol.TECH).toEqual(b.pricesBySymbol.TECH);
    expect(a.pricesBySymbol.ECOM).toEqual(b.pricesBySymbol.ECOM);
    expect(a.minBySymbol).toEqual(b.minBySymbol);
    expect(a.maxBySymbol).toEqual(b.maxBySymbol);
  });

  it('boundary: first sample equals `from` and last equals `to` for every symbol', () => {
    const path = simulateTickPath({
      from: { TECH: 100, ECOM: 50, GREEN: 200 },
      to: { TECH: 110, ECOM: 40, GREEN: 205 },
      frames: 30,
      seed: 7,
    });

    expect(path.pricesBySymbol.TECH[0]).toBe(100);
    expect(path.pricesBySymbol.TECH[30]).toBe(110);
    expect(path.pricesBySymbol.ECOM[0]).toBe(50);
    expect(path.pricesBySymbol.ECOM[30]).toBe(40);
    expect(path.pricesBySymbol.GREEN[0]).toBe(200);
    expect(path.pricesBySymbol.GREEN[30]).toBe(205);
  });

  it('path length equals frames + 1', () => {
    const path = simulateTickPath({
      from: { X: 10 },
      to: { X: 20 },
      frames: 45,
      seed: 1,
    });
    expect(path.pricesBySymbol.X.length).toBe(46);
  });

  it('min/max span the full path and bracket an interior lerp value', () => {
    const path = simulateTickPath({
      from: { TECH: 100 },
      to: { TECH: 110 },
      frames: 60,
      seed: 42,
    });
    const prices = path.pricesBySymbol.TECH;

    // min/max are consistent with array contents.
    expect(Math.min(...prices)).toBe(path.minBySymbol.TECH);
    expect(Math.max(...prices)).toBe(path.maxBySymbol.TECH);

    // An interior easing midpoint must fall within [min, max]. With ease-out
    // cubic at t=0.5, the noiseless value is 100 + (110 - 100) * (1 - 0.125) = 108.75.
    expect(path.minBySymbol.TECH).toBeLessThanOrEqual(108.75);
    expect(path.maxBySymbol.TECH).toBeGreaterThanOrEqual(108.75);
  });

  it('independent noise channels — same seed + different symbol ≠ identical path', () => {
    const path = simulateTickPath({
      from: { TECH: 100, ECOM: 100 },
      to: { TECH: 110, ECOM: 110 },
      frames: 60,
      seed: 42,
    });

    // The two symbols share identical from/to/seed but have different names,
    // so hashSeed(symbol) makes their noise channels independent.
    expect(path.pricesBySymbol.TECH).not.toEqual(path.pricesBySymbol.ECOM);
  });

  it('uses default frames=60 and default noiseAmp without throwing', () => {
    const path = simulateTickPath({
      from: { X: 100 },
      to: { X: 105 },
      seed: 1,
    });
    expect(path.frames).toBe(60);
    expect(path.pricesBySymbol.X.length).toBe(61);
    expect(path.pricesBySymbol.X[0]).toBe(100);
    expect(path.pricesBySymbol.X[60]).toBe(105);
  });

  it('handles flat trajectories (from === to) — min/max equal `to` within noise tolerance', () => {
    const path = simulateTickPath({
      from: { X: 100 },
      to: { X: 100 },
      frames: 60,
      seed: 99,
      noiseAmp: 0.01,
    });

    // With 0 delta and 1% noise, every price should be within 1% of 100.
    for (const p of path.pricesBySymbol.X) {
      expect(p).toBeGreaterThanOrEqual(99);
      expect(p).toBeLessThanOrEqual(101);
    }
    expect(path.pricesBySymbol.X[0]).toBe(100);
    expect(path.pricesBySymbol.X[60]).toBe(100);
  });
});
