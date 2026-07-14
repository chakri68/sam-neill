"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

export type RevealVariant = "fade" | "rise" | "rise-lg" | "blur" | "scale";

export interface RevealProps {
  children: ReactNode;
  /** Entrance style. All variants degrade to a plain fade under reduced motion. */
  variant?: RevealVariant;
  /** Delay in ms before the entrance starts once in view. */
  delay?: number;
  /** Fraction of the element visible before it triggers. */
  threshold?: number;
  /** Reveal only once (default) or re-run each time it enters the viewport. */
  once?: boolean;
  /** Element to render. Defaults to a div. */
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Scroll-triggered entrance. Adds `is-visible` when the element scrolls into
 * view; the actual motion lives in CSS (`.reveal` / `.reveal--*`) so it stays
 * GPU-cheap and honours `prefers-reduced-motion` without JS branching.
 *
 * SSR-safe: renders hidden, then reveals on mount. If IntersectionObserver is
 * unavailable, it reveals immediately so content is never stuck invisible.
 */
export function Reveal({
  children,
  variant = "rise",
  delay = 0,
  threshold = 0.15,
  once = true,
  as,
  className,
  style,
}: RevealProps) {
  const Tag: ElementType = as ?? "div";
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, threshold]);

  return (
    <Tag
      ref={ref}
      className={["reveal", `reveal--${variant}`, visible ? "is-visible" : "", className ?? ""]
        .filter(Boolean)
        .join(" ")}
      style={{ ...style, transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
