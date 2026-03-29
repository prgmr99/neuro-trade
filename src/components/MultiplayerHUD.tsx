import React from 'react';
import { Users, Trophy } from 'lucide-react';
import { useTranslation } from '../i18n/translations';

import { LivePlayer } from '../hooks/useLiveMarket';

interface MultiplayerHUDProps {
  totalPlayers: number;
  leaderboard: LivePlayer[];
  currentPlayerId: string;
}

const MAX_ENTRIES = 10;

const rankColors = ['#f59e0b', '#94a3b8', '#cd7f32']; // gold, silver, bronze

const MultiplayerHUD: React.FC<MultiplayerHUDProps> = ({
  totalPlayers,
  leaderboard,
  currentPlayerId,
}) => {
  const { t } = useTranslation();

  const sorted = [...leaderboard]
    .sort((a, b) => b.returnPct - a.returnPct)
    .slice(0, MAX_ENTRIES);

  return (
    <div style={{
      margin: '0 0.75rem 0.5rem',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid var(--border-color)',
      background: 'var(--surface-color)',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.6rem 0.75rem',
        background: 'var(--surface-light)',
        borderBottom: '1px solid var(--border-color)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Trophy size={13} style={{ color: '#f59e0b' }} />
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}>
            {t('multiplayer.leaderboard')}
          </span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
          fontSize: '0.7rem',
          color: 'var(--text-secondary)',
          background: 'var(--surface-color)',
          padding: '0.15rem 0.5rem',
          borderRadius: '999px',
        }}>
          <Users size={11} />
          {totalPlayers}
        </div>
      </div>

      {/* Entries */}
      <div style={{ padding: '0.35rem' }}>
        {sorted.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: 'var(--text-secondary)',
            fontSize: '0.78rem',
            padding: '1rem 0',
          }}>
            {t('multiplayer.waiting')}
          </div>
        )}

        {sorted.map((entry, idx) => {
          const isMe = entry.playerId === currentPlayerId;
          const isPositive = entry.returnPct >= 0;
          const isTop3 = idx < 3;

          return (
            <div
              key={entry.playerId}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.45rem 0.5rem',
                borderRadius: '8px',
                background: isMe
                  ? 'rgba(49, 130, 246, 0.08)'
                  : 'transparent',
                border: isMe
                  ? '1px solid rgba(49, 130, 246, 0.2)'
                  : '1px solid transparent',
                transition: 'background 0.15s',
              }}
            >
              {/* Rank badge */}
              <div style={{
                width: '22px',
                height: '22px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem',
                fontWeight: 800,
                flexShrink: 0,
                background: isTop3
                  ? `${rankColors[idx]}18`
                  : 'var(--surface-light)',
                color: isTop3
                  ? rankColors[idx]
                  : 'var(--text-secondary)',
                border: isTop3
                  ? `1px solid ${rankColors[idx]}40`
                  : '1px solid var(--border-color)',
              }}>
                {idx + 1}
              </div>

              {/* Name */}
              <div style={{
                flex: 1,
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.05rem',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}>
                  <span style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontWeight: isMe ? 700 : 500,
                    color: 'var(--text-primary)',
                    fontSize: '0.82rem',
                  }}>
                    {entry.playerName}
                  </span>
                  {isMe && (
                    <span style={{
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      color: 'var(--accent-color)',
                      background: 'rgba(49, 130, 246, 0.12)',
                      padding: '0.1rem 0.35rem',
                      borderRadius: '4px',
                      flexShrink: 0,
                    }}>
                      {t('multiplayer.you')}
                    </span>
                  )}
                </div>
              </div>

              {/* Return % */}
              <span style={{
                fontSize: '0.82rem',
                fontWeight: 700,
                fontVariantNumeric: 'tabular-nums',
                color: isPositive ? 'var(--positive)' : 'var(--negative)',
                flexShrink: 0,
              }}>
                {isPositive ? '+' : ''}{entry.returnPct.toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiplayerHUD;
