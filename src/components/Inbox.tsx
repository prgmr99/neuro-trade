import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Mail, MailOpen } from 'lucide-react';

const Inbox: React.FC = () => {
  const { dayState, readNews } = useGameStore();
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);

  const selectedNews = dayState.dailyNews.find(n => n.id === selectedNewsId);

  return (
    <div className="inbox-container">
      <div className="news-list">
        <h3>Daily Briefing</h3>
        {dayState.dailyNews.map(news => (
          <div 
            key={news.id} 
            className={`news-item ${news.read ? 'read' : 'unread'} ${selectedNewsId === news.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedNewsId(news.id);
              if (!news.read) readNews(news.id);
            }}
          >
            {news.read ? <MailOpen size={16} /> : <Mail size={16} />}
            <span className="news-title">{news.title}</span>
          </div>
        ))}
      </div>
      
      <div className="news-content">
        {selectedNews ? (
          <>
            <h2>{selectedNews.title}</h2>
            <div className="news-body">
              <p>{selectedNews.content}</p>
            </div>
            <div className="news-meta">
              <span>Source: Global Financial Network</span>
              <span>Date: Day {dayState.currentDay}</span>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <MailOpen size={48} className="empty-icon" />
            <p>Select a news item to read.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
