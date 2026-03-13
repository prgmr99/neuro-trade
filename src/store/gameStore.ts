import { create } from 'zustand';
import { DayState, News, Portfolio, Stock, StockSymbol } from '../types';

interface GameState {
  portfolio: Portfolio;
  dayState: DayState;
  allNews: News[];
  stocks: Record<StockSymbol, Stock>;
  history: { day: number; portfolioValue: number }[]; // Track history for charts
  
  // Actions
  buyStock: (symbol: StockSymbol, quantity: number) => void;
  sellStock: (symbol: StockSymbol, quantity: number) => void;
  readNews: (newsId: string) => void;
  nextDay: () => void;
  setInitialState: (stocks: Record<StockSymbol, Stock>, news: News[], maxDays: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  portfolio: {
    cash: 10000, // Initial cash
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

  nextDay: () => set((state) => {
    // 1. Calculate new stock prices based on current day's news effects + random volatility
    const newStocks = { ...state.stocks };
    const affectedStocks = new Set<string>();
    
    // First, snapshot previousPrice for all stocks at the start of the day
    Object.keys(newStocks).forEach(symbol => {
      newStocks[symbol] = { ...newStocks[symbol] }; // clone
      newStocks[symbol].previousPrice = newStocks[symbol].price;
    });

    // Accumulate the effects sequentially
    state.dayState.dailyNews.forEach(news => {
      Object.entries(news.effect).forEach(([symbol, multiplier]) => {
        if (newStocks[symbol]) {
          affectedStocks.add(symbol);
          const baseChange = multiplier; 
          const noise = 1 + (Math.random() - 0.5) * newStocks[symbol].volatility;
          newStocks[symbol].price = Math.max(0.01, newStocks[symbol].price * baseChange * noise);
        }
      });
    });

    // Add noise to unaffected stocks, and generate chart data for ALL
    Object.keys(newStocks).forEach(symbol => {
      const stock = newStocks[symbol];
      const openPrice = stock.previousPrice;
      
      if (!affectedStocks.has(symbol)) {
        const noise = 1 + (Math.random() - 0.5) * stock.volatility * 0.5; // less volatility on no news
        stock.price = Math.max(0.01, stock.price * noise);
      }
      
      const closePrice = stock.price;
      const volMultiplier = affectedStocks.has(symbol) ? 1 : 0.2;
      
      const highPrice = Math.max(openPrice, closePrice) * (1 + Math.random() * stock.volatility * volMultiplier);
      const lowPrice = Math.min(openPrice, closePrice) * (1 - Math.random() * stock.volatility * volMultiplier);

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

    return {
      stocks: newStocks,
      dayState: {
        ...state.dayState,
        currentDay: nextDayNum,
        dailyNews: state.allNews.filter(n => n.dayIdx === nextDayNum),
      },
      history: [...state.history, { day: nextDayNum, portfolioValue }],
    };
  }),

  setInitialState: (stocks, news, maxDays) => {
    // Generate some fake past history so Day 1 has a chart (e.g. Day -5 to Day 0)
    const initializedStocks = { ...stocks };
    Object.keys(initializedStocks).forEach(symbol => {
      const stock = initializedStocks[symbol];
      let currentSimPrice = stock.price * 0.8; // Start lower in the past randomly
      const history = [];
      for (let i = -5; i <= 0; i++) {
        const noise = 1 + (Math.random() - 0.5) * stock.volatility;
        const openPrice = currentSimPrice;
        const closePrice = openPrice * noise;
        const highPrice = Math.max(openPrice, closePrice) * (1 + Math.random() * stock.volatility);
        const lowPrice = Math.min(openPrice, closePrice) * (1 - Math.random() * stock.volatility);
        
        history.push({
          day: i,
          open: openPrice,
          close: closePrice,
          high: highPrice,
          low: lowPrice,
        });
        currentSimPrice = closePrice;
      }
      stock.price = currentSimPrice; // set to current simulated
      stock.previousPrice = history[history.length - 2]?.close || currentSimPrice;
      stock.priceHistory = history;
    });

    set({
      stocks: initializedStocks,
      allNews: news,
      dayState: {
        currentDay: 1,
        maxDays,
        dailyNews: news.filter(n => n.dayIdx === 1), // Load day 1 news
      },
      // Keep initial history and portfolio
    });
  },
}));
