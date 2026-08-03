"use client";

import { useState } from "react";
import Link from "next/link";

export default function WaitingListPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/waiting-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          country: fd.get("country"),
          preferences: fd.get("preferences"),
          notes: fd.get("notes"),
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <section className="pt-32 pb-16 bg-forest text-cream">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-gold tracking-[0.25em] uppercase text-sm mb-3">Future Litters</p>
          <h1 className="font-serif text-5xl md:text-6xl">Waiting List</h1>
          <p className="mt-4 text-cream/70 max-w-xl">
            Join the waiting list to be notified when new litters are planned or available.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-xl mx-auto px-6">
          {status === "success" ? (
            <div className="text-center py-12">
              <h2 className="font-serif text-3xl text-forest mb-4">You’re on the list</h2>
              <p className="text-charcoal/70 mb-6">
                We will contact you when a suitable puppy becomes available.
              </p>
              <Link href="/puppies" className="text-gold hover:underline">
                View current puppies →
              </Link>
            </div>
          ) : (
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
                <label className="block text-sm font-medium text-forest mb-2">Preferences (sex, color, purpose…)</label>
                <input name="preferences" className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold" placeholder="e.g. Female, sport prospect" />
              </div>
              <div>
                <label className="block text-sm font-medium text-forest mb-2">Notes</label>
                <textarea name="notes" rows={3} className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold" />
              </div>
              <button type="submit" disabled={status === "loading"} className="w-full py-4 bg-gold text-forest font-medium hover:bg-gold/90 disabled:opacity-60">
                {status === "loading" ? "Submitting..." : "Join Waiting List"}
              </button>
              {status === "error" && <p className="text-red-600 text-sm text-center">Something went wrong. Please try again.</p>}
            </form>
          )}
        </div>
      </section>
    </>
  );
}
