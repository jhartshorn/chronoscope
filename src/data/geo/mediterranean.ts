import type { Ring } from '../helpers';

/**
 * Reusable coarse province outlines for the Mediterranean world, composed into
 * multipolygons by the Roman Republic, Roman Empire and Byzantine Empire so
 * their territorial extents can change snapshot-by-snapshot (e.g. Britannia
 * appears after 43 CE and is abandoned after 410 CE). Coordinates are
 * [longitude, latitude]; winding is normalised by the `poly`/`mpoly` helpers.
 *
 * These are historical interpretations, deliberately coarse — envelopes of the
 * provinces, not surveyed borders. Fills are clipped to the coastline at render
 * time, so the enclosed sea never shows.
 */

export const IBERIA: Ring = [[-9, 43], [-2, 43], [3, 42], [0, 39], [-2, 37], [-6, 36], [-9, 37]];
/** Eastern & southern Iberian coast only (Republic, after the Second Punic War). */
export const HISPANIA_E: Ring = [[-1, 37], [1, 39], [3, 42], [1, 41], [-2, 39], [-3, 37]];
export const GAUL: Ring = [[-2, 43], [-1, 46], [-2, 48], [2, 51], [7, 51], [8, 49], [6, 46], [4, 44], [0, 43]];
/** Southern Gaul coast (Gallia Narbonensis) — Republic before Caesar. */
export const NARBONENSIS: Ring = [[0, 42], [6, 43.5], [8, 44], [6, 43], [3, 42]];
/** Roman Britain, to roughly Hadrian's Wall. */
export const BRITANNIA: Ring = [[-5.5, 50], [-3, 51], [1, 51], [1.5, 53], [-1, 55], [-3, 55], [-5, 54], [-5.5, 51.5]];
export const ITALY: Ring = [[7, 44], [10, 44], [13.5, 46], [13, 45], [16, 41], [18.5, 40], [16, 38], [12, 38], [10, 42], [8, 44]];
export const ITALY_CENTRAL: Ring = [[11, 41], [15, 41], [16, 43], [13, 45], [11, 44], [10, 42]];
export const SICILY: Ring = [[12, 37.5], [15.5, 37], [15.6, 38.3], [12.5, 38.2]];
export const SARDINIA_CORSICA: Ring = [[8, 39], [10, 39], [9.5, 43], [8.5, 43], [8, 40]];
/** North Africa coast, Mauretania to Tripolitania. */
export const NAFRICA: Ring = [[-6, 35], [-2, 34], [4, 35], [9, 33], [15, 31], [20, 31], [19, 32.5], [11, 34], [3, 37], [-2, 36], [-6, 36]];
/** Africa Proconsularis (Tunisia) — Republic, after the destruction of Carthage. */
export const AFRICA_PROC: Ring = [[8, 33], [11, 37], [9, 37], [6, 35]];
export const CYRENAICA: Ring = [[19, 32], [24, 32], [24, 30], [20, 30], [19, 31]];
export const EGYPT: Ring = [[29, 31], [34, 31], [34, 25], [33, 22], [31, 22], [29, 24], [27, 28]];
/** Greece / Macedonia / Achaea. */
export const GREECE: Ring = [[19, 36], [24, 36], [24, 41], [20, 40], [19, 38]];
/** Illyricum + Macedonia + Moesia to the Danube. */
export const BALKANS: Ring = [[13, 42], [16, 45], [20, 45], [24, 45], [29, 45], [28, 41], [24, 40], [21, 37], [19, 40], [16, 42]];
export const THRACE: Ring = [[24, 40], [28, 41], [29, 42], [26, 42], [24, 41]];
export const ANATOLIA: Ring = [[26, 36], [30, 37], [36, 37], [41, 39], [41, 42], [35, 42], [28, 41], [26, 38]];
/** Western Anatolia only (the Roman province of Asia). */
export const ANATOLIA_W: Ring = [[26, 37], [30, 38], [31, 40], [27, 40], [26, 38]];
export const LEVANT: Ring = [[34, 29], [36, 31], [38, 34], [40, 36], [39, 34], [37, 33], [36, 32], [35, 31], [34, 31]];
export const ARABIA_PETRAEA: Ring = [[34.5, 29], [37, 29.5], [38, 31], [36.5, 32], [35, 31]];
/** Dacia (north of the lower Danube), 106–271 CE. */
export const DACIA: Ring = [[22, 44], [27, 45], [29, 46], [27, 48], [23, 48], [21, 46]];
/** Trajan's Mesopotamia, 116–117 CE only. */
export const MESOPOTAMIA: Ring = [[40, 34], [44, 36], [47, 34], [46, 31], [43, 31], [40, 32]];
/** Southern Italy / Sicily foothold retained by Byzantium into the 11th c. */
export const S_ITALY: Ring = [[15, 38], [18.5, 40], [16.5, 41.5], [15, 40], [15, 38]];
/** The early Roman state around the Tiber, c. 509 BCE. */
export const ROME_509: Ring = [[12.0, 41.6], [12.9, 41.6], [13.0, 42.0], [12.4, 42.2], [12.0, 41.9], [12.0, 41.6]];
/** Rome's Latium and adjacent lands after the Latin War, c. 338 BCE. */
export const LATIUM_338: Ring = [
  [11.5, 41.3], [13.5, 40.9], [14.3, 41.3], [13.8, 42.0], [12.5, 42.5], [11.5, 42.2], [11.2, 41.7], [11.5, 41.3],
];
