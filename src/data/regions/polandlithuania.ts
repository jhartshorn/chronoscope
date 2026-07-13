import type { HistoricalEntity } from '../../types';
import type { Ring } from '../helpers';
import { ce, poly, snap, src } from '../helpers';

/**
 * The Kingdom of Poland and the Grand Duchy of Lithuania before their 1569
 * union, which previously appeared from nowhere as the fully-formed
 * `polish-lithuanian` Commonwealth (europe.ts, from 1569). Both hand off to
 * that entity; Lithuania's huge 15th-century reach (from the Baltic to the
 * Black Sea) and its subsequent contraction — first to Muscovy, then by
 * ceding Ukraine to the Polish Crown at the Union of Lublin itself — is the
 * headline story this module makes visible.
 */

const POLAND_966: Ring = [
  [15.5, 52.0], [16.5, 53.3], [18.5, 53.8], [19.5, 52.8], [18.5, 51.8], [16.5, 51.5], [15.5, 52.0],
];
const POLAND_1025: Ring = [
  [14.5, 51.0], [14.8, 52.7], [16.5, 54.3], [19.2, 53.5], [21.0, 53.0],
  [20.5, 49.3], [18.5, 49.2], [16.0, 49.6], [14.5, 51.0],
];
const POLAND_1370: Ring = [
  [14.5, 51.0], [14.8, 52.7], [16.5, 54.3], [19.2, 53.5], [21.0, 53.0], [24.5, 52.0],
  [25.5, 50.0], [23.0, 48.5], [20.5, 49.0], [18.5, 49.8], [16.0, 49.6], [14.5, 51.0],
];
const POLAND_1466: Ring = [
  [14.5, 51.0], [14.8, 52.7], [16.5, 54.3], [18.0, 54.8], [19.5, 54.4], [21.5, 54.8],
  [23.0, 53.5], [24.5, 52.0], [25.5, 50.0], [23.0, 48.5], [20.5, 49.0], [18.5, 49.8], [16.0, 49.6], [14.5, 51.0],
];

const LITHUANIA_1236: Ring = [
  [21.5, 54.5], [23.5, 54.3], [25.5, 54.8], [26.0, 55.8], [24.0, 56.3], [21.8, 55.5], [21.5, 54.5],
];
const LITHUANIA_1341: Ring = [
  [21.5, 54.5], [23.0, 53.3], [26.0, 52.5], [29.5, 53.5], [31.0, 55.0],
  [29.5, 56.5], [26.0, 56.8], [24.0, 56.3], [21.8, 55.5], [21.5, 54.5],
];
const LITHUANIA_1430: Ring = [
  [21.5, 54.5], [23.0, 53.3], [24.5, 51.5], [26.5, 49.5], [29.0, 47.5], [31.5, 46.3],
  [34.5, 47.5], [35.5, 50.5], [33.0, 53.0], [31.0, 55.0], [29.5, 56.5], [26.0, 56.8],
  [24.0, 56.3], [21.8, 55.5], [21.5, 54.5],
];
const LITHUANIA_1503: Ring = [
  [21.5, 54.5], [23.0, 53.3], [24.5, 51.5], [26.5, 49.5], [29.0, 47.5], [31.5, 46.3],
  [34.0, 47.0], [33.5, 49.5], [30.5, 52.0], [29.0, 54.0], [28.0, 55.5], [26.0, 56.5],
  [24.0, 56.3], [21.8, 55.5], [21.5, 54.5],
];
const LITHUANIA_1569: Ring = [
  [21.5, 54.5], [23.0, 53.3], [24.5, 51.5], [26.0, 50.5], [28.0, 51.0], [30.0, 52.5],
  [30.5, 54.0], [28.5, 55.5], [26.0, 56.5], [24.0, 56.3], [21.8, 55.5], [21.5, 54.5],
];

