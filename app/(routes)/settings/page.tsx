import { Button, TextArea, TextField } from "@radix-ui/themes";
import { UploadIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <section className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center pb-4">Profile Settings</h1>
      <form action={""}>
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
        <TextField.Root placeholder="your_username" />
        <p className="py-1 font-semibold"> name: </p>
        <TextField.Root placeholder="John Doe" />
        <p className="py-1 font-semibold"> subtitle: </p>
        <TextField.Root placeholder="Web developer and designer" />
        <p className="py-1 font-semibold"> bio: </p>
        <TextArea placeholder="This is my bio" />
        <div className="py-2 flex justify-end">
          <Button className="mt-4" variant="solid"> Save changes </Button>
        </div>
      </form>
    </section>
  )
}