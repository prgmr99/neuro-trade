import { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import { useShallow } from 'zustand/shallow';
import { TrendingUp, AlertTriangle, CandlestickChart, LineChart, ChevronUp, ChevronDown, Share2 } from 'lucide-react';
import { useFuturesStore } from '../../store/futuresStore';
import { useTranslation } from '../../i18n/translations';
import { FUTURES_STOCKS, FUTURES_CONFIG, FUTURES_LEVERAGE_OPTIONS } from '../../data/futures';
import { CLASSIC_ARCS } from '../../data/classic';
import { selectClassicArc } from '../../data/classic-arcs';
import StockChart, { type StockChartOverlay } from '../StockChart/StockChart';
import type { FuturesPosition } from '../../types';
import { FuturesHeader } from './FuturesHeader';
import { FuturesStatsBar } from './FuturesStatsBar';
import { StockRow } from './StockRow';
import { useDisplayPrice, useIsAnimatingPrices, useLiveCandle } from '../../hooks/useDisplayPrice';
import { runNextDayAnimated } from '../../lib/nextDayOrchestrator';
import { formatFuturesResult } from '../../lib/shareText';
import { RollingNumber } from '../common/RollingNumber/RollingNumber';

type ChartType = 'candle' | 'line';

interface FuturesModeProps {
  onBack: () => void;
}

interface Toast {
  id: number;
  message: string;
}

interface TradeState {
  selectedSymbol: string | null;
  setSelectedSymbol: (s: string | null) => void;
  direction: 'long' | 'short';
  setDirection: (d: 'long' | 'short') => void;
  leverage: typeof FUTURES_LEVERAGE_OPTIONS[number];
  setLeverage: (l: typeof FUTURES_LEVERAGE_OPTIONS[number]) => void;
  marginInput: string;
  setMarginInput: (m: string) => void;
  errorMsg: string;
  setErrorMsg: (e: string) => void;
  chartType: ChartType;
  setChartType: (c: ChartType) => void;
}

// ── useIsDesktop hook ──────────────────────────────────────────────────────────
function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
  );
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);
  return isDesktop;
}

function getDangerLevel(lv: number): string {
  if (lv >= 75) return 'extreme';
  if (lv >= 25) return 'high';
  return 'normal';
}

// ── StockList ──────────────────────────────────────────────────────────────────
function StockList({ trade, compact = false }: { trade: TradeState; compact?: boolean }) {
  // Subscribe only to symbol keys — prevents re-render on price changes of
  // other symbols. `useShallow` does shallow-array equality on the keys.
  const symbols = useFuturesStore(useShallow(s => Object.keys(s.stocks)));

  return (
    <ul className={`stock-list${compact ? ' compact' : ''}`} role="list">
      {symbols.map(sym => {
        const isSelected = trade.selectedSymbol === sym;
        return (
          <li key={sym}>
            <StockRow
              symbol={sym}
              isSelected={isSelected}
              compact={compact}
              onClick={() => {
                trade.setSelectedSymbol(isSelected && !compact ? null : sym);
                trade.setErrorMsg('');
              }}
            />
          </li>
        );
      })}
    </ul>
  );
}

