import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { checkRateLimit, getClientIdentifier, isSameOrigin, rateLimitResponse, readJson } from "@/lib/security";

const newsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address").max(254),
  name: z.string().trim().max(100).optional(),
});

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const limit = checkRateLimit(
    `newsletter:${getClientIdentifier(req)}`,
    5,
    15 * 60 * 1000,
  );
  if (!limit.allowed) return rateLimitResponse(limit.retryAfterSeconds);

  try {
    const body = await readJson<unknown>(req, 8 * 1024);
    const validation = newsletterSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 },
      );
    }

    const { email, name } = validation.data;
    await prisma.newsletter.upsert({
      where: { email },
      update: { active: true, name: name || undefined },
      create: { email, name: name || null },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
