import type { HistoricalEntity } from '../../types';
import { ce, poly, snap, src } from '../helpers';

/** Additional contemporary states, plus the European Union as a supranational body. */
const NE = (name: string) => ({ naturalEarthCountry: name });

/**
 * EU membership at each stage, as Natural Earth country names. France
 * includes French Guiana (an outermost region, genuinely EU territory);
 * Malta is absent from the 110m basemap and noted in the snapshots.
 */
const EU12 = [
  'Belgium', 'Denmark', 'France', 'Germany', 'Greece', 'Ireland', 'Italy',
  'Luxembourg', 'Netherlands', 'Portugal', 'Spain', 'United Kingdom',
];
const EU15 = [...EU12, 'Austria', 'Finland', 'Sweden'];
const EU25 = [
  ...EU15,
  'Poland', 'Czechia', 'Slovakia', 'Hungary', 'Slovenia',
  'Estonia', 'Latvia', 'Lithuania', 'Cyprus', // Malta is below basemap resolution
];
const EU27 = [...EU25, 'Romania', 'Bulgaria'];
const EU28 = [...EU27, 'Croatia'];
const EU27_POST_BREXIT = EU28.filter((c) => c !== 'United Kingdom');

export const MODERN2_ENTITIES: HistoricalEntity[] = [
  {
    id: 'indonesia',
    name: 'Indonesia',
    category: 'modern-state',
    start: ce(1945),
    end: ce(2026),
    confidence: 'high',
    colour: '#4a9a7a',
    labelImportance: 4,
    predecessorIds: ['dutch-empire', 'majapahit'],
    description: 'The Republic of Indonesia, the world’s largest archipelagic state, independent from the Netherlands in 1945. Contemporary boundary from Natural Earth.',
    sources: [src('Natural Earth (public domain)')],
    snapshots: [snap(ce(2026).year, NE('Indonesia'), 'high', 'Contemporary Indonesia (Natural Earth).')],
  },
  {
    id: 'pakistan',
    name: 'Pakistan',
    category: 'modern-state',
    start: ce(1947),
    end: ce(2026),
    confidence: 'high',
    colour: '#5a9a6a',
    labelImportance: 3,
    predecessorIds: ['british-empire'],
    description: 'The Islamic Republic of Pakistan, created at the 1947 partition of British India as two wings a thousand miles apart. The eastern wing seceded as Bangladesh in December 1971. Contemporary boundary from Natural Earth.',
    sources: [src('Natural Earth (public domain)')],
    snapshots: [
      snap(1947.6, { naturalEarthCountries: ['Pakistan', 'Bangladesh'] }, 'high', 'West and East Pakistan at the 1947 partition (Natural Earth union with Bangladesh).'),
      snap(1971.85, { naturalEarthCountries: ['Pakistan', 'Bangladesh'] }, 'high', 'Until the secession of East Pakistan as Bangladesh (December 1971).'),
      snap(1972, NE('Pakistan'), 'high', 'Contemporary borders (Natural Earth); some frontiers are disputed.'),
    ],
  },
  {
    id: 'turkey',
    name: 'Turkey',
    alternativeNames: ['Türkiye', 'Republic of Turkey'],
    category: 'modern-state',
    start: ce(1920),
    end: ce(2026),
    confidence: 'high',
    colour: '#5a7ea8',
    labelImportance: 4,
    predecessorIds: ['ottoman-empire'],
    description:
      'The Republic of Turkey, successor to the Ottoman Empire. Atatürk’s national movement reversed the punitive Treaty of Sèvres (1920), which had reduced Anatolia to a rump, and won the modern borders confirmed at Lausanne (1923); the province of Hatay was added in 1939. Contemporary boundary from Natural Earth.',
    sources: [
      src('Natural Earth (public domain) for the modern boundary'),
      src('Zürcher 2004, Turkey: A Modern History'),
    ],
    snapshots: [
      snap(ce(1920).year, poly([[31, 39], [34, 40.5], [38, 40.8], [40.5, 40], [40, 39], [37, 38.5], [34, 38], [31.5, 38.5], [31, 39]]), 'medium', 'The rump left to the Ottomans by the Treaty of Sèvres (1920): central and northern Anatolia, with the coasts and east under Allied, Greek and Armenian control.'),
      snap(ce(1923).year, poly([[26, 40], [28, 41.3], [30, 41], [34, 42], [38, 41], [41, 41.3], [43.5, 41.2], [44.4, 39.5], [44, 38], [42, 37.2], [40, 37], [38, 36.8], [36.2, 36.7], [36, 36.7], [35.5, 36.6], [33, 36], [30, 36.5], [27.5, 36.8], [26, 38.5], [26, 40]]), 'high', 'The Republic within its Treaty-of-Lausanne borders (1923), before the acquisition of Hatay.'),
      snap(ce(1939).year, NE('Turkey'), 'high', 'After the annexation of Hatay in 1939 (Natural Earth).'),
    ],
  },
  {
    id: 'iran',
    name: 'Iran',
    alternativeNames: ['Islamic Republic of Iran', 'Persia', 'Qajar Persia'],
    category: 'modern-state',
    start: ce(1789),
    end: ce(2026),
    confidence: 'high',
    colour: '#b05a8a',
    labelImportance: 4,
    predecessorIds: ['safavid'],
    description:
      'The modern Iranian state, heir to a continuous Persian statehood millennia old. Under the Qajars it lost the South Caucasus (Georgia, Armenia, much of Azerbaijan) to Russia by the treaties of Gulistan (1813) and Turkmenchay (1828), and later Herat and lands east; the Pahlavis (from 1925) and the Islamic Republic (from 1979) ruled roughly today’s borders. Contemporary boundary from Natural Earth.',
    sources: [
      src('Natural Earth (public domain) for the modern boundary'),
      src('Axworthy 2008, A History of Iran'),
    ],
    snapshots: [
      snap(ce(1800).year, poly([[44, 38], [45, 40], [47, 41.5], [49, 41], [48, 43], [50, 40], [54, 38], [58, 38], [61, 36], [63, 34], [63, 30], [61, 26], [56, 25], [50, 26], [46, 29], [44.5, 33], [44, 36], [44, 38]]), 'medium', 'Qajar Persia c. 1800, still holding the South Caucasus and the east toward Herat.'),
      snap(ce(1830).year, poly([[44, 38], [46, 39], [48, 39.5], [50, 38], [54, 38], [58, 38], [61, 36], [63, 34], [63, 30], [61, 26], [56, 25], [50, 26], [46, 29], [44.5, 33], [44, 36], [44, 38]]), 'medium', 'After Gulistan and Turkmenchay, the South Caucasus is lost to Russia (by 1828).'),
      snap(ce(2026).year, NE('Iran'), 'high', 'Contemporary Iran (Natural Earth).'),
    ],
  },
  {
    id: 'saudi-arabia',
    name: 'Saudi Arabia',
    category: 'modern-state',
    start: ce(1913),
    end: ce(2026),
    confidence: 'high',
    colour: '#6a9a5a',
    labelImportance: 3,
    predecessorIds: ['ottoman-empire'],
    description:
      'The Saudi state built by Ibn Saud from his recapture of Riyadh (1902): the central Najd, then the conquest of the Hejaz with its holy cities of Mecca and Medina (1925), proclaimed the Kingdom of Saudi Arabia in 1932. Contemporary boundary from Natural Earth.',
    sources: [
      src('Natural Earth (public domain) for the modern boundary'),
      src('Al-Rasheed 2010, A History of Saudi Arabia'),
    ],
    snapshots: [
      snap(ce(1913).year, poly([[42, 22], [47, 22], [48, 26], [46, 28], [43, 27], [42, 24], [42, 22]]), 'medium', 'The Najd, ruled from Riyadh, before the conquest of the Hejaz.'),
      snap(ce(1925).year, poly([[36, 20], [42, 20], [47, 22], [48, 26], [46, 28], [42, 28], [38, 27], [36, 24], [36, 20]]), 'medium', 'After taking the Hejaz and its Red Sea coast (1925), including Mecca and Medina.'),
      snap(ce(1932).year, NE('Saudi Arabia'), 'high', 'The unified Kingdom of Saudi Arabia (Natural Earth).'),
    ],
  },
  {
    id: 'nigeria',
    name: 'Nigeria',
    category: 'modern-state',
    start: ce(1960),
    end: ce(2026),
    confidence: 'high',
    colour: '#4a9a6a',
    labelImportance: 3,
    predecessorIds: ['british-empire'],
    description: 'The Federal Republic of Nigeria, Africa’s most populous country, independent from Britain in 1960. Contemporary boundary from Natural Earth.',
    sources: [src('Natural Earth (public domain)')],
    snapshots: [snap(ce(2026).year, NE('Nigeria'), 'high', 'Contemporary Nigeria (Natural Earth).')],
  },
  {
    id: 'south-africa',
    name: 'South Africa',
    category: 'modern-state',
    start: ce(1910),
    end: ce(2026),
    confidence: 'high',
    colour: '#8a7a4a',
    labelImportance: 3,
    predecessorIds: ['british-empire', 'zulu'],
    description: 'The Republic of South Africa. Contemporary boundary from Natural Earth.',
    sources: [src('Natural Earth (public domain)')],
    snapshots: [snap(ce(2026).year, NE('South Africa'), 'high', 'Contemporary South Africa (Natural Earth).')],
  },
  {
    id: 'canada',
    name: 'Canada',
    category: 'modern-state',
    start: ce(1867),
    end: ce(2026),
    confidence: 'high',
    colour: '#5a7ea8',
    labelImportance: 4,
    predecessorIds: ['british-empire'],
    description: 'Canada, a confederation from 1867. Contemporary boundary from Natural Earth.',
    sources: [src('Natural Earth (public domain)')],
    snapshots: [snap(ce(2026).year, NE('Canada'), 'high', 'Contemporary Canada (Natural Earth).')],
  },
  {
    id: 'australia',
    name: 'Australia',
    category: 'modern-state',
    start: ce(1901),
    end: ce(2026),
    confidence: 'high',
    colour: '#7a9a5a',
    labelImportance: 4,
    predecessorIds: ['british-empire'],
    description: 'The Commonwealth of Australia, federated in 1901. Contemporary boundary from Natural Earth.',
    sources: [src('Natural Earth (public domain)')],
    snapshots: [snap(ce(2026).year, NE('Australia'), 'high', 'Contemporary Australia (Natural Earth).')],
  },
  {
    id: 'argentina',
    name: 'Argentina',
    category: 'modern-state',
    start: ce(1816),
    end: ce(2026),
    confidence: 'high',
    colour: '#5a9a9a',
    labelImportance: 3,
    predecessorIds: ['spanish-empire'],
    description: 'The Argentine Republic, independent from Spain in 1816. Contemporary boundary from Natural Earth.',
    sources: [src('Natural Earth (public domain)')],
    snapshots: [snap(ce(2026).year, NE('Argentina'), 'high', 'Contemporary Argentina (Natural Earth).')],
  },
  {
    id: 'south-korea',
    name: 'South Korea',
    alternativeNames: ['Republic of Korea'],
    category: 'modern-state',
    start: ce(1948),
    end: ce(2026),
    confidence: 'high',
    colour: '#4a8a7a',
    labelImportance: 3,
    predecessorIds: ['joseon'],
    description: 'The Republic of Korea, established in 1948. Contemporary boundary from Natural Earth.',
    sources: [src('Natural Earth (public domain)')],
    snapshots: [snap(ce(2026).year, NE('South Korea'), 'high', 'Contemporary South Korea (Natural Earth).')],
  },
  {
    id: 'european-union',
    name: 'European Union',
    alternativeNames: ['EU'],
    category: 'other',
    start: ce(1993),
    end: ce(2026),
    confidence: 'high',
    colour: '#4a6fa8',
    labelImportance: 4,
    description:
      'A supranational political and economic union of European member states (not a single country), established by the Maastricht Treaty in November 1993 on the foundations of the European Communities. Shown as the exact union of its member states at each enlargement (1995, 2004, 2007, 2013) and after the United Kingdom’s withdrawal in 2020.',
    sources: [
      src('Dinan 2004, Europe Recast: A History of European Union'),
      src('Natural Earth (public domain) for member-state boundaries'),
    ],
    snapshots: [
      snap(1993.9, { naturalEarthCountries: EU12 }, 'high', 'The twelve founding members at Maastricht (1 November 1993).'),
      snap(1994.95, { naturalEarthCountries: EU12 }, 'high', 'The Twelve, until the 1995 enlargement.'),
      snap(1995.05, { naturalEarthCountries: EU15 }, 'high', 'Austria, Finland and Sweden join (1 January 1995).'),
      snap(2004.28, { naturalEarthCountries: EU15 }, 'high', 'The Fifteen, until the 2004 eastern enlargement.'),
      snap(2004.38, { naturalEarthCountries: EU25 }, 'high', 'Ten states join (1 May 2004): eight ex-communist states plus Cyprus and Malta. Malta is too small for the basemap; Cyprus is shown without the Turkish-occupied north.'),
      snap(2006.95, { naturalEarthCountries: EU25 }, 'high', 'The Twenty-Five, until the 2007 enlargement.'),
      snap(2007.05, { naturalEarthCountries: EU27 }, 'high', 'Bulgaria and Romania join (1 January 2007).'),
      snap(2013.45, { naturalEarthCountries: EU27 }, 'high', 'The Twenty-Seven, until Croatia’s accession.'),
      snap(2013.55, { naturalEarthCountries: EU28 }, 'high', 'Croatia joins (1 July 2013).'),
      snap(2020.03, { naturalEarthCountries: EU28 }, 'high', 'The Twenty-Eight, until the United Kingdom’s withdrawal.'),
      snap(2020.13, { naturalEarthCountries: EU27_POST_BREXIT }, 'high', 'After Brexit (31 January 2020): twenty-seven members.'),
    ],
  },
];
