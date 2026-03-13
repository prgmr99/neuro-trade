import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { useQueryState, parseAsStringLiteral } from 'nuqs';
import { Newspaper, TrendingUp, Briefcase, ChevronRight, Globe } from 'lucide-react';
import { useTranslation } from '../i18n/translations';
import { useLanguageStore } from '../store/useLanguageStore';

import DayEndSummary from './DayEndSummary';
import Portfolio from './Portfolio';
import Market from './Market';
import NewsFeed from './NewsFeed';


const tabOptions = ['news', 'market', 'portfolio'] as const;
type Tab = typeof tabOptions[number];

const Layout: React.FC = () => {
  const [activeTabQuery, setActiveTab] = useQueryState(
    'tab',
    parseAsStringLiteral(tabOptions).withDefault('news')
  );
  const activeTab = activeTabQuery as Tab;
  const [showSummary, setShowSummary] = useState(false);
  
  const { dayState, portfolio, nextDay } = useGameStore();
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguageStore();

  const handleNextDay = () => {
    setShowSummary(true);
  };

  const closeSummaryAndAdvance = () => {
    nextDay();
    setShowSummary(false);
    setActiveTab('news'); // Go back to news for next day's news
  };

  const unreadNews = dayState.dailyNews.filter(n => !n.read).length;

  return (
    <div className="layout">
      {/* Sidebar Navigation */}
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2>{t('app.title')}</h2>
          <span className="day-badge">{t('layout.day')} {dayState.currentDay} / {dayState.maxDays}</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <button 
            onClick={() => setLanguage(language === 'en' ? 'ko' : 'en')}
            className="nav-btn" 
            style={{ width: 'auto', padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '20px', backgroundColor: 'var(--bg-card)' }}
          >
            <Globe size={14} style={{ marginRight: '6px' }} />
            {language === 'en' ? '한국어' : 'English'}
          </button>
        </div>

        <div className="nav-items">
          <button 
            className={`nav-btn ${activeTab === 'news' ? 'active' : ''}`}
            onClick={() => setActiveTab('news')}
          >
            <Newspaper size={20} />
            {t('nav.news')}
            {unreadNews > 0 && <span className="notification-badge">{unreadNews}</span>}
          </button>
          <button 
            className={`nav-btn ${activeTab === 'market' ? 'active' : ''}`}
            onClick={() => setActiveTab('market')}
          >
            <TrendingUp size={20} />
            {t('nav.market')}
          </button>
          <button 
            className={`nav-btn ${activeTab === 'portfolio' ? 'active' : ''}`}
            onClick={() => setActiveTab('portfolio')}
          >
            <Briefcase size={20} />
            {t('nav.portfolio')}
          </button>
        </div>

        <div className="sidebar-footer">
          <div className="portfolio-summary">
            <span className="label">{t('layout.cashBalance')}</span>
            <span className="value">${portfolio.cash.toFixed(2)}</span>
          </div>
          <button 
            className="next-day-btn" 
            onClick={handleNextDay}
            disabled={dayState.currentDay >= dayState.maxDays && showSummary}
          >
            {dayState.currentDay >= dayState.maxDays ? t('layout.finishGame') : t('layout.endDay')}
            <ChevronRight size={20} />
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'news' && <NewsFeed />}
        {activeTab === 'market' && <Market />}
        {activeTab === 'portfolio' && <Portfolio />}
      </main>

      {/* Modals */}
      {showSummary && (
        <DayEndSummary onClose={closeSummaryAndAdvance} />
      )}
    </div>
  );
};

export default Layout;
