"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const inputClass =
  "w-full px-4 py-3.5 border border-forest/15 bg-white text-charcoal placeholder:text-charcoal/35 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition";
const labelClass = "block text-[10px] uppercase tracking-[0.18em] text-forest/65 mb-2";

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
      <div className="py-12 md:py-20 text-center">
        <div className="w-16 h-16 mx-auto mb-7 border border-gold flex items-center justify-center">
          <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m5 12 4 4L19 7" />
          </svg>
        </div>
        <p className="text-gold text-[10px] uppercase tracking-[0.3em] mb-4">Inquiry Received</p>
        <h2 className="font-serif text-4xl md:text-5xl text-forest mb-5">Thank you.</h2>
        <p className="text-charcoal/65 leading-relaxed max-w-md mx-auto">
          Your inquiry has been received. We&apos;ll review the information you shared and follow up with you regarding your inquiry.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-10 pb-7 border-b border-forest/10">
        <p className="text-[9px] uppercase tracking-[0.2em] text-gold mb-2">01 · Your details</p>
        <h2 className="font-serif text-2xl text-forest">Tell us who you are.</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-5">
        <div><label className={labelClass}>Full Name *</label><input type="text" name="name" required className={inputClass} placeholder="Your name" /></div>
        <div><label className={labelClass}>Email *</label><input type="email" name="email" required className={inputClass} placeholder="you@example.com" /></div>
        <div><label className={labelClass}>Phone</label><input type="tel" name="phone" className={inputClass} placeholder="+1 ..." /></div>
        <div><label className={labelClass}>Country</label><input type="text" name="country" className={inputClass} placeholder="United States" /></div>
      </div>

      <div className="mb-12">
        <label className={labelClass}>Puppy of interest</label>
        <input type="text" name="puppy" value={puppyInterest} onChange={(e) => setPuppyInterest(e.target.value)} className={inputClass} placeholder="Name or future litter" />
      </div>

      <div className="mb-10 pb-7 border-b border-forest/10">
        <p className="text-[9px] uppercase tracking-[0.2em] text-gold mb-2">02 · Your experience</p>
        <h2 className="font-serif text-2xl text-forest">Tell us about your background.</h2>
      </div>

      <div className="mb-7">
        <label className={labelClass}>Experience with Belgian Malinois or working breeds</label>
        <select name="experience" className={inputClass}>
          <option value="">Please select</option>
          <option value="First time">First Malinois / first working breed</option>
          <option value="Previous owner">Previous Malinois or similar breed owner</option>
          <option value="Sport / Working">Active in sport, K9 or professional work</option>
          <option value="Breeder / Handler">Experienced handler or breeder</option>
        </select>
      </div>

      <div className="mb-12">
        <label className={labelClass}>Intended purpose</label>
        <div className="grid sm:grid-cols-2 gap-3">
          {["Family companion", "Sport", "Protection", "Professional work"].map((purpose) => (
            <label key={purpose} className="flex items-center gap-3 border border-forest/10 px-4 py-3.5 text-sm text-charcoal/70 hover:border-gold/50 transition cursor-pointer">
              <input type="checkbox" name="purpose" value={purpose} className="accent-forest w-4 h-4" />
              {purpose}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-10 pb-7 border-b border-forest/10">
        <p className="text-[9px] uppercase tracking-[0.2em] text-gold mb-2">03 · Your plans</p>
        <h2 className="font-serif text-2xl text-forest">Tell us what you are looking for.</h2>
      </div>

      <div className="mb-8">
        <label className={labelClass}>Home, lifestyle and experience *</label>
        <textarea name="message" required rows={6} className={inputClass} placeholder="Tell us about your living situation, other animals, training plans, previous dogs, and anything else that may help us understand your plans." />
      </div>

      <div className="pt-7 border-t border-forest/10">
        <p className="text-xs text-charcoal/45 leading-relaxed mb-6">
          By submitting this inquiry, you&apos;re sharing information so we can review your request and communicate with you about puppy availability and placement.
        </p>
        <button type="submit" disabled={status === "loading"} className="w-full py-4 bg-gold text-forest text-sm uppercase tracking-[0.18em] hover:bg-forest hover:text-cream disabled:opacity-60 transition duration-300">
          {status === "loading" ? "Sending Inquiry..." : "Send Inquiry"}
        </button>
        {status === "error" && <p className="text-red-600 text-sm text-center mt-4">Something went wrong. Please try again.</p>}
      </div>
    </form>
  );
}
