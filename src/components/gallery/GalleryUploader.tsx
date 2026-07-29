import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, X, ImagePlus } from "lucide-react";
import { ACCEPTED_IMAGE_TYPES, GALLERY_BUCKET, SIGNED_EXPIRY, extFromName } from "@/lib/gallery";

type Staged = { file: File; preview: string; caption: string };

export function GalleryUploader() {
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [staged, setStaged] = useState<Staged[]>([]);
  const [name, setName] = useState("");
  const [progress, setProgress] = useState(0);

  function addFiles(files: FileList | File[]) {
    const list = Array.from(files).filter(f => f.type.startsWith("image/") || /\.(heic|heif|svg|bmp)$/i.test(f.name));
    if (!list.length) return toast.error("Please choose image files");
    setStaged(s => [...s, ...list.map(file => ({ file, preview: URL.createObjectURL(file), caption: "" }))]);
    setOpen(true);
  }

  const upload = useMutation({
    mutationFn: async () => {
      let done = 0;
      for (const item of staged) {
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extFromName(item.file.name)}`;
        const up = await supabase.storage
          .from(GALLERY_BUCKET)
          .upload(path, item.file, { contentType: item.file.type || "image/jpeg" });
        if (up.error) throw up.error;
        const signed = await supabase.storage.from(GALLERY_BUCKET).createSignedUrl(path, SIGNED_EXPIRY);
        if (signed.error) throw signed.error;
        const { error } = await supabase.from("gallery_images").insert({
          image_url: signed.data.signedUrl,
          storage_path: path,
          category: "Guest Uploads",
          caption: item.caption.trim().slice(0, 500) || null,
          uploader_name: name.trim().slice(0, 80) || null,
        });
        if (error) throw error;
        done += 1;
        setProgress(Math.round((done / staged.length) * 100));
      }
    },
    onSuccess: () => {
      toast.success("Thank you for sharing! Your photos are now in the gallery.");
      staged.forEach(s => URL.revokeObjectURL(s.preview));
      setStaged([]);
      setProgress(0);
      setOpen(false);
      qc.invalidateQueries({ queryKey: ["gallery-images"] });
      qc.invalidateQueries({ queryKey: ["admin-gallery-images"] });
    },
    onError: (e: Error) => {
      setProgress(0);
      toast.error(e.message ?? "Upload failed");
    },
  });

  return (
    <div className="max-w-3xl mx-auto px-6">
      <input
        ref={fileRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES}
        multiple
        className="hidden"
        onChange={e => { if (e.target.files?.length) addFiles(e.target.files); e.target.value = ""; }}
      />

      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files); }}
        className={`rounded-2xl border border-dashed backdrop-blur-md bg-card/60 shadow-sm transition-colors p-8 text-center ${
          dragging ? "border-accent bg-accent/10" : "border-border"
        }`}
      >
        <ImagePlus className="size-6 mx-auto text-accent" />
        <button
          onClick={() => fileRef.current?.click()}
          className="mt-5 inline-flex items-center gap-2 rounded-full px-7 py-3 bg-accent text-accent-foreground text-[10px] uppercase tracking-luxe shadow-sm hover:opacity-90 transition-all hover:-translate-y-0.5"
        >
          <Upload className="size-3.5" /> Upload Photos
        </button>
        <p className="mt-4 text-xs text-muted-foreground">
          Drag &amp; drop your photos here, or tap to browse. JPG, PNG, WEBP, GIF, BMP, SVG and HEIC welcome.
        </p>
      </div>

      {open && staged.length > 0 && (
        <div className="mt-6 rounded-2xl border border-border bg-card/70 backdrop-blur-md shadow-sm p-6 space-y-5">
          <div className="space-y-4">
            {staged.map((s, i) => (
              <div key={i} className="flex gap-4 items-start">
                <img src={s.preview} alt="" className="size-20 rounded-xl object-cover shrink-0" />
                <textarea
                  value={s.caption}
                  onChange={e => setStaged(prev => prev.map((p, j) => (j === i ? { ...p, caption: e.target.value } : p)))}
                  maxLength={500}
                  rows={2}
                  placeholder="Share your thoughts about this photo or the event..."
                  className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm resize-none"
                />
                <button
                  onClick={() => setStaged(prev => prev.filter((_, j) => j !== i))}
                  className="p-1.5 text-muted-foreground hover:text-destructive"
                  aria-label="Remove photo"
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>

          <input
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={80}
            placeholder="Your name (optional)"
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
          />

          {upload.isPending && (
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-accent transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => upload.mutate()}
              disabled={upload.isPending}
              className="rounded-full px-6 py-2.5 bg-accent text-accent-foreground text-[10px] uppercase tracking-luxe disabled:opacity-50"
            >
              {upload.isPending ? `Uploading… ${progress}%` : `Share ${staged.length} photo${staged.length > 1 ? "s" : ""}`}
            </button>
            <button
              onClick={() => { staged.forEach(s => URL.revokeObjectURL(s.preview)); setStaged([]); setOpen(false); }}
              disabled={upload.isPending}
              className="rounded-full px-6 py-2.5 border border-border text-[10px] uppercase tracking-luxe disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
