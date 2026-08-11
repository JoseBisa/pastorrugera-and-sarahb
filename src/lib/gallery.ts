export const GALLERY_BUCKET = "shared-gallery";
export const SIGNED_EXPIRY = 60 * 60 * 24 * 365 * 10; // 10 years

export const ACCEPTED_IMAGE_TYPES =
  ".jpg,.jpeg,.png,.webp,.gif,.bmp,.svg,.heic,.heif,image/*";

export const DEFAULT_CAPTION = "Shared from our wedding memories 💍";

export const GALLERY_CATEGORIES = [
  "Adventures",
  "Family Introduction",
  "Mahari",
  "Proposal",
] as const;

export type GalleryItem = {
  id: string;
  src: string;
  caption: string | null;
  uploaderName: string | null;
  uploadedAt: string | null;
  category: string;
};

export function extFromName(name: string, fallback = "jpg") {
  const ext = name.split(".").pop()?.toLowerCase();
  return ext && ext.length <= 5 ? ext : fallback;
}

function extFromUrl(url: string) {
  try {
    const path = new URL(url, "https://x").pathname;
    const ext = path.split(".").pop()?.toLowerCase();
    return ext && /^[a-z0-9]{2,5}$/.test(ext) ? ext : "jpg";
  } catch {
    return "jpg";
  }
}

/** Downloads the original file, preserving its extension, with a friendly name. */
export async function downloadImage(url: string, index: number) {
  const num = String(index + 1).padStart(3, "0");
  const filename = `whitesands-wedding-memory-${num}.${extFromUrl(url)}`;
  try {
    const res = await fetch(url, { mode: "cors" });
    if (!res.ok) throw new Error("fetch failed");
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
  } catch {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.target = "_blank";
    a.rel = "noreferrer";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}
