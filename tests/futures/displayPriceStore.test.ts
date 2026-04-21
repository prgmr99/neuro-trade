import { describe, it, expect, beforeEach } from 'vitest';
import { useDisplayPriceStore } from '../../src/store/displayPriceStore';

describe('displayPriceStore', () => {
  beforeEach(() => {
    useDisplayPriceStore.getState().reset();
  });

  it('starts with empty prices, empty liveCandles, and not animating', () => {
    const state = useDisplayPriceStore.getState();
    expect(state.prices).toEqual({});
    expect(state.liveCandles).toEqual({});
    expect(state.isAnimating).toBe(false);
  });

  it('setLiveCandles replaces the entire live-candle map', () => {
    useDisplayPriceStore.getState().setLiveCandles({
      TECH: { day: 3, open: 100, close: 105, high: 107, low: 99 },
    });
    expect(useDisplayPriceStore.getState().liveCandles).toEqual({
      TECH: { day: 3, open: 100, close: 105, high: 107, low: 99 },
    });

    useDisplayPriceStore.getState().setLiveCandles({
      ECOM: { day: 3, open: 50, close: 48, high: 51, low: 47 },
    });
    expect(useDisplayPriceStore.getState().liveCandles).toEqual({
      ECOM: { day: 3, open: 50, close: 48, high: 51, low: 47 },
    });
  });

  it('setPrices replaces the entire price map', () => {
    useDisplayPriceStore.getState().setPrices({ TECH: 100, ECOM: 50 });
    expect(useDisplayPriceStore.getState().prices).toEqual({ TECH: 100, ECOM: 50 });

    useDisplayPriceStore.getState().setPrices({ AERO: 200 });
    expect(useDisplayPriceStore.getState().prices).toEqual({ AERO: 200 });
  });

  it('patchPrice merges a single symbol into existing prices', () => {
    useDisplayPriceStore.getState().setPrices({ TECH: 100, ECOM: 50 });
    useDisplayPriceStore.getState().patchPrice('TECH', 110);
    expect(useDisplayPriceStore.getState().prices).toEqual({ TECH: 110, ECOM: 50 });
  });

  it('setAnimating toggles flag', () => {
    useDisplayPriceStore.getState().setAnimating(true);
    expect(useDisplayPriceStore.getState().isAnimating).toBe(true);
    useDisplayPriceStore.getState().setAnimating(false);
    expect(useDisplayPriceStore.getState().isAnimating).toBe(false);
  });

  it('reset clears prices, liveCandles, and stops animation', () => {
    useDisplayPriceStore.getState().setPrices({ TECH: 100 });
    useDisplayPriceStore.getState().setLiveCandles({
      TECH: { day: 1, open: 100, close: 101, high: 102, low: 99 },
    });
    useDisplayPriceStore.getState().setAnimating(true);
    useDisplayPriceStore.getState().reset();
    const s = useDisplayPriceStore.getState();
    expect(s.prices).toEqual({});
    expect(s.liveCandles).toEqual({});
    expect(s.isAnimating).toBe(false);
  });
});
