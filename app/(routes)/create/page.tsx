import CreatePost from "@/app/components/CreateNewPost";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function CreatePage() {
  const session = await auth();

  if (!session?.user?.email) {
    return <p className="text-center p-4">You must be logged in to create a post.</p>
  }

  const profile = await prisma.user.findFirstOrThrow({
    where: { email: session.user.email },
    select: { 
      image: true,
      username: true,
      name: true,
      email: true
     }
  })

  return <CreatePost email={profile.email} name={profile.name} image={profile.image} username={profile.username} />
}