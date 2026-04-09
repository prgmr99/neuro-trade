/**
 * Loader for AI-generated Classic scenario arcs.
 *
 * Arcs are authored offline as JSON files in `./arcs/` and statically imported
 * at build time via Vite's import.meta.glob. This preserves deterministic
 * runtime behaviour — the PRNG (mulberry32) is never touched by this module.
 *
 * Usage:
 *   import { GENERATED_ARCS, mergeWithClassicArcs } from './generated';
 */

import { ClassicScenarioArc } from '../classic-arcs';
import { LocalizedString } from '../../types';

// ---------------------------------------------------------------------------
// JSON interchange schema types (inline — no external schema deps)
// ---------------------------------------------------------------------------

interface GeneratedNewsEntry {
  id: string;
  dayIdx: number;
  title: LocalizedString;
  content: LocalizedString;
  effect: Record<string, number>;
}

interface GeneratedArcJson {
  id: string;
  name: LocalizedString;
  themeHint?: string;
  news: GeneratedNewsEntry[];
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

function isLocalizedString(val: unknown): val is LocalizedString {
  return (
    typeof val === 'object' &&
    val !== null &&
    typeof (val as Record<string, unknown>).en === 'string' &&
    typeof (val as Record<string, unknown>).ko === 'string'
  );
}

function isGeneratedNewsEntry(val: unknown): val is GeneratedNewsEntry {
  if (typeof val !== 'object' || val === null) return false;
  const v = val as Record<string, unknown>;
  return (
    typeof v.id === 'string' &&
    typeof v.dayIdx === 'number' &&
    isLocalizedString(v.title) &&
    isLocalizedString(v.content) &&
    typeof v.effect === 'object' &&
    v.effect !== null
  );
}

function isGeneratedArcJson(val: unknown): val is GeneratedArcJson {
  if (typeof val !== 'object' || val === null) return false;
  const v = val as Record<string, unknown>;
  return (
    typeof v.id === 'string' &&
    isLocalizedString(v.name) &&
    Array.isArray(v.news) &&
    (v.news as unknown[]).every(isGeneratedNewsEntry)
  );
}

// ---------------------------------------------------------------------------
// Static import via Vite glob
// ---------------------------------------------------------------------------

// Vite resolves this at build time — zero runtime overhead when folder is empty.
const rawModules = import.meta.glob('./arcs/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>;

// ---------------------------------------------------------------------------
// Map raw JSON → ClassicScenarioArc
// ---------------------------------------------------------------------------

function mapToArc(raw: unknown, sourcePath: string): ClassicScenarioArc | null {
  if (!isGeneratedArcJson(raw)) {
    console.warn(`[generated/index] Skipping malformed arc at "${sourcePath}": failed schema check`);
    return null;
  }

  return {
    id: raw.id,
    name: raw.name,
    news: raw.news.map(n => ({
      id: n.id,
      dayIdx: n.dayIdx,
      title: n.title,
      content: n.content,
      effect: n.effect,
      read: false,
    })),
  };
}

// ---------------------------------------------------------------------------
// Public exports
// ---------------------------------------------------------------------------

/**
 * All valid generated arcs, loaded from `./arcs/*.json` at build time.
 * Returns `[]` when the arcs folder is empty.
 */
export const GENERATED_ARCS: ClassicScenarioArc[] = Object.entries(rawModules)
  .map(([path, raw]) => mapToArc(raw, path))
  .filter((arc): arc is ClassicScenarioArc => arc !== null);

/**
 * Load and return all generated arcs.
 * Provided as a function for callers that prefer an explicit call site.
 */
export function loadGeneratedArcs(): ClassicScenarioArc[] {
  return GENERATED_ARCS;
}

/**
 * Merge generated arcs into a base arc list.
 * Deduplication is by arc `id` — base wins on conflict.
 */
export function mergeWithClassicArcs(
  base: ClassicScenarioArc[],
): ClassicScenarioArc[] {
  const baseIds = new Set(base.map(a => a.id));
  const newArcs = GENERATED_ARCS.filter(a => !baseIds.has(a.id));
  return [...base, ...newArcs];
}
