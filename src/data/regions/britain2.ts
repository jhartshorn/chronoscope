import type { HistoricalEntity } from '../../types';
import type { Ring } from '../helpers';
import { bce, ce, mpoly, poly, snap, src } from '../helpers';

/**
 * Britain before and after the early-medieval kingdoms of `britain.ts`:
 * the Neolithic monument-builders, the Iron Age tribes the Romans met,
 * the province of Britannia itself, and the Norse sea-kingdoms of the
 * west and north. Ireland's polities are in `ireland.ts`.
 *
 * Tribal ranges are inferred from classical geographers (Ptolemy, Tacitus)
 * and coin/pottery distributions — they are envelopes of evidence, not
 * borders, and are drawn at low confidence throughout.
 */

/** England and Wales up to the Tyne–Solway isthmus (Hadrian's Wall line). */
const BRITANNIA_TO_HADRIAN: Ring = [
  [-5.8, 50.0], [-2.5, 50.5], [0.2, 50.75], [1.45, 51.3], [1.75, 52.5],
  [1.7, 52.9], [0.0, 53.65], [-0.1, 54.1], [-0.6, 54.5], [-1.2, 54.65],
  [-1.4, 55.0], [-2.3, 55.0], [-3.05, 54.95], [-3.5, 54.9], [-3.3, 54.25],
  [-3.0, 53.7], [-3.15, 53.35], [-4.05, 53.3], [-4.75, 53.4], [-4.75, 52.8],
  [-5.35, 51.9], [-5.1, 51.6], [-4.0, 51.55], [-3.0, 51.3], [-4.55, 51.0],
  [-5.8, 50.0],
];

/** The same, extended to the Forth–Clyde isthmus (Antonine Wall line). */
const BRITANNIA_TO_ANTONINE: Ring = [
  [-5.8, 50.0], [-2.5, 50.5], [0.2, 50.75], [1.45, 51.3], [1.75, 52.5],
  [1.7, 52.9], [0.0, 53.65], [-0.1, 54.1], [-0.6, 54.5], [-1.2, 54.65],
  [-1.4, 55.0], [-2.0, 55.77], [-2.55, 56.0], [-3.3, 56.05], [-3.8, 56.0],
  [-4.4, 55.95], [-4.85, 55.93], [-5.1, 55.7], [-4.85, 55.5], [-5.05, 55.0],
  [-4.95, 54.65], [-3.6, 54.85], [-3.3, 54.25], [-3.0, 53.7], [-3.15, 53.35],
  [-4.05, 53.3], [-4.75, 53.4], [-4.75, 52.8], [-5.35, 51.9], [-5.1, 51.6],
  [-4.0, 51.55], [-3.0, 51.3], [-4.55, 51.0], [-5.8, 50.0],
];

const ORKNEY: Ring = [
  [-3.45, 58.85], [-2.6, 58.9], [-2.35, 59.15], [-3.0, 59.4], [-3.45, 59.1], [-3.45, 58.85],
];
const SHETLAND: Ring = [
  [-1.75, 59.85], [-1.0, 60.05], [-0.85, 60.55], [-1.6, 60.65], [-1.75, 59.85],
];
const OUTER_HEBRIDES: Ring = [
  [-7.8, 56.85], [-7.3, 56.85], [-6.1, 58.15], [-6.15, 58.55], [-7.1, 58.45], [-7.9, 57.2], [-7.8, 56.85],
];

