import React from 'react';
import { useGameStore } from '../store/gameStore';
import { useTranslation } from '../i18n/translations';

const Portfolio: React.FC = () => {
  const { portfolio, stocks } = useGameStore();
  const { t } = useTranslation();

  const holdingsList = Object.values(portfolio.holdings);
  
  let totalValue = portfolio.cash;
  
  return (
    <div className="portfolio-container">
      <h2>{t('portfolio.title')}</h2>
      
      <div className="portfolio-summary-cards">
        <div className="summary-card">
          <span className="label">{t('portfolio.availableCash')}</span>
          <span className="value">${portfolio.cash.toFixed(2)}</span>
        </div>
        <div className="summary-card">
          <span className="label">{t('portfolio.totalValue')}</span>
          <span className="value">
            ${(totalValue + holdingsList.reduce((acc, h) => acc + h.quantity * stocks[h.symbol].price, 0)).toFixed(2)}
          </span>
        </div>
      </div>

      <h3>{t('portfolio.currentHoldings')}</h3>
      {holdingsList.length === 0 ? (
        <div className="empty-state">
          <p>{t('portfolio.emptyState')}</p>
        </div>
      ) : (
        <table className="holdings-table">
          <thead>
            <tr>
              <th>{t('portfolio.symbol')}</th>
              <th>{t('portfolio.quantity')}</th>
              <th>{t('portfolio.avgPrice')}</th>
              <th>{t('portfolio.currentPrice')}</th>
              <th>{t('portfolio.totalValue')}</th>
              <th>{t('portfolio.return')}</th>
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
