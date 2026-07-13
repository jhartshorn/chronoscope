import type { HistoricalEntity } from '../../types';
import type { Ring } from '../helpers';
import { ce, poly, snap, src } from '../helpers';

/**
 * Bridges the 1240–1721 gap between `kievan-rus` (medieval.ts, shattered by
 * the Mongol invasion) and `russian-empire` (europe.ts, proclaimed by Peter
 * the Great): the Novgorod Republic, the rise of the Grand Duchy of Moscow
 * under the Mongol "yoke", and the Tsardom proclaimed by Ivan IV in 1547.
 * `golden-horde` (islamic.ts) covers the Mongol overlordship these polities
 * lived under but did not themselves hold territory as steppe khans did.
 */

const NOVGOROD_CORE: Ring = [
  [29.5, 57.5], [33.5, 57.3], [34.0, 59.0], [31.5, 60.0], [29.0, 59.0], [29.5, 57.5],
];
const NOVGOROD_PEAK: Ring = [
  [27.0, 57.0], [34.0, 57.0], [38.0, 60.0], [45.0, 63.0], [52.0, 65.5], [60.0, 67.0],
  [58.0, 68.5], [48.0, 68.0], [38.0, 67.0], [30.0, 65.0], [26.0, 60.0], [27.0, 57.0],
];

const MOSCOW_1263: Ring = [[35.5, 54.8], [38.5, 54.8], [39.0, 56.3], [36.0, 56.5], [35.0, 55.7], [35.5, 54.8]];
const MOSCOW_1340: Ring = [[34.5, 54.5], [40.5, 54.5], [41.5, 57.0], [38.0, 57.5], [35.0, 57.0], [33.5, 55.5], [34.5, 54.5]];
const MOSCOW_1380: Ring = [[33.0, 53.5], [41.5, 53.8], [43.0, 57.5], [38.5, 58.3], [34.0, 57.5], [31.5, 55.0], [33.0, 53.5]];
const MOSCOW_1462: Ring = [[32.0, 52.5], [43.0, 53.0], [46.0, 56.0], [44.0, 59.0], [38.0, 60.5], [33.0, 59.0], [30.0, 55.5], [32.0, 52.5]];
/** After annexing Novgorod (1478); also used, unchanged, for the 1485 Tver annexation. */
const MOSCOW_1478: Ring = [
  [26.0, 58.0], [27.0, 57.0], [30.0, 55.5], [32.0, 52.5], [43.0, 53.0], [46.0, 56.0],
  [52.0, 65.5], [60.0, 67.0], [58.0, 68.5], [48.0, 68.0], [38.0, 67.0], [30.0, 65.0], [26.0, 60.0], [26.0, 58.0],
];
/** After the Muscovite–Lithuanian wars add Chernigov-Seversk (to 1503) and hold through Ivan IV's 1547 coronation. */
const MOSCOW_1503: Ring = [
  [26.0, 58.0], [27.0, 57.0], [28.0, 54.0], [31.0, 51.3], [35.0, 50.8], [40.0, 51.5],
  [43.0, 53.0], [46.0, 56.0], [52.0, 65.5], [60.0, 67.0], [58.0, 68.5], [48.0, 68.0],
  [38.0, 67.0], [30.0, 65.0], [26.0, 60.0], [26.0, 58.0],
];

