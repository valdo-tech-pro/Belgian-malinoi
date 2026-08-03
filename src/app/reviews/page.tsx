"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Review = {
  id: string;
  name: string;
  location: string | null;
  rating: number;
  title: string | null;
  content: string;
  createdAt: string;
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then(setReviews)
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          location: fd.get("location"),
          rating: fd.get("rating"),
          title: fd.get("title"),
          content: fd.get("content"),
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <section className="pt-32 pb-16 bg-forest text-cream">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-gold tracking-[0.25em] uppercase text-sm mb-3">Testimonials</p>
          <h1 className="font-serif text-5xl md:text-6xl">Reviews</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          {reviews.length === 0 ? (
            <p className="text-charcoal/60 text-center mb-12">
              No published reviews yet. Be the first to share your experience.
            </p>
          ) : (
            <div className="space-y-8 mb-16">
              {reviews.map((r) => (
                <div key={r.id} className="bg-white border border-forest/10 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    {"★".repeat(r.rating)}
                    <span className="text-charcoal/40 text-sm">{"★".repeat(5 - r.rating)}</span>
                  </div>
                  {r.title && <h3 className="font-serif text-xl text-forest mb-1">{r.title}</h3>}
                  <p className="text-charcoal/80 leading-relaxed mb-3">{r.content}</p>
                  <p className="text-sm text-charcoal/50">
                    — {r.name}
                    {r.location ? `, ${r.location}` : ""}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-forest/10 pt-12">
            <h2 className="font-serif text-2xl text-forest mb-6">Leave a Review</h2>
            {status === "success" ? (
              <p className="text-emerald-700">Thank you! Your review will appear after approval.</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input name="name" required placeholder="Your name *" className="px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold" />
                  <input name="location" placeholder="Location (optional)" className="px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold" />
                </div>
                <select name="rating" required className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold">
                  <option value="">Rating *</option>
                  <option value="5">5 – Excellent</option>
                  <option value="4">4 – Very good</option>
                  <option value="3">3 – Good</option>
                  <option value="2">2 – Fair</option>
                  <option value="1">1 – Poor</option>
                </select>
                <input name="title" placeholder="Title (optional)" className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold" />
                <textarea name="content" required rows={4} placeholder="Your experience *" className="w-full px-4 py-3 border border-forest/20 bg-white focus:outline-none focus:border-gold" />
                <button type="submit" disabled={status === "loading"} className="px-8 py-3 bg-gold text-forest font-medium hover:bg-gold/90 disabled:opacity-60">
                  {status === "loading" ? "Sending..." : "Submit Review"}
                </button>
                {status === "error" && <p className="text-red-600 text-sm">Failed to submit.</p>}
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
