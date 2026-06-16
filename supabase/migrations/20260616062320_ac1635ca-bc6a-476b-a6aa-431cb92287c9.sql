
-- Fix rsvps_public_pii_exposure: remove public read access (PII)
DROP POLICY IF EXISTS "anyone read rsvp" ON public.rsvps;

-- Fix SECURITY DEFINER function executable by anon (claim_admin/has_role)
REVOKE EXECUTE ON FUNCTION public.claim_admin() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.claim_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

-- Fix RLS Policy Always True: replace permissive WITH CHECK (true) on INSERT
-- policies with bounded validation checks (preserves public submit behaviour).
DROP POLICY IF EXISTS "anyone insert rsvp" ON public.rsvps;
CREATE POLICY "anyone insert rsvp" ON public.rsvps
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(full_name) BETWEEN 1 AND 200
    AND guest_count BETWEEN 1 AND 20
    AND (email IS NULL OR length(email) <= 320)
    AND (phone IS NULL OR length(phone) <= 40)
    AND (dietary IS NULL OR length(dietary) <= 1000)
    AND (special_requests IS NULL OR length(special_requests) <= 2000)
  );

DROP POLICY IF EXISTS "anyone insert guestbook" ON public.guestbook;
CREATE POLICY "anyone insert guestbook" ON public.guestbook
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 1 AND 100
    AND length(message) BETWEEN 1 AND 2000
    AND (location IS NULL OR length(location) <= 200)
  );

DROP POLICY IF EXISTS "anyone insert gift" ON public.gift_registry;
CREATE POLICY "anyone insert gift" ON public.gift_registry
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 1 AND 100
    AND length(gift_description) BETWEEN 1 AND 1000
    AND (note IS NULL OR length(note) <= 2000)
    AND (music_request IS NULL OR length(music_request) <= 500)
  );
