"use client";

import { CldImage } from "next-cloudinary";

interface MasonryGalleryProps {
  photos: string[]; // Cloudinary public IDs
  alt?: string;
}

export default function MasonryGallery({ photos, alt = "Event photo" }: MasonryGalleryProps) {
  if (!photos.length) return null;

  return (
    <div className="masonry-gallery">
      {photos.map((publicId, i) => (
        <div key={publicId} className="masonry-item">
          <CldImage
            src={publicId}
            alt={`${alt} ${i + 1}`}
            width={800}
            height={800}
            crop={{ type: "auto", source: true }}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="masonry-img"
          />
        </div>
      ))}
    </div>
  );
}