// ── TradePanel (shared) ────────────────────────────────────────────────────────
function TradePanel({
  trade,
  onOpenPosition,
  canOpenPosition,
  inline = false,
}: {
  trade: TradeState;
  onOpenPosition: () => void;
  canOpenPosition: boolean;
  inline?: boolean;
}) {
  const { t } = useTranslation();
  const stocks = useFuturesStore(s => s.stocks);
  const cash = useFuturesStore(s => s.cash);
  const positions = useFuturesStore(s => s.positions);

  const { selectedSymbol, direction, setDirection, leverage, setLeverage, marginInput, setMarginInput, errorMsg, setErrorMsg, chartType, setChartType } = trade;
  const selectedStock = selectedSymbol ? stocks[selectedSymbol] : null;
  // Always-defined hook call (safe when selectedSymbol is null — returns 0 fallback).
  const displayPrice = useDisplayPrice(selectedSymbol ?? '');
  const isAnimating = useIsAnimatingPrices();
  const liveCandle = useLiveCandle(selectedSymbol);

  // Leverage-warning panel flash: fire a one-shot animation when user picks
  // extreme leverage (>=100x). Tracks prev leverage with a ref so it doesn't
  // flash on initial render or on every re-render from the tween.
  const [leverageWarn, setLeverageWarn] = useState(false);
  const prevLeverageRef = useRef(leverage);
  const leverageWarnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (prevLeverageRef.current !== leverage && leverage >= 100) {
      setLeverageWarn(true);
      if (leverageWarnTimerRef.current) clearTimeout(leverageWarnTimerRef.current);
      leverageWarnTimerRef.current = setTimeout(() => setLeverageWarn(false), 500);
    }
    prevLeverageRef.current = leverage;
    return () => {
      if (leverageWarnTimerRef.current) clearTimeout(leverageWarnTimerRef.current);
    };
  }, [leverage]);

  // Chart overlays: entry + liquidation reference lines for any open position
  // on the selected symbol (long and/or short). Computed from committed store
  // state so lines don't jitter during the price tween.
  const overlays = useMemo<StockChartOverlay[]>(() => {
    if (!selectedSymbol) return [];
    const out: StockChartOverlay[] = [];
    for (const dir of ['long', 'short'] as const) {
      const pos = positions[`${selectedSymbol}-${dir}`];
      if (pos) {
        out.push({
          value: pos.entryPrice,
          label: t(dir === 'long' ? 'futures.chartEntryLong' : 'futures.chartEntryShort'),
          kind: 'entry',
          direction: dir,
        });
        out.push({
          value: pos.liquidationPrice,
          label: t('futures.chartLiq'),
          kind: 'liq',
          direction: dir,
        });
      }
    }
    return out;
  }, [positions, selectedSymbol, t]);
  const marginNum = parseFloat(marginInput) || 0;
  const size = marginNum * leverage;

  // NOTE: liqPrice preview uses the committed price (not displayPrice) so the
  // preview matches what openPosition will actually commit at.
  const liqPrice = selectedStock && marginNum > 0
    ? (direction === 'long'
        ? selectedStock.price * (1 - (1 / leverage) * 0.9)
        : selectedStock.price * (1 + (1 / leverage) * 0.9))
    : null;

  const handlePreset = (pct: number) => {
    const amount = pct === 1 ? cash : Math.floor(cash * pct);
    setMarginInput(amount.toFixed(2));
  };

  if (!selectedStock) {
    return (
      <div className="trade-panel trade-panel-empty">
        <TrendingUp size={32} />
        <p>{t('futures.noStockSelected')}</p>
      </div>
    );
  }

  return (
    <div
      className={`trade-panel${inline ? ' inline' : ''}`}
      data-leverage-warning={leverageWarn ? 'true' : undefined}
    >
      {/* Chart */}
      <div className="futures-chart-area">
        <div className="futures-chart-header">
          <div className="futures-chart-title">
            <span className="stock-item-symbol">{selectedStock.symbol}</span>
            <span className="futures-chart-price">${displayPrice.toFixed(2)}</span>
          </div>
          <div className="futures-chart-toggle">
            <button
              className={`chart-type-btn${chartType === 'candle' ? ' active' : ''}`}
              onClick={() => setChartType('candle')}
              aria-label={t('futures.chart.candle')}
            >
              <CandlestickChart size={14} />
            </button>
            <button
              className={`chart-type-btn${chartType === 'line' ? ' active' : ''}`}
              onClick={() => setChartType('line')}
              aria-label={t('futures.chart.line')}
            >
              <LineChart size={14} />
            </button>
          </div>
        </div>
        <StockChart data={selectedStock.priceHistory} chartType={chartType} overlays={overlays} liveCandle={liveCandle} />
        {isAnimating && (
          <div className="futures-live-price-badge" aria-live="polite">
            <span className="badge-dot" aria-hidden="true" />
            ${displayPrice.toFixed(2)}
          </div>
        )}
      </div>

      {/* Direction + Leverage */}
      <div className="trade-row-compact">
        <button
          className={`dir-chip long${direction === 'long' ? ' active' : ''}`}
          onClick={() => setDirection('long')}
        >
          {t('futures.long')}
        </button>
        <button
          className={`dir-chip short${direction === 'short' ? ' active' : ''}`}
          onClick={() => setDirection('short')}
        >
          {t('futures.short')}
        </button>
        <span className="trade-row-divider" />
        {FUTURES_LEVERAGE_OPTIONS.map(lv => (
          <button
            key={lv}
            className={`lev-chip${leverage === lv ? ' active' : ''}`}
            data-danger={getDangerLevel(lv)}
            onClick={() => setLeverage(lv)}
          >
            {lv}x
          </button>
        ))}
      </div>

      {/* Margin input + presets */}
      <div className="trade-margin-row">
        <input
          type="number"
          inputMode="decimal"
          className="margin-input-compact"
          aria-label={t('futures.margin')}
          value={marginInput}
          onChange={e => { setMarginInput(e.target.value); setErrorMsg(''); }}
          placeholder={`${t('futures.margin')} ($)`}
          min="0"
          max={cash}
        />
        <button className="margin-chip" onClick={() => handlePreset(0.25)}>25%</button>
        <button className="margin-chip" onClick={() => handlePreset(0.50)}>50%</button>
        <button className="margin-chip" onClick={() => handlePreset(1)}>MAX</button>
      </div>

      {/* Calc info */}
      {marginNum > 0 && (
        <div className="trade-calc-line">
          <span>{t('futures.size')}: <strong>${size.toLocaleString()}</strong></span>
          {liqPrice !== null && (
            <span>{t('futures.liquidationPrice')}: <strong className="negative">${liqPrice.toFixed(2)}</strong></span>
          )}
        </div>
      )}

      {/* Liquidation distance bar — shows how far committed price is from the
          computed liq price as a color-graded bar (safe/warn/danger). */}
      {marginNum > 0 && liqPrice !== null && (() => {
        const currentPrice = selectedStock.price;
        const liqDistPct = direction === 'long'
          ? ((currentPrice - liqPrice) / currentPrice) * 100
          : ((liqPrice - currentPrice) / currentPrice) * 100;
        const fillWidth = Math.max(4, Math.min(100, liqDistPct * 4));
        const safetyLevel: 'safe' | 'warn' | 'danger' =
          liqDistPct < 5 ? 'danger' : liqDistPct < 15 ? 'warn' : 'safe';
        return (
          <div
            className="liq-distance-bar"
            role="img"
            aria-label={`${liqDistPct.toFixed(1)}% to liquidation`}
          >
            <div className="liq-bar-track">
              <div
                className="liq-bar-fill"
                style={{ width: `${fillWidth}%` } as React.CSSProperties}
                data-safety={safetyLevel}
              />
            </div>
            <div className="liq-bar-labels">
              <span>{t('futures.liqDistanceShort')}</span>
              <strong className={safetyLevel === 'danger' ? 'negative' : ''}>
                {liqDistPct.toFixed(2)}%
              </strong>
            </div>
          </div>
        );
      })()}

      {/* Warnings */}
      {leverage >= 50 && (
        <div className={`lev-warn ${getDangerLevel(leverage)}`}>
          {leverage >= 125 ? t('futures.leverageWarning125x')
            : leverage >= 100 ? t('futures.leverageWarning100x')
            : leverage >= 75 ? t('futures.leverageWarning75x')
            : t('futures.leverageWarning50x')}
        </div>
      )}
      {positions[`${selectedSymbol}-${direction}`] && (
        <div className="lev-warn normal">{t('futures.positionExists')}</div>
      )}
      {errorMsg && <div className="trade-error">{errorMsg}</div>}

      {/* Inline open-position button for desktop */}
      {inline && (
        <>
          <button
            className={`futures-bottom-btn open-position-btn ${direction}`}
            onClick={onOpenPosition}
            disabled={!canOpenPosition || isAnimating}
          >
            {direction === 'long' ? t('futures.openLong') : t('futures.openShort')}
          </button>
          {isAnimating && (
            <div className="futures-animating-hint" aria-live="polite">
              {t('futures.priceUpdating')}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ── PositionCard ───────────────────────────────────────────────────────────────
// Per-position card. Subscribes to display price for `pos.symbol` so the
// current-price readout, live PnL, and liq-distance all tick during the
// Phase 2 Next-Day animation. Once the tween resolves `useDisplayPrice`
// falls back to the committed `stocks[symbol].price`.
function PositionCard({ pos }: { pos: FuturesPosition }) {
  const { t } = useTranslation();
  const closePosition = useFuturesStore(s => s.closePosition);
  const displayPrice = useDisplayPrice(pos.symbol);
  const currentPrice = displayPrice || pos.entryPrice;

  // Live PnL derived from the tween price (falls back to committed once the
  // animation resolves). After liquidation the position is deleted from the
  // store before this card re-renders, so we don't need to guard for that.
  const livePnl = pos.direction === 'long'
    ? ((currentPrice - pos.entryPrice) / pos.entryPrice) * pos.size
    : ((pos.entryPrice - currentPrice) / pos.entryPrice) * pos.size;

  const liqDist = pos.direction === 'long'
    ? ((currentPrice - pos.liquidationPrice) / currentPrice) * 100
    : ((pos.liquidationPrice - currentPrice) / currentPrice) * 100;
  const liqDistClass = liqDist < 2 ? 'danger' : liqDist < 5 ? 'warning' : 'safe';

  // Two-tap close confirmation — protects accidental taps at 125x. First click
  // arms the button (red, shows realized-PnL preview); second click within 3s
  // actually closes the position.
  const [confirming, setConfirming] = useState(false);
  const [closing, setClosing] = useState(false);
  const confirmTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const handleCloseClick = () => {
    if (confirming) {
      if (confirmTimerRef.current) {
        clearTimeout(confirmTimerRef.current);
        confirmTimerRef.current = null;
      }
      // Play slide-out animation before the store removes the position.
      // Path-crossing liquidations bypass this path entirely (store deletes
      // the position directly, card unmounts without `closing`).
      setClosing(true);
      closeTimerRef.current = setTimeout(() => {
        closePosition(pos.id);
      }, 220);
      return;
    }
    setConfirming(true);
    if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
    confirmTimerRef.current = setTimeout(() => {
      setConfirming(false);
      confirmTimerRef.current = null;
    }, 3000);
  };

  const pnlPreview = `${livePnl >= 0 ? '+' : '-'}$${Math.abs(livePnl).toFixed(2)}`;

  return (
    <div className={`position-card${closing ? ' closing' : ''}`} data-liq-state={liqDistClass === 'danger' ? 'danger' : 'normal'}>
      <div className="position-header">
        <span className={`direction-badge direction-${pos.direction}`}>
          {pos.direction === 'long' ? t('futures.long') : t('futures.short')}
        </span>
        <span className="leverage-badge">{pos.leverage}x</span>
        <span className="position-symbol">{pos.symbol}</span>
        <RollingNumber
          className={`position-pnl ${livePnl >= 0 ? 'positive' : 'negative'}`}
          value={livePnl}
          decimals={2}
          prefix={livePnl >= 0 ? '+$' : '$'}
        />
      </div>

      <div className="position-row">
        <span>{t('futures.entryPrice')}: ${pos.entryPrice.toFixed(2)} → ${currentPrice.toFixed(2)}</span>
      </div>

      <div className={`position-row liq-row${liqDistClass === 'danger' ? ' danger' : ''}`}>
        <span>{t('futures.liquidationPrice')}: ${pos.liquidationPrice.toFixed(2)}</span>
        <span className={`liq-distance ${liqDistClass}`}>
          {liqDistClass === 'danger' && <AlertTriangle size={12} />}
          {liqDist.toFixed(1)}%
        </span>
      </div>

      {liqDistClass === 'danger' && (
        <div className="liq-danger-banner">
          <AlertTriangle size={14} />
          {t('futures.liqDanger')}
        </div>
      )}

      <div className="position-row position-row-meta">
        <span>{t('futures.margin')}: ${pos.margin.toFixed(2)} · {t('futures.size')}: ${pos.size.toFixed(0)}</span>
        <span className="funding-paid">−${pos.fundingPaid.toFixed(2)}</span>
      </div>

      <button
        className={`close-btn${confirming ? ' confirming' : ''}`}
        onClick={handleCloseClick}
        aria-pressed={confirming}
        disabled={closing}
      >
        {confirming
          ? t('futures.closeConfirm', { pnl: pnlPreview })
          : t('futures.closePosition')}
      </button>
    </div>
  );
}

// ── PositionsList ──────────────────────────────────────────────────────────────
function PositionsList() {
  const { t } = useTranslation();
  const positions = useFuturesStore(s => s.positions);
  const positionList = Object.values(positions);

  if (positionList.length === 0) {
    return <div className="empty-state">{t('futures.emptyPositions')}</div>;
  }

  return (
    <div className="futures-positions-tab">
      {positionList.map(pos => (
        <PositionCard key={pos.id} pos={pos} />
      ))}
    </div>
  );
}

// ── NewsList ───────────────────────────────────────────────────────────────────
function NewsList() {
  const { t, language } = useTranslation();
  const dailyNews = useFuturesStore(s => s.dailyNews);
  const expandedNews = useFuturesStore(s => s.expandedNews);
  const toggleNewsExpanded = useFuturesStore(s => s.toggleNewsExpanded);
  const readNews = useFuturesStore(s => s.readNews);

  if (dailyNews.length === 0) {
    return <div className="empty-state">{t('futures.emptyNews')}</div>;
  }

  return (
    <div className="futures-news-tab">
      {dailyNews.map(item => {
        const isExpanded = expandedNews.includes(item.id);
        const handleClick = () => {
          toggleNewsExpanded(item.id);
          if (!item.read) readNews(item.id);
        };
        return (
          <div className={`news-item${item.read ? ' read' : ''}`} key={item.id}>
            <button
              type="button"
              className="news-item-header"
              onClick={handleClick}
              aria-expanded={isExpanded}
            >
              <span className={`news-item-title${!item.read ? ' unread' : ''}`}>
                {item.title[language]}
              </span>
              <div className="news-item-meta">
                {!item.read && <span className="news-unread-dot" aria-label={t('futures.unreadLabel')} />}
                <span className="news-chevron">{isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</span>
              </div>
            </button>
            {isExpanded && (
              <div className="news-item-content">
                {item.content[language]}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Mobile Market tab (list with inline trade panel) ───────────────────────────
function MobileMarketTab({ trade }: { trade: TradeState }) {
  const { t } = useTranslation();
  const symbols = useFuturesStore(useShallow(s => Object.keys(s.stocks)));
  const cash = useFuturesStore(s => s.cash);
  const positions = useFuturesStore(s => s.positions);
  // We still need committed stocks[symbol] for `priceHistory` + `liqPrice` calc,
  // but only for the currently selected symbol.
  const selectedStock = useFuturesStore(s =>
    trade.selectedSymbol ? s.stocks[trade.selectedSymbol] : null
  );

  const { selectedSymbol, setSelectedSymbol, direction, setDirection, leverage, setLeverage, marginInput, setMarginInput, errorMsg, setErrorMsg, chartType, setChartType } = trade;
  const selectedDisplayPrice = useDisplayPrice(selectedSymbol ?? '');
  const isAnimatingMobile = useIsAnimatingPrices();
  const liveCandle = useLiveCandle(selectedSymbol);

  // Leverage-warning flash (same semantics as desktop TradePanel).
  const [leverageWarn, setLeverageWarn] = useState(false);
  const prevLeverageRef = useRef(leverage);
  const leverageWarnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (prevLeverageRef.current !== leverage && leverage >= 100) {
      setLeverageWarn(true);
      if (leverageWarnTimerRef.current) clearTimeout(leverageWarnTimerRef.current);
      leverageWarnTimerRef.current = setTimeout(() => setLeverageWarn(false), 500);
    }
    prevLeverageRef.current = leverage;
    return () => {
      if (leverageWarnTimerRef.current) clearTimeout(leverageWarnTimerRef.current);
    };
  }, [leverage]);

  const marginNum = parseFloat(marginInput) || 0;
  const size = marginNum * leverage;

  const handlePreset = (pct: number) => {
    const amount = pct === 1 ? cash : Math.floor(cash * pct);
    setMarginInput(amount.toFixed(2));
  };

  // liqPrice preview based on committed price — matches what openPosition will commit.
  const liqPrice = selectedStock && marginNum > 0
    ? (direction === 'long'
        ? selectedStock.price * (1 - (1 / leverage) * 0.9)
        : selectedStock.price * (1 + (1 / leverage) * 0.9))
    : null;

  return (
    <div className="futures-market-tab">
      {symbols.map(sym => {
        const isSelected = selectedSymbol === sym;
        return (
          <div key={sym}>
            <StockRow
              symbol={sym}
              isSelected={isSelected}
              onClick={() => {
                setSelectedSymbol(isSelected ? null : sym);
                setErrorMsg('');
              }}
            />

            {isSelected && selectedStock && (
              <div
                className="trade-panel"
                data-leverage-warning={leverageWarn ? 'true' : undefined}
              >
                <div className="futures-chart-area">
                  <div className="futures-chart-header">
                    <div className="futures-chart-title">
                      <span className="stock-item-symbol">{selectedStock.symbol}</span>
                      <span className="futures-chart-price">${selectedDisplayPrice.toFixed(2)}</span>
                    </div>
                    <div className="futures-chart-toggle">
                      <button
                        className={`chart-type-btn${chartType === 'candle' ? ' active' : ''}`}
                        onClick={() => setChartType('candle')}
                        aria-label={t('futures.chart.candle')}
                      >
                        <CandlestickChart size={14} />
                      </button>
                      <button
                        className={`chart-type-btn${chartType === 'line' ? ' active' : ''}`}
                        onClick={() => setChartType('line')}
                        aria-label={t('futures.chart.line')}
                      >
                        <LineChart size={14} />
                      </button>
                    </div>
                  </div>
                  <StockChart data={selectedStock.priceHistory} chartType={chartType} liveCandle={liveCandle} />
                  {isAnimatingMobile && (
                    <div className="futures-live-price-badge" aria-live="polite">
                      <span className="badge-dot" aria-hidden="true" />
                      ${selectedDisplayPrice.toFixed(2)}
                    </div>
                  )}
                </div>

                <div className="trade-row-compact">
                  <button
                    className={`dir-chip long${direction === 'long' ? ' active' : ''}`}
                    onClick={() => setDirection('long')}
                  >
                    {t('futures.long')}
                  </button>
                  <button
                    className={`dir-chip short${direction === 'short' ? ' active' : ''}`}
                    onClick={() => setDirection('short')}
                  >
                    {t('futures.short')}
                  </button>
                  <span className="trade-row-divider" />
                  {FUTURES_LEVERAGE_OPTIONS.map(lv => (
                    <button
                      key={lv}
                      className={`lev-chip${leverage === lv ? ' active' : ''}`}
                      data-danger={getDangerLevel(lv)}
                      onClick={() => setLeverage(lv)}
                    >
                      {lv}x
                    </button>
                  ))}
                </div>

                <div className="trade-margin-row">
                  <input
                    type="number"
                    inputMode="decimal"
                    className="margin-input-compact"
                    aria-label={t('futures.margin')}
                    value={marginInput}
                    onChange={e => { setMarginInput(e.target.value); setErrorMsg(''); }}
                    placeholder={`${t('futures.margin')} ($)`}
                    min="0"
                    max={cash}
                  />
                  <button className="margin-chip" onClick={() => handlePreset(0.25)}>25%</button>
                  <button className="margin-chip" onClick={() => handlePreset(0.50)}>50%</button>
                  <button className="margin-chip" onClick={() => handlePreset(1)}>MAX</button>
                </div>

                {marginNum > 0 && (
                  <div className="trade-calc-line">
                    <span>{t('futures.size')}: <strong>${size.toLocaleString()}</strong></span>
                    {liqPrice !== null && (
                      <span>{t('futures.liquidationPrice')}: <strong className="negative">${liqPrice.toFixed(2)}</strong></span>
                    )}
                  </div>
                )}

                {marginNum > 0 && liqPrice !== null && (() => {
                  const currentPrice = selectedStock.price;
                  const liqDistPct = direction === 'long'
                    ? ((currentPrice - liqPrice) / currentPrice) * 100
                    : ((liqPrice - currentPrice) / currentPrice) * 100;
                  const fillWidth = Math.max(4, Math.min(100, liqDistPct * 4));
                  const safetyLevel: 'safe' | 'warn' | 'danger' =
                    liqDistPct < 5 ? 'danger' : liqDistPct < 15 ? 'warn' : 'safe';
                  return (
                    <div
                      className="liq-distance-bar"
                      role="img"
                      aria-label={`${liqDistPct.toFixed(1)}% to liquidation`}
                    >
                      <div className="liq-bar-track">
                        <div
                          className="liq-bar-fill"
                          style={{ width: `${fillWidth}%` } as React.CSSProperties}
                          data-safety={safetyLevel}
                        />
                      </div>
                      <div className="liq-bar-labels">
                        <span>{t('futures.liqDistanceShort')}</span>
                        <strong className={safetyLevel === 'danger' ? 'negative' : ''}>
                          {liqDistPct.toFixed(2)}%
                        </strong>
                      </div>
                    </div>
                  );
                })()}

                {leverage >= 50 && (
                  <div className={`lev-warn ${getDangerLevel(leverage)}`}>
                    {leverage >= 125 ? t('futures.leverageWarning125x')
                      : leverage >= 100 ? t('futures.leverageWarning100x')
                      : leverage >= 75 ? t('futures.leverageWarning75x')
                      : t('futures.leverageWarning50x')}
                  </div>
                )}
                {positions[`${selectedSymbol}-${direction}`] && (
                  <div className="lev-warn normal">{t('futures.positionExists')}</div>
                )}
                {errorMsg && <div className="trade-error">{errorMsg}</div>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── GameOverScreen ─────────────────────────────────────────────────────────────
function GameOverScreen({ onBack, onRetry }: { onBack: () => void; onRetry: () => void }) {
  const { t, language } = useTranslation();
  const cash = useFuturesStore(s => s.cash);
  const positions = useFuturesStore(s => s.positions);
  const stats = useFuturesStore(s => s.stats);
  const [shareCopied, setShareCopied] = useState(false);

  const posValues = Object.values(positions).reduce((sum, p) => sum + Math.max(0, p.margin + p.unrealizedPnl), 0);
  const finalValue = cash + posValues;
  const returnPct = ((finalValue - FUTURES_CONFIG.startingCash) / FUTURES_CONFIG.startingCash) * 100;

  // Tier for visual accents (shake on total wipe, glow on legend-tier runs).
  const tier: 'legend' | 'profit' | 'loss' | 'liquidated' =
    returnPct >= 50 ? 'legend'
    : returnPct >= 0 ? 'profit'
    : returnPct > -90 ? 'loss'
    : 'liquidated';

  const subtitleKey = tier === 'legend' ? 'futures.gameOver.subtitleLegend'
    : tier === 'profit' ? 'futures.gameOver.subtitleProfit'
    : tier === 'loss' ? 'futures.gameOver.subtitleLoss'
    : 'futures.gameOver.subtitleLiquidated';

  const handleShare = async () => {
    const text = formatFuturesResult({
      returnPct,
      finalValue,
      startingCash: FUTURES_CONFIG.startingCash,
      liquidations: stats.totalLiquidations,
      drawdown: stats.worstDrawdown,
      language,
    });
    if (navigator.share) {
      try { await navigator.share({ text }); } catch { /* user canceled */ }
    } else {
      await navigator.clipboard.writeText(text);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  return (
    <div className="futures-gameover" data-tier={tier}>
      <div className="gameover-title-area">
        <h2>{t('futures.gameOver.title')}</h2>
        <p className="gameover-subtitle">{t(subtitleKey)}</p>
      </div>

      <div className="gameover-result">
        <div className={`result-value ${returnPct >= 0 ? 'positive' : 'negative'}`}>
          {returnPct >= 0 ? '+' : ''}{returnPct.toFixed(1)}%
        </div>
        <div className="result-subtitle">
          ${finalValue.toFixed(2)} / ${FUTURES_CONFIG.startingCash.toLocaleString()}
        </div>
      </div>

      <div className="gameover-stats">
        <div className="stat-row">
          <span className="stat-label">{t('futures.gameOver.liquidationCount')}</span>
          <span className="stat-value">{stats.totalLiquidations}</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">{t('futures.gameOver.fundingCost')}</span>
          <span className="stat-value negative">-${stats.totalFundingPaid.toFixed(2)}</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">{t('futures.gameOver.peakValue')}</span>
          <span className="stat-value">${stats.peakTotalValue.toFixed(2)}</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">{t('futures.gameOver.maxDrawdown')}</span>
          <span className="stat-value negative">-{(stats.worstDrawdown * 100).toFixed(1)}%</span>
        </div>
      </div>

      <details className="educational-section">
        <summary>{t('futures.gameOver.educationalTitle')}</summary>
        <ul>
          <li>{t('futures.gameOver.fact1')}</li>
          <li>{t('futures.gameOver.fact2')}</li>
          <li>{t('futures.gameOver.fact3')}</li>
          <li>{t('futures.gameOver.fact4')}</li>
          <li>{t('futures.gameOver.fact5')}</li>
        </ul>
      </details>

      <div className="gameover-actions">
        <button className="gameover-share-btn" onClick={handleShare}>
          <Share2 size={18} />
          {shareCopied ? t('futures.gameOver.shareCopied') : t('futures.gameOver.share')}
        </button>
        <div className="gameover-actions-row">
          <button className="gameover-retry-btn" onClick={onRetry}>{t('futures.gameOver.retry')}</button>
          <button className="gameover-classic-btn" onClick={onBack}>{t('futures.gameOver.goClassic')}</button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function FuturesMode({ onBack }: FuturesModeProps) {
  const { t, language } = useTranslation();
  const isDesktop = useIsDesktop();

  const currentDay = useFuturesStore(s => s.currentDay);
  const maxDays = useFuturesStore(s => s.maxDays);
  const cash = useFuturesStore(s => s.cash);
  const positions = useFuturesStore(s => s.positions);
  const dailyNews = useFuturesStore(s => s.dailyNews);
  const gamePhase = useFuturesStore(s => s.gamePhase);
  const liquidatedThisTurn = useFuturesStore(s => s.liquidatedThisTurn);
  const arcName = useFuturesStore(s => s.arcName);
  const openPosition = useFuturesStore(s => s.openPosition);
  const setInitialState = useFuturesStore(s => s.setInitialState);
  const isAnimating = useIsAnimatingPrices();

  const [activeTab, setActiveTab] = useState<'market' | 'positions' | 'news'>('market');
  const tabMarketRef = useRef<HTMLButtonElement | null>(null);
  const tabPositionsRef = useRef<HTMLButtonElement | null>(null);
  const tabNewsRef = useRef<HTMLButtonElement | null>(null);
  const [tabIndicator, setTabIndicator] = useState<{ left: number; width: number } | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [liqFlash, setLiqFlash] = useState(false);
  const liqFlashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastIdRef = useRef(0);
  const prevLiquidated = useRef<string[]>([]);

  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [direction, setDirection] = useState<'long' | 'short'>('long');
  const [leverage, setLeverage] = useState<typeof FUTURES_LEVERAGE_OPTIONS[number]>(10);
  const [marginInput, setMarginInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [chartType, setChartType] = useState<ChartType>('candle');

  const trade: TradeState = {
    selectedSymbol, setSelectedSymbol,
    direction, setDirection,
    leverage, setLeverage,
    marginInput, setMarginInput,
    errorMsg, setErrorMsg,
    chartType, setChartType,
  };

  const marginNum = parseFloat(marginInput) || 0;

  // On mobile: clear selection when switching tabs. On desktop: keep selection.
  useEffect(() => {
    if (!isDesktop && activeTab !== 'market') {
      setSelectedSymbol(null);
    }
  }, [activeTab, isDesktop]);

  // Clear stale selection on layout swap (mobile ↔ desktop)
  useEffect(() => {
    setSelectedSymbol(null);
  }, [isDesktop]);

  // Initialize on mount
  useEffect(() => {
    const seed = Date.now();
    const arc = selectClassicArc(CLASSIC_ARCS, seed);
    setInitialState(
      FUTURES_STOCKS,
      arc.news.map(n => ({ ...n, read: false })),
      FUTURES_CONFIG.maxDays,
      FUTURES_CONFIG.startingCash,
      seed,
      arc.name[language],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setInitialState]);

  // Liquidation toasts + screen flash. Same effect because both react to the
  // exact same `liquidatedThisTurn` diff and must not double-fire.
  useEffect(() => {
    const newLiqs = liquidatedThisTurn.filter(id => !prevLiquidated.current.includes(id));
    if (newLiqs.length === 0) return;
    prevLiquidated.current = [...liquidatedThisTurn];

    // Trigger a brief full-screen danger flash when any new liquidation hits.
    setLiqFlash(true);
    if (liqFlashTimerRef.current) clearTimeout(liqFlashTimerRef.current);
    liqFlashTimerRef.current = setTimeout(() => {
      setLiqFlash(false);
      liqFlashTimerRef.current = null;
    }, 400);

    const timers: ReturnType<typeof setTimeout>[] = [];
    newLiqs.forEach(id => {
      const symbol = id.split('-')[0];
      const toastId = ++toastIdRef.current;
      setToasts(prev => [...prev, { id: toastId, message: `${symbol} ${t('futures.liquidated')} — ${t('futures.marginLost')}` }]);
      const timer = setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== toastId));
      }, 3000);
      timers.push(timer);
    });
    return () => { timers.forEach(clearTimeout); };
  }, [liquidatedThisTurn, t]);

  // Clean up liqFlash timer on unmount.
  useEffect(() => {
    return () => {
      if (liqFlashTimerRef.current) clearTimeout(liqFlashTimerRef.current);
    };
  }, []);

  // Tab indicator position: measure the active tab's offsetLeft/Width so the
  // underline can spring-slide between tabs. Only matters on mobile layout.
  const getTabRef = (tab: 'market' | 'positions' | 'news'): HTMLButtonElement | null =>
    tab === 'market' ? tabMarketRef.current
    : tab === 'positions' ? tabPositionsRef.current
    : tabNewsRef.current;

  useLayoutEffect(() => {
    if (isDesktop) return;
    const el = getTabRef(activeTab);
    if (el) setTabIndicator({ left: el.offsetLeft, width: el.offsetWidth });
  }, [activeTab, isDesktop]);

  useEffect(() => {
    if (isDesktop) return;
    const el = getTabRef(activeTab);
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setTabIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    });
    ro.observe(el);
    if (el.parentElement) ro.observe(el.parentElement);
    return () => ro.disconnect();
  }, [activeTab, isDesktop]);

  const positionCount = Object.keys(positions).length;
  const unreadCount = useMemo(() => dailyNews.filter(n => !n.read).length, [dailyNews]);

  const handleNextDay = () => {
    if (isAnimating) return;
    if (!isDesktop) setSelectedSymbol(null);
    // Fire-and-forget: orchestrator commits nextDay() and animates prices.
    void runNextDayAnimated();
  };

  const handleOpenPosition = () => {
    if (!selectedSymbol) return;
    const posId = `${selectedSymbol}-${direction}`;
    if (positions[posId]) {
      setErrorMsg(t('futures.positionExists'));
      return;
    }
    const success = openPosition(selectedSymbol, direction, leverage, marginNum);
    if (!success) {
      setErrorMsg(t('futures.marginCall'));
    } else {
      setErrorMsg('');
      setMarginInput('');
      if (!isDesktop) setSelectedSymbol(null);
    }
  };

  const handleRetry = () => {
    const seed = Date.now();
    const arc = selectClassicArc(CLASSIC_ARCS, seed);
    setInitialState(
      FUTURES_STOCKS,
      arc.news.map(n => ({ ...n, read: false })),
      FUTURES_CONFIG.maxDays,
      FUTURES_CONFIG.startingCash,
      seed,
      arc.name[language],
    );
    setActiveTab('market');
    setSelectedSymbol(null);
    prevLiquidated.current = [];
  };

  const isTrading = activeTab === 'market' && selectedSymbol !== null;
  const canOpenPosition = selectedSymbol !== null && marginNum > 0 && marginNum <= cash && !positions[`${selectedSymbol}-${direction}`];

  if (gamePhase === 'gameover') {
    return (
      <div className="futures-mode">
        <FuturesHeader
          onBack={onBack}
          arcName={arcName}
          gamePhase={gamePhase}
          currentDay={currentDay}
          maxDays={maxDays}
        />
        <div className="futures-content futures-content-gameover">
          <GameOverScreen onBack={onBack} onRetry={handleRetry} />
        </div>
        <div className="toast-container" role="status" aria-live="polite">
          {toasts.map(toast => (
            <div key={toast.id} className="liquidation-toast">
              <span aria-hidden="true">⚡</span> {toast.message}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Desktop Layout ─────────────────────────────────────────────────────────
  if (isDesktop) {
    return (
      <div className="futures-mode futures-mode-desktop">
        <FuturesHeader
          onBack={onBack}
          arcName={arcName}
          gamePhase={gamePhase}
          currentDay={currentDay}
          maxDays={maxDays}
        />
        <FuturesStatsBar isDesktop={isDesktop} />
        <main className="futures-desktop-grid">
          {/* Left: Market list */}
          <aside className="futures-desktop-left">
            <div className="futures-panel-heading">
              <span>{t('futures.tabs.market')}</span>
            </div>
            <div className="futures-desktop-scroll">
              <StockList trade={trade} compact />
            </div>
          </aside>

          {/* Center: Chart + Trade */}
          <section className="futures-desktop-center">
            <TradePanel
              trade={trade}
              onOpenPosition={handleOpenPosition}
              canOpenPosition={canOpenPosition}
              inline
            />
          </section>

          {/* Right: Positions + News */}
          <aside className="futures-desktop-right">
            <div className="futures-panel-heading">
              <span>{t('futures.openPositions')}</span>
              {positionCount > 0 && <span className="badge">{positionCount}</span>}
            </div>
            <div className="futures-desktop-scroll futures-desktop-scroll-flex">
              <PositionsList />
            </div>
            <div className="futures-panel-heading futures-panel-heading-divider">
              <span>{t('futures.marketNews')}</span>
              {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
            </div>
            <div className="futures-desktop-scroll futures-desktop-scroll-flex">
              <NewsList />
            </div>
            <div className="futures-desktop-right-footer">
              <button
                className="futures-bottom-btn futures-next-day-btn"
                style={{ '--day-fill': `${(currentDay / maxDays) * 100}%` } as React.CSSProperties}
                data-animating={isAnimating || undefined}
                data-final={currentDay === maxDays ? 'true' : undefined}
                onClick={handleNextDay}
                disabled={isAnimating}
              >
                <span className="next-day-label">
                  {currentDay === maxDays ? t('futures.finalDay') : t('futures.nextDay')}
                </span>
                <span className="next-day-progress">{currentDay}/{maxDays}</span>
              </button>
            </div>
          </aside>
        </main>

        <div className="toast-container" role="status" aria-live="polite">
          {toasts.map(toast => (
            <div key={toast.id} className="liquidation-toast">
              <span aria-hidden="true">⚡</span> {toast.message}
            </div>
          ))}
        </div>

        {liqFlash && <div className="liq-screen-flash" aria-hidden="true" />}
      </div>
    );
  }

  // ── Mobile Layout ──────────────────────────────────────────────────────────
  return (
    <div className="futures-mode">
      <FuturesHeader
        onBack={onBack}
        arcName={arcName}
        gamePhase={gamePhase}
        currentDay={currentDay}
        maxDays={maxDays}
      />
      <FuturesStatsBar isDesktop={isDesktop} />

      <nav className="futures-tabs" role="tablist">
        <button
          ref={tabMarketRef}
          role="tab"
          id="tab-market"
          aria-selected={activeTab === 'market'}
          className={activeTab === 'market' ? 'active' : ''}
          onClick={() => setActiveTab('market')}
        >
          {t('futures.tabs.market')}
        </button>
        <button
          ref={tabPositionsRef}
          role="tab"
          id="tab-positions"
          aria-selected={activeTab === 'positions'}
          className={activeTab === 'positions' ? 'active' : ''}
          onClick={() => setActiveTab('positions')}
        >
          {t('futures.tabs.positions')}
          {positionCount > 0 && <span className="badge">{positionCount}</span>}
        </button>
        <button
          ref={tabNewsRef}
          role="tab"
          id="tab-news"
          aria-selected={activeTab === 'news'}
          className={activeTab === 'news' ? 'active' : ''}
          onClick={() => setActiveTab('news')}
        >
          {t('futures.tabs.news')}
          {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
        </button>
        {tabIndicator && (
          <div
            className="tab-indicator"
            style={{ left: tabIndicator.left, width: tabIndicator.width } as React.CSSProperties}
            aria-hidden="true"
          />
        )}
      </nav>

      <main className="futures-content">
        <div role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
          {activeTab === 'market' && <MobileMarketTab trade={trade} />}
          {activeTab === 'positions' && <PositionsList />}
          {activeTab === 'news' && <NewsList />}
        </div>
      </main>

      <div className="futures-bottom">
        {isTrading ? (
          <button
            className={`futures-bottom-btn open-position-btn ${direction}`}
            onClick={handleOpenPosition}
            disabled={!canOpenPosition || isAnimating}
          >
            {direction === 'long' ? t('futures.openLong') : t('futures.openShort')}
          </button>
        ) : (
          <button
            className="futures-bottom-btn futures-next-day-btn"
            style={{ '--day-fill': `${(currentDay / maxDays) * 100}%` } as React.CSSProperties}
            data-animating={isAnimating || undefined}
            data-final={currentDay === maxDays ? 'true' : undefined}
            onClick={handleNextDay}
            disabled={isAnimating}
          >
            <span className="next-day-label">
              {currentDay === maxDays ? t('futures.finalDay') : t('futures.nextDay')}
            </span>
            <span className="next-day-progress">{currentDay}/{maxDays}</span>
          </button>
        )}
      </div>

      <div className="toast-container" role="status" aria-live="polite">
        {toasts.map(toast => (
          <div key={toast.id} className="liquidation-toast">
            <span aria-hidden="true">⚡</span> {toast.message}
          </div>
        ))}
      </div>

      {liqFlash && <div className="liq-screen-flash" aria-hidden="true" />}
    </div>
  );
}
