import { News, LocalizedString } from '../types';

export interface ClassicScenarioArc {
  id: string;
  name: LocalizedString;
  news: News[];
}

/**
 * Select a classic scenario arc deterministically from the seed.
 * Uses pure modulo arithmetic — zero PRNG consumption.
 */
export function selectClassicArc(arcs: ClassicScenarioArc[], seed: number): ClassicScenarioArc {
  const index = Math.abs(seed) % arcs.length;
  return arcs[index];
}
