import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { z } from "zod";

const puppySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  sex: z.string().min(1, "Sex is required").max(20),
  birthDate: z.string().min(1, "Birth date is required"),
  color: z.string().min(1, "Color is required").max(50),
  price: z.coerce.number().int().positive("Price must be a positive number"),
  status: z.enum(["Available", "Reserved", "Sold"]).default("Available"),
  litter: z.string().max(100).optional(),
  description: z.string().min(1, "Description is required").max(5000),
  sire: z.string().min(1, "Sire is required").max(100),
  dam: z.string().min(1, "Dam is required").max(100),
  sireHD: z.string().max(50).optional(),
  sireED: z.string().max(50).optional(),
  damHD: z.string().max(50).optional(),
  damED: z.string().max(50).optional(),
  dna: z.string().max(200).optional(),
  images: z.string().min(1, "Paste at least one photo URL"),
  deposit: z.coerce.number().int().min(0).default(500),
});

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validation = puppySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const d = validation.data;

    const birth = new Date(d.birthDate);
    if (isNaN(birth.getTime())) {
      return NextResponse.json({ error: "Invalid birth date" }, { status: 400 });
    }
    const imageList = d.images
      .split(/[\n,]+/)
      .map((u) => u.trim())
      .filter((u) => u.length > 0);

    if (imageList.length === 0) {
      return NextResponse.json({ error: "Paste at least one photo URL" }, { status: 400 });
    }

    const slug = d.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!slug) {
      return NextResponse.json({ error: "Name must contain letters or numbers" }, { status: 400 });
    }

    const puppy = await prisma.puppy.create({
      data: {
        name: d.name,
        slug,
        sex: d.sex,
        birthDate: birth,
        color: d.color,
        price: d.price,
        status: d.status,
        litter: d.litter || null,
        description: d.description,
        sire: d.sire,
        dam: d.dam,
        sireHD: d.sireHD || null,
        sireED: d.sireED || null,
        damHD: d.damHD || null,
        damED: d.damED || null,
        dna: d.dna || null,
        images: JSON.stringify(imageList),
        deposit: d.deposit,
      },
    });

    return NextResponse.json({ success: true, id: puppy.id, slug: puppy.slug });
  } catch (error: any) {
    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "A puppy with this name already exists" },
        { status: 400 }
      );
    }
    console.error("Create puppy error:", error);    return NextResponse.json({ error: "Failed to save puppy" }, { status: 500 });
  }
}