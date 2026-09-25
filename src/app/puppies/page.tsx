import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PuppySearch } from "@/components/PuppySearch";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Available Belgian Malinois Puppies",
  description:
    "Browse and search available health-tested Belgian Malinois puppies from working lines in the US. Filter by sex, status and price.",
  alternates: { canonical: "/puppies" },
};

export default async function PuppiesPage() {
  let puppies: any[] = [];
  try {
    puppies = await prisma.puppy.findMany({
      orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    });
  } catch {
    // DB not ready
  }

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-20 bg-forest text-cream">
        <div className="absolute inset-0 opacity-15">
          <img
            src="/malinois.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-forest/85" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-gold" />
            <p className="text-gold tracking-[0.3em] uppercase text-xs">
              Current Availability
            </p>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] max-w-3xl">
            Available
            <br />
            <span className="text-gold">Puppies.</span>
          </h1>
          <p className="mt-6 text-cream/65 max-w-xl text-base md:text-lg leading-relaxed">
            Explore current placements and review the information available for
            each puppy. Profiles are designed to make the details easy to compare.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <PuppySearch puppies={puppies} />
        </div>
      </section>
    </>
  );
}
