import { prisma } from "@/lib/prisma"

export default async function Home() {
  const recentPosts = await prisma.post.findMany({
    take: 4,
    orderBy: {
      createdAt: "desc"
    }
  })

  return (
    <section className="">
      <header className="flex flex-wrap gap-4">
        <figure className="w-20 h-20 mb-6 bg-gray-600 rounded-full">
        </figure>
        <figure className="w-20 h-20 mb-6 bg-gray-600 rounded-full">
        </figure>
        <figure className="w-20 h-20 mb-6 bg-gray-600 rounded-full">
        </figure>
        <figure className="w-20 h-20 mb-6 bg-gray-600 rounded-full">
        </figure>
      </header>

      <section>
        <div className="w-full h-64 bg-gray-700 rounded-md"></div>
      </section>
    </section>
  )
}