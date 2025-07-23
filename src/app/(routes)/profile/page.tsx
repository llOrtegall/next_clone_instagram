import PostsGrid from "@/app/components/PostsGrid";
import { auth } from "@/auth";
import { prisma } from "@/db";
import { CheckIcon, ChevronLeft, CogIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();
  const profile = await prisma.profile.findFirstOrThrow({ where: { email: session?.user?.email as string } })

  return (
    <main>
      <section className="flex justify-between items-center ">
        <button>
          <ChevronLeft />
        </button>

        <article className="font-bold flex items-center gap-2">
          <span className="flex items-center">{profile.username}</span>
          <div className="size-5 rounded-full bg-ig-red inline-flex justify-center items-center text-white">
            <CheckIcon size={16} />
          </div>
        </article>

        <Link href='/settings'>
          <CogIcon />
        </Link>
      </section>

      <section className="mt-8 flex justify-center">
        <div className="size-48 p-2 rounded-full bg-gradient-to-tr from-ig-orange to-ig-red ">
          <div className="size-44 p-2 bg-white rounded-full">
            <figure className="size-40 aspect-square overflow-hidden rounded-full">
              <Image
                className=""
                width={160} height={160}
                src={profile.avatar || ''}
                alt="photo users"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center text-center mt-2">
        <h1 className="text-xl font-bold">{profile.name}</h1>
        <p className="text-gray-500 mb-1">{profile.subtitle}</p>
        <p className="w-56 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm text-gray-900 bg-ig-orange">{profile.bio}</p>
        <p> contact: {profile.email} </p>
      </section>

      <section className="mt-4">
        <div className="flex justify-center gap-2 font-bold">
          <Link href={'/'}>Posts</Link>
          <Link className="text-gray-400" href={'/highlights'}>Highlights</Link>
        </div>
      </section>

      <section className="mt-2">
        <PostsGrid />
      </section>
    </main >
  )
}