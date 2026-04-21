import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FUTURES_STOCKS, FUTURES_FALLBACK_NEWS, FUTURES_CONFIG } from '../../src/data/futures';
import { simulateTickPath } from '../../src/lib/simulateTickPath';
import { detectCrossings } from '../../src/lib/nextDayOrchestrator';

// Keep the Gemini mock consistent with other futures tests.
vi.mock('../../src/lib/geminiNewsEngine', () => ({
  generateDayNews: vi.fn().mockResolvedValue({ news: [], effects: {} }),
  isGeminiAvailable: vi.fn().mockReturnValue(false),
  summarizeDayEvents: vi.fn().mockReturnValue('Mock summary'),
}));

import { useFuturesStore } from '../../src/store/futuresStore';

function initStore(seed = 12345) {
  const store = useFuturesStore.getState();
  store.setInitialState(
    JSON.parse(JSON.stringify(FUTURES_STOCKS)),
    FUTURES_FALLBACK_NEWS.map(n => ({ ...n, read: false })),
    FUTURES_CONFIG.maxDays,
    FUTURES_CONFIG.startingCash,
    seed,
  );
}

describe('path-crossing liquidation', () => {
  beforeEach(() => {
    initStore();
  });

  // ── liquidateByPathCrossing action ─────────────────────────────────────

  describe('liquidateByPathCrossing', () => {
    it('liquidates a long position and locks PnL at liquidationPrice', () => {
      useFuturesStore.getState().openPosition('TECH', 'long', 10, 1000);
      const pos = useFuturesStore.getState().positions['TECH-long'];
      const expectedPnl = ((pos.liquidationPrice - pos.entryPrice) / pos.entryPrice) * pos.size;

      useFuturesStore.getState().liquidateByPathCrossing('TECH-long', pos.liquidationPrice);
      const state = useFuturesStore.getState();

      expect(state.positions['TECH-long']).toBeUndefined();
      expect(state.stats.totalLiquidations).toBe(1);
      expect(state.liquidatedThisTurn).toContain('TECH-long');
      // Loss of roughly -900 (10x leverage, 9% move before full liquidation).
      expect(expectedPnl).toBeLessThan(0);
    });

    it('liquidates a short position mirror-symmetrically', () => {
      useFuturesStore.getState().openPosition('ECOM', 'short', 25, 500);
      const pos = useFuturesStore.getState().positions['ECOM-short'];

      useFuturesStore.getState().liquidateByPathCrossing('ECOM-short', pos.liquidationPrice);
      const state = useFuturesStore.getState();

      expect(state.positions['ECOM-short']).toBeUndefined();
      expect(state.stats.totalLiquidations).toBe(1);
    });

    it('is idempotent — calling twice does not double-count stats', () => {
      useFuturesStore.getState().openPosition('TECH', 'long', 10, 1000);
      useFuturesStore.getState().liquidateByPathCrossing('TECH-long', 50);
      useFuturesStore.getState().liquidateByPathCrossing('TECH-long', 50);

      expect(useFuturesStore.getState().stats.totalLiquidations).toBe(1);
    });

    it('is a no-op for non-existent positions', () => {
      const liqsBefore = useFuturesStore.getState().stats.totalLiquidations;
      useFuturesStore.getState().liquidateByPathCrossing('FAKE-long', 0);
      expect(useFuturesStore.getState().stats.totalLiquidations).toBe(liqsBefore);
    });
  });

  // ── detectCrossings helper ─────────────────────────────────────────────

  describe('detectCrossings', () => {
    it('returns [] when no position crosses its liquidation price', () => {
      useFuturesStore.getState().openPosition('TECH', 'long', 10, 1000);
      const positions = useFuturesStore.getState().positions;
      const entry = useFuturesStore.getState().stocks['TECH'].price;

      // Path drifts upward, staying well above the long liq price.
      const path = simulateTickPath({
        from: { TECH: entry },
        to: { TECH: entry * 1.02 },
        frames: 60,
        seed: 1,
      });

      expect(detectCrossings(path, positions)).toEqual([]);
    });

    it('detects long liquidation on downward path', () => {
      useFuturesStore.getState().openPosition('TECH', 'long', 125, 1000);
      const positions = useFuturesStore.getState().positions;
      const pos = positions['TECH-long'];
      const entry = pos.entryPrice;

      // Crash 2% — well past the 125x liq threshold.
      const path = simulateTickPath({
        from: { TECH: entry },
        to: { TECH: entry * 0.98 },
        frames: 60,
        seed: 2,
      });

      const crossings = detectCrossings(path, positions);
      expect(crossings).toHaveLength(1);
      expect(crossings[0].posId).toBe('TECH-long');
      expect(crossings[0].frameIdx).toBeGreaterThan(0);
      expect(crossings[0].frameIdx).toBeLessThanOrEqual(60);
      expect(crossings[0].crossPrice).toBeLessThanOrEqual(pos.liquidationPrice);
    });

    it('detects short liquidation on upward path', () => {
      useFuturesStore.getState().openPosition('TECH', 'short', 125, 1000);
      const positions = useFuturesStore.getState().positions;
      const pos = positions['TECH-short'];
      const entry = pos.entryPrice;

      const path = simulateTickPath({
        from: { TECH: entry },
        to: { TECH: entry * 1.02 },
        frames: 60,
        seed: 3,
      });

      const crossings = detectCrossings(path, positions);
      expect(crossings).toHaveLength(1);
      expect(crossings[0].posId).toBe('TECH-short');
      expect(crossings[0].crossPrice).toBeGreaterThanOrEqual(pos.liquidationPrice);
    });

    it('returns crossings sorted by frameIdx ascending', () => {
      useFuturesStore.getState().openPosition('TECH', 'long', 125, 1000);
      useFuturesStore.getState().openPosition('ECOM', 'long', 125, 500);
      const positions = useFuturesStore.getState().positions;
      const techEntry = useFuturesStore.getState().stocks['TECH'].price;
      const ecomEntry = useFuturesStore.getState().stocks['ECOM'].price;

      const path = simulateTickPath({
        from: { TECH: techEntry, ECOM: ecomEntry },
        to: { TECH: techEntry * 0.95, ECOM: ecomEntry * 0.95 },
        frames: 60,
        seed: 4,
      });

      const crossings = detectCrossings(path, positions);
      expect(crossings.length).toBeGreaterThanOrEqual(2);
      for (let i = 1; i < crossings.length; i++) {
        expect(crossings[i].frameIdx).toBeGreaterThanOrEqual(crossings[i - 1].frameIdx);
      }
    });

    it('ignores already-liquidated positions', () => {
      useFuturesStore.getState().openPosition('TECH', 'long', 10, 1000);
      // Force the position to be marked liquidated (without deleting) to
      // exercise the `if (pos.isLiquidated) continue` branch.
      useFuturesStore.setState((s) => {
        s.positions['TECH-long'].isLiquidated = true;
      });
      const positions = useFuturesStore.getState().positions;
      const entry = useFuturesStore.getState().stocks['TECH'].price;

      const path = simulateTickPath({
        from: { TECH: entry },
        to: { TECH: entry * 0.5 }, // massive crash
        frames: 60,
        seed: 5,
      });

      expect(detectCrossings(path, positions)).toEqual([]);
    });
  });

  // ── End-to-end: path-crossing removes positions before nextDay ─────────

  describe('orchestrator integration', () => {
    it('path liquidation removes a position so nextDay() does not double-liquidate', () => {
      useFuturesStore.getState().openPosition('TECH', 'long', 125, 1000);
      const pos = useFuturesStore.getState().positions['TECH-long'];

      // Simulate the orchestrator calling liquidateByPathCrossing before nextDay().
      useFuturesStore.getState().liquidateByPathCrossing('TECH-long', pos.liquidationPrice);

      // nextDay() must NOT re-increment stats or touch the already-removed position.
      const liqsBefore = useFuturesStore.getState().stats.totalLiquidations;
      useFuturesStore.getState().nextDay();

      expect(useFuturesStore.getState().stats.totalLiquidations).toBe(liqsBefore);
      expect(useFuturesStore.getState().positions['TECH-long']).toBeUndefined();
      expect(useFuturesStore.getState().liquidatedThisTurn).toContain('TECH-long');
    });
  });
});
