# Advanced Mode Realism Overhaul

## Problem

Classic mode: positive news → buy → guaranteed profit. This is too simple.
Real markets have pre-pricing, whipsaw, institutional accumulation, and macro events.
Advanced mode should feel closer to reality — harder to profit, but with clear buy signals for skilled players.

## Current Engine (gameStore.ts nextDay)

```
news.effect = { STOCK: 1.05 }  // multiplier applied directly
price = price * multiplier * noise
```

- Every news effect is applied honestly — positive multiplier = price goes up
- No concept of pre-pricing, delayed effects, or reversals
- Noise is symmetric random based on stock volatility

## Proposed Mechanics

### 1. Pre-pricing (선반영) — `prePriced: boolean`

When a news item has `prePriced: true`:
- The **displayed** effect suggests bullish sentiment (e.g., title says "great earnings")
- But the **actual** multiplier is neutral or slightly negative (e.g., 0.98)
- Reason: the market already moved up in anticipation; buying now means buying the top
- Implementation: just set the effect multiplier to reflect reality, not sentiment
- The news title/content hints at optimism, but the effect is flat/negative

Example:
```ts
{
  title: "TechCorp beats earnings expectations by 20%",
  effect: { TECH: 0.97 },  // "sell the news" — already priced in
  prePriced: true,  // UI hint (optional: show "Already reflected?" tooltip)
}
```

### 2. Whipsaw (휩쏘) — `whipsaw: { nextDayEffect: Record<StockSymbol, number> }`

Some news causes a strong move in one direction, then reverses the next day:
- Day N: news effect = +8% (big pump)
- Day N+1: whipsaw kicks in = -10% (trap reversal)
- Players who bought on the pump get burned
- Implementation: `nextDay()` checks previous day's news for whipsaw effects and applies them

Example:
```ts
{
  title: "Surprise Fed rate cut announcement",
  effect: { BANK: 1.08, REALTY: 1.06 },
  whipsaw: { nextDayEffect: { BANK: 0.90, REALTY: 0.93 } },
}
```

### 3. Accumulation / Price Defense — `resilience: number` (0-1)

Some stocks have institutional buyers absorbing sell pressure:
- When negative news hits, the stock drops less than expected
- `resilience` of 0.5 means the negative effect is halved (e.g., 0.92 → 0.96)
- This is a **stock-level** property, not news-level
- Implementation: in `nextDay()`, dampen negative effects by resilience factor

Formula: `effectiveMultiplier = 1 + (multiplier - 1) * (1 - resilience)`
- For multiplier 0.92, resilience 0.5: `1 + (-0.08 * 0.5) = 0.96`

### 4. Macro Events (FOMC, CPI)

New news category that affects ALL stocks simultaneously:
- **FOMC (Federal Reserve)**: Interest rate decisions
  - Rate hike → bearish for growth stocks, mixed for banks
  - Rate cut → bullish for most, whipsaw risk
  - Hold → slight positive, reduces uncertainty
- **CPI (Consumer Price Index)**:
  - High CPI → inflation fears, bearish
  - Low CPI → growth optimism, bullish
  - These affect the entire market, not just one sector

Implementation: news items with effects spanning many/all stocks.

### 5. Sentiment Mismatch — news tone vs. actual effect

Some news titles sound positive but effect is negative (and vice versa):
- "Company announces massive expansion plan" → effect: 0.95 (market worried about debt)
- "Layoffs at MegaCorp" → effect: 1.04 (market sees cost cutting as positive)

This doesn't need a new field — just careful authoring of news data where title sentiment
doesn't match the effect multiplier. Advanced players learn to read between the lines.

### 6. Interconnected Signals

Some buy signals only become clear when reading multiple news items together:
- News A: "Supply chain disruptions in Asia"
- News B: "Domestic manufacturer reports record orders"
- Connection: supply chain problems benefit domestic producers

This is purely a data/content design concern — no engine changes needed.

## Implementation Plan

### Phase 1: Engine Changes (gameStore.ts + types.ts)

1. **types.ts**: Add optional fields to `News` type:
   - `prePriced?: boolean` — UI indicator only (effect already reflects reality)
   - `whipsaw?: { nextDayEffect: Record<StockSymbol, number> }`

2. **types.ts**: Add optional field to `Stock` type:
   - `resilience?: number` — 0 to 1, dampens negative news effects

3. **gameStore.ts nextDay()**:
   - Apply resilience to negative effects
   - Check previous day's news for whipsaw effects and apply them
   - Order: whipsaw from yesterday → today's news effects (with resilience) → noise

### Phase 2: Stock Data Updates (advanced/stocks.ts)

Add `resilience` values to select stocks:
- Blue-chip / institutional favorites: resilience 0.3-0.5
- Speculative / small-cap equivalents: resilience 0

### Phase 3: News Data Overhaul (advanced/news.ts + boost files)

1. Rewrite effects to include:
   - Pre-priced patterns (positive title, flat/negative effect)
   - Whipsaw events (2-3 across the 10 days)
   - Sentiment mismatches (positive title, negative effect and vice versa)
2. Add macro events:
   - Day 3: CPI announcement
   - Day 6: FOMC meeting result
   - Day 9: Employment/GDP data
3. Ensure clear buy signals exist but require reading multiple news items

### Phase 4: UI Polish (optional)

- Show "Pre-reflected?" hint for prePriced news (subtle, not obvious)
- Macro news gets a special icon/badge

## Success Criteria

- A player who always buys on positive headlines should see ~40-50% win rate (not 90%+)
- A player who reads carefully and connects dots should achieve ~60-70% win rate
- At least 2 whipsaw traps per game
- At least 2 macro events per game
- Clear but hidden buy signals exist in every game

## Files to Change

- `src/types.ts` — News and Stock type extensions
- `src/store/gameStore.ts` — nextDay() engine logic
- `src/data/advanced/stocks.ts` — add resilience
- `src/data/advanced/news.ts` — rewrite effects + add macro news
- `src/data/advanced/news-boost-1.ts` — update effects
