import quotesData from "@/content/quotes.json";
import { quotesSchema } from "../schemas/quotes";
import { validateConfig } from "@/src/lib/validation/validate";

export const quotes = validateConfig(quotesSchema, quotesData, "quotes.json");
