import { getAllPostByEmail } from "@/lib/actions";
import { HeartIcon } from "lucide-react";
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
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {
          posts.map((p) => (
            <div key={p.id} className="break-inside-avoid group relative overflow-hidden rounded-lg">
              <Link href={`/post/${p.id}`} className="block relative bg-gray-900 rounded-lg overflow-hidden">
                <Image
                  src={p.imageUrl}
                  alt="Post Image"
                  width={300}
                  height={300}
                  className="w-full h-auto object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                  priority={false}
                  loading="lazy"
                />
                {/* Overlay en hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-lg flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-lg font-semibold">
                      {p.likes}
                      <HeartIcon className="w-6 h-6 inline-block ml-2 text-white" />   
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        }
      </div>
    </section>
  )
}