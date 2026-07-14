import { site, getImage, timeline } from "@/src/content";
import { TributeImage } from "@/src/components/shared/TributeImage";
import { Reveal } from "@/src/components/shared/Reveal";

/**
 * Phase 0 foundation preview. Everything on this page comes from /content
 * JSON through the validated loaders — no Sam Neill-specific string or image
 * path is hardcoded here. Phase 1 replaces this with the art-directed hero
 * and full timeline; for now it proves the content + image + motion pipeline.
 */
export default function Home() {
  const heroPortrait = getImage(site.hero.portrait);

  return (
    <main className="font-editorial text-bone">
      {/* Hero */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <TributeImage
            asset={heroPortrait}
            priority
            bare
            sizes="100vw"
            className="h-full !rounded-none"
            fallbackLabel={heroPortrait.alt}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/70 to-transparent" />
        </div>

        <div className="relative z-10 flex min-h-screen flex-col justify-center gap-6 px-[var(--space-page-mobile)] sm:px-[var(--space-page-tablet)] lg:px-[var(--space-page-desktop)]">
          <Reveal variant="rise-lg">
            <h1 className="font-display text-bone text-[clamp(3.5rem,12vw,11.875rem)]">
              {site.hero.name.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </Reveal>
          <Reveal variant="fade" delay={220}>
            <p className="font-ui tracking-[0.2em] text-amber text-sm">{site.hero.dates}</p>
          </Reveal>
          <Reveal variant="rise" delay={380}>
            <p className="max-w-md text-2xl leading-snug text-paper">
              {site.hero.tagline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </Reveal>
        </div>

        <Reveal
          variant="fade"
          delay={700}
          className="absolute bottom-8 left-[var(--space-page-mobile)] flex items-center gap-3 sm:left-[var(--space-page-tablet)] lg:left-[var(--space-page-desktop)]"
        >
          <span className="eyebrow">{site.hero.scrollPrompt}</span>
          <span className="block h-10 w-px origin-top bg-amber/70 [animation:ti-grow-line_1.4s_var(--ease-cinematic)_forwards]" />
        </Reveal>
      </section>

      {/* Timeline intro */}
      <section className="mx-auto max-w-[760px] px-[var(--space-page-mobile)] py-32 text-center sm:px-[var(--space-page-tablet)]">
        <Reveal variant="rise">
          <p className="eyebrow mb-6">{site.timelineIntro.title.join(" ")}</p>
          <h2 className="font-display text-bone text-[clamp(2.75rem,7vw,5rem)]">
            {site.timelineIntro.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-8 text-2xl text-muted">{site.timelineIntro.description}</p>
        </Reveal>
      </section>

      {/* Timeline entries — foundation render (Phase 1 art-directs these) */}
      <section className="mx-auto flex max-w-[1440px] flex-col gap-40 px-[var(--space-page-mobile)] pb-40 sm:px-[var(--space-page-tablet)] lg:px-[var(--space-page-desktop)]">
        {timeline.entries.map((entry, i) => {
          const image = entry.images[0];
          const imageLeft = entry.layout === "image-left" || (!entry.layout && i % 2 === 1);
          return (
            <article
              key={entry.id}
              id={entry.id}
              className="grid items-center gap-10 md:grid-cols-2"
            >
              {image ? (
                <Reveal
                  variant="scale"
                  className={imageLeft ? "md:order-1" : "md:order-2"}
                >
                  <TributeImage
                    asset={image}
                    aspectRatio="3 / 2"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    fallbackLabel={entry.title}
                  />
                </Reveal>
              ) : null}

              <Reveal
                variant="rise"
                delay={120}
                className={imageLeft ? "md:order-2" : "md:order-1"}
              >
                <p className="font-mono text-amber text-4xl md:text-6xl">
                  {entry.displayDate ?? entry.date.slice(0, 4)}
                </p>
                {entry.quote ? (
                  <blockquote className="mt-6 text-3xl italic leading-snug text-bone">
                    “{entry.quote.text}”
                    {entry.quote.attribution ? (
                      <footer className="mt-4 font-ui text-sm not-italic tracking-widest text-muted">
                        — {entry.quote.attribution}
                      </footer>
                    ) : null}
                  </blockquote>
                ) : (
                  <>
                    <h3 className="mt-4 font-display text-bone text-3xl md:text-4xl">
                      {entry.title}
                    </h3>
                    {entry.subtitle ? (
                      <p className="mt-2 font-ui text-sm uppercase tracking-[0.14em] text-amber">
                        {entry.subtitle}
                      </p>
                    ) : null}
                    <p className="mt-5 max-w-prose text-xl text-paper">{entry.description}</p>
                  </>
                )}
              </Reveal>
            </article>
          );
        })}
      </section>

      <footer className="border-t border-bone/10 px-[var(--space-page-mobile)] py-12 text-center font-ui text-xs text-muted sm:px-[var(--space-page-tablet)]">
        {site.footer.copy}
      </footer>
    </main>
  );
}
