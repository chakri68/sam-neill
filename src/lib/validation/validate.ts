import type { z } from "zod";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Validate a whole config file. In development an invalid file throws loudly
 * so it's caught at build/startup (per the spec). In production we log and
 * fall back to the parsed-with-defaults value where possible, so one bad
 * config field can't take down the deployed site.
 */
export function validateConfig<T>(
  schema: z.ZodType<T>,
  data: unknown,
  label: string,
): T {
  const result = schema.safeParse(data);
  if (result.success) return result.data;

  const summary = result.error.issues
    .map((i) => `  · ${i.path.join(".") || "(root)"}: ${i.message}`)
    .join("\n");
  const message = `[content] "${label}" failed validation:\n${summary}`;

  if (isDev) throw new Error(message);
  console.error(message);
  // Best effort: surface something typed rather than crashing the render.
  return data as T;
}

/**
 * Validate an array of items independently. Invalid items are dropped (and
 * warned about) instead of failing the whole collection — used for the
 * timeline so a single malformed entry never blanks the page.
 */
export function validateEach<T>(
  schema: z.ZodType<T>,
  items: unknown[],
  label: string,
): T[] {
  const valid: T[] = [];
  items.forEach((item, index) => {
    const result = schema.safeParse(item);
    if (result.success) {
      valid.push(result.data);
      return;
    }
    const id =
      (item && typeof item === "object" && "id" in item && (item as { id: unknown }).id) ||
      `#${index}`;
    const summary = result.error.issues
      .map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("; ");
    console.warn(`[content] "${label}" skipped invalid entry ${String(id)} — ${summary}`);
  });
  return valid;
}
