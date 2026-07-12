import type { HistoricalEntity } from '../../types';
import type { Ring } from '../helpers';
import { bce, ce, poly, snap, src } from '../helpers';

/**
 * Ireland from the Iron Age to the 1801 union: the Gaelic world and its
 * provincial over-kingdoms (the "fifths", cóiceda), the Norse town-kingdom
 * of Dublin, and the English Lordship and Kingdom of Ireland. Together with
 * `united-kingdom` (entities.ts, from 1801) and `ireland` (modernstates.ts,
 * from 1922) this gives the island a continuous political history.
 *
 * Early Irish politics was a shifting hierarchy of ~150 local kingdoms
 * (túatha) under provincial over-kings; the provinces drawn here are the
 * stable top layer of that hierarchy, not bounded states.
 */

/** The whole island, coarse (fills are clipped to the coastline). */
const IRELAND_WHOLE: Ring = [
  [-10.0, 51.55], [-8.2, 51.55], [-6.3, 52.2], [-6.0, 53.3], [-6.1, 54.1],
  [-5.55, 54.45], [-6.05, 55.2], [-7.4, 55.4], [-8.55, 54.9], [-10.05, 54.3],
  [-9.7, 53.3], [-10.0, 52.2], [-10.4, 51.9], [-10.0, 51.55],
];

