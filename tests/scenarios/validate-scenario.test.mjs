/**
 * Unit tests for the scenario validator.
 *
 * These tests pin the 8 balance/narrative rules enforced by
 * scripts/validate-scenario.mjs. Each test builds a minimal-valid arc via
 * `makeValidArc()` and then mutates exactly one field so a single rule fires,
 * making failures easy to diagnose.
 */

import { describe, it, expect } from 'vitest';
import { validateArc, RULES } from '../../scripts/validate-scenario.mjs';

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

/**
 * Build a minimal valid arc: 25 news × 5 days with a single-ticker positive
 * effect on days 1, 2, 4, 5 and a single negative effect on day 3 (to satisfy
 * the complication-beat rule). Day 3 also includes one GREEN and one HEALTH
 * hit so at least 3 distinct tickers appear across the arc.
 */
function makeValidArc() {
  const news = [];
  const tickers = ['TECH', 'ECOM', 'GREEN', 'HEALTH', 'AERO'];
  for (let day = 1; day <= 5; day++) {
    for (let seq = 1; seq <= 5; seq++) {
      const ticker = tickers[(seq - 1) % tickers.length];
      // Day 3 = complication: give the first slot a negative multiplier.
      const isDay3Negative = day === 3 && seq === 1;
      const mult = isDay3Negative ? 0.92 : 1.02;
      news.push({
        id: `test-arc-${day}-${seq}`,
        dayIdx: day,
        title: { en: `Day ${day} seq ${seq}`, ko: `${day}일차 ${seq}번` },
        content: { en: 'lorem ipsum story body', ko: '한국어 본문입니다' },
        effect: { [ticker]: mult },
      });
    }
  }
  return {
    id: 'test-arc',
    name: { en: 'Test Arc', ko: '테스트 아크' },
    news,
  };
}

// ---------------------------------------------------------------------------
// Baseline
// ---------------------------------------------------------------------------

describe('validateArc — happy path', () => {
  it('accepts a minimal valid arc', () => {
    expect(validateArc(makeValidArc())).toEqual([]);
  });

  it('exposes RULES constants for test consumers', () => {
    expect(RULES.EFFECT_MIN).toBe(0.85);
    expect(RULES.EFFECT_MAX).toBe(1.15);
    expect(RULES.REQUIRED_NEWS_COUNT).toBe(25);
    expect(RULES.MAX_EFFECT_ENTRIES_PER_NEWS).toBe(4);
    expect(RULES.DAY_TICKER_CUM_MIN).toBe(0.75);
    expect(RULES.DAY_TICKER_CUM_MAX).toBe(1.3);
    expect(RULES.COMPLICATION_DAY).toBe(3);
  });
});

// ---------------------------------------------------------------------------
// Top-level rules
// ---------------------------------------------------------------------------

