'use server';

import { redirect } from "next/navigation";
import { prisma } from "./prisma";

/**
 * This function updates an existing profile or creates a new one based on the provided user email.
 * @param data FormData containing the profile information
 * @param userEmail The email of the user whose profile is to be updated or created
 * @return Promise<void>
 */
export async function updateProfile(data: FormData, userEmail: string) {
  const newUserInfo = {
    username: data.get("username") as string,
    name: data.get("name") as string,
    subtitle: data.get("subtitle") as string,
    bio: data.get("bio") as string,
    image: data.get("image") as string | null,
  }

  await prisma.user.update({
    where: { email: userEmail },
    data: newUserInfo
  })
}

/**
 * Creates a new post with the provided data and user email.
 * @param data FormData containing the post information
 * @param userEmail The email of the user creating the post
 * @returns Promise that resolves to a redirect to the new post's page
 */
export async function newPostCreated(userEmail: string, imageUrl: string, description: string, location: string) {

  const post = await prisma.post.create({
    data: {
      authorEmail: userEmail,
      imageUrl,
      description,
      location,
    }
  })

  if (post.id) {
    return redirect(`/post/${post.id}`);
  }

  throw new Error('Error creating post');
}

/**
 * Fetches a post by its ID.
 * @param id The ID of the post to fetch
 * @returns Promise that resolves to the post data or undefined if not found
 */
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
      location: post?.location,
      email: post?.authorEmail,
      likes: post?.likes
    }

    return map
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    console.log(error);
  }

}

/**
 * Fetches all posts associated with a given email.
 * @param email The email of the user whose posts are to be fetched
 * @returns Promise that resolves to an array of posts
 */
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
        likes: p.likes
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