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
      {/* Hero with video */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-forest">
          {/* Replace the src with your own hero video URL */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-50"
            poster="https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2000"
          >
            <source
              src="https://cdn.coverr.co/videos/coverr-a-dog-running-on-the-beach-1080p.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 hero-gradient" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-20">
          <div className="max-w-2xl">
            <p className="text-gold tracking-[0.3em] uppercase text-sm mb-4">
              USA · Premium Working Lines
            </p>
            <h1 className="font-serif text-5xl md:text-7xl text-cream leading-tight mb-6">
              Exceptional
              <br />
              <span className="text-gold">Belgian Malinois</span>
            </h1>
            <p className="text-cream/80 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
              Health-tested, temperamentally sound puppies from carefully
              selected working bloodlines. Raised with purpose in the United States.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/puppies"
                className="px-8 py-4 bg-gold text-forest font-medium tracking-wide hover:bg-gold/90 transition"
              >
                View Available Puppies
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 border border-cream/40 text-cream hover:border-gold hover:text-gold transition"
              >
                Our Philosophy
              </Link>
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
      <section className="py-24 bg-forest text-cream">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-gold tracking-[0.25em] uppercase text-sm mb-3">
              Our Kennel
            </p>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
              Raised with
              <br />
              Intention
            </h2>
            <p className="text-cream/80 leading-relaxed mb-6">
              At Belgian Malinois Special Breed we focus exclusively on producing
              dogs of exceptional drive, structure and stable temperament. Every
              puppy is raised in a carefully enriched environment and comes from
              parents with verified health clearances.
            </p>
            <p className="text-cream/80 leading-relaxed mb-8">
              Located in the United States, we maintain
              close ties to working lines while prioritizing family suitability
              and long-term soundness.
            </p>
            <Link
              href="/about"
              className="text-gold border-b border-gold pb-1 hover:text-cream hover:border-cream transition"
            >
              Discover Our Story →
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] bg-sage/50 rounded-sm overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center opacity-80"
                style={{
                  backgroundImage:
                    "url('/malinois.jpg')",
                }}
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-gold text-forest p-6 max-w-xs">
              <p className="font-serif text-lg">
                “Temperament first. Structure second. Everything else follows.”
              </p>
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
