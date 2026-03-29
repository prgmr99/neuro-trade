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

  const STORAGE_KEY = 'neurotrade-live-session';

  // Restore saved session (playerName + entered state)
  const [playerName, setPlayerName] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).playerName || '';
    } catch { /* ignore */ }
    return '';
  });
  const [entered, setEntered] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return !!JSON.parse(saved).entered;
    } catch { /* ignore */ }
    return false;
  });

  const market = useLiveMarket(entered ? userId : null, playerName);
  const { setInitialState, nextDay, portfolio, stocks } = useGameStore();

  const startingCash = SCENARIOS.classic.startingCash;

  // Track slot for detecting day changes
  const lastSlotRef = useRef<number>(-1);
  const initializedRef = useRef(false);

  // Cumulative day counter (never resets)
  const [totalDay, setTotalDay] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).totalDay || 1;
    } catch { /* ignore */ }
    return 1;
  });

  // Save session to localStorage
  const saveSession = useCallback(() => {
    if (!entered) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        playerName,
        entered: true,
        portfolio: {
          cash: portfolio.cash,
          holdings: portfolio.holdings,
        },
        cycleNumber: Math.floor(Math.floor(Date.now() / 60000) / 5),
        totalDay,
      }));
    } catch { /* storage full */ }
  }, [entered, playerName, portfolio]);

  // Persist portfolio on every change
  useEffect(() => {
    if (entered && initializedRef.current) {
      saveSession();
    }
  }, [entered, portfolio, saveSession]);

  // Compute portfolio value
  const computePortfolioValue = useCallback(() => {
    let total = portfolio.cash;
    Object.values(portfolio.holdings).forEach((h) => {
      const stock = stocks[h.symbol];
      if (stock) total += h.quantity * stock.price;
    });
    return total;
  }, [portfolio, stocks]);

  // Countdown timer + auto-advance (all-in-one)
  const [countdown, setCountdown] = useState(() => 60 - (Math.floor(Date.now() / 1000) % 60));

  // Initialize game on enter
  useEffect(() => {
    if (!entered || initializedRef.current) return;

    const now = Date.now();
    const timeSlot = Math.floor(now / 60000);
    const cycleNumber = Math.floor(timeSlot / 5);
    const dayInCycle = (timeSlot % 5) + 1;
    const seed = hashSeed(String(cycleNumber));

    const arc = selectClassicArc(CLASSIC_ARCS, seed);
    setInitialState(SCENARIOS.classic.stocks, arc.news, 999, startingCash, seed);

    // Fast-forward to current day in cycle
    for (let d = 1; d < dayInCycle; d++) {
      nextDay();
    }

    // Restore saved portfolio (persists across cycles)
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.portfolio) {
          useGameStore.setState({
            portfolio: {
              cash: parsed.portfolio.cash,
              holdings: parsed.portfolio.holdings,
            },
          });
        }
      }
    } catch { /* ignore */ }

    lastSlotRef.current = timeSlot;
    initializedRef.current = true;

    // Broadcast initial portfolio so we appear in leaderboard
    setTimeout(() => {
      const value = computePortfolioValue();
      const returnPct = ((value - startingCash) / startingCash) * 100;
      market.broadcastPortfolio(value, returnPct);
    }, 1500); // slight delay for channel to connect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entered]);

  // Timer: countdown + detect slot change for auto-advance
  useEffect(() => {
    if (!entered) return;
    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = 60 - (Math.floor(now / 1000) % 60);
      setCountdown(remaining);

      // Broadcast portfolio every 10 seconds to keep leaderboard fresh
      if (Math.floor(now / 1000) % 10 === 0) {
        const v = computePortfolioValue();
        const r = ((v - startingCash) / startingCash) * 100;
        market.broadcastPortfolio(v, r);
      }

      const timeSlot = Math.floor(now / 60000);
      if (lastSlotRef.current !== -1 && timeSlot !== lastSlotRef.current) {
        const cycleNumber = Math.floor(timeSlot / 5);
        const dayInCycle = (timeSlot % 5) + 1;

        if (dayInCycle === 1) {
          // New cycle — load new news but KEEP portfolio
          const savedPortfolio = useGameStore.getState().portfolio;
          const seed = hashSeed(String(cycleNumber));
          const arc = selectClassicArc(CLASSIC_ARCS, seed);
          setInitialState(SCENARIOS.classic.stocks, arc.news, 999, startingCash, seed);
          // Restore portfolio immediately
          useGameStore.setState({ portfolio: savedPortfolio });
        } else {
          // Same cycle — advance to next day
          nextDay();
        }
        setTotalDay((prev: number) => prev + 1);

        lastSlotRef.current = timeSlot;

        // Broadcast updated portfolio
        const value = computePortfolioValue();
        const returnPct = ((value - startingCash) / startingCash) * 100;
        market.broadcastPortfolio(value, returnPct);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [entered, computePortfolioValue, market, nextDay, setInitialState, startingCash]);

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

  // Build leaderboard: ensure current player is always included
  const myValue = computePortfolioValue();
  const myReturnPct = ((myValue - startingCash) / startingCash) * 100;
  const myEntry = {
    playerId: userId ?? '',
    playerName,
    portfolioValue: myValue,
    returnPct: myReturnPct,
    joinedAt: Date.now(),
  };

  const leaderboardWithMe = (() => {
    const players = [...market.players];
    const idx = players.findIndex(p => p.playerId === myEntry.playerId);
    if (idx >= 0) {
      players[idx] = { ...players[idx], portfolioValue: myValue, returnPct: myReturnPct };
    } else {
      players.push(myEntry);
    }
    return players.sort((a, b) => b.returnPct - a.returnPct);
  })();

  // --- Playing ---
  return (
    <div className="app-container">
      <Layout
        onGoHome={handleLeave}
        dayLabel={`${t('multiplayer.day')} ${totalDay}`}
        endDayLabel={`${t('multiplayer.nextRefresh')} ${formatCountdown(countdown)}`}
        hudOverlay={
          <MultiplayerHUD
            totalPlayers={Math.max(1, leaderboardWithMe.length)}
            leaderboard={leaderboardWithMe}
            currentPlayerId={userId ?? ''}
          />
        }
      />
    </div>
  );
};

export default LiveCompetition;
