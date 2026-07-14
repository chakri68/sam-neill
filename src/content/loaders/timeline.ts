import timelineData from "@/content/timeline.json";
import {
  timelineSchema,
  timelineEntrySchema,
  type Timeline,
  type TimelineEntry,
} from "../schemas/timeline";
import { validateConfig, validateEach } from "@/src/lib/validation/validate";

/**
 * Load order:
 *  1. Validate the file envelope (version/title/intro + an array of entries).
 *  2. Validate each entry on its own — invalid ones are dropped, not fatal.
 *  3. Drop hidden entries.
 *  4. Sort by explicit `order`, then by date. Entries without `order` sort
 *     after ordered ones, chronologically.
 */
function loadTimeline(): Timeline {
  const root = validateConfig(timelineSchema, timelineData, "timeline.json");
  const entries = validateEach(timelineEntrySchema, root.entries, "timeline.json")
    .filter((entry) => !entry.hidden)
    .sort(compareEntries);

  return { ...root, entries };
}

function compareEntries(a: TimelineEntry, b: TimelineEntry): number {
  const ao = a.order;
  const bo = b.order;
  if (ao != null && bo != null) return ao - bo;
  if (ao != null) return -1;
  if (bo != null) return 1;
  return a.date.localeCompare(b.date);
}

export const timeline: Timeline = loadTimeline();

/** Look up a single entry by its stable id (for deep links / navigation). */
export function getTimelineEntry(id: string): TimelineEntry | undefined {
  return timeline.entries.find((entry) => entry.id === id);
}

export type { Timeline, TimelineEntry } from "../schemas/timeline";
