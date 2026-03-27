import React, { useState, useRef, useCallback } from 'react';
import { useGameStore } from '../store/gameStore';
import { useQueryState, parseAsStringLiteral } from 'nuqs';
import { Newspaper, TrendingUp, Briefcase, ChevronRight, Globe, Play } from 'lucide-react';
import { useTranslation } from '../i18n/translations';
import { useLanguageStore } from '../store/useLanguageStore';

import DayEndSummary from './DayEndSummary';
import Portfolio from './Portfolio';
import Market from './Market';
import NewsFeed from './NewsFeed';


const tabOptions = ['news', 'market', 'portfolio'] as const;
type Tab = typeof tabOptions[number];

interface LayoutProps {
  onGoHome?: () => void;
  onDayEnd?: () => void;
  hudOverlay?: React.ReactNode;
  endDayLabel?: string;
}

const Layout: React.FC<LayoutProps> = ({ onGoHome, onDayEnd, hudOverlay, endDayLabel }) => {
  const [activeTabQuery, setActiveTab] = useQueryState(
    'tab',
    parseAsStringLiteral(tabOptions).withDefault('news')
  );
  const activeTab = activeTabQuery as Tab;
  const [showSummary, setShowSummary] = useState(false);
  const scrollPositions = useRef<Record<string, number>>({});
  const mainContentRef = useRef<HTMLDivElement>(null);

  const { dayState, portfolio, nextDay, arcName } = useGameStore();
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguageStore();

  const switchTab = useCallback((newTab: Tab) => {
    if (mainContentRef.current) {
      scrollPositions.current[activeTab] = mainContentRef.current.scrollTop;
    }
    setActiveTab(newTab);
    requestAnimationFrame(() => {
      if (mainContentRef.current) {
        mainContentRef.current.scrollTop = scrollPositions.current[newTab] || 0;
      }
    });
  }, [activeTab, setActiveTab]);

  const handleNextDay = () => {
    if (onDayEnd) {
      onDayEnd();
    } else {
      setShowSummary(true);
    }
  };

  const closeSummaryAndAdvance = () => {
    nextDay();
    setShowSummary(false);
    setActiveTab('news');
  };

  const unreadNews = dayState.dailyNews.filter(n => !n.read).length;
  const toggleLanguage = () => setLanguage(language === 'en' ? 'ko' : 'en');

  return (
    <div className="layout">
      {hudOverlay}
      {/* Mobile Header - visible only on mobile */}
      <header className="mobile-header">
        <div className="mobile-header-left">
          <h2 onClick={onGoHome} style={{ cursor: onGoHome ? 'pointer' : undefined }}>{t('app.title')}</h2>
          <span className="day-badge">{t('layout.day')} {dayState.currentDay}/{dayState.maxDays}</span>
          {arcName && <span className="arc-badge">{arcName[language]}</span>}
        </div>
        <div className="mobile-header-right">
          <span className="mobile-cash">${portfolio.cash.toFixed(0)}</span>
          <button className="mobile-lang-btn" onClick={toggleLanguage}>
            <Globe size={12} />
            {language === 'en' ? 'KO' : 'EN'}
          </button>
        </div>
      </header>

      {/* Sidebar Navigation - hidden on mobile */}
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2 onClick={onGoHome} style={{ cursor: onGoHome ? 'pointer' : undefined }}>{t('app.title')}</h2>
          <span className="day-badge">{t('layout.day')} {dayState.currentDay} / {dayState.maxDays}</span>
          {arcName && <span className="arc-badge">{arcName[language]}</span>}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <button
            onClick={toggleLanguage}
            className="nav-btn"
            style={{ width: 'auto', padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '20px', backgroundColor: 'var(--bg-card)' }}
          >
            <Globe size={14} />
            {language === 'en' ? '한국어' : 'English'}
          </button>
        </div>

        <div className="nav-items">
          <button
            className={`nav-btn ${activeTab === 'news' ? 'active' : ''}`}
            onClick={() => switchTab('news')}
          >
            <Newspaper size={20} />
            {t('nav.news')}
            {unreadNews > 0 && <span className="notification-badge">{unreadNews}</span>}
          </button>
          <button
            className={`nav-btn ${activeTab === 'market' ? 'active' : ''}`}
            onClick={() => switchTab('market')}
          >
            <TrendingUp size={20} />
            {t('nav.market')}
          </button>
          <button
            className={`nav-btn ${activeTab === 'portfolio' ? 'active' : ''}`}
            onClick={() => switchTab('portfolio')}
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
            onClick={endDayLabel ? undefined : handleNextDay}
            disabled={!!endDayLabel || (dayState.currentDay >= dayState.maxDays && showSummary)}
            style={endDayLabel ? { opacity: 1, cursor: 'default' } : undefined}
          >
            {endDayLabel || (dayState.currentDay >= dayState.maxDays ? t('layout.finishGame') : t('layout.endDay'))}
            <ChevronRight size={20} />
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content" ref={mainContentRef}>
        {activeTab === 'news' && <NewsFeed />}
        {activeTab === 'market' && <Market />}
        {activeTab === 'portfolio' && <Portfolio />}
      </main>

      {/* Bottom Navigation - visible only on mobile */}
      <nav className="bottom-nav">
        <button
          className={`bottom-nav-item ${activeTab === 'news' ? 'active' : ''}`}
          onClick={() => switchTab('news')}
        >
          <Newspaper size={20} />
          {t('nav.news')}
          {unreadNews > 0 && <span className="notification-badge">{unreadNews}</span>}
        </button>
        <button
          className={`bottom-nav-item ${activeTab === 'market' ? 'active' : ''}`}
          onClick={() => switchTab('market')}
        >
          <TrendingUp size={20} />
          {t('nav.market')}
        </button>
        <button
          className={`bottom-nav-item ${activeTab === 'portfolio' ? 'active' : ''}`}
          onClick={() => switchTab('portfolio')}
        >
          <Briefcase size={20} />
          {t('nav.portfolio')}
        </button>
        <button
          className="bottom-nav-end-day"
          onClick={endDayLabel ? undefined : handleNextDay}
          disabled={!!endDayLabel || (dayState.currentDay >= dayState.maxDays && showSummary)}
          style={endDayLabel ? { opacity: 1, cursor: 'default' } : undefined}
        >
          {!endDayLabel && <Play size={16} />}
          {endDayLabel || (dayState.currentDay >= dayState.maxDays ? t('layout.finishGame') : t('layout.endDay'))}
        </button>
      </nav>

      {/* Modals */}
      {showSummary && (
        <DayEndSummary onClose={closeSummaryAndAdvance} />
      )}
    </div>
  );
};

export default Layout;
