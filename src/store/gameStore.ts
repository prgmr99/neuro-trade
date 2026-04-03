import { create } from 'zustand';
import { DayState, LocalizedString, News, Portfolio, Stock, StockSymbol } from '../types';
import { mulberry32 } from '../lib/prng';

interface GameState {
  portfolio: Portfolio;
  dayState: DayState;
  allNews: News[];
  stocks: Record<StockSymbol, Stock>;
  history: { day: number; portfolioValue: number }[];
  seed: number;
  prngState: number;
  arcName: LocalizedString | null;
  preApplyRatio: number; // 0-1: fraction of news effects pre-applied when news appears
  marketGravity: number; // 0-1: mean reversion strength
  effectScale: number; // 0-1: scales news effect magnitudes

  expandedNews: string[];

  // Actions
  buyStock: (symbol: StockSymbol, quantity: number) => void;
  sellStock: (symbol: StockSymbol, quantity: number) => void;
  readNews: (newsId: string) => void;
  toggleNewsExpanded: (newsId: string) => void;
  nextDay: () => void;
  setInitialState: (stocks: Record<StockSymbol, Stock>, news: News[], maxDays: number, startingCash?: number, seed?: number, arcName?: LocalizedString | null, preApplyRatio?: number, marketGravity?: number, effectScale?: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  portfolio: {
    cash: 10000,
    holdings: {},
  },
  dayState: {
    currentDay: 1,
    maxDays: 5,
    dailyNews: [],
  },
  allNews: [],
  stocks: {},
  history: [{ day: 1, portfolioValue: 10000 }],
  seed: 0,
  prngState: 0,
  arcName: null,
  preApplyRatio: 0,
  marketGravity: 0,
  effectScale: 1,
  expandedNews: [],

  buyStock: (symbol, quantity) => set((state) => {
    if (quantity <= 0) return state;
    const stock = state.stocks[symbol];
    const totalCost = stock.price * quantity;
    
    if (state.portfolio.cash < totalCost) return state; // Deduct money logic check

    const holding = state.portfolio.holdings[symbol] || { symbol, quantity: 0, averagePrice: 0 };
    const newQuantity = holding.quantity + quantity;
    const newAveragePrice = ((holding.quantity * holding.averagePrice) + totalCost) / newQuantity;

    return {
      portfolio: {
        ...state.portfolio,
        cash: state.portfolio.cash - totalCost,
        holdings: {
          ...state.portfolio.holdings,
          [symbol]: { symbol, quantity: newQuantity, averagePrice: newAveragePrice },
        },
      },
    };
  }),

  sellStock: (symbol, quantity) => set((state) => {
    if (quantity <= 0) return state;
    const holding = state.portfolio.holdings[symbol];
    if (!holding || holding.quantity < quantity) return state;

    const stock = state.stocks[symbol];
    const totalRevenue = stock.price * quantity;
    const newQuantity = holding.quantity - quantity;
    
    const newHoldings = { ...state.portfolio.holdings };
    if (newQuantity === 0) {
      delete newHoldings[symbol];
    } else {
      newHoldings[symbol] = { ...holding, quantity: newQuantity };
    }

    return {
      portfolio: {
        ...state.portfolio,
        cash: state.portfolio.cash + totalRevenue,
        holdings: newHoldings,
      },
    };
  }),

  readNews: (newsId) => set((state) => ({
    dayState: {
      ...state.dayState,
      dailyNews: state.dayState.dailyNews.map((n) =>
        n.id === newsId ? { ...n, read: true } : n
      ),
    },
  })),

  toggleNewsExpanded: (newsId) => set((state) => ({
    expandedNews: state.expandedNews.includes(newsId)
      ? state.expandedNews.filter(id => id !== newsId)
      : [...state.expandedNews, newsId],
  })),

  nextDay: () => set((state) => {
    // Create PRNG from stored state for deterministic sequence
    const rng = mulberry32(state.prngState + state.dayState.currentDay * 1000);

    // 1. Calculate new stock prices based on current day's news effects + random volatility
    const newStocks = { ...state.stocks };
    const affectedStocks = new Set<string>();

    // First, snapshot previousPrice for all stocks at the start of the day
    Object.keys(newStocks).forEach(symbol => {
      newStocks[symbol] = { ...newStocks[symbol], priceHistory: [...newStocks[symbol].priceHistory] };
      newStocks[symbol].previousPrice = newStocks[symbol].price;
    });

    // Apply whipsaw effects from today's news (reversal fires during this transition)
    // IMPORTANT: Only call rng() inside the whipsaw guard to preserve classic mode PRNG sequence
    // Whipsaw uses 5x effectScale — traps should hurt significantly more than normal moves
    const whipsawScale = Math.min(1, state.effectScale * 5);
    state.dayState.dailyNews.forEach(news => {
      if (news.whipsaw) {
        Object.entries(news.whipsaw.nextDayEffect).forEach(([symbol, multiplier]) => {
          if (newStocks[symbol]) {
            affectedStocks.add(symbol);
            const scaledMult = 1 + (multiplier - 1) * whipsawScale;
            const noise = 1 + (rng() - 0.5) * newStocks[symbol].volatility;
            newStocks[symbol].price = Math.max(0.01, newStocks[symbol].price * scaledMult * noise);
          }
        });
      }
    });

    // Accumulate the effects sequentially (with resilience dampening for negative effects)
    // effectScale shrinks magnitudes; remainingRatio applies only what wasn't pre-applied
    const scale = state.effectScale;
    const remainingRatio = 1 - state.preApplyRatio;
    state.dayState.dailyNews.forEach(news => {
      Object.entries(news.effect).forEach(([symbol, multiplier]) => {
        if (newStocks[symbol]) {
          affectedStocks.add(symbol);
          // 1.08 * scale=0.3 → 1.024, * remaining=0.2 → 1.0048
          let baseChange = 1 + (multiplier - 1) * scale * remainingRatio;
          // Resilience dampens negative effects: institutional buyers absorb selling pressure
          const resilience = newStocks[symbol].resilience ?? 0;
          if (baseChange < 1 && resilience > 0) {
            baseChange = 1 + (baseChange - 1) * (1 - resilience);
          }
          const noise = 1 + (rng() - 0.5) * newStocks[symbol].volatility;
          newStocks[symbol].price = Math.max(0.01, newStocks[symbol].price * baseChange * noise);
        }
      });
    });

    // Add noise to unaffected stocks
    Object.keys(newStocks).forEach(symbol => {
      if (!affectedStocks.has(symbol)) {
        const noise = 1 + (rng() - 0.5) * newStocks[symbol].volatility * 0.5;
        newStocks[symbol].price = Math.max(0.01, newStocks[symbol].price * noise);
      }
    });

    // Market gravity: mean reversion counters net market drift
    if (state.marketGravity > 0) {
      const symbols = Object.keys(newStocks);
      const avgChange = symbols.reduce((sum, s) =>
        sum + newStocks[s].price / newStocks[s].previousPrice, 0) / symbols.length;
      // If market moved net positive, pull all stocks back; if negative, push up slightly
      const drift = avgChange - 1; // e.g. +0.05 means market up 5%
      const gravityForce = 1 - drift * state.marketGravity;
      symbols.forEach(symbol => {
        newStocks[symbol].price = Math.max(0.01, newStocks[symbol].price * gravityForce);
      });
    }

    // Generate chart data for ALL stocks
    Object.keys(newStocks).forEach(symbol => {
      const stock = newStocks[symbol];
      const openPrice = stock.previousPrice;
      const closePrice = stock.price;
      const volMultiplier = affectedStocks.has(symbol) ? 1 : 0.2;

      const wickScale = 0.4; // Limit wick length to 40% of volatility for realistic candles
      const highPrice = Math.max(openPrice, closePrice) * (1 + rng() * stock.volatility * volMultiplier * wickScale);
      const lowPrice = Math.min(openPrice, closePrice) * (1 - rng() * stock.volatility * volMultiplier * wickScale);

      stock.priceHistory = [
        ...stock.priceHistory,
        {
          day: state.dayState.currentDay,
          open: openPrice,
          close: closePrice,
          high: highPrice,
          low: lowPrice,
        }
      ];
    });

    // 2. Advance day
    const nextDayNum = state.dayState.currentDay + 1;

    // 3. Calculate portfolio value for history
    let portfolioValue = state.portfolio.cash;
    Object.values(state.portfolio.holdings).forEach(h => {
      portfolioValue += h.quantity * newStocks[h.symbol].price;
    });

    const nextDayNews = state.allNews.filter(n => n.dayIdx === nextDayNum);

    // Pre-apply next day's news effects so prices already reflect the news when shown
    if (state.preApplyRatio > 0) {
      nextDayNews.forEach(news => {
        Object.entries(news.effect).forEach(([symbol, multiplier]) => {
          if (newStocks[symbol]) {
            let preEffect = 1 + (multiplier - 1) * scale * state.preApplyRatio;
            // Apply resilience dampening to pre-applied negative effects too
            const res = newStocks[symbol].resilience ?? 0;
            if (preEffect < 1 && res > 0) {
              preEffect = 1 + (preEffect - 1) * (1 - res);
            }
            newStocks[symbol].price = Math.max(0.01, newStocks[symbol].price * preEffect);
          }
        });
      });
    }

    return {
      stocks: newStocks,
      dayState: {
        ...state.dayState,
        currentDay: nextDayNum,
        dailyNews: nextDayNews,
      },
      history: [...state.history, { day: nextDayNum, portfolioValue }],
      expandedNews: nextDayNews.map(n => n.id),
    };
  }),

  setInitialState: (stocks, news, maxDays, startingCash = 10000, seed?: number, arcName?: LocalizedString | null, preApplyRatio = 0, marketGravity = 0, effectScale = 1) => {
    const gameSeed = seed ?? Date.now();
    const rng = mulberry32(gameSeed);

    // Generate some fake past history so Day 1 has a chart (e.g. Day -5 to Day 0)
    const initializedStocks: Record<string, typeof stocks[string]> = {};
    Object.keys(stocks).forEach(symbol => {
      initializedStocks[symbol] = { ...stocks[symbol] };
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

    // Pre-apply day 1 news effects so prices already reflect the news
    if (preApplyRatio > 0) {
      day1News.forEach(newsItem => {
        Object.entries(newsItem.effect).forEach(([symbol, multiplier]) => {
          if (initializedStocks[symbol]) {
            let preEffect = 1 + (multiplier - 1) * effectScale * preApplyRatio;
            const res = initializedStocks[symbol].resilience ?? 0;
            if (preEffect < 1 && res > 0) {
              preEffect = 1 + (preEffect - 1) * (1 - res);
            }
            initializedStocks[symbol].price = Math.max(0.01, initializedStocks[symbol].price * preEffect);
          }
        });
      });
    }

    set({
      stocks: initializedStocks,
      allNews: news,
      dayState: {
        currentDay: 1,
        maxDays,
        dailyNews: day1News,
      },
      portfolio: {
        cash: startingCash,
        holdings: {},
      },
      history: [{ day: 1, portfolioValue: startingCash }],
      seed: gameSeed,
      prngState: gameSeed,
      arcName: arcName ?? null,
      preApplyRatio,
      marketGravity,
      effectScale,
      expandedNews: day1News.map(n => n.id),
    });
  },
}));
