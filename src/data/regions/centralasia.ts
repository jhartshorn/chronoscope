import type { HistoricalEntity } from '../../types';
import type { Ring } from '../helpers';
import { ce, poly, snap, src } from '../helpers';

/**
 * Central Asian Silk Road states not covered elsewhere: the Khwarezmian
 * Empire, destroyed by Genghis Khan (1219–21), and the three Uzbek khanates
 * that filled Transoxiana and Khwarezm after the Timurid collapse (1507)
 * until Russian conquest — Bukhara, Khiva and Kokand. `timurid` (islamic.ts)
 * ends in 1507 with no successor there shown; these three hand off to Russian
 * rule (`russian-empire` / `soviet-union`) instead of vanishing.
 */

const KHWAREZM_1077: Ring = [[58.0, 41.5], [60.5, 41.3], [61.5, 42.5], [60.0, 43.3], [58.0, 42.7], [58.0, 41.5]];
const KHWAREZM_1190: Ring = [
  [55.5, 39.0], [58.0, 42.7], [60.5, 43.5], [62.5, 42.0], [63.0, 38.5], [60.5, 36.0], [57.0, 36.3], [55.0, 37.5], [55.5, 39.0],
];
const KHWAREZM_1215: Ring = [
  [48.0, 37.0], [50.0, 40.0], [55.0, 42.5], [60.0, 44.5], [65.0, 44.0], [70.0, 42.0],
  [72.0, 38.0], [71.0, 33.0], [67.0, 29.0], [60.0, 26.5], [54.0, 27.0], [49.0, 30.0], [46.0, 34.0], [48.0, 37.0],
];
const KHWAREZM_1220: Ring = [[45.0, 36.0], [48.0, 39.0], [50.0, 38.0], [49.0, 35.0], [47.0, 34.0], [45.0, 36.0]];

const BUKHARA_1500: Ring = [
  [62.5, 37.5], [63.5, 40.0], [66.0, 41.5], [69.0, 41.0], [70.0, 39.0], [68.0, 37.0], [65.0, 36.5], [62.5, 37.5],
];
const BUKHARA_1600: Ring = [
  [62.0, 36.0], [63.0, 39.5], [66.0, 41.5], [69.5, 41.2], [70.5, 39.0], [68.5, 36.5], [65.5, 35.5], [62.0, 36.0],
];
const BUKHARA_1740: Ring = [
  [63.0, 37.0], [63.5, 39.5], [66.0, 41.3], [69.0, 41.0], [69.5, 39.0], [67.5, 37.0], [65.0, 36.2], [63.0, 37.0],
];
const BUKHARA_1868: Ring = [
  [63.5, 37.5], [64.0, 39.8], [65.5, 40.2], [67.0, 39.5], [68.5, 38.0], [67.5, 36.5], [65.0, 36.0], [63.5, 37.5],
];

const KHIVA_1511: Ring = [[58.5, 41.0], [59.0, 42.5], [60.5, 43.2], [61.5, 42.2], [61.0, 40.8], [59.5, 40.3], [58.5, 41.0]];
const KHIVA_1800: Ring = [[57.5, 40.5], [58.5, 43.0], [60.8, 43.6], [62.0, 42.5], [61.5, 40.5], [59.5, 39.8], [57.5, 40.5]];
const KHIVA_1873: Ring = [[58.5, 41.2], [59.0, 42.6], [60.3, 42.9], [60.8, 41.8], [60.0, 40.8], [58.8, 40.9], [58.5, 41.2]];

