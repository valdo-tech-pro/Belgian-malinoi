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
  const colors: Record<string, string> = {
    Available: "bg-emerald-100 text-emerald-800 border-emerald-200",
    Reserved: "bg-amber-100 text-amber-800 border-amber-200",
    Sold: "bg-stone-100 text-stone-600 border-stone-200",
  };
  return (
    <span
      className={`inline-block px-3 py-1 text-xs tracking-wide border rounded-sm ${
        colors[status] || colors.Available
      }`}
    >
      {status}
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
    <div className="group relative bg-white border border-forest/10 overflow-hidden hover:shadow-lg transition duration-300">
      <div className="absolute top-3 right-3 z-10 flex gap-2">
        <button
          onClick={(e) => {
            e.preventDefault();
            setFav(toggleFavorite(slug).includes(slug));
          }}
          className={`w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center transition ${
            fav ? "text-red-500" : "text-charcoal/50 hover:text-red-400"
          }`}
          title={fav ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            className="w-5 h-5"
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
          className={`w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center transition text-xs font-medium ${
            inCompare
              ? "text-gold bg-gold/10"
              : "text-charcoal/50 hover:text-gold"
          }`}
          title={inCompare ? "Remove from compare" : "Add to compare"}
        >
          {inCompare ? "✓" : "⇄"}
        </button>
      </div>

      <Link href={`/puppies/${slug}`}>
        <div className="aspect-[4/3] overflow-hidden bg-forest/5">
          <img
            src={image}
            alt={`${name} – Belgian Malinois puppy`}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-serif text-2xl text-forest">{name}</h3>
            {statusBadge(status)}
          </div>
          <p className="text-charcoal/60 text-sm mb-3">
            {sex} · {ageFromBirth(birthDate)} · {color}
          </p>
          <p className="text-forest font-medium">{formatPrice(price)}</p>
        </div>
      </Link>
    </div>
  );
}
