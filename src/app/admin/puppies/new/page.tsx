import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { PuppyForm } from "./PuppyForm";

export const dynamic = "force-dynamic";

export default async function NewPuppyPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="pt-28 pb-20 max-w-3xl mx-auto px-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl text-forest">Add New Puppy</h1>
        <Link href="/admin/puppies" className="text-sm text-gold hover:underline">
          ← Back to list
        </Link>
      </div>
      <PuppyForm />
    </div>
  );
}