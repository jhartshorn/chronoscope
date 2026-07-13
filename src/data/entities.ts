import type { HistoricalEntity } from '../types';
import type { Ring } from './helpers';
import { bce, ce, mpoly, poly, snap, src } from './helpers';
import {
  AFRICA,
  AUSTRALIA,
  EUROPE,
  NEW_GUINEA,
  NORTH_ASIA,
  SOUTH_ASIA_BAND,
} from './outlines';
import * as MED from './geo/mediterranean';

/**
 * Representative starter dataset of historical entities.
 *
 * Every geometry is an explicit, coarse historical interpretation. Modern
 * states reference Natural Earth country polygons so their coastlines match
 * the basemap. Confidence and notes record uncertainty; sources are given
 * per entity. This is a demonstration of the architecture, NOT a complete
 * or authoritative historical atlas — see docs/METHODOLOGY.md.
 */
/**
 * The German Empire 1871–1918: Alsace-Lorraine in the west, northern
 * Schleswig up to the 1864 Kongeå line, and the eastern provinces — West
 * Prussia, Posen, Silesia, East Prussia with Memel — on the frontier with
 * Russian Poland and Austrian Galicia.
 */
const GERMAN_EMPIRE: Ring = [
  [6, 50.75], [6.15, 51.5], [6.75, 51.9], [7.05, 52.35], [6.7, 52.6], [7, 53.3], [7.2, 53.7], // Dutch frontier
  [8.5, 54], [8.6, 55.28], // North Sea coast to the 1864 line south of Ribe
  [9.5, 55.35], [9.65, 55.2], // Danish frontier (northern Schleswig German until 1920)
  [9.75, 54.85], [10, 54.6], [10.9, 54.1], [12.1, 54.3], [12.9, 54.55], [13.8, 54.75],
  [14.5, 54.5], [16, 54.7], [17.5, 54.85], [18.5, 54.5], [19.6, 54.8], [20.9, 55.05], [21.1, 55.8], // Baltic coast: Pomerania, Danzig, Sambia, Memel
  [22.1, 55.1], [22.85, 54.9], [22.9, 54.35], // Russian frontier on the Neman
  [22, 53.55], [20.5, 53.5], [19.7, 53.2], // Masuria
  [19.4, 52.7], [18.9, 52.4], [18.5, 52.1], [18.1, 51.7], [18.35, 51.2],
  [18.7, 50.9], [19, 50.6], [19.15, 50.2], // West Prussia, Posen and Silesia against Russian Poland (Kattowitz German)
  [18.5, 49.95], [17.7, 50.3], [16.8, 50.2], [16.4, 50.6], [15.3, 50.8], [14.82, 50.87], // Austrian frontier (Galicia and Bohemia)
  [14.3, 50.9], [13.5, 50.65], [13, 50.5], [12.35, 50.25], [12.1, 50.32], // Erzgebirge
  [12.55, 49.9], [13, 49.3], [13.8, 48.77], [13.5, 48.58], // Bavarian–Bohemian frontier
  [12.9, 47.72], [12.2, 47.7], [11, 47.4], [10.45, 47.4], [9.75, 47.55], // Austrian frontier (Alps)
  [8.55, 47.6], [7.6, 47.55], // Swiss frontier
  [7, 47.6], [6.85, 48], [6.6, 48.4], [6.4, 48.9], [5.9, 49.25],
  [6.2, 49.6], [6.35, 49.85], [6.1, 50.1], // French frontier along the Vosges (Alsace-Lorraine German)
];

/**
 * Weimar/early-Nazi Germany 1920–37 after Versailles: Alsace-Lorraine,
 * northern Schleswig, Posen, the corridor, eastern Upper Silesia and Memel
 * gone. The Polish frontier mirrors POLAND_INTERWAR (regions/modernstates.ts)
 * so the two tile cleanly. East Prussia is the separate exclave below.
 */
const GERMANY_INTERWAR_MAIN: Ring = [
  [6, 50.75], [6.15, 51.5], [6.75, 51.9], [7.05, 52.35], [6.7, 52.6], [7, 53.3], [7.2, 53.7], // Dutch frontier
  [8.5, 54], [8.6, 54.9], // North Sea coast to the 1920 plebiscite line
  [9.4, 54.85], [10, 54.5], [10.9, 54.1], [12.1, 54.3], [12.9, 54.55], [13.8, 54.75],
  [14.5, 54.5], [16, 54.7], [17.3, 54.85], // Baltic coast of Pomerania
  [17.5, 54], [16.9, 53.5], [16, 52.8], [15.8, 52.3], [16.4, 52.1], [16.5, 51.6],
  [17.6, 51.2], [18.1, 51], [18.3, 50.7], [18.55, 50.45], [18.85, 49.95], // Polish frontier (Versailles)
  [17.7, 50.3], [16.8, 50.2], [16.4, 50.6], [15.3, 50.8], [14.82, 50.87], // Czechoslovak frontier (Silesia)
  [14.3, 50.9], [13.5, 50.65], [13, 50.5], [12.35, 50.25], [12.1, 50.32], // Erzgebirge
  [12.55, 49.9], [13, 49.3], [13.8, 48.77], [13.5, 48.58], // Bavarian–Czechoslovak frontier
  [12.9, 47.72], [12.2, 47.7], [11, 47.4], [10.45, 47.4], [9.75, 47.55], // Austrian frontier
  [8.55, 47.6], [7.6, 47.55], [7.7, 48.2], [7.85, 48.65], [8.2, 48.97], [6.85, 49.2],
  [6.4, 49.47], [6.15, 50], // Swiss frontier, then the Rhine and French frontiers
];

/** East Prussia 1920–39: an exclave beyond the corridor, without Memel (Lithuanian from 1923). */
const EAST_PRUSSIA_INTERWAR: Ring = [
  [19.1, 54.5], [19.6, 54.8], [20.9, 55.05], [21.25, 55.28], // Baltic coast to the Memel territory
  [22.2, 55.05], [22.8, 54.9], [22.9, 54.35], // Lithuanian frontier on the Neman
  [22, 53.55], [20.5, 53.5], [19.8, 53.6], [19.5, 54.1], [18.9, 54.35], // Polish frontier (Masuria German)
];

/**
 * The Federal Republic 1949–90. The eastern edge mirrors the GDR's inner
 * German border (see regions/europe.ts) so the two states tile cleanly.
 */
const WEST_GERMANY: Ring = [
  [6, 50.75], [6.15, 51.5], [6.75, 51.9], [7.05, 52.35], [6.7, 52.6], [7, 53.3], [7.2, 53.7], // Dutch frontier
  [8.5, 54], [8.6, 54.9], // North Sea coast to the Danish frontier
  [9.4, 54.85], [10, 54.5], [10.9, 54.1], // Baltic coast
  [10.75, 53.75], [10.85, 53.35], [11.3, 53.1], [11.5, 52.95], [10.95, 52.85],
  [10.7, 52.4], [10.95, 52.05], [10.65, 51.9], [10.2, 51.6], [9.95, 51.35],
  [10.1, 50.95], [10, 50.55], [10.7, 50.65], [11.3, 50.55], [11.5, 50.4],
  [11.9, 50.42], [12.1, 50.32], // inner German border
  [12.55, 49.9], [13, 49.3], [13.8, 48.77], [13.5, 48.58], // Bavarian–Czechoslovak frontier
  [12.9, 47.72], [12.2, 47.7], [11, 47.4], [10.45, 47.4], [9.75, 47.55], // Austrian frontier
  [8.55, 47.6], [7.6, 47.55], [7.7, 48.2], [7.85, 48.65], [8.2, 48.97], [6.85, 49.2],
  [6.4, 49.47], [6.15, 50], // Swiss frontier, then the Rhine and French frontiers
];

// --- Modern-successor geometry (see the ten key empires' successors below) ---
/** The island of Great Britain (England, Wales, Scotland), coarse. */
const GREAT_BRITAIN: Ring = [
  [-5.2, 50], [-3.5, 50.2], [-2.5, 50.6], [0, 50.8], [1.5, 51], [1.4, 52.9],
  [0.3, 53.6], [-0.2, 54.7], [-1.4, 55.6], [-2, 56.5], [-2.5, 57.5], [-3, 58.6],
  [-5, 58.5], [-5.8, 57.3], [-4.6, 56.6], [-5.6, 55.4], [-4.8, 54.9], [-3.6, 54.6],
  [-4.2, 53.4], [-4.8, 52.9], [-4.3, 52.2], [-5.3, 51.6], [-4, 51.3], [-5.2, 50],
];
/**
 * The Kingdom of England, c. 950: to the Tweed in the north-east but without
 * British-held Cumbria; Wales beyond the Dee–Wye border strip is separate.
 */
