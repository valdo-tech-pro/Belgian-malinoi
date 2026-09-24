import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { checkRateLimit, getClientIdentifier, isSameOrigin, rateLimitResponse } from "@/lib/security";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(request: Request): Promise<NextResponse> {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const limit = checkRateLimit(
    `admin-image-upload:${getClientIdentifier(request)}`,
    60,
    10 * 60 * 1000,
  );
  if (!limit.allowed) return rateLimitResponse(limit.retryAfterSeconds);

  try {
    const body = (await request.json()) as HandleUploadBody;

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
        maximumSizeInBytes: MAX_FILE_SIZE,
        addRandomSuffix: true,
        tokenPayload: JSON.stringify({ purpose: "puppy-photo" }),
      }),
      onUploadCompleted: async ({ blob }) => {
        console.info("Puppy photo uploaded:", blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Image upload failed" },
      { status: 400 },
    );
  }
}
