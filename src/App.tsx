import { useState } from 'react';
import { useGameStore } from './store/gameStore';
import { SCENARIOS, GameMode } from './data';
import Layout from './components/Layout';
import GameOverScreen from './components/GameOverScreen';
import RankingBoard from './components/RankingBoard';
import { useTranslation } from './i18n/translations';

function App() {
  const [started, setStarted] = useState(false);
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [showRankings, setShowRankings] = useState(false);
  const { setInitialState, dayState } = useGameStore();
  const { t } = useTranslation();

  const startGame = () => {
    if (!selectedMode) return;
    const scenario = SCENARIOS[selectedMode];
    setInitialState(scenario.stocks, scenario.news, scenario.maxDays, scenario.startingCash);
    setStarted(true);
  };

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
        <div className="splash-content glass-card">
          <h1>{t('app.title')}</h1>
          <p className="subtitle">{t('app.subtitle')}</p>

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
          </div>
        </div>
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
