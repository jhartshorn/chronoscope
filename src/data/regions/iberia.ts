import type { HistoricalEntity } from '../../types';
import { ce, mpoly, poly, snap, src } from '../helpers';

/**
 * The Christian kingdoms of the Iberian Reconquista, 718–1492: Asturias,
 * León, Castile, Aragon and Navarre. Together with `al-andalus` and
 * `umayyad-caliphate` (medieval.ts) this gives the peninsula a continuous
 * political history from the Umayyad conquest of 711 to the fall of Granada
 * in 1492, when Castile and Aragon hand off to `spain` (entities.ts).
 *
 * The five kingdoms share one lineage more than the map can show cleanly:
 * Asturias splinters into León (910); León and Castile are reunited
 * permanently in 1230; and in 1035 Sancho III "the Great" of Navarre briefly
 * ruled most of Christian Iberia before his death split it, that same year,
 * into the separate kingdoms of Navarre, Castile and Aragon — the moment the
 * 1035 snapshots of all three entities are anchored to.
 */

const SOURCES = [
  src('O’Callaghan 1975, A History of Medieval Spain'),
  src('MacKay 1977, Spain in the Middle Ages: From Frontier to Empire, 1000–1500'),
];

export const IBERIA_ENTITIES: HistoricalEntity[] = [
  {
    id: 'kingdom-of-asturias',
    name: 'Kingdom of Asturias',
    category: 'kingdom',
    start: ce(718),
    end: ce(910),
    confidence: 'low',
    colour: '#7a6a9a',
    labelImportance: 1,
    predecessorIds: ['visigothic-kingdom'],
    successorIds: ['kingdom-of-leon'],
    description:
      'The first Christian redoubt after the Umayyad conquest: Visigothic nobles under Pelagius (Pelayo) rallied in the Cantabrian mountains and defeated an Umayyad force at Covadonga (722), traditionally reckoned the start of the Reconquista. Alfonso III’s repopulation of the depopulated Duero valley (866–910) pushed the frontier far south before the kingdom split among his sons on his death.',
    sources: [
      src('Collins 1983, Early Medieval Spain: Unity in Diversity, 400–1000'),
      ...SOURCES,
    ],
    snapshots: [
      snap(ce(722).year, poly([
        [-5.3, 43.15], [-4.7, 43.1], [-4.5, 43.35], [-4.9, 43.5], [-5.4, 43.4], [-5.3, 43.15],
      ]), 'low', 'The Covadonga redoubt in the eastern Picos de Europa, traditional date of Pelagius’s rebellion; the extent is schematic.'),
      snap(ce(800).year, poly([
        [-9.2, 43.7], [-6.5, 43.6], [-4.0, 43.4], [-3.3, 43.0], [-3.6, 42.4],
        [-5.5, 42.1], [-7.5, 42.0], [-9.0, 42.1], [-9.4, 42.9], [-9.2, 43.7],
      ]), 'low', 'Under Alfonso II: Asturias and Galicia consolidated, bounded by the Cantabrian mountains.'),
      snap(ce(880).year, poly([
        [-9.3, 43.7], [-6.5, 43.6], [-4.0, 43.4], [-2.8, 42.6], [-2.6, 41.6],
        [-4.5, 41.1], [-6.5, 41.0], [-8.6, 41.1], [-9.3, 41.8], [-9.3, 43.7],
      ]), 'low', 'Alfonso III’s repopulation drive pushes the frontier south to the Duero, including León and northern Portugal to the Douro mouth.'),
    ],
  },
  {
    id: 'kingdom-of-leon',
    name: 'Kingdom of León',
    category: 'kingdom',
    start: ce(910),
    end: ce(1230),
    confidence: 'low',
    colour: '#8a5a9a',
    labelImportance: 2,
    predecessorIds: ['kingdom-of-asturias'],
    successorIds: ['kingdom-of-castile'],
    description:
      'Formed when Alfonso III’s death (910) split Asturias among his sons and the senior line moved its capital to León. The senior Christian crown of Iberia for over a century — Castile began as a frontier county within it — León was permanently united with Castile in 1230 under Fernando III, whose father Alfonso IX had just conquered Extremadura (Cáceres 1229, Mérida and Badajoz 1230).',
    sources: SOURCES,
    snapshots: [
      snap(ce(910).year, poly([
        [-9.3, 43.7], [-6.5, 43.6], [-4.0, 43.4], [-2.8, 42.6], [-2.6, 41.6],
        [-4.5, 41.1], [-6.5, 41.0], [-8.6, 41.1], [-9.3, 41.8], [-9.3, 43.7],
      ]), 'low', 'Inherits Asturias and Galicia’s Duero-line extent on the 910 partition.'),
      snap(ce(1037).year, poly([
        [-9.3, 43.7], [-6.5, 43.6], [-4.0, 43.4], [-2.8, 42.6], [-2.6, 41.6],
        [-4.5, 41.1], [-6.5, 41.0], [-8.6, 41.1], [-9.3, 41.8], [-9.3, 43.7],
      ]), 'medium', 'Fernando I of Castile inherits León by conquest, beginning a personal union of the two crowns that recurs for two centuries.'),
      snap(ce(1157).year, poly([
        [-9.3, 43.7], [-6.5, 43.6], [-4.0, 43.4], [-2.8, 42.6], [-2.6, 41.6],
        [-4.5, 40.6], [-6.8, 40.4], [-8.6, 40.6], [-9.3, 41.5], [-9.4, 43.0], [-9.3, 43.7],
      ]), 'low', 'On Alfonso VII’s death the crowns split again, Castile to Sancho III and León (with Galicia) to Fernando II; the frontier has crept toward Salamanca.'),
      snap(ce(1230).year, poly([
        [-9.3, 43.7], [-6.5, 43.6], [-4.0, 43.4], [-2.8, 42.6], [-2.6, 41.6],
        [-4.3, 40.0], [-6.0, 38.7], [-7.6, 38.6], [-9.1, 39.3], [-9.4, 41.0], [-9.3, 43.7],
      ]), 'medium', 'Alfonso IX’s conquest of Extremadura (Cáceres, Mérida, Badajoz, 1229–30) is León’s last independent achievement before Fernando III unites it permanently with Castile.'),
    ],
  },
  {
    id: 'kingdom-of-castile',
    name: 'Kingdom of Castile',
    alternativeNames: ['Crown of Castile', 'Castile and León'],
    category: 'kingdom',
    start: ce(1035),
    end: ce(1492),
    confidence: 'medium',
    colour: '#b8763a',
    labelImportance: 4,
    predecessorIds: ['kingdom-of-navarre', 'kingdom-of-leon'],
    successorIds: ['spain'],
    description:
      'A frontier county of León elevated to a kingdom for Fernando I when his father Sancho III of Navarre died and partitioned his realms (1035). Fernando I promptly inherited León too, and after the permanent union of 1230 "Castile" means the combined Castile-León crown — the dominant partner in the Reconquista, taking Toledo (1085), Córdoba (1236), Seville (1248) and Murcia, and, jointly with Aragon under the Catholic Monarchs, Granada (1492).',
    sources: [
      src('Reilly 1993, The Medieval Spains'),
      ...SOURCES,
    ],
    snapshots: [
      snap(ce(1035).year, poly([
        [-4.3, 43.4], [-3.0, 43.4], [-2.4, 42.8], [-2.6, 42.0], [-3.6, 41.8], [-4.4, 42.2], [-4.6, 43.0], [-4.3, 43.4],
      ]), 'medium', 'The county of Castile raised to a kingdom for Fernando I on Sancho III of Navarre’s death — a small frontier march around Burgos.'),
      snap(ce(1085).year, poly([
        [-4.3, 43.4], [-3.0, 43.4], [-2.4, 42.8], [-2.2, 41.8], [-3.0, 40.5],
        [-4.2, 39.7], [-5.2, 40.0], [-5.0, 41.5], [-4.6, 43.0], [-4.3, 43.4],
      ]), 'medium', 'Alfonso VI’s capture of Toledo (1085) — the old Visigothic capital — pushes the frontier to the Tagus and roughly doubles the kingdom.'),
      snap(ce(1230).year, poly([
        [-9.4, 43.7], [-6.5, 43.6], [-4.0, 43.4], [-2.6, 43.3], [-1.9, 42.9], [-2.2, 41.8],
        [-1.8, 40.3], [-3.0, 39.2], [-5.0, 38.9], [-7.5, 38.9], [-9.1, 39.3], [-9.4, 41.0], [-9.4, 43.7],
      ]), 'medium', 'The 1230 union with León (and its 1229–30 conquest of Extremadura) joins the whole western half of the peninsula under one crown.'),
      snap(ce(1248).year, poly([
        [-9.4, 43.7], [-6.5, 43.6], [-4.0, 43.4], [-2.6, 43.3], [-1.9, 42.9], [-2.2, 41.8],
        [-1.8, 40.3], [-2.0, 39.0], [-1.9, 38.0], [-3.6, 36.7], [-5.0, 36.6],
        [-6.4, 36.7], [-7.4, 37.2], [-7.4, 38.9], [-9.1, 39.3], [-9.4, 41.0], [-9.4, 43.7],
      ], [
        [-4.6, 36.9], [-3.4, 36.8], [-2.6, 37.0], [-2.3, 37.5], [-3.2, 37.7], [-4.3, 37.6], [-4.7, 37.2], [-4.6, 36.9],
      ]), 'medium', 'Fernando III takes Córdoba (1236) and Seville (1248): almost the whole Guadalquivir valley, leaving only the Emirate of Granada (hole) unconquered.'),
      snap(ce(1300).year, poly([
        [-9.4, 43.7], [-6.5, 43.6], [-4.0, 43.4], [-2.6, 43.3], [-1.9, 42.9], [-1.6, 41.5],
        [-1.0, 40.0], [-0.9, 38.5], [-1.3, 37.7], [-2.3, 37.2], [-3.6, 36.7], [-5.0, 36.6],
        [-6.4, 36.7], [-7.4, 37.2], [-7.4, 38.9], [-9.1, 39.3], [-9.4, 41.0], [-9.4, 43.7],
      ], [
        [-4.6, 36.9], [-3.4, 36.8], [-2.6, 37.0], [-2.3, 37.5], [-3.2, 37.7], [-4.3, 37.6], [-4.7, 37.2], [-4.6, 36.9],
      ]), 'medium', 'The definitive annexation of Murcia (after the 1264–66 Mudéjar revolt) rounds out the south-east; the border is now stable for two centuries around the Granada enclave.'),
      snap(ce(1479).year, poly([
        [-9.4, 43.7], [-6.5, 43.6], [-4.0, 43.4], [-2.6, 43.3], [-1.9, 42.9], [-1.6, 41.5],
        [-1.0, 40.0], [-0.9, 38.5], [-1.3, 37.7], [-2.3, 37.2], [-3.6, 36.7], [-5.0, 36.6],
        [-6.4, 36.7], [-7.4, 37.2], [-7.4, 38.9], [-9.1, 39.3], [-9.4, 41.0], [-9.4, 43.7],
      ], [
        [-4.6, 36.9], [-3.4, 36.8], [-2.6, 37.0], [-2.3, 37.5], [-3.2, 37.7], [-4.3, 37.6], [-4.7, 37.2], [-4.6, 36.9],
      ]), 'high', 'On the eve of the dynastic union with Aragon (Isabella and Ferdinand, married 1469, both reigning from 1474/1479) and the final Granada campaign (1482–92).'),
    ],
  },
  {
    id: 'kingdom-of-aragon',
    name: 'Kingdom of Aragon',
    alternativeNames: ['Crown of Aragon'],
    category: 'kingdom',
    start: ce(1035),
    end: ce(1492),
    confidence: 'medium',
    colour: '#c9a03a',
    labelImportance: 3,
    predecessorIds: ['kingdom-of-navarre'],
    successorIds: ['spain'],
    description:
      'A small Pyrenean county raised to a kingdom for Ramiro I in the 1035 partition of Navarre. The 1137 dynastic union with the County of Barcelona created the composite Crown of Aragon — Aragon, Catalonia and, after 1238, Valencia and the Balearics on the peninsula, plus a Mediterranean thalassocracy (Sicily from 1282, Sardinia from 1324, Naples from 1442) not shown continuously here. Ferdinand II’s marriage to Isabella of Castile (1469) led to the union of the crowns.',
    sources: [
      src('Bisson 1986, The Medieval Crown of Aragon: A Short History'),
      ...SOURCES,
    ],
    snapshots: [
      snap(ce(1035).year, poly([
        [-1.0, 42.9], [-0.2, 42.9], [0.1, 42.5], [-0.3, 42.0], [-1.0, 42.2], [-1.3, 42.6], [-1.0, 42.9],
      ]), 'medium', 'The county of Aragon raised to a kingdom for Ramiro I: a small Pyrenean valley around Jaca.'),
      snap(ce(1118).year, poly([
        [-1.5, 43.0], [-0.2, 42.9], [0.3, 42.3], [0.5, 41.3], [-0.2, 40.4],
        [-1.3, 40.6], [-1.8, 41.5], [-1.9, 42.4], [-1.5, 43.0],
      ]), 'medium', 'Alfonso I "the Battler" takes Zaragoza (1118), securing the middle Ebro valley.'),
      snap(ce(1137).year, poly([
        [-1.9, 43.3], [-1.0, 43.0], [0.2, 42.9], [1.8, 42.5], [3.2, 42.3], [3.0, 41.6],
        [1.2, 41.0], [0.5, 41.3], [0.5, 40.5], [-0.2, 40.4], [-1.3, 40.6], [-1.9, 41.5], [-2.0, 42.4], [-1.9, 43.3],
      ]), 'medium', 'Ramon Berenguer IV of Barcelona marries the infant queen Petronila (1137): Catalonia joins Aragon in a composite crown, adding the whole north-eastern coast.'),
      snap(ce(1238).year, mpoly(
        [
          [-1.9, 43.3], [-1.0, 43.0], [0.2, 42.9], [1.8, 42.5], [3.2, 42.3], [3.0, 41.6],
          [1.2, 41.0], [0.3, 39.9], [-0.1, 38.5], [-0.7, 38.3], [-1.2, 39.0], [-1.3, 40.6], [-1.9, 41.5], [-2.0, 42.4], [-1.9, 43.3],
        ],
        [[2.3, 39.3], [3.4, 39.4], [3.1, 39.9], [2.4, 39.8], [2.3, 39.3]],
      ), 'medium', 'James I "the Conqueror" takes the Balearic Islands (1229–35) and Valencia (1238), completing the peninsular Crown of Aragon.'),
      snap(ce(1350).year, mpoly(
        [
          [-1.9, 43.3], [-1.0, 43.0], [0.2, 42.9], [1.8, 42.5], [3.2, 42.3], [3.0, 41.6],
          [1.2, 41.0], [0.3, 39.9], [-0.1, 38.5], [-0.7, 38.3], [-1.2, 39.0], [-1.3, 40.6], [-1.9, 41.5], [-2.0, 42.4], [-1.9, 43.3],
        ],
        [[2.3, 39.3], [3.4, 39.4], [3.1, 39.9], [2.4, 39.8], [2.3, 39.3]],
        [[12.4, 37.9], [13.7, 38.2], [15.1, 38.2], [15.6, 38.0], [15.0, 36.7], [13.0, 36.7], [12.4, 37.9]],
        [[8.1, 39.1], [9.7, 39.2], [9.8, 40.9], [8.4, 41.0], [8.1, 39.1]],
      ), 'low', 'At its Mediterranean height: the peninsular crown plus Sicily (conquered 1282) and Sardinia (1324) — a thalassocracy of scattered island and coastal holdings, not a contiguous state.'),
      snap(ce(1479).year, mpoly(
        [
          [-1.9, 43.3], [-1.0, 43.0], [0.2, 42.9], [1.8, 42.5], [3.2, 42.3], [3.0, 41.6],
          [1.2, 41.0], [0.3, 39.9], [-0.1, 38.5], [-0.7, 38.3], [-1.2, 39.0], [-1.3, 40.6], [-1.9, 41.5], [-2.0, 42.4], [-1.9, 43.3],
        ],
        [[2.3, 39.3], [3.4, 39.4], [3.1, 39.9], [2.4, 39.8], [2.3, 39.3]],
      ), 'high', 'On the eve of the dynastic union with Castile; Sicily, Sardinia and (from 1442) Naples remain separate Aragonese possessions, not part of the peninsular crown shown here.'),
    ],
  },
  {
    id: 'kingdom-of-navarre',
    name: 'Kingdom of Navarre',
    alternativeNames: ['Kingdom of Pamplona'],
    category: 'kingdom',
    start: ce(824),
    end: ce(1512),
    confidence: 'medium',
    colour: '#9a4a4a',
    labelImportance: 2,
    successorIds: ['spain'],
    description:
      'Founded by the Basque chieftain Íñigo Arista at Pamplona (824). Under Sancho III "the Great" (1004–35) Navarre briefly dominated most of Christian Iberia, holding Castile and Aragon as counties and claiming overlordship over León — the peak from which his death fragmented the peninsula into separate kingdoms. Navarre itself shrank thereafter, losing La Rioja to Castile (1076) and its Basque coastal provinces (1200), before Ferdinand II of Aragon annexed the Iberian kingdom to Castile in 1512; a rump north of the Pyrenees survived independently until absorbed into France in 1620.',
    sources: [
      src('Collins 1983, Early Medieval Spain: Unity in Diversity, 400–1000'),
      ...SOURCES,
    ],
    snapshots: [
      snap(ce(824).year, poly([
        [-2.0, 42.5], [-1.3, 42.5], [-1.0, 42.9], [-1.6, 43.1], [-2.1, 42.9], [-2.0, 42.5],
      ]), 'low', 'Íñigo Arista’s founding kingdom: the Pamplona basin.'),
      snap(ce(1000).year, poly([
        [-2.8, 42.2], [-1.9, 42.1], [-1.0, 42.3], [-0.8, 42.9], [-1.6, 43.3], [-2.3, 43.2], [-2.9, 42.8], [-2.8, 42.2],
      ]), 'low', 'Grown to include La Rioja and reaching toward Aragon under Sancho II Garcés and his successors.'),
      snap(ce(1035).year, poly([
        [-4.3, 43.4], [-3.0, 43.4], [-1.6, 43.3], [-0.2, 42.9], [-0.3, 42.0],
        [-1.3, 41.8], [-2.6, 41.8], [-3.6, 41.8], [-4.4, 42.2], [-4.6, 43.0], [-4.3, 43.4],
      ]), 'low', 'Sancho III "the Great" at his 1035 death: overlord of Castile and Aragon (both counties within his realm) and claiming suzerainty over León — briefly master of most of Christian Iberia. His death that year splits Castile and Aragon off as separate kingdoms.'),
      snap(ce(1076).year, poly([
        [-3.3, 42.3], [-1.0, 42.3], [-1.0, 42.9], [-1.6, 43.4], [-3.3, 43.4], [-3.3, 42.3],
      ]), 'medium', 'After King Sancho IV’s murder (1076), Castile and Aragon partition Navarre between them; La Rioja is permanently lost to Castile, but the Basque provinces (Álava, Gipuzkoa, Bizkaia) remain Navarrese.'),
      snap(ce(1200).year, poly([
        [-2.1, 42.1], [-1.1, 42.1], [-1.0, 42.6], [-1.4, 43.05], [-1.9, 43.0], [-2.1, 42.1],
      ]), 'medium', 'Alfonso VIII of Castile annexes the Basque provinces of Álava, Gipuzkoa and Bizkaia (1200), leaving Navarre landlocked for the rest of its existence.'),
      snap(ce(1500).year, poly([
        [-2.1, 42.1], [-1.1, 42.1], [-1.0, 42.6], [-1.4, 43.05], [-1.9, 43.0], [-2.1, 42.1],
      ]), 'medium', 'A small, stable kingdom on the eve of Ferdinand II’s 1512 conquest of its Iberian half.'),
    ],
  },
];
