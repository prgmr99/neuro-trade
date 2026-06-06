# Phase 2: Adversarial Coverage Hardening Gap Report

## Overview
Analysis of the Multiplayer Mode (`useRoomBattle.ts`, `RoomBattle.tsx`, `gameStore.ts`) has revealed several critical edge cases, desync vulnerabilities, and logic bugs that are not covered by the current E2E test suite.

## 1. Host Disconnect Deadlock (Logic Bug & Resource Leak)
**File:** `src/hooks/useRoomBattle.ts` (Lines 292-323)

**Observation:**
The code comment states: `// Any client can advance the day, with guard flag to prevent race condition`. However, the conditional statement explicitly requires the user to be the host: `current.hostId === userId`.

```typescript
if (remaining <= 0 && playerCountRef.current > 0 && !isAdvancingDayRef.current && current.hostId === userId) {
  // advances day
}
```

**Impact:**
If the host's client crashes, closes the tab, or loses internet connection during the `playing` state, the room becomes permanently deadlocked. No other client can advance the day because `current.hostId === userId` evaluates to false for them.
Furthermore, in the `leave()` method, the host only deletes the room if it is in the `waiting` state. If a host leaves during `playing`, the room is abandoned and remains in the database indefinitely, causing a resource leak.

## 2. Client-Side Clock Skew Vulnerability (Multiplayer Sync)
**Files:** `src/hooks/useRoomBattle.ts`, `RoomBattle.tsx`

**Observation:**
The timer logic relies entirely on the local system clocks of the clients.
When the host starts the game or advances a day, they calculate the end time using their local clock:
```typescript
const dayEndsAt = new Date(Date.now() + 60000).toISOString();
```
Clients then receive this timestamp and compare it to their *own* local clock:
```typescript
const remaining = Math.max(0, Math.ceil((dayEndsAtRef.current - Date.now()) / 1000));
```

**Impact:**
If a client's system clock is out of sync with the host's clock (e.g., their system time is 5 minutes behind), they will see a countdown of `360` seconds (6 minutes) instead of 60 seconds. Conversely, if their clock is ahead, the timer will hit `0` instantly. There is no synchronization of server offset time.

## 3. Untrusted Client Portfolio Broadcast (Cheating Vulnerability)
**File:** `src/hooks/useRoomBattle.ts` (Lines 76-102)

**Observation:**
The leaderboard relies purely on clients broadcasting their own portfolio values over Supabase Realtime presence/broadcast channels.
```typescript
channelRef.current?.send({
  type: 'broadcast',
  event: 'portfolio_update',
  payload: { playerId: userId, playerName: playerNameRef.current, portfolioValue: value, returnPct }
});
```

**Impact:**
A malicious user can manually invoke `broadcastPortfolio(9999999, 500)` via console or modified client. Since there is no server-side validation or cross-client verification of trades or initial cash, the malicious user will instantly win the multiplayer match. 

## 4. Unhandled Offline Portfolio Accumulation
**File:** `src/hooks/useRoomBattle.ts` (Lines 223-231)

**Observation:**
When a presence sync occurs, the hook attempts to keep offline players in the list:
```typescript
for (const prev of prevPlayers) {
  if (!seen.has(prev.playerId)) {
    newPlayers.push({ ...prev, isActive: false });
  }
}
```
**Impact:**
If an offline player reconnects under a different presence ID or causes duplicate presence events, the UI could duplicate players or fail to re-associate them correctly since `seen` only tracks currently connected presence IDs.

## Test Artifacts Created
- `/Users/yeomseungjun/Desktop/workplace/trading-game/.agents/challenger_m2_2_1/test_adversarial_sync.js` (Stress test demonstrating the Host Disconnect Deadlock)
