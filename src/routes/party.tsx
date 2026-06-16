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

      {([["Bride's Team", PARTY.bride], ["Groom's Team", PARTY.groom]] as const).map(([title, members]) => (
        <section key={title} className="px-6 py-16 max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-luxe text-accent">{title}</p>
            <h2 className="mt-3 font-serif text-4xl">{title === "Bride's Team" ? "Her Side" : "His Side"}</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10">
            {members.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08}>
                <div className="text-center">
                  <div className="aspect-[3/4] bg-secondary border border-border mb-4 overflow-hidden">
                    <div className="size-full flex items-center justify-center font-serif text-5xl text-accent/40">
                      {m.name.split(" ").map(n => n[0]).join("")}
                    </div>
                  </div>
                  <p className="text-[10px] uppercase tracking-luxe text-accent">{m.role}</p>
                  <p className="mt-1 font-serif text-xl">{m.name}</p>
                  <p className="mt-2 text-xs text-muted-foreground italic">{m.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
