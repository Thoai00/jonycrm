"use client";

import { useEffect, useRef, useState } from "react";
import { addSliderImage, deleteSliderImage, getSliderImages, type SliderImage } from "@/lib/images";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const SLIDE_INTERVAL_MS = 3500;

export function ImagesManager() {
  const [images, setImages] = useState<SliderImage[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImages(getSliderImages());
  }, []);

  useEffect(() => {
    if (images.length < 2) return;
    const timer = setInterval(() => {
      setActiveSlide((i) => (i + 1) % images.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [images.length]);

  function refresh() {
    setImages(getSliderImages());
  }

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setError(undefined);
    setUploading(true);

    for (const file of Array.from(fileList)) {
      if (!file.type.startsWith("image/")) {
        setError("Only image files are supported.");
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        setError("Each image must be smaller than 5MB.");
        continue;
      }

      const dataUrl = await readFileAsDataUrl(file);
      addSliderImage({ name: file.name, dataUrl });
    }

    refresh();
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleDelete(id: string) {
    deleteSliderImage(id);
    setActiveSlide(0);
    refresh();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 rounded-xl border border-border-hairline bg-surface-2 p-4">
        <h3 className="text-sm font-semibold text-text-primary">Upload slider images</h3>
        <p className="text-xs text-text-muted">
          PNG or JPG, up to 5MB each. Uploaded images appear in the slider preview below in the order they were added.
        </p>
        <label className="flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-linear-to-b from-gold-bright to-gold px-4 py-2.5 text-sm font-semibold text-surface-page transition-opacity hover:opacity-90">
          <UploadIcon />
          {uploading ? "Uploading..." : "Upload images"}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
        {error && (
          <p className="rounded-lg border border-status-critical/30 bg-status-critical/10 px-3 py-2 text-sm text-status-critical">
            {error}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-text-primary">Slider preview</h3>
        {images.length === 0 ? (
          <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-border-hairline text-sm text-text-muted">
            No slider images yet. Upload one above to see the preview.
          </div>
        ) : (
          <div className="relative h-56 overflow-hidden rounded-xl border border-border-hairline bg-surface-2 sm:h-72">
            {images.map((img, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={img.id}
                src={img.dataUrl}
                alt={img.name}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                  i === activeSlide ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            {images.length > 1 && (
              <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
                {images.map((img, i) => (
                  <button
                    key={img.id}
                    type="button"
                    aria-label={`Show slide ${i + 1}`}
                    onClick={() => setActiveSlide(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === activeSlide ? "w-5 bg-gold-bright" : "w-1.5 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-text-primary">Uploaded images ({images.length})</h3>
        {images.length === 0 ? (
          <p className="text-sm text-text-muted">No images uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {images.map((img) => (
              <div key={img.id} className="group relative overflow-hidden rounded-xl border border-border-hairline bg-surface-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.dataUrl} alt={img.name} className="h-32 w-full object-cover" />
                <div className="flex items-center justify-between gap-2 px-2.5 py-2">
                  <p className="truncate text-xs text-text-secondary">{img.name}</p>
                  <button
                    type="button"
                    onClick={() => handleDelete(img.id)}
                    className="shrink-0 rounded-md border border-status-critical/40 bg-status-critical/10 px-2 py-0.5 text-[11px] font-medium text-status-critical transition-colors hover:bg-status-critical/20"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-text-muted">
        Slider images are stored locally in this browser for demo purposes — this is not a persisted backend store.
      </p>
    </div>
  );
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function UploadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12" />
      <path d="M7 8l5-5 5 5" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}
