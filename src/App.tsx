import { useState, useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useGameStore } from './store/gameStore';
import { useLanguageStore } from './store/useLanguageStore';
import { SCENARIOS, GameMode } from './data';
import Layout from './components/Layout';
import GameOverScreen from './components/GameOverScreen';
import RankingBoard from './components/RankingBoard';
import FlashRound from './components/FlashRound';
import DailyChallenge from './components/DailyChallenge';
import DuelMode from './components/DuelMode';
import AttendanceModal from './components/AttendanceModal';
import AchievementGallery from './components/AchievementGallery';
import { useAttendanceStore } from './store/attendanceStore';
import { useTranslation } from './i18n/translations';
import { Globe, Trophy } from 'lucide-react';
import SocialProof from './components/SocialProof';

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
    setInitialState(scenario.stocks, scenario.news, scenario.maxDays, scenario.startingCash);
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
        <Layout />
      </div>
    );
  }

  // --- Splash screen (default) ---
  return (
    <div className="splash-screen">
      <div className="splash-content glass-card" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setShowAchievements(true)}
            className="splash-lang-btn"
            title={language === 'en' ? 'Achievements' : '업적'}
          >
            <Trophy size={14} />
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

        <div className="mode-selector">
          <button
            className={`mode-card ${selectedMode === 'classic' ? 'selected' : ''}`}
            onClick={() => setSelectedMode('classic')}
          >
            <h3>{t('app.classicTitle')}</h3>
            <p className="mode-desc">{t('app.classicDesc')}</p>
            <p className="mode-detail">{t('app.classicDetail')}</p>
          </button>
          <button
            className={`mode-card ${selectedMode === 'advanced' ? 'selected' : ''}`}
            onClick={() => setSelectedMode('advanced')}
          >
            <h3>{t('app.advancedTitle')}</h3>
            <p className="mode-desc">{t('app.advancedDesc')}</p>
            <p className="mode-detail">{t('app.advancedDetail')}</p>
          </button>
        </div>

        {/* Daily Challenge - TODO: 고도화 후 활성화
        <div className="mode-selector" style={{ marginBottom: '0.5rem' }}>
          <button
            className="mode-card mode-card-daily"
            onClick={() => setView('daily')}
            style={{ textAlign: 'left' }}
          >
            <h3>{t('app.dailyTitle')}</h3>
            <p className="mode-desc">{t('app.dailyDesc')}</p>
            <p className="mode-detail">{t('app.dailyDetail')}</p>
          </button>
        </div>
        */}

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

        <div className="splash-actions" style={{ marginTop: '1rem' }}>
          <button
            className="start-btn"
            onClick={startGame}
            disabled={!selectedMode}
          >
            {t('app.start')}
          </button>
        </div>
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
