-- Migration 006: Room Participants and Security Hardening

-- 1. Create room_participants table to securely track joins and portfolios
CREATE TABLE IF NOT EXISTS room_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_code text NOT NULL REFERENCES battle_rooms(room_code) ON DELETE CASCADE,
  player_id text NOT NULL,
  player_name text NOT NULL,
  portfolio_value numeric NOT NULL DEFAULT 10000,
  return_pct numeric NOT NULL DEFAULT 0,
  joined_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(room_code, player_id)
);

ALTER TABLE room_participants ENABLE ROW LEVEL SECURITY;

-- Read access for anyone
CREATE POLICY "Anyone can read participants" 
  ON room_participants FOR SELECT TO authenticated USING (true);

-- Insert access: players can only insert themselves
CREATE POLICY "Players can insert themselves" 
  ON room_participants FOR INSERT TO authenticated 
  WITH CHECK (player_id = auth.uid()::text);

-- Update access: players can only update their own portfolio
CREATE POLICY "Players can update their own portfolio" 
  ON room_participants FOR UPDATE TO authenticated 
  USING (player_id = auth.uid()::text);

-- Delete access: players can leave, or host can kick/cleanup
CREATE POLICY "Players can leave" 
  ON room_participants FOR DELETE TO authenticated 
  USING (
    player_id = auth.uid()::text 
    OR auth.uid()::text IN (SELECT host_id FROM battle_rooms WHERE room_code = room_participants.room_code)
  );

ALTER PUBLICATION supabase_realtime ADD TABLE room_participants;
ALTER TABLE room_participants REPLICA IDENTITY FULL;

-- 2. Fix Host Disconnect Stall
-- Drop the overly restrictive policy
DROP POLICY IF EXISTS "Host can update own room" ON battle_rooms;

-- Allow any participant to update the room (to advance the day)
CREATE POLICY "Participants can update room" 
  ON battle_rooms FOR UPDATE TO authenticated 
  USING (
    host_id = auth.uid()::text 
    OR auth.uid()::text IN (SELECT player_id FROM room_participants WHERE room_code = battle_rooms.room_code)
  );

-- 3. Enforce Capacity via Trigger
CREATE OR REPLACE FUNCTION check_room_capacity()
RETURNS TRIGGER AS $$
DECLARE
  current_count int;
  max_allowed int;
BEGIN
  SELECT count(*) INTO current_count FROM room_participants WHERE room_code = NEW.room_code;
  SELECT max_players INTO max_allowed FROM battle_rooms WHERE room_code = NEW.room_code;
  
  IF current_count >= max_allowed THEN
    RAISE EXCEPTION 'Room is full';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS enforce_room_capacity ON room_participants;
CREATE TRIGGER enforce_room_capacity
  BEFORE INSERT ON room_participants
  FOR EACH ROW EXECUTE FUNCTION check_room_capacity();

-- 4. Enforce Day Advancement Time (Fix Clock Skew bypass)
CREATE OR REPLACE FUNCTION check_day_advancement()
RETURNS TRIGGER AS $$
BEGIN
  -- If day is being advanced, ensure the current server time is past day_ends_at.
  -- Add a 5 second grace period to prevent flakiness due to clock drift.
  IF NEW.day > OLD.day THEN
    IF OLD.day_ends_at IS NOT NULL AND (now() + interval '5 seconds') < OLD.day_ends_at THEN
      RAISE EXCEPTION 'Cannot advance day before day_ends_at';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS enforce_day_advancement ON battle_rooms;
CREATE TRIGGER enforce_day_advancement
  BEFORE UPDATE ON battle_rooms
  FOR EACH ROW EXECUTE FUNCTION check_day_advancement();
