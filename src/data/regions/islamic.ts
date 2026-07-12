import type { HistoricalEntity } from '../../types';
import { ce, poly, snap, src } from '../helpers';

/** Caliphates, sultanates and Turco-Persian empires of the Islamic world and steppe. */
export const ISLAMIC_ENTITIES: HistoricalEntity[] = [
  {
    id: 'rashidun-caliphate',
    name: 'Rashidun Caliphate',
    category: 'empire',
    start: ce(632),
    end: ce(661),
    confidence: 'medium',
    colour: '#5f9a6a',
    labelImportance: 4,
    successorIds: ['umayyad-caliphate'],
    description:
      'The first caliphate, of the “rightly-guided” caliphs who succeeded Muhammad, whose swift conquests took Arabia, the Levant, Egypt and the Sasanian empire within a generation — the foundation of Islamic imperial history.',
    sources: [src('Kennedy 2007, The Great Arab Conquests')],
    snapshots: [
      snap(ce(655).year, poly([[30, 30], [40, 36], [52, 38], [62, 32], [58, 22], [45, 12], [36, 14], [32, 22], [30, 30]]), 'medium', 'Arabia, the Levant, Egypt and Iran by c. 655, approximate.'),
    ],
  },
  {
    id: 'fatimid-caliphate',
    name: 'Fatimid Caliphate',
    category: 'empire',
    start: ce(909),
    end: ce(1171),
    confidence: 'medium',
    colour: '#4f9a7a',
    labelImportance: 3,
    description:
      'An Ismaili Shia caliphate that rose in North Africa, conquered Egypt and founded Cairo (and its al-Azhar mosque-university), ruling the Nile, the Levant and the Hejaz at its height.',
    sources: [src('Brett 2017, The Fatimid Empire')],
    snapshots: [
      snap(ce(1000).year, poly([[0, 30], [10, 34], [20, 32], [32, 31], [36, 33], [40, 22], [34, 20], [24, 30], [10, 30], [0, 30]]), 'medium', 'North Africa, Egypt and the Levant, approximate.'),
    ],
  },
  {
    id: 'ayyubid',
    name: 'Ayyubid Sultanate',
    category: 'empire',
    start: ce(1171),
    end: ce(1260),
    confidence: 'medium',
    colour: '#5a8a5a',
    labelImportance: 3,
    predecessorIds: ['fatimid-caliphate'],
    successorIds: ['mamluk-sultanate'],
    description:
      'The dynasty founded by Saladin, which reunited Egypt and Syria, retook Jerusalem from the Crusaders and dominated the eastern Mediterranean and the Red Sea.',
    sources: [src('Humphreys 1977, From Saladin to the Mongols')],
    snapshots: [
      snap(ce(1200).year, poly([[24, 24], [30, 31], [36, 34], [40, 36], [44, 30], [42, 15], [34, 20], [28, 22], [24, 24]]), 'medium', 'Egypt, Syria and western Arabia under the Ayyubids, approximate.'),
    ],
  },
  {
    id: 'mamluk-sultanate',
    name: 'Mamluk Sultanate',
    category: 'empire',
    start: ce(1250),
    end: ce(1517),
    confidence: 'medium',
    colour: '#6a9a5a',
    labelImportance: 3,
    predecessorIds: ['ayyubid'],
    successorIds: ['ottoman-empire'],
    description:
      'A sultanate of freed slave-soldiers ruling Egypt and Syria, which halted the Mongols at Ain Jalut, ended the Crusader states and guarded the Islamic holy cities until the Ottoman conquest of 1517.',
    sources: [src('Petry (ed.) 1998, The Cambridge History of Egypt, Vol. 1')],
    snapshots: [
      snap(ce(1350).year, poly([[24, 22], [30, 31], [36, 34], [40, 32], [42, 20], [36, 17], [28, 20], [24, 22]]), 'medium', 'Egypt, the Levant and the Hejaz, approximate.'),
    ],
  },
  {
    id: 'seljuk-empire',
    name: 'Seljuk Empire',
    category: 'empire',
    start: ce(1037),
    end: ce(1194),
    confidence: 'medium',
    colour: '#a07ab0',
    labelImportance: 4,
    successorIds: ['ottoman-empire'],
    description:
      'A Turco-Persian empire that swept from Central Asia across Iran to Anatolia, defeating Byzantium at Manzikert (1071) and opening Anatolia to Turkish settlement — a turning point for the later Ottoman world.',
    sources: [src('Peacock 2015, The Great Seljuk Empire')],
    snapshots: [
      snap(ce(1090).year, poly([[28, 38], [40, 40], [52, 40], [62, 38], [66, 32], [56, 28], [44, 30], [34, 34], [28, 36], [28, 38]]), 'medium', 'Anatolia, the Levant, Iran and Central Asia, approximate.'),
    ],
  },
  {
    id: 'ghaznavid',
    name: 'Ghaznavid Empire',
    category: 'empire',
    start: ce(977),
    end: ce(1186),
    confidence: 'low',
    colour: '#a8845a',
    labelImportance: 2,
    description:
      'A Turkic Muslim empire centred on Ghazni (Afghanistan) whose raids into northern India under Mahmud of Ghazni opened the subcontinent to sustained Islamic rule.',
    sources: [src('Bosworth 1963, The Ghaznavids')],
    snapshots: [
      snap(ce(1030).year, poly([[58, 30], [64, 36], [70, 36], [74, 32], [72, 26], [64, 26], [59, 28], [58, 30]]), 'low', 'Afghanistan, eastern Iran and the north-western subcontinent, approximate.'),
    ],
  },
  {
    id: 'timurid',
    name: 'Timurid Empire',
    category: 'empire',
    start: ce(1370),
    end: ce(1507),
    confidence: 'medium',
    colour: '#9a6db0',
    labelImportance: 4,
    successorIds: ['mughal-empire', 'safavid'],
    description:
      'The empire of Timur (Tamerlane), a devastating conqueror from Central Asia whose capital Samarkand became a centre of a brilliant Persianate cultural renaissance; his descendants founded the Mughal dynasty.',
    sources: [src('Manz 1989, The Rise and Rule of Tamerlane')],
    snapshots: [
      snap(ce(1405).year, poly([[48, 30], [56, 38], [66, 42], [74, 40], [72, 32], [64, 26], [54, 26], [48, 28], [48, 30]]), 'medium', 'Central Asia and Iran under Timur, approximate.'),
    ],
  },
  {
    id: 'safavid',
    name: 'Safavid Empire',
    category: 'empire',
    start: ce(1501),
    end: ce(1736),
    confidence: 'high',
    colour: '#b05a8a',
    labelImportance: 5,
    predecessorIds: ['timurid'],
    successorIds: ['iran'],
    description:
      'The empire that made Twelver Shia Islam the religion of Iran and, alongside the Ottomans and Mughals, formed one of the three great early-modern Islamic “gunpowder empires”; its capital Isfahan was a jewel of Persianate art.',
    sources: [src('Newman 2006, Safavid Iran: Rebirth of a Persian Empire')],
    snapshots: [
      snap(ce(1600).year, poly([[44, 29], [52, 38], [60, 40], [66, 36], [64, 27], [56, 24], [48, 25], [44, 27], [44, 29]]), 'high', 'Safavid Iran, approximate.'),
    ],
  },
  {
    id: 'gokturk',
    name: 'Göktürk Khaganate',
    alternativeNames: ['Turkic Khaganate'],
    category: 'confederation',
    start: ce(552),
    end: ce(744),
    confidence: 'low',
    colour: '#6a8a8a',
    labelImportance: 3,
    description:
      'The first steppe empire to call its rulers “Turk”, a vast Central Asian khaganate spanning Mongolia to the Caspian that controlled the Silk Road and left the earliest Turkic inscriptions.',
    sources: [src('Golden 1992, An Introduction to the History of the Turkic Peoples')],
    snapshots: [
      snap(ce(580).year, poly([[60, 40], [80, 48], [100, 50], [118, 48], [115, 42], [98, 40], [80, 40], [66, 40], [60, 40]]), 'low', 'Central Asian and Mongolian steppe, approximate.'),
    ],
  },
  {
    id: 'golden-horde',
    name: 'Golden Horde',
    category: 'empire',
    start: ce(1242),
    end: ce(1502),
    confidence: 'medium',
    colour: '#9a7db0',
    labelImportance: 4,
    predecessorIds: ['mongol-empire'],
    description:
      'The north-western khanate of the Mongol Empire, which dominated the western steppe and held the Russian principalities as tributaries for over two centuries.',
    sources: [src('Halperin 1985, Russia and the Golden Horde')],
    snapshots: [
      snap(ce(1300).year, poly([[30, 46], [45, 50], [60, 52], [75, 50], [72, 44], [58, 42], [42, 42], [32, 44], [30, 46]]), 'medium', 'Western Eurasian steppe, approximate.'),
    ],
  },
];
