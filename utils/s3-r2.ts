"use server";

import {
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const S3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true,
});

interface UploadResult {
  url: string;
  key: string;
  etag?: string;
}

export const uploadToS3 = async (
  key: string, 
  body: Buffer | Uint8Array, 
  contentType?: string
): Promise<UploadResult> => {
  // Sanitizar el key para evitar path traversal
  const sanitizedKey = key.replace(/\.\./g, '').replace(/^\/+/, '');

  const putObjectParams = {
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: sanitizedKey,
    Body: body,
    ContentType: contentType || 'application/octet-stream',
    // Agregar headers de seguridad
    CacheControl: 'public, max-age=31536000, immutable',
    Metadata: {
      'uploaded-at': new Date().toISOString(),
    },
  };

  const res = await S3.send(new PutObjectCommand(putObjectParams));

  // Construir URL pública (ajusta según tu dominio público de R2)
  const publicUrl = `${process.env.R2_PUBLIC_URL}/${sanitizedKey}`;

  return {
    url: publicUrl,
    key: sanitizedKey,
    etag: res.ETag,
  };
}