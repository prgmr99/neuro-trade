-- Enable REPLICA IDENTITY FULL on battle_rooms so that postgres_changes
-- row-level filters (e.g. room_code=eq.XXXXXX) work correctly.
-- Without this, Supabase Realtime may not be able to evaluate the filter
-- and could either broadcast all room changes or none to subscribers.
ALTER TABLE battle_rooms REPLICA IDENTITY FULL;
