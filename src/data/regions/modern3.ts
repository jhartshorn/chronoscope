import type { HistoricalEntity } from '../../types';
import { hd } from '../../history/date';
import { ce, snap, src } from '../helpers';
import { buildModernState, type MS } from './modernstates';

/**
 * The remaining contemporary sovereign states, completing the modern-day
 * map: together with `modernstates.ts`, `modern2.ts` and the core entities,
 * every country in the Natural Earth 110m basemap is now covered (enforced
 * by the completeness test in `data.test.ts`).
 *
 * `start` follows the file's convention — the year the state appeared with
 * (essentially) its current borders: independence or the last major border
 * change visible at basemap scale, with the remaining simplifications noted
 * in descriptions. Non-sovereign or largely unrecognised territories are
 * deliberately left unfilled: Antarctica, Greenland (Denmark), the Falkland
 * Islands, the French Southern Lands, New Caledonia (France), Puerto Rico
 * (US), Western Sahara (disputed), Northern Cyprus (shown only as part of
 * pre-1974 Cyprus) and Somaliland (unrecognised, shown as part of Somalia).
 */

/** Natural Earth names of the seven ex-Yugoslav territories in the basemap. */
const YUGOSLAVIA_UNION = [
  'Slovenia', 'Croatia', 'Bosnia and Herz.', 'Serbia', 'Kosovo', 'Montenegro', 'Macedonia',
];
/** The rump Federal Republic of Yugoslavia / State Union (1992–2006). */
const SERBIA_MONTENEGRO_UNION = ['Serbia', 'Kosovo', 'Montenegro'];

