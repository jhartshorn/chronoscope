import type { HistoricalEntity, HistoricalEvent } from '../types';
import { ENTITIES as CORE_ENTITIES } from './entities';
import { EVENTS } from './events';
import { BRITAIN_ENTITIES } from './regions/britain';
import { BRITAIN2_ENTITIES } from './regions/britain2';
import { IRELAND_ENTITIES } from './regions/ireland';
import { ANTIQUITY_ENTITIES } from './regions/antiquity';
import { MEDIEVAL_ENTITIES } from './regions/medieval';
import { HRE_ENTITIES } from './regions/hre';
import { ASIA_ENTITIES } from './regions/asia';
import { AFRICA_ENTITIES } from './regions/africa';
import { AMERICAS_ENTITIES } from './regions/americas';
import { PREHISTORY_ENTITIES } from './regions/prehistory';
import { NEAR_EAST_ENTITIES } from './regions/neareast';
import { EUROPE_ENTITIES } from './regions/europe';
import { EAST_ASIA_ENTITIES } from './regions/eastasia';
import { SOUTH_ASIA_ENTITIES } from './regions/southasia';
import { ISLAMIC_ENTITIES } from './regions/islamic';
import { SOUTHEAST_ASIA_ENTITIES } from './regions/southeastasia';
import { AFRICA2_ENTITIES } from './regions/africa2';
import { AMERICAS2_ENTITIES } from './regions/americas2';
import { OCEANIA_ENTITIES } from './regions/oceania';
import { PEOPLES_ENTITIES } from './regions/peoples';
import { COLONIAL_ENTITIES } from './regions/colonial';
import { MODERN2_ENTITIES } from './regions/modern2';
import { MODERN_STATES_ENTITIES } from './regions/modernstates';
import { MODERN3_ENTITIES } from './regions/modern3';
import { ROME_PERIPHERY_ENTITIES } from './regions/romeperiphery';

/**
 * The full entity dataset: the original core plus the regional detail
 * modules. Adding a new region is just another import and spread here — no
 * rendering code changes. Ids must be unique across all modules (enforced by
 * the data-integrity test).
 */
export const ENTITIES: HistoricalEntity[] = [
  ...CORE_ENTITIES,
  ...BRITAIN_ENTITIES,
  ...BRITAIN2_ENTITIES,
  ...IRELAND_ENTITIES,
  ...ANTIQUITY_ENTITIES,
  ...MEDIEVAL_ENTITIES,
  ...HRE_ENTITIES,
  ...ASIA_ENTITIES,
  ...AFRICA_ENTITIES,
  ...AMERICAS_ENTITIES,
  ...PREHISTORY_ENTITIES,
  ...NEAR_EAST_ENTITIES,
  ...EUROPE_ENTITIES,
  ...EAST_ASIA_ENTITIES,
  ...SOUTH_ASIA_ENTITIES,
  ...ISLAMIC_ENTITIES,
  ...SOUTHEAST_ASIA_ENTITIES,
  ...AFRICA2_ENTITIES,
  ...AMERICAS2_ENTITIES,
  ...OCEANIA_ENTITIES,
  ...PEOPLES_ENTITIES,
  ...COLONIAL_ENTITIES,
  ...MODERN2_ENTITIES,
  ...MODERN_STATES_ENTITIES,
  ...MODERN3_ENTITIES,
  ...ROME_PERIPHERY_ENTITIES,
];

export { EVENTS } from './events';

export const ENTITY_BY_ID = new Map(ENTITIES.map((e) => [e.id, e]));
export const EVENT_BY_ID = new Map(EVENTS.map((e) => [e.id, e]));

export type SearchResult =
  | { kind: 'entity'; entity: HistoricalEntity; score: number }
  | { kind: 'event'; event: HistoricalEvent; score: number };

/** Simple substring/prefix search across names, alt names and descriptions. */
export function search(query: string, limit = 12): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const results: SearchResult[] = [];

  const scoreText = (text: string, weight: number): number => {
    const t = text.toLowerCase();
    const idx = t.indexOf(q);
    if (idx < 0) return 0;
    let s = weight;
    if (idx === 0) s += 3;
    else if (t[idx - 1] === ' ') s += 2; // word start
    return s;
  };

  for (const entity of ENTITIES) {
    let score = scoreText(entity.name, 10);
    for (const alt of entity.alternativeNames ?? []) score = Math.max(score, scoreText(alt, 8));
    if (entity.description) score = Math.max(score, scoreText(entity.description, 2));
    if (score > 0) results.push({ kind: 'entity', entity, score });
  }
  for (const event of EVENTS) {
    let score = scoreText(event.title, 9);
    score = Math.max(score, scoreText(event.description, 2));
    if (score > 0) results.push({ kind: 'event', event, score });
  }
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}
