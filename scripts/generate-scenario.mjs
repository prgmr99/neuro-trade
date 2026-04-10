/**
 * generate-scenario.mjs
 *
 * Offline batch generator for NeuroTrade Classic-mode story arcs.
 * Uses Google Gemini to produce a 5-day, 5-news-per-day arc in structured JSON.
 *
 * Usage:
 *   node scripts/generate-scenario.mjs --theme "글로벌 금리 인상 사이클" --id rate-hike-cycle
 *   node scripts/generate-scenario.mjs --theme "Energy crisis" --id energy-crunch --out src/data/generated/arcs/energy-crunch.json
 *
 * Requires:
 *   GEMINI_API_KEY in environment (or .env.local)
 */

import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { spawnSync } from 'child_process';
import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { dirname, resolve } from 'path';
import { parseArgs } from 'util';
import { validateArc } from './validate-scenario.mjs';

// ---------------------------------------------------------------------------
// 1. Environment check
// ---------------------------------------------------------------------------

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error(
    '\nError: GEMINI_API_KEY is not set.\n' +
    'Add it to your .env.local file:\n\n' +
    '  GEMINI_API_KEY=your_key_here\n\n' +
    'Then load it before running:\n' +
    '  export $(grep -v "^#" .env.local | xargs) && node scripts/generate-scenario.mjs ...\n'
  );
  process.exit(1);
}

// ---------------------------------------------------------------------------
// 2. CLI argument parsing
// ---------------------------------------------------------------------------

const { values: args } = parseArgs({
  options: {
    theme: { type: 'string' },
    id:    { type: 'string' },
    out:   { type: 'string' },
  },
  strict: false,
});

if (!args.theme || !args.id) {
  console.error(
    '\nUsage:\n' +
    '  node scripts/generate-scenario.mjs --theme "<macro theme>" --id <kebab-case-id> [--out <path>]\n\n' +
    'Example:\n' +
    '  node scripts/generate-scenario.mjs --theme "글로벌 금리 인상 사이클" --id rate-hike-cycle\n'
  );
  process.exit(1);
}

const arcId  = args.id;
const theme  = args.theme;
const outPath = resolve(
  args.out ?? `src/data/generated/arcs/${arcId}.json`
);

// ---------------------------------------------------------------------------
// 3. JSON schema for responseSchema (Gemini structured output)
// ---------------------------------------------------------------------------

/** @type {import('@google/generative-ai').Schema} */
const ARC_SCHEMA = {
  type: SchemaType.OBJECT,
  properties: {
    id: { type: SchemaType.STRING },
    name: {
      type: SchemaType.OBJECT,
      properties: {
        en: { type: SchemaType.STRING },
        ko: { type: SchemaType.STRING },
      },
      required: ['en', 'ko'],
    },
    themeHint: { type: SchemaType.STRING },
    news: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          id:     { type: SchemaType.STRING },
          dayIdx: { type: SchemaType.NUMBER },
          title: {
            type: SchemaType.OBJECT,
            properties: {
              en: { type: SchemaType.STRING },
              ko: { type: SchemaType.STRING },
            },
            required: ['en', 'ko'],
          },
          content: {
            type: SchemaType.OBJECT,
            properties: {
              en: { type: SchemaType.STRING },
              ko: { type: SchemaType.STRING },
            },
            required: ['en', 'ko'],
          },
          effect: {
            type: SchemaType.OBJECT,
            // Free-form object: ticker -> multiplier
            // Gemini structured output doesn't support additionalProperties,
            // so we declare the five known tickers as optional numbers.
            properties: {
              TECH:   { type: SchemaType.NUMBER },
              ECOM:   { type: SchemaType.NUMBER },
              GREEN:  { type: SchemaType.NUMBER },
              HEALTH: { type: SchemaType.NUMBER },
              AERO:   { type: SchemaType.NUMBER },
            },
          },
        },
        required: ['id', 'dayIdx', 'title', 'content', 'effect'],
      },
    },
  },
  required: ['id', 'name', 'news'],
};

// ---------------------------------------------------------------------------
// 4. Prompt templates
// ---------------------------------------------------------------------------

