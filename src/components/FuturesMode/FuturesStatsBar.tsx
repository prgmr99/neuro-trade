import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFuturesStore } from '../../store/futuresStore';
import { useDisplayPriceStore } from '../../store/displayPriceStore';
import { useTranslation } from '../../i18n/translations';

interface FuturesStatsBarProps {
  isDesktop: boolean;
}

type TickDir = 'up' | 'down' | null;

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

  const isAnimating = useDisplayPriceStore((s) => s.isAnimating);

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

  // Committed PnL — depends only on committed store state (positions +
  // stocks), so it changes once per Next-Day commit rather than every tween
  // frame. That's what we want to drive the tick flash.
  const committedPnl = useMemo(() => {
    let pnl = 0;
    for (const p of Object.values(positions)) {
      const price = stocks[p.symbol]?.price ?? p.entryPrice;
      const livePnl = p.direction === 'long'
        ? ((price - p.entryPrice) / p.entryPrice) * p.size
        : ((p.entryPrice - price) / p.entryPrice) * p.size;
      pnl += livePnl;
    }
    return pnl;
  }, [positions, stocks]);

  const prevCommittedPnlRef = useRef<number | null>(null);
  const [tick, setTick] = useState<TickDir>(null);
  const [tickId, setTickId] = useState(0);
  const tickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Skip flashing while the tween is still running — we want a single flash
    // at the moment the committed price settles, not noise during the sweep.
    if (isAnimating) return;
    const prev = prevCommittedPnlRef.current;
    prevCommittedPnlRef.current = committedPnl;
    if (prev === null) return; // first render: no baseline to compare
    const delta = committedPnl - prev;
    if (Math.abs(delta) < 0.01) return;
    setTick(delta > 0 ? 'up' : 'down');
    setTickId((id) => id + 1);
    if (tickTimerRef.current) clearTimeout(tickTimerRef.current);
    tickTimerRef.current = setTimeout(() => {
      setTick(null);
      tickTimerRef.current = null;
    }, 650);
  }, [committedPnl, isAnimating]);

  useEffect(() => () => {
    if (tickTimerRef.current) clearTimeout(tickTimerRef.current);
  }, []);

  const totalEquity = cash + posEquity;

  return (
    <div className="futures-stats-bar">
      <div className="stat-item">
        <span className="stat-label">{t('futures.availableCash')}</span>
        <strong className="stat-value">${cash.toFixed(2)}</strong>
      </div>
      <div className="stat-item">
        <span className="stat-label">{t('futures.unrealizedPnl')}</span>
        <strong
          key={tick ? tickId : 'idle'}
          className={`stat-value ${totalPnl >= 0 ? 'positive' : 'negative'}`}
          data-tick={tick ?? undefined}
        >
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
