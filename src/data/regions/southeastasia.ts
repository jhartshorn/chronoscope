import type { HistoricalEntity } from '../../types';
import { ce, mpoly, poly, snap, src } from '../helpers';

/** Maritime and mainland Southeast Asian states beyond the Khmer Empire. */
export const SOUTHEAST_ASIA_ENTITIES: HistoricalEntity[] = [
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
      snap(ce(1360).year, mpoly(
        [[105, -6], [110, -6.5], [114, -8], [115, -8.8], [110, -8.5], [106, -7], [105, -6]],
        [[97, 0], [101, -1], [104, -4], [101, -3], [98, 1], [97, 0]],
      ), 'low', 'Java and claimed island dependencies; the outer reach is nominal.'),
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
      'The first kingdom to unify the regions that became Burma, whose capital Bagan was crowded with thousands of Buddhist temples and which established Theravada Buddhism as the region’s dominant faith.',
    sources: [src('Aung-Thwin 1985, Pagan: The Origins of Modern Burma')],
    snapshots: [
      snap(ce(1150).year, poly([[93, 16], [97, 17], [99, 22], [97, 25], [94, 24], [92, 20], [93, 16]]), 'low', 'Irrawaddy basin of Burma, approximate.'),
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
    description:
      'A powerful and cosmopolitan Siamese kingdom whose river capital was a major hub of world trade, dominating the Chao Phraya basin until its destruction by a Burmese army in 1767.',
    sources: [src('Baker & Phongpaichit 2017, A History of Ayutthaya')],
    snapshots: [
      snap(ce(1600).year, poly([[98, 12], [102, 14], [105, 15], [103, 18], [99, 17], [98, 15], [98, 12]]), 'medium', 'Chao Phraya basin of Siam, approximate.'),
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
      'The historical Vietnamese state of the Red River delta and beyond, which secured lasting independence from China and gradually expanded southward at the expense of Champa.',
    sources: [src('Taylor 2013, A History of the Vietnamese')],
    snapshots: [
      snap(ce(1450).year, poly([[103, 17], [106, 19], [108, 21], [107, 23], [104, 22], [103, 19], [103, 17]]), 'medium', 'Northern Vietnam, approximate.'),
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
      'A long-lived Hindu-Buddhist Austronesian civilisation of the central and southern Vietnamese coast, a maritime trading power gradually absorbed by the southward expansion of the Vietnamese.',
    sources: [src('Hardy et al. (eds.) 2009, Champa and the Archaeology of Mỹ Sơn')],
    snapshots: [
      snap(ce(1000).year, poly([[106, 10], [109, 11], [110, 14], [109, 16], [107, 15], [106, 12], [106, 10]]), 'low', 'Central and southern Vietnamese coast, approximate.'),
    ],
  },
];
