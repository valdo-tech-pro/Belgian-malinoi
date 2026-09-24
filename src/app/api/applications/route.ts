import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { checkRateLimit, getClientIdentifier, isSameOrigin, rateLimitResponse, readJson } from "@/lib/security";

const applicationSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(30).optional(),
  country: z.string().trim().max(80).optional(),
  address: z.string().trim().max(300).optional(),
  experience: z.string().trim().max(2000).optional(),
  purpose: z.string().trim().max(1000).optional(),
  homeType: z.enum(["House", "Apartment", "Farm"]).optional(),
  hasYard: z.boolean().optional().default(false),
  otherPets: z.string().trim().max(1000).optional(),
  children: z.string().trim().max(1000).optional(),
  workSchedule: z.string().trim().max(1000).optional(),
  trainingPlans: z.string().trim().max(2000).optional(),
  whyMalinois: z.string().trim().max(2000).optional(),
  message: z.string().trim().max(2000).optional(),
  preferredPuppy: z.string().trim().max(100).optional(),
});

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const limit = checkRateLimit(
    `application:${getClientIdentifier(req)}`,
    5,
    15 * 60 * 1000,
  );
  if (!limit.allowed) return rateLimitResponse(limit.retryAfterSeconds);

  try {
    const body = await readJson<unknown>(req, 48 * 1024);
    const validation = applicationSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 },
      );
    }

    const d = validation.data;
    await prisma.application.create({
      data: {
        name: d.name,
        email: d.email,
        phone: d.phone || null,
        country: d.country || null,
        address: d.address || null,
        experience: d.experience || null,
        purpose: d.purpose || null,
        homeType: d.homeType || null,
        hasYard: d.hasYard,
        otherPets: d.otherPets || null,
        children: d.children || null,
        workSchedule: d.workSchedule || null,
        trainingPlans: d.trainingPlans || null,
        whyMalinois: d.whyMalinois || null,
        message: d.message || null,
        preferredPuppy: d.preferredPuppy || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Application error:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
