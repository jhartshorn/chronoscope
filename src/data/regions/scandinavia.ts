import type { HistoricalEntity } from '../../types';
import type { Ring } from '../helpers';
import { ce, mpoly, poly, snap, src } from '../helpers';

/**
 * The medieval Scandinavian kingdoms, c. 800–1523: Denmark, Norway, Sweden
 * and their 1397–1523 dynastic union under the Kalmar treaty. Previously
 * only the diffuse `norse-vikings` homeland range existed; this module gives
 * the three kingdoms that actually formed their own political history,
 * handing off to Kalmar and, on Gustav Vasa's 1523 secession, to the modern
 * `sweden` entity (modernstates.ts). Denmark and Norway's own continuation
 * as a personal union until 1814 is not modelled here — `denmark` (1849) and
 * `norway` (1905) pick up later, a gap noted but out of this module's scope.
 */

const NORWAY_MAINLAND: Ring = [
  [4.9, 58.0], [5.2, 61.0], [5.5, 62.3], [8.0, 63.0], [10.5, 63.5], [12.0, 65.5],
  [14.5, 67.5], [16.4, 68.5], [20.0, 69.8], [25.8, 71.1], [29.0, 69.8], [29.5, 69.0],
  [28.0, 66.0], [24.0, 65.5], [21.0, 64.0], [18.0, 62.0], [14.0, 61.0], [11.5, 59.0],
  [10.7, 59.0], [10.4, 58.0], [7.0, 58.0], [4.9, 58.0],
];
const ICELAND: Ring = [
  [-24.0, 63.4], [-14.5, 63.5], [-13.3, 65.1], [-16.0, 66.5], [-22.0, 66.3], [-24.5, 65.0], [-24.0, 63.4],
];
const FAROE: Ring = [[-7.5, 61.3], [-6.3, 61.3], [-6.3, 62.4], [-7.5, 62.4], [-7.5, 61.3]];
const GREENLAND_NORSE: Ring = [[-52, 60], [-42, 60], [-40, 62], [-45, 65], [-52, 63], [-52, 60]];
const HEBRIDES_MAN: Ring = [[-7.5, 56.9], [-6.0, 57.0], [-6.2, 58.5], [-7.8, 58.3], [-7.5, 56.9]];
const NORWAY_872: Ring = [
  [5.0, 58.0], [5.3, 60.5], [6.5, 61.3], [8.0, 60.5], [7.5, 59.0], [6.0, 58.0], [5.0, 58.0],
];

const DENMARK_CORE: Ring = [
  [8.0, 54.6], [8.2, 57.1], [10.5, 57.6], [10.3, 56.3], [12.0, 54.7],
  [12.6, 55.2], [14.3, 55.4], [14.4, 56.3], [12.5, 56.6], [10.8, 55.9], [9.3, 55.0], [8.0, 54.6],
];

const SWEDEN_CORE: Ring = [
  [11.1, 58.9], [12.9, 56.0], [14.3, 55.9], [16.5, 56.2], [19.0, 57.6],
  [18.3, 59.5], [17.2, 60.7], [14.5, 61.0], [12.3, 60.5], [11.1, 58.9],
];
const FINLAND_MED: Ring = [
  [21.0, 60.0], [24.9, 60.1], [28.0, 61.0], [30.0, 62.5], [29.5, 65.0], [25.0, 65.5], [21.5, 63.5], [20.5, 61.5], [21.0, 60.0],
];

