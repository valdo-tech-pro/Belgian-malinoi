import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { checkRateLimit, getClientIdentifier, isSameOrigin, rateLimitResponse, readJson } from "@/lib/security";

const appointmentSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(30).optional(),
  date: z.coerce.date().refine((value) => value.getTime() > Date.now(), "Appointment date must be in the future"),
  timeSlot: z.string().trim().min(1).max(50),
  type: z.enum(["Visit", "Video call", "Pickup"]).default("Visit"),
  notes: z.string().trim().max(2000).optional(),
  puppyId: z.string().cuid().optional().nullable(),
});

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const limit = checkRateLimit(
    `appointment:${getClientIdentifier(req)}`,
    5,
    15 * 60 * 1000,
  );
  if (!limit.allowed) return rateLimitResponse(limit.retryAfterSeconds);

  try {
    const body = await readJson<unknown>(req, 24 * 1024);
    const validation = appointmentSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 },
      );
    }

    const d = validation.data;

    if (d.puppyId) {
      const puppy = await prisma.puppy.findUnique({
        where: { id: d.puppyId },
        select: { id: true },
      });
      if (!puppy) {
        return NextResponse.json({ error: "Invalid puppy" }, { status: 400 });
      }
    }

    await prisma.appointment.create({
      data: {
        name: d.name,
        email: d.email,
        phone: d.phone || null,
        date: d.date,
        timeSlot: d.timeSlot,
        type: d.type,
        notes: d.notes || null,
        puppyId: d.puppyId || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Appointment error:", error);
    return NextResponse.json({ error: "Failed to book appointment" }, { status: 500 });
  }
}
