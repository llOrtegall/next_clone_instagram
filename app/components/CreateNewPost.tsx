'use client';

import { UploadIcon, XIcon } from "lucide-react";
import { Button, Separator, Text, TextArea, TextField } from "@radix-ui/themes";
import { newPostCreated } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import Image from "next/image";

interface CreatePostProps {
  name: string | null;
  email: string;
  image: string | null;
  username: string | null;
}

export default function CreatePost({ name, email, image, username }: CreatePostProps) {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setImageUrl(url);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl('');
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const { description, location } = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: file,
        headers: { 'Content-Type': file.type }
      });

      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        alert(`Error uploading image: ${uploadData.error}`);
        return;
      }

      await newPostCreated(email, uploadData.url, description as string, location as string);

    } catch (error) {
      console.error(error);
    }

  };

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <section className="bg-black/10 backdrop-blur-md rounded-lg shadow-lg p-8 w-4/6 h-5/6 max-h-[90vh] overflow-y-auto flex ">

        {/* Image Upload Section */}
        <article className="w-10/12 grid place-content-center">
          {imageUrl ? (
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <Image
                src={imageUrl}
                alt="Preview"
                width={600}
                height={600}
                className="object-contain max-h-[70vh] mx-auto rounded-md"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-6 right-6 bg-black/60 hover:bg-red-600/80 p-2 rounded-full transition-all cursor-pointer"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <figure className="flex flex-col items-center gap-4">
              <div >
                <svg aria-label="Icon to represent media such as images or videos"
                  className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="77" role="img"
                  viewBox="0 0 97.6 77.3" width="96"><title>Icon to represent media such as images or videos</title>
                  <path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path>
                </svg>
              </div>
              <h3 className="text-xl mb-2">
                Select photo to share
              </h3>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={inputRef}
                onChange={handleFileChange}
              />
              <Button
                size="3"
                onClick={() => inputRef.current?.click()}
                className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700  px-8 cursor-pointer"
              >
                <UploadIcon className="w-5 h-5 mr-2" />
                Select from device
              </Button>
            </figure>
          )}
        </article>

        {/* Details Section */}
        <form className="w-6/12 flex flex-col" onSubmit={handleSubmit}>
          <div className="flex-1">
            <h3 className="text-lg font-normal mb-4">Post Details</h3>

            {/* User Profile Section */}
            <div className="mb-6 flex items-center gap-4">
              {image && (
                <Image
                  src={image}
                  width={48}
                  height={48}
                  alt={name ?? username ?? "User profile image"}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-semibold">{name ?? username}</p>
                <p className="text-sm text-gray-500">@{username}</p>
              </div>
            </div>

            {/* Description Input */}
            <div className="mb-6">
              <Text size="2" weight="medium" className="mb-2 block">
                Description
              </Text>
              <TextArea
                placeholder="Write a caption..."
                name="description"
                className="w-full min-h-50 resize-none"
                size="3"
              />
            </div>

            {/* Location (Optional) */}
            <div className="mb-6">
              <Text size="2" weight="medium" className="mb-2 block">
                Location (Optional)
              </Text>
              <TextField.Root
                type="text"
                name="location"
                placeholder="Add location"
                size="3"
                className=""
              />
            </div>

          </div>

          <Separator size="4" className="my-4" />

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6 justify-end-safe">
            <Button
              type="button"
              variant="outline"
              size="3"
              className="flex-1 cursor-pointer"
              onClick={() => {
                handleRemoveImage();
                router.back();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="3"
              className="flex-1 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700  cursor-pointer"
              disabled={!imageUrl}
            >
              Share Post
            </Button>
          </div>
        </form>

      </section>
    </div>
  )
}