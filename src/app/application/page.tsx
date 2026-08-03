"use client";

import { useState } from "react";
import Link from "next/link";

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
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          country: fd.get("country"),
          address: fd.get("address"),
          experience: fd.get("experience"),
          purpose: fd.get("purpose"),
          homeType: fd.get("homeType"),
          hasYard: fd.get("hasYard") === "on",
          otherPets: fd.get("otherPets"),
          children: fd.get("children"),
          workSchedule: fd.get("workSchedule"),
          trainingPlans: fd.get("trainingPlans"),
          whyMalinois: fd.get("whyMalinois"),
          message: fd.get("message"),
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
      <section className="pt-32 pb-20 max-w-xl mx-auto px-6 text-center">
        <h1 className="font-serif text-4xl text-forest mb-4">Application Received</h1>
        <p className="text-charcoal/70 mb-8">
          Thank you. We carefully review every application and will contact you within a few days.
        </p>
        <Link href="/puppies" className="text-gold hover:underline">View available puppies →</Link>
      </section>
    );
  }

  return (
    <>
      <section className="pt-32 pb-16 bg-forest text-cream">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-gold tracking-[0.25em] uppercase text-sm mb-3">Puppy Application</p>
          <h1 className="font-serif text-5xl md:text-6xl">Apply for a Puppy</h1>
          <p className="mt-4 text-cream/70 max-w-xl">
            We match each puppy to the right home. Please fill in this form so we can understand your situation.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-2xl mx-auto px-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-forest mb-2">Full Name *</label>
                <input name="name" required className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-forest mb-2">Email *</label>
                <input type="email" name="email" required className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-forest mb-2">Phone</label>
                <input name="phone" className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-forest mb-2">Country</label>
                <input name="country" className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-forest mb-2">Address</label>
              <input name="address" className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block text-sm font-medium text-forest mb-2">Preferred puppy (if any)</label>
              <input name="preferredPuppy" className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold" placeholder="e.g. Atlas or any available" />
            </div>
            <div>
              <label className="block text-sm font-medium text-forest mb-2">Experience with working breeds</label>
              <select name="experience" className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold">
                <option value="">Select</option>
                <option>First time</option>
                <option>Previous owner</option>
                <option>Sport / Working</option>
                <option>Breeder / Handler</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-forest mb-2">Intended purpose</label>
              <select name="purpose" className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold">
                <option value="">Select</option>
                <option>Family companion</option>
                <option>Sport</option>
                <option>Protection</option>
                <option>Professional work</option>
              </select>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-forest mb-2">Home type</label>
                <select name="homeType" className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold">
                  <option value="">Select</option>
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Farm / Rural</option>
                </select>
              </div>
              <div className="flex items-end pb-3">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="hasYard" className="accent-forest" /> Secure yard / garden
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-forest mb-2">Other pets</label>
              <input name="otherPets" className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block text-sm font-medium text-forest mb-2">Children in the home</label>
              <input name="children" className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block text-sm font-medium text-forest mb-2">Work / daily schedule</label>
              <input name="workSchedule" className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block text-sm font-medium text-forest mb-2">Training plans</label>
              <textarea name="trainingPlans" rows={2} className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block text-sm font-medium text-forest mb-2">Why a Belgian Malinois?</label>
              <textarea name="whyMalinois" rows={3} className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block text-sm font-medium text-forest mb-2">Anything else we should know</label>
              <textarea name="message" rows={3} className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold" />
            </div>
            <button type="submit" disabled={status === "loading"} className="w-full py-4 bg-gold text-forest font-medium hover:bg-gold/90 disabled:opacity-60">
              {status === "loading" ? "Submitting..." : "Submit Application"}
            </button>
            {status === "error" && <p className="text-red-600 text-sm text-center">Failed to submit. Please try again.</p>}
          </form>
        </div>
      </section>
    </>
  );
}
