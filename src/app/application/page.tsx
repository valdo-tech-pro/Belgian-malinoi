"use client";

import { useState } from "react";
import Link from "next/link";

const inputClass =
  "w-full px-4 py-3.5 border border-forest/15 bg-white text-charcoal placeholder:text-charcoal/35 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition";
const labelClass = "block text-[10px] uppercase tracking-[0.18em] text-forest/65 mb-2";

export default function ApplicationPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"), email: fd.get("email"), phone: fd.get("phone"),
          country: fd.get("country"), address: fd.get("address"),
          experience: fd.get("experience"), purpose: fd.get("purpose"),
          homeType: fd.get("homeType"), hasYard: fd.get("hasYard") === "on",
          otherPets: fd.get("otherPets"), children: fd.get("children"),
          workSchedule: fd.get("workSchedule"), trainingPlans: fd.get("trainingPlans"),
          whyMalinois: fd.get("whyMalinois"), message: fd.get("message"),
          preferredPuppy: fd.get("preferredPuppy"),
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <main className="min-h-screen bg-cream flex items-center">
        <section className="w-full py-32">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <span className="inline-flex items-center justify-center w-16 h-16 border border-gold text-gold font-serif text-2xl mb-8">✓</span>
            <p className="text-gold text-[10px] uppercase tracking-[0.3em] mb-4">Application Received</p>
            <h1 className="font-serif text-5xl md:text-6xl text-forest leading-tight mb-6">Thank you for<br /><span className="text-gold">starting the conversation.</span></h1>
            <p className="text-charcoal/65 leading-relaxed max-w-lg mx-auto mb-10">
              Your information has been received. We&apos;ll review your application and contact you if we need additional information or to discuss available puppies.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/puppies" className="px-8 py-4 bg-gold text-forest text-sm uppercase tracking-[0.16em] hover:bg-forest hover:text-cream transition">View Puppies</Link>
              <Link href="/" className="px-8 py-4 border border-forest/20 text-forest text-sm uppercase tracking-[0.16em] hover:border-gold hover:text-gold transition">Return Home</Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream">
      <section className="relative overflow-hidden bg-forest text-cream pt-36 pb-24">
        <div className="absolute inset-0">
          <img src="/malinois.jpg" alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-forest/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/90 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6"><span className="h-px w-12 bg-gold" /><p className="text-gold text-[10px] uppercase tracking-[0.3em]">Puppy Application</p></div>
            <h1 className="font-serif text-5xl md:text-7xl leading-[0.95]">Find the right<br /><span className="text-gold">match.</span></h1>
            <p className="mt-7 max-w-xl text-cream/65 leading-relaxed">
              A Belgian Malinois is an active, intelligent working breed. This application helps us understand your experience, lifestyle and goals before discussing a potential placement.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[0.7fr_1.3fr] gap-12 lg:gap-20">
          <aside className="lg:sticky lg:top-32 self-start">
            <p className="text-gold text-[10px] uppercase tracking-[0.25em] mb-4">The Application</p>
            <h2 className="font-serif text-3xl text-forest mb-5">A little about you.</h2>
            <p className="text-sm text-charcoal/60 leading-relaxed mb-8">
              Please answer as openly as you can. There are no perfect answers — the goal is to understand whether the puppy, your plans and your lifestyle are a sensible match.
            </p>
            <div className="border-t border-forest/15">
              <div className="py-4 border-b border-forest/15 flex gap-4"><span className="font-serif text-gold">01</span><span className="text-[10px] uppercase tracking-[0.15em] text-forest/65">Your details</span></div>
              <div className="py-4 border-b border-forest/15 flex gap-4"><span className="font-serif text-gold">02</span><span className="text-[10px] uppercase tracking-[0.15em] text-forest/65">Your home & experience</span></div>
              <div className="py-4 border-b border-forest/15 flex gap-4"><span className="font-serif text-gold">03</span><span className="text-[10px] uppercase tracking-[0.15em] text-forest/65">Your plans</span></div>
            </div>
          </aside>

          <form onSubmit={handleSubmit} className="bg-white border border-forest/10 p-6 md:p-10 lg:p-12 shadow-sm">
            <div className="mb-10 pb-7 border-b border-forest/10">
              <p className="text-[9px] uppercase tracking-[0.2em] text-gold mb-2">01 · Your details</p>
              <h3 className="font-serif text-2xl text-forest">Tell us who you are.</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <div><label className={labelClass}>Full Name *</label><input name="name" required className={inputClass} /></div>
              <div><label className={labelClass}>Email *</label><input type="email" name="email" required className={inputClass} /></div>
              <div><label className={labelClass}>Phone</label><input name="phone" className={inputClass} /></div>
              <div><label className={labelClass}>Country</label><input name="country" className={inputClass} /></div>
            </div>
            <div className="mb-5"><label className={labelClass}>Address</label><input name="address" className={inputClass} /></div>
            <div className="mb-12"><label className={labelClass}>Preferred puppy, if any</label><input name="preferredPuppy" className={inputClass} placeholder="Name or 'any available puppy'" /></div>

            <div className="mb-10 pb-7 border-b border-forest/10">
              <p className="text-[9px] uppercase tracking-[0.2em] text-gold mb-2">02 · Home & experience</p>
              <h3 className="font-serif text-2xl text-forest">Tell us about your environment.</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className={labelClass}>Experience with working breeds</label>
                <select name="experience" className={inputClass}><option value="">Select</option><option>First time</option><option>Previous owner</option><option>Sport / Working</option><option>Breeder / Handler</option></select>
              </div>
              <div>
                <label className={labelClass}>Intended purpose</label>
                <select name="purpose" className={inputClass}><option value="">Select</option><option>Family companion</option><option>Sport</option><option>Protection</option><option>Professional work</option></select>
              </div>
              <div>
                <label className={labelClass}>Home type</label>
                <select name="homeType" className={inputClass}><option value="">Select</option><option>House</option><option>Apartment</option><option>Farm / Rural</option></select>
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-3 text-sm text-charcoal/70"><input type="checkbox" name="hasYard" className="accent-forest w-4 h-4" /> Secure yard / garden</label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5 mb-12">
              <div><label className={labelClass}>Other pets</label><input name="otherPets" className={inputClass} /></div>
              <div><label className={labelClass}>Children in the home</label><input name="children" className={inputClass} /></div>
              <div className="md:col-span-2"><label className={labelClass}>Work / daily schedule</label><input name="workSchedule" className={inputClass} /></div>
            </div>

            <div className="mb-10 pb-7 border-b border-forest/10">
              <p className="text-[9px] uppercase tracking-[0.2em] text-gold mb-2">03 · Your plans</p>
              <h3 className="font-serif text-2xl text-forest">What are you looking for?</h3>
            </div>

            <div className="space-y-5">
              <div><label className={labelClass}>Training plans</label><textarea name="trainingPlans" rows={3} className={inputClass} /></div>
              <div><label className={labelClass}>Why a Belgian Malinois?</label><textarea name="whyMalinois" rows={4} className={inputClass} /></div>
              <div><label className={labelClass}>Anything else we should know</label><textarea name="message" rows={4} className={inputClass} /></div>
            </div>

            <div className="mt-10 pt-7 border-t border-forest/10">
              <p className="text-xs text-charcoal/50 leading-relaxed mb-6">
                By submitting this form, you&apos;re sharing information so we can evaluate your inquiry and communicate with you about puppy placement.
              </p>
              <button type="submit" disabled={status === "loading"} className="w-full py-4 bg-gold text-forest text-sm uppercase tracking-[0.18em] hover:bg-forest hover:text-cream disabled:opacity-60 transition duration-300">
                {status === "loading" ? "Sending Application..." : "Submit Application"}
              </button>
              {status === "error" && <p className="text-red-600 text-sm text-center mt-4">We couldn&apos;t submit the application. Please try again.</p>}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
