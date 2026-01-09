'use client';

import { newPostCreated } from "@/lib/actions";
import { Button, TextArea } from "@radix-ui/themes";
import { ImageIcon, UploadIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";

export default function CreatePage() {
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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



  return (
    <div className="max-w-5xl mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Post</h1>
        <p className="text-gray-600">Share a photo with your followers</p>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-0">
          
          {/* Image Upload Section */}
          <div className="relative bg-gray-50 flex items-center justify-center min-h-125 border-r border-gray-200">
            {imageUrl ? (
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <Image 
                  src={imageUrl} 
                  alt="Preview" 
                  width={600}
                  height={600}
                  className="max-w-full max-h-150 object-contain rounded-lg shadow-md" 
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-6 right-6 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-24 h-24 bg-linear-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-6">
                  <ImageIcon className="w-12 h-12 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Select photo to share
                </h3>
                <p className="text-gray-500 mb-6 max-w-xs">
                  Choose a photo from your device to create a new post
                </p>
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
                  className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 cursor-pointer"
                >
                  <UploadIcon className="w-5 h-5 mr-2" />
                  Select from device
                </Button>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col p-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Post Details</h3>
              
              {/* Description Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <TextArea
                  placeholder="Write a caption..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full min-h-50 resize-none"
                  size="3"
                />
                <p className="text-xs text-gray-500 mt-2">
                  {description.length} / 2,200 characters
                </p>
              </div>

              {/* Location (Optional) */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Add location"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                />
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                size="3"
                className="flex-1 cursor-pointer"
                onClick={() => {
                  handleRemoveImage();
                  setDescription('');
                }}
              >
                Cancel
              </Button>
              <Button
                size="3"
                className="flex-1 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white cursor-pointer"
                disabled={!imageUrl}
              >
                Share Post
              </Button>
            </div>
          </div>

        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="font-semibold text-blue-900 mb-2">📸 Tips for great posts</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use high-quality images (max 5MB)</li>
          <li>• Add descriptive captions to engage your audience</li>
          <li>• Include alt text to make your content accessible</li>
          <li>• You can upload up to 3 photos per day</li>
        </ul>
      </div>
    </div>
  )
}