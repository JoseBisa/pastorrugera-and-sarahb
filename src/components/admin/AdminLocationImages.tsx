import { useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, Trash2 } from "lucide-react";
import { DAR_SECTIONS, locationKey } from "@/lib/dar-data";

const BUCKET = "location-images";
// 10 years
const SIGNED_EXPIRY = 60 * 60 * 24 * 365 * 10;

async function uploadAndSign(file: File, key: string): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safe = key.replace(/[^a-z0-9]+/gi, "_").toLowerCase();
  const path = `${safe}-${Date.now()}.${ext}`;
  const up = await supabase.storage.from(BUCKET).upload(path, file, { upsert: true, contentType: file.type });
  if (up.error) throw up.error;
  const signed = await supabase.storage.from(BUCKET).createSignedUrl(path, SIGNED_EXPIRY);
  if (signed.error) throw signed.error;
  return signed.data.signedUrl;
}

export function AdminLocationImages() {
  const qc = useQueryClient();

  const list = useQuery({
    queryKey: ["admin-location-images"],
    queryFn: async () => {
      const { data, error } = await supabase.from("location_images").select("location_key,image_url");
      if (error) throw error;
      const map: Record<string, string> = {};
      (data ?? []).forEach(r => { map[r.location_key] = r.image_url; });
      return map;
    },
  });

  const setImage = useMutation({
    mutationFn: async ({ key, file }: { key: string; file: File }) => {
      const url = await uploadAndSign(file, key);
      const { error } = await supabase
        .from("location_images")
        .upsert({ location_key: key, image_url: url }, { onConflict: "location_key" });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-location-images"] });
      qc.invalidateQueries({ queryKey: ["location-images"] });
      toast.success("Image saved");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const removeImage = useMutation({
    mutationFn: async (key: string) => {
      const { error } = await supabase.from("location_images").delete().eq("location_key", key);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-location-images"] });
      qc.invalidateQueries({ queryKey: ["location-images"] });
      toast.success("Image removed");
    },
  });

  const imgs = list.data ?? {};

  return (
    <div className="space-y-10">
      <p className="text-sm text-muted-foreground">
        Upload a picture for each location listed on the Visiting Dar page. Images appear on the cards immediately.
      </p>
      {DAR_SECTIONS.map(sec => (
        <div key={sec.key}>
          <h3 className="font-serif text-2xl mb-4">{sec.title}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sec.items.map(it => {
              const key = locationKey(sec.key, it.name);
              const url = imgs[key];
              return (
                <LocationCard
                  key={key}
                  name={it.name}
                  url={url}
                  uploading={setImage.isPending}
                  onFile={(file) => setImage.mutate({ key, file })}
                  onRemove={() => confirm("Remove image?") && removeImage.mutate(key)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function LocationCard({
  name, url, uploading, onFile, onRemove,
}: { name: string; url?: string; uploading: boolean; onFile: (f: File) => void; onRemove: () => void }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="border border-border bg-card overflow-hidden">
      <div className="aspect-[16/10] bg-muted relative">
        {url ? (
          <img src={url} alt={name} className="size-full object-cover" />
        ) : (
          <div className="size-full flex items-center justify-center text-xs text-muted-foreground uppercase tracking-luxe">No image</div>
        )}
      </div>
      <div className="p-3">
        <p className="font-serif text-sm leading-snug mb-3 line-clamp-2">{name}</p>
        <div className="flex gap-2">
          <input ref={ref} type="file" accept="image/*" className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f); e.target.value = ""; }} />
          <button onClick={() => ref.current?.click()} disabled={uploading}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-2 py-1.5 border text-[10px] uppercase tracking-luxe hover:bg-foreground hover:text-background disabled:opacity-50">
            <Upload className="size-3" /> {url ? "Replace" : "Upload"}
          </button>
          {url && (
            <button onClick={onRemove} className="px-2 py-1.5 border border-destructive text-destructive">
              <Trash2 className="size-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
