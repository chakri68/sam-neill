import { Reveal } from "@/src/components/shared/Reveal";

export interface TimelineIntroProps {
  id: string;
  title: string[];
  description: string;
}

/**
 * Timeline opening screen (design.md §9.1). The hero fades into black; a
 * centred display title and a single serif line set the archival tone before
 * the events begin.
 */
export function TimelineIntro({ id, title, description }: TimelineIntroProps) {
  return (
    <section
      id={id}
      className="snap-start section-bridge flex min-h-screen flex-col items-center justify-center gap-8 px-[var(--space-page-mobile)] py-32 text-center"
    >
      <Reveal variant="rise">
        <h2 className="font-display text-bone text-[clamp(2.75rem,8vw,7rem)]">
          {title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
      </Reveal>
      <Reveal variant="fade" delay={280}>
        <p className="max-w-xl text-2xl italic text-muted">{description}</p>
      </Reveal>
    </section>
  );
}

export default TimelineIntro;
