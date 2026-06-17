import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  claimAdmin,
  adminGetDashboard,
  adminSetGuestbookApproved,
  adminDeleteGuestbook,
  adminDeleteRsvp,
} from "@/lib/admin.functions";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Users, Heart, MessageSquare, Calendar, LogOut, Download, Trash2, Eye, EyeOff } from "lucide-react";
import { AdminPaymentMethods } from "@/components/admin/AdminPaymentMethods";
import { AdminLocationImages } from "@/components/admin/AdminLocationImages";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const claim = useServerFn(claimAdmin);
  const getDash = useServerFn(adminGetDashboard);
  const setApproved = useServerFn(adminSetGuestbookApproved);
  const delGuest = useServerFn(adminDeleteGuestbook);
  const delRsvp = useServerFn(adminDeleteRsvp);

  const [tab, setTab] = useState<"overview" | "rsvps" | "guestbook" | "contributions" | "images">("overview");
  const [bootstrapped, setBootstrapped] = useState(false);

  // Bootstrap admin claim on first visit
  useEffect(() => {
    claim().then(() => setBootstrapped(true)).catch(() => setBootstrapped(true));
  }, [claim]);

  const dash = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: () => getDash(),
    enabled: bootstrapped,
    retry: false,
  });

  const isForbidden = dash.error?.message?.includes("Forbidden");

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  function exportCsv() {
    if (!dash.data) return;
    const rows = dash.data.rsvps;
    const header = ["Name", "Email", "Phone", "Attending", "Guests", "Dietary", "Special Requests", "Submitted"];
    const csv = [
      header.join(","),
      ...rows.map((r: any) => [
        r.full_name, r.email ?? "", r.phone ?? "",
        r.attending ? "Yes" : "No", r.guest_count,
        (r.dietary ?? "").replace(/[\n,]/g, " "),
        (r.special_requests ?? "").replace(/[\n,]/g, " "),
        new Date(r.created_at).toISOString(),
      ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `rsvps-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  const approve = useMutation({
    mutationFn: (v: { id: string; approved: boolean }) => setApproved({ data: v }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-dashboard"] }); toast.success("Updated"); },
  });
  const removeGuest = useMutation({
    mutationFn: (id: string) => delGuest({ data: { id } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-dashboard"] }); toast.success("Deleted"); },
  });
  const removeRsvp = useMutation({
    mutationFn: (id: string) => delRsvp({ data: { id } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-dashboard"] }); toast.success("Deleted"); },
  });

  if (!bootstrapped || dash.isLoading) {
    return <main className="min-h-[100dvh] pt-32 px-6 text-center text-muted-foreground">Loading admin…</main>;
  }
  if (isForbidden) {
    return (
      <main className="min-h-[100dvh] pt-32 px-6 text-center max-w-md mx-auto">
        <h1 className="font-serif text-3xl">Access denied</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Your account isn't an admin. The first signed-in user becomes the admin automatically.
        </p>
        <button onClick={signOut} className="mt-6 px-6 py-2 border text-[11px] uppercase tracking-luxe">
          Sign out
        </button>
      </main>
    );
  }
  if (dash.error) {
    return <main className="min-h-[100dvh] pt-32 px-6 text-center text-destructive">Error: {dash.error.message}</main>;
  }

  const { stats, rsvps, guestbook } = dash.data!;

  return (
    <main className="min-h-[100dvh] pt-28 pb-20 px-4 sm:px-8 max-w-6xl mx-auto">
      <header className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-[10px] uppercase tracking-luxe text-accent">Wedding Dashboard</p>
          <h1 className="font-serif text-4xl sm:text-5xl mt-2">Pastor Rugera &amp; Sarah B · Admin</h1>
        </div>
        <button onClick={signOut} className="inline-flex items-center gap-2 px-4 py-2 border text-[11px] uppercase tracking-luxe hover:bg-foreground hover:text-background">
          <LogOut className="size-3.5" /> Sign out
        </button>
      </header>

      <nav className="flex gap-1 border-b border-border mb-8">
        {(["overview", "rsvps", "guestbook"] as const).map(t => (
          <button key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-3 text-[11px] uppercase tracking-luxe border-b-2 -mb-px transition-colors ${
              tab === t ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}>
            {t}
          </button>
        ))}
      </nav>

      {tab === "overview" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat icon={<Calendar className="size-4" />} label="Total RSVPs" value={stats.totalRsvps} />
          <Stat icon={<Heart className="size-4" />} label="Attending" value={stats.attendingHouseholds} sub={`${stats.totalGuests} guests`} />
          <Stat icon={<Users className="size-4" />} label="Declined" value={stats.declined} />
          <Stat icon={<MessageSquare className="size-4" />} label="Guestbook" value={stats.guestbookCount} sub={`${stats.guestbookPending} pending`} />
        </div>
      )}

      {tab === "rsvps" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-muted-foreground">{rsvps.length} submissions</p>
            <button onClick={exportCsv} className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground text-[11px] uppercase tracking-luxe">
              <Download className="size-3.5" /> Export CSV
            </button>
          </div>
          <div className="border border-border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50 text-left text-[10px] uppercase tracking-luxe">
                <tr>
                  <th className="p-3">Name</th><th className="p-3">Contact</th><th className="p-3">Status</th>
                  <th className="p-3">Guests</th><th className="p-3">Notes</th><th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {rsvps.map((r: any) => (
                  <tr key={r.id} className="border-t border-border align-top">
                    <td className="p-3 font-serif">{r.full_name}</td>
                    <td className="p-3 text-muted-foreground">
                      <div>{r.email}</div><div>{r.phone}</div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 text-[10px] uppercase tracking-luxe ${r.attending ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"}`}>
                        {r.attending ? "Attending" : "Declined"}
                      </span>
                    </td>
                    <td className="p-3">{r.guest_count}</td>
                    <td className="p-3 text-xs text-muted-foreground max-w-xs">
                      {r.dietary && <div><b>Diet:</b> {r.dietary}</div>}
                      {r.special_requests && <div className="mt-1">{r.special_requests}</div>}
                    </td>
                    <td className="p-3">
                      <button onClick={() => confirm("Delete this RSVP?") && removeRsvp.mutate(r.id)}
                        className="text-destructive hover:opacity-70"><Trash2 className="size-4" /></button>
                    </td>
                  </tr>
                ))}
                {rsvps.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No RSVPs yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "guestbook" && (
        <div className="space-y-4">
          {guestbook.map((g: any) => (
            <div key={g.id} className={`border p-5 ${g.approved ? "border-border bg-card" : "border-dashed border-accent/50 bg-accent/5"}`}>
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <p className="font-serif text-lg">{g.name}{g.location && <span className="text-muted-foreground text-sm"> · {g.location}</span>}</p>
                  <p className="mt-2 text-sm">{g.message}</p>
                  <p className="mt-2 text-[10px] uppercase tracking-luxe text-muted-foreground">
                    {new Date(g.created_at).toLocaleString()} · {g.approved ? "Visible" : "Hidden"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button title={g.approved ? "Hide" : "Approve"}
                    onClick={() => approve.mutate({ id: g.id, approved: !g.approved })}
                    className="p-2 border hover:bg-foreground hover:text-background">
                    {g.approved ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                  <button title="Delete"
                    onClick={() => confirm("Delete this message?") && removeGuest.mutate(g.id)}
                    className="p-2 border text-destructive hover:bg-destructive hover:text-destructive-foreground">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {guestbook.length === 0 && <p className="text-center text-muted-foreground py-12">No messages yet.</p>}
        </div>
      )}
    </main>
  );
}

function Stat({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: number; sub?: string }) {
  return (
    <div className="border border-border bg-card p-6">
      <div className="flex items-center gap-2 text-accent">{icon}<p className="text-[10px] uppercase tracking-luxe">{label}</p></div>
      <p className="mt-3 font-serif text-4xl">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}
