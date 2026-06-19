
CREATE OR REPLACE FUNCTION public.claim_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  uid uuid := auth.uid();
  uemail text;
  allowed text[] := ARRAY['joebisanda@gmail.com','kwanjara@gmail.com','zilla1001983@gmail.com'];
BEGIN
  IF uid IS NULL THEN RETURN false; END IF;
  SELECT lower(email) INTO uemail FROM auth.users WHERE id = uid;
  IF uemail IS NULL OR NOT (uemail = ANY(allowed)) THEN
    RETURN false;
  END IF;
  IF public.has_role(uid, 'admin') THEN RETURN true; END IF;
  INSERT INTO public.user_roles (user_id, role) VALUES (uid, 'admin')
  ON CONFLICT DO NOTHING;
  RETURN true;
END;
$function$;

-- Revoke admin from anyone not on the allowlist
DELETE FROM public.user_roles
WHERE role = 'admin'
  AND user_id NOT IN (
    SELECT id FROM auth.users
    WHERE lower(email) IN ('joebisanda@gmail.com','kwanjara@gmail.com','zilla1001983@gmail.com')
  );
