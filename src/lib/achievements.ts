export interface Achievement {
  id: string;
  category: 'milestone' | 'behavior' | 'collection' | 'streak' | 'flash';
  icon: string;
  nameKey: string;
  descriptionKey: string;
  check?: (gameResult: GameResult) => boolean;
}

export interface GameResult {
  mode: string;
  returnPct: number;
  finalValue: number;
  initialValue: number;
  holdings: Record<string, { quantity: number; averagePrice: number }>;
  stocks: Record<string, { price: number; symbol: string }>;
  allNews: { id: string; read: boolean }[];
  history: { day: number; portfolioValue: number }[];
  maxDays: number;
  holdingHistory?: string[][]; // symbols held each day (index 0 = day 1)
}

export const ACHIEVEMENTS: Achievement[] = [
  // ── Milestone: positive returns ──────────────────────────────────────────
  {
    id: 'return_10',
    category: 'milestone',
    icon: '📈',
    nameKey: 'achievements.return10.name',
    descriptionKey: 'achievements.return10.desc',
    check: (r) => r.returnPct >= 10,
  },
  {
    id: 'return_20',
    category: 'milestone',
    icon: '💹',
    nameKey: 'achievements.return20.name',
    descriptionKey: 'achievements.return20.desc',
    check: (r) => r.returnPct >= 20,
  },
  {
    id: 'return_50',
    category: 'milestone',
    icon: '🚀',
    nameKey: 'achievements.return50.name',
    descriptionKey: 'achievements.return50.desc',
    check: (r) => r.returnPct >= 50,
  },
  {
    id: 'return_100',
    category: 'milestone',
    icon: '💰',
    nameKey: 'achievements.return100.name',
    descriptionKey: 'achievements.return100.desc',
    check: (r) => r.returnPct >= 100,
  },
  {
    id: 'return_200',
    category: 'milestone',
    icon: '🏆',
    nameKey: 'achievements.return200.name',
    descriptionKey: 'achievements.return200.desc',
    check: (r) => r.returnPct >= 200,
  },

  // ── Milestone: negative returns ──────────────────────────────────────────
  {
    id: 'loss_10',
    category: 'milestone',
    icon: '📉',
    nameKey: 'achievements.loss10.name',
    descriptionKey: 'achievements.loss10.desc',
    check: (r) => r.returnPct <= -10,
  },
  {
    id: 'loss_20',
    category: 'milestone',
    icon: '😰',
    nameKey: 'achievements.loss20.name',
    descriptionKey: 'achievements.loss20.desc',
    check: (r) => r.returnPct <= -20,
  },
  {
    id: 'loss_50',
    category: 'milestone',
    icon: '💸',
    nameKey: 'achievements.loss50.name',
    descriptionKey: 'achievements.loss50.desc',
    check: (r) => r.returnPct <= -50,
  },

  // ── Behavior ─────────────────────────────────────────────────────────────
  {
    id: 'diamond_hands',
    category: 'behavior',
    icon: '💎',
    nameKey: 'achievements.diamondHands.name',
    descriptionKey: 'achievements.diamondHands.desc',
    check: (r) => {
      if (!r.holdingHistory || r.holdingHistory.length === 0) return false;
      // A stock is held "all days" if it appears in every day's snapshot
      const days = r.holdingHistory;
      if (days.length < r.maxDays) return false;
      const firstDay = days[0];
      return firstDay.some((sym) => days.every((d) => d.includes(sym)));
    },
  },
  {
    id: 'paper_hands',
    category: 'behavior',
    icon: '🧻',
    nameKey: 'achievements.paperHands.name',
    descriptionKey: 'achievements.paperHands.desc',
    check: (r) => {
      // Heuristic: if holdingHistory exists, a stock was bought then disappeared
      // within the very next day's snapshot.
      if (!r.holdingHistory || r.holdingHistory.length < 2) return false;
      for (let i = 0; i < r.holdingHistory.length - 1; i++) {
        const today = r.holdingHistory[i];
        const tomorrow = r.holdingHistory[i + 1];
        for (const sym of today) {
          if (!tomorrow.includes(sym)) return true;
        }
      }
      return false;
    },
  },
  {
    id: 'news_junkie',
    category: 'behavior',
    icon: '📰',
    nameKey: 'achievements.newsJunkie.name',
    descriptionKey: 'achievements.newsJunkie.desc',
    check: (r) => r.allNews.length > 0 && r.allNews.every((n) => n.read),
  },
  {
    id: 'all_in',
    category: 'behavior',
    icon: '🎰',
    nameKey: 'achievements.allIn.name',
    descriptionKey: 'achievements.allIn.desc',
    check: (r) => {
      const holdingSymbols = Object.keys(r.holdings);
      if (holdingSymbols.length !== 1) return false;
      const sym = holdingSymbols[0];
      const stockPrice = r.stocks[sym]?.price ?? 0;
      const holdingValue = r.holdings[sym].quantity * stockPrice;
      return holdingValue / r.finalValue > 0.9;
    },
  },
  {
    id: 'diversified',
    category: 'behavior',
    icon: '🌈',
    nameKey: 'achievements.diversified.name',
    descriptionKey: 'achievements.diversified.desc',
    check: (r) => Object.keys(r.holdings).length >= 3,
  },
  {
    id: 'cash_king',
    category: 'behavior',
    icon: '👑',
    nameKey: 'achievements.cashKing.name',
    descriptionKey: 'achievements.cashKing.desc',
    check: (r) => {
      const cashRatio = (r.finalValue - Object.entries(r.holdings).reduce((sum, [sym, h]) => {
        return sum + h.quantity * (r.stocks[sym]?.price ?? 0);
      }, 0)) / r.finalValue;
      return cashRatio > 0.5;
    },
  },
  {
    id: 'penny_pincher',
    category: 'behavior',
    icon: '🪙',
    nameKey: 'achievements.pennyPincher.name',
    descriptionKey: 'achievements.pennyPincher.desc',
    check: (r) => Object.keys(r.holdings).length === 0 && r.finalValue >= r.initialValue,
  },

  // ── Collection ────────────────────────────────────────────────────────────
  // These are checked externally by the achievement store (no check fn needed
  // for store-level stats), but we still provide a check for completeness where
  // the data is available in GameResult.
  {
    id: 'classic_clear',
    category: 'collection',
    icon: '🎯',
    nameKey: 'achievements.classicClear.name',
    descriptionKey: 'achievements.classicClear.desc',
    check: (r) => r.mode === 'classic',
  },
  {
    id: 'advanced_clear',
    category: 'collection',
    icon: '🎖️',
    nameKey: 'achievements.advancedClear.name',
    descriptionKey: 'achievements.advancedClear.desc',
    check: (r) => r.mode === 'advanced',
  },
  {
    id: 'flash_master',
    category: 'collection',
    icon: '⚡',
    nameKey: 'achievements.flashMaster.name',
    descriptionKey: 'achievements.flashMaster.desc',
    // Unlocked externally by store when flashWins >= 10
  },
  {
    id: 'dual_mode',
    category: 'collection',
    icon: '🔁',
    nameKey: 'achievements.dualMode.name',
    descriptionKey: 'achievements.dualMode.desc',
    // Unlocked externally by store when both classic and advanced cleared
  },

  // ── Streak: attendance ────────────────────────────────────────────────────
  {
    id: 'streak_3',
    category: 'streak',
    icon: '🔥',
    nameKey: 'achievements.streak3.name',
    descriptionKey: 'achievements.streak3.desc',
  },
  {
    id: 'streak_7',
    category: 'streak',
    icon: '🔥🔥',
    nameKey: 'achievements.streak7.name',
    descriptionKey: 'achievements.streak7.desc',
  },
  {
    id: 'streak_14',
    category: 'streak',
    icon: '🌟',
    nameKey: 'achievements.streak14.name',
    descriptionKey: 'achievements.streak14.desc',
  },
  {
    id: 'streak_30',
    category: 'streak',
    icon: '👾',
    nameKey: 'achievements.streak30.name',
    descriptionKey: 'achievements.streak30.desc',
  },

  // ── Flash: win streaks ────────────────────────────────────────────────────
  {
    id: 'flash_win_streak_3',
    category: 'flash',
    icon: '⚡',
    nameKey: 'achievements.flashWinStreak3.name',
    descriptionKey: 'achievements.flashWinStreak3.desc',
  },
  {
    id: 'flash_win_streak_5',
    category: 'flash',
    icon: '⚡⚡',
    nameKey: 'achievements.flashWinStreak5.name',
    descriptionKey: 'achievements.flashWinStreak5.desc',
  },
  {
    id: 'flash_win_streak_10',
    category: 'flash',
    icon: '💥',
    nameKey: 'achievements.flashWinStreak10.name',
    descriptionKey: 'achievements.flashWinStreak10.desc',
  },

  // ── Flash: total wins ─────────────────────────────────────────────────────
  {
    id: 'flash_wins_10',
    category: 'flash',
    icon: '🥉',
    nameKey: 'achievements.flashWins10.name',
    descriptionKey: 'achievements.flashWins10.desc',
  },
  {
    id: 'flash_wins_50',
    category: 'flash',
    icon: '🥈',
    nameKey: 'achievements.flashWins50.name',
    descriptionKey: 'achievements.flashWins50.desc',
  },
  {
    id: 'flash_wins_100',
    category: 'flash',
    icon: '🥇',
    nameKey: 'achievements.flashWins100.name',
    descriptionKey: 'achievements.flashWins100.desc',
  },

  // ── Flash: total plays ────────────────────────────────────────────────────
  {
    id: 'flash_plays_10',
    category: 'flash',
    icon: '🎮',
    nameKey: 'achievements.flashPlays10.name',
    descriptionKey: 'achievements.flashPlays10.desc',
  },
  {
    id: 'flash_plays_50',
    category: 'flash',
    icon: '🕹️',
    nameKey: 'achievements.flashPlays50.name',
    descriptionKey: 'achievements.flashPlays50.desc',
  },
  {
    id: 'flash_plays_100',
    category: 'flash',
    icon: '🏅',
    nameKey: 'achievements.flashPlays100.name',
    descriptionKey: 'achievements.flashPlays100.desc',
  },

  // ── Extra milestone achievements (to reach 50+) ───────────────────────────
  {
    id: 'breakeven',
    category: 'milestone',
    icon: '⚖️',
    nameKey: 'achievements.breakeven.name',
    descriptionKey: 'achievements.breakeven.desc',
    check: (r) => Math.abs(r.returnPct) < 1,
  },
  {
    id: 'return_5',
    category: 'milestone',
    icon: '📊',
    nameKey: 'achievements.return5.name',
    descriptionKey: 'achievements.return5.desc',
    check: (r) => r.returnPct >= 5,
  },
  {
    id: 'return_30',
    category: 'milestone',
    icon: '🌙',
    nameKey: 'achievements.return30.name',
    descriptionKey: 'achievements.return30.desc',
    check: (r) => r.returnPct >= 30,
  },
  {
    id: 'return_75',
    category: 'milestone',
    icon: '🦅',
    nameKey: 'achievements.return75.name',
    descriptionKey: 'achievements.return75.desc',
    check: (r) => r.returnPct >= 75,
  },
  {
    id: 'return_150',
    category: 'milestone',
    icon: '💎',
    nameKey: 'achievements.return150.name',
    descriptionKey: 'achievements.return150.desc',
    check: (r) => r.returnPct >= 150,
  },
  {
    id: 'loss_5',
    category: 'milestone',
    icon: '😬',
    nameKey: 'achievements.loss5.name',
    descriptionKey: 'achievements.loss5.desc',
    check: (r) => r.returnPct <= -5,
  },
  {
    id: 'loss_30',
    category: 'milestone',
    icon: '💀',
    nameKey: 'achievements.loss30.name',
    descriptionKey: 'achievements.loss30.desc',
    check: (r) => r.returnPct <= -30,
  },
  {
    id: 'big_portfolio',
    category: 'milestone',
    icon: '🏦',
    nameKey: 'achievements.bigPortfolio.name',
    descriptionKey: 'achievements.bigPortfolio.desc',
    check: (r) => r.finalValue >= 20000,
  },
  {
    id: 'giant_portfolio',
    category: 'milestone',
    icon: '🌍',
    nameKey: 'achievements.giantPortfolio.name',
    descriptionKey: 'achievements.giantPortfolio.desc',
    check: (r) => r.finalValue >= 50000,
  },
  {
    id: 'perfect_read',
    category: 'behavior',
    icon: '🔬',
    nameKey: 'achievements.perfectRead.name',
    descriptionKey: 'achievements.perfectRead.desc',
    check: (r) => {
      if (r.allNews.length === 0) return false;
      const readCount = r.allNews.filter((n) => n.read).length;
      return readCount === r.allNews.length && r.returnPct > 0;
    },
  },
  {
    id: 'contrarian',
    category: 'behavior',
    icon: '🦁',
    nameKey: 'achievements.contrarian.name',
    descriptionKey: 'achievements.contrarian.desc',
    check: (r) => r.returnPct > 20 && Object.keys(r.holdings).length >= 2,
  },
  {
    id: 'minimalist',
    category: 'behavior',
    icon: '🎨',
    nameKey: 'achievements.minimalist.name',
    descriptionKey: 'achievements.minimalist.desc',
    check: (r) => Object.keys(r.holdings).length === 1 && r.returnPct > 0,
  },
  {
    id: 'steady_growth',
    category: 'milestone',
    icon: '🌱',
    nameKey: 'achievements.steadyGrowth.name',
    descriptionKey: 'achievements.steadyGrowth.desc',
    check: (r) => {
      if (r.history.length < 2) return false;
      for (let i = 1; i < r.history.length; i++) {
        if (r.history[i].portfolioValue < r.history[i - 1].portfolioValue) return false;
      }
      return true;
    },
  },
  {
    id: 'comeback_kid',
    category: 'behavior',
    icon: '🔄',
    nameKey: 'achievements.comebackKid.name',
    descriptionKey: 'achievements.comebackKid.desc',
    check: (r) => {
      if (r.history.length < 3) return false;
      const initial = r.history[0].portfolioValue;
      const hadLoss = r.history.some((h) => h.portfolioValue < initial * 0.9);
      return hadLoss && r.returnPct > 0;
    },
  },
  {
    id: 'quick_study',
    category: 'behavior',
    icon: '📚',
    nameKey: 'achievements.quickStudy.name',
    descriptionKey: 'achievements.quickStudy.desc',
    check: (r) => {
      if (r.allNews.length === 0) return false;
      const readCount = r.allNews.filter((n) => n.read).length;
      return readCount >= Math.ceil(r.allNews.length * 0.5);
    },
  },
  {
    id: 'total_games_10',
    category: 'collection',
    icon: '🎲',
    nameKey: 'achievements.totalGames10.name',
    descriptionKey: 'achievements.totalGames10.desc',
    // Unlocked externally by store
  },
  {
    id: 'total_games_50',
    category: 'collection',
    icon: '🎳',
    nameKey: 'achievements.totalGames50.name',
    descriptionKey: 'achievements.totalGames50.desc',
    // Unlocked externally by store
  },
  {
    id: 'total_games_100',
    category: 'collection',
    icon: '🌠',
    nameKey: 'achievements.totalGames100.name',
    descriptionKey: 'achievements.totalGames100.desc',
    // Unlocked externally by store
  },
  {
    id: 'flash_plays_200',
    category: 'flash',
    icon: '🎯',
    nameKey: 'achievements.flashPlays200.name',
    descriptionKey: 'achievements.flashPlays200.desc',
    // Unlocked externally by store
  },
  {
    id: 'flash_wins_200',
    category: 'flash',
    icon: '🏆',
    nameKey: 'achievements.flashWins200.name',
    descriptionKey: 'achievements.flashWins200.desc',
    // Unlocked externally by store
  },
];

/**
 * Returns achievement IDs that were earned based on the provided game result.
 * Only evaluates achievements that have a `check` function.
 */
export function checkGameAchievements(result: GameResult): string[] {
  const unlocked: string[] = [];
  for (const achievement of ACHIEVEMENTS) {
    if (achievement.check && achievement.check(result)) {
      unlocked.push(achievement.id);
    }
  }
  return unlocked;
}
