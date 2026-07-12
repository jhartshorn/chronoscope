import type { HistoricalEntity } from '../../types';
import { ce, mpoly, poly, snap, src } from '../helpers';

/**
 * Early-medieval Britain in detail: the Pictish and Gaelic north, the
 * Brythonic (Brittonic) Celtic west and its "Old North" (Yr Hen Ogledd)
 * survivals, the Anglo-Saxon Heptarchy, the Danelaw, and the kingdoms of
 * Alba and Gwynedd that carried the story to 1283/1707.
 *
 * These are small polities; the detail is meant to be read when zoomed in on
 * the British Isles. Boundaries in this period are especially fluid and the
 * outlines are schematic. Iron Age, Roman and Norse-maritime Britain live in
 * `britain2.ts`; Ireland in `ireland.ts`; the Kingdom of England and the
 * United Kingdom in the core `entities.ts`.
 */
export const BRITAIN_ENTITIES: HistoricalEntity[] = [
  // ------------------------------------------------------------ the north
  {
    id: 'picts',
    name: 'Picts',
    alternativeNames: ['Pictland', 'Cruithne', 'Fortriu'],
    category: 'people',
    start: ce(300),
    end: ce(900),
    confidence: 'low',
    colour: '#5a7d8a',
    labelImportance: 2,
    predecessorIds: ['caledonii'],
    successorIds: ['kingdom-of-alba'],
    description:
      'A confederation of peoples of northern and eastern Scotland beyond the reach of Rome, known from symbol stones and hostile Roman and later accounts. Their victory at Dun Nechtain (685) halted Northumbrian expansion. In the 9th century Pictland merged with Gaelic Dál Riata to form the Kingdom of Alba (Scotland).',
    sources: [
      src('Fraser 2009, From Caledonia to Pictland'),
      src('Woolf 2007, From Pictland to Alba'),
    ],
    snapshots: [
      snap(ce(450).year, poly([
        [-3.3, 56.05], [-2.6, 56.25], [-2.85, 56.5], [-2.1, 57.15], [-2.0, 57.7],
        [-3.4, 57.65], [-4.25, 57.5], [-3.85, 57.95], [-3.35, 58.25], [-3.05, 58.65],
        [-4.4, 58.6], [-5.0, 58.55], [-4.95, 57.9], [-5.3, 57.1], [-5.15, 56.75],
        [-4.75, 56.55], [-4.55, 56.25], [-4.15, 56.1], [-3.75, 56.05], [-3.3, 56.05],
      ]), 'low', 'Pictland north of the Forth and east of the central-highland spine (Druim Alban), reaching Caithness.'),
      snap(ce(850).year, poly([
        [-3.3, 56.05], [-2.6, 56.25], [-2.85, 56.5], [-2.1, 57.15], [-2.0, 57.7],
        [-3.4, 57.65], [-4.25, 57.5], [-3.85, 57.95], [-3.5, 58.2], [-4.6, 58.15],
        [-5.0, 57.7], [-5.15, 56.75], [-4.75, 56.55], [-4.55, 56.25], [-4.15, 56.1],
        [-3.75, 56.05], [-3.3, 56.05],
      ]), 'low', 'On the eve of the union with the Gaels: the far north (Caithness, Sutherland) is passing under Norse control.'),
    ],
  },
  {
    id: 'dal-riata',
    name: 'Dál Riata',
    category: 'kingdom',
    start: ce(500),
    end: ce(900),
    confidence: 'low',
    colour: '#6a9a7a',
    labelImportance: 2,
    successorIds: ['kingdom-of-alba'],
    description:
      'A Gaelic (Scotti) kingdom straddling the North Channel, in Argyll in western Scotland and Antrim in north-eastern Ireland, with a great monastery on Iona (founded 563). Its language and church helped shape the later Kingdom of Alba.',
    sources: [src('Fraser 2009, From Caledonia to Pictland')],
    snapshots: [
      snap(ce(500).year, mpoly(
        [[-5.65, 55.3], [-5.4, 55.35], [-5.05, 55.85], [-4.85, 56.1], [-4.75, 56.55],
         [-5.15, 56.75], [-5.6, 56.55], [-6.4, 56.35], [-6.1, 55.9], [-5.9, 55.5], [-5.65, 55.3]],
        [[-6.75, 54.65], [-5.95, 54.55], [-5.65, 54.85], [-6.05, 55.2], [-6.6, 55.15], [-6.75, 54.65]],
      ), 'low', 'Argyll (Kintyre, Knapdale, Lorn and the inner isles) and Antrim, straddling the North Channel.'),
      snap(ce(700).year, poly([
        [-5.65, 55.3], [-5.4, 55.35], [-5.05, 55.85], [-4.85, 56.1], [-4.75, 56.55],
        [-5.15, 56.75], [-5.6, 56.55], [-6.4, 56.35], [-6.1, 55.9], [-5.9, 55.5], [-5.65, 55.3],
      ]), 'low', 'After the defeat at Mag Rath (637) the Irish territories are lost; the kingdom is confined to Argyll.'),
    ],
  },
  {
    id: 'strathclyde',
    name: 'Kingdom of Strathclyde',
    alternativeNames: ['Alt Clut', 'Cumbria', 'Yr Hen Ogledd'],
    category: 'kingdom',
    start: ce(450),
    end: ce(1030),
    confidence: 'low',
    colour: '#7a8ab0',
    labelImportance: 2,
    successorIds: ['kingdom-of-alba'],
    description:
      'A Brythonic (Brittonic) Celtic kingdom of the Clyde valley, ruled from the rock of Dumbarton (Alt Clut), a survival of the old British north (Yr Hen Ogledd). After Vikings sacked Dumbarton in 870 the kingdom re-centred on Govan and expanded south across the Solway into Cumbria, before absorption into Scotland in the early 11th century.',
    sources: [src('Clarkson 2010, The Men of the North: The Britons of Southern Scotland')],
    snapshots: [
      snap(ce(600).year, poly([
        [-4.95, 55.45], [-4.4, 55.45], [-3.85, 55.55], [-3.75, 55.95], [-4.3, 56.05],
        [-4.85, 55.95], [-5.1, 55.7], [-4.95, 55.45],
      ]), 'low', 'Alt Clut: the Clyde basin around Dumbarton Rock.'),
      snap(ce(950).year, poly([
        [-3.75, 55.95], [-3.45, 55.65], [-3.1, 55.25], [-2.95, 55.0], [-2.9, 54.6],
        [-3.3, 54.25], [-3.65, 54.55], [-4.0, 54.75], [-4.55, 54.75], [-4.95, 54.7],
        [-5.05, 55.1], [-4.85, 55.5], [-5.1, 55.7], [-4.85, 55.95], [-4.3, 56.05], [-3.75, 55.95],
      ]), 'low', 'The expanded 10th-century kingdom ("Cumbria"), from the Clyde south across the Solway toward the Rere Cross on Stainmore.'),
    ],
  },

  // ------------------------------------------------- the Brythonic west
  {
    id: 'gwynedd',
    name: 'Kingdom of Gwynedd',
    alternativeNames: ['Venedotia', 'Principality of Wales'],
    category: 'kingdom',
    start: ce(450),
    end: ce(1283),
    confidence: 'low',
    colour: '#5a9a8a',
    labelImportance: 3,
    successorIds: ['kingdom-of-england'],
    description:
      'The most powerful of the Brythonic (Welsh) kingdoms of post-Roman Britain, based on Anglesey and Snowdonia. Under Gruffudd ap Llywelyn it briefly ruled all Wales (1055–63); under Llywelyn the Great and Llywelyn ap Gruffudd it led the native Principality of Wales recognised at Montgomery (1267), until Edward I’s conquest of 1282–83.',
    sources: [
      src('Davies 1990, Patterns of Power in Early Wales'),
      src('Charles-Edwards 2013, Wales and the Britons 350–1064'),
    ],
    snapshots: [
      snap(ce(800).year, poly([
        [-4.8, 52.75], [-4.35, 52.55], [-3.95, 52.55], [-3.85, 52.85], [-3.45, 52.85],
        [-3.3, 53.0], [-3.35, 53.35], [-4.05, 53.3], [-4.75, 53.45], [-4.8, 52.75],
      ]), 'low', 'The north-western heartland: Anglesey, Snowdonia and the Llŷn peninsula.'),
      snap(ce(1057).year, poly([
        [-5.35, 51.65], [-4.4, 51.55], [-3.55, 51.4], [-3.15, 51.45], [-2.7, 51.6],
        [-2.95, 52.1], [-3.15, 52.5], [-3.05, 52.9], [-3.35, 53.35], [-4.05, 53.3],
        [-4.75, 53.45], [-4.8, 52.75], [-4.15, 52.5], [-5.35, 51.9], [-5.35, 51.65],
      ]), 'low', 'Gruffudd ap Llywelyn as sole ruler of all Wales (1055–63) — the only time the country was united under one native king.'),
      snap(ce(1100).year, poly([
        [-4.8, 52.75], [-4.35, 52.55], [-3.95, 52.55], [-3.85, 52.85], [-3.45, 52.85],
        [-3.3, 53.0], [-3.35, 53.35], [-4.05, 53.3], [-4.75, 53.45], [-4.8, 52.75],
      ]), 'low', 'After Gruffudd’s death (1063) and the first Norman incursions, Gwynedd falls back on its mountain heartland.'),
      snap(ce(1220).year, poly([
        [-4.8, 52.75], [-4.35, 52.5], [-3.85, 52.5], [-3.55, 52.7], [-3.25, 52.85],
        [-3.15, 53.05], [-3.35, 53.35], [-4.05, 53.3], [-4.75, 53.45], [-4.8, 52.75],
      ]), 'low', 'Llywelyn the Great’s Gwynedd, hegemon over the other Welsh lords.'),
      snap(ce(1267).year, poly([
        [-4.8, 52.75], [-4.5, 52.3], [-4.25, 52.1], [-3.9, 52.0], [-3.5, 52.05],
        [-3.3, 52.3], [-3.15, 52.55], [-3.05, 52.9], [-3.35, 53.35], [-4.05, 53.3],
        [-4.75, 53.45], [-4.8, 52.75],
      ]), 'low', 'The Principality of Wales recognised by the Treaty of Montgomery (1267): Gwynedd with the homage of the other native lords, before the wars of 1277 and 1282–83.'),
    ],
  },
  {
    id: 'powys',
    name: 'Kingdom of Powys',
    category: 'kingdom',
    start: ce(450),
    end: ce(1160),
    confidence: 'low',
    colour: '#6a9a5a',
    labelImportance: 1,
    successorIds: ['gwynedd'],
    description:
      'The Welsh kingdom of the eastern marches, heir to the lands of the Cornovii, facing Mercia across Offa’s Dyke. Repeatedly squeezed between England and Gwynedd, it split into Powys Fadog and Powys Wenwynwyn after the death of Madog ap Maredudd in 1160.',
    sources: [
      src('Davies 1990, Patterns of Power in Early Wales'),
      src('Charles-Edwards 2013, Wales and the Britons 350–1064'),
    ],
    snapshots: [
      snap(ce(850).year, poly([
        [-3.35, 53.15], [-2.95, 53.1], [-2.7, 52.55], [-3.0, 52.05], [-3.4, 52.15],
        [-3.5, 52.6], [-3.35, 53.15],
      ]), 'low', 'The upper Severn valley and the borderlands behind Offa’s Dyke.'),
    ],
  },
  {
    id: 'deheubarth',
    name: 'Deheubarth',
    alternativeNames: ['Dyfed', 'Seisyllwg', 'Kingdom of South Wales'],
    category: 'kingdom',
    start: ce(920),
    end: ce(1197),
    confidence: 'low',
    colour: '#4a9a7a',
    labelImportance: 1,
    successorIds: ['kingdom-of-england'],
    description:
      'The kingdom of south-west Wales, assembled around 920 by Hywel Dda ("the Good", the traditional codifier of Welsh law) from the older kingdoms of Dyfed and Seisyllwg. Under the Lord Rhys in the 12th century it led Welsh resistance to the Normans; after his death (1197) it fragmented among his heirs.',
    sources: [
      src('Davies 1990, Patterns of Power in Early Wales'),
      src('Turvey 2002, The Welsh Princes'),
    ],
    snapshots: [
      snap(ce(1050).year, poly([
        [-5.35, 51.65], [-4.35, 51.6], [-3.95, 51.7], [-3.85, 52.0], [-4.3, 52.3],
        [-4.55, 52.4], [-5.15, 52.1], [-5.35, 51.9], [-5.35, 51.65],
      ]), 'low', 'Dyfed, Ystrad Tywi and Ceredigion — the south-western third of Wales.'),
    ],
  },
  {
    id: 'dumnonia',
    name: 'Dumnonia',
    alternativeNames: ['Kingdom of Cornwall', 'Kernow', 'Dumnonii', 'West Wales'],
    category: 'kingdom',
    start: ce(410),
    end: ce(875),
    confidence: 'low',
    colour: '#4a8a9a',
    labelImportance: 1,
    successorIds: ['wessex'],
    description:
      'The Brythonic kingdom of the south-western peninsula, continuing the Iron Age Dumnonii after Rome’s withdrawal and closely tied to Brittany, which its emigrants helped settle. West Saxon expansion took Devon by the 8th century; the Cornish remnant fought on (allied with Vikings at Hingston Down, 838) until the Tamar was fixed as the border under Æthelstan.',
    sources: [
      src('Charles-Edwards 2013, Wales and the Britons 350–1064'),
      src('Pearce 2004, South-western Britain in the Early Middle Ages'),
    ],
    snapshots: [
      snap(ce(500).year, poly([
        [-5.8, 50.0], [-5.1, 50.05], [-4.2, 50.35], [-3.5, 50.55], [-2.95, 50.7],
        [-2.8, 51.1], [-3.4, 51.25], [-4.55, 51.0], [-5.1, 50.55], [-5.55, 50.15], [-5.8, 50.0],
      ]), 'low', 'Cornwall, Devon and western Somerset — the post-Roman kingdom at its height.'),
      snap(ce(800).year, poly([
        [-5.8, 50.0], [-5.1, 50.05], [-4.35, 50.35], [-4.2, 50.55], [-4.5, 50.9],
        [-4.65, 50.85], [-5.1, 50.55], [-5.55, 50.15], [-5.8, 50.0],
      ]), 'low', 'Reduced to Cornwall west of the Tamar after the West Saxon conquest of Devon.'),
    ],
  },
  {
    id: 'rheged',
    name: 'Rheged',
    alternativeNames: ['Yr Hen Ogledd'],
    category: 'kingdom',
    start: ce(450),
    end: ce(730),
    confidence: 'low',
    colour: '#7a9ab0',
    labelImportance: 1,
    successorIds: ['northumbria'],
    description:
      'A Brythonic kingdom of the "Old North" around the Solway Firth, famous from the praise-poetry of Taliesin for its king Urien, who besieged the Angles on Lindisfarne in the 570s. Its lands passed to Northumbria during the 7th century, reputedly through a marriage alliance.',
    sources: [src('Clarkson 2010, The Men of the North: The Britons of Southern Scotland')],
    snapshots: [
      snap(ce(570).year, poly([
        [-3.7, 54.4], [-2.9, 54.35], [-2.6, 54.7], [-2.9, 55.1], [-3.6, 55.15],
        [-4.3, 55.0], [-4.1, 54.7], [-3.7, 54.4],
      ]), 'low', 'Urien’s kingdom around the Solway Firth — location and extent are highly conjectural.'),
    ],
  },
  {
    id: 'gododdin',
    name: 'Gododdin',
    alternativeNames: ['Votadini', 'Din Eidyn', 'Yr Hen Ogledd'],
    category: 'kingdom',
    start: ce(450),
    end: ce(638),
    confidence: 'low',
    colour: '#8a9a6a',
    labelImportance: 1,
    successorIds: ['northumbria'],
    description:
      'The Brythonic kingdom of the Lothians, heir to the Iron Age Votadini, ruled from Din Eidyn (Edinburgh). The elegy Y Gododdin mourns its war-band’s annihilation at Catraeth (c. 600); the kingdom fell to Northumbria with the siege of Edinburgh in 638.',
    sources: [
      src('Koch 1997, The Gododdin of Aneirin'),
      src('Clarkson 2010, The Men of the North: The Britons of Southern Scotland'),
    ],
    snapshots: [
      snap(ce(570).year, poly([
        [-3.55, 55.55], [-2.5, 55.55], [-2.0, 55.8], [-2.35, 56.0], [-3.4, 56.05],
        [-3.7, 55.85], [-3.55, 55.55],
      ]), 'low', 'The Lothians between the Tweed and the Forth, around Din Eidyn (Edinburgh).'),
    ],
  },
  {
    id: 'elmet',
    name: 'Elmet',
    category: 'kingdom',
    start: ce(450),
    end: ce(627),
    confidence: 'low',
    colour: '#8aa06a',
    labelImportance: 1,
    successorIds: ['northumbria'],
    description:
      'A small Brythonic kingdom of the Leeds region — an island of British rule surviving between the Anglian kingdoms of Deira and Mercia until Edwin of Northumbria annexed it around 627. Its name survives in placenames such as Sherburn-in-Elmet.',
    sources: [src('Charles-Edwards 2013, Wales and the Britons 350–1064')],
    snapshots: [
      snap(ce(600).year, poly([
        [-2.25, 53.55], [-1.3, 53.6], [-1.15, 53.85], [-1.75, 54.05], [-2.35, 53.85], [-2.25, 53.55],
      ]), 'low', 'The West Riding around Leeds, between the Wharfe and the Don — approximate.'),
    ],
  },

  // ------------------------------------------------------- Alba / Scotland
  {
    id: 'kingdom-of-alba',
    name: 'Kingdom of Alba',
    alternativeNames: ['Kingdom of Scotland', 'Early Scotland'],
    category: 'kingdom',
    start: ce(900),
    end: ce(1707),
    confidence: 'medium',
    colour: '#4a6a8a',
    labelImportance: 3,
    predecessorIds: ['picts', 'dal-riata', 'strathclyde'],
    successorIds: ['united-kingdom'],
    description:
      'The kingdom formed by the union of Picts and Gaels around 900, which grew into the medieval Kingdom of Scotland: Lothian came after Carham (1018), Strathclyde in the same generation, the Hebrides by the Treaty of Perth (1266) and Orkney and Shetland in 1468–72. It survived the Wars of Independence, entered a union of crowns with England in 1603 and a parliamentary union in 1707.',
    sources: [
      src('Woolf 2007, From Pictland to Alba'),
      src('Barrow 1981, Kingship and Unity: Scotland 1000–1306'),
    ],
    snapshots: [
      snap(ce(900).year, poly([
        [-3.3, 56.05], [-2.6, 56.25], [-2.85, 56.5], [-2.1, 57.15], [-2.0, 57.7],
        [-3.4, 57.65], [-4.25, 57.5], [-3.85, 57.95], [-3.5, 58.2], [-4.6, 58.15],
        [-5.0, 57.7], [-5.3, 57.0], [-5.9, 56.55], [-6.4, 56.35], [-6.1, 55.9],
        [-5.65, 55.3], [-5.4, 55.35], [-5.05, 55.85], [-4.85, 56.0], [-4.3, 56.05],
        [-3.75, 56.0], [-3.3, 56.05],
      ]), 'low', 'The united Picto-Gaelic kingdom: old Pictland plus Argyll. Caithness and the isles are Norse; Lothian is still Northumbrian.'),
      snap(ce(1034).year, poly([
        [-2.0, 55.77], [-2.2, 55.9], [-2.55, 56.0], [-2.6, 56.25], [-2.85, 56.5],
        [-2.1, 57.15], [-2.0, 57.7], [-3.4, 57.65], [-4.25, 57.5], [-3.85, 57.95],
        [-3.5, 58.2], [-4.6, 58.15], [-5.0, 57.7], [-5.3, 57.0], [-5.9, 56.55],
        [-6.4, 56.35], [-6.1, 55.9], [-5.65, 55.3], [-5.15, 55.4], [-5.05, 55.0],
        [-5.0, 54.65], [-4.4, 54.7], [-3.6, 54.85], [-3.05, 54.98], [-2.9, 55.15],
        [-2.5, 55.35], [-2.0, 55.77],
      ]), 'medium', 'At the death of Malcolm II (1034): Lothian won at Carham (1018) and Strathclyde absorbed — the Tweed–Solway line emerges.'),
      snap(ce(1266).year, mpoly(
        [[-2.0, 55.77], [-2.2, 55.9], [-2.55, 56.0], [-2.6, 56.25], [-2.85, 56.5],
         [-2.1, 57.15], [-2.0, 57.7], [-3.4, 57.65], [-4.25, 57.5], [-3.85, 57.95],
         [-3.35, 58.3], [-3.05, 58.65], [-4.4, 58.62], [-5.05, 58.6], [-5.6, 58.1],
         [-6.0, 57.6], [-6.6, 57.5], [-6.5, 57.0], [-6.55, 56.5], [-6.4, 56.2],
         [-6.4, 55.6], [-5.65, 55.25], [-5.15, 55.4], [-5.05, 55.0], [-5.0, 54.65],
         [-4.4, 54.7], [-3.6, 54.85], [-3.05, 54.98], [-2.9, 55.15], [-2.5, 55.35],
         [-2.0, 55.77]],
        [[-7.8, 56.85], [-7.3, 56.85], [-6.1, 58.15], [-6.15, 58.55], [-7.1, 58.45], [-7.9, 57.2], [-7.8, 56.85]],
      ), 'medium', 'After the Treaty of Perth (1266): Caithness and the whole Hebridean seaboard are Scottish; only Orkney and Shetland remain Norwegian.'),
      snap(ce(1472).year, mpoly(
        [[-2.0, 55.77], [-2.2, 55.9], [-2.55, 56.0], [-2.6, 56.25], [-2.85, 56.5],
         [-2.1, 57.15], [-2.0, 57.7], [-3.4, 57.65], [-4.25, 57.5], [-3.85, 57.95],
         [-3.35, 58.3], [-3.05, 58.65], [-4.4, 58.62], [-5.05, 58.6], [-5.6, 58.1],
         [-6.0, 57.6], [-6.6, 57.5], [-6.5, 57.0], [-6.55, 56.5], [-6.4, 56.2],
         [-6.4, 55.6], [-5.65, 55.25], [-5.15, 55.4], [-5.05, 55.0], [-5.0, 54.65],
         [-4.4, 54.7], [-3.6, 54.85], [-3.05, 54.98], [-2.9, 55.15], [-2.5, 55.35],
         [-2.0, 55.77]],
        [[-7.8, 56.85], [-7.3, 56.85], [-6.1, 58.15], [-6.15, 58.55], [-7.1, 58.45], [-7.9, 57.2], [-7.8, 56.85]],
        [[-3.45, 58.85], [-2.6, 58.9], [-2.35, 59.15], [-3.0, 59.4], [-3.45, 59.1], [-3.45, 58.85]],
        [[-1.75, 59.85], [-1.0, 60.05], [-0.85, 60.55], [-1.6, 60.65], [-1.75, 59.85]],
      ), 'high', 'Scotland complete: Orkney and Shetland annexed (1468–72) after being pledged for a royal dowry. This extent holds until the 1707 union.'),
    ],
  },

  // --------------------------------------------------- the Anglo-Saxons
  {
    id: 'wessex',
    name: 'Wessex',
    alternativeNames: ['West Saxons'],
    category: 'kingdom',
    start: ce(519),
    end: ce(927),
    confidence: 'low',
    colour: '#b0704a',
    labelImportance: 2,
    successorIds: ['kingdom-of-england'],
    description:
      'The kingdom of the West Saxons in southern England. It absorbed Kent, Sussex and Essex after 825 and Dumnonian Devon and Cornwall in the west; under Alfred the Great it alone withstood the Vikings, and his heirs reconquered the Danelaw to create a unified Kingdom of England in 927.',
    sources: [src('Yorke 1995, Wessex in the Early Middle Ages')],
    snapshots: [
      snap(ce(560).year, poly([
        [-2.3, 50.95], [-1.1, 50.75], [-0.95, 51.35], [-1.35, 51.65], [-2.25, 51.5], [-2.3, 50.95],
      ]), 'low', 'The early Gewisse: the upper Thames valley and Hampshire.'),
      snap(ce(725).year, poly([
        [-4.0, 50.55], [-3.5, 50.6], [-2.5, 50.55], [-1.3, 50.65], [-0.7, 50.85],
        [-0.75, 51.3], [-1.4, 51.65], [-2.3, 51.7], [-2.95, 51.4], [-3.05, 51.2],
        [-3.55, 50.95], [-4.0, 50.55],
      ]), 'low', 'South of the Thames between Selwood and Sussex, pressing west into Dumnonian Devon.'),
      snap(ce(878).year, poly([
        [-4.55, 50.95], [-4.2, 50.4], [-3.5, 50.55], [-2.5, 50.5], [-1.3, 50.6],
        [0.2, 50.75], [1.35, 51.1], [1.45, 51.4], [0.5, 51.5], [-0.4, 51.5],
        [-1.4, 51.7], [-2.25, 51.8], [-2.65, 51.65], [-3.0, 51.3], [-3.8, 51.2],
        [-4.55, 51.0], [-4.55, 50.95],
      ]), 'medium', 'Alfred’s kingdom after Edington (878): Wessex with Kent, Sussex and Devon, facing the Danelaw across the Thames–Lea line.'),
    ],
  },
  {
    id: 'mercia',
    name: 'Mercia',
    category: 'kingdom',
    start: ce(527),
    end: ce(918),
    confidence: 'low',
    colour: '#a8804a',
    labelImportance: 2,
    successorIds: ['kingdom-of-england'],
    description:
      'The Anglo-Saxon kingdom of the English Midlands, dominant in the 7th–8th centuries under Penda and Offa (builder of the great dyke on the Welsh frontier). Its eastern half was lost to the Danes in 877; the western remnant under Æthelred and Æthelflæd, Lady of the Mercians, was absorbed by Wessex in 918.',
    sources: [src('Zaluckyj 2001, Mercia: The Anglo-Saxon Kingdom of Central England')],
    snapshots: [
      snap(ce(630).year, poly([
        [-2.05, 52.4], [-0.9, 52.5], [-0.65, 53.1], [-1.7, 53.35], [-2.45, 52.95], [-2.05, 52.4],
      ]), 'low', 'The original kingdom of the Trent valley.'),
      snap(ce(780).year, poly([
        [-2.65, 51.7], [-1.4, 51.6], [-0.55, 51.6], [0.15, 51.95], [0.4, 52.3],
        [0.2, 52.85], [-0.1, 53.4], [0.0, 53.65], [-1.0, 53.6], [-2.0, 53.5],
        [-3.1, 53.4], [-3.05, 52.9], [-3.15, 52.5], [-3.0, 52.1], [-2.75, 51.9], [-2.65, 51.7],
      ]), 'low', 'Offa at his height: from the Humber to the Thames (with London), behind the dyke on the Welsh frontier.'),
      snap(ce(900).year, poly([
        [-2.65, 51.7], [-1.8, 51.65], [-0.5, 51.6], [-1.1, 52.2], [-1.5, 52.45],
        [-1.9, 52.65], [-2.4, 52.75], [-2.55, 53.2], [-3.1, 53.4], [-3.05, 52.9],
        [-3.15, 52.5], [-3.0, 52.1], [-2.75, 51.9], [-2.65, 51.7],
      ]), 'low', 'English Mercia west of Watling Street, under Æthelflæd, Lady of the Mercians; the east is the Danelaw’s Five Boroughs.'),
    ],
  },
  {
    id: 'northumbria',
    name: 'Northumbria',
    category: 'kingdom',
    start: ce(604),
    end: ce(954),
    confidence: 'low',
    colour: '#8a6a4a',
    labelImportance: 2,
    successorIds: ['danelaw', 'kingdom-of-england'],
    description:
      'The northern Anglian kingdom, formed from Bernicia and Deira, stretching at its height from the Humber to the Firth of Forth and across to the Irish Sea. A centre of learning (Lindisfarne, Bede at Jarrow) before the Vikings took York in 866; the rump north of the Tees survived as the earldom of Bamburgh.',
    sources: [src('Rollason 2003, Northumbria 500–1100')],
    snapshots: [
      snap(ce(620).year, poly([
        [-2.2, 53.65], [-0.25, 53.7], [-0.1, 54.1], [-0.6, 54.5], [-1.2, 54.65],
        [-1.4, 55.0], [-2.0, 55.77], [-2.6, 55.35], [-2.5, 54.7], [-2.2, 53.65],
      ]), 'low', 'Bernicia and Deira united: the east coast from the Humber to the Tweed.'),
      snap(ce(700).year, poly([
        [0.0, 53.65], [-1.0, 53.6], [-2.0, 53.55], [-3.0, 53.7], [-2.95, 53.95],
        [-3.3, 54.25], [-3.65, 54.55], [-4.95, 54.65], [-4.4, 54.75], [-3.6, 54.9],
        [-3.05, 54.98], [-3.4, 55.4], [-3.75, 56.0], [-3.3, 56.05], [-2.55, 56.0],
        [-2.2, 55.9], [-2.0, 55.77], [-1.4, 55.0], [-1.2, 54.65], [-0.6, 54.5],
        [-0.1, 54.1], [0.0, 53.65],
      ]), 'low', 'The kingdom at its height: Forth to Humber and coast to coast, with Whithorn in Galloway; expansion north ended at Dun Nechtain (685).'),
      snap(ce(920).year, poly([
        [-1.2, 54.65], [-2.2, 54.6], [-2.6, 55.35], [-2.0, 55.77], [-1.4, 55.0], [-1.2, 54.65],
      ]), 'low', 'After the fall of York to the Danes: the English rump between the Tees and the Tweed, ruled from Bamburgh.'),
    ],
  },
  {
    id: 'east-anglia',
    name: 'East Anglia',
    category: 'kingdom',
    start: ce(571),
    end: ce(918),
    confidence: 'low',
    colour: '#9a8a5a',
    labelImportance: 1,
    successorIds: ['danelaw'],
    description:
      'The Anglo-Saxon kingdom of the East Angles (the North and South Folk — Norfolk and Suffolk), famed for the Sutton Hoo ship burial. Its last king, Edmund, was killed by the Great Heathen Army in 869; it was Danish until reconquered by Wessex in 917–18.',
    sources: [src('Hoggett 2010, The Archaeology of the East Anglian Conversion')],
    snapshots: [
      snap(ce(700).year, poly([
        [0.15, 52.0], [0.9, 51.95], [1.6, 52.1], [1.75, 52.5], [1.7, 52.9],
        [0.9, 53.0], [0.2, 52.9], [-0.1, 52.5], [0.15, 52.0],
      ]), 'low', 'Norfolk and Suffolk, bounded by the Fens and the Essex forests.'),
    ],
  },
  {
    id: 'kent',
    name: 'Kingdom of Kent',
    alternativeNames: ['Cantia', 'Cantware'],
    category: 'kingdom',
    start: ce(455),
    end: ce(871),
    confidence: 'low',
    colour: '#a89a5a',
    labelImportance: 1,
    successorIds: ['wessex'],
    description:
      'The Jutish kingdom of the south-eastern corner of England, where Augustine’s mission of 597 re-established Christianity among the Anglo-Saxons at Canterbury. Long under Mercian lordship, it passed to Wessex after 825.',
    sources: [src('Brooks 1984, The Early History of the Church of Canterbury')],
    snapshots: [
      snap(ce(650).year, poly([
        [0.25, 51.05], [0.95, 50.9], [1.35, 51.1], [1.45, 51.4], [0.7, 51.45],
        [0.25, 51.35], [0.25, 51.05],
      ]), 'low', 'Kent east of the Weald, with Canterbury and the royal vill at Reculver.'),
    ],
  },
  {
    id: 'sussex',
    name: 'Kingdom of Sussex',
    alternativeNames: ['South Saxons'],
    category: 'kingdom',
    start: ce(477),
    end: ce(825),
    confidence: 'low',
    colour: '#b08a5a',
    labelImportance: 1,
    successorIds: ['wessex'],
    description:
      'The kingdom of the South Saxons along the Channel coast, traditionally founded by Ælle (whom Bede names the first over-king of the southern English). Isolated by the forest of the Weald, it was the last Anglo-Saxon kingdom converted to Christianity, and passed under West Saxon rule in 825.',
    sources: [src('Yorke 1990, Kings and Kingdoms of Early Anglo-Saxon England')],
    snapshots: [
      snap(ce(700).year, poly([
        [-0.95, 50.75], [0.25, 50.75], [0.7, 50.9], [0.4, 51.1], [-0.5, 51.1], [-0.95, 50.75],
      ]), 'low', 'The coastal plain and downs between the Weald and the Channel.'),
    ],
  },
  {
    id: 'essex',
    name: 'Kingdom of Essex',
    alternativeNames: ['East Saxons'],
    category: 'kingdom',
    start: ce(527),
    end: ce(825),
    confidence: 'low',
    colour: '#b09a6a',
    labelImportance: 1,
    successorIds: ['wessex'],
    description:
      'The kingdom of the East Saxons, which at its greatest included London and Middlesex — its kings built the first St Paul’s (604). Usually subordinate to Mercia or Kent, it submitted to Wessex in 825 and its lands later fell within the Danelaw.',
    sources: [src('Yorke 1990, Kings and Kingdoms of Early Anglo-Saxon England')],
    snapshots: [
      snap(ce(650).year, poly([
        [-0.3, 51.55], [0.15, 51.45], [0.95, 51.55], [1.3, 51.8], [0.9, 52.05],
        [0.2, 52.05], [-0.3, 51.75], [-0.3, 51.55],
      ]), 'low', 'Essex with London and Middlesex, between the Thames, the Lea and the Stour.'),
    ],
  },

  // ------------------------------------------------------------ the Danes
  {
    id: 'danelaw',
    name: 'The Danelaw',
    alternativeNames: ['Kingdom of York', 'Jórvík', 'Five Boroughs', 'Danish England'],
    category: 'other',
    start: ce(865),
    end: ce(954),
    confidence: 'medium',
    colour: '#5a7aa0',
    labelImportance: 2,
    predecessorIds: ['norse-vikings', 'northumbria', 'east-anglia'],
    successorIds: ['kingdom-of-england'],
    description:
      'The parts of England under Danish law and settlement after the Great Heathen Army’s conquests (865–78): the Viking kingdom of York, the Five Boroughs of the east Midlands and Danish East Anglia, east of the Thames–Lea–Watling Street line agreed by Alfred and Guthrum. Reconquered piecemeal by Wessex and Mercia; the last king of York, Eric Bloodaxe, was killed in 954. Danish speech and law left a lasting mark on northern and eastern England.',
    sources: [
      src('Hadley 2006, The Vikings in England'),
      src('Downham 2007, Viking Kings of Britain and Ireland'),
    ],
    snapshots: [
      snap(ce(886).year, poly([
        [-0.2, 51.6], [0.4, 51.55], [0.95, 51.55], [1.3, 51.8], [1.6, 52.1],
        [1.75, 52.5], [1.7, 52.9], [0.9, 53.0], [0.35, 53.2], [0.0, 53.65],
        [-0.1, 54.1], [-0.6, 54.5], [-1.2, 54.65], [-2.2, 54.55], [-2.25, 54.0],
        [-2.35, 53.35], [-1.95, 52.95], [-1.55, 52.5], [-1.1, 52.25], [-0.55, 52.2],
        [-0.05, 51.95], [-0.2, 51.6],
      ]), 'medium', 'The treaty of Alfred and Guthrum (c. 886): York, the Five Boroughs and East Anglia, east of the Thames, the Lea and Watling Street.'),
      snap(ce(920).year, poly([
        [-2.2, 54.55], [-1.2, 54.65], [-0.6, 54.5], [-0.1, 54.1], [-0.25, 53.7],
        [-1.0, 53.6], [-2.0, 53.5], [-2.35, 53.9], [-2.25, 54.2], [-2.2, 54.55],
      ]), 'medium', 'After Edward the Elder and Æthelflæd reconquered East Anglia and the Five Boroughs (by 918), only the kingdom of York remains, at times ruled from Dublin.'),
    ],
  },
];
