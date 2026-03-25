import React from 'react';
import { useGameStore } from '../store/gameStore';
import { useTranslation } from '../i18n/translations';
import { Briefcase } from 'lucide-react';

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
          <div className="empty-state-icon">
            <Briefcase size={48} strokeWidth={1.2} />
          </div>
          <p className="empty-state-title">{t('portfolio.emptyState')}</p>
          <p className="empty-state-desc">{t('portfolio.emptyStateHint')}</p>
        </div>
      ) : (
        <>
          {/* Mobile: Card layout */}
          <div className="holdings-cards">
            {holdingsList.map(holding => {
              const currentPrice = stocks[holding.symbol].price;
              const value = holding.quantity * currentPrice;
              const costBasis = holding.quantity * holding.averagePrice;
              const returnPct = ((value - costBasis) / costBasis) * 100;
              const isPositive = returnPct >= 0;

              return (
                <div key={holding.symbol} className="holding-card">
                  <div className="holding-card-header">
                    <strong className="holding-card-symbol">{holding.symbol}</strong>
                    <span className={`holding-card-return ${isPositive ? 'positive' : 'negative'}`}>
                      {isPositive ? '+' : ''}{returnPct.toFixed(2)}%
                    </span>
                  </div>
                  <div className="holding-card-body">
                    <div className="holding-card-row">
                      <span className="holding-card-label">{t('portfolio.currentPrice')}</span>
                      <span className="holding-card-value">${currentPrice.toFixed(2)}</span>
                    </div>
                    <div className="holding-card-row">
                      <span className="holding-card-label">{t('portfolio.quantity')}</span>
                      <span className="holding-card-value">{holding.quantity}</span>
                    </div>
                    <div className="holding-card-row">
                      <span className="holding-card-label">{t('portfolio.avgPrice')}</span>
                      <span className="holding-card-value">${holding.averagePrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="holding-card-footer">
                    <span className="holding-card-label">{t('portfolio.totalValue')}</span>
                    <span className="holding-card-total">${value.toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop: Table layout */}
          <div className="table-scroll-wrapper holdings-table-desktop">
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
          </div>
        </>
      )}
    </div>
  );
};

export default Portfolio;
