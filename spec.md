# Content Configuration and Asset Management

The website must be designed so that its editorial content can be updated without modifying application components.

All photographs, posters, background images, thumbnails, timeline entries, movie recommendations, text labels, and external links must be loaded from configuration files or a content source.

No content-specific image path or timeline event should be hardcoded inside React components.

---

## Replaceable Images

Every image displayed on the website must be replaceable through configuration.

This includes:

- Landing-page portrait
- Timeline photographs
- Movie posters
- Memory Machine backgrounds
- Transition images
- Popup illustrations
- Movie Suggestor artwork
- Open Graph image
- Fallback images
- Decorative textures
- Final tribute image

Components should receive image information as data rather than importing a specific image directly.

### Image Configuration

Each image should support:

```ts
interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  focalPoint?: {
    x: number;
    y: number;
  };
  objectPosition?: string;
  caption?: string;
  credit?: string;
  creditUrl?: string;
  blurDataUrl?: string;
}
```

Example:

```json
{
  "src": "/images/timeline/jurassic-park.jpg",
  "alt": "Sam Neill as Dr. Alan Grant in Jurassic Park",
  "focalPoint": {
    "x": 0.52,
    "y": 0.34
  },
  "caption": "Sam Neill as Dr. Alan Grant",
  "credit": "Universal Pictures"
}
```

The `focalPoint` or `objectPosition` field allows editors to control how an image is cropped on different screen sizes.

---

## Asset Registry

Shared images should be stored in a central asset registry.

File:

```text
/content/assets.json
```

Example:

```json
{
  "heroPortrait": {
    "src": "/images/sam-neill-hero.jpg",
    "alt": "Portrait of Sam Neill",
    "objectPosition": "center 25%"
  },
  "memoryBackground": {
    "src": "/images/memory-machine-background.jpg",
    "alt": "",
    "objectPosition": "center"
  },
  "moviePopupTexture": {
    "src": "/images/projector-texture.webp",
    "alt": ""
  },
  "finalTributePortrait": {
    "src": "/images/sam-neill-final.jpg",
    "alt": "Sam Neill smiling",
    "objectPosition": "center 20%"
  },
  "socialPreview": {
    "src": "/images/og-image.jpg",
    "alt": "Sam Neill — The Memory Machine"
  }
}
```

Decorative images should use an empty `alt` value.

Meaningful images must include descriptive alternative text.

---

## Image Component

Create one reusable image component for the entire website.

```tsx
<TributeImage
  asset={image}
  sizes="(max-width: 768px) 100vw, 50vw"
  priority={false}
/>
```

The component should handle:

- Responsive image sizing
- Lazy loading
- Image optimization
- Focal-point positioning
- Placeholder display
- Missing-image fallback
- Credits and captions
- Reduced-data behavior
- Graceful loading errors

If an image cannot be loaded, the page must remain visually usable and display either a configured fallback or a subtle neutral placeholder.

---

# Configurable Timeline

The complete timeline must be generated from JSON.

Timeline entries, dates, copy, images, layouts, links, and visual behavior must not be hardcoded into the timeline components.

Primary file:

```text
/content/timeline.json
```

The order of entries in this file determines their display order unless an explicit `order` field is supplied.

---

## Timeline Configuration Schema

```ts
type TimelineEntryType =
  | "life"
  | "career"
  | "film"
  | "television"
  | "award"
  | "personal"
  | "tribute";

type TimelineLayout =
  | "image-left"
  | "image-right"
  | "full-image"
  | "text-only"
  | "gallery"
  | "quote";

interface TimelineEntry {
  id: string;
  order?: number;
  date: string;
  displayDate?: string;
  endDate?: string;
  type: TimelineEntryType;
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  layout?: TimelineLayout;
  images?: ImageAsset[];
  quote?: {
    text: string;
    attribution?: string;
  };
  relatedMovies?: string[];
  links?: {
    label: string;
    url: string;
    type?: "article" | "video" | "interview" | "external";
  }[];
  tags?: string[];
  featured?: boolean;
  hidden?: boolean;
  theme?: {
    background?: string;
    foreground?: string;
    accent?: string;
  };
  animation?: {
    preset?: string;
    intensity?: "subtle" | "normal" | "cinematic";
  };
}
```

---

## Example Timeline JSON

