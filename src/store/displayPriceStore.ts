import { create } from 'zustand';
import type { DayPrice } from '../types';

/**
 * DisplayPriceStore — visual-only price state for Futures mode tick animation.
 *
 * This store is INTENTIONALLY decoupled from `futuresStore`:
 *  - Game logic (openPosition/closePosition/liquidation) reads only committed
 *    `futuresStore.stocks[sym].price`.
 *  - Display prices are used strictly by UI components via `useDisplayPrice(sym)`.
 *  - When the tween completes `reset()` is called, clearing `prices` and
 *    `liveCandles`. UI then falls back to committed prices / priceHistory
 *    automatically.
 *
 * `liveCandles` hold an in-progress OHLC candle per symbol during the tween so
 * the chart can render a "growing" candle at the right edge. Populated only
 * while `isAnimating` is true; cleared on `reset()`.
 *
 * Uses vanilla Zustand (no immer) — tick hot path must avoid draft cloning cost.
 */
interface DisplayPriceStoreState {
  prices: Record<string, number>;
  liveCandles: Record<string, DayPrice>;
  isAnimating: boolean;
  setPrices: (prices: Record<string, number>) => void;
  setLiveCandles: (candles: Record<string, DayPrice>) => void;
  patchPrice: (symbol: string, price: number) => void;
  setAnimating: (v: boolean) => void;
  reset: () => void;
}

export const useDisplayPriceStore = create<DisplayPriceStoreState>()((set) => ({
  prices: {},
  liveCandles: {},
  isAnimating: false,
  setPrices: (prices) => set({ prices }),
  setLiveCandles: (liveCandles) => set({ liveCandles }),
  patchPrice: (symbol, price) =>
    set((state) => ({ prices: { ...state.prices, [symbol]: price } })),
  setAnimating: (v) => set({ isAnimating: v }),
  reset: () => set({ prices: {}, liveCandles: {}, isAnimating: false }),
}));
