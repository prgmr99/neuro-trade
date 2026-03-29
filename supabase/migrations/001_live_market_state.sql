CREATE TABLE IF NOT EXISTS live_market_state (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  cycle_number integer NOT NULL DEFAULT 0,
  day integer NOT NULL DEFAULT 1,
  seed integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Single row, upsert only
INSERT INTO live_market_state (id, cycle_number, day, seed)
VALUES (1, 0, 1, 0)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users (including anonymous) to read and upsert
ALTER TABLE live_market_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read live market state"
  ON live_market_state FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can update live market state"
  ON live_market_state FOR UPDATE
  TO authenticated
  USING (true);

-- Enable realtime for this table
ALTER PUBLICATION supabase_realtime ADD TABLE live_market_state;
