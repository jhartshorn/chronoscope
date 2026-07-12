import type { HistoricalEntity } from '../../types';
import { bce, ce, poly, snap, src } from '../helpers';

/** South Asian and Chinese empires and dynasties. */
export const ASIA_ENTITIES: HistoricalEntity[] = [
  {
    id: 'maurya-empire',
    name: 'Maurya Empire',
    category: 'empire',
    start: bce(322),
    end: bce(185),
    confidence: 'medium',
    colour: '#c08a3f',
    labelImportance: 4,
    successorIds: ['gupta-empire'],
    description:
      'The first empire to unify most of the Indian subcontinent, founded by Chandragupta Maurya and reaching its height under Ashoka, whose edicts spread Buddhist ethics across Asia.',
    sources: [src('Thapar 1997, Aśoka and the Decline of the Mauryas')],
    snapshots: [
      snap(bce(250).year, poly([[68, 26], [75, 33], [82, 31], [88, 26], [90, 22], [85, 15], [78, 10], [73, 16], [68, 22], [68, 26]]), 'medium', 'Extent under Ashoka, c. 250 BCE, approximate.'),
    ],
  },
  {
    id: 'gupta-empire',
    name: 'Gupta Empire',
    category: 'empire',
    start: ce(320),
    end: ce(550),
    confidence: 'medium',
    colour: '#c99a4a',
    labelImportance: 3,
    predecessorIds: ['maurya-empire'],
    description:
      'A north Indian empire of a classical “golden age” of Indian science, mathematics (including the concept of zero), art and literature.',
    sources: [src('Kulke & Rothermund 2004, A History of India')],
    snapshots: [
      snap(ce(400).year, poly([[70, 24], [76, 30], [84, 28], [88, 24], [86, 20], [80, 18], [73, 20], [70, 24]]), 'medium', 'Gupta north India, approximate.'),
    ],
  },
  {
    id: 'mughal-empire',
    name: 'Mughal Empire',
    category: 'empire',
    start: ce(1526),
    end: ce(1857),
    confidence: 'medium',
    colour: '#a86a4a',
    labelImportance: 5,
    successorIds: ['british-empire', 'india-republic'],
    description:
      'A Persianate Muslim empire that ruled most of the Indian subcontinent at its height, renowned for its art and architecture (the Taj Mahal), before decline and absorption into British India.',
    sources: [src('Richards 1993, The Mughal Empire')],
    snapshots: [
      snap(ce(1600).year, poly([[68, 22], [72, 30], [78, 32], [85, 27], [88, 24], [84, 20], [76, 18], [70, 20], [68, 22]]), 'medium', 'Under Akbar, c. 1600, approximate.'),
      snap(ce(1700).year, poly([[67, 24], [72, 32], [78, 34], [85, 28], [90, 24], [88, 16], [80, 10], [74, 16], [68, 20], [67, 24]]), 'medium', 'Near-maximum extent under Aurangzeb, c. 1700, approximate.'),
    ],
  },
  {
    id: 'tang-dynasty',
    name: 'Tang Dynasty',
    alternativeNames: ['Tang China'],
    category: 'empire',
    start: ce(618),
    end: ce(907),
    confidence: 'medium',
    colour: '#c98a2f',
    labelImportance: 4,
    predecessorIds: ['han-china'],
    successorIds: ['song-dynasty'],
    description:
      'A cosmopolitan golden age of imperial China, with its capital Chang’an among the world’s largest cities and its influence reaching deep into Central Asia along the Silk Road.',
    sources: [src('Lewis 2009, China’s Cosmopolitan Empire: The Tang Dynasty')],
    snapshots: [
      snap(ce(700).year, poly([[100, 22], [108, 20], [118, 24], [122, 32], [122, 40], [115, 42], [103, 40], [95, 38], [92, 33], [100, 28], [100, 22]]), 'medium', 'Tang China near its height, approximate.'),
    ],
  },
  {
    id: 'song-dynasty',
    name: 'Song Dynasty',
    alternativeNames: ['Song China'],
    category: 'empire',
    start: ce(960),
    end: ce(1279),
    confidence: 'medium',
    colour: '#b8823f',
    labelImportance: 3,
    predecessorIds: ['tang-dynasty'],
    successorIds: ['mongol-empire'],
    description:
      'An era of Chinese commercial, technological and cultural flourishing — paper money, gunpowder weapons, printing and Neo-Confucian thought — ended by the Mongol conquest.',
    sources: [src('Kuhn 2009, The Age of Confucian Rule: The Song Transformation of China')],
    snapshots: [
      snap(ce(1100).year, poly([[104, 22], [112, 22], [120, 30], [122, 34], [118, 40], [110, 40], [104, 34], [102, 28], [104, 22]]), 'medium', 'Northern Song China, approximate.'),
    ],
  },
  {
    id: 'ming-dynasty',
    name: 'Ming Dynasty',
    alternativeNames: ['Ming China'],
    category: 'empire',
    start: ce(1368),
    end: ce(1644),
    confidence: 'medium',
    colour: '#c9922f',
    labelImportance: 4,
    predecessorIds: ['mongol-empire'],
    successorIds: ['qing-dynasty'],
    description:
      'The native Chinese dynasty that succeeded Mongol rule, builder of much of the Great Wall as it stands and patron of the treasure voyages of Zheng He.',
    sources: [src('Brook 2010, The Troubled Empire: China in the Yuan and Ming Dynasties')],
    snapshots: [
      snap(ce(1500).year, poly([[98, 22], [108, 20], [118, 22], [122, 32], [122, 40], [116, 42], [104, 40], [98, 34], [97, 28], [98, 22]]), 'medium', 'Ming China, approximate.'),
    ],
  },
  {
    id: 'qing-dynasty',
    name: 'Qing Dynasty',
    alternativeNames: ['Qing China', 'Manchu Empire'],
    category: 'empire',
    start: ce(1644),
    end: ce(1912),
    confidence: 'high',
    colour: '#c0603f',
    labelImportance: 4,
    predecessorIds: ['ming-dynasty'],
    successorIds: ['china-prc'],
    description:
      'The last imperial dynasty of China, established by the Manchus, which roughly doubled the empire’s territory to include Manchuria, Mongolia, Tibet and Xinjiang — the basis of modern China’s extent.',
    sources: [src('Rowe 2009, China’s Last Empire: The Great Qing')],
    snapshots: [
      snap(ce(1760).year, poly([[74, 38], [88, 48], [100, 50], [120, 50], [130, 45], [125, 40], [122, 30], [115, 22], [108, 20], [98, 22], [85, 28], [78, 32], [74, 38]]), 'high', 'Near-maximum extent under Qianlong, c. 1760, approximate.'),
    ],
  },
];
