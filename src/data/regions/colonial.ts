import type { HistoricalEntity } from '../../types';
import { ce, mpoly, snap, src } from '../helpers';

/**
 * European overseas empires beyond Spain and Britain, plus the modern Japanese
 * empire. Colonial possessions are drawn as a few representative territories,
 * highly schematic and far from exhaustive.
 */
export const COLONIAL_ENTITIES: HistoricalEntity[] = [
  {
    id: 'portuguese-empire',
    name: 'Portuguese Empire',
    category: 'colonial-possession',
    start: ce(1415),
    end: ce(1999),
    confidence: 'low',
    colour: '#4a8a5a',
    labelImportance: 4,
    description:
      'The first and longest-lived European seaborne empire, which pioneered the oceanic route to Asia and the trans-Atlantic system. Shown by key holdings (Brazil, coastal Africa, and Indian Ocean posts); the many smaller trading stations are omitted.',
    sources: [src('Disney 2009, A History of Portugal and the Portuguese Empire')],
    snapshots: [
      snap(ce(1650).year, mpoly(
        [[-48, -2], [-42, -6], [-38, -10], [-40, -18], [-46, -24], [-52, -20], [-50, -8], [-48, -2]],
        [[12, -6], [17, -8], [16, -12], [12.5, -12], [11.5, -9], [12, -6]],
        [[32, -18], [36, -18], [37, -24], [33, -26], [31, -22], [32, -18]],
        [[72, 15], [74, 15], [74, 19], [72.5, 19], [72, 17], [72, 15]],
      ), 'low', 'Brazil, Angola, Mozambique and Goa, c. 1650 — representative holdings only.'),
    ],
  },
  {
    id: 'dutch-empire',
    name: 'Dutch Empire',
    alternativeNames: ['Dutch colonial empire'],
    category: 'colonial-possession',
    start: ce(1602),
    end: ce(1975),
    confidence: 'low',
    colour: '#c2884e',
    labelImportance: 3,
    successorIds: ['indonesia'],
    description:
      'A commercial maritime empire built by the Dutch East and West India Companies, dominant in the 17th-century spice trade. Its centrepiece, the East Indies, became modern Indonesia.',
    sources: [src('Israel 1995, The Dutch Republic')],
    snapshots: [
      snap(ce(1700).year, mpoly(
        [[95, 6], [106, 3], [118, -2], [131, -4], [141, -8], [130, -9], [114, -8], [100, -2], [96, 3], [95, 6]],
        [[16, -32], [20, -33], [20, -34.5], [17, -34.5], [16, -33.5], [16, -32]],
      ), 'low', 'The Dutch East Indies and the Cape, c. 1700 — representative holdings.'),
    ],
  },
  {
    id: 'french-colonial-empire',
    name: 'French colonial empire',
    category: 'colonial-possession',
    start: ce(1605),
    end: ce(1980),
    confidence: 'low',
    colour: '#5a7ab0',
    labelImportance: 4,
    description:
      'The overseas empire of France, at its height the second-largest in the world, spanning North Africa, West and Central Africa, Indochina and possessions in the Americas and the Pacific. Shown by representative territories at its early-20th-century peak.',
    sources: [src('Aldrich 1996, Greater France: A History of French Overseas Expansion')],
    snapshots: [
      snap(ce(1920).year, mpoly(
        [[-17, 12], [10, 20], [15, 24], [8, 30], [-5, 28], [-12, 20], [-17, 15], [-17, 12]],
        [[8, 4], [18, 6], [20, 12], [14, 14], [8, 10], [8, 4]],
        [[102, 9], [108, 11], [107, 18], [103, 22], [100, 18], [101, 12], [102, 9]],
        [[43, -12], [46, -13], [46, -16], [44, -16], [43, -14], [43, -12]],
      ), 'low', 'French North and West Africa, Indochina and Madagascar, c. 1920 — representative holdings.'),
    ],
  },
  {
    id: 'belgian-empire',
    name: 'Belgian colonial empire',
    alternativeNames: ['Congo Free State', 'Belgian Congo'],
    category: 'colonial-possession',
    start: ce(1885),
    end: ce(1962),
    confidence: 'medium',
    colour: '#b0904a',
    labelImportance: 2,
    description:
      'Centred overwhelmingly on the vast Congo — first the personal possession of King Leopold II, notorious for its brutal exploitation, then the Belgian Congo — until independence in 1960.',
    sources: [src('Hochschild 1998, King Leopold’s Ghost')],
    snapshots: [
      snap(ce(1930).year, mpoly(
        [[12, -5], [18, -4], [26, -3], [30, -4], [29, -8], [27, -12], [22, -11], [16, -8], [12.5, -6], [12, -5]],
      ), 'medium', 'The Belgian Congo, approximate.'),
    ],
  },
  {
    id: 'japanese-empire',
    name: 'Empire of Japan',
    category: 'empire',
    start: ce(1868),
    end: ce(1947),
    confidence: 'medium',
    colour: '#b0466a',
    labelImportance: 4,
    predecessorIds: ['tokugawa'],
    successorIds: ['japan'],
    description:
      'The modern imperial Japanese state from the Meiji Restoration, which industrialised rapidly and built an empire across Korea, Taiwan, Manchuria and, briefly, much of East Asia and the Pacific, until defeat in 1945.',
    sources: [src('Beasley 1987, Japanese Imperialism 1894–1945')],
    snapshots: [
      snap(ce(1942).year, mpoly(
        [[122, 24], [130, 31], [141, 41], [146, 44], [140, 34], [131, 30], [124, 33], [126, 38], [122, 40], [120, 34], [122, 24]],
        [[118, 20], [122, 22], [122, 25], [119, 25], [118, 22], [118, 20]],
        [[124, 38], [131, 38], [130, 43], [126, 43], [124, 40], [124, 38]],
      ), 'low', 'Japan, Korea, Taiwan and holdings at the 1942 wartime peak — highly schematic.'),
    ],
  },
];
