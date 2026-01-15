import { getPostById } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { Button, Separator, TextField } from "@radix-ui/themes";
import { VerifiedIcon, Heart, MessageCircle, Share2, Send, Bookmark, Smile } from "lucide-react";
import Image from "next/image";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  const post = await getPostById(id);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-red-600">Post not found</h1>
        <p className="text-gray-600">The post you are looking for does not exist.</p>
      </div>
    );
  }

  const test = await prisma.user.findFirstOrThrow({
    where: { email: post.email }
  })

  return (
    <section className="flex h-full max-w-6xl mx-auto py-4 border border-gray-800 rounded-lg shadow-md gap-4 md:gap-0">
      <figure className="w-full md:w-8/12 flex items-center justify-center p-2 sm:p-4">
        <Image
          src={post.imageUrl!}
          alt={post.description || 'Post Image'}
          width={800}
          height={600}
          className="rounded-md object-contain w-full h-auto max-h-96 sm:max-h-full"
        />
      </figure>

      <article className="flex flex-col w-full md:w-4/12 px-4 border-l border-gray-800">
        <figure className="flex gap-4 items-center">
          <Image
            src={test.image || '/default-profile.png'}
            alt={test.name || test.username || 'User Profile Image'}
            width={48}
            height={48}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm sm:text-base truncate">{test.name || test.username}</p>
            <p className="text-xs sm:text-sm text-gray-500 truncate">@{test.username}</p>
          </div>
          <VerifiedIcon className="w-5 h-5 text-blue-500 shrink-0" />
        </figure>

        <article className="mt-4">
          <p className="text-sm sm:text-base text-gray-400">{post.description}</p>
          {post.location && (
            <figure className="mt-2">
              <p className="text-xs sm:text-sm text-gray-500">Location: {post.location}</p>
            </figure>
          )}
        </article>

        <Separator size="4" className="my-4" />

        <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
          {/* Comment 1 */}
          <div className="flex gap-3">
            <Image
              src="https://unavatar.io/llortegall"
              alt="Commenter"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm">
                <span className="font-semibold text-white">Ivan Ortega</span>
                <span className="text-gray-400 ml-2">Great post! 🔥</span>
              </p>
              <p className="text-xs text-gray-600 mt-1">2 days ago</p>
            </div>
            <button className="text-gray-400 hover:text-red-500 transition shrink-0">
              <Heart className="w-4 h-4" />
            </button>
          </div>

          {/* Comment 2 */}
          <div className="flex gap-3">
            <Image
              src="https://unavatar.io/midudev"
              alt="Commenter"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm">
                <span className="font-semibold text-white">midudev</span>
                <span className="text-gray-400 ml-2">Amazing! Love it ✨</span>
              </p>
              <p className="text-xs text-gray-600 mt-1">1 day ago</p>
            </div>
            <button className="text-gray-400 hover:text-red-500 transition shrink-0">
              <Heart className="w-4 h-4" />
            </button>
          </div>

          {/* Comment 3 */}
          <div className="flex gap-3">
            <Image
              src="https://unavatar.io/pheralb"
              alt="Commenter"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm">
                <span className="font-semibold text-white">pheral</span>
                <span className="text-gray-400 ml-2">This is incredible work 👏</span>
              </p>
              <p className="text-xs text-gray-600 mt-1">18 hours ago</p>
            </div>
            <button className="text-gray-400 hover:text-red-500 transition shrink-0">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>

        <form className="flex items-center gap-2">
          <TextField.Root
            type="text"
            size={"3"}
            placeholder="Add a comment..."
            className="flex-1"
          />
          <TextField.Slot>
            <Smile className="w-6 h-6 text-gray-400 hover:text-yellow-500 transition cursor-pointer" />
          </TextField.Slot>
          <Button type="submit" size={"3"}>
            Post
          </Button>
        </form>

        <Separator size="4" className="my-4" />

        <section className="">
          <div className="flex items-center justify-between mb-4">
            <nav className="flex gap-4">
              <button className="cursor-pointer hover:text-red-500 transition text-gray-400">
                <Heart className="w-6 h-6" />
              </button>
              <button className="cursor-pointer hover:text-blue-500 transition text-gray-400">
                <MessageCircle className="w-6 h-6" />
              </button>
              <button className="cursor-pointer hover:text-green-500 transition text-gray-400">
                <Share2 className="w-6 h-6" />
              </button>
              <button className="cursor-pointer hover:text-purple-500 transition text-gray-400">
                <Send className="w-6 h-6" />
              </button>
            </nav>
            <button className="cursor-pointer hover:text-yellow-500 transition text-gray-400">
              <Bookmark className="w-6 h-6" />
            </button>
          </div>

          <article className="flex justify-between items-center">
            <p className="text-xs sm:text-sm font-semibold text-white">2,928 likes</p>
            <p className="text-xs text-gray-500 mt-2">3 days ago</p>
          </article>
        </section>
      </article>
    </section>
  );
}