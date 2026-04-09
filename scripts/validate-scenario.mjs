#!/usr/bin/env node
/**
 * validate-scenario.mjs
 * Validates a generated Classic arc JSON file against the mandatory schema.
 * Usage: node scripts/validate-scenario.mjs <path-to-arc.json>
 * Exit codes: 0 = valid, 1 = validation failed, 2 = usage error
 */

import { readFileSync } from 'node:fs';

const VALID_TICKERS = new Set(['TECH', 'ECOM', 'GREEN', 'HEALTH', 'AERO']);
const EFFECT_MIN = 0.85;
const EFFECT_MAX = 1.15;
const REQUIRED_NEWS_COUNT = 25;
const REQUIRED_DAYS = 5;
const NEWS_PER_DAY = 5;
const MIN_DISTINCT_TICKERS = 3;

// ── helpers ──────────────────────────────────────────────────────────────────

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

function isInteger(v) {
  return typeof v === 'number' && Number.isFinite(v) && Math.floor(v) === v;
}

// ── rule groups ───────────────────────────────────────────────────────────────

function validateTopLevel(arc, errors) {
  // Rule 1: id
  if (!isNonEmptyString(arc.id) || !/^[a-z][a-z0-9-]*$/.test(arc.id)) {
    errors.push(`id: "${arc.id}" must be a non-empty kebab-case string matching /^[a-z][a-z0-9-]*$/`);
  }

  // Rule 2: name.en / name.ko
  if (!arc.name || typeof arc.name !== 'object') {
    errors.push('name: must be an object with "en" and "ko" keys');
  } else {
    if (!isNonEmptyString(arc.name.en)) errors.push('name.en: must be a non-empty string');
    if (!isNonEmptyString(arc.name.ko)) errors.push('name.ko: must be a non-empty string');
  }

  // Rule 3: themeHint (optional)
  if ('themeHint' in arc && typeof arc.themeHint !== 'string') {
    errors.push('themeHint: if present, must be a string');
  }

  // Rule 4: news array length
  if (!Array.isArray(arc.news)) {
    errors.push('news: must be an array');
  } else if (arc.news.length !== REQUIRED_NEWS_COUNT) {
    errors.push(`news: must contain exactly ${REQUIRED_NEWS_COUNT} items, found ${arc.news.length}`);
  }
}

function validateNewsItem(item, idx, seenIds, errors) {
  const prefix = `news[${idx}]`;

  // Rule 5a: id — non-empty string
  if (!isNonEmptyString(item.id)) {
    errors.push(`${prefix}.id: must be a non-empty string`);
  } else if (seenIds.has(item.id)) {
    // Rule 8: duplicate ids
    errors.push(`${prefix}.id: "${item.id}" is a duplicate news id`);
  } else {
    seenIds.add(item.id);
  }

  // Rule 5b: dayIdx — integer in [1..5]
  if (!isInteger(item.dayIdx) || item.dayIdx < 1 || item.dayIdx > REQUIRED_DAYS) {
    errors.push(`${prefix}.dayIdx: must be an integer between 1 and ${REQUIRED_DAYS}, got ${item.dayIdx}`);
  }

  // Rule 5c: localised text fields
  for (const field of ['title.en', 'title.ko', 'content.en', 'content.ko']) {
    const [parent, lang] = field.split('.');
    const obj = item[parent];
    if (!obj || typeof obj !== 'object') {
      errors.push(`${prefix}.${parent}: must be an object with "en" and "ko" keys`);
      break; // avoid redundant errors for the same parent
    }
    if (!isNonEmptyString(obj[lang])) {
      errors.push(`${prefix}.${field}: must be a non-empty string`);
    }
  }

  // Rule 5d-f: effect object
  if (!item.effect || typeof item.effect !== 'object' || Array.isArray(item.effect)) {
    errors.push(`${prefix}.effect: must be a non-null object`);
    return;
  }

  const effectKeys = Object.keys(item.effect);
  if (effectKeys.length < 1) {
    errors.push(`${prefix}.effect: must have at least 1 entry`);
    return;
  }

  for (const [ticker, value] of Object.entries(item.effect)) {
    if (!VALID_TICKERS.has(ticker)) {
      errors.push(`${prefix}.effect.${ticker}: unknown ticker (allowed: ${[...VALID_TICKERS].join(', ')})`);
      continue;
    }
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      errors.push(`${prefix}.effect.${ticker}: must be a finite number`);
    } else if (value < EFFECT_MIN || value > EFFECT_MAX) {
      errors.push(`${prefix}.effect.${ticker}: ${value} is out of range [${EFFECT_MIN}, ${EFFECT_MAX}]`);
    }
  }
}

