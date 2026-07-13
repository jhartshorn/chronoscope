import type { HistoricalEntity } from '../../types';
import type { Ring } from '../helpers';
import { ce, mpoly, poly, snap, src } from '../helpers';

/**
 * Pre-colonial Philippine polities — previously zero indigenous coverage
 * existed anywhere in the archipelago before `philippines` (modernstates.ts,
 * from 1946, predecessor `spanish-empire`). Butuan, Tondo and Cebu hand off
 * to the Spanish empire as Legazpi's expedition conquers each in turn
 * (1565–71); the Sulu Sultanate, which Spain never fully subdued, instead
 * hands off directly to the modern Philippine state after its temporal
 * authority ended under American rule (1915). Geometry is necessarily
 * schematic — coastal cores and trade-network reach, not surveyed borders.
 */

const BUTUAN: Ring = [[125.3, 8.7], [125.9, 8.7], [126.0, 9.3], [125.5, 9.5], [125.1, 9.1], [125.3, 8.7]];

const TONDO_CORE: Ring = [[120.5, 14.3], [120.6, 14.9], [121.0, 15.0], [121.5, 14.6], [121.4, 14.0], [120.9, 13.9], [120.5, 14.3]];
const TONDO_1500: Ring = [[120.3, 14.0], [120.4, 15.0], [121.0, 15.3], [121.6, 14.8], [121.5, 13.8], [120.8, 13.6], [120.3, 14.0]];

const CEBU: Ring = [[123.3, 9.5], [123.5, 9.4], [124.1, 10.0], [124.05, 10.9], [123.6, 11.1], [123.35, 10.6], [123.2, 10.0], [123.3, 9.5]];

const MAGUINDANAO_1520: Ring = [[123.8, 6.8], [124.0, 6.7], [124.6, 6.9], [125.0, 7.4], [124.8, 7.9], [124.2, 7.8], [123.7, 7.3], [123.8, 6.8]];
const MAGUINDANAO_1650: Ring = [
  [122.0, 6.5], [122.3, 7.5], [123.5, 8.0], [125.0, 8.5], [126.2, 8.0],
  [126.3, 7.0], [125.5, 6.3], [124.0, 6.0], [122.8, 6.0], [122.0, 6.5],
];

const SULU_CORE: Ring = [
  [119.7, 4.8], [120.1, 4.7], [121.0, 5.3], [121.9, 5.8], [122.1, 6.3], [121.5, 6.6], [120.5, 6.2], [119.8, 5.6], [119.7, 4.8],
];
const SABAH_STRIP: Ring = [[117.0, 4.0], [119.0, 4.3], [119.3, 5.5], [117.5, 7.0], [116.0, 6.5], [115.8, 5.0], [117.0, 4.0]];

