# Original User Request

## Initial Request — 2026-06-06T02:48:31Z

# Teamwork Project Prompt — Draft

Validate, debug, and improve the real-time multiplayer stock simulation game mode in the existing NeuroTrade app. The focus is on ensuring seamless real-time synchronization (identical dates, news, and prices for all players), real-time leaderboard updates, and a highly polished UI/UX using Supabase Realtime.

Working directory: /Users/yeomseungjun/Desktop/workplace/trading-game
Integrity mode: development

## Requirements

### R1. Real-time Synchronization & State Consistency
Ensure all players in a multiplayer room are assigned the exact same simulation environment (same date, same news events, and identical stock price movements) to guarantee fairness. Supabase Realtime must be used to broadcast state reliably.

### R2. Real-time Leaderboard
Implement and test a real-time leaderboard that updates instantly as players make trades and their portfolio values change.

### R3. UI/UX Polish & Player Experience
Enhance the multiplayer lobby and in-game UI to provide a premium, intuitive, and engaging experience. Ensure clear feedback when other players join, leave, or update their state.

## Verification Resources

Since there are currently no automated tests for the multiplayer feature, the agent team is expected to create a programmatic bot script (e.g., `scripts/test_multiplayer_bots.js`) that simulates 3-5 players joining a room and trading simultaneously to verify state synchronization and leaderboard accuracy.

## Acceptance Criteria

### Real-time Synchronization
- [ ] A test script can spawn 3 concurrent client connections to the same room.
- [ ] All 3 simulated clients report receiving the exact same series of date changes, news updates, and stock prices from the server/host.

### Real-time Leaderboard
- [ ] When one client executes a simulated trade that changes its portfolio value, the other clients receive a leaderboard update event reflecting the correct new ranking/value.
- [ ] Disconnecting a client correctly removes them from the active leaderboard or marks them as disconnected.

### UI/UX Improvements
- [ ] The multiplayer lobby visually displays connected users in real-time.
- [ ] The game view includes a persistently visible, smoothly updating leaderboard UI.
