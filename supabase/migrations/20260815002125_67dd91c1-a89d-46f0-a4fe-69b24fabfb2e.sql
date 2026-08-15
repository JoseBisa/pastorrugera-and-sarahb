CREATE TABLE public.pledges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  amount numeric NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.pledges TO anon, authenticated;
GRANT SELECT, DELETE ON public.pledges TO authenticated;
GRANT ALL ON public.pledges TO service_role;

ALTER TABLE public.pledges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone insert pledge" ON public.pledges FOR INSERT TO anon, authenticated
WITH CHECK (length(name) >= 1 AND length(name) <= 120 AND amount > 0 AND amount <= 999999999999);

CREATE POLICY "admins read pledges" ON public.pledges FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "admins delete pledges" ON public.pledges FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));