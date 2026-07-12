import type { HistoricalEntity } from '../../types';
import { bce, ce, mpoly, poly, snap, src } from '../helpers';

/**
 * Oceania — the largest geographical gap in the original dataset. Peoples and
 * polities of the Pacific and Australia. Island ranges are drawn as schematic
 * bands across archipelagos rather than precise coastlines.
 */
export const OCEANIA_ENTITIES: HistoricalEntity[] = [
  {
    id: 'lapita',
    name: 'Lapita culture',
    category: 'archaeological-culture',
    start: bce(1600),
    end: bce(500),
    confidence: 'low',
    colour: '#5a9a8a',
    labelImportance: 3,
    successorIds: ['polynesians'],
    description:
      'The seafaring culture, marked by distinctive dentate-stamped pottery, whose voyagers settled the previously uninhabited islands of Remote Oceania — the ancestral population of the later Polynesian peoples.',
    sources: [src('Kirch 2017, On the Road of the Winds')],
    snapshots: [
      snap(bce(1000).year, poly([[150, -4], [168, -8], [180, -15], [188, -20], [180, -22], [166, -18], [153, -10], [149, -6], [150, -4]]), 'low', 'Bismarck Archipelago through Fiji, Tonga and Samoa, a maritime dispersal.'),
    ],
  },
  {
    id: 'polynesians',
    name: 'Polynesian peoples',
    category: 'people',
    start: bce(900),
    end: ce(2026),
    confidence: 'low',
    colour: '#4a8a9a',
    labelImportance: 3,
    predecessorIds: ['lapita'],
    description:
      'The Austronesian seafaring peoples who, in one of history’s great feats of navigation, settled the vast Polynesian triangle from Hawaiʻi to Aotearoa (New Zealand) to Rapa Nui (Easter Island). A family of related peoples, not one state.',
    sources: [src('Kirch 2017, On the Road of the Winds')],
    snapshots: [
      snap(ce(1200).year, mpoly(
        [[180, 22], [205, 20], [230, -10], [210, -45], [185, -40], [172, -18], [176, 0], [180, 22]],
        [[-158, 22], [-154, 19], [-156, 21], [-158, 22]],
      ), 'low', 'The Polynesian triangle (Hawaiʻi–Aotearoa–Rapa Nui), a schematic oceanic range.'),
    ],
  },
  {
    id: 'tongan-empire',
    name: 'Tuʻi Tonga Empire',
    alternativeNames: ['Tongan maritime empire'],
    category: 'empire',
    start: ce(950),
    end: ce(1826),
    confidence: 'low',
    colour: '#3f8a7a',
    labelImportance: 2,
    description:
      'A maritime chiefdom-empire based in Tonga that at its height exerted influence across a wide swathe of the western Pacific through tribute, marriage and voyaging networks.',
    sources: [src('Campbell 2015, Island Kingdom: Tonga Ancient and Modern')],
    snapshots: [
      snap(ce(1300).year, poly([[181, -14], [188, -15], [189, -21], [185, -23], [180, -21], [179, -16], [181, -14]]), 'low', 'Tongan maritime sphere in the western Pacific, approximate.'),
    ],
  },
  {
    id: 'hawaii-kingdom',
    name: 'Kingdom of Hawaiʻi',
    category: 'kingdom',
    start: ce(1795),
    end: ce(1893),
    confidence: 'medium',
    colour: '#5a9a6a',
    labelImportance: 2,
    predecessorIds: ['polynesians'],
    successorIds: ['usa'],
    description:
      'The kingdom that unified the Hawaiian Islands under Kamehameha I, an internationally recognised Polynesian state until its overthrow by American interests in 1893.',
    sources: [src('Kuykendall 1938, The Hawaiian Kingdom')],
    snapshots: [
      snap(ce(1850).year, poly([[-160.3, 21.8], [-154.8, 18.9], [-154.8, 20.3], [-159, 22.3], [-160.3, 22.2], [-160.3, 21.8]]), 'medium', 'The Hawaiian archipelago, approximate.'),
    ],
  },
  {
    id: 'maori',
    name: 'Māori',
    alternativeNames: ['Māori iwi'],
    category: 'people',
    start: ce(1300),
    end: ce(2026),
    confidence: 'medium',
    colour: '#7d8b5a',
    labelImportance: 3,
    predecessorIds: ['polynesians'],
    description:
      'The Indigenous Polynesian people of Aotearoa (New Zealand), organised in iwi (tribes) and hapū, who developed a distinct culture after settling the islands around 1300 CE. A people composed of many iwi rather than a single polity.',
    sources: [src('King 2003, The Penguin History of New Zealand')],
    snapshots: [
      snap(ce(1600).year, mpoly(
        [[172.5, -34.5], [178.5, -37], [178.5, -41.5], [174.5, -41.5], [172.5, -38], [172.5, -34.5]],
        [[166.5, -45], [171, -44], [170, -46.5], [166.5, -46], [166.5, -45]],
      ), 'medium', 'The North and South Islands of Aotearoa, approximate.'),
    ],
  },
  {
    id: 'aboriginal-australians-north',
    name: 'Aboriginal Australians (Top End & Cape York)',
    category: 'people',
    start: bce(50_000),
    end: ce(2026),
    confidence: 'low',
    colour: '#a8804a',
    labelImportance: 2,
    description:
      'Aboriginal Australian peoples of the tropical north — hundreds of distinct nations and language groups, not one homogeneous people. Represented here as a broad cultural region (of several) within the world’s oldest continuous living cultures.',
    sources: [src('Flood 2019, The Original Australians')],
    snapshots: [
      snap(ce(1700).year, poly([[129, -11], [137, -11], [143, -11], [145, -16], [138, -18], [129, -17], [128, -14], [129, -11]]), 'low', 'Northern Australia (a broad cultural region), approximate.'),
    ],
  },
  {
    id: 'aboriginal-australians-southeast',
    name: 'Aboriginal Australians (South-east)',
    category: 'people',
    start: bce(50_000),
    end: ce(2026),
    confidence: 'low',
    colour: '#9a7048',
    labelImportance: 2,
    description:
      'Aboriginal Australian peoples of the temperate south-east (the Murray–Darling basin and eastern seaboard), one of many distinct cultural regions each comprising numerous nations and languages.',
    sources: [src('Flood 2019, The Original Australians')],
    snapshots: [
      snap(ce(1700).year, poly([[138, -34], [144, -38], [150, -37], [153, -30], [148, -28], [141, -30], [138, -34]]), 'low', 'South-eastern Australia (a broad cultural region), approximate.'),
    ],
  },
  {
    id: 'aboriginal-australians-desert',
    name: 'Aboriginal Australians (Central Desert)',
    category: 'people',
    start: bce(50_000),
    end: ce(2026),
    confidence: 'low',
    colour: '#b08a5a',
    labelImportance: 1,
    description:
      'Aboriginal Australian peoples of the arid interior (Western and Central Desert nations), whose deep knowledge of Country sustained life across the continent’s driest lands.',
    sources: [src('Flood 2019, The Original Australians')],
    snapshots: [
      snap(ce(1700).year, poly([[125, -20], [135, -21], [138, -26], [134, -30], [126, -29], [123, -25], [125, -20]]), 'low', 'Central and Western Desert (a broad cultural region), approximate.'),
    ],
  },
];
