import type { HistoricalEntity } from '../../types';
import type { Ring } from '../helpers';
import { ce, mpoly, poly, snap, src } from '../helpers';
import { hd } from '../../history/date';

/**
 * Shared Soviet frontier from the Arctic round the Pacific to the Black Sea,
 * used by both the interwar and the 1940 snapshots. Drawn seaward of the
 * coast where convenient (fills are clipped to land). Deliberately excludes
 * what the USSR did not yet hold: Tuva (independent 1921–44), southern
 * Sakhalin and the Kuril Islands (Japanese until 1945).
 */
const USSR_ARCTIC_TO_BLACK_SEA: Ring = [
  // Arctic coast, west to east (seaward; includes Novaya Zemlya)
  [33.5, 69.7], [41, 68.3], [44, 68.5], [54, 69.5], [62, 71], [72, 73.5],
  [82, 74], [95, 77], [110, 77.5], [130, 75.5], [145, 74], [160, 71.5],
  [170, 70.5], [178, 69.5],
  // Chukotka east of the antimeridian, then the Bering coast
  [-175, 68], [-169.5, 66], [-172, 64], [178, 63.5], [172.5, 60.5],
  // Kamchatka (the Kurils excluded), across the Sea of Okhotsk
  [166, 58.5], [161.5, 55.5], [158, 51.8], [156.6, 50.5], [153, 51.8], [146.5, 53.3],
  // Northern Sakhalin only — the island was cut along 50° N until 1945
  [145, 54.5], [144.7, 50], [141.9, 50], [141.6, 52.3],
  // Tatar Strait and the Primorye coast down to the Korean tripoint
  [141, 53.6], [140.3, 52], [140.5, 50], [139.5, 48], [137, 45.8], [134.5, 43.3],
  [131.8, 42.6], [130.65, 42.32],
  // Manchurian frontier: Ussuri, Amur and Argun rivers
  [131.1, 44.9], [133.1, 45.4], [134.7, 47.7], [134.6, 48.4], [130.9, 48.9],
  [127.5, 49.8], [126, 51.4], [124, 53.2], [121.5, 53.3], [119.9, 52.3], [117.9, 49.6],
  // Mongolian frontier, then around independent Tuva's northern rim
  [116.7, 49.9], [114.3, 50.3], [109.5, 49.2], [106.2, 50.3], [102.2, 51.4],
  [98.9, 50.5], [97.7, 51.2], [95, 52.3], [92, 52.4], [89.9, 51.6], [88.9, 50.1],
  // Xinjiang frontier over the Altai, Dzungaria and the Tian Shan
  [87.8, 49.2], [85.6, 47], [83, 47.2], [82.4, 45.3], [80.4, 45.1], [80.2, 42.2],
  [76.5, 40.6], [73.6, 39.7],
  // Afghan frontier: the Pamirs, the Panj/Amu Darya and the Kushka salient
  [73.7, 37.4], [71.6, 36.7], [69.5, 37.1], [67.8, 37.2], [66.5, 37.4],
  [64.8, 37.1], [62.7, 35.7], [61.3, 35.6],
  // Iranian frontier to the Caspian (crossed directly — the sea is clipped)
  [61.2, 36.6], [58.5, 37.7], [56.5, 38.1], [54.7, 37.5], [53.9, 37.35],
  // Aras river frontier with Iran, then the 1921 Treaty of Kars line with Turkey
  [48.9, 38.45], [48, 38.9], [46.6, 38.9], [45.5, 39.2], [44.8, 39.7],
  [44.3, 40], [43.7, 40.1], [43.6, 40.7], [43.5, 41.1], [42.8, 41.5], [41.55, 41.52],
  // Across the Black Sea, dipping south to keep Crimea inside
  [36.6, 44.2], [33.6, 44.2], [31.5, 45.6],
];

/**
 * Interwar (1922–39) western frontier, south to north: Bessarabia is
 * Romanian, the Riga-line lands of western Ukraine and Belarus are Polish,
 * the Baltic states are independent, and Finland keeps Ladoga Karelia and
 * the Petsamo corridor to the Arctic.
 */
