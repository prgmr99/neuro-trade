import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';
import StockChart from './StockChart';
import { useTranslation } from '../i18n/translations';

const Market: React.FC = () => {
  const { stocks, portfolio, buyStock, sellStock } = useGameStore();
  const [tradeQuantity, setTradeQuantity] = useState<Record<string, number>>({});
  const stockSymbols = Object.keys(stocks);
  const [expandedCharts, setExpandedCharts] = useState<string[]>(stockSymbols.length > 5 ? [] : stockSymbols);
  const { t, language } = useTranslation();

  const handleQuantityChange = (symbol: string, value: string) => {
    const num = parseInt(value) || 0;
    setTradeQuantity(prev => ({ ...prev, [symbol]: Math.max(0, num) }));
  };

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
              </div>

              {expandedCharts.includes(stock.symbol) && (
                <div className="stock-chart-container">
                  <StockChart data={stock.priceHistory} />
                </div>
              )}
              
              <p className="stock-description" style={{ marginTop: '1rem' }}>{stock.description[language]}</p>
              
              <div className="trade-controls">
                <input 
                  type="number" 
                  min="0"
                  value={qty || ''} 
                  onChange={(e) => handleQuantityChange(stock.symbol, e.target.value)}
                  placeholder={t('market.qtyPlaceholder')}
                />
                <button 
                  className="buy-btn"
                  onClick={() => {
                    buyStock(stock.symbol, qty);
                    handleQuantityChange(stock.symbol, '');
                  }}
                  disabled={qty <= 0 || portfolio.cash < (qty * stock.price)}
                >
                  {t('market.buy')}
                </button>
                <button 
                  className="sell-btn"
                  onClick={() => {
                    sellStock(stock.symbol, qty);
                    handleQuantityChange(stock.symbol, '');
                  }}
                  disabled={qty <= 0 || holdingQty < qty}
                >
                  {t('market.sell')}
                </button>
              </div>
              <div className="holding-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <span style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>{t('market.estimatedCost')}{(qty * stock.price).toFixed(2)}</span>
                <span style={{fontWeight: 500, color: 'var(--text-primary)'}}>{t('market.youOwn', { qty: holdingQty })}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Market;
