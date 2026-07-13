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

## Further gaps (Africa, Islamic world, steppe)

Note: Mongol Empire (5 snapshots), Ottoman Empire (9 snapshots) and Byzantine
Empire (9 snapshots) were checked and are already well-modeled — not gaps.
`peoples.ts` entries (Germanic, Slavic, Turkic, Bantu, etc.) are deliberately
single-snapshot diffuse ranges by design, not gaps.

17. **Kingdom of Aksum, single-snapshot** — c. 100–940 CE. `africa.ts:26-42`.
    A single 350 CE snapshot for an 840-year trading empire that pioneered
    African Christianity and its own coinage; neither its rise nor its
    7th–10th century decline (as Islamic expansion cut off its Red Sea trade)
    is shown.

18. **West/Central African forest and coastal kingdoms, single-snapshot** —
    c. 1000–1901 CE. `africa2.ts:39-136` (Ife, Benin, Oyo, Asante, Kongo).
    Each of these major, centuries-long kingdoms — Benin's 700-year span,
    Kongo's Christian-era diplomacy with Portugal, Asante's gold-and-Atlantic-
    trade empire — gets exactly one schematic snapshot with no territorial
    arc.

19. **Uyghur Khaganate missing entirely** — 744–840 CE. No entity anywhere in
    the dataset. The Göktürks' steppe successor, a major Silk Road power and
    Tang China's key ally/rival, whose collapse scattered Uyghur populations
    into the Tarim Basin (the ancestral link to the modern Uyghur homeland),
    is currently invisible.

20. **Early steppe khaganates, single-snapshot** — Xiongnu (209 BCE–155 CE,
    `antiquity.ts:288-303`) and Göktürk Khaganate (552–744 CE, `islamic.ts`
    c. 143-159). Both are pivotal, centuries-long nomadic empires (the
    Xiongnu prompted the Great Wall and shaped Han foreign policy; the
    Göktürks controlled the Silk Road from Mongolia to the Caspian) reduced
    to one static blob each.

21. **Early Islamic caliphates/sultanates, single-snapshot** — 632–1517 CE.
    `islamic.ts:6-74` (Rashidun, Fatimid, Ayyubid, Mamluk). The Rashidun
    Caliphate's own description calls its conquest "swift" (Arabia to the
    Sasanian empire within a generation) yet it has one snapshot; the
    Fatimid, Ayyubid and Mamluk successor states likewise show no
    expansion/contraction despite well-documented territorial swings
    (Mamluks halting the Mongols, losing Egypt to the Ottomans in 1517).

22. **Seljuk Empire, single-snapshot** — 1037–1194 CE. `islamic.ts:75-91`.
    One 1090 snapshot for a Turco-Persian empire that swept from Central Asia
    to Anatolia and fractured into Anatolian, Syrian and Persian sultanates
    well before 1194 — none of that arc is modeled.

23. **Golden Horde, single-snapshot** — 1242–1502 CE. `islamic.ts:160-176`.
    One 1300 snapshot for 260 years spanning its height as ruler of the
    western steppe and tributary-taker from Russia, its 14th-century civil
    wars, and its slow fragmentation into the Crimean, Kazan, Astrakhan and
    Siberian khanates.

## Further gaps (Europe, Asia, modern states)

24. **Kingdom of Hungary flattened to one snapshot** — c. 1000–1918.
    `europe.ts:121-138`. 918 years, one 7-vertex polygon (1200 CE, Carpathian
    Basin). No Mongol devastation (1241), no post-Mohács (1526) split into
    Habsburg Royal Hungary / Ottoman Hungary / Transylvania, no Habsburg
    reconquest by 1699 — the central story of Ottoman-Habsburg contest in
    Central Europe is invisible.

25. **Venetian Republic flattened to one snapshot** — c. 697–1797.
    `europe.ts:155-176`. 1,100 years as a Mediterranean maritime power
    reduced to a single 1450 CE polygon. Misses the Stato da Màr's medieval
    build-out via the Fourth Crusade (1204), its peak, and the long
    Ottoman-driven contraction (loss of Cyprus 1571, Crete 1669, Morea 1715)
    before Napoleon ended the republic in 1797.

26. **Habsburg Monarchy flattened to one snapshot** — c. 1526–1918.
    `europe.ts:213-231`. One 1720 CE polygon for four centuries that saw the
    Pragmatic Sanction, Silesia's loss to Prussia (1740s), Napoleonic
    territorial upheaval, and the 1867 Ausgleich that split it into
    Austria-Hungary's dual structure.

