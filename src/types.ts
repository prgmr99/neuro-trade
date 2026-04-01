export type StockSymbol = string;
export type LocalizedString = Record<'en' | 'ko', string>;

export interface DayPrice {
  day: number;
  open: number;
  close: number;
  high: number;
  low: number;
}

export interface Stock {
  symbol: StockSymbol;
  name: LocalizedString;
  price: number;
  previousPrice: number;
  priceHistory: DayPrice[];
  volatility: number;
  description: LocalizedString;
  resilience?: number; // 0-1, dampens negative news effects (institutional accumulation)
}

export interface News {
  id: string;
  dayIdx: number;
  title: LocalizedString;
  content: LocalizedString;
  read: boolean;
  effect: Record<StockSymbol, number>; // How this news influences stock prices (multiplier: e.g. 1.05 for +5%)
  prePriced?: boolean; // Headline sentiment doesn't match actual effect (advanced mode)
  whipsaw?: { nextDayEffect: Record<StockSymbol, number> }; // Reversal effect applied next day
  isBridgeNews?: boolean; // Transition context between arc phases (no price effect)
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

export interface RankingEntry {
  id: string;
  player_name: string;
  message: string;
  return_pct: number;
  final_value: number;
  initial_value: number;
  mode: string;
  created_at: string;
}
