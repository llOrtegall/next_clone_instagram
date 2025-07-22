'use client';

import Image from "next/image"
import Masonry from "react-masonry-css"

const images = [
  'https://picsum.photos/id/30/1024/768',
  'https://picsum.photos/id/31/768/1024',
  'https://picsum.photos/id/32/1024/768',
  'https://picsum.photos/id/33/768/1024',
  'https://picsum.photos/id/34/1024/768',
  'https://picsum.photos/id/35/768/1024'
]

export default function PostsGrid() {
  return (
    <Masonry
      breakpointCols={3}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column">
      {
        images.map((f, i) => (
          <div key={i}>
            <Image src={f} alt="photos" width="1024" height="768"/>
          </div>)
        )
      }
    </Masonry>
  )
}