const TABLE: MS[] = [
  // ---- Europe
  { id: 'iceland', name: 'Iceland', ne: 'Iceland', start: 1944, colour: '#5a8ab0', label: 2, pred: ['norse-vikings', 'denmark'], desc: 'Iceland, settled by the Norse in the 9th century and under Norwegian then Danish rule for centuries; a sovereign kingdom in union with Denmark from 1918 and a fully independent republic from 1944. Contemporary boundary from Natural Earth.' },
  { id: 'luxembourg', name: 'Luxembourg', ne: 'Luxembourg', start: 1839, colour: '#6a7ab0', label: 2, desc: 'The Grand Duchy of Luxembourg, within its current borders since the 1839 Treaty of London (which ceded its larger western half to Belgium); its full independence was affirmed in 1867. Contemporary boundary from Natural Earth.' },
  { id: 'estonia', name: 'Estonia', ne: 'Estonia', start: 1991, colour: '#4a8aa0', label: 2, pred: ['soviet-union', 'russian-empire'], desc: 'Estonia, first independent 1918–1940, annexed by the USSR, and independent again from 1991 within slightly reduced borders. An EU and NATO member from 2004. Contemporary boundary from Natural Earth.' },
  { id: 'latvia', name: 'Latvia', ne: 'Latvia', start: 1991, colour: '#8a5a5a', label: 2, pred: ['soviet-union', 'russian-empire'], desc: 'Latvia, first independent 1918–1940, annexed by the USSR, and independent again from 1991 within slightly reduced borders. An EU and NATO member from 2004. Contemporary boundary from Natural Earth.' },
  { id: 'lithuania', name: 'Lithuania', ne: 'Lithuania', start: 1991, colour: '#7a8a4a', label: 2, pred: ['soviet-union', 'polish-lithuanian'], desc: 'Lithuania, heir to the medieval Grand Duchy; first independent 1918–1940 (without Vilnius, then Polish), annexed by the USSR, and independent again from 1991 with Vilnius as capital. An EU and NATO member from 2004. Contemporary boundary from Natural Earth.' },
  { id: 'belarus', name: 'Belarus', ne: 'Belarus', start: 1991, colour: '#6a8a6a', label: 3, pred: ['soviet-union', 'kievan-rus'], desc: 'Belarus, independent at the dissolution of the USSR in 1991, within borders drawn as the Byelorussian SSR. Contemporary boundary from Natural Earth.' },
  { id: 'moldova', name: 'Moldova', ne: 'Moldova', start: 1991, colour: '#9a7a5a', label: 2, pred: ['soviet-union'], desc: 'Moldova, independent at the dissolution of the USSR in 1991; historically Bessarabia, long contested between Romania and Russia. The breakaway region of Transnistria is not shown separately. Contemporary boundary from Natural Earth.' },
  { id: 'slovenia', name: 'Slovenia', ne: 'Slovenia', start: 1991, colour: '#5a9a8a', label: 2, pred: ['yugoslavia', 'habsburg-monarchy'], desc: 'Slovenia, independent from Yugoslavia in 1991 after the brief Ten-Day War; an EU member from 2004. Contemporary boundary from Natural Earth.' },
  { id: 'croatia', name: 'Croatia', ne: 'Croatia', start: 1991, colour: '#a86a5a', label: 2, pred: ['yugoslavia', 'habsburg-monarchy'], desc: 'Croatia, independent from Yugoslavia in 1991 after the war of 1991–95; an EU member from 2013. Contemporary boundary from Natural Earth.' },
  { id: 'bosnia-herzegovina', name: 'Bosnia and Herzegovina', ne: 'Bosnia and Herz.', start: 1992, colour: '#8a7a6a', label: 2, alt: ['Bosnia'], pred: ['yugoslavia', 'ottoman-empire'], desc: 'Bosnia and Herzegovina, independent from Yugoslavia in 1992; the Bosnian War (1992–95) ended with the Dayton Agreement, which preserved the state as a federation of two entities. Contemporary boundary from Natural Earth.' },
  { id: 'serbia', name: 'Serbia', ne: 'Serbia', start: 2006, colour: '#a05a4a', label: 3, pred: ['yugoslavia', 'serbian-empire'], desc: 'Serbia, the core of every Yugoslavia, standing alone since the State Union with Montenegro dissolved in 2006. Kosovo, which declared independence in 2008, is shown separately; Serbia does not recognise the secession. Contemporary boundary from Natural Earth.' },
  { id: 'montenegro', name: 'Montenegro', ne: 'Montenegro', start: 2006, colour: '#6a6a9a', label: 2, pred: ['yugoslavia', 'ottoman-empire'], desc: 'Montenegro, independent since the 2006 referendum dissolved the State Union with Serbia; a kingdom in its own right before 1918. Contemporary boundary from Natural Earth.' },
  { id: 'kosovo', name: 'Kosovo', ne: 'Kosovo', start: 2008, colour: '#9a8a5a', label: 2, conf: 'medium', pred: ['serbia', 'ottoman-empire'], desc: 'Kosovo, which declared independence from Serbia in 2008 after the 1998–99 war and a period of UN administration. It is recognised by about half of UN members; Serbia claims it as a province. Contemporary boundary from Natural Earth.' },
  { id: 'north-macedonia', name: 'North Macedonia', ne: 'Macedonia', start: 1991, colour: '#5a7a9a', label: 2, alt: ['Macedonia'], pred: ['yugoslavia', 'ottoman-empire'], desc: 'North Macedonia, independent from Yugoslavia in 1991; renamed from "Macedonia" in 2019 to settle the naming dispute with Greece. Contemporary boundary from Natural Earth.' },
  { id: 'cyprus', name: 'Cyprus', ne: 'Cyprus', start: 1960, colour: '#b09a4a', label: 2, pred: ['british-empire', 'ottoman-empire'], desc: 'The Republic of Cyprus, independent from Britain in 1960. Since the Turkish invasion of 1974 the island has been divided; the internationally unrecognised north is shown unfilled after 1974. An EU member from 2004. Contemporary boundary from Natural Earth.',
    snaps: [
      snap(1960, { naturalEarthCountries: ['Cyprus', 'N. Cyprus'] }, 'high', 'The whole island at independence (1960).'),
      snap(1974.5, { naturalEarthCountries: ['Cyprus', 'N. Cyprus'] }, 'high', 'Until the Turkish invasion (July–August 1974).'),
      snap(1974.7, { naturalEarthCountry: 'Cyprus' }, 'high', 'The area under the Republic’s control after the 1974 partition (Natural Earth); the north is left unfilled.'),
    ] },

  // ---- Caucasus & Central Asia (ex-Soviet, independent 1991)
  { id: 'georgia', name: 'Georgia', ne: 'Georgia', start: 1991, colour: '#a87a4a', label: 2, pred: ['soviet-union', 'russian-empire'], desc: 'Georgia, independent at the dissolution of the USSR in 1991; a united kingdom in the medieval Caucasus. The breakaway regions of Abkhazia and South Ossetia are not shown separately. Contemporary boundary from Natural Earth.' },
  { id: 'armenia', name: 'Armenia', ne: 'Armenia', start: 1991, colour: '#a05a6a', label: 2, pred: ['soviet-union', 'kingdom-of-armenia'], desc: 'Armenia, independent at the dissolution of the USSR in 1991 — a small remnant of a much older Armenian statehood. Contemporary boundary from Natural Earth.' },
  { id: 'azerbaijan', name: 'Azerbaijan', ne: 'Azerbaijan', start: 1991, colour: '#5a9a5a', label: 2, pred: ['soviet-union', 'russian-empire'], desc: 'Azerbaijan, independent at the dissolution of the USSR in 1991; it restored control over Nagorno-Karabakh in 2020–2023. Contemporary boundary from Natural Earth.' },
  { id: 'uzbekistan', name: 'Uzbekistan', ne: 'Uzbekistan', start: 1991, colour: '#4a9a9a', label: 3, pred: ['soviet-union', 'timurid'], desc: 'Uzbekistan, independent at the dissolution of the USSR in 1991, heir to the great Silk Road cities of Samarkand and Bukhara. Contemporary boundary from Natural Earth.' },
  { id: 'turkmenistan', name: 'Turkmenistan', ne: 'Turkmenistan', start: 1991, colour: '#9a8a4a', label: 3, pred: ['soviet-union'], desc: 'Turkmenistan, independent at the dissolution of the USSR in 1991. Contemporary boundary from Natural Earth.' },
  { id: 'kyrgyzstan', name: 'Kyrgyzstan', ne: 'Kyrgyzstan', start: 1991, colour: '#7a9a7a', label: 2, pred: ['soviet-union'], desc: 'Kyrgyzstan, independent at the dissolution of the USSR in 1991. Contemporary boundary from Natural Earth.' },
  { id: 'tajikistan', name: 'Tajikistan', ne: 'Tajikistan', start: 1991, colour: '#8a6a8a', label: 2, pred: ['soviet-union'], desc: 'Tajikistan, independent at the dissolution of the USSR in 1991. Contemporary boundary from Natural Earth.' },

  // ---- Middle East
  { id: 'iraq', name: 'Iraq', ne: 'Iraq', start: 1932, colour: '#8a7a3a', label: 3, pred: ['ottoman-empire', 'british-empire', 'abbasid-caliphate'], desc: 'Iraq, formed from three Ottoman provinces under a post-WWI British mandate and independent in 1932, on the ancient land of Mesopotamia. Contemporary boundary from Natural Earth.' },
  { id: 'syria', name: 'Syria', ne: 'Syria', start: 1946, colour: '#7a8a5a', label: 3, pred: ['ottoman-empire', 'french-colonial-empire'], desc: 'Syria, independent from the French mandate in 1946. The Golan Heights, occupied by Israel since 1967, are shown as Syrian per the Natural Earth boundary. Contemporary boundary from Natural Earth.' },
  { id: 'lebanon', name: 'Lebanon', ne: 'Lebanon', start: 1943, colour: '#a08a5a', label: 2, pred: ['ottoman-empire', 'french-colonial-empire', 'phoenicia'], desc: 'Lebanon, independent from the French mandate in 1943, within borders drawn as Greater Lebanon in 1920. Contemporary boundary from Natural Earth.' },
  { id: 'jordan', name: 'Jordan', ne: 'Jordan', start: 1946, colour: '#9a6a4a', label: 2, pred: ['ottoman-empire', 'british-empire', 'nabataean'], desc: 'Jordan, the Emirate of Transjordan under British mandate from 1921 and an independent kingdom from 1946; it held the West Bank 1948–1967. Contemporary boundary from Natural Earth.' },
  { id: 'palestine', name: 'Palestine', ne: 'Palestine', start: 1988, colour: '#6a8a4a', label: 2, conf: 'medium', pred: ['ottoman-empire', 'british-empire'], desc: 'The State of Palestine, declared in 1988 and recognised by most UN members, comprising the Israeli-occupied West Bank and Gaza (shown per the Natural Earth boundary); its final borders remain unresolved.' },
  { id: 'kuwait', name: 'Kuwait', ne: 'Kuwait', start: 1961, colour: '#5a8a8a', label: 2, pred: ['ottoman-empire', 'british-empire'], desc: 'Kuwait, a British protectorate from 1899 and independent in 1961; occupied by Iraq 1990–91 and restored by the Gulf War. Contemporary boundary from Natural Earth.' },
  { id: 'qatar', name: 'Qatar', ne: 'Qatar', start: 1971, colour: '#8a5a7a', label: 2, pred: ['ottoman-empire', 'british-empire'], desc: 'Qatar, a British protectorate from 1916 and independent in 1971. Contemporary boundary from Natural Earth.' },
  { id: 'oman', name: 'Oman', ne: 'Oman', start: 1650, colour: '#a8845a', label: 2, desc: 'The Sultanate of Oman, an independent state since the expulsion of the Portuguese in 1650 — once an empire reaching Zanzibar. Its land borders were only demarcated in the 20th century; the contemporary boundary is from Natural Earth.' },

  // ---- South, East & Southeast Asia and Oceania
  { id: 'nepal', name: 'Nepal', ne: 'Nepal', start: 1816, colour: '#a06a5a', label: 2, desc: 'Nepal, unified by the Gorkha kings from 1768 and confined to roughly its current Himalayan borders by the Treaty of Sugauli (1816) with British India; never colonised. Contemporary boundary from Natural Earth.' },
  { id: 'bhutan', name: 'Bhutan', ne: 'Bhutan', start: 1907, colour: '#8a7a5a', label: 2, desc: 'Bhutan, a Himalayan Buddhist state unified in the 17th century, ruled by the Wangchuck monarchy since 1907; never colonised. Contemporary boundary from Natural Earth.' },
  { id: 'sri-lanka', name: 'Sri Lanka', ne: 'Sri Lanka', start: 1948, colour: '#5a9a7a', label: 3, alt: ['Ceylon'], pred: ['british-empire', 'anuradhapura'], desc: 'Sri Lanka (Ceylon until 1972), independent from Britain in 1948 — an island whose recorded statehood reaches back over two millennia. Contemporary boundary from Natural Earth.' },
  { id: 'north-korea', name: 'North Korea', ne: 'North Korea', start: 1948, colour: '#7a5a5a', label: 3, alt: ['DPRK', "Democratic People's Republic of Korea"], pred: ['joseon'], desc: 'The Democratic People’s Republic of Korea, established in the Soviet occupation zone north of the 38th parallel in 1948; the demarcation line moved slightly to the 1953 armistice line. Contemporary boundary from Natural Earth.' },
  { id: 'cambodia', name: 'Cambodia', ne: 'Cambodia', start: 1953, colour: '#a07a3a', label: 3, pred: ['khmer-empire', 'french-colonial-empire'], desc: 'Cambodia, independent from France in 1953, heir to the Khmer Empire of Angkor. Contemporary boundary from Natural Earth.' },
  { id: 'laos', name: 'Laos', ne: 'Laos', start: 1953, colour: '#6a9a6a', label: 2, pred: ['french-colonial-empire', 'lan-xang'], desc: 'Laos, independent from France in 1953, successor to the kingdom of Lan Xang. Contemporary boundary from Natural Earth.' },
  { id: 'brunei', name: 'Brunei', ne: 'Brunei', start: 1984, colour: '#9a9a4a', label: 2, pred: ['british-empire'], desc: 'Brunei, a sultanate that once dominated Borneo’s coasts, a British protectorate from 1888 and fully independent in 1984. Contemporary boundary from Natural Earth.' },
  { id: 'timor-leste', name: 'Timor-Leste', ne: 'Timor-Leste', start: 2002, colour: '#a86a4a', label: 2, alt: ['East Timor'], pred: ['portuguese-empire', 'indonesia'], desc: 'Timor-Leste, a Portuguese colony until 1975, occupied by Indonesia 1975–1999, and independent in 2002 after a UN-supervised transition. Contemporary boundary from Natural Earth.' },
  { id: 'papua-new-guinea', name: 'Papua New Guinea', ne: 'Papua New Guinea', start: 1975, colour: '#7a9a4a', label: 3, pred: ['australia'], desc: 'Papua New Guinea, formed from German and British New Guinea under Australian administration, independent in 1975. Contemporary boundary from Natural Earth.' },
  { id: 'new-zealand', name: 'New Zealand', ne: 'New Zealand', start: 1907, colour: '#5a8a6a', label: 3, alt: ['Aotearoa'], pred: ['british-empire', 'maori'], desc: 'New Zealand, a British colony from the Treaty of Waitangi (1840) and a self-governing dominion from 1907, on islands settled by the Māori around 1300. Contemporary boundary from Natural Earth.' },
  { id: 'fiji', name: 'Fiji', ne: 'Fiji', start: 1970, colour: '#4a8a9a', label: 2, pred: ['british-empire', 'lapita'], desc: 'Fiji, independent from Britain in 1970. Contemporary boundary from Natural Earth.' },
  { id: 'solomon-islands', name: 'Solomon Islands', ne: 'Solomon Is.', start: 1978, colour: '#6a8a7a', label: 2, pred: ['british-empire', 'lapita'], desc: 'Solomon Islands, independent from Britain in 1978. Contemporary boundary from Natural Earth.' },
  { id: 'vanuatu', name: 'Vanuatu', ne: 'Vanuatu', start: 1980, colour: '#8a9a6a', label: 2, pred: ['british-empire', 'french-colonial-empire', 'lapita'], desc: 'Vanuatu, the Anglo-French condominium of the New Hebrides until independence in 1980. Contemporary boundary from Natural Earth.' },

  // ---- Africa
  { id: 'morocco', name: 'Morocco', ne: 'Morocco', start: 1956, colour: '#a05a3a', label: 3, pred: ['french-colonial-empire', 'al-andalus'], desc: 'Morocco, ruled by the Alaouite dynasty since the 17th century, a French and Spanish protectorate 1912–1956, and independent in 1956. Western Sahara, which it has occupied since 1975, is shown unfilled as disputed territory. Contemporary boundary from Natural Earth.' },
  { id: 'tunisia', name: 'Tunisia', ne: 'Tunisia', start: 1956, colour: '#5a7a8a', label: 3, pred: ['french-colonial-empire', 'ottoman-empire', 'carthage'], desc: 'Tunisia, independent from the French protectorate in 1956, on the ancient hinterland of Carthage. Contemporary boundary from Natural Earth.' },
  { id: 'ghana', name: 'Ghana', ne: 'Ghana', start: 1957, colour: '#9a7a3a', label: 3, alt: ['Gold Coast'], pred: ['british-empire', 'asante'], desc: 'Ghana, the first sub-Saharan colony to win independence (1957), formed from the Gold Coast and British Togoland; named for the medieval empire that lay further north-west. Contemporary boundary from Natural Earth.' },
  { id: 'guinea', name: 'Guinea', ne: 'Guinea', start: 1958, colour: '#7a8a3a', label: 2, pred: ['french-colonial-empire', 'mali-empire'], desc: 'Guinea, the only French African colony to vote for immediate independence in 1958. Contemporary boundary from Natural Earth.' },
  { id: 'senegal', name: 'Senegal', ne: 'Senegal', start: 1960, colour: '#5a9a4a', label: 2, pred: ['french-colonial-empire', 'mali-empire'], desc: 'Senegal, independent from France in 1960 after the brief Mali Federation. Contemporary boundary from Natural Earth.' },
  { id: 'cote-divoire', name: "Côte d'Ivoire", ne: "Côte d'Ivoire", start: 1960, colour: '#a8944a', label: 2, alt: ['Ivory Coast'], pred: ['french-colonial-empire'], desc: 'Côte d’Ivoire (Ivory Coast), independent from France in 1960. Contemporary boundary from Natural Earth.' },
  { id: 'benin-republic', name: 'Benin', ne: 'Benin', start: 1960, colour: '#8a6a3a', label: 2, alt: ['Dahomey'], pred: ['french-colonial-empire', 'oyo'], desc: 'Benin (Dahomey until 1975), independent from France in 1960 on the land of the historic Kingdom of Dahomey; named for the Bight of Benin, not the Benin Empire to its east. Contemporary boundary from Natural Earth.' },
  { id: 'togo', name: 'Togo', ne: 'Togo', start: 1960, colour: '#6a9a8a', label: 2, pred: ['french-colonial-empire'], desc: 'Togo, the eastern part of German Togoland under French mandate, independent in 1960. Contemporary boundary from Natural Earth.' },
  { id: 'burkina-faso', name: 'Burkina Faso', ne: 'Burkina Faso', start: 1960, colour: '#9a8a6a', label: 2, alt: ['Upper Volta'], pred: ['french-colonial-empire', 'mali-empire'], desc: 'Burkina Faso (Upper Volta until 1984), independent from France in 1960. Contemporary boundary from Natural Earth.' },
  { id: 'gambia', name: 'The Gambia', ne: 'Gambia', start: 1965, colour: '#7a7a4a', label: 2, alt: ['Gambia'], pred: ['british-empire', 'mali-empire'], desc: 'The Gambia, a sliver of British territory along the Gambia river inside French Senegal, independent in 1965. Contemporary boundary from Natural Earth.' },
  { id: 'sierra-leone', name: 'Sierra Leone', ne: 'Sierra Leone', start: 1961, colour: '#5a8a5a', label: 2, pred: ['british-empire'], desc: 'Sierra Leone, founded around Freetown as a settlement for freed slaves in 1787, independent from Britain in 1961. Contemporary boundary from Natural Earth.' },
  { id: 'liberia', name: 'Liberia', ne: 'Liberia', start: 1847, colour: '#4a7a9a', label: 2, desc: 'Liberia, founded from 1822 as a settlement for freed Black Americans and declared an independent republic in 1847 — Africa’s oldest modern republic, never colonised. Contemporary boundary from Natural Earth.' },
  { id: 'guinea-bissau', name: 'Guinea-Bissau', ne: 'Guinea-Bissau', start: 1974, colour: '#8a8a3a', label: 2, pred: ['portuguese-empire', 'mali-empire'], desc: 'Guinea-Bissau, independent from Portugal in 1974 after a long liberation war. Contemporary boundary from Natural Earth.' },
  { id: 'equatorial-guinea', name: 'Equatorial Guinea', ne: 'Eq. Guinea', start: 1968, colour: '#6a7a5a', label: 2, pred: ['spanish-empire'], desc: 'Equatorial Guinea, Spain’s main sub-Saharan colony, independent in 1968. Contemporary boundary from Natural Earth.' },
  { id: 'gabon', name: 'Gabon', ne: 'Gabon', start: 1960, colour: '#5a9a9a', label: 2, pred: ['french-colonial-empire'], desc: 'Gabon, independent from France in 1960. Contemporary boundary from Natural Earth.' },
  { id: 'congo-republic', name: 'Republic of the Congo', ne: 'Congo', start: 1960, colour: '#7a9a5a', label: 2, alt: ['Congo-Brazzaville'], pred: ['french-colonial-empire', 'kongo'], desc: 'The Republic of the Congo (Congo-Brazzaville), independent from France in 1960, on the northern lands of the old Kongo kingdom. Contemporary boundary from Natural Earth.' },
  { id: 'cameroon', name: 'Cameroon', ne: 'Cameroon', start: 1961, colour: '#8a9a3a', label: 2, pred: ['french-colonial-empire', 'british-empire'], desc: 'Cameroon, the former German Kamerun partitioned between France and Britain after WWI; the French part became independent in 1960 and gained its current borders when British Southern Cameroons joined in 1961. Contemporary boundary from Natural Earth.' },
  { id: 'uganda', name: 'Uganda', ne: 'Uganda', start: 1962, colour: '#a08a3a', label: 2, pred: ['british-empire'], desc: 'Uganda, built around the kingdom of Buganda as a British protectorate, independent in 1962. Contemporary boundary from Natural Earth.' },
  { id: 'rwanda', name: 'Rwanda', ne: 'Rwanda', start: 1962, colour: '#6a8a5a', label: 2, pred: ['belgian-empire'], desc: 'Rwanda, a centuries-old highland kingdom, under German then Belgian rule as part of Ruanda-Urundi, independent in 1962. Contemporary boundary from Natural Earth.' },
  { id: 'burundi', name: 'Burundi', ne: 'Burundi', start: 1962, colour: '#9a6a5a', label: 2, pred: ['belgian-empire'], desc: 'Burundi, a centuries-old highland kingdom, under German then Belgian rule as part of Ruanda-Urundi, independent in 1962. Contemporary boundary from Natural Earth.' },
  { id: 'malawi', name: 'Malawi', ne: 'Malawi', start: 1964, colour: '#5a8a7a', label: 2, alt: ['Nyasaland'], pred: ['british-empire'], desc: 'Malawi (Nyasaland), independent from Britain in 1964. Contemporary boundary from Natural Earth.' },
  { id: 'zimbabwe', name: 'Zimbabwe', ne: 'Zimbabwe', start: 1980, colour: '#8a7a4a', label: 3, alt: ['Rhodesia'], pred: ['british-empire', 'great-zimbabwe', 'mutapa'], desc: 'Zimbabwe, independent under majority rule in 1980 after the Rhodesian white-minority state (UDI 1965–79); named for the medieval city of Great Zimbabwe. Contemporary boundary from Natural Earth.' },
  { id: 'lesotho', name: 'Lesotho', ne: 'Lesotho', start: 1966, colour: '#6a6a8a', label: 2, alt: ['Basutoland'], pred: ['british-empire'], desc: 'Lesotho (Basutoland), the mountain kingdom founded by Moshoeshoe I, a British protectorate that escaped absorption into South Africa, independent in 1966. Contemporary boundary from Natural Earth.' },
  { id: 'eswatini', name: 'Eswatini', ne: 'eSwatini', start: 1968, colour: '#9a7a6a', label: 2, alt: ['Swaziland'], pred: ['british-empire', 'zulu'], desc: 'Eswatini (Swaziland until 2018), a Swazi kingdom under British protection, independent in 1968. Contemporary boundary from Natural Earth.' },
  { id: 'djibouti', name: 'Djibouti', ne: 'Djibouti', start: 1977, colour: '#a89a4a', label: 2, pred: ['french-colonial-empire'], desc: 'Djibouti, French Somaliland until independence in 1977, at the mouth of the Red Sea. Contemporary boundary from Natural Earth.' },
  { id: 'eritrea', name: 'Eritrea', ne: 'Eritrea', start: 1993, colour: '#a86a5a', label: 2, pred: ['ethiopia', 'solomonic-ethiopia'], desc: 'Eritrea, an Italian colony from 1890, federated with and then annexed by Ethiopia, and independent in 1993 after a thirty-year war. Contemporary boundary from Natural Earth.' },

  // ---- Americas
  { id: 'cuba', name: 'Cuba', ne: 'Cuba', start: 1902, colour: '#5a9a5f', label: 3, pred: ['spanish-empire', 'taino'], desc: 'Cuba, Spain’s last major American colony, independent in 1902 after the Spanish–American War. Contemporary boundary from Natural Earth.' },
  { id: 'haiti', name: 'Haiti', ne: 'Haiti', start: 1804, colour: '#7a6a4a', label: 3, pred: ['french-colonial-empire', 'taino'], desc: 'Haiti, born of the only successful slave revolution — independent from France in 1804, the first Black republic. It ruled the whole island 1822–1844; its current borders date from the Dominican separation. Contemporary boundary from Natural Earth.' },
  { id: 'dominican-republic', name: 'Dominican Republic', ne: 'Dominican Rep.', start: 1844, colour: '#4a8a8a', label: 2, pred: ['spanish-empire', 'haiti', 'taino'], desc: 'The Dominican Republic, independent from Haitian rule in 1844 on the Spanish-speaking east of Hispaniola. Contemporary boundary from Natural Earth.' },
  { id: 'jamaica', name: 'Jamaica', ne: 'Jamaica', start: 1962, colour: '#6a9a4a', label: 2, pred: ['british-empire', 'taino'], desc: 'Jamaica, independent from Britain in 1962. Contemporary boundary from Natural Earth.' },
  { id: 'bahamas', name: 'The Bahamas', ne: 'Bahamas', start: 1973, colour: '#4a9a9a', label: 2, alt: ['Bahamas'], pred: ['british-empire', 'taino'], desc: 'The Bahamas, independent from Britain in 1973 — the islands of Columbus’s first landfall in 1492. Contemporary boundary from Natural Earth.' },
  { id: 'trinidad-tobago', name: 'Trinidad and Tobago', ne: 'Trinidad and Tobago', start: 1962, colour: '#8a5a4a', label: 2, pred: ['british-empire', 'spanish-empire'], desc: 'Trinidad and Tobago, independent from Britain in 1962. Contemporary boundary from Natural Earth.' },
  { id: 'guatemala', name: 'Guatemala', ne: 'Guatemala', start: 1841, colour: '#5a9a6f', label: 2, pred: ['spanish-empire', 'maya'], desc: 'Guatemala, independent from Spain in 1821 and a sovereign republic since the Federal Republic of Central America broke up (1838–41); the Maya heartland. Contemporary boundary from Natural Earth.' },
  { id: 'el-salvador', name: 'El Salvador', ne: 'El Salvador', start: 1841, colour: '#6a8a9a', label: 2, pred: ['spanish-empire', 'maya'], desc: 'El Salvador, independent from Spain in 1821 and a sovereign republic since the Federal Republic of Central America broke up (1838–41). Contemporary boundary from Natural Earth.' },
  { id: 'honduras', name: 'Honduras', ne: 'Honduras', start: 1838, colour: '#7a9a8a', label: 2, pred: ['spanish-empire', 'maya'], desc: 'Honduras, independent from Spain in 1821 and a sovereign republic on leaving the Central American federation in 1838. Contemporary boundary from Natural Earth.' },
  { id: 'nicaragua', name: 'Nicaragua', ne: 'Nicaragua', start: 1838, colour: '#8a8a5f', label: 2, pred: ['spanish-empire'], desc: 'Nicaragua, independent from Spain in 1821 and a sovereign republic on leaving the Central American federation in 1838. Contemporary boundary from Natural Earth.' },
  { id: 'costa-rica', name: 'Costa Rica', ne: 'Costa Rica', start: 1838, colour: '#5a8a4f', label: 2, pred: ['spanish-empire'], desc: 'Costa Rica, independent from Spain in 1821 and a sovereign republic on leaving the Central American federation in 1838. Contemporary boundary from Natural Earth.' },
  { id: 'belize', name: 'Belize', ne: 'Belize', start: 1981, colour: '#4a8a6f', label: 2, alt: ['British Honduras'], pred: ['british-empire', 'maya'], desc: 'Belize (British Honduras), independent from Britain in 1981; Guatemala long claimed the territory. Contemporary boundary from Natural Earth.' },
  { id: 'panama', name: 'Panama', ne: 'Panama', start: 1903, colour: '#9a5a8a', label: 2, pred: ['colombia', 'spanish-empire'], desc: 'Panama, separated from Colombia in 1903 with US backing to allow the canal; the Canal Zone was under US control until 1979–1999. Contemporary boundary from Natural Earth.' },
  { id: 'ecuador', name: 'Ecuador', ne: 'Ecuador', start: 1830, colour: '#a87a5a', label: 3, pred: ['spanish-empire', 'inca-empire'], desc: 'Ecuador, independent from Spain in 1822 and a separate republic on leaving Gran Colombia in 1830. Its Amazonian boundary with Peru — long claimed much further east — was settled in 1942 and finally in 1998; the contemporary boundary is from Natural Earth.' },
  { id: 'paraguay', name: 'Paraguay', ne: 'Paraguay', start: 1811, colour: '#8a6a5f', label: 2, pred: ['spanish-empire'], desc: 'Paraguay, independent from Spain in 1811. It lost territory in the catastrophic War of the Triple Alliance (1864–70) and gained the Chaco in the Chaco War (1932–35); the contemporary boundary is from Natural Earth.' },
  { id: 'uruguay', name: 'Uruguay', ne: 'Uruguay', start: 1828, colour: '#5a7a9f', label: 2, pred: ['spanish-empire', 'portuguese-empire'], desc: 'Uruguay, established in 1828 as an independent buffer state between Brazil and Argentina after the Cisplatine War. Contemporary boundary from Natural Earth.' },
  { id: 'guyana', name: 'Guyana', ne: 'Guyana', start: 1966, colour: '#6a9a7f', label: 2, pred: ['british-empire', 'dutch-empire'], desc: 'Guyana (British Guiana), independent from Britain in 1966; Venezuela claims the Essequibo region west of the river. Contemporary boundary from Natural Earth.' },
  { id: 'suriname', name: 'Suriname', ne: 'Suriname', start: 1975, colour: '#7a8a6f', label: 2, pred: ['dutch-empire'], desc: 'Suriname (Dutch Guiana), independent from the Netherlands in 1975. Contemporary boundary from Natural Earth.' },
];

