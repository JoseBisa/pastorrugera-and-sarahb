import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { WEDDING } from "@/lib/wedding-data";

const links = [
  { to: "/", label: "Home", num: "01" },
  { to: "/story", label: "Our Story", num: "02" },
  { to: "/gallery", label: "Gallery", num: "03" },
  { to: "/details", label: "Details", num: "04" },
  { to: "/party", label: "Wedding Party", num: "05" },
  { to: "/dar-es-salaam", label: "Visiting Dar", num: "06" },
  { to: "/guestbook", label: "Guestbook", num: "07" },
  { to: "/rsvp", label: "RSVP", num: "09" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = useRouterState({ select: s => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isHome = path === "/";
  const onDark = isHome && !scrolled && !open;

  return (
    <>
      <header
        className={[
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled || open
            ? "bg-background/85 backdrop-blur-xl border-b border-border/60"
            : isHome
              ? "bg-transparent"
              : "bg-background/70 backdrop-blur-md",
        ].join(" ")}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-10 py-5">
          <Link
            to="/"
            className={["font-serif text-sm tracking-[0.3em] uppercase transition-colors", onDark ? "text-white" : "text-foreground"].join(" ")}
          >
            S<span className="text-accent mx-1">·</span>R
          </Link>

          <div className="hidden md:flex justify-center">
            <p className={["text-[10px] uppercase tracking-luxe transition-colors", onDark ? "text-white/70" : "text-muted-foreground"].join(" ")}>
              {WEDDING.dateLabel}
            </p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setOpen(o => !o)}
              className={[
                "group flex items-center gap-3 text-[10px] uppercase tracking-luxe transition-colors",
                onDark ? "text-white" : "text-foreground",
              ].join(" ")}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span className="hidden sm:inline">{open ? "Close" : "Menu"}</span>
              <span className="relative flex items-center justify-center size-9 rounded-full border border-current/40">
                {open ? <X className="size-4" /> : <Menu className="size-4" />}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      <div
        className={[
          "fixed inset-0 z-40 transition-all duration-700",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div className="absolute inset-0 bg-charcoal" />
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_20%_20%,var(--gold)_0,transparent_50%),radial-gradient(circle_at_80%_70%,var(--gold)_0,transparent_55%)]" />

        <div className="relative h-full w-full grid md:grid-cols-[1.1fr_1fr]">
          {/* Left: links */}
          <div className="flex flex-col justify-center px-8 sm:px-16 pt-24 pb-12 overflow-y-auto">
            <p className="text-[10px] uppercase tracking-luxe text-white/50">Navigation</p>
            <div className="gold-rule mt-4" />
            <nav className="mt-10 flex flex-col gap-2">
              {links.map((l, i) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-5 py-2 border-b border-white/10 hover:border-accent/60 transition-colors"
                  style={{
                    transitionDelay: open ? `${150 + i * 50}ms` : "0ms",
                    transform: open ? "translateY(0)" : "translateY(20px)",
                    opacity: open ? 1 : 0,
                    transitionProperty: "transform, opacity, border-color",
                    transitionDuration: "700ms",
                  }}
                  activeProps={{ className: "text-accent" }}
                >
                  <span className="text-[10px] tracking-luxe text-accent/70 w-6">{l.num}</span>
                  <span className="font-serif text-3xl sm:text-5xl text-white/90 group-hover:text-accent transition-colors">
                    {l.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: invite card */}
          <div className="hidden md:flex relative flex-col items-center justify-center px-12 border-l border-white/10">
            <div className="text-center text-white">
              <p className="text-[10px] uppercase tracking-luxe text-white/60">An invitation</p>
              <h2 className="mt-6 font-serif italic text-6xl">
                R <span className="text-accent">&</span> S
              </h2>
              <div className="gold-rule mx-auto my-6" />
              <p className="text-[11px] uppercase tracking-luxe text-white/70">{WEDDING.dateLabel}</p>
              <p className="mt-1 text-[11px] uppercase tracking-luxe text-white/70">{WEDDING.location}</p>
              <p className="mt-8 font-display italic text-2xl text-white/80">{WEDDING.tagline}</p>
              <Link
                to="/rsvp"
                onClick={() => setOpen(false)}
                className="inline-block mt-10 px-8 py-3 bg-accent text-accent-foreground text-[10px] uppercase tracking-luxe hover:bg-gold transition-colors"
              >
                RSVP Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