const USSR_WEST_INTERWAR: Ring = [
  [30.4, 46], [29.9, 46.5], [29, 47.3], [27.8, 48.4], [26.8, 48.5], // Dniester (Romanian frontier)
  [26.3, 48.8], [26.1, 49.8], [26.6, 51.2], [27.3, 52.2], [26.8, 53.2],
  [26.6, 53.9], [27.2, 54.9], [28.2, 55.7], // 1921 Riga line with Poland
  [27.9, 56.3], [27.7, 57.1], // Latvia (Abrene on the Latvian side)
  [27.5, 57.6], [27.4, 58.2], [28.1, 58.9], [28.4, 59.35], [28.3, 59.7], // Estonia (trans-Narva Estonian)
  [29.7, 60.15], [30.2, 60.35], // 1920 Tartu line on the Karelian isthmus
  [31, 61], [32.3, 61.7], [31.8, 62.9], [30.6, 64.2], [30, 65.7],
  [29.6, 67.3], [29.2, 68.4], [29.8, 69], [31.9, 69.6], // Finland incl. Petsamo
];

/**
 * Western frontier after the annexations of 1939–40: eastern Poland to the
 * Molotov line, the Baltic states, Bessarabia with northern Bukovina, and
 * the Karelian isthmus taken in the Winter War. Kaliningrad, Memel,
 * Transcarpathia and Petsamo are still outside.
 */
const USSR_WEST_1940: Ring = [
  [29.8, 45.3], [28.2, 45.5], [28.1, 46.5], [26.9, 48], [26.6, 48.25], // Danube–Prut (Bessarabia annexed)
  [25.9, 47.95], [24.9, 47.75], [24.2, 48.35], [23, 48.9], [22.7, 49.15], // northern Bukovina; Carpathian crest
  [22.65, 49.5], [23.6, 50.4], [23.65, 51.3], [23.6, 52.1], // Molotov line (San and Bug rivers)
  [22.2, 52.8], [22.4, 53.7], [23.5, 54.2], // Białystok salient
  [22.8, 54.36], [21.2, 55.2], [21, 55.7], // East Prussian frontier (Lithuanian SSR)
  [20.9, 56.4], [21, 57.6], [22, 58.3], [23, 59.2], [25.5, 59.9], // Baltic coast (Latvia and Estonia annexed)
  [27.4, 60.6], [28.8, 61.2], [29.8, 61.7], [31.3, 62.9], [30.2, 64.2],
  [29.8, 65.7], [29.1, 67.3], [28.5, 68.5], [29.5, 69], [31.9, 69.6], // 1940 Moscow-peace line (Petsamo still Finnish)
];

/** The fifteen union republics, as their Natural Earth successor states. */
const SOVIET_REPUBLICS = [
  'Russia', 'Ukraine', 'Belarus', 'Moldova', 'Estonia', 'Latvia', 'Lithuania',
  'Georgia', 'Armenia', 'Azerbaijan', 'Kazakhstan', 'Uzbekistan',
  'Turkmenistan', 'Kyrgyzstan', 'Tajikistan',
];

/** The GDR: the Oder–Neisse line and the inner German border. */
const EAST_GERMANY: Ring = [
  [10.9, 54.1], [12.1, 54.3], [12.9, 54.55], [13.8, 54.75], [14.28, 54.1], [14.28, 53.6], // Baltic coast
  [14.15, 52.9], [14.6, 52.6], [14.55, 52.4], [14.72, 52.1], [14.6, 51.8],
  [15, 51.35], [14.95, 51.05], [14.82, 50.87], // Oder–Neisse line
  [14.3, 50.9], [13.5, 50.65], [13, 50.5], [12.35, 50.25], [12.1, 50.32], // Czechoslovak frontier
  [11.9, 50.42], [11.5, 50.4], [11.3, 50.55], [10.7, 50.65], [10, 50.55],
  [10.1, 50.95], [9.95, 51.35], [10.2, 51.6], [10.65, 51.9], [10.95, 52.05],
  [10.7, 52.4], [10.95, 52.85], [11.5, 52.95], [11.3, 53.1], [10.85, 53.35],
  [10.75, 53.75], // inner German border
];

