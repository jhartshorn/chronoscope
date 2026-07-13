import type { Ring } from '../helpers';

/**
 * Reusable province outlines for the Mediterranean world, composed into
 * multipolygons by the Roman Republic, Roman Empire and Byzantine Empire so
 * their territorial extents can change snapshot-by-snapshot (e.g. Britannia
 * appears after 43 CE and is abandoned after 410 CE). Coordinates are
 * [longitude, latitude]; winding is normalised by the `poly`/`mpoly` helpers.
 *
 * These are historical interpretations, deliberately hand-drawn rather than
 * surveyed — but authored at higher vertex density than a typical inline
 * shape so the Roman world's coastlines and provincial frontiers read
 * cleanly at close zoom. Fills are clipped to the coastline at render time,
 * so the enclosed sea never shows.
 *
 * Where provinces are adjacent by land and are ever combined in the same
 * mpoly() snapshot (Gaul/Narbonensis, Balkans/Thrace/Greece, Balkans/Dacia,
 * Nafrica/Cyrenaica/Egypt, Levant/Arabia Petraea/Mesopotamia), the shared
 * frontier is authored as identical coordinate chains in both rings so the
 * provinces tile edge-to-edge with no gap and no overlap, instead of the
 * loosely-overlapping rectangles used previously.
 */

/** Whole Iberian peninsula (Roman Hispania). Shares its Pyrenees frontier
 * with GAUL and NARBONENSIS (never combined with HISPANIA_E in the same
 * snapshot). */
export const IBERIA: Ring = [
  [-9.3, 43.0], [-8.2, 43.5], [-6.7, 43.6], [-5.3, 43.5], [-3.8, 43.4], [-2.6, 43.35], // Cantabrian coast
  [-1.75, 43.4], [-0.9, 42.9], [0.5, 42.7], [1.7, 42.45], [3.15, 42.35], // Pyrenees frontier (Gaul/Narbonensis)
  [3.05, 41.6], [2.2, 40.9], [0.7, 40.0], [0.1, 39.1], [-0.3, 38.2], // Mediterranean coast (Catalonia to Alicante)
  [-1.2, 37.6], [-2.3, 36.75], [-3.9, 36.7], [-4.9, 36.3], // south coast (Murcia to the Strait)
  [-6.2, 36.9], [-7.4, 37.15], [-8.9, 38.0], [-9.4, 39.4], [-9.5, 40.6], [-8.9, 41.8], [-9.1, 42.5], // Algarve, Atlantic Portugal, Galicia
];

/** Eastern & southern Iberian coast only (Republic, after the Second Punic War). */
export const HISPANIA_E: Ring = [
  [-1.2, 36.7], [0.0, 37.2], [0.8, 38.0], [1.6, 38.8], [2.4, 39.6], [3.1, 40.4], [3.2, 41.2],
  [2.6, 41.8], [1.6, 41.2], [0.6, 40.4], [-0.2, 39.6], [-1.0, 38.8], [-1.8, 38.0], [-2.6, 37.4],
  [-3.2, 36.9], [-2.4, 36.6],
];

/** Gaul, minus the Narbonensis coastal strip when both are shown together.
 * Shares the Pyrenees frontier with IBERIA and the Cevennes/Alps frontier
 * with NARBONENSIS. */
export const GAUL: Ring = [
  [-1.75, 43.4], [-0.9, 42.9], [0.5, 42.7], // Pyrenees frontier with Iberia
  [1.8, 43.3], [3.3, 43.7], [4.6, 44.2], [5.8, 44.6], [7.0, 44.9], // frontier with Narbonensis
  [7.5, 46.0], [7.6, 47.55], [8.3, 49.0], [8.1, 49.9], [7.2, 50.9], // Rhine/Alps frontier with Germania
  [6.8, 51.5], [5.0, 51.4], [3.4, 51.3], [2.5, 51.0], [1.6, 50.9], // North Sea coast (Belgica)
  [0.2, 49.7], [-1.0, 49.6], [-1.9, 49.4], [-4.5, 48.7], [-4.8, 48.4], [-4.4, 48.0], // Normandy, Brittany
  [-2.9, 47.5], [-2.1, 47.1], [-1.3, 46.4], [-1.9, 45.6], [-1.6, 44.6], // Atlantic coast (Vendee to Gascony)
];

/** Southern Gaul coast (Gallia Narbonensis) — Republic before Caesar, and
 * carved out of GAUL in later snapshots so the two tile without overlap. */
