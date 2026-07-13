import type { HistoricalEntity } from '../../types';
import { ce, mpoly, poly, snap, src } from '../helpers';

/**
 * European overseas empires beyond Spain and Britain, plus the modern Japanese
 * empire. Colonial possessions are drawn as a few representative territories,
 * highly schematic and far from exhaustive.
 */
export const COLONIAL_ENTITIES: HistoricalEntity[] = [
  {
    id: 'portuguese-empire',
    name: 'Portuguese Empire',
    category: 'colonial-possession',
    start: ce(1415),
    end: ce(1999),
    confidence: 'low',
    colour: '#4a8a5a',
    labelImportance: 4,
    description:
      'The first and longest-lived European seaborne empire — a trading-post thalassocracy in Africa and Asia grafted onto a settlement colony in Brazil. It grew from a single North African fortress (1415) to a chain of Indian Ocean forts and factories (the Estado da Índia), lost its American core in 1822, refocused on African territory in the Scramble for Africa, and ended with the 1999 handover of Macau. Shown by key holdings; the many smaller trading stations, factories and islands are omitted.',
    sources: [
      src('Disney 2009, A History of Portugal and the Portuguese Empire'),
      src('Newitt 2005, A History of Portuguese Overseas Expansion, 1400–1668'),
    ],
    snapshots: [
      snap(ce(1415).year, poly(
        [[-5.45, 35.98], [-5.25, 35.95], [-5.2, 35.85], [-5.4, 35.78], [-5.55, 35.88], [-5.45, 35.98]],
      ), 'medium', 'The conquest of Ceuta (1415), a Moroccan fortress-port — conventionally the empire’s founding act.'),
      snap(ce(1488).year, mpoly(
        [[-25.9, 37.7], [-24.9, 38.2], [-24.6, 37.9], [-25.5, 37.4], [-25.9, 37.7]],
        [[-17.3, 32.8], [-16.6, 33.1], [-16.3, 32.6], [-17.0, 32.4], [-17.3, 32.8]],
        [[-24.2, 15.3], [-23.3, 15.1], [-23.0, 14.8], [-24.0, 14.6], [-24.2, 15.3]],
        [[-5.45, 35.98], [-5.25, 35.95], [-5.2, 35.85], [-5.4, 35.78], [-5.55, 35.88], [-5.45, 35.98]],
        [[8.5, 4.1], [9.5, 4.4], [9.7, 3.5], [8.7, 3.2], [8.5, 4.1]],
      ), 'medium', 'By Bartolomeu Dias rounding the Cape (1488): the Atlantic islands (Azores, Madeira, Cape Verde) settled, Ceuta held, and the Gulf of Guinea forts (São Jorge da Mina, 1482) trading gold and slaves.'),
      snap(ce(1515).year, mpoly(
        [[72.7, 15.3], [74.2, 15.4], [74.3, 15.6], [73.9, 15.65], [73.4, 15.55], [72.7, 15.3]],
        [[102.15, 2.15], [102.3, 2.3], [102.15, 2.35], [102.05, 2.2], [102.15, 2.15]],
        [[56.2, 27.05], [56.35, 27.15], [56.25, 27.2], [56.1, 27.1], [56.2, 27.05]],
        [[-48.5, -25.5], [-46, -23.9], [-43, -22.9], [-41, -20], [-44, -24], [-48.5, -25.5]],
        [[-17.3, 32.8], [-16.6, 33.1], [-16.3, 32.6], [-17.0, 32.4], [-17.3, 32.8]],
        [[-25.9, 37.7], [-24.9, 38.2], [-24.6, 37.9], [-25.5, 37.4], [-25.9, 37.7]],
      ), 'low', 'The Estado da Índia at its founding under Afonso de Albuquerque: Goa (1510), Malacca (1511) and Hormuz (1515) seized as fortified chokepoints, plus the first Brazilian landfall (1500) and the Atlantic islands.'),
      snap(ce(1600).year, mpoly(
        [[-48, -2], [-42, -6], [-38, -10], [-40, -18], [-46, -24], [-52, -20], [-50, -8], [-48, -2]],
        [[12, -6], [13.5, -8.5], [13, -11], [12, -9], [11.7, -7], [12, -6]],
        [[35, -14], [38, -16], [37, -22], [34, -21], [34, -17], [35, -14]],
        [[72.7, 15.3], [74.2, 15.4], [74.3, 15.6], [73.9, 15.65], [73.4, 15.55], [72.7, 15.3]],
        [[79.7, 6.0], [80.2, 6.9], [80.0, 8.4], [79.7, 8.5], [79.6, 7.0], [79.7, 6.0]],
        [[102.15, 2.15], [102.3, 2.3], [102.15, 2.35], [102.05, 2.2], [102.15, 2.15]],
        [[125.4, -8.6], [125.9, -8.9], [126.9, -8.7], [126.4, -8.3], [125.4, -8.6]],
        [[113.4, 22.05], [113.6, 22.2], [113.5, 22.25], [113.35, 22.15], [113.4, 22.05]],
      ), 'low', 'Near its peak under the union with Spain (1580–1640): coastal Brazil, Angola, a Swahili-coast foothold, Goa, coastal Ceylon, Malacca, Timor and Macau (settled 1557) — a thin worldwide chain of ports rather than contiguous territory.'),
      snap(ce(1654).year, mpoly(
        [[-48, -2], [-42, -6], [-38, -10], [-40, -18], [-46, -24], [-52, -20], [-50, -8], [-48, -2]],
        [[12, -6], [13.5, -8.5], [13, -11], [12, -9], [11.7, -7], [12, -6]],
        [[35, -14], [38, -16], [37, -22], [34, -21], [34, -17], [35, -14]],
        [[72.7, 15.3], [74.2, 15.4], [74.3, 15.6], [73.9, 15.65], [73.4, 15.55], [72.7, 15.3]],
        [[113.4, 22.05], [113.6, 22.2], [113.5, 22.25], [113.35, 22.15], [113.4, 22.05]],
      ), 'low', 'After the Dutch–Portuguese War (to 1654): Ceylon, Malacca and most Indian factories lost to the Dutch East India Company, but Brazil is recaptured from the Dutch and booming on sugar, and Goa, Angola and Mozambique endure.'),
      snap(ce(1750).year, mpoly(
        [[-49, -1], [-42, -6], [-38, -10], [-39, -20], [-44, -28], [-53, -25], [-58, -12], [-50, -4], [-49, -1]],
        [[12, -6], [13.5, -8.5], [13, -11], [12, -9], [11.7, -7], [12, -6]],
        [[35, -14], [38, -16], [37, -22], [34, -21], [34, -17], [35, -14]],
        [[72.7, 15.3], [74.2, 15.4], [74.3, 15.6], [73.9, 15.65], [73.4, 15.55], [72.7, 15.3]],
        [[113.4, 22.05], [113.6, 22.2], [113.5, 22.25], [113.35, 22.15], [113.4, 22.05]],
      ), 'low', 'The Brazilian gold and diamond boom (Minas Gerais, from the 1690s) pulls settlement inland and south; Brazil is now the empire’s overwhelming centre of gravity, run from Salvador and then Rio de Janeiro (capital from 1763).'),
      snap(ce(1822).year, mpoly(
        [[12, -6], [13.5, -8.5], [13, -11], [12, -9], [11.7, -7], [12, -6]],
        [[35, -14], [38, -16], [37, -22], [34, -21], [34, -17], [35, -14]],
        [[72.7, 15.3], [74.2, 15.4], [74.3, 15.6], [73.9, 15.65], [73.4, 15.55], [72.7, 15.3]],
        [[113.4, 22.05], [113.6, 22.2], [113.5, 22.25], [113.35, 22.15], [113.4, 22.05]],
      ), 'high', 'Brazilian independence (1822) removes the empire’s largest and richest territory overnight; Portugal is left with its African and Asian trading footholds — Angola, Mozambique, Goa and Macau.'),
      snap(ce(1912).year, mpoly(
        [[12, -6], [16, -5], [22, -6], [24, -10], [21, -18], [14, -17], [12, -12], [12, -6]],
        [[30, -11], [36, -10], [40, -12], [40.5, -17], [35, -26], [30, -22], [30, -11]],
        [[72.7, 15.3], [74.2, 15.4], [74.3, 15.6], [73.9, 15.65], [73.4, 15.55], [72.7, 15.3]],
        [[-23.6, 15.0], [-22.8, 14.9], [-22.9, 16.0], [-23.9, 15.9], [-23.6, 15.0]],
        [[113.4, 22.05], [113.6, 22.2], [113.5, 22.25], [113.35, 22.15], [113.4, 22.05]],
        [[125.4, -8.6], [125.9, -8.9], [126.9, -8.7], [126.4, -8.3], [125.4, -8.6]],
      ), 'medium', 'The Scramble for Africa (formalised at the 1884–85 Berlin Conference) inflates Angola and Mozambique from coastal forts into vast interior colonies — now the empire’s core — alongside Goa, Cape Verde, Macau and Portuguese Timor.'),
      snap(ce(1961).year, mpoly(
        [[12, -6], [16, -5], [22, -6], [24, -10], [21, -18], [14, -17], [12, -12], [12, -6]],
        [[30, -11], [36, -10], [40, -12], [40.5, -17], [35, -26], [30, -22], [30, -11]],
        [[-23.6, 15.0], [-22.8, 14.9], [-22.9, 16.0], [-23.9, 15.9], [-23.6, 15.0]],
        [[-15.6, 11.9], [-14.7, 12.3], [-13.6, 11.4], [-15.0, 10.9], [-15.6, 11.9]],
        [[113.4, 22.05], [113.6, 22.2], [113.5, 22.25], [113.35, 22.15], [113.4, 22.05]],
        [[125.4, -8.6], [125.9, -8.9], [126.9, -8.7], [126.4, -8.3], [125.4, -8.6]],
      ), 'high', 'India annexes Goa by force in December 1961, ending 451 years of Portuguese rule there — the African territories (Angola, Mozambique, Guinea, Cape Verde) remain, defended through the costly Portuguese Colonial War from 1961.'),
      snap(ce(1975).year, mpoly(
        [[113.4, 22.05], [113.6, 22.2], [113.5, 22.25], [113.35, 22.15], [113.4, 22.05]],
      ), 'high', 'The Carnation Revolution (1974) topples the Estado Novo and rapidly decolonises Angola, Mozambique, Guinea-Bissau, Cape Verde, São Tomé and East Timor (1975) — only Macau remains, held until its 1999 handover to China.'),
    ],
  },
  {
    id: 'dutch-empire',
    name: 'Dutch Empire',
    alternativeNames: ['Dutch colonial empire'],
    category: 'colonial-possession',
    start: ce(1602),
    end: ce(1975),
    confidence: 'low',
    colour: '#c2884e',
    labelImportance: 3,
    successorIds: ['indonesia'],
    description:
      'A commercial maritime empire built by the Dutch East and West India Companies, dominant in the 17th-century spice trade. Its centrepiece, the East Indies, became modern Indonesia.',
    sources: [src('Israel 1995, The Dutch Republic')],
    snapshots: [
      snap(ce(1700).year, mpoly(
        [[95, 6], [106, 3], [118, -2], [131, -4], [141, -8], [130, -9], [114, -8], [100, -2], [96, 3], [95, 6]],
        [[16, -32], [20, -33], [20, -34.5], [17, -34.5], [16, -33.5], [16, -32]],
      ), 'low', 'The Dutch East Indies and the Cape, c. 1700 — representative holdings.'),
    ],
  },
  {
    id: 'french-colonial-empire',
    name: 'French colonial empire',
    category: 'colonial-possession',
    start: ce(1605),
    end: ce(1980),
    confidence: 'low',
    colour: '#5a7ab0',
    labelImportance: 4,
    description:
      'The overseas empire of France in two distinct waves: a "first" empire of fur-trading New France, sugar-island slave colonies and Indian trading posts, mostly lost to Britain by 1763; and a "second" empire built from 1830, at its height the world’s second-largest, spanning North, West and Equatorial Africa, Indochina and Madagascar. Shown by representative territories; many smaller possessions are omitted.',
    sources: [
      src('Aldrich 1996, Greater France: A History of French Overseas Expansion'),
      src('Pritchard 2004, In Search of Empire: The French in the Americas, 1670–1730'),
    ],
    snapshots: [
      snap(ce(1608).year, poly(
        [[-71.6, 46.6], [-71.0, 47.0], [-70.3, 46.7], [-70.8, 46.2], [-71.6, 46.6]],
      ), 'medium', 'Samuel de Champlain founds Quebec (1608), the first permanent French settlement in North America, on the St Lawrence.'),
      snap(ce(1682).year, mpoly(
        [[-75, 46], [-70, 49], [-64, 49], [-60, 46], [-66, 42], [-72, 42], [-76, 44], [-75, 46]],
        [[-95, 47], [-89, 47], [-84, 44], [-90, 40], [-95, 43], [-95, 47]],
        [[-91, 41], [-89, 30], [-91, 29], [-93, 33], [-91, 41]],
        [[-72.5, 18.0], [-71.6, 20.0], [-73.5, 20.0], [-74.5, 18.6], [-72.5, 18.0]],
        [[79.7, 11.8], [79.9, 12.0], [79.8, 11.7], [79.6, 11.6], [79.7, 11.8]],
      ), 'low', 'La Salle descends the Mississippi and claims Louisiana for France (1682): New France now spans the St Lawrence, the Great Lakes and the Mississippi basin, alongside the sugar colony of Saint-Domingue and the Indian post of Pondicherry (1674).'),
      snap(ce(1750).year, mpoly(
        [[-75, 47], [-68, 49], [-60, 50], [-56, 47], [-64, 42], [-72, 42], [-76, 44], [-75, 47]],
        [[-97, 49], [-89, 47], [-80, 43], [-90, 34], [-97, 30], [-102, 36], [-97, 49]],
        [[-72.5, 18.0], [-71.6, 20.0], [-73.5, 20.0], [-74.5, 18.6], [-72.5, 18.0]],
        [[-61.7, 16.5], [-61.0, 16.0], [-61.3, 14.4], [-61.7, 14.5], [-61.7, 16.5]],
        [[79.7, 11.8], [79.9, 12.0], [79.8, 11.7], [79.6, 11.6], [79.7, 11.8]],
        [[-16.6, 15.0], [-16.2, 16.0], [-16.4, 16.5], [-16.9, 15.6], [-16.6, 15.0]],
        [[55.1, -21.4], [55.8, -20.9], [55.6, -21.4], [55.3, -21.6], [55.1, -21.4]],
      ), 'low', 'The First French Colonial Empire near its peak, on the eve of the Seven Years’ War: New France and Louisiana claim the whole Mississippi–St Lawrence interior (thinly settled and contested with Britain), plus the Caribbean sugar islands, Indian comptoirs and Indian Ocean way-stations.'),
      snap(ce(1763).year, mpoly(
        [[-72.5, 18.0], [-71.6, 20.0], [-73.5, 20.0], [-74.5, 18.6], [-72.5, 18.0]],
        [[-61.7, 16.5], [-61.0, 16.0], [-61.3, 14.4], [-61.7, 14.5], [-61.7, 16.5]],
        [[-53.5, 4.9], [-51.7, 5.8], [-51.6, 3.6], [-54, 2.2], [-53.5, 4.9]],
        [[79.7, 11.8], [79.9, 12.0], [79.8, 11.7], [79.6, 11.6], [79.7, 11.8]],
        [[-16.6, 15.0], [-16.2, 16.0], [-16.4, 16.5], [-16.9, 15.6], [-16.6, 15.0]],
        [[55.1, -21.4], [55.8, -20.9], [55.6, -21.4], [55.3, -21.6], [55.1, -21.4]],
      ), 'high', 'The Treaty of Paris (1763) ends the Seven Years’ War: Canada and all claims east of the Mississippi pass to Britain, Louisiana west of the river to Spain. France keeps only the immensely profitable Caribbean sugar islands (Saint-Domingue, Martinique, Guadeloupe), Guiana, Indian trading posts and Indian Ocean islands.'),
      snap(ce(1837).year, mpoly(
        [[-1, 37], [3, 37.2], [7, 37], [8.5, 34], [8, 32], [4, 31], [0, 32.5], [-1.5, 35], [-1, 37]],
        [[-61.7, 16.5], [-61.0, 16.0], [-61.3, 14.4], [-61.7, 14.5], [-61.7, 16.5]],
        [[-53.5, 4.9], [-51.7, 5.8], [-51.6, 3.6], [-54, 2.2], [-53.5, 4.9]],
        [[79.7, 11.8], [79.9, 12.0], [79.8, 11.7], [79.6, 11.6], [79.7, 11.8]],
        [[-16.6, 15.0], [-16.2, 16.0], [-16.4, 16.5], [-16.9, 15.6], [-16.6, 15.0]],
        [[55.1, -21.4], [55.8, -20.9], [55.6, -21.4], [55.3, -21.6], [55.1, -21.4]],
      ), 'medium', 'The "Second" French Colonial Empire begins: the 1830 invasion of Algiers opens a long, brutal conquest of Algeria, formally annexed in 1834. Saint-Domingue is gone (independent as Haiti, 1804) but the remaining Caribbean and Indian Ocean possessions persist, along with Senegalese trading posts.'),
      snap(ce(1885).year, mpoly(
        [[-1, 37], [4, 37.2], [8.5, 37], [11.5, 33], [9, 30], [2, 29], [-2, 31], [-3, 35], [-1, 37]],
        [[-17, 12], [-12, 15], [-11, 20], [-4, 24], [2, 22], [4, 16], [-2, 12], [-10, 10], [-17, 12]],
        [[105.5, 8.6], [107, 10.5], [106.8, 12], [104.5, 11], [104, 9.5], [105.5, 8.6]],
        [[-61.7, 16.5], [-61.0, 16.0], [-61.3, 14.4], [-61.7, 14.5], [-61.7, 16.5]],
        [[55.1, -21.4], [55.8, -20.9], [55.6, -21.4], [55.3, -21.6], [55.1, -21.4]],
      ), 'medium', 'The Scramble for Africa and Indochinese conquest in full swing: Algeria consolidated, French West Africa taking shape from Senegal, and Cochinchina (1862), Cambodia (1863) and Annam–Tonkin (1883–84) forming French Indochina.'),
      snap(ce(1920).year, mpoly(
        [[-17, 12], [10, 20], [15, 24], [8, 30], [-5, 28], [-12, 20], [-17, 15], [-17, 12]],
        [[8, 4], [18, 6], [20, 12], [14, 14], [8, 10], [8, 4]],
        [[102, 9], [108, 11], [107, 18], [103, 22], [100, 18], [101, 12], [102, 9]],
        [[43, -12], [46, -13], [46, -16], [44, -16], [43, -14], [43, -12]],
      ), 'low', 'The territorial maximum, after WWI Middle Eastern mandates (Syria, Lebanon) are added: French North and West Africa, Equatorial Africa, Madagascar and Indochina, c. 1920 — representative holdings.'),
      snap(ce(1954).year, mpoly(
        [[-17, 12], [10, 20], [15, 24], [8, 30], [-5, 28], [-12, 20], [-17, 15], [-17, 12]],
        [[8, 4], [18, 6], [20, 12], [14, 14], [8, 10], [8, 4]],
        [[43, -12], [46, -13], [46, -16], [44, -16], [43, -14], [43, -12]],
      ), 'high', 'Defeat at Dien Bien Phu (1954) and the Geneva Accords end French rule in Indochina; French North, West and Equatorial Africa and Madagascar remain intact on the eve of decolonisation.'),
      snap(ce(1962).year, mpoly(
        [[8, 4], [18, 6], [20, 12], [14, 14], [8, 10], [8, 4]],
        [[43, -12], [46, -13], [46, -16], [44, -16], [43, -14], [43, -12]],
        [[-53.5, 4.9], [-51.7, 5.8], [-51.6, 3.6], [-54, 2.2], [-53.5, 4.9]],
      ), 'high', 'Algerian independence (1962), after an eight-year war, ends French rule in North Africa; West and Equatorial African territories had already become independent republics in 1960, leaving only scattered remnants (French Guiana, Djibouti, Réunion, Pacific and Caribbean territories).'),
    ],
  },
  {
    id: 'belgian-empire',
    name: 'Belgian colonial empire',
    alternativeNames: ['Congo Free State', 'Belgian Congo'],
    category: 'colonial-possession',
    start: ce(1885),
    end: ce(1962),
    confidence: 'medium',
    colour: '#b0904a',
    labelImportance: 2,
    description:
      'Centred overwhelmingly on the vast Congo — first the personal possession of King Leopold II, notorious for its brutal exploitation, then the Belgian Congo — until independence in 1960.',
    sources: [src('Hochschild 1998, King Leopold’s Ghost')],
    snapshots: [
      snap(ce(1930).year, mpoly(
        [[12, -5], [18, -4], [26, -3], [30, -4], [29, -8], [27, -12], [22, -11], [16, -8], [12.5, -6], [12, -5]],
      ), 'medium', 'The Belgian Congo, approximate.'),
    ],
  },
  {
    id: 'japanese-empire',
    name: 'Empire of Japan',
    category: 'empire',
    start: ce(1868),
    end: ce(1947),
    confidence: 'medium',
    colour: '#b0466a',
    labelImportance: 4,
    predecessorIds: ['tokugawa'],
    successorIds: ['japan'],
    description:
      'The modern imperial Japanese state from the Meiji Restoration, which industrialised rapidly and built an empire across Korea, Taiwan, Manchuria and, briefly, much of East Asia and the Pacific, until defeat in 1945.',
    sources: [src('Beasley 1987, Japanese Imperialism 1894–1945')],
    snapshots: [
      snap(ce(1942).year, mpoly(
        [[122, 24], [130, 31], [141, 41], [146, 44], [140, 34], [131, 30], [124, 33], [126, 38], [122, 40], [120, 34], [122, 24]],
        [[118, 20], [122, 22], [122, 25], [119, 25], [118, 22], [118, 20]],
        [[124, 38], [131, 38], [130, 43], [126, 43], [124, 40], [124, 38]],
      ), 'low', 'Japan, Korea, Taiwan and holdings at the 1942 wartime peak — highly schematic.'),
    ],
  },
];
