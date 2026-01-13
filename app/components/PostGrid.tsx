import { getAllPostByEmail } from "@/lib/actions";
import Image from "next/image"

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
    <section className="overflow-y-auto columns-1 sm:columns-2 md:columns-3 2xl:columns-4 gap-4 space-y-4">
      {
        posts.map((p) => (
          <div key={p.id} className="break-inside-avoid mb-4">
            <Image 
              src={p.imageUrl} 
              alt="Post Image" 
              width={300} 
              height={300}
              className="w-full h-auto rounded-lg"
            />
          </div>
        ))
      }
    </section>
  )
}