# Explorer Handoff: RoomBattle Sync, Disconnects & UI Polish

## 1. Observation

1. **Day Advancement Sync Bug**: 
   - In `RoomBattle.tsx:65`, `const { setInitialState, dayState, portfolio, stocks } = useGameStore();` doesn't extract `nextDay`.
   - In `RoomBattle.tsx:466`, `const currentDay = roomState?.day ?? dayState.currentDay;` updates the visual label, but the underlying `gameStore` state (prices, news, charts) never advances because `nextDay()` is never called when `roomState.day` increases.
2. **Disconnect Handling Issue**: 
   - In `useRoomBattle.ts:250`, inside `channel.subscribe(async (status) => { if (status === 'SUBSCRIBED') { ... } })`, `joinedAtRef.current = Date.now()` is reset, and the tracked state hardcodes `portfolioValue: 0, returnPct: 0`. If a player temporarily drops and reconnects, their score resets to 0 until the next 10s broadcast, and their "join time" changes.
   - `RoomBattle.tsx` pulls `isConnected` from the hook but doesn't display any visual indicator to the user when they disconnect mid-game.
3. **UI Polish Needs (Lobby & Leaderboard)**:
   - `MultiplayerHUD.css` lacks a max-height on `.mp-hud-entries`, which could cause overflow if there are many players. Entries also jump instantly on rank changes.
   - `RoomBattle.css` lobby UI could use better visual cues for the empty slots or an improved player card layout.

## 2. Logic Chain

1. **Fixing Day Sync**: 
   - The game logic requires `nextDay()` to be called to calculate new prices and update charts.
   - We must add a `useEffect` in `RoomBattle.tsx` that tracks the previous room day (`prevRoomDayRef.current`). When `roomState.day` exceeds the `prevRoomDayRef`, we call `useGameStore.getState().nextDay()` (or extract it from the hook) sequentially for each missed day.
2. **Fixing Disconnects**:
   - In `useRoomBattle.ts`, move `joinedAtRef.current = Date.now()` to the initial join/create function, or guard it so it only sets once.
   - In the `SUBSCRIBED` block, read `portfolioMapRef.current.get(userId)` to broadcast the user's latest actual portfolio value instead of `0`.
   - In `RoomBattle.tsx`, when `!isConnected`, render a "Reconnecting..." overlay or banner.
3. **Polishing UI**:
   - Add `max-height: 250px; overflow-y: auto;` to `.mp-hud-entries`.
   - Add `transition: transform 0.3s ease, background 0.2s ease` to `.mp-hud-entry`.
   - Improve lobby UI styling (e.g., adding animations to player cards, adjusting padding).

## 3. Caveats

- We assume that `nextDay()` cleanly handles being called multiple times rapidly if a disconnected user reconnects and finds they are several days behind. (The `useGameStore` implementation looks synchronous and deterministic, so this is safe).
- The `portfolioMapRef` uses `userId` (string) as the key, so `get(userId)` will properly return the saved value.

## 4. Conclusion

- **Day Sync**: Add a `useEffect` in `RoomBattle.tsx` to call `nextDay()` whenever `roomState.day` increments. Extract `nextDay` from `useGameStore`.
- **Disconnects**: Update `useRoomBattle.ts` to restore the last known portfolio value on `SUBSCRIBED`. Add a "Reconnecting" UI banner in `RoomBattle.tsx`.
- **UI Polish**: Update `MultiplayerHUD.css` to add scroll limits and transitions. Tweak lobby CSS for a tighter look.

## 5. Verification Method

1. **Code Review**: Ensure `RoomBattle.tsx` calls `nextDay()` exactly `roomState.day - prevRoomDayRef.current` times when the day changes.
2. **Local Test (Sync)**: Open two tabs, start a multiplayer game. Wait 60s for Day 2. Verify prices update and charts render for both tabs.
3. **Local Test (Disconnect)**: Go offline in network tools while playing. Verify a "Reconnecting" banner appears. Go online. Verify the leaderboard score doesn't drop to 0% upon reconnecting.
4. **Local Test (UI)**: Check the lobby with multiple players and verify the player list looks clean and the playing HUD handles overflowing entries gracefully.

### Proposed Code Changes

**1. `RoomBattle.tsx` Day Sync Fix**
```tsx
// 1. Add nextDay to extraction:
const { setInitialState, dayState, portfolio, stocks, nextDay } = useGameStore();

// 2. Add refs:
const initTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
const prevRoomDayRef = useRef<number | null>(null);

// 3. Inside the initialization useEffect, set initial day:
useEffect(() => {
  if (screen !== 'playing' || !roomState || initializedRef.current) return;
  // ...
  setInitialState(...);
  initializedRef.current = true;
  prevRoomDayRef.current = roomState.day; // <--- ADD THIS
  // ...
}, [screen, roomState]);

// 4. Add new sync useEffect:
useEffect(() => {
  if (screen !== 'playing' || !roomState || !initializedRef.current) return;
  if (prevRoomDayRef.current !== null && roomState.day > prevRoomDayRef.current) {
    const daysToAdvance = roomState.day - prevRoomDayRef.current;
    for (let i = 0; i < daysToAdvance; i++) {
      nextDay();
    }
    prevRoomDayRef.current = roomState.day;
  }
}, [roomState?.day, screen, nextDay]);
```

**2. `useRoomBattle.ts` Disconnect Fix**
```ts
// Update around line 250
channel.subscribe(async (status) => {
  if (status === 'SUBSCRIBED') {
    setIsConnected(true);
    // Remove: joinedAtRef.current = Date.now(); (Let it keep its original value set at ref creation)
    const myPortfolio = portfolioMapRef.current.get(userId as string);
    await channel.track({
      playerId: userId,
      playerName: playerNameRef.current,
      portfolioValue: myPortfolio ? myPortfolio.portfolioValue : 0,
      returnPct: myPortfolio ? myPortfolio.returnPct : 0,
      joinedAt: joinedAtRef.current,
    });
  }
  if (status === 'CHANNEL_ERROR') {
    setIsConnected(false);
  }
});
```

**3. `RoomBattle.tsx` Disconnect UI**
```tsx
// Add near the top of the 'playing' screen render block:
{!isConnected && (
  <div className="room-disconnect-banner">
    {t('roomBattle.reconnecting', 'Connection lost. Reconnecting...')}
  </div>
)}
```
