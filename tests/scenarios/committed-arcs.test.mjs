/**
 * Integration test: every arc committed to src/data/generated/arcs/ MUST pass
 * the validator on every CI run. This prevents merge drift where a new rule
 * is added to the validator but an existing JSON silently violates it.
 *
 * Sample arcs (sample-*.json) are intentionally excluded from the runtime
 * Vite glob but are still validated here — if a sample stops validating,
 * it is no longer a useful reference and should be fixed or deleted.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { validateArc } from '../../scripts/validate-scenario.mjs';

const ARCS_DIR = resolve(process.cwd(), 'src/data/generated/arcs');

function listArcFiles() {
  return readdirSync(ARCS_DIR)
    .filter((f) => f.endsWith('.json') && !f.endsWith('.raw.json'))
    .sort();
}

describe('committed arcs pass the validator', () => {
  const files = listArcFiles();

  it('arcs directory is non-empty', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)('%s is valid', (filename) => {
    const raw = readFileSync(resolve(ARCS_DIR, filename), 'utf-8');
    const arc = JSON.parse(raw);
    const errors = validateArc(arc);
    if (errors.length > 0) {
      throw new Error(
        `Arc ${filename} has ${errors.length} validation error(s):\n  - ${errors.join('\n  - ')}`
      );
    }
    expect(errors).toEqual([]);
  });
});
