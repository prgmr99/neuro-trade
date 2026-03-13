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
    
    state.dayState.dailyNews.forEach(news => {
      Object.entries(news.effect).forEach(([symbol, multiplier]) => {
        if (newStocks[symbol]) {
          newStocks[symbol] = { ...newStocks[symbol] }; // clone stock object
          newStocks[symbol].previousPrice = newStocks[symbol].price;
          
          // Apply effect + some basic random noise based on volatility
          const baseChange = multiplier; 
          const noise = 1 + (Math.random() - 0.5) * newStocks[symbol].volatility;
          const openPrice = newStocks[symbol].price;
          const closePrice = Math.max(0.01, openPrice * baseChange * noise);
          
          // Generate realistic high/low for candlestick
          const highPrice = Math.max(openPrice, closePrice) * (1 + Math.random() * newStocks[symbol].volatility);
          const lowPrice = Math.min(openPrice, closePrice) * (1 - Math.random() * newStocks[symbol].volatility);

          newStocks[symbol].price = closePrice;
          
          newStocks[symbol].priceHistory = [
            ...newStocks[symbol].priceHistory,
            {
              day: state.dayState.currentDay,
              open: openPrice,
              close: closePrice,
              high: highPrice,
              low: lowPrice,
            }
          ];
        }
      });
    });

    // Handle stocks that didn't have news effects (flat day with noise)
    Object.keys(newStocks).forEach(symbol => {
      if (state.dayState.dailyNews.every(news => !news.effect[symbol])) {
         newStocks[symbol] = { ...newStocks[symbol] };
         const stock = newStocks[symbol];
         const openPrice = stock.price;
         const noise = 1 + (Math.random() - 0.5) * stock.volatility * 0.5; // less volatility on no news
         const closePrice = Math.max(0.01, openPrice * noise);
         
         const highPrice = Math.max(openPrice, closePrice) * (1 + Math.random() * stock.volatility * 0.2);
         const lowPrice = Math.min(openPrice, closePrice) * (1 - Math.random() * stock.volatility * 0.2);

         stock.previousPrice = openPrice;
         stock.price = closePrice;
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
      }
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
