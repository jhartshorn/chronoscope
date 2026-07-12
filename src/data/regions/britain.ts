import type { HistoricalEntity } from '../../types';
import { ce, mpoly, poly, snap, src } from '../helpers';

/**
 * Early-medieval Britain and Ireland in more detail: the Pictish and Gaelic
 * north, the Brythonic (Brittonic) Celtic west, and the Anglo-Saxon Heptarchy
 * that coalesced into the Kingdom of England (see `kingdom-of-england`).
 *
 * These are small polities; the detail is meant to be read when zoomed in on
 * the British Isles. Boundaries in this period are especially fluid and the
 * outlines are schematic.
 */
export const BRITAIN_ENTITIES: HistoricalEntity[] = [
  {
    id: 'picts',
    name: 'Picts',
    alternativeNames: ['Pictland', 'Cruithne'],
    category: 'people',
    start: ce(300),
    end: ce(900),
    confidence: 'low',
    colour: '#5a7d8a',
    labelImportance: 2,
    successorIds: ['kingdom-of-alba'],
    description:
      'A confederation of peoples of northern and eastern Scotland beyond the reach of Rome, known from symbol stones and hostile Roman and later accounts. In the 9th century Pictland merged with Gaelic Dál Riata to form the Kingdom of Alba (Scotland).',
    sources: [
      src('Fraser 2009, From Caledonia to Pictland'),
      src('Woolf 2007, From Pictland to Alba'),
    ],
    snapshots: [
      snap(ce(700).year, poly([[-5.5, 56], [-2.5, 56.4], [-2, 57.6], [-3.2, 58.6], [-5, 58.3], [-5.6, 57], [-5.5, 56]]), 'low', 'Approximate Pictish territory north of the Forth–Clyde line.'),
    ],
  },
  {
    id: 'dal-riata',
    name: 'Dál Riata',
    category: 'kingdom',
    start: ce(500),
    end: ce(900),
    confidence: 'low',
    colour: '#6a9a7a',
    labelImportance: 2,
    successorIds: ['kingdom-of-alba'],
    description:
      'A Gaelic (Scotti) kingdom straddling the North Channel, in Argyll in western Scotland and Antrim in north-eastern Ireland. Its language and church helped shape the later Kingdom of Alba.',
    sources: [src('Fraser 2009, From Caledonia to Pictland')],
    snapshots: [
      snap(ce(650).year, mpoly(
        [[-6.5, 55.5], [-5, 56], [-5.3, 56.9], [-6.3, 56.5], [-6.6, 55.6], [-6.5, 55.5]],
        [[-6.6, 54.6], [-5.7, 54.7], [-6, 55.2], [-6.7, 55], [-6.6, 54.6]],
      ), 'low', 'Argyll and Antrim, straddling the North Channel.'),
    ],
  },
  {
    id: 'strathclyde',
    name: 'Kingdom of Strathclyde',
    alternativeNames: ['Alt Clut', 'Britons of the North', 'Yr Hen Ogledd'],
    category: 'kingdom',
    start: ce(500),
    end: ce(1030),
    confidence: 'low',
    colour: '#7a8ab0',
    labelImportance: 2,
    description:
      'A Brythonic (Brittonic) Celtic kingdom of the Clyde valley in south-western Scotland, a survival of the old British north (Yr Hen Ogledd) that long resisted its Gaelic, Pictish and Anglian neighbours before absorption into Scotland.',
    sources: [src('Clarkson 2010, The Men of the North: The Britons of Southern Scotland')],
    snapshots: [
      snap(ce(700).year, poly([[-5, 54.9], [-3.5, 55.2], [-3.3, 56], [-4.6, 56.1], [-5, 55.5], [-5, 54.9]]), 'low', 'Brythonic kingdom of the Clyde, approximate.'),
    ],
  },
  {
    id: 'gwynedd',
    name: 'Kingdom of Gwynedd',
    alternativeNames: ['Welsh kingdoms', 'Brythonic Wales'],
    category: 'kingdom',
    start: ce(450),
    end: ce(1283),
    confidence: 'low',
    colour: '#5a9a8a',
    labelImportance: 3,
    description:
      'The most powerful of the Brythonic (Welsh) kingdoms of post-Roman Britain, in the mountainous north-west of Wales. Shown here as a stand-in for the wider Welsh polities that preserved a Brittonic Celtic identity until conquered by England in 1283.',
    sources: [
      src('Davies 1990, Patterns of Power in Early Wales'),
      src('Charles-Edwards 2013, Wales and the Britons 350–1064'),
    ],
    snapshots: [
      snap(ce(800).year, poly([[-5, 51.6], [-4.8, 53.4], [-3, 53.3], [-2.8, 51.9], [-4, 51.5], [-5, 51.6]]), 'low', 'Welsh Brythonic kingdoms (Gwynedd and neighbours), approximate.'),
    ],
  },
  {
    id: 'kingdom-of-alba',
    name: 'Kingdom of Alba',
    alternativeNames: ['Early Scotland'],
    category: 'kingdom',
    start: ce(900),
    end: ce(1707),
    confidence: 'medium',
    colour: '#4a6a8a',
    labelImportance: 3,
    predecessorIds: ['picts', 'dal-riata'],
    successorIds: ['united-kingdom'],
    description:
      'The kingdom formed by the union of Picts and Gaels around 900, which grew into the medieval Kingdom of Scotland. It entered a union of crowns with England in 1603 and a parliamentary union in 1707.',
    sources: [src('Woolf 2007, From Pictland to Alba')],
    snapshots: [
      snap(ce(1100).year, poly([[-5.5, 55.2], [-3, 55.5], [-2, 56], [-2.5, 57.5], [-4, 58.6], [-5.5, 58], [-6, 56.5], [-5.5, 55.2]]), 'medium', 'Medieval Scotland, approximate.'),
    ],
  },
  {
    id: 'wessex',
    name: 'Wessex',
    alternativeNames: ['West Saxons'],
    category: 'kingdom',
    start: ce(519),
    end: ce(927),
    confidence: 'low',
    colour: '#b0704a',
    labelImportance: 2,
    successorIds: ['kingdom-of-england'],
    description:
      'The kingdom of the West Saxons in southern England. Under Alfred the Great and his successors it resisted the Vikings and became the nucleus from which a unified Kingdom of England was created in 927.',
    sources: [src('Yorke 1995, Wessex in the Early Middle Ages')],
    snapshots: [
      snap(ce(800).year, poly([[-5.5, 50], [-1.5, 50.6], [-1, 51.4], [-3, 51.6], [-4.5, 51.1], [-5.5, 50.3], [-5.5, 50]]), 'low', 'West Saxon kingdom south of the Thames, approximate.'),
    ],
  },
  {
    id: 'mercia',
    name: 'Mercia',
    category: 'kingdom',
    start: ce(527),
    end: ce(918),
    confidence: 'low',
    colour: '#a8804a',
    labelImportance: 2,
    successorIds: ['kingdom-of-england'],
    description:
      'The Anglo-Saxon kingdom of the English Midlands, dominant in the 7th–8th centuries under kings such as Offa (of Offa’s Dyke) before being eclipsed by Wessex.',
    sources: [src('Zaluckyj 2001, Mercia: The Anglo-Saxon Kingdom of Central England')],
    snapshots: [
      snap(ce(750).year, poly([[-3, 52], [-0.5, 52], [0, 53], [-2, 53.3], [-3, 52.9], [-3, 52]]), 'low', 'Midland kingdom of Mercia, approximate.'),
    ],
  },
  {
    id: 'northumbria',
    name: 'Northumbria',
    category: 'kingdom',
    start: ce(604),
    end: ce(954),
    confidence: 'low',
    colour: '#8a6a4a',
    labelImportance: 2,
    description:
      'The northern Anglian kingdom, formed from Bernicia and Deira, stretching from the Humber toward the Firth of Forth. A centre of learning (Lindisfarne, Bede) before Viking incursions fragmented it.',
    sources: [src('Rollason 2003, Northumbria 500–1100')],
    snapshots: [
      snap(ce(700).year, poly([[-3, 53.7], [-0.5, 53.8], [-1.5, 55.8], [-3, 55.6], [-3, 53.7]]), 'low', 'Anglian Northumbria between the Humber and the Forth, approximate.'),
    ],
  },
  {
    id: 'east-anglia',
    name: 'East Anglia',
    category: 'kingdom',
    start: ce(571),
    end: ce(918),
    confidence: 'low',
    colour: '#9a8a5a',
    labelImportance: 1,
    description:
      'The Anglo-Saxon kingdom of the East Angles (the North and South Folk), famed for the Sutton Hoo ship burial. It fell under Viking control before its absorption into England.',
    sources: [src('Hoggett 2010, The Archaeology of the East Anglian Conversion')],
    snapshots: [
      snap(ce(700).year, poly([[0, 52], [1.75, 52.4], [1.5, 53], [0.2, 52.9], [0, 52]]), 'low', 'Kingdom of the East Angles, approximate.'),
    ],
  },
  {
    id: 'kent',
    name: 'Kingdom of Kent',
    alternativeNames: ['Cantia'],
    category: 'kingdom',
    start: ce(455),
    end: ce(871),
    confidence: 'low',
    colour: '#a89a5a',
    labelImportance: 1,
    description:
      'The Jutish kingdom of the south-eastern corner of England, where Augustine’s mission of 597 re-established Christianity among the Anglo-Saxons at Canterbury.',
    sources: [src('Brooks 1984, The Early History of the Church of Canterbury')],
    snapshots: [
      snap(ce(650).year, poly([[0.3, 51], [1.45, 51.1], [1.2, 51.5], [0.3, 51.45], [0.3, 51]]), 'low', 'Jutish kingdom of Kent, approximate.'),
    ],
  },
];
