"use client";

import { useEffect, useRef, useState } from "react";
import type { AudioAnecdote, AudioTrack } from "@/src/content/schemas/audio";

export interface AudioToggleProps {
  /** Playlist, in priority order. Plays through and loops as a set. */
  tracks: AudioTrack[];
  /** Interview exchange shown in the popover beside the button. */
  anecdote?: AudioAnecdote;
}

/** How long the anecdote card stays up after playback starts. */
const HINT_MS = 7000;

/**
 * Floating background-music control. No autoplay — browsers block unmuted
 * autoplay anyway, and a memorial shouldn't start singing uninvited. One tap
 * starts the playlist at low volume; tracks advance on end and the set loops.
 * The anecdote card (why this song) shows on hover/focus, and for a few
 * seconds whenever playback starts. Equalizer bars animate while playing and
 * hold still under prefers-reduced-motion via the global rules.
 */
export function AudioToggle({ tracks, anecdote }: AudioToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hintTimer = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [hint, setHint] = useState(false);

  const current = tracks[index];

  // A track change while playing (advance-on-end) starts the new source.
  useEffect(() => {
    if (!playing) return;
    audioRef.current?.play().catch(() => setPlaying(false));
  }, [index, playing]);

  useEffect(() => {
    return () => {
      if (hintTimer.current) window.clearTimeout(hintTimer.current);
    };
  }, []);

  if (!current) return null;

  const showHint = () => {
    setHint(true);
    if (hintTimer.current) window.clearTimeout(hintTimer.current);
    hintTimer.current = window.setTimeout(() => setHint(false), HINT_MS);
  };

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
      return;
    }
    try {
      el.volume = 0.3;
      await el.play();
      setPlaying(true);
      showHint();
    } catch {
      // Playback rejected (autoplay policy edge) — stay paused, button remains.
    }
  };

  return (
    <div className="audio-widget">
      <audio
        ref={audioRef}
        src={current.src}
        preload="none"
        onEnded={() => setIndex((i) => (i + 1) % tracks.length)}
      />

      <div className={`audio-anecdote ${hint ? "is-open" : ""}`} role="note">
        <p className="audio-anecdote__now">
          {playing ? `Now playing — ${current.title}` : "A little music, if you like"}
        </p>
        {anecdote ? (
          <>
            <p className="audio-anecdote__q">{anecdote.question}</p>
            <blockquote className="audio-anecdote__a">
              <p>&ldquo;{anecdote.answer}&rdquo;</p>
              <footer>
                {anecdote.attribution ? <span>{anecdote.attribution}</span> : null}
                {anecdote.sourceUrl && anecdote.sourceLabel ? (
                  <a href={anecdote.sourceUrl} target="_blank" rel="noopener noreferrer">
                    {anecdote.sourceLabel}
                  </a>
                ) : null}
              </footer>
            </blockquote>
          </>
        ) : null}
      </div>

      <button
        type="button"
        className={`audio-toggle ${playing ? "is-playing" : ""}`}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? `Pause music — ${current.title}` : `Play music — ${current.title}`}
        title={playing ? "Pause music" : "Play music"}
      >
        {/* Dinosaur footprint — three toes and a pad. Amber while playing. */}
        <svg className="audio-toggle__icon" viewBox="0 0 24 24" aria-hidden>
          <ellipse cx="6.4" cy="7.4" rx="2" ry="2.9" transform="rotate(-24 6.4 7.4)" />
          <ellipse cx="12" cy="5.4" rx="2" ry="3" />
          <ellipse cx="17.6" cy="7.4" rx="2" ry="2.9" transform="rotate(24 17.6 7.4)" />
          <path d="M12 10.2c3.6 0 6 2.3 6 5.2 0 2.6-2.6 4.6-6 4.6s-6-2-6-4.6c0-2.9 2.4-5.2 6-5.2Z" />
        </svg>
      </button>
    </div>
  );
}

export default AudioToggle;