export const MODERN3_ENTITIES: HistoricalEntity[] = [
  ...TABLE.map(buildModernState),
  // Yugoslavia bridges the gap between the Habsburg/Ottoman Balkans and
  // today's successor states; shown as the union of their basemap polygons.
  {
    id: 'yugoslavia',
    name: 'Yugoslavia',
    alternativeNames: ['Kingdom of Yugoslavia', 'SFR Yugoslavia', 'Serbia and Montenegro'],
    category: 'modern-state',
    start: ce(1918),
    end: hd(2006.4),
    confidence: 'high',
    colour: '#7a6a9a',
    labelImportance: 3,
    fadeYears: 2,
    predecessorIds: ['habsburg-monarchy', 'ottoman-empire', 'serbian-empire'],
    successorIds: [
      'slovenia', 'croatia', 'bosnia-herzegovina', 'serbia', 'montenegro', 'north-macedonia', 'kosovo',
    ],
    description:
      'The state of the South Slavs: a kingdom from 1918, a socialist federation of six republics under Tito from 1945, torn apart by the secessions and wars of 1991–95. The rump Federal Republic (Serbia and Montenegro, renamed the State Union in 2003) carried the name and the map until Montenegro voted to leave in 2006.',
    sources: [
      src('Lampe 2000, Yugoslavia as History: Twice There Was a Country'),
      src('Natural Earth (public domain), union of the successor states'),
    ],
    snapshots: [
      snap(1930, { naturalEarthCountries: YUGOSLAVIA_UNION }, 'medium', 'The interwar kingdom, approximated as the union of its successor states; Istria and Zadar were Italian until 1947.'),
      snap(1991.4, { naturalEarthCountries: YUGOSLAVIA_UNION }, 'high', 'The socialist federation, until the secessions of 1991–92.'),
      snap(1992.3, { naturalEarthCountries: SERBIA_MONTENEGRO_UNION }, 'high', 'The rump Federal Republic of Yugoslavia — Serbia (with Kosovo) and Montenegro — from 2003 the State Union of Serbia and Montenegro, dissolved in June 2006.'),
    ],
  },
];
