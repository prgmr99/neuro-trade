import React from 'react';
import { useGameStore } from '../store/gameStore';
import { useTranslation } from '../i18n/translations';

interface Props {
  onRestart: () => void;
}

const GameOverScreen: React.FC<Props> = ({ onRestart }) => {
  const { history } = useGameStore();
  const { t } = useTranslation();

  const initialValue = history[0]?.portfolioValue ?? 10000;
  const finalValue = history[history.length - 1].portfolioValue;
  const returnPct = ((finalValue - initialValue) / initialValue) * 100;
  const isPositive = returnPct >= 0;

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
        <button className="start-btn" onClick={onRestart} style={{ width: '100%' }}>
          {t('gameOver.playAgain')}
        </button>
      </div>
    </div>
  );
};

export default GameOverScreen;
