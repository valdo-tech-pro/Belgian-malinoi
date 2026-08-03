import Link from "next/link";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-forest text-cream/60 py-16 border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <div className="font-serif text-cream text-xl mb-2">
            Belgian Malinois Special Breed
          </div>
          <p className="text-sm leading-relaxed max-w-sm">
            Premium working-line Belgian Malinois puppies. Health tested.
            Temperamentally sound. Raised in Belgium.
          </p>
        </div>
        <div>
          <div className="text-gold text-sm tracking-widest uppercase mb-4">
            Navigate
          </div>
          <div className="space-y-2 text-sm">
            <Link href="/" className="block hover:text-gold transition">Home</Link>
            <Link href="/puppies" className="block hover:text-gold transition">Puppies</Link>
            <Link href="/about" className="block hover:text-gold transition">About</Link>
            <Link href="/reviews" className="block hover:text-gold transition">Reviews</Link>
            <Link href="/application" className="block hover:text-gold transition">Apply</Link>
            <Link href="/waiting-list" className="block hover:text-gold transition">Waiting List</Link>
            <Link href="/contracts" className="block hover:text-gold transition">Contracts</Link>
            <Link href="/contact" className="block hover:text-gold transition">Contact</Link>
          </div>
        </div>
        <div>
          <div className="text-gold text-sm tracking-widest uppercase mb-4">
            Contact
          </div>
          <div className="space-y-2 text-sm">
            <p>Belgium</p>
            <p>inquiries@belgianmalinoisspecialbreed.be</p>
          </div>
        </div>
        <div>
          <div className="text-gold text-sm tracking-widest uppercase mb-4">
            Newsletter
          </div>
          <p className="text-sm mb-3">Litter announcements & news</p>
          <NewsletterForm compact />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-cream/10 text-xs text-center">
        © {new Date().getFullYear()} Belgian Malinois Special Breed. All rights reserved.
      </div>
    </footer>
  );
}
