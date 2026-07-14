import { z } from "zod";

/**
 * One line of a film exchange: a character speaking, or a stage direction
 * (direction: true renders italic, no speaker).
 */
export const quoteLineSchema = z.object({
  speaker: z.string().optional(),
  text: z.string(),
  direction: z.boolean().optional(),
});

/**
 * A rotator card. `dialogue` = multi-line film exchange (uses `lines`);
 * `line` = a single famous film line (uses `text` + `character`);
 * `interview` = Sam himself (uses `text`, optional `context` = the question).
 */
export const quoteSchema = z.object({
  id: z.string(),
  kind: z.enum(["dialogue", "interview", "line"]),
  source: z.string(),
  context: z.string().optional(),
  character: z.string().optional(),
  text: z.string().optional(),
  lines: z.array(quoteLineSchema).default([]),
});

export const quotesSchema = z.object({
  version: z.number().default(1),
  intro: z.object({
    eyebrow: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
  }),
  quotes: z.array(quoteSchema).default([]),
});

export type Quote = z.infer<typeof quoteSchema>;
export type Quotes = z.infer<typeof quotesSchema>;
