import audioData from "@/content/audio.json";
import { audioSchema } from "../schemas/audio";
import { validateConfig } from "@/src/lib/validation/validate";

export const audio = validateConfig(audioSchema, audioData, "audio.json");
