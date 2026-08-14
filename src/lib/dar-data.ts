export type DarItem = { name: string; area?: string; note: string; map?: string };
export type DarSection = { key: string; title: string; items: DarItem[] };

export const HOTELS: DarItem[] = [
  { name: "Serena Beach Resort", area: "Bahari Beach", note: "Beachfront five-star resort with lush gardens, spa and ocean-side dining.", map: "https://www.google.com/maps/search/?api=1&query=Serena+Beach+Resort+Dar+es+Salaam" },
  { name: "Giraffe Hotel", area: "Dar es Salaam", note: "Comfortable modern rooms with easy access to the city and the coast.", map: "https://www.google.com/maps/search/?api=1&query=Giraffe+Hotel+Dar+es+Salaam" },
  { name: "Best Western Jangwani Beach", area: "Jangwani Beach", note: "Reliable international-standard beach hotel close to the reception.", map: "https://www.google.com/maps/search/?api=1&query=Best+Western+Jangwani+Beach+Resort+Dar+es+Salaam" },
  { name: "Kunduchi Beach House", area: "Kunduchi", note: "Relaxed beach house stay with pool and direct access to the sand.", map: "https://www.google.com/maps/search/?api=1&query=Kunduchi+Beach+House+Dar+es+Salaam" },
  { name: "The Landmark", area: "Ubungo", note: "Contemporary hotel with spacious rooms and good conference facilities.", map: "https://www.google.com/maps/search/?api=1&query=Landmark+Hotel+Dar+es+Salaam" },
  { name: "Azure Coast Resort", area: "Bahari Beach", note: "Quiet coastal resort minutes from JC Hall Bahari Beach.", map: "https://www.google.com/maps/search/?api=1&query=Azure+Coast+Resort+Dar+es+Salaam" },
  { name: "Comfort Inn Mbezi Beach", area: "Mbezi Beach", note: "Affordable, friendly and convenient for the northern beach venues.", map: "https://www.google.com/maps/search/?api=1&query=Comfort+Inn+Mbezi+Beach+Dar+es+Salaam" },
  { name: "Jangwani Beach Hotel", area: "Jangwani Beach", note: "Seaside hotel with a laid-back atmosphere and ocean breeze.", map: "https://www.google.com/maps/search/?api=1&query=Jangwani+Beach+Hotel+Dar+es+Salaam" },
];

export const LOCAL_EATS: DarItem[] = [
  { name: "Rudys Farm", note: "Farm-to-table Tanzanian favourites in a green, relaxed setting.", map: "https://www.google.com/maps/search/?api=1&query=Rudys+Farm+Dar+es+Salaam" },
  { name: "Bara Beach", note: "Beachside grills, seafood and sunset views.", map: "https://www.google.com/maps/search/?api=1&query=Bara+Beach+Dar+es+Salaam" },
  { name: "Chefkile", note: "Popular local kitchen serving hearty Swahili dishes.", map: "https://www.google.com/maps/search/?api=1&query=Chefkile+Dar+es+Salaam" },
  { name: "Breakpoint", note: "Casual local spot for grills, snacks and good company.", map: "https://www.google.com/maps/search/?api=1&query=Breakpoint+Restaurant+Dar+es+Salaam" },
  { name: "Pantaleo", note: "Well-loved neighbourhood restaurant with generous Tanzanian plates.", map: "https://www.google.com/maps/search/?api=1&query=Pantaleo+Restaurant+Dar+es+Salaam" },
  { name: "Best Bite", note: "Quick, tasty local meals — a reliable everyday favourite.", map: "https://www.google.com/maps/search/?api=1&query=Best+Bite+Dar+es+Salaam" },
  { name: "Salad for Days", note: "Fresh salads, bowls and lighter healthy options.", map: "https://www.google.com/maps/search/?api=1&query=Salad+for+Days+Dar+es+Salaam" },
];

export const INTERNATIONAL_EATS: DarItem[] = [
  { name: "Moyo Family Steakhouse", note: "Premium steaks and grills in a warm, family-friendly setting.", map: "https://www.google.com/maps/search/?api=1&query=Moyo+Family+Steakhouse+Dar+es+Salaam" },
  { name: "Wafflys", note: "Sweet and savoury waffles, coffee and desserts.", map: "https://www.google.com/maps/search/?api=1&query=Wafflys+Dar+es+Salaam" },
  { name: "Fraiche", note: "Modern café and bistro — brunch, pastries and great coffee.", map: "https://www.google.com/maps/search/?api=1&query=Fraiche+Dar+es+Salaam" },
  { name: "Mediterraneo Restaurant", note: "Italian and Mediterranean dining right on the beach.", map: "https://www.google.com/maps/search/?api=1&query=Mediterraneo+Restaurant+Dar+es+Salaam" },
  { name: "Yami Food Restaurants", note: "International menu with Asian-inspired plates and quick service.", map: "https://www.google.com/maps/search/?api=1&query=Yami+Food+Dar+es+Salaam" },
  { name: "Grand Waves Beach House", note: "Beach house dining with seafood, cocktails and ocean views.", map: "https://www.google.com/maps/search/?api=1&query=Grand+Waves+Beach+House+Dar+es+Salaam" },
];

