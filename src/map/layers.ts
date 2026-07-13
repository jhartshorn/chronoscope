import type { EntityCategory } from '../types';

/**
 * User-facing map layers. Each entity layer groups one or more entity
 * categories so the layer list stays short; the special `events` layer
 * controls the event markers. The renderer consumes the resolved set of
 * hidden categories (see MapRenderer.setLayerVisibility) — layers are purely
 * a UI grouping.
 */
export interface MapLayer {
  id: string;
  label: string;
  categories: EntityCategory[];
}

export const ENTITY_LAYERS: MapLayer[] = [
  {
    id: 'prehistoric',
    label: 'Prehistoric cultures',
    categories: ['hominin-species', 'archaeological-culture'],
  },
  { id: 'peoples', label: 'Peoples', categories: ['people'] },
  {
    id: 'civilisations',
    label: 'Civilisations & city-states',
    categories: ['civilisation', 'city-state'],
  },
  {
    id: 'kingdoms',
    label: 'Kingdoms & republics',
    categories: ['kingdom', 'republic', 'confederation', 'other'],
  },
  { id: 'empires', label: 'Empires', categories: ['empire'] },
  { id: 'colonial', label: 'Colonial possessions', categories: ['colonial-possession'] },
  { id: 'modern', label: 'Modern states', categories: ['modern-state'] },
];

/** Id of the pseudo-layer that toggles event markers. */
export const EVENTS_LAYER_ID = 'events';

/** Resolve a set of hidden layer ids to the entity categories they cover. */
export function hiddenCategoriesFor(hiddenLayerIds: ReadonlySet<string>): Set<EntityCategory> {
  const out = new Set<EntityCategory>();
  for (const layer of ENTITY_LAYERS) {
    if (hiddenLayerIds.has(layer.id)) for (const c of layer.categories) out.add(c);
  }
  return out;
}
