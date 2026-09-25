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

const primaryLinks = [
  { href: "/puppies", label: "Puppies" },
  { href: "/about", label: "Our Kennel" },
  { href: "/health-standards", label: "Standards" },
  { href: "/reviews", label: "Stories" },
];

const utilityLinks = [
  { href: "/favorites", label: "Favorites" },
  { href: "/compare", label: "Compare" },
  { href: "/contracts", label: "Contracts" },
];

export function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-forest/90 backdrop-blur-xl border-b border-gold/15">
      <div className="max-w-7xl mx-auto px-6">
        <div className="min-h-[82px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="transition-transform duration-500 group-hover:scale-[1.03]">
              <KennelCrest />
            </div>
            <div>
              <div className="font-serif text-cream text-[19px] tracking-[0.04em]">
                Belgian Malinois
              </div>
              <div className="text-gold text-[10px] tracking-[0.28em] uppercase mt-0.5">
                Heritage Kennel
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-[13px] uppercase tracking-[0.16em] text-cream/70 hover:text-gold transition-colors"
            >
              Home
            </Link>

            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-[13px] uppercase tracking-[0.16em] text-cream/70 hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <span className="mx-3 h-5 w-px bg-gold/20" aria-hidden="true" />

            <Link
              href="/application"
              className="px-5 py-2 text-[13px] uppercase tracking-[0.16em] text-gold border border-gold/50 hover:bg-gold hover:text-forest transition-all duration-300"
            >
              Apply
            </Link>
            <Link
              href="/contact"
              className="ml-2 px-5 py-2 text-[13px] uppercase tracking-[0.16em] bg-gold text-forest hover:bg-gold/90 transition-all duration-300"
            >
              Inquire
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-end gap-5 pb-2.5 -mt-1">
          {utilityLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[10px] uppercase tracking-[0.2em] text-cream/40 hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
