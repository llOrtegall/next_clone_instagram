'use client';

import Image from "next/image"
import Masonry from "react-masonry-css"

const images = [
  'https://picsum.photos/id/23/1024/768',
  'https://picsum.photos/id/31/768/1024',
  'https://picsum.photos/id/32/1024/768',
  'https://picsum.photos/id/33/768/1024',
  'https://picsum.photos/id/34/768/1024',
  'https://picsum.photos/id/35/768/1024',
  'https://picsum.photos/id/36/1024/768',
  'https://picsum.photos/id/37/768/1024',
  'https://picsum.photos/id/38/1024/768',
  'https://picsum.photos/id/39/768/1024',
  'https://picsum.photos/id/24/1024/768',
  'https://picsum.photos/id/25/768/1024'
]

export default function PostsGrid() {
  return (
    <section className="max-w-7xl mx-auto">
      <Masonry
        breakpointCols={{
          default: 4,
          1024: 3,
          720: 2,
          500: 1
        }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {
          images.map((f, i) => (
            <div key={i}>
              <Image src={f} alt="photos" width="1024" height="768" />
            </div>)
          )
        }
      </Masonry>
    </section>
  )
}