27. **Sri Lanka has an ~800-year blank period** — c. 1017–1815.
    `southasia.ts:113-131`. Anuradhapura Kingdom ends at Chola conquest in
    1017 with no successor entity; Polonnaruwa (1055–1212) and the Kingdom of
    Kandy (1469–1815, the island's last independent state, which repelled
    Portuguese and Dutch colonizers for centuries) are entirely missing until
    the modern Sri Lanka entity presumably picks up near 1948.

28. **Tibet has no post-imperial coverage** — c. 842–1950. `eastasia.ts:199-217`.
    The Tibetan Empire entity is a single snapshot (618–842) with nothing
    after its collapse — the Sakya, Phagmodrupa, and Ganden Phodrang
    (Dalai Lama) polities that governed Tibet for the next millennium, up to
    Chinese annexation in 1950–51, don't exist.

29. **Pre-unification Italian peninsula fragmentation missing** —
    c. 1300–1861. No entities for the Papal States, Kingdom of Naples/Two
    Sicilies, Duchy of Savoy/Sardinia-Piedmont, Tuscany, or Milan anywhere in
    the dataset. Only Venice represents Italy before 1861; the peninsula's
    defining centuries-long political fragmentation (city-states, Papal
    temporal power, the Savoyard core of unification) is absent.

30. **Gran Colombia and Spanish-American independence-era transitional
    states missing** — c. 1819–1830s. Gran Colombia is mentioned only in
    Ecuador's description text (`modern3.ts:128`), never modeled as an
    entity — the short-lived republic uniting Venezuela, Colombia, Ecuador,
    and Panama under Bolívar, whose 1830 breakup created three of the
    region's modern borders, is invisible.

31. **Mexico's 1848 territorial loss is invisible** — c. 1821–2026.
    `entities.ts:1107-1124`. Single snapshot at the contemporary
    (post-1848) boundary; the entity's own note admits "1821 extent was far
    larger" — the Mexican Cession (Texas, California, the Southwest) ceded to
    the US after the 1846–48 war, roughly halving the country, isn't shown.

## Further gaps (Prussia, Balkans, Crusader states, Persia)

Note: Sassanid/Parthian Persia (3/2 snapshots), German states other than
Prussia (Bavaria/Saxony/Austria/Bohemia, all 3-4 snapshots), Japan
(Yamato/Nara/Heian/Kamakura/Muromachi/Tokugawa) and Korea (Three
Kingdoms/Goryeo/Unified Silla/Joseon) were checked and are already
well-modeled — not gaps.

32. **Kingdom of Prussia missing (1701–1871)** — `hre.ts:270-291`.
    Brandenburg's own entity ends in 1701 and jumps straight to
    `successorIds: ['germany']` (1871), skipping the 170 years in which
    Prussia actually became the great power that unified Germany — Frederick
    the Great's seizure of Silesia (1740s), the Napoleonic Wars, and
    Bismarck's wars of unification (1864/66/70-71) are all invisible.

33. **Second Bulgarian Empire missing entirely (1185–1396)** — no entity
    anywhere. `first-bulgarian-empire` (`europe.ts:104-118`) ends at
    Byzantine conquest in 1018, then nothing represents Bulgaria's
    restoration under the Asen dynasty, its 13th-century peak, or its fall to
    the Ottomans — a 200-year gap in a state that rivalled Byzantium twice.

34. **Medieval Croatia and Bosnia missing entirely** — no entities found.
    The independent medieval Kingdom of Croatia (c. 925–1102, later in union
    with Hungary) and the Banate/Kingdom of Bosnia (c. 1154–1463, including
    the distinctive Bosnian Church) have zero coverage before Ottoman
    conquest.

35. **Crusader states (Kingdom of Jerusalem), single-snapshot** —
    c. 1099–1291. `romeperiphery.ts:288-303`. One 1140 snapshot deliberately
    standing in for all Latin states, but it shows neither the 1099 conquest
    nor Saladin's catastrophic 1187 capture of Jerusalem after Hattin, after
    which the "kingdom" was just a shrinking coastal strip until Acre fell in
    1291 — the whole rise-Hattin-contraction arc is flattened to one static
    blob.

36. **Safavid Empire, single-snapshot** — c. 1501–1736. `islamic.ts:126-142`.
    One 1600 snapshot for 235 years bridging the early Islamic caliphates and
    modern Iran; no Abbas I's early-17th-century territorial peak or the
    empire's 18th-century collapse under Afghan invasion. Lower priority —
    the downstream `iran` entity (3 snapshots) already covers the
    Qajar-era contraction reasonably.
