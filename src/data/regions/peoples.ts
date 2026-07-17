import type { HistoricalEntity } from '../../types';
import { bce, ce, mpoly, poly, snap, src } from '../helpers';

/**
 * Broad peoples and language families. These entries describe wide, changing
 * linguistic or cultural groupings — NOT single unified peoples or states —
 * and each description says so explicitly. They are drawn as soft, diffuse
 * ranges over their formative homelands; most later dispersed far more widely
 * than any polygon can show.
 */
export const PEOPLES_ENTITIES: HistoricalEntity[] = [
  {
    id: 'germanic-peoples',
    name: 'Germanic peoples',
    category: 'people',
    start: bce(500),
    end: ce(700),
    confidence: 'low',
    colour: '#7a8b5a',
    labelImportance: 2,
    description:
      'A broad grouping of peoples speaking early Germanic languages (Goths, Franks, Saxons, Lombards and many others), not a single nation. From a northern-European homeland they spread widely during the Migration Period, founding many of the successor kingdoms of the Roman west.',
    sources: [src('Todd 2004, The Early Germans')],
    snapshots: [
      snap(ce(1).year, poly([[4, 47], [8, 50], [13, 54], [18, 57], [22, 60], [16, 55], [10, 51], [5, 48], [4, 47]]), 'low', 'Northern and central European homeland, a diffuse cultural range.'),
    ],
  },
  {
    id: 'slavic-peoples',
    name: 'Slavic peoples',
    category: 'people',
    start: ce(300),
    end: ce(1100),
    confidence: 'low',
    colour: '#6a8b6a',
    labelImportance: 2,
    description:
      'A broad linguistic grouping (later West, East and South Slavs), not one people, whose early-medieval expansion across eastern and central Europe underlies many later nations from Poland and Russia to the Balkans.',
    sources: [src('Barford 2001, The Early Slavs')],
    snapshots: [
      snap(ce(700).year, poly([[14, 47], [22, 49], [32, 52], [40, 56], [44, 54], [38, 49], [30, 46], [20, 45], [15, 46], [14, 47]]), 'low', 'Eastern and central Europe, a diffuse cultural range.'),
    ],
  },
  {
    id: 'arab-peoples',
    name: 'Arab peoples',
    category: 'people',
    start: bce(800),
    end: ce(2026),
    confidence: 'low',
    colour: '#9a8b4a',
    labelImportance: 2,
    description:
      'A broad ethnolinguistic grouping united chiefly by the Arabic language, not a single nation. Shown at its Arabian homeland; after the 7th-century conquests Arabic-speaking peoples spread across the Near East and North Africa.',
    sources: [src('Hoyland 2001, Arabia and the Arabs')],
    snapshots: [
      snap(ce(600).year, poly([[35, 15], [43, 13], [52, 15], [57, 20], [50, 28], [40, 30], [36, 26], [34, 20], [35, 15]]), 'low', 'Arabian peninsula homeland; the later Arabic-speaking world is far larger.'),
    ],
  },
  {
    id: 'turkic-peoples',
    name: 'Turkic peoples',
    category: 'people',
    start: ce(500),
    end: ce(1500),
    confidence: 'low',
    colour: '#8a8b5a',
    labelImportance: 2,
    description:
      'A broad family of peoples speaking Turkic languages, not one nation. From a Central Asian and Siberian homeland they spread across the Eurasian steppe and into Anatolia, founding numerous states from the Göktürks to the Ottomans.',
    sources: [src('Golden 1992, An Introduction to the History of the Turkic Peoples')],
    snapshots: [
      snap(ce(900).year, poly([[52, 40], [65, 45], [80, 48], [95, 48], [100, 44], [88, 40], [72, 38], [58, 38], [52, 40]]), 'low', 'Central Asian steppe homeland, a diffuse range.'),
    ],
  },
  {
    id: 'amazigh',
    name: 'Amazigh (Berber) peoples',
    category: 'people',
    start: bce(2000),
    end: ce(2026),
    confidence: 'low',
    colour: '#b0904a',
    labelImportance: 2,
    description:
      'The Indigenous peoples of North Africa west of the Nile, a broad grouping of many communities speaking Amazigh (Berber) languages, present from antiquity through the Roman, Arab and modern periods.',
    sources: [src('Brett & Fentress 1996, The Berbers')],
    snapshots: [
      snap(ce(500).year, poly([[-10, 28], [0, 32], [10, 34], [18, 30], [12, 22], [0, 20], [-8, 22], [-12, 26], [-10, 28]]), 'low', 'Maghreb and northern Sahara, a diffuse cultural range.'),
    ],
  },
  {
    id: 'bantu-peoples',
    name: 'Bantu-speaking peoples',
    category: 'people',
    start: bce(1000),
    end: ce(1500),
    confidence: 'low',
    colour: '#7a9a5a',
    labelImportance: 2,
    description:
      'A very broad grouping of peoples speaking Bantu languages, not one people. The Bantu expansion from West-Central Africa over several millennia carried farming, ironworking and these languages across most of central, eastern and southern Africa.',
    sources: [src('Vansina 1990, Paths in the Rainforests')],
    snapshots: [
      snap(ce(500).year, poly([[10, 4], [25, 2], [35, -4], [38, -16], [30, -28], [20, -30], [14, -14], [11, -4], [10, 4]]), 'low', 'Central, eastern and southern Africa, a diffuse range of the expansion.'),
    ],
  },
  {
    id: 'jewish-people',
    name: 'Jewish people',
    category: 'people',
    start: bce(1000),
    end: ce(2026),
    confidence: 'low',
    colour: '#8a7ab0',
    labelImportance: 2,
    description:
      'An ethnoreligious people originating in the ancient Levant. After the Roman-era revolts most Jews lived in diaspora, so the shape follows the successive major centres of Jewish life — Judaea; Galilee and Talmudic Babylonia; medieval Sepharad and Ashkenaz; Ottoman cities and Poland–Lithuania; the Pale of Settlement; and modern Israel — while communities always extended far beyond any polygon.',
    sources: [src('Goodman 2017, A History of Judaism'), src('Ben-Sasson (ed.) 1976, A History of the Jewish People')],
    snapshots: [
      snap(bce(800).year, poly([[34.3, 29.5], [35.9, 31], [36, 33.5], [35, 33.5], [34.4, 31.5], [34.3, 29.5]]), 'low', 'The Iron Age homeland: the kingdoms of Israel and Judah in the southern Levant.'),
      snap(ce(70).year, poly([[34.3, 29.5], [35.9, 31], [36, 33.5], [35, 33.5], [34.4, 31.5], [34.3, 29.5]]), 'low', 'Judaea on the eve of the First Jewish–Roman War; large communities already lived across the eastern Mediterranean and Mesopotamia.'),
      snap(ce(500).year, mpoly(
        [[35, 32], [35.9, 32.3], [36, 33.3], [35.2, 33.2], [34.9, 32.5], [35, 32]],
        [[42.5, 31], [46, 33], [45.5, 35], [42.5, 34], [42, 32], [42.5, 31]],
      ), 'low', 'After the defeats of 70 and 135 CE the centres of Jewish life were Galilee (the Mishnah) and Talmudic Babylonia (the academies of Sura and Pumbedita).'),
      snap(ce(1100).year, mpoly(
        [[-8, 36.5], [-4, 36], [-1, 38], [-3, 40], [-6, 41], [-9, 39], [-8, 36.5]],
        [[6, 49], [8.5, 49], [9, 51], [7, 52], [5.5, 50.5], [6, 49]],
      ), 'low', 'The medieval centres: Sepharad (Iberia under al-Andalus and the Christian kingdoms) and Ashkenaz (the Rhineland); the Babylonian centre waned after c. 1000.'),
      snap(ce(1600).year, mpoly(
        [[21, 38], [27, 38], [30, 40], [27, 42], [22, 41], [21, 38]],
        [[17, 50], [24, 50], [27, 52], [25, 55], [19, 54], [17, 52], [17, 50]],
      ), 'low', 'After the 1492 expulsion from Spain: Sephardi centres in Ottoman cities (Salonika, Istanbul) and the great Ashkenazi settlement of Poland–Lithuania.'),
      snap(ce(1900).year, poly([[23, 51], [27, 49], [31, 47], [35, 48], [32, 52], [30, 56], [26, 57], [23, 55], [23, 51]]), 'low', 'The Pale of Settlement in the Russian Empire, the largest Jewish population in the world (over five million) before the great emigrations and the Holocaust.'),
      snap(ce(2010).year, { naturalEarthCountry: 'Israel' }, 'low', 'Today the largest communities are in Israel and the United States; the American and wider diaspora is too dispersed to draw.'),
    ],
  },
  {
    id: 'palestinian-people',
    name: 'Palestinian people',
    alternativeNames: ['Palestinians'],
    category: 'people',
    start: ce(700),
    end: ce(2026),
    confidence: 'low',
    colour: '#6a9a7a',
    labelImportance: 2,
    description:
      'The Arabic-speaking people of Palestine. The region’s population became predominantly Arabic-speaking in the centuries after the 7th-century conquests, descending largely from its long-settled inhabitants; a distinctly Palestinian national identity crystallised in the late Ottoman and Mandate periods. Since the 1948 war (the Nakba) roughly half the Palestinian people have lived as refugees and their descendants beyond historic Palestine — a diaspora no polygon can show.',
    sources: [
      src('Khalidi 1997, Palestinian Identity: The Construction of Modern National Consciousness'),
      src('Doumani 1995, Rediscovering Palestine: Merchants and Peasants in Jabal Nablus'),
    ],
    snapshots: [
      snap(ce(1000).year, poly([[34.2, 31.2], [34.9, 29.5], [35.6, 30.4], [35.7, 32.2], [35.9, 33.2], [35.1, 33.2], [34.6, 32], [34.2, 31.2]]), 'low', 'Palestine under the caliphates (the districts of Jund Filastin and Jund al-Urdunn), its population gradually becoming predominantly Arabic-speaking.'),
      snap(ce(1900).year, poly([[34.2, 31.2], [34.9, 29.5], [35.6, 30.4], [35.7, 32.2], [35.9, 33.2], [35.1, 33.2], [34.6, 32], [34.2, 31.2]]), 'low', 'Late Ottoman Palestine, with an overwhelmingly Arabic-speaking population.'),
      snap(ce(1960).year, mpoly(
        [[34.05, 31.35], [34.2, 31.2], [34.55, 31.55], [34.35, 31.65], [34.05, 31.35]],
        [[34.95, 31.4], [35.6, 31.5], [35.55, 32.4], [35.1, 32.5], [34.95, 31.9], [34.95, 31.4]],
        [[35.1, 32.5], [35.8, 32.7], [35.6, 33.1], [35.2, 33.1], [35.1, 32.5]],
      ), 'low', 'After 1948: Gaza, the West Bank and the Palestinian communities of the Galilee; more than half the Palestinian people live beyond these areas, chiefly in Jordan, Lebanon and Syria.'),
    ],
  },
  {
    id: 'persian-peoples',
    name: 'Persian peoples',
    alternativeNames: ['Iranian peoples'],
    category: 'people',
    start: bce(1000),
    end: ce(2026),
    confidence: 'low',
    colour: '#a86a8a',
    labelImportance: 2,
    description:
      'A broad grouping of Iranian-speaking peoples of the plateau (Persians, Medes and relatives), not one nation, whose language and culture underpinned successive empires from the Achaemenids to the Safavids and modern Iran.',
    sources: [src('Axworthy 2008, A History of Iran')],
    snapshots: [
      snap(ce(1).year, poly([[45, 28], [52, 36], [60, 38], [64, 32], [60, 26], [52, 25], [46, 26], [45, 28]]), 'low', 'Iranian plateau, a diffuse cultural range.'),
    ],
  },
  {
    id: 'inuit',
    name: 'Inuit peoples',
    category: 'people',
    start: ce(1200),
    end: ce(2026),
    confidence: 'low',
    colour: '#5a8a9a',
    labelImportance: 2,
    description:
      'The Indigenous peoples of the Arctic — a related grouping (Inuit, Iñupiat, Kalaallit and others) spanning Greenland, Arctic Canada and Alaska, descended from the Thule culture that spread across the far north around 1200 CE.',
    sources: [src('McGhee 2004, The Last Imaginary Place: A Human History of the Arctic World')],
    snapshots: [
      snap(ce(1500).year, mpoly(
        [[-55, 60], [-42, 60], [-20, 70], [-45, 82], [-60, 78], [-58, 68], [-55, 60]],
        [[-141, 66], [-95, 68], [-68, 72], [-100, 74], [-135, 71], [-141, 68], [-141, 66]],
      ), 'low', 'Greenland and the North American Arctic, a diffuse range.'),
    ],
  },
  {
    id: 'romani',
    name: 'Romani people',
    category: 'people',
    start: ce(1000),
    end: ce(2026),
    confidence: 'low',
    colour: '#9a7a5a',
    labelImportance: 1,
    description:
      'A dispersed people speaking Romani, an Indo-Aryan language, who left north-western India around the end of the first millennium and migrated through Persia and Byzantine Anatolia into Europe, living everywhere as a minority and nowhere as a territorial nation. The shape traces the migration and then marks where communities are most numerous — not a territory, and never a majority population.',
    sources: [src('Fraser 1992, The Gypsies'), src('Matras 2015, The Romani Gypsies')],
    snapshots: [
      snap(ce(1000).year, poly([[66, 24], [70, 29], [74, 32], [78, 31], [77, 26], [72, 23], [68, 22], [66, 24]]), 'low', 'North-western Indian subcontinent, the homeland indicated by the Romani language; departure around the end of the first millennium.'),
      snap(ce(1200).year, poly([[40, 37], [46, 39], [53, 38], [60, 34], [58, 30], [50, 29], [44, 33], [40, 37]]), 'low', 'Transit through Persia, Armenia and the eastern Byzantine borderlands, recorded in the loanword layers of Romani.'),
      snap(ce(1350).year, poly([[21, 36], [26, 38], [32, 38], [38, 38], [41, 40], [36, 41], [28, 41], [23, 40], [21, 38], [21, 36]]), 'low', 'Byzantine Anatolia and Greece; Romani communities are attested in the Peloponnese, Corfu and Crete in the 14th century.'),
      snap(ce(1500).year, poly([[16, 39], [21, 38], [27, 40], [29, 44], [27, 48], [21, 49], [15, 47], [14, 43], [16, 39]]), 'low', 'The Balkans and Carpathian basin after the Ottoman advance; smaller groups reached western Europe from the early 15th century.'),
      snap(ce(2000).year, poly([[16, 40], [21, 39], [27, 41], [29, 44], [27, 48], [22, 49], [17, 48], [15, 44], [16, 40]]), 'low', 'The largest present-day communities: the Balkans and Carpathian basin (Romania, Bulgaria, Hungary, Slovakia, Serbia, North Macedonia). Romani live as minorities across all of Europe and beyond.'),
    ],
  },
];
