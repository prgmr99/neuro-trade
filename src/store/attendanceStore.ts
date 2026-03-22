import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AttendanceReward {
  days: number;
  type: 'hint' | 'insider' | 'theme' | 'scenario';
  unlocked: boolean;
}

interface AttendanceState {
  visitDates: string[]; // Array of YYYY-MM-DD strings
  currentStreak: number;
  longestStreak: number;
  lastVisitDate: string;
  skipUsedThisWeek: boolean;
  skipWeekStart: string; // YYYY-MM-DD of current week's Monday
  rewards: AttendanceReward[];

  // Actions
  checkIn: () => { isNewDay: boolean; streakBroken: boolean };
  useSkip: () => boolean;
  getRewardStatus: () => AttendanceReward[];
  isRewardUnlocked: (type: string) => boolean;
}

function toLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getMondayOf(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  const day = date.getDay(); // 0=Sun,1=Mon,...
  const diff = day === 0 ? -6 : 1 - day; // days to subtract to get to Monday
  const monday = new Date(date);
  monday.setDate(monday.getDate() + diff);
  return toLocalDateString(monday);
}

function subtractOneDay(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  date.setDate(date.getDate() - 1);
  return toLocalDateString(date);
}

const REWARD_THRESHOLDS: AttendanceReward[] = [
  { days: 3, type: 'hint', unlocked: false },
  { days: 7, type: 'insider', unlocked: false },
  { days: 14, type: 'theme', unlocked: false },
  { days: 30, type: 'scenario', unlocked: false },
];

export const useAttendanceStore = create<AttendanceState>()(
  persist(
    (set, get) => ({
      visitDates: [],
      currentStreak: 0,
      longestStreak: 0,
      lastVisitDate: '',
      skipUsedThisWeek: false,
      skipWeekStart: '',
      rewards: REWARD_THRESHOLDS.map((r) => ({ ...r })),

      checkIn: () => {
        const state = get();
        const today = toLocalDateString(new Date());

        // Already checked in today
        if (state.visitDates.includes(today)) {
          return { isNewDay: false, streakBroken: false };
        }

        const yesterday = subtractOneDay(today);
        const isConsecutive = state.visitDates.includes(yesterday);

        let newStreak = state.currentStreak;
        let streakBroken = false;

        if (state.lastVisitDate === '') {
          // First ever check-in
          newStreak = 1;
        } else if (isConsecutive) {
          newStreak = state.currentStreak + 1;
        } else {
          // Gap detected — check skip availability
          const todayMonday = getMondayOf(today);
          const skipStillValid =
            state.skipWeekStart === todayMonday && state.skipUsedThisWeek;

          if (!state.skipUsedThisWeek || state.skipWeekStart !== todayMonday) {
            // Skip available this week: gap must be exactly 1 day
            const dayBeforeYesterday = subtractOneDay(yesterday);
            const gapIsOne = state.visitDates.includes(dayBeforeYesterday);
            if (gapIsOne) {
              // Use skip: bridge the gap
              newStreak = state.currentStreak + 1;
              set({
                skipUsedThisWeek: true,
                skipWeekStart: todayMonday,
              });
            } else {
              newStreak = 1;
              streakBroken = state.currentStreak > 0;
            }
          } else {
            // Skip already used this week
            newStreak = 1;
            streakBroken = state.currentStreak > 0;
          }

          if (!skipStillValid && streakBroken) {
            // Already handled above
          }
        }

        // Unlock rewards based on new streak (once unlocked, stays unlocked)
        const updatedRewards = state.rewards.map((r) => ({
          ...r,
          unlocked: r.unlocked || newStreak >= r.days,
        }));

        const newLongest = Math.max(state.longestStreak, newStreak);

        set({
          visitDates: [...state.visitDates, today],
          currentStreak: newStreak,
          longestStreak: newLongest,
          lastVisitDate: today,
          rewards: updatedRewards,
        });

        return { isNewDay: true, streakBroken };
      },

      useSkip: () => {
        const state = get();
        const today = toLocalDateString(new Date());
        const todayMonday = getMondayOf(today);

        if (state.skipUsedThisWeek && state.skipWeekStart === todayMonday) {
          return false; // already used this week
        }

        set({
          skipUsedThisWeek: true,
          skipWeekStart: todayMonday,
        });
        return true;
      },

      getRewardStatus: () => {
        return get().rewards;
      },

      isRewardUnlocked: (type: string) => {
        return get().rewards.some((r) => r.type === type && r.unlocked);
      },
    }),
    {
      name: 'neurotrade-attendance',
    }
  )
);
