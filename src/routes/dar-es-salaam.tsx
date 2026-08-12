import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { IMG } from "@/lib/wedding-data";
import { HOTELS, LOCAL_EATS, INTERNATIONAL_EATS, DAR_DO, ZANZIBAR, locationKey, type DarItem } from "@/lib/dar-data";
import { supabase } from "@/integrations/supabase/client";
import darSkyline from "@/assets/dar-skyline.jpg.asset.json";
import { MapPin, Hotel, Car, Shield, Utensils, Sparkles, Palmtree, Soup, ChefHat } from "lucide-react";

export const Route = createFileRoute("/dar-es-salaam")({
  head: () => ({
    meta: [
      { title: "Visiting Dar es Salaam — Pastor Rugera & Sarah B" },
      { name: "description", content: "A traveler's guide to Dar es Salaam and Zanzibar for our wedding guests — accommodation, transport, food, safety and things to do." },
    ],
  }),
  component: DarGuide,
});

const TRANSPORT = [
  { name: "Bolt", note: "Most reliable ride-hail app in Dar. Download before you arrive; pay cash or in-app." },
  { name: "Little Cab", note: "Pan-East-African ride app, a solid backup when Bolt is busy." },
  { name: "Faras", note: "Local ride-hail app, often cheaper for short hops within the city." },
  { name: "Hotel taxis", note: "Pre-arrange airport pickups through your hotel — fixed price, English-speaking drivers." },
  { name: "Bajaj / Tuk-tuks", note: "Fine for short distances. Always agree the fare before getting in." },
];

function useLocationImages() {
  return useQuery({
    queryKey: ["location-images"],
    queryFn: async () => {
      const { data, error } = await supabase.from("location_images").select("location_key,image_url");
      if (error) throw error;
      const map: Record<string, string> = {};
      (data ?? []).forEach(r => { map[r.location_key] = r.image_url; });
      return map;
    },
  });
}

function DarGuide() {
  const imgs = useLocationImages().data ?? {};

  return (
    <>
      {/* HERO */}
      <section className="relative h-[60dvh] overflow-hidden -mt-16">
        <img src={darSkyline.url} alt="Dar es Salaam skyline and harbour" className="absolute inset-0 size-full object-cover" />
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

      <Section icon={<Hotel className="size-5" />} label="Where to Stay" title="Accommodation" image={IMG.resort}>
        <p className="text-muted-foreground leading-relaxed mb-8">
          A selection of hotels and beach resorts we recommend for our guests. Those along the northern coast — Bahari Beach, Jangwani and Mbezi — are closest to both White Sands Hotel and JC Hall Bahari Beach.
        </p>
        <CardGrid sectionKey="hotels" items={HOTELS} imgs={imgs} />
      </Section>

      <Section icon={<Car className="size-5" />} label="Getting Around" title="Transport" image={IMG.transport} tone="alt">
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

      <Section icon={<Shield className="size-5" />} label="Stay Safe" title="Safety & Common Sense" image={IMG.safety}>
        <ul className="space-y-4 text-sm leading-relaxed">
          {[
            "Dar es Salaam is generally welcoming and safe, especially in tourist and hotel areas like Masaki, Oysterbay, Bahari Beach, and the city centre.",
            "Use Bolt, Faras, Little Cab, or hotel taxis after dark — avoid walking with valuables at night.",
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

      <Section icon={<Utensils className="size-5" />} label="Eat & Drink" title="Where to Eat" image={IMG.couple4} tone="alt">
        <p className="text-muted-foreground leading-relaxed mb-8">
          From beachfront seafood to Swahili street food and rooftop cocktails — Dar has something for every mood.
        </p>
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <div className="inline-flex items-center gap-3 text-accent">
              <Soup className="size-4" />
              <SectionLabel>Local Cuisine</SectionLabel>
            </div>
            <div className="gold-rule my-5" />
            <CardGrid sectionKey="eats" items={LOCAL_EATS} imgs={imgs} cols={1} />
          </div>
          <div>
            <div className="inline-flex items-center gap-3 text-accent">
              <ChefHat className="size-4" />
              <SectionLabel>International Cuisine</SectionLabel>
            </div>
            <div className="gold-rule my-5" />
            <CardGrid sectionKey="eats" items={INTERNATIONAL_EATS} imgs={imgs} cols={1} />
          </div>
        </div>
      </Section>


      <Section icon={<Sparkles className="size-5" />} label="Explore" title="Things to Do in Dar" image={IMG.thingsToDo}>
        <CardGrid sectionKey="do" items={DAR_DO} imgs={imgs} />
      </Section>

      <Section icon={<Palmtree className="size-5" />} label="Beyond Dar" title="Escape to Zanzibar" image={IMG.couple1} tone="alt">
        <p className="text-muted-foreground leading-relaxed mb-8">
          Zanzibar is a short 20-minute flight or 2-hour ferry from Dar — and well worth extending your trip for. White sand beaches, spice plantations, and a UNESCO-listed old town await.
        </p>
        <CardGrid sectionKey="zanzibar" items={ZANZIBAR} imgs={imgs} />
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

function CardGrid({ sectionKey, items, imgs, cols = 2 }: { sectionKey: string; items: DarItem[]; imgs: Record<string, string>; cols?: 1 | 2 }) {
  return (
    <div className={`grid gap-5 ${cols === 2 ? "sm:grid-cols-2" : "grid-cols-1"}`}>
      {items.map((it) => {
        const url = imgs[locationKey(sectionKey, it.name)];
        return (
          <Reveal key={it.name}>
            <div className="bg-card border border-border h-full hover:border-accent transition-colors overflow-hidden">
              {url && (
                <div className="aspect-[16/10] overflow-hidden border-b border-border">
                  <img src={url} alt={it.name} className="size-full object-cover" loading="lazy" />
                </div>
              )}
              <div className="p-6">
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
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
