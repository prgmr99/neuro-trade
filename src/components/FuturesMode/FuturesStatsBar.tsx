import React, { useMemo } from 'react';
import { useFuturesStore } from '../../store/futuresStore';
import { useDisplayPriceStore } from '../../store/displayPriceStore';
import { useTranslation } from '../../i18n/translations';

interface FuturesStatsBarProps {
  isDesktop: boolean;
}

/**
 * Memoized stats bar. Subscribes to `cash`, `positions`, `stocks` (committed)
 * and `displayPriceStore.prices` (tween) so the total-equity / unrealized PnL
 * readouts tick LIVE during the Phase 2 Next-Day animation.
 *
 * Performance note: subscribing to `displayPriceStore.prices` means the bar
 * re-renders on every tween frame (up to ~60fps). The inner loop is O(N) over
 * open positions (typically 0–10) and does no React child work beyond itself.
 * React DevTools Profiler should show no knock-on re-renders of siblings
 * (Header/StockList are memoized with independent selectors). If this becomes
 * a concern the display-price read can be throttled to 100ms — see Phase 3.
 */
export const FuturesStatsBar = React.memo(function FuturesStatsBar({
  isDesktop,
}: FuturesStatsBarProps) {
  const { t } = useTranslation();
  const cash = useFuturesStore((s) => s.cash);
  const positions = useFuturesStore((s) => s.positions);
  const stocks = useFuturesStore((s) => s.stocks);
  const displayPrices = useDisplayPriceStore((s) => s.prices);

  const { totalPnl, posEquity } = useMemo(() => {
    let pnl = 0;
    let equity = 0;
    for (const p of Object.values(positions)) {
      // Prefer display-price (live tween) → committed price → entry fallback.
      const price = displayPrices[p.symbol] ?? stocks[p.symbol]?.price ?? p.entryPrice;
      const livePnl = p.direction === 'long'
        ? ((price - p.entryPrice) / p.entryPrice) * p.size
        : ((p.entryPrice - price) / p.entryPrice) * p.size;
      pnl += livePnl;
      equity += Math.max(0, p.margin + livePnl);
    }
    return { totalPnl: pnl, posEquity: equity };
  }, [positions, stocks, displayPrices]);

  const totalEquity = cash + posEquity;

  return (
    <div className="futures-stats-bar">
      <div className="stat-item">
        <span className="stat-label">{t('futures.availableCash')}</span>
        <strong className="stat-value">${cash.toFixed(2)}</strong>
      </div>
      <div className="stat-item">
        <span className="stat-label">{t('futures.unrealizedPnl')}</span>
        <strong className={`stat-value ${totalPnl >= 0 ? 'positive' : 'negative'}`}>
          {totalPnl >= 0 ? '+' : ''}${totalPnl.toFixed(2)}
        </strong>
      </div>
      {isDesktop && (
        <div className="stat-item">
          <span className="stat-label">{t('futures.totalEquity')}</span>
          <strong className="stat-value">${totalEquity.toFixed(2)}</strong>
        </div>
      )}
    </div>
  );
});
