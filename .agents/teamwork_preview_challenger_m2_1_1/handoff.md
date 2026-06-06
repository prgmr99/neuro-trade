# Handoff Report: Adversarial Static Analysis of Room Battle

## 1. Observation
I reviewed `src/hooks/useRoomBattle.ts` and `src/components/RoomBattle/RoomBattle.tsx`. The code orchestrates a real-time multiplayer stock trading game via Supabase. Due to network environment restrictions (`node` blocked), I performed adversarial static analysis focusing on edge cases, race conditions, and error handling. 

Key code snippets identified:
- **Host Check:** `useRoomBattle.ts` line 293: `if (remaining <= 0 && playerCountRef.current > 0 && !isAdvancingDayRef.current && current.hostId === userId)`
- **Join Condition:** `useRoomBattle.ts` line 438: `if (data.status !== 'waiting') { setError('Room is not accepting players'); return false; }`
- **Game Finish Day:** `useRoomBattle.ts` line 303: `day: newDay,` (where `newDay = current.maxDays + 1`)
- **Effects Race Condition:** `RoomBattle.tsx` lines 130-152, where two sequential effects act on `roomState.status` and `roomState.day`.
- **Timer Mutation:** `useRoomBattle.ts` line 297: `dayEndsAtRef.current = newEndsAt;` (pushed locally before DB sync)
- **Suspicious Column:** `useRoomBattle.ts` line 316: `time_remaining: 60`

## 2. Logic Chain

I have discovered 5 distinct logic flaws:

**Flaw 1: Host-Only Day Advancement Freezes Game (Single Point of Failure)**
The comment on line 292 states: *"Any client can advance the day, with guard flag to prevent race condition"*, explicitly referencing the use of `.eq('day', current.day)` for optimistic locking. However, the `if` condition strictly enforces `&& current.hostId === userId`. If the host closes their tab, loses internet, or leaves, no other client can execute the day advancement. The timer hits 0 and the game permanently hangs for all remaining players.

**Flaw 2: Reconnections Are Explicitly Blocked**
During a battle, if a player accidentally refreshes the page, local React state is lost. If they attempt to rejoin, `joinRoom` enforces `if (data.status !== 'waiting') return false`. They are completely locked out. If the *host* refreshes the page, they cannot re-enter, which instantly triggers Flaw 1 and bricks the room for everyone.

**Flaw 3: React Closure Race Condition Causes Out-of-Bounds Game State**
When the room reaches the final day, `startGame` updates the DB with `status: 'finished'` and `day: maxDays + 1` (e.g., day 6). In `RoomBattle.tsx`, two effects listen to `roomState`. The first effect sees `'finished'` and calls `setScreen('finished')`. Because React state updates are batched and do not mutate variables in the current execution scope, the second effect (sync day advancement) still sees `screen === 'playing'` in its closure. It sees `roomState.day (6) > dayState.currentDay (5)` and executes `nextDay()`. This extra day advancement beyond `maxDays` will attempt to pull prices for an undefined day, likely crashing the game logic.

**Flaw 4: Optimistic Timer State Hides Network Failures**
When the host advances the day, `dayEndsAtRef.current = Date.now() + 60000` is executed *before* the DB `.update()` is initiated. If the network call fails, the host's timer is still pushed forward by 60 seconds locally. They will not retry the update until this artificial 60-second delay expires, while all other clients remain stuck at 0.

**Flaw 5: Suspicious `time_remaining` Column in Update Payload**
On line 316, the day advancement payload includes `time_remaining: 60`. However, `time_remaining` does not exist in the `RoomState` interface, nor is it populated during room creation (`insert`). If this column does not exist in the database schema, the update will unconditionally fail, completely preventing the game from advancing past day 1.

## 3. Caveats
- Since empirical tests could not be run, the `time_remaining` schema mismatch is a hypothesis based on static analysis of the source code. If the database schema was updated out-of-band to include this column, Flaw 5 is a non-issue.
- I assume `useGameStore` is un-persisted memory; if it uses `localStorage`, the reconnect behavior might be different, though they are still blocked by the `waiting` check.

## 4. Conclusion
The implementation of `useRoomBattle.ts` and `RoomBattle.tsx` contains multiple high-severity logic flaws that will cause the game to freeze or crash under common edge cases (host leaving, page refresh, network failures, and game end). The code requires structural fixes to day advancement permissions, reconnection flows, and effect dependencies.

## 5. Verification Method
1. **Flaw 1 & 2**: Start a room battle, open a second browser window as a client. On the host window, refresh the page. Observe that the host cannot rejoin, and the client's timer hits 0 and hangs forever.
2. **Flaw 3**: Play a game to completion (day 5). Set a breakpoint or console log inside `nextDay()` in `useGameStore` and verify it is erroneously called for day 6 when the game finishes.
3. **Flaw 4**: Start a game, disconnect internet on the host right before the timer hits 0. Reconnect 5 seconds later. Observe the host must wait 55 more seconds to retry.
4. **Flaw 5**: Verify the Supabase schema for the `battle_rooms` table to see if `time_remaining` exists.
