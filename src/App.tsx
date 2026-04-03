import { useState, useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useGameStore } from './store/gameStore';
import { useLanguageStore } from './store/useLanguageStore';
import { SCENARIOS, GameMode, CLASSIC_ARCS, selectClassicArc, selectAdvancedArcs } from './data';
import Layout from './components/Layout';
import GameOverScreen from './components/GameOverScreen';
import RankingBoard from './components/RankingBoard';
import FlashRound from './components/FlashRound';
import DailyChallenge from './components/DailyChallenge';
import DuelMode from './components/DuelMode';
import LiveCompetition from './components/LiveCompetition';
import AttendanceModal from './components/AttendanceModal';
import AchievementGallery from './components/AchievementGallery';
import { useAttendanceStore } from './store/attendanceStore';
import { useTranslation } from './i18n/translations';
import { Globe, Trophy, TrendingUp, BarChart3, CalendarCheck, Users, Newspaper } from 'lucide-react';
import SocialProof from './components/SocialProof';
import MarketTicker from './components/MarketTicker';

function App() {
  const [view, setView] = useQueryState('view');
  const [modeParam, setModeParam] = useQueryState('mode');
  const [duelParam] = useQueryState('duel');
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [duelSeed, setDuelSeed] = useState<number | undefined>(undefined);
  const [showAchievements, setShowAchievements] = useState(false);
  const [attendanceInfo, setAttendanceInfo] = useState<{ show: boolean; isNewDay: boolean; streakBroken: boolean }>({ show: false, isNewDay: false, streakBroken: false });
  const { setInitialState, dayState } = useGameStore();
  const { language, setLanguage } = useLanguageStore();
  const checkIn = useAttendanceStore((s) => s.checkIn);

  useEffect(() => {
    document.documentElement.lang = language === 'ko' ? 'ko' : 'en';
  }, [language]);

  useEffect(() => {
    const result = checkIn();
    if (result.isNewDay) {
      setAttendanceInfo({ show: true, isNewDay: result.isNewDay, streakBroken: result.streakBroken });
    }
  }, []);

  useEffect(() => {
    if (duelParam) {
      const parsed = parseInt(duelParam, 10);
      if (!isNaN(parsed)) {
        setDuelSeed(parsed);
        setView('duel');
      }
    }
  }, [duelParam]);

  const { t } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ko' : 'en');
  };

  const goHome = () => {
    setView(null);
    setModeParam(null);
    setSelectedMode(null);
  };

  const startGame = () => {
    if (!selectedMode) return;
    const scenario = SCENARIOS[selectedMode];
    if (selectedMode === 'classic') {
      const seed = Date.now();
      const arc = selectClassicArc(CLASSIC_ARCS, seed);
      setInitialState(scenario.stocks, arc.news, scenario.maxDays, scenario.startingCash, seed, arc.name);
    } else {
      const seed = Date.now();
      const { news } = selectAdvancedArcs(seed);
      setInitialState(scenario.stocks, news, scenario.maxDays, scenario.startingCash, seed, null, scenario.preApplyRatio ?? 0, scenario.marketGravity ?? 0, scenario.effectScale ?? 1);
    }
    setModeParam(selectedMode);
    setView('game');
  };

  // --- Views based on URL query param ---

  if (view === 'flash') {
    return <FlashRound onBack={goHome} />;
  }

  if (view === 'daily') {
    return <DailyChallenge onBack={goHome} />;
  }

  if (view === 'duel') {
    return <DuelMode onBack={() => { goHome(); setDuelSeed(undefined); }} initialSeed={duelSeed} />;
  }

  if (view === 'multiplayer') {
    return <LiveCompetition onBack={goHome} />;
  }

  if (view === 'rankings') {
    return (
      <div className="splash-screen">
        <div className="splash-content glass-card" style={{ maxWidth: '700px', width: '95%' }}>
          <RankingBoard />
          <button className="start-btn" onClick={goHome} style={{ width: '100%', marginTop: '1.5rem' }}>
            {t('ranking.back')}
          </button>
        </div>
      </div>
    );
  }

  if (view === 'game') {
    const gameMode = (modeParam as GameMode) ?? selectedMode;

    if (dayState.currentDay > dayState.maxDays) {
      return <GameOverScreen mode={gameMode!} onRestart={goHome} />;
    }

    return (
      <div className="app-container">
        <Layout onGoHome={goHome} />
      </div>
    );
  }

  // --- Splash screen (default) ---
  return (
    <div className="splash-screen">
      <div className="splash-content glass-card" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginBottom: '0.5rem' }}>
          {/* Desktop: Trophy icon / Mobile: Rankings button */}
          <button
            onClick={() => setShowAchievements(true)}
            className="splash-lang-btn splash-desktop-only"
            title={language === 'en' ? 'Achievements' : '업적'}
          >
            <Trophy size={14} />
          </button>
          <button
            onClick={() => setView('rankings')}
            className="splash-lang-btn splash-mobile-only"
          >
            <Trophy size={14} />
            {t('ranking.viewRankings')}
          </button>
          <button
            onClick={toggleLanguage}
            className="splash-lang-btn"
          >
            <Globe size={14} />
            {language === 'en' ? '한국어' : 'English'}
          </button>
        </div>
        <h1>{t('app.title')}</h1>
        <p className="subtitle">{t('app.subtitle')}</p>
        <SocialProof />
        <MarketTicker />

        <div className="how-to-play">
            <div className="how-to-play-step">
              <Newspaper size={20} className="step-icon" />
              <h4>{t('app.howToPlayStep1')}</h4>
              <p>{t('app.howToPlayStep1Desc')}</p>
            </div>
            <div className="how-to-play-step">
              <TrendingUp size={20} className="step-icon" />
              <h4>{t('app.howToPlayStep2')}</h4>
              <p>{t('app.howToPlayStep2Desc')}</p>
            </div>
            <div className="how-to-play-step">
              <Trophy size={20} className="step-icon" />
              <h4>{t('app.howToPlayStep3')}</h4>
              <p>{t('app.howToPlayStep3Desc')}</p>
            </div>
        </div>

        <div className="mode-selector">
          <button
            className={`mode-card ${selectedMode === 'classic' ? 'selected' : ''}`}
            onClick={() => setSelectedMode('classic')}
          >
            <TrendingUp size={24} className="mode-card-icon" />
            <h3>{t('app.classicTitle')}</h3>
            <p className="mode-desc">{t('app.classicDesc')}</p>
            <p className="mode-detail">{t('app.classicDetail')}</p>
          </button>
          <button
            className={`mode-card ${selectedMode === 'advanced' ? 'selected' : ''}`}
            onClick={() => setSelectedMode('advanced')}
          >
            <BarChart3 size={24} className="mode-card-icon" />
            <h3>{t('app.advancedTitle')}</h3>
            <p className="mode-desc">{t('app.advancedDesc')}</p>
            <p className="mode-detail">{t('app.advancedDetail')}</p>
          </button>
        </div>

        <div className="mode-selector" style={{ marginBottom: '0.5rem' }}>
          <button
            className="mode-card mode-card-daily"
            onClick={() => setView('daily')}
            style={{ textAlign: 'left' }}
          >
            <CalendarCheck size={24} className="mode-card-icon" />
            <h3>{t('app.dailyTitle')}</h3>
            <p className="mode-desc">{t('app.dailyDesc')}</p>
            <p className="mode-detail">{t('app.dailyDetail')}</p>
            <p className="daily-countdown">
              {t('app.dailyExpires', { hours: String(Math.max(0, 23 - new Date().getHours())) })}
            </p>
          </button>
        </div>

        <div className="mode-selector" style={{ marginBottom: '0.5rem' }}>
          <button
            className="mode-card mode-card-daily"
            onClick={() => setView('multiplayer')}
            style={{ textAlign: 'left', position: 'relative' }}
          >
            <span style={{
              position: 'absolute',
              top: '0.6rem',
              right: '0.6rem',
              background: 'var(--accent-color)',
              color: '#fff',
              fontSize: '0.65rem',
              fontWeight: 700,
              padding: '0.15rem 0.5rem',
              borderRadius: '999px',
              letterSpacing: '0.03em',
            }}>Beta</span>
            <Users size={24} className="mode-card-icon" />
            <h3>{t('multiplayer.title')}</h3>
            <p className="mode-desc">{t('multiplayer.createDesc')}</p>
            <p className="mode-detail">{t('multiplayer.joinDesc')}</p>
          </button>
        </div>

        {selectedMode && (
          <div className="instructions">
            <p>{t(selectedMode === 'classic' ? 'app.instruction1Classic' : 'app.instruction1Advanced')}</p>
            <p>{t('app.instruction2')}</p>
            <p>{t(selectedMode === 'classic' ? 'app.instruction3Classic' : 'app.instruction3Advanced')}</p>
          </div>
        )}

        <div className="splash-sub-actions">
          <button className="splash-chip" onClick={() => setView('flash')}>
            ⚡ {t('app.flashTitle')}
          </button>
          <span className="splash-chip-divider">·</span>
          <button className="splash-chip" onClick={() => setView('duel')}>
            {t('duel.createTitle')}
          </button>
        </div>

        <button
          className="splash-ranking-btn"
          onClick={() => setView('rankings')}
        >
          {t('ranking.viewRankings')}
        </button>

        {/* Start button — inline on desktop */}
        <div className="splash-start-desktop">
          <button
            className="start-btn"
            onClick={startGame}
            disabled={!selectedMode}
          >
            {t('app.start')}
          </button>
        </div>

        <div className="splash-actions-spacer" />
      </div>

      {/* Fixed bottom start button — mobile only */}
      <div className="splash-fixed-bottom">
        <button
          className="start-btn"
          onClick={startGame}
          disabled={!selectedMode}
        >
          {t('app.start')}
        </button>
      </div>

      {attendanceInfo.show && (
        <AttendanceModal
          isNewDay={attendanceInfo.isNewDay}
          streakBroken={attendanceInfo.streakBroken}
          onClose={() => setAttendanceInfo({ show: false, isNewDay: false, streakBroken: false })}
        />
      )}

      {showAchievements && (
        <AchievementGallery onClose={() => setShowAchievements(false)} />
      )}
    </div>
  );
}

export default App;
