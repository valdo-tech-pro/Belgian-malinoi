import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { checkRateLimit, getClientIdentifier, isSameOrigin, rateLimitResponse, readJson } from "@/lib/security";

const waitingListSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(30).optional(),
  country: z.string().trim().max(80).optional(),
  preferences: z.string().trim().max(1000).optional(),
  notes: z.string().trim().max(2000).optional(),
});

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const limit = checkRateLimit(
    `waiting-list:${getClientIdentifier(req)}`,
    5,
    15 * 60 * 1000,
  );
  if (!limit.allowed) return rateLimitResponse(limit.retryAfterSeconds);

  try {
    const body = await readJson<unknown>(req, 32 * 1024);
    const validation = waitingListSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 },
      );
    }

    const d = validation.data;
    await prisma.waitingList.create({
      data: {
        name: d.name,
        email: d.email,
        phone: d.phone || null,
        country: d.country || null,
        preferences: d.preferences || null,
        notes: d.notes || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waiting-list error:", error);
    return NextResponse.json({ error: "Failed to join waiting list" }, { status: 500 });
  }
}