const KOKAND_1709: Ring = [[70.5, 39.8], [71.0, 41.2], [72.5, 41.0], [73.0, 39.8], [71.5, 39.3], [70.5, 39.8]];
const KOKAND_1810: Ring = [
  [68.8, 40.8], [69.5, 41.6], [71.0, 41.3], [73.0, 41.0], [73.2, 39.7], [71.5, 39.2], [70.0, 39.5], [68.8, 40.8],
];
const KOKAND_1850: Ring = [
  [68.0, 42.5], [69.5, 44.0], [73.0, 43.5], [75.5, 42.5], [75.0, 40.0], [73.2, 39.2], [71.0, 38.5], [69.0, 39.5], [68.0, 42.5],
];
const KOKAND_1865: Ring = [[69.5, 40.0], [70.5, 41.3], [72.5, 41.2], [73.2, 39.8], [71.5, 39.0], [69.5, 40.0]];

export const CENTRAL_ASIA_ENTITIES: HistoricalEntity[] = [
  {
    id: 'khwarezmian-empire',
    name: 'Khwarezmian Empire',
    alternativeNames: ['Khwarazmian Empire', 'Khwarazmshahs'],
    category: 'empire',
    start: ce(1077),
    end: ce(1231),
    confidence: 'medium',
    colour: '#8a6a9a',
    labelImportance: 4,
    predecessorIds: ['seljuk-empire'],
    successorIds: ['mongol-empire'],
    description:
      'Originally Seljuk-appointed governors of the Khwarezm oasis south of the Aral Sea, the Anushteginid shahs threw off first Seljuk and then Kara-Khitai overlordship to build, under Ala ad-Din Muhammad II, the strongest Islamic empire of its day — briefly stretching from the Caucasus to the edge of India. Muhammad’s execution of a Mongol trade mission and its envoys provoked Genghis Khan’s devastating 1219–21 invasion, which annihilated Transoxiana’s cities; his son Jalal ad-Din fought on as a fugitive until his death in 1231.',
    sources: [
      src('Jackson 2017, The Mongols and the Islamic World'),
      src('Bosworth 1968, in The Cambridge History of Iran, vol. 5'),
    ],
    snapshots: [
      snap(ce(1077).year, poly(KHWAREZM_1077), 'medium', 'The Anushteginid governorate: the Khwarezm oasis on the lower Amu Darya, a Seljuk vassal.'),
      snap(ce(1190).year, poly(KHWAREZM_1190), 'medium', 'Tekish throws off Seljuk and Kara-Khitai overlordship and expands into Khorasan.'),
      snap(ce(1215).year, poly(KHWAREZM_1215), 'medium', 'Ala ad-Din Muhammad II’s peak: Transoxiana, Iran and Afghanistan, on the eve of the Mongol invasion.'),
      snap(ce(1220).year, poly(KHWAREZM_1220), 'low', 'Genghis Khan’s 1219–21 campaign annihilates the empire’s cities; Jalal ad-Din’s rump state survives as a fugitive in western Iran until his death in 1231.'),
    ],
  },
  {
    id: 'khanate-of-bukhara',
    name: 'Khanate of Bukhara',
    alternativeNames: ['Emirate of Bukhara'],
    category: 'kingdom',
    start: ce(1500),
    end: ce(1920),
    confidence: 'medium',
    colour: '#7a9a6a',
    labelImportance: 4,
    predecessorIds: ['timurid'],
    successorIds: ['soviet-union'],
    description:
      'Muhammad Shaybani’s Uzbek conquest of Transoxiana (from 1500) ended Timurid rule in Samarkand and Bukhara. Ruled successively by the Shaybanid, Ashtarkhanid and (from 1785, as an emirate) Manghit dynasties, it was briefly reduced to a Persian vassal by Nadir Shah (1740) before recovering. Defeated by Russia in 1868, it survived as a shrunken protectorate — stripped of Samarkand and Tashkent — until the Red Army deposed the last emir in 1920.',
    sources: [
      src('Soucek 2000, A History of Inner Asia'),
      src('Bregel 2003, An Historical Atlas of Central Asia'),
    ],
    snapshots: [
      snap(ce(1500).year, poly(BUKHARA_1500), 'medium', 'Muhammad Shaybani’s conquest of Samarkand and Bukhara ends Timurid rule in Transoxiana.'),
      snap(ce(1600).year, poly(BUKHARA_1600), 'medium', 'Stable Shaybanid/early Ashtarkhanid extent, including Balkh south of the Amu Darya.'),
      snap(ce(1740).year, poly(BUKHARA_1740), 'medium', 'Nadir Shah of Persia’s invasion reduces the khanate to a vassal, its territory pared back.'),
      snap(ce(1785).year, poly(BUKHARA_1600), 'medium', 'The Manghit dynasty formally takes the title of emir, restoring the khanate’s earlier extent.'),
      snap(ce(1868).year, poly(BUKHARA_1868), 'high', 'Defeat by Russia (1868) strips Samarkand and Tashkent into direct Russian Turkestan, leaving a protectorate around Bukhara itself.'),
    ],
  },
  {
    id: 'khanate-of-khiva',
    name: 'Khanate of Khiva',
    category: 'kingdom',
    start: ce(1511),
    end: ce(1920),
    confidence: 'medium',
    colour: '#9a8a5a',
    labelImportance: 3,
    predecessorIds: ['khwarezmian-empire'],
    successorIds: ['soviet-union'],
    description:
      'Established in the old Khwarezmian heartland on the lower Amu Darya when the region split from Shaybanid Bukhara in 1511. Also briefly vassalised by Nadir Shah (1740), it was ruled from 1804 by the Qongrat dynasty as an independent khanate until Russia imposed a protectorate in 1873, stripping territory north of the river; the Red Army replaced it with the Khorezm People’s Soviet Republic in 1920.',
    sources: [
      src('Soucek 2000, A History of Inner Asia'),
      src('Bregel 2003, An Historical Atlas of Central Asia'),
    ],
    snapshots: [
      snap(ce(1511).year, poly(KHIVA_1511), 'medium', 'Founding: the Khwarezm oasis splits from Shaybanid rule.'),
      snap(ce(1800).year, poly(KHIVA_1800), 'medium', 'The Qongrat dynasty’s consolidated khanate on the eve of its 1804 formal accession.'),
      snap(ce(1873).year, poly(KHIVA_1873), 'high', 'Russia imposes a protectorate (1873), annexing the territory north and east of the Amu Darya outright.'),
    ],
  },
  {
    id: 'khanate-of-kokand',
    name: 'Khanate of Kokand',
    category: 'kingdom',
    start: ce(1709),
    end: ce(1876),
    confidence: 'medium',
    colour: '#a87a4a',
    labelImportance: 3,
    successorIds: ['russian-empire'],
    description:
      'Founded by the Ming dynasty of Uzbek beys in the Fergana Valley (1709) as Bukharan authority there collapsed. Expanded in the early 19th century to control Tashkent and much of the Kazakh steppe as far as Semirechye, it was progressively dismantled by Russian conquest — losing Tashkent in 1865 — and, unlike Bukhara or Khiva, was abolished outright and annexed after the 1875–76 revolt.',
    sources: [
      src('Soucek 2000, A History of Inner Asia'),
      src('Bregel 2003, An Historical Atlas of Central Asia'),
    ],
    snapshots: [
      snap(ce(1709).year, poly(KOKAND_1709), 'medium', 'Shahrukh Bey’s founding realm in the Fergana Valley.'),
      snap(ce(1810).year, poly(KOKAND_1810), 'medium', 'Tashkent, conquered in 1809, brings the khanate to its broadest reach in the west.'),
      snap(ce(1850).year, poly(KOKAND_1850), 'medium', 'Peak extent under Umar Khan and Muhammad Ali Khan: the Fergana Valley plus much of the Kazakh steppe toward Semirechye.'),
      snap(ce(1865).year, poly(KOKAND_1865), 'high', 'Russia’s capture of Tashkent (1865) strips the western steppe, leaving little beyond the Fergana Valley itself.'),
    ],
  },
];
