import type { HistoricalEntity } from '../../types';
import { ce, poly, snap, src } from '../helpers';

/**
 * Major North American peoples not covered elsewhere: the Comanche,
 * Apache and Sioux/Lakota, whose 17th-19th-century rise on the Plains and
 * in the Southwest — and displacement by US expansion — previously had no
 * representation alongside the existing Haudenosaunee, Ancestral Puebloans
 * and Mississippian entities. Extents are necessarily schematic ranges of
 * shifting bands and confederacies, not surveyed borders.
 */

export const NORTH_AMERICA_ENTITIES: HistoricalEntity[] = [
  {
    id: 'comanche-empire',
    name: 'Comanche Empire',
    alternativeNames: ['Comancheria', 'Nʉmʉnʉʉ'],
    category: 'empire',
    start: ce(1706),
    end: ce(1875),
    confidence: 'medium',
    colour: '#a8703a',
    labelImportance: 3,
    successorIds: ['usa'],
    description:
      'Splitting from the Shoshone on acquiring horses in the early 1700s, the Comanche built a powerful raiding and trading domain — "Comancheria" — across the southern Plains, displacing the Apache and, for over a century, checking Spanish, Mexican and Texan expansion. Quanah Parker’s Quahadi band, the last to hold out, surrendered at Fort Sill in 1875.',
    sources: [
      src('Hämäläinen 2008, The Comanche Empire'),
      src('Fehrenbach 1974, Comanches: The Destruction of a People'),
    ],
    snapshots: [
      snap(ce(1706).year, poly([[-105.5, 39.0], [-103.5, 39.2], [-103.3, 40.5], [-105.3, 40.3], [-105.5, 39.0]]), 'low', 'Early entry onto the Plains after splitting from the Shoshone, approximate.'),
      snap(ce(1750).year, poly([[-105.0, 33.5], [-102.0, 33.0], [-100.0, 34.5], [-101.0, 37.0], [-104.0, 37.5], [-105.5, 35.5], [-105.0, 33.5]]), 'low', 'The Comancheria core established across the Texas Panhandle and eastern New Mexico, displacing the Apache.'),
      snap(ce(1800).year, poly([[-106.0, 30.5], [-102.5, 29.0], [-99.0, 30.0], [-96.5, 33.0], [-96.0, 36.5], [-99.0, 38.5], [-103.0, 38.8], [-105.5, 36.0], [-106.5, 33.0], [-106.0, 30.5]]), 'medium', 'Peak reach across Texas, Oklahoma, Kansas and New Mexico.'),
      snap(ce(1850).year, poly([[-105.5, 31.0], [-102.0, 29.5], [-99.0, 31.0], [-97.5, 33.5], [-97.5, 36.0], [-100.0, 37.5], [-103.5, 37.8], [-105.5, 35.0], [-106.0, 32.5], [-105.5, 31.0]]), 'medium', 'Still vast, but under mounting pressure from Texan and American settlement.'),
      snap(ce(1875).year, poly([[-98.9, 34.4], [-98.0, 34.4], [-98.0, 35.0], [-98.9, 35.0], [-98.9, 34.4]]), 'high', 'Confined to the reservation around Fort Sill after Quanah Parker’s surrender ends the Red River War.'),
    ],
  },
  {
    id: 'apache',
    name: 'Apache bands',
    alternativeNames: ['Ndee', 'Chiricahua', 'Mescalero', 'Jicarilla', 'Lipan'],
    category: 'people',
    start: ce(1500),
    end: ce(1886),
    confidence: 'low',
    colour: '#8a6a4a',
    labelImportance: 2,
    successorIds: ['usa'],
    description:
      'Athabaskan-speaking bands (Chiricahua, Mescalero, Jicarilla, Lipan, Western Apache and others) ranging across the Southwest and, before Comanche pressure, the southern Plains as well. No single Apache nation ever existed; the bands shared language and culture while raiding and treating independently. Organised resistance under leaders such as Cochise and Geronimo ended with Geronimo’s 1886 surrender, the last major Native American military resistance in the United States.',
    sources: [
      src('Opler 1941, An Apache Life-Way'),
      src('Debo 1976, Geronimo: The Man, His Time, His Place'),
    ],
    snapshots: [
      snap(ce(1500).year, poly([[-112.0, 31.0], [-108.0, 29.5], [-104.0, 29.0], [-100.0, 31.5], [-100.5, 35.0], [-104.0, 37.0], [-109.0, 37.0], [-112.5, 35.0], [-112.0, 31.0]]), 'low', 'Wide range including the southern Plains, before Comanche expansion.'),
      snap(ce(1750).year, poly([[-112.0, 30.5], [-108.5, 29.5], [-105.5, 29.0], [-103.5, 31.5], [-104.5, 34.5], [-107.0, 37.0], [-110.5, 37.0], [-112.5, 34.0], [-112.0, 30.5]]), 'low', 'Pushed out of the Plains by the Comanche, concentrating in the Southwest and northern Mexico.'),
      snap(ce(1850).year, poly([[-111.5, 31.0], [-109.0, 30.0], [-106.0, 29.5], [-104.5, 32.0], [-105.0, 34.5], [-107.5, 36.5], [-110.0, 36.5], [-112.0, 33.5], [-111.5, 31.0]]), 'medium', 'Holding the mountain and desert Southwest against Mexican and American pressure.'),
      snap(ce(1886).year, poly([[-109.8, 31.8], [-109.0, 31.8], [-109.0, 32.5], [-109.8, 32.5], [-109.8, 31.8]]), 'high', 'Geronimo’s Chiricahua band, the last to hold out, surrenders near the Arizona–New Mexico border.'),
    ],
  },
  {
    id: 'sioux-lakota',
    name: 'Sioux / Lakota',
    alternativeNames: ['Očhéthi Šakówiŋ', 'Seven Council Fires', 'Dakota', 'Teton Sioux'],
    category: 'confederation',
    start: ce(1650),
    end: ce(1890),
    confidence: 'medium',
    colour: '#6a8a4a',
    labelImportance: 3,
    successorIds: ['usa'],
    description:
      'Originally Woodland peoples (Dakota/Santee) of Minnesota, driven onto the Plains from the later 17th century by Ojibwe armed with French guns. The westernmost Teton (Lakota) bands became dominant mounted Plains warriors, winning Red Cloud’s War (1866–68) and destroying Custer’s command at the Little Bighorn (1876) in defence of the Black Hills, before defeat and confinement to reservations culminated in the Wounded Knee Massacre (1890).',
    sources: [
      src('White 1978, in Journal of American History 65'),
      src('Hämäläinen 2019, Lakota America: A New History of Indigenous Power'),
    ],
    snapshots: [
      snap(ce(1650).year, poly([[-96.5, 43.5], [-93.5, 44.0], [-93.0, 46.5], [-96.0, 47.0], [-96.5, 43.5]]), 'low', 'Woodland homeland in what is now Minnesota, approximate.'),
      snap(ce(1750).year, poly([[-102.0, 43.0], [-97.0, 43.5], [-96.0, 46.5], [-100.0, 47.5], [-103.0, 45.5], [-102.0, 43.0]]), 'low', 'Driven onto the Plains by Ojibwe pressure, adopting the horse and moving into the Dakotas.'),
      snap(ce(1850).year, poly([[-106.0, 41.5], [-100.5, 42.0], [-97.5, 45.0], [-99.0, 48.0], [-104.0, 48.5], [-108.0, 45.5], [-106.0, 41.5]]), 'medium', 'Peak Plains dominance across the Dakotas, Wyoming, Montana and Nebraska, centred on the Black Hills and Powder River country.'),
      snap(ce(1876).year, poly([[-106.0, 42.5], [-101.5, 43.0], [-99.0, 45.5], [-100.0, 48.0], [-104.5, 48.5], [-108.0, 45.5], [-106.0, 42.5]]), 'high', 'The year of the Little Bighorn: still vast, though the 1874 Black Hills gold rush has already broken the 1868 Fort Laramie Treaty.'),
      snap(ce(1890).year, poly([[-103.0, 42.8], [-102.0, 42.8], [-102.0, 43.5], [-103.0, 43.5], [-103.0, 42.8]]), 'high', 'Confined to reservations (Pine Ridge and others) after the Wounded Knee Massacre ends organised Plains resistance.'),
    ],
  },
];
