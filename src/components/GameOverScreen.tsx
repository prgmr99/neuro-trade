import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { useTranslation } from '../i18n/translations';
import { supabase } from '../lib/supabase';
import { GameMode } from '../data';
import RankingBoard from './RankingBoard';
import { generateGameShareText } from '../lib/shareText';
import { useLanguageStore } from '../store/useLanguageStore';

interface Props {
  mode: GameMode;
  onRestart: () => void;
}

type Phase = 'result' | 'ranking';

const GameOverScreen: React.FC<Props> = ({ mode, onRestart }) => {
  const { history, stocks, dayState } = useGameStore();
  const { t } = useTranslation();
  const { language } = useLanguageStore();

  const initialValue = history[0]?.portfolioValue ?? 10000;
  const finalValue = history[history.length - 1].portfolioValue;
  const returnPct = ((finalValue - initialValue) / initialValue) * 100;
  const isPositive = returnPct >= 0;

  const [phase, setPhase] = useState<Phase>('result');
  const [playerName, setPlayerName] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | undefined>();
  const [copyLabel, setCopyLabel] = useState<'idle' | 'copied'>('idle');

  const handleShare = async () => {
    const text = generateGameShareText({
      mode,
      maxDays: dayState.maxDays,
      stocks,
      finalValue,
      initialValue,
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
      // Clipboard unavailable — silently ignore
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const name = playerName.trim() || 'Anonymous';
    const sanitize = (s: string) => s.replace(/[<>&"']/g, '');
    const { data, error } = await supabase
      .from('rankings')
      .insert({
        player_name: sanitize(name.slice(0, 20)),
        message: sanitize(message.trim().slice(0, 100)),
        return_pct: Math.round(returnPct * 100) / 100,
        final_value: Math.round(finalValue * 100) / 100,
        initial_value: initialValue,
        mode,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Failed to submit ranking:', error.message);
    }
    setSubmittedId(data?.id);
    setSubmitting(false);
    setPhase('ranking');
  };

  const handleSkip = () => {
    setPhase('ranking');
  };

  if (phase === 'ranking') {
    return (
      <div className="splash-screen">
        <div className="splash-content glass-card" style={{ maxWidth: '700px', width: '95%' }}>
          <RankingBoard highlightId={submittedId} initialMode={mode} />
          <button className="start-btn" onClick={onRestart} style={{ width: '100%', marginTop: '1.5rem' }}>
            {t('gameOver.playAgain')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="splash-screen">
      <div className="splash-content glass-card" style={{ maxWidth: '500px', width: '90%' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t('gameOver.title')}</h1>
        <div style={{ margin: '2rem 0', padding: '1.5rem', background: 'var(--surface-light)', borderRadius: '16px' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 500 }}>{t('gameOver.finalBalance')}</p>
          <h2 style={{ fontSize: '3rem', margin: '0 0 1rem 0', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            ${finalValue.toFixed(2)}
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
            <span>{t('gameOver.returnRate')}:</span>
            <span className={isPositive ? 'positive' : 'negative'}>
              {isPositive ? '+' : ''}{returnPct.toFixed(2)}%
            </span>
          </div>
        </div>

        <button
          onClick={handleShare}
          style={{
            width: '100%',
            marginBottom: '1rem',
            padding: '0.75rem 1.5rem',
            background: 'transparent',
            border: '1.5px solid var(--accent-color)',
            color: 'var(--accent-color)',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {copyLabel === 'copied'
            ? (language === 'ko' ? '복사됨! ✓' : 'Copied! ✓')
            : (language === 'ko' ? '결과 공유하기' : 'Copy Results')}
        </button>

        <div className="gameover-form">
          <div className="form-field">
            <label>{t('gameOver.nameLabel')}</label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder={t('gameOver.namePlaceholder')}
              maxLength={20}
            />
          </div>
          <div className="form-field">
            <label>{t('gameOver.messageLabel')}</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('gameOver.messagePlaceholder')}
              maxLength={100}
              rows={2}
            />
          </div>
          <button
            className="start-btn"
            onClick={handleSubmit}
            disabled={submitting}
            style={{ width: '100%' }}
          >
            {submitting ? '...' : t('gameOver.submitAndRank')}
          </button>
          <button
            className="skip-btn"
            onClick={handleSkip}
          >
            {t('gameOver.skipToRank')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
