import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UnlockRecord {
  unlockedAt: string;
  count?: number;
}

interface AchievementState {
  unlockedAchievements: Record<string, UnlockRecord>;
  totalGamesPlayed: number;
  totalClassicGames: number;
  totalAdvancedGames: number;
  totalFlashGames: number;
  flashWins: number;
  flashWinStreak: number;
  flashMaxWinStreak: number;
  attendanceStreak: number;
  lastPlayDate: string; // YYYY-MM-DD

  // Actions
  unlockAchievement: (id: string) => void;
  recordGamePlayed: (mode: string) => void;
  recordFlashResult: (won: boolean) => void;
  checkAndUpdateStreak: () => void;
  getUnlockedIds: () => string[];
  isUnlocked: (id: string) => boolean;
}

function todayString(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function daysBetween(a: string, b: string): number {
  const msPerDay = 86400000;
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / msPerDay);
}

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      unlockedAchievements: {},
      totalGamesPlayed: 0,
      totalClassicGames: 0,
      totalAdvancedGames: 0,
      totalFlashGames: 0,
      flashWins: 0,
      flashWinStreak: 0,
      flashMaxWinStreak: 0,
      attendanceStreak: 0,
      lastPlayDate: '',

      unlockAchievement: (id) => {
        const state = get();
        if (state.unlockedAchievements[id]) return; // already unlocked
        set((s) => ({
          unlockedAchievements: {
            ...s.unlockedAchievements,
            [id]: { unlockedAt: new Date().toISOString() },
          },
        }));
      },

      recordGamePlayed: (mode) => {
        set((s) => {
          const updates: Partial<Pick<
            AchievementState,
            'totalGamesPlayed' | 'totalClassicGames' | 'totalAdvancedGames' | 'totalFlashGames'
          >> = {
            totalGamesPlayed: s.totalGamesPlayed + 1,
          };
          if (mode === 'classic') updates.totalClassicGames = s.totalClassicGames + 1;
          if (mode === 'advanced') updates.totalAdvancedGames = s.totalAdvancedGames + 1;
          if (mode === 'flash') updates.totalFlashGames = s.totalFlashGames + 1;
          return updates;
        });

        // Read fresh state after the synchronous set completes
        const s = get();
        const unlock = (id: string) => s.unlockAchievement(id);

        if (s.totalGamesPlayed >= 10) unlock('total_games_10');
        if (s.totalGamesPlayed >= 50) unlock('total_games_50');
        if (s.totalGamesPlayed >= 100) unlock('total_games_100');
        if (s.totalClassicGames >= 1 && s.totalAdvancedGames >= 1) unlock('dual_mode');
      },

      recordFlashResult: (won) => {
        set((s) => {
          const newStreak = won ? s.flashWinStreak + 1 : 0;
          return {
            flashWins: won ? s.flashWins + 1 : s.flashWins,
            flashWinStreak: newStreak,
            flashMaxWinStreak: Math.max(s.flashMaxWinStreak, newStreak),
            totalFlashGames: s.totalFlashGames + 1,
          };
        });

        const s = get();
        const unlock = (id: string) => s.unlockAchievement(id);

        if (s.flashWins >= 10) unlock('flash_master');
        if (s.flashWins >= 10) unlock('flash_wins_10');
        if (s.flashWins >= 50) unlock('flash_wins_50');
        if (s.flashWins >= 100) unlock('flash_wins_100');
        if (s.flashWins >= 200) unlock('flash_wins_200');

        if (s.flashWinStreak >= 3) unlock('flash_win_streak_3');
        if (s.flashWinStreak >= 5) unlock('flash_win_streak_5');
        if (s.flashWinStreak >= 10) unlock('flash_win_streak_10');

        if (s.totalFlashGames >= 10) unlock('flash_plays_10');
        if (s.totalFlashGames >= 50) unlock('flash_plays_50');
        if (s.totalFlashGames >= 100) unlock('flash_plays_100');
        if (s.totalFlashGames >= 200) unlock('flash_plays_200');
      },

      checkAndUpdateStreak: () => {
        const today = todayString();
        set((s) => {
          const last = s.lastPlayDate;
          if (last === today) return {}; // already recorded today

          let newStreak = 1;
          if (last) {
            const diff = daysBetween(last, today);
            if (diff === 1) {
              newStreak = s.attendanceStreak + 1;
            }
            // diff > 1: streak broken, stays at 1
          }

          return { attendanceStreak: newStreak, lastPlayDate: today };
        });

        const s = get();
        const unlock = (id: string) => s.unlockAchievement(id);
        if (s.attendanceStreak >= 3) unlock('streak_3');
        if (s.attendanceStreak >= 7) unlock('streak_7');
        if (s.attendanceStreak >= 14) unlock('streak_14');
        if (s.attendanceStreak >= 30) unlock('streak_30');
      },

      getUnlockedIds: () => Object.keys(get().unlockedAchievements),

      isUnlocked: (id) => id in get().unlockedAchievements,
    }),
    {
      name: 'neurotrade-achievements',
    }
  )
);
