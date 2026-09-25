"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  isFavorite,
  toggleFavorite,
  getCompare,
  toggleCompare,
} from "@/lib/favorites";

type PuppyCardProps = {
  slug: string;
  name: string;
  sex: string;
  color: string;
  price: number;
  status: string;
  birthDate: Date | string;
  image: string;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function ageFromBirth(birthDate: Date | string) {
  const birth = new Date(birthDate);
  const now = new Date();
  const weeks = Math.floor(
    (now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 7)
  );
  if (weeks < 16) return `${weeks} weeks`;
  const months = Math.floor(weeks / 4.3);
  return `${months} months`;
}

function statusBadge(status: string) {
  const labels: Record<string, string> = {
    Available: "Available",
    Reserved: "Reserved",
    Sold: "Placed",
  };

  return (
    <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-cream">
      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
      {labels[status] || status}
    </span>
  );
}

export function PuppyCard({
  slug,
  name,
  sex,
  color,
  price,
  status,
  birthDate,
  image,
}: PuppyCardProps) {
  const [fav, setFav] = useState(false);
  const [inCompare, setInCompare] = useState(false);

  useEffect(() => {
    setFav(isFavorite(slug));
    setInCompare(getCompare().includes(slug));
  }, [slug]);

  return (
    <article className="group relative bg-white border border-forest/10 overflow-hidden hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(24,55,43,0.14)] transition-all duration-500">
      <div className="relative aspect-[4/5] overflow-hidden bg-forest">
        {image ? (
          <img
            src={image}
            alt={`${name} – Belgian Malinois puppy`}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-cream/50 text-sm">
            Photo coming soon
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-transparent to-forest/10" />

        <div className="absolute top-4 left-4 z-10">
          {statusBadge(status)}
        </div>

        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              setFav(toggleFavorite(slug).includes(slug));
            }}
            className={`w-9 h-9 rounded-full border border-cream/30 bg-forest/30 backdrop-blur-sm flex items-center justify-center transition-all ${
              fav
                ? "text-gold border-gold/70"
                : "text-cream/80 hover:text-gold hover:border-gold/60"
            }`}
            title={fav ? "Remove from favorites" : "Add to favorites"}
            aria-label={fav ? "Remove from favorites" : "Add to favorites"}
          >
            <svg
              className="w-4 h-4"
              fill={fav ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              setInCompare(toggleCompare(slug).includes(slug));
            }}
            className={`w-9 h-9 rounded-full border border-cream/30 bg-forest/30 backdrop-blur-sm flex items-center justify-center transition-all text-xs ${
              inCompare
                ? "text-gold border-gold/70"
                : "text-cream/80 hover:text-gold hover:border-gold/60"
            }`}
            title={inCompare ? "Remove from compare" : "Add to compare"}
            aria-label={inCompare ? "Remove from compare" : "Add to compare"}
          >
            {inCompare ? "✓" : "⇄"}
          </button>
        </div>

        <Link
          href={`/puppies/${slug}`}
          className="absolute inset-x-0 bottom-0 p-6 text-cream"
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-gold text-[10px] uppercase tracking-[0.25em] mb-2">
                Belgian Malinois
              </p>
              <h3 className="font-serif text-3xl leading-none">{name}</h3>
            </div>
            <span className="text-cream/80 text-xl">↗</span>
          </div>
        </Link>
      </div>

      <div className="p-6 bg-white">
        <div className="grid grid-cols-3 divide-x divide-forest/10 mb-6">
          <div className="pr-3">
            <p className="text-[9px] uppercase tracking-[0.18em] text-charcoal/40 mb-1">
              Sex
            </p>
            <p className="text-sm text-forest">{sex}</p>
          </div>
          <div className="px-3">
            <p className="text-[9px] uppercase tracking-[0.18em] text-charcoal/40 mb-1">
              Age
            </p>
            <p className="text-sm text-forest">{ageFromBirth(birthDate)}</p>
          </div>
          <div className="pl-3">
            <p className="text-[9px] uppercase tracking-[0.18em] text-charcoal/40 mb-1">
              Color
            </p>
            <p className="text-sm text-forest truncate">{color}</p>
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-forest/10 pt-5">
          <div>
            <p className="text-[9px] uppercase tracking-[0.18em] text-charcoal/40 mb-1">
              Placement
            </p>
            <p className="font-serif text-xl text-forest">
              {formatPrice(price)}
            </p>
          </div>
          <Link
            href={`/puppies/${slug}`}
            className="text-[10px] uppercase tracking-[0.18em] text-forest border-b border-gold pb-1 hover:text-gold transition-colors"
          >
            View Profile
          </Link>
        </div>
      </div>
    </article>
  );
}