export const NARBONENSIS: Ring = [
  [3.15, 42.35], [3.0, 42.65], [3.3, 43.05], [3.8, 43.2], [4.35, 43.25], [4.9, 43.2],
  [5.3, 43.15], [5.95, 42.95], [6.6, 42.95], [7.05, 43.4], [7.2, 43.55], [7.55, 43.8],
  [7.35, 44.45], [7.0, 44.9], // Mediterranean coast, Cape Creus to the Alps
  [5.8, 44.6], [4.6, 44.2], [3.3, 43.7], [1.8, 43.3], [0.5, 42.7], // frontier with Gaul
  [1.7, 42.45], // frontier with Iberia
];

/** Roman Britain, to roughly Hadrian's Wall. */
export const BRITANNIA: Ring = [
  [-5.7, 50.1], [-4.5, 50.3], [-3.5, 50.6], [-2.5, 50.7], [-1.5, 50.8], [-0.5, 50.8], [0.3, 50.9],
  [1.0, 51.0], [1.4, 51.5], [1.3, 52.0], [0.8, 52.5], [1.6, 52.9], [1.7, 53.3], [0.2, 53.7],
  [-0.2, 54.0], [-0.5, 54.5], [-1.2, 54.9], [-1.6, 55.0], [-2.4, 55.0], [-3.0, 54.9], [-3.3, 54.6],
  [-4.2, 54.5], [-4.8, 54.1], [-4.3, 53.4], [-4.8, 52.9], [-5.3, 52.1], [-4.8, 51.6], [-5.3, 51.2],
];

export const ITALY: Ring = [
  [7.1, 44.0], [8.0, 44.3], [8.9, 44.4], [9.9, 44.1], [10.5, 44.5], [11.3, 44.9],
  [12.2, 45.3], [13.0, 45.6], [13.6, 45.7], [13.3, 44.9], [14.2, 44.1], [14.9, 43.2],
  [15.9, 42.2], [16.4, 41.3], [17.2, 40.8], [18.4, 40.9], [18.3, 40.2], [17.3, 39.8],
  [16.6, 38.8], [15.9, 38.1], [15.7, 37.9], [16.2, 38.5], [16.0, 39.3], [15.3, 40.0],
  [14.5, 40.4], [13.7, 40.4], [13.9, 41.2], [12.9, 41.4], [11.9, 42.3], [11.0, 42.6],
  [10.2, 42.5], [9.6, 43.0], [8.6, 43.9],
];

export const ITALY_CENTRAL: Ring = [
  [11.0, 41.0], [12.5, 40.8], [14.0, 40.9], [15.0, 41.0], [15.7, 41.8], [16.0, 43.0],
  [14.8, 43.8], [13.5, 44.6], [12.2, 45.0], [11.0, 44.3], [10.3, 43.0], [10.5, 42.0],
];

export const SICILY: Ring = [
  [12.4, 37.6], [13.5, 37.1], [14.3, 36.7], [15.1, 37.0], [15.6, 37.5], [15.3, 38.0],
  [14.5, 38.2], [13.4, 38.2], [12.5, 38.0], [12.2, 37.9],
];

export const SARDINIA_CORSICA: Ring = [
  [8.4, 39.0], [9.2, 38.9], [9.7, 39.3], [9.6, 40.0], [9.5, 40.9], [9.3, 41.2],
  [9.4, 42.0], [9.6, 42.9], [8.8, 43.0], [8.6, 42.6], [8.6, 41.9], [8.4, 41.1],
  [8.2, 40.0], [8.1, 39.3],
];

/** North Africa coast, Mauretania to Tripolitania — stops at the Gulf of
 * Sidra (Arae Philaenorum), where it meets CYRENAICA. */
export const NAFRICA: Ring = [
  [-5.9, 35.8], [-4.0, 35.3], [-1.5, 35.2], [1.2, 35.0], [3.5, 36.3], [4.8, 36.9],
  [6.5, 37.0], [8.2, 37.1], [9.8, 36.9], [10.5, 35.7], [10.2, 34.5], [11.0, 33.9],
  [13.5, 32.7], [15.6, 31.2], [17.4, 30.9], [18.5, 30.7], // coast east to the Cyrenaica frontier
  [18.0, 29.5], // Saharan hinterland frontier with Cyrenaica
  [15.0, 30.5], [11.5, 31.5], [8.5, 32.5], [5.0, 33.3], [1.0, 33.0], // hinterland back west
  [-3.0, 33.8], [-6.5, 34.8],
];

/** Africa Proconsularis (Tunisia) — Republic, after the destruction of Carthage. */
export const AFRICA_PROC: Ring = [
  [8.5, 33.2], [10.0, 34.5], [11.2, 36.3], [10.3, 37.0], [9.0, 37.2], [7.5, 36.5],
  [6.3, 35.2], [7.2, 34.0],
];

