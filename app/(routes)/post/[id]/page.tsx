import PostActions from "@/app/components/post/PostActions";
import { Separator, } from "@radix-ui/themes";
import { VerifiedIcon } from "lucide-react";
import { getPostById } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { auth } from "@/auth";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const session = await auth();

  const post = await getPostById(id);

  if (!post) {
    return <p className="text-center p-4">Post not found.</p>
  }

  const actualUserId = session?.user?.email || null;

  const currentUserId = await prisma.user.findFirstOrThrow({
    where: {
      email: actualUserId!
    },
    select: {
      id: true
    }
  })

  return (
    <section className="flex h-full max-w-6xl mx-auto border border-gray-800 rounded-lg shadow-md gap-4 md:gap-0">
      <Image
        src={post?.imageUrl || '/default-post.png'}
        alt={post?.description || 'Post Image'}
        width={800}
        height={600}
        className="rounded-md"
      />

      <article className="flex-1 p-4 flex flex-col">
        <figure className="flex gap-4 items-center">
          <Image
            src={post?.author.image || '/default-profile.png'}
            alt={post?.author.name || post?.author.username || 'User Profile Image'}
            width={48}
            height={48}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm sm:text-base truncate">{post?.author.name || post?.author.username}</p>
            <p className="text-xs sm:text-sm text-gray-500 truncate">@{post?.author.username}</p>
          </div>
          <VerifiedIcon className="w-5 h-5 text-blue-500 shrink-0" />
        </figure>

        <article className="mt-4">
          <p className="text-sm sm:text-base text-gray-400">{post?.description}</p>
          {post?.location && (
            <figure className="mt-2">
              <p className="text-xs sm:text-sm text-gray-500">Location: {post.location}</p>
            </figure>
          )}
          <p className="text-xs text-gray-500">
            {post.createdAt.toDateString()} - Posted
          </p>
        </article>

        <Separator size="4" className="my-4" />

        {/* Section interaction */}

        <PostActions post={post!} currentUserId={currentUserId.id} />

      </article>
    </section>
  );
}