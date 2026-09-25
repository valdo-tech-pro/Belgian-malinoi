import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy information for Belgian Malinois Special Breed website visitors and inquiries.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-cream min-h-screen">
      <section className="bg-forest text-cream py-24">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-gold text-xs uppercase tracking-[0.3em] mb-4">Legal</p>
          <h1 className="font-serif text-5xl md:text-6xl">Privacy Policy</h1>
          <p className="mt-6 max-w-2xl text-cream/70">
            A straightforward overview of how information submitted through this website is handled.
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-12 text-charcoal">
        <section>
          <h2 className="font-serif text-3xl mb-4">Information you provide</h2>
          <p className="leading-8 text-charcoal/70">
            When you submit an inquiry, application, review, newsletter signup, or other form,
            the website may collect the information you choose to provide, such as your name,
            contact details, preferences, and messages.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-3xl mb-4">How information is used</h2>
          <p className="leading-8 text-charcoal/70">
            Submitted information may be used to respond to inquiries, evaluate placement
            applications, communicate about puppies or services you requested, manage website
            operations, and maintain records associated with your submission.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-3xl mb-4">Sharing and service providers</h2>
          <p className="leading-8 text-charcoal/70">
            Information may be processed by service providers used to operate the website,
            hosting, storage, email, analytics, or other requested functionality. Information
            may also be disclosed when required by law or to protect the website and its users.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-3xl mb-4">Cookies and technical information</h2>
          <p className="leading-8 text-charcoal/70">
            The website may use cookies or similar technologies for essential functionality,
            authentication, security, and website operation. Server and security systems may
            also process technical information such as IP addresses and request metadata.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-3xl mb-4">Your choices</h2>
          <p className="leading-8 text-charcoal/70">
            You can choose what information to submit through optional forms. For questions
            about information you have submitted or a request concerning your personal data,
            please use the contact page.
          </p>
        </section>

        <section className="border-t border-gold/30 pt-8">
          <p className="text-sm text-charcoal/60">
            This page provides general website privacy information and is not legal advice.
            If your business is subject to specific privacy laws or regulatory requirements,
            obtain appropriate legal advice and tailor this policy accordingly.
          </p>
        </section>

        <Link href="/contact" className="inline-flex text-sm uppercase tracking-[0.18em] text-forest hover:text-gold transition-colors">
          Contact the Kennel →
        </Link>
      </main>
    </div>
  );
}
