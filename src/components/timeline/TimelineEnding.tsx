import { Reveal } from "@/src/components/shared/Reveal";

export interface TimelineEndingProps {
  id: string;
  text: string[];
  /** Closing fan tribute beneath the text lines. */
  signoff?: string;
}

/**
 * Timeline ending (design.md §9.8). The path reaches the centre and becomes a
 * line of light; the closing lines resolve into a final fan sign-off. The
 * Memory Machine experience was cut, so this is the site's quiet full stop.
 */
export function TimelineEnding({ id, text, signoff }: TimelineEndingProps) {
  return (
    <section
      id={id}
      className="snap-start section-bridge flex min-h-screen flex-col items-center justify-center gap-10 px-[var(--space-page-mobile)] py-32 text-center"
    >
      <span
        className="block w-px bg-gradient-to-b from-transparent via-amber to-transparent"
        style={{ height: "min(30vh, 240px)", boxShadow: "0 0 24px var(--color-amber)" }}
        aria-hidden
      />
      <Reveal variant="rise">
        <p className="font-editorial text-bone text-[clamp(1.75rem,4vw,3rem)] leading-tight">
          {text.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </Reveal>
      {signoff ? (
        <Reveal variant="fade" delay={300}>
          <blockquote className="mx-auto max-w-2xl">
            <p className="font-editorial italic text-paper text-xl leading-snug md:text-2xl">
              {signoff.split("\n").map((line, i, lines) => (
                <span key={i} className={i > 0 ? "block" : undefined}>
                  {i === 0 ? "“" : null}
                  {line.trim()}
                  {i === lines.length - 1 ? "”" : null}
                </span>
              ))}
            </p>
          </blockquote>
        </Reveal>
      ) : null}
    </section>
  );
}

export default TimelineEnding;
