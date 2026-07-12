import type { HistoricalEntity } from '../../types';
import { bce, ce, mpoly, poly, snap, src } from '../helpers';

/** Bronze Age Aegean and further Iron Age Near Eastern states. */
export const NEAR_EAST_ENTITIES: HistoricalEntity[] = [
  {
    id: 'minoan',
    name: 'Minoan civilisation',
    category: 'civilisation',
    start: bce(3100),
    end: bce(1100),
    confidence: 'medium',
    colour: '#4a9a9a',
    labelImportance: 3,
    successorIds: ['mycenaean'],
    description:
      'A Bronze Age civilisation of Crete and the Aegean, centred on palace complexes such as Knossos — the first literate society of Europe (Linear A) and a maritime trading power, a key predecessor of later Greek civilisation.',
    sources: [src('Cline (ed.) 2010, The Oxford Handbook of the Bronze Age Aegean')],
    snapshots: [
      snap(bce(1700).year, mpoly(
        [[23.4, 34.9], [26.3, 34.9], [26.4, 35.5], [24, 35.8], [23.4, 35.3], [23.4, 34.9]],
        [[25.2, 36.3], [25.6, 36.5], [25.3, 36.7], [25, 36.5], [25.2, 36.3]],
      ), 'medium', 'Crete and Aegean island centres, approximate.'),
    ],
  },
  {
    id: 'mycenaean',
    name: 'Mycenaean Greece',
    alternativeNames: ['Mycenaean civilisation'],
    category: 'civilisation',
    start: bce(1750),
    end: bce(1050),
    confidence: 'medium',
    colour: '#3f8a9a',
    labelImportance: 3,
    predecessorIds: ['minoan'],
    successorIds: ['ancient-greece'],
    description:
      'The first Greek-speaking civilisation of mainland Greece, of Mycenae, Pylos and Tiryns, whose Linear B tablets record an early form of Greek. Its warrior palaces inspired later Greek myth before collapsing in the Late Bronze Age crisis.',
    sources: [src('Shelmerdine (ed.) 2008, The Cambridge Companion to the Aegean Bronze Age')],
    snapshots: [
      snap(bce(1300).year, poly([[20.5, 36.5], [21, 38], [23, 39], [25, 38.3], [24, 36.8], [22, 36.3], [20.5, 36.5]]), 'medium', 'Mainland Greece and the Peloponnese, approximate.'),
    ],
  },
  {
    id: 'etruscans',
    name: 'Etruscan civilisation',
    alternativeNames: ['Etruria'],
    category: 'civilisation',
    start: bce(900),
    end: bce(27),
    confidence: 'medium',
    colour: '#a85a6a',
    labelImportance: 3,
    successorIds: ['roman-republic'],
    description:
      'A civilisation of central Italy, of independent city-states with their own non-Indo-European language, whose art, religion and engineering strongly shaped early Rome before Roman absorption.',
    sources: [src('Haynes 2000, Etruscan Civilization: A Cultural History')],
    snapshots: [
      snap(bce(500).year, poly([[10, 42], [12.5, 42], [12.6, 44], [11, 44.5], [9.8, 43.5], [10, 42]]), 'medium', 'Etruria in central Italy, approximate.'),
    ],
  },
  {
    id: 'israel-judah',
    name: 'Israel and Judah',
    alternativeNames: ['Kingdom of Israel', 'Kingdom of Judah'],
    category: 'kingdom',
    start: bce(1000),
    end: bce(586),
    confidence: 'medium',
    colour: '#9a7ab0',
    labelImportance: 3,
    description:
      'The Iron Age kingdoms of the southern Levant. A united monarchy of tradition later divided into Israel in the north (fell to Assyria, 722 BCE) and Judah in the south (fell to Babylon, 586 BCE), the setting of much of the Hebrew Bible.',
    sources: [src('Finkelstein & Silberman 2001, The Bible Unearthed')],
    snapshots: [
      snap(bce(800).year, poly([[34.3, 29.5], [35.6, 30.5], [35.9, 33], [35, 33.3], [34.5, 31.5], [34.3, 29.5]]), 'medium', 'Israel and Judah in the southern Levant, approximate.'),
    ],
  },
  {
    id: 'lydia',
    name: 'Lydia',
    category: 'kingdom',
    start: bce(1200),
    end: bce(546),
    confidence: 'low',
    colour: '#b08a4a',
    labelImportance: 2,
    successorIds: ['achaemenid'],
    description:
      'A wealthy kingdom of western Anatolia, credited with striking the first standardised coinage; its last king, Croesus, was proverbial for riches before conquest by Persia.',
    sources: [src('Roosevelt 2009, The Archaeology of Lydia')],
    snapshots: [
      snap(bce(600).year, poly([[26.5, 38], [30, 38.5], [31, 39.5], [29, 40], [27, 39.5], [26.5, 38]]), 'low', 'Western Anatolia, approximate.'),
    ],
  },
  {
    id: 'urartu',
    name: 'Urartu',
    alternativeNames: ['Kingdom of Van'],
    category: 'kingdom',
    start: bce(860),
    end: bce(590),
    confidence: 'low',
    colour: '#8a6a5a',
    labelImportance: 2,
    description:
      'An Iron Age kingdom of the Armenian highlands around Lake Van, a rival of Assyria known for its fortresses and metalwork.',
    sources: [src('Zimansky 1998, Ancient Ararat: A Handbook of Urartian Studies')],
    snapshots: [
      snap(bce(700).year, poly([[38, 37.5], [43, 38], [45, 39.5], [44, 41], [40, 41], [38, 39.5], [38, 37.5]]), 'low', 'Armenian highlands around Lake Van, approximate.'),
    ],
  },
  {
    id: 'neo-babylonian',
    name: 'Neo-Babylonian Empire',
    alternativeNames: ['Chaldean Empire'],
    category: 'empire',
    start: bce(626),
    end: bce(539),
    confidence: 'medium',
    colour: '#b0703a',
    labelImportance: 3,
    predecessorIds: ['neo-assyrian'],
    successorIds: ['achaemenid'],
    description:
      'The empire of Nebuchadnezzar II, which destroyed Jerusalem and rebuilt Babylon with its famous walls and Hanging Gardens, before falling to Cyrus the Great of Persia.',
    sources: [src('Beaulieu 2018, A History of Babylon 2200 BC–AD 75')],
    snapshots: [
      snap(bce(560).year, poly([[35, 31], [40, 30], [46, 31], [48, 34], [45, 37], [40, 36], [36, 34], [35, 31]]), 'medium', 'Mesopotamia and the Levant, approximate.'),
    ],
  },
  {
    id: 'nabataean',
    name: 'Nabataean Kingdom',
    category: 'kingdom',
    start: bce(300),
    end: ce(106),
    confidence: 'low',
    colour: '#c99a5a',
    labelImportance: 2,
    successorIds: ['roman-empire'],
    description:
      'An Arab trading kingdom of the northern Arabian desert, whose capital Petra grew rich controlling the incense routes, annexed by Rome in 106 CE.',
    sources: [src('Taylor 2001, Petra and the Lost Kingdom of the Nabataeans')],
    snapshots: [
      snap(ce(50).year, poly([[34.5, 29], [37, 29.5], [38, 31], [36.5, 32], [35, 31], [34.5, 29]]), 'low', 'Northern Arabia and the southern Levant around Petra, approximate.'),
    ],
  },
  {
    id: 'palmyrene',
    name: 'Palmyrene Empire',
    category: 'empire',
    start: ce(270),
    end: ce(273),
    confidence: 'low',
    colour: '#b06a5a',
    labelImportance: 2,
    predecessorIds: ['roman-empire'],
    successorIds: ['roman-empire'],
    description:
      'A short-lived breakaway from Rome led from the caravan city of Palmyra under Queen Zenobia, which briefly seized Syria, Egypt and much of Anatolia before Aurelian restored Roman rule.',
    sources: [src('Southern 2008, Empress Zenobia: Palmyra’s Rebel Queen')],
    snapshots: [
      snap(ce(271).year, poly([[30, 24], [36, 31], [40, 34], [43, 35], [40, 37], [34, 34], [30, 30], [30, 24]]), 'low', 'Zenobia’s brief realm from Egypt to Anatolia, approximate.'),
    ],
  },
];
