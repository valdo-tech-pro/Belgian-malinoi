import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const reviews = await prisma.review
    .findMany({
      where: { approved: false },
      orderBy: { createdAt: "desc" },
    })
    .catch(() => []);

  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-6">
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-serif text-3xl text-forest">Reviews to Approve</h1>
        <Link href="/admin" className="text-sm text-gold hover:underline">
          ← Dashboard
        </Link>
      </div>

      {reviews.length === 0 ? (
        <p className="text-charcoal/60">No reviews waiting for approval.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white border border-forest/10 p-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <div className="font-medium text-forest">{review.name}</div>
                  {review.location && (
                    <div className="text-sm text-charcoal/60">{review.location}</div>
                  )}
                  <div className="text-sm text-gold mt-1">
                    {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                  </div>
                </div>

                <form action={`/api/admin/reviews/${review.id}/approve`} method="POST">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-forest text-white text-sm hover:bg-forest/90 transition"
                  >
                    Approve Review
                  </button>
                </form>
              </div>

              {review.title && (
                <h2 className="font-medium text-charcoal mt-4">{review.title}</h2>
              )}
              <p className="text-sm text-charcoal/80 whitespace-pre-wrap mt-2">
                {review.content}
              </p>
              <p className="text-xs text-charcoal/40 mt-3">
                {new Date(review.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
