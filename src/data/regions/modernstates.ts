import type { HistoricalEntity, EntityCategory, TerritorySnapshot } from '../../types';
import type { Ring } from '../helpers';
import { ce, mpoly, poly, snap, src } from '../helpers';

// --- Greek "Great Idea" expansion (Byzantine / Macedonian modern successor) ---
/** The small 1832 kingdom: the Peloponnese, Attica and central Greece. */
const GREECE_1832: Ring = [
  [21, 36.4], [23, 36.4], [23.6, 37.5], [24, 38.3], [23.5, 39], [22, 39.1],
  [21, 38.7], [20.9, 38], [21.3, 37.2], [21, 36.4],
];
/** After gaining Thessaly (1881). */
const GREECE_1881: Ring = [
  [21, 36.4], [23, 36.4], [23.6, 37.5], [24, 38.3], [24, 39.9], [22.5, 40],
  [21, 39.7], [20.9, 38], [21.3, 37.2], [21, 36.4],
];
/** After the Balkan Wars (1913): Macedonia, Epirus and Crete. */
const GREECE_1913_MAINLAND: Ring = [
  [20, 39.5], [21, 40.4], [22.5, 41], [24, 41.2], [26, 41.2], [26.5, 40.5], [25, 40.5],
  [24, 40.2], [24, 39], [24, 38.3], [23.6, 37.5], [23, 36.4], [21, 36.4], [21.3, 37.2],
  [20.9, 38], [20.2, 39], [20, 39.5],
];
const CRETE: Ring = [[23.5, 35], [26, 35], [26.3, 35.4], [24, 35.7], [23.5, 35.3]];
/** The Bogd Khanate's wider 1912 claims (incl. Tuva), before settling to modern borders. */
const MONGOLIA_1912: Ring = [
  [87, 46], [90, 50], [95, 51.5], [98, 52], [102, 52], [108, 51], [114, 50], [119, 47],
  [120, 44], [116, 42], [110, 41], [102, 41.5], [95, 43], [89, 44], [87, 46],
];

/**
 * Broader coverage of contemporary sovereign states — the union of the world's
 * ~50 largest economies (nominal GDP) and ~50 largest countries by area, that
 * were not already modelled elsewhere. Each is backed by its Natural Earth
 * country polygon (public domain), so coastlines and borders match the
 * basemap. `start` is each state's modern founding/independence year (a
 * simplification: the single contemporary snapshot uses today's borders).
 */

interface MS {
  id: string;
  name: string;
  ne: string; // Natural Earth country name
  start: number; // CE founding/independence year
  colour: string;
  alt?: string[];
  pred?: string[];
  desc?: string;
  label?: 1 | 2 | 3 | 4 | 5;
  category?: EntityCategory;
  /** Overrides the default single contemporary snapshot. */
  snaps?: TerritorySnapshot[];
}

function build(m: MS): HistoricalEntity {
  return {
    id: m.id,
    name: m.name,
    category: m.category ?? 'modern-state',
    start: ce(m.start),
    end: ce(2026),
    confidence: 'high',
    colour: m.colour,
    labelImportance: m.label ?? 3,
    ...(m.alt ? { alternativeNames: m.alt } : {}),
    ...(m.pred ? { predecessorIds: m.pred } : {}),
    description:
      m.desc ??
      `${m.name}, an independent state from ${m.start}. The contemporary boundary is taken from Natural Earth.`,
    sources: [src('Natural Earth (public domain) for the modern boundary')],
    snapshots: m.snaps ?? [
      snap(ce(2026).year, { naturalEarthCountry: m.ne }, 'high', `Contemporary ${m.name} (Natural Earth).`),
    ],
  };
}

/**
 * The interwar Second Polish Republic: Poznań and the corridor in the west
 * (Lower Silesia and East Prussia German), Wilno and the Riga-line Kresy in
 * the east. The Free City of Danzig is not shown separately.
 */
