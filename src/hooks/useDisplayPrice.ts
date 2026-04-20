import { useDisplayPriceStore } from '../store/displayPriceStore';
import { useFuturesStore } from '../store/futuresStore';

/**
 * Returns the current display price for a symbol.
 *
 * Falls back to the committed `futuresStore.stocks[symbol].price` when the
 * display-price store has no entry for the symbol (i.e. while no animation is
 * in progress, or after `reset()` at animation completion).
 *
 * Subscribes to both stores with a primitive-value selector, so components only
 * re-render when THIS symbol's price changes — not every symbol in the system.
 */
export function useDisplayPrice(symbol: string): number {
  const display = useDisplayPriceStore((s) => s.prices[symbol]);
  const committed = useFuturesStore((s) => s.stocks[symbol]?.price ?? 0);
  return display ?? committed;
}

/** Whether a price-tween animation is currently in progress. */
export function useIsAnimatingPrices(): boolean {
  return useDisplayPriceStore((s) => s.isAnimating);
}
