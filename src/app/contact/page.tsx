import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact & Inquiry",
  description:
    "Start a conversation about Belgian Malinois puppies, availability and placement.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact & Inquiry | Belgian Malinois Special Breed",
    description:
      "Tell us about your experience, lifestyle and the kind of Belgian Malinois you are looking for.",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-cream">
      <section className="relative overflow-hidden min-h-[560px] flex items-end bg-forest text-cream">
        <div className="absolute inset-0">
          <img src="/malinois.jpg" alt="Belgian Malinois" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-forest/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-forest/20" />
        </div>
        <div className="relative max-w-7xl mx-auto w-full px-6 pt-36 pb-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-gold" />
              <p className="text-gold text-[10px] uppercase tracking-[0.3em]">Begin the Conversation</p>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl leading-[0.95]">
              Let&apos;s talk about
              <br />
              <span className="text-gold">your next Malinois.</span>
            </h1>
            <p className="mt-7 text-cream/70 text-base md:text-lg leading-relaxed max-w-xl">
              Tell us about your experience, lifestyle and goals. A thoughtful
              inquiry is the first step toward finding the right match.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[0.7fr_1.3fr] gap-12 lg:gap-20">
          <aside className="lg:sticky lg:top-32 self-start">
            <p className="text-gold text-[10px] uppercase tracking-[0.25em] mb-4">Personal Inquiry</p>
            <h2 className="font-serif text-4xl text-forest leading-tight mb-5">Start with the details.</h2>
            <p className="text-sm text-charcoal/60 leading-relaxed mb-8">
              The more you share, the better we can understand what you are
              looking for and which questions may be useful to discuss.
            </p>
            <div className="border-t border-forest/15">
              <div className="py-5 border-b border-forest/15">
                <p className="text-[9px] uppercase tracking-[0.2em] text-gold mb-1">01</p>
                <p className="font-serif text-lg text-forest">Your details</p>
              </div>
              <div className="py-5 border-b border-forest/15">
                <p className="text-[9px] uppercase tracking-[0.2em] text-gold mb-1">02</p>
                <p className="font-serif text-lg text-forest">Your experience</p>
              </div>
              <div className="py-5 border-b border-forest/15">
                <p className="text-[9px] uppercase tracking-[0.2em] text-gold mb-1">03</p>
                <p className="font-serif text-lg text-forest">Your plans</p>
              </div>
            </div>
            <div className="mt-8 p-6 bg-forest text-cream">
              <p className="text-gold text-[9px] uppercase tracking-[0.2em] mb-3">Prefer a formal application?</p>
              <p className="font-serif text-xl mb-4">Tell us more about your home and plans.</p>
              <a href="/application" className="text-xs uppercase tracking-[0.16em] text-gold hover:text-cream transition">Open Puppy Application →</a>
            </div>
          </aside>

          <div className="bg-white border border-forest/10 p-6 md:p-10 lg:p-12 shadow-sm">
            <Suspense fallback={<p className="text-center py-12 text-charcoal/50">Loading inquiry form...</p>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
