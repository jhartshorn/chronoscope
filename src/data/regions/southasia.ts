import type { HistoricalEntity } from '../../types';
import { bce, ce, poly, snap, src } from '../helpers';

/** South Asian states between the Indus civilisation and the modern republics. */
export const SOUTH_ASIA_ENTITIES: HistoricalEntity[] = [
  {
    id: 'vedic-civilisation',
    name: 'Vedic civilisation',
    alternativeNames: ['Vedic period'],
    category: 'civilisation',
    start: bce(1500),
    end: bce(500),
    confidence: 'low',
    colour: '#c08a4a',
    labelImportance: 3,
    description:
      'The culture of the Indo-Aryan peoples of the northern Indian subcontinent that composed the Vedas, foundational to later Hinduism, and evolved from pastoral society into the early kingdoms (mahajanapadas) of the Ganges plain. A cultural-linguistic phase, not a single state.',
    sources: [src('Witzel 1995, in The Indo-Aryans of Ancient South Asia')],
    snapshots: [
      snap(bce(1000).year, poly([[71, 27], [76, 31], [82, 30], [86, 26], [83, 23], [77, 23], [72, 25], [71, 27]]), 'low', 'Indo-Gangetic plain of the Vedic period, approximate.'),
    ],
  },
  {
    id: 'pala-empire',
    name: 'Pala Empire',
    category: 'empire',
    start: ce(750),
    end: ce(1161),
    confidence: 'low',
    colour: '#a87a4a',
    labelImportance: 2,
    description:
      'A Buddhist dynasty of eastern India (Bengal and Bihar) that was a major patron of learning, sustaining the great monastic university of Nalanda and spreading Buddhism to Tibet and Southeast Asia.',
    sources: [src('Sanyal 2010, in A Comprehensive History of India')],
    snapshots: [
      snap(ce(850).year, poly([[84, 22], [88, 24], [92, 26], [90, 27], [86, 26], [83, 24], [84, 22]]), 'low', 'Bengal and Bihar, approximate.'),
    ],
  },
  {
    id: 'chola-empire',
    name: 'Chola Empire',
    category: 'empire',
    start: ce(848),
    end: ce(1279),
    confidence: 'medium',
    colour: '#c99a3a',
    labelImportance: 3,
    description:
      'A Tamil dynasty of southern India that became a great maritime power, its navy projecting influence across the Bay of Bengal to Southeast Asia, and a patron of magnificent Dravidian temple architecture.',
    sources: [src('Sastri 1955, The CōĻas')],
    snapshots: [
      snap(ce(1050).year, poly([[75, 8], [78, 8], [81, 12], [82, 16], [80, 18], [77, 15], [75, 11], [75, 8]]), 'medium', 'Chola heartland in Tamil south India; overseas reach not drawn.'),
    ],
  },
  {
    id: 'anuradhapura',
    name: 'Anuradhapura Kingdom',
    alternativeNames: ['Ancient Sri Lanka'],
    category: 'kingdom',
    start: bce(377),
    end: ce(1017),
    confidence: 'low',
    colour: '#5a9a7a',
    labelImportance: 2,
    description:
      'The long-lived first Sinhalese kingdom of Sri Lanka, centred on the sacred city of Anuradhapura, a great centre of Theravada Buddhism with monumental stupas and sophisticated irrigation.',
    sources: [src('De Silva 1981, A History of Sri Lanka')],
    snapshots: [
      snap(ce(500).year, poly([[79.7, 6], [81.9, 6.3], [81.8, 9.2], [80, 9.8], [79.7, 8], [79.7, 6]]), 'low', 'Island of Sri Lanka, approximate.'),
    ],
  },
  {
    id: 'delhi-sultanate',
    name: 'Delhi Sultanate',
    category: 'empire',
    start: ce(1206),
    end: ce(1526),
    confidence: 'medium',
    colour: '#8a6a4a',
    labelImportance: 4,
    successorIds: ['mughal-empire'],
    description:
      'A succession of Muslim dynasties ruling much of the Indian subcontinent from Delhi, which repelled the Mongols, spread Indo-Islamic culture and architecture, and preceded the Mughals.',
    sources: [src('Jackson 1999, The Delhi Sultanate: A Political and Military History')],
    snapshots: [
      snap(ce(1330).year, poly([[68, 22], [73, 30], [80, 30], [86, 26], [88, 22], [82, 14], [76, 14], [70, 18], [68, 22]]), 'medium', 'Near-maximum extent under the Tughlaqs, approximate.'),
    ],
  },
  {
    id: 'vijayanagara',
    name: 'Vijayanagara Empire',
    category: 'empire',
    start: ce(1336),
    end: ce(1646),
    confidence: 'medium',
    colour: '#c9a24a',
    labelImportance: 3,
    description:
      'A powerful south Indian Hindu empire that dominated the Deccan and the far south, its wealthy capital (modern Hampi) a marvel described by foreign travellers, a bulwark against the northern sultanates.',
    sources: [src('Stein 1989, The New Cambridge History of India: Vijayanagara')],
    snapshots: [
      snap(ce(1520).year, poly([[74, 8], [78, 9], [82, 13], [82, 17], [78, 18], [74, 16], [73, 12], [74, 8]]), 'medium', 'South Indian Deccan and peninsula, approximate.'),
    ],
  },
  {
    id: 'maratha-confederacy',
    name: 'Maratha Confederacy',
    alternativeNames: ['Maratha Empire'],
    category: 'confederation',
    start: ce(1674),
    end: ce(1818),
    confidence: 'medium',
    colour: '#6a9a5a',
    labelImportance: 4,
    predecessorIds: ['mughal-empire'],
    successorIds: ['british-empire'],
    description:
      'A Hindu power founded by Shivaji that broke Mughal dominance and, as a confederacy of chiefs, controlled much of the subcontinent in the 18th century before defeat by the British.',
    sources: [src('Gordon 1993, The New Cambridge History of India: The Marathas')],
    snapshots: [
      snap(ce(1760).year, poly([[70, 15], [76, 20], [82, 24], [86, 25], [84, 20], [80, 15], [74, 13], [70, 15]]), 'medium', 'Maratha dominance across central India, approximate.'),
    ],
  },
  {
    id: 'sikh-empire',
    name: 'Sikh Empire',
    category: 'empire',
    start: ce(1799),
    end: ce(1849),
    confidence: 'medium',
    colour: '#c9b03a',
    labelImportance: 3,
    successorIds: ['british-empire'],
    description:
      'A state of the north-western subcontinent forged by Ranjit Singh, uniting the Punjab and reaching into Kashmir and the frontier, the last major indigenous power annexed by the British.',
    sources: [src('Grewal 1990, The New Cambridge History of India: The Sikhs of the Punjab')],
    snapshots: [
      snap(ce(1839).year, poly([[71, 30], [75, 32], [78, 34], [76, 35], [72, 34], [70, 32], [71, 30]]), 'medium', 'Punjab and the north-western frontier, approximate.'),
    ],
  },
];
