import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { checkRateLimit, getClientIdentifier, isSameOrigin, rateLimitResponse, readJson } from "@/lib/security";

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(254),
  message: z.string().trim().min(1, "Message is required").max(2000),
  phone: z.string().trim().max(30).optional(),
  country: z.string().trim().max(80).optional(),
  puppyName: z.string().trim().max(100).optional(),
  experience: z.string().trim().max(1000).optional(),
  purpose: z.string().trim().max(1000).optional(),
});

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const limit = checkRateLimit(
    `inquiry:${getClientIdentifier(req)}`,
    8,
    10 * 60 * 1000,
  );
  if (!limit.allowed) return rateLimitResponse(limit.retryAfterSeconds);

  try {
    const body = await readJson<unknown>(req, 32 * 1024);
    const validation = inquirySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 },
      );
    }

    const data = validation.data;
    const inquiry = await prisma.inquiry.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
        phone: data.phone || null,
        country: data.country || null,
        puppyName: data.puppyName || null,
        experience: data.experience || null,
        purpose: data.purpose || null,
      },
    });

    return NextResponse.json({ success: true, id: inquiry.id });
  } catch (error) {
    console.error("Inquiry error:", error);
    return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
  }
}
