import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Trash2, Download } from "lucide-react";
import { adminGetPledges, adminDeletePledge } from "@/lib/admin.functions";

export function AdminPledges() {
  const qc = useQueryClient();
  const getPledges = useServerFn(adminGetPledges);
  const delPledge = useServerFn(adminDeletePledge);

  const q = useQuery({ queryKey: ["admin-pledges"], queryFn: () => getPledges() });

  const remove = useMutation({
    mutationFn: (id: string) => delPledge({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-pledges"] });
      toast.success("Pledge deleted");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (q.isLoading) return <p className="text-sm text-muted-foreground">Loading pledges…</p>;
  if (q.error) return <p className="text-sm text-destructive">Error: {(q.error as Error).message}</p>;

  const pledges = q.data?.pledges ?? [];
  const total = q.data?.total ?? 0;
  const fmt = (n: number) => new Intl.NumberFormat("en-US").format(Number(n));

  function exportCsv() {
    const csv = [
      "Name,Amount,Date",
      ...pledges.map((p) =>
        [p.name, p.amount, new Date(p.created_at).toISOString()]
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(","),
      ),
    ].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `pledges-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <p className="text-sm text-muted-foreground">
          {pledges.length} pledges · Total <span className="text-accent">TZS {fmt(total)}</span>
        </p>
        <button
          onClick={exportCsv}
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground text-[11px] uppercase tracking-luxe"
        >
          <Download className="size-3.5" /> Export CSV
        </button>
      </div>

      {pledges.length === 0 ? (
        <p className="text-sm text-muted-foreground border border-border p-6">No pledges received yet.</p>
      ) : (
        <div className="border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-left text-[10px] uppercase tracking-luxe">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Amount (TZS)</th>
                <th className="p-3">Received</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {pledges.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="p-3">{p.name}</td>
                  <td className="p-3 text-accent">{fmt(p.amount)}</td>
                  <td className="p-3 text-muted-foreground">{new Date(p.created_at).toLocaleString()}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => remove.mutate(p.id)}
                      aria-label="Delete pledge"
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
