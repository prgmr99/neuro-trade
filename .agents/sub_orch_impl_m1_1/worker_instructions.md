# Synthesized Handoff Report for Milestone 1: Sync Fix & Leaderboard Polish

## 1. Day Advancement Sync Bug
- **Issue**: `RoomBattle.tsx` never calls `nextDay()` when the Supabase `roomState.day` advances.
- **Fix**: In `RoomBattle.tsx`, extract `nextDay` from `useGameStore`. Add a `useEffect` to compare `roomState.day` and a local ref tracking the last processed room day (or `dayState.currentDay`). If `roomState.day` is greater, call `nextDay()` in a loop to catch up.

## 2. Host Disconnect Freeze
- **Issue**: `useRoomBattle.ts` restricts day advancement to only the host (`userId === current.hostId`). If the host disconnects, the game freezes.
- **Fix**: Remove the `userId === current.hostId` constraint in the day advancement timer logic in `useRoomBattle.ts`. The existing `.eq('day', current.day)` in the Supabase RPC/update provides an optimistic lock, so any client can safely trigger the update without race conditions.

## 3. Player Disconnects & Score Reset
- **Issue**: `useRoomBattle.ts` completely removes players from the UI when they drop presence. When a player reconnects, their stats broadcast as 0.
- **Fix**:
  - Update `RoomPlayer` to include `isActive?: boolean`.
  - In `useRoomBattle.ts`, instead of replacing the `players` list strictly with active presence, merge active presence with previously known players. Mark players not in presence as `isActive: false`.
  - In `useRoomBattle.ts`, on the `SUBSCRIBED` event block, fetch the user's latest stats from `portfolioMapRef.current` rather than broadcasting `0`. Remove the overwrite of `joinedAtRef.current = Date.now()` on reconnect.

## 4. UI Polishing (Lobby & Leaderboard)
- **Fixes**:
  - `MultiplayerHUD.css`: Add `max-height: 250px; overflow-y: auto;` to `.mp-hud-entries`.
  - `MultiplayerHUD.tsx`: Allow optional `isHost: boolean` and `isActive?: boolean` on the leaderboard entry. Render a host badge (like a crown) if `isHost`, and reduce opacity (e.g. `opacity: 0.5`) if `isActive === false`.
  - `RoomBattle.tsx`: Extract `isConnected` from `useRoomBattle`. In the `playing` screen, render a visible banner overlay if `!isConnected` ("Connection lost. Reconnecting...").

## Verification
1. Open two browser windows. Start a game. Wait for day to advance -> both should sync.
2. Close Host window mid-game -> the remaining window should still automatically advance the day.
3. Disconnect network in DevTools on one player -> should show reconnecting banner locally, and on the other window, that player should be grayed out but remain on the leaderboard.
4. Reconnect -> player should rejoin without their score resetting to 0.
