"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { upload } from "@vercel/blob/client";

const input =
  "w-full px-4 py-3 bg-white border border-forest/20 text-charcoal text-sm focus:outline-none focus:border-gold";
const label = "block text-sm font-medium text-forest mb-1";

type SelectedPhoto = {
  file: File;
  preview: string;
};

export function PuppyForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<SelectedPhoto[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    return () => {
      photos.forEach((photo) => URL.revokeObjectURL(photo.preview));
    };
  }, [photos]);

  function choosePhotos(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setError("");

    const invalid = files.find(
      (file) =>
        !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type) ||
        file.size > 10 * 1024 * 1024,
    );

    if (invalid) {
      setError("Use JPG, PNG, WEBP, or GIF images up to 10 MB each.");
      e.target.value = "";
      return;
    }

    if (photos.length + files.length > 20) {
      setError("You can add a maximum of 20 photos per puppy.");
      e.target.value = "";
      return;
    }

    const selected = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setPhotos((current) => [...current, ...selected]);
    e.target.value = "";
  }

  function removePhoto(index: number) {
    setPhotos((current) => {
      const photo = current[index];
      if (photo) URL.revokeObjectURL(photo.preview);
      return current.filter((_, i) => i !== index);
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (photos.length === 0) {
      setError("Please add at least one puppy photo.");
      return;
    }

    setSaving(true);
    setUploadProgress(0);
    setError("");
    setSuccess("");

    try {
      const imageUrls: string[] = [];

      for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        const blob = await upload(
          `puppies/${Date.now()}-${photo.file.name}`,
          photo.file,
          {
            access: "public",
            handleUploadUrl: "/api/admin/uploads",
            multipart: photo.file.size > 4 * 1024 * 1024,
            onUploadProgress: (event) => {
              const current = ((i + event.percentage / 100) / photos.length) * 100;
              setUploadProgress(Math.round(current));
            },
          },
        );
        imageUrls.push(blob.url);
      }

      const fd = new FormData(form);
      const payload = Object.fromEntries(fd.entries());
      payload.images = imageUrls.join("\n");

      const res = await fetch("/api/admin/puppies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save puppy");
      } else {
        setSuccess(`Puppy saved! It is live at /puppies/${data.slug}`);
        form.reset();
        setPhotos((current) => {
          current.forEach((photo) => URL.revokeObjectURL(photo.preview));
          return [];
        });
        setUploadProgress(100);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-forest/10 p-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className={label} htmlFor="name">Name *</label>
          <input id="name" name="name" className={input} required />
        </div>
        <div>
          <label className={label} htmlFor="sex">Sex *</label>
          <select id="sex" name="sex" className={input}>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div>
          <label className={label} htmlFor="birthDate">Birth date *</label>
          <input id="birthDate" name="birthDate" type="date" className={input} required />
        </div>
        <div>
          <label className={label} htmlFor="color">Color *</label>
          <input id="color" name="color" className={input} placeholder="Fawn" required />
        </div>
        <div>
          <label className={label} htmlFor="price">Price (USD) *</label>
          <input id="price" name="price" type="number" className={input} placeholder="1500" required />
        </div>
        <div>
          <label className={label} htmlFor="status">Status</label>
          <select id="status" name="status" className={input}>
            <option>Available</option>
            <option>Reserved</option>
            <option>Sold</option>
          </select>
        </div>
        <div>
          <label className={label} htmlFor="sire">Sire (father) *</label>
          <input id="sire" name="sire" className={input} required />
        </div>
        <div>
          <label className={label} htmlFor="dam">Dam (mother) *</label>
          <input id="dam" name="dam" className={input} required />
        </div>
        <div>
          <label className={label} htmlFor="sireHD">Sire HD</label>
          <input id="sireHD" name="sireHD" className={input} placeholder="HD-A" />
        </div>
        <div>
          <label className={label} htmlFor="sireED">Sire ED</label>
          <input id="sireED" name="sireED" className={input} placeholder="ED-0" />
        </div>
        <div>
          <label className={label} htmlFor="damHD">Dam HD</label>
          <input id="damHD" name="damHD" className={input} placeholder="HD-A" />
        </div>
        <div>
          <label className={label} htmlFor="damED">Dam ED</label>
          <input id="damED" name="damED" className={input} placeholder="ED-0" />
        </div>
        <div className="md:col-span-2">
          <label className={label} htmlFor="dna">DNA panel</label>
          <input id="dna" name="dna" className={input} placeholder="Full panel clear" />
        </div>
        <div className="md:col-span-2">
          <label className={label} htmlFor="litter">Litter (optional)</label>
          <input id="litter" name="litter" className={input} placeholder="Litter of Spring 2026" />
        </div>

        <div className="md:col-span-2">
          <label className={label} htmlFor="photos">Puppy Photos *</label>
          <input
            id="photos"
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            onChange={choosePhotos}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={saving}
            className="w-full px-4 py-4 border-2 border-dashed border-forest/20 text-forest hover:border-gold hover:bg-gold/5 transition disabled:opacity-50"
          >
            📷 Add Photos
          </button>
          <p className="text-xs text-charcoal/50 mt-1">
            Select multiple photos from your phone. Up to 20 images, 10 MB each.
          </p>

          {photos.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {photos.map((photo, index) => (
                <div key={photo.preview} className="relative group">
                  <img
                    src={photo.preview}
                    alt={`Selected puppy photo ${index + 1}`}
                    className="w-full aspect-square object-cover border border-forest/10"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    disabled={saving}
                    className="absolute top-1 right-1 bg-black/70 text-white rounded-full w-7 h-7 text-sm disabled:opacity-50"
                    aria-label={`Remove photo ${index + 1}`}
                  >
                    ×
                  </button>
                  <span className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1.5 py-0.5">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <label className={label} htmlFor="description">Description *</label>
          <textarea id="description" name="description" rows={4} className={input} required />
        </div>
        <div>
          <label className={label} htmlFor="deposit">Deposit (USD)</label>
          <input id="deposit" name="deposit" type="number" className={input} defaultValue={500} />
        </div>
      </div>

      {saving && (
        <div>
          <div className="flex justify-between text-xs text-charcoal/60 mb-1">
            <span>Uploading photos...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="h-2 bg-forest/10 overflow-hidden">
            <div className="h-full bg-gold transition-all" style={{ width: `${uploadProgress}%` }} />
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={saving}
        className="w-full px-8 py-4 bg-gold text-forest font-medium tracking-wide hover:bg-gold/90 transition disabled:opacity-50"
      >
        {saving ? "Uploading & Saving..." : "Save Puppy"}
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && (
        <p className="text-sm text-emerald-700">
          ✅ {success} ·{" "}
          <Link href="/admin/puppies" className="underline">
            Back to list
          </Link>
        </p>
      )}
    </form>
  );
}