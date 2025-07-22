import { Button, TextArea, TextField, } from "@radix-ui/themes";
import { UploadIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-md mx-auto">

      <h1 className="text-2xl font-bold mb-4 text-center">Profile Settings</h1>

      <form action={async () => {
        'use server';

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
        <TextField.Root placeholder="John Dow" />

        <p className="mt-2 font-bold">subtitle:</p>
        <TextField.Root placeholder="Full Stack Developer" />

        <p className="mt-2 font-bold">bio:</p>
        <TextArea placeholder="I'm a ..." />

        <div className="mt-4 flex justify-center">
          <Button variant="solid">Save settings</Button>
        </div>
      </form>
    </div>
  )
}