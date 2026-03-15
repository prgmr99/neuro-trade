import { News, Stock, StockSymbol } from '../types';
import { CLASSIC_STOCKS, CLASSIC_NEWS } from './classic';
import { ADVANCED_STOCKS } from './advanced/stocks';
import { ADVANCED_NEWS } from './advanced/news';

export type GameMode = 'classic' | 'advanced';

export interface ScenarioConfig {
  stocks: Record<StockSymbol, Stock>;
  news: News[];
  maxDays: number;
  startingCash: number;
}

export const SCENARIOS: Record<GameMode, ScenarioConfig> = {
  classic: {
    stocks: CLASSIC_STOCKS,
    news: CLASSIC_NEWS,
    maxDays: 5,
    startingCash: 10000,
  },
  advanced: {
    stocks: ADVANCED_STOCKS,
    news: ADVANCED_NEWS,
    maxDays: 30,
    startingCash: 50000,
  },
};

// Backward compatibility
export { CLASSIC_STOCKS as INITIAL_STOCKS, CLASSIC_NEWS as SCENARIO_NEWS };