export const PHILIPPINES_ENTITIES: HistoricalEntity[] = [
  {
    id: 'rajahnate-of-butuan',
    name: 'Rajahnate of Butuan',
    category: 'kingdom',
    start: ce(900),
    end: ce(1300),
    confidence: 'low',
    colour: '#8a9a5a',
    labelImportance: 2,
    description:
      'A trading polity on the Agusan River delta in north-eastern Mindanao, known from its balangay plank-built boats and the gold Butuan Ivory Seal, and recorded sending tribute missions to Song-dynasty China from 1001. Among the earliest Philippine polities attested in outside sources; it faded from record as trade shifted to other ports from the 14th century.',
    sources: [
      src('Scott 1984, Prehispanic Source Materials for the Study of Philippine History'),
      src('Junker 2000, Raiding, Trading, and Feasting: The Political Economy of Philippine Chiefdoms'),
    ],
    snapshots: [
      snap(ce(1001).year, poly(BUTUAN), 'low', 'The Agusan River delta polity that sent a tribute mission to the Song court in 1001, approximate.'),
    ],
  },
  {
    id: 'kingdom-of-tondo',
    name: 'Kingdom of Tondo',
    alternativeNames: ['Tondo'],
    category: 'kingdom',
    start: ce(900),
    end: ce(1571),
    confidence: 'low',
    colour: '#9a7a5a',
    labelImportance: 3,
    successorIds: ['spanish-empire'],
    description:
      'A polity on Manila Bay ruled by the Lakan dynasty, attested from the 900 CE Laguna Copperplate Inscription — the earliest known Philippine written record, documenting a debt settlement in a mix of Old Malay, Sanskrit and Old Javanese. Tondo and its sister settlement Maynila (across the Pasig) anchored a Chinese and Bruneian trade network reaching inland to Laguna de Bay. Miguel López de Legazpi took Manila in 1571; Lakan Dula’s brief 1574 revolt was the dynasty’s last stand.',
    sources: [
      src('Postma 1992, The Laguna Copper-Plate Inscription, Philippine Studies 40'),
      src('Scott 1984, Prehispanic Source Materials for the Study of Philippine History'),
    ],
    snapshots: [
      snap(ce(900).year, poly(TONDO_CORE), 'low', 'The Laguna Copperplate Inscription’s Manila Bay–Pasig River–Laguna de Bay world, approximate.'),
      snap(ce(1500).year, poly(TONDO_1500), 'low', 'Tondo and Maynila’s combined trade-network reach along the Manila Bay coast on the eve of Spanish contact.'),
    ],
  },
  {
    id: 'rajahnate-of-cebu',
    name: 'Rajahnate of Cebu',
    alternativeNames: ['Sugbu'],
    category: 'kingdom',
    start: ce(1200),
    end: ce(1565),
    confidence: 'low',
    colour: '#a85a4a',
    labelImportance: 3,
    successorIds: ['spanish-empire'],
    description:
      'A Hindu-Malay rajahnate on Cebu, traditionally founded by migrants from Sumatra under Sri Lumay. Its ruler Rajah Humabon received Magellan’s expedition and converted to Christianity (1521), but a rival chief, Lapu-Lapu of Mactan, killed Magellan in battle days later — the first armed resistance to European colonisation in the archipelago. Legazpi made Cebu Spain’s first permanent settlement in 1565.',
    sources: [
      src('Scott 1984, Prehispanic Source Materials for the Study of Philippine History'),
      src('Pigafetta c. 1524, The First Voyage Around the World'),
    ],
    snapshots: [
      snap(ce(1521).year, poly(CEBU), 'low', 'Rajah Humabon’s Cebu at the time of Magellan’s expedition, approximate.'),
    ],
  },
  {
    id: 'sultanate-of-maguindanao',
    name: 'Sultanate of Maguindanao',
    category: 'kingdom',
    start: ce(1520),
    end: ce(1888),
    confidence: 'low',
    colour: '#6a8a9a',
    labelImportance: 3,
    successorIds: ['spanish-empire'],
    description:
      'Founded on the Mindanao River by the Johor-descended missionary-adventurer Sharif Kabungsuwan, who married into and Islamised the local ruling families. Under Sultan Kudarat (r. c. 1619–71) it claimed suzerainty over much of Mindanao and repeatedly fought Spanish expeditions to a standstill. Centuries of the "Moro Wars" ended only with Governor-General Weyler’s campaigns of the 1880s, which broke the sultanate’s temporal power without ever fully colonising the interior.',
    sources: [
      src('Majul 1973, Muslim Insurrection in the Philippines and Southeast Asia'),
      src('Warren 2007, The Sulu Zone, 1768–1898'),
    ],
    snapshots: [
      snap(ce(1520).year, poly(MAGUINDANAO_1520), 'low', 'Sharif Kabungsuwan’s founding realm on the Mindanao River (Cotabato), approximate.'),
      snap(ce(1650).year, poly(MAGUINDANAO_1650), 'low', 'Sultan Kudarat’s peak: suzerainty claimed across much of Mindanao, from Zamboanga to Davao Gulf.'),
      snap(ce(1888).year, poly(MAGUINDANAO_1520), 'medium', 'Reduced to its Cotabato core after decades of Spanish campaigns break its wider power.'),
    ],
  },
  {
    id: 'sulu-sultanate',
    name: 'Sulu Sultanate',
    category: 'kingdom',
    start: ce(1405),
    end: ce(1915),
    confidence: 'medium',
    colour: '#7a6a9a',
    labelImportance: 4,
    successorIds: ['philippines'],
    description:
      'Founded by the Arab-descended Sharif ul-Hashim in the Sulu Archipelago (1405), astride the sea trade between the Philippines, Borneo and China. Brunei ceded eastern Sabah (north Borneo) to Sulu in 1704 for help suppressing a rebellion, giving the sultanate a foothold on Borneo still disputed by the Philippines today. Alone among Philippine polities, Sulu was never conquered by Spain — repeated 19th-century wars only reduced it to a nominal protectorate — and it survived American conquest until the 1915 Carpenter Agreement stripped the sultan of political authority, leaving only a religious title.',
    sources: [
      src('Warren 2007, The Sulu Zone, 1768–1898'),
      src('Majul 1973, Muslim Insurrection in the Philippines and Southeast Asia'),
    ],
    snapshots: [
      snap(ce(1405).year, poly(SULU_CORE), 'low', 'Sharif ul-Hashim’s founding sultanate across the Sulu Archipelago, approximate.'),
      snap(ce(1704).year, mpoly(SULU_CORE, SABAH_STRIP), 'medium', 'Brunei cedes eastern Sabah (north Borneo) to Sulu (1704) in gratitude for military help, extending the sultanate onto Borneo.'),
      snap(ce(1878).year, mpoly(SULU_CORE, SABAH_STRIP), 'medium', 'Still holding both the archipelago and its Bornean territory even as an 1878 treaty concedes Spanish (and separately, British North Borneo Company) suzerainty in principle.'),
    ],
  },
];