const TSARDOM_1556: Ring = [
  [26.0, 58.0], [27.0, 57.0], [28.0, 54.0], [31.0, 51.3], [35.0, 50.8], [40.0, 51.5],
  [44.0, 50.0], [47.0, 47.0], [49.0, 45.5], [53.0, 47.0], [55.0, 52.0], [52.0, 56.0],
  [60.0, 60.0], [60.0, 67.0], [58.0, 68.5], [48.0, 68.0], [38.0, 67.0], [30.0, 65.0], [26.0, 60.0], [26.0, 58.0],
];
const TSARDOM_1600: Ring = [
  [26.0, 58.0], [27.0, 57.0], [28.0, 54.0], [31.0, 51.3], [35.0, 50.8], [40.0, 51.5],
  [44.0, 50.0], [47.0, 47.0], [49.0, 45.5], [53.0, 47.0], [55.0, 52.0], [60.0, 55.0],
  [70.0, 58.0], [76.0, 62.0], [70.0, 66.0], [60.0, 67.5], [58.0, 68.5], [48.0, 68.0],
  [38.0, 67.0], [30.0, 65.0], [26.0, 60.0], [26.0, 58.0],
];
const TSARDOM_1655: Ring = [
  [26.0, 58.0], [27.0, 57.0], [28.0, 54.0], [30.3, 50.3], [35.0, 50.8], [40.0, 51.5], [44.0, 50.0],
  [47.0, 47.0], [49.0, 45.5], [53.0, 47.0], [55.0, 52.0], [60.0, 55.0], [75.0, 58.0], [90.0, 60.0],
  [110.0, 61.0], [130.0, 60.0], [145.0, 59.0], [138.0, 66.0], [110.0, 70.0], [85.0, 71.0], [70.0, 66.0],
  [60.0, 67.5], [58.0, 68.5], [48.0, 68.0], [38.0, 67.0], [30.0, 65.0], [26.0, 60.0], [26.0, 58.0],
];
const TSARDOM_1721: Ring = [
  [21.5, 57.0], [24.0, 56.0], [28.0, 54.0], [30.3, 50.3], [35.0, 50.8], [40.0, 51.5], [44.0, 50.0],
  [47.0, 47.0], [49.0, 45.5], [53.0, 47.0], [55.0, 52.0], [60.0, 55.0], [75.0, 58.0], [90.0, 60.0],
  [110.0, 61.0], [130.0, 60.0], [145.0, 59.0], [138.0, 66.0], [110.0, 70.0], [85.0, 71.0], [70.0, 66.0],
  [60.0, 67.5], [58.0, 68.5], [48.0, 68.0], [38.0, 67.0], [30.0, 65.0], [26.0, 60.0], [24.0, 59.0], [21.5, 57.0],
];

const SOURCES = [
  src('Martin 2007, Medieval Russia 980–1584 (2nd ed.)'),
  src('Crummey 1987, The Formation of Muscovy 1304–1613'),
];

