import galleryData from "@/content/gallery.json";
import { gallerySchema } from "../schemas/gallery";
import { validateConfig } from "@/src/lib/validation/validate";

export const gallery = validateConfig(gallerySchema, galleryData, "gallery.json");
