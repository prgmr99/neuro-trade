# Handoff Report: Milestone 1: Sync Fix & Leaderboard Polish

## Observation
- In `RoomBattle.tsx`, the hook `useGameStore()` provides `setInitialState` but is missing `nextDay` from its destructuring.
- `useRoomBattle` correctly advances `roomState.day` via `supabase`, but `RoomBattle.tsx` has no mechanism to sync this remote `day` to the local `gameStore` after initialization.
- Reconnections mid-game (where `roomState.day > 1`) will initialize the `gameStore` to day 1, leading to a mismatched state between the remote room and local client.
- `useRoomBattle` exposes `isConnected` which goes `false` on disconnects, but `RoomBattle.tsx` does not consume or render any UI indicating connection loss during gameplay.
- `MultiplayerHUD` accepts `LivePlayer[]` which lacks the `isHost` property that `RoomPlayer` provides, preventing the leaderboard from displaying the host badge.

## Logic Chain
1. **Sync Bug**: To fix the sync bug, `RoomBattle.tsx` must keep track of the local day (e.g., using `lastProcessedDayRef`). During gameplay, a `useEffect` must watch `roomState.day`. If `roomState.day > lastProcessedDayRef.current`, it should call `nextDay()` for each missing day to catch up.
2. **Mid-game Reconnection**: In the initialization `useEffect`, if `roomState.day > 1`, the client needs to catch up by calling `nextDay()` up to `roomState.day - 1` times before broadcasting the initial portfolio.
3. **Disconnect UI**: We can extract `isConnected` from `useRoomBattle` and conditionally render a `.room-disconnect-overlay` in the `'playing'` screen so the user knows they are disconnected.
4. **UI Polish**: We can pass the `RoomPlayer` objects (which include `isHost: boolean`) directly to `MultiplayerHUD`. By updating the `leaderboard` prop type in `MultiplayerHUD.tsx` to handle an optional `isHost`, we can render a host badge next to the player's name in the leaderboard, mirroring the lobby's UI.

## Caveats
- Since `nextDay()` directly updates the store, calling it in a loop safely skips intermediate renders, but any pre-applied news logic within `gameStore.ts` must not be dependent on slow asynchronous state resolution. (It is fully synchronous, so it's safe).
- We assume that `roomState.day` only increases. If it decreases (e.g., room reset), `RoomBattle.tsx` completely unmounts/leaves the game, which resets the ref.

## Conclusion
Implement the following changes:
1. **`RoomBattle.tsx`**: Add `nextDay` to `useGameStore()` destructuring. Add `lastProcessedDayRef`. In the initial sync effect, fast-forward by calling `nextDay()` if `roomState.day > 1`. Add a new `useEffect` watching `roomState.day` to call `nextDay()` when the host advances the day.
2. **`RoomBattle.tsx`**: Extract `isConnected` from `useRoomBattle`. In the `screen === 'playing'` block, render a full-screen semi-transparent overlay if `!isConnected` with a reconnecting message. Add basic CSS for this to `RoomBattle.css`.
3. **`MultiplayerHUD.tsx`**: Update the `leaderboard` prop type to allow an optional `isHost: boolean`. Render a host badge (like a crown) in `.mp-hud-name-row` if `entry.isHost` is true.

## Verification Method
1. Create a room as a host and join it from a different browser session.
2. Start the game. Wait for the day to advance automatically. Both screens should advance to day 2, and the stock charts should update (verifying `nextDay()` was called).
3. Disconnect network on one client. Ensure the reconnecting overlay appears. Reconnect network and verify it disappears.
4. Refresh the client mid-game (e.g., on day 3) and rejoin the room. The client should fast-forward to day 3 upon joining.
5. In the playing screen, verify the host has a crown badge in the leaderboard HUD.
