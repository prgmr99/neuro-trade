import React from 'react';
import { useGameStore } from '../store/gameStore';
import { useAttendanceStore } from '../store/attendanceStore';
import { ChevronDown, ChevronUp, Globe, TrendingUp, TrendingDown, Eye } from 'lucide-react';
import { useTranslation } from '../i18n/translations';
import { News } from '../types';

const HintBadges: React.FC<{ news: News; t: (key: string) => string }> = ({ news, t }) => {
  const effects = Object.entries(news.effect);
  if (effects.length === 0) return null;

  return (
    <div className="hint-badges">
      {effects.map(([symbol, multiplier]) => {
        const isBullish = multiplier >= 1;
        return (
          <span key={symbol} className={`hint-badge ${isBullish ? 'bullish' : 'bearish'}`}>
            {isBullish ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {symbol}
          </span>
        );
      })}
    </div>
  );
};

const NewsFeed: React.FC = () => {
  const { dayState, allNews, readNews, expandedNews, toggleNewsExpanded } = useGameStore();
  const isRewardUnlocked = useAttendanceStore((s) => s.isRewardUnlocked);
  const { t, language } = useTranslation();

  const showHints = isRewardUnlocked('hint');
  const showInsider = isRewardUnlocked('insider');
  const tomorrowNews = showInsider && dayState.currentDay < dayState.maxDays
    ? allNews.filter(n => n.dayIdx === dayState.currentDay + 1)
    : [];

  const handleNewsClick = (id: string, isRead: boolean) => {
    toggleNewsExpanded(id);
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
            {showHints && <HintBadges news={featuredNews} t={t} />}

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
              {showHints && <HintBadges news={news} t={t} />}

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

      {tomorrowNews.length > 0 && (
        <div className="insider-preview">
          <div className="insider-header">
            <Eye size={16} />
            <span>{t('newsfeed.insiderTitle')}</span>
          </div>
          <p className="insider-subtitle">{t('newsfeed.insiderTomorrow')}</p>
          <div className="insider-headlines">
            {tomorrowNews.map(news => (
              <div key={news.id} className="insider-headline">
                {news.title[language]}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
