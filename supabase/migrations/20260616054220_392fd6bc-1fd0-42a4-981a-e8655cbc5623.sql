CREATE TABLE public.rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  guest_count INTEGER NOT NULL DEFAULT 1,
  attending BOOLEAN NOT NULL,
  dietary TEXT,
  special_requests TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.rsvps TO anon, authenticated;
GRANT ALL ON public.rsvps TO service_role;

ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone insert rsvp"
ON public.rsvps
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "anyone read rsvp"
ON public.rsvps
FOR SELECT
TO anon, authenticated
USING (true);


CREATE TABLE public.guestbook (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT,
  message TEXT NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.guestbook TO anon, authenticated;
GRANT ALL ON public.guestbook TO service_role;

ALTER TABLE public.guestbook ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone insert guestbook"
ON public.guestbook
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "anyone read approved"
ON public.guestbook
FOR SELECT
TO anon, authenticated
USING (approved = true);


CREATE TABLE public.gift_registry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  gift_description TEXT NOT NULL,
  music_request TEXT,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.gift_registry TO anon, authenticated;
GRANT ALL ON public.gift_registry TO service_role;

ALTER TABLE public.gift_registry ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone insert gift"
ON public.gift_registry
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "anyone read gift"
ON public.gift_registry
FOR SELECT
TO anon, authenticated
USING (true);


-- =========================================================
-- PLEDGE REGISTRY
-- =========================================================

CREATE TABLE public.pledges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  amount NUMERIC(15,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.pledges TO anon, authenticated;
GRANT ALL ON public.pledges TO service_role;

ALTER TABLE public.pledges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone insert pledge"
ON public.pledges
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 120
  AND amount > 0
);

CREATE POLICY "anyone read pledge"
ON public.pledges
FOR SELECT
TO anon, authenticated
USING (true);