import DesktopNav from "@/app/components/DesktopNav";
import MobileNav from "@/app/components/MobileNav";

export default function ProtectedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex">
      <DesktopNav />
      <section className="w-full p-4 h-screen overflow-y-auto">
        {children}
      </section>
      <MobileNav />
    </main>
  )
}
