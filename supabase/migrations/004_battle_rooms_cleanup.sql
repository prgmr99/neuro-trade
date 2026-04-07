-- Cleanup function for stale/zombie battle rooms
-- Removes rooms older than 24 hours that are still in 'waiting' or 'playing' status
-- and rooms in 'finished' status older than 7 days.
--
-- Usage: Run via pg_cron (if available) or scheduled Edge Function.
-- Example pg_cron: SELECT cron.schedule('cleanup-battle-rooms', '0 * * * *', $$SELECT cleanup_stale_battle_rooms()$$);

CREATE OR REPLACE FUNCTION cleanup_stale_battle_rooms()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  deleted_count integer;
BEGIN
  DELETE FROM battle_rooms
  WHERE
    (status IN ('waiting', 'playing') AND created_at < now() - interval '24 hours')
    OR
    (status = 'finished' AND finished_at < now() - interval '7 days')
    OR
    (status = 'finished' AND finished_at IS NULL AND created_at < now() - interval '7 days');

  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;
