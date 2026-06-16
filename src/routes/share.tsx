import { createFileRoute } from "@tanstack/react-router";
import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { Download } from "lucide-react";

const WEDDING_URL = "https://pastorrugera-and-sarah.lovable.app";

export const Route = createFileRoute("/share")({
  head: () => ({
    meta: [{ title: "Share — Pastor Rugera & Sarah B" }],
  }),
  component: Share,
});

function Share() {
  const wrapRef = useRef<HTMLDivElement>(null);

  const download = () => {
    const svg = wrapRef.current?.querySelector("svg");
    if (!svg) return;
    const data = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    const blob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
    const u = URL.createObjectURL(blob);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1000; canvas.height = 1000;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, 1000, 1000);
      ctx.drawImage(img, 50, 50, 900, 900);
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = "pastorrugera-and-sarah-qr.png";
      a.click();
      URL.revokeObjectURL(u);
    };
    img.src = u;
  };

  return (
    <section className="px-6 py-20 max-w-xl mx-auto text-center">
      <Reveal>
        <SectionLabel>Share</SectionLabel>
        <h1 className="mt-6 font-serif text-5xl">Share Our Day</h1>
        <p className="mt-6 font-display italic text-muted-foreground">
          Scan to open our wedding website, or download the QR for invitations.
        </p>

        <div ref={wrapRef} className="mt-10 inline-block bg-white p-6 shadow-luxe border border-border">
          <QRCodeSVG value={WEDDING_URL} size={240} level="H" fgColor="#1c1a17" />
        </div>

        <p className="mt-6 text-xs text-muted-foreground break-all">{WEDDING_URL}</p>

        <button onClick={download}
          className="mt-8 inline-flex items-center gap-2 px-7 py-3 bg-foreground text-background text-[10px] uppercase tracking-luxe hover:bg-accent hover:text-accent-foreground transition-colors">
          <Download className="size-4" /> Download QR
        </button>
      </Reveal>
    </section>
  );
}
