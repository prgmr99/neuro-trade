import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useTranslation } from '../../i18n/translations';

interface FuturesHeaderProps {
  onBack: () => void;
  arcName: string | null;
  gamePhase: 'playing' | 'gameover';
  currentDay: number;
  maxDays: number;
}

/**
 * Memoized header for Futures mode.
 * Extracted to avoid re-rendering the full component tree when sibling state
 * (price ticks, cash, etc.) changes in the parent.
 */
export const FuturesHeader = React.memo(function FuturesHeader({
  onBack,
  arcName,
  gamePhase,
  currentDay,
  maxDays,
}: FuturesHeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="futures-header">
      <button className="futures-back-btn" onClick={onBack} aria-label={t('futures.back')}>
        <ChevronLeft size={20} />
      </button>
      <div className="futures-title-area">
        <h1 className="futures-title-text">{t('futures.title')}</h1>
        <div className="futures-badges">
          <span className="pro-badge">{t('futures.proRoom')}</span>
          {arcName && <span className="arc-badge">{arcName}</span>}
        </div>
      </div>
      {gamePhase !== 'gameover' && (
        <div className="futures-day">
          {t('futures.dayCounter', { current: String(currentDay), max: String(maxDays) })}
        </div>
      )}
    </header>
  );
});
