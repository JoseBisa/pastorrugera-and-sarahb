import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Countdown } from "@/components/Countdown";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { IMG, WEDDING, EVENTS } from "@/lib/wedding-data";
import { ChevronDown, MapPin, Clock, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sarah & Ruge — Wedding · 20 December 2026" },
      { name: "description", content: "Forever begins here. Sarah and Ruge wedding celebration in Dar es Salaam, Tanzania." },
      { property: "og:title", content: "Sarah & Ruge" },
      { property: "og:description", content: "Forever begins here. 20 December 2026." },
      { property: "og:image", content: IMG.hero },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100dvh] -mt-16 flex items-end overflow-hidden">
        <motion.img
          src={IMG.hero}
          alt="Sarah and Ruge"
          className="absolute inset-0 size-full object-cover"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 veil" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full px-6 text-center text-white">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }}
            className="text-[10px] uppercase tracking-luxe text-white/80">
            We invite you to celebrate
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1.2 }}
            className="mt-6 font-serif text-6xl sm:text-8xl leading-[0.95]">
            {WEDDING.bride}
            <span className="block font-display italic text-accent text-5xl sm:text-7xl my-1">&</span>
            {WEDDING.groom}
          </motion.h1>
        </div>
        <div className="relative w-full px-6 pb-12 text-center text-white">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }}>
            <div className="gold-rule mx-auto" />
            <p className="mt-5 text-[11px] uppercase tracking-luxe">{WEDDING.dateLabel} · {WEDDING.location}</p>
            <p className="mt-3 font-display italic text-xl text-white/90">{WEDDING.tagline}</p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link to="/rsvp" className="px-7 py-3 bg-accent text-accent-foreground text-[10px] uppercase tracking-luxe hover:bg-gold transition-colors">
                RSVP
              </Link>
              <Link to="/story" className="px-7 py-3 border border-white/60 text-[10px] uppercase tracking-luxe hover:bg-white/10 transition-colors">
                Our Story
              </Link>
            </div>
            <ChevronDown className="size-5 mx-auto mt-10 animate-shimmer" />
          </motion.div>
        </div>
      </section>

      {/* WELCOME */}
      <section className="px-6 py-24 sm:py-32 max-w-2xl mx-auto text-center">
        <Reveal>
          <SectionLabel>A Note From Us</SectionLabel>
          <h2 className="mt-8 font-serif text-4xl sm:text-5xl leading-tight">
            Two hearts, one extraordinary day.
          </h2>
          <div className="gold-rule mx-auto my-8" />
          <p className="font-display text-xl italic text-foreground/80 leading-relaxed">
            Request the pleasure of your company as we celebrate our marriage in the heart of Tanzania.
            Your presence is the greatest gift — come share the joy, the laughter, and the love.
          </p>
          <p className="mt-6 font-serif text-2xl text-accent">— Sarah & Ruge</p>
        </Reveal>
      </section>

      {/* COUNTDOWN */}
      <section className="px-6 py-24 bg-secondary/40">
        <Reveal className="text-center">
          <SectionLabel>Counting Down</SectionLabel>
          <p className="mt-6 font-serif text-3xl sm:text-4xl">Until We Say "I Do"</p>
          <div className="mt-12">
            <Countdown iso={WEDDING.dateISO} />
          </div>
        </Reveal>
      </section>

      {/* QUICK FACTS */}
      <section className="px-6 py-24 max-w-5xl mx-auto">
        <Reveal className="text-center mb-14">
          <SectionLabel>The Celebration</SectionLabel>
          <h2 className="mt-6 font-serif text-4xl sm:text-5xl">Wedding Quick Facts</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-5">
          <FactCard icon={<Sparkles className="size-4" />} label="The Date" value="20 December 2026" />
          <FactCard icon={<MapPin className="size-4" />} label="Church Ceremony" value="Masaki English SDA Church" />
          <FactCard icon={<MapPin className="size-4" />} label="Reception" value="JC Hall, Bahari Beach" />
          <FactCard icon={<Clock className="size-4" />} label="Dress Code" value="Black Tie & Elegant Dress" />
        </div>
      </section>

      {/* SCHEDULE PREVIEW */}
      <section className="px-6 py-24 bg-secondary/40">
        <Reveal className="text-center mb-14">
          <SectionLabel>The Day</SectionLabel>
          <h2 className="mt-6 font-serif text-4xl sm:text-5xl">Order of Events</h2>
        </Reveal>
        <div className="max-w-2xl mx-auto space-y-10">
          {EVENTS.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.1}>
              <div className="grid grid-cols-[80px_1fr] gap-6 items-start">
                <div className="text-right">
                  <p className="font-serif text-2xl text-accent">{e.time.split(" ")[0]}</p>
                  <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">{e.time.split(" ")[1]}</p>
                </div>
                <div className="border-l border-accent/40 pl-6">
                  <p className="text-[10px] uppercase tracking-luxe text-accent">{e.title}</p>
                  <p className="mt-1 font-serif text-2xl">{e.venue}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{e.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/details" className="inline-block px-8 py-3 border border-foreground/30 text-[10px] uppercase tracking-luxe hover:bg-foreground hover:text-background transition-colors">
            Full Details
          </Link>
        </div>
      </section>

      {/* GALLERY CTA */}
      <section className="grid grid-cols-2 sm:grid-cols-4">
        {[IMG.couple1, IMG.couple3, IMG.couple4, IMG.couple5].map((src, i) => (
          <motion.div key={i} className="aspect-square overflow-hidden group"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.8 }}>
            <img src={src} alt="" className="size-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
          </motion.div>
        ))}
      </section>
      <div className="text-center py-12">
        <Link to="/gallery" className="text-[11px] uppercase tracking-luxe border-b border-accent pb-1 hover:text-accent transition-colors">
          View Full Gallery
        </Link>
      </div>
    </>
  );
}

function FactCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Reveal>
      <div className="border border-border bg-card p-7 text-center hover:border-accent transition-colors">
        <div className="inline-flex items-center justify-center size-10 rounded-full border border-accent/40 text-accent mb-4">{icon}</div>
        <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">{label}</p>
        <p className="mt-2 font-serif text-xl">{value}</p>
      </div>
    </Reveal>
  );
}
