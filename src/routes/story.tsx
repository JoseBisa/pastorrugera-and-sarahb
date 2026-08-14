import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { STORY } from "@/lib/wedding-data";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — Pastor Rugera & Sarah B" },
      { name: "description", content: "The story of how Pastor Rugera and Sarah B found each other — from a first laugh to forever." },
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
        {m.images && m.images.length > 1 ? (
          <StorySlides images={m.images} title={m.title} />
        ) : (
          <motion.img src={m.image} alt={m.title} style={{ y }}
            className="w-full aspect-[4/5] object-cover shadow-luxe" />
        )}
      </div>
      <Reveal>
        <h2 className="font-serif text-4xl sm:text-5xl">{m.title}</h2>

        <div className="gold-rule my-6" />
        <p className="font-display text-lg text-foreground/80 leading-relaxed">{m.text}</p>
      </Reveal>
    </div>
  );
}

function StorySlides({ images, title }: { images: string[]; title: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % images.length), 4500);
    return () => clearInterval(t);
  }, [images.length]);
  return (
    <div className="relative w-full aspect-[4/5] overflow-hidden shadow-luxe">
      {images.map((src, idx) => (
        <img key={src} src={src} alt={title}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`} />
      ))}
      <div className="absolute bottom-3 inset-x-0 flex justify-center gap-2">
        {images.map((src, idx) => (
          <button key={src} onClick={() => setI(idx)} aria-label={`Photo ${idx + 1}`}
            className={`size-2 rounded-full transition-colors ${idx === i ? "bg-accent" : "bg-white/60"}`} />
        ))}
      </div>
    </div>
  );
}
