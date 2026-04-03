CREATE TABLE IF NOT EXISTS battle_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_code text UNIQUE NOT NULL,
  host_id text NOT NULL,
  host_name text NOT NULL,
  max_players integer NOT NULL DEFAULT 4 CHECK (max_players >= 2 AND max_players <= 10),
  status text NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'playing', 'finished')),
  seed integer NOT NULL DEFAULT 0,
  day integer NOT NULL DEFAULT 1,
  max_days integer NOT NULL DEFAULT 5,
  day_ends_at timestamptz,
  time_remaining integer DEFAULT 60,
  created_at timestamptz NOT NULL DEFAULT now(),
  started_at timestamptz,
  finished_at timestamptz
);

-- RLS policies (same pattern as 001)
ALTER TABLE battle_rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read rooms" ON battle_rooms FOR SELECT TO authenticated USING (true);
CREATE POLICY "Anyone can create rooms" ON battle_rooms FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Anyone can update rooms" ON battle_rooms FOR UPDATE TO authenticated USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE battle_rooms;
