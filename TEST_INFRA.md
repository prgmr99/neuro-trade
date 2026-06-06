# E2E Test Infra: NeuroTrade Multiplayer Mode

## Test Philosophy
- Opaque-box, requirement-driven. No dependency on implementation design.
- Methodology: Category-Partition + BVA + Pairwise + Workload Testing.
- Uses programmatic simulated clients (`@supabase/supabase-js`) to test real-time room dynamics (presence, broadcast, database synchronization) concurrently.

## Feature Inventory
| # | Feature | Source (requirement) | Tier 1 | Tier 2 | Tier 3 |
|---|---------|---------------------|:------:|:------:|:------:|
| 1 | Room Creation | ORIGINAL_REQUEST | 5 | 5 | ✓ |
| 2 | Room Joining via Code | ORIGINAL_REQUEST | 5 | 5 | ✓ |
| 3 | Real-time Synchronization (Day Advancements) | ORIGINAL_REQUEST | 5 | 5 | ✓ |
| 4 | Leaderboard Broadcast Accuracy | ORIGINAL_REQUEST | 5 | 5 | ✓ |
| 5 | Handling Client Disconnects / Drop-offs | ORIGINAL_REQUEST | 5 | 5 | ✓ |

## Test Architecture
- Test runner: `node scripts/test_multiplayer_bots.js` (uses ES modules)
- Test case format: Script creates multiple concurrent clients interacting via the same Supabase project using anonymous auth.
- Verification semantics: Script asserts room state transitions (waiting -> playing -> finished), correct day advancements via DB polling/subscription, and leaderboard accuracy by cross-referencing presence broadcast events across all clients. Exits with 0 on pass, non-zero on failure.
- Directory layout:
  - Scripts: `scripts/`

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | Standard 4-player game (Host creates, 3 join, play 5 rounds to finish, leaderboard correct) | F1, F2, F3, F4 | Medium |
| 2 | Host drops off prematurely, game cleans up | F1, F5 | Medium |
| 3 | Late joiner gracefully rejected if status is playing | F1, F2 | Low |
| 4 | Race condition stress-test on day advancements | F3 | High |
| 5 | Frequent portfolio updates stress-test (leaderboard accuracy) | F4 | High |

## Coverage Thresholds
- Tier 1: ≥5 per feature
- Tier 2: ≥5 per feature (where boundaries exist)
- Tier 3: pairwise coverage of major feature interactions
- Tier 4: ≥5 realistic application scenarios
