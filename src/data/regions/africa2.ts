import type { HistoricalEntity } from '../../types';
import { bce, ce, poly, snap, src } from '../helpers';

/** Forest, Sahelian, Central, Swahili-coast and southern African states and cultures. */
export const AFRICA2_ENTITIES: HistoricalEntity[] = [
  {
    id: 'kerma',
    name: 'Kingdom of Kerma',
    category: 'kingdom',
    start: bce(2500),
    end: bce(1500),
    confidence: 'low',
    colour: '#b0803a',
    labelImportance: 2,
    successorIds: ['kingdom-of-kush'],
    description:
      'The earliest major Nubian state, centred on the city of Kerma on the upper Nile, a powerful rival of Middle Kingdom Egypt long before the later Kingdom of Kush.',
    sources: [src('Bonnet & Valbelle 2006, The Nubian Pharaohs')],
    snapshots: [
      snap(bce(1800).year, poly([[30, 18], [33, 20], [33.5, 22.5], [31.5, 22], [30, 20], [30, 18]]), 'low', 'Upper Nubia around Kerma, approximate.'),
    ],
  },
  {
    id: 'nok',
    name: 'Nok culture',
    category: 'archaeological-culture',
    start: bce(1500),
    end: ce(300),
    confidence: 'low',
    colour: '#8b8b5a',
    labelImportance: 2,
    description:
      'An early West African culture of central Nigeria, famous for its terracotta sculpture and among the earliest evidence of iron smelting in sub-Saharan Africa.',
    sources: [src('Breunig 2014, Nok: African Sculpture in Archaeological Context')],
    snapshots: [
      snap(bce(500).year, poly([[7, 8.5], [10, 9], [11, 11], [9, 11.5], [7, 10], [7, 8.5]]), 'low', 'Central Nigeria (Jos Plateau region), approximate.'),
    ],
  },
  {
    id: 'ife',
    name: 'Kingdom of Ife',
    alternativeNames: ['Ilé-Ifẹ̀'],
    category: 'city-state',
    start: ce(1000),
    end: ce(1420),
    confidence: 'low',
    colour: '#c99a4a',
    labelImportance: 2,
    description:
      'A Yoruba city-state of south-western Nigeria, a major urban, religious and artistic centre renowned for its naturalistic brass and terracotta heads, and a wellspring of Yoruba culture.',
    sources: [src('Drewal & Schildkrout 2009, Dynasty and Divinity: Ife Art in Ancient Nigeria')],
    snapshots: [
      snap(ce(1200).year, poly([[4, 7], [5.4, 7.1], [5.5, 8], [4.2, 8.1], [4, 7.5], [4, 7]]), 'low', 'Yoruba heartland around Ife, approximate.'),
    ],
  },
  {
    id: 'benin',
    name: 'Kingdom of Benin',
    category: 'kingdom',
    start: ce(1180),
    end: ce(1897),
    confidence: 'medium',
    colour: '#b0703a',
    labelImportance: 3,
    description:
      'A powerful Edo kingdom of southern Nigeria, famed for its walled capital and its magnificent brass and ivory art (the Benin Bronzes), destroyed and looted by a British expedition in 1897.',
    sources: [src('Bondarenko 2019, in The Oxford Encyclopedia of African History')],
    snapshots: [
      snap(ce(1500).year, poly([[4.5, 5.5], [7, 5.5], [7.5, 7.5], [6, 8], [4.5, 7], [4.5, 5.5]]), 'medium', 'Edo kingdom of Benin, approximate.'),
    ],
  },
  {
    id: 'oyo',
    name: 'Oyo Empire',
    category: 'empire',
    start: ce(1400),
    end: ce(1836),
    confidence: 'low',
    colour: '#c9a23a',
    labelImportance: 3,
    description:
      'A Yoruba empire of what is now south-western Nigeria and Benin, which grew powerful on cavalry and Atlantic trade before 19th-century collapse.',
    sources: [src('Law 1977, The Oyo Empire c. 1600–c. 1836')],
    snapshots: [
      snap(ce(1700).year, poly([[2.5, 6.5], [6, 6.5], [6.5, 9.5], [4, 10], [2.5, 8.5], [2.5, 6.5]]), 'low', 'Yoruba Oyo across the interior of the Bight of Benin, approximate.'),
    ],
  },
  {
    id: 'kanem-bornu',
    name: 'Kanem–Bornu Empire',
    category: 'empire',
    start: ce(700),
    end: ce(1900),
    confidence: 'low',
    colour: '#a8843a',
    labelImportance: 3,
    description:
      'A long-lived empire of the Lake Chad basin, controlling trans-Saharan trade routes for over a millennium, one of Africa’s most durable states and an early adopter of Islam.',
    sources: [src('Lange 1984, in General History of Africa, Vol. IV')],
    snapshots: [
      snap(ce(1200).year, poly([[12, 12], [17, 13], [19, 16], [16, 18], [12, 16], [11, 13], [12, 12]]), 'low', 'Lake Chad basin, approximate.'),
    ],
  },
  {
    id: 'asante',
    name: 'Asante Empire',
    alternativeNames: ['Ashanti'],
    category: 'empire',
    start: ce(1701),
    end: ce(1901),
    confidence: 'medium',
    colour: '#c9b03a',
    labelImportance: 3,
    description:
      'A wealthy and highly organised Akan empire of the West African forest (modern Ghana), built on gold and trade, which resisted the British in a series of wars before annexation.',
    sources: [src('Wilks 1975, Asante in the Nineteenth Century')],
    snapshots: [
      snap(ce(1820).year, poly([[-3.5, 5.5], [-0.5, 5.5], [0, 9], [-2, 10], [-4, 8], [-3.5, 5.5]]), 'medium', 'Akan forest empire of the Gold Coast interior, approximate.'),
    ],
  },
  {
    id: 'kongo',
    name: 'Kingdom of Kongo',
    category: 'kingdom',
    start: ce(1390),
    end: ce(1857),
    confidence: 'medium',
    colour: '#8a9a4a',
    labelImportance: 3,
    description:
      'A large Central African kingdom near the mouth of the Congo River whose kings adopted Christianity and traded with Portugal, before being ground down by the Atlantic slave trade and civil war.',
    sources: [src('Thornton 2020, A History of West Central Africa to 1850')],
    snapshots: [
      snap(ce(1550).year, poly([[12, -4], [16, -4.5], [17, -7], [15, -8.5], [12.5, -7], [12, -5.5], [12, -4]]), 'medium', 'Lower Congo region, approximate.'),
    ],
  },
  {
    id: 'solomonic-ethiopia',
    name: 'Solomonic Ethiopia',
    alternativeNames: ['Ethiopian Empire', 'Abyssinia'],
    category: 'empire',
    start: ce(1270),
    end: ce(1974),
    confidence: 'medium',
    colour: '#a86a3a',
    labelImportance: 4,
    predecessorIds: ['aksum'],
    description:
      'The Christian empire of the Ethiopian highlands under the Solomonic dynasty, which traced descent from Solomon and Sheba, uniquely preserved its independence through the age of European colonialism, and endured until 1974.',
    sources: [src('Marcus 1994, A History of Ethiopia')],
    snapshots: [
      snap(ce(1550).year, poly([[36, 6], [40, 7], [42, 11], [40, 14], [37, 14], [35, 10], [36, 6]]), 'medium', 'Ethiopian highlands, approximate.'),
    ],
  },
  {
    id: 'kilwa',
    name: 'Swahili city-states',
    alternativeNames: ['Kilwa', 'Swahili coast'],
    category: 'city-state',
    start: ce(900),
    end: ce(1500),
    confidence: 'low',
    colour: '#4a9a8a',
    labelImportance: 3,
    description:
      'A string of cosmopolitan Muslim trading cities along the East African coast (Kilwa, Mombasa, Zanzibar and others), which grew rich linking the African interior to the Indian Ocean world and developed the Swahili language and culture.',
    sources: [src('Horton & Middleton 2000, The Swahili')],
    snapshots: [
      snap(ce(1300).year, poly([[39, -2], [41, -3], [40.5, -9], [39.5, -11], [38.5, -8], [38.5, -3], [39, -2]]), 'low', 'East African Swahili coast, a string of city-states (schematic band).'),
    ],
  },
  {
    id: 'mutapa',
    name: 'Mutapa Empire',
    alternativeNames: ['Mwenemutapa', 'Monomotapa'],
    category: 'empire',
    start: ce(1430),
    end: ce(1760),
    confidence: 'low',
    colour: '#8a7a4a',
    labelImportance: 2,
    predecessorIds: ['great-zimbabwe'],
    description:
      'A southern African empire that succeeded Great Zimbabwe between the Zambezi and Limpopo, exporting gold to the Swahili coast and later entangled with the Portuguese.',
    sources: [src('Beach 1980, The Shona and Zimbabwe 900–1850')],
    snapshots: [
      snap(ce(1550).year, poly([[29, -15], [33, -15.5], [34, -18], [32, -19], [29.5, -18], [29, -16], [29, -15]]), 'low', 'Northern Zimbabwe plateau, approximate.'),
    ],
  },
  {
    id: 'zulu',
    name: 'Zulu Kingdom',
    category: 'kingdom',
    start: ce(1816),
    end: ce(1897),
    confidence: 'medium',
    colour: '#a85a4a',
    labelImportance: 3,
    successorIds: ['south-africa'],
    description:
      'A southern African kingdom forged by Shaka, whose military innovations made it a formidable power that famously defeated a British army at Isandlwana before its own conquest.',
    sources: [src('Laband 1995, Rope of Sand: The Rise and Fall of the Zulu Kingdom')],
    snapshots: [
      snap(ce(1830).year, poly([[30, -27], [32.5, -27.5], [33, -30], [31, -31], [29.5, -29.5], [30, -27]]), 'medium', 'South-eastern Africa (modern KwaZulu-Natal), approximate.'),
    ],
  },
];
