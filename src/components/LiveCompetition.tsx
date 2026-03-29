import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLiveMarket } from '../hooks/useLiveMarket';
import { useGameStore } from '../store/gameStore';
import { SCENARIOS, CLASSIC_ARCS, selectClassicArc } from '../data';
import { hashSeed } from '../lib/prng';
import MultiplayerHUD from './MultiplayerHUD';
import Layout from './Layout';
import { useTranslation } from '../i18n/translations';

interface Props {
  onBack: () => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getSlotInfo() {
  const now = Date.now();
  const timeSlot = Math.floor(now / 60000);
  const cycleNumber = Math.floor(timeSlot / 5);
  const dayInCycle = (timeSlot % 5) + 1;
  return { timeSlot, cycleNumber, dayInCycle };
}

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

  // Track the time slot we last initialized/advanced to
  const lastSlotRef = useRef<number>(-1);

  // Compute portfolio value
  const computePortfolioValue = useCallback(() => {
    let total = portfolio.cash;
    Object.values(portfolio.holdings).forEach((h) => {
      const stock = stocks[h.symbol];
      if (stock) total += h.quantity * stock.price;
    });
    return total;
  }, [portfolio, stocks]);

  // Local countdown timer (ticks every second) + auto-advance
  const [countdown, setCountdown] = useState(() => 60 - (Math.floor(Date.now() / 1000) % 60));

  useEffect(() => {
    if (!entered) return;
    const interval = setInterval(() => {
      const remaining = 60 - (Math.floor(Date.now() / 1000) % 60);
      setCountdown(remaining);

      // Detect slot change for auto-advance
      if (lastSlotRef.current !== -1) {
        const { timeSlot, cycleNumber, dayInCycle } = getSlotInfo();
        if (timeSlot !== lastSlotRef.current) {
          if (dayInCycle === 1) {
            const seed = hashSeed(String(cycleNumber));
            const arc = selectClassicArc(CLASSIC_ARCS, seed);
            setInitialState(SCENARIOS.classic.stocks, arc.news, 999, startingCash, seed);
          } else {
            nextDay();
          }
          lastSlotRef.current = timeSlot;

          const value = computePortfolioValue();
          const returnPct = ((value - startingCash) / startingCash) * 100;
          market.broadcastPortfolio(value, returnPct);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [entered, computePortfolioValue, market, nextDay, setInitialState, startingCash]);

  // Initialize game when entering the market
  useEffect(() => {
    if (!entered) return;
    const { timeSlot, cycleNumber, dayInCycle } = getSlotInfo();

    if (lastSlotRef.current === -1) {
      const seed = hashSeed(String(cycleNumber));
      const arc = selectClassicArc(CLASSIC_ARCS, seed);
      setInitialState(SCENARIOS.classic.stocks, arc.news, 999, startingCash, seed);
      // Fast-forward to current day in cycle
      for (let d = 1; d < dayInCycle; d++) {
        nextDay();
      }
      lastSlotRef.current = timeSlot;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entered]);

  // (Auto-advance is handled by the local countdown timer above)

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
