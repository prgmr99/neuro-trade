import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { ChevronDown, ChevronUp, Globe } from 'lucide-react';
import { useTranslation } from '../i18n/translations';

const NewsFeed: React.FC = () => {
  const { dayState, readNews } = useGameStore();
  const [expandedNews, setExpandedNews] = useState<string[]>([]);
  const { t, language } = useTranslation();

  const handleNewsClick = (id: string, isRead: boolean) => {
    setExpandedNews(prev => 
      prev.includes(id) 
        ? prev.filter(newsId => newsId !== id)
        : [...prev, id]
    );
    if (!isRead) readNews(id);
  };

  // The first news item can be visually featured
  const featuredNews = dayState.dailyNews[0];
  const regularNews = dayState.dailyNews.slice(1);

  return (
    <div className="newsfeed-container">
      <div className="newsfeed-header">
        <Globe size={28} className="newsfeed-logo" />
        <h2>{t('newsfeed.title')}</h2>
        <span className="newsfeed-date">{t('newsfeed.marketDay')} {dayState.currentDay}</span>
      </div>

      {featuredNews && (
        <div 
          className={`news-card featured ${featuredNews.read ? 'read' : 'unread'}`}
          onClick={() => handleNewsClick(featuredNews.id, featuredNews.read)}
        >
          <div className="news-card-content">
            {!featuredNews.read && <span className="breaking-badge">{t('newsfeed.breaking')}</span>}
            <h2>{featuredNews.title[language]}</h2>
            
            <div className={`news-body ${expandedNews.includes(featuredNews.id) ? 'expanded' : 'collapsed'}`}>
              <p>{featuredNews.content[language]}</p>
            </div>
            
            <div className="news-meta">
              <span className="source">{t('newsfeed.sourceGfn')}</span>
              <button className="expand-btn">
                {expandedNews.includes(featuredNews.id) ? t('newsfeed.readLess') : t('newsfeed.readFull')}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="news-grid">
        {regularNews.map(news => (
          <div 
            key={news.id}
            className={`news-card ${news.read ? 'read' : 'unread'}`}
            onClick={() => handleNewsClick(news.id, news.read)}
          >
            <div className="news-card-content">
              {!news.read && <span className="new-badge">{t('newsfeed.new')}</span>}
              <h3 className=''>{news.title[language]}</h3>
              
              <div className={`news-body ${expandedNews.includes(news.id) ? 'expanded' : 'collapsed'}`}>
                <p>{news.content[language]}</p>
              </div>
              
              <div className="news-meta">
                <span className="source">{t('newsfeed.sourceMarketWatch')}</span>
                <span className="read-more">
                   {expandedNews.includes(news.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
