import { z } from "zod";

export const themeSchema = z.object({
  fonts: z.object({
    display: z.string(),
    editorial: z.string(),
    ui: z.string(),
  }),
  colours: z.record(z.string(), z.string()),
  textures: z.record(z.string(), z.string()).default({}),
  motion: z
    .object({
      enabled: z.boolean().default(true),
      defaultIntensity: z
        .enum(["subtle", "normal", "cinematic"])
        .default("normal"),
      timelineTransition: z.string().default("line-to-stars"),
    })
    .prefault({}),
});

export type Theme = z.infer<typeof themeSchema>;
