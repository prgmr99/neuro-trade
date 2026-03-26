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

  expandedNews: string[];

  // Actions
  buyStock: (symbol: StockSymbol, quantity: number) => void;
  sellStock: (symbol: StockSymbol, quantity: number) => void;
  readNews: (newsId: string) => void;
  toggleNewsExpanded: (newsId: string) => void;
  nextDay: () => void;
  setInitialState: (stocks: Record<StockSymbol, Stock>, news: News[], maxDays: number, startingCash?: number, seed?: number, arcName?: LocalizedString | null) => void;
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
      newStocks[symbol] = { ...newStocks[symbol] };
      newStocks[symbol].previousPrice = newStocks[symbol].price;
    });

    // Apply whipsaw effects from today's news (reversal fires during this transition)
    // IMPORTANT: Only call rng() inside the whipsaw guard to preserve classic mode PRNG sequence
    state.dayState.dailyNews.forEach(news => {
      if (news.whipsaw) {
        Object.entries(news.whipsaw.nextDayEffect).forEach(([symbol, multiplier]) => {
          if (newStocks[symbol]) {
            affectedStocks.add(symbol);
            const noise = 1 + (rng() - 0.5) * newStocks[symbol].volatility;
            newStocks[symbol].price = Math.max(0.01, newStocks[symbol].price * multiplier * noise);
          }
        });
      }
    });

    // Accumulate the effects sequentially (with resilience dampening for negative effects)
    state.dayState.dailyNews.forEach(news => {
      Object.entries(news.effect).forEach(([symbol, multiplier]) => {
        if (newStocks[symbol]) {
          affectedStocks.add(symbol);
          // Resilience dampens negative effects: institutional buyers absorb selling pressure
          let baseChange = multiplier;
          const resilience = newStocks[symbol].resilience ?? 0;
          if (baseChange < 1 && resilience > 0) {
            baseChange = 1 + (baseChange - 1) * (1 - resilience);
          }
          const noise = 1 + (rng() - 0.5) * newStocks[symbol].volatility;
          newStocks[symbol].price = Math.max(0.01, newStocks[symbol].price * baseChange * noise);
        }
      });
    });

    // Add noise to unaffected stocks, and generate chart data for ALL
    Object.keys(newStocks).forEach(symbol => {
      const stock = newStocks[symbol];
      const openPrice = stock.previousPrice;

      if (!affectedStocks.has(symbol)) {
        const noise = 1 + (rng() - 0.5) * stock.volatility * 0.5;
        stock.price = Math.max(0.01, stock.price * noise);
      }

      const closePrice = stock.price;
      const volMultiplier = affectedStocks.has(symbol) ? 1 : 0.2;

      const highPrice = Math.max(openPrice, closePrice) * (1 + rng() * stock.volatility * volMultiplier);
      const lowPrice = Math.min(openPrice, closePrice) * (1 - rng() * stock.volatility * volMultiplier);

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

  setInitialState: (stocks, news, maxDays, startingCash = 10000, seed?: number, arcName?: LocalizedString | null) => {
    const gameSeed = seed ?? Date.now();
    const rng = mulberry32(gameSeed);

    // Generate some fake past history so Day 1 has a chart (e.g. Day -5 to Day 0)
    const initializedStocks = { ...stocks };
    Object.keys(initializedStocks).forEach(symbol => {
      const stock = initializedStocks[symbol];
      let currentSimPrice = stock.price * 0.8;
      const history = [];
      for (let i = -5; i <= 0; i++) {
        const noise = 1 + (rng() - 0.5) * stock.volatility;
        const openPrice = currentSimPrice;
        const closePrice = openPrice * noise;
        const highPrice = Math.max(openPrice, closePrice) * (1 + rng() * stock.volatility);
        const lowPrice = Math.min(openPrice, closePrice) * (1 - rng() * stock.volatility);

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
      stock.previousPrice = history[history.length - 2]?.close || currentSimPrice;
      stock.priceHistory = history;
    });

    const day1News = news.filter(n => n.dayIdx === 1);
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
      expandedNews: day1News.map(n => n.id),
    });
  },
}));
