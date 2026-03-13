import { useState } from 'react';
import { useGameStore } from './store/gameStore';
import { INITIAL_STOCKS, SCENARIO_NEWS } from './data/scenarios';
import Layout from './components/Layout';
import { useTranslation } from './i18n/translations';

function App() {
  const [started, setStarted] = useState(false);
  const { setInitialState } = useGameStore();
  const { t } = useTranslation();

  const startGame = () => {
    setInitialState(INITIAL_STOCKS, SCENARIO_NEWS, 5);
    setStarted(true);
  };

  if (!started) {
    return (
      <div className="splash-screen">
        <div className="splash-content glass-card">
          <h1>{t('app.title')}</h1>
          <p className="subtitle">{t('app.subtitle')}</p>
          <div className="instructions">
            <p>{t('app.instruction1')}</p>
            <p>{t('app.instruction2')}</p>
            <p>{t('app.instruction3')}</p>
          </div>
          <button className="start-btn" onClick={startGame}>{t('app.start')}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Layout />
    </div>
  );
}

export default App;
