import type { HistoricalEntity } from '../../types';
import { bce, ce, mpoly, poly, snap, src } from '../helpers';

/**
 * Maritime and mainland Southeast Asian states beyond the Khmer Empire
 * (`medieval.ts`). Includes Funan and Chenla, the pre-Angkor Mekong-delta
 * polities that bridge to the Khmer Empire; Sukhothai, the first Thai
 * kingdom, bridging to Ayutthaya; Lan Xang, the first Lao kingdom; and the
 * Malacca Sultanate, the pivotal Strait-of-Malacca trade power before the
 * Portuguese conquest of 1511.
 */
export const SOUTHEAST_ASIA_ENTITIES: HistoricalEntity[] = [
  {
    id: 'funan',
    name: 'Funan',
    category: 'kingdom',
    start: bce(100),
    end: ce(550),
    confidence: 'low',
    colour: '#a08a4a',
    labelImportance: 2,
    successorIds: ['chenla'],
    description:
      'The earliest known Indianised state of mainland Southeast Asia, centred on the Mekong Delta and the great port of Óc Eo, which linked the maritime trade routes between India and China. Known mostly through Chinese chronicles and archaeology, not its own textual record.',
    sources: [src('Vickery 2003, Funan Reviewed: Deconstructing the Ancients')],
    snapshots: [
      snap(ce(300).year, poly([[103, 9], [106, 8.5], [108, 10], [107, 12], [104, 12], [102.5, 10.5], [103, 9]]), 'low', 'The Mekong Delta and adjacent coasts, approximate.'),
    ],
  },
  {
    id: 'chenla',
    name: 'Chenla',
    category: 'kingdom',
    start: ce(550),
    end: ce(802),
    confidence: 'low',
    colour: '#b09a4a',
    labelImportance: 2,
    predecessorIds: ['funan'],
    successorIds: ['khmer-empire'],
    description:
      'A Khmer successor state to Funan, traditionally divided by Chinese chroniclers into "Land Chenla" (upriver, in modern Laos and northern Cambodia) and "Water Chenla" (the old Funan delta lands) — a fragmentation ended when Jayavarman II proclaimed himself universal monarch and founded the Khmer Empire in 802.',
    sources: [src('Vickery 1998, Society, Economics, and Politics in Pre-Angkor Cambodia')],
    snapshots: [
      snap(ce(700).year, poly([[102, 10], [106, 10], [108, 13], [106, 16], [102, 15], [101, 12], [102, 10]]), 'low', 'The middle and lower Mekong basin, approximate.'),
    ],
  },
  {
    id: 'sukhothai',
    name: 'Sukhothai Kingdom',
    category: 'kingdom',
    start: ce(1238),
    end: ce(1438),
    confidence: 'low',
    colour: '#c9b24a',
    labelImportance: 2,
    successorIds: ['ayutthaya'],
    description:
      'The first independent Thai kingdom, traditionally dated to a 1238 revolt against Khmer overlordship, celebrated for the reign of Ramkhamhaeng (patron of the earliest Thai script) before being absorbed as a vassal, then province, of the rising Ayutthaya kingdom by 1438.',
    sources: [src('Baker & Phongpaichit 2017, A History of Ayutthaya')],
    snapshots: [
      snap(ce(1300).year, poly([[98, 15], [101, 15], [103, 17], [101, 20], [98, 19], [97, 17], [98, 15]]), 'low', 'Loose hegemony under Ramkhamhaeng, extending well beyond the directly-ruled core, approximate.'),
    ],
  },
  {
    id: 'lan-xang',
    name: 'Lan Xang',
    alternativeNames: ['Lan Xang Hom Khao'],
    category: 'kingdom',
    start: ce(1353),
    end: ce(1707),
    confidence: 'low',
    colour: '#6a9a6a',
    labelImportance: 2,
    description:
      'The first unified Lao kingdom ("Million Elephants"), founded by Fa Ngum along the middle Mekong, which fragmented in 1707 into the rival kingdoms of Luang Prabang, Vientiane and Champasak — the basis for the French protectorate and later Laos.',
    sources: [src('Stuart-Fox 1998, The Lao Kingdom of Lan Xang')],
    snapshots: [
      snap(ce(1550).year, poly([[100, 14], [103, 16], [105, 19], [103, 22], [100, 20], [99, 17], [100, 14]]), 'low', 'The middle Mekong basin, roughly modern Laos and parts of north-east Thailand, approximate.'),
    ],
  },
  {
    id: 'malacca-sultanate',
    name: 'Malacca Sultanate',
    alternativeNames: ['Melaka Sultanate'],
    category: 'kingdom',
    start: ce(1400),
    end: ce(1511),
    confidence: 'medium',
    colour: '#8a6a9a',
    labelImportance: 3,
    successorIds: ['portuguese-empire'],
    description:
      'A pivotal trading sultanate founded by Parameswara that controlled the Strait of Malacca, the chokepoint of trade between India and China, and became the region’s leading centre for the spread of Islam before its 1511 conquest by Afonso de Albuquerque’s Portuguese fleet.',
    sources: [src('Andaya & Andaya 2017, A History of Malaysia (3rd ed.)')],
    snapshots: [
      snap(ce(1480).year, mpoly(
        [[100, 2], [103, 1.5], [104, 4], [102, 6], [100, 5], [100, 2]],
        [[98, 2], [100, 0], [102, -2], [100, -1], [98, 1], [98, 2]],
      ), 'medium', 'Both shores of the Strait of Malacca — the Malay Peninsula and eastern Sumatra — under Malacca’s trading hegemony, approximate.'),
    ],
  },
  {
    id: 'srivijaya',
    name: 'Srivijaya',
    category: 'empire',
    start: ce(650),
    end: ce(1377),
    confidence: 'low',
    colour: '#4a9a8a',
    labelImportance: 3,
    description:
      'A Buddhist maritime empire (thalassocracy) based at Palembang on Sumatra, which controlled the Strait of Malacca and the sea trade between India and China, and was a great centre of Buddhist learning.',
    sources: [src('Munoz 2006, Early Kingdoms of the Indonesian Archipelago')],
    snapshots: [
      snap(ce(900).year, mpoly(
        [[95, 5], [100, 3], [105, -3], [106, -5], [102, -5], [98, 0], [95, 3], [95, 5]],
        [[100, 6], [104, 1.5], [103, 5], [100.5, 7], [100, 6]],
      ), 'low', 'Sumatra, the Malay peninsula and the straits — a maritime sphere, not a land empire.'),
    ],
  },
  {
    id: 'majapahit',
    name: 'Majapahit',
    category: 'empire',
    start: ce(1293),
    end: ce(1527),
    confidence: 'low',
    colour: '#3f8a7a',
    labelImportance: 4,
    predecessorIds: ['srivijaya'],
    successorIds: ['indonesia'],
    description:
      'A Javanese empire, the greatest of the pre-Islamic Indonesian states, which at its height claimed influence across much of maritime Southeast Asia and is a touchstone of modern Indonesian national identity.',
    sources: [src('Munoz 2006, Early Kingdoms of the Indonesian Archipelago')],
    snapshots: [
      snap(ce(1293).year, poly([[111, -6.8], [114, -7], [114.3, -8.3], [111.5, -8.5], [110.8, -7.5], [111, -6.8]]), 'low', 'Wijaya’s founding kingdom in eastern Java, before the wider conquests of his successors.'),
      snap(ce(1360).year, mpoly(
        [[105, -6], [110, -6.5], [114, -8], [115, -8.8], [110, -8.5], [106, -7], [105, -6]],
        [[97, 0], [101, -1], [104, -4], [101, -3], [98, 1], [97, 0]],
      ), 'low', 'Height under Hayam Wuruk and Gajah Mada: Java and claimed island dependencies; the outer reach is nominal.'),
      snap(ce(1500).year, poly([[110.8, -6.8], [114, -7.2], [114.5, -8.3], [111.8, -8.6], [110.5, -7.6], [110.8, -6.8]]), 'low', 'After a long 15th-century disintegration, reduced to its eastern Javanese core as coastal Islamic sultanates (Demak and others) rise.'),
    ],
  },
  {
    id: 'medang-mataram',
    name: 'Medang Kingdom',
    alternativeNames: ['Sailendra', 'Mataram Kingdom'],
    category: 'kingdom',
    start: ce(732),
    end: ce(1006),
    confidence: 'low',
    colour: '#5a9a6a',
    labelImportance: 2,
    description:
      'A central Javanese kingdom of the Sailendra and Sanjaya dynasties, builders of the colossal Buddhist monument of Borobudur and the Hindu temples of Prambanan.',
    sources: [src('Miksic 1990, Borobudur: Golden Tales of the Buddhas')],
    snapshots: [
      snap(ce(850).year, poly([[109, -6.5], [111, -7], [111.6, -8], [110, -8.2], [109, -7.5], [109, -6.5]]), 'low', 'Central Java, approximate.'),
    ],
  },
  {
    id: 'pagan-kingdom',
    name: 'Pagan Kingdom',
    alternativeNames: ['Bagan'],
    category: 'kingdom',
    start: ce(849),
    end: ce(1297),
    confidence: 'low',
    colour: '#b0864a',
    labelImportance: 3,
    description:
      'The first kingdom to unify the regions that became Burma, whose capital Bagan was crowded with thousands of Buddhist temples and which established Theravada Buddhism as the region’s dominant faith, until Mongol invasions (1277–87) shattered its authority and fragmented it into competing Shan-ruled states.',
    sources: [src('Aung-Thwin 1985, Pagan: The Origins of Modern Burma')],
    snapshots: [
      snap(ce(1090).year, poly([[93, 16], [97, 17], [99, 22], [97, 25], [94, 24], [92, 20], [93, 16]]), 'low', 'Height of unification under Anawrahta and his successors: the Irrawaddy basin of Burma, approximate.'),
      snap(ce(1280).year, poly([[94, 17], [96, 18], [97, 21], [95, 23], [93, 21], [93, 18], [94, 17]]), 'low', 'Contracting to the Irrawaddy core as Mongol invasions strip away the periphery, shortly before the kingdom’s 1297 collapse.'),
    ],
  },
  {
    id: 'ayutthaya',
    name: 'Ayutthaya Kingdom',
    alternativeNames: ['Siam'],
    category: 'kingdom',
    start: ce(1351),
    end: ce(1767),
    confidence: 'medium',
    colour: '#c9a24a',
    labelImportance: 3,
    predecessorIds: ['sukhothai'],
    description:
      'A powerful and cosmopolitan Siamese kingdom whose river capital was a major hub of world trade, dominating the Chao Phraya basin and absorbing Sukhothai as a province by 1438, until its destruction by a Burmese army in 1767.',
    sources: [src('Baker & Phongpaichit 2017, A History of Ayutthaya')],
    snapshots: [
      snap(ce(1370).year, poly([[99.5, 13], [101, 13.5], [101, 15], [99.5, 15], [99, 14], [99.5, 13]]), 'medium', 'The founding kingdom of the lower Chao Phraya, shortly after Ayutthaya’s 1351 foundation.'),
      snap(ce(1600).year, poly([[98, 12], [102, 14], [105, 15], [103, 18], [99, 17], [98, 15], [98, 12]]), 'medium', 'Near its height: the whole Chao Phraya basin and tributary reach into Cambodia and the Malay peninsula, approximate.'),
    ],
  },
  {
    id: 'dai-viet',
    name: 'Đại Việt',
    category: 'kingdom',
    start: ce(968),
    end: ce(1804),
    confidence: 'medium',
    colour: '#5a8a5a',
    labelImportance: 3,
    description:
      'The historical Vietnamese state of the Red River delta, which secured lasting independence from China in 938 (Battle of Bạch Đằng) and then spent nine centuries expanding southward at the expense of Champa and the Khmer Empire — the Nam Tiến ("southward advance") that shaped modern Vietnam’s long coastal shape.',
    sources: [src('Taylor 2013, A History of the Vietnamese')],
    snapshots: [
      snap(ce(1010).year, poly([[103.5, 21.5], [105, 23], [107, 21.5], [106.5, 19.5], [105, 18], [103.3, 19], [103.5, 21.5]]), 'medium', 'The Red River delta core under the newly-independent Lý dynasty, approximate.'),
      snap(ce(1306).year, poly([[103.5, 21.5], [105, 23], [107, 21.5], [108, 18], [107.6, 16.3], [105, 17], [103.3, 19], [103.5, 21.5]]), 'medium', 'After the 1069 cession of three Cham prefectures and the 1306 marriage cession of Ô and Rí (around modern Huế), approximate.'),
      snap(ce(1500).year, poly([[103.5, 21.5], [105, 23], [107, 21.5], [108, 18], [109.4, 13.6], [106, 14.8], [104, 17], [103.3, 19], [103.5, 21.5]]), 'medium', 'After Lê Thánh Tông’s devastating 1471 conquest of Vijaya, reducing Champa to a small rump far to the south.'),
      snap(ce(1700).year, poly([[103.5, 21.5], [105, 23], [107, 21.5], [108, 18], [109.2, 13.8], [109, 11.5], [106.7, 10.8], [104.8, 8.6], [104, 10], [103, 13], [102.5, 17], [103.3, 19], [103.5, 21.5]]), 'medium', 'The Nguyễn lords complete the advance into the Mekong Delta at Khmer expense, reaching close to Vietnam’s modern length.'),
    ],
  },
  {
    id: 'champa',
    name: 'Champa',
    category: 'kingdom',
    start: ce(192),
    end: ce(1832),
    confidence: 'low',
    colour: '#b0705a',
    labelImportance: 2,
    successorIds: ['dai-viet'],
    description:
      'A long-lived Hindu-Buddhist Austronesian civilisation of the central and southern Vietnamese coast, a maritime trading power gradually absorbed piece by piece by the southward expansion of the Vietnamese, ending with formal annexation under Minh Mạng in 1832.',
    sources: [src('Hardy et al. (eds.) 2009, Champa and the Archaeology of Mỹ Sơn')],
    snapshots: [
      snap(ce(1000).year, poly([[106, 10], [109, 11], [110, 14], [109, 16], [107, 15], [106, 12], [106, 10]]), 'low', 'Full extent along the central and southern Vietnamese coast, approximate.'),
      snap(ce(1300).year, poly([[106, 10], [109, 11], [109.5, 13.5], [108, 15.5], [106.5, 13], [106, 10]]), 'low', 'After the loss of the northernmost provinces to Đại Việt (1069, 1306), approximate.'),
      snap(ce(1500).year, poly([[108, 10.5], [109.3, 11], [109.3, 13], [108, 13.2], [107.3, 11.5], [108, 10.5]]), 'low', 'A small rump around Phan Rang after the catastrophic loss of Vijaya (1471).'),
      snap(ce(1700).year, poly([[108.3, 11], [109.2, 11.3], [109.2, 12.5], [108.3, 12.7], [107.8, 11.7], [108.3, 11]]), 'low', 'The last Cham principality, shortly before its final annexation by Vietnam in 1832.'),
    ],
  },
];
