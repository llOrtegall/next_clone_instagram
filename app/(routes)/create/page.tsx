import CreatePost from "@/app/components/CreateNewPost";
import { auth } from "@/auth";

export default async function CreatePage() {
  const session = await auth();

  if (!session?.user?.email) {
    return <p className="text-center p-4">You must be logged in to create a post.</p>
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Post</h1>
        <p className="text-gray-600">Share a photo with your followers</p>
      </div>

      <CreatePost userEmail={session.user.email} />

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