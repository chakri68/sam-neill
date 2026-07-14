"use client";

/**
 * The self-drawing timeline path (design.md §9.3). Not a straight rule — a
 * gently wandering line resembling a pencil expedition route. It draws as the
 * container scrolls: the parent sets `--progress` (0→1) via useScrollProgress
 * and the stroke-dashoffset follows. `pathLength="1"` normalises the maths so
 * the wobble can change without touching CSS.
 *
 * Three touches keep the draw feeling deliberate rather than accidental:
 * a vertical gradient along the stroke, a soft mask so the drawn end fades
 * out instead of stopping dead (see .timeline-line in globals.css), and a
 * glowing head that rides the draw front.
 *
 * Under reduced motion the hook pins progress to 1, so the full path is drawn
 * immediately with no scroll dependency (and the head is hidden in CSS).
 */
export function TimelineLine() {
  return (
    <div className="timeline-line" aria-hidden>
      <svg viewBox="0 0 120 4000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="timeline-line-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-amber)" stopOpacity="0.35" />
            <stop offset="0.5" stopColor="var(--color-amber)" stopOpacity="0.7" />
            <stop offset="1" stopColor="var(--color-dark-amber)" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <path
          className="timeline-line__path"
          pathLength={1}
          d="M60 0
             C 30 220, 92 420, 60 660
             S 22 1060, 64 1330
             S 100 1760, 56 2060
             S 24 2480, 62 2770
             S 98 3270, 58 3570
             S 44 3830, 60 4000"
        />
      </svg>
      <div className="timeline-line__head" />
    </div>
  );
}

export default TimelineLine;
