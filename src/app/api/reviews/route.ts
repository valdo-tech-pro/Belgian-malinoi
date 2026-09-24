import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { checkRateLimit, getClientIdentifier, isSameOrigin, rateLimitResponse, readJson } from "@/lib/security";

const reviewSchema = z.object({
  name: z.string().trim().min(1).max(100),
  location: z.string().trim().max(100).optional(),
  rating: z.coerce.number().int().min(1).max(5),
  title: z.string().trim().max(150).optional(),
  content: z.string().trim().min(1).max(3000),
});

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const limit = checkRateLimit(
    `review:${getClientIdentifier(req)}`,
    5,
    15 * 60 * 1000,
  );
  if (!limit.allowed) return rateLimitResponse(limit.retryAfterSeconds);

  try {
    const body = await readJson<unknown>(req, 32 * 1024);
    const validation = reviewSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 },
      );
    }

    const d = validation.data;
    await prisma.review.create({
      data: {
        name: d.name,
        location: d.location || null,
        rating: d.rating,
        title: d.title || null,
        content: d.content,
        approved: false,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Review error:", error);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return NextResponse.json(reviews, {
      headers: { "Cache-Control": "public, max-age=60, s-maxage=60" },
    });
  } catch {
    return NextResponse.json([]);
  }
}
