import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Check, Gift } from "lucide-react";

export const Route = createFileRoute("/registry")({
  head: () => ({
    meta: [
      { title: "Pledge Registry — Pastor Rugera & Sarah B" },
      {
        name: "description",
        content:
          "Support our future together with a heartfelt pledge and your kind blessings.",
      },
    ],
  }),
  component: Registry,
});

function Registry() {
  const [form, setForm] = useState({
    name: "",
    pledge_amount: "",
  });

  const [done, setDone] = useState(false);

  const submit = useMutation({
    mutationFn: async () => {
      if (!form.name.trim() || !form.pledge_amount.trim()) {
        throw new Error("Name and pledge amount are required");
      }

      const { error } = await supabase.from("gift_registry").insert({
        name: form.name.trim().slice(0, 100),
        pledge_amount: form.pledge_amount.trim().slice(0, 100),
      });

      if (error) throw error;
    },

    onSuccess: () => {
      setDone(true);
      toast.success("Thank you — your pledge has been received");
    },

    onError: (e: Error) => toast.error(e.message),
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit.mutate();
  };

  return (
    <>
      <section className="px-6 py-20 text-center">
        <Reveal>
          <SectionLabel>Pledge Registry</SectionLabel>
          <h1 className="mt-6 font-serif text-5xl sm:text-6xl">
            Pledge Registry
          </h1>
          <p className="max-w-xl mx-auto mt-6 font-display italic text-lg text-muted-foreground">
            Instead of traditional gifts, we invite you to make a meaningful
            pledge toward our life together.
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
                Your pledge has been received with heartfelt gratitude. Thank
                you for supporting the beginning of our new journey together.
              </p>

              <button
                onClick={() => {
                  setDone(false);
                  setForm({ name: "", pledge_amount: "" });
                }}
                className="mt-8 text-[10px] uppercase tracking-luxe border-b border-accent pb-1"
              >
                Submit Another
              </button>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <form
              onSubmit={onSubmit}
              className="border border-border bg-card p-7 sm:p-10 space-y-5"
            >
              <Field
                label="Your Name *"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                required
              />

              <Field
                label="Pledge Amount *"
                value={form.pledge_amount}
                onChange={(v) => setForm({ ...form, pledge_amount: v })}
                placeholder="e.g. TZS 150,000"
                required
              />

              <button
                type="submit"
                disabled={submit.isPending}
                className="w-full py-3 bg-foreground text-background text-[10px] uppercase tracking-luxe hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-60"
              >
                {submit.isPending ? "Sending..." : "Submit Pledge"}
              </button>
            </form>
          </Reveal>
        )}
      </section>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-luxe text-muted-foreground mb-2">
        {label}
      </label>

      <input
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        maxLength={100}
        className="w-full bg-background border border-input px-4 py-3 text-sm focus:border-accent outline-none"
      />
    </div>
  );
}
