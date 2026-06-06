# Handoff Report

## Observation
I reviewed the provided `008_vulnerability_fixes_v2.sql` migration to verify the 4 vulnerability fixes. 
1. **Initial State Injection**: Handled correctly via `enforce_initial_participant_state` trigger, which forces `portfolio_value` to `10000` and `return_pct` to `0` on `INSERT`.
2. **Mid-game Join & Loss-Resetting**: `restrict_mid_game_joins_and_leaves` prevents `INSERT`/`DELETE` on `room_participants` when the parent room is not `'waiting'`.
3. **Clock Skew Arbitrary Advancement Bypass**: Handled in `restrict_room_updates` using the logic `IF NEW.day = OLD.day AND NEW.day_ends_at IS DISTINCT FROM OLD.day_ends_at THEN ... RAISE EXCEPTION ...`.
4. **Self-Spoofing Unvalidated Updates**: `restrict_participant_updates` limits `portfolio_value` between 0 and 10,000,000,000 and `return_pct` between -100 and 10,000,000.

## Logic Chain
During my adversarial review, I uncovered two significant flaws that warrant a VETO:

**1. Critical Logic Bypass in Clock Skew Fix (Vulnerability 3)**
The worker implemented the fix as:
```sql
  IF NEW.day = OLD.day AND NEW.day_ends_at IS DISTINCT FROM OLD.day_ends_at THEN
```
A malicious host can trivially bypass this entire block by simultaneously decrementing the day:
`UPDATE battle_rooms SET day = day - 1, day_ends_at = '2030-01-01' ...`
Since `NEW.day = OLD.day - 1`, the condition `NEW.day = OLD.day` is FALSE. It skips the `day_ends_at` check. Furthermore, the `check_day_advancement` trigger only fires its corrections `IF NEW.day > OLD.day`. Therefore, a malicious host can decrease the day and arbitrarily set `day_ends_at` forward or backward without restriction.
*Mitigation:* Prevent day decrements entirely (`IF NEW.day < OLD.day THEN RAISE EXCEPTION 'Cannot decrease day';`) and change the condition to `IF NEW.day <= OLD.day ...`

**2. Blocked Participant Leaves on Finished Games (UX/Logic Flaw)**
The `restrict_mid_game_joins_and_leaves` trigger blocks `DELETE` on `room_participants` when `status != 'waiting'`. However, when a game finishes (`status = 'finished'`), players are given a UI button to "Leave Room", which executes a `DELETE` against `room_participants` (see `src/hooks/useRoomBattle.ts:110`). The new trigger blocks this, meaning players and hosts can never leave a finished room on the backend, leading to orphaned participant records.
*Mitigation:* The trigger should allow `DELETE` when `current_status = 'finished'`.

## Caveats
I could not test the PostgreSQL cascade delete (`ON DELETE CASCADE` for `battle_rooms`) in a live database due to environmental limitations (no Docker). However, my analysis indicates that the `current_status IS NOT NULL` fallback in `restrict_mid_game_joins_and_leaves` correctly allows cascade deletions because the parent row is already marked deleted by the time the constraint trigger fires.

## Conclusion
**Verdict: REQUEST_CHANGES (VETO)**
The migration fails the adversarial review. The clock skew vulnerability is not fully patched, and the strict join/leave trigger breaks normal game exit flows for finished rooms.

## Verification Method
1. Create a room and start a game. Send `UPDATE battle_rooms SET day = day - 1, day_ends_at = '2030-01-01'`. The DB will erroneously accept it.
2. Finish a game. Attempt to click "Leave" in the UI. The frontend will disconnect, but the backend `DELETE` request will fail, keeping the participant stuck in the DB.
