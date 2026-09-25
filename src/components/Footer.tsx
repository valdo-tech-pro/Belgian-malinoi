import Link from "next/link";
import { NewsletterForm } from "./NewsletterForm";

const links = [
  { href: "/", label: "Home" },
  { href: "/puppies", label: "Puppies" },
  { href: "/about", label: "Our Kennel" },
  { href: "/reviews", label: "Stories" },
  { href: "/application", label: "Apply" },
  { href: "/waiting-list", label: "Waiting List" },
  { href: "/contracts", label: "Contracts" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-forest text-cream/70 border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-forest-light/30">
                <svg viewBox="0 0 48 48" className="h-7 w-7 text-gold" fill="none" aria-hidden="true">
                  <path d="M14 34V14l10-6 10 6v20l-10 6-10-6Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M18 29c3-2 5-5 6-9 1 4 3 7 6 9-2 2-4 3-6 3s-4-1-6-3Z" fill="currentColor" opacity=".9"/>
                </svg>
              </div>
              <div>
                <div className="font-serif text-lg text-cream">Belgian Malinois</div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-gold">Heritage Kennel</div>
              </div>
            </div>
            <p className="max-w-md font-serif text-xl leading-relaxed text-cream">
              Bred with purpose. Raised with intention.
            </p>
            <p className="mt-4 max-w-md text-sm leading-7">
              A considered home for working-line Belgian Malinois, with thoughtful development,
              documented information, and personal placement conversations.
            </p>
            <div className="mt-7 h-px w-16 bg-gold/60" />
          </div>

          <div>
            <div className="mb-5 text-[11px] uppercase tracking-[0.28em] text-gold">Explore</div>
            <nav className="space-y-3 text-sm" aria-label="Footer navigation">
              {links.slice(0, 4).map((link) => (
                <Link key={link.href} href={link.href} className="block w-fit transition hover:text-gold">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <div className="mb-5 text-[11px] uppercase tracking-[0.28em] text-gold">Placement</div>
            <nav className="space-y-3 text-sm">
              {links.slice(4).map((link) => (
                <Link key={link.href} href={link.href} className="block w-fit transition hover:text-gold">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <div className="mb-5 text-[11px] uppercase tracking-[0.28em] text-gold">Stay Connected</div>
            <p className="text-sm leading-6">
              Receive occasional litter announcements, kennel news, and availability updates.
            </p>
            <div className="mt-5">
              <NewsletterForm compact />
            </div>
            <p className="mt-4 text-xs text-cream/45">
              United States · Personal inquiries welcome
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream/10 pt-7 text-xs text-cream/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Belgian Malinois Special Breed. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy" className="transition hover:text-gold">Privacy</Link>
            <Link href="/terms" className="transition hover:text-gold">Terms</Link>
            <Link href="/contact" className="transition hover:text-gold">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
