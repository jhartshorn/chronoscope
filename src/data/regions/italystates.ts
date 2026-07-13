import type { HistoricalEntity } from '../../types';
import { ce, mpoly, poly, snap, src } from '../helpers';

/**
 * The pre-unification Italian peninsula: the Papal States, the Kingdom of
 * Naples/Two Sicilies, the Duchy of Savoy/Kingdom of Sardinia-Piedmont, the
 * Grand Duchy of Tuscany, and the Duchy of Milan. Only Venice previously
 * represented Italy before 1861 — the centuries-long fragmentation into
 * rival states, and Piedmont-Sardinia's role as the Risorgimento's
 * nucleus, were otherwise invisible. Milan hands off to foreign
 * (Spanish, then Austrian Habsburg) rule rather than to unification
 * directly; the other three feed into the modern `italy` entity.
 */

export const ITALY_STATES_ENTITIES: HistoricalEntity[] = [
  {
    id: 'papal-states',
    name: 'Papal States',
    category: 'kingdom',
    start: ce(756),
    end: ce(1870),
    confidence: 'medium',
    colour: '#b0a04a',
    labelImportance: 4,
    successorIds: ['italy'],
    description:
      'The Pope’s temporal domain in central Italy, founded by the Donation of Pepin (756, confirming the former Byzantine Exarchate of Ravenna to papal rule). It endured over a millennium of shifting borders and foreign invasions until the Italian Risorgimento stripped away Romagna, the Marche and Umbria (1860), leaving only Rome and its immediate hinterland, captured in 1870 to complete Italian unification.',
    sources: [
      src('Partner 1972, The Lands of St Peter'),
      src('Duggan 2007, The Force of Destiny: A History of Italy Since 1796'),
    ],
    snapshots: [
      snap(ce(756).year, poly([[12.0, 44.6], [12.9, 44.3], [12.7, 42.8], [13.5, 41.9], [12.0, 41.2], [11.2, 42.0], [11.9, 43.5], [12.0, 44.6]]), 'medium', 'The Donation of Pepin: the former Exarchate of Ravenna joined to Rome and its hinterland.'),
      snap(ce(1300).year, poly([[11.0, 44.9], [13.0, 44.3], [13.9, 42.8], [14.5, 41.5], [13.0, 40.8], [11.5, 41.3], [11.0, 42.5], [10.9, 44.0], [11.0, 44.9]]), 'medium', 'Medieval peak, spanning Romagna, the Marche, Umbria and Lazio, approximate.'),
      snap(ce(1600).year, poly([[11.0, 44.9], [13.0, 44.3], [13.9, 42.8], [14.5, 41.5], [13.0, 40.8], [11.5, 41.3], [11.0, 42.5], [10.9, 44.0], [11.0, 44.9]]), 'medium', 'Stable early-modern extent, approximate.'),
      snap(ce(1860).year, poly([[11.7, 42.8], [12.7, 42.6], [13.6, 41.7], [12.9, 41.0], [11.9, 41.3], [11.7, 42.8]]), 'high', 'The Risorgimento strips Romagna, the Marche and Umbria; only Rome and Lazio (the "Patrimony of St Peter") remain.'),
    ],
  },
  {
    id: 'kingdom-of-naples',
    name: 'Kingdom of Naples',
    alternativeNames: ['Kingdom of the Two Sicilies'],
    category: 'kingdom',
    start: ce(1282),
    end: ce(1861),
    confidence: 'medium',
    colour: '#9a6a4a',
    labelImportance: 4,
    successorIds: ['italy'],
    description:
      'The mainland southern Italian kingdom left when the 1282 Sicilian Vespers revolt tore Sicily away to Aragonese rule. Alfonso V of Aragon reunited the crowns in 1442, and from 1816 the restored Bourbons ruled both formally as the Kingdom of the Two Sicilies — the peninsula’s largest state — until Garibaldi’s Expedition of the Thousand (1860) toppled it and it was annexed into the new Kingdom of Italy.',
    sources: [
      src('Davis 2006, Naples and Napoleon'),
      src('Duggan 2007, The Force of Destiny: A History of Italy Since 1796'),
    ],
    snapshots: [
      snap(ce(1282).year, poly([[13.3, 42.0], [15.9, 42.3], [18.5, 40.1], [17.0, 38.0], [15.0, 38.0], [13.9, 39.8], [13.3, 42.0]]), 'medium', 'The Sicilian Vespers tear Sicily away to Aragon, leaving the mainland kingdom alone.'),
      snap(ce(1442).year, mpoly(
        [[13.3, 42.0], [15.9, 42.3], [18.5, 40.1], [17.0, 38.0], [15.0, 38.0], [13.9, 39.8], [13.3, 42.0]],
        [[12.4, 37.9], [13.7, 38.2], [15.1, 38.2], [15.6, 38.0], [15.0, 36.7], [13.0, 36.7], [12.4, 37.9]],
      ), 'medium', 'Alfonso V of Aragon reunites Naples and Sicily under one ruler.'),
      snap(ce(1816).year, mpoly(
        [[13.3, 42.0], [15.9, 42.3], [18.5, 40.1], [17.0, 38.0], [15.0, 38.0], [13.9, 39.8], [13.3, 42.0]],
        [[12.4, 37.9], [13.7, 38.2], [15.1, 38.2], [15.6, 38.0], [15.0, 36.7], [13.0, 36.7], [12.4, 37.9]],
      ), 'high', 'The restored Bourbons formally style it the Kingdom of the Two Sicilies.'),
    ],
  },
  {
    id: 'sardinia-piedmont',
    name: 'Kingdom of Sardinia-Piedmont',
    alternativeNames: ['Duchy of Savoy', 'Savoy-Piedmont'],
    category: 'kingdom',
    start: ce(1416),
    end: ce(1861),
    confidence: 'medium',
    colour: '#6a8ab0',
    labelImportance: 4,
    successorIds: ['italy'],
    description:
      'The Alpine Duchy of Savoy, raised in status by Emperor Sigismund in 1416, acquired the island of Sardinia in 1720 (becoming a kingdom) and Genoa in 1815. Under Victor Emmanuel II and Cavour it became the nucleus of the Risorgimento, rapidly absorbing Lombardy (1859), the central Italian duchies and the Two Sicilies (1860) to found the Kingdom of Italy in 1861.',
    sources: [
      src('Duggan 2007, The Force of Destiny: A History of Italy Since 1796'),
      src('Hearder 1983, Italy in the Age of the Risorgimento 1790–1870'),
    ],
    snapshots: [
      snap(ce(1416).year, poly([[5.9, 45.0], [7.5, 46.4], [8.0, 45.5], [7.3, 44.3], [6.0, 44.5], [5.9, 45.0]]), 'medium', 'Amadeus VIII’s Alpine duchy of Savoy and Piedmont, approximate.'),
      snap(ce(1720).year, mpoly(
        [[5.9, 45.0], [7.5, 46.4], [8.5, 45.5], [7.8, 44.3], [6.0, 44.5], [5.9, 45.0]],
        [[8.1, 39.1], [9.7, 39.2], [9.8, 40.9], [8.4, 41.0], [8.1, 39.1]],
      ), 'medium', 'The Treaty of London (1720) grants Sardinia, elevating Savoy to a kingdom.'),
      snap(ce(1815).year, mpoly(
        [[5.9, 45.0], [7.5, 46.4], [9.3, 45.4], [8.9, 44.2], [8.0, 44.0], [6.0, 44.5], [5.9, 45.0]],
        [[8.1, 39.1], [9.7, 39.2], [9.8, 40.9], [8.4, 41.0], [8.1, 39.1]],
      ), 'high', 'The Congress of Vienna adds Genoa and its Ligurian coast.'),
    ],
  },
  {
    id: 'grand-duchy-of-tuscany',
    name: 'Grand Duchy of Tuscany',
    category: 'kingdom',
    start: ce(1569),
    end: ce(1859),
    confidence: 'medium',
    colour: '#a8703a',
    labelImportance: 3,
    successorIds: ['italy'],
    description:
      'Formed when Pope Pius V made Cosimo I de’ Medici Grand Duke (1569), uniting Florence, Siena and Pisa under one crown. Habsburg-Lorraine princes succeeded the Medici dynasty in 1737 without disturbing its borders, and Tuscany became a byword for enlightened reform under Peter Leopold; a popular uprising and plebiscite annexed it to Piedmont-Sardinia in 1859–60.',
    sources: [src('Duggan 2007, The Force of Destiny: A History of Italy Since 1796')],
    snapshots: [
      snap(ce(1569).year, poly([[9.7, 42.3], [10.0, 44.2], [11.9, 44.4], [12.4, 43.0], [11.5, 42.2], [9.7, 42.3]]), 'medium', 'Cosimo I’s founding realm: Florence, Siena and Pisa.'),
      snap(ce(1737).year, poly([[9.7, 42.3], [10.0, 44.2], [11.9, 44.4], [12.4, 43.0], [11.5, 42.2], [9.7, 42.3]]), 'medium', 'The Medici line dies out; Habsburg-Lorraine princes succeed without a border change.'),
      snap(ce(1800).year, poly([[9.7, 42.3], [10.0, 44.2], [11.9, 44.4], [12.4, 43.0], [11.5, 42.2], [9.7, 42.3]]), 'medium', 'Stable on the eve of the Napoleonic upheavals and, later, the Risorgimento.'),
    ],
  },
  {
    id: 'duchy-of-milan',
    name: 'Duchy of Milan',
    category: 'kingdom',
    start: ce(1395),
    end: ce(1535),
    confidence: 'medium',
    colour: '#8a6a9a',
    labelImportance: 3,
    successorIds: ['spanish-empire'],
    description:
      'The wealthy Lombard duchy raised for Gian Galeazzo Visconti by Emperor Wenceslaus (1395); the Sforza dynasty succeeded the extinct Visconti line in 1450. The last Sforza duke’s death in 1535 let Emperor Charles V (also King of Spain) absorb Milan directly, beginning nearly four centuries of foreign — Spanish, then Austrian — rule that only ended with Italian unification.',
    sources: [src('Black 2009, Absolutism in Renaissance Milan')],
    snapshots: [
      snap(ce(1395).year, poly([[8.5, 45.0], [9.0, 46.2], [10.2, 46.0], [10.3, 44.9], [9.3, 44.7], [8.5, 45.0]]), 'medium', 'Gian Galeazzo Visconti’s founding ducal realm around Milan and Pavia.'),
      snap(ce(1450).year, poly([[8.5, 45.0], [9.0, 46.2], [10.2, 46.0], [10.3, 44.9], [9.3, 44.7], [8.5, 45.0]]), 'medium', 'Francesco Sforza succeeds the extinct Visconti line without a border change.'),
    ],
  },
];
