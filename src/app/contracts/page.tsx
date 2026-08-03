import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contracts & Documents",
  description: "Download sample purchase contracts, health guarantees and deposit agreements from Belgian Malinois Special Breed.",
};

const contracts = [
  {
    title: "Puppy Purchase Agreement",
    description: "Standard sales contract outlining rights, responsibilities and health guarantee.",
    category: "Purchase",
    fileUrl: "/contracts/purchase-agreement.pdf", // place real PDFs in public/contracts/
  },
  {
    title: "Health Guarantee",
    description: "Details of the health warranty covering hips, elbows and genetic conditions.",
    category: "Health Guarantee",
    fileUrl: "/contracts/health-guarantee.pdf",
  },
  {
    title: "Deposit / Reservation Agreement",
    description: "Terms for reserving a puppy with a non-refundable deposit.",
    category: "Deposit",
    fileUrl: "/contracts/deposit-agreement.pdf",
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
            Transparent paperwork. Download sample contracts below. Final versions are signed at the time of reservation or pickup.
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
              <a
                href={c.fileUrl}
                className="shrink-0 px-5 py-2 border border-forest text-forest hover:bg-forest hover:text-cream transition text-sm"
                download
              >
                Download PDF
              </a>
            </div>
          ))}

          <p className="text-sm text-charcoal/50 mt-8">
            Place your actual PDF files in the <code className="bg-forest/5 px-1">public/contracts/</code> folder and update the links above.
            Need a custom contract? <Link href="/contact" className="text-gold hover:underline">Contact us</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
