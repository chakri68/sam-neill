"use client";

import { useEffect, useRef, useState } from "react";
import type { TimelineEntry } from "@/src/content/schemas/timeline";

export type EntrySource = TimelineEntry["sources"][number];

/**
 * A tiny ⓘ that opens a small panel listing where an entry's claims come
 * from. Closes on Esc, outside click, or the button itself. Renders nothing
 * when an entry has no sources, so layouts can include it unconditionally.
 */
export function SourcesPopover({ sources }: { sources: EntrySource[] }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!sources.length) return null;

  return (
    <div className="sources" ref={rootRef}>
      <button
        type="button"
        className="sources__btn"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Hide sources" : "Show sources"}
        title="Sources"
      >
        i
      </button>
      {open ? (
        <div className="sources__panel" role="dialog" aria-label="Sources">
          <span className="sources__title">Sources</span>
          <ul>
            {sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.title}
                </a>
                {source.publisher ? <span> — {source.publisher}</span> : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default SourcesPopover;
