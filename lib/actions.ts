'use server';

import { prisma } from "./prisma";
/**
 * This function updates an existing profile or creates a new one based on the provided user email.
 * @param data FormData containing the profile information
 * @param userEmail The email of the user whose profile is to be updated or created
 * @return Promise<void>
 */
export async function updateProfileOrCreate(data: FormData, userEmail: string) {
  const newUserInfo = {
    username: data.get("username") as string,
    name: data.get("name") as string,
    subtitle: data.get("subtitle") as string,
    bio: data.get("bio") as string,
    avatarUrl: data.get("avatarUrl") as string | null,
  }

  await prisma.profile.upsert({
    where: { email: userEmail },
    update: newUserInfo,
    create: {
      email: userEmail,
      ...newUserInfo,
    }
  })
}