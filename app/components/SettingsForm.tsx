'use client';

import { UploadIcon, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import { updateProfile } from "@/lib/actions";
import { useRouter } from "next/navigation";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  }

  useEffect(() => {
    if (file) {
      setUploading(true);
      setError(null);

      fetch('/api/upload', {
        method: 'POST',
        body: file,
        headers: { 'Content-Type': file.type }
      })
        .then(res => res.json())
        .then(data => {
          console.log('Upload response:', data);
          if (data.success) {
            setAvatarUrl(data.url);
          } else {
            console.error('Upload failed:', data.error);
            setError(data.error || 'Error uploading image');
          }
        })
        .catch(err => {
          console.error('Upload error:', err);
          setError('Error uploading file. Please try again.');
        })
        .finally(() => {
          setUploading(false);
        });
    }
  }, [file])

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      if (avatarUrl) {
        formData.set('image', avatarUrl);
      }

      const result = await updateProfile(formData, dataUser?.email || '');

      if (result.success) {
        setSuccess(result.message || 'Profile updated successfully');
        // Redirigir después de 1 segundo para que el usuario vea el mensaje
        setTimeout(() => {
          router.push('/profile');
          router.refresh();
        }, 1000);
      } else {
        setError(result.error || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      {/* Mensajes de error y éxito */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-500">
          <AlertCircle className="size-5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-md text-green-500">
          <CheckCircle2 className="size-5 shrink-0" />
          <p className="text-sm">{success}</p>
        </div>
      )}

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
            disabled={uploading || isSubmitting}
          >
            <UploadIcon className="size-4 mr-2" />
            {uploading ? 'Uploading...' : 'Change Avatar'}
          </Button>
        </div>

      </figure>
      <p className="py-1 font-semibold"> username: </p>
      <TextField.Root
        name="username"
        placeholder="your_username"
        defaultValue={dataUser?.username || ''}
        required
        minLength={3}
        maxLength={30}
        disabled={isSubmitting}
      />
      <p className="py-1 font-semibold"> name: </p>
      <TextField.Root
        name="name"
        placeholder="John Doe"
        defaultValue={dataUser?.name || ''}
        required
        maxLength={50}
        disabled={isSubmitting}
      />
      <p className="py-1 font-semibold"> subtitle: </p>
      <TextField.Root
        name="subtitle"
        placeholder="Web developer and designer"
        defaultValue={dataUser?.subtitle || ''}
        disabled={isSubmitting}
      />
      <p className="py-1 font-semibold"> bio: </p>
      <TextArea
        name="bio"
        placeholder="This is my bio"
        defaultValue={dataUser?.bio || ''}
        disabled={isSubmitting}
      />
      <div className="py-2 flex justify-end">
        <Button
          className="mt-4"
          variant="solid"
          disabled={isSubmitting || uploading}
        >
          {isSubmitting ? 'Saving...' : 'Save changes'}
        </Button>
      </div>
    </form>
  )
}