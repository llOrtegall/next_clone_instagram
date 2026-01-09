/**
 * Utilidades de seguridad para la aplicación
 */

import { createHash } from 'crypto';

/**
 * Hashear el email del usuario para nombres de archivo
 */
export function hashEmail(email: string): string {
  return createHash('sha256')
    .update(email)
    .digest('hex')
    .substring(0, 16);
}

/**
 * Validar que una URL pertenece a nuestro bucket de R2
 */
export function isValidR2Url(url: string): boolean {
  const publicUrl = process.env.R2_PUBLIC_URL;
  if (!publicUrl) return false;
  
  try {
    const urlObj = new URL(url);
    const publicUrlObj = new URL(publicUrl);
    return urlObj.hostname === publicUrlObj.hostname;
  } catch {
    return false;
  }
}

/**
 * Sanitizar nombre de archivo
 */
export function sanitizeFileName(fileName: string): string {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, '_')
    .replace(/_{2,}/g, '_')
    .substring(0, 100);
}

/**
 * Validar Content-Type de imagen
 */
export function isValidImageContentType(contentType: string): boolean {
  const validTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/webp',
    'image/gif'
  ];
  return validTypes.includes(contentType.toLowerCase());
}
