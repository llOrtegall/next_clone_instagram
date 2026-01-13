import SettingsForm from "@/app/components/SettingsForm";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user?.email) {
    return <p className="text-center p-4">You must be logged in to access settings.</p>
  }

  const profile = await prisma.profile.findFirstOrThrow({
    where: { email: session.user.email }
  });

  return (
    <section className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center pb-4">Profile Settings</h1>
      <SettingsForm userEmail={session?.user?.email || ''} profile={profile} />
    </section>
  )
}