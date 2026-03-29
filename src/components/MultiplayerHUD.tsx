import React from 'react';
import { Users } from 'lucide-react';
import { useTranslation, Path, TranslationKeys } from '../i18n/translations';

import { LivePlayer } from '../hooks/useLiveMarket';

interface MultiplayerHUDProps {
  totalPlayers: number;
  leaderboard: LivePlayer[];
  currentPlayerId: string;
}

const MAX_ENTRIES = 10;

const MultiplayerHUD: React.FC<MultiplayerHUDProps> = ({
  totalPlayers,
  leaderboard,
  currentPlayerId,
}) => {
  const { t } = useTranslation();

  // Sort leaderboard by returnPct descending, cap at MAX_ENTRIES
  const sorted = [...leaderboard]
    .sort((a, b) => b.returnPct - a.returnPct)
    .slice(0, MAX_ENTRIES);

  const containerStyle: React.CSSProperties = {
    background: 'var(--surface-light)',
    border: '1px solid var(--border-color)',
    borderRadius: '10px',
    padding: '0.75rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    fontSize: '0.8rem',
    color: 'var(--text-primary)',
    margin: '0.5rem 0.75rem',
  };

  return (
    <>
      <div style={containerStyle}>
        {/* Active traders row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {t('multiplayer.leaderboard')}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            <Users size={12} />
            {totalPlayers}
          </span>
        </div>

        {/* Leaderboard — always visible */}
        <HUDLeaderboard sorted={sorted} currentPlayerId={currentPlayerId} t={t} />
      </div>
    </>
  );
};

interface HUDLeaderboardProps {
  sorted: LivePlayer[];
  currentPlayerId: string;
  t: (path: Path<TranslationKeys>, values?: Record<string, string | number>) => string;
}

const HUDLeaderboard: React.FC<HUDLeaderboardProps> = ({ sorted, currentPlayerId, t }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.25rem' }}>
    <div
      style={{
        fontSize: '0.72rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: '#94a3b8',
        marginBottom: '0.2rem',
      }}
    >
      {t('multiplayer.leaderboard')}
    </div>
    {sorted.length === 0 && (
      <div style={{ color: '#64748b', fontSize: '0.78rem', padding: '0.2rem 0' }}>—</div>
    )}
    {sorted.map((entry, idx) => {
      const isMe = entry.playerId === currentPlayerId;
      const isPositive = entry.returnPct >= 0;
      return (
        <div
          key={entry.playerId}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: isMe ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
            borderRadius: '6px',
            padding: '2px 4px',
          }}
        >
          {/* Rank */}
          <span
            style={{
              fontWeight: 700,
              fontSize: '0.72rem',
              color: idx === 0 ? '#f59e0b' : 'var(--text-secondary)',
              minWidth: '14px',
            }}
          >
            {idx + 1}
          </span>
          {/* Name */}
          <span
            style={{
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontWeight: isMe ? 700 : 400,
              color: isMe ? '#e2e8f0' : '#94a3b8',
              fontSize: '0.8rem',
            }}
            title={entry.playerName}
          >
            {entry.playerName}
            {isMe && (
              <span
                style={{
                  marginLeft: '3px',
                  fontSize: '0.65rem',
                  color: '#6366f1',
                  fontWeight: 700,
                }}
              >
                {t('multiplayer.you')}
              </span>
            )}
          </span>
          {/* Return */}
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: isPositive ? 'var(--positive, #22c55e)' : 'var(--negative)',
              flexShrink: 0,
            }}
          >
            {isPositive ? '+' : ''}{entry.returnPct.toFixed(1)}%
          </span>
        </div>
      );
    })}
  </div>
);

export default MultiplayerHUD;
