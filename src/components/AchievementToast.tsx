import { useEffect, useState } from 'react';
import { useTranslation } from '../i18n/translations';
import { ACHIEVEMENTS } from '../lib/achievements';

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
    <>
      <style>{`
        .achievement-toast {
          position: fixed;
          top: 16px;
          left: 50%;
          transform: translateX(-50%) translateY(-80px);
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          background: var(--surface-color);
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 16px;
          box-shadow: var(--toss-shadow), 0 8px 32px rgba(0,0,0,0.10);
          font-family: 'Outfit', sans-serif;
          min-width: 260px;
          max-width: 360px;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease;
          opacity: 0;
          pointer-events: none;
        }
        .achievement-toast.visible {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
        .achievement-toast-icon {
          font-size: 2rem;
          line-height: 1;
          flex-shrink: 0;
        }
        .achievement-toast-body {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .achievement-toast-label {
          font-size: 0.68rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--accent-color);
        }
        .achievement-toast-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .achievement-toast-desc {
          font-size: 0.78rem;
          color: var(--text-secondary);
          line-height: 1.3;
        }
      `}</style>
      <div className={`achievement-toast${visible ? ' visible' : ''}`} role="status" aria-live="polite">
        <span className="achievement-toast-icon">{achievement.icon}</span>
        <div className="achievement-toast-body">
          <span className="achievement-toast-label">Achievement Unlocked</span>
          <span className="achievement-toast-name">{name}</span>
          <span className="achievement-toast-desc">{desc}</span>
        </div>
      </div>
    </>
  );
}
