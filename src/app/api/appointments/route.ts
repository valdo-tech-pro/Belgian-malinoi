import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, date, timeSlot, type, notes, puppyId } = body;

    if (!name || !email || !date || !timeSlot) {
      return NextResponse.json(
        { error: "Name, email, date and time slot are required" },
        { status: 400 }
      );
    }

    await prisma.appointment.create({
      data: {
        name,
        email,
        phone: phone || null,
        date: new Date(date),
        timeSlot,
        type: type || "Visit",
        notes: notes || null,
        puppyId: puppyId || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to book appointment" }, { status: 500 });
  }
}
