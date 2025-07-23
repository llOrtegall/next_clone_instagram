'use server';

import { prisma } from "@/db";

export async function updateProfile(data: FormData, userEmail: string) {
  await prisma.profile.upsert({
    where: {
      email: userEmail,
    },
    update: {
      username: data.get("username") as string,
      name: data.get('names') as string,
      subtitle: data.get('subtitle') as string,
      bio: data.get('bio') as string
    },
    create: {
      email: userEmail,
      username: data.get('username') as string,
      name: data.get('names') as string,
      subtitle: data.get('subtitle') as string,
      bio: data.get('bio') as string
    }
  })
}