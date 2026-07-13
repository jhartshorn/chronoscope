import type { HistoricalEntity } from '../../types';
import type { Ring } from '../helpers';
import { ce, mpoly, poly, snap, src } from '../helpers';

/**
 * The Holy Roman Empire (962–1806) and its major constituent territories.
 *
 * The empire itself is modelled with nine snapshots tracing its real
 * territorial history: the Ottonian union of the German and Italian
 * kingdoms (962), the addition of the Kingdom of Burgundy/Arles (1032), the
 * Hohenstaufen height (1100, 1215), the collapse of effective control over
 * Italy and Burgundy after the Great Interregnum (1273), the constitutional
 * settlement of the Golden Bull (1356), the Burgundian/Habsburg Netherlands
 * union (1500), the formal secession of Switzerland and the Dutch Republic
 * at the Peace of Westphalia (1648), and the final Rhineland losses to
 * Revolutionary France on the eve of dissolution (1801). `entities.ts`'s
 * `germany` picks up the story from the 1871 unification.
 *
 * Beneath that outer shell sit its most consequential internal territories:
 * the four post-Carolingian stem duchies (Saxony, Bavaria, Swabia,
 * Franconia), the rising Habsburg and Hohenzollern power bases (Austria,
 * Bohemia, Brandenburg), the pre-imperial Kingdom of Burgundy the empire
 * absorbed in 1032, the crusading Teutonic Order state on the Baltic
 * frontier, the Swiss Confederacy that grew out of the empire and left it,
 * and the Hanseatic League's trading network. These are political layers on
 * the same ground the outer empire polygon covers, not a partition of it —
 * see docs/METHODOLOGY.md on overlapping entities.
 */

// ---------------------------------------------------------------------------
// Holy Roman Empire — outer bounds by era
// ---------------------------------------------------------------------------

/** 962: Otto I's coronation unites the German and (northern/central) Italian kingdoms. */
const HRE_962: Ring = [
  [5, 53.3], [9.5, 54.6], [11, 53.9], [13, 52.5], [14.5, 50.8], [16.3, 49.2],
  [15, 48], [13.5, 46.5], [12.5, 45.5], [13, 44.6], [11.8, 43.3], [10, 43.3],
  [8.3, 44.2], [7.5, 45.3], [6, 47.3], [4.3, 49.5], [3.2, 50.5], [4, 51.8], [5, 53.3],
];

/** 1032: Conrad II inherits the Kingdom of Burgundy (Arles) on Rudolf III's death. */
const HRE_1032: Ring = [
  [5, 53.3], [9.5, 54.6], [11, 53.9], [13, 52.5], [14.5, 50.8], [16.3, 49.2],
  [15, 48], [13.5, 46.5], [12.5, 45.5], [13, 44.6], [11.8, 43.3], [10, 43.3],
  [8.3, 44.2], [7.5, 45.3], [6.7, 44.5], [5.4, 43.3], [4.2, 43.7], [3.9, 45.8],
  [4.3, 47.3], [6, 47.5], [4.3, 49.5], [3.2, 50.5], [4, 51.8], [5, 53.3],
];

/** 1100 and 1215: the empire near its territorial height, Italy and Burgundy included. */
const HRE_HEIGHT: Ring = [
  [5, 53.3], [9.5, 54.6], [11.5, 54], [13.5, 52.7], [15, 51], [16.8, 49.2],
  [16.5, 47.8], [14, 46.5], [12.5, 45.5], [13, 44.6], [11.8, 43.3], [10, 43.3],
  [8.3, 44.2], [7.5, 45.3], [6.7, 44.5], [5.4, 43.3], [4.2, 43.7], [3.9, 45.8],
  [4.3, 47.3], [6, 47.5], [4.3, 49.5], [3.2, 50.5], [4, 51.8], [5, 53.3],
];

