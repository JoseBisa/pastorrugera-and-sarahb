
CREATE POLICY "Admins upload location images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'location-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update location images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'location-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete location images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'location-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins read location images"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'location-images' AND public.has_role(auth.uid(), 'admin'));
