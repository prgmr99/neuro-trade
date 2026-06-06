# Handoff Report: E2E Test Suite and RoomBattle Sync Bug

## 1. Observation
- Execution of `node scripts/test_multiplayer_bots.js` timed out waiting for user permission, so analysis was performed statically across the codebase.
- **RLS Constraints**: `supabase/migrations/003_battle_rooms_rls_fix.sql` strictly enforces that only the host can update a room (`USING (host_id = auth.uid()::text)`).
- **Day Advancement Logic**: In `src/hooks/useRoomBattle.ts` (lines ~293), the countdown timer invokes `supabase.from('battle_rooms').update(...)` for **any** client when the timer hits zero (`remaining <= 0`).
- **Portfolio Sync Logic**: In `src/components/RoomBattle/RoomBattle.tsx`, `broadcastPortfolio` is only called via a `setInterval` every 10 seconds. When `roomState.status` becomes `'finished'`, the component immediately sets `screen = 'finished'`, tearing down the interval without sending a final broadcast.
- **Final Leaderboard UI**: The `'finished'` screen renders the `players` array as-is, without injecting the local player's up-to-date final portfolio value, unlike the `'playing'` screen.

## 2. Logic Chain
1. **RLS / Day Advancement Bug**: Because `useRoomBattle.ts` lacks a host-only check for the day-advancement DB update, non-host clients automatically attempt to update the `battle_rooms` table when the timer expires. The database's RLS policy rejects this, causing `useRoomBattle.ts` to catch the error and call `setError(error.message)`. This breaks the UI for non-hosts, presenting them with a visible permission error instead of smoothly syncing the day.
2. **Stale Final Leaderboard Bug**: When the final day completes and the host sets `status = 'finished'`, clients apply the final day's price movements locally via `nextDay()`. However, because the component switches to `screen = 'finished'` instantly, the 10-second `broadcastPortfolio` interval is unmounted before the final scores are sent to the room. Consequently, all players see a stale leaderboard that misses the final day's market movements.

## 3. Caveats
- The automated E2E script (`test_multiplayer_bots.js`) could not be run dynamically due to the system's permission prompt timeout. The conclusions are derived from a full static trace of the real-time events, Zustand store, and React lifecycle.

## 4. Conclusion
The root cause of the "day advancement sync bug" and leaderboard inaccuracies stems from unauthorized DB update attempts by non-hosts and missing end-of-game broadcast triggers.

**Recommended Fix Strategy**:
1. **Fix `useRoomBattle.ts`**: Modify the day advancement condition to explicitly require host privileges:
   ```ts
   if (remaining <= 0 && playerCountRef.current > 0 && !isAdvancingDayRef.current && current.hostId === userId)
   ```
2. **Fix `RoomBattle.tsx` (Final Broadcast)**: Add logic to explicitly broadcast the final portfolio value precisely when `status === 'finished'` is detected, just before or alongside `setScreen('finished')`.
3. **Fix `RoomBattle.tsx` (Final Screen UI)**: Ensure the local player's final computed portfolio value is injected into their own row on the `'finished'` leaderboard, matching the behavior of the `'playing'` screen.

## 5. Verification Method
- **Automated**: Run `node scripts/test_multiplayer_bots.js` (with user approval). The script simulates host day advancement and asserts that portfolio broadcasts map accurately across clients.
- **Manual Check**: 
  1. Open two browser tabs and join the same room.
  2. Let the timer run out. Verify the non-host does *not* display a red RLS error.
  3. Let the game reach the `'finished'` state. Verify both tabs display the exact same final portfolio values, reflecting the final day's price movements.
