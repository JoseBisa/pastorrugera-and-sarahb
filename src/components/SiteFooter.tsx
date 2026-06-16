export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40 mt-24">
      <div className="px-6 py-14 text-center max-w-2xl mx-auto">
        <p className="font-serif text-3xl">Pastor Rugera <span className="text-accent italic">&</span> Sarah</p>
        <div className="gold-rule mx-auto my-5" />
        <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">20 . 12 . 2026 — Dar es Salaam</p>
        <p className="mt-6 font-display italic text-muted-foreground">
          "And so the adventure begins."
        </p>
      </div>
      <div className="border-t border-border/40 px-6 py-5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] uppercase tracking-luxe text-muted-foreground/70">
          <p>© 2026 Pastor Rugera & Sarah</p>
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>Crafted by Joe Bisanda</span>
            <span className="hidden sm:inline opacity-50">·</span>
            <a href="tel:+255710749380" className="hover:text-accent transition-colors normal-case tracking-normal">+255 71 074 9380</a>
            <span className="hidden sm:inline opacity-50">·</span>
            <a href="mailto:joebisanda@gmail.com" className="hover:text-accent transition-colors normal-case tracking-normal">joebisanda@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
