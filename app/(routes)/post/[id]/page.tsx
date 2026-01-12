import { getPostById } from "@/lib/actions";
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

  return (
    <div className="py-4 px-4 sm:py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          
          <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-0">
            
            <div className="relative w-full aspect-square lg:aspect-auto lg:min-h-150 bg-black">
              <Image
                src={post.imageUrl || ''}
                alt={post.description || 'Post image'}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="flex flex-col p-4 sm:p-6 lg:p-8">
              <div className="mb-6 pb-4 border-b border-gray-200">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 wrap-break-word">
                  {post.description}
                </h1>
                
                {post.location && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-lg">📍</span>
                    <p className="text-sm sm:text-base">{post.location}</p>
                  </div>
                )}
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">Post ID: {post.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}