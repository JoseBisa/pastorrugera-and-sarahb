import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/story", label: "Our Story" },
  { to: "/gallery", label: "Gallery" },
  { to: "/details", label: "Details" },
  { to: "/party", label: "Wedding Party" },
  { to: "/guestbook", label: "Guestbook" },
  { to: "/registry", label: "Registry" },
  { to: "/rsvp", label: "RSVP" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/60">
      <div className="flex items-center justify-between px-5 sm:px-8 py-4">
        <Link to="/" className="font-serif text-lg tracking-wider">
          S <span className="text-accent">&</span> R
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-[11px] uppercase tracking-luxe">
          {links.map(l => (
            <Link key={l.to} to={l.to} className="text-foreground/70 hover:text-foreground transition-colors"
              activeProps={{ className: "text-accent" }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <button onClick={() => setOpen(true)} className="md:hidden p-2 -mr-2" aria-label="Open menu">
          <Menu className="size-5" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-background animate-fade-up">
          <div className="flex justify-between px-5 py-4 border-b border-border/60">
            <span className="font-serif text-lg tracking-wider">S <span className="text-accent">&</span> R</span>
            <button onClick={() => setOpen(false)} className="p-2 -mr-2" aria-label="Close menu">
              <X className="size-5" />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center gap-7 pt-16">
            {links.map(l => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                className="font-serif text-3xl text-foreground/90"
                activeProps={{ className: "text-accent" }}>
                {l.label}
              </Link>
            ))}
            <div className="gold-rule mt-6" />
            <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">20 December 2026</p>
          </nav>
        </div>
      )}
    </header>
  );
}