export const RUSSIA_ENTITIES: HistoricalEntity[] = [
  {
    id: 'novgorod-republic',
    name: 'Novgorod Republic',
    alternativeNames: ['Lord Novgorod the Great'],
    category: 'republic',
    start: ce(1136),
    end: ce(1478),
    confidence: 'low',
    colour: '#6a8a9a',
    labelImportance: 3,
    predecessorIds: ['kievan-rus'],
    successorIds: ['grand-duchy-of-moscow'],
    description:
      'After expelling its prince in 1136, Novgorod was ruled by an assembly (veche) of citizens who elected and dismissed princes as hired military commanders — a mercantile republic, not a hereditary monarchy. Its fur-trading colonists and tribute-collectors pushed its nominal territory east to the Urals and north to the White Sea, making it one of medieval Europe’s largest states by area, though thinly controlled outside the city itself. Defeated at the Shelon River (1471), it was annexed outright by Ivan III of Moscow in 1478.',
    sources: [
      src('Birnbaum 1981, Lord Novgorod the Great'),
      ...SOURCES,
    ],
    snapshots: [
      snap(ce(1136).year, poly(NOVGOROD_CORE), 'low', 'The city and its immediate hinterland around Lake Ilmen at the 1136 expulsion of Prince Vsevolod.'),
      snap(ce(1300).year, poly(NOVGOROD_PEAK), 'low', 'Fur-tribute colonisation has extended Novgorod’s nominal reach north to the White Sea and east toward the Urals.'),
      snap(ce(1400).year, poly(NOVGOROD_PEAK), 'low', 'Stable at its greatest nominal extent through the 14th century.'),
      snap(ce(1471).year, poly(NOVGOROD_PEAK), 'medium', 'Defeated at the Shelon River by Ivan III (1471): still nominally intact but now a Muscovite dependency in all but name.'),
    ],
  },
  {
    id: 'grand-duchy-of-moscow',
    name: 'Grand Duchy of Moscow',
    alternativeNames: ['Muscovy', 'Grand Principality of Moscow'],
    category: 'kingdom',
    start: ce(1263),
    end: ce(1547),
    confidence: 'medium',
    colour: '#8a5a4a',
    labelImportance: 4,
    predecessorIds: ['kievan-rus'],
    successorIds: ['tsardom-of-russia'],
    description:
      'A minor appanage carved out for Daniel, youngest son of Alexander Nevsky, in 1263 — one of many petty principalities paying tribute to the Golden Horde. Ivan I "Kalita" won the right to collect that tribute for the khan (c. 1327), enriching Moscow at its rivals’ expense, and Dmitri Donskoi’s victory at Kulikovo (1380) first showed the Horde could be beaten. Ivan III’s "gathering of the Russian lands" annexed Novgorod (1478) and Tver (1485) and, after the 1480 Great Stand on the Ugra River, ended Mongol suzerainty for good; his grandson Ivan IV was crowned the first Tsar of All Russia in 1547.',
    sources: SOURCES,
    snapshots: [
      snap(ce(1263).year, poly(MOSCOW_1263), 'medium', 'Daniel’s founding appanage: a small principality around Moscow itself.'),
      snap(ce(1340).year, poly(MOSCOW_1340), 'medium', 'Ivan I "Kalita" adds the grand princely title of Vladimir and grows rich as the khan’s tribute-collector.'),
      snap(ce(1380).year, poly(MOSCOW_1380), 'medium', 'On the eve of Dmitri Donskoi’s victory over the Golden Horde at Kulikovo.'),
      snap(ce(1462).year, poly(MOSCOW_1462), 'medium', 'Vasily II’s realm at Ivan III’s accession, after decades of dynastic civil war.'),
      snap(ce(1478).year, poly(MOSCOW_1478), 'high', 'Ivan III annexes the Novgorod Republic outright (1478), more than doubling Muscovy’s extent at a stroke.'),
      snap(ce(1485).year, poly(MOSCOW_1478), 'high', 'Tver, the last independent rival principality, is annexed (1485).'),
      snap(ce(1503).year, poly(MOSCOW_1503), 'medium', 'Wars with Lithuania (1487–1503) add the Chernigov-Seversk lands in the south-west.'),
    ],
  },
  {
    id: 'tsardom-of-russia',
    name: 'Tsardom of Russia',
    alternativeNames: ['Tsardom of Muscovy'],
    category: 'kingdom',
    start: ce(1547),
    end: ce(1721),
    confidence: 'high',
    colour: '#7a6a9a',
    labelImportance: 5,
    predecessorIds: ['grand-duchy-of-moscow'],
    successorIds: ['russian-empire'],
    description:
      'Proclaimed when Ivan IV "the Terrible" was crowned the first Tsar of All Russia (1547). Ivan’s conquests of Kazan (1552) and Astrakhan (1556) opened the whole Volga and the road east; Cossack and fur-trader expansion crossed Siberia to the Pacific by 1639, despite the catastrophic Time of Troubles (1598–1613) along the way. The 1654 Treaty of Pereyaslav brought Left-bank Ukraine under the tsar, and victory in the Great Northern War (1700–21) won a Baltic coastline, on the strength of which Peter the Great proclaimed the Russian Empire in 1721.',
    sources: [
      src('Hosking 2001, Russia and the Russians: A History'),
      ...SOURCES,
    ],
    snapshots: [
      snap(ce(1547).year, poly(MOSCOW_1503), 'high', 'Ivan IV’s coronation as Tsar: the Muscovite realm built up by his grandfather and father.'),
      snap(ce(1556).year, poly(TSARDOM_1556), 'high', 'The conquests of Kazan (1552) and Astrakhan (1556) bring the whole Volga, and the steppe to the Caspian, under Moscow.'),
      snap(ce(1600).year, poly(TSARDOM_1600), 'medium', 'Yermak’s Cossacks (from 1582) carry Russian rule across the Urals into western Siberia.'),
      snap(ce(1655).year, poly(TSARDOM_1655), 'medium', 'Russian explorers and fur-traders reach the Pacific at Okhotsk (1639); the 1654 Treaty of Pereyaslav adds Left-bank Ukraine in the south-west.'),
      snap(ce(1721).year, poly(TSARDOM_1721), 'high', 'On the eve of the imperial proclamation: victory over Sweden in the Great Northern War (1700–21) adds Estonia, Livonia and Ingria, Russia’s first real Baltic coastline.'),
    ],
  },
];
