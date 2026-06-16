import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { STORY } from "@/lib/wedding-data";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — Pastor Rugera & Sarah" },
      { name: "description", content: "The story of how Pastor Rugera and Sarah found each other — from a first laugh to forever." },
    ],
  }),
  component: Story,
});

function Story() {
  return (
    <>
      <section className="px-6 py-24 text-center max-w-2xl mx-auto">
        <Reveal>
          <SectionLabel>Our Story</SectionLabel>
          <h1 className="mt-8 font-serif text-5xl sm:text-6xl">A Love Written Slowly.</h1>
          <div className="gold-rule mx-auto my-8" />
          <p className="font-display italic text-xl text-foreground/80">
            Every great story has a beginning. Ours started with a glance, and grew into a lifetime.
          </p>
        </Reveal>
      </section>

      <div className="max-w-4xl mx-auto px-6 pb-32">
        {STORY.map((m, i) => (
          <Milestone key={m.title} m={m} index={i} />
        ))}
      </div>
    </>
  );
}

function Milestone({ m, index }: { m: typeof STORY[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const flip = index % 2 === 1;
  return (
    <div ref={ref} className={`grid sm:grid-cols-2 gap-8 sm:gap-14 items-center py-12 sm:py-20 ${flip ? "sm:[&>*:first-child]:order-2" : ""}`}>
      <div className="overflow-hidden">
        <motion.img src={m.image} alt={m.title} style={{ y }}
          className="w-full aspect-[4/5] object-cover shadow-luxe" />
      </div>
      <Reveal>
        <p className="text-[10px] uppercase tracking-luxe text-accent">{m.year}</p>
        <h2 className="mt-3 font-serif text-4xl sm:text-5xl">{m.title}</h2>
        <div className="gold-rule my-6" />
        <p className="font-display text-lg text-foreground/80 leading-relaxed">{m.text}</p>
      </Reveal>
    </div>
  );
}
