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

/** Steady-state playback volume — background music, not a concert. */
const BASE_VOLUME = 0.3;
/** Fade window at the end of a track, seconds. */
const FADE_OUT_S = 2.5;
/** Ramp-in length when a track starts, ms. */
const FADE_IN_MS = 1500;

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
  const fadeFrame = useRef<number | null>(null);
  const fadingOut = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [hint, setHint] = useState(false);

  const current = tracks[index];

  // Ramp el.volume toward a target over `ms` on rAF — volume isn't a CSS
  // property, so no transition can do this. A new fade cancels the previous
  // one; `done` fires only when the target is actually reached.
  const fadeTo = (target: number, ms: number, done?: () => void) => {
    const el = audioRef.current;
    if (!el) return;
    if (fadeFrame.current) cancelAnimationFrame(fadeFrame.current);
    const from = el.volume;
    const start = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - start) / ms);
      el.volume = from + (target - from) * k;
      if (k < 1) {
        fadeFrame.current = requestAnimationFrame(step);
      } else {
        fadeFrame.current = null;
        done?.();
      }
    };
    fadeFrame.current = requestAnimationFrame(step);
  };

  // A track change while playing (advance-on-end) starts the new source,
  // fading it in from silence — the previous one faded out via onTimeUpdate.
  useEffect(() => {
    if (!playing) return;
    const el = audioRef.current;
    if (!el) return;
    fadingOut.current = false;
    el.volume = 0;
    el.play()
      .then(() => fadeTo(BASE_VOLUME, FADE_IN_MS))
      .catch(() => setPlaying(false));
  }, [index, playing]);

  useEffect(() => {
    return () => {
      if (fadeFrame.current) cancelAnimationFrame(fadeFrame.current);
    };
  }, []);

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
      // Quick fade so the pause doesn't clip mid-note.
      setPlaying(false);
      fadeTo(0, 350, () => el.pause());
      return;
    }
    try {
      fadingOut.current = false;
      el.volume = 0;
      await el.play();
      setPlaying(true);
      fadeTo(BASE_VOLUME, FADE_IN_MS);
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
        onTimeUpdate={(event) => {
          // Ease the ending track down over its last seconds; the next one
          // fades in from silence, so switches never cut hard.
          const el = event.currentTarget;
          if (!playing || fadingOut.current || !Number.isFinite(el.duration)) return;
          const remaining = el.duration - el.currentTime;
          if (remaining <= FADE_OUT_S) {
            fadingOut.current = true;
            fadeTo(0, Math.max(200, remaining * 1000));
          }
        }}
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
        {/* Raptor claw cutout, used as a CSS mask so it recolours like the
            old footprint svg did via fill. Amber while playing. */}
        <span className="audio-toggle__icon" aria-hidden />
      </button>
    </div>
  );
}

export default AudioToggle;
