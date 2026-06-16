import { useEffect, useState } from "react";

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  return {
    d: Math.floor(ms / 86400000),
    h: Math.floor((ms / 3600000) % 24),
    m: Math.floor((ms / 60000) % 60),
    s: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown({ iso }: { iso: string }) {
  const [t, setT] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  useEffect(() => {
    const target = new Date(iso);
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [iso]);

  const cells = [
    { v: t?.d, l: "Days" },
    { v: t?.h, l: "Hours" },
    { v: t?.m, l: "Minutes" },
    { v: t?.s, l: "Seconds" },
  ];
  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-md mx-auto">
      {cells.map(c => (
        <div key={c.l} className="text-center">
          <div className="font-serif text-3xl sm:text-5xl text-foreground tabular-nums">
            {c.v == null ? "—" : String(c.v).padStart(2, "0")}
          </div>
          <div className="mt-2 text-[9px] sm:text-[10px] uppercase tracking-luxe text-muted-foreground">{c.l}</div>
        </div>
      ))}
    </div>
  );
}
