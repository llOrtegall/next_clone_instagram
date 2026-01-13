'use server';

import { prisma } from "./prisma";

const MAX_UPLOADS_PER_DAY = 3;
const RATE_LIMIT_WINDOW = 86400000; // 24 horas en milisegundos

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: Date;
}

/**
 * Verifica si el usuario puede hacer un upload
 * Usa la base de datos para persistir el rate limit
 */
export async function checkUploadRateLimit(userEmail: string): Promise<RateLimitResult> {
  const now = new Date();

  try {
    // Buscar o crear el registro de rate limit del usuario
    let rateLimit = await prisma.uploadRateLimit.findUnique({
      where: { userEmail },
    });

    // Si no existe o ya expiró el período, crear/resetear
    if (!rateLimit || now > rateLimit.resetAt) {
      const resetAt = new Date(now.getTime() + RATE_LIMIT_WINDOW);
      
      rateLimit = await prisma.uploadRateLimit.upsert({
        where: { userEmail },
        update: {
          count: 1,
          resetAt,
        },
        create: {
          userEmail,
          count: 1,
          resetAt,
        },
      });

      return {
        success: true,
        remaining: MAX_UPLOADS_PER_DAY - 1,
        resetAt: rateLimit.resetAt,
      };
    }

    // Verificar si ya alcanzó el límite
    if (rateLimit.count >= MAX_UPLOADS_PER_DAY) {
      return {
        success: false,
        remaining: 0,
        resetAt: rateLimit.resetAt,
      };
    }

    // Incrementar el contador
    rateLimit = await prisma.uploadRateLimit.update({
      where: { userEmail },
      data: {
        count: {
          increment: 1,
        },
      },
    });

    return {
      success: true,
      remaining: MAX_UPLOADS_PER_DAY - rateLimit.count,
      resetAt: rateLimit.resetAt,
    };

  } catch (error) {
    console.error('Error checking rate limit:', error);
    // En caso de error, permitir el upload (fail-open)
    return {
      success: true,
      remaining: MAX_UPLOADS_PER_DAY,
      resetAt: new Date(now.getTime() + RATE_LIMIT_WINDOW),
    };
  }
}

/**
 * Obtiene el estado actual del rate limit de un usuario sin incrementarlo
 */
export async function getRateLimitStatus(userEmail: string): Promise<RateLimitResult> {
  const now = new Date();

  try {
    const rateLimit = await prisma.uploadRateLimit.findUnique({
      where: { userEmail },
    });

    if (!rateLimit || now > rateLimit.resetAt) {
      return {
        success: true,
        remaining: MAX_UPLOADS_PER_DAY,
        resetAt: new Date(now.getTime() + RATE_LIMIT_WINDOW),
      };
    }

    return {
      success: rateLimit.count < MAX_UPLOADS_PER_DAY,
      remaining: Math.max(0, MAX_UPLOADS_PER_DAY - rateLimit.count),
      resetAt: rateLimit.resetAt,
    };

  } catch (error) {
    console.error('Error getting rate limit status:', error);
    return {
      success: true,
      remaining: MAX_UPLOADS_PER_DAY,
      resetAt: new Date(now.getTime() + RATE_LIMIT_WINDOW),
    };
  }
}

/**
 * Resetea el rate limit de un usuario (útil para testing o admins)
 */
export async function resetUserRateLimit(userEmail: string): Promise<void> {
  try {
    await prisma.uploadRateLimit.delete({
      where: { userEmail },
    });
  } catch (error) {
    console.error('Error resetting rate limit:', error);
  }
}
