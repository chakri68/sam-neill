import { TributeImage } from "@/src/components/shared/TributeImage";
import { Reveal } from "@/src/components/shared/Reveal";
import type { ImageAsset } from "@/src/content/schemas/image";

export interface HeroProps {
  id: string;
  name: string[];
  dates: string;
  tagline: string[];
  scrollPrompt: string;
  portrait: ImageAsset;
}

/**
 * Landing hero (design.md §8). Full-bleed treated portrait behind a left-side
 * gradient scrim, name in the display face, an abstract dark-red arc as a
 * restrained Jurassic motif (not the trademarked logo), and a scroll prompt
 * with a self-drawing amber line.
 */
export function Hero({ id, name, dates, tagline, scrollPrompt, portrait }: HeroProps) {
  return (
    <section id={id} className="snap-start film-grain relative min-h-screen w-full overflow-hidden">
      {/* Portrait */}
      <div className="treat-warm-archive absolute inset-0">
        <TributeImage
          asset={portrait}
          priority
          bare
          sizes="100vw"
          className="h-full !rounded-none"
          imgClassName="md:[object-position:82%_28%]"
          fallbackLabel={portrait.alt}
        />
      </div>
      <div className="hero-scrim" />

      {/* Name block */}
      <div className="relative z-10 flex min-h-screen flex-col justify-center gap-6 px-[var(--space-page-mobile)] sm:px-[var(--space-page-tablet)] lg:px-[var(--space-page-desktop)]">
        <Reveal variant="rise-lg">
          <h1 className="font-display text-bone text-[clamp(3.5rem,12vw,11.875rem)]">
            {name.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
        </Reveal>

        <Reveal variant="fade" delay={240}>
          <p className="font-ui text-sm tracking-[0.25em] text-amber">{dates}</p>
        </Reveal>

        <Reveal variant="rise" delay={420}>
          <p className="max-w-md text-2xl leading-snug text-paper">
            {tagline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </Reveal>
      </div>

      {/* Scroll prompt */}
      <Reveal
        variant="fade"
        delay={720}
        className="absolute bottom-8 left-[var(--space-page-mobile)] z-10 flex items-center gap-3 sm:left-[var(--space-page-tablet)] lg:left-[var(--space-page-desktop)]"
      >
        <span className="eyebrow">{scrollPrompt}</span>
        <span className="scroll-line" aria-hidden />
      </Reveal>
    </section>
  );
}

export default Hero;
