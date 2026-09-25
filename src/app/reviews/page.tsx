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
      <section className="relative overflow-hidden pt-32 pb-20 bg-forest text-cream">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-0 top-0 w-1/2 h-full border-l border-gold/20" />
          <div className="absolute right-16 top-16 w-64 h-64 rounded-full border border-gold/15" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-gold" />
            <p className="text-gold tracking-[0.3em] uppercase text-xs">Client Stories</p>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl leading-[0.95]">
            Life with a
            <br />
            <span className="text-gold">Malinois.</span>
          </h1>
          <p className="mt-6 text-cream/60 max-w-2xl text-base md:text-lg leading-relaxed">
            Experiences shared by families and owners who have welcomed a
            Belgian Malinois into their lives.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          {reviews.length === 0 ? (
            <p className="text-charcoal/60 text-center mb-12">
              No published reviews yet. Be the first to share your experience.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-px bg-forest/10 mb-20 border border-forest/10">
              {reviews.map((r) => (
                <article key={r.id} className="bg-white p-8 md:p-10">
                  <div className="flex items-center justify-between gap-4 mb-8">
                    <div className="text-gold text-xs tracking-[0.12em]" aria-label={`${r.rating} out of 5 stars`}>
                      {"★".repeat(Math.max(0, Math.min(5, r.rating)))}
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.18em] text-charcoal/30">
                      Client Story
                    </span>
                  </div>
                  {r.title && (
                    <h2 className="font-serif text-2xl md:text-3xl text-forest mb-5">
                      {r.title}
                    </h2>
                  )}
                  <p className="text-charcoal/70 leading-relaxed text-base mb-8">
                    “{r.content}”
                  </p>
                  <div className="pt-5 border-t border-forest/10 text-[9px] uppercase tracking-[0.2em] text-charcoal/40">
                    <span className="text-forest">{r.name}</span>
                    {r.location ? ` · ${r.location}` : ""}
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="max-w-4xl mx-auto border-t border-forest/15 pt-14">
            <div className="mb-8">
              <p className="text-gold text-[9px] uppercase tracking-[0.25em] mb-3">
                Your Experience
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-3">
                Share your story
              </h2>
              <p className="text-charcoal/55 text-sm leading-relaxed max-w-xl">
                Tell us about your experience. Submitted reviews are reviewed
                before publication.
              </p>
            </div>
            {status === "success" ? (
              <p className="text-emerald-700">Thank you! Your review will appear after approval.</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-forest/10 p-6 md:p-8">
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
                <button type="submit" disabled={status === "loading"} className="px-8 py-4 bg-gold text-forest text-sm uppercase tracking-[0.16em] hover:bg-forest hover:text-cream transition duration-300 disabled:opacity-60">
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
