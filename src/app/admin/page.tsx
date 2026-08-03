import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [
    puppyCount,
    availableCount,
    reservedCount,
    inquiryCount,
    newInquiries,
    applicationCount,
    waitingCount,
    reviewCount,
    appointmentCount,
    newsletterCount,
  ] = await Promise.all([
    prisma.puppy.count().catch(() => 0),
    prisma.puppy.count({ where: { status: "Available" } }).catch(() => 0),
    prisma.puppy.count({ where: { status: "Reserved" } }).catch(() => 0),
    prisma.inquiry.count().catch(() => 0),
    prisma.inquiry.count({ where: { status: "New" } }).catch(() => 0),
    prisma.application.count().catch(() => 0),
    prisma.waitingList.count({ where: { status: "Active" } }).catch(() => 0),
    prisma.review.count({ where: { approved: false } }).catch(() => 0),
    prisma.appointment.count({ where: { status: "Pending" } }).catch(() => 0),
    prisma.newsletter.count({ where: { active: true } }).catch(() => 0),
  ]);

  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-6">
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-serif text-4xl text-forest">Admin Analytics</h1>
        <form action="/api/auth/logout" method="POST">
          <button type="submit" className="text-sm text-charcoal/60 hover:text-gold">
            Log out
          </button>
        </form>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white p-5 border border-forest/10">
          <div className="text-2xl font-serif text-forest">{puppyCount}</div>
          <div className="text-xs text-charcoal/60">Total Puppies</div>
        </div>
        <div className="bg-white p-5 border border-forest/10">
          <div className="text-2xl font-serif text-emerald-700">{availableCount}</div>
          <div className="text-xs text-charcoal/60">Available</div>
        </div>
        <div className="bg-white p-5 border border-forest/10">
          <div className="text-2xl font-serif text-amber-700">{reservedCount}</div>
          <div className="text-xs text-charcoal/60">Reserved</div>
        </div>
        <div className="bg-white p-5 border border-forest/10">
          <div className="text-2xl font-serif text-gold">{newInquiries}</div>
          <div className="text-xs text-charcoal/60">New Inquiries</div>
        </div>
        <div className="bg-white p-5 border border-forest/10">
          <div className="text-2xl font-serif text-forest">{inquiryCount}</div>
          <div className="text-xs text-charcoal/60">Total Inquiries</div>
        </div>
        <div className="bg-white p-5 border border-forest/10">
          <div className="text-2xl font-serif text-forest">{applicationCount}</div>
          <div className="text-xs text-charcoal/60">Applications</div>
        </div>
        <div className="bg-white p-5 border border-forest/10">
          <div className="text-2xl font-serif text-forest">{waitingCount}</div>
          <div className="text-xs text-charcoal/60">Waiting List</div>
        </div>
        <div className="bg-white p-5 border border-forest/10">
          <div className="text-2xl font-serif text-forest">{newsletterCount}</div>
          <div className="text-xs text-charcoal/60">Newsletter</div>
        </div>
        <div className="bg-white p-5 border border-forest/10">
          <div className="text-2xl font-serif text-forest">{appointmentCount}</div>
          <div className="text-xs text-charcoal/60">Pending Appointments</div>
        </div>
        <div className="bg-white p-5 border border-forest/10">
          <div className="text-2xl font-serif text-forest">{reviewCount}</div>
          <div className="text-xs text-charcoal/60">Reviews to Approve</div>
        </div>
      </div>

      <div className="space-y-3">
        <Link href="/admin/puppies" className="block p-4 bg-white border border-forest/10 hover:border-gold transition">
          Manage Puppies →
        </Link>
        <Link href="/admin/inquiries" className="block p-4 bg-white border border-forest/10 hover:border-gold transition">
          View Inquiries →
        </Link>
        <Link href="/" className="block p-4 bg-white border border-forest/10 hover:border-gold transition">
          View Public Site →
        </Link>
      </div>
    </div>
  );
}