const SYSTEM_INSTRUCTION = `You are a financial narrative designer for NeuroTrade, a stock trading simulation game.
당신은 NeuroTrade 주식 트레이딩 시뮬레이션 게임의 금융 내러티브 디자이너입니다.

Your job is to produce a 5-day stock market story arc in structured JSON.
5일간의 주식 시장 스토리 아크를 구조화된 JSON으로 생성하는 것이 당신의 역할입니다.

STOCKS (you must use these exact ticker symbols):
- TECH   = NeoTech Industries (AI, semiconductors, software)
- ECOM   = GlobalMart (e-commerce, logistics, retail)
- GREEN  = EcoEnergy Corp (renewables, clean energy, ESG)
- HEALTH = VitaPharma (pharmaceuticals, biotech, healthcare)
- AERO   = AeroSpace Dynamics (defense, satellites, aviation)

HARD CONSTRAINTS — violations will be rejected:
1. Exactly 25 news items total: exactly 5 per dayIdx (dayIdx 1 through 5).
2. Every effect multiplier MUST be in the closed interval [0.85, 1.15]. Never outside this range.
3. Every news item MUST have at least 1 effect entry. Maximum 4 effect entries per news item.
4. News ids must be unique within the arc (suggested format: <arc-id>-<day>-<seq>, e.g. "my-arc-1-1").
5. Across the full arc, at least 3 of the 5 tickers must appear in effect fields (ticker diversity).
6. The arc MUST follow a coherent narrative structure:
   - Days 1–2: Setup — introduce the macro theme, early market reactions.
   - Day 3: Complication — a twist, escalation, or reversal that creates tension.
   - Days 4–5: Resolution — markets absorb events, sectors find new equilibria.
7. Multiple tickers should move coherently with each news beat (e.g. a tech scandal hurts TECH + ECOM, benefits HEALTH as safe haven).
8. Bilingual quality: English should read like a Bloomberg headline/story; Korean should read like a Naver Finance article. Do not machine-translate — write each language naturally.

OUTPUT: Return only the JSON object matching the schema. No markdown fences, no extra text.`;

function buildUserPrompt(theme, arcId) {
  return `Generate a 5-day story arc for the following macro theme:

Theme / 주제: ${theme}
Arc ID: ${arcId}

Requirements recap:
- 25 news items, 5 per day (dayIdx 1..5)
- Effect multipliers strictly in [0.85, 1.15]
- Coherent narrative: setup (days 1-2) → complication (day 3) → resolution (days 4-5)
- At least 3 tickers appear across all effect fields
- Each news item has 1–4 effect entries
- Bilingual titles and content (en + ko)
- Arc name should be bilingual and evocative of the theme

Begin generating the arc JSON now.`;
}

function buildRetryPrompt(violations) {
  return `Your previous response violated the following constraints:\n\n${violations.join('\n')}\n\n` +
    `Please regenerate the COMPLETE arc JSON, fixing all violations. Remember:\n` +
    `- Exactly 25 news items, 5 per dayIdx 1..5\n` +
    `- All effect multipliers in [0.85, 1.15]\n` +
    `- Each news must have at least 1 effect entry\n` +
    `- All news ids must be unique\n` +
    `Return only valid JSON, no markdown.`;
}

// ---------------------------------------------------------------------------
// 5. Validation — single source of truth from validate-scenario.mjs
//    (imported at top). No inline reimplementation.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// 6. Gemini call with retry
// ---------------------------------------------------------------------------

