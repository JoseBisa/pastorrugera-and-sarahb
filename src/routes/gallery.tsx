import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { GALLERY } from "@/lib/wedding-data";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Pastor Rugera & Sarah B" },
      { name: "description", content: "Moments and memories — a curated gallery from Pastor Rugera and Sarah B's journey." },
    ],
  }),
  component: Gallery,
});

const CATEGORIES = ["All", "Proposal", "Engagement", "Dates & Adventures", "Family Moments", "Wedding Preparations"];

function Gallery() {
  const [cat, setCat] = useState("All");
  const [active, setActive] = useState<number | null>(null);

  const uploads = useQuery({
    queryKey: ["gallery-images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("image_url,category,created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map(r => ({ src: r.image_url, category: r.category }));
    },
  });

  const all = [...(uploads.data ?? []), ...GALLERY];
  const items = cat === "All" ? all : all.filter(g => g.category === cat);

  return (
    <>
      <section className="px-6 py-20 text-center">
        <Reveal>
          <SectionLabel>Gallery</SectionLabel>
          <h1 className="mt-6 font-serif text-5xl sm:text-6xl">Moments in Time</h1>
        </Reveal>
      </section>

      <div className="px-6 flex flex-wrap items-center justify-center gap-3 mb-10">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`px-4 py-2 text-[10px] uppercase tracking-luxe border transition-colors ${
              cat === c ? "border-accent bg-accent text-accent-foreground" : "border-border text-muted-foreground hover:border-foreground"
            }`}>
            {c}
          </button>
        ))}
      </div>

      <div className="px-3 sm:px-6 pb-20 columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4 max-w-7xl mx-auto">
        {items.map((g, i) => (
          <motion.button key={i} onClick={() => setActive(i)}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: (i % 8) * 0.05, duration: 0.7 }}
            className="block mb-3 sm:mb-4 break-inside-avoid w-full overflow-hidden group">
            <img src={g.src} alt={g.category} loading="lazy"
              className="w-full h-auto group-hover:scale-105 transition-transform duration-[1.5s]" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <Lightbox items={items} index={active} onClose={() => setActive(null)} setIndex={setActive} />
        )}
      </AnimatePresence>
    </>
  );
}

function Lightbox({ items, index, onClose, setIndex }: {
  items: { src: string; category: string }[]; index: number; onClose: () => void; setIndex: (i: number) => void;
}) {
  const prev = () => setIndex((index - 1 + items.length) % items.length);
  const next = () => setIndex((index + 1) % items.length);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4">
      <button onClick={onClose} className="absolute top-5 right-5 text-white/80 hover:text-white p-2" aria-label="Close">
        <X className="size-6" />
      </button>
      <button onClick={prev} className="absolute left-3 sm:left-8 text-white/70 hover:text-white p-2" aria-label="Previous">
        <ChevronLeft className="size-8" />
      </button>
      <motion.img key={index} src={items[index].src} alt=""
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
        className="max-h-[85dvh] max-w-[90vw] object-contain" />
      <button onClick={next} className="absolute right-3 sm:right-8 text-white/70 hover:text-white p-2" aria-label="Next">
        <ChevronRight className="size-8" />
      </button>
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-luxe text-white/60">
        {items[index].category} · {index + 1} / {items.length}
      </p>
    </motion.div>
  );
}
