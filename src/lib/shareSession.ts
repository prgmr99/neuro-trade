/**
 * Viral share attribution utilities.
 *
 * Flow:
 *  1. Sharer completes a game → createShareId() generates a 6-char base36 id.
 *  2. URL is built with buildShareUrl() which appends ?ref=<shareId>.
 *  3. Recipient opens the link → captureIncomingRef() (called once at app mount)
 *     reads the ref param, stores it in sessionStorage, and lets callers fire
 *     a visit_from_share event exactly once per session.
 *  4. During the referred session, getIncomingRef() returns the stored share id
 *     so analytics events can attach referrer_share_id.
 *
 * All functions are browser-safe no-ops in SSR environments.
 */

const REF_STORAGE_KEY = 'nt.ref';
const REF_TRACKED_FLAG = 'nt.ref.tracked';
const REF_LANDED_AT_KEY = 'nt.ref.landed_at';
const REF_STARTED_FLAG = 'nt.ref.started';
const REF_QUERY_PARAM = 'ref';

function hasWindow(): boolean {
  return typeof window !== 'undefined';
}

function safeSessionStorage(): Storage | null {
  if (!hasWindow()) return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

/**
 * Generate a 6-character base36 share id.
 *
 * Collision probability at 1k shares/day: ≈ 0.01%. Good enough for attribution
 * without a backend. The id is not cryptographically secure — it only needs to
 * be unique enough to distinguish share origins in analytics.
 *
 * Note: We intentionally avoid encoding PII (mode, returnPct) in the id so the
 * raw URL doesn't leak gameplay data. Attach those as separate event props.
 */
export function createShareId(): string {
  const rand = Math.floor(Math.random() * 36 ** 4).toString(36).padStart(4, '0');
  const time = (Date.now() % 36 ** 2).toString(36).padStart(2, '0');
  return (rand + time).slice(0, 6);
}

/**
 * Build a share URL with ?ref=<shareId> appended. Preserves any pre-existing
 * query params (e.g. ?duel=<seed>&ref=<id>).
 */
export function buildShareUrl(
  baseUrl: string,
  shareId: string,
  extraParams?: Record<string, string>,
): string {
  try {
    const url = new URL(baseUrl);
    if (extraParams) {
      for (const [k, v] of Object.entries(extraParams)) {
        url.searchParams.set(k, v);
      }
    }
    url.searchParams.set(REF_QUERY_PARAM, shareId);
    return url.toString();
  } catch {
    // baseUrl was not a valid absolute URL; fall back to string concat.
    const sep = baseUrl.includes('?') ? '&' : '?';
    const extras = extraParams
      ? Object.entries(extraParams)
          .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
          .join('&') + '&'
      : '';
    return `${baseUrl}${sep}${extras}${REF_QUERY_PARAM}=${encodeURIComponent(shareId)}`;
  }
}

/**
 * Read the ?ref= param from current URL (if any) and persist it to
 * sessionStorage. Returns { shareId, firstCapture } so the caller can fire
 * visit_from_share exactly once per session.
 *
 * Call this once from the app root on mount.
 */
export function captureIncomingRef(): { shareId: string | null; firstCapture: boolean } {
  if (!hasWindow()) return { shareId: null, firstCapture: false };

  const params = new URLSearchParams(window.location.search);
  const incoming = params.get(REF_QUERY_PARAM);
  const storage = safeSessionStorage();

  if (incoming && storage) {
    const alreadyTracked = storage.getItem(REF_TRACKED_FLAG) === '1';
    if (!alreadyTracked) {
      storage.setItem(REF_STORAGE_KEY, incoming);
      storage.setItem(REF_TRACKED_FLAG, '1');
      storage.setItem(REF_LANDED_AT_KEY, String(Date.now()));
      return { shareId: incoming, firstCapture: true };
    }
    return { shareId: storage.getItem(REF_STORAGE_KEY), firstCapture: false };
  }

  if (storage) {
    return { shareId: storage.getItem(REF_STORAGE_KEY), firstCapture: false };
  }
  return { shareId: null, firstCapture: false };
}

/**
 * Get the share id that brought the current session here, if any.
 * Returns null when the session is organic (no ref in URL).
 */
export function getIncomingRef(): string | null {
  const storage = safeSessionStorage();
  if (!storage) return null;
  return storage.getItem(REF_STORAGE_KEY);
}

export function clearIncomingRef(): void {
  const storage = safeSessionStorage();
  if (!storage) return;
  storage.removeItem(REF_STORAGE_KEY);
  storage.removeItem(REF_TRACKED_FLAG);
  storage.removeItem(REF_LANDED_AT_KEY);
  storage.removeItem(REF_STARTED_FLAG);
}

/**
 * Seconds between the referred user's landing and their first game start.
 * Returns null if landing timestamp wasn't recorded (organic session).
 */
export function getTimeToStartSec(): number | null {
  const storage = safeSessionStorage();
  if (!storage) return null;
  const landedAt = Number(storage.getItem(REF_LANDED_AT_KEY));
  if (!landedAt) return null;
  return Math.max(0, Math.round((Date.now() - landedAt) / 1000));
}

/**
 * Claim the one-shot "referred_game_started" flag. Returns true exactly once
 * per session; subsequent calls return false so the event fires only on the
 * first game start after a shared-link landing.
 */
export function claimReferredStartOnce(): boolean {
  const storage = safeSessionStorage();
  if (!storage) return false;
  if (storage.getItem(REF_STARTED_FLAG) === '1') return false;
  storage.setItem(REF_STARTED_FLAG, '1');
  return true;
}