export const IRELAND_ENTITIES: HistoricalEntity[] = [
  {
    id: 'gaelic-ireland',
    name: 'Gaelic Ireland',
    alternativeNames: ['Gaels', 'Scoti', 'Hibernia', 'Ériu'],
    category: 'people',
    start: bce(300),
    end: ce(1603),
    confidence: 'low',
    colour: '#4a8a5a',
    labelImportance: 3,
    successorIds: ['kingdom-of-ireland'],
    description:
      'The Gaelic-speaking world of Ireland — never part of the Roman Empire — organised as a patchwork of local kingdoms (túatha) under provincial over-kings and, at times, a nominal High King at Tara. Christianised in the 5th century (Patrick), it became a great centre of monastic learning that re-exported Christianity and letters to Britain and the continent. Gaelic political order survived the Vikings and outlived the Anglo-Norman conquest in most of the island, ending only with the Tudor conquest and the Flight of the Earls (1607).',
    sources: [
      src('Ó Cróinín 1995, Early Medieval Ireland 400–1200'),
      src('Byrne 1973, Irish Kings and High-Kings'),
    ],
    snapshots: [
      snap(ce(500).year, poly(IRELAND_WHOLE), 'low', 'The whole island; political authority within it was layered and local.'),
    ],
  },

  // ------------------------------------------------ the provincial kingdoms
  {
    id: 'ulaid',
    name: 'Ulaid',
    alternativeNames: ['Ulster', 'Dál Fiatach'],
    category: 'kingdom',
    start: ce(400),
    end: ce(1177),
    confidence: 'low',
    colour: '#5a9a5a',
    labelImportance: 1,
    successorIds: ['lordship-of-ireland'],
    description:
      'The over-kingdom of eastern Ulster, heir to the heroic province of the Ulster Cycle (Cú Chulainn, Emain Macha), long since pushed east of the river Bann by the Uí Néill. It fell to the freelance Anglo-Norman conquest of John de Courcy in 1177.',
    sources: [src('Byrne 1973, Irish Kings and High-Kings')],
    snapshots: [
      snap(ce(800).year, poly([
        [-6.7, 54.05], [-5.85, 54.1], [-5.5, 54.3], [-5.55, 54.65], [-6.05, 55.2],
        [-6.65, 55.05], [-6.8, 54.6], [-6.7, 54.05],
      ]), 'low', 'Antrim and Down, east of the Bann and Lough Neagh.'),
    ],
  },
  {
    id: 'ailech',
    name: 'Kingdom of Ailech',
    alternativeNames: ['Northern Uí Néill', 'Cenél nEógain', 'Tír Eoghain'],
    category: 'kingdom',
    start: ce(450),
    end: ce(1185),
    confidence: 'low',
    colour: '#3a7a5a',
    labelImportance: 1,
    description:
      'The kingdom of the northern Uí Néill in north-western Ulster, named for the great stone fort of Grianán Ailigh. Its dynasties, Cenél nEógain and Cenél Conaill, supplied many High Kings and continued after the Anglo-Norman period as the O’Neills of Tír Eoghain and O’Donnells of Tír Chonaill — the last great Gaelic lordships, which fell only in 1603.',
    sources: [src('Byrne 1973, Irish Kings and High-Kings')],
    snapshots: [
      snap(ce(900).year, poly([
        [-8.4, 54.6], [-7.05, 54.5], [-6.8, 54.6], [-6.65, 55.05], [-7.4, 55.35],
        [-8.3, 55.15], [-8.55, 54.9], [-8.4, 54.6],
      ]), 'low', 'Donegal, Derry and Tyrone, west of the Bann.'),
    ],
  },
  {
    id: 'connacht',
    name: 'Kingdom of Connacht',
    alternativeNames: ['Connachta', 'Uí Briúin'],
    category: 'kingdom',
    start: ce(400),
    end: ce(1235),
    confidence: 'low',
    colour: '#7aa06a',
    labelImportance: 1,
    successorIds: ['lordship-of-ireland'],
    description:
      'The western fifth, ruled in the historical period by the Uí Briúin dynasty — the Ua Conchobair (O’Connor) kings, two of whom (Tairrdelbach and Ruaidrí) were the last effective High Kings of Ireland before the Anglo-Norman invasion. Richard de Burgh’s conquest of 1235 broke the kingdom, though O’Connor kings persisted in a reduced form.',
    sources: [src('Byrne 1973, Irish Kings and High-Kings')],
    snapshots: [
      snap(ce(1000).year, poly([
        [-9.05, 53.15], [-8.0, 53.35], [-7.9, 54.1], [-8.5, 54.5], [-10.05, 54.3],
        [-9.7, 53.4], [-10.0, 53.05], [-9.05, 53.15],
      ]), 'low', 'Between the Shannon and the Atlantic, from Galway Bay to Donegal Bay.'),
    ],
  },
  {
    id: 'mide',
    name: 'Kingdom of Mide',
    alternativeNames: ['Meath', 'Southern Uí Néill', 'Tara'],
    category: 'kingdom',
    start: ce(400),
    end: ce(1172),
    confidence: 'low',
    colour: '#4a7a4a',
    labelImportance: 1,
    successorIds: ['lordship-of-ireland'],
    description:
      'The "middle" fifth, the midland kingdom of the southern Uí Néill, holding the symbolic royal sites of Tara and Uisneach — whose king was, more often than any other, reckoned High King of Ireland. Henry II granted it to Hugh de Lacy in 1172 as the Lordship of Meath.',
    sources: [src('Byrne 1973, Irish Kings and High-Kings')],
    snapshots: [
      snap(ce(900).year, poly([
        [-6.25, 53.35], [-6.35, 53.9], [-7.3, 54.0], [-8.0, 53.6], [-7.75, 53.3],
        [-7.0, 53.25], [-6.25, 53.35],
      ]), 'low', 'The midlands from the Irish Sea at the Boyne to the Shannon.'),
    ],
  },
  {
    id: 'leinster',
    name: 'Kingdom of Leinster',
    alternativeNames: ['Laigin'],
    category: 'kingdom',
    start: ce(400),
    end: ce(1171),
    confidence: 'low',
    colour: '#8a9a4a',
    labelImportance: 1,
    successorIds: ['lordship-of-ireland'],
    description:
      'The south-eastern fifth, kingdom of the Laigin. Its deposed king Diarmait Mac Murchada recruited Richard de Clare ("Strongbow") and other Marcher lords to recover it in 1169 — the invitation that began the Anglo-Norman conquest of Ireland. Strongbow’s succession in 1171 brought Henry II himself to Ireland to assert control.',
    sources: [src('Byrne 1973, Irish Kings and High-Kings')],
    snapshots: [
      snap(ce(1000).year, poly([
        [-6.9, 52.15], [-6.35, 52.2], [-6.15, 52.6], [-6.05, 53.0], [-6.25, 53.35],
        [-7.0, 53.25], [-7.6, 53.0], [-7.3, 52.5], [-6.9, 52.15],
      ]), 'low', 'The south-east between the Barrow and the sea; Norse Dublin sat on its northern edge.'),
    ],
  },
  {
    id: 'munster',
    name: 'Kingdom of Munster',
    alternativeNames: ['Mumu', 'Cashel', 'Dál gCais', 'Eóganachta'],
    category: 'kingdom',
    start: ce(400),
    end: ce(1118),
    confidence: 'low',
    colour: '#3a8a6a',
    labelImportance: 1,
    successorIds: ['lordship-of-ireland'],
    description:
      'The southern fifth, ruled from the Rock of Cashel by the Eóganachta and then by the upstart Dál gCais, whose king Brian Boru made himself High King of Ireland (1002) and died defeating the Leinster–Norse alliance at Clontarf (1014). In 1118 the province was split into Thomond (O’Brien) and Desmond (MacCarthy).',
    sources: [
      src('Byrne 1973, Irish Kings and High-Kings'),
      src('Duffy 2013, Brian Boru and the Battle of Clontarf'),
    ],
    snapshots: [
      snap(ce(1000).year, poly([
        [-10.4, 51.85], [-9.5, 51.5], [-8.2, 51.6], [-7.55, 51.95], [-6.9, 52.15],
        [-7.3, 52.5], [-7.6, 53.0], [-8.0, 53.35], [-9.05, 53.15], [-9.35, 52.9],
        [-10.0, 52.4], [-10.4, 51.85],
      ]), 'low', 'The south-west, from the Shannon estuary and Clare to Waterford, under Brian Boru.'),
    ],
  },

  // ----------------------------------------------------------- Norse Dublin
  {
    id: 'kingdom-of-dublin',
    name: 'Kingdom of Dublin',
    alternativeNames: ['Dyflin', 'Norse Dublin', 'Áth Cliath'],
    category: 'city-state',
    start: ce(853),
    end: ce(1170),
    confidence: 'medium',
    colour: '#5a7a9a',
    labelImportance: 2,
    predecessorIds: ['norse-vikings'],
    successorIds: ['lordship-of-ireland'],
    description:
      'The Viking town-kingdom at the mouth of the Liffey — the greatest slave and silver market of the western seaways, whose Uí Ímair kings at times also ruled York. Increasingly Gaelicised and subordinate to Irish over-kings after Clontarf (1014), it fell to Strongbow in 1170 and became the seat of English government in Ireland.',
    sources: [src('Downham 2007, Viking Kings of Britain and Ireland')],
    snapshots: [
      snap(ce(1000).year, poly([
        [-6.6, 53.1], [-6.05, 53.2], [-6.0, 53.55], [-6.55, 53.5], [-6.6, 53.1],
      ]), 'medium', 'The town and its coastal hinterland (Fine Gall — "foreigners’ territory", now Fingal).'),
    ],
  },

  // ------------------------------------------------------- English Ireland
  {
    id: 'lordship-of-ireland',
    name: 'Lordship of Ireland',
    category: 'colonial-possession',
    start: ce(1171),
    end: ce(1542),
    confidence: 'medium',
    colour: '#9a5a4a',
    labelImportance: 2,
    parentEntityId: 'kingdom-of-england',
    predecessorIds: ['leinster', 'kingdom-of-dublin'],
    successorIds: ['kingdom-of-ireland'],
    description:
      'The lands held in Ireland by the English crown after Henry II’s intervention of 1171, claimed under the papal bull Laudabiliter. Anglo-Norman lords conquered most of the east and south within two generations, but from the 14th century the colony contracted as Gaelic Ireland resurged, until effective royal rule was confined to the fortified Pale around Dublin.',
    sources: [
      src('Frame 2012, Colonial Ireland 1169–1369 (2nd ed.)'),
      src('Lydon 2003, The Lordship of Ireland in the Middle Ages'),
    ],
    snapshots: [
      snap(ce(1250).year, poly([
        [-10.4, 51.85], [-8.2, 51.55], [-6.3, 52.2], [-6.0, 53.3], [-6.1, 54.05],
        [-5.5, 54.3], [-5.55, 54.65], [-6.05, 55.2], [-6.65, 55.05], [-6.8, 54.55],
        [-7.4, 54.15], [-7.9, 54.1], [-8.5, 54.45], [-10.05, 54.3], [-9.7, 53.4],
        [-10.0, 53.0], [-9.35, 52.9], [-10.0, 52.4], [-10.4, 51.85],
      ]), 'low', 'The high-water mark of Anglo-Norman Ireland: everything but the Gaelic north-west (Tír Eoghain and Tír Chonaill) and pockets of the interior.'),
      snap(ce(1450).year, poly([
        [-6.3, 53.15], [-6.1, 53.3], [-6.15, 53.6], [-6.35, 53.95], [-6.65, 54.05],
        [-6.9, 53.75], [-6.6, 53.35], [-6.3, 53.15],
      ]), 'medium', 'The Pale around Dublin, Drogheda and Kells — all that remained under effective royal government; outlying walled towns are not shown.'),
    ],
  },
  {
    id: 'kingdom-of-ireland',
    name: 'Kingdom of Ireland',
    category: 'kingdom',
    start: ce(1542),
    end: ce(1800),
    confidence: 'high',
    colour: '#7a4a5a',
    labelImportance: 2,
    predecessorIds: ['lordship-of-ireland'],
    successorIds: ['united-kingdom'],
    description:
      'The kingdom proclaimed by the Crown of Ireland Act (1542), held in personal union by the kings of England and governed from Dublin Castle. The claim became reality through the Tudor conquest, completed with the Nine Years’ War (1603) and followed by plantations, Cromwellian confiscation and the Protestant Ascendancy. The Act of Union merged it into the United Kingdom in 1801.',
    sources: [
      src('Connolly 2007, Contested Island: Ireland 1460–1630'),
      src('Canny 2001, Making Ireland British 1580–1650'),
    ],
    snapshots: [
      snap(ce(1542).year, poly(IRELAND_WHOLE), 'medium', 'The whole island as claimed in 1542; effective control of Gaelic Ulster came only after 1603.'),
      snap(ce(1700).year, poly(IRELAND_WHOLE), 'high', 'The whole island under crown government.'),
    ],
  },
];
