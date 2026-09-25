import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for the Belgian Malinois Special Breed website.",
};

export default function TermsPage() {
  return (
    <div className="bg-cream min-h-screen">
      <section className="bg-forest text-cream py-24">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-gold text-xs uppercase tracking-[0.3em] mb-4">Legal</p>
          <h1 className="font-serif text-5xl md:text-6xl">Terms of Use</h1>
          <p className="mt-6 max-w-2xl text-cream/70">
            Basic terms for using this website and submitting information through it.
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-12 text-charcoal">
        <section>
          <h2 className="font-serif text-3xl mb-4">Website content</h2>
          <p className="leading-8 text-charcoal/70">
            Website content is provided for general informational purposes and may change
            without notice. Puppy availability, descriptions, pricing, photographs, and other
            details should be confirmed directly before making decisions.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-3xl mb-4">Puppy listings and inquiries</h2>
          <p className="leading-8 text-charcoal/70">
            A website listing or inquiry does not by itself create a sale, reservation,
            placement agreement, or other contractual commitment. Any purchase or placement
            is subject to the applicable written agreement and confirmed arrangements.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-3xl mb-4">Health and screening information</h2>
          <p className="leading-8 text-charcoal/70">
            Health, screening, pedigree, temperament, and development information is provided
            when available and should be discussed and reviewed as part of the placement process.
            Individual records and evaluations should not be interpreted as a guarantee of
            future health or behavior.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-3xl mb-4">Acceptable use</h2>
          <p className="leading-8 text-charcoal/70">
            Do not misuse the website, attempt to bypass security controls, interfere with its
            operation, submit fraudulent information, or use website content for unlawful purposes.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-3xl mb-4">External services</h2>
          <p className="leading-8 text-charcoal/70">
            The website may rely on third-party services for hosting, storage, communications,
            analytics, or other functionality. Those services may have their own terms and
            privacy policies.
          </p>
        </section>

        <section className="border-t border-gold/30 pt-8">
          <p className="text-sm text-charcoal/60">
            These terms are general website terms and are not legal advice. Have them reviewed
            and customized by qualified counsel before relying on them as your business's final
            legal terms.
          </p>
        </section>

        <Link href="/contact" className="inline-flex text-sm uppercase tracking-[0.18em] text-forest hover:text-gold transition-colors">
          Contact the Kennel →
        </Link>
      </main>
    </div>
  );
}
