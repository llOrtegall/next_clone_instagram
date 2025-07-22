import { CheckIcon, ChevronLeft, CogIcon } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  return (
    <main>
      <section className="flex justify-between items-center ">
        <button>
          <ChevronLeft />
        </button>

        <article className="font-bold flex items-center gap-2">
          <span className="flex items-center">my_name_is_jonhy</span>
          <div className="size-5 rounded-full bg-ig-red inline-flex justify-center items-center text-white">
            <CheckIcon size={16} />
          </div>
        </article>

        <button>
          <CogIcon />
        </button>
      </section>

      <section className="mt-8 flex justify-center">
        <div className="size-48 p-2 rounded-full bg-gradient-to-tr from-ig-orange to-ig-red ">
          <div className="size-44 p-2 bg-white rounded-full">
            <figure className="size-40 aspect-square overflow-hidden rounded-full">
              <Image
                className=""
                width={160} height={160}
                src="https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="photo users"
              />
            </figure>
          </div>
        </div>
      </section>
    </main >
  )
}