async function generateArc(theme, arcId) {
  const genAI = new GoogleGenerativeAI(API_KEY);

  const modelConfig = {
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: ARC_SCHEMA,
      temperature: 1.0,
      topP: 0.95,
      // Disable Gemini 2.5 thinking mode. Thinking burns thousands of extra
      // tokens which (a) blow free-tier per-minute token caps and (b) slow
      // generation. We don't need chain-of-thought for narrative authoring.
      thinkingConfig: { thinkingBudget: 0 },
    },
    systemInstruction: SYSTEM_INSTRUCTION,
  };

  // Model fallback chain. gemini-2.5-flash is primary — it's the most reliably available
  // on free tier. gemini-2.5-pro has stricter quotas and gemini-2.0-flash is often blocked
  // on new projects. Each model gets a small retry budget on transient 503s.
  const modelsToTry = ['gemini-2.5-flash', 'gemini-2.5-pro'];
  const RETRIES_PER_MODEL = 5;
  const RETRY_BACKOFF_MS = [3000, 8000, 15000, 25000, 40000];

  const userPrompt = buildUserPrompt(theme, arcId);

  let rawText = null;
  let parsed = null;
  let violations = [];
  let modelName = null;
  let model = null;

  console.log(`\nGenerating arc "${arcId}"...`);
  console.log(`Theme: ${theme}\n`);

  outer: for (let i = 0; i < modelsToTry.length; i++) {
    modelName = modelsToTry[i];
    model = genAI.getGenerativeModel({ model: modelName, ...modelConfig });

    for (let attempt = 0; attempt < RETRIES_PER_MODEL; attempt++) {
      console.log(`Trying model ${modelName} (attempt ${attempt + 1}/${RETRIES_PER_MODEL})...`);
      try {
        const result = await model.generateContent(userPrompt);
        rawText = result.response.text();
        break outer;
      } catch (err) {
        const msg = err?.message ?? String(err);
        const is503 = msg.includes('503') || msg.toLowerCase().includes('unavailable') || msg.toLowerCase().includes('high demand');
        const isQuota = msg.includes('429') || msg.toLowerCase().includes('quota') || msg.toLowerCase().includes('rate');
        const firstLine = msg.split('\n')[0];
        const isLastModel = i === modelsToTry.length - 1;
        const isLastAttempt = attempt === RETRIES_PER_MODEL - 1;

        if (is503 && !isLastAttempt) {
          const wait = RETRY_BACKOFF_MS[attempt] ?? 10000;
          console.warn(`${modelName} transient 503 (${firstLine}). Retrying in ${wait}ms...`);
          await new Promise((r) => setTimeout(r, wait));
          continue;
        }

        if (isQuota && !isLastModel) {
          console.warn(`${modelName} quota exceeded (${firstLine}). Falling back to next model...`);
          continue outer;
        }

        if ((is503 || isQuota) && !isLastModel) {
          console.warn(`${modelName} exhausted retries (${firstLine}). Falling back...`);
          continue outer;
        }

        throw err;
      }
    }
  }

  // Parse attempt 1
  try {
    parsed = JSON.parse(rawText);
  } catch (parseErr) {
    console.error('Failed to parse model response as JSON (attempt 1):', parseErr.message);
    console.error('Raw response snippet:', rawText?.slice(0, 500));
    writeRaw(outPath, rawText);
    process.exit(3);
  }

  violations = validateArc(parsed);

  if (violations.length > 0) {
    console.warn(`\nAttempt 1 validation failed (${violations.length} violation(s)):`);
    violations.forEach(v => console.warn('  -', v));
    console.log('\nRetrying with corrective prompt (attempt 2)...');

    // Attempt 2: send correction in a chat
    const chat = model.startChat({
      history: [
        { role: 'user',  parts: [{ text: userPrompt }] },
        { role: 'model', parts: [{ text: rawText }] },
      ],
    });

    let rawText2 = null;
    try {
      const result2 = await chat.sendMessage(buildRetryPrompt(violations));
      rawText2 = result2.response.text();
    } catch (err2) {
      console.error('Attempt 2 API call failed:', err2.message);
      writeRaw(outPath, rawText);
      process.exit(3);
    }

    let parsed2 = null;
    try {
      parsed2 = JSON.parse(rawText2);
    } catch (parseErr2) {
      console.error('Failed to parse model response as JSON (attempt 2):', parseErr2.message);
      writeRaw(outPath, rawText2 ?? rawText);
      process.exit(3);
    }

    const violations2 = validateArc(parsed2);
    if (violations2.length > 0) {
      console.error(`\nAttempt 2 still has ${violations2.length} violation(s):`);
      violations2.forEach(v => console.error('  -', v));
      console.error('\nWriting raw JSON for manual inspection and exiting.');
      writeRaw(outPath, rawText2);
      process.exit(3);
    }

    parsed = parsed2;
    console.log('Attempt 2 validation passed.');
  } else {
    console.log('Validation passed on first attempt.');
  }

  return parsed;
}

// ---------------------------------------------------------------------------
// 7. Helpers
// ---------------------------------------------------------------------------

function writeRaw(outPath, text) {
  const rawPath = outPath.replace(/\.json$/, '') + '.raw.json';
  try {
    mkdirSync(dirname(rawPath), { recursive: true });
    writeFileSync(rawPath, text ?? '', 'utf8');
    console.error(`Raw response written to: ${rawPath}`);
  } catch (e) {
    console.error('Could not write raw file:', e.message);
  }
}

function writeOutput(outPath, arc) {
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(arc, null, 2) + '\n', 'utf8');
  console.log(`\nArc written to: ${outPath}`);
}

function runValidationScript(outPath) {
  const validatorPath = resolve('scripts/validate-scenario.mjs');
  if (!existsSync(validatorPath)) {
    console.warn(
      '\nWarning: scripts/validate-scenario.mjs not found (built by another agent). ' +
      'Skipping external validation step.'
    );
    return;
  }

  console.log('\nRunning external validator...');
  const result = spawnSync('node', [validatorPath, outPath], {
    stdio: 'inherit',
    encoding: 'utf8',
  });

  if (result.status !== 0) {
    console.error(`\nExternal validation failed (exit code ${result.status}).`);
    process.exit(2);
  }

  console.log('External validation passed.');
}

// ---------------------------------------------------------------------------
// 8. Main
// ---------------------------------------------------------------------------

(async () => {
  try {
    const arc = await generateArc(theme, arcId);
    writeOutput(outPath, arc);
    runValidationScript(outPath);
    console.log('\nDone.');
  } catch (err) {
    console.error('\nFatal error:', err.message);
    if (err.stack) console.error(err.stack);
    process.exit(1);
  }
})();
