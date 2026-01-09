import PostGrid from "@/app/components/PostGrid";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CheckIcon, ChevronLeft, CogIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default async function ProfilePage() {
  const session = await auth();

  if(!session?.user?.email) {
    // redirect to login page or show an error
    return <p className="text-center p-4">You must be logged in to view this page. <Link href="/">Login</Link></p>
  }

  const user = await prisma.profile.findFirstOrThrow({
    where: {
      email: session?.user?.email || ''
    }
  })

  return (
    <>
      <section className="flex justify-between items-center">
        <button>
          <ChevronLeft />
        </button>
        <article className="font-bold flex items-center gap-2">
          {user.username || session?.user?.name}
          <div className="size-4 rounded-full bg-red-800 text-white inline-flex justify-center items-center">
            <CheckIcon size={16} />
          </div>
        </article>
        <Link href="/settings">
          <CogIcon />
        </Link>
      </section>

      <section className="mt-8 flex justify-center">
        <div className="size-48 p-2 rounded-full bg-linear-to-tr from-orange to-red">
          <div className="size-44 p-2 bg-white rounded-full">
            <figure className="size-40 aspect-square overflow-hidden rounded-full">
              <Image src={user.avatarUrl || session?.user?.image || '/default-avatar.png'}
                alt="Profile Picture"
                className="w-full h-full object-cover"
                width={160}
                height={160}
              />
            </figure>
          </div>
        </div>
      </section >

      <section className="text-center mt-4">
        <h1 className="text-xl font-bold">
          {user.name || session?.user?.name}
        </h1>
        <p className="text-gray-600 mt-1">
          {user.subtitle}
        </p>
        <p>
          {user.bio}
          <br />
          contact: {user.email || session?.user?.email}
        </p>
      </section>

      <section className="mt-4 ">
        <nav className="flex justify-center gap-4 font-semibold">
          <Link href="#" className="text-orange">Posts</Link>
          <Link href="/highlight" className="text-gray-400">Highlight</Link>
        </nav>
      </section>

      <PostGrid />

    </>
  )
}