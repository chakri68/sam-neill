"use client";

import Image from "next/image";
import { useState } from "react";
import type { TributeVideo } from "@/src/content/schemas/videos";

/**
 * Stacked, rounded video cards. Each card is position: sticky with a small
 * cascading top offset, so scrolling piles them into a deck. Embeds are
 * click-to-play: a thumbnail poster until tapped, then the youtube-nocookie
 * iframe with autoplay — one network-heavy player at most, never five.
 */
export function VideoStack({ videos }: { videos: TributeVideo[] }) {
  return (
    <div className="video-stack">
      {videos.map((video, index) => (
        <VideoCard key={video.id} video={video} index={index} />
      ))}
    </div>
  );
}

function VideoCard({ video, index }: { video: TributeVideo; index: number }) {
  const [playing, setPlaying] = useState(false);
  const id = video.youtubeId;

  return (
    <article
      className="video-card"
      style={{ top: `calc(var(--nav-h) + ${16 + index * 26}px)` }}
    >
      <div className="video-card__media">
        {id ? (
          playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className="video-card__poster"
              onClick={() => setPlaying(true)}
              aria-label={`Play — ${video.title}`}
            >
              <Image
                src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                alt=""
                fill
                sizes="(max-width: 960px) 100vw, 880px"
                className="video-card__thumb"
              />
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
