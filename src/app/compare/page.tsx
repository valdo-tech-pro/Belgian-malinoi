"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCompare, clearCompare } from "@/lib/favorites";

export default function ComparePage() {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    setSlugs(getCompare());
  }, []);

  return (
    <>
      <section className="pt-32 pb-16 bg-forest text-cream">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-gold tracking-[0.25em] uppercase text-sm mb-3">Side by Side</p>
          <h1 className="font-serif text-5xl md:text-6xl">Compare Puppies</h1>
          <p className="mt-4 text-cream/70">Select up to 3 puppies using the ⇄ button on the cards.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          {slugs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-charcoal/60 mb-6">No puppies selected for comparison.</p>
              <Link href="/puppies" className="text-gold hover:underline">
                Go to puppies →
              </Link>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {slugs.map((slug) => (
                  <Link
                    key={slug}
                    href={`/puppies/${slug}`}
                    className="block p-6 bg-white border border-forest/10 text-center hover:border-gold transition"
                  >
                    <div className="font-serif text-2xl text-forest capitalize mb-2">
                      {slug.replace(/-/g, " ")}
                    </div>
                    <span className="text-sm text-gold">View details →</span>
                  </Link>
                ))}
              </div>
              <div className="text-center">
                <button
                  onClick={() => {
                    clearCompare();
                    setSlugs([]);
                  }}
                  className="text-sm text-charcoal/60 hover:text-gold"
                >
                  Clear comparison
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