export const EATS: DarItem[] = [...LOCAL_EATS, ...INTERNATIONAL_EATS];

export const DAR_DO: DarItem[] = [
  { name: "Coco Beach (Oysterbay)", note: "Sunday afternoon strolls, street food and ocean breeze.", map: "https://www.google.com/maps/search/?api=1&query=Coco+Beach+Oysterbay+Dar+es+Salaam" },
  { name: "Kariakoo Market", note: "Vibrant local market — fabrics, spices, souvenirs. Go with a local if possible.", map: "https://www.google.com/maps/search/?api=1&query=Kariakoo+Market+Dar+es+Salaam" },
  { name: "Mwenge Wood Carvers Market", note: "Best place for Makonde carvings and authentic Tanzanian art.", map: "https://www.google.com/maps/search/?api=1&query=Mwenge+Wood+Carvers+Market+Dar+es+Salaam" },
  { name: "Bongoyo Island", note: "30-minute boat from Slipway — snorkeling, white sand and grilled seafood.", map: "https://www.google.com/maps/search/?api=1&query=Bongoyo+Island+Dar+es+Salaam" },
  { name: "Village Museum", note: "Open-air museum of traditional Tanzanian houses and culture.", map: "https://www.google.com/maps/search/?api=1&query=Village+Museum+Dar+es+Salaam" },
  { name: "National Museum & House of Culture", note: "History, archaeology, and the famous Olduvai fossils.", map: "https://www.google.com/maps/search/?api=1&query=National+Museum+Dar+es+Salaam" },
];

export type DarGroup = { title: string; places: string[] };

export const DAR_DO_GROUPS: DarGroup[] = [
  { title: "Visit Our Malls", places: ["Kunduchi Mall", "Mlimani City", "Dar Village Mall", "Vijana Mall", "City Mall", "GSM Mall", "The Slipway"] },
  { title: "Visit a Spa", places: ["Healing Beauty Spa", "The Body Melody Massage", "Elegance"] },
  { title: "Watch Movies", places: ["Mlimani City", "Dar Free Market", "Mkuki House"] },
  { title: "Family Entertainment", places: ["Kunduchi Wet 'n' Wild Water Park", "Waterworld", "Castle in the Sky", "Fun City"] },
  { title: "Visit the Beach", places: ["Giraffe", "White Sands", "Ledger Bahari Beach", "Bara Beach", "Kipepeo Beach", "The Landmark", "Ramada"] },
  { title: "Zoo", places: ["Dar Zoo"] },
];

export const ZANZIBAR: DarItem[] = [
  { name: "Stone Town", note: "UNESCO old town — narrow alleys, spice markets, Freddie Mercury's birthplace.", map: "https://www.google.com/maps/search/?api=1&query=Stone+Town+Zanzibar" },
  { name: "Nungwi & Kendwa Beaches", note: "Postcard white-sand beaches in the north — best for swimming and sunsets.", map: "https://www.google.com/maps/search/?api=1&query=Nungwi+Beach+Zanzibar" },
  { name: "Prison Island (Changuu)", note: "Short boat ride from Stone Town to meet the giant Aldabra tortoises.", map: "https://www.google.com/maps/search/?api=1&query=Prison+Island+Zanzibar" },
  { name: "Jozani Forest", note: "Spot the rare red colobus monkeys in their natural habitat.", map: "https://www.google.com/maps/search/?api=1&query=Jozani+Forest+Zanzibar" },
  { name: "Spice Tour", note: "Half-day tour of clove, cinnamon and vanilla plantations — Zanzibar's heritage.", map: "https://www.google.com/maps/search/?api=1&query=Spice+Tour+Zanzibar" },
  { name: "The Rock Restaurant", note: "Iconic restaurant perched on a rock in the ocean — book ahead.", map: "https://www.google.com/maps/search/?api=1&query=The+Rock+Restaurant+Zanzibar" },
];


export const DAR_SECTIONS: DarSection[] = [
  { key: "hotels", title: "Accommodation", items: HOTELS },
  { key: "eats", title: "Where to Eat", items: EATS },
  { key: "do", title: "Things to Do in Dar", items: DAR_DO },
  { key: "zanzibar", title: "Zanzibar", items: ZANZIBAR },
];

export function locationKey(sectionKey: string, itemName: string) {
  return `${sectionKey}::${itemName}`;
}
