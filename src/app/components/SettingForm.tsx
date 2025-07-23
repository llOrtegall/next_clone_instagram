'use client';

import { Button, TextArea, TextField, } from "@radix-ui/themes";
import { updateProfile } from "@/services/actions";
import { UploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsForms({ userEmail }: { userEmail: string }) {
  const router = useRouter();
  return (
    <form action={async (data: FormData) => {
      await updateProfile(data, userEmail);
      router.push('/profile');
      router.refresh();
    }}>

      <figure className="flex gap-2 items-center">
        <div>
          <div className="bg-gray-200 size-24 rounded-full"></div>
        </div>
        <div>
          <Button variant="surface">
            <UploadIcon />
            Change avatar
          </Button>
        </div>
      </figure>

      <p className="mt-2 font-bold">username:</p>
      <TextField.Root
        name="username"
        placeholder="your_username"
      />

      <p className="mt-2 font-bold">name:</p>
      <TextField.Root
        name="names"
        placeholder="John Dow"
      />

      <p className="mt-2 font-bold">subtitle:</p>
      <TextField.Root
        name="subtitle"
        placeholder="Full Stack Developer"
      />

      <p className="mt-2 font-bold">bio:</p>
      <TextArea
        name="bio"
        placeholder="I'm a ..."
      />

      <div className="mt-4 flex justify-center">
        <Button variant="solid">Save settings</Button>
      </div>
    </form>
  )
}