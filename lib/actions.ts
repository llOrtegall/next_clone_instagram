'use server';

import { redirect } from "next/navigation";
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

/**
 * Creates a new post with the provided data and user email.
 * @param data FormData containing the post information
 * @param userEmail The email of the user creating the post
 * @returns Promise that resolves to a redirect to the new post's page
 */
export async function newPostCreated(data: FormData, userEmail: string) {
  const newPostInfo = {
    authorEmail: userEmail,
    imageUrl: data.get("imageUrl") as string,
    description: data.get("description") as string,
    location: data.get("location") as string,
  }

  const post = await prisma.post.create({
    data: newPostInfo
  })

  if (post.id) {
    return redirect(`/post/${post.id}`);
  }

  throw new Error('Error creating post');
}

export async function getPostById(id: string) {
  if (!id) {
    throw new Error('id is required')
  }

  try {
    const post = await prisma.post.findFirst({ where: { id } })

    const map = {
      id: post?.id,
      imageUrl: post?.imageUrl,
      description: post?.description,
      location: post?.location
    }

    return map
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    console.log(error);
  }

}

export async function getAllPostByEmail(email: string) {
  if (!email) {
    throw new Error('Email is required')
  }

  try {
    const posts = await prisma.post.findMany({ where: { authorEmail: email } })

    const map = posts.map(p => {
      return {
        id: p?.id,
        imageUrl: p?.imageUrl,
      }
    })

    return map
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    console.log(error);
  }

}