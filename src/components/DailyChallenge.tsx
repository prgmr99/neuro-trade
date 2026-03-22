import { useState, useEffect, useCallback } from 'react';
import { useGameStore } from '../store/gameStore';
import { SCENARIOS } from '../data';
import { dateSeed } from '../lib/prng';
import { supabase } from '../lib/supabase';
import { getPlayerId } from '../lib/identity';
import { generateGameShareText } from '../lib/shareText';
import { useTranslation } from '../i18n/translations';
import Layout from './Layout';

interface Props {
  onBack: () => void;
}

type DailyState = 'checking' | 'available' | 'playing' | 'result';

interface SavedResult {
  returnPct: number;
  finalValue: number;
  playerName: string;
  date: string;
}

interface LeaderboardEntry {
  id?: string;
  date: string;
  player_id: string;
  player_name: string;
  return_pct: number;
  final_value: number;
  mode: string;
}

function getTodayStr(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function formatTodayNice(language: 'en' | 'ko'): string {
  const now = new Date();
  if (language === 'ko') {
    return `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`;
  }
  return now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function DailyChallenge({ onBack }: Props) {
  const { t, language } = useTranslation();
  const { setInitialState, dayState, portfolio, stocks } = useGameStore();

  const [phase, setPhase] = useState<DailyState>('checking');
  const [savedResult, setSavedResult] = useState<SavedResult | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [copyLabel, setCopyLabel] = useState<'idle' | 'copied'>('idle');
  const [submitting, setSubmitting] = useState(false);

  const todayStr = getTodayStr();
  const storageKey = `neurotrade-daily-${todayStr}`;

  // On mount: check localStorage for existing result
  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        const parsed: SavedResult = JSON.parse(raw);
        setSavedResult(parsed);
        setPhase('result');
        fetchLeaderboard();
      } catch {
        setPhase('available');
      }
    } else {
      setPhase('available');
    }
  }, []);

  // Watch for game end when playing
  useEffect(() => {
    if (phase !== 'playing') return;
    if (dayState.currentDay > dayState.maxDays) {
      handleGameEnd();
    }
  }, [phase, dayState.currentDay, dayState.maxDays]);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const { data } = await supabase
        .from('daily_challenges')
        .select('*')
        .eq('date', todayStr)
        .order('return_pct', { ascending: false })
        .limit(50);
      if (data) setLeaderboard(data as LeaderboardEntry[]);
    } catch {
      // Silently ignore fetch errors
    }
  }, [todayStr]);

  const handleGameEnd = useCallback(async () => {
    // Calculate final value
    let finalValue = portfolio.cash;
    Object.values(portfolio.holdings).forEach((h) => {
      const stock = stocks[h.symbol];
      if (stock) finalValue += h.quantity * stock.price;
    });

    const initialValue = 10000;
    const returnPct = ((finalValue - initialValue) / initialValue) * 100;
    const playerName = 'Trader';

    const result: SavedResult = {
      returnPct,
      finalValue,
      playerName,
      date: todayStr,
    };

    // Save to localStorage
    localStorage.setItem(storageKey, JSON.stringify(result));
    setSavedResult(result);

    // Submit to Supabase
    setSubmitting(true);
    try {
      await supabase.from('daily_challenges').insert({
        date: todayStr,
        player_id: getPlayerId(),
        player_name: playerName,
        return_pct: returnPct,
        final_value: finalValue,
        mode: 'daily',
      });
    } catch {
      // Silently ignore submit errors
    } finally {
      setSubmitting(false);
    }

    await fetchLeaderboard();
    setPhase('result');
  }, [portfolio, stocks, todayStr, storageKey, fetchLeaderboard]);

  const startChallenge = useCallback(() => {
    setInitialState(
      SCENARIOS.classic.stocks,
      SCENARIOS.classic.news,
      5,
      10000,
      dateSeed()
    );
    setPhase('playing');
  }, [setInitialState]);

  const handleCopyResults = useCallback(async () => {
    if (!savedResult) return;

    const text = generateGameShareText({
      mode: 'Daily',
      maxDays: 5,
      stocks: Object.fromEntries(
        Object.entries(stocks).map(([sym, s]) => [sym, { symbol: s.symbol, priceHistory: s.priceHistory }])
      ),
      finalValue: savedResult.finalValue,
      initialValue: 10000,
      language,
    });

    if (navigator.share) {
      try {
        await navigator.share({ text });
        return;
      } catch {
        // Fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopyLabel('copied');
      setTimeout(() => setCopyLabel('idle'), 2000);
    } catch {
      // Silently ignore
    }
  }, [savedResult, stocks, language]);

  // Compute percentile from leaderboard
  const percentile = useCallback((): number => {
    if (!savedResult || leaderboard.length === 0) return 0;
    const beaten = leaderboard.filter((e) => e.return_pct < savedResult.returnPct).length;
    return Math.round((beaten / leaderboard.length) * 100);
  }, [savedResult, leaderboard]);

  // ---- CHECKING ----
  if (phase === 'checking') {
    return (
      <div className="flash-overlay">
        <div className="flash-card glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
        </div>
      </div>
    );
  }

  // ---- AVAILABLE ----
  if (phase === 'available') {
    return (
      <div className="flash-overlay">
        <div className="flash-card glass-card" style={{ maxWidth: '480px' }}>
          <button className="flash-back-btn" onClick={onBack}>
            ← {t('daily.back')}
          </button>

          <div className="flash-ready-header">
            <span className="flash-badge">📅</span>
            <h1 className="flash-title">{t('daily.title')}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: '0.25rem 0 0' }}>
              {formatTodayNice(language)}
            </p>
          </div>

          <p style={{
            textAlign: 'center',
            color: 'var(--text-primary)',
            fontWeight: 500,
            fontSize: '1.05rem',
            margin: '1.5rem 0 0.5rem',
          }}>
            {t('daily.subtitle')}
          </p>

          <button
            className="flash-start-btn"
            onClick={startChallenge}
            style={{ marginTop: '1.5rem' }}
          >
            {t('daily.start')}
          </button>

          <p style={{
            textAlign: 'center',
            color: 'var(--text-secondary)',
            fontSize: '0.82rem',
            marginTop: '0.75rem',
          }}>
            {t('daily.disclaimer')}
          </p>
        </div>
      </div>
    );
  }

  // ---- PLAYING ----
  if (phase === 'playing') {
    return (
      <div className="app-container">
        <Layout />
      </div>
    );
  }

  // ---- RESULT ----
  if (phase === 'result' && savedResult) {
    const pct = percentile();
    const returnSign = savedResult.returnPct >= 0 ? '+' : '';
    const isPositive = savedResult.returnPct >= 0;

    return (
      <div className="flash-overlay">
        <div
          className="flash-card glass-card"
          style={{ maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '2rem' }}>📅</span>
            <h2 style={{ margin: '0.5rem 0 0.25rem', fontSize: '1.4rem' }}>
              {t('daily.completed')}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
              {formatTodayNice(language)}
            </p>
          </div>

          {/* Your result */}
          <div style={{
            background: 'var(--surface-light)',
            borderRadius: '14px',
            padding: '1.25rem',
            marginBottom: '1.25rem',
            textAlign: 'center',
          }}>
            <p style={{ margin: '0 0 0.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t('daily.yourResult')}
            </p>
            <div style={{
              fontSize: '2.2rem',
              fontWeight: 800,
              color: isPositive ? 'var(--positive)' : 'var(--negative)',
              lineHeight: 1,
            }}>
              {returnSign}{savedResult.returnPct.toFixed(1)}%
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
              ${savedResult.finalValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
            {leaderboard.length > 0 && (
              <div style={{
                marginTop: '0.75rem',
                fontSize: '0.9rem',
                color: 'var(--text-primary)',
                fontWeight: 500,
              }}>
                {t('daily.percentile', { pct: String(pct) })}
              </div>
            )}
          </div>

          {/* Copy results button */}
          <button
            onClick={handleCopyResults}
            style={{
              width: '100%',
              background: 'transparent',
              border: '1.5px solid var(--accent-color)',
              color: 'var(--accent-color)',
              borderRadius: '12px',
              padding: '0.7rem 1.2rem',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              marginBottom: '1.25rem',
            }}
          >
            {copyLabel === 'copied'
              ? (language === 'ko' ? '복사됨! ✓' : 'Copied! ✓')
              : (language === 'ko' ? '결과 복사하기' : 'Copy Results')}
          </button>

          {/* Leaderboard */}
          {leaderboard.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{
                fontWeight: 700,
                fontSize: '0.95rem',
                margin: '0 0 0.75rem',
                color: 'var(--text-primary)',
              }}>
                {t('daily.leaderboard')}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {leaderboard.slice(0, 10).map((entry, idx) => {
                  const isMe = entry.player_id === getPlayerId();
                  return (
                    <div
                      key={entry.id ?? idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '10px',
                        background: isMe ? 'rgba(49,130,246,0.08)' : 'var(--surface-light)',
                        fontWeight: isMe ? 700 : 400,
                      }}
                    >
                      <span style={{ width: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', flexShrink: 0 }}>
                        {t('daily.rank')}{idx + 1}
                      </span>
                      <span style={{ flex: 1, fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {entry.player_name}{isMe ? ' (You)' : ''}
                      </span>
                      <span style={{
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: entry.return_pct >= 0 ? 'var(--positive)' : 'var(--negative)',
                        flexShrink: 0,
                      }}>
                        {entry.return_pct >= 0 ? '+' : ''}{entry.return_pct.toFixed(1)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Already played notice */}
          <div style={{
            background: 'var(--surface-light)',
            borderRadius: '12px',
            padding: '0.75rem 1rem',
            textAlign: 'center',
            marginBottom: '1rem',
          }}>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              {t('daily.alreadyPlayed')} — {t('daily.comeBackTomorrow')}
            </p>
          </div>

          {submitting && (
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
              Submitting...
            </p>
          )}

          <button className="flash-back-link" onClick={onBack}>
            {t('daily.back')}
          </button>
        </div>
      </div>
    );
  }

  return null;
}
