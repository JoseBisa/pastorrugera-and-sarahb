import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { DEFAULT_CAPTION, downloadImage, type GalleryItem } from "@/lib/gallery";

export function GalleryCarousel({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const count = items.length;

  useEffect(() => {
    if (paused || count < 2) return;
    const t = setInterval(() => setIndex(i => (i + 1) % count), 6000);
    return () => clearInterval(t);
  }, [paused, count]);

  useEffect(() => {
    if (index >= count) setIndex(0);
  }, [count, index]);

  if (!count) return null;
  const current = items[Math.min(index, count - 1)];

  const prev = () => setIndex(i => (i - 1 + count) % count);
  const next = () => setIndex(i => (i + 1) % count);

  return (
    <div
      className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-border/60 shadow-lg bg-card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={e => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={e => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 45) (dx > 0 ? prev : next)();
        touchX.current = null;
      }}
    >
      <div className="relative aspect-[4/5] sm:aspect-[16/9]">
        <AnimatePresence mode="sync">
          <motion.img
            key={current.id}
            src={current.src}
            alt={current.caption ?? "Wedding memory"}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 size-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 text-white">
          <div className="rounded-2xl bg-black/35 backdrop-blur-md border border-white/15 p-4 sm:p-5">
            <p className="font-display italic text-base sm:text-xl leading-relaxed">
              {current.caption?.trim() || DEFAULT_CAPTION}
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[10px] uppercase tracking-luxe text-white/70">
                {current.uploaderName ? `Shared by ${current.uploaderName}` : "Shared with love"}
                {" · "}
                {index + 1} / {count}
              </p>
              <button
                onClick={() => downloadImage(current.src, index)}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/90 text-charcoal text-[10px] uppercase tracking-luxe hover:bg-white transition-colors"
              >
                <Download className="size-3.5" /> Download
              </button>
            </div>
          </div>
        </div>

        {count > 1 && (
          <>
            <button onClick={prev} aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 backdrop-blur-md border border-white/20 p-2 text-white/90 hover:bg-black/55 transition-colors">
              <ChevronLeft className="size-5" />
            </button>
            <button onClick={next} aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 backdrop-blur-md border border-white/20 p-2 text-white/90 hover:bg-black/55 transition-colors">
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
