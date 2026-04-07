/**
 * Google Analytics 4 event tracking utilities.
 *
 * GA4 is loaded via the gtag.js script in index.html.
 * The Measurement ID is injected at build time via the VITE_GA_MEASUREMENT_ID env var.
 * All functions are no-ops when gtag is not available (e.g. local dev, ad blockers).
 */

type GtagCommand = 'config' | 'event' | 'set';

declare global {
  interface Window {
    gtag?: (...args: [GtagCommand, string, Record<string, unknown>?]) => void;
    dataLayer?: unknown[];
  }
}

function gtag(command: GtagCommand, target: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(command, target, params);
  }
}

// ── Game lifecycle ──────────────────────────────────────────

export function trackGameStarted(mode: string, isFirstGame: boolean) {
  gtag('event', 'game_started', { mode, is_first_game: isFirstGame });
}

export function trackGameCompleted(params: {
  mode: string;
  return_pct: number;
  final_value: number;
  initial_value: number;
  days_played: number;
}) {
  gtag('event', 'game_completed', params);
}

// ── Trading ─────────────────────────────────────────────────

export function trackTradeExecuted(params: {
  action: 'buy' | 'sell';
  symbol: string;
  quantity: number;
  price: number;
  day: number;
}) {
  gtag('event', 'trade_executed', params);
}

// ── Sharing ─────────────────────────────────────────────────

export function trackShareClicked(params: {
  share_type: 'x' | 'copy' | 'native' | 'duel_challenge';
  mode: string;
  return_pct?: number;
}) {
  gtag('event', 'share_clicked', params);
}

// ── Duel ────────────────────────────────────────────────────

export function trackDuelCreated(seed: number) {
  gtag('event', 'duel_created', { seed });
}

export function trackDuelJoined(seed: number) {
  gtag('event', 'duel_joined', { seed });
}

// ── Flash Round ─────────────────────────────────────────────

export function trackFlashPlayed(params: {
  choice: 'allin' | 'pass';
  won: boolean;
  result_pct: number;
  streak: number;
  stock_symbol: string;
}) {
  gtag('event', 'flash_played', params);
}

// ── Daily Challenge ─────────────────────────────────────────

export function trackDailyPlayed(params: {
  return_pct: number;
  percentile?: number;
}) {
  gtag('event', 'daily_played', params);
}

// ── News ────────────────────────────────────────────────────

export function trackNewsRead(newsId: string, stockSymbol: string, day: number) {
  gtag('event', 'news_read', { news_id: newsId, stock_symbol: stockSymbol, day });
}

// ── Achievements ────────────────────────────────────────────

export function trackAchievementUnlocked(achievementId: string, category: string) {
  gtag('event', 'achievement_unlocked', { achievement_id: achievementId, category });
}

// ── Attendance ──────────────────────────────────────────────

export function trackAttendanceCheckin(streak: number) {
  gtag('event', 'attendance_checkin', { streak });
}

// ── Mode selection ──────────────────────────────────────────

export function trackModeSelected(mode: string) {
  gtag('event', 'mode_selected', { mode });
}
