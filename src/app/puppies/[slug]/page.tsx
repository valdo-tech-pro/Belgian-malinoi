import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://belgian-malinoi.vercel.app";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function ageFromBirth(birthDate: Date) {
  const now = new Date();
  const weeks = Math.floor(
    (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 7)
  );
  if (weeks < 16) return `${weeks} weeks`;
  return `${Math.floor(weeks / 4.3)} months`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const puppy = await prisma.puppy
    .findUnique({ where: { slug } })
    .catch(() => null);

  if (!puppy) {
    return { title: "Puppy Not Found" };
  }

  const images = JSON.parse(puppy.images || "[]") as string[];
  const title = `${puppy.name} – ${puppy.sex} Belgian Malinois Puppy`;
  const description = `${puppy.name} is a ${puppy.sex.toLowerCase()} Belgian Malinois puppy (${puppy.color}). ${puppy.status}. Health-tested parents (HD/ED + DNA). ${puppy.description.slice(0, 120)}...`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/puppies/${puppy.slug}`,
      type: "website",
      images: images[0]
        ? [{ url: images[0], width: 800, height: 600, alt: puppy.name }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images[0] ? [images[0]] : [],
    },
    alternates: {
      canonical: `${siteUrl}/puppies/${puppy.slug}`,
    },
  };
}

export default async function PuppyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const puppy = await prisma.puppy
    .findUnique({
      where: { slug },
      include: { certificates: true },
    })
    .catch(() => null);

  if (!puppy) notFound();

  const images = JSON.parse(puppy.images || "[]") as string[];

  // Product structured data for this puppy
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${puppy.name} – Belgian Malinois Puppy`,
    description: puppy.description,
    image: images,
    brand: {
      "@type": "Brand",
      name: "Belgian Malinois Special Breed",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: puppy.price,
      availability:
        puppy.status === "Available"
          ? "https://schema.org/InStock"
          : puppy.status === "Reserved"
          ? "https://schema.org/LimitedAvailability"
          : "https://schema.org/OutOfStock",
      url: `${siteUrl}/puppies/${puppy.slug}`,
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Sex", value: puppy.sex },
      { "@type": "PropertyValue", name: "Color", value: puppy.color },
      { "@type": "PropertyValue", name: "Breed", value: "Belgian Malinois" },
      { "@type": "PropertyValue", name: "Sire HD", value: puppy.sireHD || "" },
      { "@type": "PropertyValue", name: "Dam HD", value: puppy.damHD || "" },
    ],
  };

  return (
    <section className="pt-28 pb-24 bg-cream min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="max-w-7xl mx-auto px-6">
        <Link
          href="/puppies"
          className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-charcoal/50 hover:text-gold mb-10 transition"
        >
          <span>←</span>
          Back to all puppies
        </Link>

        <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-10 lg:gap-16 items-start">
          <div>
            <div className="relative aspect-[4/3] bg-forest overflow-hidden mb-4 shadow-[0_20px_55px_rgba(24,55,43,0.12)]">
              {images[0] && (
                <img
                  src={images[0]}
                  alt={puppy.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.015]"
                />
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="aspect-square overflow-hidden border border-forest/10"
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`inline-block px-3 py-1 text-xs tracking-wide border rounded-sm ${
                  puppy.status === "Available"
                    ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                    : puppy.status === "Reserved"
                    ? "bg-amber-100 text-amber-800 border-amber-200"
                    : "bg-stone-100 text-stone-600 border-stone-200"
                }`}
              >
                {puppy.status}
              </span>
              {puppy.litter && (
                <span className="text-sm text-charcoal/60">{puppy.litter}</span>
              )}
            </div>

            <h1 className="font-serif text-5xl text-forest mb-2">
              {puppy.name}
            </h1>
            <p className="text-charcoal/70 mb-6">
              {puppy.sex} · Born{" "}
              {new Date(puppy.birthDate).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              · {ageFromBirth(puppy.birthDate)}
            </p>

            <div className="flex items-end justify-between gap-6 border-y border-forest/10 py-6 mb-8">
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-charcoal/40 mb-2">
                  Placement
                </p>
                <div className="text-3xl font-serif text-forest">
                  {formatPrice(puppy.price)}
                </div>
              </div>
              <div className="text-right text-[9px] uppercase tracking-[0.16em] text-charcoal/40">
                <div>{puppy.sex}</div>
                <div className="mt-1">{puppy.color}</div>
              </div>
            </div>

            <p className="text-charcoal/80 leading-relaxed mb-8">
              {puppy.description}
            </p>

            <div className="bg-white border border-forest/10 p-6 mb-8 shadow-sm">
              <div className="flex items-center justify-between mb-4"><h3 className="font-serif text-xl text-forest">Parents</h3><span className="text-[9px] uppercase tracking-[0.18em] text-charcoal/35">Pedigree</span></div>
              <p className="text-sm mb-2">
                <span className="text-charcoal/60">Sire:</span> {puppy.sire}
              </p>
              <p className="text-sm">
                <span className="text-charcoal/60">Dam:</span> {puppy.dam}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="font-serif text-lg text-forest mb-4">
                Health Clearances
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-4 border border-forest/10 shadow-sm">
                  <div className="text-charcoal/50 text-xs uppercase tracking-wide">
                    Sire HD / ED
                  </div>
                  <div className="font-medium text-forest mt-1">
                    {puppy.sireHD || "—"} / {puppy.sireED || "—"}
                  </div>
                </div>
                <div className="bg-white p-4 border border-forest/10">
                  <div className="text-charcoal/50 text-xs uppercase tracking-wide">
                    Dam HD / ED
                  </div>
                  <div className="font-medium text-forest mt-1">
                    {puppy.damHD || "—"} / {puppy.damED || "—"}
                  </div>
                </div>
                <div className="bg-white p-4 border border-forest/10 col-span-2">
                  <div className="text-charcoal/50 text-xs uppercase tracking-wide">
                    DNA Panel
                  </div>
                  <div className="font-medium text-forest mt-1">
                    {puppy.dna || "—"}
                  </div>
                </div>
              </div>
            </div>

            {puppy.certificates.length > 0 && (
              <div className="mb-10">
                <h3 className="font-serif text-lg text-forest mb-2">
                  Certificates
                </h3>
                <div className="bg-white border border-forest/10 px-4">
                  {puppy.certificates.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center justify-between py-3 border-b border-forest/10 last:border-0"
                    >
                      <div>
                        <span className="text-sm font-medium text-forest">
                          {c.name}
                        </span>
                        <span className="ml-2 text-xs text-charcoal/50">
                          {c.type}
                        </span>
                      </div>
                      <a
                        href={c.fileUrl}
                        className="text-gold text-sm hover:underline"
                      >
                        View
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {puppy.status === "Available" ? (
              <div className="space-y-4">
                <Link
                  href={`/contact?puppy=${puppy.name}`}
                  className="block w-full text-center px-8 py-4 bg-gold text-forest text-sm uppercase tracking-[0.16em] hover:bg-forest hover:text-cream transition duration-300"
                >
                  Send Inquiry about {puppy.name}
                </Link>
              </div>
            ) : (
              <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-sm">
                This puppy is currently {puppy.status.toLowerCase()}. You may
                still inquire about future litters.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
