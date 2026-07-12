import type { HistoricalEntity } from '../../types';
import { bce, mpoly, poly, snap, src } from '../helpers';

/**
 * Deeper human origins and the major Neolithic/Chalcolithic archaeological
 * cultures of Eurasia, East Asia and the Americas.
 *
 * Note on the timeline floor: the app's slider begins at 300,000 BCE. Entities
 * whose ranges lie mostly before that (Homo erectus, heidelbergensis,
 * Denisovans, and especially the australopithecines) are included for
 * reference and search, but only the portion overlapping the window is drawn.
 */
export const PREHISTORY_ENTITIES: HistoricalEntity[] = [
  {
    id: 'australopithecus',
    name: 'Australopithecus afarensis',
    alternativeNames: ['Australopithecines', '“Lucy”'],
    category: 'hominin-species',
    start: bce(3_900_000),
    end: bce(2_900_000),
    confidence: 'low',
    colour: '#8a7040',
    labelImportance: 2,
    description:
      'An early bipedal hominin of eastern Africa (the species of the famous “Lucy” skeleton), among the ancestors or close relatives of the genus Homo. Its range lies far beyond the left edge of this timeline (~3–4 million years ago), so it is included here for reference rather than shown on the map.',
    sources: [src('Johanson & Edey 1981, Lucy: The Beginnings of Humankind')],
    snapshots: [
      snap(bce(3_200_000).year, poly([[36, 4], [40, 8], [42, 11], [40, 6], [37, 2], [35, 0], [36, 4]]), 'low', 'East African Rift, schematic; predates the timeline window.'),
    ],
  },
  {
    id: 'homo-erectus',
    name: 'Homo erectus',
    category: 'hominin-species',
    start: bce(1_800_000),
    end: bce(110_000),
    confidence: 'low',
    colour: '#9a7848',
    labelImportance: 3,
    description:
      'A long-lived, wide-ranging early human, the first hominin known to have spread out of Africa across Asia (Java Man, Peking Man) and to have used fire. Only the tail of its ~1.9-million-year span reaches into this timeline.',
    sources: [src('Antón 2003, Yearbook of Physical Anthropology 46')],
    snapshots: [
      snap(bce(300_000).year, mpoly(
        [[16, -2], [34, 8], [44, 12], [40, -8], [24, -18], [14, -6], [16, -2]],
        [[38, 12], [60, 30], [80, 32], [100, 30], [118, 40], [122, 30], [110, 18], [95, 8], [75, 8], [55, 14], [40, 8], [38, 12]],
      ), 'low', 'Africa and southern/eastern Asia, a schematic envelope of find-spots.'),
    ],
  },
  {
    id: 'homo-heidelbergensis',
    name: 'Homo heidelbergensis',
    category: 'hominin-species',
    start: bce(700_000),
    end: bce(200_000),
    confidence: 'low',
    colour: '#8a6a48',
    labelImportance: 2,
    description:
      'A hominin of Africa and Europe often regarded (though the classification is disputed) as a common ancestor of Neanderthals and modern humans. Only the end of its span falls within the timeline.',
    sources: [src('Rightmire 2008, Evolutionary Anthropology 17')],
    snapshots: [
      snap(bce(300_000).year, mpoly(
        [[-8, 36], [4, 44], [16, 48], [30, 47], [40, 42], [30, 33], [14, 34], [0, 35], [-8, 36]],
        [[-10, 8], [16, 12], [34, 10], [28, -6], [14, -10], [-4, 2], [-10, 8]],
      ), 'low', 'Europe and Africa, schematic envelope.'),
    ],
  },
  {
    id: 'denisovans',
    name: 'Denisovans',
    category: 'hominin-species',
    start: bce(300_000),
    end: bce(50_000),
    confidence: 'low',
    colour: '#7a6a90',
    labelImportance: 2,
    description:
      'An archaic human population known chiefly from DNA and a few fossils in Siberia and Tibet, whose genetic traces survive in present-day East Asian and especially Melanesian peoples — implying a range across much of Asia. The mapped range is inferred, not observed.',
    sources: [src('Reich et al. 2010, Nature 468:1053–1060', 'https://doi.org/10.1038/nature09710')],
    snapshots: [
      snap(bce(120_000).year, poly([[70, 60], [95, 62], [120, 58], [130, 48], [122, 36], [105, 30], [88, 30], [78, 40], [72, 50], [70, 60]]), 'low', 'Inferred Central/East Asian range from genetic and fossil evidence.'),
    ],
  },
  {
    id: 'yamnaya',
    name: 'Yamnaya culture',
    category: 'archaeological-culture',
    start: bce(3300),
    end: bce(2600),
    confidence: 'medium',
    colour: '#8a8b5a',
    labelImportance: 3,
    description:
      'A pastoralist culture of the Pontic–Caspian steppe associated with early horse use, wheeled vehicles and the spread of Indo-European languages into Europe and Asia.',
    sources: [src('Anthony 2007, The Horse, the Wheel, and Language')],
    snapshots: [
      snap(bce(3000).year, poly([[28, 44], [40, 46], [52, 48], [56, 46], [50, 44], [40, 45], [30, 45], [28, 44]]), 'medium', 'Pontic–Caspian steppe, approximate.'),
    ],
  },
  {
    id: 'corded-ware',
    name: 'Corded Ware culture',
    category: 'archaeological-culture',
    start: bce(2900),
    end: bce(2350),
    confidence: 'medium',
    colour: '#7d8b5a',
    labelImportance: 2,
    description:
      'A widespread Chalcolithic culture of northern and central Europe, closely linked to the steppe expansion and the genetic transformation of the European population.',
    sources: [src('Kristiansen et al. 2017, Antiquity 91')],
    snapshots: [
      snap(bce(2700).year, poly([[5, 48], [10, 52], [18, 55], [30, 56], [32, 52], [24, 50], [14, 49], [7, 48], [5, 48]]), 'medium', 'Northern and central European range, approximate.'),
    ],
  },
  {
    id: 'bell-beaker',
    name: 'Bell Beaker culture',
    category: 'archaeological-culture',
    start: bce(2800),
    end: bce(1800),
    confidence: 'medium',
    colour: '#9a8b4a',
    labelImportance: 2,
    description:
      'A late Neolithic/early Bronze Age phenomenon marked by distinctive bell-shaped pots, spread across western Europe from Iberia to Britain and central Europe.',
    sources: [src('Harrison 1980, The Beaker Folk')],
    snapshots: [
      snap(bce(2400).year, mpoly(
        [[-9, 37], [-2, 43], [4, 48], [8, 50], [6, 52], [0, 51], [-4, 48], [-9, 40], [-9, 37]],
        [[-6, 50], [-2, 53], [0, 55], [-4, 55], [-6, 52], [-6, 50]],
      ), 'medium', 'Western Europe, Iberia and Britain, approximate.'),
    ],
  },
  {
    id: 'jomon',
    name: 'Jōmon culture',
    category: 'archaeological-culture',
    start: bce(14_000),
    end: bce(300),
    confidence: 'medium',
    colour: '#6a8b6a',
    labelImportance: 3,
    description:
      'A long-lived hunter-gatherer culture of the Japanese archipelago, among the earliest in the world to make pottery, sustaining a complex sedentary society without agriculture.',
    sources: [src('Habu 2004, Ancient Jomon of Japan')],
    snapshots: [
      snap(bce(4000).year, poly([[130, 31], [135, 35], [140, 37], [141, 41], [143, 44], [141, 38], [137, 35], [132, 32], [130, 31]]), 'medium', 'Japanese archipelago, approximate.'),
    ],
  },
  {
    id: 'yangshao',
    name: 'Yangshao culture',
    category: 'archaeological-culture',
    start: bce(5000),
    end: bce(3000),
    confidence: 'medium',
    colour: '#b0904a',
    labelImportance: 2,
    description:
      'A Neolithic millet-farming culture of the middle Yellow River, known for its painted pottery, a foundational tradition of early Chinese civilisation.',
    sources: [src('Liu & Chen 2012, The Archaeology of China')],
    snapshots: [
      snap(bce(4000).year, poly([[106, 33], [112, 35], [116, 36], [114, 38], [109, 37], [106, 35], [106, 33]]), 'medium', 'Middle Yellow River valley, approximate.'),
    ],
  },
  {
    id: 'longshan',
    name: 'Longshan culture',
    category: 'archaeological-culture',
    start: bce(3000),
    end: bce(1900),
    confidence: 'medium',
    colour: '#a8843a',
    labelImportance: 2,
    description:
      'A late Neolithic culture of the middle and lower Yellow River, marked by walled towns and fine black pottery, on the threshold of the earliest Chinese states.',
    sources: [src('Liu & Chen 2012, The Archaeology of China')],
    snapshots: [
      snap(bce(2400).year, poly([[110, 34], [116, 35], [120, 37], [118, 39], [112, 38], [110, 36], [110, 34]]), 'medium', 'Middle and lower Yellow River, approximate.'),
    ],
  },
  {
    id: 'clovis',
    name: 'Clovis culture',
    category: 'archaeological-culture',
    start: bce(11_500),
    end: bce(10_800),
    confidence: 'low',
    colour: '#8b8b5a',
    labelImportance: 2,
    description:
      'An early Palaeo-Indian culture of North America, defined by distinctive fluted stone points, once thought to represent the first Americans (a view now revised by earlier sites).',
    sources: [src('Meltzer 2009, First Peoples in a New World')],
    snapshots: [
      snap(bce(11_000).year, poly([[-120, 32], [-100, 30], [-85, 32], [-75, 38], [-85, 45], [-105, 48], [-120, 42], [-122, 36], [-120, 32]]), 'low', 'Broad North American distribution of Clovis finds, schematic.'),
    ],
  },
];
