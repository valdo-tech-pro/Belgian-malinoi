import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-forest/95 backdrop-blur-md border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold flex items-center justify-center">
            <span className="font-serif text-gold text-xl font-bold">BM</span>
          </div>
          <div>
            <div className="font-serif text-cream text-lg tracking-wide">
              Belgian Malinois
            </div>
            <div className="text-gold text-xs tracking-widest uppercase">
              Special Breed
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
