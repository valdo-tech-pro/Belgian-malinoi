import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DeletePuppyButton } from "./DeletePuppyButton";

export const dynamic = "force-dynamic";

export default async function AdminPuppiesPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const puppies = await prisma.puppy
    .findMany({ orderBy: { createdAt: "desc" } })
    .catch(() => []);

  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-6">
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-serif text-3xl text-forest">Puppies</h1>
        <Link href="/admin" className="text-sm text-gold hover:underline">
          ← Dashboard
        </Link>
      </div>

      {puppies.length === 0 ? (
        <p className="text-charcoal/60">No puppies yet. Add a puppy from the admin dashboard.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-forest/20 text-left">
              <th className="py-3 pr-4">Name</th>
              <th className="py-3 pr-4">Sex</th>
              <th className="py-3 pr-4">Status</th>
              <th className="py-3 pr-4">Price</th>
              <th className="py-3 pr-4">Birth</th>
              <th className="py-3">Actions</th>
            </tr></thead>
            <tbody>
              {puppies.map((p) => (
                <tr key={p.id} className="border-b border-forest/10">
                  <td className="py-3 pr-4 font-medium text-forest">
                    <Link href={`/puppies/${p.slug}`} className="hover:text-gold">{p.name}</Link>
                  </td>
                  <td className="py-3 pr-4">{p.sex}</td>
                  <td className="py-3 pr-4">{p.status}</td>
                  <td className="py-3 pr-4">${p.price.toLocaleString("en-US")}</td>
                  <td className="py-3 pr-4">{new Date(p.birthDate).toLocaleDateString("en-US")}</td>
                  <td className="py-3"><div className="flex items-center gap-4">
                    <Link href={`/admin/puppies/${p.id}`} className="text-gold hover:underline">Edit</Link>
                    <DeletePuppyButton id={p.id} name={p.name} />
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-8 text-sm text-charcoal/50">Use the Edit and Delete actions above to manage puppies directly from the admin dashboard.</p>
    </div>
  );
}
