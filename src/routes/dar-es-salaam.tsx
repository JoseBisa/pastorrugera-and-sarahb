import { createFileRoute } from "@tanstack/react-router";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { IMG } from "@/lib/wedding-data";
import { MapPin, Hotel, Car, Shield, Utensils, Sparkles, Palmtree } from "lucide-react";

export const Route = createFileRoute("/dar-es-salaam")({
  head: () => ({
    meta: [
      { title: "Visiting Dar es Salaam — Pastor Rugera & Sarah B" },
      { name: "description", content: "A traveler's guide to Dar es Salaam and Zanzibar for our wedding guests — accommodation, transport, food, safety and things to do." },
    ],
  }),
  component: DarGuide,
});

const HOTELS = [
  { name: "Hyatt Regency — The Kilimanjaro", area: "City Centre", note: "Five-star harbour-front hotel, walking distance to ferries.", map: "https://www.google.com/maps/search/?api=1&query=Hyatt+Regency+Dar+es+Salaam+The+Kilimanjaro" },
  { name: "Serena Hotel Dar es Salaam", area: "City Centre", note: "Elegant rooms with ocean views and a quiet garden pool.", map: "https://www.google.com/maps/search/?api=1&query=Serena+Hotel+Dar+es+Salaam" },
  { name: "Johari Rotana", area: "City Centre", note: "Modern luxury tower with rooftop bar overlooking the city.", map: "https://www.google.com/maps/search/?api=1&query=Johari+Rotana+Dar+es+Salaam" },
  { name: "Ramada Resort Dar es Salaam", area: "Bahari Beach", note: "Beach resort minutes from the reception venue (JC Hall).", map: "https://www.google.com/maps/search/?api=1&query=Ramada+Resort+Dar+es+Salaam+Bahari+Beach" },
  { name: "Sea Cliff Hotel", area: "Msasani Peninsula", note: "Clifftop hotel with ocean views, close to Masaki & restaurants.", map: "https://www.google.com/maps/search/?api=1&query=Sea+Cliff+Hotel+Dar+es+Salaam" },
  { name: "Slipway Hotel", area: "Masaki", note: "Boutique seaside hotel near shopping, dining and the church.", map: "https://www.google.com/maps/search/?api=1&query=Slipway+Hotel+Masaki+Dar+es+Salaam" },
];

const TRANSPORT = [
  { name: "Bolt", note: "Most reliable ride-hail app in Dar. Download before you arrive; pay cash or in-app." },
  { name: "Uber", note: "Available across the city. Coverage is best in Masaki, Oysterbay and the city centre." },
  { name: "Little Cab", note: "Pan-East-African ride app, a solid backup when Bolt/Uber are busy." },
  { name: "Faras", note: "Local ride-hail app, often cheaper for short hops within the city." },
  { name: "Hotel taxis", note: "Pre-arrange airport pickups through your hotel — fixed price, English-speaking drivers." },
  { name: "Bajaj / Tuk-tuks", note: "Fine for short distances. Always agree the fare before getting in." },
];

const EATS = [
  { name: "The Slipway", note: "Waterfront dining village — seafood, Italian, sushi, sunset cocktails.", map: "https://www.google.com/maps/search/?api=1&query=The+Slipway+Masaki+Dar+es+Salaam" },
  { name: "Cape Town Fish Market", note: "Famous for fresh seafood platters with an ocean view.", map: "https://www.google.com/maps/search/?api=1&query=Cape+Town+Fish+Market+Dar+es+Salaam" },
  { name: "Akemi Revolving Restaurant", note: "21st-floor rotating restaurant — panoramic city and harbour views.", map: "https://www.google.com/maps/search/?api=1&query=Akemi+Revolving+Restaurant+Dar+es+Salaam" },
  { name: "Mamboz Corner BBQ", note: "Legendary roadside grill — Tanzanian BBQ at its best.", map: "https://www.google.com/maps/search/?api=1&query=Mamboz+Restaurant+Dar+es+Salaam" },
  { name: "Samaki Samaki", note: "Trendy local spot for grilled fish, swahili bites and cocktails.", map: "https://www.google.com/maps/search/?api=1&query=Samaki+Samaki+Oysterbay+Dar+es+Salaam" },
  { name: "Chops & Hops", note: "Relaxed Masaki gastropub — burgers, craft beer, live music nights.", map: "https://www.google.com/maps/search/?api=1&query=Chops+and+Hops+Masaki+Dar+es+Salaam" },
];

