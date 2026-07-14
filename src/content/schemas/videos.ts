import { z } from "zod";

/**
 * A tribute video card. `youtube` accepts whatever gets pasted — a full
 * watch/share/shorts/embed URL or a bare 11-character video id — and the
 * loader normalises it. An empty string renders a placeholder card so the
 * section can be designed before the links exist.
 */
export const tributeVideoSchema = z.object({
  id: z.string(),
  title: z.string(),
  /** Small supporting line under the title, e.g. "Jurassic Park (1993)". */
  note: z.string().optional(),
  youtube: z.string().default(""),
});

export const videosSchema = z.object({
  version: z.number().default(1),
  intro: z.object({
    eyebrow: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
  }),
  videos: z.array(tributeVideoSchema).default([]),
});

export type Videos = z.infer<typeof videosSchema>;

/** A card as consumed by components: the pasted link resolved to an id. */
export type TributeVideo = z.infer<typeof tributeVideoSchema> & {
  youtubeId: string | null;
};

/**
 * Extract the 11-character video id from anything YouTube-shaped:
 * a bare id, watch?v=, youtu.be/, /embed/, /shorts/, /live/.
 */
export function youtubeIdFrom(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed);
    if (url.hostname === "youtu.be") {
      const id = url.pathname.slice(1, 12);
      return /^[\w-]{11}$/.test(id) ? id : null;
    }
    const v = url.searchParams.get("v");
    if (v && /^[\w-]{11}$/.test(v.slice(0, 11))) return v.slice(0, 11);
    const match = url.pathname.match(/\/(?:embed|shorts|live)\/([\w-]{11})/);
    if (match) return match[1];
  } catch {
    // not a URL and not a bare id — fall through
  }
  return null;
}
