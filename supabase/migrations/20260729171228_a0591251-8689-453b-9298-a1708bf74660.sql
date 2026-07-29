ALTER TABLE public.gallery_images ADD COLUMN IF NOT EXISTS uploader_name text;

GRANT SELECT, INSERT ON public.gallery_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_images TO authenticated;
GRANT ALL ON public.gallery_images TO service_role;

DROP POLICY IF EXISTS "Anyone can add gallery images" ON public.gallery_images;
CREATE POLICY "Anyone can add gallery images"
ON public.gallery_images FOR INSERT TO anon, authenticated
WITH CHECK (
  length(coalesce(caption, '')) <= 500
  AND length(coalesce(uploader_name, '')) <= 80
  AND length(image_url) <= 2000
);

DROP POLICY IF EXISTS "Anyone can upload shared gallery files" ON storage.objects;
CREATE POLICY "Anyone can upload shared gallery files"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'shared-gallery');

DROP POLICY IF EXISTS "Anyone can read shared gallery files" ON storage.objects;
CREATE POLICY "Anyone can read shared gallery files"
ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id = 'shared-gallery');

DROP POLICY IF EXISTS "Admins delete shared gallery files" ON storage.objects;
CREATE POLICY "Admins delete shared gallery files"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'shared-gallery' AND has_role(auth.uid(), 'admin'::app_role));