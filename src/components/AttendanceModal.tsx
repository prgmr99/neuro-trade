import React, { useMemo } from 'react';
import { useAttendanceStore, AttendanceReward } from '../store/attendanceStore';
import { useLanguageStore } from '../store/useLanguageStore';

interface Props {
  isNewDay: boolean;
  streakBroken: boolean;
  onClose: () => void;
}

function toLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const REWARD_META: Record<AttendanceReward['type'], { en: string; ko: string; desc_en: string; desc_ko: string }> = {
  hint: {
    en: 'News Hint',
    ko: '뉴스 힌트',
    desc_en: 'Reveal one news effect',
    desc_ko: '뉴스 효과 하나 공개',
  },
  insider: {
    en: 'Insider Mode',
    ko: '인사이더 모드',
    desc_en: 'See next day headlines',
    desc_ko: '다음 날 헤드라인 미리 보기',
  },
  theme: {
    en: 'Dark Theme',
    ko: '다크 테마',
    desc_en: 'Unlock dark mode',
    desc_ko: '다크 모드 해제',
  },
  scenario: {
    en: 'New Scenario',
    ko: '새 시나리오',
    desc_en: 'Unlock bonus scenario',
    desc_ko: '보너스 시나리오 해제',
  },
};

const AttendanceModal: React.FC<Props> = ({ isNewDay, streakBroken, onClose }) => {
  const { currentStreak, longestStreak, visitDates, rewards, skipUsedThisWeek } = useAttendanceStore();
  const language = useLanguageStore((s) => s.language);

  const isKo = language === 'ko';

  const today = toLocalDateString(new Date());
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-based

  // Build calendar grid
  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
    // Convert to Mon-first: Mon=0..Sun=6
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: Array<{ day: number | null; dateStr: string | null }> = [];
    for (let i = 0; i < startOffset; i++) {
      cells.push({ day: null, dateStr: null });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const m = String(month + 1).padStart(2, '0');
      const ds = String(d).padStart(2, '0');
      cells.push({ day: d, dateStr: `${year}-${m}-${ds}` });
    }
    return cells;
  }, [year, month]);

  const monthName = now.toLocaleString(isKo ? 'ko-KR' : 'en-US', { month: 'long', year: 'numeric' });
  const weekDayHeaders = isKo
    ? ['월', '화', '수', '목', '금', '토', '일']
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const title = isKo ? '출석체크' : 'Daily Check-in';
  const continueLabel = isKo ? '계속하기' : 'Continue';
  const streakLabel = isKo ? '연속 출석' : 'Day Streak';
  const longestLabel = isKo ? '최장 기록' : 'Longest Streak';
  const rewardsLabel = isKo ? '보상 현황' : 'Reward Progress';
  const streakBrokenMsg = isKo
    ? '연속 출석이 끊어졌습니다! 주당 1회 스킵권을 사용할 수 있습니다.'
    : 'Your streak was broken! 1 skip per week available.';
  const skipUsedMsg = isKo ? '이번 주 스킵권을 이미 사용했습니다.' : 'Skip already used this week.';
  const welcomeBackMsg = isKo ? '오늘도 출석하셨습니다!' : 'Welcome back! Check-in recorded.';
  const alreadyCheckedMsg = isKo ? '오늘 이미 출석하셨습니다.' : 'Already checked in today.';

  return (
    <>
      <style>{`
        .attendance-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 16px;
        }

        .attendance-modal {
          background: var(--surface-color, #ffffff);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 420px;
          max-height: 90vh;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.14);
          font-family: 'Outfit', sans-serif;
        }

        .attendance-scroll {
          flex: 1;
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 28px 24px 0;
        }

        .attendance-scroll::-webkit-scrollbar {
          display: none;
        }

        .attendance-bottom {
          padding: 16px 24px 24px;
          flex-shrink: 0;
        }

        .attendance-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .attendance-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-primary, #191f28);
          margin: 0 0 4px;
        }

        .attendance-month {
          font-size: 0.85rem;
          color: var(--text-secondary, #8b95a1);
          margin: 0;
        }

        .attendance-status-banner {
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 0.82rem;
          margin-bottom: 16px;
          font-weight: 500;
        }

        .attendance-status-banner.new-day {
          background: #e8f3ff;
          color: #1a6fd4;
        }

        .attendance-status-banner.streak-broken {
          background: #fff3cd;
          color: #856404;
        }

        .attendance-status-banner.skip-used {
          background: #f8d7da;
          color: #721c24;
        }

        .attendance-status-banner.no-change {
          background: var(--surface-light, #f2f4f6);
          color: var(--text-secondary, #8b95a1);
        }

        /* Calendar */
        .calendar-section {
          margin-bottom: 18px;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
        }

        .calendar-weekday {
          text-align: center;
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--text-secondary, #8b95a1);
          padding: 4px 0;
        }

        .calendar-cell {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--text-primary, #191f28);
          position: relative;
        }

        .calendar-cell.visited {
          background: var(--accent-color, #3182f6);
          color: #ffffff;
          font-weight: 600;
        }

        .calendar-cell.today {
          outline: 2px solid var(--accent-color, #3182f6);
          outline-offset: 1px;
        }

        .calendar-cell.today.visited {
          outline: 2px solid #1a6fd4;
        }

        .calendar-cell.empty {
          background: transparent;
        }

        /* Streak stats */
        .streak-stats {
          display: flex;
          gap: 12px;
          margin-bottom: 18px;
        }

        .streak-card {
          flex: 1;
          background: var(--surface-light, #f2f4f6);
          border-radius: 12px;
          padding: 14px 12px;
          text-align: center;
        }

        .streak-number {
          font-size: 2rem;
          font-weight: 800;
          color: var(--accent-color, #3182f6);
          line-height: 1;
          margin-bottom: 4px;
        }

        .streak-fire {
          font-size: 1.6rem;
          line-height: 1;
          margin-bottom: 4px;
        }

        .streak-label {
          font-size: 0.72rem;
          color: var(--text-secondary, #8b95a1);
          font-weight: 500;
        }

        /* Rewards */
        .rewards-section {
          margin-bottom: 20px;
        }

        .rewards-title {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary, #8b95a1);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 0 10px;
        }

        .reward-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          background: var(--surface-light, #f2f4f6);
          margin-bottom: 6px;
        }

        .reward-icon {
          font-size: 1.1rem;
          width: 24px;
          text-align: center;
          flex-shrink: 0;
        }

        .reward-text {
          flex: 1;
        }

        .reward-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary, #191f28);
          margin: 0 0 1px;
        }

        .reward-desc {
          font-size: 0.72rem;
          color: var(--text-secondary, #8b95a1);
          margin: 0;
        }

        .reward-badge {
          font-size: 0.68rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 20px;
          flex-shrink: 0;
        }

        .reward-badge.unlocked {
          background: #d4edda;
          color: #155724;
        }

        .reward-badge.locked {
          background: var(--surface-color, #ffffff);
          color: var(--text-secondary, #8b95a1);
          border: 1px solid rgba(0,0,0,0.08);
        }

        .attendance-continue-btn {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: none;
          background: var(--accent-color, #3182f6);
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 700;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          transition: opacity 0.15s;
        }

        .attendance-continue-btn:hover {
          opacity: 0.88;
        }
      `}</style>

      <div className="attendance-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="attendance-modal">
          <div className="attendance-scroll">
          <div className="attendance-header">
            <h2 className="attendance-title">{title}</h2>
            <p className="attendance-month">{monthName}</p>
          </div>

          {/* Status banner */}
          {isNewDay && !streakBroken && (
            <div className="attendance-status-banner new-day">{welcomeBackMsg}</div>
          )}
          {isNewDay && streakBroken && !skipUsedThisWeek && (
            <div className="attendance-status-banner streak-broken">{streakBrokenMsg}</div>
          )}
          {isNewDay && streakBroken && skipUsedThisWeek && (
            <div className="attendance-status-banner skip-used">{skipUsedMsg}</div>
          )}
          {!isNewDay && (
            <div className="attendance-status-banner no-change">{alreadyCheckedMsg}</div>
          )}

          {/* Calendar */}
          <div className="calendar-section">
            <div className="calendar-grid">
              {weekDayHeaders.map((h) => (
                <div key={h} className="calendar-weekday">{h}</div>
              ))}
              {calendarDays.map((cell, idx) => {
                if (!cell.day || !cell.dateStr) {
                  return <div key={`empty-${idx}`} className="calendar-cell empty" />;
                }
                const isVisited = visitDates.includes(cell.dateStr);
                const isToday = cell.dateStr === today;
                const classNames = [
                  'calendar-cell',
                  isVisited ? 'visited' : '',
                  isToday ? 'today' : '',
                ].filter(Boolean).join(' ');
                return (
                  <div key={cell.dateStr} className={classNames}>
                    {cell.day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Streak stats */}
          <div className="streak-stats">
            <div className="streak-card">
              <div className="streak-fire">🔥</div>
              <div className="streak-number">{currentStreak}</div>
              <div className="streak-label">{streakLabel}</div>
            </div>
            <div className="streak-card">
              <div className="streak-number" style={{ color: 'var(--text-primary, #191f28)' }}>
                {longestStreak}
              </div>
              <div className="streak-label">{longestLabel}</div>
            </div>
          </div>

          {/* Rewards */}
          <div className="rewards-section">
            <p className="rewards-title">{rewardsLabel}</p>
            {rewards.map((reward) => {
              const meta = REWARD_META[reward.type];
              const icons: Record<AttendanceReward['type'], string> = {
                hint: '💡',
                insider: '🔍',
                theme: '🎨',
                scenario: '🗺️',
              };
              return (
                <div key={reward.type} className="reward-row">
                  <div className="reward-icon">{icons[reward.type]}</div>
                  <div className="reward-text">
                    <p className="reward-name">
                      {isKo ? meta.ko : meta.en}
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 400, fontSize: '0.7rem', marginLeft: 6 }}>
                        {reward.days}{isKo ? '일' : 'd'}
                      </span>
                    </p>
                    <p className="reward-desc">{isKo ? meta.desc_ko : meta.desc_en}</p>
                  </div>
                  <div className={`reward-badge ${reward.unlocked ? 'unlocked' : 'locked'}`}>
                    {reward.unlocked ? (isKo ? '획득' : 'Unlocked') : (isKo ? '잠김' : 'Locked')}
                  </div>
                </div>
              );
            })}
          </div>
          </div>

          <div className="attendance-bottom">
            <button className="attendance-continue-btn" onClick={onClose}>
              {continueLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendanceModal;
