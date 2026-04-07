import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLiveMarket } from '../../hooks/useLiveMarket';
import { useGameStore } from '../../store/gameStore';
import { SCENARIOS, CLASSIC_ARCS, CLASSIC_CHAINS, selectArcFromChain, buildPhaseNews } from '../../data';
import MultiplayerHUD from '../MultiplayerHUD/MultiplayerHUD';
import Layout from '../Layout/Layout';
import { useTranslation } from '../../i18n/translations';

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

  const initializedRef = useRef(false);
  const lastDayRef = useRef<number>(-1);
  const lastPhaseRef = useRef<number>(-1);

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
        totalDay,
      }));
    } catch { /* storage full */ }
  }, [entered, playerName, portfolio, totalDay]);

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

  // Initialize game when market state is first available
  useEffect(() => {
    if (!entered || !market.marketState || initializedRef.current) return;

    const { day, seed } = market.marketState;

    // Use chain system: phase 0's arc for initialization
    const { arc } = selectArcFromChain(CLASSIC_CHAINS, CLASSIC_ARCS, seed, 0);
    setInitialState(SCENARIOS.classic.stocks, arc.news, 999, startingCash, seed);

    // Fast-forward to current day in cycle, appending new phase news when crossing boundaries
    for (let d = 1; d < day; d++) {
      const nextGameDay = d + 1;
      const nextPhase = Math.floor((nextGameDay - 1) / 5);
      const prevPhase = Math.floor((d - 1) / 5);
      if (nextPhase !== prevPhase) {
        const phaseNews = buildPhaseNews(CLASSIC_ARCS, CLASSIC_CHAINS, seed, nextPhase);
        const currentAllNews = useGameStore.getState().allNews;
        useGameStore.setState({ allNews: [...currentAllNews, ...phaseNews] });
      }
      nextDay();
    }

    // Restore saved portfolio
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          parsed.portfolio &&
          typeof parsed.portfolio.cash === 'number' &&
          parsed.portfolio.cash >= 0 &&
          typeof parsed.portfolio.holdings === 'object' &&
          parsed.portfolio.holdings !== null
        ) {
          useGameStore.setState({
            portfolio: {
              cash: parsed.portfolio.cash,
              holdings: parsed.portfolio.holdings,
            },
          });
        }
      }
    } catch { /* ignore */ }

    lastDayRef.current = day;
    lastPhaseRef.current = Math.floor((day - 1) / 5);
    initializedRef.current = true;

    // Broadcast initial portfolio so we appear in leaderboard
    setTimeout(() => {
      const value = computePortfolioValue();
      const returnPct = ((value - startingCash) / startingCash) * 100;
      market.broadcastPortfolio(value, returnPct);
    }, 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally run only when entered/marketState first becomes available
  }, [entered, market.marketState]);

  // React to day changes from the hook (presence-driven, infinite progression)
  useEffect(() => {
    if (!entered || !initializedRef.current || !market.marketState) return;

    const { day } = market.marketState;

    // Skip if no change
    if (day === lastDayRef.current) return;

    // Check if we've entered a new 5-day phase — append fresh news from chain
    const currentPhase = Math.floor((day - 1) / 5);
    if (currentPhase !== lastPhaseRef.current) {
      const { seed } = market.marketState;
      const phaseNews = buildPhaseNews(CLASSIC_ARCS, CLASSIC_CHAINS, seed, currentPhase);
      const currentAllNews = useGameStore.getState().allNews;
      useGameStore.setState({ allNews: [...currentAllNews, ...phaseNews] });
      lastPhaseRef.current = currentPhase;
    }

    // Advance game day
    nextDay();
    lastDayRef.current = day;
    setTotalDay((prev: number) => prev + 1);
    window.scrollTo(0, 0);

    // Broadcast updated portfolio
    const value = computePortfolioValue();
    const returnPct = ((value - startingCash) / startingCash) * 100;
    market.broadcastPortfolio(value, returnPct);
  }, [market.marketState?.day]);

  // Periodic portfolio broadcast (every 10 seconds)
  useEffect(() => {
    if (!entered || !initializedRef.current) return;
    const interval = setInterval(() => {
      const v = computePortfolioValue();
      const r = ((v - startingCash) / startingCash) * 100;
      market.broadcastPortfolio(v, r);
    }, 10000);
    return () => clearInterval(interval);
  }, [entered, computePortfolioValue, market, startingCash]);

  const handleLeave = useCallback(() => {
    market.leave();
    onBack();
  }, [market, onBack]);

  // Show "taking too long" hint after 5 seconds of loading
  const [showSlowHint, setShowSlowHint] = useState(false);
  useEffect(() => {
    if (!authLoading && market.marketState) {
      setShowSlowHint(false);
      return;
    }
    const id = setTimeout(() => setShowSlowHint(true), 5000);
    return () => clearTimeout(id);
  }, [authLoading, market.marketState]);

  const resetSession = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch { /* ignore */ }
    market.leave();
    onBack();
  }, [market, onBack]);

  const renderLoadingState = () => (
    <div className="splash-screen">
      <div className="splash-content glass-card" style={{ maxWidth: '500px', width: '95%', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: showSlowHint ? '1rem' : 0 }}>
          {t('multiplayer.waiting')}
        </p>
        {showSlowHint && (
          <>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
              {t('multiplayer.loadingTakingTooLong')}
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem', opacity: 0.8 }}>
              {t('multiplayer.loadingHint')}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexDirection: 'column' }}>
              <button className="ranking-link-btn" onClick={resetSession}>
                {t('multiplayer.resetSession')}
              </button>
              <button className="ranking-link-btn" onClick={onBack}>
                {t('multiplayer.backToMenu')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // --- Auth loading ---
  if (authLoading) {
    return renderLoadingState();
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
    return renderLoadingState();
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
        endDayLabel={`${t('multiplayer.nextRefresh')} ${formatCountdown(market.timeToNextRefresh)}`}
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
