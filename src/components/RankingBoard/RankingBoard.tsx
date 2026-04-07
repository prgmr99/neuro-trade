import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { RankingEntry } from '../../types';
import { useTranslation } from '../../i18n/translations';

interface Props {
  highlightId?: string;
  initialMode?: string;
}

const RankingBoard: React.FC<Props> = ({ highlightId, initialMode }) => {
  const { t, language } = useTranslation();
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [modeFilter, setModeFilter] = useState<string>(initialMode ?? 'all');

  useEffect(() => {
    fetchRankings();
  }, [modeFilter]);

  const fetchRankings = async () => {
    setLoading(true);
    let query = supabase
      .from('rankings')
      .select('*')
      .order('return_pct', { ascending: false })
      .limit(100);

    if (modeFilter !== 'all') {
      query = query.eq('mode', modeFilter);
    }

    const { data, error } = await query;
    if (error) {
      console.error('[RankingBoard] Failed to fetch rankings:', error.message, error);
    }
    setRankings(data ?? []);
    setLoading(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const filters = ['all', 'classic', 'advanced', 'duel'] as const;
  const maxReturn = rankings[0]?.return_pct ?? 1;

  return (
    <div className="ranking-board">
      <h2 className="ranking-title">{t('ranking.title')}</h2>

      <div className="ranking-filters">
        {filters.map((f) => (
          <button
            key={f}
            className={`ranking-filter-btn ${modeFilter === f ? 'active' : ''}`}
            onClick={() => setModeFilter(f)}
          >
            {t(`ranking.${f}`)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="ranking-loading">
          <div className="ranking-spinner" />
        </div>
      ) : rankings.length === 0 ? (
        <p className="ranking-empty">{t('ranking.empty')}</p>
      ) : (
        <div className="ranking-list">
          {rankings.map((entry, idx) => {
            const isHighlighted = entry.id === highlightId;
            const isPositive = entry.return_pct >= 0;
            const rank = idx + 1;
            const barWidth = Math.max(0, (entry.return_pct / maxReturn) * 100);

            return (
              <div
                key={entry.id}
                className={`ranking-row ${isHighlighted ? 'highlighted' : ''} ${rank <= 3 ? `top-${rank}` : ''}`}
              >
                <div className="ranking-rank">
                  {rank <= 3 ? (
                    <span className={`rank-medal rank-${rank}`}>
                      {rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'}
                    </span>
                  ) : (
                    <span className="rank-number">{rank}</span>
                  )}
                </div>

                <div className="ranking-info">
                  <div className="ranking-name-row">
                    <span className="ranking-player-name">{entry.player_name}</span>
                    {isHighlighted && <span className="ranking-you-badge">{t('ranking.you')}</span>}
                    <span className="ranking-mode-badge">{t(`ranking.${entry.mode}` as any)}</span>
                  </div>
                  {entry.message && (
                    <p className="ranking-message">"{entry.message}"</p>
                  )}
                </div>

                <div className="ranking-stats">
                  <span className={`ranking-return ${isPositive ? 'positive' : 'negative'}`}>
                    {isPositive ? '+' : ''}{entry.return_pct.toFixed(2)}%
                  </span>
                  <span className="ranking-value">
                    ${entry.final_value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                  <span className="ranking-date">{formatDate(entry.created_at)}</span>
                </div>

                {/* Subtle performance bar */}
                {isPositive && (
                  <div
                    className="ranking-bar"
                    style={{ width: `${barWidth}%` }}
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RankingBoard;
