import type { HistoricalEntity } from '../../types';
import { bce, ce, mpoly, poly, snap, src } from '../helpers';

/**
 * Notable tribes, kingdoms and confederations on the frontiers of the Roman
 * Republic, the Roman Empire and Byzantium, across their whole history — the
 * rivals Rome absorbed, the "barbarian" peoples of the migrations, and the
 * medieval neighbours of Constantinople. Coarse historical interpretations;
 * see docs/METHODOLOGY.md.
 */
export const ROME_PERIPHERY_ENTITIES: HistoricalEntity[] = [
  // ---------------------------------------------- Republican-era rivals & neighbours
  {
    id: 'samnites',
    name: 'Samnites',
    category: 'confederation',
    start: bce(600),
    end: bce(290),
    confidence: 'low',
    colour: '#8a6a5a',
    labelImportance: 2,
    successorIds: ['roman-republic'],
    description:
      'A league of Oscan-speaking peoples of the southern Apennines, Rome’s most formidable Italian rival, defeated in the three Samnite Wars (343–290 BCE).',
    sources: [src('Salmon 1967, Samnium and the Samnites')],
    snapshots: [
      snap(bce(330).year, poly([[13.8, 40.8], [15.3, 41], [15.5, 41.8], [14.3, 42.2], [13.6, 41.6], [13.8, 40.8]]), 'low', 'The Samnite highlands of south-central Italy, approximate.'),
    ],
  },
  {
    id: 'antigonid-macedon',
    name: 'Kingdom of Macedon',
    alternativeNames: ['Antigonid Macedonia'],
    category: 'kingdom',
    start: bce(306),
    end: bce(168),
    confidence: 'medium',
    colour: '#7a5aa8',
    labelImportance: 3,
    predecessorIds: ['macedonian-empire'],
    successorIds: ['roman-republic'],
    description:
      'The Hellenistic kingdom of the Antigonid dynasty, the heir to Alexander’s homeland and hegemon of Greece, until Rome defeated it at Pydna (168 BCE) in the Macedonian Wars.',
    sources: [src('Errington 1990, A History of Macedonia')],
    snapshots: [
      snap(bce(220).year, poly([[20, 39.5], [22, 40.5], [24.5, 41], [25, 40.2], [23, 39.6], [21, 39.4], [20, 39.5]]), 'medium', 'Macedonia and its Greek hegemony, approximate.'),
    ],
  },
  {
    id: 'kingdom-of-pergamon',
    name: 'Kingdom of Pergamon',
    alternativeNames: ['Attalid Kingdom'],
    category: 'kingdom',
    start: bce(282),
    end: bce(133),
    confidence: 'medium',
    colour: '#a86a4a',
    labelImportance: 2,
    successorIds: ['roman-republic'],
    description:
      'A wealthy Hellenistic kingdom of western Anatolia and a Roman ally, famous for its library and altar; its last king bequeathed it to Rome in 133 BCE, becoming the province of Asia.',
    sources: [src('Kosmetatou 2003, in A Companion to the Hellenistic World')],
    snapshots: [
      snap(bce(180).year, poly([[26, 38], [29, 39], [30, 40], [28.5, 40], [26.5, 39], [26, 38]]), 'medium', 'Attalid western Anatolia, approximate.'),
    ],
  },
  {
    id: 'kingdom-of-pontus',
    name: 'Kingdom of Pontus',
    category: 'kingdom',
    start: bce(281),
    end: bce(63),
    confidence: 'medium',
    colour: '#8a5a7a',
    labelImportance: 3,
    successorIds: ['roman-republic'],
    description:
      'A kingdom of the southern Black Sea coast that, under Mithridates VI, fought three great wars against Rome and briefly overran Anatolia and Greece before Pompey’s final victory (63 BCE).',
    sources: [src('Mayor 2010, The Poison King: Mithradates')],
    snapshots: [
      snap(bce(90).year, poly([[33, 40], [37, 41], [41, 41.6], [42, 40.5], [40, 39.5], [36, 39.5], [33, 39.6], [33, 40]]), 'medium', 'Pontus around the Black Sea littoral before Mithridates’ great expansion, approximate.'),
    ],
  },
  {
    id: 'numidia',
    name: 'Numidia',
    category: 'kingdom',
    start: bce(202),
    end: bce(46),
    confidence: 'low',
    colour: '#b0904a',
    labelImportance: 3,
    predecessorIds: ['carthage'],
    successorIds: ['roman-republic'],
    description:
      'A Berber kingdom of North Africa, Rome’s ally under Masinissa and its enemy under Jugurtha, annexed after the civil-war battle of Thapsus (46 BCE).',
    sources: [src('Cambridge History of Africa, Vol. 2')],
    snapshots: [
      snap(bce(120).year, poly([[1, 34], [8, 36], [9, 35], [7, 33.5], [3, 33], [0, 34], [1, 34]]), 'low', 'The Numidian interior of the Maghreb, approximate.'),
    ],
  },
  {
    id: 'kingdom-of-armenia',
    name: 'Kingdom of Armenia',
    alternativeNames: ['Greater Armenia'],
    category: 'kingdom',
    start: bce(331),
    end: ce(428),
    confidence: 'medium',
    colour: '#a05a8a',
    labelImportance: 3,
    successorIds: ['roman-empire', 'sassanid-empire'],
    description:
      'The kingdom of the Armenian highlands, for centuries the contested buffer between Rome and Parthia/Persia. Under Tigranes the Great (95–66 BCE) it briefly became a Near Eastern empire before being partitioned between Rome and Persia (387 CE).',
    sources: [src('Redgate 1998, The Armenians')],
    snapshots: [
      snap(bce(70).year, poly([[36, 36], [40, 39], [45, 40], [48, 39], [48, 36], [46, 33], [42, 33], [38, 34], [36, 35], [36, 36]]), 'medium', 'The short-lived empire of Tigranes the Great, reaching into Syria and Mesopotamia.'),
      snap(ce(100).year, poly([[38, 38], [42, 38.5], [46, 39.5], [47, 40.5], [45, 41.5], [41, 41.5], [38.5, 40], [38, 38]]), 'medium', 'The Armenian highland heartland as a Roman–Parthian buffer, approximate.'),
    ],
  },
  {
    id: 'kingdom-of-dacia',
    name: 'Kingdom of Dacia',
    category: 'kingdom',
    start: bce(168),
    end: ce(106),
    confidence: 'medium',
    colour: '#7a8a4a',
    labelImportance: 3,
    successorIds: ['roman-empire'],
    description:
      'A kingdom north of the lower Danube (modern Romania), united under Burebista and again under Decebalus, whose gold made it a prize; Trajan conquered it in 106 CE after two hard wars.',
    sources: [src('Oltean 2007, Dacia: Landscape, Colonisation and Romanisation')],
    snapshots: [
      snap(ce(90).year, poly([[21, 44], [27, 45], [29, 47], [26, 48], [22, 47.5], [20, 45.5], [21, 44]]), 'medium', 'Decebalus’ Dacia between the Carpathians and the Danube, approximate.'),
    ],
  },
  // ------------------------------------------------ migration-period "barbarians"
  {
    id: 'huns',
    name: 'Hunnic Empire',
    category: 'confederation',
    start: ce(370),
    end: ce(469),
    confidence: 'low',
    colour: '#6a7a8a',
    labelImportance: 3,
    description:
      'A nomadic steppe confederation that swept into Europe, driving the Gothic migrations, and under Attila (r. 434–453) extorted both halves of the Roman world from a base on the Hungarian plain.',
    sources: [src('Kim 2013, The Huns, Rome and the Birth of Europe')],
    snapshots: [
      snap(ce(450).year, poly([[18, 44], [30, 48], [45, 50], [52, 48], [48, 44], [35, 44], [22, 45], [18, 44]]), 'low', 'Attila’s empire from the Hungarian plain across the western steppe, approximate.'),
    ],
  },
  {
    id: 'vandal-kingdom',
    name: 'Vandal Kingdom',
    category: 'kingdom',
    start: ce(435),
    end: ce(534),
    confidence: 'low',
    colour: '#5a7a6a',
    labelImportance: 3,
    predecessorIds: ['roman-empire'],
    successorIds: ['byzantine-empire'],
    description:
      'A Germanic kingdom that migrated across Gaul and Iberia into Roman Africa, took Carthage (439 CE), sacked Rome (455) and ruled the western Mediterranean by sea until Belisarius reconquered it for Byzantium (534).',
    sources: [src('Merrills & Miles 2010, The Vandals')],
    snapshots: [
      snap(ce(470).year, mpoly(
        [[6, 32], [11, 37], [10, 37], [7, 35], [5, 33], [6, 32]],
        [[8, 39], [10, 39], [9.5, 41], [8.5, 41], [8, 40]],
        [[12, 37.5], [15.5, 37], [15.6, 38.3], [12.5, 38.2]],
      ), 'low', 'Vandal Africa with Sardinia and part of Sicily, approximate.'),
    ],
  },
  {
    id: 'ostrogothic-kingdom',
    name: 'Ostrogothic Kingdom',
    category: 'kingdom',
    start: ce(493),
    end: ce(553),
    confidence: 'medium',
    colour: '#7a6a8a',
    labelImportance: 3,
    predecessorIds: ['roman-empire'],
    successorIds: ['byzantine-empire'],
    description:
      'Theodoric the Great’s kingdom in Italy, which preserved Roman administration and culture, until it was destroyed by Byzantium in the long and ruinous Gothic War (535–554).',
    sources: [src('Heather 1996, The Goths')],
    snapshots: [
      snap(ce(520).year, poly([[7, 44], [11, 46], [13.5, 46], [16, 45], [19, 43], [16, 40], [12, 38], [9.5, 44], [7, 44]]), 'medium', 'Ostrogothic Italy and Dalmatia, approximate.'),
    ],
  },
  {
    id: 'lombard-kingdom',
    name: 'Lombard Kingdom',
    alternativeNames: ['Langobards'],
    category: 'kingdom',
    start: ce(568),
    end: ce(774),
    confidence: 'medium',
    colour: '#8a7a5a',
    labelImportance: 3,
    predecessorIds: ['ostrogothic-kingdom', 'byzantine-empire'],
    successorIds: ['frankish-empire'],
    description:
      'A Germanic people who conquered much of Italy after the Gothic War, leaving Byzantium only the south and the Ravenna corridor, until Charlemagne overthrew their kingdom in 774.',
    sources: [src('Christie 1995, The Lombards')],
    snapshots: [
      snap(ce(650).year, poly([[7, 44], [12, 46], [13.5, 45.5], [13, 43.5], [15, 41], [13, 40], [10.5, 43], [8, 44], [7, 44]]), 'medium', 'Lombard northern and inland Italy (Byzantium keeps the coasts and the south), approximate.'),
    ],
  },
  {
    id: 'frankish-kingdom',
    name: 'Frankish Kingdom',
    alternativeNames: ['Merovingian Francia'],
    category: 'kingdom',
    start: ce(481),
    end: ce(751),
    confidence: 'medium',
    colour: '#9a7ab0',
    labelImportance: 3,
    predecessorIds: ['roman-empire'],
    successorIds: ['frankish-empire'],
    description:
      'The Merovingian kingdom of the Franks in former Roman Gaul, founded by Clovis, whose conversion to Catholic Christianity shaped western Europe; its Carolingian successors would revive the western empire.',
    sources: [src('Wood 1994, The Merovingian Kingdoms 450–751')],
    snapshots: [
      snap(ce(560).year, poly([[-2, 43], [0, 46], [3, 49], [6, 50.5], [9, 49], [8, 47], [6, 45], [3, 43.5], [-1, 43], [-2, 43]]), 'medium', 'Merovingian Francia across Gaul and the Rhineland, approximate.'),
    ],
  },
  // -------------------------------------------------- medieval Byzantine neighbours
  {
    id: 'avar-khaganate',
    name: 'Avar Khaganate',
    category: 'confederation',
    start: ce(567),
    end: ce(822),
    confidence: 'low',
    colour: '#6a8a7a',
    labelImportance: 2,
    successorIds: ['frankish-empire', 'first-bulgarian-empire'],
    description:
      'A steppe confederation that dominated the Carpathian basin for two centuries, besieged Constantinople (626) and raided the Balkans, until Charlemagne broke its power around 800.',
    sources: [src('Pohl 2018, The Avars: A Steppe Empire in Central Europe')],
    snapshots: [
      snap(ce(650).year, poly([[15, 45], [20, 48], [24, 48], [26, 46], [22, 44], [17, 44], [15, 45]]), 'low', 'The Avar khaganate of the middle Danube, approximate.'),
    ],
  },
  {
    id: 'khazar-khaganate',
    name: 'Khazar Khaganate',
    category: 'confederation',
    start: ce(650),
    end: ce(969),
    confidence: 'low',
    colour: '#5a8a9a',
    labelImportance: 3,
    successorIds: ['kievan-rus'],
    description:
      'A powerful Turkic steppe empire of the north Caucasus and Pontic–Caspian steppe, a Byzantine ally against the Arabs whose elite famously adopted Judaism, before its destruction by the Rus.',
    sources: [src('Golden et al. 2007, The World of the Khazars')],
    snapshots: [
      snap(ce(850).year, poly([[36, 44], [44, 48], [50, 48], [52, 45], [49, 42], [43, 42], [37, 43], [36, 44]]), 'low', 'The Khazar steppe between the Black and Caspian seas, approximate.'),
    ],
  },
  {
    id: 'sultanate-of-rum',
    name: 'Sultanate of Rum',
    alternativeNames: ['Seljuk Sultanate of Rûm'],
    category: 'kingdom',
    start: ce(1077),
    end: ce(1308),
    confidence: 'medium',
    colour: '#a07ab0',
    labelImportance: 3,
    predecessorIds: ['seljuk-empire', 'byzantine-empire'],
    successorIds: ['ottoman-empire'],
    description:
      'The Turkish sultanate that settled Anatolia (“Rum”, i.e. Roman land) after the Byzantine defeat at Manzikert (1071), a rival of Byzantium and the Crusaders until it fragmented into the beyliks from which the Ottomans arose.',
    sources: [src('Peacock & Yıldız (eds.) 2013, The Seljuks of Anatolia')],
    snapshots: [
      snap(ce(1200).year, poly([[30, 38], [36, 40], [41, 39], [42, 37], [38, 36], [33, 36.5], [30, 37], [30, 38]]), 'medium', 'Seljuk central and eastern Anatolia, approximate.'),
    ],
  },
  {
    id: 'kingdom-of-jerusalem',
    name: 'Kingdom of Jerusalem',
    alternativeNames: ['Crusader states', 'Outremer'],
    category: 'kingdom',
    start: ce(1099),
    end: ce(1291),
    confidence: 'medium',
    colour: '#b0704a',
    labelImportance: 3,
    predecessorIds: ['fatimid-caliphate', 'seljuk-empire'],
    successorIds: ['ayyubid', 'mamluk-sultanate'],
    description:
      'The chief of the Crusader states established along the Levantine coast after the First Crusade (1099). Shown as a single band standing for the Latin East (with Antioch, Tripoli and Edessa at its 1131 peak), it survived Zengi\'s capture of Edessa (1144) before Saladin\'s catastrophic victory at Hattin (1187) reduced it to Tyre; the Third Crusade restored a coastal strip around the new capital, Acre. Mamluk conquest under Baibars and his successors then ground down the remaining coast until Acre itself fell in 1291.',
    sources: [
      src('Riley-Smith 1987, The Crusades: A History'),
      src('Tyerman 2006, God\'s War: A New History of the Crusades'),
    ],
    snapshots: [
      snap(ce(1099).year, poly([[34.3, 31.0], [34.6, 31.8], [34.8, 32.05], [35.3, 32.05], [35.5, 31.8], [34.6, 31.0], [34.3, 31.0]]), 'medium', 'The First Crusade takes Jerusalem (1099): the founding kingdom, a modest inland-and-coastal core around Jerusalem and Jaffa.'),
      snap(ce(1131).year, poly([
        [34.3, 31.0], [34.6, 31.8], [34.85, 32.9], [35.2, 33.8], [35.9, 35.5], [37.5, 37.2],
        [39.3, 37.2], [36.8, 35.5], [36.2, 33.8], [35.6, 32.9], [35.5, 31.8], [34.6, 31.0], [34.3, 31.0],
      ]), 'low', 'Peak "Outremer": the Kingdom of Jerusalem strung together with the County of Tripoli, Principality of Antioch and County of Edessa in one schematic band, approximate.'),
      snap(ce(1144).year, poly([
        [34.3, 31.0], [34.6, 31.8], [34.85, 32.9], [35.2, 33.8], [35.9, 35.5],
        [36.8, 35.5], [36.2, 33.8], [35.6, 32.9], [35.5, 31.8], [34.6, 31.0], [34.3, 31.0],
      ]), 'medium', 'Zengi captures Edessa (1144), the first Crusader state to fall — the northernmost reach of the band is cut off.'),
      snap(ce(1187).year, mpoly(
        [[35.05, 33.15], [35.35, 33.45], [35.2, 33.05], [35.0, 33.1], [35.05, 33.15]],
        [[35.4, 33.6], [36.0, 35.5], [36.8, 35.5], [36.2, 33.8], [35.7, 33.5], [35.4, 33.6]],
      ), 'high', 'Saladin\'s victory at Hattin (1187): Jerusalem and Acre fall within months, leaving only Tyre in the south (with Tripoli and Antioch still holding on in the north).'),
      snap(ce(1192).year, mpoly(
        [[34.6, 32.0], [34.9, 32.95], [35.3, 33.35], [35.15, 33.0], [34.8, 32.1], [34.6, 32.0]],
        [[35.4, 33.6], [36.0, 35.5], [36.8, 35.5], [36.2, 33.8], [35.7, 33.5], [35.4, 33.6]],
      ), 'high', 'The Third Crusade\'s Treaty of Jaffa (1192) restores a coastal strip around the new capital, Acre — Jerusalem itself is not recovered.'),
      snap(ce(1265).year, poly([[34.95, 32.85], [35.05, 33.35], [35.3, 33.3], [35.15, 32.95], [34.95, 32.85]]), 'high', 'Baibars\' Mamluk conquests strip away Caesarea, Arsuf and Jaffa: only the Acre–Tyre coastal pocket remains, on the eve of Acre\'s fall in 1291.'),
    ],
  },
];
