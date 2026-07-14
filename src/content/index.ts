/**
 * The single entry point for content. Components depend on these normalized
 * interfaces, not on the raw JSON files — so the backing store can move to a
 * CMS later without touching component code.
 */
export { site, isFeatureEnabled } from "./loaders/site";
export { assets, getImage, getTexture } from "./loaders/assets";
export { theme } from "./loaders/theme";
export { timeline, getTimelineEntry } from "./loaders/timeline";
export { presets, getPreset, resolveEntryVisual } from "./loaders/presets";
export { videos, videosIntro } from "./loaders/videos";
export { gallery } from "./loaders/gallery";
export { audio } from "./loaders/audio";
export type { AudioConfig, AudioTrack, AudioAnecdote } from "./schemas/audio";
export type { Preset } from "./schemas/presets";
export type { TributeVideo, Videos } from "./schemas/videos";
export type { Gallery } from "./schemas/gallery";

export type { Site, FeatureFlags } from "./schemas/site";
export type { Assets } from "./schemas/assets";
export type { Theme } from "./schemas/theme";
export type { Timeline, TimelineEntry } from "./schemas/timeline";
export type { ImageAsset, TextureAsset } from "./schemas/image";
export {
  resolveObjectPosition,
  imageAssetSchema,
  textureAssetSchema,
} from "./schemas/image";
