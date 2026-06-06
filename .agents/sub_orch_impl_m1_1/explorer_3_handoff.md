# Handoff Report

## 1. Observation
- In `src/components/RoomBattle/RoomBattle.tsx`, `useGameStore()` destructures `setInitialState, dayState, portfolio, stocks`, but omits `nextDay`.
- There is a `useEffect` on line 129 that syncs the room status (`playing` vs `finished`) to the screen, but it does not sync `roomState.day` to the local `dayState.currentDay`.
- In `src/hooks/useRoomBattle.ts` (lines 278-308), the `setInterval` timer responsible for day advancement explicitly checks `userId === current.hostId`. If the host disconnects, `remaining <= 0` but no one advances the day.
- The `battle_rooms` DB update for advancing the day correctly uses an optimistic lock (`.eq('day', current.day)`), preventing race conditions.
- In `src/hooks/useRoomBattle.ts` (lines 190-222), the player list is rebuilt entirely from active `presenceState`. When a player drops off, they immediately vanish from the `players` array and the leaderboard.

## 2. Logic Chain
1. **Day Sync Bug**: Because `RoomBattle.tsx` lacks a mechanism to call `nextDay()`, the UI countdown works, the database increments `day`, but the local market simulation (prices, news) never advances. Adding a sync effect that compares `roomState.day` and `dayState.currentDay` will resolve this.
2. **Host Disconnect Freeze**: Relying exclusively on the host to trigger day advancement creates a single point of failure. Since Supabase provides an optimistic lock (the `.eq('day', current.day)` condition), *any* client can safely attempt the update. Removing the `userId === current.hostId` constraint fixes the freeze.
3. **Player Disconnect Vanishing**: Erasing users from the local `players` array upon presence loss causes them to instantly disappear from the UI. By preserving known players in state and marking them with an `isActive: false` flag, the UI can gracefully display disconnected players.
4. **UI Polishing**: The lobby and leaderboard lack visual feedback for disconnects. By leveraging the proposed `isActive` flag, disconnected players can be grayed out. 

## 3. Caveats
- Host disconnect during the "waiting" (lobby) phase is currently handled by deleting the room if the host explicitly calls `leave()`. If the host's browser crashes, the room remains in the database.
- Allowing any client to advance the day means multiple clients might send the update request simultaneously. Supabase will handle this gracefully (1 success, others fail due to optimistic lock), but it may cause minor, harmless console errors.

## 4. Conclusion
To resolve the issues, the implementer should:
1. Update `RoomBattle.tsx` to include `nextDay` from `useGameStore()`, and add a `useEffect` that calls `nextDay()` when `roomState.day > dayState.currentDay`.
2. Update `useRoomBattle.ts` to allow any client to advance the day by removing `userId === current.hostId` from the timer logic.
3. Update `RoomPlayer` interface to include `isActive: boolean`. Retain players in the state even when they drop from presence, marking them `isActive: false`.
4. Update `MultiplayerHUD.tsx` and `RoomBattle.tsx` lobby UI to render disconnected players with a visual indicator (e.g., lower opacity, strike-through, or a disconnect icon).

## 5. Verification Method
- Start a local dev server and open two separate browser windows.
- Create a room in Window A, join with Window B, and start the game.
- Wait for the countdown. Verify that both windows see prices change and news advance (Day Sync fix).
- Close Window A (Host) mid-game. Verify that Window B continues to automatically advance the day (Host Disconnect fix).
- Verify that Window A's player remains on Window B's leaderboard but visually indicates a disconnected state.
