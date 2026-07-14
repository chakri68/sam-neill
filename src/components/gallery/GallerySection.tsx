import { Reveal } from "@/src/components/shared/Reveal";
import { GalleryGrid } from "./GalleryGrid";
import type { ImageAsset } from "@/src/content/schemas/image";

export interface GallerySectionProps {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  images: ImageAsset[];
}

/**
 * The photo archive: a masonry of every still, arranged by CSS columns so
 * each image keeps its natural shape. Every frame opens the shared lightbox.
 */
export function GallerySection({ id, eyebrow, title, description, images }: GallerySectionProps) {
  if (!images.length) return null;
  return (
    <section
      id={id}
      className="mx-auto w-full max-w-[1440px] px-[var(--space-page-mobile)] py-24 sm:px-[var(--space-page-tablet)] md:py-32 lg:px-[var(--space-page-desktop)]"
    >
      <Reveal variant="rise" className="relative mb-14 text-center">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="font-display mt-3 text-bone text-4xl md:text-6xl">{title}</h2>
        {description ? (
          <p className="mx-auto mt-4 max-w-xl text-xl italic text-muted">{description}</p>
        ) : null}
      </Reveal>
      <GalleryGrid images={images} />
    </section>
  );
}

export default GallerySection;
