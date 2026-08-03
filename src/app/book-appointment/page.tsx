"use client";

import { useState } from "react";
import Link from "next/link";

export default function BookAppointmentPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          date: fd.get("date"),
          timeSlot: fd.get("timeSlot"),
          type: fd.get("type"),
          notes: fd.get("notes"),
          puppyId: fd.get("puppyId") || null,
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
        <h1 className="font-serif text-4xl text-forest mb-4">Appointment Requested</h1>
        <p className="text-charcoal/70 mb-8">
          We will confirm your visit or video call by email within 24 hours.
        </p>
        <Link href="/puppies" className="text-gold hover:underline">
          Back to puppies →
        </Link>
      </section>
    );
  }

  return (
    <>
      <section className="pt-32 pb-16 bg-forest text-cream">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-gold tracking-[0.25em] uppercase text-sm mb-3">Visit Us</p>
          <h1 className="font-serif text-5xl md:text-6xl">Book an Appointment</h1>
          <p className="mt-4 text-cream/70 max-w-xl">
            Schedule a kennel visit or video call to meet the puppies.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-xl mx-auto px-6">
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
            <div>
              <label className="block text-sm font-medium text-forest mb-2">Phone</label>
              <input name="phone" className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-forest mb-2">Preferred Date *</label>
                <input type="date" name="date" required className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-forest mb-2">Time Slot *</label>
                <select name="timeSlot" required className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold">
                  <option value="">Select</option>
                  <option>Morning (09:00–12:00)</option>
                  <option>Afternoon (13:00–16:00)</option>
                  <option>Late afternoon (16:00–18:00)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-forest mb-2">Type</label>
              <select name="type" className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold">
                <option>Visit</option>
                <option>Video call</option>
                <option>Pickup</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-forest mb-2">Notes / which puppy</label>
              <textarea name="notes" rows={3} className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold" />
            </div>
            <button type="submit" disabled={status === "loading"} className="w-full py-4 bg-gold text-forest font-medium hover:bg-gold/90 disabled:opacity-60">
              {status === "loading" ? "Booking..." : "Request Appointment"}
            </button>
            {status === "error" && <p className="text-red-600 text-sm text-center">Failed. Please try again.</p>}
          </form>
        </div>
      </section>
    </>
  );
}
