import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowLeft,
  Copy,
  Check,
  Crown,
  Trophy,
  Users,
  Play,
  LogOut,
  Plus,
  Minus,
  DoorOpen,
  DoorClosed,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useRoomBattle } from '../hooks/useRoomBattle';
import { useGameStore } from '../store/gameStore';
import { SCENARIOS, CLASSIC_ARCS, selectClassicArc } from '../data';
import { useTranslation } from '../i18n/translations';
import MultiplayerHUD from './MultiplayerHUD';
import Layout from './Layout';
import './RoomBattle.css';

interface Props {
  onBack: () => void;
}

type Screen = 'create-or-join' | 'creating' | 'joining' | 'lobby' | 'playing' | 'finished';

function formatCountdown(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

const MEDAL_LABELS = ['🥇', '🥈', '🥉'];
const PODIUM_CLASSES = ['room-podium-1', 'room-podium-2', 'room-podium-3'];
const MEDAL_CLASSES = ['room-result-medal-1', 'room-result-medal-2', 'room-result-medal-3'];

const RoomBattle: React.FC<Props> = ({ onBack }) => {
  const { t } = useTranslation();
  const { userId, isLoading: authLoading } = useAuth();

  const [screen, setScreen] = useState<Screen>('create-or-join');
  const [playerName, setPlayerName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [joinCode, setJoinCode] = useState('');
  const [copied, setCopied] = useState(false);

  const {
    players,
    roomState,
    timeToNextRefresh,
    isHost,
    error,
    createRoom,
    joinRoom,
    startGame,
    broadcastPortfolio,
    leave,
  } = useRoomBattle(userId);

  const { setInitialState, dayState, portfolio, stocks } = useGameStore();

  const startingCash = SCENARIOS.classic.startingCash;
  const initializedRef = useRef(false);

  // ---- Portfolio value ----
  const computePortfolioValue = useCallback(() => {
    let total = portfolio.cash;
    Object.values(portfolio.holdings).forEach((h) => {
      const stock = stocks[h.symbol];
      if (stock) total += h.quantity * stock.price;
    });
    return total;
  }, [portfolio, stocks]);

  // ---- Initialize game when entering playing state ----
  useEffect(() => {
    if (screen !== 'playing' || !roomState || initializedRef.current) return;
    const arc = selectClassicArc(CLASSIC_ARCS, roomState.seed);
    setInitialState(
      SCENARIOS.classic.stocks,
      arc.news,
      roomState.maxDays,
      startingCash,
      roomState.seed,
      arc.name,
    );
    initializedRef.current = true;

    setTimeout(() => {
      const value = computePortfolioValue();
      const returnPct = ((value - startingCash) / startingCash) * 100;
      broadcastPortfolio(value, returnPct);
    }, 1500);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, roomState]);

  // ---- Detect game end ----
  useEffect(() => {
    if (screen !== 'playing') return;
    if (dayState.currentDay > dayState.maxDays) {
      setScreen('finished');
    }
  }, [dayState.currentDay, dayState.maxDays, screen]);

  // ---- Periodic portfolio broadcast ----
  useEffect(() => {
    if (screen !== 'playing' || !initializedRef.current) return;
    const interval = setInterval(() => {
      const value = computePortfolioValue();
      const returnPct = ((value - startingCash) / startingCash) * 100;
      broadcastPortfolio(value, returnPct);
    }, 10000);
    return () => clearInterval(interval);
  }, [screen, computePortfolioValue, broadcastPortfolio, startingCash]);

  // ---- Sync room status → screen ----
  useEffect(() => {
    if (!roomState) return;
    if (roomState.status === 'playing' && screen === 'lobby') {
      setScreen('playing');
    }
    if (roomState.status === 'finished' && screen === 'playing') {
      setScreen('finished');
    }
  }, [roomState?.status, screen]);

  // ---- Handlers ----
  const handleCreateRoom = useCallback(async () => {
    if (!playerName.trim()) return;
    const code = await createRoom(playerName.trim(), maxPlayers);
    if (code) setScreen('lobby');
  }, [createRoom, playerName, maxPlayers]);

  const handleJoinRoom = useCallback(async () => {
    if (!playerName.trim() || joinCode.length !== 6) return;
    const ok = await joinRoom(joinCode.toUpperCase(), playerName.trim());
    if (ok) setScreen('lobby');
  }, [joinRoom, playerName, joinCode]);

  const handleStartGame = useCallback(async () => {
    await startGame();
  }, [startGame]);

  const handleLeave = useCallback(() => {
    leave();
    initializedRef.current = false;
    onBack();
  }, [leave, onBack]);

  const handleCopyCode = useCallback(async () => {
    if (!roomState) return;
    try {
      await navigator.clipboard.writeText(roomState.roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  }, [roomState]);

  // ---- Auth loading / failed ----
  if (authLoading || !userId) {
    return (
      <div className="room-battle-screen">
        <div className="room-battle-card glass-card room-loading">
          <p>{t('roomBattle.connecting')}</p>
        </div>
      </div>
    );
  }

  // ---- Screen: create-or-join ----
  if (screen === 'create-or-join') {
    return (
      <div className="room-battle-screen">
        <div className="room-battle-card glass-card">
          <button className="room-battle-back-btn" onClick={onBack}>
            <ArrowLeft size={16} />
            {t('roomBattle.back')}
          </button>

          <h1 className="room-battle-title">{t('roomBattle.title')}</h1>
          <p className="room-battle-subtitle">{t('roomBattle.subtitle')}</p>

          <div className="room-battle-field">
            <label className="room-battle-input-label">{t('roomBattle.enterName')}</label>
            <input
              className="room-battle-input"
              type="text"
              placeholder={t('roomBattle.enterName')}
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              maxLength={20}
            />
          </div>

          <div className="room-choice-grid">
            <button
              className="room-choice-card"
              onClick={() => setScreen('creating')}
              disabled={!playerName.trim()}
            >
              <DoorOpen size={28} style={{ color: 'var(--accent-color)' }} />
              <p className="room-choice-card-title">{t('roomBattle.createRoom')}</p>
              <p className="room-choice-card-desc">{t('roomBattle.splashDetail')}</p>
            </button>

            <button
              className="room-choice-card"
              onClick={() => setScreen('joining')}
              disabled={!playerName.trim()}
            >
              <DoorClosed size={28} style={{ color: 'var(--accent-color)' }} />
              <p className="room-choice-card-title">{t('roomBattle.joinRoom')}</p>
              <p className="room-choice-card-desc">{t('roomBattle.enterCode')}</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- Screen: creating ----
  if (screen === 'creating') {
    return (
      <div className="room-battle-screen">
        <div className="room-battle-card glass-card">
          <button className="room-battle-back-btn" onClick={() => setScreen('create-or-join')}>
            <ArrowLeft size={16} />
            {t('roomBattle.back')}
          </button>

          <h1 className="room-battle-title">{t('roomBattle.createRoom')}</h1>
          <p className="room-battle-subtitle">{t('roomBattle.subtitle')}</p>

          <div className="room-battle-field">
            <label className="room-battle-input-label">{t('roomBattle.enterName')}</label>
            <input
              className="room-battle-input"
              type="text"
              placeholder={t('roomBattle.enterName')}
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              maxLength={20}
            />
          </div>

          <div className="room-battle-field">
            <label className="room-battle-input-label">{t('roomBattle.maxPlayers')}</label>
            <div className="room-max-players-row">
              <span className="room-max-players-label">{t('roomBattle.playerCount', { current: String(players.length), max: String(maxPlayers) })}</span>
              <button
                className="room-max-players-btn"
                onClick={() => setMaxPlayers((p) => Math.max(2, p - 1))}
                disabled={maxPlayers <= 2}
              >
                <Minus size={14} />
              </button>
              <span className="room-max-players-value">{maxPlayers}</span>
              <button
                className="room-max-players-btn"
                onClick={() => setMaxPlayers((p) => Math.min(10, p + 1))}
                disabled={maxPlayers >= 10}
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {error && <div className="room-error">{error}</div>}

          <div className="room-battle-actions">
            <button
              className="room-battle-btn-primary"
              onClick={handleCreateRoom}
              disabled={!playerName.trim()}
            >
              <Play size={16} />
              {t('roomBattle.create')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- Screen: joining ----
  if (screen === 'joining') {
    return (
      <div className="room-battle-screen">
        <div className="room-battle-card glass-card">
          <button className="room-battle-back-btn" onClick={() => setScreen('create-or-join')}>
            <ArrowLeft size={16} />
            {t('roomBattle.back')}
          </button>

          <h1 className="room-battle-title">{t('roomBattle.joinRoom')}</h1>
          <p className="room-battle-subtitle">{t('roomBattle.shareCode')}</p>

          <div className="room-battle-field">
            <label className="room-battle-input-label">{t('roomBattle.enterName')}</label>
            <input
              className="room-battle-input"
              type="text"
              placeholder={t('roomBattle.enterName')}
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              maxLength={20}
            />
          </div>

          <div className="room-battle-field">
            <label className="room-battle-input-label">{t('roomBattle.roomCode')}</label>
            <input
              className="room-battle-input room-code-input"
              type="text"
              placeholder="XXXXXX"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase().slice(0, 6))}
              maxLength={6}
              spellCheck={false}
              autoCapitalize="characters"
            />
          </div>

          {error && <div className="room-error">{error}</div>}

          <div className="room-battle-actions">
            <button
              className="room-battle-btn-primary"
              onClick={handleJoinRoom}
              disabled={!playerName.trim() || joinCode.length !== 6}
            >
              <DoorOpen size={16} />
              {t('roomBattle.join')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- Screen: lobby ----
  if (screen === 'lobby') {
    const playerCount = players.length;
    const maxP = roomState?.maxPlayers ?? maxPlayers;
    const canStart = isHost && playerCount >= 2;

    return (
      <div className="room-battle-screen">
        <div className="room-battle-card glass-card">
          <h1 className="room-battle-title">{t('roomBattle.lobby')}</h1>
          <p className="room-battle-subtitle">{t('roomBattle.shareCode')}</p>

          {roomState && (
            <div className="room-code-display">
              <span className="room-code-display-code">{roomState.roomCode}</span>
              <button
                className={`room-code-copy-btn${copied ? ' copied' : ''}`}
                onClick={handleCopyCode}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? t('roomBattle.codeCopied') : t('roomBattle.copyCode')}
              </button>
            </div>
          )}

          <div className="room-player-count">
            <Users size={14} />
            {t('roomBattle.playerCount', { current: String(playerCount), max: String(maxP) })}
          </div>

          <div className="room-player-list">
            {players.map((p, idx) => (
              <div
                key={p.playerId}
                className="room-player-card"
                style={{ animationDelay: `${idx * 0.06}s` }}
              >
                <div className="room-player-avatar">
                  {p.playerName.charAt(0).toUpperCase()}
                </div>
                <span className="room-player-name">{p.playerName}</span>
                {p.isHost && (
                  <span className="room-host-badge">
                    <Crown size={11} />
                    {t('roomBattle.host')}
                  </span>
                )}
              </div>
            ))}
          </div>

          {!canStart && isHost && (
            <p className="room-waiting-hint">{t('roomBattle.needMorePlayers')}</p>
          )}

          {error && <div className="room-error">{error}</div>}

          <div className="room-battle-actions">
            {isHost && (
              <button
                className="room-battle-btn-primary"
                onClick={handleStartGame}
                disabled={!canStart}
              >
                <Play size={16} />
                {t('roomBattle.startGame')}
              </button>
            )}
            {!isHost && (
              <div className="room-loading">
                <p>{t('roomBattle.waitingForHost')}</p>
              </div>
            )}
            <button className="room-battle-btn-danger" onClick={handleLeave}>
              <LogOut size={15} />
              {t('roomBattle.leave')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- Screen: playing ----
  if (screen === 'playing') {
    const myValue = computePortfolioValue();
    const myReturnPct = ((myValue - startingCash) / startingCash) * 100;

    const leaderboard = (() => {
      const list = [...players];
      const myId = userId ?? '';
      const idx = list.findIndex((p) => p.playerId === myId);
      if (idx >= 0) {
        list[idx] = { ...list[idx], portfolioValue: myValue, returnPct: myReturnPct };
      } else {
        list.push({
          playerId: myId,
          playerName,
          portfolioValue: myValue,
          returnPct: myReturnPct,
          isHost: false,
          joinedAt: Date.now(),
        });
      }
      return list.sort((a, b) => b.returnPct - a.returnPct);
    })();

    const currentDay = roomState?.day ?? dayState.currentDay;
    const maxDays = roomState?.maxDays ?? dayState.maxDays;

    return (
      <div className="room-battle-playing app-container">
        <Layout
          onGoHome={handleLeave}
          dayLabel={`${t('roomBattle.day')} ${currentDay}/${maxDays}`}
          endDayLabel={`${t('roomBattle.nextRefresh')} ${formatCountdown(timeToNextRefresh)}`}
          hudOverlay={
            <MultiplayerHUD
              totalPlayers={Math.max(1, leaderboard.length)}
              leaderboard={leaderboard}
              currentPlayerId={userId ?? ''}
            />
          }
        />
      </div>
    );
  }

  // ---- Screen: finished ----
  if (screen === 'finished') {
    const sorted = [...players].sort((a, b) => b.returnPct - a.returnPct);

    return (
      <div className="room-battle-screen">
        <div className="room-battle-card glass-card room-results">
          <h1 className="room-results-title">
            <Trophy size={24} style={{ color: '#f59e0b' }} />
            {t('roomBattle.results')}
          </h1>

          <div className="room-result-list">
            {sorted.map((p, idx) => {
              const isPositive = p.returnPct >= 0;
              const podiumClass = idx < 3 ? PODIUM_CLASSES[idx] : '';
              const medalClass = idx < 3 ? MEDAL_CLASSES[idx] : 'room-result-medal-n';
              const medalLabel = idx < 3 ? MEDAL_LABELS[idx] : String(idx + 1);

              return (
                <div
                  key={p.playerId}
                  className={`room-result-card ${podiumClass}`}
                >
                  <div className={`room-result-medal ${medalClass}`}>
                    {medalLabel}
                  </div>
                  <div className="room-result-info">
                    <div className="room-result-name">
                      {p.playerName}
                      {p.isHost && (
                        <span className="room-host-badge">
                          <Crown size={10} />
                          {t('roomBattle.host')}
                        </span>
                      )}
                    </div>
                    <div className="room-result-value">
                      ${p.portfolioValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <span className={`room-result-return ${isPositive ? 'positive' : 'negative'}`}>
                    {isPositive ? '+' : ''}{p.returnPct.toFixed(2)}%
                  </span>
                </div>
              );
            })}
          </div>

          {error && <div className="room-error">{error}</div>}

          <div className="room-battle-actions">
            {isHost && (
              <button
                className="room-battle-btn-primary"
                onClick={async () => {
                  initializedRef.current = false;
                  const code = await createRoom(playerName.trim(), maxPlayers);
                  if (code) setScreen('lobby');
                }}
              >
                <Play size={16} />
                {t('roomBattle.playAgain')}
              </button>
            )}
            <button className="room-battle-btn-secondary" onClick={handleLeave}>
              <LogOut size={15} />
              {t('roomBattle.leave')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default RoomBattle;
