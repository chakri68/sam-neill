"use client";

import { useState } from "react";
import { Reveal } from "@/src/components/shared/Reveal";
import { Cutout } from "@/src/components/shared/Cutout";
import type { Quote } from "@/src/content/schemas/quotes";

export interface QuotesSectionProps {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  quotes: Quote[];
}

/**
 * The sticker wall behind the card — seeds vary the tilt and flip; entries
 * with a `file` are guaranteed casting (mostly Alan, as is right and proper).
 */
const STICKERS: { seed: string; className: string; size: number; file?: string }[] = [
  { seed: "sticker-a", className: "left-[4%] top-[12%]", size: 90 },
  { seed: "sticker-b", className: "right-[6%] top-[18%]", size: 110 },
  { seed: "sticker-c", className: "left-[10%] bottom-[14%]", size: 120 },
  { seed: "sticker-d", className: "right-[12%] bottom-[10%]", size: 84 },
  { seed: "sticker-e", className: "left-[26%] top-[4%]", size: 70 },
  { seed: "sticker-f", className: "right-[28%] top-[6%]", size: 64 },
  { seed: "sticker-g", className: "left-[2%] top-[48%]", size: 76 },
  { seed: "sticker-h", className: "right-[2%] top-[52%]", size: 96 },
  { seed: "alan-a", file: "alan-2", className: "left-[16%] top-[26%]", size: 88 },
  { seed: "alan-b", file: "alan-5", className: "right-[18%] top-[34%]", size: 80 },
  { seed: "alan-c", file: "alan-3", className: "left-[30%] bottom-[6%]", size: 92 },
  { seed: "alan-d", file: "alan-6", className: "right-[30%] bottom-[8%]", size: 78 },
  { seed: "alan-e", file: "alan-7", className: "left-[44%] top-[8%]", size: 64 },
  { seed: "alan-f", file: "trike-alan", className: "right-[42%] bottom-[3%]", size: 110 },
];

/**
 * "Lines to remember" — one quote at a time, re-rolled on demand. The card
 * remounts per quote so the entrance animation replays; picks are random but
 * never the current one twice. The toy cutouts live here now, as low-opacity
 * stickers scattered behind the card.
 */
export function QuotesSection({ id, eyebrow, title, description, quotes }: QuotesSectionProps) {
  const [index, setIndex] = useState(0);

  if (!quotes.length) return null;
  const quote = quotes[index];

  const reroll = () => {
    if (quotes.length < 2) return;
    let next = index;
    while (next === index) {
      next = Math.floor(Math.random() * quotes.length);
    }
    setIndex(next);
  };

  return (
    <section
      id={id}
      className="snap-start section-bridge relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-[var(--space-page-mobile)] py-28 sm:px-[var(--space-page-tablet)]"
    >
      {/* the sticker wall */}
      {STICKERS.map((s) => (
        <Cutout
          key={s.seed}
          seed={s.seed}
          file={s.file}
          size={s.size}
          className={`quote-sticker ${s.className}`}
        />
      ))}

      <Reveal variant="rise" className="relative z-10 mb-12 text-center">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="font-display mt-3 text-bone text-4xl md:text-6xl">{title}</h2>
        {description ? (
          <p className="mx-auto mt-4 max-w-xl text-xl italic text-muted">{description}</p>
        ) : null}
      </Reveal>

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-10">
        {/* keyed remount replays the entrance animation per quote */}
        <blockquote key={quote.id} className="quote-card">
          {/* auto margins centre short quotes; long ones scroll from the top */}
          <div className="quote-card__body">
          {quote.kind === "dialogue" ? (
            <div className="quote-card__lines">
              {quote.lines.map((line, i) =>
                line.direction ? (
                  <p key={i} className="quote-card__direction">
                    [{line.text}]
                  </p>
                ) : (
                  <p key={i} className="quote-card__line">
                    {line.speaker ? <span className="quote-card__speaker">{line.speaker}</span> : null}
                    {line.text}
                  </p>
                ),
              )}
            </div>
          ) : (
            <>
              {quote.context ? <p className="quote-card__context">{quote.context}</p> : null}
              <p className="quote-card__text">&ldquo;{quote.text}&rdquo;</p>
            </>
          )}
          <footer className="quote-card__source">
            {quote.character ? <span>{quote.character} · </span> : null}
            {quote.source}
          </footer>
          </div>
        </blockquote>

        <div className="flex items-center gap-5">
          <button type="button" className="enter-cta" onClick={reroll}>
            Another one
            <span aria-hidden>→</span>
          </button>
          <p className="font-ui text-xs tracking-[0.18em] text-muted">
            {index + 1} / {quotes.length}
          </p>
        </div>
      </div>
    </section>
  );
}

export default QuotesSection;
