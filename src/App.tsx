import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate, useSearchParams } from 'react-router-dom';
import { useGameStore } from './store/gameStore';
import { useLanguageStore } from './store/useLanguageStore';
import { SCENARIOS, GameMode, CLASSIC_ARCS, selectClassicArc, selectAdvancedArcs } from './data';
import Layout from './components/Layout/Layout';
import GameOverScreen from './components/GameOverScreen/GameOverScreen';
import RankingBoard from './components/RankingBoard/RankingBoard';
import FlashRound from './components/FlashRound/FlashRound';
import DailyChallenge from './components/DailyChallenge/DailyChallenge';
import DuelMode from './components/DuelMode/DuelMode';
import LiveCompetition from './components/LiveCompetition/LiveCompetition';
import RoomBattle from './components/RoomBattle/RoomBattle';
import AttendanceModal from './components/AttendanceModal/AttendanceModal';
import AchievementGallery from './components/AchievementGallery/AchievementGallery';
import { useAttendanceStore } from './store/attendanceStore';
import { useTranslation } from './i18n/translations';
import { Globe, Trophy, TrendingUp, BarChart3, CalendarCheck, Users, Newspaper, Swords, AlertTriangle } from 'lucide-react';
import SocialProof from './components/SocialProof/SocialProof';
import MarketTicker from './components/MarketTicker/MarketTicker';
import { trackGameStarted, trackModeSelected } from './lib/analytics';

const FuturesMode = lazy(() => import('./components/FuturesMode/FuturesMode'));

// --- Route-level components ---

function GameRoute({ goHome }: { goHome: () => void }) {
  const [searchParams] = useSearchParams();
  const modeParam = searchParams.get('mode') as GameMode | null;
  const { dayState } = useGameStore();

  if (dayState.currentDay > dayState.maxDays) {
    return <GameOverScreen mode={modeParam!} onRestart={goHome} />;
  }

  return (
    <div className="app-container">
      <Layout onGoHome={goHome} />
    </div>
  );
}

function RankingsRoute({ goHome }: { goHome: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="splash-screen ranking-page">
      <div className="splash-content glass-card" style={{ maxWidth: '700px', width: '95%' }}>
        <RankingBoard />
        <div className="gameover-cta-desktop">
          <button className="start-btn" onClick={goHome} style={{ width: '100%', marginTop: '1.5rem' }}>
            {t('ranking.back')}
          </button>
        </div>
        <div className="gameover-actions-spacer" />
      </div>
      <div className="gameover-fixed-bottom">
        <button className="start-btn" onClick={goHome}>
          {t('ranking.back')}
        </button>
      </div>
    </div>
  );
}

function DuelRoute({ goHome }: { goHome: () => void }) {
  const [searchParams] = useSearchParams();
  const seedParam = searchParams.get('seed');
  const initialSeed = seedParam ? parseInt(seedParam, 10) : undefined;
  return <DuelMode onBack={goHome} initialSeed={initialSeed} />;
}

// --- Splash screen ---

