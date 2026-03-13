export type StockSymbol = string;

export interface Stock {
  symbol: StockSymbol;
  name: string;
  price: number;
  previousPrice: number;
  volatility: number; 
  description: string;
}

export interface News {
  id: string;
  dayIdx: number;
  title: string;
  content: string;
  read: boolean;
  effect: Record<StockSymbol, number>; // How this news influences stock prices (multiplier: e.g. 1.05 for +5%)
}

export interface Holding {
  symbol: StockSymbol;
  quantity: number;
  averagePrice: number;
}

export interface Portfolio {
  cash: number;
  holdings: Record<StockSymbol, Holding>;
}

export interface DayState {
  currentDay: number;
  maxDays: number;
  dailyNews: News[];
}
