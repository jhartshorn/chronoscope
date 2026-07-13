import type { HistoricalEntity } from '../../types';
import { bce, ce, poly, snap, src } from '../helpers';

/** African states and civilisations beyond Egypt and Mali. */
export const AFRICA_ENTITIES: HistoricalEntity[] = [
  {
    id: 'kingdom-of-kush',
    name: 'Kingdom of Kush',
    alternativeNames: ['Nubia', 'Meroë'],
    category: 'kingdom',
    start: bce(1070),
    end: ce(350),
    confidence: 'low',
    colour: '#b0803f',
    labelImportance: 3,
    predecessorIds: ['ancient-egypt'],
    description:
      'A Nubian kingdom on the upper Nile, centred first on Napata and later Meroë, which for a time ruled Egypt itself as the 25th Dynasty and developed its own script and ironworking tradition.',
    sources: [src('Welsby 1996, The Kingdom of Kush')],
    snapshots: [
      snap(bce(900).year, poly([[29.5, 16.5], [33.3, 17.8], [33.8, 23], [31, 22], [29.8, 18.5], [29.5, 16.5]]), 'low', 'The early Napatan kingdom of Kush, before the conquest of Egypt.'),
      snap(bce(715).year, poly([[29.5, 17.5], [33, 19], [33.5, 24], [32, 28], [31.5, 30.5], [30.5, 31.5], [29.3, 31], [29, 26], [29.3, 20], [29.5, 17.5]]), 'low', 'Piye and Shabaka’s 25th Dynasty rules Egypt as well as Kush, from Meroë to the Mediterranean, until Assyrian invasions drive them back south (663 BCE).'),
      snap(ce(100).year, poly([[30, 15], [34, 18], [35.5, 22], [33, 21], [31, 18], [30, 15]]), 'low', 'Meroitic Kush on the upper Nile, back to its Nubian core, approximate.'),
    ],
  },
  {
    id: 'aksum',
    name: 'Kingdom of Aksum',
    alternativeNames: ['Axum'],
    category: 'kingdom',
    start: ce(100),
    end: ce(940),
    confidence: 'low',
    colour: '#a86a3f',
    labelImportance: 3,
    description:
      'A trading empire of the Ethiopian highlands and Red Sea, one of the first states to adopt Christianity, minting its own coinage and controlling commerce between Rome, Arabia and India.',
    sources: [src('Munro-Hay 1991, Aksum: An African Civilisation of Late Antiquity')],
    snapshots: [
      snap(ce(350).year, poly([[36, 12], [40, 15.5], [42, 14], [40, 10], [37, 10], [36, 12]]), 'low', 'Aksumite highlands and Red Sea coast, approximate.'),
    ],
  },
  {
    id: 'ghana-empire',
    name: 'Ghana Empire',
    alternativeNames: ['Wagadou'],
    category: 'empire',
    start: ce(300),
    end: ce(1200),
    confidence: 'low',
    colour: '#c9a84a',
    labelImportance: 3,
    successorIds: ['mali-empire'],
    description:
      'An early West African empire of the western Sahel that grew wealthy controlling the trans-Saharan gold and salt trade, a forerunner of the later Mali Empire.',
    sources: [src('Levtzion 1973, Ancient Ghana and Mali')],
    snapshots: [
      snap(ce(1000).year, poly([[-12, 14], [-6, 15], [-2, 17], [-6, 18.5], [-12, 17.5], [-13, 15], [-12, 14]]), 'low', 'Western Sahel; borders in the desert are diffuse.'),
    ],
  },
  {
    id: 'songhai-empire',
    name: 'Songhai Empire',
    category: 'empire',
    start: ce(1464),
    end: ce(1591),
    confidence: 'low',
    colour: '#c99a3f',
    labelImportance: 4,
    predecessorIds: ['mali-empire'],
    description:
      'One of the largest states in African history, which succeeded Mali as the dominant Sahelian power, ruling the Niger bend from Gao and Timbuktu until defeated by a Moroccan invasion in 1591.',
    sources: [src('Hunwick 1999, Timbuktu and the Songhay Empire')],
    snapshots: [
      snap(ce(1550).year, poly([[-8, 11], [2, 12], [6, 16], [3, 20], [-5, 18], [-9, 15], [-8, 11]]), 'low', 'Niger-bend empire at its height, approximate.'),
    ],
  },
  {
    id: 'great-zimbabwe',
    name: 'Kingdom of Zimbabwe',
    alternativeNames: ['Great Zimbabwe'],
    category: 'kingdom',
    start: ce(1100),
    end: ce(1450),
    confidence: 'low',
    colour: '#8a7a4a',
    labelImportance: 2,
    description:
      'A southern African kingdom whose capital, Great Zimbabwe, was a city of monumental dry-stone architecture grown rich on cattle and the Indian Ocean gold trade.',
    sources: [src('Pikirayi 2001, The Zimbabwe Culture')],
    snapshots: [
      snap(ce(1300).year, poly([[29, -18], [32, -18], [33, -20.5], [31, -22], [29, -21], [29, -18]]), 'low', 'Zimbabwe plateau between the Zambezi and Limpopo, approximate.'),
    ],
  },
];
