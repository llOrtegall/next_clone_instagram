'use client';

import { Button, TextArea, TextField } from "@radix-ui/themes";
import { updateProfileOrCreate } from "@/lib/actions";
import { UploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Profile } from "@/generated/prisma/client";

export default function SettingsForm(
  { userEmail, profile }: 
  { userEmail: string, profile: Profile }
) {
  const router = useRouter();

  return (
    <form action={async (data: FormData) => {
      await updateProfileOrCreate(data, userEmail)
      router.push('/profile');
    }}>
      <figure className="flex gap-4 items-center">

        <div className="size-24 bg-gray-300 rounded-full">
        </div>

        <div>
          <Button variant="surface">
            <UploadIcon className="size-4 mr-2" />
            Change Avatar
          </Button>
        </div>

      </figure>
      <p className="py-1 font-semibold"> username: </p>
      <TextField.Root name="username" placeholder="your_username" defaultValue={profile.username || ''} />
      <p className="py-1 font-semibold"> name: </p>
      <TextField.Root name="name" placeholder="John Doe" defaultValue={profile.name || ''} />
      <p className="py-1 font-semibold"> subtitle: </p>
      <TextField.Root name="subtitle" placeholder="Web developer and designer" defaultValue={profile.subtitle || ''} />
      <p className="py-1 font-semibold"> bio: </p>
      <TextArea name="bio" placeholder="This is my bio" defaultValue={profile.bio || ''} />
      <div className="py-2 flex justify-end">
        <Button className="mt-4" variant="solid"> Save changes </Button>
      </div>
    </form>
  )
}