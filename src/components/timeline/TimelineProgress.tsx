"use client";

import { useRef, type ReactNode } from "react";
import { useScrollProgress } from "@/src/lib/motion/hooks";

/**
 * Thin client wrapper that publishes the timeline's scroll progress as the
 * `--progress` CSS var on itself. Its children (the entries) stay server
 * components — only this wrapper and the line need to run on the client.
 */
export function TimelineProgress({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  // Anchor the draw front at ~62% of the viewport: it stays on screen for the
  // whole scroll and the line finishes exactly as the timeline's end crosses
  // that height. The default exit-the-viewport mapping parks the front under
  // the fixed nav for the entire last quarter of a timeline this tall.
  useScrollProgress(ref, "--progress", { anchor: 0.62 });
  return (
    <div ref={ref} className="relative">
      {children}
    </div>
  );
}

export default TimelineProgress;
