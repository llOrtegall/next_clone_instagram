import { uploadToS3 } from "@/utils/s3-r2";
import { auth } from "@/auth";
import { checkUploadRateLimit } from "@/lib/rate-limit";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  try {
    // 1. AUTENTICACIÓN - Verificar que el usuario esté autenticado
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    // 2. RATE LIMITING - Prevenir spam (3 uploads por día, persistido en DB)
    const rateLimitResult = await checkUploadRateLimit(session.user.email);
    
    if (!rateLimitResult.success) {
      const resetDate = new Date(rateLimitResult.resetAt).toLocaleString();
      return NextResponse.json(
        { 
          error: `Upload limit reached. You can upload up to 3 files per day. Please try again after ${resetDate}.`,
          resetAt: rateLimitResult.resetAt,
          remaining: 0,
        },
        { status: 429 }
      );
    }

    const data = await request.formData();
    const file = data.get("file") as File;
    
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // 3. VALIDAR TIPO DE ARCHIVO
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only images are allowed." },
        { status: 400 }
      );
    }

    // 4. VALIDAR TAMAÑO
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Max size is 5MB." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // 5. GENERAR NOMBRE ÚNICO Y SEGURO (UUID + user email hash)
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const uuid = randomUUID();
    const fileName = `${uuid}.${extension}`;

    // 6. SUBIR A R2
    const result = await uploadToS3(fileName, buffer, file.type);
    
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