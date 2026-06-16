import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Gift, Music, Check } from "lucide-react";

export const Route = createFileRoute("/registry")({
  head: () => ({
    meta: [
      { title: "Gift Registry — Sarah & Ruge" },
      { name: "description", content: "Share a gift, request a song — celebrate Sarah and Ruge in your own way." },
    ],
  }),
  component: Registry,
});

function Registry() {
  const [form, setForm] = useState({ name: "", gift_description: "", music_request: "", note: "" });
  const [done, setDone] = useState(false);

  const submit = useMutation({
    mutationFn: async () => {
      if (!form.name.trim() || !form.gift_description.trim()) throw new Error("Name and gift are required");
      const { error } = await supabase.from("gift_registry").insert({
        name: form.name.trim().slice(0, 100),
        gift_description: form.gift_description.trim().slice(0, 500),
        music_request: form.music_request.trim().slice(0, 200) || null,
        note: form.note.trim().slice(0, 500) || null,
      });
      if (error) throw error;
    },
    onSuccess: () => { setDone(true); toast.success("Thank you — your gift means the world to us"); },
    onError: (e: Error) => toast.error(e.message),
  });

  const onSubmit = (e: FormEvent) => { e.preventDefault(); submit.mutate(); };

  return (
    <>
      <section className="px-6 py-20 text-center">
        <Reveal>
          <SectionLabel>Gifts & Music</SectionLabel>
          <h1 className="mt-6 font-serif text-5xl sm:text-6xl">A Gift, A Song.</h1>
          <p className="max-w-xl mx-auto mt-6 font-display italic text-lg text-muted-foreground">
            Your presence is our greatest gift. If you wish, share what you're bringing or a song to dance to.
          </p>
        </Reveal>
      </section>

      <section className="px-6 max-w-2xl mx-auto pb-32">
        {done ? (
          <Reveal>
            <div className="border border-accent bg-card p-10 text-center">
              <Check className="size-10 text-accent mx-auto mb-4" />
              <h2 className="font-serif text-3xl">Thank You</h2>
              <div className="gold-rule mx-auto my-5" />
              <p className="font-display italic text-foreground/80">
                Your gesture has been received with so much gratitude. We can't wait to celebrate with you.
              </p>
              <button onClick={() => { setDone(false); setForm({ name: "", gift_description: "", music_request: "", note: "" }); }}
                className="mt-8 text-[10px] uppercase tracking-luxe border-b border-accent pb-1">
                Submit Another
              </button>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <form onSubmit={onSubmit} className="border border-border bg-card p-7 sm:p-10 space-y-5">
              <Field label="Your Name *" value={form.name} onChange={v => setForm({ ...form, name: v })} required />
              <div>
                <label className="block text-[10px] uppercase tracking-luxe text-muted-foreground mb-2 flex items-center gap-2">
                  <Gift className="size-3.5 text-accent" /> Gift Description *
                </label>
                <textarea required rows={3} maxLength={500} value={form.gift_description}
                  onChange={e => setForm({ ...form, gift_description: e.target.value })}
                  className="w-full bg-background border border-input px-4 py-3 text-sm focus:border-accent outline-none" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-luxe text-muted-foreground mb-2 flex items-center gap-2">
                  <Music className="size-3.5 text-accent" /> Song Request for the DJ
                </label>
                <input value={form.music_request} maxLength={200}
                  onChange={e => setForm({ ...form, music_request: e.target.value })}
                  placeholder="Artist – Song title"
                  className="w-full bg-background border border-input px-4 py-3 text-sm focus:border-accent outline-none" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-luxe text-muted-foreground mb-2">Personal Note</label>
                <textarea rows={3} maxLength={500} value={form.note}
                  onChange={e => setForm({ ...form, note: e.target.value })}
                  className="w-full bg-background border border-input px-4 py-3 text-sm focus:border-accent outline-none" />
              </div>
              <button type="submit" disabled={submit.isPending}
                className="w-full py-3 bg-foreground text-background text-[10px] uppercase tracking-luxe hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-60">
                {submit.isPending ? "Sending..." : "Send With Love"}
              </button>
            </form>
          </Reveal>
        )}
      </section>
    </>
  );
}

function Field({ label, value, onChange, required }: { label: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-luxe text-muted-foreground mb-2">{label}</label>
      <input required={required} value={value} onChange={e => onChange(e.target.value)} maxLength={200}
        className="w-full bg-background border border-input px-4 py-3 text-sm focus:border-accent outline-none" />
    </div>
  );
}
