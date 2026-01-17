import { CogIcon, VerifiedIcon } from "lucide-react";
import PostGrid from "@/app/components/PostGrid";
import { Button, Separator } from "@radix-ui/themes";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { auth } from "@/auth";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.email) {
    // redirect to login page or show an error
    return <p className="text-center p-4">You must be logged in to view this page. <Link href="/">Login</Link></p>
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      username: true,
      name: true,
      subtitle: true,
      bio: true,
      email: true,
      image: true,
    }
  })
  
  return (
    <div className="relative">

      <header className="flex w-full items-center justify-center gap-2 text-2xl font-bold mb-4 ">
        {user?.username || session?.user?.name}
        <div className="">
          <VerifiedIcon className="w-5 h-5 text-blue-500 shrink-0" />
        </div>
      </header>

      <Link href="/settings" className="absolute top-1 right-1">
        <Button variant="soft" size="3">
          <CogIcon />
          Config Profile
        </Button>
      </Link>

      <section className="flex justify-center items-center gap-4">
        <section className="mt-8 flex justify-center">
          <div className="size-36 p-2 rounded-full bg-linear-to-tr from-orange to-red">
            <div className="size-32 rounded-full">
              <figure className="size-32 aspect-square overflow-hidden rounded-full">
                {
                  user?.image ? (
                    <Image src={user.image}
                      alt="Profile Picture"
                      className="w-full h-full object-cover"
                      width={128}
                      height={128}
                    />) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )
                }
              </figure>
            </div>
          </div>
        </section >

        <section className="">
          <h1 className="text-xl font-bold">
            {user?.name || 'Unnamed User'}
          </h1>
          <p className="text-gray-600 mt-1">
            {user?.subtitle || 'No subtitle provided'}
          </p>
          <p>
            {user?.bio || 'This user has not added a bio yet.'}
          </p>
          <Separator className="my-4" size="4" />
          <p>
            Posts: 10 &nbsp; Followers: 200 &nbsp; Following: 180
          </p>
        </section>

      </section>

      <PostGrid email={session.user.email} />

    </div>
  )
}