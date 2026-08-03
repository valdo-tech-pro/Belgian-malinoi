import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const inquiries = await prisma.inquiry
    .findMany({ orderBy: { createdAt: "desc" } })
    .catch(() => []);

  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-6">
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-serif text-3xl text-forest">Inquiries</h1>
        <Link href="/admin" className="text-sm text-gold hover:underline">
          ← Dashboard
        </Link>
      </div>

      {inquiries.length === 0 ? (
        <p className="text-charcoal/60">No inquiries yet.</p>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="bg-white border border-forest/10 p-5"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium text-forest">{inq.name}</div>
                  <div className="text-sm text-charcoal/60">{inq.email}</div>
                </div>
                <span className="text-xs px-2 py-1 bg-forest/10 text-forest">
                  {inq.status}
                </span>
              </div>
              {inq.puppyName && (
                <p className="text-sm text-gold mb-1">
                  Interested in: {inq.puppyName}
                </p>
              )}
              <p className="text-sm text-charcoal/80 whitespace-pre-wrap">
                {inq.message}
              </p>
              <p className="text-xs text-charcoal/40 mt-3">
                {new Date(inq.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
