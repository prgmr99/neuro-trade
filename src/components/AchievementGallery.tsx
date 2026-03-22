import { useState } from 'react';
import { useTranslation } from '../i18n/translations';
import { ACHIEVEMENTS, Achievement } from '../lib/achievements';
import { useAchievementStore } from '../store/achievementStore';

interface Props {
  onClose: () => void;
}

type Category = 'all' | Achievement['category'];

const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'milestone', label: 'Milestones' },
  { key: 'behavior', label: 'Behavior' },
  { key: 'collection', label: 'Collection' },
  { key: 'streak', label: 'Streaks' },
  { key: 'flash', label: 'Flash' },
];

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

export default function AchievementGallery({ onClose }: Props) {
  const { t } = useTranslation();
  const { unlockedAchievements, isUnlocked } = useAchievementStore();
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filtered =
    activeCategory === 'all'
      ? ACHIEVEMENTS
      : ACHIEVEMENTS.filter((a) => a.category === activeCategory);

  const unlockedCount = ACHIEVEMENTS.filter((a) => isUnlocked(a.id)).length;

  return (
    <>
      <style>{`
        .ag-overlay {
          position: fixed;
          inset: 0;
          background: rgba(25, 31, 40, 0.6);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          backdrop-filter: blur(4px);
        }
        .ag-modal {
          background: var(--surface-color);
          border-radius: 24px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.18);
          width: 100%;
          max-width: 760px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          font-family: 'Outfit', sans-serif;
          overflow: hidden;
        }
        .ag-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px 12px;
          border-bottom: 1px solid var(--border-color);
          flex-shrink: 0;
        }
        .ag-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }
        .ag-subtitle {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin: 0;
        }
        .ag-close-btn {
          background: var(--surface-light);
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.1rem;
          color: var(--text-secondary);
          transition: background 0.15s;
          flex-shrink: 0;
        }
        .ag-close-btn:hover {
          background: var(--border-color);
        }
        .ag-tabs {
          display: flex;
          gap: 6px;
          padding: 12px 24px;
          overflow-x: auto;
          flex-shrink: 0;
          border-bottom: 1px solid var(--border-color);
          scrollbar-width: none;
        }
        .ag-tabs::-webkit-scrollbar { display: none; }
        .ag-tab {
          padding: 6px 14px;
          border-radius: 20px;
          border: 1px solid var(--border-color);
          background: transparent;
          font-family: 'Outfit', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
        }
        .ag-tab.active {
          background: var(--accent-color);
          color: #fff;
          border-color: var(--accent-color);
        }
        .ag-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
          padding: 16px 24px 24px;
          overflow-y: auto;
          flex: 1;
        }
        .ag-card {
          background: var(--surface-light);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 16px 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-align: center;
          transition: box-shadow 0.15s;
        }
        .ag-card.unlocked {
          background: var(--surface-color);
          box-shadow: var(--toss-shadow);
        }
        .ag-card.locked {
          opacity: 0.45;
          filter: grayscale(0.5);
        }
        .ag-card-icon {
          font-size: 2.2rem;
          line-height: 1;
        }
        .ag-card-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }
        .ag-card-desc {
          font-size: 0.73rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .ag-card-date {
          font-size: 0.68rem;
          color: var(--accent-color);
          font-weight: 500;
          margin-top: 2px;
        }
        .ag-card-lock {
          font-size: 1rem;
          opacity: 0.5;
        }
        @media (max-width: 500px) {
          .ag-grid {
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            padding: 12px 14px 20px;
          }
          .ag-header, .ag-tabs {
            padding-left: 14px;
            padding-right: 14px;
          }
        }
      `}</style>

      <div className="ag-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="ag-modal" role="dialog" aria-modal="true" aria-label="Achievement Gallery">
          <div className="ag-header">
            <div>
              <p className="ag-title">Achievements</p>
              <p className="ag-subtitle">
                {unlockedCount} / {ACHIEVEMENTS.length} unlocked
              </p>
            </div>
            <button className="ag-close-btn" onClick={onClose} aria-label="Close">✕</button>
          </div>

          <div className="ag-tabs">
            {CATEGORIES.map(({ key, label }) => (
              <button
                key={key}
                className={`ag-tab${activeCategory === key ? ' active' : ''}`}
                onClick={() => setActiveCategory(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="ag-grid">
            {filtered.map((achievement) => {
              const unlocked = isUnlocked(achievement.id);
              const record = unlockedAchievements[achievement.id];
              const name = t(achievement.nameKey as Parameters<typeof t>[0]);
              const desc = t(achievement.descriptionKey as Parameters<typeof t>[0]);

              return (
                <div
                  key={achievement.id}
                  className={`ag-card ${unlocked ? 'unlocked' : 'locked'}`}
                >
                  <span className="ag-card-icon">
                    {unlocked ? achievement.icon : '🔒'}
                  </span>
                  <span className="ag-card-name">{name}</span>
                  <span className="ag-card-desc">{desc}</span>
                  {unlocked && record && (
                    <span className="ag-card-date">{formatDate(record.unlockedAt)}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
