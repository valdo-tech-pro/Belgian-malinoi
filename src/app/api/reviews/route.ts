import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, location, rating, title, content } = body;

    if (!name || !content || !rating) {
      return NextResponse.json({ error: "Name, rating and content required" }, { status: 400 });
    }

    const r = Math.min(5, Math.max(1, Number(rating)));

    await prisma.review.create({
      data: {
        name,
        location: location || null,
        rating: r,
        title: title || null,
        content,
        approved: false, // admin must approve
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json([]);
  }
}
