import type { HistoricalEntity } from '../../types';
import { bce, ce, mpoly, poly, snap, src } from '../helpers';

/**
 * Broad peoples and language families. These entries describe wide, changing
 * linguistic or cultural groupings — NOT single unified peoples or states —
 * and each description says so explicitly. They are drawn as soft, diffuse
 * ranges over their formative homelands; most later dispersed far more widely
 * than any polygon can show.
 */
export const PEOPLES_ENTITIES: HistoricalEntity[] = [
  {
    id: 'germanic-peoples',
    name: 'Germanic peoples',
    category: 'people',
    start: bce(500),
    end: ce(700),
    confidence: 'low',
    colour: '#7a8b5a',
    labelImportance: 2,
    description:
      'A broad grouping of peoples speaking early Germanic languages (Goths, Franks, Saxons, Lombards and many others), not a single nation. From a northern-European homeland they spread widely during the Migration Period, founding many of the successor kingdoms of the Roman west.',
    sources: [src('Todd 2004, The Early Germans')],
    snapshots: [
      snap(ce(1).year, poly([[4, 47], [8, 50], [13, 54], [18, 57], [22, 60], [16, 55], [10, 51], [5, 48], [4, 47]]), 'low', 'Northern and central European homeland, a diffuse cultural range.'),
    ],
  },
  {
    id: 'slavic-peoples',
    name: 'Slavic peoples',
    category: 'people',
    start: ce(300),
    end: ce(1100),
    confidence: 'low',
    colour: '#6a8b6a',
    labelImportance: 2,
    description:
      'A broad linguistic grouping (later West, East and South Slavs), not one people, whose early-medieval expansion across eastern and central Europe underlies many later nations from Poland and Russia to the Balkans.',
    sources: [src('Barford 2001, The Early Slavs')],
    snapshots: [
      snap(ce(700).year, poly([[14, 47], [22, 49], [32, 52], [40, 56], [44, 54], [38, 49], [30, 46], [20, 45], [15, 46], [14, 47]]), 'low', 'Eastern and central Europe, a diffuse cultural range.'),
    ],
  },
  {
    id: 'arab-peoples',
    name: 'Arab peoples',
    category: 'people',
    start: bce(800),
    end: ce(2026),
    confidence: 'low',
    colour: '#9a8b4a',
    labelImportance: 2,
    description:
      'A broad ethnolinguistic grouping united chiefly by the Arabic language, not a single nation. Shown at its Arabian homeland; after the 7th-century conquests Arabic-speaking peoples spread across the Near East and North Africa.',
    sources: [src('Hoyland 2001, Arabia and the Arabs')],
    snapshots: [
      snap(ce(600).year, poly([[35, 15], [43, 13], [52, 15], [57, 20], [50, 28], [40, 30], [36, 26], [34, 20], [35, 15]]), 'low', 'Arabian peninsula homeland; the later Arabic-speaking world is far larger.'),
    ],
  },
  {
    id: 'turkic-peoples',
    name: 'Turkic peoples',
    category: 'people',
    start: ce(500),
    end: ce(1500),
    confidence: 'low',
    colour: '#8a8b5a',
    labelImportance: 2,
    description:
      'A broad family of peoples speaking Turkic languages, not one nation. From a Central Asian and Siberian homeland they spread across the Eurasian steppe and into Anatolia, founding numerous states from the Göktürks to the Ottomans.',
    sources: [src('Golden 1992, An Introduction to the History of the Turkic Peoples')],
    snapshots: [
      snap(ce(900).year, poly([[52, 40], [65, 45], [80, 48], [95, 48], [100, 44], [88, 40], [72, 38], [58, 38], [52, 40]]), 'low', 'Central Asian steppe homeland, a diffuse range.'),
    ],
  },
  {
    id: 'amazigh',
    name: 'Amazigh (Berber) peoples',
    category: 'people',
    start: bce(2000),
    end: ce(2026),
    confidence: 'low',
    colour: '#b0904a',
    labelImportance: 2,
    description:
      'The Indigenous peoples of North Africa west of the Nile, a broad grouping of many communities speaking Amazigh (Berber) languages, present from antiquity through the Roman, Arab and modern periods.',
    sources: [src('Brett & Fentress 1996, The Berbers')],
    snapshots: [
      snap(ce(500).year, poly([[-10, 28], [0, 32], [10, 34], [18, 30], [12, 22], [0, 20], [-8, 22], [-12, 26], [-10, 28]]), 'low', 'Maghreb and northern Sahara, a diffuse cultural range.'),
    ],
  },
  {
    id: 'bantu-peoples',
    name: 'Bantu-speaking peoples',
    category: 'people',
    start: bce(1000),
    end: ce(1500),
    confidence: 'low',
    colour: '#7a9a5a',
    labelImportance: 2,
    description:
      'A very broad grouping of peoples speaking Bantu languages, not one people. The Bantu expansion from West-Central Africa over several millennia carried farming, ironworking and these languages across most of central, eastern and southern Africa.',
    sources: [src('Vansina 1990, Paths in the Rainforests')],
    snapshots: [
      snap(ce(500).year, poly([[10, 4], [25, 2], [35, -4], [38, -16], [30, -28], [20, -30], [14, -14], [11, -4], [10, 4]]), 'low', 'Central, eastern and southern Africa, a diffuse range of the expansion.'),
    ],
  },
  {
    id: 'jewish-people',
    name: 'Jewish people',
    category: 'people',
    start: bce(1000),
    end: ce(2026),
    confidence: 'low',
    colour: '#8a7ab0',
    labelImportance: 2,
    description:
      'An ethnoreligious people originating in the ancient Levant. Shown at the Judaean homeland; from antiquity the Jewish people lived largely in a wide diaspora across the Near East, North Africa, Europe and later the Americas — a dispersion no single polygon can represent.',
    sources: [src('Goodman 2017, A History of Judaism')],
    snapshots: [
      snap(ce(1).year, poly([[34.3, 29.5], [35.9, 31], [36, 33.5], [35, 33.5], [34.4, 31.5], [34.3, 29.5]]), 'low', 'Judaean homeland; the historical diaspora was far wider.'),
    ],
  },
  {
    id: 'persian-peoples',
    name: 'Persian peoples',
    alternativeNames: ['Iranian peoples'],
    category: 'people',
    start: bce(1000),
    end: ce(2026),
    confidence: 'low',
    colour: '#a86a8a',
    labelImportance: 2,
    description:
      'A broad grouping of Iranian-speaking peoples of the plateau (Persians, Medes and relatives), not one nation, whose language and culture underpinned successive empires from the Achaemenids to the Safavids and modern Iran.',
    sources: [src('Axworthy 2008, A History of Iran')],
    snapshots: [
      snap(ce(1).year, poly([[45, 28], [52, 36], [60, 38], [64, 32], [60, 26], [52, 25], [46, 26], [45, 28]]), 'low', 'Iranian plateau, a diffuse cultural range.'),
    ],
  },
  {
    id: 'inuit',
    name: 'Inuit peoples',
    category: 'people',
    start: ce(1200),
    end: ce(2026),
    confidence: 'low',
    colour: '#5a8a9a',
    labelImportance: 2,
    description:
      'The Indigenous peoples of the Arctic — a related grouping (Inuit, Iñupiat, Kalaallit and others) spanning Greenland, Arctic Canada and Alaska, descended from the Thule culture that spread across the far north around 1200 CE.',
    sources: [src('McGhee 2004, The Last Imaginary Place: A Human History of the Arctic World')],
    snapshots: [
      snap(ce(1500).year, mpoly(
        [[-55, 60], [-42, 60], [-20, 70], [-45, 82], [-60, 78], [-58, 68], [-55, 60]],
        [[-141, 66], [-95, 68], [-68, 72], [-100, 74], [-135, 71], [-141, 68], [-141, 66]],
      ), 'low', 'Greenland and the North American Arctic, a diffuse range.'),
    ],
  },
  {
    id: 'romani',
    name: 'Romani people',
    category: 'people',
    start: ce(1000),
    end: ce(2026),
    confidence: 'low',
    colour: '#9a7a5a',
    labelImportance: 1,
    description:
      'A dispersed people originating in the Indian subcontinent who migrated to and across Europe from the medieval period, living as many distinct communities rather than a single territorial nation. Shown as a diffuse European presence.',
    sources: [src('Fraser 1992, The Gypsies')],
    snapshots: [
      snap(ce(1500).year, poly([[0, 42], [10, 45], [22, 48], [30, 46], [26, 42], [16, 40], [6, 40], [0, 42]]), 'low', 'A diffuse presence across Europe; not a bounded territory.'),
    ],
  },
];
