"use client";

import { useState } from "react";
import Link from "next/link";

const input =
  "w-full px-4 py-3 bg-white border border-forest/20 text-charcoal text-sm focus:outline-none focus:border-gold";
const label = "block text-sm font-medium text-forest mb-1";

export function PuppyForm() {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setSaving(true);
    setError("");
    setSuccess("");

    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    try {
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
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-forest/10 p-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className={label} htmlFor="name">Name *</label>
          <input id="name" name="name" className={input} required />        </div>
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
          <label className={label} htmlFor="damED">Dam ED</label>          <input id="damED" name="damED" className={input} placeholder="ED-0" />
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
          <label className={label} htmlFor="images">Photo URLs * (one per line)</label>
          <textarea id="images" name="images" rows={3} className={input} required />
          <p className="text-xs text-charcoal/50 mt-1">
            Tip: upload photos to the public folder on GitHub, then use https://belgian-malinoi.vercel.app/FILE.jpg
          </p>
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

      <button
        type="submit"
        disabled={saving}
        className="w-full px-8 py-4 bg-gold text-forest font-medium tracking-wide hover:bg-gold/90 transition disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Puppy"}
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