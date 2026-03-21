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
  const [started, setStarted] = useState(false);
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [showRankings, setShowRankings] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [showDaily, setShowDaily] = useState(false);
  const [showDuel, setShowDuel] = useState(false);
  const [duelSeed, setDuelSeed] = useState<number | undefined>(undefined);
  const [showAchievements, setShowAchievements] = useState(false);
  const [duelParam] = useQueryState('duel');
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
        setShowDuel(true);
      }
    }
  }, [duelParam]);

  const { t } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ko' : 'en');
  };

  const startGame = () => {
    if (!selectedMode) return;
    const scenario = SCENARIOS[selectedMode];
    setInitialState(scenario.stocks, scenario.news, scenario.maxDays, scenario.startingCash);
    setStarted(true);
  };

  if (showFlash) {
    return <FlashRound onBack={() => setShowFlash(false)} />;
  }

  if (showDaily) {
    return <DailyChallenge onBack={() => setShowDaily(false)} />;
  }

  if (showDuel) {
    return <DuelMode onBack={() => { setShowDuel(false); setDuelSeed(undefined); }} initialSeed={duelSeed} />;
  }

  if (showRankings) {
    return (
      <div className="splash-screen">
        <div className="splash-content glass-card" style={{ maxWidth: '700px', width: '95%' }}>
          <RankingBoard />
          <button className="start-btn" onClick={() => setShowRankings(false)} style={{ width: '100%', marginTop: '1.5rem' }}>
            {t('ranking.back')}
          </button>
        </div>
      </div>
    );
  }

  if (!started) {
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

          <p className="mode-select-label">{t('app.modeSelect')}</p>
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

          <div className="mode-selector" style={{ marginBottom: '0.5rem' }}>
            <button
              className="mode-card mode-card-flash"
              onClick={() => setShowFlash(true)}
              style={{ textAlign: 'left' }}
            >
              <h3>⚡ {t('app.flashTitle')}</h3>
              <p className="mode-desc">{t('app.flashDesc')}</p>
              <p className="mode-detail">{t('app.flashDetail')}</p>
            </button>
          </div>

          <div className="mode-selector" style={{ marginBottom: '0.5rem' }}>
            <button
              className="mode-card"
              onClick={() => setShowDaily(true)}
              style={{
                textAlign: 'left',
                border: '1.5px solid #f0a930',
                boxShadow: '0 0 0 2px rgba(240,169,48,0.12)',
              }}
            >
              <h3>📅 {t('app.dailyTitle')}</h3>
              <p className="mode-desc">{t('app.dailyDesc')}</p>
              <p className="mode-detail">{t('app.dailyDetail')}</p>
            </button>
          </div>

          {selectedMode && (
            <div className="instructions">
              <p>{t(selectedMode === 'classic' ? 'app.instruction1Classic' : 'app.instruction1Advanced')}</p>
              <p>{t('app.instruction2')}</p>
              <p>{t(selectedMode === 'classic' ? 'app.instruction3Classic' : 'app.instruction3Advanced')}</p>
            </div>
          )}

          <div className="splash-actions">
            <button
              className="start-btn"
              onClick={startGame}
              disabled={!selectedMode}
            >
              {t('app.start')}
            </button>
            <button
              className="ranking-link-btn"
              onClick={() => setShowRankings(true)}
            >
              {t('ranking.viewRankings')}
            </button>
            <button
              className="ranking-link-btn"
              onClick={() => setShowDuel(true)}
            >
              {t('duel.createTitle')}
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

  if (started && dayState.currentDay > dayState.maxDays) {
    return <GameOverScreen mode={selectedMode!} onRestart={() => { setStarted(false); setSelectedMode(null); }} />;
  }

  return (
    <div className="app-container">
      <Layout />
    </div>
  );
}

export default App;
