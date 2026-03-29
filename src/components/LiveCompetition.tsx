import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLiveMarket, LiveMarketState } from '../hooks/useLiveMarket';
import { useGameStore } from '../store/gameStore';
import { SCENARIOS, CLASSIC_ARCS, selectClassicArc } from '../data';
import MultiplayerHUD from './MultiplayerHUD';
import Layout from './Layout';
import { useTranslation } from '../i18n/translations';

interface Props {
  onBack: () => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatCountdown(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const LiveCompetition: React.FC<Props> = ({ onBack }) => {
  const { t } = useTranslation();
  const { userId, isLoading: authLoading } = useAuth();

  const [playerName, setPlayerName] = useState('');
  const [entered, setEntered] = useState(false);

  const market = useLiveMarket(entered ? userId : null, playerName);
  const { setInitialState, nextDay, portfolio, stocks } = useGameStore();

  const startingCash = SCENARIOS.classic.startingCash;

  // Track the previous market state to detect changes
  const prevStateRef = useRef<LiveMarketState | null>(null);

  // Compute portfolio value
  const computePortfolioValue = useCallback(() => {
    let total = portfolio.cash;
    Object.values(portfolio.holdings).forEach((h) => {
      const stock = stocks[h.symbol];
      if (stock) total += h.quantity * stock.price;
    });
    return total;
  }, [portfolio, stocks]);

  // Simplified countdown (purely cosmetic)
  const [countdown, setCountdown] = useState(() => 60 - (Math.floor(Date.now() / 1000) % 60));

  useEffect(() => {
    if (!entered) return;
    const interval = setInterval(() => {
      setCountdown(60 - (Math.floor(Date.now() / 1000) % 60));
    }, 1000);
    return () => clearInterval(interval);
  }, [entered]);

  // React to server market state changes
  useEffect(() => {
    if (!entered || !market.marketState) return;
    const { cycleNumber, day, seed } = market.marketState;
    const prev = prevStateRef.current;

    if (!prev) {
      // First load -- initialize game with server state
      const arc = selectClassicArc(CLASSIC_ARCS, seed);
      setInitialState(SCENARIOS.classic.stocks, arc.news, 999, startingCash, seed);
      // Fast-forward to current day
      for (let d = 1; d < day; d++) {
        nextDay();
      }
    } else if (cycleNumber !== prev.cycleNumber) {
      // New cycle -- reinitialize
      const arc = selectClassicArc(CLASSIC_ARCS, seed);
      setInitialState(SCENARIOS.classic.stocks, arc.news, 999, startingCash, seed);
    } else if (day !== prev.day) {
      // Same cycle, new day -- advance
      nextDay();
    }

    prevStateRef.current = market.marketState;

    // Broadcast portfolio after any change
    const value = computePortfolioValue();
    const returnPct = ((value - startingCash) / startingCash) * 100;
    market.broadcastPortfolio(value, returnPct);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entered, market.marketState]);

  const handleLeave = useCallback(() => {
    market.leave();
    onBack();
  }, [market, onBack]);

  // --- Auth loading ---
  if (authLoading) {
    return (
      <div className="splash-screen">
        <div className="splash-content glass-card" style={{ maxWidth: '500px', width: '95%', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>{t('multiplayer.waiting')}</p>
        </div>
      </div>
    );
  }

  // --- Name entry ---
  if (!entered) {
    return (
      <div className="splash-screen">
        <div className="splash-content glass-card" style={{ maxWidth: '500px', width: '95%' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>
            {t('multiplayer.title')}
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>
            {t('multiplayer.createDesc')}
          </p>

          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder={t('multiplayer.enterName')}
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 0.75rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--surface-color)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexDirection: 'column' }}>
            <button
              className="start-btn"
              onClick={() => setEntered(true)}
              disabled={!playerName.trim()}
              style={{ background: 'var(--accent-color)' }}
            >
              {t('multiplayer.joinRoom')}
            </button>
            <button className="ranking-link-btn" onClick={onBack}>
              {t('multiplayer.back')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Loading market state ---
  if (!market.marketState) {
    return (
      <div className="splash-screen">
        <div className="splash-content glass-card" style={{ maxWidth: '500px', width: '95%', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>{t('multiplayer.waiting')}</p>
        </div>
      </div>
    );
  }

  // --- Playing ---
  return (
    <div className="app-container">
      <Layout
        onGoHome={handleLeave}
        endDayLabel={`${t('multiplayer.nextRefresh')} ${formatCountdown(countdown)}`}
        hudOverlay={
          <MultiplayerHUD
            totalPlayers={Math.max(1, market.players.length)}
            leaderboard={market.players}
            currentPlayerId={userId ?? ''}
          />
        }
      />
    </div>
  );
};

export default LiveCompetition;
