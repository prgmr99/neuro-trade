/**
 * Google Analytics 4 event tracking utilities.
 *
 * GA4 is loaded via the gtag.js script in index.html.
 * The Measurement ID is injected at build time via the VITE_GA_MEASUREMENT_ID env var.
 * All functions are no-ops when gtag is not available (e.g. local dev, ad blockers).
 */

import { claimReferredStartOnce, getIncomingRef, getTimeToStartSec } from './shareSession';

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

// Attach the referring share id (if the current session was opened via ?ref=)
// so every downstream event can be joined back to the original share.
function withReferrer(params: Record<string, unknown>): Record<string, unknown> {
  const ref = getIncomingRef();
  return ref ? { ...params, referrer_share_id: ref } : params;
}

// ── Game lifecycle ──────────────────────────────────────────

export function trackGameStarted(mode: string, isFirstGame: boolean) {
  gtag('event', 'game_started', withReferrer({ mode, is_first_game: isFirstGame }));

  // If this session was opened from a shared link, fire referred_game_started
  // exactly once on the first game start.
  const ref = getIncomingRef();
  if (ref && claimReferredStartOnce()) {
    const timeToStartSec = getTimeToStartSec() ?? 0;
    trackReferredGameStarted({ share_id: ref, mode, time_to_start_sec: timeToStartSec });
  }
}

export function trackGameCompleted(params: {
  mode: string;
  return_pct: number;
  final_value: number;
  initial_value: number;
  days_played: number;
}) {
  gtag('event', 'game_completed', withReferrer(params));
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
  share_id?: string;
}) {
  gtag('event', 'share_clicked', withReferrer(params));
}

export function trackShareCompleted(params: {
  share_type: 'x' | 'copy' | 'native' | 'duel_challenge';
  mode: string;
  return_pct?: number;
  share_id: string;
  channel?: 'clipboard' | 'web_share' | 'x_intent';
}) {
  gtag('event', 'share_completed', withReferrer(params));
}

// ── Viral attribution ───────────────────────────────────────

export function trackVisitFromShare(params: {
  share_id: string;
}) {
  // Not wrapped with withReferrer — this IS the event that records the referrer.
  gtag('event', 'visit_from_share', params);
}

export function trackReferredGameStarted(params: {
  share_id: string;
  mode: string;
  time_to_start_sec: number;
}) {
  gtag('event', 'referred_game_started', params);
}

export function trackReferredGameCompleted(params: {
  share_id: string;
  mode: string;
  return_pct: number;
}) {
  gtag('event', 'referred_game_completed', params);
}

export function trackReferredShareCompleted(params: {
  parent_share_id: string;
  share_id: string;
  mode: string;
  return_pct?: number;
  share_type: 'x' | 'copy' | 'native' | 'duel_challenge';
}) {
  gtag('event', 'referred_share_completed', params);
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
