import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { FuturesPosition, FuturesStats, News, Stock } from '../types';
import { mulberry32 } from '../lib/prng';
import { FUTURES_STOCKS, FUTURES_FALLBACK_NEWS, FUTURES_CONFIG } from '../data/futures';

interface FuturesStoreState {
  // Game state
  positions: Record<string, FuturesPosition>;
  cash: number;
  currentDay: number;
  maxDays: number;
  stocks: Record<string, Stock>;
  dailyNews: News[];
  allNews: News[];
  history: Array<{ day: number; totalValue: number; cashValue: number }>;
  seed: number;
  prngState: number;
  gamePhase: 'playing' | 'gameover';
  stats: FuturesStats;
  expandedNews: string[];
  liquidatedThisTurn: string[];
  arcName: string | null;

  // Actions
  setInitialState: (stocks: Record<string, Stock>, news: News[], maxDays: number, startingCash: number, seed: number, arcName?: string) => void;
  openPosition: (symbol: string, direction: 'long' | 'short', leverage: number, marginAmount: number) => boolean;
  closePosition: (positionId: string) => void;
  nextDay: () => void;
  readNews: (newsId: string) => void;
  toggleNewsExpanded: (newsId: string) => void;
  resetGame: () => void;
}

export const useFuturesStore = create<FuturesStoreState>()(immer((set) => ({
  positions: {},
  cash: FUTURES_CONFIG.startingCash,
  currentDay: 1,
  maxDays: FUTURES_CONFIG.maxDays,
  stocks: {},
  dailyNews: [],
  allNews: [],
  history: [],
  seed: 0,
  prngState: 0,
  gamePhase: 'playing',
  stats: {
    totalPositionsOpened: 0,
    totalLiquidations: 0,
    totalFundingPaid: 0,
    peakTotalValue: FUTURES_CONFIG.startingCash,
    worstDrawdown: 0,
  },
  expandedNews: [],
  liquidatedThisTurn: [],
  arcName: null,

  setInitialState: (stocks, news, maxDays, startingCash, seed, arcName) => set((state) => {
    const rng = mulberry32(seed);

    // Generate synthetic price history for days -19 to 0
    const initializedStocks: Record<string, Stock> = {};
    Object.keys(stocks).forEach(symbol => {
      initializedStocks[symbol] = { ...stocks[symbol], priceHistory: [] };
    });

    Object.keys(initializedStocks).forEach(symbol => {
      const stock = initializedStocks[symbol];
      let currentSimPrice = stock.price * 0.8;
      const history = [];
      for (let i = -19; i <= 0; i++) {
        const noise = 1 + (rng() - 0.5) * stock.volatility;
        const openPrice = currentSimPrice;
        const closePrice = openPrice * noise;
        const wickScale = 0.4;
        const highPrice = Math.max(openPrice, closePrice) * (1 + rng() * stock.volatility * wickScale);
        const lowPrice = Math.min(openPrice, closePrice) * (1 - rng() * stock.volatility * wickScale);

        history.push({
          day: i,
          open: openPrice,
          close: closePrice,
          high: highPrice,
          low: lowPrice,
        });
        currentSimPrice = closePrice;
      }
      stock.price = currentSimPrice;
      stock.previousPrice = currentSimPrice;
      stock.priceHistory = history;
    });

    const day1News = news.filter(n => n.dayIdx === 1);

    state.positions = {};
    state.cash = startingCash;
    state.currentDay = 1;
    state.maxDays = maxDays;
    state.stocks = initializedStocks;
    state.allNews = news;
    state.dailyNews = day1News;
    state.history = [];
    state.seed = seed;
    state.prngState = seed;
    state.gamePhase = 'playing';
    state.stats = {
      totalPositionsOpened: 0,
      totalLiquidations: 0,
      totalFundingPaid: 0,
      peakTotalValue: startingCash,
      worstDrawdown: 0,
    };
    state.expandedNews = [];
    state.liquidatedThisTurn = [];
    state.arcName = arcName ?? null;
  }),

  openPosition: (symbol, direction, leverage, marginAmount) => {
    const validLeverages = [10, 25, 50, 75, 100, 125];
    let success = false;

    set((state) => {
      if (marginAmount <= 0) return;
      if (state.cash < marginAmount) return;
      const positionId = `${symbol}-${direction}`;
      if (state.positions[positionId]) return;
      if (!validLeverages.includes(leverage)) return;
      if (!state.stocks[symbol]) return;

      const size = marginAmount * leverage;
      const entryPrice = state.stocks[symbol].price;
      const liquidationPrice = direction === 'long'
        ? entryPrice * (1 - (1 / leverage) * 0.9)
        : entryPrice * (1 + (1 / leverage) * 0.9);

      const position: FuturesPosition = {
        id: positionId,
        symbol,
        direction,
        leverage,
        margin: marginAmount,
        size,
        entryPrice,
        liquidationPrice,
        unrealizedPnl: 0,
        fundingPaid: 0,
        isLiquidated: false,
        openedOnDay: state.currentDay,
      };

      state.positions[positionId] = position;
      state.cash -= marginAmount;
      state.stats.totalPositionsOpened += 1;
      success = true;
    });

    return success;
  },

  closePosition: (positionId) => set((state) => {
    const pos = state.positions[positionId];
    if (!pos) return;

    const currentPrice = state.stocks[pos.symbol].price;
    const pnl = pos.direction === 'long'
      ? ((currentPrice - pos.entryPrice) / pos.entryPrice) * pos.size
      : ((pos.entryPrice - currentPrice) / pos.entryPrice) * pos.size;

    const cashBack = Math.max(0, pos.margin + pnl);
    state.cash += cashBack;
    delete state.positions[positionId];
  }),

  nextDay: () => set((draft) => {
    const rng = mulberry32(draft.prngState + draft.currentDay * 1000);

    // Gather effects from next day's news
    const nextDayNews = draft.allNews.filter(n => n.dayIdx === draft.currentDay + 1);
    const effects: Record<string, number> = {};
    for (const news of nextDayNews) {
      for (const [sym, mult] of Object.entries(news.effect)) {
        effects[sym] = (effects[sym] ?? 1) * mult;
      }
    }

    // Apply news effects + volatility noise to stock prices
    for (const sym of Object.keys(draft.stocks)) {
      const stock = draft.stocks[sym];
      const newsMultiplier = effects[sym] ?? 1;
      const noise = 1 + (rng() - 0.5) * stock.volatility;
      const newPrice = Math.max(0.01, stock.price * newsMultiplier * noise);

      const open = stock.price;
      const close = newPrice;
      const high = Math.max(open, close) * (1 + rng() * 0.02);
      const low = Math.min(open, close) * (1 - rng() * 0.02);

      stock.previousPrice = stock.price;
      stock.price = Math.round(newPrice * 100) / 100;
      stock.priceHistory.push({
        day: draft.currentDay,
        open: Math.round(open * 100) / 100,
        high: Math.round(high * 100) / 100,
        low: Math.round(low * 100) / 100,
        close: Math.round(close * 100) / 100,
      });
    }

    // Process positions: funding + liquidation
    const liquidatedIds: string[] = [];
    const fundingRate = FUTURES_CONFIG.fundingRatePerDay;

    for (const [posId, pos] of Object.entries(draft.positions)) {
      if (pos.isLiquidated) continue;

      const currentPrice = draft.stocks[pos.symbol].price;

      // Funding rate
      const fundingCost = pos.size * fundingRate;
      pos.margin = Math.max(0, pos.margin - fundingCost);
      pos.fundingPaid += fundingCost;
      draft.stats.totalFundingPaid += fundingCost;

      // Unrealized PnL
      if (pos.direction === 'long') {
        pos.unrealizedPnl = ((currentPrice - pos.entryPrice) / pos.entryPrice) * pos.size;
      } else {
        pos.unrealizedPnl = ((pos.entryPrice - currentPrice) / pos.entryPrice) * pos.size;
      }

      // Liquidation check
      const isLiquidated =
        (pos.direction === 'long' && currentPrice <= pos.liquidationPrice) ||
        (pos.direction === 'short' && currentPrice >= pos.liquidationPrice) ||
        pos.margin <= 0;

      if (isLiquidated) {
        pos.isLiquidated = true;
        liquidatedIds.push(posId);
        draft.stats.totalLiquidations++;
      }
    }

    draft.liquidatedThisTurn = liquidatedIds;

    for (const posId of liquidatedIds) {
      delete draft.positions[posId];
    }

    // Update daily news
    draft.dailyNews = nextDayNews;

    // Stats: peak value, drawdown
    const totalValue = draft.cash + Object.values(draft.positions).reduce((sum: number, p: FuturesPosition) => {
      return sum + Math.max(0, p.margin + p.unrealizedPnl);
    }, 0);
    draft.history.push({ day: draft.currentDay, totalValue, cashValue: draft.cash });

    if (totalValue > draft.stats.peakTotalValue) {
      draft.stats.peakTotalValue = totalValue;
    }
    const drawdown = draft.stats.peakTotalValue > 0
      ? (draft.stats.peakTotalValue - totalValue) / draft.stats.peakTotalValue
      : 0;
    if (drawdown > draft.stats.worstDrawdown) {
      draft.stats.worstDrawdown = drawdown;
    }

    // Advance day
    draft.currentDay += 1;
    draft.prngState += 1;

    if (draft.currentDay > draft.maxDays) {
      draft.gamePhase = 'gameover';
    }
  }),

  readNews: (newsId) => set((state) => {
    const dailyIdx = state.dailyNews.findIndex(n => n.id === newsId);
    if (dailyIdx !== -1) {
      state.dailyNews[dailyIdx].read = true;
    }
    const allIdx = state.allNews.findIndex(n => n.id === newsId);
    if (allIdx !== -1) {
      state.allNews[allIdx].read = true;
    }
  }),

  toggleNewsExpanded: (newsId) => set((state) => {
    const idx = state.expandedNews.indexOf(newsId);
    if (idx !== -1) {
      state.expandedNews.splice(idx, 1);
    } else {
      state.expandedNews.push(newsId);
    }
  }),

  resetGame: () => set((state) => {
    const seed = Date.now();
    const rng = mulberry32(seed);

    const initializedStocks: Record<string, Stock> = {};
    Object.keys(FUTURES_STOCKS).forEach(symbol => {
      initializedStocks[symbol] = { ...FUTURES_STOCKS[symbol], priceHistory: [] };
    });

    Object.keys(initializedStocks).forEach(symbol => {
      const stock = initializedStocks[symbol];
      let currentSimPrice = stock.price * 0.8;
      const history = [];
      for (let i = -19; i <= 0; i++) {
        const noise = 1 + (rng() - 0.5) * stock.volatility;
        const openPrice = currentSimPrice;
        const closePrice = openPrice * noise;
        const wickScale = 0.4;
        const highPrice = Math.max(openPrice, closePrice) * (1 + rng() * stock.volatility * wickScale);
        const lowPrice = Math.min(openPrice, closePrice) * (1 - rng() * stock.volatility * wickScale);

        history.push({ day: i, open: openPrice, close: closePrice, high: highPrice, low: lowPrice });
        currentSimPrice = closePrice;
      }
      stock.price = currentSimPrice;
      stock.previousPrice = currentSimPrice;
      stock.priceHistory = history;
    });

    // Select random arc for new game
    // Import is not available here, so use fallback news
    const freshNews: News[] = FUTURES_FALLBACK_NEWS.map(n => ({ ...n, read: false }));
    const day1News = freshNews.filter(n => n.dayIdx === 1);

    state.positions = {};
    state.cash = FUTURES_CONFIG.startingCash;
    state.currentDay = 1;
    state.maxDays = FUTURES_CONFIG.maxDays;
    state.stocks = initializedStocks;
    state.allNews = freshNews;
    state.dailyNews = day1News;
    state.history = [];
    state.seed = seed;
    state.prngState = seed;
    state.gamePhase = 'playing';
    state.stats = {
      totalPositionsOpened: 0,
      totalLiquidations: 0,
      totalFundingPaid: 0,
      peakTotalValue: FUTURES_CONFIG.startingCash,
      worstDrawdown: 0,
    };
    state.expandedNews = [];
    state.liquidatedThisTurn = [];
    state.arcName = null;
  }),
})));
