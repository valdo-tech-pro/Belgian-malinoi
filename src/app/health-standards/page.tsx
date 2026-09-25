import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Health & Standards",
  description:
    "How Belgian Malinois Special Breed approaches health information, evaluation records, genetic screening, documentation, and responsible placement.",
};

const standards = [
  {
    number: "01",
    title: "Evaluation",
    subtitle: "Hip & elbow information",
    text:
      "Where evaluation records are available, relevant hip and elbow information can be reviewed as part of the puppy or parent's documented profile. Records are presented as information to consider when making a placement decision.",
  },
  {
    number: "02",
    title: "Genetics",
    subtitle: "DNA & screening information",
    text:
      "Available genetic screening information is kept with the dog's records and shared where relevant. We believe prospective owners should have access to the information that exists rather than relying on broad or unsupported assurances.",
  },
  {
    number: "03",
    title: "Documentation",
    subtitle: "Clear records, clear conversations",
    text:
      "Health-related records are part of the conversation around a puppy. Questions about a dog's history, available documentation, development, or known considerations are welcome before a placement is made.",
  },
];

export default function HealthStandardsPage() {
  return (
    <main className="bg-cream">
      <section className="relative min-h-[62vh] overflow-hidden bg-forest text-cream">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,25,19,.94),rgba(10,25,19,.62),rgba(10,25,19,.82)),url('/malinois.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/20 via-transparent to-forest" />
        <div className="relative mx-auto flex min-h-[62vh] max-w-7xl items-end px-6 pb-16 pt-36 lg:pb-24">
          <div className="max-w-3xl">
            <p className="mb-5 text-[11px] uppercase tracking-[0.32em] text-gold">
              Health &amp; Standards
            </p>
            <h1 className="font-serif text-5xl leading-[.95] sm:text-6xl lg:text-8xl">
              Standards you can see for yourself.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-cream/75 sm:text-lg">
              Good placement begins with useful information. We keep the focus on
              available records, thoughtful evaluation, and straightforward conversations.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Our approach</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-forest sm:text-5xl">
              Information before promises.
            </h2>
          </div>
          <div className="space-y-6 text-[15px] leading-8 text-charcoal/70">
            <p>
              A responsible breeding program should make it easier for a prospective
              owner to understand what is known about a dog. That means keeping records
              organized, discussing available evaluations, and being clear about what
              information is and is not available.
            </p>
            <p>
              Health information is one part of a larger match. Structure, temperament,
              working ability, development, lifestyle, and the needs of the household
              all belong in the conversation.
            </p>
            <p>
              We do not treat a certificate, screening result, or individual evaluation
              as a guarantee of future health. Instead, documentation is shared as a
              practical tool for informed conversations and thoughtful placement.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-forest/10 bg-white">
        <div className="mx-auto grid max-w-7xl md:grid-cols-3">
          {standards.map((item, index) => (
            <article
              key={item.number}
              className={`px-6 py-12 lg:px-10 lg:py-16 ${index !== 0 ? "border-t border-forest/10 md:border-l md:border-t-0" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-3xl text-gold/70">{item.number}</span>
                <span className="h-px w-12 bg-gold/50" />
              </div>
              <p className="mt-10 text-[10px] uppercase tracking-[0.25em] text-gold">
                {item.subtitle}
              </p>
              <h2 className="mt-3 font-serif text-3xl text-forest">{item.title}</h2>
              <p className="mt-5 text-sm leading-7 text-charcoal/65">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid overflow-hidden bg-forest text-cream lg:grid-cols-[1.1fr_.9fr]">
          <div className="p-8 sm:p-12 lg:p-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">What to ask</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              A useful conversation is specific.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-cream/70">
              If you are considering a puppy, ask about the records available for that
              puppy and its parents, what evaluations have been completed, and what
              information should be considered when planning for the dog&apos;s future.
            </p>
          </div>
          <div className="border-t border-cream/10 bg-forest-light/20 p-8 sm:p-12 lg:border-l lg:border-t-0 lg:p-16">
            <div className="space-y-5 text-sm text-cream/75">
              {[
                "Available evaluation records",
                "Available genetic screening information",
                "Parent and puppy documentation",
                "Development and temperament observations",
                "Questions about the intended home and lifestyle",
              ].map((item) => (
                <div key={item} className="flex gap-4 border-b border-cream/10 pb-5">
                  <span className="text-gold">—</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-forest/10 bg-cream-dark">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:py-24">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Thoughtful placement</p>
          <h2 className="mt-4 font-serif text-4xl text-forest sm:text-5xl">
            The right match starts with the right questions.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-charcoal/65">
            Explore current puppies or tell us about the home, experience, and plans you
            have in mind.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/application"
              className="inline-flex items-center justify-center bg-forest px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-cream transition hover:bg-forest-light"
            >
              Apply
            </Link>
            <Link
              href="/puppies"
              className="inline-flex items-center justify-center border border-forest/20 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-forest transition hover:border-gold hover:text-gold"
            >
              View Puppies
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