export const BRITAIN2_ENTITIES: HistoricalEntity[] = [
  // ------------------------------------------------------------ prehistory
  {
    id: 'neolithic-britain',
    name: 'Neolithic Britain and Ireland',
    alternativeNames: ['Megalith builders', 'Grooved Ware', 'Henge builders'],
    category: 'archaeological-culture',
    start: bce(4000),
    end: bce(2450),
    confidence: 'low',
    colour: '#8a7a5a',
    labelImportance: 2,
    successorIds: ['bell-beaker'],
    description:
      'The farming societies that raised the great monuments of Britain and Ireland: long barrows and causewayed enclosures, the passage tombs of the Boyne (Newgrange, c. 3200 BCE), the villages and henges of Orkney (Skara Brae), and Stonehenge, whose first earthwork was dug around 3000 BCE and whose sarsens were raised around 2500 BCE. Grooved Ware pottery links Orkney, the Boyne and Wessex in a shared late-Neolithic world, largely replaced after 2450 BCE by people of the Bell Beaker expansion.',
    sources: [
      src('Parker Pearson 2012, Stonehenge: Exploring the Greatest Stone Age Mystery'),
      src('Cunliffe 2013, Britain Begins'),
    ],
    snapshots: [
      snap(bce(3000).year, mpoly(
        [[-5.8, 50.0], [-1.0, 50.55], [1.45, 51.3], [1.7, 52.9], [0.0, 53.65],
         [-1.4, 55.0], [-2.55, 56.0], [-2.0, 57.7], [-3.05, 58.65], [-3.0, 59.4],
         [-5.05, 58.6], [-6.3, 57.0], [-5.65, 55.3], [-4.95, 54.65], [-3.3, 54.25],
         [-3.1, 53.4], [-4.75, 53.4], [-4.75, 52.8], [-5.35, 51.9], [-4.0, 51.55],
         [-3.0, 51.3], [-4.55, 51.0], [-5.8, 50.0]],
        [[-10.0, 51.55], [-8.2, 51.55], [-6.3, 52.2], [-6.0, 53.3], [-6.1, 54.1],
         [-5.55, 54.45], [-6.05, 55.2], [-7.4, 55.4], [-8.55, 54.9], [-10.05, 54.3],
         [-9.7, 53.3], [-10.0, 52.2], [-10.4, 51.9], [-10.0, 51.55]],
      ), 'low', 'Both islands were settled; the range shown is simply their extent — density of monuments varied enormously.'),
    ],
  },

  // ------------------------------------------------------ Iron Age tribes
  {
    id: 'caledonii',
    name: 'Caledonians',
    alternativeNames: ['Caledonii', 'Caledonia', 'Maeatae'],
    category: 'people',
    start: bce(300),
    end: ce(300),
    confidence: 'low',
    colour: '#4a7a6a',
    labelImportance: 1,
    successorIds: ['picts'],
    description:
      'The peoples of the Scottish Highlands beyond the Forth, who fought Agricola at Mons Graupius (83 CE) under Calgacus and were never brought into the Roman province. Later Roman writers group them with the Maeatae; by the 4th century the same peoples appear in the sources as "Picts".',
    sources: [
      src('Cunliffe 2005, Iron Age Communities in Britain (4th ed.)'),
      src('Fraser 2009, From Caledonia to Pictland'),
    ],
    snapshots: [
      snap(ce(83).year, poly([
        [-5.2, 56.3], [-4.2, 56.35], [-3.4, 56.6], [-2.8, 57.1], [-3.3, 57.8],
        [-4.3, 58.35], [-5.0, 58.4], [-5.4, 57.5], [-5.2, 56.7], [-5.2, 56.3],
      ]), 'low', 'The Highland massif north of the Forth–Clyde line — a cultural envelope, not a polity.'),
    ],
  },
  {
    id: 'brigantes',
    name: 'Brigantes',
    category: 'people',
    start: bce(200),
    end: ce(80),
    confidence: 'low',
    colour: '#6a8a5a',
    labelImportance: 1,
    description:
      'The largest tribal confederation of Britain, spanning the Pennines from sea to sea. Under Queen Cartimandua it was a Roman client kingdom — she handed over the fugitive resistance leader Caratacus in 51 CE — until her ex-husband Venutius rebelled and Rome annexed the north in the 70s CE.',
    sources: [src('Cunliffe 2005, Iron Age Communities in Britain (4th ed.)')],
    snapshots: [
      snap(ce(50).year, poly([
        [-2.95, 53.55], [-1.1, 53.55], [-0.25, 53.7], [-0.1, 54.1], [-0.6, 54.5],
        [-1.2, 54.65], [-1.4, 55.0], [-2.4, 55.1], [-3.6, 54.85], [-3.3, 54.25],
        [-2.95, 53.9], [-2.95, 53.55],
      ]), 'low', 'The Pennine country between the Humber–Mersey line and the Tyne–Solway isthmus, per Ptolemy.'),
    ],
  },
  {
    id: 'iceni',
    name: 'Iceni',
    category: 'people',
    start: bce(100),
    end: ce(61),
    confidence: 'low',
    colour: '#9a7a4a',
    labelImportance: 1,
    description:
      'The tribe of the Norfolk region, a wealthy client kingdom under Prasutagus. On his death Rome seized the kingdom and abused his family; his widow Boudica led the great revolt of 60–61 CE that burned Camulodunum, Londinium and Verulamium before its bloody defeat.',
    sources: [src('Cunliffe 2005, Iron Age Communities in Britain (4th ed.)')],
    snapshots: [
      snap(ce(47).year, poly([
        [0.3, 52.3], [0.9, 52.35], [1.6, 52.45], [1.75, 52.75], [1.7, 52.95],
        [0.9, 53.0], [0.4, 52.9], [0.2, 52.6], [0.3, 52.3],
      ]), 'low', 'Norfolk and the fen edge, from coin distributions and Ptolemy.'),
    ],
  },
  {
    id: 'catuvellauni',
    name: 'Catuvellauni',
    alternativeNames: ['Trinovantes', 'Camulodunum'],
    category: 'people',
    start: bce(150),
    end: ce(43),
    confidence: 'low',
    colour: '#7a6a9a',
    labelImportance: 1,
    description:
      'The dominant power of south-eastern Britain on the eve of the Roman conquest. From St Albans (Verlamion) its kings — Tasciovanus, then Cunobelinus ("Cymbeline") — absorbed the neighbouring Trinovantes and ruled from Camulodunum (Colchester), minting coins on a Roman model. The Claudian invasion of 43 CE was aimed squarely at their kingdom.',
    sources: [
      src('Cunliffe 2005, Iron Age Communities in Britain (4th ed.)'),
      src('Creighton 2000, Coins and Power in Late Iron Age Britain'),
    ],
    snapshots: [
      snap(ce(40).year, poly([
        [-1.3, 51.6], [-0.3, 51.55], [0.4, 51.55], [0.95, 51.6], [1.25, 51.85],
        [0.8, 52.1], [0.1, 52.25], [-0.6, 52.3], [-1.4, 51.95], [-1.3, 51.6],
      ]), 'low', 'The Chilterns, Hertfordshire and Essex, with the Trinovantian lands around Camulodunum.'),
    ],
  },
  {
    id: 'silures',
    name: 'Silures',
    alternativeNames: ['Ordovices'],
    category: 'people',
    start: bce(300),
    end: ce(78),
    confidence: 'low',
    colour: '#5a8a7a',
    labelImportance: 1,
    description:
      'The tribe of the south Welsh valleys, described by Tacitus as swarthy and unyielding. They sheltered the resistance leader Caratacus and defeated a legion in the field, holding off Rome for a generation until Frontinus subdued them in the 70s CE; the Ordovices of north-west Wales resisted until Agricola’s campaign of 77–78.',
    sources: [src('Cunliffe 2005, Iron Age Communities in Britain (4th ed.)')],
    snapshots: [
      snap(ce(50).year, poly([
        [-3.95, 51.55], [-2.75, 51.6], [-2.95, 52.05], [-3.6, 52.15], [-4.15, 51.8],
        [-3.95, 51.55],
      ]), 'low', 'The hills and valleys of south-east Wales between the Wye and the Tywi.'),
    ],
  },

  // ---------------------------------------------------------- Roman Britain
  {
    id: 'roman-britain',
    name: 'Roman Britain',
    alternativeNames: ['Britannia'],
    category: 'colonial-possession',
    start: ce(43),
    end: ce(410),
    confidence: 'medium',
    colour: '#a05a50',
    labelImportance: 3,
    parentEntityId: 'roman-empire',
    predecessorIds: ['catuvellauni'],
    successorIds: ['dumnonia', 'gwynedd', 'strathclyde'],
    description:
      'The province of Britannia, invaded under Claudius in 43 CE. The frontier moved for a century — to the Fosse Way, briefly to the Tay under Agricola, then settling on Hadrian’s Wall (from 122), with a short-lived advance to the Antonine Wall (c. 142–162). Ireland and Highland Scotland were never conquered. Roman rule ended around 410, when the emperor Honorius told the British cities to look to their own defence.',
    sources: [
      src('Mattingly 2006, An Imperial Possession: Britain in the Roman Empire'),
      src('Frere 1987, Britannia: A History of Roman Britain (3rd ed.)'),
    ],
    snapshots: [
      snap(ce(47).year, poly([
        [-3.55, 50.6], [-2.5, 50.55], [-1.0, 50.6], [0.2, 50.75], [1.35, 51.1],
        [1.45, 51.4], [1.3, 51.8], [1.75, 52.5], [1.7, 52.9], [0.35, 53.2],
        [-0.2, 53.4], [-0.9, 53.2], [-1.5, 52.6], [-2.1, 52.0], [-2.8, 51.3],
        [-3.55, 50.6],
      ]), 'medium', 'The initial conquest: the lowlands south-east of the Fosse Way frontier road (Exeter to Lincoln).'),
      snap(ce(84).year, poly([
        [-5.8, 50.0], [-2.5, 50.5], [0.2, 50.75], [1.45, 51.3], [1.75, 52.5],
        [1.7, 52.9], [0.0, 53.65], [-0.1, 54.1], [-1.2, 54.65], [-2.0, 55.77],
        [-2.55, 56.0], [-2.85, 56.5], [-4.0, 56.5], [-4.85, 56.1], [-5.1, 55.7],
        [-4.85, 55.5], [-5.05, 55.0], [-4.95, 54.65], [-3.6, 54.85], [-3.3, 54.25],
        [-3.0, 53.7], [-3.15, 53.35], [-4.05, 53.3], [-4.75, 53.4], [-4.75, 52.8],
        [-5.35, 51.9], [-5.1, 51.6], [-4.0, 51.55], [-3.0, 51.3], [-4.55, 51.0],
        [-5.8, 50.0],
      ]), 'medium', 'Agricola’s high-water mark after Mons Graupius (83): Wales and the north held, garrisons up to the Tay.'),
      snap(ce(122).year, poly(BRITANNIA_TO_HADRIAN), 'medium', 'The frontier consolidated on Hadrian’s Wall, Tyne to Solway (begun 122).'),
      snap(ce(145).year, poly(BRITANNIA_TO_ANTONINE), 'medium', 'The Antonine advance (c. 142): a new turf wall on the Forth–Clyde isthmus, held for about twenty years.'),
      snap(ce(250).year, poly(BRITANNIA_TO_HADRIAN), 'medium', 'Back on Hadrian’s Wall from the 160s — the stable frontier for the rest of Roman rule.'),
    ],
  },

  // -------------------------------------------------- the Norse sea-realms
  {
    id: 'kingdom-of-the-isles',
    name: 'Kingdom of the Isles',
    alternativeNames: ['Suðreyjar', 'Kingdom of Mann and the Isles', 'Sodor'],
    category: 'kingdom',
    start: ce(849),
    end: ce(1266),
    confidence: 'low',
    colour: '#6a7aa0',
    labelImportance: 2,
    predecessorIds: ['norse-vikings'],
    successorIds: ['kingdom-of-alba'],
    description:
      'The Norse–Gaelic sea-kingdom of the Hebrides and the Isle of Man (Old Norse Suðreyjar, the "southern isles", preserved in the bishopric of Sodor and Man), owing loose allegiance to Norway. Split after Somerled seized the inner isles in 1156; the whole chain was ceded to Scotland by the Treaty of Perth (1266), while Man passed ultimately to England.',
    sources: [
      src('McDonald 1997, The Kingdom of the Isles: Scotland’s Western Seaboard c. 1100–c. 1336'),
      src('Crawford 1987, Scandinavian Scotland'),
    ],
    snapshots: [
      snap(ce(1150).year, mpoly(
        OUTER_HEBRIDES,
        [[-6.9, 57.3], [-6.1, 57.25], [-5.9, 57.55], [-6.6, 57.7], [-6.9, 57.3]],
        [[-6.6, 56.25], [-5.85, 56.3], [-5.7, 56.65], [-6.5, 56.65], [-6.6, 56.25]],
        [[-6.6, 55.55], [-6.0, 55.55], [-5.6, 56.15], [-6.15, 56.1], [-6.6, 55.55]],
        [[-4.9, 54.0], [-4.3, 54.05], [-4.35, 54.4], [-4.85, 54.35], [-4.9, 54.0]],
      ), 'low', 'The island chain from Lewis to Man on the eve of Somerled’s revolt; mainland footholds are not shown.'),
    ],
  },
  {
    id: 'earldom-of-orkney',
    name: 'Earldom of Orkney',
    alternativeNames: ['Norðreyjar', 'Jarldom of Orkney'],
    category: 'other',
    start: ce(875),
    end: ce(1472),
    confidence: 'low',
    colour: '#5a6a9a',
    labelImportance: 1,
    predecessorIds: ['norse-vikings'],
    successorIds: ['kingdom-of-alba'],
    description:
      'The Norse earldom of Orkney and Shetland (the Norðreyjar, "northern isles"), held under the kings of Norway, whose sagas remember earls such as Thorfinn the Mighty ruling Caithness and beyond. Norse law and speech (Norn) long outlasted the earls: the isles passed to Scotland only in 1468–72, pledged for the dowry of Margaret of Denmark.',
    sources: [
      src('Crawford 1987, Scandinavian Scotland'),
      src('Thomson 2008, The New History of Orkney'),
    ],
    snapshots: [
      snap(ce(1050).year, mpoly(
        ORKNEY,
        SHETLAND,
        [[-4.6, 58.1], [-3.3, 58.25], [-3.05, 58.65], [-4.4, 58.62], [-5.05, 58.55], [-4.9, 58.2], [-4.6, 58.1]],
      ), 'low', 'Thorfinn the Mighty’s earldom at its height: Orkney, Shetland and Caithness on the mainland.'),
      snap(ce(1300).year, mpoly(ORKNEY, SHETLAND), 'medium', 'After Caithness passed under the Scottish crown: the island earldom that remained Norwegian, then Danish, until 1468–72.'),
    ],
  },
];
