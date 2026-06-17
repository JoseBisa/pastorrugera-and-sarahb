export type DarItem = { name: string; area?: string; note: string; map?: string };
export type DarSection = { key: string; title: string; items: DarItem[] };

export const HOTELS: DarItem[] = [
  { name: "Hyatt Regency — The Kilimanjaro", area: "City Centre", note: "Five-star harbour-front hotel, walking distance to ferries.", map: "https://www.google.com/maps/search/?api=1&query=Hyatt+Regency+Dar+es+Salaam+The+Kilimanjaro" },
  { name: "Serena Hotel Dar es Salaam", area: "City Centre", note: "Elegant rooms with ocean views and a quiet garden pool.", map: "https://www.google.com/maps/search/?api=1&query=Serena+Hotel+Dar+es+Salaam" },
  { name: "Johari Rotana", area: "City Centre", note: "Modern luxury tower with rooftop bar overlooking the city.", map: "https://www.google.com/maps/search/?api=1&query=Johari+Rotana+Dar+es+Salaam" },
  { name: "Ramada Resort Dar es Salaam", area: "Bahari Beach", note: "Beach resort minutes from the reception venue (JC Hall).", map: "https://www.google.com/maps/search/?api=1&query=Ramada+Resort+Dar+es+Salaam+Bahari+Beach" },
  { name: "Sea Cliff Hotel", area: "Msasani Peninsula", note: "Clifftop hotel with ocean views, close to Masaki & restaurants.", map: "https://www.google.com/maps/search/?api=1&query=Sea+Cliff+Hotel+Dar+es+Salaam" },
  { name: "Slipway Hotel", area: "Masaki", note: "Boutique seaside hotel near shopping, dining and the church.", map: "https://www.google.com/maps/search/?api=1&query=Slipway+Hotel+Masaki+Dar+es+Salaam" },
];

export const EATS: DarItem[] = [
  { name: "The Slipway", note: "Waterfront dining village — seafood, Italian, sushi, sunset cocktails.", map: "https://www.google.com/maps/search/?api=1&query=The+Slipway+Masaki+Dar+es+Salaam" },
  { name: "Cape Town Fish Market", note: "Famous for fresh seafood platters with an ocean view.", map: "https://www.google.com/maps/search/?api=1&query=Cape+Town+Fish+Market+Dar+es+Salaam" },
  { name: "Akemi Revolving Restaurant", note: "21st-floor rotating restaurant — panoramic city and harbour views.", map: "https://www.google.com/maps/search/?api=1&query=Akemi+Revolving+Restaurant+Dar+es+Salaam" },
  { name: "Mamboz Corner BBQ", note: "Legendary roadside grill — Tanzanian BBQ at its best.", map: "https://www.google.com/maps/search/?api=1&query=Mamboz+Restaurant+Dar+es+Salaam" },
  { name: "Samaki Samaki", note: "Trendy local spot for grilled fish, swahili bites and cocktails.", map: "https://www.google.com/maps/search/?api=1&query=Samaki+Samaki+Oysterbay+Dar+es+Salaam" },
  { name: "Chops & Hops", note: "Relaxed Masaki gastropub — burgers, craft beer, live music nights.", map: "https://www.google.com/maps/search/?api=1&query=Chops+and+Hops+Masaki+Dar+es+Salaam" },
];

export const DAR_DO: DarItem[] = [
  { name: "Coco Beach (Oysterbay)", note: "Sunday afternoon strolls, street food and ocean breeze.", map: "https://www.google.com/maps/search/?api=1&query=Coco+Beach+Oysterbay+Dar+es+Salaam" },
  { name: "Kariakoo Market", note: "Vibrant local market — fabrics, spices, souvenirs. Go with a local if possible.", map: "https://www.google.com/maps/search/?api=1&query=Kariakoo+Market+Dar+es+Salaam" },
  { name: "Mwenge Wood Carvers Market", note: "Best place for Makonde carvings and authentic Tanzanian art.", map: "https://www.google.com/maps/search/?api=1&query=Mwenge+Wood+Carvers+Market+Dar+es+Salaam" },
  { name: "Bongoyo Island", note: "30-minute boat from Slipway — snorkeling, white sand and grilled seafood.", map: "https://www.google.com/maps/search/?api=1&query=Bongoyo+Island+Dar+es+Salaam" },
  { name: "Village Museum", note: "Open-air museum of traditional Tanzanian houses and culture.", map: "https://www.google.com/maps/search/?api=1&query=Village+Museum+Dar+es+Salaam" },
  { name: "National Museum & House of Culture", note: "History, archaeology, and the famous Olduvai fossils.", map: "https://www.google.com/maps/search/?api=1&query=National+Museum+Dar+es+Salaam" },
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
