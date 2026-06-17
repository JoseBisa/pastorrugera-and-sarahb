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

function firstName(full: string) {
  return full.split(" ")[0];
}

function Party() {
  const members = [...PARTY.bride, ...PARTY.groom];

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

      <section className="px-6 pb-24 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-10">
          {members.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.05}>
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-luxe text-accent">{m.role}</p>
                <p className="mt-3 font-serif text-2xl">{firstName(m.name)}</p>
                <div className="gold-rule mx-auto mt-4" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
