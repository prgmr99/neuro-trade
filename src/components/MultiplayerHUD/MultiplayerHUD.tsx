import React from 'react';
import { Users, Trophy } from 'lucide-react';
import { useTranslation } from '../../i18n/translations';

import { LivePlayer } from '../../hooks/useLiveMarket';
import './MultiplayerHUD.css';

interface MultiplayerHUDProps {
  totalPlayers: number;
  leaderboard: LivePlayer[];
  currentPlayerId: string;
}

const MAX_ENTRIES = 10;

const RANK_CLASSES = ['top-1', 'top-2', 'top-3'];

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
    <div className="mp-hud">
      {/* Header */}
      <div className="mp-hud-header">
        <div className="mp-hud-header-title">
          <Trophy size={13} className="mp-hud-header-title-icon" />
          <span className="mp-hud-header-title-text">
            {t('multiplayer.leaderboard')}
          </span>
        </div>
        <div className="mp-hud-player-count">
          <Users size={11} />
          {totalPlayers}
        </div>
      </div>

      {/* Entries */}
      <div className="mp-hud-entries">
        {sorted.length === 0 && (
          <div className="mp-hud-empty">
            {t('multiplayer.waiting')}
          </div>
        )}

        {sorted.map((entry, idx) => {
          const isMe = entry.playerId === currentPlayerId;
          const isPositive = entry.returnPct >= 0;
          const rankClass = idx < 3 ? RANK_CLASSES[idx] : '';

          return (
            <div
              key={entry.playerId}
              className={`mp-hud-entry${isMe ? ' is-me' : ''}`}
            >
              {/* Rank badge */}
              <div className={`mp-hud-rank${rankClass ? ` ${rankClass}` : ''}`}>
                {idx + 1}
              </div>

              {/* Name */}
              <div className="mp-hud-name-col">
                <div className="mp-hud-name-row">
                  <span className={`mp-hud-name${isMe ? ' is-me' : ''}`}>
                    {entry.playerName}
                  </span>
                  {isMe && (
                    <span className="mp-hud-you-badge">
                      {t('multiplayer.you')}
                    </span>
                  )}
                </div>
              </div>

              {/* Return % */}
              <span className={`mp-hud-return ${isPositive ? 'positive' : 'negative'}`}>
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
