# Review Report: Multiplayer Vulnerabilities Fixes

**Verdict**: VETO (REQUEST_CHANGES)

## Findings

I have thoroughly reviewed the worker's changes in `useRoomBattle.ts`, `RoomBattle.tsx`, `gameStore.ts`, and the migration `006_room_participants.sql`. While the architectural shift to server-authoritative state via `room_participants` is the correct approach, the implementation contains several fundamental logic flaws and security vulnerabilities.

### 1. Room Capacity Bypass: TOCTOU Race Condition [Critical]
- **Where**: `006_room_participants.sql` (trigger `check_room_capacity`)
- **What**: The trigger checks the current count of participants and compares it to `max_players` without acquiring a row-level lock.
- **Why**: Postgres `READ COMMITTED` isolation means concurrent `INSERT` transactions will both read the same `current_count` before either commits. Two concurrent joins to a room with 1 slot remaining will both read `current_count < max_allowed` and succeed, bypassing the capacity limit.
- **Fix**: The trigger must lock the room row before counting, e.g., `SELECT max_players INTO max_allowed FROM battle_rooms WHERE room_code = NEW.room_code FOR UPDATE;`.

### 2. Spoofing and Capacity Bypass via UPDATE [Critical]
- **Where**: `006_room_participants.sql` (RLS policy "Players can update their own portfolio")
- **What**: The RLS `UPDATE` policy uses `USING (player_id = auth.uid()::text)` but does not restrict which columns can be updated.
- **Why**: An attacker can execute an `UPDATE` on their own row to change immutable columns. For example:
  - `UPDATE room_participants SET joined_at = '1970-01-01'` to spoof the join time and win the tiebreaker (reintroducing Vulnerability 2).
  - `UPDATE room_participants SET room_code = 'FULL_ROOM'` to move themselves into a full room, entirely bypassing the `BEFORE INSERT` capacity trigger.
- **Fix**: Create a Postgres trigger or use column-level permissions/RLS checks to explicitly prevent updates to `room_code`, `player_id`, `joined_at`, and `player_name`.

### 3. Clock Skew Bypass Remains via Arbitrary Advancement [High]
- **Where**: `006_room_participants.sql` (trigger `check_day_advancement`)
- **What**: The trigger only ensures that an update cannot occur *before* `OLD.day_ends_at`. It does not enforce the new state being set.
- **Why**: Once a day officially ends, a malicious participant can send an `UPDATE` payload setting `NEW.day = OLD.day + 10` and `NEW.day_ends_at = '1970-01-01'`. The trigger will allow this, and since the new `day_ends_at` is in the past, the attacker can instantly continue to advance the game. The client-side logic in `useRoomBattle.ts` calculates `current.day + 1`, but an attacker is not bound by client-side logic.
- **Fix**: The trigger must explicitly enforce `NEW.day = OLD.day + 1` and ensure `NEW.day_ends_at` is correctly set in the future (e.g., `> now()`).

### 4. Arbitrary Room Hijacking by Participants [High]
- **Where**: `006_room_participants.sql` (RLS policy "Participants can update room")
- **What**: The policy allows any participant to update `battle_rooms` to advance the day. However, it does not restrict which columns participants can update.
- **Why**: Any participant can modify the `host_id`, change the `status` back to `waiting`, change `max_players`, or alter the random `seed` mid-game.
- **Fix**: Participants should ideally only be allowed to update `day`, `day_ends_at`, and `status` (for finishing the game). A trigger should block updates to `host_id`, `room_code`, `max_players`, and `seed` unless performed by the host prior to playing.

## Conclusion
The worker's fixes successfully address the P2P Presence vulnerabilities (Offline Accumulation and Broadcast Spoofing) by moving state to the database. However, the DB constraints (triggers and RLS) are too permissive and introduce critical loopholes that allow attackers to bypass the very constraints they aim to enforce. The fixes are **vetoed** pending the resolution of these flaws.
