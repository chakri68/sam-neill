"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  resolveObjectPosition,
  type ImageAsset,
} from "@/src/content/schemas/image";

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
  /** Text shown inside the neutral placeholder when the image is missing. */
  fallbackLabel?: string;
  className?: string;
  imgClassName?: string;
}

/**
 * The one image component for the whole site. Components pass an ImageAsset
 * (data), never an imported file. It degrades cleanly: a missing `src` or a
 * load error shows a neutral textured placeholder — the layout never breaks
 * and no broken-image icon appears.
 */
export function TributeImage({
  asset,
  sizes = "100vw",
  priority = false,
  aspectRatio,
  bare = false,
  reveal = true,
  showCaption = true,
  fallbackLabel,
  className,
  imgClassName,
}: TributeImageProps) {
  const [errored, setErrored] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    // Reduced-data mode: lower image quality, skip the reveal blur cost.
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) setSaveData(true);
  }, []);

  const hasImage = asset.src.trim().length > 0 && !errored;
  const label = fallbackLabel ?? asset.caption ?? asset.alt;
  const objectPosition = resolveObjectPosition(asset);

  const frameStyle = aspectRatio ? { aspectRatio } : undefined;

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

  const caption = showCaption && (asset.caption || asset.credit);
  return (
    <figure className="ti-figure">
      {frame}
      {caption ? (
        <figcaption className="ti-caption">
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
      ) : null}
    </figure>
  );
}

export default TributeImage;
