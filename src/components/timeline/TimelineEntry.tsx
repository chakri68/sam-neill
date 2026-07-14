import Image from "next/image";
import { TributeImage } from "@/src/components/shared/TributeImage";
import { Reveal } from "@/src/components/shared/Reveal";
import { SourcesPopover } from "@/src/components/shared/SourcesPopover";
import { resolveEntryVisual, type Preset } from "@/src/content/loaders/presets";
import { backgroundVar } from "@/src/lib/theme/background";
import type { TimelineEntry as Entry } from "@/src/content/schemas/timeline";

const TITLE_FONT: Record<Preset["titleFont"], string> = {
  display: "font-display",
  editorial: "font-editorial",
  ui: "font-ui",
};
const YEAR_FONT: Record<Preset["yearFont"], string> = {
  display: "font-display",
  mono: "font-mono",
};
const TREATMENT: Record<Preset["imageTreatment"], string> = {
  "warm-archive": "treat-warm-archive",
  cinematic: "treat-cinematic",
  monochrome: "treat-monochrome",
  none: "",
};

function yearOf(entry: Entry): string {
  return entry.displayDate ?? entry.date.slice(0, 4);
}

/** Page-aligned inner wrapper for full-bleed sections. */
const PAGE_PAD =
  "px-[var(--space-page-mobile)] sm:px-[var(--space-page-tablet)] lg:px-[var(--space-page-desktop)]";

/** True when an image declares a portrait aspect (e.g. "3 / 4"). */
function isPortrait(aspect: string | undefined): boolean {
  if (!aspect) return false;
  const [w, h] = aspect.split("/").map((part) => Number.parseFloat(part));
  return Number.isFinite(w) && Number.isFinite(h) && h > w;
}

/**
 * Decorative corner mark (e.g. a film logo) for entries that set `badge`.
 * Purely ornamental — hidden from assistive tech, ignores pointer events, and
 * sits above the scrim so it stays legible over photography.
 */
