import { getAllPostByEmail } from "@/lib/actions";
import { Heart, MessageCircle } from "lucide-react";
import Image from "next/image"
import Link from "next/link";

export default async function PostGrid({ email }: { email: string }) {
  const posts = await getAllPostByEmail(email)

  if (!posts) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-red-600">Post not found</h1>
        <p className="text-gray-600">The post you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <section className="w-full p-4 sm:p-6">
      <div className="grid grid-cols-4 gap-1 sm:gap-2 md:gap-4">
        {
          posts.map((p) => (
            <Link 
              key={p.id} 
              href={`/post/${p.id}`} 
              className="group relative aspect-square bg-gray-900 overflow-hidden cursor-pointer"
            >
              <Image
                src={p.imageUrl}
                alt="Post Image"
                fill
                className="object-cover rounded-sm transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
                priority={false}
                loading="lazy"
              />
              {/* Overlay estilo Instagram en hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white" />
                    <span className="text-white font-bold text-base sm:text-lg">
                      {p.likesCount}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white" />
                    <span className="text-white font-bold text-base sm:text-lg">
                      {p.commentsCount}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </section>
  )
}