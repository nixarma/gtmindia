import { getAllEvents } from "@/lib/events";
import MasonryGallery from "@/components/gallery/MasonryGallery";

export default async function PhotosSection() {
  const allEvents = await getAllEvents();
  const now = new Date();

  const eventWithPhotos = allEvents
    .filter((e) => e.date < now && e.photos && e.photos.length > 0)
    .sort((a, b) => b.date.getTime() - a.date.getTime())[0];

  if (!eventWithPhotos) return null;

  return (
    <section className="photos-section">
      <div className="section-container">
        <div className="photos-header">
          <h2 className="photos-title">Impressions from our events</h2>
          {eventWithPhotos.title && (
            <p className="photos-subtitle">{eventWithPhotos.title}</p>
          )}
        </div>
        <MasonryGallery
          photos={eventWithPhotos.photos!}
          alt={eventWithPhotos.title ?? "GTM India event"}
        />
      </div>
    </section>
  );
}