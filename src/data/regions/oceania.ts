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
      snap(bce(1600).year, poly([[147, -2], [150, -3], [152, -5], [150, -6.5], [147, -5], [146, -3], [147, -2]]), 'low', 'Origin in the Bismarck Archipelago, near New Guinea.'),
      snap(bce(1200).year, poly([[147, -3], [155, -6], [163, -11], [168, -16], [165, -18], [158, -13], [151, -7], [147, -3]]), 'low', 'Rapid eastward voyaging through the Solomon Islands and Vanuatu.'),
      snap(bce(1000).year, poly([[150, -4], [168, -8], [180, -15], [188, -20], [180, -22], [166, -18], [153, -10], [149, -6], [150, -4]]), 'low', 'Reaching Fiji, Tonga and Samoa, a maritime dispersal.'),
      snap(bce(800).year, poly([[152, -5], [170, -9], [184, -16], [192, -21], [184, -23], [168, -19], [155, -11], [152, -5]]), 'low', 'Settlement of Tonga and Samoa completes, marking the transition to Ancestral Polynesian culture.'),
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
      snap(bce(900).year, poly([[176, -10], [187, -12], [187, -19], [178, -22], [174, -18], [176, -10]]), 'low', 'West Polynesia: Samoa, Tonga and Fiji, settled directly from Lapita voyagers.'),
      snap(ce(300).year, mpoly(
        [[176, -10], [187, -12], [187, -19], [178, -22], [174, -18], [176, -10]],
        [[-152, -15], [-148, -16], [-147, -19], [-151, -20], [-153, -17], [-152, -15]],
        [[-141, -8], [-138, -9], [-138, -11], [-141, -10.5], [-141, -8]],
      ), 'low', 'A second great voyaging wave reaches the Society Islands and the Marquesas, the hub of East Polynesia.'),
      snap(ce(800).year, mpoly(
        [[176, -10], [187, -12], [187, -19], [178, -22], [174, -18], [176, -10]],
        [[-152, -15], [-148, -16], [-147, -19], [-151, -20], [-153, -17], [-152, -15]],
        [[-141, -8], [-138, -9], [-138, -11], [-141, -10.5], [-141, -8]],
        [[-160.3, 21.8], [-154.8, 18.9], [-154.8, 20.3], [-159, 22.3], [-160.3, 22.2], [-160.3, 21.8]],
        [[-110, -26.5], [-108.8, -27], [-109.2, -27.5], [-110.3, -27.2], [-110, -26.5]],
      ), 'low', 'Voyagers reach Hawaiʻi and Rapa Nui (Easter Island), the triangle’s northern and eastern corners.'),
      snap(ce(1300).year, mpoly(
        [[180, 22], [205, 20], [230, -10], [210, -45], [185, -40], [172, -18], [176, 0], [180, 22]],
        [[-158, 22], [-154, 19], [-156, 21], [-158, 22]],
      ), 'low', 'The full Polynesian triangle (Hawaiʻi–Aotearoa–Rapa Nui) is complete with the settlement of Aotearoa (New Zealand), a schematic oceanic range.'),
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
      snap(ce(950).year, poly([[183, -18.5], [186, -18.5], [186, -21.5], [183, -21.5], [183, -18.5]]), 'low', 'Founding core: Tongatapu, Haʻapai and Vavaʻu.'),
      snap(ce(1200).year, poly([[178, -14], [190, -13.5], [191, -19], [186, -22], [181, -21], [178, -17], [178, -14]]), 'low', 'Expansion of the Tuʻi Tonga’s influence to Samoa, Niue and western Fiji.'),
      snap(ce(1350).year, poly([[177, -13], [191, -12.5], [192, -19.5], [187, -23], [180, -22], [177, -16], [177, -13]]), 'medium', 'Peak reach across the western Pacific, approximate.'),
      snap(ce(1600).year, poly([[182, -17], [187, -17], [188, -21.5], [183, -22], [182, -17]]), 'low', 'Civil wars over the succession fragment the empire’s outer influence, contracting it back toward Tonga itself.'),
      snap(ce(1800).year, poly([[183, -18.5], [186, -18.5], [186, -21.5], [183, -21.5], [183, -18.5]]), 'low', 'A local Tongan kingdom shortly before Taufaʻāhau’s 1826 unification as the modern Kingdom of Tonga.'),
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
      snap(ce(1795).year, poly([[-156.5, 18.9], [-154.8, 18.9], [-154.8, 20.3], [-157.3, 21.3], [-158.3, 21.7], [-156.5, 18.9]]), 'medium', 'Kamehameha I’s conquests unite Hawaiʻi, Maui, Oʻahu and the smaller islands; Kauaʻi alone remains independent.'),
      snap(ce(1810).year, poly([[-160.3, 21.8], [-154.8, 18.9], [-154.8, 20.3], [-159, 22.3], [-160.3, 22.2], [-160.3, 21.8]]), 'high', 'Kauaʻi’s King Kaumualiʻi submits peacefully, completing the unification of the archipelago.'),
      snap(ce(1850).year, poly([[-160.3, 21.8], [-154.8, 18.9], [-154.8, 20.3], [-159, 22.3], [-160.3, 22.2], [-160.3, 21.8]]), 'medium', 'The unified Hawaiian archipelago, approximate.'),
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
    sources: [
      src('King 2003, The Penguin History of New Zealand'),
      src('Belich 1996, Making Peoples: A History of the New Zealanders'),
    ],
    snapshots: [
      snap(ce(1300).year, mpoly(
        [[173, -35], [177, -36.5], [176.5, -39], [174, -39], [173, -36], [173, -35]],
        [[168, -44], [171, -43.5], [170.5, -45.5], [167.5, -45], [168, -44]],
      ), 'low', 'Initial settlement wave shortly after first arrival, concentrated near early landing sites.'),
      snap(ce(1600).year, mpoly(
        [[172.5, -34.5], [178.5, -37], [178.5, -41.5], [174.5, -41.5], [172.5, -38], [172.5, -34.5]],
        [[166.5, -45], [171, -44], [170, -46.5], [166.5, -46], [166.5, -45]],
      ), 'medium', 'The North and South Islands of Aotearoa fully occupied, approximate.'),
      snap(ce(1860).year, mpoly(
        [[172.5, -34.5], [178.5, -37], [178.5, -41.5], [174.5, -41.5], [172.5, -38], [172.5, -34.5]],
        [[166.5, -45], [171, -44], [170, -46.5], [166.5, -46], [166.5, -45]],
      ), 'medium', 'On the eve of the New Zealand Wars, still holding both islands.'),
      snap(ce(1900).year, mpoly(
        [[173.5, -37.5], [176.5, -38], [176, -39.3], [174, -39], [173.5, -37.5]],
        [[169.5, -44.5], [170.5, -44.3], [170.2, -45.3], [169.2, -45.2], [169.5, -44.5]],
      ), 'high', 'Mass land confiscations (raupatu) after the New Zealand Wars concentrate Māori landholding in the central North Island and a shrunken South Island remnant.'),
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
      snap(bce(16000).year, poly([[129, -9], [137, -8], [143, -8], [147, -11], [145, -16], [138, -18], [129, -17], [128, -14], [129, -9]]), 'low', 'During the last glacial maximum, lower sea levels expose the Sahul Shelf, joining northern Australia to New Guinea.'),
      snap(ce(1700).year, poly([[129, -11], [137, -11], [143, -11], [145, -16], [138, -18], [129, -17], [128, -14], [129, -11]]), 'low', 'Northern Australia at its modern coastline, after Torres Strait floods (from c. 8000 BCE); a broad cultural region, approximate.'),
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
      snap(bce(10000).year, poly([[138, -34], [144, -39.5], [150, -38], [153, -30], [148, -28], [141, -30], [138, -34]]), 'low', 'Before Bass Strait floods (c. 8000 BCE) and cuts Tasmania off, the exposed shelf extends the coastline further south.'),
      snap(ce(1700).year, poly([[138, -34], [144, -38], [150, -37], [153, -30], [148, -28], [141, -30], [138, -34]]), 'low', 'South-eastern Australia at its modern coastline (a broad cultural region), approximate.'),
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
