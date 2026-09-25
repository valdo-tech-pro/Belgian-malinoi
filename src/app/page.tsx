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

export default async function HomePage() {
  const featured = await getFeaturedPuppies();

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
      <section className="bg-forest border-y border-gold/20 py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-gold font-serif text-3xl mb-1">100%</div>
            <div className="text-cream/70 text-sm tracking-wide">
              Health Tested
            </div>
          </div>
          <div>
            <div className="text-gold font-serif text-3xl mb-1">HD/ED</div>
            <div className="text-cream/70 text-sm tracking-wide">
              Official Scores
            </div>
          </div>
          <div>
            <div className="text-gold font-serif text-3xl mb-1">DNA</div>
            <div className="text-cream/70 text-sm tracking-wide">
              Panel Screened
            </div>
          </div>
          <div>
            <div className="text-gold font-serif text-3xl mb-1">USA</div>
            <div className="text-cream/70 text-sm tracking-wide">
              Raised & Bred
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
              <div className="relative aspect-[4/5] max-w-xl ml-auto overflow-hidden">
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

              <div className="absolute -bottom-6 -left-2 md:left-0 lg:-left-10 bg-gold text-forest px-7 py-6 max-w-[280px] shadow-xl">
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

      {/* Health */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-gold tracking-[0.25em] uppercase text-sm mb-3">
              Transparency
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-forest">
              Health Certificates
            </h2>
            <p className="mt-4 text-charcoal/70 max-w-2xl mx-auto">
              Every puppy’s parents carry official HD/ED scores and DNA panel
              results. Certificates are displayed on each individual puppy page.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-forest/10 shadow-sm">
              <h3 className="font-serif text-xl text-forest mb-3">
                Hip & Elbow Scores
              </h3>
              <p className="text-charcoal/70 text-sm leading-relaxed">
               Official OFA / PennHIP / national scheme evaluations. We only breed from
                dogs with acceptable scores.
              </p>
            </div>
            <div className="bg-white p-8 border border-forest/10 shadow-sm">
              <h3 className="font-serif text-xl text-forest mb-3">
                DNA Health Panel
              </h3>
              <p className="text-charcoal/70 text-sm leading-relaxed">
                Comprehensive genetic screening for breed-relevant conditions
                before any mating takes place.
              </p>
            </div>
            <div className="bg-white p-8 border border-forest/10 shadow-sm">
              <h3 className="font-serif text-xl text-forest mb-3">
                Full Transparency
              </h3>
              <p className="text-charcoal/70 text-sm leading-relaxed">
                Certificates are published on each puppy’s page. You see exactly
                what we see.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-charcoal text-cream">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">
            Ready to Welcome a Malinois?
          </h2>
          <p className="text-cream/70 text-lg mb-10">
            Every inquiry is answered personally. Tell us about your experience
            and plans.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-gold text-forest font-medium tracking-wide hover:bg-gold/90 transition"
          >
            Start Your Inquiry
          </Link>
        </div>
      </section>
    </>
  );
}