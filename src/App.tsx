import { useState } from 'react';
import { useGameStore } from './store/gameStore';
import { INITIAL_STOCKS, SCENARIO_NEWS } from './data/scenarios';
import Layout from './components/Layout';

function App() {
  const [started, setStarted] = useState(false);
  const { setInitialState } = useGameStore();

  const startGame = () => {
    setInitialState(INITIAL_STOCKS, SCENARIO_NEWS, 5);
    setStarted(true);
  };

  if (!started) {
    return (
      <div className="splash-screen">
        <div className="splash-content glass-card">
          <h1>NeuroTrade</h1>
          <p className="subtitle">Master the art of information.</p>
          <div className="instructions">
            <p>1. Every day, you will receive 5 news emails.</p>
            <p>2. Analyze the news to find hidden correlations with the market.</p>
            <p>3. Build your portfolio and maximize your returns within 5 days.</p>
          </div>
          <button className="start-btn" onClick={startGame}>Start Trading</button>
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
