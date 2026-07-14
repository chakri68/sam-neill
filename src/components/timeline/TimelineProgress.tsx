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
  useScrollProgress(ref, "--progress");
  return (
    <div ref={ref} className="relative">
      {children}
    </div>
  );
}

export default TimelineProgress;
