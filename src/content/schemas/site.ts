import { z } from "zod";

/** Feature flags. Optional experiences toggle here without deleting code. */
export const featureFlagsSchema = z
  .object({
    memorySubmission: z.boolean().default(false),
    movieSuggestor: z.boolean().default(false),
    memorySearch: z.boolean().default(false),
    memoryStatistics: z.boolean().default(false),
    constellations: z.boolean().default(false),
    audio: z.boolean().default(false),
    easterEggs: z.boolean().default(false),
  })
  .prefault({});

export type FeatureFlags = z.infer<typeof featureFlagsSchema>;

export const siteSchema = z.object({
  version: z.number().default(1),
  title: z.string(),
  hero: z.object({
    name: z.array(z.string()),
    dates: z.string(),
    tagline: z.array(z.string()),
    portrait: z.string(),
    scrollPrompt: z.string().default("Explore his life"),
  }),
  nav: z.object({
    brand: z.string(),
    links: z.array(
      z.object({
        label: z.string(),
        target: z.string(),
      }),
    ),
    menuLabel: z.string().default("Menu"),
  }),
  timelineIntro: z.object({
    title: z.array(z.string()),
    description: z.string(),
  }),
  transition: z.object({
    title: z.array(z.string()),
    description: z.string(),
  }),
  timelineEnding: z.object({
    text: z.array(z.string()),
    /** Closing fan tribute rendered beneath the text lines. */
    signoff: z.string().optional(),
  }),
  /** The closing words at the very bottom of the page. */
  finalTribute: z.object({
    lines: z.array(z.string()),
    dates: z.string().optional(),
  }),
  footer: z.object({
    copy: z.string(),
    creditLabel: z.string().optional(),
  }),
  social: z.object({
    ogImage: z.string(),
    description: z.string(),
  }),
  features: featureFlagsSchema,
});

export type Site = z.infer<typeof siteSchema>;