function SplashScreen() {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [pendingView, setPendingView] = useState<'daily' | 'multiplayer' | 'room-battle' | null>(null);
  const [showAchievements, setShowAchievements] = useState(false);
  const [attendanceInfo, setAttendanceInfo] = useState<{ show: boolean; isNewDay: boolean; streakBroken: boolean }>({ show: false, isNewDay: false, streakBroken: false });
  const { setInitialState } = useGameStore();
  const { language, setLanguage } = useLanguageStore();
  const checkIn = useAttendanceStore((s) => s.checkIn);
  const { t } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = language === 'ko' ? 'ko' : 'en';
  }, [language]);

  useEffect(() => {
    const result = checkIn();
    if (result.isNewDay) {
      setAttendanceInfo({ show: true, isNewDay: result.isNewDay, streakBroken: result.streakBroken });
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ko' : 'en');
  };

  const startGame = () => {
    if (pendingView) {
      navigate(`/${pendingView}`);
      return;
    }
    if (!selectedMode) return;
    if (selectedMode === 'futures') {
      navigate('/futures');
      trackGameStarted(selectedMode, false);
      return;
    }
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
    navigate(`/game?mode=${selectedMode}`);
    trackGameStarted(selectedMode, false);
  };

  return (
    <div className="splash-screen">
      <div className="splash-content glass-card" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <button
            onClick={() => setShowAchievements(true)}
            className="splash-lang-btn splash-desktop-only"
            title={language === 'en' ? 'Achievements' : '업적'}
          >
            <Trophy size={14} />
          </button>
          <button
            onClick={() => navigate('/rankings')}
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
            onClick={() => { setSelectedMode('classic'); setPendingView(null); trackModeSelected('classic'); }}
          >
            <TrendingUp size={24} className="mode-card-icon" />
            <h3>{t('app.classicTitle')}</h3>
            <p className="mode-desc">{t('app.classicDesc')}</p>
            <p className="mode-detail">{t('app.classicDetail')}</p>
          </button>
          {selectedMode === 'classic' && (
            <div className="instructions instructions-mobile-only">
              <p>{t('app.instruction1Classic')}</p>
              <p>{t('app.instruction2')}</p>
              <p>{t('app.instruction3Classic')}</p>
            </div>
          )}
          <button
            className={`mode-card ${selectedMode === 'advanced' ? 'selected' : ''}`}
            onClick={() => { setSelectedMode('advanced'); setPendingView(null); trackModeSelected('advanced'); }}
          >
            <BarChart3 size={24} className="mode-card-icon" />
            <h3>{t('app.advancedTitle')}</h3>
            <p className="mode-desc">{t('app.advancedDesc')}</p>
            <p className="mode-detail">{t('app.advancedDetail')}</p>
          </button>
          {selectedMode === 'advanced' && (
            <div className="instructions instructions-mobile-only">
              <p>{t('app.instruction1Advanced')}</p>
              <p>{t('app.instruction2')}</p>
              <p>{t('app.instruction3Advanced')}</p>
            </div>
          )}
        </div>

        {selectedMode && (
          <div className="instructions instructions-desktop-only">
            <p>{t(selectedMode === 'classic' ? 'app.instruction1Classic' : 'app.instruction1Advanced')}</p>
            <p>{t('app.instruction2')}</p>
            <p>{t(selectedMode === 'classic' ? 'app.instruction3Classic' : 'app.instruction3Advanced')}</p>
          </div>
        )}

        <div className="mode-selector" style={{ marginBottom: '0.5rem' }}>
          <button
            className={`mode-card mode-card-daily ${pendingView === 'daily' ? 'selected' : ''}`}
            onClick={() => { setPendingView('daily'); setSelectedMode(null); }}
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
            className={`mode-card mode-card-daily ${pendingView === 'multiplayer' ? 'selected' : ''}`}
            onClick={() => { setPendingView('multiplayer'); setSelectedMode(null); }}
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

        <div className="mode-selector" style={{ marginBottom: '0.5rem' }}>
          <button
            className={`mode-card mode-card-daily ${pendingView === 'room-battle' ? 'selected' : ''}`}
            onClick={() => { setPendingView('room-battle'); setSelectedMode(null); }}
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
            }}>New</span>
            <Swords size={24} className="mode-card-icon" />
            <h3>{t('roomBattle.title')}</h3>
            <p className="mode-desc">{t('roomBattle.subtitle')}</p>
            <p className="mode-detail">{t('roomBattle.splashDetail')}</p>
          </button>
        </div>

        <div className="mode-selector" style={{ marginBottom: '0.5rem' }}>
          <button
            className={`mode-card mode-card-daily mode-card-futures ${selectedMode === 'futures' ? 'selected' : ''}`}
            onClick={() => { setSelectedMode('futures'); setPendingView(null); trackModeSelected('futures'); }}
            style={{ textAlign: 'left', position: 'relative' }}
          >
            <span style={{
              position: 'absolute',
              top: '0.6rem',
              right: '0.6rem',
              background: 'var(--negative)',
              color: '#fff',
              fontSize: '0.65rem',
              fontWeight: 700,
              padding: '0.15rem 0.5rem',
              borderRadius: '999px',
              letterSpacing: '0.03em',
            }}>{t('futures.badge')}</span>
            <AlertTriangle size={24} className="mode-card-icon mode-card-icon-futures" />
            <h3>{t('futures.title')}</h3>
            <p className="mode-desc">{t('futures.subtitle')}</p>
            <p className="mode-detail">{t('futures.detail')}</p>
          </button>
        </div>

        <div className="splash-sub-actions">
          <button className="splash-chip" onClick={() => navigate('/flash')}>
            ⚡ {t('app.flashTitle')}
          </button>
          <span className="splash-chip-divider">·</span>
          <button className="splash-chip" onClick={() => navigate('/duel')}>
            {t('duel.createTitle')}
          </button>
        </div>

        <button
          className="splash-ranking-btn"
          onClick={() => navigate('/rankings')}
        >
          {t('ranking.viewRankings')}
        </button>

        <div className="splash-start-desktop">
          <button
            className="start-btn"
            onClick={startGame}
            disabled={!selectedMode && !pendingView}
          >
            {t('app.start')}
          </button>
        </div>

        <div className="splash-actions-spacer" />
      </div>

      <div className="splash-fixed-bottom">
        <button
          className="start-btn"
          onClick={startGame}
          disabled={!selectedMode && !pendingView}
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

// --- App root ---

function App() {
  const navigate = useNavigate();
  const goHome = () => navigate('/');

  return (
    <Routes>
      <Route path="/flash" element={<FlashRound onBack={goHome} />} />
      <Route path="/daily" element={<DailyChallenge onBack={goHome} />} />
      <Route path="/duel" element={<DuelRoute goHome={goHome} />} />
      <Route path="/multiplayer" element={<LiveCompetition onBack={goHome} />} />
      <Route path="/room-battle" element={<RoomBattle onBack={goHome} />} />
      <Route path="/futures" element={<Suspense fallback={<div className="lazy-fallback">Loading…</div>}><FuturesMode onBack={goHome} /></Suspense>} />
      <Route path="/rankings" element={<RankingsRoute goHome={goHome} />} />
      <Route path="/game" element={<GameRoute goHome={goHome} />} />
      <Route path="/" element={<SplashScreen />} />
    </Routes>
  );
}

export default App;