export const POLAND_LITHUANIA_ENTITIES: HistoricalEntity[] = [
  {
    id: 'kingdom-of-poland',
    name: 'Kingdom of Poland',
    category: 'kingdom',
    start: ce(966),
    end: ce(1569),
    confidence: 'medium',
    colour: '#a85a6a',
    labelImportance: 4,
    predecessorIds: ['slavic-peoples'],
    successorIds: ['polish-lithuanian'],
    description:
      'Founded in the scholarly convention by Mieszko I’s baptism (966), which brought the Piast state into Latin Christendom; Bolesław I "the Brave" won the royal crown in 1025. Fragmented among rival Piast dukes for nearly two centuries (1138–1320), it was reunified and pushed east into Galicia–Ruthenia by Casimir III "the Great" (r. 1333–70), and recovered Danzig and Royal Prussia from the Teutonic Order in 1466. Joined Lithuania in a single Commonwealth at the Union of Lublin (1569).',
    sources: [
      src('Davies 2005, God’s Playground: A History of Poland'),
      src('Frost 2015, The Oxford History of Poland-Lithuania, vol. 1'),
    ],
    snapshots: [
      snap(ce(966).year, poly(POLAND_966), 'medium', 'Mieszko I’s core duchy: Greater Poland around Gniezno and Poznań.'),
      snap(ce(1025).year, poly(POLAND_1025), 'medium', 'Bolesław I "the Brave" crowned king (1025): Silesia, Lesser Poland (Kraków) and Pomerania added.'),
      snap(ce(1370).year, poly(POLAND_1370), 'medium', 'Casimir the Great reunifies the Piast lands and conquers Galicia–Ruthenia (Lwów, 1349), doubling the kingdom by his death.'),
      snap(ce(1466).year, poly(POLAND_1466), 'high', 'The Second Peace of Thorn ends the Thirteen Years’ War: Danzig and Royal Prussia are recovered from the Teutonic Order.'),
      snap(ce(1569).year, poly(POLAND_1466), 'high', 'On the eve of the Union of Lublin, stable since 1466.'),
    ],
  },
  {
    id: 'grand-duchy-of-lithuania',
    name: 'Grand Duchy of Lithuania',
    category: 'kingdom',
    start: ce(1236),
    end: ce(1569),
    confidence: 'medium',
    colour: '#5a7a4a',
    labelImportance: 4,
    successorIds: ['polish-lithuanian'],
    description:
      'Unified by Mindaugas (baptised and crowned king, 1253) as a pagan bulwark against the Teutonic and Livonian Orders, then expanded explosively into the fragmented Rus principalities under Gediminas and Algirdas. Vytautas the Great (r. 1392–1430) brought it from the Baltic to the Black Sea — briefly the largest state in Europe — while remaining in personal union with Poland from Jogaila’s 1386 baptism and marriage. Wars with a resurgent Muscovy (1487–1503 and after) stripped its eastern borderlands, and at the Union of Lublin (1569) it ceded Ukraine directly to the Polish Crown as the price of a permanent, single Commonwealth.',
    sources: [
      src('Rowell 1994, Lithuania Ascending: A Pagan Empire, 1295–1345'),
      src('Frost 2015, The Oxford History of Poland-Lithuania, vol. 1'),
    ],
    snapshots: [
      snap(ce(1236).year, poly(LITHUANIA_1236), 'low', 'Mindaugas’s core realm around Vilnius, Kaunas and Trakai.'),
      snap(ce(1341).year, poly(LITHUANIA_1341), 'low', 'Gediminas’s conquests bring Polotsk, Vitebsk and other Rus principalities under Vilnius.'),
      snap(ce(1430).year, poly(LITHUANIA_1430), 'medium', 'Vytautas the Great’s death (1430): from the Baltic to the Black Sea, briefly the largest state in Europe.'),
      snap(ce(1503).year, poly(LITHUANIA_1503), 'medium', 'The 1487–1503 wars with a rising Muscovy strip the eastern borderlands, including Chernigov-Seversk.'),
      snap(ce(1569).year, poly(LITHUANIA_1569), 'high', 'At the Union of Lublin, Lithuania cedes Ukraine (Kyiv, Volhynia, Podolia, Bratslav) directly to the Polish Crown as the price of union — a major contraction in the same act that creates the Commonwealth.'),
    ],
  },
];
