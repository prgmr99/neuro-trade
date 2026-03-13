import React from 'react';
import { useGameStore } from '../store/gameStore';

const Portfolio: React.FC = () => {
  const { portfolio, stocks } = useGameStore();

  const holdingsList = Object.values(portfolio.holdings);
  
  let totalValue = portfolio.cash;
  
  return (
    <div className="portfolio-container">
      <h2>Your Portfolio</h2>
      
      <div className="portfolio-summary-cards">
        <div className="summary-card">
          <span className="label">Available Cash</span>
          <span className="value">${portfolio.cash.toFixed(2)}</span>
        </div>
        <div className="summary-card">
          <span className="label">Total Value</span>
          <span className="value">
            ${(totalValue + holdingsList.reduce((acc, h) => acc + h.quantity * stocks[h.symbol].price, 0)).toFixed(2)}
          </span>
        </div>
      </div>

      <h3>Current Holdings</h3>
      {holdingsList.length === 0 ? (
        <div className="empty-state">
          <p>You don't own any stocks yet. Go to the Market to make your first trade.</p>
        </div>
      ) : (
        <table className="holdings-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Quantity</th>
              <th>Avg Price</th>
              <th>Current Price</th>
              <th>Total Value</th>
              <th>Return</th>
            </tr>
          </thead>
          <tbody>
            {holdingsList.map(holding => {
              const currentPrice = stocks[holding.symbol].price;
              const value = holding.quantity * currentPrice;
              const costBasis = holding.quantity * holding.averagePrice;
              const returnPct = ((value - costBasis) / costBasis) * 100;
              const isPositive = returnPct >= 0;

              return (
                <tr key={holding.symbol}>
                  <td><strong>{holding.symbol}</strong></td>
                  <td>{holding.quantity}</td>
                  <td>${holding.averagePrice.toFixed(2)}</td>
                  <td>${currentPrice.toFixed(2)}</td>
                  <td>${value.toFixed(2)}</td>
                  <td className={isPositive ? 'positive' : 'negative'}>
                    {isPositive ? '+' : ''}{returnPct.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Portfolio;
