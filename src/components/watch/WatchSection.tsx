import { Reveal } from "@/src/components/shared/Reveal";
import { VideoStack } from "./VideoStack";
import type { TributeVideo } from "@/src/content/schemas/videos";

export interface WatchSectionProps {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  videos: TributeVideo[];
}

/** "Watch him again" — the stacked video deck below the tribute. */
export function WatchSection({ id, eyebrow, title, description, videos }: WatchSectionProps) {
  if (!videos.length) return null;
  return (
    <section
      id={id}
      className="mx-auto w-full max-w-[960px] px-[var(--space-page-mobile)] py-24 sm:px-[var(--space-page-tablet)] md:py-32"
    >
      <Reveal variant="rise" className="mb-14 text-center">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="font-display mt-3 text-bone text-4xl md:text-6xl">{title}</h2>
        {description ? (
          <p className="mx-auto mt-4 max-w-xl text-xl italic text-muted">{description}</p>
        ) : null}
      </Reveal>
      <VideoStack videos={videos} />
    </section>
  );
}

export default WatchSection;