const POLAND_INTERWAR: Ring = [
  [18.4, 54.8], [17.5, 54], [16.9, 53.5], [16, 52.8], [15.8, 52.3],
  [16.4, 52.1], [16.5, 51.6], [17.6, 51.2], [18.1, 51], [18.3, 50.7],
  [18.55, 50.45], [18.85, 49.95], // German frontier (Katowice Polish, Breslau German)
  [18.85, 49.52], [19.8, 49.2], [21, 49.35], [22, 49.2], [22.9, 49.05],
  [24.4, 48.4], [24.9, 47.95], // Czechoslovak frontier along the Carpathians
  [26.4, 48.35], [26.8, 48.5], // Romanian frontier to the Soviet tripoint
  [26.3, 48.8], [26.1, 49.8], [26.6, 51.2], [27.3, 52.2], [26.8, 53.2],
  [26.6, 53.9], [27.2, 54.9], [28.2, 55.7], // 1921 Riga line with the USSR
  [26.6, 55.7], [25.8, 55.3], [25.7, 54.9], [25.6, 54.5], [24.8, 54.1],
  [23.8, 53.95], [23.5, 54.3], // Latvian and Lithuanian frontiers (Wilno Polish)
  [22, 53.55], [20.5, 53.5], [19.8, 53.6], [19.5, 54.1], [18.9, 54.35], // East Prussian frontier
];

