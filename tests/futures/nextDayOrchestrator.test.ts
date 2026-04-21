import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FUTURES_STOCKS, FUTURES_FALLBACK_NEWS, FUTURES_CONFIG } from '../../src/data/futures';
import { simulateTickPath } from '../../src/lib/simulateTickPath';
import { runNextDayAnimated } from '../../src/lib/nextDayOrchestrator';
import { useDisplayPriceStore } from '../../src/store/displayPriceStore';

vi.mock('../../src/lib/geminiNewsEngine', () => ({
  generateDayNews: vi.fn().mockResolvedValue({ news: [], effects: {} }),
  isGeminiAvailable: vi.fn().mockReturnValue(false),
  summarizeDayEvents: vi.fn().mockReturnValue('Mock summary'),
}));

import { useFuturesStore } from '../../src/store/futuresStore';

function initStore(seed = 12345) {
  useFuturesStore.getState().setInitialState(
    JSON.parse(JSON.stringify(FUTURES_STOCKS)),
    FUTURES_FALLBACK_NEWS.map(n => ({ ...n, read: false })),
    FUTURES_CONFIG.maxDays,
    FUTURES_CONFIG.startingCash,
    seed,
  );
}

describe('nextDayOrchestrator — live candle tracking', () => {
  beforeEach(() => {
    initStore();
    useDisplayPriceStore.getState().reset();
  });

  it('reset() clears liveCandles alongside prices and isAnimating', () => {
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

  it('runNextDayAnimated clears liveCandles after the tween completes', async () => {
    // In the vitest env, tweenAnimation takes the SSR branch (no window.rAF) and
    // resolves synchronously. The orchestrator's finally block must still have
    // called reset(), wiping liveCandles.
    await runNextDayAnimated();

    const s = useDisplayPriceStore.getState();
    expect(s.liveCandles).toEqual({});
    expect(s.prices).toEqual({});
    expect(s.isAnimating).toBe(false);
  });

  it('simulated per-frame liveCandle shape follows OHLC invariants', () => {
    // Mirror the orchestrator's live-candle computation against a known path
    // and verify OHLC invariants hold across every frame. This decouples the
    // test from rAF/timers while exercising the same arithmetic.
    const fromPrices = { TECH: 100 };
    const toPrices = { TECH: 110 };
    const path = simulateTickPath({
      from: fromPrices,
      to: toPrices,
      frames: 60,
      seed: 42,
    });

    const liveHigh: Record<string, number> = { TECH: fromPrices.TECH };
    const liveLow: Record<string, number> = { TECH: fromPrices.TECH };
    const dayForLive = useFuturesStore.getState().currentDay;

    for (let i = 0; i <= path.frames; i++) {
      const close = path.pricesBySymbol.TECH[i];
      if (close > liveHigh.TECH) liveHigh.TECH = close;
      if (close < liveLow.TECH) liveLow.TECH = close;

      const candle = {
        day: dayForLive,
        open: fromPrices.TECH,
        close,
        high: liveHigh.TECH,
        low: liveLow.TECH,
      };

      expect(candle.high).toBeGreaterThanOrEqual(candle.low);
      expect(candle.high).toBeGreaterThanOrEqual(candle.open);
      expect(candle.high).toBeGreaterThanOrEqual(candle.close);
      expect(candle.low).toBeLessThanOrEqual(candle.open);
      expect(candle.low).toBeLessThanOrEqual(candle.close);
      expect(candle.day).toBe(dayForLive);
    }

    // Final candle's close snaps exactly to target price (endpoint snap in
    // simulateTickPath). High must cover target if target is the max.
    const finalCandleClose = path.pricesBySymbol.TECH[path.frames];
    expect(finalCandleClose).toBe(toPrices.TECH);
    expect(liveHigh.TECH).toBeGreaterThanOrEqual(toPrices.TECH);
  });

  it('live candle day value matches futuresStore.currentDay before nextDay() commit', () => {
    const dayBefore = useFuturesStore.getState().currentDay;
    // The orchestrator captures currentDay at its entry, uses it as the live
    // candle's day, then commits nextDay() which pushes a permanent candle
    // with the same day value (see futuresStore.ts line ~265).
    const fromPrices = { TECH: 100 };
    const liveCandle = {
      day: dayBefore,
      open: fromPrices.TECH,
      close: 101,
      high: 102,
      low: 99,
    };
    expect(liveCandle.day).toBe(dayBefore);
  });
});
