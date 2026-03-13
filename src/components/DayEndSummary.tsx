import React from 'react';
import { useGameStore } from '../store/gameStore';

interface Props {
  onClose: () => void;
}

const DayEndSummary: React.FC<Props> = ({ onClose }) => {
  const { dayState } = useGameStore();

  const prevDay = dayState.currentDay - 1; // It's showing the summary of the day that just ended
  // We need to fetch the news that influenced this day
  // BUT the state is already advanced, so we look at the news for `prevDay`
  const { allNews } = useGameStore.getState();
  const summaryNews = allNews.filter(n => n.dayIdx === prevDay);

  return (
    <div className="modal-overlay">
      <div className="modal-content summary-modal">
        <h2>Day {prevDay} Summary</h2>
        <p className="summary-intro">Here is how the day's news impacted the market:</p>
        
        <div className="news-impact-list">
          {summaryNews.map(news => (
            <div key={news.id} className="impact-card">
              <h4>{news.title}</h4>
              <p>{news.content}</p>
              
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
            {dayState.currentDay > dayState.maxDays ? 'Finish' : 'Advance to Next Day'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DayEndSummary;
