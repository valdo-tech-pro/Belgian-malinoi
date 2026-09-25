import Link from "next/link";

function KennelCrest() {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <svg viewBox="0 0 64 64" className="w-12 h-12" aria-hidden="true">
        <path
          d="M32 3 53 10v18c0 15-8.7 26-21 33C19.7 54 11 43 11 28V10L32 3Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-gold"
        />
        <path
          d="M23 22 27 14l5 8 5-8 4 8v9c0 6-4 11-9 11s-9-5-9-11v-9Z"
          fill="currentColor"
          className="text-gold/90"
        />
        <path d="M28 34h8M30 39h4" stroke="#18372B" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M19 52h26" stroke="currentColor" strokeWidth="1" className="text-gold/60" />
      </svg>
    </div>
  );
}

export function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-forest/95 backdrop-blur-md border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <KennelCrest />
          <div>
            <div className="font-serif text-cream text-lg tracking-wide">
              Belgian Malinois
            </div>
            <div className="text-gold text-xs tracking-[0.22em] uppercase">
              Heritage Kennel
            </div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-6 text-sm tracking-wide">
          <Link href="/" className="text-cream/80 hover:text-gold transition">
            Home
          </Link>
          <Link href="/puppies" className="text-cream/80 hover:text-gold transition">
            Puppies
          </Link>
          <Link href="/favorites" className="text-cream/80 hover:text-gold transition">
            Favorites
          </Link>
          <Link href="/compare" className="text-cream/80 hover:text-gold transition">
            Compare
          </Link>
          <Link href="/about" className="text-cream/80 hover:text-gold transition">
            Our Kennel
          </Link>
          <Link href="/reviews" className="text-cream/80 hover:text-gold transition">
            Reviews
          </Link>
          <Link href="/contracts" className="text-cream/80 hover:text-gold transition">
            Contracts
          </Link>
          <Link href="/application" className="text-cream/80 hover:text-gold transition">
            Apply
          </Link>
          <Link
            href="/contact"
            className="ml-2 px-5 py-2 bg-gold text-forest font-medium rounded-sm hover:bg-gold/90 transition"
          >
            Inquire
          </Link>
        </div>
      </div>
    </nav>
  );
}
