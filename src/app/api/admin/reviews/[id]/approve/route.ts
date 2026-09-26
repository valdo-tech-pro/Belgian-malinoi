import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  const { id } = await params;

  try {
    await prisma.review.update({
      where: { id },
      data: { approved: true },
    });

    return NextResponse.redirect(new URL("/admin/reviews", req.url));
  } catch (error) {
    console.error("Approve review error:", error);
    return NextResponse.redirect(new URL("/admin/reviews?error=approve", req.url));
  }
}
