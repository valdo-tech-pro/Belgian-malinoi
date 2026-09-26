import { NextRequest, NextResponse } from "next/server";
import { isSameOrigin } from "@/lib/security";

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { destroySession } = await import("@/lib/auth");
  await destroySession();
  return NextResponse.redirect(new URL("/admin/login", req.url));
}
