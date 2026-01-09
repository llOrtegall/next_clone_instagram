'use client';

import { Button, TextArea, TextField } from "@radix-ui/themes";
import { updateProfileOrCreate } from "@/lib/actions";
import { UploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Profile } from "@/generated/prisma/client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function SettingsForm(
  { userEmail, profile }:
    { userEmail: string, profile: Profile }
) {
  const router = useRouter();

  const inputRefImg = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(profile.avatarUrl || null);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  }

  useEffect(() => {
    if (file) {
      console.log('Selected file:', file);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUploading(true);
      const data = new FormData();
      data.set('file', file);

      fetch('/api/upload', {
        method: 'POST',
        body: data,
      })
        .then(res => res.json())
        .then(data => {
          console.log('Upload response:', data);
          if (data.success) {
            setAvatarUrl(data.url);
          } else {
            console.error('Upload failed:', data.error);
            alert(`Error: ${data.error}`);
          }
        })
        .catch(err => {
          console.error('Upload error:', err);
          alert('Error uploading file');
        })
        .finally(() => {
          setUploading(false);
        });
    }
  }, [file])

  return (
    <form action={async (data: FormData) => {
      if (avatarUrl) {
        data.set('avatarUrl', avatarUrl);
      }
      await updateProfileOrCreate(data, userEmail)
      router.push('/profile');
    }}>
      <figure className="flex gap-4 items-center">

        <div className="size-24 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
          {avatarUrl ? (
            <Image src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" width={96} height={96} loading="eager" />
          ) : (
            <span className="text-gray-500 text-sm">No avatar</span>
          )}
        </div>

        <div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="avatar-upload"
            ref={inputRefImg}
            onChange={handleChangeFile}
          />

          <Button
            variant="surface"
            type="button"
            onClick={() => {
              inputRefImg.current?.click();
            }}
            disabled={uploading}
          >
            <UploadIcon className="size-4 mr-2" />
            {uploading ? 'Uploading...' : 'Change Avatar'}
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