const DAR_DO = [
  { name: "Coco Beach (Oysterbay)", note: "Sunday afternoon strolls, street food and ocean breeze.", map: "https://www.google.com/maps/search/?api=1&query=Coco+Beach+Oysterbay+Dar+es+Salaam" },
  { name: "Kariakoo Market", note: "Vibrant local market — fabrics, spices, souvenirs. Go with a local if possible.", map: "https://www.google.com/maps/search/?api=1&query=Kariakoo+Market+Dar+es+Salaam" },
  { name: "Mwenge Wood Carvers Market", note: "Best place for Makonde carvings and authentic Tanzanian art.", map: "https://www.google.com/maps/search/?api=1&query=Mwenge+Wood+Carvers+Market+Dar+es+Salaam" },
  { name: "Bongoyo Island", note: "30-minute boat from Slipway — snorkeling, white sand and grilled seafood.", map: "https://www.google.com/maps/search/?api=1&query=Bongoyo+Island+Dar+es+Salaam" },
  { name: "Village Museum", note: "Open-air museum of traditional Tanzanian houses and culture.", map: "https://www.google.com/maps/search/?api=1&query=Village+Museum+Dar+es+Salaam" },
  { name: "National Museum & House of Culture", note: "History, archaeology, and the famous Olduvai fossils.", map: "https://www.google.com/maps/search/?api=1&query=National+Museum+Dar+es+Salaam" },
];

const ZANZIBAR = [
  { name: "Stone Town", note: "UNESCO old town — narrow alleys, spice markets, Freddie Mercury's birthplace.", map: "https://www.google.com/maps/search/?api=1&query=Stone+Town+Zanzibar" },
  { name: "Nungwi & Kendwa Beaches", note: "Postcard white-sand beaches in the north — best for swimming and sunsets.", map: "https://www.google.com/maps/search/?api=1&query=Nungwi+Beach+Zanzibar" },
  { name: "Prison Island (Changuu)", note: "Short boat ride from Stone Town to meet the giant Aldabra tortoises.", map: "https://www.google.com/maps/search/?api=1&query=Prison+Island+Zanzibar" },
  { name: "Jozani Forest", note: "Spot the rare red colobus monkeys in their natural habitat.", map: "https://www.google.com/maps/search/?api=1&query=Jozani+Forest+Zanzibar" },
  { name: "Spice Tour", note: "Half-day tour of clove, cinnamon and vanilla plantations — Zanzibar's heritage.", map: "https://www.google.com/maps/search/?api=1&query=Spice+Tour+Zanzibar" },
  { name: "The Rock Restaurant", note: "Iconic restaurant perched on a rock in the ocean — book ahead.", map: "https://www.google.com/maps/search/?api=1&query=The+Rock+Restaurant+Zanzibar" },
];

export default function _unused() { return null; }

