import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, country, preferences, notes } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email required" }, { status: 400 });
    }

    await prisma.waitingList.create({
      data: {
        name,
        email,
        phone: phone || null,
        country: country || null,
        preferences: preferences || null,
        notes: notes || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to join waiting list" }, { status: 500 });
  }
}
