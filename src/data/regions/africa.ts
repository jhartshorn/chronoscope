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
      'An early West African empire of the western Sahel, centred on Kumbi Saleh, that grew wealthy controlling the trans-Saharan gold and salt trade — a forerunner of the later Mali Empire. Almoravid pressure on its northern trade terminus of Awdaghost from the 1050s–70s weakened it badly, and it fell into the orbit of the rival Sosso before Sundiata Keita’s Mali absorbed it outright.',
    sources: [src('Levtzion 1973, Ancient Ghana and Mali')],
    snapshots: [
      snap(ce(500).year, poly([[-9.0, 14.5], [-7.0, 14.5], [-6.5, 16.0], [-8.0, 17.0], [-9.5, 16.0], [-9.0, 14.5]]), 'low', 'Early core around Kumbi Saleh, approximate.'),
      snap(ce(800).year, poly([[-11.0, 14.0], [-7.0, 14.0], [-6.0, 16.5], [-8.0, 18.0], [-10.5, 17.5], [-12.0, 16.0], [-11.0, 14.0]]), 'low', 'Growth north to the Saharan trade terminus of Awdaghost.'),
      snap(ce(1000).year, poly([[-12, 14], [-6, 15], [-2, 17], [-6, 18.5], [-12, 17.5], [-13, 15], [-12, 14]]), 'low', 'Peak extent as described by al-Bakri (1068); borders in the desert are diffuse.'),
      snap(ce(1076).year, poly([[-11.0, 13.5], [-6.5, 14.0], [-3.0, 15.5], [-6.0, 16.5], [-9.5, 16.0], [-11.0, 13.5]]), 'low', 'Contraction after decades of Almoravid pressure on Awdaghost, traditionally (if too simply) dated to a 1076 conquest.'),
      snap(ce(1180).year, poly([[-9.5, 14.3], [-7.0, 14.3], [-6.5, 15.8], [-8.5, 16.3], [-9.8, 15.3], [-9.5, 14.3]]), 'medium', 'A diminished rump around Kumbi Saleh, tributary to the rising Sosso, shortly before Sundiata’s Mali absorbs it.'),
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
      'One of the largest states in African history, which succeeded Mali as the dominant Sahelian power. Sunni Ali’s conquests (from 1464) took Timbuktu and Djenné; Askia Muhammad’s coup (1493) and subsequent reforms extended it over the Hausa states, the Air massif and the upper Niger goldfields. A Moroccan expeditionary force, armed with muskets and cannon it could not match, shattered the empire at the Battle of Tondibi (1591); a rump survived far downriver as the Dendi kingdom.',
    sources: [src('Hunwick 1999, Timbuktu and the Songhay Empire')],
    snapshots: [
      snap(ce(1464).year, poly([[-5.0, 14.0], [-1.0, 13.5], [1.5, 15.0], [1.0, 17.5], [-2.5, 18.0], [-5.5, 16.5], [-5.0, 14.0]]), 'low', 'Sunni Ali’s early conquests around the Niger bend, Gao and newly-taken Timbuktu.'),
      snap(ce(1493).year, poly([[-9.0, 15.0], [-6.0, 17.5], [-3.0, 20.5], [2.0, 21.0], [6.0, 19.0], [8.0, 17.0], [7.0, 14.5], [3.0, 13.0], [-2.0, 12.0], [-6.0, 12.5], [-9.0, 15.0]]), 'medium', 'Askia Muhammad’s reforms and campaigns extend the empire over the Hausa states, the Air massif and the upper Niger goldfields.'),
      snap(ce(1550).year, poly([[-9.0, 15.0], [-6.0, 17.5], [-3.0, 20.5], [2.0, 21.0], [6.0, 19.0], [8.0, 17.0], [7.0, 14.5], [3.0, 13.0], [-2.0, 12.0], [-6.0, 12.5], [-9.0, 15.0]]), 'low', 'Stable at its Askia-era extent, approximate.'),
      snap(ce(1591).year, poly([[0.5, 12.5], [2.5, 12.3], [3.0, 14.0], [1.5, 14.5], [0.2, 13.5], [0.5, 12.5]]), 'medium', 'Shattered at Tondibi: the Sayfawa nobility flees far downriver to found the rump Dendi kingdom.'),
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
