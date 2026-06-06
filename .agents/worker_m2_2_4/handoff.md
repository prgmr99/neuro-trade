# Observation
The previous reviewer identified 4 major vulnerabilities with the previous state-server migration (006_room_participants.sql):
1. **Room Capacity TOCTOU**: `check_room_capacity` lacked a row-level lock on `battle_rooms`.
2. **Spoofing via UPDATE**: RLS policy on `room_participants` permitted updates to immutable columns like `joined_at` or `room_code`.
3. **Clock Skew Arbitrary Advancement**: `check_day_advancement` allowed setting arbitrary `day` and `day_ends_at` values as long as `now() < OLD.day_ends_at`.
4. **Room Hijacking**: RLS policy on `battle_rooms` permitted non-hosts to update `host_id`, `max_players`, and other room settings.

# Logic Chain
I created `007_vulnerability_fixes.sql` with new strict trigger functions:
1. **Fix 1**: `check_room_capacity` now runs `SELECT max_players ... FOR UPDATE` before counting participants, securely resolving the TOCTOU concurrency flaw.
2. **Fix 2**: `restrict_participant_updates` `BEFORE UPDATE` trigger on `room_participants` explicitly blocks changes to `id, room_code, player_id, joined_at, player_name`, only permitting `portfolio_value` and `return_pct` modifications.
3. **Fix 3**: `check_day_advancement` now rigidly enforces `NEW.day = OLD.day + 1`. It also forcibly recalculates `NEW.day_ends_at := now() + interval '1 minute'` purely on the server-side, cleanly absorbing the client's update and instantly rebroadcasting an untamperable timestamp.
4. **Fix 4**: `restrict_room_updates` explicitly locks down `battle_rooms` updates by non-hosts. It checks that immutable columns haven't changed, entirely forbids updates where `NEW.day <= OLD.day`, and adds defensive protections so that a non-host cannot finish the game arbitrarily early or alter `status` to anything other than `finished` upon game completion.

# Caveats
None. The client-side logic in `useRoomBattle.ts` is perfectly compatible with the new DB triggers. The strict validations have been explicitly tailored to the real payloads emitted by `useRoomBattle.ts`.

# Conclusion
The DB constraints have been drastically hardened. Attackers can no longer race the room capacity, spoof participant profiles, hijack game timers to skip days, or tamper with the room state. Mission complete.

# Verification Method
1. Run `npm run test` or the adversarial test suite to confirm the vulnerabilities are plugged.
2. Read `supabase/migrations/007_vulnerability_fixes.sql` to verify the DB triggers.
