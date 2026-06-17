import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IMG, WEDDING } from "@/lib/wedding-data";
import { Lock } from "lucide-react";

const STORAGE_KEY = "guest-unlocked";
const PASSWORD = "RS2026";

export function GuestGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setUnlocked(typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim().toUpperCase() === PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "1");
      setUnlocked(true);
    } else {
      setError("Incorrect password. Please try again.");
    }
  }

  if (unlocked === null) return null;
  if (unlocked) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <img src={IMG.hero} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm" />

      <div className="relative h-full w-full flex items-center justify-center px-6 text-white">
        <AnimatePresence mode="wait">
          {!showPanel ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-md"
            >
              <p className="text-[10px] uppercase tracking-luxe text-accent">You are invited</p>
              <h1 className="mt-6 font-serif text-5xl sm:text-6xl leading-[0.95]">
                {WEDDING.groom}
                <span className="block font-display italic text-accent text-3xl my-2">&</span>
                {WEDDING.bride}
              </h1>
              <div className="gold-rule mx-auto my-7" />
              <p className="font-display italic text-lg text-white/85">
                {WEDDING.tagline}
              </p>
              <p className="mt-3 text-[11px] uppercase tracking-luxe text-white/70">
                {WEDDING.dateLabel} · {WEDDING.location}
              </p>
              <button
                onClick={() => setShowPanel(true)}
                className="mt-10 inline-flex items-center gap-3 px-8 py-3 bg-accent text-accent-foreground text-[10px] uppercase tracking-luxe hover:bg-gold transition-colors"
              >
                <Lock className="size-3.5" /> Enter
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-md bg-charcoal/85 border border-accent/40 backdrop-blur-xl p-10 text-center"
            >
              <Lock className="size-6 mx-auto text-accent" />
              <p className="mt-5 text-[10px] uppercase tracking-luxe text-accent">Private Event</p>
              <h2 className="mt-3 font-serif text-3xl">A Private Celebration</h2>
              <div className="gold-rule mx-auto my-5" />
              <p className="text-sm text-white/75 leading-relaxed">
                The wedding of {WEDDING.groom} and {WEDDING.bride} is a private event.
                Please enter the event password provided in your invitation to continue.
              </p>
              <form onSubmit={submit} className="mt-7 text-left">
                <label className="text-[10px] uppercase tracking-luxe text-white/70">Event Password</label>
                <input
                  type="password"
                  autoFocus
                  value={value}
                  onChange={(e) => { setValue(e.target.value); setError(""); }}
                  placeholder="Enter password"
                  className="mt-2 w-full bg-transparent border-b border-white/30 focus:border-accent outline-none py-2 text-white tracking-widest"
                />
                {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
                <button
                  type="submit"
                  className="mt-6 w-full px-6 py-3 bg-accent text-accent-foreground text-[10px] uppercase tracking-luxe hover:bg-gold transition-colors"
                >
                  Unlock Invitation
                </button>
                <button
                  type="button"
                  onClick={() => { setShowPanel(false); setValue(""); setError(""); }}
                  className="mt-3 w-full text-[10px] uppercase tracking-luxe text-white/60 hover:text-white transition-colors"
                >
                  Back
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