const ENGLAND_950: Ring = [
  [-5.8, 49.95], [-5.1, 50.05], [-4.2, 50.35], [-3.5, 50.55], [-2.5, 50.5],
  [-1.3, 50.6], [0.2, 50.75], [1.35, 51.1], [1.45, 51.4], [1.3, 51.8],
  [1.75, 52.5], [1.7, 52.9], [0.9, 53.0], [0.35, 53.2], [0.0, 53.65],
  [-0.1, 54.1], [-0.6, 54.5], [-1.2, 54.65], [-1.4, 55.0], [-2.0, 55.77],
  [-2.5, 55.35], [-2.9, 55.15], [-2.6, 54.9], [-2.7, 54.4], [-3.05, 54.05],
  [-3.0, 53.7], [-3.1, 53.4], [-3.2, 53.3], [-3.05, 52.9], [-3.15, 52.5],
  [-3.0, 52.1], [-2.75, 51.9], [-2.65, 51.65], [-3.0, 51.3], [-3.8, 51.2],
  [-4.55, 51.0], [-5.1, 50.55], [-5.55, 50.15], [-5.8, 49.95],
];
/** England after 1092: Cumbria annexed, the Tweed–Solway border in place. */
const ENGLAND_1100: Ring = [
  [-5.8, 49.95], [-5.1, 50.05], [-4.2, 50.35], [-3.5, 50.55], [-2.5, 50.5],
  [-1.3, 50.6], [0.2, 50.75], [1.35, 51.1], [1.45, 51.4], [1.3, 51.8],
  [1.75, 52.5], [1.7, 52.9], [0.9, 53.0], [0.35, 53.2], [0.0, 53.65],
  [-0.1, 54.1], [-0.6, 54.5], [-1.2, 54.65], [-1.4, 55.0], [-2.0, 55.77],
  [-2.5, 55.35], [-2.9, 55.15], [-3.05, 54.98], [-3.5, 54.9], [-3.65, 54.5],
  [-3.3, 54.25], [-3.05, 54.05], [-3.0, 53.7], [-3.1, 53.4], [-3.2, 53.3],
  [-3.05, 52.9], [-3.15, 52.5], [-3.0, 52.1], [-2.75, 51.9], [-2.65, 51.65],
  [-3.0, 51.3], [-3.8, 51.2], [-4.55, 51.0], [-5.1, 50.55], [-5.55, 50.15],
  [-5.8, 49.95],
];
/** England and Wales together (after the 1282–83 conquest of Gwynedd). */
const ENGLAND_AND_WALES: Ring = [
  [-5.8, 49.95], [-5.1, 50.05], [-4.2, 50.35], [-3.5, 50.55], [-2.5, 50.5],
  [-1.3, 50.6], [0.2, 50.75], [1.35, 51.1], [1.45, 51.4], [1.3, 51.8],
  [1.75, 52.5], [1.7, 52.9], [0.9, 53.0], [0.35, 53.2], [0.0, 53.65],
  [-0.1, 54.1], [-0.6, 54.5], [-1.2, 54.65], [-1.4, 55.0], [-2.0, 55.77],
  [-2.5, 55.35], [-2.9, 55.15], [-3.05, 54.98], [-3.5, 54.9], [-3.65, 54.5],
  [-3.3, 54.25], [-3.05, 54.05], [-3.0, 53.7], [-3.1, 53.4], [-3.8, 53.35],
  [-4.75, 53.4], [-4.75, 52.8], [-4.35, 52.55], [-4.15, 52.5], [-5.35, 51.9],
  [-5.1, 51.6], [-4.35, 51.6], [-4.0, 51.55], [-3.2, 51.45], [-3.0, 51.3],
  [-3.8, 51.2], [-4.55, 51.0], [-5.1, 50.55], [-5.55, 50.15], [-5.8, 49.95],
];
/** The island of Ireland, coarse. */
const IRELAND_ISLAND: Ring = [
  [-10, 51.5], [-8, 51.6], [-6.2, 52.2], [-6, 53.3], [-6.1, 54.1], [-5.5, 54.5],
  [-7, 55.3], [-8.8, 54.5], [-10, 54.3], [-9.7, 53.2], [-9.9, 52.2], [-10, 51.5],
];
const SICILY_I: Ring = [[12, 37.5], [15.5, 37], [15.6, 38.3], [12.5, 38.2]];
const SARDINIA_I: Ring = [[8, 39], [10, 39], [9.7, 41], [9, 41.2], [8, 40.5]];
/** Kingdom of Italy 1861 — the peninsula without Venetia (and, approximately, Rome). */
const ITALY_1861: Ring = [
  [7, 44.5], [8, 45], [10, 45.5], [11.8, 45], [12, 44.2], [13, 43.5], [14.5, 42.2],
  [15.7, 41.6], [16.8, 41.1], [18.5, 40.1], [16.6, 39.9], [16, 38], [15.6, 38.2],
  [15.7, 38], [13, 38.9], [11, 42.4], [9.5, 44.2], [8, 44], [7, 44.5],
];
/** Italy after the First World War (1919) — with Trentino, Trieste and Istria. */
const ITALY_1919: Ring = [
  [7, 44.5], [8, 45], [10, 45.8], [12, 46.5], [13.6, 46.5], // the Alpine north
  [13.8, 45.9], [14.3, 45.4], [14.2, 44.7], [13.5, 44.7], [13.2, 45.2], // the Istrian peninsula
  [12.2, 45.55], [12.0, 44.8], [13, 44], [14.5, 42.2], [15.7, 41.6], [16.8, 41.1], [18.5, 40.1], // Adriatic coast
  [16.6, 39.9], [16, 38], [15.6, 38.2], [15.7, 38], // the toe
  [13, 38.9], [11, 42.4], [9.5, 44.2], [8, 44], [7, 44.5], // Tyrrhenian coast
];
/** Coarse outer boundary of the People's Republic of China (Xinjiang to Manchuria). */
const CHINA_EXTERIOR: Ring = [
  [74, 39], [80, 43], [85, 45], [91, 46], [96, 43], [100, 43], [108, 42], [112, 45],
  [120, 42], [123, 41], [126, 41], [131, 43], [134, 48], [131, 45], [125, 44],
  [122, 40], [122, 31], [121, 28], [117, 24], [110, 21], [102, 22], [98, 24],
  [92, 28], [85, 28], [80, 30], [76, 35], [74, 39],
];
/** Tibet — a hole in the 1949 PRC, filled by the 1951 annexation. */
const TIBET_HOLE: Ring = [[81, 29], [90, 28.6], [95, 31], [93, 35], [84, 35], [81, 32], [81, 29]];

