import type { HistoricalEntity } from '../../types';
import { bce, ce, poly, snap, src } from '../helpers';

/** Further Andean, Mesoamerican and North/South American cultures and states. */
export const AMERICAS2_ENTITIES: HistoricalEntity[] = [
  {
    id: 'caral',
    name: 'Caral–Supe civilisation',
    alternativeNames: ['Norte Chico'],
    category: 'civilisation',
    start: bce(3500),
    end: bce(1800),
    confidence: 'low',
    colour: '#b08a4a',
    labelImportance: 3,
    description:
      'The oldest known centre of civilisation in the Americas, on the central coast of Peru, contemporary with early Egypt and Sumer, with monumental platform mounds and sunken plazas but no pottery or (known) writing.',
    sources: [src('Shady & Leyva 2003, La Ciudad Sagrada de Caral-Supe')],
    snapshots: [
      snap(bce(2600).year, poly([[-78, -10], [-77, -10.2], [-77, -11.5], [-78, -11.3], [-78, -10]]), 'low', 'Norte Chico region of the central Peruvian coast, approximate.'),
    ],
  },
  {
    id: 'moche',
    name: 'Moche culture',
    category: 'archaeological-culture',
    start: ce(100),
    end: ce(800),
    confidence: 'low',
    colour: '#a8703a',
    labelImportance: 2,
    description:
      'A culture of the north coast of Peru known for its adobe pyramids (huacas), sophisticated irrigation and vivid ceramics depicting daily and ritual life.',
    sources: [src('Quilter 2002, in Journal of World Prehistory 16')],
    snapshots: [
      snap(ce(500).year, poly([[-80, -6], [-78.5, -6.2], [-78.5, -9], [-80, -8.8], [-80.5, -7.5], [-80, -6]]), 'low', 'North coast of Peru, approximate.'),
    ],
  },
  {
    id: 'nazca',
    name: 'Nazca culture',
    category: 'archaeological-culture',
    start: bce(100),
    end: ce(800),
    confidence: 'low',
    colour: '#9a8b4a',
    labelImportance: 1,
    description:
      'A culture of the arid south coast of Peru, famous for the enormous ground drawings (the Nazca Lines) and for its fine polychrome pottery and underground aqueducts.',
    sources: [src('Silverman & Proulx 2002, The Nasca')],
    snapshots: [
      snap(ce(300).year, poly([[-75.5, -13.5], [-74.5, -13.7], [-74.5, -15], [-75.8, -15], [-75.8, -14], [-75.5, -13.5]]), 'low', 'South coast of Peru, approximate.'),
    ],
  },
  {
    id: 'wari',
    name: 'Wari Empire',
    alternativeNames: ['Huari'],
    category: 'empire',
    start: ce(600),
    end: ce(1000),
    confidence: 'low',
    colour: '#b0864a',
    labelImportance: 3,
    description:
      'An Andean empire of the Peruvian highlands, often seen as a forerunner of Inca statecraft, which spread a network of administrative centres and roads across much of Peru.',
    sources: [src('Schreiber 1992, Wari Imperialism in Middle Horizon Peru')],
    snapshots: [
      snap(ce(800).year, poly([[-79, -8], [-75, -10], [-72, -14], [-74, -16], [-77, -14], [-79, -10], [-79, -8]]), 'low', 'Central Peruvian highlands and coast, approximate.'),
    ],
  },
  {
    id: 'chimu',
    name: 'Chimú Kingdom',
    alternativeNames: ['Chimor'],
    category: 'kingdom',
    start: ce(900),
    end: ce(1470),
    confidence: 'low',
    colour: '#c99a4a',
    labelImportance: 2,
    successorIds: ['inca-empire'],
    description:
      'The largest kingdom of the Andes before the Inca, on the north coast of Peru, ruled from the vast adobe city of Chan Chan until conquered and absorbed by the Inca.',
    sources: [src('Moore & Mackey 2008, in The Handbook of South American Archaeology')],
    snapshots: [
      snap(ce(1400).year, poly([[-81, -5], [-78.5, -6], [-78, -9], [-79.5, -10], [-81, -8], [-81.5, -6], [-81, -5]]), 'low', 'North coast of Peru, approximate.'),
    ],
  },
  {
    id: 'toltec',
    name: 'Toltec civilisation',
    category: 'civilisation',
    start: ce(900),
    end: ce(1168),
    confidence: 'low',
    colour: '#7a6ab0',
    labelImportance: 2,
    successorIds: ['aztec-empire'],
    description:
      'A Mesoamerican culture centred on Tula in central Mexico, remembered by the later Aztecs as a legendary golden age of artisans and warriors whose legacy they claimed.',
    sources: [src('Healan 2012, in Journal of Archaeological Research 20')],
    snapshots: [
      snap(ce(1050).year, poly([[-100, 19.5], [-98.5, 19.5], [-98.5, 21], [-100, 21], [-100, 19.5]]), 'low', 'Central Mexican highlands around Tula, approximate.'),
    ],
  },
  {
    id: 'mixtec',
    name: 'Mixtec civilisation',
    category: 'civilisation',
    start: ce(900),
    end: ce(1521),
    confidence: 'low',
    colour: '#6a9a5a',
    labelImportance: 1,
    description:
      'A Mesoamerican people of the Oaxaca highlands, renowned metalworkers and manuscript painters whose codices are among the few surviving pre-Columbian books; they later occupied Monte Albán.',
    sources: [src('Pohl 2003, in The Postclassic Mesoamerican World')],
    snapshots: [
      snap(ce(1300).year, poly([[-98, 16], [-96.5, 16.2], [-96.5, 18], [-98, 18], [-98.2, 17], [-98, 16]]), 'low', 'Mixteca of western Oaxaca, approximate.'),
    ],
  },
  {
    id: 'cahokia-polity',
    name: 'Cahokia',
    category: 'city-state',
    start: ce(1050),
    end: ce(1350),
    confidence: 'low',
    colour: '#8b7b5a',
    labelImportance: 2,
    parentEntityId: 'mississippian',
    description:
      'The largest pre-Columbian city north of Mexico, a Mississippian mound centre near modern St Louis whose great earthen pyramid (Monks Mound) anchored a regional polity. Shown as a distinct centre within the wider Mississippian world.',
    sources: [src('Pauketat 2009, Cahokia: Ancient America’s Great City on the Mississippi')],
    snapshots: [
      snap(ce(1150).year, poly([[-90.5, 38], [-89.5, 38], [-89.5, 39], [-90.5, 39], [-90.5, 38]]), 'low', 'American Bottom around Cahokia, approximate.'),
    ],
  },
  {
    id: 'muisca',
    name: 'Muisca Confederation',
    category: 'confederation',
    start: ce(800),
    end: ce(1540),
    confidence: 'low',
    colour: '#5a9a7a',
    labelImportance: 2,
    successorIds: ['spanish-empire'],
    description:
      'A confederation of chiefdoms in the highlands of modern Colombia, skilled goldsmiths whose ceremonies gave rise to the legend of El Dorado, conquered by the Spanish in the 1530s.',
    sources: [src('Francis 1993, in The Cambridge History of the Native Peoples of the Americas')],
    snapshots: [
      snap(ce(1500).year, poly([[-74.5, 4.5], [-73, 4.7], [-72.5, 6], [-73.5, 6.5], [-74.5, 5.5], [-74.5, 4.5]]), 'low', 'Eastern Colombian highlands around Bogotá, approximate.'),
    ],
  },
  {
    id: 'taino',
    name: 'Taíno peoples',
    category: 'people',
    start: ce(1200),
    end: ce(1550),
    confidence: 'low',
    colour: '#5a8a9a',
    labelImportance: 2,
    description:
      'The Arawakan-speaking peoples and chiefdoms of the Greater Antilles and Bahamas — the first Americans encountered by Columbus in 1492 — devastated within decades by conquest and disease.',
    sources: [src('Rouse 1992, The Tainos: Rise and Decline of the People Who Greeted Columbus')],
    snapshots: [
      snap(ce(1490).year, poly([[-78, 17.5], [-68, 17.5], [-65, 18.5], [-70, 20.5], [-77, 20], [-78, 18.5], [-78, 17.5]]), 'low', 'Greater Antilles (schematic band across the islands).'),
    ],
  },
  {
    id: 'mapuche',
    name: 'Mapuche peoples',
    alternativeNames: ['Araucanians'],
    category: 'people',
    start: ce(600),
    end: ce(2026),
    confidence: 'low',
    colour: '#7d8b5a',
    labelImportance: 2,
    description:
      'The Indigenous peoples of south-central Chile and adjacent Argentina, who resisted first the Inca and then, for over three centuries, Spanish and Chilean conquest — one of the longest sustained Indigenous resistances in the Americas.',
    sources: [src('Bengoa 2000, Historia del pueblo mapuche')],
    snapshots: [
      snap(ce(1500).year, poly([[-73.5, -37], [-71, -37], [-70.5, -41], [-73, -43], [-74, -40], [-73.5, -37]]), 'low', 'South-central Chile, approximate.'),
    ],
  },
];
