import { checkUploadRateLimit } from "@/lib/rate-limit";
import { NextRequest, NextResponse } from "next/server";
import { uploadToS3 } from "@/utils/s3-r2";
import { randomUUID } from "crypto";
import { auth } from "@/auth";

const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    const rateLimitResult = await checkUploadRateLimit(session.user.email);
    
    if (!rateLimitResult.success) {
      const resetDate = new Date(rateLimitResult.resetAt).toLocaleString();
      return NextResponse.json(
        { 
          error: `Upload limit reached. You can upload up to 10 files per day. Please try again after ${resetDate}.`,
          resetAt: rateLimitResult.resetAt,
          remaining: 0,
        },
        { status: 429 }
      );
    }

    const blob = await request.blob(); // <-- porque el body es binario
  
    if (!blob || blob.size === 0) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_FILE_TYPES.includes(blob.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only images are allowed." },
        { status: 400 }
      );
    }

    if (blob.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Max size is 5MB." },
        { status: 400 }
      );
    }

    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const extension = blob.type.split('/').pop()?.toLowerCase() || 'jpg';
    const uuid = randomUUID();
    const fileName = `${uuid}.${extension}`;

    // upload to S3 or R2
    const result = await uploadToS3(fileName, buffer, blob.type);
    
    return NextResponse.json({
      success: true,
      url: result.url,
      key: result.key,
      rateLimit: {
        remaining: rateLimitResult.remaining - 1, // Ya se incrementó en checkUploadRateLimit
        resetAt: rateLimitResult.resetAt,
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: "Upload failed", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}