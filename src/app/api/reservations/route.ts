import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { checkRateLimit, getClientIdentifier, isSameOrigin, rateLimitResponse, readJson } from "@/lib/security";

const reservationSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(30).optional(),
  notes: z.string().trim().max(2000).optional(),
  puppyId: z.string().cuid(),
});

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const limit = checkRateLimit(
    `reservation:${getClientIdentifier(req)}`,
    5,
    15 * 60 * 1000,
  );
  if (!limit.allowed) return rateLimitResponse(limit.retryAfterSeconds);

  try {
    const body = await readJson<unknown>(req, 24 * 1024);
    const validation = reservationSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 },
      );
    }

    const d = validation.data;
    const puppy = await prisma.puppy.findUnique({ where: { id: d.puppyId } });
    if (!puppy || puppy.status !== "Available") {
      return NextResponse.json(
        { error: "Puppy not available for reservation" },
        { status: 400 },
      );
    }

    await prisma.reservation.create({
      data: {
        name: d.name,
        email: d.email,
        phone: d.phone || null,
        notes: d.notes || null,
        puppyId: d.puppyId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reservation error:", error);
    return NextResponse.json({ error: "Failed to request reservation" }, { status: 500 });
  }
}