/** Cyrenaica, from the Gulf of Sidra (NAFRICA frontier) to Sallum (EGYPT frontier). */
export const CYRENAICA: Ring = [
  [18.5, 30.7], [19.5, 30.9], [20.5, 31.3], [21.5, 31.9], [22.5, 32.4], [23.5, 32.2],
  [24.5, 31.9], [25.15, 31.55], // coast to the Egyptian frontier at Sallum
  [24.8, 29.0], // Saharan hinterland frontier with Egypt
  [22.5, 29.3], [20.0, 29.4], [18.0, 29.5], // hinterland back to the Nafrica frontier
];

/** Egypt, including Sinai. Meets CYRENAICA at Sallum and ARABIA_PETRAEA
 * along the Sinai/Transjordan desert line to Aqaba. */
export const EGYPT: Ring = [
  [25.15, 31.55], [26.1, 31.35], [27.2, 31.15], [28.3, 31.0], [29.3, 31.2], // coast from the Cyrenaica frontier
  [30.0, 31.5], [31.0, 31.35], [32.0, 31.1], [33.0, 31.15], [34.3, 31.3], // Nile delta to Gaza
  [34.9, 29.5], // frontier with Arabia Petraea (Gaza to Aqaba via Sinai)
  [34.0, 28.6], [33.5, 27.5], [33.9, 26.0], [33.0, 24.0], // Red Sea coast (Sinai and African shore)
  [33.5, 22.5], [32.6, 22.0], [30.5, 22.0], // Nubian frontier
  [28.5, 22.2], [27.0, 24.0], [26.0, 26.5], [24.8, 29.0], // Western Desert / Libyan hinterland back to Cyrenaica
];

/** Greece / Macedonia / Achaea. Shares its northern frontier with BALKANS
 * and its eastern (Nestos-river) frontier with THRACE. */
export const GREECE: Ring = [
  [19.3, 40.05], [19.9, 39.6], [20.0, 39.0], [20.7, 38.2], [21.3, 37.6], [21.7, 36.9], // Epirus/Ionian coast
  [22.0, 36.5], [22.9, 36.8], [23.2, 37.5], [23.6, 38.0], [23.7, 38.4], [24.0, 38.9], // Peloponnese and Attica
  [23.3, 39.5], [22.9, 40.0], [22.9, 40.5], [23.5, 40.3], [24.1, 40.4], [24.6, 40.5], // Thessaly, Macedonian coast
  [24.3, 41.0], [24.0, 41.5], // frontier with Thrace
  [23.3, 41.3], [22.5, 41.0], [21.6, 41.1], [20.5, 40.6], // frontier with the Balkans
];

/** Illyricum + Macedonia + Moesia to the Danube. Shares its southern
 * frontier with GREECE, its eastern (Nestos) frontier with THRACE, and the
 * Danube frontier with DACIA. */
export const BALKANS: Ring = [
  [19.3, 40.05], [19.1, 41.3], [18.4, 42.4], [17.7, 43.0], [17.2, 43.5], [16.4, 43.9], // Adriatic (Dalmatia)
  [15.9, 44.5], [15.0, 44.8], [13.9, 45.2], [14.6, 45.6], [16.0, 46.3], [18.0, 46.0], // Istria, Pannonia
  [19.5, 45.3], [21.0, 44.7], [22.5, 44.5], [24.0, 44.2], [25.5, 43.7], [27.0, 44.0], // Danube frontier with Dacia
  [28.3, 44.6], [29.3, 45.2], [28.5, 43.5], [28.0, 42.5], [28.2, 42.0], // Black Sea coast
  [27.0, 42.1], [25.5, 41.9], [24.0, 41.5], // frontier with Thrace
  [23.3, 41.3], [22.5, 41.0], [21.6, 41.1], [20.5, 40.6], // frontier with Greece
];

/** Illyricum/Moesia/Greek coastal fringe held by Byzantium into the 11th c. */
export const S_ITALY: Ring = [
  [15.0, 38.0], [16.2, 38.3], [17.5, 39.2], [18.5, 40.0], [17.5, 40.8], [16.5, 41.5],
  [15.7, 40.9], [15.2, 40.0],
];

/** European Thrace (Byzantium to the Nestos). Shares frontiers with GREECE
 * and BALKANS; the rest is its own Black Sea/Marmara/Aegean coast. */
export const THRACE: Ring = [
  [24.6, 40.5], [24.3, 41.0], [24.0, 41.5], // frontier with Greece
  [25.5, 41.9], [27.0, 42.1], [28.2, 42.0], // frontier with the Balkans
  [28.6, 41.85], [28.9, 41.6], [29.0, 41.0], [28.4, 40.7], // Black Sea coast and the Bosphorus
  [27.3, 40.5], [26.6, 40.0], [25.9, 40.6], [25.3, 40.7], [24.9, 40.9], // Marmara, Hellespont, Aegean coast
];

