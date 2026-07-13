# Data gaps

Biggest remaining gaps in `src/data/` coverage, identified after improving
medieval Europe/HRE, China/Korea/Japan/Southeast Asia, the Middle
East/Levant/Mesopotamia/Egypt, and the Indian subcontinent. Each is sized to
be its own task, following the `improve-data` skill workflow (survey →
research → author → validate → verify).

1. **Iberian Reconquista kingdoms (Castile, Aragon, León, Navarre)** — c. 722–1492.
   Al-Andalus exists on the Muslim side, but there is no Christian-kingdom
   entity at all. The entire 770-year Reconquista story, and the dynastic
   union that created Spain, is currently invisible.

2. **Medieval Scandinavia (Denmark, Norway, Sweden, Kalmar Union)** — c. 800–1523.
   Only the diffuse "Norse peoples" blob exists. None of the three kingdoms
   that actually formed (Danish unification under Harald Bluetooth, Norwegian
   unification, Swedish emergence, the 1397–1523 Kalmar Union) are modeled.
   Modern Sweden/Norway/Denmark entities only pick up in 1523/1849/1905.

3. **Russia's formation: Muscovy bridging Kievan Rus' to the Russian Empire** — c. 1240–1721.
   Kievan Rus' shatters in 1240 and its successorIds jump straight to the
   Russian Empire (1721). Golden Horde covers the Mongol overlordship, but
   none of the actual state-building — Novgorod Republic, the rise of the
   Grand Duchy of Moscow under Ivan III, Ivan IV becoming the first Tsar in
   1547 — is represented.

4. **Poland and Lithuania before their 1569 union** — The Polish-Lithuanian
   Commonwealth entity only starts in 1569. The Kingdom of Poland (from 966)
   and the Grand Duchy of Lithuania (from 1236, once the largest state in
   Europe) don't exist as separate entities before that.

5. **Central Asian Silk Road empires and post-Timurid khanates** — The
   Khwarezmian Empire (destroyed by Genghis Khan in 1219–21) has no entity at
   all, and nothing covers Central Asia after the Timurids collapse (1507)
   until Russian/Soviet annexation — missing the Khanates of Bukhara, Khiva,
   and Kokand.

6. **Pre-colonial Philippines** (Tondo, the Rajahnate of Cebu, the Sulu
   Sultanate) — currently zero indigenous-polity coverage before Spanish
   colonization.

## Further gaps (Africa, Americas, Oceania)

Identified in a follow-up survey: outside Europe/Middle East/Asia (recently
improved), almost every entity in `africa2.ts`, `americas.ts`, `americas2.ts`,
and `oceania.ts` has exactly one snapshot with 5–7 polygon vertices regardless
of lifespan — real rise-and-fall is invisible even for the largest
pre-Columbian and African empires.

7. **Aztec Empire** — c. 1428–1521. `entities.ts:584-603`. One snapshot
   (1500) shows only the tributary sphere at its peak — no founding-era
   Tenochtitlan, no expansion under Moctezuma I/Ahuitzotl, and no visible
   contraction during the Spanish conquest it names in its own `successorIds`.

8. **Inca Empire (Tawantinsuyu)** — c. 1438–1533. `entities.ts:605-624`.
   Single snapshot (1525) for the largest pre-Columbian American empire; none
   of Pachacuti's rapid 1438–1471 expansion or the 1525–33 succession-crisis
   fracture that Pizarro exploited is modeled.

9. **Maya civilisation** — c. 2000 BCE–1524 CE. `entities.ts:548-565`. A
   3,500-year span (Preclassic rise, Classic-period peak, the 9th-century
   collapse, Postclassic Yucatán survival to the Spanish conquest) is
   flattened into one Classic-period (700 CE) polygon.

10. **Mali Empire** — c. 1235–1670. `entities.ts:646-663`. One snapshot at
    Mansa Musa's 1337 peak; no rise from Sundiata's 1235 founding, and no
    depiction of the long 15th–17th-century decline as Songhai eclipsed it.

11. **West African Sahelian empires, low-resolution + Sokoto Caliphate
    missing** — c. 700–1903. `africa.ts:44-78` (Ghana, Songhai) and
    `africa2.ts:89-104` (Kanem-Bornu) are single-snapshot 6-7-vertex blobs.
    The Sokoto Caliphate (1804–1903), one of the largest 19th-century African
    states and the vehicle of the Fulani jihads, has no entity at all.

12. **Southern/East African kingdoms, single-snapshot** — c. 1000–1897.
    Great Zimbabwe, Kilwa, Mutapa, Solomonic Ethiopia, Zulu (`africa.ts:79-95`,
    `africa2.ts:138-207`) are each one schematic blob; none shows the Zulu
    Kingdom's explosive 1816–28 Shakan expansion or Ethiopia's centuries of
    territorial flux.

13. **Andean precursor civilisations, single-snapshot** — c. 3000 BCE–1470 CE.
    Caral, Moche, Nazca, Wari, Chimú, Tiwanaku (`americas.ts:72-88`,
    `americas2.ts:7-90`) each get one 5-7-vertex polygon despite centuries of
    expansion/collapse predating and shaping the Inca.

14. **Mesoamerican precursor civilisations, single-snapshot** —
    c. 1200 BCE–1521 CE. Olmec, Teotihuacan, Zapotec, Toltec, Mixtec
    (`americas.ts:7-55`, `americas2.ts:91-124`) are all one 5-6-vertex blob
    each — Teotihuacan's peak (pop. ~125,000) and abrupt 6th-century collapse
    are invisible.

15. **Major North American peoples missing** — c. 1500–1880s. Only Iroquois,
    Ancestral Puebloans, and Mississippian/Cahokia exist; the Comanche
    Empire, Apache bands, and Sioux/Lakota — dominant Plains/Southwest powers
    through the 17th–19th centuries — have no entities.

16. **Pacific/Oceania, single-snapshot across the board** — c. 1500 BCE–1898 CE.
    Lapita, Polynesian expansion, Tongan maritime empire, Hawaiian Kingdom,
    Māori, and all three Aboriginal Australian entries (`oceania.ts`) are one
    snapshot each; the Tongan Empire's 10th–15th-century reach and
    Kamehameha's 1795–1810 unification of Hawaii are entirely unmodeled.
