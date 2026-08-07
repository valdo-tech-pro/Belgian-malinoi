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
      <section className="pt-32 pb-16 bg-forest text-cream">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-gold tracking-[0.25em] uppercase text-sm mb-3">
            Current Availability
          </p>
          <h1 className="font-serif text-5xl md:text-6xl">Available Puppies</h1>
          <p className="mt-4 text-cream/70 max-w-xl">
            Use the filters below to find the right puppy. All come with health certificates.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <PuppySearch puppies={puppies} />
        </div>
      </section>
    </>
  );
}
