import { create } from 'zustand';

/**
 * DisplayPriceStore — visual-only price state for Futures mode tick animation.
 *
 * This store is INTENTIONALLY decoupled from `futuresStore`:
 *  - Game logic (openPosition/closePosition/liquidation) reads only committed
 *    `futuresStore.stocks[sym].price`.
 *  - Display prices are used strictly by UI components via `useDisplayPrice(sym)`.
 *  - When the tween completes `reset()` is called, clearing `prices`. UI then
 *    falls back to committed prices automatically.
 *
 * Uses vanilla Zustand (no immer) — tick hot path must avoid draft cloning cost.
 */
interface DisplayPriceStoreState {
  prices: Record<string, number>;
  isAnimating: boolean;
  setPrices: (prices: Record<string, number>) => void;
  patchPrice: (symbol: string, price: number) => void;
  setAnimating: (v: boolean) => void;
  reset: () => void;
}

export const useDisplayPriceStore = create<DisplayPriceStoreState>()((set) => ({
  prices: {},
  isAnimating: false,
  setPrices: (prices) => set({ prices }),
  patchPrice: (symbol, price) =>
    set((state) => ({ prices: { ...state.prices, [symbol]: price } })),
  setAnimating: (v) => set({ isAnimating: v }),
  reset: () => set({ prices: {}, isAnimating: false }),
}));
