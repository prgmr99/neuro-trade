import type React from 'react';
import { useGameStore } from '../store/gameStore';
import { useTranslation } from '../i18n/translations';

interface Props {
  onClose: () => void;
}

const DayEndSummary: React.FC<Props> = ({ onClose }) => {
  const { dayState, allNews } = useGameStore();
  const { t, language } = useTranslation();

  const prevDay = dayState.currentDay - 1; // It's showing the summary of the day that just ended
  const summaryNews = allNews.filter(n => n.dayIdx === prevDay);

  return (
    <div className="modal-overlay">
      <div className="modal-content summary-modal">
        <h2>{t('summary.daySummary', { day: prevDay })}</h2>
        <p className="summary-intro">{t('summary.intro')}</p>
        
        <div className="news-impact-list">
          {summaryNews.map(news => (
            <div key={news.id} className="impact-card">
              <h4>{news.title[language]}</h4>
              <p>{news.content[language]}</p>
              
              <div className="effect-chips">
                {Object.entries(news.effect).map(([symbol, multiplier]) => {
                  const percentChange = ((multiplier - 1) * 100).toFixed(1);
                  const isPositive = multiplier >= 1;
                  return (
                    <span key={symbol} className={`effect-chip ${isPositive ? 'positive' : 'negative'}`}>
                      {symbol}: {isPositive ? '+' : ''}{percentChange}%
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="modal-actions">
          <button className="primary-btn" onClick={onClose}>
            {dayState.currentDay > dayState.maxDays ? t('summary.finish') : t('summary.advance')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DayEndSummary;
