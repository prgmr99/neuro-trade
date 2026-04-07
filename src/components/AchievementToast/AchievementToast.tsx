import { useEffect, useState } from 'react';
import { useTranslation } from '../../i18n/translations';
import { ACHIEVEMENTS } from '../../lib/achievements';
import './AchievementToast.css';

interface Props {
  achievementId: string;
  onDismiss: () => void;
}

export default function AchievementToast({ achievementId, onDismiss }: Props) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);

  useEffect(() => {
    // Trigger slide-in on mount
    const showTimer = requestAnimationFrame(() => setVisible(true));

    // Begin fade-out at 2.5 s, dismiss at 3 s
    const fadeTimer = setTimeout(() => setVisible(false), 2500);
    const dismissTimer = setTimeout(() => onDismiss(), 3000);

    return () => {
      cancelAnimationFrame(showTimer);
      clearTimeout(fadeTimer);
      clearTimeout(dismissTimer);
    };
  }, [onDismiss]);

  if (!achievement) return null;

  // Resolve the i18n key safely: fall back to the raw key string if not found
  const name = t(achievement.nameKey as Parameters<typeof t>[0]);
  const desc = t(achievement.descriptionKey as Parameters<typeof t>[0]);

  return (
      <div className={`achievement-toast${visible ? ' visible' : ''}`} role="status" aria-live="polite">
        <span className="achievement-toast-icon">{achievement.icon}</span>
        <div className="achievement-toast-body">
          <span className="achievement-toast-label">Achievement Unlocked</span>
          <span className="achievement-toast-name">{name}</span>
          <span className="achievement-toast-desc">{desc}</span>
        </div>
      </div>
  );
}
