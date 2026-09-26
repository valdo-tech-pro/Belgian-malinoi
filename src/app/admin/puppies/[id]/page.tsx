import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EditPuppyForm } from "./EditPuppyForm";

export const dynamic = "force-dynamic";

export default async function EditPuppyPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  const { id } = await params;
  const puppy = await prisma.puppy.findUnique({ where: { id } });
  if (!puppy) notFound();

  let images: string[] = [];
  try { const parsed = JSON.parse(puppy.images); if (Array.isArray(parsed)) images = parsed; } catch {}

  return <div className="pt-28 pb-20 max-w-3xl mx-auto px-6">
    <div className="flex items-center justify-between mb-8">
      <h1 className="font-serif text-3xl text-forest">Edit Puppy</h1>
      <Link href="/admin/puppies" className="text-sm text-gold hover:underline">← Back to list</Link>
    </div>
    <EditPuppyForm puppy={{
      id:puppy.id,name:puppy.name,sex:puppy.sex,birthDate:puppy.birthDate.toISOString().slice(0,10),
      color:puppy.color,price:puppy.price,status:puppy.status,litter:puppy.litter || "",
      description:puppy.description,sire:puppy.sire,dam:puppy.dam,sireHD:puppy.sireHD || "",
      sireED:puppy.sireED || "",damHD:puppy.damHD || "",damED:puppy.damED || "",
      dna:puppy.dna || "",images:images.join("\n"),deposit:puppy.deposit
    }} />
  </div>;
}
