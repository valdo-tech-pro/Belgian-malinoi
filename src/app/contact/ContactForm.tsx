"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function ContactForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [puppyInterest, setPuppyInterest] = useState("");

  useEffect(() => {
    const p = searchParams.get("puppy");
    if (p) setPuppyInterest(p);
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          country: formData.get("country"),
          puppyName: formData.get("puppy"),
          experience: formData.get("experience"),
          purpose: formData.getAll("purpose").join(", "),
          message: formData.get("message"),
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-serif text-3xl text-forest mb-4">Thank you</h2>
        <p className="text-charcoal/70 mb-6">
          Your inquiry has been received. We will reply personally within 24–48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-forest mb-2">Full Name *</label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold transition"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-forest mb-2">Email *</label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold transition"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-forest mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold transition"
            placeholder="+32 ..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-forest mb-2">Country</label>
          <input
            type="text"
            name="country"
            className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold transition"
            placeholder="Belgium"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-forest mb-2">Puppy of Interest</label>
        <input
          type="text"
          name="puppy"
          value={puppyInterest}
          onChange={(e) => setPuppyInterest(e.target.value)}
          className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold transition"
          placeholder="e.g. Atlas or Future litter"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-forest mb-2">
          Experience with Belgian Malinois or working breeds
        </label>
        <select
          name="experience"
          className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold transition"
        >
          <option value="">Please select</option>
          <option value="First time">First Malinois / first working breed</option>
          <option value="Previous owner">Previous Malinois or similar breed owner</option>
          <option value="Sport / Working">Active in sport, K9 or professional work</option>
          <option value="Breeder / Handler">Experienced handler or breeder</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-forest mb-2">Intended purpose</label>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="purpose" value="Family companion" className="accent-forest" />
            Family companion
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="purpose" value="Sport" className="accent-forest" />
            Sport
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="purpose" value="Protection" className="accent-forest" />
            Protection
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="purpose" value="Professional" className="accent-forest" />
            Professional work
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-forest mb-2">
          Tell us about your home, lifestyle and experience *
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold transition"
          placeholder="Living situation, other animals, training plans, previous dogs..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 bg-gold text-forest font-medium tracking-wide hover:bg-gold/90 transition disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Submit Inquiry"}
      </button>

      {status === "error" && (
        <p className="text-red-600 text-sm text-center">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}
