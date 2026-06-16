import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/guestbook")({
  head: () => ({
    meta: [
      { title: "Guestbook — Pastor Rugera & Sarah B" },
      { name: "description", content: "Leave a message of love for Pastor Rugera and Sarah B." },
    ],
  }),
  component: Guestbook,
});

function Guestbook() {
  const qc = useQueryClient();
  const [form, setForm] = useState({ name: "", location: "", message: "" });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const pageSize = 6;

  const { data: entries = [] } = useQuery({
    queryKey: ["guestbook"],
    queryFn: async () => {
      const { data, error } = await supabase.from("guestbook").select("*").eq("approved", true).order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const submit = useMutation({
    mutationFn: async () => {
      if (!form.name.trim() || !form.message.trim()) throw new Error("Name and message are required");
      const { error } = await supabase.from("guestbook").insert({
        name: form.name.trim().slice(0, 100),
        location: form.location.trim().slice(0, 100) || null,
        message: form.message.trim().slice(0, 800),
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Thank you for your beautiful message");
      setForm({ name: "", location: "", message: "" });
      qc.invalidateQueries({ queryKey: ["guestbook"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const filtered = entries.filter(e =>
    !search || (e.name + " " + e.message + " " + (e.location ?? "")).toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const slice = filtered.slice(page * pageSize, page * pageSize + pageSize);

  const onSubmit = (e: FormEvent) => { e.preventDefault(); submit.mutate(); };

  return (
    <>
      <section className="px-6 py-20 text-center">
        <Reveal>
          <SectionLabel>Guestbook</SectionLabel>
          <h1 className="mt-6 font-serif text-5xl sm:text-6xl">Words to Carry With Us</h1>
          <p className="max-w-xl mx-auto mt-6 font-display italic text-lg text-muted-foreground">
            Leave a wish, a blessing, or a memory — we will treasure it always.
          </p>
        </Reveal>
      </section>

      <section className="px-6 max-w-2xl mx-auto pb-16">
        <Reveal>
          <form onSubmit={onSubmit} className="border border-border bg-card p-7 sm:p-10 space-y-5">
            <Field label="Your Name" value={form.name} onChange={v => setForm({ ...form, name: v })} required />
            <Field label="City / Country" value={form.location} onChange={v => setForm({ ...form, location: v })} />
            <div>
              <label className="block text-[10px] uppercase tracking-luxe text-muted-foreground mb-2">Message</label>
              <textarea required rows={5} maxLength={800} value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full bg-background border border-input px-4 py-3 text-sm focus:border-accent outline-none transition-colors" />
            </div>
            <button type="submit" disabled={submit.isPending}
              className="w-full py-3 bg-foreground text-background text-[10px] uppercase tracking-luxe hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-60">
              {submit.isPending ? "Sending..." : "Sign the Guestbook"}
            </button>
          </form>
        </Reveal>
      </section>

      <section className="px-6 max-w-5xl mx-auto pb-24">
        <div className="mb-8 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">{filtered.length} Messages</p>
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(0); }}
            placeholder="Search messages..."
            className="bg-background border border-input px-4 py-2 text-sm focus:border-accent outline-none w-full sm:w-64" />
        </div>

        {slice.length === 0 && (
          <p className="text-center text-muted-foreground py-10 font-display italic">Be the first to leave a message.</p>
        )}

        <div className="grid sm:grid-cols-2 gap-5">
          {slice.map((e, i) => (
            <motion.div key={e.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="border border-border bg-card p-6 hover:border-accent transition-colors">
              <p className="font-display italic text-foreground/85 leading-relaxed">"{e.message}"</p>
              <div className="gold-rule my-4" />
              <p className="font-serif text-lg">{e.name}</p>
              {e.location && <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">{e.location}</p>}
            </motion.div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => setPage(i)}
                className={`size-8 text-xs ${page === i ? "bg-accent text-accent-foreground" : "border border-border hover:border-accent"}`}>
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-luxe text-muted-foreground mb-2">{label}{required && " *"}</label>
      <input type={type} required={required} value={value} onChange={e => onChange(e.target.value)} maxLength={200}
        className="w-full bg-background border border-input px-4 py-3 text-sm focus:border-accent outline-none transition-colors" />
    </div>
  );
}