/** 1273: after the Great Interregnum, Italy and most of Burgundy are lost in practice. */
const HRE_1273: Ring = [
  [5, 53.3], [9.5, 54.6], [11.5, 54], [14, 54.3], [15.5, 52.5], [16.5, 50.8],
  [16.8, 49], [16.5, 47.7], [14, 46.5], [11, 46.3], [8.5, 46.2], [6.8, 46.5],
  [6, 47.4], [4.3, 47.4], [3.7, 49.2], [3.2, 50.5], [4, 51.8], [5, 53.3],
];

/** 1356: the Golden Bull's electoral settlement; Bohemia's Silesian gains push the frontier east. */
const HRE_1356: Ring = [
  [5, 53.3], [9.5, 54.6], [11.5, 54], [14.2, 54.4], [16, 52.8], [17.5, 50.9],
  [17, 49], [16.5, 47.7], [14, 46.5], [11, 46.3], [8.5, 46.2], [6.8, 46.5],
  [6, 47.4], [4.3, 47.4], [3.7, 49.2], [3.2, 50.5], [4, 51.8], [5, 53.3],
];

/** 1500: the 1477/1482 Habsburg marriage brings the Burgundian Netherlands into the union. */
const HRE_1500: Ring = [
  [6, 53.4], [4.5, 53.3], [3.5, 51.5], [2.5, 50.8], [3, 49.9], [3.7, 49.2],
  [4.3, 47.4], [6, 47.4], [6.8, 46.5], [8.5, 46.2], [11, 46.3], [14, 46.5],
  [16.5, 47.7], [17, 49], [17.5, 50.9], [16, 52.8], [14.2, 54.4], [11.5, 54], [9.5, 54.6], [6, 53.4],
];

/** Alpine block excised at 1648: the Swiss Confederacy's formal secession. */
const SWITZERLAND_HOLE: Ring = [
  [7, 47.7], [8.5, 47.5], [9.5, 47], [10.2, 46.3], [9, 46], [7.5, 46.1],
  [6.7, 46.5], [6.2, 46.3], [6, 46.8], [6.5, 47.3], [7, 47.7],
];

/**
 * 1648: the Peace of Westphalia formally recognises Swiss and Dutch
 * independence (the Dutch Republic is trimmed from the outline; the
 * Catholic south — modern Belgium — stays in as the Burgundian Circle), and
 * France annexes most of Alsace, pushing the western frontier to the Rhine.
 */
const HRE_1648_OUTER: Ring = [
  [6.8, 53.3], [4.7, 51.4], [4.3, 50.8], [4.9, 49.5], [6.2, 49.4], [7.5, 48.6],
  [7.6, 47.6], [8.5, 46.2], [11, 46.3], [14, 46.5], [16.5, 47.7], [17, 49],
  [17.5, 50.9], [16, 52.8], [14.2, 54.4], [11.5, 54], [9.5, 54.6], [6.8, 53.3],
];

/** 1801: the Treaty of Lunéville cedes the whole left bank of the Rhine to France. */
const HRE_1801_OUTER: Ring = [
  [7.4, 53.3], [6, 51.8], [6.8, 50.8], [7.9, 50.3], [8.2, 49.5], [8.3, 48.9],
  [7.8, 47.6], [8.5, 46.2], [11, 46.3], [14, 46.5], [16.5, 47.7], [17, 49],
  [17.5, 50.9], [16, 52.8], [14.2, 54.4], [11.5, 54], [9.5, 54.6], [7.4, 53.3],
];

/** Northern/central Kingdom of Italy under Ottonian and early Salian rule. */
const ITALY_REGNUM: Ring = [
  [7.3, 44.8], [8.3, 44.2], [10, 43.3], [11.8, 43.3], [13, 44.6], [12.5, 45.5],
  [11, 46], [9, 45.8], [7.3, 44.8],
];

