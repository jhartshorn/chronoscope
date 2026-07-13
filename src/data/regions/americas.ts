import type { HistoricalEntity } from '../../types';
import { bce, ce, poly, snap, src } from '../helpers';

/** Pre-Columbian American civilisations and cultures beyond the Maya, Aztec and Inca. */
export const AMERICAS_ENTITIES: HistoricalEntity[] = [
  {
    id: 'olmec',
    name: 'Olmec civilisation',
    category: 'civilisation',
    start: bce(1500),
    end: bce(400),
    confidence: 'low',
    colour: '#5a8a6a',
    labelImportance: 2,
    description:
      'The earliest major Mesoamerican civilisation, of the Gulf coast lowlands, known for colossal stone heads and an influence on later Maya and Aztec cultures often described as “mother culture”.',
    sources: [src('Diehl 2004, The Olmecs: America’s First Civilization')],
    snapshots: [
      snap(bce(1200).year, poly([[-95.2, 17.4], [-94.3, 17.5], [-94.2, 18.1], [-95.1, 18.0], [-95.2, 17.4]]), 'low', 'Early San Lorenzo phase, in the western Gulf lowlands.'),
      snap(bce(900).year, poly([[-95, 17], [-93, 17.5], [-94, 19], [-96, 18.5], [-95, 17]]), 'low', 'La Venta phase peak across the Gulf-coast heartland, approximate.'),
      snap(bce(500).year, poly([[-95.5, 18.0], [-94.5, 18.2], [-94.3, 18.8], [-95.3, 18.7], [-95.5, 18.0]]), 'low', 'The later Tres Zapotes phase, contracted eastward before final decline.'),
    ],
  },
  {
    id: 'teotihuacan',
    name: 'Teotihuacan',
    category: 'civilisation',
    start: bce(100),
    end: ce(650),
    confidence: 'low',
    colour: '#7a6ab0',
    labelImportance: 2,
    description:
      'An urban civilisation and territorial polity centred on one of the largest cities of the ancient world, in the Valley of Mexico, whose pyramids and planned grid dominated Mesoamerica for centuries. Its rulers and language remain uncertain.',
    sources: [src('Cowgill 2015, Ancient Teotihuacan')],
    snapshots: [
      snap(bce(100).year, poly([[-99.0, 19.55], [-98.7, 19.55], [-98.7, 19.85], [-99.0, 19.85], [-99.0, 19.55]]), 'low', 'Early founding settlement.'),
      snap(ce(200).year, poly([[-99.3, 19.3], [-98.3, 19.3], [-98.3, 20.0], [-99.4, 20.0], [-99.3, 19.3]]), 'low', 'Rapid urban growth across the Teotihuacan valley.'),
      snap(ce(450).year, poly([[-99.5, 19], [-98, 19], [-98, 20.3], [-99.6, 20], [-99.5, 19]]), 'low', 'Peak population (perhaps 125,000) and territorial control of the Valley of Mexico, approximate.'),
      snap(ce(600).year, poly([[-99.0, 19.6], [-98.7, 19.6], [-98.7, 19.9], [-99.0, 19.9], [-99.0, 19.6]]), 'medium', 'The monumental core is burned and the city abruptly depopulates, c. 550–650 — one of Mesoamerica’s great unsolved collapses.'),
    ],
  },
  {
    id: 'zapotec',
    name: 'Zapotec civilisation',
    alternativeNames: ['Monte Albán'],
    category: 'civilisation',
    start: bce(500),
    end: ce(1521),
    confidence: 'low',
    colour: '#6a9a5a',
    labelImportance: 1,
    description:
      'A Mesoamerican civilisation of the Oaxaca valleys, centred on the hilltop city of Monte Albán, with one of the earliest writing systems in the Americas.',
    sources: [src('Marcus & Flannery 1996, Zapotec Civilization')],
    snapshots: [
      snap(bce(500).year, poly([[-96.9, 16.8], [-96.6, 16.8], [-96.5, 17.2], [-96.9, 17.2], [-96.9, 16.8]]), 'low', 'Founding of the hilltop capital, Monte Albán.'),
      snap(bce(100).year, poly([[-97.2, 16.3], [-96.2, 16.3], [-96.2, 17.3], [-97.2, 17.3], [-97.2, 16.3]]), 'low', 'Growth across the wider Oaxaca valley system.'),
      snap(ce(500).year, poly([[-97, 16], [-95, 16], [-95, 18], [-97, 17.5], [-97, 16]]), 'low', 'Classic-period peak across the Oaxaca valleys, approximate.'),
      snap(ce(800).year, poly([[-97, 16.2], [-95.5, 16.2], [-95.5, 17.8], [-97, 17.5], [-97, 16.2]]), 'low', 'Monte Albán is abandoned as a political capital (c. 750–800); power devolves toward smaller centres.'),
      snap(ce(1200).year, poly([[-96.9, 16.5], [-96.0, 16.5], [-96.0, 17.3], [-96.9, 17.3], [-96.9, 16.5]]), 'low', 'Fragmented into competing city-states (Zaachila, Mitla, Yagul) in the Oaxaca valley core.'),
      snap(ce(1487).year, poly([[-97.0, 16.0], [-95.5, 16.0], [-94.7, 16.3], [-95.0, 17.5], [-96.5, 17.8], [-97.0, 17.0], [-97.0, 16.0]]), 'medium', 'Zapotec lords under Cosijoeza extend to the Tehuantepec isthmus while resisting Aztec expansion, notably at the siege of Guiengola.'),
    ],
  },
  {
    id: 'chavin',
    name: 'Chavín culture',
    category: 'archaeological-culture',
    start: bce(900),
    end: bce(200),
    confidence: 'low',
    colour: '#8a7a4a',
    labelImportance: 1,
    description:
      'An influential early Andean religious and artistic tradition, named for the temple complex of Chavín de Huántar, that helped set the template for later Peruvian civilisations.',
    sources: [src('Burger 1992, Chavín and the Origins of Andean Civilization')],
    snapshots: [
      snap(bce(500).year, poly([[-79, -8], [-76, -9], [-75, -12], [-78, -12], [-79, -8]]), 'low', 'Northern-central Peruvian highlands and coast, approximate.'),
    ],
  },
  {
    id: 'tiwanaku',
    name: 'Tiwanaku',
    alternativeNames: ['Tiahuanaco'],
    category: 'civilisation',
    start: ce(300),
    end: ce(1000),
    confidence: 'low',
    colour: '#b08a4a',
    labelImportance: 2,
    description:
      'A major Andean state around Lake Titicaca, whose monumental capital and agricultural terracing sustained a wide highland sphere of influence long before the Inca. Colonies reached the Pacific coast and the Atacama and Cochabamba lowlands at its height, before a prolonged drought is thought to have driven its collapse around 1000.',
    sources: [src('Janusek 2008, Ancient Tiwanaku')],
    snapshots: [
      snap(ce(300).year, poly([[-69.3, -15.8], [-68.5, -15.8], [-68.4, -16.3], [-69.2, -16.3], [-69.3, -15.8]]), 'low', 'Early core on the southern shore of Lake Titicaca.'),
      snap(ce(600).year, poly([[-70, -15], [-67, -15], [-66, -18], [-69, -18], [-70, -15]]), 'low', 'Growing regional centre across the wider Titicaca basin, approximate.'),
      snap(ce(900).year, poly([[-71.0, -16.5], [-69.5, -14.5], [-67.0, -14.8], [-65.5, -17.0], [-66.5, -19.5], [-68.5, -23.0], [-70.0, -21.0], [-70.5, -18.0], [-71.0, -16.5]]), 'low', 'Peak reach: colonies extend to the Pacific coast (Moquegua), the Cochabamba lowlands and San Pedro de Atacama.'),
      snap(ce(1000).year, poly([[-70, -15], [-67, -15], [-66, -18], [-69, -18], [-70, -15]]), 'low', 'Contracted back to the Titicaca basin heartland as prolonged drought drives collapse and abandonment.'),
    ],
  },
  {
    id: 'mississippian',
    name: 'Mississippian culture',
    category: 'archaeological-culture',
    start: ce(800),
    end: ce(1600),
    confidence: 'low',
    colour: '#7d8b5a',
    labelImportance: 2,
    description:
      'A mound-building Native American culture of the North American Southeast and Mississippi valley, whose largest centre, Cahokia, was for a time larger than many European cities. A shared culture, not a single polity.',
    sources: [src('Pauketat 2009, Cahokia: Ancient America’s Great City on the Mississippi')],
    snapshots: [
      snap(ce(1100).year, poly([[-95, 32], [-88, 33], [-84, 35], [-88, 38], [-92, 37.5], [-95, 34], [-95, 32]]), 'low', 'Southeastern mound-building sphere, approximate; a cultural range.'),
    ],
  },
];
