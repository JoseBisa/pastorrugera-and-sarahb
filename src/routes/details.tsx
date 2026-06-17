import { createFileRoute } from "@tanstack/react-router";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { EVENTS, IMG } from "@/lib/wedding-data";
import { MapPin, Clock, Shirt } from "lucide-react";

export const Route = createFileRoute("/details")({
  head: () => ({
    meta: [
      { title: "Wedding Details — Pastor Rugera & Sarah B" },
      { name: "description", content: "All the details for Pastor Rugera and Sarah B's wedding day — ceremony, reception, dress code, and directions." },
    ],
  }),
  component: Details,
});

function Details() {
  return (
    <>
      <section className="relative h-[55dvh] overflow-hidden -mt-16">
        <img src={IMG.ceremony} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-6 pt-16">
          <p className="text-[10px] uppercase tracking-luxe text-white/80">The Celebration</p>
          <h1 className="mt-4 font-serif text-5xl sm:text-6xl">Wedding Details</h1>
          <div className="gold-rule mx-auto mt-6" />
          <p className="mt-4 text-[11px] uppercase tracking-luxe">20 December 2026 · Dar es Salaam</p>
        </div>
      </section>

      <section className="px-6 py-20 max-w-4xl mx-auto space-y-10">
        {EVENTS.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.08}>
            <article className="border border-border bg-card overflow-hidden hover:border-accent transition-colors">
              <div className="relative h-64 sm:h-80 overflow-hidden">
                <img src={e.image} alt={e.venue} className="absolute inset-0 size-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <p className="absolute top-4 left-5 text-[10px] uppercase tracking-luxe text-white/90 bg-black/40 backdrop-blur px-3 py-1.5 border border-white/20">Event {i + 1}</p>
              </div>
              <div className="p-7 sm:p-10">
                <h2 className="font-serif text-4xl">{e.title}</h2>
                <div className="gold-rule my-5" />
                <div className="space-y-3 text-sm">
                  <p className="flex items-center gap-3"><Clock className="size-4 text-accent" /> {e.time}</p>
                  <p className="flex items-center gap-3"><MapPin className="size-4 text-accent" /> {e.venue}</p>
                  <p className="text-muted-foreground pl-7">{e.address}</p>
                </div>
                <p className="mt-5 font-display italic text-foreground/80">{e.desc}</p>
                <a href={e.map} target="_blank" rel="noreferrer"
                   className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 bg-foreground text-background text-[10px] uppercase tracking-luxe hover:bg-accent hover:text-accent-foreground transition-colors">
                  <MapPin className="size-3.5" /> Open in Google Maps
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="px-6 py-20 bg-secondary/50">
        <Reveal className="max-w-3xl mx-auto text-center">
          <SectionLabel>Attire</SectionLabel>
          <Shirt className="size-7 mx-auto mt-6 text-accent" />
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Dress Code</h2>
          <div className="gold-rule mx-auto my-6" />
          <p className="font-display italic text-2xl">Black Tie & Elegant Dress</p>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            We invite our guests to dress in their most refined attire. Gentlemen in tuxedos or dark suits; ladies in elegant gowns.
          </p>
        </Reveal>
      </section>
    </>
  );
}