function validateDistribution(arc, errors) {
  if (!Array.isArray(arc.news)) return;

  // Rule 6: exactly NEWS_PER_DAY items per dayIdx
  const dayCounts = {};
  for (let d = 1; d <= REQUIRED_DAYS; d++) dayCounts[d] = 0;

  for (const item of arc.news) {
    if (isInteger(item.dayIdx) && item.dayIdx >= 1 && item.dayIdx <= REQUIRED_DAYS) {
      dayCounts[item.dayIdx]++;
    }
  }

  for (let d = 1; d <= REQUIRED_DAYS; d++) {
    if (dayCounts[d] !== NEWS_PER_DAY) {
      errors.push(`dayIdx=${d}: expected ${NEWS_PER_DAY} news items, found ${dayCounts[d]}`);
    }
  }

  // Rule 7: at least MIN_DISTINCT_TICKERS distinct tickers across the arc
  const usedTickers = new Set();
  for (const item of arc.news) {
    if (item.effect && typeof item.effect === 'object') {
      for (const ticker of Object.keys(item.effect)) {
        if (VALID_TICKERS.has(ticker)) usedTickers.add(ticker);
      }
    }
  }

  if (usedTickers.size < MIN_DISTINCT_TICKERS) {
    errors.push(
      `effect diversity: only ${usedTickers.size} distinct ticker(s) used across arc, minimum is ${MIN_DISTINCT_TICKERS}`
    );
  }
}

// ── summary stats ─────────────────────────────────────────────────────────────

function collectStats(arc) {
  let min = Infinity;
  let max = -Infinity;
  const tickers = new Set();

  for (const item of arc.news) {
    if (item.effect && typeof item.effect === 'object') {
      for (const [ticker, value] of Object.entries(item.effect)) {
        if (VALID_TICKERS.has(ticker) && typeof value === 'number' && Number.isFinite(value)) {
          tickers.add(ticker);
          if (value < min) min = value;
          if (value > max) max = value;
        }
      }
    }
  }

  return {
    tickerCount: tickers.size,
    effectMin: min === Infinity ? 'n/a' : min.toFixed(4),
    effectMax: max === -Infinity ? 'n/a' : max.toFixed(4),
  };
}

// ── main ──────────────────────────────────────────────────────────────────────

const [, , filePath] = process.argv;

if (!filePath) {
  process.stderr.write('Usage: node scripts/validate-scenario.mjs <path-to-arc.json>\n');
  process.exit(2);
}

let raw;
try {
  raw = readFileSync(filePath, 'utf-8');
} catch (err) {
  process.stderr.write(`Error reading file "${filePath}": ${err.message}\n`);
  process.exit(2);
}

let arc;
try {
  arc = JSON.parse(raw);
} catch (err) {
  process.stderr.write(`Error parsing JSON in "${filePath}": ${err.message}\n`);
  process.exit(1);
}

const errors = [];

validateTopLevel(arc, errors);

if (Array.isArray(arc.news)) {
  const seenIds = new Set();
  arc.news.forEach((item, idx) => validateNewsItem(item, idx, seenIds, errors));
  validateDistribution(arc, errors);
}

if (errors.length > 0) {
  for (const e of errors) process.stdout.write(`ERROR  ${e}\n`);
  process.exit(1);
}

const stats = collectStats(arc);
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';
process.stdout.write(
  `${GREEN}VALID ✓${RESET} arc=${arc.id}  news=${arc.news.length}  days=${REQUIRED_DAYS}` +
  `  tickers=${stats.tickerCount}  effect range=[${stats.effectMin}..${stats.effectMax}]\n`
);
process.exit(0);