/** Post-Roman, early-modern and twentieth-century European states not covered elsewhere. */
export const EUROPE_ENTITIES: HistoricalEntity[] = [
  {
    id: 'first-bulgarian-empire',
    name: 'First Bulgarian Empire',
    category: 'empire',
    start: ce(681),
    end: ce(1018),
    confidence: 'low',
    colour: '#8a5a7a',
    labelImportance: 2,
    successorIds: ['byzantine-empire'],
    description:
      'A powerful medieval Balkan state that repeatedly rivalled Byzantium, adopted Christianity and Slavonic letters, and shaped the culture of south-eastern Europe.',
    sources: [src('Fine 1983, The Early Medieval Balkans')],
    snapshots: [
      snap(ce(900).year, poly([[20, 41], [26, 42.5], [29, 44], [27, 46], [22, 45], [19, 43], [20, 41]]), 'low', 'Balkan extent under Simeon I, approximate.'),
    ],
  },
  {
    id: 'kingdom-of-hungary',
    name: 'Kingdom of Hungary',
    category: 'kingdom',
    start: ce(1000),
    end: ce(1918),
    confidence: 'medium',
    colour: '#7a8a4a',
    labelImportance: 3,
    successorIds: ['habsburg-monarchy'],
    description:
      'A major Christian kingdom of the Carpathian Basin from the coronation of Stephen I, later joined to the Habsburg lands and, after 1867, a co-equal partner in Austria-Hungary.',
    sources: [src('Engel 2001, The Realm of St Stephen: A History of Medieval Hungary')],
    snapshots: [
      snap(ce(1200).year, poly([[16, 46], [19, 48.5], [22, 49], [26, 47.5], [23, 45], [18, 45], [16, 46]]), 'medium', 'Medieval Kingdom of Hungary in the Carpathian Basin, approximate.'),
    ],
  },
  {
    id: 'serbian-empire',
    name: 'Serbian Empire',
    category: 'empire',
    start: ce(1346),
    end: ce(1371),
    confidence: 'low',
    colour: '#9a6a5a',
    labelImportance: 2,
    successorIds: ['ottoman-empire'],
    description:
      'A short-lived but expansive Balkan empire under Stefan Dušan, who took the title of Emperor of the Serbs and Greeks before it fragmented and fell to the Ottomans.',
    sources: [src('Fine 1994, The Late Medieval Balkans')],
    snapshots: [
      snap(ce(1355).year, poly([[18, 41], [22, 42.5], [24, 43.5], [22, 44.5], [19, 43.5], [18, 42], [18, 41]]), 'low', 'Extent under Stefan Dušan, approximate.'),
    ],
  },
  {
    id: 'venetian-republic',
    name: 'Republic of Venice',
    alternativeNames: ['Venetian Republic', 'La Serenissima'],
    category: 'republic',
    start: ce(697),
    end: ce(1797),
    confidence: 'medium',
    colour: '#4a7a9a',
    labelImportance: 3,
    description:
      'A long-lived maritime republic centred on Venice, which dominated Mediterranean trade for centuries through a network of coastal and island possessions (the Stato da Màr) from the Adriatic to the Aegean.',
    sources: [src('Norwich 1982, A History of Venice')],
    snapshots: [
      snap(ce(1450).year, mpoly(
        [[10.5, 44.8], [13.5, 45.3], [14, 46.2], [12, 46.5], [10.6, 45.5], [10.5, 44.8]],
        [[13, 42], [19, 40], [20, 42], [15, 44], [13, 43], [13, 42]],
        [[23, 35], [26, 35.2], [26, 36], [23.5, 36], [23, 35]],
      ), 'medium', 'Venetian mainland and maritime empire (Dalmatia, Ionian and Aegean posts), highly schematic.'),
    ],
  },
  {
    id: 'kingdom-of-france',
    name: 'Kingdom of France',
    alternativeNames: ['Capetian France', 'Ancien Régime'],
    category: 'kingdom',
    start: ce(987),
    end: ce(1792),
    confidence: 'high',
    colour: '#3f6fb0',
    labelImportance: 4,
    predecessorIds: ['frankish-empire'],
    successorIds: ['france'],
    description:
      'The medieval and early-modern French monarchy from the accession of Hugh Capet, which grew from a small royal domain around Paris into one of Europe’s dominant powers before the Revolution of 1789–92.',
    sources: [src('Jones 1994, The Cambridge Illustrated History of France')],
    snapshots: [
      snap(ce(1180).year, poly([[-2, 43.5], [0, 46], [3, 48], [4, 49], [3, 50], [0, 49], [-1.5, 47], [-2, 45], [-2, 43.5]]), 'high', 'Royal domain and vassals under Philip II, approximate.'),
      snap(ce(1700).year, poly([[-4.5, 43], [-1, 46], [2, 49], [5, 49.5], [8, 48.5], [7.5, 45], [4, 43], [0, 42.5], [-4.5, 43]]), 'high', 'France under Louis XIV, approximate.'),
    ],
  },
  {
    id: 'polish-lithuanian',
    name: 'Polish–Lithuanian Commonwealth',
    category: 'confederation',
    start: ce(1569),
    end: ce(1795),
    confidence: 'medium',
    colour: '#6a7ab0',
    labelImportance: 4,
    predecessorIds: ['kingdom-of-poland', 'grand-duchy-of-lithuania'],
    description:
      'A vast dual state of Poland and Lithuania with an elective monarchy and a powerful noble parliament — one of Europe’s largest and most populous polities before its partition by neighbouring powers in the late 18th century.',
    sources: [src('Davies 2005, God’s Playground: A History of Poland')],
    snapshots: [
      snap(ce(1650).year, poly([[15, 50], [21, 54], [26, 56], [32, 54], [32, 50], [28, 47], [22, 48], [17, 49], [15, 50]]), 'medium', 'Commonwealth at its height, approximate.'),
    ],
  },
  {
    id: 'habsburg-monarchy',
    name: 'Habsburg Monarchy',
    alternativeNames: ['Austrian Empire', 'Austria-Hungary'],
    category: 'empire',
    start: ce(1526),
    end: ce(1918),
    confidence: 'medium',
    colour: '#8a7ab0',
    labelImportance: 4,
    predecessorIds: ['duchy-of-austria', 'bohemia', 'kingdom-of-hungary', 'holy-roman-empire'],
    description:
      'The composite central-European monarchy of the House of Habsburg — Austria, Bohemia, Hungary and more — which endured as the Austrian Empire and then Austria-Hungary until its collapse in 1918.',
    sources: [src('Judson 2016, The Habsburg Empire: A New History')],
    snapshots: [
      snap(ce(1720).year, poly([[9, 45.5], [14, 48.5], [19, 49.5], [24, 48], [26, 45.5], [22, 44.5], [16, 45], [11, 46], [9, 45.5]]), 'medium', 'Habsburg lands after 1718, approximate.'),
    ],
  },
  {
    id: 'russian-empire',
    name: 'Russian Empire',
    category: 'empire',
    start: ce(1721),
    end: ce(1917),
    confidence: 'high',
    colour: '#7a6a9a',
    labelImportance: 5,
    predecessorIds: ['tsardom-of-russia'],
    successorIds: ['soviet-union'],
    description:
      'The empire proclaimed by Peter the Great, which expanded across northern Eurasia to become one of the largest states in history before the revolutions of 1917.',
    sources: [src('Lieven 2000, Empire: The Russian Empire and Its Rivals')],
    snapshots: [
      snap(ce(1721).year, poly([[21.5, 57], [30, 65], [40, 60], [60, 68], [100, 72], [140, 70], [178, 66], [178, 60], [150, 55], [130, 48], [105, 50], [80, 50], [58, 46], [44, 50], [30, 50.3], [21.5, 57]]), 'high', 'Russian Empire at Peter the Great’s 1721 proclamation, approximate.'),
      snap(ce(1866).year, poly([[28, 50], [40, 60], [60, 68], [100, 72], [140, 70], [178, 66], [178, 60], [150, 55], [130, 48], [105, 50], [80, 50], [58, 46], [40, 44], [30, 46], [28, 50]]), 'high', 'Russian Empire across northern Eurasia, c. 1866 (after the sale of Alaska), approximate.'),
    ],
  },
  {
    id: 'soviet-union',
    name: 'Soviet Union',
    alternativeNames: ['USSR', 'Union of Soviet Socialist Republics'],
    category: 'modern-state',
    start: ce(1922),
    end: hd(1991.98),
    confidence: 'high',
    colour: '#a0524a',
    labelImportance: 5,
    fadeYears: 3,
    predecessorIds: ['russian-empire'],
    successorIds: [
      'russia', 'ukraine', 'belarus', 'moldova', 'estonia', 'latvia', 'lithuania',
      'georgia', 'armenia', 'azerbaijan',
      'kazakhstan', 'uzbekistan', 'turkmenistan', 'kyrgyzstan', 'tajikistan',
    ],
    description:
      'The world’s first socialist federal state, successor to the Russian Empire and a 20th-century superpower of fifteen republics across Eurasia. It annexed the Baltic states, eastern Poland and Bessarabia in 1939–40, emerged from the Second World War with Kaliningrad, Tuva, Transcarpathia and southern Sakhalin added, led the Warsaw Pact from 1955, and dissolved in December 1991.',
    sources: [
      src('Service 2003, A History of Modern Russia'),
      src('Magocsi 2018, Historical Atlas of Central Europe'),
      src('Natural Earth (public domain) for the post-war boundary'),
    ],
    snapshots: [
      snap(1924, poly([...USSR_WEST_INTERWAR, ...USSR_ARCTIC_TO_BLACK_SEA]), 'medium', 'Interwar borders: without the Baltic states, western Ukraine and Belarus (Polish), Bessarabia (Romanian), Tuva, southern Sakhalin and the Kurils.'),
      snap(1939.6, poly([...USSR_WEST_INTERWAR, ...USSR_ARCTIC_TO_BLACK_SEA]), 'medium', 'Interwar borders held until the invasions and annexations that began in September 1939.'),
      snap(1940.7, poly([...USSR_WEST_1940, ...USSR_ARCTIC_TO_BLACK_SEA]), 'medium', 'After the annexations of 1939–40: eastern Poland, the Baltic states, Bessarabia with northern Bukovina, and the Karelian isthmus.'),
      snap(1945.7, { naturalEarthCountries: SOVIET_REPUBLICS }, 'high', 'Post-war USSR — the union of its fifteen republics (Natural Earth), adding Kaliningrad, Petsamo, Transcarpathia, Tuva, southern Sakhalin and the Kurils. External border unchanged until 1991.'),
    ],
  },
  {
    id: 'east-germany',
    name: 'East Germany',
    alternativeNames: ['German Democratic Republic', 'GDR', 'DDR'],
    category: 'modern-state',
    start: ce(1949),
    end: hd(1990.75),
    confidence: 'high',
    colour: '#9a5a4a',
    labelImportance: 2,
    fadeYears: 1,
    predecessorIds: ['germany'],
    successorIds: ['germany'],
    description:
      'The German Democratic Republic, the Soviet-aligned state built in the Soviet occupation zone in 1949 and a founding member of the Warsaw Pact. It was absorbed into the Federal Republic at reunification on 3 October 1990.',
    sources: [
      src('Fulbrook 2005, The People’s State: East German Society from Hitler to Honecker'),
    ],
    snapshots: [
      snap(1955, poly(EAST_GERMANY), 'high', 'The GDR between the Oder–Neisse line and the inner German border. West Berlin (a Western enclave inside it) is not shown.'),
    ],
  },
  {
    id: 'czechoslovakia',
    name: 'Czechoslovakia',
    category: 'modern-state',
    start: ce(1918),
    end: ce(1993),
    confidence: 'medium',
    colour: '#6a7a9a',
    labelImportance: 2,
    fadeYears: 1,
    predecessorIds: ['habsburg-monarchy'],
    successorIds: ['czechia', 'slovakia'],
    description:
      'The state of Czechs and Slovaks carved from Austria-Hungary in 1918, dismembered by Germany in 1938–45, re-established as a Soviet-bloc republic and founding Warsaw Pact member, and peacefully divided into Czechia and Slovakia on 1 January 1993.',
    sources: [
      src('Heimann 2009, Czechoslovakia: The State That Failed'),
      src('Natural Earth (public domain), union of the two successor states'),
    ],
    snapshots: [
      snap(1930, { naturalEarthCountries: ['Czechia', 'Slovakia'] }, 'medium', 'Bohemia, Moravia, Silesia and Slovakia (Natural Earth union of the successor states). Interwar Czechoslovakia also held Carpathian Ruthenia, ceded to the USSR in 1945; the 1939–45 German dismemberment is not shown.'),
    ],
  },
];