function EntryBadge({ src, className }: { src: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-20 block select-none opacity-80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] ${className ?? ""}`}
    >
      <Image
        src={src}
        alt=""
        width={160}
        height={98}
        className="h-auto w-full"
      />
    </span>
  );
}

/** Route an entry to its layout. Unknown layouts already resolve to safe defaults. */
export function TimelineEntry({ entry }: { entry: Entry }) {
  const visual = resolveEntryVisual(entry);

  switch (visual.layout) {
    case "full-image":
      return <FilmFeature entry={entry} visual={visual} />;
    case "split-image":
      return <SplitImage entry={entry} visual={visual} />;
    case "quote":
      return <QuoteInterlude entry={entry} visual={visual} />;
    case "gallery":
      return <Gallery entry={entry} visual={visual} />;
    case "minimal":
      return <Minimal entry={entry} visual={visual} />;
    case "text-only":
      return <TextOnly entry={entry} visual={visual} />;
    case "image-left":
      return <Standard entry={entry} visual={visual} side="left" />;
    default:
      return <Standard entry={entry} visual={visual} side="right" />;
  }
}

/* ---------------------------------------------------------------- *
 * Standard entry — year + copy in one column, image in the other,
 * with the year echoed as a ghost behind the frame.
 * ---------------------------------------------------------------- */
function Standard({
  entry,
  visual,
  side,
}: {
  entry: Entry;
  visual: Preset;
  side: "left" | "right";
}) {
  const image = entry.images[0];
  const imageFirst = side === "left";
  // Portrait sources keep their shape in a narrower frame instead of being
  // cropped into the default landscape one.
  const portrait = isPortrait(image?.aspectRatio);
  return (
    <article
      id={entry.id}
      className="relative grid items-center gap-10 md:grid-cols-2 md:gap-16"
    >
      {entry.badge ? (
        <EntryBadge
          src={entry.badge}
          className="right-3 top-3 w-14 md:right-4 md:top-4 md:w-20"
        />
      ) : null}
      {image ? (
        <Reveal
          variant="scale"
          className={`relative ${imageFirst ? "md:order-1" : "md:order-2"} ${
            portrait ? "mx-auto w-full max-w-[24rem] md:max-w-[26rem]" : ""
          } ${TREATMENT[visual.imageTreatment]}`}
        >
          {visual.ghostYear ? (
            <span
              className={`timeline-year timeline-year--ghost ${YEAR_FONT[visual.yearFont]} text-[22vw] md:text-[10vw]`}
            >
              {yearOf(entry)}
            </span>
          ) : null}
          <TributeImage
            asset={image}
            aspectRatio="3 / 2"
            sizes={
              portrait
                ? "(max-width: 768px) 100vw, 416px"
                : "(max-width: 768px) 100vw, 50vw"
            }
            fallbackLabel={entry.title}
          />
        </Reveal>
      ) : null}

      <Reveal
        variant="rise"
        delay={120}
        className={imageFirst ? "md:order-2" : "md:order-1"}
      >
        <p
          className={`timeline-year ${YEAR_FONT[visual.yearFont]} text-amber text-5xl md:text-7xl`}
        >
          {yearOf(entry)}
        </p>
        <h3
          className={`mt-4 text-bone text-3xl md:text-4xl ${TITLE_FONT[visual.titleFont]}`}
        >
          {entry.title}
        </h3>
        {entry.subtitle ? (
          <p className="mt-2 font-ui text-sm uppercase tracking-[0.14em] text-amber">
            {entry.subtitle}
          </p>
        ) : null}
        <p className="mt-5 max-w-prose text-xl text-paper">
          {entry.description}
        </p>
        {entry.longDescription ? (
          <p className="mt-4 max-w-prose text-lg text-muted">
            {entry.longDescription}
          </p>
        ) : null}
        <SourcesPopover sources={entry.sources} />
      </Reveal>
    </article>
  );
}

/* ---------------------------------------------------------------- *
 * Film-feature — full-screen milestone (design.md §9.6)
 * ---------------------------------------------------------------- */
function FilmFeature({ entry, visual }: { entry: Entry; visual: Preset }) {
  const image = entry.images[0];
  return (
    <article
      id={entry.id}
      className="film-feature film-grain full-bleed"
      style={{ backgroundColor: backgroundVar(visual.background) }}
    >
      {image ? (
        <div
          className={`film-feature__media ${TREATMENT[visual.imageTreatment]}`}
        >
          <TributeImage
            asset={image}
            priority={entry.featured}
            bare
            sizes="100vw"
            className="h-full !rounded-none"
            fallbackLabel={entry.title}
          />
        </div>
      ) : null}
      <div className="film-feature__scrim" />
      {entry.badge ? (
        <EntryBadge
          src={entry.badge}
          className="right-5 top-20 w-24 md:right-10 md:top-24 md:w-32"
        />
      ) : null}
      {/* The backdrop renders bare (no caption chrome), so its caption/credit
          surfaces as a quiet corner line instead. */}
      {image?.caption || image?.credit ? (
        <p className={`film-feature__credit ${PAGE_PAD}`}>
          {[image.caption, image.credit].filter(Boolean).join(" — ")}
        </p>
      ) : null}

      <div
        className={`relative z-10 mx-auto w-full max-w-[1440px] ${PAGE_PAD}`}
      >
        <div className="film-feature__content flex min-h-screen flex-col justify-end pb-24 md:justify-center">
          <span
            className={`timeline-year timeline-year--backdrop ${YEAR_FONT[visual.yearFont]} whitespace-nowrap text-bone/15 text-[15vw] leading-none md:text-[8.5vw]`}
          >
            {yearOf(entry)}
          </span>
          <Reveal variant="rise-lg" className="-mt-[3vw]">
            <h3
              className={`text-bone text-[clamp(2.5rem,7vw,6rem)] ${TITLE_FONT[visual.titleFont]}`}
            >
              {entry.title}
            </h3>
            {entry.subtitle ? (
              <p className="mt-3 font-ui text-sm uppercase tracking-[0.16em] text-amber">
                {entry.subtitle}
              </p>
            ) : null}
            <p className="mt-6 max-w-xl text-2xl text-paper">
              {entry.description}
            </p>
            {entry.longDescription ? (
              <p className="mt-4 max-w-xl text-lg text-muted">
                {entry.longDescription}
              </p>
            ) : null}
            {entry.quote ? (
              <blockquote className="mt-10 max-w-xl border-l-2 border-amber/60 pl-5">
                <p className="font-editorial italic text-bone/90 text-xl leading-snug md:text-2xl">
                  &ldquo;{entry.quote.text}&rdquo;
                </p>
                {entry.quote.attribution ? (
                  <footer className="mt-3 font-ui text-xs uppercase tracking-[0.16em] text-amber">
                    {entry.quote.attribution}
                  </footer>
                ) : null}
              </blockquote>
            ) : null}
            <SourcesPopover sources={entry.sources} />
          </Reveal>
        </div>
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------- *
 * Quote interlude (design.md §9.7) — Cormorant, not Tribeca
 * ---------------------------------------------------------------- */
function QuoteInterlude({ entry, visual }: { entry: Entry; visual: Preset }) {
  const quote = entry.quote;
  if (!quote) return <TextOnly entry={entry} visual={visual} />;
  return (
    <article
      id={entry.id}
      className="quote-interlude film-grain full-bleed px-[var(--space-page-mobile)] sm:px-[var(--space-page-tablet)]"
      style={{ backgroundColor: backgroundVar(visual.background) }}
    >
      <Reveal variant="fade" className="relative z-10">
        <blockquote className="mx-auto max-w-4xl">
          <p className="font-editorial text-bone text-[clamp(1.75rem,4vw,3.25rem)] leading-tight">
            &ldquo;{quote.text}&rdquo;
          </p>
          {quote.attribution ? (
            <footer className="mt-8 font-ui text-sm uppercase tracking-[0.18em] text-amber">
              {quote.attribution}
            </footer>
          ) : null}
          <SourcesPopover sources={entry.sources} />
        </blockquote>
      </Reveal>
    </article>
  );
}

/* ---------------------------------------------------------------- *
 * Text-only
 * ---------------------------------------------------------------- */
function TextOnly({ entry, visual }: { entry: Entry; visual: Preset }) {
  return (
    <article id={entry.id} className="py-16 text-center">
      <Reveal variant="rise" className="line-shield mx-auto max-w-3xl">
        <p
          className={`timeline-year ${YEAR_FONT[visual.yearFont]} text-amber text-4xl md:text-6xl`}
        >
          {yearOf(entry)}
        </p>
        <h3
          className={`mx-auto mt-4 max-w-3xl text-bone text-3xl md:text-5xl ${TITLE_FONT[visual.titleFont]}`}
        >
          {entry.title}
        </h3>
        <p className="mx-auto mt-6 max-w-2xl text-xl text-paper">
          {entry.description}
        </p>
        <SourcesPopover sources={entry.sources} />
      </Reveal>
    </article>
  );
}

/* ---------------------------------------------------------------- *
 * Split-image — one moment told through two films side by side
 * ---------------------------------------------------------------- */
function SplitImage({ entry, visual }: { entry: Entry; visual: Preset }) {
  const images = entry.images.slice(0, 2);
  return (
    <article id={entry.id} className="relative">
      <Reveal
        variant="rise"
        className="line-shield mx-auto max-w-3xl text-center"
      >
        <p
          className={`timeline-year ${YEAR_FONT[visual.yearFont]} text-amber text-5xl md:text-7xl`}
        >
          {yearOf(entry)}
        </p>
        <h3
          className={`mx-auto mt-4 max-w-3xl text-bone text-3xl md:text-5xl ${TITLE_FONT[visual.titleFont]}`}
        >
          {entry.title}
        </h3>
        {entry.subtitle ? (
          <p className="mt-2 font-ui text-sm uppercase tracking-[0.14em] text-amber">
            {entry.subtitle}
          </p>
        ) : null}
        <p className="mx-auto mt-5 max-w-2xl text-xl text-paper">
          {entry.description}
        </p>
        <SourcesPopover sources={entry.sources} />
      </Reveal>
      <div
        className={`mt-12 grid gap-6 md:grid-cols-2 ${TREATMENT[visual.imageTreatment]}`}
      >
        {images.map((image, i) => (
          <Reveal key={image.src + i} variant="scale" delay={i * 120}>
            <TributeImage
              asset={image}
              aspectRatio="3 / 4"
              sizes="(max-width: 768px) 100vw, 50vw"
              fallbackLabel={image.alt || entry.title}
            />
          </Reveal>
        ))}
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------- *
 * Minimal — a quiet milestone (honours, small moments): a thin rule,
 * compact type, and an optional small portrait. Deliberately low-key.
 * ---------------------------------------------------------------- */
function Minimal({ entry, visual }: { entry: Entry; visual: Preset }) {
  const image = entry.images[0];
  return (
    <article id={entry.id} className="mx-auto max-w-3xl">
      <Reveal variant="rise">
        <div className="line-shield border-t border-amber/25 pt-8">
          <div className="flex items-baseline gap-5">
            <p
              className={`timeline-year ${YEAR_FONT[visual.yearFont]} shrink-0 text-amber text-3xl md:text-4xl`}
            >
              {yearOf(entry)}
            </p>
            <div>
              <h3
                className={`text-bone text-2xl md:text-3xl ${TITLE_FONT[visual.titleFont]}`}
              >
                {entry.title}
              </h3>
              {entry.subtitle ? (
                <p className="mt-1 font-ui text-xs uppercase tracking-[0.14em] text-amber">
                  {entry.subtitle}
                </p>
              ) : null}
            </div>
          </div>
          <div className="mt-5 grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
            <div>
              <p className="max-w-prose text-lg text-paper">
                {entry.description}
              </p>
              <SourcesPopover sources={entry.sources} />
            </div>
            {image ? (
              <div
                className={`w-full md:w-56 ${TREATMENT[visual.imageTreatment]}`}
              >
                <TributeImage
                  asset={image}
                  aspectRatio="4 / 3"
                  sizes="(max-width: 768px) 100vw, 224px"
                  fallbackLabel={image.alt || entry.title}
                />
              </div>
            ) : null}
          </div>
        </div>
      </Reveal>
    </article>
  );
}

/* ---------------------------------------------------------------- *
 * Gallery — title + a set of frames
 * ---------------------------------------------------------------- */
function Gallery({ entry, visual }: { entry: Entry; visual: Preset }) {
  return (
    <article id={entry.id}>
      <Reveal variant="rise">
        <p
          className={`timeline-year ${YEAR_FONT[visual.yearFont]} text-amber text-4xl md:text-6xl`}
        >
          {yearOf(entry)}
        </p>
        <h3
          className={`mt-4 text-bone text-3xl md:text-4xl ${TITLE_FONT[visual.titleFont]}`}
        >
          {entry.title}
        </h3>
        <p className="mt-4 max-w-prose text-xl text-paper">
          {entry.description}
        </p>
      </Reveal>
      <div
        className={`mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${TREATMENT[visual.imageTreatment]}`}
      >
        {entry.images.map((image, i) => (
          <Reveal key={image.src + i} variant="scale" delay={i * 80}>
            <TributeImage
              asset={image}
              aspectRatio="4 / 3"
              sizes="(max-width: 768px) 100vw, 33vw"
              fallbackLabel={entry.title}
            />
          </Reveal>
        ))}
      </div>
    </article>
  );
}

export default TimelineEntry;
