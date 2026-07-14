import { Reveal } from "@/src/components/shared/Reveal";

export interface FinalTributeProps {
  id: string;
  lines: string[];
  dates?: string;
}

/**
 * The last thing on the page. One enormous line in the display face, then the
 * quieter serif lines landing one beat apart, then the dates. Nothing else —
 * the emptiness is the point.
 */
export function FinalTribute({ id, lines, dates }: FinalTributeProps) {
  if (!lines.length) return null;
  const [first, ...rest] = lines;
  return (
    <section
      id={id}
      className="snap-start section-bridge flex min-h-screen flex-col items-center justify-center gap-10 px-[var(--space-page-mobile)] py-32 text-center"
    >
      <Reveal variant="rise-lg">
        <p className="font-editorial text-bone text-[clamp(2.6rem,7vw,5.75rem)]">
          {first}
        </p>
      </Reveal>
      {rest.length ? (
        <div className="flex flex-col gap-3">
          {rest.map((line, i) => (
            <Reveal key={line} variant="fade" delay={400 + i * 350}>
              <p className="font-editorial italic text-paper text-[clamp(1.35rem,2.6vw,2.1rem)] leading-snug">
                {line}
              </p>
            </Reveal>
          ))}
        </div>
      ) : null}
      {dates ? (
        <Reveal variant="fade" delay={400 + rest.length * 350 + 300}>
          <p className="mt-6 font-ui text-sm tracking-[0.35em] text-muted">
            {dates}
          </p>
        </Reveal>
      ) : null}
    </section>
  );
}

export default FinalTribute;