export const ENTITIES: HistoricalEntity[] = [
  // ------------------------------------------------- deep prehistory (hominins)
  {
    id: 'homo-sapiens-range',
    name: 'Homo sapiens',
    category: 'hominin-species',
    start: bce(300_000),
    end: bce(3000),
    fadeYears: 2200,
    confidence: 'low',
    labelImportance: 5,
    colour: '#b5844b',
    description:
      'Anatomically modern humans. Earliest known fossils are from Jebel Irhoud, Morocco (~300 ka). The range shown is a schematic of inferred population presence, expanding out of Africa from roughly 70,000 years ago — not a mapped boundary. This deep-prehistoric range layer is deliberately faded out from around 3000 BCE, as named cultures, civilisations and states take over the map; it is not a claim that humans vanished.',
    sources: [
      src('Hublin et al. 2017, Nature 546:289–292', 'https://doi.org/10.1038/nature22336'),
      src('Bae, Douka & Petraglia 2017, Science 358', 'https://doi.org/10.1126/science.aai9067'),
    ],
    snapshots: [
      snap(bce(300_000).year, poly([[-13, 8], [10, 6], [20, 14], [15, 25], [0, 30], [-12, 22], [-13, 8]]), 'low', 'Earliest H. sapiens; African populations only, extent highly schematic.'),
      snap(bce(100_000).year, poly([[-17, -30], [-17, 20], [10, 34], [36, 30], [45, 12], [40, -10], [20, -34], [-17, -30]]), 'low', 'Pan-African range plus earliest Levantine presence.'),
      snap(bce(60_000).year, mpoly(AFRICA, [[34, 12], [60, 25], [75, 30], [90, 25], [100, 15], [90, 5], [70, 8], [45, 12], [34, 12]]), 'low', 'Out-of-Africa dispersal along southern Asia underway.'),
      snap(bce(40_000).year, mpoly(AFRICA, SOUTH_ASIA_BAND, EUROPE, AUSTRALIA, NEW_GUINEA), 'low', 'Sahul (Australia–New Guinea) settled; Europe entered.'),
      snap(bce(12_000).year, mpoly(AFRICA, SOUTH_ASIA_BAND, EUROPE, NORTH_ASIA, AUSTRALIA, NEW_GUINEA), 'low', 'Near-global range; Americas being settled (not drawn in this coarse ring).'),
      snap(bce(3000).year, mpoly(AFRICA, SOUTH_ASIA_BAND, EUROPE, NORTH_ASIA, AUSTRALIA, NEW_GUINEA), 'low', 'Near-global range as the first civilisations arise; this layer then fades in favour of named entities.'),
    ],
  },
  {
    id: 'neanderthals',
    name: 'Neanderthals',
    alternativeNames: ['Homo neanderthalensis'],
    category: 'hominin-species',
    start: bce(230_000),
    end: bce(38_000),
    confidence: 'low',
    labelImportance: 4,
    colour: '#7f6bb0',
    description:
      'Homo neanderthalensis ranged across Europe, the Near East and western/central Asia. The distribution is inferred from fossil and archaeological find-spots; the boundary is a smoothed envelope of known sites, not a territory.',
    sources: [
      src('Higham et al. 2014, Nature 512:306–309', 'https://doi.org/10.1038/nature13621'),
      src('Hublin 2009, PNAS 106:16022–16027'),
    ],
    snapshots: [
      snap(bce(120_000).year, poly([[-9, 36], [-2, 43], [8, 48], [20, 50], [35, 50], [50, 45], [60, 40], [55, 33], [40, 31], [28, 33], [12, 37], [0, 36], [-9, 36]]), 'low', 'Envelope of known Neanderthal sites at their broad maximum.'),
      snap(bce(45_000).year, poly([[-9, 36], [0, 42], [12, 46], [26, 47], [40, 44], [50, 40], [45, 34], [30, 33], [15, 36], [2, 37], [-9, 36]]), 'low', 'Contracting range as H. sapiens expands.'),
      snap(bce(40_000).year, poly([[-9, 37], [-4, 40], [2, 43], [8, 43], [4, 39], [-3, 37], [-9, 37]]), 'low', 'Final refugia, Iberia and pockets; extinction ~40–38 ka.'),
    ],
  },

  // ------------------------------------------------------- Neolithic cultures
  {
    id: 'natufian',
    name: 'Natufian culture',
    category: 'archaeological-culture',
    start: bce(13_000),
    end: bce(9500),
    confidence: 'medium',
    colour: '#8a9a5b',
    labelImportance: 3,
    description:
      'A Late Epipalaeolithic culture of the Levant, among the first to build permanent settlements before farming and associated with the transition to agriculture.',
    sources: [src('Bar-Yosef 1998, Evolutionary Anthropology 6:159–177')],
    snapshots: [
      snap(bce(12_000).year, poly([[34.2, 29.5], [36.5, 31], [38, 34], [37, 36.5], [35, 37], [33, 35], [32.5, 31.5], [34.2, 29.5]]), 'medium', 'Core Levantine distribution of Natufian sites.'),
    ],
  },
  {
    id: 'linear-pottery',
    name: 'Linear Pottery culture',
    alternativeNames: ['Linearbandkeramik', 'LBK'],
    category: 'archaeological-culture',
    start: bce(5500),
    end: bce(4500),
    confidence: 'medium',
    colour: '#6f8f4d',
    labelImportance: 3,
    description:
      'The first major farming culture of central Europe, spreading agriculture along the loess belt from the Carpathian Basin to the Paris Basin.',
    sources: [src('Bogaard 2004, Neolithic Farming in Central Europe')],
    snapshots: [
      snap(bce(5200).year, poly([[2, 48], [8, 50], [14, 51], [20, 50], [24, 48.5], [22, 46.5], [16, 46], [10, 47], [4, 47], [2, 48]]), 'medium', 'Approximate LBK distribution across the loess belt.'),
    ],
  },

  // ------------------------------------------------------- early civilisations
  {
    id: 'sumer',
    name: 'Sumer',
    category: 'civilisation',
    start: bce(4500),
    end: bce(1900),
    confidence: 'medium',
    colour: '#c98a3f',
    labelImportance: 4,
    description:
      'The earliest known urban civilisation, in southern Mesopotamia. A network of city-states (Uruk, Ur, Lagash, Eridu) rather than a single unified polity for most of its history.',
    predecessorIds: [],
    successorIds: ['akkad-babylon'],
    sources: [
      src('Van De Mieroop 2015, A History of the Ancient Near East'),
      src('Roux 1992, Ancient Iraq'),
    ],
    snapshots: [
      snap(bce(3000).year, poly([[44, 30], [46.5, 30.2], [48, 31], [47.5, 32.5], [45.5, 33], [44, 32], [43.5, 31], [44, 30]]), 'medium', 'Southern alluvial plain between the Tigris and Euphrates.'),
      snap(bce(2100).year, poly([[43.5, 30], [47, 30], [49, 31.5], [48, 34], [45, 34.5], [43, 33], [42.5, 31], [43.5, 30]]), 'medium', 'Approximate extent under the Third Dynasty of Ur.'),
    ],
  },
  {
    id: 'akkad-babylon',
    name: 'Babylonia',
    alternativeNames: ['Old Babylonian Empire'],
    category: 'kingdom',
    start: bce(1894),
    end: bce(539),
    confidence: 'medium',
    colour: '#b26a3a',
    labelImportance: 3,
    predecessorIds: ['sumer'],
    successorIds: ['achaemenid'],
    description:
      'Mesopotamian state centred on Babylon. Extent shown approximates the reach of Hammurabi (18th c. BCE); borders fluctuated greatly over its long history.',
    sources: [src('Van De Mieroop 2005, King Hammurabi of Babylon')],
    snapshots: [
      snap(bce(1750).year, poly([[42, 30], [46, 30], [49, 32], [48, 35], [44, 36], [41, 34], [40, 31], [42, 30]]), 'medium', 'Hammurabi-era Babylonia, approximate.'),
    ],
  },
  {
    id: 'ancient-egypt',
    name: 'Ancient Egypt',
    category: 'civilisation',
    start: bce(3100),
    end: bce(332),
    confidence: 'medium',
    colour: '#d4a13a',
    labelImportance: 5,
    successorIds: ['ptolemaic-egypt'],
    description:
      'Pharaonic Egypt: a civilisation along the lower Nile spanning three millennia and many political systems, conventionally divided into the Old, Middle and New Kingdoms (with intermediate periods of fragmentation). The snapshots here track those broad phases; territory follows the Nile valley and delta, reaching into Nubia and the Levant at the New Kingdom peak, before Alexander’s conquest (332 BCE) and the Hellenistic Ptolemaic Kingdom.',
    sources: [
      src('Shaw (ed.) 2000, The Oxford History of Ancient Egypt'),
      src('Wilkinson 2010, The Rise and Fall of Ancient Egypt'),
    ],
    snapshots: [
      snap(bce(2600).year, poly([[30, 24], [33, 24], [33.5, 27], [32, 30], [31, 31.5], [30, 31], [29.5, 28], [30, 24]]), 'medium', 'Old Kingdom: Nile valley and delta.'),
      snap(bce(1250).year, poly([[30, 20], [34, 20], [36, 27], [35, 31], [33, 32], [31, 31.5], [30, 29], [29, 25], [30, 20]]), 'medium', 'New Kingdom peak: south into Nubia, north into the Levant.'),
      snap(bce(500).year, poly([[29.5, 22], [33, 22], [34, 27], [32.5, 31], [31, 31.5], [30, 30], [29, 26], [29.5, 22]]), 'medium', 'Late Period, reduced extent.'),
    ],
  },
  {
    id: 'ptolemaic-egypt',
    name: 'Ptolemaic Kingdom',
    alternativeNames: ['Ptolemaic Egypt', 'Hellenistic Egypt'],
    category: 'kingdom',
    start: bce(305),
    end: bce(30),
    confidence: 'medium',
    colour: '#c9903a',
    labelImportance: 4,
    predecessorIds: ['ancient-egypt'],
    successorIds: ['roman-empire'],
    description:
      'The Hellenistic Greek dynasty founded by Ptolemy I, a general of Alexander the Great, ruling Egypt from Alexandria. It ended with the death of Cleopatra VII and Roman annexation in 30 BCE. At its height it also held Cyrenaica, Cyprus and coastal Levantine possessions.',
    sources: [
      src('Hölbl 2001, A History of the Ptolemaic Empire'),
      src('Bowman 1986, Egypt after the Pharaohs'),
    ],
    snapshots: [
      snap(bce(270).year, mpoly(
        [[24, 31], [30, 31.5], [34, 32], [35, 30], [34, 25], [33, 22], [31, 22], [29, 24], [27, 28], [24, 31]],
        [[20, 33], [24, 33], [24, 31], [20, 31], [20, 33]],
      ), 'medium', 'Egypt, Cyrenaica and outlying Aegean/Levantine holdings, approximate.'),
      snap(bce(50).year, poly([[24, 31], [30, 31.5], [34, 31], [34, 25], [33, 22], [31, 22], [29, 24], [27, 28], [24, 31]]), 'medium', 'Reduced to the Nile core in Cleopatra’s reign.'),
    ],
  },
  {
    id: 'indus-valley',
    name: 'Indus Valley Civilisation',
    alternativeNames: ['Harappan Civilisation'],
    category: 'civilisation',
    start: bce(3300),
    end: bce(1300),
    confidence: 'medium',
    colour: '#b98a4e',
    labelImportance: 4,
    description:
      'A Bronze Age urban civilisation of the north-western Indian subcontinent, with planned cities such as Mohenjo-daro and Harappa, standardised weights, and sophisticated drainage. It declined in the early 2nd millennium BCE. Its script remains undeciphered and its language and ethnic makeup are unknown.',
    sources: [
      src('Possehl 2002, The Indus Civilization'),
      src('Wright 2010, The Ancient Indus'),
    ],
    snapshots: [
      snap(bce(2500).year, poly([[66, 24], [68, 27], [71, 29], [74, 31], [77, 30], [76, 27], [74, 24], [72, 21], [70, 22], [67, 23], [66, 24]]), 'medium', 'Mature Harappan extent across the Indus basin and Gujarat, approximate.'),
    ],
  },
  {
    id: 'ancient-greece',
    name: 'Ancient Greece',
    alternativeNames: ['Hellas', 'Classical Greece'],
    category: 'civilisation',
    start: bce(800),
    end: bce(146),
    confidence: 'medium',
    colour: '#4a86a8',
    labelImportance: 4,
    successorIds: ['roman-republic'],
    description:
      'The classical Greek world: a network of independent city-states (poleis) such as Athens, Sparta, Corinth and Thebes, together with colonies around the Mediterranean and Black Sea (Magna Graecia in southern Italy and Sicily, the Ionian coast of Anatolia). Not a single state; a shared language, religion and culture. Roman conquest is conventionally dated to 146 BCE.',
    sources: [
      src('Pomeroy et al. 2011, Ancient Greece: A Political, Social, and Cultural History'),
      src('Hornblower 2011, The Greek World 479–323 BC'),
    ],
    snapshots: [
      snap(bce(450).year, mpoly(
        [[20, 37], [20, 40], [23, 41], [26, 41], [28, 40], [27, 37], [23, 36], [20, 37]],
        [[12, 37], [16, 38], [18, 40], [16, 41], [14, 40], [12, 38], [12, 37]],
      ), 'medium', 'Aegean heartland plus Magna Graecia (S. Italy, Sicily); colonies elsewhere not all drawn.'),
    ],
  },
  {
    id: 'celts',
    name: 'Celtic peoples',
    alternativeNames: ['Celts', 'La Tène culture'],
    category: 'people',
    start: bce(800),
    end: ce(100),
    confidence: 'low',
    colour: '#5a9a6d',
    labelImportance: 3,
    description:
      'A broad group of peoples of Iron Age Europe sharing related Celtic languages and the Hallstatt and La Tène material cultures, spread across Gaul, the British Isles, the Alpine region, Iberia and into Anatolia (Galatia). This is a diffuse cultural-linguistic range inferred from archaeology and classical accounts, not a unified polity or a single ethnic identity.',
    sources: [
      src('Cunliffe 2018, The Ancient Celts (2nd ed.)'),
      src('Koch 2006, Celtic Culture: A Historical Encyclopedia'),
    ],
    snapshots: [
      snap(bce(300).year, mpoly(
        [[-9, 43], [-5, 48], [0, 50], [6, 50], [12, 49], [17, 48], [19, 46], [15, 44], [8, 44], [2, 43], [-6, 42], [-9, 43]],
        [[-10, 51], [-6, 55], [-3, 58], [1, 55], [0, 51], [-5, 50], [-10, 51]],
      ), 'low', 'Approximate La Tène-era Celtic range; a cultural envelope, not a border.'),
    ],
  },

  // ----------------------------------------------------------------- empires
  {
    id: 'achaemenid',
    name: 'Achaemenid Empire',
    alternativeNames: ['First Persian Empire'],
    category: 'empire',
    start: bce(550),
    end: bce(330),
    confidence: 'medium',
    colour: '#c0554f',
    labelImportance: 5,
    predecessorIds: ['akkad-babylon'],
    description:
      'The first Persian empire, founded by Cyrus the Great; at its height under Darius I it stretched from the Balkans and Egypt to the Indus. Boundaries are provincial and approximate.',
    sources: [
      src('Briant 2002, From Cyrus to Alexander'),
      src('Kuhrt 2007, The Persian Empire'),
    ],
    snapshots: [
      snap(bce(550).year, poly([[46, 28], [52, 34], [58, 38], [62, 33], [60, 27], [54, 25], [48, 26], [46, 28]]), 'medium', 'Cyrus the Great overthrows the Medes (550 BCE): the Persian–Median core on the Iranian plateau.'),
      snap(bce(540).year, poly([[26, 37], [34, 40], [44, 40], [55, 40], [62, 36], [64, 30], [56, 25], [46, 25], [40, 30], [34, 34], [28, 36], [26, 37]]), 'medium', 'After Cyrus conquers Lydia (546) and Babylon (539): Anatolia and Mesopotamia added.'),
      snap(bce(522).year, poly([[26, 37], [34, 40], [44, 40], [55, 42], [66, 40], [70, 32], [64, 26], [55, 23], [46, 22], [38, 18], [30, 24], [27, 31], [26, 34], [26, 37]]), 'medium', 'Cambyses adds Egypt (525 BCE); the empire reaches from Anatolia to the Indus approaches.'),
      snap(bce(500).year, poly([[24, 40], [40, 46], [55, 46], [66, 42], [73, 33], [70, 25], [58, 24], [48, 24], [43, 15], [32, 22], [26, 30], [22, 36], [24, 40]]), 'medium', 'Maximum extent under Darius I: from Thrace and Egypt to the Indus.'),
      snap(bce(400).year, poly([[24, 40], [40, 46], [55, 46], [66, 42], [73, 33], [70, 25], [58, 24], [48, 24], [44, 20], [40, 24], [33, 30], [26, 34], [24, 37], [24, 40]]), 'medium', 'Egypt breaks away (404 BCE); the empire otherwise holds together.'),
      snap(bce(340).year, poly([[24, 40], [40, 46], [55, 46], [66, 42], [73, 33], [70, 25], [58, 24], [48, 24], [43, 15], [32, 22], [26, 30], [22, 36], [24, 40]]), 'medium', 'Artaxerxes III reconquers Egypt (343 BCE), briefly restoring the full empire before Alexander.'),
    ],
  },
  {
    id: 'roman-republic',
    name: 'Roman Republic',
    category: 'republic',
    start: bce(509),
    end: bce(27),
    confidence: 'medium',
    colour: '#8a3d3d',
    labelImportance: 4,
    predecessorIds: ['ancient-greece'],
    successorIds: ['roman-empire'],
    description:
      'The Roman state before the Principate. Territory grew from central Italy to command of the Mediterranean by the late 1st c. BCE.',
    sources: [src('Beard 2015, SPQR: A History of Ancient Rome'), src('Cornell 1995, The Beginnings of Rome')],
    snapshots: [
      snap(bce(509).year, poly(MED.ROME_509), 'low', 'The infant Republic, c. 509 BCE: the city of Rome and a small territory along the Tiber in Latium.'),
      snap(bce(338).year, poly(MED.LATIUM_338), 'medium', 'After the Latin War (338 BCE): Rome dominates Latium and northern Campania.'),
      snap(bce(300).year, poly(MED.ITALY_CENTRAL), 'medium', 'Roman-controlled central Italy, c. 300 BCE.'),
      snap(bce(270).year, poly(MED.ITALY), 'medium', 'Rome master of the whole Italian peninsula by 270 BCE.'),
      snap(bce(238).year, mpoly(MED.ITALY, MED.SICILY, MED.SARDINIA_CORSICA), 'medium', 'After the First Punic War: Sicily, then Sardinia and Corsica, become Rome’s first overseas provinces.'),
      snap(bce(200).year, mpoly(MED.ITALY, MED.SICILY, MED.SARDINIA_CORSICA, MED.HISPANIA_E), 'medium', 'After the Second Punic War (201 BCE): the eastern and southern coasts of Hispania are taken from Carthage.'),
      snap(bce(146).year, mpoly(MED.ITALY, MED.SICILY, MED.SARDINIA_CORSICA, MED.HISPANIA_E, MED.GREECE, MED.AFRICA_PROC), 'medium', 'In 146 BCE both Carthage and Corinth are destroyed: Africa and Macedonia/Greece become provinces.'),
      snap(bce(100).year, mpoly(MED.ITALY, MED.SICILY, MED.SARDINIA_CORSICA, MED.HISPANIA_E, MED.GREECE, MED.AFRICA_PROC, MED.NARBONENSIS, MED.ANATOLIA_W), 'medium', 'By 100 BCE: southern Gaul (Narbonensis) and the province of Asia in western Anatolia are added.'),
      snap(bce(63).year, mpoly(MED.ITALY, MED.SICILY, MED.SARDINIA_CORSICA, MED.HISPANIA_E, MED.GREECE, MED.AFRICA_PROC, MED.NARBONENSIS, MED.ANATOLIA, MED.LEVANT), 'medium', 'Pompey’s eastern settlement (63 BCE) brings Syria and the rest of Anatolia under Roman control.'),
      snap(bce(44).year, mpoly(MED.IBERIA, MED.GAUL, MED.NARBONENSIS, MED.ITALY, MED.SICILY, MED.SARDINIA_CORSICA, MED.NAFRICA, MED.GREECE, MED.BALKANS, MED.ANATOLIA, MED.LEVANT), 'medium', 'By Caesar’s death (44 BCE): the conquest of all Gaul completes Rome’s command of the western and central Mediterranean.'),
    ],
  },
  {
    id: 'roman-empire',
    name: 'Roman Empire',
    alternativeNames: ['Imperium Romanum'],
    category: 'empire',
    start: bce(27),
    end: ce(476),
    confidence: 'medium',
    colour: '#a24444',
    labelImportance: 5,
    predecessorIds: ['roman-republic', 'ptolemaic-egypt'],
    successorIds: ['holy-roman-empire'],
    description:
      'The Roman state under the emperors. Shown near its territorial maximum under Trajan (117 CE) and again reduced in the west before 476 CE.',
    sources: [
      src('Talbert (ed.) 2000, Barrington Atlas of the Greek and Roman World'),
      src('Goldsworthy 2009, How Rome Fell'),
    ],
    snapshots: [
      snap(bce(27).year, mpoly(MED.IBERIA, MED.GAUL, MED.NARBONENSIS, MED.ITALY, MED.NAFRICA, MED.CYRENAICA, MED.EGYPT, MED.BALKANS, MED.GREECE, MED.ANATOLIA, MED.LEVANT), 'medium', 'The Augustan settlement, 27 BCE: the Mediterranean rim, but not yet Britain, Dacia or Mesopotamia.'),
      snap(ce(68).year, mpoly(MED.IBERIA, MED.GAUL, MED.NARBONENSIS, MED.BRITANNIA, MED.ITALY, MED.NAFRICA, MED.CYRENAICA, MED.EGYPT, MED.BALKANS, MED.THRACE, MED.GREECE, MED.ANATOLIA, MED.LEVANT), 'medium', 'By 68 CE, Roman Britain (conquered from 43 CE), Mauretania and Thrace have been added.'),
      snap(ce(117).year, mpoly(MED.IBERIA, MED.GAUL, MED.NARBONENSIS, MED.BRITANNIA, MED.ITALY, MED.NAFRICA, MED.CYRENAICA, MED.EGYPT, MED.BALKANS, MED.THRACE, MED.GREECE, MED.ANATOLIA, MED.LEVANT, MED.DACIA, MED.ARABIA_PETRAEA, MED.MESOPOTAMIA), 'medium', 'Maximum extent under Trajan, 117 CE — including Dacia, Arabia and the short-lived conquests of Armenia and Mesopotamia.'),
      snap(ce(150).year, mpoly(MED.IBERIA, MED.GAUL, MED.NARBONENSIS, MED.BRITANNIA, MED.ITALY, MED.NAFRICA, MED.CYRENAICA, MED.EGYPT, MED.BALKANS, MED.THRACE, MED.GREECE, MED.ANATOLIA, MED.LEVANT, MED.DACIA, MED.ARABIA_PETRAEA), 'medium', 'Under Hadrian and Antoninus Pius: Mesopotamia relinquished, Britain held to Hadrian’s Wall; the stable high-imperial frontier.'),
      snap(ce(211).year, mpoly(MED.IBERIA, MED.GAUL, MED.NARBONENSIS, MED.BRITANNIA, MED.ITALY, MED.NAFRICA, MED.CYRENAICA, MED.EGYPT, MED.BALKANS, MED.THRACE, MED.GREECE, MED.ANATOLIA, MED.LEVANT, MED.DACIA, MED.ARABIA_PETRAEA, MED.MESOPOTAMIA), 'medium', 'Under the Severans: Septimius Severus re-annexes Mesopotamia (198 CE) and pushes the African and British frontiers.'),
      snap(ce(271).year, mpoly(MED.IBERIA, MED.GAUL, MED.NARBONENSIS, MED.BRITANNIA, MED.ITALY, MED.NAFRICA, MED.CYRENAICA, MED.EGYPT, MED.BALKANS, MED.THRACE, MED.GREECE, MED.ANATOLIA, MED.LEVANT, MED.ARABIA_PETRAEA), 'medium', 'After the Crisis of the Third Century, Dacia and Mesopotamia are abandoned (271); the rest of the empire is restored.'),
      snap(ce(395).year, mpoly(MED.IBERIA, MED.GAUL, MED.NARBONENSIS, MED.BRITANNIA, MED.ITALY, MED.NAFRICA, MED.CYRENAICA, MED.EGYPT, MED.BALKANS, MED.THRACE, MED.GREECE, MED.ANATOLIA, MED.LEVANT, MED.ARABIA_PETRAEA), 'medium', 'The empire at the final division into western and eastern halves in 395 CE — still spanning the whole Mediterranean.'),
      snap(ce(450).year, mpoly(MED.ITALY, MED.NARBONENSIS, MED.CYRENAICA, MED.EGYPT, MED.BALKANS, MED.THRACE, MED.GREECE, MED.ANATOLIA, MED.LEVANT, MED.ARABIA_PETRAEA), 'medium', 'By 450 CE Britain (410), most of Gaul and Hispania, and Vandal Africa are lost; the surviving core is essentially the eastern (Byzantine) empire plus Italy — Narbonensis (Provence) is the last Gallic foothold.'),
    ],
  },
  {
    id: 'han-china',
    name: 'Han China',
    alternativeNames: ['Han Dynasty'],
    category: 'empire',
    start: bce(202),
    end: ce(220),
    confidence: 'medium',
    colour: '#c98a2f',
    labelImportance: 5,
    description:
      'The Han dynasty, a foundational era of imperial China, contemporary with Rome. Extent shown at the height of Emperor Wu, including the Hexi Corridor toward Central Asia.',
    sources: [
      src('Loewe & Twitchett (eds.) 1986, The Cambridge History of China, Vol. 1'),
      src('Tan Qixiang (ed.), The Historical Atlas of China'),
    ],
    snapshots: [
      snap(bce(195).year, poly([[106, 24], [112, 22], [118, 27], [121, 34], [120, 39], [113, 40], [107, 39], [104, 34], [104, 28], [106, 24]]), 'medium', 'Early Western Han under Emperor Gaozu: the reunified Chinese heartland, before the great expansion.'),
      snap(bce(100).year, poly([[100, 22], [108, 20], [117, 23], [122, 31], [122, 39], [117, 41], [110, 41], [103, 40], [97, 39], [92, 40], [88, 41], [92, 37], [100, 35], [102, 30], [101, 26], [100, 22]]), 'medium', 'Height under Emperor Wu (r. 141–87 BCE): the Hexi Corridor opens the way to Central Asia; expansion into the south and northern Korea.'),
      snap(ce(2).year, poly([[100, 21], [108, 19], [117, 22], [122, 31], [123, 39], [126, 41], [122, 42], [116, 41], [108, 41], [100, 40], [88, 41], [82, 41], [86, 39], [96, 37], [100, 34], [102, 29], [101, 25], [100, 21]]), 'medium', 'Around 2 CE: Han influence reaches its greatest extent, with the Protectorate of the Western Regions across the Tarim Basin.'),
      snap(ce(180).year, poly([[100, 22], [108, 20], [117, 23], [122, 31], [122, 39], [117, 41], [110, 41], [103, 40], [97, 39], [95, 40], [98, 37], [101, 33], [102, 29], [101, 26], [100, 22]]), 'medium', 'Late Eastern Han: the Western Regions are lost and central authority weakens before the dynasty’s collapse.'),
    ],
  },

  // ------------------------------------------- pre-Columbian & African states
  {
    id: 'maya',
    name: 'Maya civilisation',
    category: 'civilisation',
    start: bce(2000),
    end: ce(1524),
    confidence: 'medium',
    colour: '#3f8f6d',
    labelImportance: 4,
    description:
      'The Maya civilisation of Mesoamerica: a network of city-states (Tikal, Calakmul, Palenque, Copán) across the Yucatán and adjacent highlands, peaking in the Classic period.',
    sources: [
      src('Coe & Houston 2015, The Maya (9th ed.)'),
      src('Martin & Grube 2008, Chronicle of the Maya Kings and Queens'),
    ],
    snapshots: [
      snap(ce(700).year, poly([[-92.5, 14], [-88, 13.5], [-86.5, 16], [-87.5, 18.5], [-90, 21.5], [-91, 20], [-92, 17.5], [-92.5, 14]]), 'medium', 'Classic-period Maya area (not a unified state).'),
    ],
  },
  {
    id: 'ancestral-puebloans',
    name: 'Ancestral Puebloans',
    alternativeNames: ['Anasazi'],
    category: 'archaeological-culture',
    start: ce(100),
    end: ce(1300),
    confidence: 'low',
    colour: '#9a7d4e',
    labelImportance: 2,
    description:
      'A group of related archaeological traditions (not a single culture) of the Four Corners region of the North American Southwest, known for cliff dwellings and great houses such as those at Chaco Canyon and Mesa Verde. Ancestral to modern Pueblo peoples. Extent is a schematic of the shared material culture, not an ethnic border.',
    sources: [src('Plog 1997, Ancient Peoples of the American Southwest')],
    snapshots: [
      snap(ce(1100).year, poly([[-112, 35], [-108, 37.5], [-106.5, 36.5], [-108, 34], [-111, 33.5], [-112, 35]]), 'low', 'Approximate Four Corners distribution.'),
    ],
  },
  {
    id: 'aztec-empire',
    name: 'Aztec Empire',
    alternativeNames: ['Mexica', 'Triple Alliance'],
    category: 'empire',
    start: ce(1428),
    end: ce(1521),
    confidence: 'medium',
    colour: '#b0563f',
    labelImportance: 4,
    successorIds: ['spanish-empire'],
    description:
      'The Aztec Triple Alliance (Tenochtitlan, Texcoco and Tlacopan) dominated central Mexico through tribute and conquest until the Spanish conquest of 1519–1521. The extent shown is the tributary sphere, which was a patchwork of subject provinces rather than a contiguous state.',
    sources: [
      src('Townsend 2009, The Aztecs (3rd ed.)'),
      src('Smith 2012, The Aztecs (3rd ed.)'),
    ],
    snapshots: [
      snap(ce(1500).year, poly([[-102, 16], [-99, 15], [-96, 16], [-97, 18.5], [-99, 20.5], [-101, 20], [-102, 18], [-102, 16]]), 'medium', 'Tributary sphere in central Mexico, approximate.'),
    ],
  },
  {
    id: 'inca-empire',
    name: 'Inca Empire',
    alternativeNames: ['Tawantinsuyu'],
    category: 'empire',
    start: ce(1438),
    end: ce(1533),
    confidence: 'medium',
    colour: '#c98a3f',
    labelImportance: 4,
    successorIds: ['spanish-empire'],
    description:
      'Tawantinsuyu, the largest empire of pre-Columbian America, ran along the Andes from modern Colombia to central Chile, bound together by a vast road network and administered from Cusco. It fell to Francisco Pizarro’s expedition in the 1530s.',
    sources: [
      src('D’Altroy 2014, The Incas (2nd ed.)'),
      src('Rowe 1946, Handbook of South American Indians, Vol. 2'),
    ],
    snapshots: [
      snap(ce(1525).year, poly([[-79, 1], [-77, -4], [-72, -13], [-70, -18], [-70, -24], [-67, -27], [-65, -25], [-68, -16], [-73, -9], [-77, -2], [-79, 1]]), 'medium', 'Greatest extent along the Andes, approximate.'),
    ],
  },
  {
    id: 'iroquois-confederacy',
    name: 'Haudenosaunee Confederacy',
    alternativeNames: ['Iroquois Confederacy', 'Six Nations'],
    category: 'confederation',
    start: ce(1450),
    end: ce(1779),
    confidence: 'low',
    colour: '#5a8a7d',
    labelImportance: 3,
    description:
      'A confederation of Iroquoian-speaking nations (originally five: Mohawk, Oneida, Onondaga, Cayuga, Seneca; later joined by the Tuscarora) in the northeastern woodlands around the Great Lakes and modern New York. The homeland shown is approximate and does not capture the wider sphere of influence.',
    sources: [
      src('Richter 1992, The Ordeal of the Longhouse'),
      src('Fenton 1998, The Great Law and the Longhouse'),
    ],
    snapshots: [
      snap(ce(1650).year, poly([[-79.5, 42], [-76, 43.3], [-73.5, 43.5], [-74.5, 42], [-77, 41.3], [-79.5, 42]]), 'low', 'Approximate Haudenosaunee homeland in present-day New York State.'),
    ],
  },
  {
    id: 'mali-empire',
    name: 'Mali Empire',
    category: 'empire',
    start: ce(1235),
    end: ce(1670),
    confidence: 'medium',
    colour: '#c9a227',
    labelImportance: 4,
    description:
      'A West African empire of the Sahel, enriched by trans-Saharan trade in gold and salt, famed for Mansa Musa and the scholarship of Timbuktu.',
    sources: [
      src('Levtzion 1973, Ancient Ghana and Mali'),
      src('Niane 1984, UNESCO General History of Africa, Vol. IV'),
    ],
    snapshots: [
      snap(ce(1337).year, poly([[-16, 11], [-8, 10], [-2, 12], [2, 16], [-2, 18], [-8, 17], [-12, 16], [-16, 14], [-16, 11]]), 'medium', 'Approximate extent under Mansa Musa; Sahel borders are diffuse.'),
    ],
  },
  // ---------------------------------------------------- medieval Europe
  // The Holy Roman Empire and its constituent territories now live in
  // regions/hre.ts, with much finer temporal and spatial resolution.
  {
    id: 'kingdom-of-england',
    name: 'Kingdom of England',
    alternativeNames: ['Norman England'],
    category: 'kingdom',
    start: ce(927),
    end: ce(1707),
    confidence: 'high',
    colour: '#9a4a5a',
    labelImportance: 4,
    predecessorIds: ['wessex', 'mercia', 'northumbria', 'danelaw'],
    successorIds: ['united-kingdom'],
    description:
      'The Kingdom of England, forged in 927 when Æthelstan of Wessex united the Anglo-Saxon kingdoms. The Norman Conquest of 1066 changed its ruling dynasty rather than ending the kingdom. Cumbria was annexed in 1092, Wales conquered in 1282–83 (and formally annexed 1536–43); the 1707 Act of Union with Scotland merged it into the Kingdom of Great Britain.',
    sources: [
      src('Stenton 1971, Anglo-Saxon England'),
      src('Bartlett 2000, England under the Norman and Angevin Kings'),
    ],
    snapshots: [
      snap(ce(950).year, poly(ENGLAND_950), 'medium', 'The newly-unified kingdom under the House of Wessex: to the Tweed in the north-east (York intermittently under Viking kings until 954), but Cumbria is British and Wales separate. Lothian passed to the Scots c. 973–1018.'),
      snap(ce(1100).year, poly(ENGLAND_1100), 'high', 'Norman England: Cumbria and Carlisle annexed from the Scots (1092), the border nearing its lasting Tweed–Solway line. The Welsh marches are contested and not drawn.'),
      snap(ce(1300).year, poly(ENGLAND_AND_WALES), 'high', 'England with Wales after Edward I’s conquest of Gwynedd (1282–83) and the Statute of Rhuddlan (1284). Berwick changed hands repeatedly in the Scottish wars.'),
      snap(ce(1600).year, poly(ENGLAND_AND_WALES), 'high', 'England and Wales after the Acts of Union of 1536–43; the Scottish border long settled on the Tweed–Solway line.'),
    ],
  },

  // ---------------------------------------------------- Asian & steppe empires
  {
    id: 'mongol-empire',
    name: 'Mongol Empire',
    category: 'empire',
    start: ce(1206),
    end: ce(1368),
    confidence: 'medium',
    colour: '#9b6db0',
    labelImportance: 5,
    description:
      'The largest contiguous land empire in history, founded by Genghis Khan. Shown near its 1279 maximum before fragmenting into successor khanates.',
    sources: [
      src('Morgan 2007, The Mongols (2nd ed.)'),
      src('Atwood 2004, Encyclopedia of Mongolia and the Mongol Empire'),
    ],
    snapshots: [
      snap(ce(1206).year, poly([[88, 42], [98, 46], [110, 49], [120, 47], [118, 43], [108, 41], [96, 41], [89, 41], [88, 42]]), 'medium', 'Temüjin is proclaimed Genghis Khan (1206), uniting the Mongol tribes of the steppe.'),
      snap(ce(1220).year, poly([[80, 38], [92, 46], [104, 50], [116, 50], [122, 44], [118, 38], [110, 36], [100, 38], [88, 36], [80, 34], [78, 38], [80, 38]]), 'medium', 'By 1220 Genghis has taken northern China (the Jin) and shattered the Khwarazmian empire in Central Asia.'),
      snap(ce(1241).year, poly([[24, 46], [40, 52], [60, 56], [86, 55], [110, 53], [122, 45], [118, 37], [108, 33], [96, 34], [82, 34], [66, 36], [50, 40], [36, 42], [28, 44], [24, 46]]), 'medium', 'Under Ögedei: the conquest of the Rus principalities and the raid into Hungary and Poland (1241).'),
      snap(ce(1259).year, poly([[24, 46], [40, 52], [62, 56], [90, 55], [113, 52], [124, 45], [122, 38], [116, 30], [104, 26], [92, 28], [78, 30], [62, 32], [48, 36], [36, 40], [28, 43], [24, 46]]), 'medium', 'At the death of Möngke (1259): from Korea to the Levant and the Rus — near its greatest contiguous span.'),
      snap(ce(1279).year, poly([[26, 46], [40, 52], [60, 56], [90, 55], [115, 52], [125, 45], [122, 38], [118, 30], [108, 24], [100, 26], [88, 30], [72, 30], [58, 34], [46, 38], [36, 40], [28, 42], [26, 46]]), 'medium', 'Maximum extent, 1279, as Kublai completes the conquest of Song China — though the empire has already split into four khanates in practice.'),
    ],
  },
  {
    id: 'ottoman-empire',
    name: 'Ottoman Empire',
    category: 'empire',
    start: ce(1299),
    end: ce(1922),
    confidence: 'medium',
    colour: '#4f7d4f',
    labelImportance: 5,
    description:
      'A Turkish empire spanning south-eastern Europe, the Near East and North Africa for six centuries, peaking in the 16th–17th centuries before a long contraction.',
    sources: [
      src('Finkel 2005, Osman’s Dream: The History of the Ottoman Empire'),
      src('Imber 2009, The Ottoman Empire, 1300–1650'),
    ],
    snapshots: [
      snap(ce(1300).year, poly([[29, 39.5], [31, 40.5], [32, 40], [31.5, 39], [30, 39], [29, 39.5]]), 'medium', 'The small frontier beylik of Osman in north-western Anatolia, c. 1300.'),
      snap(ce(1362).year, poly([[27, 39], [34, 41], [38, 40], [40, 37], [36, 35], [30, 36], [27, 38], [27, 39]]), 'medium', 'By 1362 the Ottomans hold most of western Anatolia and have crossed into Europe, taking Adrianople (Edirne).'),
      snap(ce(1451).year, poly([[24, 40], [30, 43], [36, 43], [40, 40], [42, 37], [36, 35], [30, 36], [26, 38], [24, 40]]), 'medium', 'On the eve of the conquest of Constantinople: the Balkans and Anatolia, with the Byzantine capital an island within.'),
      snap(ce(1481).year, poly([[18, 42], [26, 46], [34, 45], [40, 41], [42, 37], [38, 34], [32, 35], [26, 38], [20, 40], [18, 42]]), 'medium', 'At the death of Mehmed II (1481): the Balkans to the Danube and all of Anatolia are unified under Ottoman rule.'),
      snap(ce(1520).year, poly([[18, 42], [26, 46], [34, 45], [40, 41], [44, 34], [42, 28], [38, 22], [34, 25], [33, 31], [30, 34], [26, 38], [20, 40], [18, 42]]), 'medium', 'Selim I (1512–20) conquers the Mamluks: Syria, Egypt and the Hejaz make the sultan guardian of Islam’s holy cities.'),
      snap(ce(1566).year, poly([[16, 44], [26, 49], [36, 48], [46, 40], [48, 33], [44, 28], [40, 22], [36, 19], [30, 22], [26, 30], [30, 34], [26, 38], [18, 40], [16, 42], [16, 44]]), 'medium', 'At the death of Suleiman the Magnificent (1566): Hungary, Iraq and the North African coast — near the Ottoman apogee.'),
      snap(ce(1683).year, poly([[16, 44], [26, 49], [36, 48], [46, 42], [48, 36], [44, 30], [40, 24], [36, 20], [30, 22], [24, 31], [18, 32], [10, 34], [4, 36], [10, 37], [16, 39], [16, 44]]), 'medium', 'Greatest extent, the year of the second siege of Vienna (1683), after which a long retreat begins.'),
      snap(ce(1800).year, poly([[18, 40], [26, 46], [34, 46], [42, 41], [46, 34], [44, 28], [40, 22], [36, 19], [30, 22], [26, 30], [30, 34], [26, 38], [20, 39], [18, 40]]), 'medium', 'By 1800, Hungary and the northern Black Sea coast are lost to Austria and Russia.'),
      snap(ce(1900).year, poly([[26, 40], [34, 42], [40, 38], [44, 33], [46, 30], [42, 26], [38, 22], [34, 28], [30, 34], [26, 38], [26, 40]]), 'medium', 'The much-reduced empire before the First World War and its dissolution in 1922.'),
    ],
  },

  // ------------------------------------------------------- colonial empires
  {
    id: 'spanish-empire',
    name: 'Spanish Empire',
    category: 'colonial-possession',
    start: ce(1492),
    end: ce(1898),
    confidence: 'medium',
    colour: '#c98f3a',
    labelImportance: 4,
    description:
      'The overseas empire of the Spanish crown, from the 1492 landfall in the Caribbean to its 18th-century height across the Americas. It grew by conquest — the Caribbean first, then the Aztec (1519–21) and Inca (1532–33) realms — so the earlier snapshots are far smaller. Possessions are highly schematic and exclude many islands.',
    sources: [src('Elliott 2006, Empires of the Atlantic World')],
    snapshots: [
      snap(ce(1500).year, poly([[-78, 23], [-68, 22], [-64, 17], [-66, 11], [-75, 9], [-83, 15], [-85, 19], [-78, 23]]), 'low', 'Caribbean beachhead (Hispaniola and nearby islands), c. 1500.'),
      snap(ce(1550).year, mpoly(
        [[-106, 32], [-98, 30], [-92, 18], [-84, 10], [-90, 14], [-98, 16], [-106, 24], [-106, 32]],
        [[-81, 0], [-73, -8], [-70, -16], [-70, -24], [-76, -16], [-81, -4], [-81, 0]],
        [[-78, 23], [-68, 22], [-64, 17], [-66, 11], [-75, 9], [-83, 15], [-85, 19], [-78, 23]],
      ), 'low', 'After the conquests of the Aztec and Inca realms: Mexico, Central America and Andean Peru, c. 1550.'),
      snap(ce(1790).year, mpoly(
        [[-118, 40], [-106, 38], [-98, 30], [-92, 18], [-84, 10], [-78, 8], [-70, 12], [-62, 10], [-58, 0], [-70, -18], [-72, -40], [-74, -30], [-80, -10], [-88, 12], [-98, 16], [-108, 24], [-118, 32], [-118, 40]],
      ), 'low', 'Spanish America at its 18th-century height, c. 1790; boundaries with the unconquered interior are notional.'),
    ],
  },
  {
    id: 'british-empire',
    name: 'British Empire',
    category: 'colonial-possession',
    start: ce(1707),
    end: ce(1997),
    confidence: 'medium',
    colour: '#a8506a',
    labelImportance: 4,
    description:
      'A globe-spanning maritime empire. Rather than draw every possession, representative territories are shown as they were gained and lost — the thirteen American colonies (lost in 1783), India, the settler dominions and the African territories. Many islands and protectorates are omitted.',
    sources: [src('Marshall (ed.) 1996, The Cambridge Illustrated History of the British Empire')],
    snapshots: [
      snap(ce(1713).year, mpoly(
        [[-82, 32], [-70, 43], [-60, 47], [-64, 41], [-76, 33], [-82, 32]],
        [[-58, 47], [-52, 47], [-53, 52], [-60, 51], [-58, 47]],
      ), 'low', 'After the Treaty of Utrecht (1713): the thirteen colonies of eastern North America, Newfoundland and Hudson Bay.'),
      snap(ce(1763).year, mpoly(
        [[-82, 30], [-70, 44], [-56, 50], [-78, 55], [-95, 50], [-90, 40], [-84, 32], [-82, 30]],
        [[78, 20], [90, 22], [92, 26], [86, 26], [80, 22], [78, 20]],
      ), 'low', 'After the Seven Years’ War (1763): British North America now includes Canada, and the East India Company holds Bengal.'),
      snap(ce(1805).year, mpoly(
        [[68, 8], [82, 8], [90, 22], [88, 27], [78, 30], [72, 24], [68, 16], [68, 8]],
        [[113, -12], [130, -11], [142, -11], [153, -28], [146, -39], [129, -32], [115, -35], [113, -22], [113, -12]],
        [[-64, 44], [-56, 50], [-78, 56], [-96, 50], [-84, 45], [-70, 45], [-64, 44]],
        [[16, -33], [20, -34], [26, -33], [22, -31], [17, -32], [16, -33]],
      ), 'low', 'By 1805 the American colonies are gone (independent 1783), but India is expanding fast and Australia and the Cape have been claimed.'),
      snap(ce(1860).year, mpoly(
        [[68, 8], [80, 6], [92, 22], [90, 30], [76, 34], [70, 28], [66, 20], [68, 8]],
        [[113, -12], [130, -11], [142, -11], [153, -28], [146, -39], [129, -32], [115, -35], [113, -22], [113, -12]],
        [[166, -34], [179, -37], [179, -47], [167, -46], [166, -40], [166, -34]],
        [[-130, 48], [-95, 49], [-75, 52], [-90, 60], [-125, 60], [-130, 52], [-130, 48]],
        [[16, -34], [26, -30], [31, -28], [26, -33], [18, -35], [16, -34]],
      ), 'low', 'By 1860: nearly all India, the Australian and New Zealand colonies, the Canadian provinces and the Cape.'),
      snap(ce(1920).year, mpoly(
        [[68, 8], [80, 6], [92, 22], [88, 28], [76, 34], [70, 30], [66, 24], [68, 8]],
        [[113, -12], [130, -11], [142, -11], [153, -28], [146, -39], [129, -32], [115, -35], [113, -22], [113, -12]],
        [[166, -34], [179, -37], [179, -47], [167, -46], [166, -40], [166, -34]],
        [[-141, 49], [-95, 49], [-64, 52], [-90, 62], [-141, 60], [-141, 49]],
        [[15, -35], [33, -26], [30, -1], [37, 5], [33, 22], [24, 20], [14, 5], [10, -6], [15, -22], [15, -35]],
        [[43, -12], [50, -18], [49, -25], [44, -22], [43, -16], [43, -12]],
      ), 'low', 'The territorial maximum, c. 1920: India, the dominions, and a swathe of Africa from the Cape toward Cairo, plus Middle Eastern mandates (not all drawn).'),
      snap(ce(1950).year, mpoly(
        [[166, -34], [179, -37], [179, -47], [167, -46], [166, -40], [166, -34]],
        [[-141, 49], [-95, 49], [-64, 52], [-90, 62], [-141, 60], [-141, 49]],
        [[15, -35], [33, -26], [30, -1], [37, 5], [33, 12], [24, 12], [14, 5], [10, -6], [15, -22], [15, -35]],
      ), 'low', 'After 1947, India and Pakistan are independent; the empire’s centre of gravity shifts to the African territories and the old dominions, before the wave of decolonisation.'),
    ],
  },

  // ------------------------------------------------------------ modern states
  {
    id: 'usa',
    name: 'United States',
    category: 'modern-state',
    start: ce(1783),
    end: ce(2026),
    confidence: 'high',
    colour: '#4a6fa8',
    labelImportance: 4,
    description:
      'The United States of America. The contemporary snapshot uses the Natural Earth boundary; the 1803 snapshot approximates the extent after the Louisiana Purchase.',
    sources: [src('Natural Earth (public domain) for modern boundary')],
    snapshots: [
      snap(ce(1803).year, poly([[-92, 29], [-82, 25], [-76, 35], [-70, 42], [-83, 45], [-90, 47], [-104, 49], [-114, 46], [-114, 33], [-106, 29], [-97, 26], [-92, 29]]), 'low', 'Approximate extent c. 1803 (post-Louisiana Purchase). Coarse.'),
      snap(ce(2026).year, { naturalEarthCountry: 'United States of America' }, 'high', 'Contemporary borders (Natural Earth). Alaska and Hawaii included.'),
    ],
  },
  {
    id: 'france',
    name: 'France',
    category: 'modern-state',
    start: ce(1789),
    end: ce(2026),
    confidence: 'high',
    colour: '#3f6fb0',
    labelImportance: 3,
    description: 'The French Republic. Contemporary metropolitan boundary from Natural Earth.',
    sources: [src('Natural Earth (public domain)')],
    snapshots: [snap(ce(2026).year, { naturalEarthCountry: 'France' }, 'high', 'Contemporary metropolitan France (Natural Earth).')],
  },
  {
    id: 'united-kingdom',
    name: 'United Kingdom',
    alternativeNames: ['Great Britain', 'UK'],
    category: 'modern-state',
    start: ce(1707),
    end: ce(2026),
    confidence: 'high',
    colour: '#8a4a6a',
    labelImportance: 4,
    predecessorIds: ['kingdom-of-england'],
    description:
      'The United Kingdom, formed by the 1707 Union of England and Scotland, which added all of Ireland in 1801 and then lost the south of it when the Irish Free State seceded in 1922 — leaving Great Britain and Northern Ireland. Once the centre of the world’s largest empire.',
    sources: [
      src('Colley 1992, Britons: Forging the Nation 1707–1837'),
      src('Natural Earth (public domain) for the modern boundary'),
    ],
    snapshots: [
      snap(ce(1707).year, poly(GREAT_BRITAIN), 'high', 'The Kingdom of Great Britain from the 1707 union of England and Scotland — the island of Britain, without Ireland.'),
      snap(ce(1801).year, mpoly(GREAT_BRITAIN, IRELAND_ISLAND), 'high', 'The United Kingdom of Great Britain and Ireland from the 1801 union — Britain plus all of Ireland.'),
      snap(ce(1922).year, { naturalEarthCountry: 'United Kingdom' }, 'high', 'After the Irish Free State seceded in 1922: Great Britain and Northern Ireland (Natural Earth).'),
    ],
  },
  {
    id: 'spain',
    name: 'Spain',
    alternativeNames: ['Kingdom of Spain', 'España'],
    category: 'modern-state',
    start: ce(1492),
    end: ce(2026),
    confidence: 'high',
    colour: '#c98a4a',
    labelImportance: 4,
    predecessorIds: ['spanish-empire'],
    description:
      'Spain, unified under the Catholic Monarchs and the completion of the Reconquista in 1492 — the same year its overseas empire began. The 1490 snapshot approximates the Iberian realm at unification; the contemporary boundary is from Natural Earth.',
    sources: [
      src('Elliott 1963, Imperial Spain 1469–1716'),
      src('Natural Earth (public domain) for the modern boundary'),
    ],
    snapshots: [
      snap(ce(1500).year, poly([[-9, 43], [-2, 43.5], [3, 42], [0, 39], [-2, 36.5], [-6, 36], [-9, 37], [-9, 43]]), 'medium', 'Iberian realm of the Catholic Monarchs, c. 1500 (approximate; excludes Portugal).'),
      snap(ce(2026).year, { naturalEarthCountry: 'Spain' }, 'high', 'Contemporary Spain (Natural Earth).'),
    ],
  },
  {
    id: 'germany',
    name: 'Germany',
    alternativeNames: ['German Empire', 'West Germany', 'Deutschland'],
    category: 'modern-state',
    start: ce(1871),
    end: ce(2026),
    confidence: 'high',
    colour: '#6a6a8a',
    labelImportance: 4,
    predecessorIds: ['holy-roman-empire', 'brandenburg'],
    description:
      'The German nation-state, unified in 1871 under Prussia: the Empire with Alsace-Lorraine and the eastern provinces to 1918, the truncated Weimar Republic after Versailles, division into the Federal Republic (shown here) and the Soviet-bloc GDR from 1949, and reunification on 3 October 1990. The contemporary boundary is from Natural Earth.',
    sources: [
      src('Blackbourn 2003, History of Germany 1780–1918'),
      src('Magocsi 2018, Historical Atlas of Central Europe'),
      src('Natural Earth (public domain) for the modern boundary'),
    ],
    snapshots: [
      snap(1880, poly(GERMAN_EMPIRE), 'medium', 'The Empire of 1871: with Alsace-Lorraine, northern Schleswig, Posen, West Prussia, all of Silesia, and East Prussia with Memel.'),
      snap(1918.8, poly(GERMAN_EMPIRE), 'medium', 'Imperial borders held until the armistice of November 1918.'),
      snap(1920.3, mpoly(GERMANY_INTERWAR_MAIN, EAST_PRUSSIA_INTERWAR), 'medium', 'After Versailles: Alsace-Lorraine, northern Schleswig, Posen, the corridor, eastern Upper Silesia, Danzig and Memel lost; East Prussia an exclave.'),
      snap(1937.9, mpoly(GERMANY_INTERWAR_MAIN, EAST_PRUSSIA_INTERWAR), 'medium', 'Pre-war borders of 1937; the annexations of 1938–45 are not shown.'),
      snap(1946, poly(WEST_GERMANY), 'high', 'The western occupation zones, from 1949 the Federal Republic. The Saarland (a French protectorate until 1957) is included for simplicity.'),
      snap(1990.2, poly(WEST_GERMANY), 'high', 'West Germany, up to reunification on 3 October 1990.'),
      snap(1990.9, { naturalEarthCountry: 'Germany' }, 'high', 'Reunified Germany (Natural Earth).'),
    ],
  },
  {
    id: 'italy',
    name: 'Italy',
    alternativeNames: ['Kingdom of Italy', 'Italia'],
    category: 'modern-state',
    start: ce(1861),
    end: ce(2026),
    confidence: 'high',
    colour: '#5a9a6d',
    labelImportance: 3,
    predecessorIds: ['roman-republic', 'roman-empire'],
    description:
      'The Italian nation-state, unified in 1861 through the Risorgimento. It then gained Venetia (1866) and Rome (1870), took the Alpine north-east and Trieste after the First World War (1919), and ceded Istria to Yugoslavia in 1947. Contemporary boundary from Natural Earth.',
    sources: [
      src('Duggan 2007, The Force of Destiny: A History of Italy Since 1796'),
      src('Natural Earth (public domain) for the modern boundary'),
    ],
    snapshots: [
      snap(ce(1861).year, mpoly(ITALY_1861, SICILY_I, SARDINIA_I), 'medium', 'The Kingdom of Italy at unification, 1861 — before the acquisition of Venetia (1866) and Rome (1870); the Papal enclave around Rome and Austrian Venetia are approximated as outside.'),
      snap(ce(1919).year, mpoly(ITALY_1919, SICILY_I, SARDINIA_I), 'medium', 'After the First World War: Italy gains Trentino, South Tyrol, Trieste and Istria (1919).'),
      snap(ce(2026).year, { naturalEarthCountry: 'Italy' }, 'high', 'Contemporary Italy, after ceding Istria to Yugoslavia in 1947 (Natural Earth).'),
    ],
  },
  {
    id: 'japan',
    name: 'Japan',
    alternativeNames: ['Nihon', 'Nippon'],
    category: 'modern-state',
    start: ce(1868),
    end: ce(2026),
    confidence: 'high',
    colour: '#b0567a',
    labelImportance: 3,
    description:
      'The modern Japanese state from the Meiji Restoration of 1868, though a continuous polity is far older. The contemporary boundary is from Natural Earth.',
    sources: [
      src('Gordon 2003, A Modern History of Japan'),
      src('Natural Earth (public domain) for the modern boundary'),
    ],
    snapshots: [snap(ce(2026).year, { naturalEarthCountry: 'Japan' }, 'high', 'Contemporary Japan (Natural Earth).')],
  },
  {
    id: 'mexico',
    name: 'Mexico',
    alternativeNames: ['United Mexican States'],
    category: 'modern-state',
    start: ce(1821),
    end: ce(2026),
    confidence: 'high',
    colour: '#4a9a7d',
    labelImportance: 3,
    predecessorIds: ['spanish-empire'],
    description:
      'The United Mexican States, independent from Spain in 1821 on lands that were home to the Aztec and Maya civilisations. The contemporary boundary is from Natural Earth.',
    sources: [
      src('Meyer & Sherman 1995, The Course of Mexican History'),
      src('Natural Earth (public domain) for the modern boundary'),
    ],
    snapshots: [snap(ce(2026).year, { naturalEarthCountry: 'Mexico' }, 'high', 'Contemporary Mexico (Natural Earth); 1821 extent was far larger.')],
  },
  {
    id: 'china-prc',
    name: "People's Republic of China",
    alternativeNames: ['China'],
    category: 'modern-state',
    start: ce(1949),
    end: ce(2026),
    confidence: 'high',
    colour: '#c0603f',
    labelImportance: 4,
    predecessorIds: ['han-china', 'qing-dynasty'],
    description:
      'The modern Chinese state, proclaimed in 1949, which incorporated Tibet in 1950–51 to reach roughly the extent of the former Qing empire. Contemporary boundary from Natural Earth; some frontiers are disputed.',
    sources: [
      src('Natural Earth (public domain) for the modern boundary'),
      src('Spence 1990, The Search for Modern China'),
    ],
    snapshots: [
      snap(ce(1949).year, poly(CHINA_EXTERIOR, TIBET_HOLE), 'medium', 'The People’s Republic at its 1949 founding, before the incorporation of Tibet (shown as an interior gap).'),
      snap(ce(1951).year, { naturalEarthCountry: 'China' }, 'high', 'After the annexation of Tibet in 1950–51 (Natural Earth).'),
    ],
  },
  {
    id: 'india-republic',
    name: 'India',
    alternativeNames: ['Republic of India'],
    category: 'modern-state',
    start: ce(1947),
    end: ce(2026),
    confidence: 'high',
    colour: '#c98a3f',
    labelImportance: 4,
    predecessorIds: ['british-empire'],
    description: 'The Republic of India, independent from 1947. Contemporary boundary from Natural Earth.',
    sources: [src('Natural Earth (public domain)')],
    snapshots: [snap(ce(2026).year, { naturalEarthCountry: 'India' }, 'high', 'Contemporary borders (Natural Earth); some frontiers are disputed.')],
  },
  {
    id: 'brazil',
    name: 'Brazil',
    category: 'modern-state',
    start: ce(1822),
    end: ce(2026),
    confidence: 'high',
    colour: '#4f9a5f',
    labelImportance: 3,
    description: 'The Federative Republic of Brazil. Contemporary boundary from Natural Earth.',
    sources: [src('Natural Earth (public domain)')],
    snapshots: [snap(ce(2026).year, { naturalEarthCountry: 'Brazil' }, 'high', 'Contemporary borders (Natural Earth).')],
  },
  {
    id: 'russia',
    name: 'Russia',
    alternativeNames: ['Russian Federation'],
    category: 'modern-state',
    start: ce(1991),
    end: ce(2026),
    confidence: 'high',
    colour: '#7a6fa8',
    labelImportance: 4,
    predecessorIds: ['soviet-union'],
    description: 'The Russian Federation, successor to the USSR from 1991. Contemporary boundary from Natural Earth.',
    sources: [src('Natural Earth (public domain)')],
    snapshots: [snap(ce(2026).year, { naturalEarthCountry: 'Russia' }, 'high', 'Contemporary borders (Natural Earth); some frontiers are disputed.')],
  },
  {
    id: 'egypt-modern',
    name: 'Egypt',
    alternativeNames: ['Arab Republic of Egypt', 'Kingdom of Egypt'],
    category: 'modern-state',
    start: ce(1922),
    end: ce(2026),
    confidence: 'high',
    colour: '#c9a13f',
    labelImportance: 3,
    predecessorIds: ['ottoman-empire'],
    description: 'The modern Egyptian state, independent from Britain in 1922 (as a kingdom; a republic from 1953), within borders essentially unchanged since. Contemporary boundary from Natural Earth.',
    sources: [src('Natural Earth (public domain)')],
    snapshots: [snap(ce(2026).year, { naturalEarthCountry: 'Egypt' }, 'high', 'Contemporary borders (Natural Earth).')],
  },
];
