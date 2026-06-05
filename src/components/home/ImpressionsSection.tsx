'use client'
 
import { CldImage } from "next-cloudinary"
import { featuredPhotos } from "@/config/featured-photos"
 
export default function ImpressionsSection() {
  if (!featuredPhotos.length) return null
 
  return (
    <section className="impressions-section">
      <div className="impressions-container">
        <h2 className="impressions-title">Impressions from our events</h2>
        <div className="impressions-grid">
          {featuredPhotos.map((publicId, i) => (
            <div key={publicId} className="impressions-item">
              <CldImage
  src={publicId}
  alt={`GTM India event photo ${i + 1}`}
  fill
  crop={{ type: "fill", gravity: "center" }}
  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
  className="impressions-img"
  format="auto"
  quality="auto"
  priority={i === 0}
/>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}