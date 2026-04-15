import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FUTURES_STOCKS, FUTURES_FALLBACK_NEWS, FUTURES_CONFIG } from '../../src/data/futures';

// Mock the geminiNewsEngine to avoid real API calls
vi.mock('../../src/lib/geminiNewsEngine', () => ({
  generateDayNews: vi.fn().mockResolvedValue({
    news: [
      {
        id: 'mock-2-1',
        dayIdx: 2,
        title: { en: 'Mock News', ko: '모의 뉴스' },
        content: { en: 'Mock content', ko: '모의 내용' },
        read: false,
        effect: { TECH: 1.10 },
      },
    ],
    effects: { TECH: 1.10 },
  }),
  isGeminiAvailable: vi.fn().mockReturnValue(false),
  summarizeDayEvents: vi.fn().mockReturnValue('Mock summary'),
}));

// Import store AFTER mock setup
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
  return useFuturesStore.getState();
}

describe('futuresStore', () => {
  beforeEach(() => {
    initStore();
  });

  // ─── setInitialState ────────────────────────────────────

  describe('setInitialState', () => {
    it('initializes with correct starting cash', () => {
      const state = useFuturesStore.getState();
      expect(state.cash).toBe(FUTURES_CONFIG.startingCash);
    });

    it('initializes at day 1 in playing phase', () => {
      const state = useFuturesStore.getState();
      expect(state.currentDay).toBe(1);
      expect(state.gamePhase).toBe('playing');
    });

    it('initializes with 5 stocks', () => {
      const state = useFuturesStore.getState();
      expect(Object.keys(state.stocks)).toHaveLength(5);
      expect(Object.keys(state.stocks)).toEqual(
        expect.arrayContaining(['TECH', 'ECOM', 'GREEN', 'HEALTH', 'AERO']),
      );
    });

    it('generates synthetic price history (20 candles) per stock', () => {
      const state = useFuturesStore.getState();
      for (const stock of Object.values(state.stocks)) {
        expect(stock.priceHistory.length).toBe(20); // days -19 to 0
        expect(stock.priceHistory[0].day).toBe(-19);
        expect(stock.priceHistory[19].day).toBe(0);
      }
    });

    it('starts with empty positions and clean stats', () => {
      const state = useFuturesStore.getState();
      expect(Object.keys(state.positions)).toHaveLength(0);
      expect(state.stats.totalPositionsOpened).toBe(0);
      expect(state.stats.totalLiquidations).toBe(0);
      expect(state.stats.totalFundingPaid).toBe(0);
    });

    it('loads Day 1 news', () => {
      const state = useFuturesStore.getState();
      expect(state.dailyNews.length).toBeGreaterThan(0);
      state.dailyNews.forEach(n => expect(n.dayIdx).toBe(1));
    });

    it('is deterministic — same seed produces same prices', () => {
      const state1 = initStore(42);
      const price1 = state1.stocks['TECH'].price;

      initStore(99999); // different seed
      const state2 = initStore(42); // same seed again
      const price2 = state2.stocks['TECH'].price;

      expect(price1).toBe(price2);
    });
  });

  // ─── openPosition ───────────────────────────────────────

  describe('openPosition', () => {
    it('opens a long position with valid parameters', () => {
      const store = useFuturesStore.getState();
      const result = store.openPosition('TECH', 'long', 10, 1000);

      expect(result).toBe(true);
      const state = useFuturesStore.getState();
      expect(state.positions['TECH-long']).toBeDefined();
      expect(state.positions['TECH-long'].leverage).toBe(10);
      expect(state.positions['TECH-long'].margin).toBe(1000);
      expect(state.positions['TECH-long'].size).toBe(10000); // 1000 * 10
      expect(state.positions['TECH-long'].direction).toBe('long');
      expect(state.positions['TECH-long'].isLiquidated).toBe(false);
    });

    it('opens a short position', () => {
      const store = useFuturesStore.getState();
      const result = store.openPosition('ECOM', 'short', 25, 500);

      expect(result).toBe(true);
      const state = useFuturesStore.getState();
      expect(state.positions['ECOM-short']).toBeDefined();
      expect(state.positions['ECOM-short'].direction).toBe('short');
      expect(state.positions['ECOM-short'].size).toBe(12500); // 500 * 25
    });

    it('deducts margin from cash', () => {
      const cashBefore = useFuturesStore.getState().cash;
      useFuturesStore.getState().openPosition('TECH', 'long', 10, 2000);
      const cashAfter = useFuturesStore.getState().cash;

      expect(cashAfter).toBe(cashBefore - 2000);
    });

    it('increments totalPositionsOpened', () => {
      useFuturesStore.getState().openPosition('TECH', 'long', 10, 1000);
      useFuturesStore.getState().openPosition('ECOM', 'short', 25, 500);

      expect(useFuturesStore.getState().stats.totalPositionsOpened).toBe(2);
    });

    it('rejects if margin amount <= 0', () => {
      const result = useFuturesStore.getState().openPosition('TECH', 'long', 10, 0);
      expect(result).toBe(false);
      expect(Object.keys(useFuturesStore.getState().positions)).toHaveLength(0);
    });

    it('rejects if cash is insufficient', () => {
      const result = useFuturesStore.getState().openPosition('TECH', 'long', 10, 999999);
      expect(result).toBe(false);
    });

    it('rejects duplicate position (same symbol + direction)', () => {
      useFuturesStore.getState().openPosition('TECH', 'long', 10, 1000);
      const result = useFuturesStore.getState().openPosition('TECH', 'long', 25, 500);

      expect(result).toBe(false);
      // First position still there, cash only deducted once
      expect(useFuturesStore.getState().stats.totalPositionsOpened).toBe(1);
    });

    it('allows same symbol with different direction', () => {
      useFuturesStore.getState().openPosition('TECH', 'long', 10, 1000);
      const result = useFuturesStore.getState().openPosition('TECH', 'short', 10, 1000);

      expect(result).toBe(true);
      expect(Object.keys(useFuturesStore.getState().positions)).toHaveLength(2);
    });

    it('rejects invalid leverage values', () => {
      expect(useFuturesStore.getState().openPosition('TECH', 'long', 2, 1000)).toBe(false);
      expect(useFuturesStore.getState().openPosition('TECH', 'long', 5, 1000)).toBe(false);
      expect(useFuturesStore.getState().openPosition('TECH', 'long', 20, 1000)).toBe(false);
      expect(useFuturesStore.getState().openPosition('TECH', 'long', 130, 1000)).toBe(false);
    });

    it('accepts all valid leverage values', () => {
      const leverages = [10, 25, 50, 75, 100, 125];
      const symbols = ['TECH', 'ECOM', 'GREEN', 'HEALTH', 'AERO'];

      // Use long for first 5, short for the 6th (same symbol, different direction)
      leverages.forEach((lev, i) => {
        const sym = symbols[i % symbols.length];
        const dir = i < symbols.length ? 'long' as const : 'short' as const;
        const result = useFuturesStore.getState().openPosition(sym, dir, lev, 100);
        expect(result).toBe(true);
      });
    });

    it('rejects position for non-existent stock', () => {
      const result = useFuturesStore.getState().openPosition('FAKE', 'long', 10, 1000);
      expect(result).toBe(false);
    });

    // ─── Liquidation price ──────────────────────────────────

    it('calculates liquidation price for long (10x)', () => {
      useFuturesStore.getState().openPosition('TECH', 'long', 10, 1000);
      const pos = useFuturesStore.getState().positions['TECH-long'];

      // Long: entryPrice * (1 - (1/10) * 0.9) = entry * 0.91
      const expected = pos.entryPrice * (1 - (1 / 10) * 0.9);
      expect(pos.liquidationPrice).toBeCloseTo(expected, 2);
    });

    it('calculates liquidation price for short (25x)', () => {
      useFuturesStore.getState().openPosition('ECOM', 'short', 25, 500);
      const pos = useFuturesStore.getState().positions['ECOM-short'];

      // Short: entryPrice * (1 + (1/25) * 0.9) = entry * 1.036
      const expected = pos.entryPrice * (1 + (1 / 25) * 0.9);
      expect(pos.liquidationPrice).toBeCloseTo(expected, 2);
    });

    it('125x long has extremely tight liquidation (< 1% move)', () => {
      useFuturesStore.getState().openPosition('TECH', 'long', 125, 1000);
      const pos = useFuturesStore.getState().positions['TECH-long'];

      const distancePct = (pos.entryPrice - pos.liquidationPrice) / pos.entryPrice;
      expect(distancePct).toBeLessThan(0.01); // less than 1%
      expect(distancePct).toBeGreaterThan(0.005); // but more than 0.5%
    });
  });

  // ─── closePosition ──────────────────────────────────────

  describe('closePosition', () => {
    it('returns margin + PnL to cash on profitable long close', () => {
      useFuturesStore.getState().openPosition('TECH', 'long', 10, 1000);
      const cashAfterOpen = useFuturesStore.getState().cash;

      // Manually bump price up 10%
      useFuturesStore.setState((s) => {
        s.stocks['TECH'].price *= 1.10;
      });

      useFuturesStore.getState().closePosition('TECH-long');
      const cashAfterClose = useFuturesStore.getState().cash;

      // PnL = (1.10 - 1.0) / 1.0 * 10000 = 1000, cashBack = 1000 + 1000 = 2000
      expect(cashAfterClose).toBeGreaterThan(cashAfterOpen);
      expect(Object.keys(useFuturesStore.getState().positions)).toHaveLength(0);
    });

    it('returns 0 cash if loss exceeds margin', () => {
      useFuturesStore.getState().openPosition('TECH', 'long', 10, 1000);

      // Crash price by 20% — loss = 0.2 * 10000 = 2000, exceeds 1000 margin
      useFuturesStore.setState((s) => {
        s.stocks['TECH'].price *= 0.80;
      });

      const cashBefore = useFuturesStore.getState().cash;
      useFuturesStore.getState().closePosition('TECH-long');
      const cashAfter = useFuturesStore.getState().cash;

      // cashBack = max(0, 1000 + (-2000)) = 0
      expect(cashAfter).toBe(cashBefore);
    });

    it('calculates short position PnL correctly', () => {
      const entryPrice = useFuturesStore.getState().stocks['ECOM'].price;
      useFuturesStore.getState().openPosition('ECOM', 'short', 10, 1000);
      const cashAfterOpen = useFuturesStore.getState().cash;

      // Price drops 5% — profit for short
      useFuturesStore.setState((s) => {
        s.stocks['ECOM'].price = entryPrice * 0.95;
      });

      useFuturesStore.getState().closePosition('ECOM-short');
      const cashAfterClose = useFuturesStore.getState().cash;

      // PnL = (entry - current) / entry * size = 0.05 * 10000 = 500
      // cashBack = 1000 + 500 = 1500
      expect(cashAfterClose - cashAfterOpen).toBeCloseTo(1500, 0);
    });

    it('does nothing for non-existent position', () => {
      const cashBefore = useFuturesStore.getState().cash;
      useFuturesStore.getState().closePosition('FAKE-long');
      expect(useFuturesStore.getState().cash).toBe(cashBefore);
    });
  });

  // ─── nextDay ────────────────────────────────────────────

  describe('nextDay', () => {
    it('advances the current day', async () => {
      expect(useFuturesStore.getState().currentDay).toBe(1);
      await useFuturesStore.getState().nextDay();
      expect(useFuturesStore.getState().currentDay).toBe(2);
    });

    it('updates stock prices', async () => {
      const priceBefore = useFuturesStore.getState().stocks['TECH'].price;
      await useFuturesStore.getState().nextDay();
      const priceAfter = useFuturesStore.getState().stocks['TECH'].price;

      // Price should change (extremely unlikely to remain identical with volatility)
      expect(priceAfter).not.toBe(priceBefore);
      expect(priceAfter).toBeGreaterThan(0);
    });

    it('appends candlestick to price history', async () => {
      const histBefore = useFuturesStore.getState().stocks['TECH'].priceHistory.length;
      await useFuturesStore.getState().nextDay();
      const histAfter = useFuturesStore.getState().stocks['TECH'].priceHistory.length;

      expect(histAfter).toBe(histBefore + 1);
    });

    it('deducts funding cost from cash (not margin)', async () => {
      useFuturesStore.getState().openPosition('TECH', 'long', 10, 1000);
      const marginBefore = useFuturesStore.getState().positions['TECH-long'].margin;
      const cashBefore = useFuturesStore.getState().cash;

      // Prevent liquidation by setting a very low liquidation price
      useFuturesStore.setState((s) => {
        s.positions['TECH-long'].liquidationPrice = 0.01;
      });

      await useFuturesStore.getState().nextDay();
      const state = useFuturesStore.getState();
      const pos = state.positions['TECH-long'];

      if (pos) {
        // Funding = size * 0.0009 = 10000 * 0.0009 = 9 — deducted from cash, not margin
        expect(pos.margin).toBe(marginBefore); // margin is immutable
        expect(pos.fundingPaid).toBeCloseTo(9, 1);
        expect(state.cash).toBeLessThan(cashBefore); // cash decreased by funding
      }
    });

    it('tracks funding paid in stats', async () => {
      useFuturesStore.getState().openPosition('TECH', 'long', 10, 5000);
      useFuturesStore.setState((s) => {
        s.positions['TECH-long'].liquidationPrice = 0.01;
      });

      await useFuturesStore.getState().nextDay();
      expect(useFuturesStore.getState().stats.totalFundingPaid).toBeGreaterThan(0);
    });

    it('liquidates long position when price drops below liquidation price', async () => {
      useFuturesStore.getState().openPosition('TECH', 'long', 125, 1000);
      const pos = useFuturesStore.getState().positions['TECH-long'];
      const liqPrice = pos.liquidationPrice;

      // Force price below liquidation
      useFuturesStore.setState((s) => {
        s.stocks['TECH'].price = liqPrice * 0.5;
        s.stocks['TECH'].previousPrice = liqPrice * 0.5;
      });

      await useFuturesStore.getState().nextDay();
      const state = useFuturesStore.getState();

      expect(state.positions['TECH-long']).toBeUndefined();
      expect(state.stats.totalLiquidations).toBe(1);
      expect(state.liquidatedThisTurn).toContain('TECH-long');
    });

    it('liquidates short position when price rises above liquidation price', async () => {
      useFuturesStore.getState().openPosition('TECH', 'short', 125, 1000);
      const pos = useFuturesStore.getState().positions['TECH-short'];
      const liqPrice = pos.liquidationPrice;

      // Force price above liquidation
      useFuturesStore.setState((s) => {
        s.stocks['TECH'].price = liqPrice * 2;
        s.stocks['TECH'].previousPrice = liqPrice * 2;
      });

      await useFuturesStore.getState().nextDay();
      const state = useFuturesStore.getState();

      expect(state.positions['TECH-short']).toBeUndefined();
      expect(state.stats.totalLiquidations).toBe(1);
    });

    it('records portfolio history entry', async () => {
      expect(useFuturesStore.getState().history).toHaveLength(0);
      await useFuturesStore.getState().nextDay();
      expect(useFuturesStore.getState().history).toHaveLength(1);
      expect(useFuturesStore.getState().history[0].day).toBe(1);
    });

    it('sets gameover after maxDays', async () => {
      for (let i = 0; i < FUTURES_CONFIG.maxDays; i++) {
        await useFuturesStore.getState().nextDay();
      }
      expect(useFuturesStore.getState().gamePhase).toBe('gameover');
    });

    it('tracks peak value and worst drawdown', async () => {
      useFuturesStore.getState().openPosition('TECH', 'long', 50, 5000);
      useFuturesStore.setState((s) => {
        s.positions['TECH-long'].liquidationPrice = 0.01;
      });

      await useFuturesStore.getState().nextDay();
      const stats = useFuturesStore.getState().stats;

      expect(stats.peakTotalValue).toBeGreaterThan(0);
      // Drawdown is between 0 and 1
      expect(stats.worstDrawdown).toBeGreaterThanOrEqual(0);
      expect(stats.worstDrawdown).toBeLessThanOrEqual(1);
    });

    it('records portfolio history entry per nextDay call', async () => {
      expect(useFuturesStore.getState().history).toHaveLength(0);
      await useFuturesStore.getState().nextDay();
      expect(useFuturesStore.getState().history).toHaveLength(1);
    });
  });

  // ─── News actions ───────────────────────────────────────

  describe('readNews', () => {
    it('marks a news item as read', () => {
      const state = useFuturesStore.getState();
      const newsId = state.dailyNews[0]?.id;
      if (!newsId) return;

      expect(state.dailyNews[0].read).toBe(false);
      state.readNews(newsId);

      const updated = useFuturesStore.getState();
      expect(updated.dailyNews.find(n => n.id === newsId)?.read).toBe(true);
      expect(updated.allNews.find(n => n.id === newsId)?.read).toBe(true);
    });
  });

  describe('toggleNewsExpanded', () => {
    it('toggles news expansion on/off', () => {
      const store = useFuturesStore.getState();
      expect(store.expandedNews).toHaveLength(0);

      store.toggleNewsExpanded('test-id');
      expect(useFuturesStore.getState().expandedNews).toContain('test-id');

      useFuturesStore.getState().toggleNewsExpanded('test-id');
      expect(useFuturesStore.getState().expandedNews).not.toContain('test-id');
    });
  });

  // ─── setInitialState reset ──────────────────────────────

  describe('setInitialState used as reset', () => {
    it('resets to initial state with fresh seed via setInitialState', () => {
      // Open a position and advance
      useFuturesStore.getState().openPosition('TECH', 'long', 10, 1000);

      // Reset by calling setInitialState again (same pattern as handleRetry in FuturesMode)
      const store = useFuturesStore.getState();
      store.setInitialState(
        JSON.parse(JSON.stringify(FUTURES_STOCKS)),
        FUTURES_FALLBACK_NEWS.map(n => ({ ...n, read: false })),
        FUTURES_CONFIG.maxDays,
        FUTURES_CONFIG.startingCash,
        Date.now(),
      );
      const state = useFuturesStore.getState();

      expect(state.currentDay).toBe(1);
      expect(state.cash).toBe(FUTURES_CONFIG.startingCash);
      expect(Object.keys(state.positions)).toHaveLength(0);
      expect(state.gamePhase).toBe('playing');
      expect(state.stats.totalPositionsOpened).toBe(0);
    });
  });
});
