import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PuppyCard } from "@/components/PuppyCard";

export const dynamic = "force-dynamic";

async function getFeaturedPuppies() {
  try {
    const puppies = await prisma.puppy.findMany({
      where: { status: "Available" },
      take: 3,
      orderBy: { createdAt: "desc" },
    });
    return puppies;
  } catch {
    return [];
  }
}

async function getFeaturedReviews() {
  try {
    return await prisma.review.findMany({
      where: { approved: true },
      take: 3,
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featured = await getFeaturedPuppies();
  const reviews = await getFeaturedReviews();

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[760px] h-[92vh] flex items-center overflow-hidden bg-forest">
        <div className="absolute inset-0">
          <img
            src="/malinois.jpg"
            alt="Belgian Malinois"
            className="w-full h-full object-cover object-center scale-[1.02]"
          />
          <div className="absolute inset-0 bg-forest/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/75 to-forest/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-forest/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-gold" />
              <p className="text-gold tracking-[0.35em] uppercase text-xs md:text-sm">
                Working Lines · United States
              </p>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl text-cream leading-[0.95] tracking-tight mb-7">
              Belgian
              <br />
              <span className="text-gold">Malinois</span>
            </h1>

            <p className="font-serif text-2xl md:text-3xl text-cream/90 leading-snug max-w-2xl mb-5">
              Bred with purpose.
              <br className="hidden md:block" />
              Raised with intention.
            </p>

            <p className="text-cream/75 text-base md:text-lg leading-relaxed max-w-xl mb-10">
              Health-tested puppies from carefully selected working bloodlines,
              raised in the United States with an emphasis on temperament,
              structure and purposeful development.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/puppies"
                className="px-8 py-4 bg-gold text-forest font-medium tracking-wide hover:bg-cream transition duration-300"
              >
                Explore Available Puppies
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 border border-cream/50 text-cream hover:border-gold hover:text-gold transition duration-300"
              >
                Discover Our Kennel
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.2em] text-cream/60">
              <span>Health Tested</span>
              <span>•</span>
              <span>Working Lines</span>
              <span>•</span>
              <span>Raised in the USA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-forest border-y border-gold/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gold/15">
            <div className="py-7 px-5 text-center">
              <div className="text-gold font-serif text-2xl mb-1">Health</div>
              <div className="text-cream/55 text-[10px] uppercase tracking-[0.18em]">
                Records Available
              </div>
            </div>
            <div className="py-7 px-5 text-center">
              <div className="text-gold font-serif text-2xl mb-1">HD / ED</div>
              <div className="text-cream/55 text-[10px] uppercase tracking-[0.18em]">
                Evaluation Records
              </div>
            </div>
            <div className="py-7 px-5 text-center">
              <div className="text-gold font-serif text-2xl mb-1">DNA</div>
              <div className="text-cream/55 text-[10px] uppercase tracking-[0.18em]">
                Screening Information
              </div>
            </div>
            <div className="py-7 px-5 text-center">
              <div className="text-gold font-serif text-2xl mb-1">USA</div>
              <div className="text-cream/55 text-[10px] uppercase tracking-[0.18em]">
                Raised in the United States
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-gold tracking-[0.25em] uppercase text-sm mb-3">
              Current Litter
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-forest gold-underline inline-block">
              Available Puppies
            </h2>
          </div>
          {featured.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {featured.map((p) => {
                const images = JSON.parse(p.images || "[]") as string[];
                return (
                  <PuppyCard
                    key={p.id}
                    slug={p.slug}
                    name={p.name}
                    sex={p.sex}
                    color={p.color}
                    price={p.price}
                    status={p.status}
                    birthDate={p.birthDate}
                    image={images[0] || ""}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-center text-charcoal/60">
              No puppies currently available. Check back soon or join the
              waiting list.
            </p>
          )}
          <div className="text-center mt-12">
            <Link
              href="/puppies"
              className="inline-block px-8 py-3 border border-forest text-forest hover:bg-forest hover:text-cream transition tracking-wide"
            >
              View All Puppies
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="relative overflow-hidden bg-forest text-cream py-28 md:py-32">
        <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block bg-gold/5" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-gold" />
                <p className="text-gold tracking-[0.3em] uppercase text-xs">
                  The Kennel Philosophy
                </p>
              </div>

              <h2 className="font-serif text-5xl md:text-6xl leading-[1.02] mb-8">
                Raised with
                <br />
                <span className="text-gold">Intention.</span>
              </h2>

              <p className="text-cream/75 leading-relaxed text-base md:text-lg max-w-xl mb-6">
                We focus on Belgian Malinois bred with purpose, with careful
                attention to working ability, structure and stable temperament.
                Each puppy is raised in an enriched environment with thoughtful
                early development.
              </p>

              <p className="text-cream/60 leading-relaxed max-w-xl mb-9">
                Our approach is centered on responsible selection, documented
                health information and helping each puppy find the right home
                and purpose.
              </p>

              <div className="flex items-center gap-8 mb-10 text-[10px] uppercase tracking-[0.22em] text-cream/50">
                <span>Purpose</span>
                <span className="h-4 w-px bg-gold/30" />
                <span>Structure</span>
                <span className="h-4 w-px bg-gold/30" />
                <span>Temperament</span>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-4 text-gold text-xs uppercase tracking-[0.2em] group"
              >
                <span className="border-b border-gold pb-2 group-hover:text-cream group-hover:border-cream transition-colors">
                  Discover Our Story
                </span>
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="relative aspect-[4/3] lg:aspect-[4/5] max-w-xl ml-auto overflow-hidden">
                <img
                  src="/malinois.jpg"
                  alt="Belgian Malinois at the kennel"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/50 via-transparent to-transparent" />
                <div className="absolute top-6 right-6 border border-gold/50 px-4 py-3 bg-forest/40 backdrop-blur-sm">
                  <p className="text-gold text-[9px] uppercase tracking-[0.22em]">
                    Est. · United States
                  </p>
                </div>
              </div>

              <div className="relative md:absolute -mt-8 ml-4 md:mt-0 md:-bottom-6 md:left-0 lg:-left-10 bg-gold text-forest px-7 py-6 max-w-[280px] shadow-xl">
                <p className="text-[9px] uppercase tracking-[0.2em] mb-2 opacity-70">
                  Our Standard
                </p>
                <p className="font-serif text-xl leading-snug">
                  Purpose in every pairing. Intention in every puppy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Stories */}
      <section className="relative overflow-hidden bg-forest text-cream py-28 md:py-32">
        <div className="absolute top-0 right-0 w-72 h-72 border-l border-b border-gold/10" />
        <div className="absolute bottom-0 left-0 w-56 h-56 border-r border-t border-gold/10" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-gold" />
                <p className="text-gold tracking-[0.3em] uppercase text-xs">
                  Client Stories
                </p>
              </div>
              <h2 className="font-serif text-5xl md:text-6xl leading-[1.02]">
                Life with a
                <br />
                <span className="text-gold">Malinois.</span>
              </h2>
            </div>
            <Link
              href="/reviews"
              className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-cream/70 hover:text-gold transition-colors"
            >
              <span className="border-b border-gold/50 pb-2">Read all stories</span>
              <span>→</span>
            </Link>
          </div>

          {reviews.length > 0 ? (
            <div className="grid md:grid-cols-3 border-t border-gold/15">
              {reviews.map((review, index) => (
                <article
                  key={review.id}
                  className={`py-10 md:px-8 first:md:pl-0 last:md:pr-0 ${index > 0 ? "md:border-l border-gold/15" : ""}`}
                >
                  <div className="flex items-center gap-1 text-gold text-xs mb-7" aria-label={`${review.rating} out of 5 stars`}>
                    {"★".repeat(Math.max(0, Math.min(5, review.rating)))}
                  </div>
                  {review.title && (
                    <h3 className="font-serif text-2xl text-cream mb-4">
                      {review.title}
                    </h3>
                  )}
                  <p className="text-cream/65 leading-relaxed text-sm md:text-base mb-7">
                    “{review.content}”
                  </p>
                  <div className="text-[9px] uppercase tracking-[0.2em] text-cream/40">
                    <span className="text-gold/80">{review.name}</span>
                    {review.location ? ` · ${review.location}` : ""}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="border-t border-gold/15 pt-10 max-w-2xl">
              <p className="font-serif text-2xl text-cream/85 leading-relaxed">
                Our client stories will appear here as approved families share
                their experiences.
              </p>
              <p className="mt-4 text-sm text-cream/45 leading-relaxed">
                We prefer genuine experiences over invented testimonials. Every
                published story is submitted by a client and reviewed before it
                appears on the site.
              </p>
            </div>
          )}

          <div className="mt-14 pt-7 border-t border-gold/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-[9px] uppercase tracking-[0.2em] text-cream/35">
              Real experiences · Thoughtful placement · Shared by clients
            </p>
            <Link
              href="/reviews"
              className="text-gold text-xs uppercase tracking-[0.18em] hover:text-cream transition-colors"
            >
              Share your experience →
            </Link>
          </div>
        </div>
      </section>

      {/* Health & Transparency */}
      <section className="relative overflow-hidden bg-cream py-28 md:py-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gold/40" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16 md:mb-20">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-gold" />
              <p className="text-gold tracking-[0.3em] uppercase text-xs">
                Health & Transparency
              </p>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl text-forest leading-[1.02] mb-6">
              Standards you can
              <br />
              <span className="text-gold">see for yourself.</span>
            </h2>
            <p className="text-charcoal/65 text-base md:text-lg leading-relaxed max-w-2xl">
              We believe responsible placement begins with clear information.
              Health records and supporting documentation are presented with each
              puppy so prospective owners can review the information available.
            </p>
          </div>

          <div className="grid md:grid-cols-3 border-t border-forest/15">
            <div className="py-10 md:pr-10 md:border-r border-forest/15">
              <div className="flex items-center justify-between mb-8">
                <span className="font-serif text-4xl text-gold">01</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-charcoal/40">
                  Evaluation
                </span>
              </div>
              <h3 className="font-serif text-2xl text-forest mb-4">
                Hip & Elbow
              </h3>
              <p className="text-charcoal/65 text-sm leading-relaxed">
                Official hip and elbow evaluation records can be provided for
                breeding dogs, with the applicable registry or evaluation scheme
                identified in the documentation.
              </p>
            </div>

            <div className="py-10 md:px-10 md:border-r border-forest/15">
              <div className="flex items-center justify-between mb-8">
                <span className="font-serif text-4xl text-gold">02</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-charcoal/40">
                  Genetics
                </span>
              </div>
              <h3 className="font-serif text-2xl text-forest mb-4">
                DNA Screening
              </h3>
              <p className="text-charcoal/65 text-sm leading-relaxed">
                Genetic screening information is included where testing has
                been completed, helping families understand the records behind
                a planned pairing.
              </p>
            </div>

            <div className="py-10 md:pl-10">
              <div className="flex items-center justify-between mb-8">
                <span className="font-serif text-4xl text-gold">03</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-charcoal/40">
                  Records
                </span>
              </div>
              <h3 className="font-serif text-2xl text-forest mb-4">
                Open Documentation
              </h3>
              <p className="text-charcoal/65 text-sm leading-relaxed">
                Supporting certificates and available health documentation are
                presented on individual puppy profiles where applicable.
              </p>
            </div>
          </div>

          <div className="mt-14 pt-7 border-t border-forest/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal/45">
              Responsible breeding · Documented information · Thoughtful placement
            </p>
            <Link
              href="/puppies"
              className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-forest group"
            >
              <span className="border-b border-gold pb-2 group-hover:text-gold transition-colors">
                Review Available Puppies
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>\n\n      {/* CTA */}
      <section className="relative overflow-hidden bg-charcoal text-cream py-28 md:py-32">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/malinois.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-charcoal/80" />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gold/60" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-7">
            <span className="h-px w-10 bg-gold" />
            <p className="text-gold text-[10px] uppercase tracking-[0.3em]">
              Begin the Conversation
            </p>
            <span className="h-px w-10 bg-gold" />
          </div>

          <h2 className="font-serif text-5xl md:text-6xl leading-[1.02] mb-6">
            The right Malinois
            <br />
            <span className="text-gold">starts with the right match.</span>
          </h2>

          <p className="text-cream/65 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Tell us about your experience, lifestyle and goals. We take the
            time to understand what you are looking for before discussing
            available puppies and placement.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="min-w-[190px] px-8 py-4 bg-gold text-forest text-sm uppercase tracking-[0.16em] hover:bg-cream transition duration-300"
            >
              Start Your Inquiry
            </Link>
            <Link
              href="/puppies"
              className="min-w-[190px] px-8 py-4 border border-cream/30 text-cream text-sm uppercase tracking-[0.16em] hover:border-gold hover:text-gold transition duration-300"
            >
              View Puppies
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[9px] uppercase tracking-[0.22em] text-cream/35">
            <span>Thoughtful Placement</span>
            <span className="text-gold/50">•</span>
            <span>Documented Information</span>
            <span className="text-gold/50">•</span>
            <span>Personal Inquiry</span>
          </div>
        </div>
      </section>
    </>
  );
}