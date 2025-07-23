'use client';

import { Button, TextArea, TextField, } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import { updateProfile } from "@/services/actions";
import { useRouter } from "next/navigation";
import { UploadIcon } from "lucide-react";
import { Profile } from "@prisma/client";
import Image from "next/image";

export default function SettingsForms({ userEmail, profile }: { userEmail: string, profile: Profile }) {
  const router = useRouter();
  const fileInpRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (file) {
      const data = new FormData();
      data.set("file", file);
      fetch("/api/files", { method: "POST", body: data, })
        .then(res => res.json().then(url => {
          console.log(url); 
          setAvatarUrl(url as string)
        }))

    }
  }, [file])

  return (
    <form action={async (data: FormData) => {
      await updateProfile(data, userEmail);
      router.push('/profile');
      router.refresh();
    }}>
      <input type="hidden" name="avatar" value={avatarUrl} />
      <figure className="flex gap-2 items-center">
        <div>
          <div className="bg-gray-200 size-24 rounded-full overflow-hidden aspect-square border-2 border-gray-200 shadow-lg">
            {
              profile.avatar === null 
                ? <Image src={avatarUrl || ''} alt="" width={96} height={96} /> 
                : <Image src={profile.avatar || ''} alt="" width={96} height={96} />
            }
          </div>
        </div>
        <div>
          <input
            type="file"
            ref={fileInpRef}
            className="hidden"
            onChange={ev => setFile(ev.target.files?.[0])}
          />
          <Button
            variant="surface"
            onClick={() => {
              if (fileInpRef.current) {
                fileInpRef.current.click();
              }
            }}
            type="button"
          >
            <UploadIcon />
            Change avatar
          </Button>
        </div>
      </figure>

      <p className="mt-2 font-bold">username:</p>
      <TextField.Root
        name="username"
        defaultValue={profile.username}
        placeholder="your_username"
      />

      <p className="mt-2 font-bold">name:</p>
      <TextField.Root
        name="names"
        defaultValue={profile.name || ''}
        placeholder="John Dow"
      />

      <p className="mt-2 font-bold">subtitle:</p>
      <TextField.Root
        name="subtitle"
        defaultValue={profile.subtitle || ''}
        placeholder="Full Stack Developer"
      />

      <p className="mt-2 font-bold">bio:</p>
      <TextArea
        name="bio"
        defaultValue={profile.bio || ''}
        placeholder="I'm a ..."
      />

      <div className="mt-4 flex justify-center">
        <Button variant="solid">Save settings</Button>
      </div>
    </form>
  )
}