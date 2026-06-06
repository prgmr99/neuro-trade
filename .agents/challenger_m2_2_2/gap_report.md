# Phase 2 Adversarial Coverage Hardening Report

## Overview
An adversarial analysis of the realtime multiplayer sync logic within `useRoomBattle.ts`, `RoomBattle.tsx`, and `gameStore.ts` has uncovered three major vulnerabilities not covered by the current E2E test suite. These vulnerabilities expose the game to hard stalls, capacity breaches, and data spoofing.

## Gap 1: Host Disconnect Stall (Single Point of Failure)
- **Location**: `src/hooks/useRoomBattle.ts` (inside `setInterval` timer callback)
- **Observation**: The code restricts day advancement exclusively to the host via the condition `if (... && current.hostId === userId)`.
- **Logic Chain**: The comment explicitly states, `// Any client can advance the day, with guard flag to prevent race condition`, which implies a decentralized day-advance mechanism backed by optimistic database locking (`.eq('day', current.day)`). However, the code incorrectly enforces a strict host-only check. If the host's client disconnects, crashes, or closes the tab during gameplay, the `setInterval` loop stops running on their machine. Because no other client is permitted to advance the day, the game timer reaches zero and freezes indefinitely for all remaining players.
- **Test Case**: `test_host_disconnect_stall.js` simulates a scenario where the host stops emitting updates, and the client timer fails to take over, proving the room stalls forever.

## Gap 2: Room Capacity Bypass
- **Location**: `src/hooks/useRoomBattle.ts` (`joinRoom` function)
- **Observation**: When a user attempts to join a room, the hook queries `battle_rooms` to check if `data.status !== 'waiting'`.
- **Logic Chain**: The system tracks the `max_players` setting defined by the host during room creation. However, the `joinRoom` function only validates the room's status. It completely fails to verify the current number of players in the room against the `max_players` limit. Consequently, any number of users who obtain the room code can successfully join and track their presence in the room, bypassing the host's intended limit and overflowing the UI.
- **Test Case**: `test_room_capacity_bypass.js` creates a room with `max_players = 2` and successfully joins 3 bots into the presence channel, confirming the bypass.

## Gap 3: Portfolio Broadcast Spoofing
- **Location**: `src/hooks/useRoomBattle.ts` (`channel.on('broadcast', ...)` listener)
- **Observation**: The listener for the `portfolio_update` broadcast directly trusts the `payload.playerId` to update its local `portfolioMapRef`.
- **Logic Chain**: Supabase Realtime broadcast channels do not natively enforce sender identity verification in payloads. Since the client-side code blindly updates the portfolio of whichever `playerId` is claimed in the payload, a malicious client can manually dispatch a broadcast over the socket with a manipulated payload. This allows an attacker to arbitrarily alter the leaderboard portfolio value of any other player (including the host) without their consent.
- **Test Case**: `test_portfolio_spoofing.js` establishes an attacker bot that injects a broadcast payload claiming to be the host, successfully setting the host's portfolio value to 0 on all connected clients.

## Verification Method
1. The test harnesses are written to target the exact database configurations and Supabase realtime channels utilized by the codebase.
2. Run each script using Node.js with the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` variables loaded from the `.env` file.
3. The scripts will create anonymous authenticated sessions, spin up headless bots to orchestrate the edge cases, and throw an Error if the system successfully defends against the attack. All tests output "SUCCESS: Vulnerability confirmed!" upon reproducing the exact failure mode.
