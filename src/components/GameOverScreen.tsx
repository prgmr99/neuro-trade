import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { useTranslation } from '../i18n/translations';
import { supabase } from '../lib/supabase';
import { GameMode } from '../data';
import RankingBoard from './RankingBoard';
import { generateGameShareText, getTitle } from '../lib/shareText';
import { useLanguageStore } from '../store/useLanguageStore';
import { trackGameCompleted, trackShareClicked } from '../lib/analytics';

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
  const [duelCopied, setDuelCopied] = useState(false);

  const title = getTitle(returnPct, language);
  const resultEmoji = returnPct >= 50 ? '🚀' : returnPct >= 20 ? '🔥' : returnPct >= 10 ? '💪' : returnPct >= 0 ? '✅' : returnPct >= -10 ? '😬' : returnPct >= -20 ? '📉' : '💀';

  // Track game completion on mount
  React.useEffect(() => {
    trackGameCompleted({
      mode,
      return_pct: Math.round(returnPct * 100) / 100,
      final_value: Math.round(finalValue),
      initial_value: initialValue,
      days_played: dayState.maxDays,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDuelChallenge = async () => {
    const seed = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    const duelUrl = `${window.location.origin}?duel=${seed}`;
    const challengeText = language === 'ko'
      ? `NeuroTrade에서 수익률 ${isPositive ? '+' : ''}${returnPct.toFixed(1)}% 달성! 이길 수 있어? 👉 ${duelUrl}`
      : `I scored ${isPositive ? '+' : ''}${returnPct.toFixed(1)}% on NeuroTrade! Think you can beat me? 👉 ${duelUrl}`;
    trackShareClicked({ share_type: 'duel_challenge', mode, return_pct: Math.round(returnPct * 100) / 100 });
    try {
      await navigator.clipboard.writeText(challengeText);
      setDuelCopied(true);
      setTimeout(() => setDuelCopied(false), 2000);
    } catch {
      // silently ignore
    }
  };

  const handleShareOnX = () => {
    trackShareClicked({ share_type: 'x', mode, return_pct: Math.round(returnPct * 100) / 100 });
    const text = generateGameShareText({
      mode,
      maxDays: dayState.maxDays,
      stocks,
      finalValue,
      initialValue,
      language,
    });
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async () => {
    trackShareClicked({ share_type: 'copy', mode, return_pct: Math.round(returnPct * 100) / 100 });
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
      <div className="splash-content glass-card gameover-container">
        <h1 className="gameover-title">{t('gameOver.title')}</h1>
        <div className={`gameover-result-card ${isPositive ? 'result-win' : 'result-lose'}`}>
          <p className="gameover-label">{t('gameOver.finalBalance')}</p>
          <h2 className="gameover-value">
            ${finalValue.toFixed(2)}
          </h2>
          <div className="gameover-return">
            <span>{t('gameOver.returnRate')}:</span>
            <span className={isPositive ? 'positive' : 'negative'}>
              {isPositive ? '+' : ''}{returnPct.toFixed(2)}%
            </span>
          </div>
          <div className="gameover-title-badge">
            {resultEmoji} {title}
          </div>
        </div>

        <div className="gameover-share-buttons">
          <button className="gameover-copy-btn" onClick={handleShare}>
            {copyLabel === 'copied'
              ? t('gameOver.shareCopied') + ' ✓'
              : t('gameOver.shareCopyResult')}
          </button>
          <button className="gameover-x-btn" onClick={handleShareOnX}>
            {t('gameOver.shareOnX')}
          </button>
        </div>

        <div className="gameover-duel-cta">
          <p className="gameover-duel-label">{t('gameOver.duelChallenge')}</p>
          <button className="gameover-duel-btn" onClick={handleDuelChallenge}>
            {duelCopied
              ? (language === 'ko' ? '링크 복사됨! ✓' : 'Link Copied! ✓')
              : t('gameOver.duelChallengeBtn')}
          </button>
        </div>

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
          >
            {submitting ? '...' : t('gameOver.submitAndRank')}
          </button>
          <button className="skip-btn" onClick={handleSkip}>
            {t('gameOver.skipToRank')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
