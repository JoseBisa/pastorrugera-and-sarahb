import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { GALLERY } from "@/lib/wedding-data";
import { supabase } from "@/integrations/supabase/client";
import { GalleryUploader } from "@/components/gallery/GalleryUploader";
import { GalleryCarousel } from "@/components/gallery/GalleryCarousel";
import { DEFAULT_CAPTION, GALLERY_CATEGORIES, downloadImage, type GalleryItem } from "@/lib/gallery";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Shared Wedding Gallery — Pastor Rugera & Sarah B" },
      { name: "description", content: "Upload your favourite moments and browse the shared wedding memories of Pastor Rugera and Sarah B." },
      { property: "og:title", content: "Our Shared Wedding Memories" },
      { property: "og:description", content: "Upload your favourite moments, leave a sweet message, and celebrate together." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Gallery,
});

const CATEGORIES = ["All", ...GALLERY_CATEGORIES];

function Gallery() {
  const [cat, setCat] = useState("All");
  const [active, setActive] = useState<number | null>(null);

  const uploads = useQuery({
    queryKey: ["gallery-images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("id,image_url,caption,uploader_name,category,created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map<GalleryItem>(r => ({
        id: r.id,
        src: r.image_url,
        caption: r.caption,
        uploaderName: r.uploader_name,
        uploadedAt: r.created_at,
        category: r.category ?? "Adventures",
      }));
    },
  });

  const statics: GalleryItem[] = GALLERY.map((g, i) => ({
    id: `static-${i}`,
    src: g.src,
    caption: null,
    uploaderName: null,
    uploadedAt: null,
    category: g.category,
  }));

  const all = [...(uploads.data ?? []), ...statics];
  const items = cat === "All" ? all : all.filter(g => g.category === cat);

  return (
    <>
      <section className="px-6 pt-20 pb-10 text-center">
        <Reveal>
          <SectionLabel>Gallery</SectionLabel>
          <h1 className="mt-6 font-serif text-4xl sm:text-6xl">Our Shared Wedding Memories</h1>
          <div className="gold-rule mx-auto my-6" />
          <p className="max-w-2xl mx-auto font-display italic text-lg text-foreground/75 leading-relaxed">
            Upload your favourite moments, leave a sweet message, and celebrate together with everyone who
            shared our special day.
          </p>
        </Reveal>
      </section>

      <section className="pb-12">
        <GalleryUploader />
      </section>

      {all.length > 0 && (
        <section className="px-3 sm:px-6 pb-14">
          <GalleryCarousel items={all} />
        </section>
      )}

      <div className="px-6 flex flex-wrap items-center justify-center gap-3 mb-10">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`rounded-full px-4 py-2 text-[10px] uppercase tracking-luxe border transition-colors ${
              cat === c ? "border-accent bg-accent text-accent-foreground" : "border-border text-muted-foreground hover:border-foreground"
            }`}>
            {c}
          </button>
        ))}
      </div>

      <div className="px-3 sm:px-6 pb-20 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 max-w-7xl mx-auto">
        {items.map((g, i) => (
          <motion.figure key={g.id}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: (i % 8) * 0.05, duration: 0.7 }}
            className="mb-4 break-inside-avoid rounded-2xl overflow-hidden border border-border/60 bg-card/70 backdrop-blur-sm shadow-sm hover:shadow-lg transition-shadow group">
            <button onClick={() => setActive(i)} className="block w-full overflow-hidden">
              <img src={g.src} alt={g.caption ?? g.category} loading="lazy"
                className="w-full h-auto group-hover:scale-105 transition-transform duration-[1.2s]" />
            </button>
            <figcaption className="p-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-display italic text-sm text-foreground/80 line-clamp-3">
                  {g.caption?.trim() || DEFAULT_CAPTION}
                </p>
                {g.uploaderName && (
                  <p className="mt-1.5 text-[10px] uppercase tracking-luxe text-muted-foreground">— {g.uploaderName}</p>
                )}
              </div>
              <button onClick={() => downloadImage(g.src, i)} aria-label="Download photo"
                className="shrink-0 rounded-full border border-border p-2 text-muted-foreground hover:text-accent hover:border-accent transition-colors">
                <Download className="size-3.5" />
              </button>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && items[active] && (
          <Lightbox items={items} index={active} onClose={() => setActive(null)} setIndex={setActive} />
        )}
      </AnimatePresence>
    </>
  );
}

function Lightbox({ items, index, onClose, setIndex }: {
  items: GalleryItem[]; index: number; onClose: () => void; setIndex: (i: number) => void;
}) {
  const item = items[index];
  const prev = () => setIndex((index - 1 + items.length) % items.length);
  const next = () => setIndex((index + 1) % items.length);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/95 flex flex-col items-center justify-center p-4">
      <button onClick={onClose} className="absolute top-5 right-5 text-white/80 hover:text-white p-2" aria-label="Close">
        <X className="size-6" />
      </button>
      <button onClick={prev} className="absolute left-3 sm:left-8 text-white/70 hover:text-white p-2" aria-label="Previous">
        <ChevronLeft className="size-8" />
      </button>
      <motion.img key={item.id} src={item.src} alt={item.caption ?? ""}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
        className="max-h-[70dvh] max-w-[90vw] object-contain rounded-xl" />
      <button onClick={next} className="absolute right-3 sm:right-8 text-white/70 hover:text-white p-2" aria-label="Next">
        <ChevronRight className="size-8" />
      </button>

      <div className="mt-5 w-full max-w-2xl rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-5 text-center text-white">
        <p className="font-display italic text-lg">{item.caption?.trim() || DEFAULT_CAPTION}</p>
        <p className="mt-2 text-[10px] uppercase tracking-luxe text-white/60">
          {item.uploaderName ? `${item.uploaderName} · ` : ""}
          {item.uploadedAt ? new Date(item.uploadedAt).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" }) : item.category}
          {" · "}{index + 1} / {items.length}
        </p>
        <button onClick={() => downloadImage(item.src, index)}
          className="mt-4 inline-flex items-center gap-2 rounded-full px-6 py-2.5 bg-white text-charcoal text-[10px] uppercase tracking-luxe hover:opacity-90 transition-opacity">
          <Download className="size-3.5" /> Download
        </button>
      </div>
    </motion.div>
  );
}
