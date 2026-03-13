import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';
import StockChart from './StockChart';

const Market: React.FC = () => {
  const { stocks, portfolio, buyStock, sellStock } = useGameStore();
  const [tradeQuantity, setTradeQuantity] = useState<Record<string, number>>({});
  const [expandedChart, setExpandedChart] = useState<string | null>(null);

  const handleQuantityChange = (symbol: string, value: string) => {
    const num = parseInt(value) || 0;
    setTradeQuantity(prev => ({ ...prev, [symbol]: Math.max(0, num) }));
  };

  return (
    <div className="market-container">
      <h2>Market Overview</h2>
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
                  <span className="stock-name">{stock.name}</span>
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
                  className={`chart-toggle-btn ${expandedChart === stock.symbol ? 'active' : ''}`}
                  onClick={() => setExpandedChart(expandedChart === stock.symbol ? null : stock.symbol)}
                >
                  <BarChart2 size={16} />
                  {expandedChart === stock.symbol ? 'Hide Chart' : 'Show Chart'}
                </button>
              </div>

              {expandedChart === stock.symbol && (
                <div className="stock-chart-container">
                  <StockChart data={stock.priceHistory} />
                </div>
              )}
              
              <p className="stock-description" style={{ marginTop: '1rem' }}>{stock.description}</p>
              
              <div className="trade-controls">
                <input 
                  type="number" 
                  min="0"
                  value={qty} 
                  onChange={(e) => handleQuantityChange(stock.symbol, e.target.value)}
                  placeholder="Qty"
                />
                <button 
                  className="buy-btn"
                  onClick={() => buyStock(stock.symbol, qty)}
                  disabled={qty <= 0 || portfolio.cash < (qty * stock.price)}
                >
                  Buy
                </button>
                <button 
                  className="sell-btn"
                  onClick={() => sellStock(stock.symbol, qty)}
                  disabled={qty <= 0 || holdingQty < qty}
                >
                  Sell
                </button>
              </div>
              <div className="holding-info">
                You own: {holdingQty} shares
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Market;
