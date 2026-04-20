import React, { useMemo } from 'react';
import { useFuturesStore } from '../../store/futuresStore';
import { useTranslation } from '../../i18n/translations';

interface FuturesStatsBarProps {
  isDesktop: boolean;
}

/**
 * Memoized stats bar. Subscribes to `cash` and `positions` only — not `stocks`.
 *
 * NOTE (phase2): unrealizedPnl is read from `positions[id].unrealizedPnl`, which
 * is committed only at `nextDay()`. During the tween animation the StatsBar
 * value is therefore frozen. Phase 2 will expose a display-price-based PnL
 * selector (likely throttled) so the total-equity figure ticks live.
 * TODO(phase2): integrate useDisplayPrice for live PnL in StatsBar.
 */
export const FuturesStatsBar = React.memo(function FuturesStatsBar({
  isDesktop,
}: FuturesStatsBarProps) {
  const { t } = useTranslation();
  const cash = useFuturesStore((s) => s.cash);
  const positions = useFuturesStore((s) => s.positions);

  const { totalPnl, posEquity } = useMemo(() => {
    const posList = Object.values(positions);
    return {
      totalPnl: posList.reduce((sum, p) => sum + p.unrealizedPnl, 0),
      posEquity: posList.reduce((sum, p) => sum + Math.max(0, p.margin + p.unrealizedPnl), 0),
    };
  }, [positions]);

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
