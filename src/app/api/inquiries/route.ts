import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// 1. Define strict rules for the incoming data
const inquirySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Please enter a valid email address").max(100),
  message: z.string().min(1, "Message is required").max(2000),
  phone: z.string().max(20).optional(),
  country: z.string().max(50).optional(),
  puppyName: z.string().max(100).optional(),
  experience: z.string().max(1000).optional(),
  purpose: z.string().max(1000).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 2. Validate the request body against our rules
    const validation = inquirySchema.safeParse(body);

    if (!validation.success) {
      // Return the first validation error message to the user
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    // 3. Extract the clean, validated data
    const { name, email, message, phone, country, puppyName, experience, purpose } = validation.data;

    // 4. Save to database
    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        message,
        phone: phone || null,
        country: country || null,
        puppyName: puppyName || null,
        experience: experience || null,
        purpose: purpose || null,
      },
    });

    return NextResponse.json({ success: true, id: inquiry.id });
  } catch (error) {
    console.error("Inquiry error:", error);
    return NextResponse.json(
      { error: "Failed to save inquiry" },
      { status: 500 }
    );
  }
}