```json
{
  "version": 1,
  "title": "The Life of Sam Neill",
  "intro": {
    "eyebrow": "A life in stories",
    "title": "Sam Neill",
    "description": "An exploration of the life, work, and characters that became part of our memories."
  },
  "entries": [
    {
      "id": "born-1947",
      "date": "1947-09-14",
      "displayDate": "1947",
      "type": "life",
      "title": "A story begins",
      "subtitle": "Omagh, Northern Ireland",
      "description": "Sam Neill was born before later growing up in New Zealand.",
      "layout": "image-right",
      "images": [
        {
          "src": "/images/timeline/early-life.jpg",
          "alt": "An early photograph of Sam Neill",
          "objectPosition": "center"
        }
      ],
      "tags": ["early-life"]
    },
    {
      "id": "jurassic-park-1993",
      "date": "1993-06-11",
      "displayDate": "1993",
      "type": "film",
      "title": "Welcome to Jurassic Park",
      "subtitle": "Dr. Alan Grant",
      "description": "Sam Neill introduced a generation to one of cinema's most beloved scientists.",
      "longDescription": "The role of Dr. Alan Grant became one of the defining performances of his career and inspired countless childhood fascinations with dinosaurs, fossils, and science.",
      "layout": "full-image",
      "images": [
        {
          "src": "/images/timeline/jurassic-park.jpg",
          "alt": "Sam Neill portraying Dr. Alan Grant",
          "focalPoint": {
            "x": 0.5,
            "y": 0.3
          },
          "credit": "Universal Pictures"
        }
      ],
      "relatedMovies": ["jurassic-park"],
      "featured": true,
      "tags": ["jurassic-park", "alan-grant", "film"]
    }
  ]
}
```

---

## Timeline Rendering Requirements

The timeline renderer must:

- Read all entries from `timeline.json`
- Validate the configuration before rendering
- Sort entries by `order` or date
- Ignore entries where `hidden` is `true`
- Support entries with no images
- Support one or multiple images
- Render layouts based on the `layout` value
- Use stable IDs for navigation and deep links
- Allow direct URLs such as `/timeline#jurassic-park-1993`
- Gracefully handle optional or missing fields
- Display a development warning for invalid entries
- Avoid crashing the entire timeline because of one malformed entry

Unknown layout or animation values should fall back to safe defaults.

---

## Timeline Configuration Validation

Use a runtime schema validator such as Zod.

```ts
const timelineSchema = z.object({
  version: z.number(),
  title: z.string(),
  intro: z.object({
    eyebrow: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
  }),
  entries: z.array(timelineEntrySchema),
});
```

Validation should happen during the build or server startup.

Invalid production configuration should produce a clear logged error and omit only the affected entry where possible.

---

## Timeline Presets

Timeline components should use reusable visual presets rather than entry-specific code.

Examples:

```text
life-default
career-breakthrough
film-feature
award-highlight
quote-interlude
tribute-final
```

A timeline entry can select a preset through JSON:

```json
{
  "animation": {
    "preset": "film-feature",
    "intensity": "cinematic"
  }
}
```

Adding a new event should normally require only a JSON update and new image assets.

---

# Configurable Site Content

Other sections should follow the same architecture.

Recommended files:

```text
/content/site.json
/content/assets.json
/content/timeline.json
/content/movies.json
/content/memory-machine.json
/content/countries.json
```

### `site.json`

Contains:

- Website title
- Hero copy
- Navigation labels
- Transition copy
- Footer copy
- Final tribute text
- Social metadata
- Feature flags

### `movies.json`

Contains:

- Movie titles
- Release years
- Sam Neill's roles
- Posters
- Descriptions
- Runtime
- Mood categories
- Trailer links
- Recommendation weights

### `memory-machine.json`

Contains:

- Memory-section headings
- Form labels
- Popup labels
- Empty states
- Submission confirmation copy
- Search suggestions
- Moderation notices
- Movie Suggestor mood options

---

# Feature Flags

Optional experiences should be configurable without deleting code.

```json
{
  "features": {
    "memorySubmission": true,
    "movieSuggestor": true,
    "memorySearch": true,
    "memoryStatistics": false,
    "constellations": true,
    "audio": false,
    "easterEggs": true
  }
}
```

This allows unfinished or temporarily unavailable features to be disabled safely.

---

# Content Editing Workflow

The initial version may use JSON files committed to the repository.

Content update process:

1. Add or replace an image in the public asset directory.
2. Update its path and metadata in the appropriate JSON file.
3. Add, remove, hide, or reorder timeline entries.
4. Run content validation.
5. Preview the website locally.
6. Deploy the updated configuration.

Future versions may move the same data structures to a headless CMS without requiring major component rewrites.

Potential CMS options:

- Sanity
- Contentful
- Strapi
- Directus
- Payload CMS

The frontend should depend on normalized content interfaces rather than directly depending on JSON-file imports. This makes migrating to a CMS easier later.

---

# Content Repository Structure

```text
src/
  components/
    timeline/
    memory-machine/
    movie-suggestor/
    shared/
  content/
    loaders/
    schemas/
    types/
  lib/
    assets/
    validation/

content/
  site.json
  assets.json
  timeline.json
  movies.json
  memory-machine.json

public/
  images/
    hero/
    timeline/
    movies/
    memory-machine/
    textures/
    fallbacks/
```

---

# Definition of Done

The content system is complete when:

- A timeline event can be added without editing a React component.
- A timeline event can be hidden through JSON.
- Timeline entries can be reordered through configuration.
- Every visible image can be replaced by changing configuration.
- Images support alt text, credits, and crop positioning.
- Missing images do not break layouts.
- Movie Suggestor posters and copy come from `movies.json`.
- Landing-page and Memory Machine images come from the asset registry.
- Configuration files are validated before deployment.
- Components contain presentation logic but no Sam Neill-specific content.
