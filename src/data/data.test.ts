import { describe, expect, it } from 'vitest';
import { ENTITIES, EVENTS, ENTITY_BY_ID, search } from './index';
import { resolveGeometry, listNaturalEarthCountries } from '../map/basemap';
import { activeEntitiesAt, snapshotPair } from '../history/engine';
import { hd } from '../history/date';
import { ce, bce } from './helpers';
import { geoArea, geoContains } from 'd3-geo';

/** Does the entity's dominant territory at `date` contain [lon,lat]? */
function covers(id: string, date: { year: number }, lon: number, lat: number): boolean {
  const entity = ENTITY_BY_ID.get(id)!;
  const { from, to, blend } = snapshotPair(entity, date);
  const geom = resolveGeometry((blend >= 0.5 ? to : from).geometry);
  return geoContains({ type: 'Feature', geometry: geom, properties: {} } as never, [lon, lat]);
}

describe('dataset integrity', () => {
  it('includes every required example entity', () => {
    const names = ENTITIES.map((e) => e.name.toLowerCase());
    const required = [
      'homo sapiens',
      'neanderthals',
      'sumer',
      'ancient egypt',
      'ptolemaic kingdom',
      'indus valley civilisation',
      'ancient greece',
      'celtic peoples',
      'achaemenid empire',
      'roman republic',
      'roman empire',
      'han china',
      'maya civilisation',
      'aztec empire',
      'inca empire',
      'haudenosaunee confederacy',
      'mali empire',
      'mongol empire',
      'ottoman empire',
      'holy roman empire',
      'kingdom of england',
      'united kingdom',
      'spain',
      // Regional detail modules
      'picts',
      'wessex',
      'mercia',
      'kingdom of gwynedd',
      'byzantine empire',
      'sasanian empire',
      'umayyad caliphate',
      'maurya empire',
      'tang dynasty',
      'qing dynasty',
      'mughal empire',
      'kingdom of kush',
      'songhai empire',
      'teotihuacan',
      // Historian-requested expansion
      'minoan civilisation',
      'mycenaean greece',
      'shang dynasty',
      'zhou dynasty',
      'qin dynasty',
      'yuan dynasty',
      'three kingdoms of korea',
      'joseon',
      'tokugawa shogunate',
      'chola empire',
      'delhi sultanate',
      'vijayanagara empire',
      'rashidun caliphate',
      'safavid empire',
      'seljuk empire',
      'srivijaya',
      'majapahit',
      'kingdom of benin',
      'kingdom of kongo',
      'caral',
      'moche culture',
      'wari empire',
      'toltec civilisation',
      'polynesian peoples',
      'lapita culture',
      'portuguese empire',
      'dutch empire',
      'habsburg monarchy',
      'russian empire',
      'soviet union',
      // British Isles detail (3000 BCE – 1900 CE)
      'neolithic britain',
      'caledonians',
      'brigantes',
      'iceni',
      'catuvellauni',
      'silures',
      'roman britain',
      'dumnonia',
      'rheged',
      'gododdin',
      'elmet',
      'kingdom of powys',
      'deheubarth',
      'kingdom of sussex',
      'kingdom of essex',
      'the danelaw',
      'kingdom of the isles',
      'earldom of orkney',
      'gaelic ireland',
      'ulaid',
      'kingdom of connacht',
      'kingdom of mide',
      'kingdom of leinster',
      'kingdom of munster',
      'kingdom of dublin',
      'lordship of ireland',
      'kingdom of ireland',
    ];
    for (const r of required) {
      expect(names.some((n) => n.includes(r))).toBe(true);
    }
    // At least one early agricultural culture and a colonial empire.
    expect(ENTITIES.some((e) => e.category === 'archaeological-culture')).toBe(true);
    expect(ENTITIES.some((e) => e.category === 'colonial-possession')).toBe(true);
    expect(ENTITIES.filter((e) => e.category === 'modern-state').length).toBeGreaterThanOrEqual(5);
  });

  it('has at least 40 events, all with sources', () => {
    expect(EVENTS.length).toBeGreaterThanOrEqual(40);
    for (const e of EVENTS) {
      expect(e.sources.length).toBeGreaterThanOrEqual(1);
      expect(e.importance).toBeGreaterThanOrEqual(1);
      expect(e.importance).toBeLessThanOrEqual(5);
    }
  });

  it('every entity has sources, ordered snapshots and resolvable geometry', () => {
    for (const e of ENTITIES) {
      expect(e.sources.length).toBeGreaterThanOrEqual(1);
      expect(e.snapshots.length).toBeGreaterThanOrEqual(1);
      for (let i = 1; i < e.snapshots.length; i++) {
        expect(e.snapshots[i].date.year).toBeGreaterThanOrEqual(e.snapshots[i - 1].date.year);
      }
      for (const s of e.snapshots) {
        const g = resolveGeometry(s.geometry);
        // Winding-normalised: area must be a sensible fraction of the sphere,
        // never the whole planet minus a hole (which would be > 2π).
        expect(geoArea(g as never)).toBeLessThan(Math.PI * 2);
        expect(geoArea(g as never)).toBeGreaterThan(0);
      }
    }
  });

  it('has unique entity ids and unique event ids across all modules', () => {
    const entityIds = ENTITIES.map((e) => e.id);
    expect(new Set(entityIds).size).toBe(entityIds.length);
    const eventIds = EVENTS.map((e) => e.id);
    expect(new Set(eventIds).size).toBe(eventIds.length);
  });

  it('models fine-grained territorial change for the ten key polygons', () => {
    const BRITAIN: [number, number] = [-1, 52]; // southern England
    // Roman Empire: no Britain under Augustus, Britain from the 1st c. CE, gone by 450.
    expect(covers('roman-empire', bce(27), ...BRITAIN)).toBe(false);
    expect(covers('roman-empire', ce(68), ...BRITAIN)).toBe(true);
    expect(covers('roman-empire', ce(117), ...BRITAIN)).toBe(true);
    expect(covers('roman-empire', ce(450), ...BRITAIN)).toBe(false);
    // Dacia (north of the lower Danube) only at the Trajanic peak.
    expect(covers('roman-empire', ce(117), 25, 46)).toBe(true);
    expect(covers('roman-empire', bce(27), 25, 46)).toBe(false);

    // Each of the ten has a genuinely fine-grained timeline (many snapshots).
    const KEY = [
      'roman-republic', 'roman-empire', 'byzantine-empire', 'achaemenid',
      'macedonian-empire', 'han-china', 'umayyad-caliphate', 'mongol-empire',
      'ottoman-empire', 'british-empire',
    ];
    for (const id of KEY) {
      const e = ENTITY_BY_ID.get(id)!;
      expect(e.snapshots.length).toBeGreaterThanOrEqual(4);
    }

    // Soviet Union: interwar borders exclude Riga, Lviv and Tuva; all three
    // are inside after the 1939–45 annexations, and Kaliningrad only post-war.
    expect(ENTITY_BY_ID.get('soviet-union')!.snapshots.length).toBeGreaterThanOrEqual(4);
    expect(covers('soviet-union', ce(1930), 24.1, 56.95)).toBe(false); // Riga
    expect(covers('soviet-union', ce(1960), 24.1, 56.95)).toBe(true);
    expect(covers('soviet-union', ce(1930), 24.03, 49.84)).toBe(false); // Lviv
    expect(covers('soviet-union', ce(1950), 24.03, 49.84)).toBe(true);
    expect(covers('soviet-union', ce(1930), 94.45, 51.72)).toBe(false); // Kyzyl (Tuva)
    expect(covers('soviet-union', ce(1960), 94.45, 51.72)).toBe(true);
    expect(covers('soviet-union', ce(1960), 20.5, 54.7)).toBe(true); // Kaliningrad
    expect(covers('soviet-union', ce(1930), 37.6, 55.75)).toBe(true); // Moscow, always
    expect(covers('soviet-union', ce(1960), 21.0, 52.23)).toBe(false); // Warsaw, never

    // European Union: tracks accessions (1995, 2004) and Brexit (2020).
    expect(ENTITY_BY_ID.get('european-union')!.snapshots.length).toBeGreaterThanOrEqual(8);
    expect(covers('european-union', ce(1994), 16.37, 48.21)).toBe(false); // Vienna
    expect(covers('european-union', ce(1996), 16.37, 48.21)).toBe(true);
    expect(covers('european-union', ce(2000), 21.0, 52.23)).toBe(false); // Warsaw
    expect(covers('european-union', ce(2010), 21.0, 52.23)).toBe(true);
    expect(covers('european-union', ce(2015), -0.12, 51.5)).toBe(true); // London
    expect(covers('european-union', ce(2022), -0.12, 51.5)).toBe(false);
    expect(covers('european-union', ce(2022), 2.35, 48.85)).toBe(true); // Paris, always

    // Germany: the Empire holds Alsace, northern Schleswig and the east;
    // Versailles strips all three but leaves the East Prussian exclave.
    expect(covers('germany', ce(1900), 7.75, 48.58)).toBe(true); // Strasbourg
    expect(covers('germany', ce(1930), 7.75, 48.58)).toBe(false);
    expect(covers('germany', ce(1900), 9.42, 55.04)).toBe(true); // Aabenraa (N Schleswig)
    expect(covers('germany', ce(1930), 9.42, 55.04)).toBe(false);
    expect(covers('germany', ce(1900), 16.93, 52.41)).toBe(true); // Poznań
    expect(covers('germany', ce(1930), 16.93, 52.41)).toBe(false);
    expect(covers('poland', ce(1930), 16.93, 52.41)).toBe(true);
    expect(covers('germany', ce(1900), 20.5, 54.72)).toBe(true); // Königsberg
    expect(covers('germany', ce(1930), 20.5, 54.72)).toBe(true); // exclave
    expect(covers('germany', ce(1900), 21.0, 52.23)).toBe(false); // Warsaw, never
    expect(covers('germany', ce(1900), 19.94, 50.06)).toBe(false); // Kraków (Austrian)

    // Cold-war Germany: the GDR and the Federal Republic tile the country.
    expect(covers('east-germany', ce(1970), 13.4, 52.4)).toBe(true); // (East) Berlin
    expect(covers('germany', ce(1970), 13.4, 52.4)).toBe(false);
    expect(covers('germany', ce(1970), 9.99, 53.55)).toBe(true); // Hamburg
    expect(covers('germany', ce(1970), 7.75, 48.58)).toBe(false); // Strasbourg, still French
    expect(covers('germany', ce(1970), 20.5, 54.72)).toBe(false); // Königsberg → Kaliningrad
    expect(covers('germany', ce(2000), 13.4, 52.4)).toBe(true); // reunified

    // Ottoman growth: tiny in 1300, spanning the Levant after Selim I (1520).
    expect(covers('ottoman-empire', ce(1300), 35, 33)).toBe(false); // Levant not yet
    expect(covers('ottoman-empire', ce(1550), 35, 33)).toBe(true);
    // British Empire: the thirteen colonies exist in 1763 but are gone by 1805.
    expect(covers('british-empire', ce(1763), -75, 40)).toBe(true);
    expect(covers('british-empire', ce(1805), -75, 40)).toBe(false);
  });

  it('models fine-grained territorial change in the British Isles', () => {
    // Roman Britain: London from the start; Edinburgh only during the brief
    // Antonine advance, not under Hadrian's frontier.
    expect(covers('roman-britain', ce(50), -0.1, 51.5)).toBe(true); // London
    expect(covers('roman-britain', ce(50), -3.19, 55.95)).toBe(false); // Edinburgh
    expect(covers('roman-britain', ce(130), -3.19, 55.95)).toBe(false);
    expect(covers('roman-britain', ce(146), -3.19, 55.95)).toBe(true); // Antonine Wall era
    expect(covers('roman-britain', ce(300), -3.19, 55.95)).toBe(false);

    // The Danelaw: York throughout, but Winchester never; East Anglia only
    // before the West Saxon reconquest.
    expect(covers('danelaw', ce(890), -1.08, 53.96)).toBe(true); // York
    expect(covers('danelaw', ce(890), -1.31, 51.06)).toBe(false); // Winchester
    expect(covers('danelaw', ce(890), 1.3, 52.63)).toBe(true); // Norwich
    expect(covers('danelaw', ce(945), 1.3, 52.63)).toBe(false);

    // Kingdom of England: Cumbria (Carlisle) only after 1092; Wales (Cardiff)
    // only after the Edwardian conquest.
    expect(covers('kingdom-of-england', ce(1000), -2.94, 54.9)).toBe(false); // Carlisle
    expect(covers('kingdom-of-england', ce(1150), -2.94, 54.9)).toBe(true);
    expect(covers('kingdom-of-england', ce(1000), -3.18, 51.48)).toBe(false); // Cardiff
    expect(covers('kingdom-of-england', ce(1550), -3.18, 51.48)).toBe(true);
    expect(covers('kingdom-of-england', ce(1000), -0.1, 51.5)).toBe(true); // London, always

    // Alba/Scotland: the Outer Hebrides only after the Treaty of Perth
    // (1266), Shetland only after the 1468–72 annexation.
    expect(covers('kingdom-of-alba', ce(1100), -6.39, 58.2)).toBe(false); // Stornoway
    expect(covers('kingdom-of-alba', ce(1290), -6.39, 58.2)).toBe(true);
    expect(covers('kingdom-of-alba', ce(1300), -1.15, 60.15)).toBe(false); // Lerwick
    expect(covers('kingdom-of-alba', ce(1500), -1.15, 60.15)).toBe(true);
    expect(covers('kingdom-of-alba', ce(1100), -3.19, 55.95)).toBe(true); // Edinburgh (Lothian, from 1018)

    // Lordship of Ireland: Cork under the 13th-century lordship, but outside
    // the 15th-century Pale; Dublin always.
    expect(covers('lordship-of-ireland', ce(1260), -8.47, 51.9)).toBe(true); // Cork
    expect(covers('lordship-of-ireland', ce(1440), -8.47, 51.9)).toBe(false);
    expect(covers('lordship-of-ireland', ce(1440), -6.26, 53.35)).toBe(true); // Dublin
  });

  it('gives the ten key empires’ modern successors fine-grained snapshots', () => {
    const KEY_SUCCESSORS = [
      'united-kingdom', 'italy', 'greece', 'turkey', 'iran', 'china-prc', 'saudi-arabia', 'mongolia',
    ];
    for (const id of KEY_SUCCESSORS) {
      expect(ENTITY_BY_ID.get(id), id).toBeDefined();
      expect(ENTITY_BY_ID.get(id)!.snapshots.length, id).toBeGreaterThanOrEqual(2);
    }

    // United Kingdom (British Empire successor): Ireland joins in 1801, the
    // south secedes in 1922; England is always in, the Republic never.
    const DUBLIN: [number, number] = [-6.26, 53.35];
    expect(covers('united-kingdom', ce(1707), ...DUBLIN)).toBe(false);
    expect(covers('united-kingdom', ce(1850), ...DUBLIN)).toBe(true);
    expect(covers('united-kingdom', ce(2010), ...DUBLIN)).toBe(false);
    expect(covers('united-kingdom', ce(1707), -1.5, 52)).toBe(true); // England, always
    expect(covers('united-kingdom', ce(2010), -5.93, 54.6)).toBe(true); // Belfast (N. Ireland)

    // Italy (Roman successor): Venetia (Padua) enters after 1861; Istria is
    // held after WWI but ceded by 2000.
    expect(covers('italy', ce(1861), 11.88, 45.41)).toBe(false); // Padua (Venetia)
    expect(covers('italy', ce(1925), 11.88, 45.41)).toBe(true);
    expect(covers('italy', ce(1925), 13.85, 44.87)).toBe(true); // Pula (Istria)
    expect(covers('italy', ce(2000), 13.85, 44.87)).toBe(false);

    // Greece (Byzantine/Macedonian successor): Thessaloniki (Macedonia) only
    // after the Balkan Wars; Athens always.
    expect(covers('greece', ce(1881), 22.94, 40.63)).toBe(false);
    expect(covers('greece', ce(1925), 22.94, 40.63)).toBe(true);
    expect(covers('greece', ce(1850), 23.72, 37.98)).toBe(true); // Athens

    // Turkey (Ottoman successor): Izmir Greek-held at Sèvres, restored by
    // Lausanne; Hatay only from 1939.
    expect(covers('turkey', ce(1920), 27.14, 38.42)).toBe(false); // Izmir
    expect(covers('turkey', ce(1925), 27.14, 38.42)).toBe(true);
    expect(covers('turkey', ce(1925), 36.16, 36.2)).toBe(false); // Hatay
    expect(covers('turkey', ce(1945), 36.16, 36.2)).toBe(true);

    // Iran (Achaemenid successor): the South Caucasus is Qajar in 1800, lost
    // by 1830; Tehran always.
    expect(covers('iran', ce(1800), 47, 41)).toBe(true);
    expect(covers('iran', ce(1830), 47, 41)).toBe(false);
    expect(covers('iran', ce(2000), 51.4, 35.7)).toBe(true); // Tehran

    // China (Han successor): Tibet is incorporated in 1951.
    expect(covers('china-prc', ce(1949), 91, 29.65)).toBe(false); // Lhasa
    expect(covers('china-prc', ce(1951), 91, 29.65)).toBe(true);
    expect(covers('china-prc', ce(1949), 116.4, 39.9)).toBe(true); // Beijing, always

    // Saudi Arabia (Umayyad successor): the Hejaz (Mecca) is added in 1925.
    expect(covers('saudi-arabia', ce(1913), 39.2, 21.5)).toBe(false); // Jeddah/Mecca
    expect(covers('saudi-arabia', ce(1926), 39.2, 21.5)).toBe(true);
    expect(covers('saudi-arabia', ce(1913), 46.7, 24.7)).toBe(true); // Riyadh, always
  });

  it('refines the Roman timelines and surrounds them with peripheral kingdoms', () => {
    // Finer temporal resolution for the three Roman states.
    expect(ENTITY_BY_ID.get('roman-republic')!.snapshots.length).toBeGreaterThanOrEqual(10);
    expect(ENTITY_BY_ID.get('roman-empire')!.snapshots.length).toBeGreaterThanOrEqual(8);
    expect(ENTITY_BY_ID.get('byzantine-empire')!.snapshots.length).toBeGreaterThanOrEqual(9);
    // The early Republic is a small Latium, not yet the whole peninsula.
    expect(covers('roman-republic', bce(509), 12.5, 41.9)).toBe(true); // Rome
    expect(covers('roman-republic', bce(509), 15.5, 40.7)).toBe(false); // Naples, not yet
    // Severan Mesopotamia (211 CE) is Roman; by the crisis (271) it is gone.
    expect(covers('roman-empire', ce(211), 43, 34)).toBe(true);
    expect(covers('roman-empire', ce(271), 43, 34)).toBe(false);
    // Gallia Narbonensis (Marseille, Nice) bridges Italy and the rest of
    // Gaul continuously from Caesar's conquest to the fall of the west —
    // no gap along the Riviera coast at any point in between.
    expect(covers('roman-republic', bce(44), 5.37, 43.3)).toBe(true); // Marseille
    expect(covers('roman-empire', ce(230), 5.37, 43.3)).toBe(true);
    expect(covers('roman-empire', ce(230), 7.27, 43.7)).toBe(true); // Nice
    expect(covers('roman-empire', ce(395), 5.37, 43.3)).toBe(true);

    // All the notable frontier peoples and kingdoms are present.
    const PERIPHERY = [
      'samnites', 'antigonid-macedon', 'kingdom-of-pergamon', 'kingdom-of-pontus', 'numidia',
      'kingdom-of-armenia', 'kingdom-of-dacia', 'huns', 'vandal-kingdom', 'ostrogothic-kingdom',
      'lombard-kingdom', 'frankish-kingdom', 'avar-khaganate', 'khazar-khaganate',
      'sultanate-of-rum', 'kingdom-of-jerusalem',
    ];
    for (const id of PERIPHERY) expect(ENTITY_BY_ID.get(id), id).toBeDefined();

    // Dacia sits north of the Danube before Trajan annexes it into the Empire.
    expect(covers('kingdom-of-dacia', ce(90), 24, 46)).toBe(true);
    expect(covers('roman-empire', ce(117), 24, 46)).toBe(true); // then Roman Dacia
    // Crusader Levant and Seljuk Anatolia flank Byzantium in the 12th–13th c.
    expect(covers('kingdom-of-jerusalem', ce(1140), 35.2, 32.5)).toBe(true);
    expect(covers('sultanate-of-rum', ce(1200), 34, 38.5)).toBe(true);
  });

  it('models fine-grained territorial change for the Holy Roman Empire', () => {
    // Nine snapshots trace the empire's real rise and contraction.
    expect(ENTITY_BY_ID.get('holy-roman-empire')!.snapshots.length).toBeGreaterThanOrEqual(8);

    // Milan (Kingdom of Italy): in from Otto I's 962 coronation, lost for
    // good after the Great Interregnum (1273).
    expect(covers('holy-roman-empire', ce(962), 9.19, 45.46)).toBe(true);
    expect(covers('holy-roman-empire', ce(1273), 9.19, 45.46)).toBe(false);

    // Lyon (Kingdom of Burgundy/Arles): outside until Conrad II's 1032
    // inheritance, lost with the rest of Burgundy by 1273.
    expect(covers('holy-roman-empire', ce(962), 4.83, 45.76)).toBe(false);
    expect(covers('holy-roman-empire', ce(1032), 4.83, 45.76)).toBe(true);
    expect(covers('holy-roman-empire', ce(1273), 4.83, 45.76)).toBe(false);

    // Zurich: formally excised by the Peace of Westphalia (1648), present before.
    expect(covers('holy-roman-empire', ce(1500), 8.54, 47.37)).toBe(true);
    expect(covers('holy-roman-empire', ce(1648), 8.54, 47.37)).toBe(false);

    // Amsterdam: joins with the Burgundian Netherlands (1500), leaves with
    // Dutch independence at Westphalia (1648).
    expect(covers('holy-roman-empire', ce(1500), 4.9, 52.37)).toBe(true);
    expect(covers('holy-roman-empire', ce(1648), 4.9, 52.37)).toBe(false);

    // Strasbourg: still imperial after Westphalia (1648), lost to France
    // with the rest of the left bank of the Rhine by 1801 (Lunéville).
    expect(covers('holy-roman-empire', ce(1648), 7.75, 48.58)).toBe(true);
    expect(covers('holy-roman-empire', ce(1801), 7.75, 48.58)).toBe(false);

    // Vienna: always within the empire's German-speaking core.
    expect(covers('holy-roman-empire', ce(1100), 16.37, 48.21)).toBe(true);
    expect(covers('holy-roman-empire', ce(1801), 16.37, 48.21)).toBe(true);

    // Constituent territories are present with multi-snapshot timelines.
    const HRE_TERRITORIES = [
      'duchy-of-saxony', 'duchy-of-bavaria', 'duchy-of-swabia', 'duchy-of-franconia',
      'duchy-of-austria', 'bohemia', 'brandenburg', 'kingdom-of-burgundy-arles',
      'teutonic-order-state', 'swiss-confederacy', 'hanseatic-league',
    ];
    for (const id of HRE_TERRITORIES) expect(ENTITY_BY_ID.get(id), id).toBeDefined();

    // Austria (Babenberg march, then Habsburg duchy): Vienna always, Munich never.
    expect(covers('duchy-of-austria', ce(1282), 16.37, 48.21)).toBe(true);
    expect(covers('duchy-of-austria', ce(1282), 11.58, 48.14)).toBe(false);

    // Bohemia: Prague always; Wrocław (Silesia) only after its 1335 absorption.
    expect(covers('bohemia', ce(1212), 14.42, 50.08)).toBe(true);
    expect(covers('bohemia', ce(1212), 17.03, 51.11)).toBe(false);
    expect(covers('bohemia', ce(1355), 17.03, 51.11)).toBe(true);

    // Swiss Confederacy: Zurich only after its 1351 accession (not in the
    // 1315 founding forest cantons); Geneva never (an ally, not a member).
    expect(covers('swiss-confederacy', ce(1315), 8.54, 47.37)).toBe(false);
    expect(covers('swiss-confederacy', ce(1499), 8.54, 47.37)).toBe(true);
    expect(covers('swiss-confederacy', ce(1648), 6.14, 46.2)).toBe(false);
  });

  it('fills the China 220-581 CE gap (Three Kingdoms to Northern & Southern Dynasties)', () => {
    // Each of the Three Kingdoms holds its own capital, 230 CE.
    expect(covers('cao-wei', ce(230), 112.5, 34.6)).toBe(true); // Luoyang
    expect(covers('shu-han', ce(230), 104, 30.7)).toBe(true); // Chengdu
    expect(covers('eastern-wu', ce(230), 118.8, 32.05)).toBe(true); // Nanjing (Jianye)

    // Jin briefly reunifies China (280), then loses the north and retreats
    // south of the Yangtze/Sichuan line (350).
    expect(covers('jin-dynasty-china', ce(280), 112.5, 34.6)).toBe(true); // Luoyang
    expect(covers('jin-dynasty-china', ce(350), 112.5, 34.6)).toBe(false);
    expect(covers('jin-dynasty-china', ce(350), 104, 30.7)).toBe(true); // Chengdu retained

    // Northern Wei reunifies the north in 439; Southern Dynasties hold the
    // Yangtze basin, losing Sichuan (but not Nanjing) by the Chen dynasty.
    expect(covers('northern-wei', ce(470), 112.5, 34.6)).toBe(true); // Luoyang
    expect(covers('southern-dynasties-china', ce(450), 104, 30.7)).toBe(true); // Chengdu (Liu Song)
    expect(covers('southern-dynasties-china', ce(570), 104, 30.7)).toBe(false); // lost by Chen
    expect(covers('southern-dynasties-china', ce(570), 118.8, 32.05)).toBe(true); // Nanjing held

    // The chain resolves: Han -> Three Kingdoms -> Jin -> Sui, unbroken.
    for (const id of ['cao-wei', 'shu-han', 'eastern-wu', 'jin-dynasty-china', 'northern-wei', 'southern-dynasties-china']) {
      expect(ENTITY_BY_ID.get(id), id).toBeDefined();
    }
  });

  it('fills the Korea 668-918 and Japan 710-1603 CE gaps', () => {
    // Unified Silla holds Gyeongju; Balhae holds the Manchurian north.
    expect(covers('unified-silla', ce(750), 129.2, 35.85)).toBe(true); // Gyeongju
    expect(covers('balhae', ce(800), 126.5, 43.8)).toBe(true); // Jilin area
    expect(ENTITY_BY_ID.get('unified-silla')).toBeDefined();
    expect(ENTITY_BY_ID.get('balhae')).toBeDefined();

    // Nara Japan pushes the Emishi frontier further north than Yamato did.
    expect(covers('yamato', ce(700), 140, 38)).toBe(false);
    expect(covers('nara-japan', ce(750), 140, 38)).toBe(true);
    // Kamakura itself is inside the Kamakura Shogunate's territory.
    expect(covers('kamakura-shogunate', ce(1250), 139.55, 35.32)).toBe(true);
    // The chain from Yamato to Tokugawa is unbroken.
    for (const id of ['nara-japan', 'heian-japan', 'kamakura-shogunate', 'muromachi-shogunate', 'azuchi-momoyama']) {
      expect(ENTITY_BY_ID.get(id), id).toBeDefined();
    }
  });

  it('gives Tang, Song and Qing China finer temporal and spatial resolution', () => {
    // Tang reaches Kashgar only at its Xuanzong-era height (750), lost after
    // the An Lushan Rebellion (800).
    expect(covers('tang-dynasty', ce(649), 76, 39.47)).toBe(false);
    expect(covers('tang-dynasty', ce(750), 76, 39.47)).toBe(true);
    expect(covers('tang-dynasty', ce(800), 76, 39.47)).toBe(false);

    // Northern Song holds Kaifeng; Southern Song loses it to the Jurchen
    // Jin in 1127 but keeps Hangzhou throughout.
    expect(covers('song-dynasty', ce(1050), 114.3, 34.8)).toBe(true); // Kaifeng
    expect(covers('song-dynasty', ce(1200), 114.3, 34.8)).toBe(false);
    expect(covers('song-dynasty', ce(1200), 120.2, 30.25)).toBe(true); // Hangzhou
    expect(covers('jin-dynasty-jurchen', ce(1150), 114.3, 34.8)).toBe(true); // Kaifeng
    expect(covers('jin-dynasty-jurchen', ce(1150), 120.2, 30.25)).toBe(false); // never Hangzhou
    expect(covers('liao-dynasty', ce(1000), 116.4, 39.9)).toBe(true); // Beijing (Yan-Yun)
    expect(covers('western-xia', ce(1150), 106.27, 38.47)).toBe(true); // Yinchuan

    // Qing loses Outer Manchuria (Vladivostok area) to Russia by 1900.
    expect(covers('qing-dynasty', ce(1760), 131.9, 43.1)).toBe(true);
    expect(covers('qing-dynasty', ce(1900), 131.9, 43.1)).toBe(false);

    for (const id of ['liao-dynasty', 'jin-dynasty-jurchen', 'western-xia']) expect(ENTITY_BY_ID.get(id), id).toBeDefined();
  });

  it('models the Southeast Asian gap-fillers and the Nam Tiến southward expansion', () => {
    // Funan -> Chenla -> Khmer Empire, and Sukhothai -> Ayutthaya resolve.
    for (const id of ['funan', 'chenla', 'sukhothai', 'lan-xang', 'malacca-sultanate']) {
      expect(ENTITY_BY_ID.get(id), id).toBeDefined();
    }
    expect(covers('sukhothai', ce(1300), 99.82, 17.02)).toBe(true); // Sukhothai city
    expect(covers('ayutthaya', ce(1370), 100.56, 14.35)).toBe(true); // Ayutthaya city
    expect(covers('lan-xang', ce(1550), 102.13, 19.89)).toBe(true); // Luang Prabang
    expect(covers('malacca-sultanate', ce(1480), 102.25, 2.19)).toBe(true); // Malacca city

    // Khmer Empire: founding core smaller than its Jayavarman VII height.
    expect(covers('khmer-empire', ce(900), 99.8, 17.0)).toBe(false);
    expect(covers('khmer-empire', ce(1200), 99.8, 17.0)).toBe(true);

    // Nam Tiến: Đại Việt's border creeps south from the Red River delta to
    // Huế (1306) to Qui Nhon (1500, after Champa's Vijaya falls) while
    // Champa correspondingly shrinks to, then loses, that same ground.
    expect(covers('dai-viet', ce(1010), 107.6, 16.47)).toBe(false); // Huế
    expect(covers('dai-viet', ce(1306), 107.6, 16.47)).toBe(true);
    expect(covers('champa', ce(1000), 109.22, 13.78)).toBe(true); // Qui Nhon (Vijaya)
    expect(covers('champa', ce(1500), 109.22, 13.78)).toBe(false);
    expect(covers('dai-viet', ce(1500), 109.22, 13.78)).toBe(true);
    expect(covers('champa', ce(1700), 108.99, 11.57)).toBe(true); // last rump at Phan Rang

    // Majapahit: East Java core throughout, Sumatra only claimed at its height.
    expect(covers('majapahit', ce(1293), 112.75, -7.26)).toBe(true); // Surabaya
    expect(covers('majapahit', ce(1293), 101, -1)).toBe(false);
    expect(covers('majapahit', ce(1360), 101, -1)).toBe(true);

    // Pagan contracts to its Irrawaddy core under Mongol pressure (1280).
    expect(ENTITY_BY_ID.get('pagan-kingdom')!.snapshots.length).toBeGreaterThanOrEqual(2);
  });

  it('untangles Babylonia into distinct dynasties and adds the missing Near Eastern civilisations', () => {
    // Old Babylonian Empire (Hammurabi) ends in 1595 BCE, handing off to
    // Kassite Babylon rather than lingering unchanged for 1355 years.
    expect(covers('akkad-babylon', bce(1750), 44.42, 32.54)).toBe(true); // Babylon
    expect(ENTITY_BY_ID.get('akkad-babylon')!.end.year).toBe(bce(1595).year);
    expect(covers('kassite-babylon', bce(1400), 44.42, 32.54)).toBe(true); // Babylon
    expect(covers('achaemenid', bce(540), 44.42, 32.54)).toBe(true); // Babylon, after Cyrus

    // The new civilisations resolve and cover their core cities.
    expect(covers('elam', bce(2000), 48.26, 32.19)).toBe(true); // Susa
    expect(covers('mitanni', bce(1400), 40, 36)).toBe(true);
    expect(covers('aram-damascus', bce(800), 36.3, 33.5)).toBe(true); // Damascus
    expect(covers('philistia', bce(1000), 34.57, 31.67)).toBe(true); // Ashkelon
    for (const id of ['elam', 'mitanni', 'aram-damascus', 'philistia', 'kassite-babylon']) {
      expect(ENTITY_BY_ID.get(id), id).toBeDefined();
    }
  });

  it('gives the ancient Near East and Egypt finer temporal and spatial resolution', () => {
    // Hittite Anatolia: Hattusa held from the Old Kingdom through the
    // Empire period to the eve of the Bronze Age collapse.
    expect(ENTITY_BY_ID.get('hittite-empire')!.snapshots.length).toBeGreaterThanOrEqual(3);
    expect(covers('hittite-empire', bce(1600), 34.61, 40.01)).toBe(true);
    expect(covers('hittite-empire', bce(1200), 34.61, 40.01)).toBe(true);

    // Neo-Assyria: Egypt (Memphis) is Assyrian only in the brief 671-663
    // BCE window opened by Esarhaddon's conquest.
    expect(ENTITY_BY_ID.get('neo-assyrian')!.snapshots.length).toBeGreaterThanOrEqual(4);
    expect(covers('neo-assyrian', bce(710), 31.25, 29.85)).toBe(false);
    expect(covers('neo-assyrian', bce(671), 31.25, 29.85)).toBe(true);
    expect(covers('neo-assyrian', bce(630), 31.25, 29.85)).toBe(false);

    // Neo-Babylon: Jerusalem is captured only after its 586 BCE destruction.
    expect(covers('neo-babylonian', bce(610), 35.22, 31.77)).toBe(false);
    expect(covers('neo-babylonian', bce(560), 35.22, 31.77)).toBe(true);

    // Seleucid decline: Bactra is held at Ipsus (301 BCE) but lost once
    // Bactria breaks away (c. 250 BCE); the empire ends a Syrian rump.
    expect(covers('seleucid-empire', bce(301), 66.9, 36.75)).toBe(true);
    expect(covers('seleucid-empire', bce(200), 66.9, 36.75)).toBe(false);
    expect(ENTITY_BY_ID.get('seleucid-empire')!.snapshots.length).toBeGreaterThanOrEqual(3);

    // Sasanian Persia: Ctesiphon is the capital throughout; Egypt
    // (Alexandria) is Sasanian only in Khosrow II's 614-28 peak.
    expect(covers('sassanid-empire', ce(240), 44.58, 33.09)).toBe(true); // Ctesiphon
    expect(covers('sassanid-empire', ce(500), 29.92, 31.2)).toBe(false); // Alexandria
    expect(covers('sassanid-empire', ce(620), 29.92, 31.2)).toBe(true);
    expect(ENTITY_BY_ID.get('sassanid-empire')!.snapshots.length).toBeGreaterThanOrEqual(3);

    // Carthage: Gades (Cadiz) in Iberia is held only after the Barcid
    // conquests of the 230s-220s BCE, not at the pre-Punic-War height.
    expect(covers('carthage', bce(264), -6.29, 36.53)).toBe(false);
    expect(covers('carthage', bce(220), -6.29, 36.53)).toBe(true);
    expect(ENTITY_BY_ID.get('carthage')!.snapshots.length).toBeGreaterThanOrEqual(3);

    // Egypt: the Middle Kingdom's Nubian fortress line at Buhen is held,
    // unlike the smaller Old Kingdom.
    expect(covers('ancient-egypt', bce(2600), 31, 21.9)).toBe(false);
    expect(covers('ancient-egypt', bce(1850), 31, 21.9)).toBe(true);
    expect(ENTITY_BY_ID.get('ancient-egypt')!.snapshots.length).toBeGreaterThanOrEqual(4);

    // Kush: Memphis (Egypt) is Kushite only during the 25th Dynasty
    // (715-663 BCE), not before or in the later Meroitic period.
    expect(covers('kingdom-of-kush', bce(900), 31.25, 29.85)).toBe(false);
    expect(covers('kingdom-of-kush', bce(715), 31.25, 29.85)).toBe(true);
    expect(covers('kingdom-of-kush', ce(100), 31.25, 29.85)).toBe(false);
    expect(ENTITY_BY_ID.get('kingdom-of-kush')!.snapshots.length).toBeGreaterThanOrEqual(3);
  });

  it('fills the post-Maurya and Deccan gaps in South Asia', () => {
    // Ashoka's conquest of Kalinga (261 BCE) is the defining Mauryan
    // territorial change; the Shungas hold the Gangetic core after 185 BCE.
    expect(covers('maurya-empire', bce(320), 85.8, 20.3)).toBe(false); // Kalinga
    expect(covers('maurya-empire', bce(250), 85.8, 20.3)).toBe(true);
    expect(covers('shunga-empire', bce(150), 85.1, 25.6)).toBe(true); // Pataliputra

    // The post-Maurya north-west: Indo-Greeks at Taxila, then Western
    // Kshatrapas (Sakas) at Ujjain, both previously unmapped.
    expect(covers('indo-greek-kingdom', bce(150), 72.8, 33.7)).toBe(true); // Taxila
    expect(covers('western-kshatrapas', ce(150), 75.8, 23.2)).toBe(true); // Ujjain
    expect(covers('gupta-empire', ce(380), 75.8, 23.2)).toBe(false); // Ujjain, pre-conquest
    expect(covers('gupta-empire', ce(420), 75.8, 23.2)).toBe(true); // after 415 CE

    // The Deccan, previously blank between Maurya and Chola/Vijayanagara:
    // Satavahana, then Chalukya, then Rashtrakuta hold the plateau in turn.
    expect(covers('satavahana-empire', bce(100), 75.4, 19.5)).toBe(true); // Paithan
    expect(covers('satavahana-empire', ce(150), 80.4, 16.6)).toBe(true); // Amaravati
    expect(covers('chalukya-empire', ce(650), 75.7, 15.9)).toBe(true); // Badami
    expect(covers('rashtrakuta-empire', ce(900), 77.1, 17.35)).toBe(true); // Manyakheta
    for (const id of [
      'shunga-empire', 'indo-greek-kingdom', 'western-kshatrapas', 'satavahana-empire',
      'harsha-empire', 'pallava-empire', 'chalukya-empire', 'rashtrakuta-empire',
    ]) {
      expect(ENTITY_BY_ID.get(id), id).toBeDefined();
    }

    // Harsha's short-lived reunification bridges Gupta to Pala at Kannauj;
    // Pallava bridges to Chola in the Tamil south.
    expect(covers('harsha-empire', ce(640), 79.9, 27.05)).toBe(true); // Kannauj
    expect(covers('pallava-empire', ce(650), 79.7, 12.8)).toBe(true); // Kanchipuram

    // Anuradhapura grows from the northern dry zone to the whole island.
    expect(covers('anuradhapura', bce(150), 80.6, 6.1)).toBe(false); // south coast
    expect(covers('anuradhapura', ce(500), 80.6, 6.1)).toBe(true);

    // Delhi Sultanate: Delhi always held; the Deccan only briefly, under
    // the Tughlaqs' over-extension.
    expect(covers('delhi-sultanate', ce(1236), 77.2, 28.6)).toBe(true); // Delhi
    expect(covers('delhi-sultanate', ce(1236), 76.5, 15.3)).toBe(false); // Hampi
    expect(covers('delhi-sultanate', ce(1330), 76.5, 15.3)).toBe(true);

    // Vijayanagara survives Talikota (1565) only in the far south.
    expect(covers('vijayanagara', ce(1570), 76.65, 12.3)).toBe(true); // Srirangapatna

    // The Maratha Confederacy grows from the Western Ghats to central India.
    expect(covers('maratha-confederacy', ce(1680), 73.9, 18.5)).toBe(true); // Pune
    expect(covers('maratha-confederacy', ce(1680), 79.1, 21.1)).toBe(false); // Nagpur
    expect(covers('maratha-confederacy', ce(1760), 79.1, 21.1)).toBe(true);

    // The Mughal Empire collapses to a Delhi-Agra rump after Aurangzeb.
    expect(covers('mughal-empire', ce(1700), 78.5, 17.4)).toBe(true); // Golconda
    expect(covers('mughal-empire', ce(1760), 78.5, 17.4)).toBe(false);
    expect(covers('mughal-empire', ce(1760), 77.2, 28.6)).toBe(true); // Delhi

    // Indus Valley: Mohenjo-daro is occupied through the mature phase, then
    // abandoned as the civilisation declines.
    expect(covers('indus-valley', bce(2500), 68.14, 27.32)).toBe(true);
    expect(covers('indus-valley', bce(1700), 68.14, 27.32)).toBe(false);
  });

  it('covers the top ~50 economies and top ~50 countries by area', () => {
    // Natural Earth names referenced by contemporary (2026) modern-state snapshots.
    const covered = new Set<string>();
    for (const e of ENTITIES) {
      if (e.category !== 'modern-state') continue;
      for (const s of e.snapshots) {
        if ('naturalEarthCountry' in s.geometry) covered.add(s.geometry.naturalEarthCountry);
        if ('naturalEarthCountries' in s.geometry) {
          for (const c of s.geometry.naturalEarthCountries) covered.add(c);
        }
      }
    }
    covered.add('__Singapore__'); // hand-drawn (absent from the 110m basemap)

    // Union of the two lists, as Natural Earth names.
    const required = [
      'United States of America', 'China', 'Germany', 'Japan', 'India', 'United Kingdom',
      'France', 'Italy', 'Brazil', 'Canada', 'Russia', 'Mexico', 'Australia', 'South Korea',
      'Spain', 'Indonesia', 'Netherlands', 'Turkey', 'Saudi Arabia', 'Switzerland', 'Poland',
      'Taiwan', 'Belgium', 'Argentina', 'Sweden', 'Ireland', 'Austria', 'Thailand', 'Israel',
      'United Arab Emirates', 'Norway', '__Singapore__', 'Philippines', 'Vietnam', 'Malaysia',
      'Bangladesh', 'Denmark', 'Iran', 'Egypt', 'South Africa', 'Colombia', 'Nigeria', 'Romania',
      'Chile', 'Czechia', 'Finland', 'Pakistan', 'Portugal', 'Kazakhstan', 'Peru',
      'Algeria', 'Dem. Rep. Congo', 'Sudan', 'Libya', 'Mongolia', 'Chad', 'Niger', 'Angola',
      'Mali', 'Ethiopia', 'Bolivia', 'Mauritania', 'Tanzania', 'Venezuela', 'Namibia',
      'Mozambique', 'Zambia', 'Myanmar', 'Afghanistan', 'S. Sudan', 'Somalia',
      'Central African Rep.', 'Ukraine', 'Madagascar', 'Botswana', 'Kenya', 'Yemen',
    ];
    const missing = required.filter((c) => !covered.has(c));
    expect(missing).toEqual([]);
  });

  it('covers every sovereign state in the Natural Earth basemap', () => {
    // Deliberately unfilled: dependent territories and disputed land.
    // Northern Cyprus appears only within pre-1974 Cyprus and Somaliland
    // within Somalia; Western Sahara is disputed territory.
    const NOT_SOVEREIGN = new Set([
      'Antarctica', 'Fr. S. Antarctic Lands', 'Falkland Is.', 'Greenland',
      'New Caledonia', 'Puerto Rico', 'W. Sahara', 'N. Cyprus',
    ]);
    const covered = new Set<string>();
    for (const e of ENTITIES) {
      if (e.category !== 'modern-state') continue;
      for (const s of e.snapshots) {
        if ('naturalEarthCountry' in s.geometry) covered.add(s.geometry.naturalEarthCountry);
        if ('naturalEarthCountries' in s.geometry) {
          for (const c of s.geometry.naturalEarthCountries) covered.add(c);
        }
      }
    }
    const missing = listNaturalEarthCountries().filter(
      (c) => !covered.has(c) && !NOT_SOVEREIGN.has(c),
    );
    expect(missing).toEqual([]);
  });

  it('modern states extend backwards with period-correct borders', () => {
    // Pakistan includes East Bengal (Dhaka) until Bangladesh secedes in 1971.
    expect(covers('pakistan', ce(1960), 90.4, 23.8)).toBe(true);
    expect(covers('pakistan', ce(1980), 90.4, 23.8)).toBe(false);
    // Sudan includes the south (Juba) until the 2011 secession.
    expect(covers('sudan', ce(1990), 31.6, 4.85)).toBe(true);
    expect(covers('sudan', ce(2015), 31.6, 4.85)).toBe(false);
    // Ethiopia includes Eritrea (Asmara) until 1993; then Eritrea stands alone.
    expect(covers('ethiopia', ce(1980), 38.9, 15.3)).toBe(true);
    expect(covers('ethiopia', ce(2000), 38.9, 15.3)).toBe(false);
    expect(covers('eritrea', ce(2000), 38.9, 15.3)).toBe(true);
    // Cyprus covers the whole island until the 1974 partition.
    expect(covers('cyprus', ce(1965), 33.6, 35.25)).toBe(true);
    expect(covers('cyprus', ce(2000), 33.6, 35.25)).toBe(false);
    // Yugoslavia holds Zagreb until 1991, then shrinks to Serbia and Montenegro.
    expect(covers('yugoslavia', ce(1980), 15.98, 45.81)).toBe(true);
    expect(covers('yugoslavia', ce(2000), 15.98, 45.81)).toBe(false);
    expect(covers('yugoslavia', ce(2000), 20.46, 44.8)).toBe(true);
    expect(covers('croatia', ce(2000), 15.98, 45.81)).toBe(true);
  });

  it('predecessor/successor ids resolve to real entities', () => {
    const ids = new Set(ENTITIES.map((e) => e.id));
    for (const e of ENTITIES) {
      for (const id of [...(e.predecessorIds ?? []), ...(e.successorIds ?? [])]) {
        expect(ids.has(id)).toBe(true);
      }
    }
  });

  it('search finds entities and events', () => {
    expect(search('rome').length).toBeGreaterThan(0);
    expect(search('mongol')[0].kind).toBe('entity');
    expect(search('black death').some((r) => r.kind === 'event')).toBe(true);
  });
});

describe('period transitions (broad eras all render something)', () => {
  const eras: { name: string; year: number }[] = [
    { name: 'deep prehistory', year: 1 - 120_000 },
    { name: 'neolithic', year: 1 - 5000 },
    { name: 'antiquity', year: 117 },
    { name: 'medieval', year: 1279 },
    { name: 'early modern', year: 1680 },
    { name: 'modern', year: 2020 },
  ];

  for (const era of eras) {
    it(`${era.name} has active entities`, () => {
      const active = activeEntitiesAt(ENTITIES, hd(era.year));
      expect(active.length).toBeGreaterThan(0);
    });
  }

  it('transitions smoothly across each era boundary (no empty map between eras)', () => {
    for (let i = 0; i < eras.length - 1; i++) {
      const a = eras[i].year;
      const b = eras[i + 1].year;
      const mid = hd((a + b) / 2);
      expect(activeEntitiesAt(ENTITIES, mid).length).toBeGreaterThan(0);
    }
  });
});
