import { z } from "zod";
import { withBasePath } from "@/src/lib/site-url";

/** Background-music playlist. Tracks play in order and loop as a set. */
export const audioTrackSchema = z.object({
  src: z.string().min(1).transform(withBasePath),
  title: z.string(),
});

export const audioSchema = z.object({
  version: z.number().default(1),
  tracks: z.array(audioTrackSchema).default([]),
  /** The interview exchange shown beside the player — why this song. */
  anecdote: z
    .object({
      question: z.string(),
      answer: z.string(),
      attribution: z.string().optional(),
      sourceLabel: z.string().optional(),
      sourceUrl: z.string().optional(),
    })
    .optional(),
});

export type AudioConfig = z.infer<typeof audioSchema>;
export type AudioTrack = z.infer<typeof audioTrackSchema>;
export type AudioAnecdote = NonNullable<AudioConfig["anecdote"]>;
