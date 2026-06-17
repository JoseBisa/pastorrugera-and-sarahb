import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash2, Plus, Save, Eye, EyeOff } from "lucide-react";

type PaymentMethod = {
  id: string;
  label: string;
  method_type: string;
  account_name: string | null;
  account_number: string;
  instructions: string | null;
  sort_order: number;
  active: boolean;
};

const blank = {
  label: "",
  method_type: "mobile",
  account_name: "",
  account_number: "",
  instructions: "",
  sort_order: 0,
  active: true,
};

export function AdminPaymentMethods() {
  const qc = useQueryClient();
  const [draft, setDraft] = useState({ ...blank });

  const list = useQuery({
    queryKey: ["admin-payment-methods"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payment_methods")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []) as PaymentMethod[];
    },
  });

  const create = useMutation({
    mutationFn: async () => {
      if (!draft.label.trim() || !draft.account_number.trim()) throw new Error("Label and account number required");
      const { error } = await supabase.from("payment_methods").insert({
        label: draft.label.trim(),
        method_type: draft.method_type,
        account_name: draft.account_name.trim() || null,
        account_number: draft.account_number.trim(),
        instructions: draft.instructions.trim() || null,
        sort_order: draft.sort_order,
        active: draft.active,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setDraft({ ...blank });
      qc.invalidateQueries({ queryKey: ["admin-payment-methods"] });
      qc.invalidateQueries({ queryKey: ["payment-methods"] });
      toast.success("Added");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const update = useMutation({
    mutationFn: async (m: PaymentMethod) => {
      const { error } = await supabase.from("payment_methods").update({
        label: m.label, method_type: m.method_type, account_name: m.account_name,
        account_number: m.account_number, instructions: m.instructions,
        sort_order: m.sort_order, active: m.active,
      }).eq("id", m.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-payment-methods"] });
      qc.invalidateQueries({ queryKey: ["payment-methods"] });
      toast.success("Saved");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("payment_methods").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-payment-methods"] });
      qc.invalidateQueries({ queryKey: ["payment-methods"] });
      toast.success("Deleted");
    },
  });

  return (
    <div className="space-y-8">
      <div className="border border-dashed border-accent/50 bg-accent/5 p-5">
        <p className="text-[10px] uppercase tracking-luxe text-accent mb-4">Add new method</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Label (e.g. M-Pesa, NMB Bank)" value={draft.label} onChange={v => setDraft({ ...draft, label: v })} />
          <div>
            <label className="block text-[10px] uppercase tracking-luxe text-muted-foreground mb-2">Type</label>
            <select value={draft.method_type} onChange={e => setDraft({ ...draft, method_type: e.target.value })}
              className="w-full bg-background border border-input px-3 py-2 text-sm">
              <option value="mobile">Mobile Money</option>
              <option value="bank">Bank</option>
              <option value="other">Other</option>
            </select>
          </div>
          <Field label="Account / Recipient Name" value={draft.account_name} onChange={v => setDraft({ ...draft, account_name: v })} />
          <Field label="Account / Phone Number *" value={draft.account_number} onChange={v => setDraft({ ...draft, account_number: v })} />
          <div className="sm:col-span-2">
            <label className="block text-[10px] uppercase tracking-luxe text-muted-foreground mb-2">Instructions (optional)</label>
            <textarea rows={2} value={draft.instructions} onChange={e => setDraft({ ...draft, instructions: e.target.value })}
              className="w-full bg-background border border-input px-3 py-2 text-sm" />
          </div>
        </div>
        <button onClick={() => create.mutate()} disabled={create.isPending}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground text-[11px] uppercase tracking-luxe">
          <Plus className="size-3.5" /> Add Method
        </button>
      </div>

      <div className="space-y-3">
        {(list.data ?? []).map(m => <PMRow key={m.id} pm={m} onSave={v => update.mutate(v)} onDelete={() => confirm("Delete?") && remove.mutate(m.id)} />)}
        {list.data?.length === 0 && <p className="text-center text-muted-foreground py-8">No payment methods yet.</p>}
      </div>
    </div>
  );
}

function PMRow({ pm, onSave, onDelete }: { pm: PaymentMethod; onSave: (m: PaymentMethod) => void; onDelete: () => void }) {
  const [local, setLocal] = useState<PaymentMethod>(pm);
  return (
    <div className={`border p-5 ${local.active ? "border-border bg-card" : "border-dashed border-muted bg-muted/20"}`}>
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Label" value={local.label} onChange={v => setLocal({ ...local, label: v })} />
        <div>
          <label className="block text-[10px] uppercase tracking-luxe text-muted-foreground mb-2">Type</label>
          <select value={local.method_type} onChange={e => setLocal({ ...local, method_type: e.target.value })}
            className="w-full bg-background border border-input px-3 py-2 text-sm">
            <option value="mobile">Mobile Money</option>
            <option value="bank">Bank</option>
            <option value="other">Other</option>
          </select>
        </div>
        <Field label="Account Name" value={local.account_name ?? ""} onChange={v => setLocal({ ...local, account_name: v })} />
        <Field label="Account / Phone Number" value={local.account_number} onChange={v => setLocal({ ...local, account_number: v })} />
        <div className="sm:col-span-2">
          <label className="block text-[10px] uppercase tracking-luxe text-muted-foreground mb-2">Instructions</label>
          <textarea rows={2} value={local.instructions ?? ""} onChange={e => setLocal({ ...local, instructions: e.target.value })}
            className="w-full bg-background border border-input px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-luxe text-muted-foreground mb-2">Sort order</label>
          <input type="number" value={local.sort_order} onChange={e => setLocal({ ...local, sort_order: Number(e.target.value) })}
            className="w-full bg-background border border-input px-3 py-2 text-sm" />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => onSave(local)} className="inline-flex items-center gap-2 px-3 py-2 bg-accent text-accent-foreground text-[10px] uppercase tracking-luxe">
          <Save className="size-3.5" /> Save
        </button>
        <button onClick={() => onSave({ ...local, active: !local.active })} className="inline-flex items-center gap-2 px-3 py-2 border text-[10px] uppercase tracking-luxe">
          {local.active ? <><EyeOff className="size-3.5" /> Hide</> : <><Eye className="size-3.5" /> Show</>}
        </button>
        <button onClick={onDelete} className="inline-flex items-center gap-2 px-3 py-2 border border-destructive text-destructive text-[10px] uppercase tracking-luxe ml-auto">
          <Trash2 className="size-3.5" /> Delete
        </button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-luxe text-muted-foreground mb-2">{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)}
        className="w-full bg-background border border-input px-3 py-2 text-sm" />
    </div>
  );
}
