# Scope: Milestone 1: Sync Fix & Leaderboard Polish

## Architecture
- `RoomBattle.tsx` and `useRoomBattle` handle multiplayer game state.
- `gameStore` handles local game state (prices, news, day).

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Sync Fix & Leaderboard Polish | Fix `RoomBattle.tsx` day advancement sync bug. Polish leaderboard and lobby UI. Handle disconnects properly. | none | DONE |

## Specific Requirements
- Ensure the local `gameStore`'s `nextDay()` is correctly called when `roomState.day` changes in `useRoomBattle`, so prices and news are synced.
