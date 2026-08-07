import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Kennel – Philosophy & Health Standards",
  description:
    "Learn about Belgian Malinois Special Breed: our philosophy of temperament-first breeding, official HD/ED and DNA testing, and raising puppies in the United States.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Our Kennel | Belgian Malinois Special Breed",
    description:
      "Temperament first. Structure second. Transparent health testing and purposeful raising of Belgian Malinois in the United States.",
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-forest text-cream">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-gold tracking-[0.25em] uppercase text-sm mb-3">
            About the Kennel
          </p>
          <h1 className="font-serif text-5xl md:text-6xl max-w-3xl">
            Raised with intention in the heart of US
          </h1>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-serif text-3xl text-forest mb-6">
              Our Philosophy
            </h2>
            <p className="text-charcoal/80 leading-relaxed mb-6">
              Belgian Malinois Special Breed is dedicated exclusively to the
              working Belgian Malinois. We believe that exceptional dogs are the
              product of careful selection, transparent health testing, and
              purposeful early development.
            </p>
            <p className="text-charcoal/80 leading-relaxed mb-6">
              Every mating is planned with temperament, structure and genetic
              health as the primary criteria. We do not breed for volume.
              Litters are limited so that each puppy receives the attention and
              socialization required to become a confident, stable adult.
            </p>
            <p className="text-charcoal/80 leading-relaxed">
              Located in the United States, we
              maintain strong connections to proven working lines while ensuring
              every dog we produce is suited for the modern demands of sport,
              service or active family life.
            </p>
          </div>
          <div className="bg-forest text-cream p-10">
            <p className="font-serif text-2xl leading-relaxed text-gold mb-6">
              “Temperament first. Structure second. Everything else follows.”
            </p>
            <p className="text-cream/70 text-sm">
              This guiding principle shapes every decision we make — from
              selecting breeding partners to the way puppies are raised in our
              home environment.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-forest mb-12 text-center">
            What We Stand For
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-forest/10 flex items-center justify-center">
                <span className="font-serif text-2xl text-forest">01</span>
              </div>
              <h3 className="font-serif text-xl text-forest mb-3">
                Health First
              </h3>
              <p className="text-charcoal/70 text-sm leading-relaxed">
                Official HD/ED scores and comprehensive DNA panels are
                non-negotiable. Results are published for every parent.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-forest/10 flex items-center justify-center">
                <span className="font-serif text-2xl text-forest">02</span>
              </div>
              <h3 className="font-serif text-xl text-forest mb-3">
                Working Temperament
              </h3>
              <p className="text-charcoal/70 text-sm leading-relaxed">
                We select for drive, focus and stability. Our dogs are capable
                of high performance while remaining clear-headed and biddable.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-forest/10 flex items-center justify-center">
                <span className="font-serif text-2xl text-forest">03</span>
              </div>
              <h3 className="font-serif text-xl text-forest mb-3">
                Conscious Raising
              </h3>
              <p className="text-charcoal/70 text-sm leading-relaxed">
                Puppies are raised in an enriched environment with early
                neurological stimulation, socialization and structured handling.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl text-forest mb-6">
            Looking for a puppy?
          </h2>
          <p className="text-charcoal/70 mb-8">
            We carefully match each puppy to the right home.
          </p>
          <Link
            href="/puppies"
            className="inline-block px-8 py-4 bg-gold text-forest font-medium tracking-wide hover:bg-gold/90 transition"
          >
            View Available Puppies
          </Link>
        </div>
      </section>
    </>
  );
}
