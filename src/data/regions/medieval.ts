import type { HistoricalEntity } from '../../types';
import { ce, poly, snap, src } from '../helpers';

/** Post-Roman Europe, the Islamic caliphates and medieval Asia. */
export const MEDIEVAL_ENTITIES: HistoricalEntity[] = [
  {
    id: 'visigothic-kingdom',
    name: 'Visigothic Kingdom',
    category: 'kingdom',
    start: ce(418),
    end: ce(711),
    confidence: 'low',
    colour: '#8a7a5a',
    labelImportance: 2,
    predecessorIds: ['roman-empire'],
    successorIds: ['umayyad-caliphate'],
    description:
      'A Germanic successor kingdom to Roman rule in Iberia and southern Gaul, ended by the Umayyad conquest of 711.',
    sources: [src('Collins 2004, Visigothic Spain 409–711')],
    snapshots: [
      snap(ce(600).year, poly([[-9, 37], [-8, 43], [-2, 44], [3, 43], [1, 39], [-6, 36], [-9, 37]]), 'low', 'Iberian Visigothic kingdom, approximate.'),
    ],
  },
  {
    id: 'frankish-empire',
    name: 'Carolingian Empire',
    alternativeNames: ['Frankish Empire', 'Empire of Charlemagne'],
    category: 'empire',
    start: ce(800),
    end: ce(888),
    confidence: 'medium',
    colour: '#9a7ab0',
    labelImportance: 4,
    predecessorIds: ['roman-empire'],
    successorIds: ['holy-roman-empire', 'france', 'kingdom-of-burgundy-arles'],
    description:
      'The empire of Charlemagne and his heirs, uniting much of western and central Europe and reviving the imperial title in the West. Its partition seeded the later kingdoms of France and Germany and the Holy Roman Empire.',
    sources: [src('McKitterick 2008, Charlemagne: The Formation of a European Identity')],
    snapshots: [
      snap(ce(814).year, poly([[-2, 43], [2, 50], [7, 53], [13, 52], [16, 48], [14, 45], [12, 42], [8, 44], [3, 43], [-2, 43]]), 'medium', 'Extent at Charlemagne’s death, 814, approximate.'),
    ],
  },
  {
    id: 'kievan-rus',
    name: "Kievan Rus'",
    category: 'kingdom',
    start: ce(882),
    end: ce(1240),
    confidence: 'low',
    colour: '#6a7ab0',
    labelImportance: 3,
    successorIds: ['mongol-empire', 'russia'],
    description:
      'A realm — a loose federation of East Slavic principalities under the Grand Prince of Kyiv, not a tightly-organised confederation — that was a forerunner of the later Russian, Ukrainian and Belarusian states, shattered by the Mongol invasion of the 1240s.',
    sources: [src('Franklin & Shepard 1996, The Emergence of Rus 750–1200')],
    snapshots: [
      snap(ce(1050).year, poly([[24, 50], [32, 52], [40, 56], [38, 60], [30, 59], [26, 54], [24, 50]]), 'low', 'East Slavic principalities around Kyiv and Novgorod, approximate.'),
    ],
  },
  {
    id: 'norse-vikings',
    name: 'Norse peoples',
    alternativeNames: ['Vikings', 'Norsemen'],
    category: 'people',
    start: ce(793),
    end: ce(1100),
    confidence: 'low',
    colour: '#5a8a9a',
    labelImportance: 3,
    description:
      'Seafaring peoples of Scandinavia whose traders, raiders and settlers ranged from the North Atlantic to the rivers of Russia during the Viking Age. The homeland is shown; the wider sphere of raids and colonies (Iceland, the British Isles, Normandy, Vinland) is not.',
    sources: [src('Winroth 2014, The Age of the Vikings')],
    snapshots: [
      snap(ce(900).year, poly([[5, 58], [12, 58], [18, 62], [23, 66], [16, 69], [8, 63], [5, 60], [5, 58]]), 'low', 'Scandinavian homeland; the diaspora is far wider than shown.'),
    ],
  },
  {
    id: 'umayyad-caliphate',
    name: 'Umayyad Caliphate',
    category: 'empire',
    start: ce(661),
    end: ce(750),
    confidence: 'medium',
    colour: '#4f8a5a',
    labelImportance: 5,
    successorIds: ['abbasid-caliphate'],
    description:
      'The first great hereditary caliphate, which at its height was one of the largest empires in history, stretching from Iberia (al-Andalus) across North Africa and the Near East to the Indus and Central Asia.',
    sources: [src('Kennedy 2004, The Prophet and the Age of the Caliphates')],
    snapshots: [
      snap(ce(661).year, poly([[30, 30], [40, 36], [52, 38], [62, 32], [58, 22], [45, 12], [36, 14], [32, 22], [30, 30]]), 'medium', 'At its founding (661), the Umayyad state inherits the Rashidun conquests: Arabia, the Levant, Egypt, Iraq and Iran.'),
      snap(ce(700).year, poly([[10, 33], [24, 30], [36, 30], [46, 38], [56, 40], [64, 34], [60, 24], [45, 13], [36, 20], [24, 28], [12, 30], [10, 33]]), 'medium', 'By 700, the conquest of North Africa (Ifriqiya) is underway and the eastern frontier pushes into Central Asia.'),
      snap(ce(720).year, poly([[-9, 37], [0, 43], [10, 37], [20, 32], [32, 30], [40, 38], [52, 40], [62, 38], [70, 30], [60, 24], [45, 14], [36, 22], [24, 30], [10, 33], [-6, 35], [-9, 37]]), 'medium', 'The great western and eastern sweep: Iberia is conquered (711), Sindh (712) and Transoxiana added — the near-maximum extent.'),
      snap(ce(750).year, poly([[-9, 37], [0, 43], [10, 37], [20, 32], [32, 30], [40, 38], [52, 40], [62, 38], [70, 30], [60, 24], [45, 14], [36, 22], [24, 30], [10, 33], [-6, 35], [-9, 37]]), 'medium', 'Maximum extent, from Iberia to the Indus, on the eve of the Abbasid revolution (750).'),
    ],
  },
  {
    id: 'abbasid-caliphate',
    name: 'Abbasid Caliphate',
    category: 'empire',
    start: ce(750),
    end: ce(1258),
    confidence: 'medium',
    colour: '#3f7a5a',
    labelImportance: 4,
    predecessorIds: ['umayyad-caliphate'],
    successorIds: ['mongol-empire'],
    description:
      'The caliphate that presided over the Islamic Golden Age from Baghdad, a centre of science, philosophy and translation, until the Mongol sack of Baghdad in 1258. Real control fragmented long before that date.',
    sources: [src('Kennedy 2004, The Court of the Caliphs')],
    snapshots: [
      snap(ce(850).year, poly([[24, 32], [36, 37], [46, 40], [56, 38], [64, 32], [58, 25], [46, 25], [38, 22], [30, 28], [24, 32]]), 'medium', 'Abbasid heartland at its height, approximate; nominal claims were wider.'),
    ],
  },
  {
    id: 'al-andalus',
    name: 'Al-Andalus',
    alternativeNames: ['Moorish Iberia', 'Caliphate of Córdoba', 'Emirate of Granada'],
    category: 'other',
    start: ce(711),
    end: ce(1492),
    confidence: 'medium',
    colour: '#5a9a6a',
    labelImportance: 3,
    predecessorIds: ['umayyad-caliphate'],
    successorIds: ['spain'],
    description:
      'Muslim-ruled Iberia — not a single kingdom but a political and cultural tradition spanning an emirate, the Caliphate of Córdoba, the fragmented taifa kingdoms and later Muslim states, and a great centre of learning — gradually reduced by the Christian Reconquista until the fall of Granada in 1492.',
    sources: [src('Kennedy 1996, Muslim Spain and Portugal')],
    snapshots: [
      snap(ce(1000).year, poly([[-9, 37], [-6, 40], [-1, 41], [1, 39], [-2, 37], [-6, 36], [-9, 37]]), 'medium', 'Extent of the Caliphate of Córdoba, c. 1000, approximate.'),
      snap(ce(1350).year, poly([[-5.5, 36.5], [-3.5, 37.5], [-2.5, 37.2], [-3.5, 36.7], [-5, 36], [-5.5, 36.5]]), 'medium', 'Reduced to the Emirate of Granada by the 14th century.'),
    ],
  },
  {
    id: 'khmer-empire',
    name: 'Khmer Empire',
    alternativeNames: ['Angkor'],
    category: 'empire',
    start: ce(802),
    end: ce(1431),
    confidence: 'low',
    colour: '#b0864a',
    labelImportance: 3,
    description:
      'A Southeast Asian empire centred on Angkor, whose temple-cities and vast hydraulic works dominated the lower Mekong before its decline in the 15th century.',
    sources: [src('Coe 2003, Angkor and the Khmer Civilization')],
    snapshots: [
      snap(ce(1150).year, poly([[100, 10], [104, 10], [108, 13], [106, 16], [102, 17], [99, 15], [100, 10]]), 'low', 'Angkorian heartland across the lower Mekong, approximate.'),
    ],
  },
];
