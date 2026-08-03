import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name, email, phone, country, address, experience, purpose,
      homeType, hasYard, otherPets, children, workSchedule,
      trainingPlans, whyMalinois, message, preferredPuppy,
    } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email required" }, { status: 400 });
    }

    await prisma.application.create({
      data: {
        name,
        email,
        phone: phone || null,
        country: country || null,
        address: address || null,
        experience: experience || null,
        purpose: purpose || null,
        homeType: homeType || null,
        hasYard: Boolean(hasYard),
        otherPets: otherPets || null,
        children: children || null,
        workSchedule: workSchedule || null,
        trainingPlans: trainingPlans || null,
        whyMalinois: whyMalinois || null,
        message: message || null,
        preferredPuppy: preferredPuppy || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