export const SCANDINAVIA_ENTITIES: HistoricalEntity[] = [
  {
    id: 'kingdom-of-denmark',
    name: 'Kingdom of Denmark',
    category: 'kingdom',
    start: ce(958),
    end: ce(1397),
    confidence: 'medium',
    colour: '#a85a5a',
    labelImportance: 3,
    predecessorIds: ['norse-vikings'],
    successorIds: ['kalmar-union'],
    description:
      'Traditionally unified and Christianised by Harald Bluetooth (the Jelling stones, c. 965), Denmark was the strongest of the Scandinavian kingdoms through the Viking Age, briefly joined to England and Norway under Cnut the Great (r. 1016–35). Civil war (the "Age of the Sterile Kings") ended with Valdemar I’s reunification in 1157. In 1397 Margaret I brought Denmark, Norway and Sweden together under the Kalmar Union.',
    sources: [
      src('Winroth 2014, The Age of the Vikings'),
      src('Lund 1994, in The Oxford History of the Vikings'),
    ],
    snapshots: [
      snap(ce(965).year, poly(DENMARK_CORE), 'medium', 'Harald Bluetooth’s unified, Christianised Denmark: Jutland, the Danish islands and Skåne (then Danish, across the Öresund).'),
      snap(ce(1028).year, mpoly(DENMARK_CORE, NORWAY_MAINLAND), 'low', 'Cnut the Great also holds Norway (conquered 1028) and England (not shown) — the short-lived "North Sea Empire", which collapsed at his death in 1035.'),
      snap(ce(1157).year, poly(DENMARK_CORE), 'medium', 'Valdemar I "the Great" ends decades of civil war and reunifies Denmark to its core Jutland–islands–Skåne extent.'),
      snap(ce(1370).year, poly(DENMARK_CORE), 'medium', 'After the Treaty of Stralsund (1370) checks Hanseatic power, Denmark under Valdemar IV is again the leading Baltic kingdom, on the eve of Margaret I’s dynastic unions.'),
    ],
  },
  {
    id: 'kingdom-of-norway',
    name: 'Kingdom of Norway',
    category: 'kingdom',
    start: ce(872),
    end: ce(1397),
    confidence: 'low',
    colour: '#5a8ab0',
    labelImportance: 3,
    predecessorIds: ['norse-vikings'],
    successorIds: ['kalmar-union'],
    description:
      'Traditionally unified by Harald Fairhair’s victory at Hafrsfjord (872). Olaf II completed the Christianisation of the country and consolidated royal power before his death at Stiklestad (1030). At its 13th-century height under Magnus VI, the "Norwegian Realm" (Norgesveldet) also embraced Iceland, Greenland, the Faroes and, until the 1266 Treaty of Perth, the Hebrides and Isle of Man. Joined Denmark and Sweden in the Kalmar Union in 1397.',
    sources: [
      src('Winroth 2014, The Age of the Vikings'),
      src('Helle (ed.) 2003, The Cambridge History of Scandinavia, vol. 1'),
    ],
    snapshots: [
      snap(ce(872).year, poly(NORWAY_872), 'low', 'Harald Fairhair’s core realm after Hafrsfjord: the south-western coast, approximate.'),
      snap(ce(1015).year, poly(NORWAY_MAINLAND), 'low', 'Olaf II consolidates royal authority the length of the coast, from Viken to Hålogaland.'),
      snap(ce(1265).year, mpoly(NORWAY_MAINLAND, ICELAND, FAROE, GREENLAND_NORSE, HEBRIDES_MAN), 'low', 'Magnus VI’s "Norwegian Realm" at its widest: mainland Norway plus Iceland (1262), the Faroes, Norse Greenland and, briefly, the Hebrides and Man — ceded to Scotland the following year (Treaty of Perth, 1266).'),
      snap(ce(1380).year, mpoly(NORWAY_MAINLAND, ICELAND, FAROE, GREENLAND_NORSE), 'low', 'On the eve of the Kalmar Union: the North Atlantic dependencies remain, the Hebrides and Man long since lost.'),
    ],
  },
  {
    id: 'kingdom-of-sweden',
    name: 'Kingdom of Sweden',
    category: 'kingdom',
    start: ce(970),
    end: ce(1397),
    confidence: 'low',
    colour: '#4a7ab0',
    labelImportance: 3,
    predecessorIds: ['norse-vikings'],
    successorIds: ['kalmar-union'],
    description:
      'Emerging from the merger of the Svear and Götar under kings such as Eric the Victorious and Olof Skötkonung (r. c. 995–1022), Sweden was Christianised more slowly than its neighbours and long looked east — its Varangian trade routes fed directly into the Kievan Rus. The Swedish Crusades (from the 1150s) brought Finland under the crown over the following century. Joined the Kalmar Union in 1397, though royal control from Copenhagen was contested for most of its life.',
    sources: [
      src('Winroth 2014, The Age of the Vikings'),
      src('Helle (ed.) 2003, The Cambridge History of Scandinavia, vol. 1'),
    ],
    snapshots: [
      snap(ce(995).year, poly(SWEDEN_CORE), 'low', 'The core Svealand–Götaland realm under Olof Skötkonung, approximate.'),
      snap(ce(1250).year, mpoly(SWEDEN_CORE, FINLAND_MED), 'low', 'Birger Jarl’s Second Swedish Crusade (1249) brings western Finland under the crown.'),
      snap(ce(1350).year, mpoly(SWEDEN_CORE, FINLAND_MED), 'low', 'Magnus Eriksson’s reign: a stable Sweden–Finland realm on the eve of the Black Death and the Kalmar Union.'),
    ],
  },
  {
    id: 'kalmar-union',
    name: 'Kalmar Union',
    category: 'confederation',
    start: ce(1397),
    end: ce(1523),
    confidence: 'medium',
    colour: '#9a7a4a',
    labelImportance: 4,
    predecessorIds: ['kingdom-of-denmark', 'kingdom-of-norway', 'kingdom-of-sweden'],
    successorIds: ['sweden'],
    description:
      'The personal union of Denmark, Norway and Sweden (with Finland) under one monarch, engineered by Margaret I of Denmark and formalised at Kalmar in 1397 to counter Hanseatic and Holstein power in the Baltic. Never a merger of the three realms — each kept its own laws and council — and Swedish nobles repeatedly repudiated the union under their own regents before Gustav Vasa’s revolt (1521–23) made the breach permanent; Denmark and Norway remained united long after (to 1814), not modelled further here.',
    sources: [
      src('Helle (ed.) 2003, The Cambridge History of Scandinavia, vol. 1'),
      src('Larsson 1997, Kalmarunionens tid'),
    ],
    snapshots: [
      snap(ce(1397).year, mpoly(DENMARK_CORE, NORWAY_MAINLAND, ICELAND, FAROE, GREENLAND_NORSE, SWEDEN_CORE, FINLAND_MED), 'medium', 'The union formalised at Kalmar under Margaret I: all three crowns, plus Norway’s North Atlantic dependencies.'),
      snap(ce(1449).year, mpoly(DENMARK_CORE, NORWAY_MAINLAND, ICELAND, FAROE, GREENLAND_NORSE), 'low', 'Sweden elects its own king, Karl Knutsson (1448), one of several periods (1448–57, 1464–97, 1501–20) when Swedish regents ruled independently of the union in all but name.'),
      snap(ce(1497).year, mpoly(DENMARK_CORE, NORWAY_MAINLAND, ICELAND, FAROE, GREENLAND_NORSE, SWEDEN_CORE, FINLAND_MED), 'low', 'Hans of Denmark forces submission and is crowned king of Sweden (1497), briefly restoring the full union.'),
      snap(ce(1520).year, mpoly(DENMARK_CORE, NORWAY_MAINLAND, ICELAND, FAROE, GREENLAND_NORSE, SWEDEN_CORE, FINLAND_MED), 'low', 'Christian II reconquers Sweden and stages the Stockholm Bloodbath (1520), a massacre of the Swedish nobility that provokes the revolt which ends the union.'),
      snap(ce(1523).year, mpoly(DENMARK_CORE, NORWAY_MAINLAND, ICELAND, FAROE, GREENLAND_NORSE), 'medium', 'Gustav Vasa completes the Swedish war of liberation and is elected king (1523): Sweden leaves the union for good, leaving only Denmark–Norway.'),
    ],
  },
];
