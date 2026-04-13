import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGameStore } from '../../store/gameStore';
import { useTranslation } from '../../i18n/translations';
import { SCENARIOS, CLASSIC_ARCS, selectClassicArc } from '../../data';
import { supabase } from '../../lib/supabase';
import { getPlayerId } from '../../lib/identity';
import Layout from '../Layout/Layout';
import { trackDuelCreated, trackDuelJoined, trackGameStarted } from '../../lib/analytics';

interface Props {
  onBack: () => void;
  initialSeed?: number;
}

type DuelState = 'create' | 'join' | 'playing' | 'result' | 'versus';

interface DuelRow {
  id: string;
  seed: number;
  player1_id: string;
  player1_name: string;
  player1_return: number;
  player1_value: number;
  player2_id: string | null;
  player2_name: string | null;
  player2_return: number | null;
  player2_value: number | null;
  created_at: string;
}

const DuelMode: React.FC<Props> = ({ onBack, initialSeed }) => {
  const [searchParams] = useSearchParams();
  const duelParam = searchParams.get('seed');
  const { t } = useTranslation();
  const { setInitialState, dayState, portfolio, stocks } = useGameStore();

  const [duelState, setDuelState] = useState<DuelState>(() => {
    if (initialSeed !== undefined) return 'join';
    if (duelParam) return 'join';
    return 'create';
  });

  const [seed, setSeed] = useState<number>(() => {
    if (initialSeed !== undefined) return initialSeed;
    if (duelParam) return parseInt(duelParam, 10);
    return Math.floor(Math.random() * 1000000);
  });

  const [copied, setCopied] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [savedResult, setSavedResult] = useState<{ finalValue: number; returnPct: number } | null>(null);
  const [opponentData, setOpponentData] = useState<DuelRow | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const isPlayer1Ref = useRef(true);

  const shareLink = `${window.location.origin}/duel?seed=${seed}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const startGame = () => {
    const scenario = SCENARIOS.classic;
    const arc = selectClassicArc(CLASSIC_ARCS, seed);
    setInitialState(scenario.stocks, arc.news, scenario.maxDays, scenario.startingCash, seed);
    setDuelState('playing');
    trackGameStarted('duel', false);
    if (isPlayer1Ref.current) {
      trackDuelCreated(seed);
    } else {
      trackDuelJoined(seed);
    }
  };

  // Compute final portfolio value
  const computeFinalValue = () => {
    let total = portfolio.cash;
    Object.values(portfolio.holdings).forEach((h) => {
      const stock = stocks[h.symbol];
      if (stock) total += h.quantity * stock.price;
    });
    return total;
  };

  // Transition from playing to result when game ends
  useEffect(() => {
    if (duelState === 'playing' && dayState.currentDay > dayState.maxDays) {
      handleGameEnd();
    }
  }, [dayState.currentDay, dayState.maxDays, duelState]);

  const handleGameEnd = async () => {
    const finalValue = computeFinalValue();
    const startingCash = SCENARIOS.classic.startingCash;
    const returnPct = ((finalValue - startingCash) / startingCash) * 100;
    const playerId = getPlayerId();
    const name = playerName || 'Anonymous';

    setSavedResult({ finalValue, returnPct });

    // Save to global rankings
    await supabase.from('rankings').insert({
      player_name: name.slice(0, 20),
      message: '',
      return_pct: Math.round(returnPct * 100) / 100,
      final_value: Math.round(finalValue * 100) / 100,
      initial_value: startingCash,
      mode: 'duel',
    });

    // Check if a duel row already exists for this seed
    const { data: existing } = await supabase
      .from('duels')
      .select('*')
      .eq('seed', seed)
      .single();

    if (!existing) {
      // We are Player 1 — create the row
      isPlayer1Ref.current = true;
      const { error } = await supabase.from('duels').insert({
        seed,
        player1_id: playerId,
        player1_name: name,
        player1_return: returnPct,
        player1_value: finalValue,
      });
      if (error) setSaveError(error.message);
    } else if (!existing.player2_id || existing.player2_id === playerId) {
      // We are Player 2 (or filling in the second slot)
      isPlayer1Ref.current = false;
      const { error } = await supabase
        .from('duels')
        .update({
          player2_id: playerId,
          player2_name: name,
          player2_return: returnPct,
          player2_value: finalValue,
        })
        .eq('seed', seed);
      if (error) setSaveError(error.message);

      // Fetch full row to show versus
      const { data: updated } = await supabase
        .from('duels')
        .select('*')
        .eq('seed', seed)
        .single();
      if (updated?.player1_value !== null) {
        setOpponentData(updated as DuelRow);
        setDuelState('versus');
        return;
      }
    }

    setDuelState('result');
  };

  const checkOpponent = async () => {
    const { data } = await supabase
      .from('duels')
      .select('*')
      .eq('seed', seed)
      .single();
    if (data && data.player2_value !== null) {
      setOpponentData(data as DuelRow);
      setDuelState('versus');
    }
  };

  const challengeAgain = () => {
    const newSeed = Math.floor(Math.random() * 1000000);
    setSeed(newSeed);
    setCopied(false);
    setSavedResult(null);
    setOpponentData(null);
    setSaveError(null);
    setDuelState('create');
  };

  // --- Create State ---
  if (duelState === 'create') {
    return (
      <div className="splash-screen">
        <div className="splash-content glass-card" style={{ maxWidth: '500px', width: '95%' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{t('duel.createTitle')}</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            {t('duel.createDesc')}
          </p>

          <div style={{
            background: 'var(--surface-light)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            wordBreak: 'break-all',
            marginBottom: '1rem',
            fontFamily: 'monospace',
          }}>
            {shareLink}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder={t('duel.enterName')}
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              style={{
                flex: 1,
                padding: '0.6rem 0.75rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--surface-color)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexDirection: 'column' }}>
            <button className="start-btn" onClick={copyLink}>
              {copied ? t('duel.copied') : t('duel.copyLink')}
            </button>
            <button className="ranking-link-btn" onClick={onBack}>
              {t('duel.back')}
            </button>
          </div>
          <div className="gameover-cta-desktop" style={{ marginTop: '0.75rem' }}>
            <button className="start-btn" onClick={startGame} style={{ background: 'var(--accent-color)', width: '100%' }}>
              {t('duel.startGame')}
            </button>
          </div>
          <div className="gameover-actions-spacer" />
        </div>
        <div className="gameover-fixed-bottom">
          <button className="start-btn" onClick={startGame}>{t('duel.startGame')}</button>
        </div>
      </div>
    );
  }

  // --- Join State ---
  if (duelState === 'join') {
    return (
      <div className="splash-screen">
        <div className="splash-content glass-card" style={{ maxWidth: '500px', width: '95%' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{t('duel.challenged')}</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Seed: <strong style={{ color: 'var(--text-primary)' }}>{seed}</strong>
          </p>

          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder={t('duel.enterName')}
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
            <button className="ranking-link-btn" onClick={onBack}>
              {t('duel.back')}
            </button>
          </div>
          <div className="gameover-cta-desktop" style={{ marginTop: '0.75rem' }}>
            <button className="start-btn" onClick={startGame} style={{ background: 'var(--accent-color)', width: '100%' }}>
              {t('duel.accept')}
            </button>
          </div>
          <div className="gameover-actions-spacer" />
        </div>
        <div className="gameover-fixed-bottom">
          <button className="start-btn" onClick={startGame}>{t('duel.accept')}</button>
        </div>
      </div>
    );
  }

  // --- Playing State ---
  if (duelState === 'playing') {
    return (
      <div className="app-container">
        <Layout />
      </div>
    );
  }

  // --- Result State (waiting for opponent) ---
  if (duelState === 'result' && savedResult) {
    const startingCash = SCENARIOS.classic.startingCash;
    return (
      <div className="splash-screen">
        <div className="splash-content glass-card" style={{ maxWidth: '500px', width: '95%' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{t('duel.yourResult')}</h1>

          <div style={{
            background: 'var(--surface-light)',
            borderRadius: '12px',
            padding: '1.25rem',
            marginBottom: '1.5rem',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: savedResult.returnPct >= 0 ? 'var(--positive)' : 'var(--negative)' }}>
              {savedResult.returnPct >= 0 ? '+' : ''}{savedResult.returnPct.toFixed(2)}%
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              ${savedResult.finalValue.toFixed(0)} / ${startingCash.toLocaleString()} start
            </div>
          </div>

          {saveError && (
            <p style={{ color: 'var(--negative)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Error saving: {saveError}
            </p>
          )}

          <div style={{
            background: 'var(--surface-light)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            marginBottom: '1rem',
            textAlign: 'center',
          }}>
            {t('duel.waiting')}
            <br />
            <span style={{ fontSize: '0.8rem' }}>{t('duel.shareReminder')}</span>
          </div>

          <div style={{
            background: 'var(--surface-light)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '0.6rem 0.75rem',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            wordBreak: 'break-all',
            marginBottom: '1rem',
            fontFamily: 'monospace',
          }}>
            {shareLink}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexDirection: 'column' }}>
            <button className="start-btn" onClick={copyLink}>
              {copied ? t('duel.copied') : t('duel.copyLink')}
            </button>
            <button className="ranking-link-btn" onClick={onBack}>
              {t('duel.back')}
            </button>
          </div>
          <div className="gameover-cta-desktop" style={{ marginTop: '0.75rem' }}>
            <button className="start-btn" onClick={checkOpponent} style={{ background: 'var(--surface-light)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', width: '100%' }}>
              Check for opponent
            </button>
          </div>
          <div className="gameover-actions-spacer" />
        </div>
        <div className="gameover-fixed-bottom">
          <button className="start-btn" onClick={checkOpponent} style={{ background: 'var(--surface-light)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}>
            Check for opponent
          </button>
        </div>
      </div>
    );
  }

  // --- Versus State (both completed) ---
  if (duelState === 'versus' && opponentData) {
    const p1Return = opponentData.player1_return ?? 0;
    const p2Return = opponentData.player2_return ?? 0;
    const p1Value = opponentData.player1_value ?? 0;
    const p2Value = opponentData.player2_value ?? 0;
    const p1Name = opponentData.player1_name || 'Player 1';
    const p2Name = opponentData.player2_name || 'Player 2';

    const p1Wins = p1Return > p2Return;
    const p2Wins = p2Return > p1Return;
    const draw = p1Return === p2Return;

    const CardStyle: React.CSSProperties = {
      flex: 1,
      background: 'var(--surface-light)',
      borderRadius: '12px',
      padding: '1rem',
      textAlign: 'center',
      border: '1px solid var(--border-color)',
    };

    const WinnerStyle: React.CSSProperties = {
      ...CardStyle,
      border: '2px solid var(--accent-color)',
      background: 'var(--surface-color)',
    };

    return (
      <div className="splash-screen">
        <div className="splash-content glass-card" style={{ maxWidth: '540px', width: '95%' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            {draw ? t('duel.draw') : t('duel.versus')}
          </h1>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'stretch' }}>
            {/* Player 1 */}
            <div style={p1Wins && !draw ? WinnerStyle : CardStyle}>
              {p1Wins && !draw && <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>🏆 {t('duel.winner')}</div>}
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                {p1Name}
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: p1Return >= 0 ? 'var(--positive)' : 'var(--negative)' }}>
                {p1Return >= 0 ? '+' : ''}{p1Return.toFixed(2)}%
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                ${p1Value.toFixed(0)}
              </div>
            </div>

            {/* VS divider */}
            <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.9rem' }}>
              {t('duel.versus')}
            </div>

            {/* Player 2 */}
            <div style={p2Wins && !draw ? WinnerStyle : CardStyle}>
              {p2Wins && !draw && <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>🏆 {t('duel.winner')}</div>}
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                {p2Name}
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: p2Return >= 0 ? 'var(--positive)' : 'var(--negative)' }}>
                {p2Return >= 0 ? '+' : ''}{p2Return.toFixed(2)}%
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                ${p2Value.toFixed(0)}
              </div>
            </div>
          </div>

          {draw && (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
              {t('duel.draw')}
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', flexDirection: 'column' }}>
            <button className="ranking-link-btn" onClick={onBack}>
              {t('duel.back')}
            </button>
          </div>
          <div className="gameover-cta-desktop">
            <button className="start-btn" onClick={challengeAgain} style={{ background: 'var(--accent-color)' }}>
              {t('duel.challengeAgain')}
            </button>
          </div>
          <div className="gameover-actions-spacer" />
        </div>
        <div className="gameover-fixed-bottom">
          <button className="start-btn" onClick={challengeAgain}>{t('duel.challengeAgain')}</button>
        </div>
      </div>
    );
  }

  // Fallback
  return null;
};

export default DuelMode;
