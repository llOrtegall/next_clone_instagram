import { CheckIcon, ChevronLeft, CogIcon } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  return (
    <>
      <section className="flex justify-between items-center">
        <button>
          <ChevronLeft />
        </button>
        <article className="font-bold flex items-center gap-2">
          my_name_is_jony
          <div className="size-5 rounded-full bg-red inline-flex justify-center items-center">
            <CheckIcon size={16} />
          </div>
        </article>
        <button>
          <CogIcon />
        </button>
      </section>

      <section className="mt-8 flex justify-center">
        <div className="size-48 p-2 rounded-full bg-linear-to-tr from-orange to-red">
        <div className="size-44 p-2 bg-slate-950 rounded-full">
          <div className="size-40 aspect-square overflow-hidden rounded-full">
            <Image src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Profile Picture"
              className="w-full h-full object-cover"
              width={160}
              height={160}
            />
          </div>
        </div>
      </div>
    </section >

    </>
  )
}