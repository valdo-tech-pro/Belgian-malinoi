"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getFavorites } from "@/lib/favorites";

export default function FavoritesPage() {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    setSlugs(getFavorites());
  }, []);

  return (
    <>
      <section className="pt-32 pb-16 bg-forest text-cream">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-gold tracking-[0.25em] uppercase text-sm mb-3">Your Selection</p>
          <h1 className="font-serif text-5xl md:text-6xl">Favorite Puppies</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          {slugs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-charcoal/60 mb-6">You haven’t saved any favorites yet.</p>
              <Link href="/puppies" className="text-gold hover:underline">
                Browse available puppies →
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {slugs.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/puppies/${slug}`}
                    className="block p-4 bg-white border border-forest/10 hover:border-gold transition font-serif text-xl text-forest capitalize"
                  >
                    {slug.replace(/-/g, " ")}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <p className="text-sm text-charcoal/50 mt-8">
            Favorites are stored in your browser. Use the heart icon on any puppy card to add or remove.
          </p>
        </div>
      </section>
    </>
  );
}
