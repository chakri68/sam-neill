"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TributeImage } from "@/src/components/shared/TributeImage";
import { Reveal } from "@/src/components/shared/Reveal";
import { aspectRatioValue, type ImageAsset } from "@/src/content/schemas/image";

/** Must match the exit animation duration in globals.css (.ti-lightbox.is-closing). */
const EXIT_MS = 260;

/**
 * The masonry plus one shared lightbox for the whole gallery, so the viewer
 * can walk the archive with ‹ › buttons or arrow keys without closing.
 * Thumbnails delegate their expand clicks here via TributeImage's onExpand.
 */
export function GalleryGrid({ images }: { images: ImageAsset[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<0 | 1 | -1>(0);
  const [closing, setClosing] = useState(false);
  // Real image shapes measured on load, keyed by src — the fallback for
  // assets that don't declare an aspectRatio, so the stage can hug them too.
  const [measured, setMeasured] = useState<Record<string, number>>({});
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const open = index !== null;

  useEffect(() => {
    if (open) dialogRef.current?.showModal();
  }, [open]);

  const close = () => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(() => {
      dialogRef.current?.close();
      setIndex(null);
      setClosing(false);
    }, EXIT_MS);
  };

  const step = (dir: 1 | -1) => {
    setDirection(dir);
    setIndex((current) =>
      current === null ? current : (current + dir + images.length) % images.length,
    );
  };

  const current = index !== null ? images[index] : null;
  const stageRatio = current
    ? (measured[current.src] ?? aspectRatioValue(current))
    : null;

  return (
    <>
      <div className="gallery-grid treat-warm-archive">
        {images.map((image, i) => (
          <Reveal key={image.src} variant="scale">
            <TributeImage
              asset={image}
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
              showCaption={false}
              fallbackLabel={image.alt}
              onExpand={() => setIndex(i)}
            />
          </Reveal>
        ))}
      </div>

      {current ? (
        <dialog
          ref={dialogRef}
          className={`ti-lightbox ${closing ? "is-closing" : ""}`}
          aria-label={current.alt || "Gallery image"}
          onCancel={(event) => {
            event.preventDefault();
            close();
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") step(1);
            if (event.key === "ArrowLeft") step(-1);
          }}
        >
          <figure className="ti-lightbox__figure">
            <div
              className="ti-lightbox__stage"
              style={
                stageRatio
                  ? ({ "--lightbox-ar": stageRatio } as React.CSSProperties)
                  : undefined
              }
            >
              {/* keyed remount replays the direction-aware slide per image */}
              <div
                key={current.src}
                className={`ti-lightbox__mover ${
                  direction === 1 ? "is-next" : direction === -1 ? "is-prev" : ""
                }`}
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="92vw"
                  quality={78}
                  className="ti-lightbox__img"
                  onLoad={(event) => {
                    const img = event.currentTarget;
                    if (img.naturalWidth && img.naturalHeight) {
                      setMeasured((m) => ({
                        ...m,
                        [current.src]: img.naturalWidth / img.naturalHeight,
                      }));
                    }
                  }}
                />
              </div>
            </div>
            {current.caption || current.credit ? (
              <figcaption className="ti-caption ti-lightbox__caption">
                {current.caption ? <span className="ti-caption__text">{current.caption}</span> : null}
                {current.credit ? <span className="ti-caption__credit">{current.credit}</span> : null}
              </figcaption>
            ) : null}
            <p className="ti-lightbox__count">
              {(index ?? 0) + 1} / {images.length}
            </p>
          </figure>

          <button
            type="button"
            className="ti-lightbox__nav ti-lightbox__nav--prev"
            onClick={() => step(-1)}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            className="ti-lightbox__nav ti-lightbox__nav--next"
            onClick={() => step(1)}
            aria-label="Next image"
          >
            ›
          </button>

          <button
            type="button"
            className="ti-lightbox__close"
            onClick={close}
            aria-label="Close gallery viewer"
          >
            ✕
          </button>
        </dialog>
      ) : null}
    </>
  );
}

export default GalleryGrid;
