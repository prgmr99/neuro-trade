import React, { useState, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useGameStore } from '../store/gameStore';
import { TrendingUp, TrendingDown, BarChart2, X, CandlestickChart, LineChart } from 'lucide-react';
import StockChart from './StockChart';
import { useTranslation } from '../i18n/translations';
import TradeToast, { TradeToastData } from './TradeToast';
import { playBuySound, playSellSound, playErrorSound } from '../lib/sounds';

const Market: React.FC = () => {
  const { stocks, portfolio, buyStock, sellStock } = useGameStore();
  const [tradeQuantity, setTradeQuantity] = useState<Record<string, number>>({});
  const stockSymbols = Object.keys(stocks);
  const [expandedCharts, setExpandedCharts] = useState<string[]>(stockSymbols);
  const [chartType, setChartType] = useState<'candle' | 'line'>('candle');
  const { t, language } = useTranslation();
  const [toasts, setToasts] = useState<TradeToastData[]>([]);
  const toastIdRef = useRef(0);
  const [activePanel, setActivePanel] = useState<Record<string, 'buy' | 'sell' | null>>({});

  const handleQuantityChange = (symbol: string, value: string) => {
    const num = parseInt(value) || 0;
    setTradeQuantity(prev => ({ ...prev, [symbol]: Math.max(0, num) }));
  };

  const dismissToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = (data: Omit<TradeToastData, 'id'>) => {
    setToasts(prev => [...prev, { ...data, id: ++toastIdRef.current }]);
  };

  const togglePanel = (symbol: string, mode: 'buy' | 'sell') => {
    setActivePanel(prev => ({
      ...prev,
      [symbol]: prev[symbol] === mode ? null : mode,
    }));
    handleQuantityChange(symbol, '');
  };

  const handleBuy = (symbol: string, qty: number, price: number) => {
    if (qty <= 0) { playErrorSound(); return; }
    const totalCost = qty * price;
    if (portfolio.cash < totalCost) { playErrorSound(); return; }
    buyStock(symbol, qty);
    playBuySound();
    addToast({ type: 'buy', symbol, quantity: qty, totalAmount: totalCost, cashAfter: portfolio.cash - totalCost });
    handleQuantityChange(symbol, '');
  };

  const handleSell = (symbol: string, qty: number, price: number) => {
    const holdingQty = portfolio.holdings[symbol]?.quantity || 0;
    if (qty <= 0 || holdingQty < qty) { playErrorSound(); return; }
    const totalRevenue = qty * price;
    sellStock(symbol, qty);
    playSellSound();
    addToast({ type: 'sell', symbol, quantity: qty, totalAmount: totalRevenue, cashAfter: portfolio.cash + totalRevenue });
    handleQuantityChange(symbol, '');
  };

  const renderTradePanel = (
    stock: { symbol: string; price: number },
    isBuyPanel: boolean,
    qty: number,
    maxBuyable: number,
    holdingQty: number,
    canBuy: boolean,
    canSell: boolean,
  ) => (
    <>
      <div className="trade-info-bar">
        {isBuyPanel ? (
          <>
            <span className="trade-info-label">{t('market.availableCash')}</span>
            <span className="trade-info-value">${portfolio.cash.toFixed(2)}</span>
            <span className="trade-info-divider">&middot;</span>
            <span className="trade-info-label">{t('market.maxBuyable')}</span>
            <span className="trade-info-value trade-info-highlight">{maxBuyable}{t('market.sharesUnit')}</span>
          </>
        ) : (
          <>
            <span className="trade-info-label">{t('market.holdingQty')}</span>
            <span className="trade-info-value trade-info-highlight">{holdingQty}{t('market.sharesUnit')}</span>
            {holdingQty > 0 && (
              <>
                <span className="trade-info-divider">&middot;</span>
                <span className="trade-info-label">{t('market.holdingValue')}</span>
                <span className="trade-info-value">${(holdingQty * stock.price).toFixed(2)}</span>
              </>
            )}
          </>
        )}
      </div>
      <div className="quick-trade-presets">
        <div className="preset-group">
          {isBuyPanel ? (
            <>
              <button className="preset-btn" onClick={() => handleQuantityChange(stock.symbol, '1')} disabled={maxBuyable < 1}>{t('market.one')}</button>
              <button className="preset-btn" onClick={() => handleQuantityChange(stock.symbol, String(Math.max(1, Math.floor(maxBuyable / 2))))} disabled={maxBuyable < 1}>{t('market.half')}</button>
              <button className="preset-btn" onClick={() => handleQuantityChange(stock.symbol, String(maxBuyable))} disabled={maxBuyable < 1}>{t('market.all')} ({maxBuyable})</button>
            </>
          ) : (
            <>
              <button className="preset-btn" onClick={() => handleQuantityChange(stock.symbol, '1')} disabled={holdingQty < 1}>{t('market.one')}</button>
              <button className="preset-btn" onClick={() => handleQuantityChange(stock.symbol, String(Math.max(1, Math.floor(holdingQty / 2))))} disabled={holdingQty < 1}>{t('market.half')}</button>
              <button className="preset-btn" onClick={() => handleQuantityChange(stock.symbol, String(holdingQty))} disabled={holdingQty < 1}>{t('market.all')} ({holdingQty})</button>
            </>
          )}
        </div>
      </div>
      <div className="trade-controls">
        <input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          min="0"
          max={isBuyPanel ? maxBuyable : holdingQty}
          value={qty || ''}
          onChange={(e) => handleQuantityChange(stock.symbol, e.target.value)}
          placeholder={t('market.qtyPlaceholder')}
        />
        {isBuyPanel ? (
          <button className="buy-btn" onClick={() => handleBuy(stock.symbol, qty, stock.price)} disabled={!canBuy}>
            {qty > 0 && canBuy ? `$${(qty * stock.price).toFixed(0)}` : ''} {t('market.buy')}
          </button>
        ) : (
          <button className="sell-btn" onClick={() => handleSell(stock.symbol, qty, stock.price)} disabled={!canSell}>
            {qty > 0 && canSell ? `$${(qty * stock.price).toFixed(0)}` : ''} {t('market.sell')}
          </button>
        )}
      </div>
    </>
  );

  return (
    <div className="market-container">
      <h2>{t('market.overview')}</h2>
      <div className="stocks-grid">
        {Object.values(stocks).map(stock => {
          const change = stock.price - stock.previousPrice;
          const percentChange = stock.previousPrice > 0 ? (change / stock.previousPrice) * 100 : 0;
          const isUp = change >= 0;
          const qty = tradeQuantity[stock.symbol] || 0;
          const holdingQty = portfolio.holdings[stock.symbol]?.quantity || 0;
          const maxBuyable = Math.floor(portfolio.cash / stock.price);
          const panel = activePanel[stock.symbol] || null;
          const isBuyPanel = panel === 'buy';
          const isSellPanel = panel === 'sell';

          const canBuy = qty > 0 && portfolio.cash >= qty * stock.price;
          const canSell = qty > 0 && holdingQty >= qty;

          return (
            <div key={stock.symbol} className="stock-card">
              <div className="stock-header">
                <div>
                  <h3>{stock.symbol}</h3>
                  <span className="stock-name">{stock.name[language]}</span>
                </div>
                <div className={`price-tag ${isUp ? 'positive' : 'negative'}`}>
                  ${stock.price.toFixed(2)}
                  <span className="change">
                    {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {Math.abs(percentChange).toFixed(2)}%
                  </span>
                </div>
              </div>

              <div className="stock-actions-top">
                <button
                  className={`chart-toggle-btn ${expandedCharts.includes(stock.symbol) ? 'active' : ''}`}
                  onClick={() => {
                    setExpandedCharts(prev =>
                      prev.includes(stock.symbol)
                        ? prev.filter(s => s !== stock.symbol)
                        : [...prev, stock.symbol]
                    );
                  }}
                >
                  <BarChart2 size={16} />
                  {expandedCharts.includes(stock.symbol) ? t('market.hideChart') : t('market.showChart')}
                </button>
                {expandedCharts.includes(stock.symbol) && (
                  <div className="chart-type-toggle">
                    <button
                      className={`chart-type-btn ${chartType === 'candle' ? 'active' : ''}`}
                      onClick={() => setChartType('candle')}
                      title={t('market.candlestick')}
                    >
                      <CandlestickChart size={14} />
                    </button>
                    <button
                      className={`chart-type-btn ${chartType === 'line' ? 'active' : ''}`}
                      onClick={() => setChartType('line')}
                      title={t('market.lineChart')}
                    >
                      <LineChart size={14} />
                    </button>
                  </div>
                )}
              </div>

              {expandedCharts.includes(stock.symbol) && (
                <div className="stock-chart-container">
                  <StockChart data={stock.priceHistory} chartType={chartType} />
                </div>
              )}

              <p className="stock-description" style={{ marginTop: '1rem' }}>{stock.description[language]}</p>

              {/* Buy / Sell Buttons */}
              <div className={`trade-action-buttons ${panel ? 'as-tabs' : ''}`}>
                <button
                  className={`trade-action-btn buy-action ${isBuyPanel ? 'active' : ''}`}
                  onClick={() => togglePanel(stock.symbol, 'buy')}
                >
                  {t('market.buy')}
                </button>
                <button
                  className={`trade-action-btn sell-action ${isSellPanel ? 'active' : ''}`}
                  onClick={() => togglePanel(stock.symbol, 'sell')}
                >
                  {t('market.sell')}
                </button>
              </div>

              {/* Trade Panel — inline on desktop, bottom sheet on mobile */}
              {panel && (
                <>
                  {/* Desktop: inline panel */}
                  <div className="trade-panel trade-panel-inline">
                    {renderTradePanel(stock, isBuyPanel, qty, maxBuyable, holdingQty, canBuy, canSell)}
                  </div>
                  {/* Mobile: bottom sheet */}
                  {ReactDOM.createPortal(
                    <div className="trade-sheet-overlay" onClick={() => togglePanel(stock.symbol, panel)}>
                      <div className="trade-sheet" onClick={(e) => e.stopPropagation()}>
                        <div className="trade-sheet-header">
                          <div>
                            <strong>{stock.symbol}</strong>
                            <span className={`trade-sheet-price ${isUp ? 'positive' : 'negative'}`}> ${stock.price.toFixed(2)}</span>
                          </div>
                          <button className="trade-sheet-close" onClick={() => togglePanel(stock.symbol, panel)}>
                            <X size={20} />
                          </button>
                        </div>
                        <div className={`trade-action-buttons as-tabs`}>
                          <button
                            className={`trade-action-btn buy-action ${isBuyPanel ? 'active' : ''}`}
                            onClick={() => togglePanel(stock.symbol, 'buy')}
                          >
                            {t('market.buy')}
                          </button>
                          <button
                            className={`trade-action-btn sell-action ${isSellPanel ? 'active' : ''}`}
                            onClick={() => togglePanel(stock.symbol, 'sell')}
                          >
                            {t('market.sell')}
                          </button>
                        </div>
                        {renderTradePanel(stock, isBuyPanel, qty, maxBuyable, holdingQty, canBuy, canSell)}
                      </div>
                    </div>,
                    document.body
                  )}
                </>
              )}

              {/* Holding info */}
              <div className="holding-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', marginTop: panel ? 0 : '0.75rem' }}>
                <span style={{color: 'var(--text-secondary)', fontSize: '0.85rem'}}>
                  {t('market.estimatedCost')}{(qty * stock.price).toFixed(2)}
                </span>
                <span style={{fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.85rem'}}>{t('market.youOwn', { qty: holdingQty })}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toast notifications */}
      <div className="trade-toast-container">
        {toasts.map(toast => (
          <TradeToast key={toast.id} toast={toast} onDismiss={dismissToast} />
        ))}
      </div>
    </div>
  );
};

export default Market;
