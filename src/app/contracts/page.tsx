import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contracts & Documents",
  description: "Information about placement documents and agreements for Belgian Malinois Special Breed.",
};

const contracts = [
  {
    title: "Puppy Purchase Agreement",
    description: "The final purchase agreement is provided directly during the placement process.",
    category: "Purchase",
  },
  {
    title: "Health & Screening Records",
    description: "Available records and screening information are discussed and provided when applicable to an individual puppy.",
    category: "Records",
  },
  {
    title: "Deposit / Reservation Terms",
    description: "Reservation and deposit terms are confirmed in writing before any payment is made.",
    category: "Reservation",
  },
];

export default function ContractsPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-forest text-cream">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-gold tracking-[0.25em] uppercase text-sm mb-3">Documents</p>
          <h1 className="font-serif text-5xl md:text-6xl">Contracts & Agreements</h1>
          <p className="mt-4 text-cream/70 max-w-xl">
            Transparent paperwork. Review placement documents and terms before making a reservation. Final documents are provided and signed as applicable to the individual placement.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          {contracts.map((c) => (
            <div key={c.title} className="bg-white border border-forest/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-gold tracking-wide uppercase">{c.category}</span>
                <h2 className="font-serif text-xl text-forest mt-1">{c.title}</h2>
                <p className="text-sm text-charcoal/70 mt-1">{c.description}</p>
              </div>
              <Link
                href="/contact"
                className="shrink-0 px-5 py-2 border border-forest text-forest hover:bg-forest hover:text-cream transition text-sm"
              >
                Request Information
              </Link>
            </div>
          ))}

          <p className="text-sm text-charcoal/50 mt-8">
            Questions about a document or the placement process? <Link href="/contact" className="text-gold hover:underline">Contact us</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
