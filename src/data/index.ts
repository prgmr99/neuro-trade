import { News, Stock, StockSymbol } from '../types';
import { CLASSIC_STOCKS, CLASSIC_NEWS } from './classic';
import { ADVANCED_STOCKS } from './advanced/stocks';
import { ADVANCED_NEWS } from './advanced/news';
export { selectAdvancedArcs, ADVANCED_ARCS } from './advanced/news';
export type { AdvancedScenarioArc } from './advanced/news';
export { CLASSIC_ARCS } from './classic';
export { selectClassicArc, selectArcFromChain, buildPhaseNews, CLASSIC_CHAINS } from './classic-arcs';
export type { ArcChain } from './classic-arcs';

export type GameMode = 'classic' | 'advanced';

export interface ScenarioConfig {
  stocks: Record<StockSymbol, Stock>;
  news: News[];
  maxDays: number;
  startingCash: number;
  preApplyRatio?: number; // 0-1: fraction of news effects applied when news appears (선반영)
  marketGravity?: number; // 0-1: mean reversion strength — counters net market drift each day
  effectScale?: number; // 0-1: scales down all news effect magnitudes (1.08 * 0.3 → 1.024)
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
    maxDays: 10,
    startingCash: 50000,
    preApplyRatio: 0.25, // 25% of news effects pre-priced — more surprise on price moves
    marketGravity: 0.20, // light mean reversion — allows trends to develop
    effectScale: 0.50, // news effects at 50% — amplified volatility
  },
};

// Backward compatibility
export { CLASSIC_STOCKS as INITIAL_STOCKS, CLASSIC_NEWS as SCENARIO_NEWS };
