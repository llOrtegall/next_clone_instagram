import { CameraIcon, HomeIcon, LayoutGridIcon, SearchIcon, User2Icon } from "lucide-react";
import { auth, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@radix-ui/themes";

export default async function DesktopNav() {
  const session = await auth();

  return (
    <aside className="hidden lg:flex lg:flex-col p-6 w-72 border-r border-gray-200 bg-white h-screen sticky top-0">

      <figure className="relative flex items-center justify-start mb-10 mt-4">
        <Image src={"/iconig.png"} alt="Logo" width={240} height={60} className="object-contain" />
        <p className="absolute top-6 ml-2 text-2xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Clone
        </p>
      </figure>

      <nav className="flex flex-col gap-2 flex-1">
        <Link
          className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
          href={"/"}>
          <HomeIcon className="w-6 h-6 text-gray-700 group-hover:scale-110 transition-transform" />
          <p className="text-base font-medium text-gray-700 group-hover:text-black">Home</p>
        </Link>

        <Link
          className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
          href={"/search"}>
          <SearchIcon className="w-6 h-6 text-gray-700 group-hover:scale-110 transition-transform" />
          <p className="text-base font-medium text-gray-700 group-hover:text-black">Search</p>
        </Link>

        <Link
          className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
          href={"/create"}>
          <CameraIcon className="w-6 h-6 text-gray-700 group-hover:scale-110 transition-transform" />
          <p className="text-base font-medium text-gray-700 group-hover:text-black">Create</p>
        </Link>

        <Link
          className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
          href={"/browse"}>
          <LayoutGridIcon className="w-6 h-6 text-gray-700 group-hover:scale-110 transition-transform" />
          <p className="text-base font-medium text-gray-700 group-hover:text-black">Browse</p>
        </Link>

        <Link
          className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
          href={"/profile"}>
          <User2Icon className="w-6 h-6 text-gray-700 group-hover:scale-110 transition-transform" />
          <p className="text-base font-medium text-gray-700 group-hover:text-black">Profile</p>
        </Link>
      </nav>

      <div className="pt-4 border-t border-gray-200 flex flex-col gap-2 items-center">
        {session && (
          <form action={async () => {
            'use server';
            await signOut({ redirectTo: '/'});
          }}>

            <Button
              variant="outline"
              type="submit">
              Logout
            </Button>
          </form>
        )}
        <p className="text-xs text-gray-500 text-center">Instagram Clone lOrTeGal - Ningun derecho reservado </p>
      </div>
    </aside>
  )
}