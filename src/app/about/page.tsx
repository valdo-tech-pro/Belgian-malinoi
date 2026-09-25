import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Kennel – Philosophy & Health Standards",
  description:
    "Learn about our approach to Belgian Malinois selection, documented health information, thoughtful puppy development and responsible placement in the United States.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Our Kennel | Belgian Malinois Special Breed",
    description:
      "Purposeful selection, documented information and thoughtful raising of Belgian Malinois in the United States.",
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden min-h-[620px] flex items-end bg-forest text-cream">
        <div className="absolute inset-0">
          <img src="/malinois.jpg" alt="Belgian Malinois at the kennel" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-forest/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-forest/20" />
        </div>
        <div className="relative max-w-7xl mx-auto w-full px-6 pt-40 pb-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-gold" />
              <p className="text-gold tracking-[0.3em] uppercase text-xs">About the Kennel</p>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl leading-[0.95]">
              Raised with
              <br />
              <span className="text-gold">Intention.</span>
            </h1>
            <p className="mt-7 text-cream/70 text-base md:text-lg leading-relaxed max-w-xl">
              A considered approach to the Belgian Malinois — built around
              purpose, structure, temperament and responsible placement.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-28 md:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-center">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-gold" />
              <p className="text-gold tracking-[0.3em] uppercase text-xs">The Philosophy</p>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl text-forest leading-[1.02] mb-8">
              Purpose in every
              <br />
              <span className="text-gold">decision.</span>
            </h2>
            <p className="text-charcoal/70 leading-relaxed text-base md:text-lg max-w-2xl mb-6">
              We focus on Belgian Malinois selected with care, with attention to
              working ability, structure and stable temperament. Our goal is not
              simply to produce puppies, but to make thoughtful breeding and
              placement decisions.
            </p>
            <p className="text-charcoal/55 leading-relaxed max-w-2xl">
              Health records and supporting documentation are presented where
              available, allowing prospective owners to review the information
              behind each puppy and pairing.
            </p>
          </div>
          <div className="relative bg-forest text-cream p-9 md:p-12">
            <div className="absolute top-0 left-0 w-16 h-px bg-gold" />
            <p className="text-[9px] uppercase tracking-[0.25em] text-gold mb-7">Our Standard</p>
            <p className="font-serif text-3xl md:text-4xl leading-tight text-cream mb-8">
              “Purpose in every pairing. Intention in every puppy.”
            </p>
            <div className="pt-6 border-t border-gold/20 text-[10px] uppercase tracking-[0.2em] text-cream/40">
              Purpose · Structure · Temperament
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-gold" />
              <p className="text-gold tracking-[0.3em] uppercase text-xs">What We Stand For</p>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl text-forest leading-[1.02]">
              Three principles.
              <br />
              <span className="text-gold">One standard.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 border-t border-forest/15">
            <div className="py-10 md:pr-10 md:border-r border-forest/15">
              <span className="font-serif text-4xl text-gold">01</span>
              <p className="text-[9px] uppercase tracking-[0.2em] text-charcoal/40 mt-6 mb-3">Documentation</p>
              <h3 className="font-serif text-2xl text-forest mb-4">Health & Records</h3>
              <p className="text-charcoal/65 text-sm leading-relaxed">
                Available health records and supporting documentation are presented
                with individual profiles where applicable.
              </p>
            </div>
            <div className="py-10 md:px-10 md:border-r border-forest/15">
              <span className="font-serif text-4xl text-gold">02</span>
              <p className="text-[9px] uppercase tracking-[0.2em] text-charcoal/40 mt-6 mb-3">Selection</p>
              <h3 className="font-serif text-2xl text-forest mb-4">Working Temperament</h3>
              <p className="text-charcoal/65 text-sm leading-relaxed">
                We value the qualities that make the Belgian Malinois purposeful,
                attentive and capable, while considering the needs of the intended home.
              </p>
            </div>
            <div className="py-10 md:pl-10">
              <span className="font-serif text-4xl text-gold">03</span>
              <p className="text-[9px] uppercase tracking-[0.2em] text-charcoal/40 mt-6 mb-3">Development</p>
              <h3 className="font-serif text-2xl text-forest mb-4">Thoughtful Raising</h3>
              <p className="text-charcoal/65 text-sm leading-relaxed">
                Puppies are given age-appropriate handling, socialization and
                development suited to their stage of growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-28 md:py-32 bg-forest text-cream">
        <div className="absolute inset-0 opacity-15">
          <img src="/malinois.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-forest/85" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-7">
            <span className="h-px w-10 bg-gold" />
            <p className="text-gold text-[10px] uppercase tracking-[0.3em]">Find the Right Match</p>
            <span className="h-px w-10 bg-gold" />
          </div>
          <h2 className="font-serif text-5xl md:text-6xl leading-[1.02] mb-6">
            A good placement
            <br />
            <span className="text-gold">begins with a conversation.</span>
          </h2>
          <p className="text-cream/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Tell us about your experience, lifestyle and goals. We can then
            discuss available puppies and the information relevant to your search.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/application" className="px-8 py-4 bg-gold text-forest text-sm uppercase tracking-[0.16em] hover:bg-cream transition duration-300">
              Begin an Application
            </Link>
            <Link href="/puppies" className="px-8 py-4 border border-cream/30 text-cream text-sm uppercase tracking-[0.16em] hover:border-gold hover:text-gold transition duration-300">
              View Puppies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
