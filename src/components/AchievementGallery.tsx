import { useState } from 'react';
import { useTranslation } from '../i18n/translations';
import { ACHIEVEMENTS, Achievement } from '../lib/achievements';
import { useAchievementStore } from '../store/achievementStore';
import './AchievementGallery.css';

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
  );
}
