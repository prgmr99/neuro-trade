# Infinite Scenarios — Design & Usage

## Goal

Provide an unbounded supply of Classic scenario arcs by generating JSON arc files offline via Gemini, committing them to the repository, and importing them statically at build time. Runtime determinism is preserved — the game's `mulberry32` PRNG is never touched by this pipeline. New arcs are available to any player without a server-side API call.

---

## Pipeline

```
gen:scenario          → validate-scenario      → commit JSON         → build
(Gemini API, offline)   (balance + schema gate)   (src/data/generated/   (Vite static import)
                                                    arcs/*.json)
```

1. **`pnpm gen:scenario`** — calls `scripts/generate-scenario.mjs` with a theme and a target arc id. Sends a structured prompt to Gemini and writes the response as `src/data/generated/arcs/<id>.json`.
2. **`node scripts/validate-scenario.mjs <file>`** — calls `scripts/validate-scenario.mjs`. Enforces schema correctness and Classic balance rules. Exits non-zero on any violation.
3. **Commit** — the JSON file is committed like any other source asset. No runtime API key required after this point.
4. **Build** — `src/data/generated/index.ts` uses `import.meta.glob('./arcs/*.json', { eager: true })` so Vite bundles all JSON files at build time.

---

## File Layout

```
scripts/
  generate-scenario.mjs     # Agent A: Gemini API caller + JSON writer
  validate-scenario.mjs     # Agent B: schema + balance validator

src/data/generated/
  arcs/
    sample-green-transition.json   # Handcrafted reference fixture
    *.json                         # AI-generated arcs (committed)
  index.ts                         # TypeScript loader — maps JSON → ClassicScenarioArc[]

spec/
  infinite-scenarios.md            # This document
```

---

## JSON Schema

Every file in `src/data/generated/arcs/` must conform to this schema:

```json
{
  "id": "kebab-case-arc-id",
  "name": { "en": "English Name", "ko": "한국어 이름" },
  "themeHint": "optional",
  "news": [
    {
      "id": "unique-within-arc",
      "dayIdx": 1,
      "title": { "en": "...", "ko": "..." },
      "content": { "en": "...", "ko": "..." },
      "effect": { "TECH": 1.08, "ECOM": 0.94 }
    }
  ]
}
```

### Constraints

| Rule | Value |
|------|-------|
| Total news items | Exactly 25 |
| News per day | Exactly 5 (dayIdx 1–5) |
| Effect multiplier range | `[0.85, 1.15]` (Classic ±15%) |
| Minimum effects per news item | ≥ 1 ticker |
| Distinct tickers across arc | ≥ 3 |
| Duplicate news IDs | Not allowed |
| Valid tickers | `TECH`, `ECOM`, `GREEN`, `HEALTH`, `AERO` |

---

## Balance Rules

Classic mode uses `effectScale = 1.0` — raw multipliers are applied directly. Each news `effect` entry must therefore satisfy:

```
0.85 ≤ multiplier ≤ 1.15
```

This is enforced by `validate-scenario.mjs` and mirrors the project's existing `CLAUDE.md` Classic balance rules. The validator exits with a non-zero code and a human-readable error if any multiplier falls outside this range.

---

## Determinism

The generator runs **offline** — it consumes a Gemini API key only during content creation. Once the JSON is committed, the game runtime is entirely offline and deterministic:

- `mulberry32(seed)` PRNG is untouched by this pipeline.
- Arc selection uses pure modulo arithmetic: `Math.abs(seed) % arcs.length`.
- Same seed → same arc → same prices, forever.

Generated arcs are appended to the `CLASSIC_ARCS` array in `src/data/classic.ts` via `mergeWithClassicArcs`. The total arc count changes only on new commits, which shifts modulo outputs — this is expected and acceptable for v1.

---

## How to Add a New Scenario

```bash
# 1. Generate
GEMINI_API_KEY=<your-key> pnpm gen:scenario --theme "Central bank digital currency triggers bank run" --id cbdc-bank-run

# 2. Review and edit the generated JSON manually if needed
#    File location: src/data/generated/arcs/cbdc-bank-run.json

# 3. Validate
node scripts/validate-scenario.mjs src/data/generated/arcs/cbdc-bank-run.json

# 4. Commit — the arc is automatically picked up on the next build
git add src/data/generated/arcs/cbdc-bank-run.json
git commit -m "feat(scenarios): add cbdc-bank-run generated arc"
```

The arc is immediately selectable via `selectClassicArc(arcs, seed)` on the next deployed build. No code changes required.

---

## v1 Scope and Limitations

- Generated arcs are **selectable** via `selectClassicArc` (seed-based modulo over the full array).
- Generated arcs are **NOT** members of any `CLASSIC_CHAINS`. They will not appear in LiveCompetition chain-based narrative sequences.
- Phase 2 will add chain membership: authored `transitions` blocks and `arcIds` references in `CLASSIC_CHAINS`.
- The `CLASSIC_CHAINS` arc IDs (`tech-bubble`, `chip-shortage`, `ai-regulation`, `dotcom-crash`, `pandemic`, `supply-chain-shock`, `financial-crisis`, `sovereign-debt`, `oil-price-war`, `energy-crisis`, `climate-summit`, `nuclear-disaster`, `meme-stock`, `crypto-meltdown`, `rate-hike-storm`, `real-estate-collapse`, `trade-war`, `currency-crisis`, `space-race`, `aviation-safety`) are reserved. Generated arc IDs must not reuse them.

---

## Known Risks

| Risk | Mitigation |
|------|------------|
| Gemini hallucination (wrong tickers, out-of-range effects) | `validate-scenario.mjs` hard-blocks invalid files; manual curation step before commit |
| API cost | Generator is invoked manually, not in CI; batching multiple arcs per call reduces cost |
| Tone/narrative drift from game aesthetic | `themeHint` field guides generation; human review step required before commit |
| Arc ID collision with existing arcs | Validator checks against the reserved ID list and warns on collision |
| Modulo shift on arc count change | Accepted in v1; DailyChallenge and Duel use seed+date so only new dates are affected |
