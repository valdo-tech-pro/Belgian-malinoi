"use client";

import { useState, useMemo } from "react";
import { PuppyCard } from "./PuppyCard";

type Puppy = {
  id: string;
  slug: string;
  name: string;
  sex: string;
  color: string;
  price: number;
  status: string;
  birthDate: string | Date;
  images: string;
  litter?: string | null;
};

export function PuppySearch({ puppies }: { puppies: Puppy[] }) {
  const [sex, setSex] = useState("");
  const [status, setStatus] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return puppies.filter((p) => {
      if (sex && p.sex !== sex) return false;
      if (status && p.status !== status) return false;
      if (minPrice && p.price < Number(minPrice)) return false;
      if (maxPrice && p.price > Number(maxPrice)) return false;
      if (query) {
        const q = query.toLowerCase();
        const hay = `${p.name} ${p.color} ${p.litter || ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [puppies, sex, status, minPrice, maxPrice, query]);

  return (
    <div>
      <div className="bg-white border border-forest/10 p-6 mb-10 grid md:grid-cols-5 gap-4">
        <input
          type="text"
          placeholder="Search name, color, litter..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="md:col-span-2 px-4 py-2 border border-forest/20 focus:outline-none focus:border-gold"
        />
        <select
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          className="px-4 py-2 border border-forest/20 focus:outline-none focus:border-gold"
        >
          <option value="">Any sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2 border border-forest/20 focus:outline-none focus:border-gold"
        >
          <option value="">Any status</option>
          <option value="Available">Available</option>
          <option value="Reserved">Reserved</option>
          <option value="Sold">Sold</option>
        </select>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min €"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-3 py-2 border border-forest/20 focus:outline-none focus:border-gold"
          />
          <input
            type="number"
            placeholder="Max €"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-3 py-2 border border-forest/20 focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      <p className="text-sm text-charcoal/60 mb-6">
        Showing {filtered.length} of {puppies.length} puppies
      </p>

      {filtered.length === 0 ? (
        <p className="text-center text-charcoal/60 py-12">No puppies match your filters.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p) => {
            const images = JSON.parse(p.images || "[]") as string[];
            return (
              <PuppyCard
                key={p.id}
                slug={p.slug}
                name={p.name}
                sex={p.sex}
                color={p.color}
                price={p.price}
                status={p.status}
                birthDate={p.birthDate}
                image={images[0] || ""}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
