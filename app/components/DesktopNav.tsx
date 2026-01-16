import { CameraIcon, HomeIcon, LucideProps, SearchIcon, User2Icon } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { Button, Separator } from "@radix-ui/themes";
import { auth, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";

type IconType = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>

interface MenuIconProps {
  path: string,
  IconRender: IconType,
  title: string
}

const MenuArray: MenuIconProps[] = [
  {
    path: "/",
    IconRender: HomeIcon,
    title: "Home"
  },
  {
    path: "/search",
    IconRender: SearchIcon,
    title: "Search"
  },
  {
    path: "/create",
    IconRender: CameraIcon,
    title: "Create"
  },
  {
    path: "/profile",
    IconRender: User2Icon,
    title: "Profile"
  }
]

const MenuIcon = ({ IconRender, path, title }: MenuIconProps) => {
  return (
    <Link
      className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gray-700 transition-all duration-200 group"
      href={path}>
      <IconRender className="w-6 h-6 text-gray-300 group-hover:scale-110 transition-transform" />
      <p className="text-base font-medium text-gray-300 group-hover:text-white">{title}</p>
    </Link>
  )
}

export default async function DesktopNav() {
  const session = await auth();

  return (
    <aside className="hidden lg:flex lg:flex-col p-6 w-72 border-r border-gray-800 h-screen sticky top-0">

      <figure className="relative flex items-center justify-start mb-10 mt-4">
        <Image src={"/iconig.png"} alt="Logo" width={240} height={60} className="object-contain invert" />
        <p className="absolute top-6 ml-2 text-2xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Clone
        </p>
      </figure>

      <nav className="flex flex-col gap-2 flex-1">
        {MenuArray.map((menu) => (
          <MenuIcon
            key={menu.path}
            IconRender={menu.IconRender}
            path={menu.path}
            title={menu.title} />
        ))}
      </nav>

      <Separator size="4" className="my-4" />

      <div className="flex flex-col gap-4 items-center">
        {session && (
          <form action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
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