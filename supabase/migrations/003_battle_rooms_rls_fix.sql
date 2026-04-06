-- Fix overly permissive RLS policies on battle_rooms
-- CS-1: UPDATE was open to all authenticated users, allowing any player to
--        manipulate any room's status, seed, or host_id.
--        DELETE policy was missing, so host room cleanup silently failed.

-- Drop the permissive update policy
DROP POLICY IF EXISTS "Anyone can update rooms" ON battle_rooms;

-- Only the host can update their own room
CREATE POLICY "Host can update own room"
  ON battle_rooms FOR UPDATE TO authenticated
  USING (host_id = auth.uid()::text);

-- Only the host can delete their own room (for cleanup on leave)
CREATE POLICY "Host can delete own room"
  ON battle_rooms FOR DELETE TO authenticated
  USING (host_id = auth.uid()::text);
