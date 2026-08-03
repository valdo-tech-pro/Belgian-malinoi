import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, notes, puppyId } = body;

    if (!name || !email || !puppyId) {
      return NextResponse.json({ error: "Name, email and puppy required" }, { status: 400 });
    }

    const puppy = await prisma.puppy.findUnique({ where: { id: puppyId } });
    if (!puppy || puppy.status !== "Available") {
      return NextResponse.json({ error: "Puppy not available for reservation" }, { status: 400 });
    }

    await prisma.reservation.create({
      data: {
        name,
        email,
        phone: phone || null,
        notes: notes || null,
        puppyId,
      },
    });

    // Optionally mark as Reserved
    // await prisma.puppy.update({ where: { id: puppyId }, data: { status: "Reserved" } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to request reservation" }, { status: 500 });
  }
}
