"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/** True when the user has asked for reduced motion. Reactive to changes. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/**
 * Scroll progress (0→1) of an element travelling through the viewport.
 * 0 when the element's top hits the bottom of the viewport, 1 when its
 * bottom passes the top. Writes to a CSS var so animation stays off the
 * React render path. Returns the numeric value too for JS consumers.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  cssVar = "--progress",
): number {
  const [progress, setProgress] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduced) {
      node.style.setProperty(cssVar, "1");
      setProgress(1);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = rect.height + vh;
      const raw = (vh - rect.top) / total;
      const clamped = Math.min(1, Math.max(0, raw));
      node.style.setProperty(cssVar, clamped.toFixed(4));
      setProgress(clamped);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, cssVar, reduced]);

  return progress;
}

/**
 * Track which of several sections is currently dominant in the viewport.
 * Returns the id of the most-visible section. Drives the nav's active dot.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);
  const ratios = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el != null);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.current.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of ratios.current) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        if (best) setActive(best);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "-20% 0px -20% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids.join(",")]); // eslint-disable-line react-hooks/exhaustive-deps

  return active;
}