export const ANATOLIA: Ring = [
  [26.5, 36.5], [28.0, 36.3], [29.5, 36.6], [31.5, 36.4], [33.5, 36.2], [35.5, 36.4],
  [37.5, 36.8], [39.5, 37.5], [41.0, 38.3], [41.3, 39.5], [41.2, 40.8], [40.0, 41.6],
  [38.0, 42.0], [35.5, 42.0], [33.0, 41.7], [30.5, 41.3], [28.5, 41.0], [27.0, 40.5],
  [26.2, 39.5], [26.0, 38.2], [26.2, 37.2],
];

/** Western Anatolia only (the Roman province of Asia). */
export const ANATOLIA_W: Ring = [
  [26.2, 37.2], [27.5, 37.4], [29.0, 37.7], [30.5, 38.2], [31.2, 39.2], [30.2, 39.9],
  [28.5, 40.1], [27.0, 39.8], [26.3, 38.9], [26.0, 38.0],
];

/** Coastal Syria-Palestine. Shares its northern frontier with ANATOLIA, its
 * inland (Palmyra) frontier with MESOPOTAMIA, and the Sinai/Transjordan line
 * with ARABIA_PETRAEA. */
export const LEVANT: Ring = [
  [34.3, 31.3], [34.4, 31.65], [34.5, 32.0], [34.8, 32.8], [35.0, 33.05], [35.2, 33.3], // coast from Gaza to Tyre
  [35.5, 33.9], [35.7, 34.2], [35.9, 34.5], [35.9, 35.1], [36.0, 35.45], [36.2, 35.8], // coast to Latakia
  [36.5, 36.4], [37.2, 36.6], // frontier with Anatolia
  [37.9, 35.8], [38.35, 35.2], [38.8, 34.6], [38.55, 34.0], [38.2, 33.4], // frontier with Mesopotamia
  [37.0, 32.4], [36.4, 31.9], [35.9, 31.6], // frontier with Arabia Petraea
];

/** Nabataea/Transjordan and the Hejaz. Shares frontiers with EGYPT (Sinai)
 * and LEVANT. */
export const ARABIA_PETRAEA: Ring = [
  [34.3, 31.3], [34.9, 29.5], // frontier with Egypt (Gaza to Aqaba)
  [35.8, 28.7], [36.8, 27.9], [37.5, 27.0], [38.0, 25.8], [37.6, 24.8], // Hejaz Red Sea coast
  [39.0, 26.8], [39.3, 28.3], [39.0, 30.3], [38.5, 31.8], [38.2, 33.4], // desert frontier north to Mesopotamia
  [35.9, 31.6], // frontier with Levant
];

/** Dacia (north of the lower Danube), 106–271 CE. Shares the Danube frontier
 * with BALKANS. */
export const DACIA: Ring = [
  [21.0, 44.7], [20.5, 45.8], [21.3, 46.8], [22.0, 47.3], [23.0, 47.6], [24.0, 47.9],
  [25.0, 48.0], [26.8, 47.8], [27.5, 47.5], [28.0, 47.0], [29.0, 46.0], [29.3, 45.2],
  [28.3, 44.6], [27.0, 44.0], [25.5, 43.7], [24.0, 44.2], [22.5, 44.5], // Danube frontier with the Balkans
];

/** Trajan's Mesopotamia, 116–117 CE only. Shares its western frontier with
 * LEVANT (via the Palmyra tripoint with Arabia Petraea). */
export const MESOPOTAMIA: Ring = [
  [38.2, 33.4], [38.55, 34.0], [38.8, 34.6], [38.35, 35.2], [37.9, 35.8], [37.2, 36.6], // frontier with Levant
  [39.0, 37.2], [41.0, 37.3], [43.5, 36.5], [45.5, 35.5], [47.0, 34.5], [46.5, 32.5],
  [44.8, 31.0], [43.0, 30.8], [40.5, 31.8], [39.2, 32.6],
];

/** The early Roman state around the Tiber, c. 509 BCE. */
export const ROME_509: Ring = [
  [12.0, 41.6], [12.45, 41.55], [12.9, 41.6], [13.0, 41.8], [13.0, 42.0], [12.7, 42.15],
  [12.4, 42.2], [12.15, 42.05], [12.0, 41.9], [11.95, 41.75],
];

/** Rome's Latium and adjacent lands after the Latin War, c. 338 BCE. */
export const LATIUM_338: Ring = [
  [11.5, 41.3], [12.5, 41.05], [13.5, 40.9], [14.0, 41.1], [14.3, 41.3], [14.1, 41.65],
  [13.8, 42.0], [13.1, 42.3], [12.5, 42.5], [11.9, 42.4], [11.5, 42.2], [11.35, 41.95],
  [11.2, 41.7], [11.3, 41.5],
];
