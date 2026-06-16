import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Check } from "lucide-react";

export const Route = createFileRoute("/rsvp")({
  head: () => ({
    meta: [
      { title: "RSVP — Sarah & Ruge" },
      { name: "description", content: "Kindly respond to Sarah and Ruge's wedding invitation." },
    ],
  }),
  component: Rsvp,
});

function Rsvp() {
  const [form, setForm] = useState({
    full_name: "", phone: "", email: "",
    guest_count: 1, attending: true,
    dietary: "", special_requests: "",
  });
  const [done, setDone] = useState(false);

  const submit = useMutation({
    mutationFn: async () => {
      if (!form.full_name.trim()) throw new Error("Please enter your full name");
      const { error } = await supabase.from("rsvps").insert({
        full_name: form.full_name.trim().slice(0, 120),
        phone: form.phone.trim().slice(0, 40) || null,
        email: form.email.trim().slice(0, 120) || null,
        guest_count: Math.max(1, Math.min(10, Number(form.guest_count) || 1)),
        attending: form.attending,
        dietary: form.dietary.trim().slice(0, 500) || null,
        special_requests: form.special_requests.trim().slice(0, 500) || null,
      });
      if (error) throw error;
    },
    onSuccess: () => { setDone(true); toast.success("RSVP received — thank you!"); },
    onError: (e: Error) => toast.error(e.message),
  });

  const onSubmit = (e: FormEvent) => { e.preventDefault(); submit.mutate(); };

  return (
    <>
      <section className="px-6 py-20 text-center">
        <Reveal>
          <SectionLabel>Kindly Respond</SectionLabel>
          <h1 className="mt-6 font-serif text-5xl sm:text-6xl">RSVP</h1>
          <p className="max-w-xl mx-auto mt-6 font-display italic text-lg text-muted-foreground">
            Please respond by 1 November 2026 so we can plan the perfect celebration with you in mind.
          </p>
        </Reveal>
      </section>

      <section className="px-6 max-w-2xl mx-auto pb-32">
        {done ? (
          <Reveal>
            <div className="border border-accent bg-card p-10 text-center">
              <Check className="size-10 text-accent mx-auto mb-4" />
              <h2 className="font-serif text-3xl">
                {form.attending ? "We Can't Wait to See You" : "We'll Miss You"}
              </h2>
              <div className="gold-rule mx-auto my-5" />
              <p className="font-display italic text-foreground/80">
                {form.attending
                  ? "Your RSVP has been received. Save the date — 20 December 2026."
                  : "Thank you for letting us know. We'll be thinking of you on our day."}
              </p>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <form onSubmit={onSubmit} className="border border-border bg-card p-7 sm:p-10 space-y-5">
              <Field label="Full Name *" value={form.full_name} onChange={v => setForm({ ...form, full_name: v })} required />
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Phone" value={form.phone} onChange={v => setForm({ ...form, phone: v })} type="tel" />
                <Field label="Email" value={form.email} onChange={v => setForm({ ...form, email: v })} type="email" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-luxe text-muted-foreground mb-3">Will you be attending? *</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { v: true, l: "Joyfully Accepts" },
                    { v: false, l: "Regretfully Declines" },
                  ].map(o => (
                    <button key={String(o.v)} type="button"
                      onClick={() => setForm({ ...form, attending: o.v })}
                      className={`py-3 text-[10px] uppercase tracking-luxe border transition-colors ${
                        form.attending === o.v ? "bg-accent text-accent-foreground border-accent" : "border-border hover:border-foreground"
                      }`}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              {form.attending && (
                <>
                  <div>
                    <label className="block text-[10px] uppercase tracking-luxe text-muted-foreground mb-2">Number of Guests</label>
                    <select value={form.guest_count}
                      onChange={e => setForm({ ...form, guest_count: Number(e.target.value) })}
                      className="w-full bg-background border border-input px-4 py-3 text-sm focus:border-accent outline-none">
                      {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-luxe text-muted-foreground mb-2">Dietary Requirements</label>
                    <input value={form.dietary} maxLength={500}
                      onChange={e => setForm({ ...form, dietary: e.target.value })}
                      className="w-full bg-background border border-input px-4 py-3 text-sm focus:border-accent outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-luxe text-muted-foreground mb-2">Special Requests</label>
                    <textarea rows={3} maxLength={500} value={form.special_requests}
                      onChange={e => setForm({ ...form, special_requests: e.target.value })}
                      className="w-full bg-background border border-input px-4 py-3 text-sm focus:border-accent outline-none" />
                  </div>
                </>
              )}

              <button type="submit" disabled={submit.isPending}
                className="w-full py-3 bg-foreground text-background text-[10px] uppercase tracking-luxe hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-60">
                {submit.isPending ? "Sending..." : "Send RSVP"}
              </button>
            </form>
          </Reveal>
        )}
      </section>
    </>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-luxe text-muted-foreground mb-2">{label}</label>
      <input type={type} required={required} value={value} onChange={e => onChange(e.target.value)} maxLength={200}
        className="w-full bg-background border border-input px-4 py-3 text-sm focus:border-accent outline-none" />
    </div>
  );
}
