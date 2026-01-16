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
 * @param userEmail The email of the user creating the post
 * @param imageUrl The URL of the post image
 * @param description The description of the post
 * @param location The location of the post
 * @returns Promise that resolves to a redirect to the new post's page
 */
export async function newPostCreated(userEmail: string, imageUrl: string, description: string, location: string) {
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true }
  });

  if (!user) throw new Error('User not found');

  const post = await prisma.post.create({
    data: {
      authorId: user.id,
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
    const post = await prisma.post.findFirst({ 
      where: { id },
      include: {
        author: {
          select: {
            name: true,
            username: true,
            email: true,
            image: true,
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      }
    })

    if (!post) return null;

    return {
      id: post.id,
      imageUrl: post.imageUrl,
      description: post.description,
      location: post.location,
      author: post.author,
      likesCount: post.likesCount,
      commentsCount: post.commentsCount,
      createdAt: post.createdAt
    }
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
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true }
    });

    if (!user) throw new Error('User not found');

    const posts = await prisma.post.findMany({ 
      where: { authorId: user.id },
      include: {
        author: {
          select: {
            name: true,
            username: true,
            image: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return posts.map(p => ({
      id: p.id,
      imageUrl: p.imageUrl,
      likesCount: p.likesCount,
      commentsCount: p.commentsCount,
      author: p.author
    }))
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    console.log(error);
  }

}

// ============ LIKES ============

/**
 * Verify if a user has liked a post
 * @param postId id of the post
 * @param userId id of the actual user session
 * @returns 
 */
export async function getPostLikeStatus(postId: string, userId: string) {
  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId: userId,
        postId
      }
    }
  });

  if (!existingLike) return false;
  return true
}

/**
 * Toggle like on a post (add if doesn't exist, remove if exists)
 * Updates the likesCount counter automatically
 */
export async function toggleLike(postId: string, userId: string) {
  if (!userId) throw new Error('User not found');

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId: userId,
        postId
      }
    }
  });

  if (existingLike) {
    // Unlike: eliminar like y decrementar contador
    await prisma.$transaction([
      prisma.like.delete({
        where: { id: existingLike.id }
      }),
      prisma.post.update({
        where: { id: postId },
        data: { likesCount: { decrement: 1 } }
      })
    ]);
    return { liked: false, count: await getPostLikesCount(postId) };
  } else {
    // Like: crear like e incrementar contador
    await prisma.$transaction([
      prisma.like.create({
        data: {
          userId: userId,
          postId
        }
      }),
      prisma.post.update({
        where: { id: postId },
        data: { likesCount: { increment: 1 } }
      })
    ]);
    return { liked: true, count: await getPostLikesCount(postId) };
  }
}

/**
 * Get likes count for a post
 */
export async function getPostLikesCount(postId: string) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { likesCount: true }
  });
  return post?.likesCount || 0;
}

/**
 * Get users who liked a post
 */
export async function getPostLikes(postId: string) {
  return await prisma.like.findMany({
    where: { postId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
}

/**
 * Check if user liked a post
 */
export async function hasUserLikedPost(postId: string, userEmail: string) {
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true }
  });

  if (!user) return false;

  const like = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId: user.id,
        postId
      }
    }
  });

  return !!like;
}

// ============ COMMENTS ============

/**
 * Add a comment to a post
 * Updates the commentsCount counter automatically
 */
export async function addComment(postId: string, userId: string, content: string) {
  if (!content || content.trim().length === 0) {
    throw new Error('Comment content is required');
  }

  if (!userId) throw new Error('User not found');

  const [comment] = await prisma.$transaction([
    prisma.comment.create({
      data: {
        postId,
        userId: userId,
        content: content.trim()
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true
          }
        }
      }
    }),
    prisma.post.update({
      where: { id: postId },
      data: { commentsCount: { increment: 1 } }
    })
  ]);

  return comment;
}

/**
 * Get comments for a post
 */
export async function getPostComments(postId: string) {
  return await prisma.comment.findMany({
    where: { postId },
    include: {
      user: {
        select: {
          username: true,
          image: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
}

/**
 * Delete a comment (only by comment author)
 * Updates the commentsCount counter automatically
 */
export async function deleteComment(commentId: string, userEmail: string) {
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true }
  });

  if (!user) throw new Error('User not found');

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: { userId: true, postId: true }
  });

  if (!comment) throw new Error('Comment not found');
  if (comment.userId !== user.id) throw new Error('Unauthorized');

  await prisma.$transaction([
    prisma.comment.delete({
      where: { id: commentId }
    }),
    prisma.post.update({
      where: { id: comment.postId },
      data: { commentsCount: { decrement: 1 } }
    })
  ]);

  return { success: true };
}

// ============ FOLLOWS ============

/**
 * Toggle follow (follow if not following, unfollow if following)
 */
export async function toggleFollow(userEmail: string, targetUserId: string) {
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true }
  });

  if (!user) throw new Error('User not found');
  if (user.id === targetUserId) throw new Error('Cannot follow yourself');

  const existingFollow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: user.id,
        followingId: targetUserId
      }
    }
  });

  if (existingFollow) {
    // Unfollow
    await prisma.follow.delete({
      where: { id: existingFollow.id }
    });
    return { following: false };
  } else {
    // Follow
    await prisma.follow.create({
      data: {
        followerId: user.id,
        followingId: targetUserId
      }
    });
    return { following: true };
  }
}

/**
 * Check if user is following another user
 */
export async function isFollowing(userEmail: string, targetUserId: string) {
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true }
  });

  if (!user) return false;

  const follow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: user.id,
        followingId: targetUserId
      }
    }
  });

  return !!follow;
}

/**
 * Get user's followers
 */
export async function getUserFollowers(userId: string) {
  return await prisma.follow.findMany({
    where: { followingId: userId },
    include: {
      follower: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
}

/**
 * Get users that a user is following
 */
export async function getUserFollowing(userId: string) {
  return await prisma.follow.findMany({
    where: { followerId: userId },
    include: {
      following: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
}

/**
 * Get followers and following counts
 */
export async function getFollowCounts(userId: string) {
  const [followersCount, followingCount] = await Promise.all([
    prisma.follow.count({ where: { followingId: userId } }),
    prisma.follow.count({ where: { followerId: userId } })
  ]);

  return { followersCount, followingCount };
}