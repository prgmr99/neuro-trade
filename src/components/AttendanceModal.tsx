import React, { useMemo } from 'react';
import { useAttendanceStore, AttendanceReward } from '../store/attendanceStore';
import { useLanguageStore } from '../store/useLanguageStore';
import './AttendanceModal.css';

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
              <div className="streak-icon">🔥</div>
              <div className="streak-text">
                <div className="streak-number">{currentStreak}</div>
                <div className="streak-label">{streakLabel}</div>
              </div>
            </div>
            <div className="streak-card">
              <div className="streak-icon">🏆</div>
              <div className="streak-text">
                <div className="streak-number" style={{ color: 'var(--text-primary, #191f28)' }}>
                  {longestStreak}
                </div>
                <div className="streak-label">{longestLabel}</div>
              </div>
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
  );
};

export default AttendanceModal;
