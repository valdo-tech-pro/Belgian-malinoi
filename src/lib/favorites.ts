"use client";

const FAVORITES_KEY = "malinois_favorites";
const COMPARE_KEY = "malinois_compare";

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
  } catch {
    return [];
  }
}

export function toggleFavorite(slug: string): string[] {
  const current = getFavorites();
  const next = current.includes(slug)
    ? current.filter((s) => s !== slug)
    : [...current, slug];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  return next;
}

export function isFavorite(slug: string): boolean {
  return getFavorites().includes(slug);
}

export function getCompare(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(COMPARE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function toggleCompare(slug: string): string[] {
  const current = getCompare();
  let next: string[];
  if (current.includes(slug)) {
    next = current.filter((s) => s !== slug);
  } else if (current.length >= 3) {
    next = [...current.slice(1), slug]; // keep max 3
  } else {
    next = [...current, slug];
  }
  localStorage.setItem(COMPARE_KEY, JSON.stringify(next));
  return next;
}

export function clearCompare() {
  localStorage.setItem(COMPARE_KEY, "[]");
}
