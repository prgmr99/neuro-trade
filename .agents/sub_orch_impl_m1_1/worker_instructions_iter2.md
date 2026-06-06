# Iteration 2: Worker Instructions

## 1. Missing `isConnected` extraction
- **Issue from Iteration 1**: The Forensic Auditor and Reviewers found that `isConnected` was referenced on line 483 but not extracted from `useRoomBattle` around line 52 in `RoomBattle.tsx`.
- **Instruction**: Check `RoomBattle.tsx`. If `isConnected` is already extracted, ensure that `npm run build` succeeds without any TypeScript errors. If it is NOT extracted, please extract it.

## 2. General Verification
- The remaining requirements (Day Sync, Host Disconnect fix, Player Disconnect handling) appear to have been implemented in Iteration 1.
- Please verify that `RoomBattle.tsx` and `useRoomBattle.ts` contain the logic as described in Iteration 1.
- Run `npm run build` and `npm test`.

**MANDATORY INTEGRITY WARNING**
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