const TABLE: MS[] = [
  // ---- Europe
  { id: 'netherlands', name: 'Netherlands', ne: 'Netherlands', start: 1648, colour: '#4a6fb0', label: 3, pred: ['dutch-empire'] },
  { id: 'switzerland', name: 'Switzerland', ne: 'Switzerland', start: 1848, colour: '#8a5a5a', label: 3 },
  {
    id: 'poland', name: 'Poland', ne: 'Poland', start: 1918, colour: '#a85a6a', label: 3,
    pred: ['polish-lithuanian'],
    desc: 'Poland, reborn in 1918 after the partitions. Its territory shifted some 200 km westward in 1945 — gaining former German lands up to the Oder–Neisse line and losing the eastern Kresy to the USSR. A Warsaw Pact member 1955–1991 and EU member from 2004.',
    snaps: [
      snap(1930, poly(POLAND_INTERWAR), 'medium', 'The interwar Second Republic, including Wilno and eastern Galicia; approximate.'),
      snap(1939.6, poly(POLAND_INTERWAR), 'medium', 'Interwar borders held until the German–Soviet invasion of September 1939.'),
      snap(1945.6, { naturalEarthCountry: 'Poland' }, 'high', 'Post-war Poland, shifted west to the Oder–Neisse line (Natural Earth).'),
    ],
  },
  { id: 'belgium', name: 'Belgium', ne: 'Belgium', start: 1830, colour: '#6a6ab0', label: 2 },
  { id: 'sweden', name: 'Sweden', ne: 'Sweden', start: 1523, colour: '#4a7ab0', label: 3 },
  { id: 'ireland', name: 'Ireland', ne: 'Ireland', start: 1922, colour: '#4a9a6a', label: 2, pred: ['united-kingdom'] },
  { id: 'austria', name: 'Austria', ne: 'Austria', start: 1918, colour: '#9a5a7a', label: 2, pred: ['habsburg-monarchy'] },
  { id: 'norway', name: 'Norway', ne: 'Norway', start: 1905, colour: '#5a8ab0', label: 3, pred: ['norse-vikings'] },
  { id: 'denmark', name: 'Denmark', ne: 'Denmark', start: 1849, colour: '#a85a5a', label: 2 },
  { id: 'finland', name: 'Finland', ne: 'Finland', start: 1917, colour: '#5a9ab0', label: 3, pred: ['russian-empire'] },
  { id: 'portugal', name: 'Portugal', ne: 'Portugal', start: 1249, colour: '#4a8a5a', label: 3, pred: ['portuguese-empire'], desc: 'Portugal, whose continental borders have been essentially fixed since 1249 — among the oldest in Europe. Contemporary boundary from Natural Earth.' },
  { id: 'czechia', name: 'Czechia', ne: 'Czechia', start: 1993, colour: '#8a6ab0', label: 2, alt: ['Czech Republic'], pred: ['czechoslovakia'], desc: 'Czechia (the Czech Republic), from the peaceful dissolution of Czechoslovakia in 1993; an EU member from 2004. Contemporary boundary from Natural Earth.' },
  { id: 'slovakia', name: 'Slovakia', ne: 'Slovakia', start: 1993, colour: '#8a7a9a', label: 2, pred: ['czechoslovakia'], desc: 'Slovakia, from the peaceful dissolution of Czechoslovakia in 1993; an EU member from 2004. Contemporary boundary from Natural Earth.' },
  { id: 'hungary', name: 'Hungary', ne: 'Hungary', start: 1920, colour: '#7a9a5a', label: 3, pred: ['habsburg-monarchy', 'kingdom-of-hungary'], desc: 'Modern Hungary within its post-Trianon (1920) borders. A Warsaw Pact member 1955–1991 and EU member from 2004. Contemporary boundary from Natural Earth.' },
  { id: 'bulgaria', name: 'Bulgaria', ne: 'Bulgaria', start: 1908, colour: '#5a8a6a', label: 2, pred: ['ottoman-empire', 'first-bulgarian-empire'], desc: 'Bulgaria, fully independent of the Ottomans in 1908, with borders essentially fixed since 1940. A Warsaw Pact member 1955–1991 and EU member from 2007. Contemporary boundary from Natural Earth.' },
  { id: 'albania', name: 'Albania', ne: 'Albania', start: 1912, colour: '#8a8a5a', label: 2, pred: ['ottoman-empire'], desc: 'Albania, independent of the Ottomans in 1912. A Warsaw Pact member from 1955, it froze participation after the Soviet split in 1961 and formally withdrew in 1968. Contemporary boundary from Natural Earth.' },
  { id: 'romania', name: 'Romania', ne: 'Romania', start: 1878, colour: '#9a7a4a', label: 3 },
  { id: 'ukraine', name: 'Ukraine', ne: 'Ukraine', start: 1991, colour: '#6a8ab0', label: 4, pred: ['kievan-rus', 'soviet-union'] },

  // ---- Middle East & Central Asia
  { id: 'israel', name: 'Israel', ne: 'Israel', start: 1948, colour: '#5a7ab0', label: 3, desc: 'The State of Israel, established in 1948. Contemporary boundary from Natural Earth; several frontiers are disputed.', pred: ['israel-judah'] },
  { id: 'uae', name: 'United Arab Emirates', ne: 'United Arab Emirates', start: 1971, colour: '#6a9a5a', label: 3, alt: ['UAE'] },
  { id: 'kazakhstan', name: 'Kazakhstan', ne: 'Kazakhstan', start: 1991, colour: '#8a7ab0', label: 4, pred: ['soviet-union', 'golden-horde'] },
  { id: 'afghanistan', name: 'Afghanistan', ne: 'Afghanistan', start: 1919, colour: '#a8843a', label: 3, pred: ['ghaznavid'] },
  { id: 'yemen', name: 'Yemen', ne: 'Yemen', start: 1990, colour: '#8a6a4a', label: 2 },

  // ---- South & East & SE Asia
  { id: 'taiwan', name: 'Taiwan', ne: 'Taiwan', start: 1949, colour: '#c0603f', label: 3, alt: ['Republic of China'], desc: 'Taiwan (Republic of China), a self-governing island since 1949 whose political status is disputed. Contemporary boundary from Natural Earth.' },
  { id: 'thailand', name: 'Thailand', ne: 'Thailand', start: 1782, colour: '#c9a24a', label: 3, alt: ['Siam'], pred: ['ayutthaya'] },
  { id: 'vietnam', name: 'Vietnam', ne: 'Vietnam', start: 1945, colour: '#5a8a5a', label: 3, pred: ['dai-viet', 'french-colonial-empire'] },
  { id: 'philippines', name: 'Philippines', ne: 'Philippines', start: 1946, colour: '#4a9a7a', label: 3, pred: ['spanish-empire'] },
  { id: 'malaysia', name: 'Malaysia', ne: 'Malaysia', start: 1963, colour: '#4a9a8a', label: 3, pred: ['british-empire'] },
  { id: 'bangladesh', name: 'Bangladesh', ne: 'Bangladesh', start: 1971, colour: '#5a9a6a', label: 3, pred: ['pakistan', 'british-empire'] },
  { id: 'myanmar', name: 'Myanmar', ne: 'Myanmar', start: 1948, colour: '#b0864a', label: 3, alt: ['Burma'], pred: ['pagan-kingdom', 'british-empire'] },
  {
    id: 'mongolia', name: 'Mongolia', ne: 'Mongolia', start: 1911, colour: '#9a6db0', label: 3,
    pred: ['mongol-empire', 'qing-dynasty'],
    desc: 'Mongolia, which declared independence from Qing China as the Bogd Khanate in 1911 — briefly claiming Inner Mongolia and Tuva — and settled into today’s borders as a Soviet-aligned people’s republic from 1924. Contemporary boundary from Natural Earth.',
    snaps: [
      snap(1912, poly(MONGOLIA_1912), 'low', 'The Bogd Khanate, 1912, with its wider claims including Tuva; approximate.'),
      snap(1946, { naturalEarthCountry: 'Mongolia' }, 'high', 'Mongolia within its settled modern borders, internationally recognised in 1945–46 (Natural Earth).'),
    ],
  },
  {
    id: 'greece', name: 'Greece', ne: 'Greece', start: 1832, colour: '#4a7ab0', label: 4,
    pred: ['ancient-greece', 'byzantine-empire', 'ottoman-empire'],
    desc: 'Modern Greece, independent of the Ottomans in 1832 as a small southern kingdom, which expanded northward over the next century — Thessaly (1881); Macedonia, Epirus and Crete after the Balkan Wars (1912–13); the Dodecanese (1947) — pursuing the "Great Idea" (Megali Idea). Contemporary boundary from Natural Earth.',
    snaps: [
      snap(1832, poly(GREECE_1832), 'medium', 'The original Kingdom of Greece, 1832: the Peloponnese, Attica and central Greece.'),
      snap(1881, poly(GREECE_1881), 'medium', 'After the peaceful acquisition of Thessaly (1881).'),
      snap(1913, mpoly(GREECE_1913_MAINLAND, CRETE), 'medium', 'After the Balkan Wars (1912–13): Macedonia, Epirus and Crete roughly double the country.'),
      snap(1947, { naturalEarthCountry: 'Greece' }, 'high', 'Contemporary Greece, after gaining the Dodecanese in 1947 (Natural Earth).'),
    ],
  },

  // ---- Africa
  { id: 'algeria', name: 'Algeria', ne: 'Algeria', start: 1962, colour: '#5a9a6a', label: 4, pred: ['french-colonial-empire', 'ottoman-empire'] },
  { id: 'dr-congo', name: 'Democratic Republic of the Congo', ne: 'Dem. Rep. Congo', start: 1960, colour: '#6a9a4a', label: 4, alt: ['DR Congo', 'Congo-Kinshasa'], pred: ['belgian-empire', 'kongo'] },
  { id: 'sudan', name: 'Sudan', ne: 'Sudan', start: 1956, colour: '#b0803a', label: 3, pred: ['british-empire'] },
  { id: 'south-sudan', name: 'South Sudan', ne: 'S. Sudan', start: 2011, colour: '#8a9a4a', label: 2, pred: ['sudan'] },
  { id: 'libya', name: 'Libya', ne: 'Libya', start: 1951, colour: '#a8843a', label: 3, pred: ['ottoman-empire'] },
  { id: 'chad', name: 'Chad', ne: 'Chad', start: 1960, colour: '#a89a5a', label: 2, pred: ['french-colonial-empire', 'kanem-bornu'] },
  { id: 'niger', name: 'Niger', ne: 'Niger', start: 1960, colour: '#c9a84a', label: 2, pred: ['french-colonial-empire'] },
  { id: 'mali', name: 'Mali', ne: 'Mali', start: 1960, colour: '#c9a23a', label: 3, pred: ['french-colonial-empire', 'mali-empire'] },
  { id: 'mauritania', name: 'Mauritania', ne: 'Mauritania', start: 1960, colour: '#b09a5a', label: 2, pred: ['french-colonial-empire'] },
  { id: 'angola', name: 'Angola', ne: 'Angola', start: 1975, colour: '#8a9a4a', label: 3, pred: ['portuguese-empire', 'kongo'] },
  { id: 'ethiopia', name: 'Ethiopia', ne: 'Ethiopia', start: 1975, colour: '#a86a3a', label: 4, pred: ['solomonic-ethiopia'] },
  { id: 'tanzania', name: 'Tanzania', ne: 'Tanzania', start: 1964, colour: '#5a9a6a', label: 3, pred: ['british-empire'] },
  { id: 'kenya', name: 'Kenya', ne: 'Kenya', start: 1963, colour: '#6a9a5a', label: 3, pred: ['british-empire'] },
  { id: 'mozambique', name: 'Mozambique', ne: 'Mozambique', start: 1975, colour: '#5a9a7a', label: 3, pred: ['portuguese-empire'] },
  { id: 'zambia', name: 'Zambia', ne: 'Zambia', start: 1964, colour: '#8a9a4a', label: 2, pred: ['british-empire'] },
  { id: 'namibia', name: 'Namibia', ne: 'Namibia', start: 1990, colour: '#b0904a', label: 2 },
  { id: 'botswana', name: 'Botswana', ne: 'Botswana', start: 1966, colour: '#a8945a', label: 2 },
  { id: 'somalia', name: 'Somalia', ne: 'Somalia', start: 1960, colour: '#5a8a9a', label: 2 },
  { id: 'madagascar', name: 'Madagascar', ne: 'Madagascar', start: 1960, colour: '#5a9a8a', label: 3 },
  { id: 'central-african-republic', name: 'Central African Republic', ne: 'Central African Rep.', start: 1960, colour: '#8a8b5a', label: 2, alt: ['CAR'] },

  // ---- Americas
  { id: 'colombia', name: 'Colombia', ne: 'Colombia', start: 1819, colour: '#5a9a9a', label: 3, pred: ['spanish-empire', 'muisca'] },
  { id: 'venezuela', name: 'Venezuela', ne: 'Venezuela', start: 1830, colour: '#4a9a8a', label: 3, pred: ['spanish-empire'] },
  { id: 'peru', name: 'Peru', ne: 'Peru', start: 1821, colour: '#c98a3f', label: 4, pred: ['spanish-empire', 'inca-empire'] },
  { id: 'chile', name: 'Chile', ne: 'Chile', start: 1818, colour: '#5a9a7a', label: 3, pred: ['spanish-empire'] },
  { id: 'bolivia', name: 'Bolivia', ne: 'Bolivia', start: 1825, colour: '#6a9a5a', label: 3, pred: ['spanish-empire', 'inca-empire'] },
];

export const MODERN_STATES_ENTITIES: HistoricalEntity[] = [
  ...TABLE.map(build),
  // Singapore is absent from the 110m Natural Earth basemap (too small), so it
  // gets a small hand-drawn polygon rather than a country reference.
  {
    id: 'singapore',
    name: 'Singapore',
    category: 'modern-state',
    start: ce(1965),
    end: ce(2026),
    confidence: 'medium',
    colour: '#a85a6a',
    labelImportance: 3,
    predecessorIds: ['british-empire', 'malaysia'],
    description:
      'The Republic of Singapore, an independent city-state from 1965 and a major global economy. Shown with a small hand-drawn polygon, as this island is too small to appear in the low-resolution basemap.',
    sources: [src('Natural Earth (public domain); island outline approximated')],
    snapshots: [
      snap(ce(2026).year, poly([[103.6, 1.21], [104.05, 1.21], [104.05, 1.48], [103.6, 1.48]]), 'medium', 'Singapore island (approximate).'),
    ],
  },
];
