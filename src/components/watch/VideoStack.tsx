"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { TributeVideo } from "@/src/content/schemas/videos";

/** Hover dwell before a muted preview starts, YouTube-style. */
const PREVIEW_DELAY_MS = 2200;

/**
 * The video archive: rounded click-to-play cards in a responsive grid (the
 * first card is featured full-width). Embeds stay dormant behind a thumbnail
 * poster until tapped, then the youtube-nocookie iframe loads with autoplay —
 * one network-heavy player at most, never fifteen.
 *
 * Links may be single videos, playlists, or a video inside a playlist; the
 * loader resolves ids and the embed URL follows suit.
 */
export function VideoStack({ videos }: { videos: TributeVideo[] }) {
  return (
    <div className="video-stack">
      {videos.map((video, index) => (
        // Composite key: content edits with duplicated ids must not break the grid.
        <VideoCard key={`${video.id}-${index}`} video={video} />
      ))}
    </div>
  );
}

function embedSrc(video: TributeVideo): string | null {
  const base = "https://www.youtube-nocookie.com/embed";
  if (video.youtubeId && video.playlistId) {
    return `${base}/${video.youtubeId}?list=${video.playlistId}&autoplay=1&rel=0`;
  }
  if (video.youtubeId) return `${base}/${video.youtubeId}?autoplay=1&rel=0`;
  if (video.playlistId)
    return `${base}/videoseries?list=${video.playlistId}&autoplay=1`;
  return null;
}

function PlaylistGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M3 6h13v2H3zM3 10h13v2H3zM3 14h8v2H3z" />
      <path d="M14.5 13.2v7l6-3.5z" />
    </svg>
  );
}

/**
 * Playback modes, YouTube-style: hovering ~2s starts a muted preview that
 * stops on mouse-out; clicking plays with sound and keeps playing — but any
 * playing card unmounts its iframe once it scrolls out of view, so nothing
 * keeps talking (or downloading) off-screen.
 */
function VideoCard({ video }: { video: TributeVideo }) {
  const [mode, setMode] = useState<null | "preview" | "full">(null);
  const cardRef = useRef<HTMLElement | null>(null);
  const hoverTimer = useRef<number | null>(null);
  const src = embedSrc(video);
  const playlistOnly = !video.youtubeId && !!video.playlistId;

  const clearHoverTimer = () => {
    if (hoverTimer.current) {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  // Kill the player when the card leaves the viewport.
  useEffect(() => {
    if (!mode) return;
    const node = cardRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setMode(null);
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [mode]);

  useEffect(() => clearHoverTimer, []);

  const onPointerEnter = () => {
    if (mode || !src) return;
    clearHoverTimer();
    hoverTimer.current = window.setTimeout(
      () => setMode("preview"),
      PREVIEW_DELAY_MS,
    );
  };
  const onPointerLeave = () => {
    clearHoverTimer();
    // Previews are ephemeral; a deliberate (clicked) player keeps going.
    setMode((current) => (current === "preview" ? null : current));
  };

  return (
    <article ref={cardRef} className="video-card">
      <div
        className="video-card__media"
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      >
        {video.playlistId ? (
          <span className="video-card__chip" aria-hidden>
            Playlist
          </span>
        ) : null}
        {src ? (
          mode ? (
            <>
              <iframe
                src={mode === "preview" ? `${src}&mute=1` : src}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              {mode === "preview" ? (
                // Silent preview → one click swaps in the sound-on player.
                <button
                  type="button"
                  className="video-card__unmute grid place-items-center"
                  onClick={() => setMode("full")}
                  aria-label={`Play with sound — ${video.title}`}
                >
                  {/* <span>Tap for sound</span> */}
                </button>
              ) : null}
            </>
          ) : (
            <button
              type="button"
              className="video-card__poster"
              onClick={() => {
                clearHoverTimer();
                setMode("full");
              }}
              aria-label={`Play — ${video.title}`}
            >
              {playlistOnly ? (
                // Playlists carry no thumbnail without an API call — a quiet
                // textured poster with the playlist glyph stands in.
                <span className="video-card__playlist-poster">
                  <PlaylistGlyph />
                </span>
              ) : (
                <Image
                  src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 100vw, 640px"
                  className="video-card__thumb"
                />
              )}
              <span className="video-card__play" aria-hidden>
                ▶
              </span>
            </button>
          )
        ) : (
          <div className="ti-fallback">
            <span className="ti-fallback__label">
              Paste a YouTube link for this card in content/videos.json
            </span>
          </div>
        )}
      </div>
      <div className="video-card__meta">
        <h3>{video.title}</h3>
        {video.note ? <p>{video.note}</p> : null}
      </div>
    </article>
  );
}

export default VideoStack;
