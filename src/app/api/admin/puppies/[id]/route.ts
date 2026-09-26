import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { checkRateLimit, getClientIdentifier, isSameOrigin, rateLimitResponse, readJson } from "@/lib/security";
import { z } from "zod";

const puppySchema = z.object({
  name: z.string().trim().min(1).max(100), sex: z.string().trim().min(1).max(20),
  birthDate: z.string().min(1), color: z.string().trim().min(1).max(50),
  price: z.coerce.number().int().positive().max(10_000_000),
  status: z.enum(["Available", "Reserved", "Sold"]), litter: z.string().trim().max(100).optional(),
  description: z.string().trim().min(1).max(5000), sire: z.string().trim().min(1).max(100),
  dam: z.string().trim().min(1).max(100), sireHD: z.string().trim().max(50).optional(),
  sireED: z.string().trim().max(50).optional(), damHD: z.string().trim().max(50).optional(),
  damED: z.string().trim().max(50).optional(), dna: z.string().trim().max(200).optional(),
  images: z.string().trim().min(1).max(10_000), deposit: z.coerce.number().int().min(0).max(10_000_000),
});

function getImages(value: string) {
  const list = value.split(/[\n,]+/).map((u) => u.trim()).filter(Boolean);
  if (list.length === 0 || list.length > 20) throw new Error("Provide between 1 and 20 photo URLs");
  for (const value of list) {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error("Invalid image URL");
  }
  return list;
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isSameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try { await requireAdmin(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const limit = checkRateLimit(`admin-puppy-edit:${getClientIdentifier(req)}`, 30, 10 * 60 * 1000);
  if (!limit.allowed) return rateLimitResponse(limit.retryAfterSeconds);

  try {
    const { id } = await params;
    const validation = puppySchema.safeParse(await readJson<unknown>(req, 32 * 1024));
    if (!validation.success) return NextResponse.json({ error: validation.error.errors[0].message }, { status: 400 });
    const d = validation.data;
    const birth = new Date(d.birthDate);
    if (Number.isNaN(birth.getTime()) || birth.getTime() > Date.now()) return NextResponse.json({ error: "Invalid birth date" }, { status: 400 });
    const slug = d.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    if (!slug) return NextResponse.json({ error: "Name must contain letters or numbers" }, { status: 400 });

    const puppy = await prisma.puppy.update({
      where: { id },
      data: {
        name:d.name, slug, sex:d.sex, birthDate:birth, color:d.color, price:d.price, status:d.status,
        litter:d.litter || null, description:d.description, sire:d.sire, dam:d.dam,
        sireHD:d.sireHD || null, sireED:d.sireED || null, damHD:d.damHD || null, damED:d.damED || null,
        dna:d.dna || null, images:JSON.stringify(getImages(d.images)), deposit:d.deposit,
      },
    });
    return NextResponse.json({ success:true, slug:puppy.slug });
  } catch (error: any) {
    if (error?.code === "P2025") return NextResponse.json({ error:"Puppy not found" }, { status:404 });
    if (error?.code === "P2002") return NextResponse.json({ error:"A puppy with this name already exists" }, { status:400 });
    return NextResponse.json({ error:error instanceof Error ? error.message : "Failed to update puppy" }, { status:400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isSameOrigin(req)) return NextResponse.json({ error:"Forbidden" }, { status:403 });
  try { await requireAdmin(); } catch { return NextResponse.json({ error:"Unauthorized" }, { status:401 }); }
  const limit = checkRateLimit(`admin-puppy-delete:${getClientIdentifier(req)}`, 10, 10 * 60 * 1000);
  if (!limit.allowed) return rateLimitResponse(limit.retryAfterSeconds);

  try {
    const { id } = await params;
    await prisma.puppy.delete({ where:{ id } });
    return NextResponse.json({ success:true });
  } catch (error:any) {
    if (error?.code === "P2025") return NextResponse.json({ error:"Puppy not found" }, { status:404 });
    return NextResponse.json({ error:"Unable to delete this puppy. It may have related records." }, { status:409 });
  }
}
