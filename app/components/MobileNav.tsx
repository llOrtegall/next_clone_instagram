import { CameraIcon, HomeIcon, LayoutGridIcon, SearchIcon, User2Icon } from "lucide-react";
import Link from "next/link";

export default function MobileNav() {
  return (
    <div className="block lg:hidden max-w-lg mx-auto fixed bottom-0 bg-white px-8 py-2 border-t border-gray-300 left-0 right-0">
      <nav className="flex justify-between text-gray-600 *:size-12 *:flex *:items-center *:justify-center">
        <Link href={"/"}>
          <HomeIcon />
        </Link>
        <Link href={"/search"}>
          <SearchIcon />
        </Link>
        <Link href={"/create"} className="bg-linear-to-tr from-orange to-red text-white rounded-full p-3 shadow-lg">
          <CameraIcon />
        </Link>
        <Link href={"/browse"}>
          <LayoutGridIcon />
        </Link>
        <Link href={"/profile"} className="text-red">
          <User2Icon />
        </Link>
      </nav>
    </div>
  )
}