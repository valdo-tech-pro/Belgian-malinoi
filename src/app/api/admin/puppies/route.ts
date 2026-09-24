import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { checkRateLimit, getClientIdentifier, isSameOrigin, rateLimitResponse, readJson } from "@/lib/security";
import { z } from "zod";

const puppySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  sex: z.string().trim().min(1, "Sex is required").max(20),
  birthDate: z.string().min(1, "Birth date is required"),
  color: z.string().trim().min(1, "Color is required").max(50),
  price: z.coerce.number().int().positive("Price must be a positive number").max(10_000_000),
  status: z.enum(["Available", "Reserved", "Sold"]).default("Available"),
  litter: z.string().trim().max(100).optional(),
  description: z.string().trim().min(1, "Description is required").max(5000),
  sire: z.string().trim().min(1, "Sire is required").max(100),
  dam: z.string().trim().min(1, "Dam is required").max(100),
  sireHD: z.string().trim().max(50).optional(),
  sireED: z.string().trim().max(50).optional(),
  damHD: z.string().trim().max(50).optional(),
  damED: z.string().trim().max(50).optional(),
  dna: z.string().trim().max(200).optional(),
  images: z.string().trim().min(1, "Paste at least one photo URL").max(10_000),
  deposit: z.coerce.number().int().min(0).max(10_000_000).default(500),
});

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const limit = checkRateLimit(
    `admin-puppy:${getClientIdentifier(req)}`,
    30,
    10 * 60 * 1000,
  );
  if (!limit.allowed) return rateLimitResponse(limit.retryAfterSeconds);

  try {
    const body = await readJson<unknown>(req, 32 * 1024);
    const validation = puppySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 },
      );
    }

    const d = validation.data;
    const birth = new Date(d.birthDate);
    if (Number.isNaN(birth.getTime()) || birth.getTime() > Date.now()) {
      return NextResponse.json({ error: "Invalid birth date" }, { status: 400 });
    }

    const imageList = d.images
      .split(/[\n,]+/)
      .map((u) => u.trim())
      .filter(Boolean);

    if (imageList.length === 0 || imageList.length > 20) {
      return NextResponse.json(
        { error: "Provide between 1 and 20 photo URLs" },
        { status: 400 },
      );
    }

    for (const value of imageList) {
      try {
        const url = new URL(value);
        if (url.protocol !== "https:" && url.protocol !== "http:") {
          throw new Error("Unsupported protocol");
        }
      } catch {
        return NextResponse.json(
          { error: "Every photo URL must be a valid HTTP or HTTPS URL" },
          { status: 400 },
        );
      }
    }

    const slug = d.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!slug) {
      return NextResponse.json(
        { error: "Name must contain letters or numbers" },
        { status: 400 },
      );
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
        { status: 400 },
      );
    }
    console.error("Create puppy error:", error);
    return NextResponse.json({ error: "Failed to save puppy" }, { status: 500 });
  }
}
