import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(ctx: { supabase: any; userId: string }) {
  const { data, error } = await ctx.supabase.rpc("has_role", {
    _user_id: ctx.userId,
    _role: "admin",
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden");
}

export const claimAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("claim_admin");
    if (error) throw new Error(error.message);
    return { isAdmin: !!data };
  });

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (error) throw new Error(error.message);
    return { isAdmin: !!data };
  });

export const adminGetDashboard = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const [rsvps, guestbook] = await Promise.all([
      context.supabase.from("rsvps").select("*").order("created_at", { ascending: false }),
      context.supabase.from("guestbook").select("*").order("created_at", { ascending: false }),
    ]);
    if (rsvps.error) throw new Error(rsvps.error.message);
    if (guestbook.error) throw new Error(guestbook.error.message);

    const rsvpRows = rsvps.data ?? [];
    const attending = rsvpRows.filter((r: any) => r.attending);
    const declined = rsvpRows.filter((r: any) => !r.attending);
    const totalGuests = attending.reduce((s: number, r: any) => s + (r.guest_count ?? 1), 0);

    return {
      rsvps: rsvpRows,
      guestbook: guestbook.data ?? [],
      stats: {
        totalRsvps: rsvpRows.length,
        attendingHouseholds: attending.length,
        declined: declined.length,
        totalGuests,
        guestbookCount: (guestbook.data ?? []).length,
        guestbookPending: (guestbook.data ?? []).filter((g: any) => !g.approved).length,
      },
    };
  });

export const adminSetGuestbookApproved = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string; approved: boolean }) => d)
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { error } = await context.supabase
      .from("guestbook")
      .update({ approved: data.approved })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteGuestbook = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("guestbook").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteRsvp = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("rsvps").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminGetPledges = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { data, error } = await (context.supabase as any)
      .from("pledges")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    const rows = (data ?? []) as { id: string; name: string; amount: number; created_at: string }[];
    const total = rows.reduce((s, r) => s + Number(r.amount ?? 0), 0);
    return { pledges: rows, total };
  });

export const adminDeletePledge = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { error } = await (context.supabase as any).from("pledges").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
