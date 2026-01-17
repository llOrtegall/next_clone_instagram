import DesktopNav from "@/app/components/DesktopNav";

export default function ProtectedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex">
      <DesktopNav />
      <section className="w-full p-4 h-screen overflow-y-auto">
        {children}
      </section>
    </main>
  )
}