function DarGuide() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-[60dvh] overflow-hidden -mt-16">
        <img src={IMG.venue} alt="Dar es Salaam coastline" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-6 pt-16">
          <p className="text-[10px] uppercase tracking-luxe text-white/80">A Guest Guide</p>
          <h1 className="mt-4 font-serif text-5xl sm:text-6xl">Welcome to Dar es Salaam</h1>
          <div className="gold-rule mx-auto mt-6" />
          <p className="mt-5 max-w-xl font-display italic text-white/90">
            Karibu sana. A short guide to help you find your way around our beautiful city — and beyond, to the spice island of Zanzibar.
          </p>
        </div>
      </section>

      {/* ACCOMMODATION */}
      <Section icon={<Hotel className="size-5" />} label="Where to Stay" title="Accommodation" image={IMG.resort}>
        <p className="text-muted-foreground leading-relaxed mb-8">
          Most of our guests will stay between the city centre and the Masaki / Oysterbay peninsula — both are convenient for the ceremony and offer a range of options. For guests who want to wake up by the ocean near the reception, Bahari Beach is a great choice.
        </p>
        <CardGrid items={HOTELS} />
      </Section>

      {/* TRANSPORT */}
      <Section icon={<Car className="size-5" />} label="Getting Around" title="Transport" image={IMG.street} tone="alt">
        <p className="text-muted-foreground leading-relaxed mb-8">
          Dar es Salaam is easiest by ride-hail apps — install one or two before you fly. Have small Tanzanian Shilling notes for tips and short bajaj rides.
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          {TRANSPORT.map((t) => (
            <div key={t.name} className="bg-card border border-border p-6 hover:border-accent transition-colors">
              <p className="text-[10px] uppercase tracking-luxe text-accent">{t.name}</p>
              <p className="mt-2 text-sm text-foreground/80">{t.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* SAFETY */}
      <Section icon={<Shield className="size-5" />} label="Stay Safe" title="Safety & Common Sense" image={IMG.couple2}>
        <ul className="space-y-4 text-sm leading-relaxed">
          {[
            "Dar es Salaam is generally welcoming and safe, especially in tourist and hotel areas like Masaki, Oysterbay, and the city centre.",
            "Use Bolt, Uber, Faras, or hotel taxis after dark — avoid walking with valuables at night.",
            "Carry a copy of your passport; leave the original in your hotel safe.",
            "Tap water isn't recommended — drink bottled or filtered water (provided in all hotels).",
            "Tanzania uses Type D and G plugs at 230V — bring an adapter.",
            "Dial 112 for emergencies (police, ambulance, fire).",
          ].map((tip, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-accent mt-1.5 size-1.5 rounded-full bg-accent shrink-0" />
              <span className="text-foreground/85">{tip}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* EATS */}
      <Section icon={<Utensils className="size-5" />} label="Eat & Drink" title="Where to Eat" image={IMG.couple4} tone="alt">
        <p className="text-muted-foreground leading-relaxed mb-8">
          From beachfront seafood to Swahili street food and rooftop cocktails — Dar has something for every mood.
        </p>
        <CardGrid items={EATS} />
      </Section>

      {/* THINGS TO DO IN DAR */}
      <Section icon={<Sparkles className="size-5" />} label="Explore" title="Things to Do in Dar" image={IMG.couple3}>
        <CardGrid items={DAR_DO} />
      </Section>

      {/* ZANZIBAR */}
      <Section icon={<Palmtree className="size-5" />} label="Beyond Dar" title="Escape to Zanzibar" image={IMG.couple1} tone="alt">
        <p className="text-muted-foreground leading-relaxed mb-8">
          Zanzibar is a short 20-minute flight or 2-hour ferry from Dar — and well worth extending your trip for. White sand beaches, spice plantations, and a UNESCO-listed old town await.
        </p>
        <CardGrid items={ZANZIBAR} />
      </Section>
    </>
  );
}

function Section({
  icon, label, title, image, tone, children,
}: {
  icon: React.ReactNode; label: string; title: string; image: string; tone?: "alt"; children: React.ReactNode;
}) {
  return (
    <section className={`px-6 py-20 ${tone === "alt" ? "bg-secondary/40" : ""}`}>
      <div className="max-w-5xl mx-auto">
        <Reveal className="grid md:grid-cols-[1fr_2fr] gap-10 items-start mb-12">
          <div className="aspect-[4/5] overflow-hidden border border-border">
            <img src={image} alt="" className="size-full object-cover" />
          </div>
          <div>
            <div className="inline-flex items-center gap-3 text-accent">
              {icon}
              <SectionLabel>{label}</SectionLabel>
            </div>
            <h2 className="mt-5 font-serif text-4xl sm:text-5xl">{title}</h2>
            <div className="gold-rule my-6" />
            <div>{children}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CardGrid({ items }: { items: { name: string; area?: string; note: string; map?: string }[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      {items.map((it) => (
        <Reveal key={it.name}>
          <div className="bg-card border border-border p-6 h-full hover:border-accent transition-colors">
            {it.area && <p className="text-[10px] uppercase tracking-luxe text-accent">{it.area}</p>}
            <p className="mt-1 font-serif text-xl">{it.name}</p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.note}</p>
            {it.map && (
              <a href={it.map} target="_blank" rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-luxe text-accent hover:text-gold transition-colors">
                <MapPin className="size-3.5" /> Open in Maps
              </a>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
