import { useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, Trash2 } from "lucide-react";
import { GALLERY_CATEGORIES } from "@/lib/gallery";

const BUCKET = "gallery-images";
const SIGNED_EXPIRY = 60 * 60 * 24 * 365 * 10; // 10 years

const CATEGORIES: string[] = [...GALLERY_CATEGORIES];

export function AdminGallery() {
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [busy, setBusy] = useState(false);

  const list = useQuery({
    queryKey: ["admin-gallery-images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("id,image_url,category,storage_path,created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const remove = useMutation({
    mutationFn: async (row: { id: string; storage_path: string | null }) => {
      if (row.storage_path) {
        await supabase.storage.from(BUCKET).remove([row.storage_path]);
      }
      const { error } = await supabase.from("gallery_images").delete().eq("id", row.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-gallery-images"] });
      qc.invalidateQueries({ queryKey: ["gallery-images"] });
      toast.success("Photo removed");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  async function handleFiles(files: FileList) {
    setBusy(true);
    try {
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const up = await supabase.storage.from(BUCKET).upload(path, file, { contentType: file.type });
        if (up.error) throw up.error;
        const signed = await supabase.storage.from(BUCKET).createSignedUrl(path, SIGNED_EXPIRY);
        if (signed.error) throw signed.error;
        const { error } = await supabase.from("gallery_images").insert({
          image_url: signed.data.signedUrl,
          storage_path: path,
          category,
        });
        if (error) throw error;
      }
      toast.success(`Uploaded ${files.length} photo${files.length > 1 ? "s" : ""}`);
      qc.invalidateQueries({ queryKey: ["admin-gallery-images"] });
      qc.invalidateQueries({ queryKey: ["gallery-images"] });
    } catch (e: any) {
      toast.error(e.message ?? "Upload failed");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const rows = list.data ?? [];

  return (
    <div className="space-y-8">
      <div className="border border-border bg-card p-5">
        <p className="text-sm text-muted-foreground mb-4">
          Add new photos to the public Gallery page. Choose a category, then upload one or more images.
        </p>
        <div className="flex flex-wrap gap-3 items-end">
          <label className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-luxe text-muted-foreground">Category</span>
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="border border-border bg-background px-3 py-2 text-sm">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
            onChange={e => { if (e.target.files?.length) handleFiles(e.target.files); }} />
          <button onClick={() => fileRef.current?.click()} disabled={busy}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground text-[11px] uppercase tracking-luxe disabled:opacity-50">
            <Upload className="size-3.5" /> {busy ? "Uploading…" : "Upload photos"}
          </button>
        </div>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-4">{rows.length} uploaded photo{rows.length === 1 ? "" : "s"}</p>
        {list.isLoading ? (
          <p className="text-center text-muted-foreground py-12">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No uploads yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {rows.map(r => (
              <div key={r.id} className="border border-border bg-card overflow-hidden">
                <div className="aspect-square bg-muted">
                  <img src={r.image_url} alt={r.category} className="size-full object-cover" />
                </div>
                <div className="p-3 flex items-center justify-between gap-2">
                  <span className="text-[10px] uppercase tracking-luxe text-muted-foreground truncate">{r.category}</span>
                  <button onClick={() => confirm("Remove this photo?") && remove.mutate({ id: r.id, storage_path: r.storage_path })}
                    className="p-1.5 border border-destructive text-destructive">
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
