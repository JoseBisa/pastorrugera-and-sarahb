import { createFileRoute } from "@tanstack/react-router";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { PARTY } from "@/lib/wedding-data";

export const Route = createFileRoute("/party")({
  head: () => ({
    meta: [
      { title: "Wedding Party — Pastor Rugera & Sarah B" },
      { name: "description", content: "Meet the wedding party — the people standing beside Pastor Rugera and Sarah B on their day." },
    ],
  }),
  component: Party,
});

function Party() {
  return (
    <>
      <section className="px-6 py-20 text-center">
        <Reveal>
          <SectionLabel>Wedding Party</SectionLabel>
          <h1 className="mt-6 font-serif text-5xl sm:text-6xl">Beside Us, Always.</h1>
          <p className="max-w-xl mx-auto mt-6 font-display italic text-lg text-muted-foreground">
            The friends and family who have shaped our story and will stand with us as we begin our next chapter.
          </p>
        </Reveal>
      </section>

      <section className="px-6 pb-24 max-w-4xl mx-auto space-y-12">
        {PARTY.map((g, i) => (
          <Reveal key={g.role} delay={i * 0.04}>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-luxe text-accent">{g.role}</p>
              <div className="gold-rule mx-auto my-4" />
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
                {g.names.map((n) => (
                  <p key={n} className="font-serif text-2xl">{n}</p>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </section>
    </>
  );
}

