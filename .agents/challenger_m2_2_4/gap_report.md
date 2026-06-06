## Adversarial Coverage Hardening Report (Iteration 2)

**Status**: Gaps Found

### 1. Mid-game Join & Re-join to Reset Losses (Logic Bug / State Validation)
**Observation**: The `check_room_capacity` trigger strictly checks the number of participants, but there is no mechanism (trigger or RLS) enforcing that `battle_rooms.status == 'waiting'` when a player inserts into `room_participants`.
**Logic Chain**: 
1. The game relies on `room_participants` insertions to join a room.
2. An attacker can connect directly to the database via API and insert themselves into a room that is already `playing` or even `finished`.
3. They enter the room at the current day with a fresh portfolio value of $10,000, skipping prior market volatility.
4. Furthermore, a losing player can delete their row (`DELETE` RLS allows players to leave) and instantly `INSERT` themselves back, resetting their losses mid-game.
**Verification**: Run `node test_midgame_join.js` (provided below).

### 2. Unvalidated Portfolio Updates / Self-Spoofing (Validation Gap)
**Observation**: The fix for "Spoofing via UPDATE" restricts users from modifying *other* players' portfolios and immutable columns. However, it applies no bounds or validation to the player's *own* `portfolio_value` and `return_pct`.
**Logic Chain**:
1. RLS allows a player to update their own row in `room_participants`.
2. The `restrict_participant_updates` trigger allows modifications to `portfolio_value`.
3. Because the game simulation runs entirely client-side, the server trusts the updated values implicitly.
4. An attacker can bypass the UI and send a direct API request to update their `portfolio_value` to `999999999`, instantly winning the match without executing any trades.
**Verification**: Run `node test_self_spoofing.js` (provided below).

### 3. Host Fast-Forward / Clock Skew Bypass (Edge Case)
**Observation**: The `check_day_advancement` trigger enforces a strict 1-minute timer (`NEW.day_ends_at := now() + interval '1 minute'`) **only if** `NEW.day > OLD.day`.
**Logic Chain**:
1. The `restrict_room_updates` trigger forces non-hosts to advance the day when updating the room, but explicitly exempts the host (`IF auth.uid()::text != OLD.host_id THEN...`).
2. The host can execute a `UPDATE battle_rooms SET day_ends_at = '2000-01-01'` without changing the `day`.
3. Since `NEW.day == OLD.day`, the `check_day_advancement` trigger does not overwrite `day_ends_at`.
4. The database broadcasts the past timestamp to all clients, instantly ending the day for everyone and denying them time to trade.
**Verification**: Run `node test_host_fast_forward.js` (provided below).
