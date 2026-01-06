import Image from "next/image"

const images = [
  'https://picsum.photos/id/30/1024/768',
  'https://picsum.photos/id/31/768/1024',
  'https://picsum.photos/id/32/1024/768',
  'https://picsum.photos/id/33/768/1024',
  'https://picsum.photos/id/34/1024/768',
  'https://picsum.photos/id/35/768/1024',
  'https://picsum.photos/id/36/1024/768',
  'https://picsum.photos/id/37/768/1024',
  'https://picsum.photos/id/38/1024/768',
  'https://picsum.photos/id/39/768/1024',
  'https://picsum.photos/id/20/1024/768',
  'https://picsum.photos/id/21/768/1024',
  'https://picsum.photos/id/22/1024/768',
  'https://picsum.photos/id/23/768/1024',
  'https://picsum.photos/id/24/1024/768',
  'https://picsum.photos/id/25/768/1024',
  'https://picsum.photos/id/26/1024/768',
  'https://picsum.photos/id/27/768/1024',
  'https://picsum.photos/id/28/1024/768',
  'https://picsum.photos/id/29/768/1024',
]

export default function PostGrid() {
  return (
    <section className="overflow-y-auto columns-1 sm:columns-2 md:columns-3 2xl:columns-4 gap-4 space-y-4">
      {
        images.map((src, index) => (
          <div key={index} className="break-inside-avoid mb-4">
            <Image 
              src={src} 
              alt="Post Image" 
              width={300} 
              height={300}
              className="w-full h-auto rounded-lg"
            />
          </div>
        ))
      }
    </section>
  )
}