'use client';

import { Button, TextArea, TextField } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import { updateProfile } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { UploadIcon } from "lucide-react";
import Image from "next/image";

interface SettingsFormProps {
  username: string | null;
  name: string | null;
  email: string;
  image: string | null;
  subtitle: string | null;
  bio: string | null;
}

export default function SettingsForm({ dataUser }: { dataUser: SettingsFormProps | null }) {
  const router = useRouter();

  const inputRefImg = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(dataUser?.image || null);

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
        data.set('image', avatarUrl);
      }
      await updateProfile(data, dataUser?.email || '')
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
      <TextField.Root name="username" placeholder="your_username" defaultValue={dataUser?.username || ''} />
      <p className="py-1 font-semibold"> name: </p>
      <TextField.Root name="name" placeholder="John Doe" defaultValue={dataUser?.name || ''} />
      <p className="py-1 font-semibold"> subtitle: </p>
      <TextField.Root name="subtitle" placeholder="Web developer and designer" defaultValue={dataUser?.subtitle || ''} />
      <p className="py-1 font-semibold"> bio: </p>
      <TextArea name="bio" placeholder="This is my bio" defaultValue={dataUser?.bio || ''} />
      <div className="py-2 flex justify-end">
        <Button className="mt-4" variant="solid"> Save changes </Button>
      </div>
    </form>
  )
}