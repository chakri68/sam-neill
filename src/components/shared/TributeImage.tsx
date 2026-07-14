"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  resolveObjectPosition,
  type ImageAsset,
} from "@/src/content/schemas/image";

/** Must match the exit animation duration in globals.css (.ti-lightbox.is-closing). */
const LIGHTBOX_EXIT_MS = 260;

export interface TributeImageProps {
  asset: ImageAsset;
  /** Responsive `sizes` hint passed to next/image. */
  sizes?: string;
  /** Eager-load above-the-fold images (e.g. the hero). */
  priority?: boolean;
  /** CSS aspect-ratio for the frame, e.g. "3 / 2". Ignored when `bare`. */
  aspectRatio?: string;
  /** Render the image edge-to-edge with no frame/caption chrome. */
  bare?: boolean;
  /** Fade + settle the image in once it decodes. Default true. */
  reveal?: boolean;
  /** Show caption/credit beneath the image when present. Default true. */
  showCaption?: boolean;
  /** Click-to-enlarge lightbox. Default true; never applies to `bare` images. */
  expandable?: boolean;
  /** Text shown inside the neutral placeholder when the image is missing. */
  fallbackLabel?: string;
  className?: string;
  imgClassName?: string;
}

function Caption({ asset, className }: { asset: ImageAsset; className?: string }) {
  if (!asset.caption && !asset.credit) return null;
  return (
    <figcaption className={["ti-caption", className ?? ""].filter(Boolean).join(" ")}>
      {asset.caption ? <span className="ti-caption__text">{asset.caption}</span> : null}
      {asset.credit ? (
        <span className="ti-caption__credit">
          {asset.creditUrl ? (
            <a href={asset.creditUrl} target="_blank" rel="noopener noreferrer">
              {asset.credit}
            </a>
          ) : (
            asset.credit
          )}
        </span>
      ) : null}
    </figcaption>
  );
}

/**
 * The one image component for the whole site. Components pass an ImageAsset
 * (data), never an imported file. It degrades cleanly: a missing `src` or a
 * load error shows a neutral textured placeholder — the layout never breaks
 * and no broken-image icon appears.
 *
 * Framed (non-bare) images open a lightbox on click: a native <dialog> with
 * a blurred backdrop and a cinematic scale/fade in-out (globals.css
 * `.ti-lightbox`). Esc, the close button, and backdrop clicks dismiss it.
 */
export function TributeImage({
  asset,
  sizes = "100vw",
  priority = false,
  aspectRatio,
  bare = false,
  reveal = true,
  showCaption = true,
  expandable = true,
  fallbackLabel,
  className,
  imgClassName,
}: TributeImageProps) {
  const [errored, setErrored] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    // Reduced-data mode: lower image quality, skip the reveal blur cost.
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) setSaveData(true);
  }, []);

  useEffect(() => {
    if (lightboxOpen) dialogRef.current?.showModal();
  }, [lightboxOpen]);

  const hasImage = asset.src.trim().length > 0 && !errored;
  const label = fallbackLabel ?? asset.caption ?? asset.alt;
  const objectPosition = resolveObjectPosition(asset);
  const canExpand = expandable && !bare && hasImage;

  // An aspect declared on the asset knows the image's real shape — it beats
  // the layout's default frame.
  const frameAspect = asset.aspectRatio ?? aspectRatio;
  const frameStyle = frameAspect ? { aspectRatio: frameAspect } : undefined;

  const closeLightbox = () => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(() => {
      dialogRef.current?.close();
      setLightboxOpen(false);
      setClosing(false);
    }, LIGHTBOX_EXIT_MS);
  };

  const body = hasImage ? (
    <Image
      src={asset.src}
      alt={asset.alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={saveData ? 45 : 78}
      onError={() => setErrored(true)}
      onLoad={() => setLoaded(true)}
      placeholder={asset.blurDataUrl ? "blur" : "empty"}
      blurDataURL={asset.blurDataUrl}
      className={[
        "ti-img",
        reveal ? "ti-img--reveal" : "",
        loaded ? "is-loaded" : "",
        imgClassName ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ objectPosition }}
    />
  ) : (
    <div className="ti-fallback" role="img" aria-label={asset.alt || undefined}>
      {label ? <span className="ti-fallback__label">{label}</span> : null}
    </div>
  );

  const frame = (
    <div
      className={["ti-frame", className ?? ""].filter(Boolean).join(" ")}
      style={frameStyle}
      data-loaded={loaded || undefined}
    >
      {body}
    </div>
  );

  if (bare) return frame;

  const lightbox = lightboxOpen ? (
    <dialog
      ref={dialogRef}
      className={`ti-lightbox ${closing ? "is-closing" : ""}`}
      aria-label={asset.alt || label || "Image"}
      onCancel={(event) => {
        // Esc: swap the instant native close for the animated one.
        event.preventDefault();
        closeLightbox();
      }}
      onClick={(event) => {
        // Clicks on the ::backdrop dispatch to the dialog element itself.
        if (event.target === event.currentTarget) closeLightbox();
      }}
    >
      <figure className="ti-lightbox__figure">
        <div className="ti-lightbox__stage">
          <Image
            src={asset.src}
            alt={asset.alt}
            fill
            sizes="92vw"
            quality={78}
            className="ti-lightbox__img"
          />
        </div>
        <Caption asset={asset} className="ti-lightbox__caption" />
      </figure>
      <button
        type="button"
        className="ti-lightbox__close"
        onClick={closeLightbox}
        aria-label="Close image"
      >
        ✕
      </button>
    </dialog>
  ) : null;

  return (
    <figure className="ti-figure">
      {canExpand ? (
        <button
          type="button"
          className="ti-expand"
          onClick={() => setLightboxOpen(true)}
          aria-haspopup="dialog"
          aria-label={`View larger — ${asset.alt || label || "image"}`}
        >
          {frame}
        </button>
      ) : (
        frame
      )}
      {showCaption ? <Caption asset={asset} /> : null}
      {lightbox}
    </figure>
  );
}

export default TributeImage;
