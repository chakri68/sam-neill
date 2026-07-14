import themeData from "@/content/theme.json";
import { themeSchema, type Theme } from "../schemas/theme";
import { validateConfig } from "@/src/lib/validation/validate";

export const theme: Theme = validateConfig(themeSchema, themeData, "theme.json");

export type { Theme } from "../schemas/theme";