export const HRE_ENTITIES: HistoricalEntity[] = [
  {
    id: 'holy-roman-empire',
    name: 'Holy Roman Empire',
    alternativeNames: ['Sacrum Romanum Imperium'],
    category: 'empire',
    start: ce(962),
    end: ce(1806),
    confidence: 'medium',
    colour: '#8a7db0',
    labelImportance: 4,
    predecessorIds: ['frankish-empire', 'roman-empire'],
    successorIds: ['germany'],
    description:
      'A complex, decentralised polity of central Europe — hundreds of duchies, principalities, prince-bishoprics and free cities under an elected emperor — from Otto I’s imperial coronation in 962 until Francis II laid down the crown in 1806. It briefly spanned Germany, northern/central Italy and Burgundy; effective control of Italy and Burgundy receded after the 13th century, and Switzerland and the Dutch Republic left formally in 1648. The outline shown is always the empire’s broad outer bounds — a patchwork of hundreds of virtually sovereign territories, not a unitary state.',
    sources: [
      src('Wilson 2016, Heart of Europe: A History of the Holy Roman Empire'),
      src('Whaley 2012, Germany and the Holy Roman Empire, Vol. I–II'),
    ],
    snapshots: [
      snap(ce(962).year, mpoly(HRE_962, ITALY_REGNUM), 'medium', 'Otto I crowned emperor in Rome, 962, uniting the kingdoms of Germany and Italy; the Kingdom of Burgundy is still independent.'),
      snap(ce(1032).year, mpoly(HRE_1032, ITALY_REGNUM), 'medium', 'Conrad II inherits the Kingdom of Burgundy (Arles) on the death of the childless Rudolf III, 1032 — the empire’s three-kingdom form (Germany, Italy, Burgundy) is complete.'),
      snap(ce(1100).year, mpoly(HRE_HEIGHT, ITALY_REGNUM), 'medium', 'Near the empire’s territorial height under the Salians, despite the Investiture Controversy crippling the emperor’s real authority over bishoprics.'),
      snap(ce(1215).year, mpoly(HRE_HEIGHT, ITALY_REGNUM), 'medium', 'Frederick II confirmed king at Aachen, 1215: Hohenstaufen power at its peak, though the Lombard cities of the Italian kingdom are increasingly self-governing communes in practice.'),
      snap(ce(1273).year, poly(HRE_1273), 'medium', 'Rudolf I of Habsburg elected, ending the Great Interregnum (1254–73): effective imperial authority over Italy and most of the Kingdom of Burgundy has been lost, leaving the German-speaking core.'),
      snap(ce(1356).year, poly(HRE_1356), 'medium', 'The Golden Bull of Charles IV fixes the seven-elector constitution; Bohemia’s absorption of Silesia and Lusatia pushes the eastern frontier outward.'),
      snap(ce(1500).year, poly(HRE_1500), 'medium', 'After Maximilian I’s 1477 marriage to Mary of Burgundy: the Burgundian (Habsburg) Netherlands are added in the north-west, formalised as the Burgundian Circle in 1512.'),
      snap(ce(1648).year, poly(HRE_1648_OUTER, SWITZERLAND_HOLE), 'high', 'The Peace of Westphalia formally recognises Swiss and Dutch independence and confirms France’s gains in Alsace; the Catholic south (modern Belgium) remains in the empire as the Burgundian Circle.'),
      snap(ce(1801).year, poly(HRE_1801_OUTER, SWITZERLAND_HOLE), 'medium', 'The Treaty of Lunéville cedes the whole left bank of the Rhine to France, five years before Francis II dissolves the empire (6 August 1806).'),
    ],
  },

  // ---------------------------------------------------- the four stem duchies
  {
    id: 'duchy-of-saxony',
    name: 'Duchy of Saxony',
    category: 'kingdom',
    start: ce(911),
    end: ce(1180),
    confidence: 'medium',
    colour: '#7a6aa0',
    labelImportance: 2,
    predecessorIds: ['frankish-empire'],
    description:
      'One of the four post-Carolingian stem duchies, stretching from Westphalia to the lower Elbe; its dukes provided the Ottonian imperial dynasty (919–1024). Under Henry the Lion it expanded deep into Slavic lands north-east of the Elbe before Frederick Barbarossa stripped and partitioned it in 1180.',
    sources: [src('Reuter 1991, Germany in the Early Middle Ages 800–1056')],
    snapshots: [
      snap(ce(950).year, poly([[6, 51.5], [7.5, 53.5], [9, 54.5], [11, 53.8], [11.5, 52.5], [10, 51], [8, 50.7], [6.5, 50.8], [6, 51.5]]), 'medium', 'The Ottonian-era duchy: Westphalia, Engern and Eastphalia to the Elbe.'),
      snap(ce(1150).year, poly([[6, 51.5], [7.5, 53.5], [9, 54.5], [12.5, 54], [13.5, 53.2], [12, 52], [11.5, 52.5], [10, 51], [8, 50.7], [6.5, 50.8], [6, 51.5]]), 'medium', 'Under Henry the Lion: Slavic Mecklenburg and Holstein brought under Saxon overlordship in the Wendish Crusade (from 1147).'),
      snap(ce(1179).year, poly([[6, 51.5], [7.5, 53.5], [9, 54.5], [12.5, 54], [13.5, 53.2], [12, 52], [11.5, 52.5], [10, 51], [8, 50.7], [6.5, 50.8], [6, 51.5]]), 'medium', 'On the eve of the 1180 Diet of Gelnhausen, where Frederick Barbarossa stripped Henry the Lion of the duchy and broke it up.'),
    ],
  },
  {
    id: 'duchy-of-bavaria',
    name: 'Duchy of Bavaria',
    category: 'kingdom',
    start: ce(907),
    end: ce(1806),
    confidence: 'medium',
    colour: '#5a8a6a',
    labelImportance: 2,
    predecessorIds: ['frankish-empire'],
    description:
      'A stem duchy of the south-eastern empire, originally including the marches of Austria and Carinthia (both split off as separate duchies, 976). Passed to the Wittelsbach family in 1180, who held it (as Duchy, then Electorate from 1623) continuously into the 19th century.',
    sources: [src('Reuter 1991, Germany in the Early Middle Ages 800–1056'), src('Whaley 2012, Germany and the Holy Roman Empire, Vol. I')],
    snapshots: [
      snap(ce(950).year, poly([[10, 49.5], [13, 49.3], [14.5, 48.5], [16, 47.5], [15, 46.3], [13, 46], [11, 46.2], [10, 47], [10, 49.5]]), 'low', 'The greater stem duchy, still including the eastern marches (Austria, Carinthia) later split off.'),
      snap(ce(1180).year, poly([[10, 49.5], [12.5, 49.3], [13.3, 48.5], [13, 47.3], [12, 46.5], [10.5, 47], [10, 49.5]]), 'medium', 'The Wittelsbach duchy after the 1156 and 1180 partitions: Austria, Styria and Carinthia are now separate duchies.'),
      snap(ce(1500).year, poly([[11, 49.7], [12.5, 49.5], [12.7, 49], [13.8, 48.9], [13.3, 48], [12, 47.3], [10.5, 47.5], [10, 48.5], [11, 49.7]]), 'medium', 'The core Wittelsbach lands, roughly stable across the late medieval centuries; the Upper Palatinate is a separate branch.'),
      snap(ce(1779).year, poly([[11, 49.7], [12.5, 49.5], [12.7, 49], [13.8, 48.9], [13.5, 48.2], [13.3, 48], [12, 47.3], [10.5, 47.5], [10, 48.5], [11, 49.7]]), 'medium', 'After the War of the Bavarian Succession (1778–79) confirms the Innviertel remains Bavarian rather than passing to Austria.'),
    ],
  },
  {
    id: 'duchy-of-swabia',
    name: 'Duchy of Swabia',
    alternativeNames: ['Duchy of Alemannia'],
    category: 'kingdom',
    start: ce(915),
    end: ce(1268),
    confidence: 'medium',
    colour: '#9a7a5a',
    labelImportance: 2,
    predecessorIds: ['frankish-empire'],
    successorIds: ['swiss-confederacy'],
    description:
      'The stem duchy of the Alemanni, roughly modern Baden-Württemberg, Alsace and northern Switzerland — the Hohenstaufen family’s original power base. It was never reconstituted after the last duke, the boy Conradin, was executed in 1268; its lands fragmented into countless free cities, lesser lordships and, eventually, the Swiss cantons.',
    sources: [src('Reuter 1991, Germany in the Early Middle Ages 800–1056')],
    snapshots: [
      snap(ce(950).year, poly([[7, 49.5], [9, 49.7], [10, 49], [10, 47.5], [8.5, 46.3], [7, 46.5], [6.5, 47.5], [7, 49.5]]), 'medium', 'The Ottonian-era stem duchy of the Alemanni.'),
      snap(ce(1250).year, poly([[7, 49.7], [9.2, 49.9], [10.2, 49.2], [10.2, 47.6], [8.7, 46.2], [7, 46.6], [6.3, 47.6], [7, 49.7]]), 'medium', 'Under Hohenstaufen rule shortly before the dynasty’s extinction; the duchy’s authority is already fragmenting into direct-imperial cities and lordships.'),
    ],
  },
  {
    id: 'duchy-of-franconia',
    name: 'Duchy of Franconia',
    category: 'kingdom',
    start: ce(911),
    end: ce(1017),
    confidence: 'low',
    colour: '#8a9a5a',
    labelImportance: 1,
    predecessorIds: ['frankish-empire'],
    description:
      'The smallest and shortest-lived of the stem duchies, centred on the middle Rhine and Main around Würzburg. Weakened by rebellion, it was never reconstituted after 1017 and dissolved into a mosaic of prince-bishoprics (Würzburg, Bamberg, Mainz) and lesser counties directly under the crown.',
    sources: [src('Reuter 1991, Germany in the Early Middle Ages 800–1056')],
    snapshots: [
      snap(ce(950).year, poly([[7.5, 49.5], [9.5, 50.5], [11, 50], [10.5, 49], [9, 49], [7.5, 49.5]]), 'low', 'Approximate extent around the middle Rhine and Main; never a well-bounded territorial bloc even at its height.'),
    ],
  },

  // ---------------------------------------------------- rising powers
  {
    id: 'duchy-of-austria',
    name: 'Austria',
    alternativeNames: ['March of Austria', 'Duchy of Austria', 'Archduchy of Austria'],
    category: 'kingdom',
    start: ce(976),
    end: ce(1526),
    confidence: 'medium',
    colour: '#a0724a',
    labelImportance: 3,
    predecessorIds: ['duchy-of-bavaria'],
    successorIds: ['habsburg-monarchy'],
    description:
      'The Babenberg march re-founded on the Bavarian frontier in 976 (the "Ostarrichi" first recorded in 996), raised to a duchy by the 1156 Privilegium Minus, inherited by the Habsburgs in 1282 after Rudolf I’s victory over Ottokar II of Bohemia, and recognised as an archduchy by the 1453 Privilegium Maius. Its rulers became Holy Roman Emperors almost continuously from 1438 and the core of the later Habsburg Monarchy.',
    sources: [
      src('Judson 2016, The Habsburg Empire: A New History'),
      src('Wilson 2016, Heart of Europe: A History of the Holy Roman Empire'),
    ],
    snapshots: [
      snap(ce(996).year, poly([[14.8, 48.7], [15.5, 48.4], [16.5, 48.2], [16, 47.5], [15, 47.7], [14.8, 48.7]]), 'low', 'The small frontier march on the Danube, first called "Ostarrichi" in a 996 charter.'),
      snap(ce(1156).year, poly([[14.5, 49], [15.5, 48.8], [16.8, 48.3], [16.8, 47.5], [15.5, 47], [14.3, 47.8], [14.5, 49]]), 'medium', 'Raised to a duchy by the Privilegium Minus, 1156, with an expanded Danube valley.'),
      snap(ce(1282).year, poly([[14, 49], [15.5, 48.8], [16.8, 48.3], [16.5, 46.8], [14.8, 46.3], [13.5, 47], [14, 49]]), 'medium', 'Rudolf I invests his sons with Austria and Styria, 1282, founding Habsburg rule after the Babenbergs’ 1246 extinction and the defeat of Ottokar II of Bohemia at Dürnkrut (1278).'),
      snap(ce(1453).year, poly([[12, 47.3], [14, 49], [15.5, 48.8], [16.8, 48.3], [16.5, 46.5], [14, 46.3], [13, 46.7], [12, 47.3]]), 'medium', 'The Privilegium Maius (drafted 1358–59, recognised 1453) confirms the archduchy; Tyrol and Carinthia are added to the Habsburg bloc across the 14th century.'),
    ],
  },
  {
    id: 'bohemia',
    name: 'Bohemia',
    alternativeNames: ['Duchy of Bohemia', 'Kingdom of Bohemia', 'Czech Lands'],
    category: 'kingdom',
    start: ce(895),
    end: ce(1526),
    confidence: 'medium',
    colour: '#4a7a9a',
    labelImportance: 3,
    predecessorIds: ['frankish-empire'],
    successorIds: ['habsburg-monarchy'],
    description:
      'The Přemyslid duchy of the Czechs, an imperial vassal from the 10th century, raised to a hereditary kingdom in 1198/1212 and one of the seven electorates named in the 1356 Golden Bull. Under Charles IV (r. 1346–78), also Holy Roman Emperor, it absorbed Moravia, Silesia and Lusatia and Prague briefly became the empire’s political capital. The 1526 election of the Habsburg Ferdinand I began three centuries of Habsburg kingship.',
    sources: [
      src('Agnew 2004, The Czechs and the Lands of the Bohemian Crown'),
      src('Wilson 2016, Heart of Europe: A History of the Holy Roman Empire'),
    ],
    snapshots: [
      snap(ce(950).year, poly([[12.2, 50.3], [13, 51], [14.5, 51], [15.3, 50.5], [14.8, 49], [13, 48.6], [12.2, 49.5], [12.2, 50.3]]), 'medium', 'The Přemyslid duchy of Bohemia proper, before the acquisition of Moravia.'),
      snap(ce(1212).year, poly([[12.2, 50.3], [13, 51], [14.5, 51], [16.5, 49.5], [16.3, 48.9], [14.8, 49], [13, 48.6], [12.2, 49.5], [12.2, 50.3]]), 'medium', 'The Golden Bull of Sicily (1212) confirms Bohemia as a hereditary kingdom, with Moravia integrated as a margraviate under the Bohemian crown.'),
      snap(ce(1355).year, poly([[12.2, 50.3], [13, 51.5], [14.5, 52.3], [15.5, 51.8], [17.5, 51.3], [18, 50.5], [17, 49.5], [16.8, 48.7], [16.3, 48.9], [14.8, 49], [13, 48.6], [12.2, 49.5], [12.2, 50.3]]), 'medium', 'Under Charles IV: Silesia (from 1335) and Upper and Lower Lusatia (1319/1370) join the Lands of the Bohemian Crown.'),
    ],
  },
  {
    id: 'brandenburg',
    name: 'Brandenburg',
    alternativeNames: ['Margraviate of Brandenburg', 'Electorate of Brandenburg'],
    category: 'kingdom',
    start: ce(1157),
    end: ce(1701),
    confidence: 'medium',
    colour: '#5a5a8a',
    labelImportance: 2,
    successorIds: ['germany'],
    description:
      'A frontier march carved from Slavic Wendish land by Albert the Bear in 1157, made an electorate by the 1356 Golden Bull and acquired by the Hohenzollern family in 1417. United with the Duchy of Prussia (outside the empire) in 1618, the Hohenzollern electors were crowned Kings in Prussia in 1701, founding the state that would later unify Germany.',
    sources: [
      src('Clark 2006, Iron Kingdom: The Rise and Downfall of Prussia'),
      src('Wilson 2016, Heart of Europe: A History of the Holy Roman Empire'),
    ],
    snapshots: [
      snap(ce(1157).year, poly([[11.8, 52.1], [13, 52.8], [14, 52.5], [13.5, 51.8], [12, 51.8], [11.8, 52.1]]), 'low', 'Albert the Bear’s original march around Brandenburg and the Havelland, taken from the Slavic Hevelli.'),
      snap(ce(1417).year, poly([[11.8, 52.1], [13, 52.8], [15, 52.8], [14.5, 51.8], [13.5, 51.8], [12, 51.8], [11.8, 52.1]]), 'medium', 'The Neumark added and the Hohenzollern Frederick I invested as elector, 1417.'),
      snap(ce(1650).year, poly([[11.8, 52.1], [13, 53], [14.5, 53.5], [15.5, 53.7], [16, 52.8], [15, 52.6], [15, 51.8], [13.5, 51.8], [12, 51.8], [11.8, 52.1]]), 'medium', 'After the Peace of Westphalia (1648) adds Farther Pomerania; the personal union with the separate Duchy of Prussia (from 1618) is not shown.'),
    ],
  },

  // ---------------------------------------------------- other polities of the empire's orbit
  {
    id: 'kingdom-of-burgundy-arles',
    name: 'Kingdom of Burgundy',
    alternativeNames: ['Kingdom of Arles', 'Arelat'],
    category: 'kingdom',
    start: ce(933),
    end: ce(1032),
    confidence: 'low',
    colour: '#b08a4a',
    labelImportance: 1,
    predecessorIds: ['frankish-empire'],
    successorIds: ['holy-roman-empire'],
    description:
      'A kingdom formed in 933 by the union of Transjurane and Cisjurane Burgundy — the Rhône valley, Provence and the western Alps — outside Carolingian East or West Francia. Its last king, Rudolf III, willed it to the Salian emperor Conrad II, who inherited it in 1032 and folded it into the Holy Roman Empire as its third constituent kingdom.',
    sources: [src('Wilson 2016, Heart of Europe: A History of the Holy Roman Empire')],
    snapshots: [
      snap(ce(950).year, poly([[4, 46], [5, 47.3], [6.5, 47.3], [7, 46.3], [6, 44], [4.5, 43.3], [3.5, 44], [4, 46]]), 'low', 'The united kingdom of Burgundy under Conrad the Peaceful, approximate.'),
    ],
  },
  {
    id: 'teutonic-order-state',
    name: 'State of the Teutonic Order',
    alternativeNames: ['Ordensstaat', 'Monastic State of the Teutonic Knights'],
    category: 'kingdom',
    start: ce(1230),
    end: ce(1525),
    confidence: 'medium',
    colour: '#556b7a',
    labelImportance: 2,
    description:
      'A crusading theocracy carved out of pagan Prussia from 1230 by the Teutonic Knights, an Imperial military-religious order. A separate Livonian branch (in modern Estonia and Latvia) is not shown. Broken as a great power at Grunwald (1410) and reduced to a Polish fief by the Second Peace of Thorn (1466), it was secularised in 1525 into the Duchy of Prussia.',
    sources: [src('Christiansen 1997, The Northern Crusades'), src('Urban 2003, The Teutonic Knights: A Military History')],
    snapshots: [
      snap(ce(1250).year, poly([[18.5, 54.5], [21, 55.2], [22.5, 54.7], [21, 53.5], [19, 53.3], [18.5, 54.5]]), 'medium', 'The core conquest of Prussia along the Baltic, still consolidating.'),
      snap(ce(1410).year, poly([[17, 54.5], [18.7, 54.9], [21, 55.2], [22.5, 54.7], [21, 53.5], [19, 53.3], [17.5, 53.6], [17, 54.5]]), 'medium', 'Near-maximum extent on the eve of the Battle of Grunwald/Tannenberg (1410), including Pomerelia and Danzig.'),
      snap(ce(1466).year, poly([[19, 54.8], [21, 55.2], [22.5, 54.7], [21, 53.5], [19.5, 53.5], [19, 54.8]]), 'medium', 'After the Second Peace of Thorn (1466): West Prussia and Danzig ceded to Poland, the remaining East Prussia held as a Polish fief.'),
    ],
  },
  {
    id: 'swiss-confederacy',
    name: 'Old Swiss Confederacy',
    alternativeNames: ['Swiss Confederacy', 'Eidgenossenschaft'],
    category: 'confederation',
    start: ce(1291),
    end: ce(1798),
    confidence: 'medium',
    colour: '#c0392b',
    labelImportance: 3,
    predecessorIds: ['duchy-of-swabia'],
    successorIds: ['switzerland'],
    description:
      'A defensive league of Alpine communities founded by the 1291 Federal Charter (traditionally the alliance of Uri, Schwyz and Unterwalden), which grew to thirteen full cantons and associated territories by 1513. It won de facto independence from the empire in the 1499 Swabian War and formal recognition at the 1648 Peace of Westphalia, dissolving under French invasion in 1798.',
    sources: [src('Church & Head 2013, A Concise History of Switzerland')],
    snapshots: [
      snap(ce(1315).year, poly([[8, 46.5], [8.7, 47], [8.9, 46.5], [8.3, 46.2], [8, 46.5]]), 'medium', 'The founding "forest cantons" (Uri, Schwyz, Unterwalden) around Lake Lucerne, shortly after their victory at Morgarten (1315).'),
      snap(ce(1499).year, poly([[6.8, 46.1], [7.5, 47.5], [9, 47.6], [9.7, 46.9], [10.4, 46.5], [9, 45.9], [7.5, 45.9], [6.8, 46.1]]), 'medium', 'The Thirteen Cantons after the Swabian War (1499) win de facto independence from imperial jurisdiction.'),
      snap(ce(1648).year, poly([[6.8, 46.1], [7.5, 47.5], [9, 47.6], [9.7, 46.9], [10.4, 46.5], [9, 45.9], [7.5, 45.9], [6.8, 46.1]]), 'high', 'Formal independence from the empire recognised by the Peace of Westphalia, 1648; the territorial extent is essentially unchanged from 1499.'),
    ],
  },
  {
    id: 'hanseatic-league',
    name: 'Hanseatic League',
    alternativeNames: ['Hansa', 'Hanse'],
    category: 'confederation',
    start: ce(1356),
    end: ce(1669),
    confidence: 'low',
    colour: '#2a6a8a',
    labelImportance: 2,
    description:
      'A commercial and defensive confederation of northern German and Baltic trading cities, formalised by the first general diet at Lübeck in 1356 though its trading network dated to the 12th century. At its height nearly 200 towns from Bruges to Novgorod were loosely affiliated; it never held territory as a state, so the shape shown is schematic — the coastal belt of its core member cities, not a governed area. Its last diet met in 1669.',
    sources: [src('Dollinger 1970, The German Hansa')],
    snapshots: [
      snap(ce(1400).year, poly([[5, 53], [7, 54], [10, 54.5], [14, 54.8], [19, 55], [24, 55.5], [28, 58], [24, 59.5], [18, 55.5], [12, 54], [8, 54.3], [5, 53.5], [5, 53]]), 'low', 'Schematic coastal band linking the core member cities from Bruges and the Zuiderzee to Danzig, Riga and Novgorod — not a contiguous territory.'),
    ],
  },
];
