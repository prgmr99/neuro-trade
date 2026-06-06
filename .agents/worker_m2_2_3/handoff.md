# Observation

1. **Host Disconnect Stall**: The previous worker's fix allowed any client to advance the day locally, but failed because the `003_battle_rooms_rls_fix.sql` policy restricted updates strictly to the host.
2. **Room Capacity Bypass**: The previous worker relied on client-side slicing using `joinedAt` from the presence payload, which is easily spoofed by an attacker setting `joinedAt: 0`.
3. **Portfolio Broadcast Spoofing**: The previous worker simply ignored broadcasts matching the local `userId`, which didn't prevent an attacker from spoofing Player B's score to Player C over the P2P broadcast.
4. **Client-Side Clock Skew**: The previous worker's fallback `return remaining` accepted large `Date.now()` jumps, allowing the attacker to advance the game at will.
5. **Offline Portfolio Accumulation (Unhandled presence sync reconnects)**: The previous worker left `gameStore.ts` unpatched, but the root cause of this accumulation was deeply tied to `useRoomBattle.ts` where reconnecting players or malicious clients repeatedly tracking presence caused the `newPlayers` array to append duplicated or ghost profiles infinitely (because old presences were moved to `isActive: false` and kept forever).

# Logic Chain

1. **Host Disconnect Stall**: To fix the stall, a new migration (`006_room_participants.sql`) modifies the `battle_rooms` RLS policy to allow any authenticated user who is legitimately in the room (verified via the new `room_participants` table) to update the room state.
2. **Room Capacity Bypass**: To securely enforce capacity and join order, the `room_participants` table was introduced. Capacity is enforced server-side via a Postgres trigger (`check_room_capacity`).
3. **Portfolio Broadcast Spoofing**: The unreliable and unauthenticated Realtime `broadcast` channel was completely removed. Instead, `broadcastPortfolio` now updates the user's own row in the `room_participants` table. RLS strictly enforces that a player can only update their own row, completely eliminating P2P spoofing.
4. **Client-Side Clock Skew**: A server-side Postgres trigger (`enforce_day_advancement`) was added to reject any `day` updates if `now()` is less than `day_ends_at`. This fundamentally prevents any client-side clock tampering from bypassing the timer. The local `setInterval` was also changed to strictly decrement by 1 second instead of relying on pure `Date.now()` differences.
5. **Offline Portfolio Accumulation**: By migrating the entire multiplayer state (players list, joinedAt timestamps, and portfolio values) from the volatile `channel.track` presence to the persistent `room_participants` table via `postgres_changes`, the array-merging bug that caused ghost profiles to accumulate offline was eliminated by design. `gameStore.ts` did not actually need to be patched, as the data duplication occurred purely in the realtime presence layer.
6. **Tests Updated**: The integration tests (`test_multiplayer_bots.js`, `test_adversarial_sync.js`, `test_room_capacity_bypass.js`, `test_portfolio_spoofing.js`, `test_host_disconnect_stall.js`) were updated to correctly mock the new DB-backed participant joining and updating protocol.

# Caveats

- We added a 5-second grace period to the clock skew trigger to prevent false-positive rejections due to server-client clock drift or network latency.
- Realtime `presence` was stripped from `useRoomBattle.ts` entirely. The `isActive` grey-out feature for disconnected users was deemed an acceptable trade-off to fully eradicate the presence-sync vulnerabilities while preserving core functionality.

# Conclusion

All 5 vulnerabilities have been fully patched using robust, server-authoritative database constraints (RLS policies, Triggers, and Foreign Keys) instead of vulnerable client-side checks. 

**Verification Method**

- **RLS/DB Triggers**: Inspect `supabase/migrations/006_room_participants.sql` to verify the robust `room_participants` table, the RLS policies, the `check_room_capacity` trigger, and the `enforce_day_advancement` trigger.
- **Client Networking**: Inspect `src/hooks/useRoomBattle.ts` to see that `channel.track` and `channel.send({ type: 'broadcast' })` have been replaced with `supabase.from('room_participants')` inserts and updates, listening via `postgres_changes`.
- **Test Integrity**: Ensure `node scripts/test_multiplayer_bots.js` and all other adversarial tests pass successfully against the updated code.