describe('validateArc — top-level rules', () => {
  it('rejects non-object input', () => {
    expect(validateArc(null)).not.toEqual([]);
    expect(validateArc('string')).not.toEqual([]);
  });

  it('rejects non-kebab-case arc.id', () => {
    const arc = makeValidArc();
    arc.id = 'Test_Arc';
    const errors = validateArc(arc);
    expect(errors.some((e) => e.startsWith('id:'))).toBe(true);
  });

  it('rejects missing name.en or name.ko', () => {
    const arc = makeValidArc();
    arc.name = { en: 'only english' };
    const errors = validateArc(arc);
    expect(errors.some((e) => e.includes('name.ko'))).toBe(true);
  });

  it('rejects non-string themeHint', () => {
    const arc = makeValidArc();
    arc.themeHint = 42;
    const errors = validateArc(arc);
    expect(errors.some((e) => e.includes('themeHint'))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// News count & distribution
// ---------------------------------------------------------------------------

describe('validateArc — news count and distribution', () => {
  it('rejects fewer than 25 news items', () => {
    const arc = makeValidArc();
    arc.news.pop();
    const errors = validateArc(arc);
    expect(errors.some((e) => e.includes('exactly 25'))).toBe(true);
  });

  it('rejects uneven per-day distribution', () => {
    const arc = makeValidArc();
    // Move one day-5 item to day 1 → 6 on day 1, 4 on day 5
    const day5Item = arc.news.find((n) => n.dayIdx === 5);
    day5Item.dayIdx = 1;
    const errors = validateArc(arc);
    expect(errors.some((e) => /dayIdx=1/.test(e))).toBe(true);
    expect(errors.some((e) => /dayIdx=5/.test(e))).toBe(true);
  });

  it('rejects duplicate news ids', () => {
    const arc = makeValidArc();
    arc.news[1].id = arc.news[0].id;
    const errors = validateArc(arc);
    expect(errors.some((e) => e.includes('duplicate'))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Effect rules
// ---------------------------------------------------------------------------

describe('validateArc — effect multiplier rules', () => {
  it('rejects multiplier above 1.15', () => {
    const arc = makeValidArc();
    arc.news[0].effect = { TECH: 1.25 };
    const errors = validateArc(arc);
    expect(errors.some((e) => e.includes('out of range'))).toBe(true);
  });

  it('rejects multiplier below 0.85', () => {
    const arc = makeValidArc();
    arc.news[0].effect = { TECH: 0.5 };
    const errors = validateArc(arc);
    expect(errors.some((e) => e.includes('out of range'))).toBe(true);
  });

  it('rejects unknown ticker in effect', () => {
    const arc = makeValidArc();
    arc.news[0].effect = { BTCUSD: 1.05 };
    const errors = validateArc(arc);
    expect(errors.some((e) => e.includes('unknown ticker'))).toBe(true);
  });

  it('rejects effect with 0 entries', () => {
    const arc = makeValidArc();
    arc.news[0].effect = {};
    const errors = validateArc(arc);
    expect(errors.some((e) => e.includes('at least 1 entry'))).toBe(true);
  });

  it('rejects effect with more than 4 entries', () => {
    const arc = makeValidArc();
    arc.news[0].effect = { TECH: 1.01, ECOM: 1.01, GREEN: 1.01, HEALTH: 1.01, AERO: 1.01 };
    const errors = validateArc(arc);
    expect(errors.some((e) => e.includes('maximum allowed is 4'))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Diversity rule
// ---------------------------------------------------------------------------

describe('validateArc — ticker diversity', () => {
  it('rejects arcs that touch fewer than 3 tickers', () => {
    const arc = makeValidArc();
    // Flatten every effect onto TECH only → only 1 ticker used.
    for (const n of arc.news) n.effect = { TECH: n.effect[Object.keys(n.effect)[0]] };
    const errors = validateArc(arc);
    expect(errors.some((e) => e.includes('effect diversity'))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Narrative rule — day 3 must contain negative effect
// ---------------------------------------------------------------------------

describe('validateArc — narrative complication on day 3', () => {
  it('rejects arcs where day 3 has no negative effect', () => {
    const arc = makeValidArc();
    // Flip the single negative day-3 entry positive.
    const day3First = arc.news.find((n) => n.dayIdx === 3);
    day3First.effect = { TECH: 1.05 };
    const errors = validateArc(arc);
    expect(errors.some((e) => e.includes('complication'))).toBe(true);
  });

  it('accepts arcs where day 3 has at least one negative effect among a mixed bag', () => {
    const arc = makeValidArc();
    // Confirm baseline also accepts when some day-3 items are positive.
    const day3 = arc.news.filter((n) => n.dayIdx === 3);
    day3[1].effect = { ECOM: 1.08 };
    day3[2].effect = { GREEN: 1.05 };
    expect(validateArc(arc)).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Per-day per-ticker cumulative rule
// ---------------------------------------------------------------------------

describe('validateArc — per-day per-ticker cumulative gate', () => {
  it('rejects 3 same-ticker negatives that compound below 0.75', () => {
    const arc = makeValidArc();
    // Force day 1 to hit TECH three times with 0.9 each → 0.729
    const day1 = arc.news.filter((n) => n.dayIdx === 1);
    day1[0].effect = { TECH: 0.9 };
    day1[1].effect = { TECH: 0.9 };
    day1[2].effect = { TECH: 0.9 };
    const errors = validateArc(arc);
    expect(errors.some((e) => /day 1 ticker TECH/.test(e))).toBe(true);
  });

  it('rejects 3 same-ticker positives that compound above 1.30', () => {
    const arc = makeValidArc();
    const day2 = arc.news.filter((n) => n.dayIdx === 2);
    day2[0].effect = { AERO: 1.12 };
    day2[1].effect = { AERO: 1.12 };
    day2[2].effect = { AERO: 1.12 };
    const errors = validateArc(arc);
    expect(errors.some((e) => /day 2 ticker AERO/.test(e))).toBe(true);
  });

  it('accepts a mild single-ticker cluster within the gate', () => {
    const arc = makeValidArc();
    const day1 = arc.news.filter((n) => n.dayIdx === 1);
    day1[0].effect = { TECH: 0.95 };
    day1[1].effect = { TECH: 0.95 }; // 0.9025 — OK
    expect(validateArc(arc)).toEqual([]);
  });
});
