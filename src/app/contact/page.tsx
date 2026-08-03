import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact & Inquiry",
  description:
    "Inquire about available Belgian Malinois puppies from Belgian Malinois Special Breed. Tell us about your experience and plans. Located in Belgium.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact & Inquiry | Belgian Malinois Special Breed",
    description:
      "Send an inquiry about our health-tested Belgian Malinois puppies. Personal replies within 24–48 hours.",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-forest text-cream">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-gold tracking-[0.25em] uppercase text-sm mb-3">
            Get in Touch
          </p>
          <h1 className="font-serif text-5xl md:text-6xl">Inquiry</h1>
          <p className="mt-4 text-cream/70 max-w-xl">
            Tell us about yourself and the type of dog you are looking for.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <Suspense fallback={<p className="text-center">Loading form...</p>}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
