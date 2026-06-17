
-- Payment methods (admin-managed; publicly readable)
CREATE TABLE public.payment_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  method_type text NOT NULL DEFAULT 'mobile',
  account_name text,
  account_number text NOT NULL,
  instructions text,
  sort_order int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.payment_methods TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.payment_methods TO authenticated;
GRANT ALL ON public.payment_methods TO service_role;
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active payment methods are public"
  ON public.payment_methods FOR SELECT
  USING (active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage payment methods"
  ON public.payment_methods FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Location images (admin-managed; publicly readable)
CREATE TABLE public.location_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location_key text NOT NULL UNIQUE,
  image_url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.location_images TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.location_images TO authenticated;
GRANT ALL ON public.location_images TO service_role;
ALTER TABLE public.location_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Location images are public"
  ON public.location_images FOR SELECT USING (true);
CREATE POLICY "Admins manage location images"
  ON public.location_images FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;
CREATE TRIGGER trg_payment_methods_updated BEFORE UPDATE ON public.payment_methods
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_location_images_updated BEFORE UPDATE ON public.location_images
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
