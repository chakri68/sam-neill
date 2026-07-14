import { TimelineProgress } from "./TimelineProgress";
import { TimelineLine } from "./TimelineLine";
import { TimelineEntry } from "./TimelineEntry";
import { TimelineEnding, type TimelineEndingProps } from "./TimelineEnding";
import type { TimelineEntry as Entry } from "@/src/content/schemas/timeline";

export interface TimelineProps {
  id: string;
  entries: Entry[];
  ending: TimelineEndingProps;
}

/**
 * The timeline body: the self-drawing line threaded behind a spacious stack of
 * events, each art-directed by its resolved layout/preset, ending on the
 * invitation to the Memory Machine. Server-rendered; only the progress wrapper
 * and per-element reveals hydrate.
 */
export function Timeline({ id, entries, ending }: TimelineProps) {
  return (
    <>
      <section
        id={id}
        className="mx-auto max-w-[1440px] px-[var(--space-page-mobile)] sm:px-[var(--space-page-tablet)] lg:px-[var(--space-page-desktop)]"
      >
        <TimelineProgress>
          <TimelineLine />
          <div className="relative z-10 flex flex-col gap-[clamp(6rem,14vh,12rem)] py-24">
            {entries.map((entry) => (
              <TimelineEntry key={entry.id} entry={entry} />
            ))}
          </div>
        </TimelineProgress>
      </section>

      {/* Outside the max-width container so its background truly spans the page. */}
      <TimelineEnding {...ending} />
    </>
  );
}

export default Timeline;
