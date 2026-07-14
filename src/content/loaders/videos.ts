import videosData from "@/content/videos.json";
import {
  videosSchema,
  youtubeIdFrom,
  type TributeVideo,
} from "../schemas/videos";
import { validateConfig } from "@/src/lib/validation/validate";

const parsed = validateConfig(videosSchema, videosData, "videos.json");

/** Cards with their pasted link resolved to a playable id (or null). */
export const videos: TributeVideo[] = parsed.videos.map((video) => ({
  ...video,
  youtubeId: youtubeIdFrom(video.youtube),
}));

export const videosIntro = parsed.intro;
