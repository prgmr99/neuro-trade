import { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, ChevronLeft, CandlestickChart, LineChart, ChevronUp, ChevronDown } from 'lucide-react';
import { useFuturesStore } from '../../store/futuresStore';
import { useTranslation } from '../../i18n/translations';
import { FUTURES_STOCKS, FUTURES_CONFIG, FUTURES_LEVERAGE_OPTIONS } from '../../data/futures';
import { CLASSIC_ARCS } from '../../data/classic';
import { selectClassicArc } from '../../data/classic-arcs';
import StockChart from '../StockChart/StockChart';
import type { FuturesPosition } from '../../types';

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
  const { language } = useTranslation();
  const { stocks } = useFuturesStore();
  const stockList = Object.values(stocks);

  return (
    <ul className={`stock-list${compact ? ' compact' : ''}`} role="list">
      {stockList.map(stock => {
        const change = stock.price - stock.previousPrice;
        const pctChange = stock.previousPrice > 0 ? (change / stock.previousPrice) * 100 : 0;
        const isUp = change >= 0;
        const isSelected = trade.selectedSymbol === stock.symbol;

        return (
          <li key={stock.symbol}>
            <button
              type="button"
              className={`stock-item${isSelected ? ' selected' : ''}`}
              onClick={() => {
                trade.setSelectedSymbol(isSelected && !compact ? null : stock.symbol);
                trade.setErrorMsg('');
              }}
              aria-pressed={isSelected}
            >
              <div className="stock-item-left">
                <span className="stock-item-symbol">{stock.symbol}</span>
                <span className="stock-item-name">{stock.name[language]}</span>
              </div>
              <div className={`stock-item-right ${isUp ? 'positive' : 'negative'}`}>
                <span className="stock-item-price">${stock.price.toFixed(2)}</span>
                <span className="stock-item-change">
                  {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {isUp ? '+' : ''}{pctChange.toFixed(2)}%
                </span>
              </div>
            </button>
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
  const { stocks, cash, positions } = useFuturesStore();
  const [chartType, setChartType] = useState<ChartType>('candle');

  const { selectedSymbol, direction, setDirection, leverage, setLeverage, marginInput, setMarginInput, errorMsg, setErrorMsg } = trade;
  const selectedStock = selectedSymbol ? stocks[selectedSymbol] : null;
  const marginNum = parseFloat(marginInput) || 0;
  const size = marginNum * leverage;

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
    <div className={`trade-panel${inline ? ' inline' : ''}`}>
      {/* Chart */}
      <div className="futures-chart-area">
        <div className="futures-chart-header">
          <div className="futures-chart-title">
            <span className="stock-item-symbol">{selectedStock.symbol}</span>
            <span className="futures-chart-price">${selectedStock.price.toFixed(2)}</span>
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
        <StockChart data={selectedStock.priceHistory} chartType={chartType} />
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
        <button
          className={`futures-bottom-btn open-position-btn ${direction}`}
          onClick={onOpenPosition}
          disabled={!canOpenPosition}
        >
          {direction === 'long' ? t('futures.openLong') : t('futures.openShort')}
        </button>
      )}
    </div>
  );
}

// ── PositionsList ──────────────────────────────────────────────────────────────
function PositionsList() {
  const { t } = useTranslation();
  const { positions, stocks, closePosition } = useFuturesStore();
  const positionList = Object.values(positions);

  const getLiqDistance = (pos: FuturesPosition): number => {
    const currentPrice = stocks[pos.symbol]?.price ?? pos.entryPrice;
    if (pos.direction === 'long') {
      return ((currentPrice - pos.liquidationPrice) / currentPrice) * 100;
    } else {
      return ((pos.liquidationPrice - currentPrice) / currentPrice) * 100;
    }
  };

  const getLiqDistanceClass = (dist: number): string => {
    if (dist < 2) return 'danger';
    if (dist < 5) return 'warning';
    return 'safe';
  };

  if (positionList.length === 0) {
    return <div className="empty-state">{t('futures.emptyPositions')}</div>;
  }

  return (
    <div className="futures-positions-tab">
      {positionList.map(pos => {
        const currentPrice = stocks[pos.symbol]?.price ?? pos.entryPrice;
        const liqDist = getLiqDistance(pos);
        const liqDistClass = getLiqDistanceClass(liqDist);

        return (
          <div className="position-card" key={pos.id}>
            <div className="position-header">
              <span className={`direction-badge direction-${pos.direction}`}>
                {pos.direction === 'long' ? t('futures.long') : t('futures.short')}
              </span>
              <span className="leverage-badge">{pos.leverage}x</span>
              <span className="position-symbol">{pos.symbol}</span>
              <span className={`position-pnl ${pos.unrealizedPnl >= 0 ? 'positive' : 'negative'}`}>
                {pos.unrealizedPnl >= 0 ? '+' : ''}${pos.unrealizedPnl.toFixed(2)}
              </span>
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

            <button className="close-btn" onClick={() => closePosition(pos.id)}>
              {t('futures.closePosition')}
            </button>
          </div>
        );
      })}
    </div>
  );
}

// ── NewsList ───────────────────────────────────────────────────────────────────
function NewsList() {
  const { t, language } = useTranslation();
  const { dailyNews, expandedNews, toggleNewsExpanded, readNews } = useFuturesStore();

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
  const { t, language } = useTranslation();
  const { stocks, cash, positions } = useFuturesStore();
  const tradePanelRef = useRef<HTMLDivElement>(null);
  const [chartType, setChartType] = useState<ChartType>('candle');

  const { selectedSymbol, setSelectedSymbol, direction, setDirection, leverage, setLeverage, marginInput, setMarginInput, errorMsg, setErrorMsg } = trade;

  useEffect(() => {
    if (selectedSymbol && tradePanelRef.current) {
      setTimeout(() => {
        tradePanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    }
  }, [selectedSymbol]);

  const stockList = Object.values(stocks);
  const marginNum = parseFloat(marginInput) || 0;
  const size = marginNum * leverage;

  const handlePreset = (pct: number) => {
    const amount = pct === 1 ? cash : Math.floor(cash * pct);
    setMarginInput(amount.toFixed(2));
  };

  return (
    <div className="futures-market-tab">
      {stockList.map(stock => {
        const change = stock.price - stock.previousPrice;
        const pctChange = stock.previousPrice > 0 ? (change / stock.previousPrice) * 100 : 0;
        const isUp = change >= 0;
        const isSelected = selectedSymbol === stock.symbol;

        const liqPrice = isSelected && marginNum > 0
          ? (direction === 'long'
              ? stock.price * (1 - (1 / leverage) * 0.9)
              : stock.price * (1 + (1 / leverage) * 0.9))
          : null;

        return (
          <div key={stock.symbol}>
            <button
              type="button"
              className={`stock-item${isSelected ? ' selected' : ''}`}
              onClick={() => {
                setSelectedSymbol(isSelected ? null : stock.symbol);
                setErrorMsg('');
              }}
              aria-pressed={isSelected}
            >
              <div className="stock-item-left">
                <span className="stock-item-symbol">{stock.symbol}</span>
                <span className="stock-item-name">{stock.name[language]}</span>
              </div>
              <div className={`stock-item-right ${isUp ? 'positive' : 'negative'}`}>
                <span className="stock-item-price">${stock.price.toFixed(2)}</span>
                <span className="stock-item-change">
                  {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {isUp ? '+' : ''}{pctChange.toFixed(2)}%
                </span>
              </div>
            </button>

            {isSelected && (
              <div className="trade-panel" ref={tradePanelRef}>
                <div className="futures-chart-area">
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
                  <StockChart data={stock.priceHistory} chartType={chartType} />
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
  const { t } = useTranslation();
  const { cash, positions, stats } = useFuturesStore();

  const posValues = Object.values(positions).reduce((sum, p) => sum + Math.max(0, p.margin + p.unrealizedPnl), 0);
  const finalValue = cash + posValues;
  const returnPct = ((finalValue - FUTURES_CONFIG.startingCash) / FUTURES_CONFIG.startingCash) * 100;

  return (
    <div className="futures-gameover">
      <div className="gameover-title-area">
        <h2>{t('futures.gameOver.title')}</h2>
        <p className="gameover-subtitle">{t('futures.gameOver.subtitle')}</p>
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
        <button className="gameover-retry-btn" onClick={onRetry}>{t('futures.gameOver.retry')}</button>
        <button className="gameover-classic-btn" onClick={onBack}>{t('futures.gameOver.goClassic')}</button>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function FuturesMode({ onBack }: FuturesModeProps) {
  const { t, language } = useTranslation();
  const isDesktop = useIsDesktop();
  const {
    cash,
    currentDay,
    maxDays,
    positions,
    dailyNews,
    gamePhase,
    liquidatedThisTurn,
    arcName,
    openPosition,
    setInitialState,
    nextDay,
  } = useFuturesStore();

  const [activeTab, setActiveTab] = useState<'market' | 'positions' | 'news'>('market');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastIdRef = useRef(0);
  const prevLiquidated = useRef<string[]>([]);

  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [direction, setDirection] = useState<'long' | 'short'>('long');
  const [leverage, setLeverage] = useState<typeof FUTURES_LEVERAGE_OPTIONS[number]>(10);
  const [marginInput, setMarginInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const trade: TradeState = {
    selectedSymbol, setSelectedSymbol,
    direction, setDirection,
    leverage, setLeverage,
    marginInput, setMarginInput,
    errorMsg, setErrorMsg,
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

  // Liquidation toasts
  useEffect(() => {
    const newLiqs = liquidatedThisTurn.filter(id => !prevLiquidated.current.includes(id));
    if (newLiqs.length === 0) return;
    prevLiquidated.current = [...liquidatedThisTurn];

    const timers: ReturnType<typeof setTimeout>[] = [];
    newLiqs.forEach(id => {
      const symbol = id.split('-')[0];
      const toastId = ++toastIdRef.current;
      setToasts(prev => [...prev, { id: toastId, message: `⚡ ${symbol} ${t('futures.liquidated')} — ${t('futures.marginLost')}` }]);
      const timer = setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== toastId));
      }, 3000);
      timers.push(timer);
    });
    return () => { timers.forEach(clearTimeout); };
  }, [liquidatedThisTurn, t]);

  const totalPnl = Object.values(positions).reduce((sum, p) => sum + p.unrealizedPnl, 0);
  const posEquity = Object.values(positions).reduce((sum, p) => sum + Math.max(0, p.margin + p.unrealizedPnl), 0);
  const totalEquity = cash + posEquity;
  const positionCount = Object.keys(positions).length;
  const unreadCount = dailyNews.filter(n => !n.read).length;

  const handleNextDay = () => {
    if (!isDesktop) setSelectedSymbol(null);
    nextDay();
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

  // ── Header (shared) ─────────────────────────────────────────────────────────
  const Header = (
    <header className="futures-header">
      <button className="futures-back-btn" onClick={onBack} aria-label={t('futures.back')}>
        <ChevronLeft size={20} />
      </button>
      <div className="futures-title-area">
        <h1 className="futures-title-text">{t('futures.title')}</h1>
        <div className="futures-badges">
          <span className="pro-badge">{t('futures.proRoom')}</span>
          {arcName && <span className="arc-badge">{arcName}</span>}
        </div>
      </div>
      <div className="futures-day">{t('futures.dayCounter', { current: String(currentDay), max: String(maxDays) })}</div>
    </header>
  );

  // ── Stats bar (shared, extended on desktop) ─────────────────────────────────
  const StatsBar = (
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

  if (gamePhase === 'gameover') {
    return (
      <div className="futures-mode">
        {Header}
        <div className="futures-content futures-content-gameover">
          <GameOverScreen onBack={onBack} onRetry={handleRetry} />
        </div>
        {toasts.length > 0 && (
          <div className="toast-container" aria-live="polite">
            {toasts.map(toast => (
              <div key={toast.id} className="liquidation-toast">{toast.message}</div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── Desktop Layout ─────────────────────────────────────────────────────────
  if (isDesktop) {
    return (
      <div className="futures-mode futures-mode-desktop">
        {Header}
        {StatsBar}
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
              key={trade.selectedSymbol ?? 'empty'}
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
                onClick={handleNextDay}
              >
                {`${t('futures.nextDay')} (${currentDay}/${maxDays})`}
              </button>
            </div>
          </aside>
        </main>

        {toasts.length > 0 && (
          <div className="toast-container" aria-live="polite">
            {toasts.map(toast => (
              <div key={toast.id} className="liquidation-toast">{toast.message}</div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── Mobile Layout ──────────────────────────────────────────────────────────
  return (
    <div className="futures-mode">
      {Header}
      {StatsBar}

      <nav className="futures-tabs" role="tablist">
        <button
          role="tab"
          id="tab-market"
          aria-selected={activeTab === 'market'}
          className={activeTab === 'market' ? 'active' : ''}
          onClick={() => setActiveTab('market')}
        >
          {t('futures.tabs.market')}
        </button>
        <button
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
          role="tab"
          id="tab-news"
          aria-selected={activeTab === 'news'}
          className={activeTab === 'news' ? 'active' : ''}
          onClick={() => setActiveTab('news')}
        >
          {t('futures.tabs.news')}
          {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
        </button>
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
            disabled={!canOpenPosition}
          >
            {direction === 'long' ? t('futures.openLong') : t('futures.openShort')}
          </button>
        ) : (
          <button
            className="futures-bottom-btn futures-next-day-btn"
            onClick={handleNextDay}
          >
            {`${t('futures.nextDay')} (${currentDay}/${maxDays})`}
          </button>
        )}
      </div>

      {toasts.length > 0 && (
        <div className="toast-container" aria-live="polite">
          {toasts.map(toast => (
            <div key={toast.id} className="liquidation-toast">{toast.message}</div>
          ))}
        </div>
      )}
    </div>
  );
}
