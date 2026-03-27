import React, { useState } from 'react';
import { Clock, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation, Path, TranslationKeys } from '../i18n/translations';

import { LivePlayer } from '../hooks/useLiveMarket';

interface MultiplayerHUDProps {
  currentDay: number;
  maxDays: number;
  timeRemaining: number; // seconds until next 10-min refresh
  totalPlayers: number;
  leaderboard: LivePlayer[];
  currentPlayerId: string;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

const MAX_ENTRIES = 10;

const MultiplayerHUD: React.FC<MultiplayerHUDProps> = ({
  currentDay,
  maxDays,
  timeRemaining,
  totalPlayers,
  leaderboard,
  currentPlayerId,
}) => {
  const { t } = useTranslation();
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);

  // Timer color logic for 5-min countdown
  let timerColor = '#ffffff';
  if (timeRemaining < 10) timerColor = '#ef4444';
  else if (timeRemaining < 30) timerColor = '#f59e0b';

  const isPulsing = timeRemaining < 10;

  // Sort leaderboard by returnPct descending, cap at MAX_ENTRIES
  const sorted = [...leaderboard]
    .sort((a, b) => b.returnPct - a.returnPct)
    .slice(0, MAX_ENTRIES);

  const containerStyle: React.CSSProperties = {
    background: 'rgba(15, 23, 42, 0.95)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    borderRadius: '14px',
    padding: '1rem 1.15rem',
    zIndex: 100,
    minWidth: '220px',
    maxWidth: '280px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    fontSize: '0.85rem',
    color: '#e2e8f0',
    boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
  };

  // Pulsing keyframe injected once via a style tag approach (inline animation)
  const pulseStyle: React.CSSProperties = isPulsing
    ? { animation: 'hud-pulse 0.6s ease-in-out infinite alternate' }
    : {};

  return (
    <>
      {/* Inject pulse keyframe once */}
      <style>{`
        @keyframes hud-pulse {
          from { opacity: 1; }
          to { opacity: 0.4; }
        }
        /* Desktop: fixed top-right */
        .multiplayer-hud {
          position: fixed;
          top: 1rem;
          right: 1rem;
        }
        /* Mobile: compact strip above bottom nav */
        @media (max-width: 640px) {
          .multiplayer-hud {
            position: fixed;
            bottom: calc(56px + 0.5rem); /* above bottom nav (approx 56px tall) */
            right: 0.75rem;
            top: auto;
            min-width: 160px;
            max-width: 200px;
          }
          .multiplayer-hud .hud-leaderboard-desktop {
            display: none;
          }
          .multiplayer-hud .hud-leaderboard-toggle {
            display: flex;
          }
        }
        @media (min-width: 641px) {
          .multiplayer-hud .hud-leaderboard-desktop {
            display: block;
          }
          .multiplayer-hud .hud-leaderboard-toggle {
            display: none;
          }
        }
      `}</style>

      <div className="multiplayer-hud" style={containerStyle}>
        {/* Timer row — prominent */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(99, 102, 241, 0.12)',
          borderRadius: '8px',
          padding: '0.5rem 0.65rem',
        }}>
          <Clock size={15} style={{ flexShrink: 0, color: timerColor }} />
          <span style={{ fontWeight: 700, fontSize: '1rem', color: timerColor, ...pulseStyle }}>
            {formatTime(timeRemaining)}
          </span>
          <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
            {t('multiplayer.timeRemaining')}
          </span>
        </div>

        {/* Day + Active traders row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>
            {t('multiplayer.day')} {currentDay}/{maxDays}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: '#94a3b8' }}>
            <Users size={13} />
            {totalPlayers}
          </span>
        </div>

        {/* Desktop leaderboard — always visible */}
        <div className="hud-leaderboard-desktop">
          <HUDLeaderboard sorted={sorted} currentPlayerId={currentPlayerId} t={t} />
        </div>

        {/* Mobile leaderboard — collapsible */}
        <div className="hud-leaderboard-toggle">
          <button
            onClick={() => setLeaderboardOpen(o => !o)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.75rem',
              padding: 0,
            }}
          >
            {t('multiplayer.leaderboard')}
            {leaderboardOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
          {leaderboardOpen && (
            <HUDLeaderboard sorted={sorted} currentPlayerId={currentPlayerId} t={t} />
          )}
        </div>
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
