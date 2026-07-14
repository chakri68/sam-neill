# Sam Neill Tribute Website

## Visual Design Document

> **One life. Millions of memories.**

---

# 1. Visual Direction

The website should feel like a quiet, cinematic memorial built from:

- archival photography
- old film projection
- field journals and expedition records
- deep night skies
- subtle Jurassic Park visual references
- restrained 1990s adventure-film typography

The design must not resemble:

- a franchise marketing website
- a dinosaur attraction
- a movie database
- a fan wiki
- a theme-park interface
- a generic celebrity memorial page

Jurassic Park should influence the visual language because of its emotional importance, but it should not consume Sam Neill’s entire identity.

The visual balance should be approximately:

```text
50% cinematic memorial
25% archival biography
15% Jurassic-inspired adventure
10% celestial Memory Machine
```

---

# 2. Core Experience

The website contains two distinct primary experiences:

1. **The Timeline**
2. **The Memory Machine**

They should not appear side by side or simultaneously.

Each section has its own atmosphere.

## Timeline atmosphere

- warm
- earthly
- archival
- photographic
- tactile
- historical

## Memory Machine atmosphere

- dark
- celestial
- immersive
- interactive
- communal
- slightly magical

The transition between them should feel like leaving an archive room at night and stepping outside beneath a sky full of stars.

---

# 3. Typography

## 3.1 Display Typeface

Use **Tribeca** for major display headings and Jurassic-inspired moments.

Tribeca should be treated as a decorative display font, not as the site’s general-purpose typeface.

Suitable uses:

- “SAM NEILL”
- Timeline chapter headings
- Major years
- Movie Suggestor title
- Final tribute lines
- Section transition titles
- Individual featured-film names
- Short labels such as “THE MEMORY MACHINE”

Avoid using Tribeca for:

- body copy
- form fields
- navigation items
- long quotations
- memory submissions
- buttons containing more than three words
- accessibility-critical text
- mobile paragraphs

## 3.2 Usage Rules

Tribeca text should normally be:

- uppercase
- large
- widely spaced
- used in short phrases
- given generous line height
- surrounded by substantial whitespace

Suggested CSS:

```css
.font-display {
  font-family: "Tribeca", "Arial Black", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.045em;
  line-height: 0.9;
}
```

Because display fonts can become difficult to read, never use Tribeca below approximately:

```text
24px on mobile
30px on desktop
```

For very large hero text:

```text
Mobile: 56–76px
Tablet: 84–112px
Desktop: clamp(96px, 12vw, 190px)
```

## 3.3 Secondary Serif Typeface

Use an editorial serif for emotional writing, timeline descriptions, quotations, and memories.

Recommended options:

- Cormorant Garamond
- EB Garamond
- Libre Baskerville
- Source Serif 4
- Instrument Serif

Preferred choice:

```text
Cormorant Garamond
```

It creates an old-cinema and literary-biography feeling without appearing overly formal.

Use for:

- memory stories
- timeline narrative
- quotations
- emotional transition copy
- introductory paragraphs
- final tribute text

Example:

```css
.font-editorial {
  font-family: "Cormorant Garamond", Georgia, serif;
  font-weight: 400;
  line-height: 1.45;
}
```

## 3.4 UI Typeface

Use a highly legible sans-serif for controls and metadata.

Recommended options:

- Inter
- Geist
- IBM Plex Sans
- Manrope
- Neue Montreal, where licensed

Preferred choice:

```text
Geist
```

Use for:

- buttons
- navigation
- filters
- dates
- credits
- form labels
- movie metadata
- accessibility controls
- memory counters

## 3.5 Type Hierarchy

### Hero display

```text
Tribeca
96–190px
Uppercase
Tightly stacked
```

### Section title

```text
Tribeca
56–112px
Uppercase
```

### Timeline year

```text
Tribeca or Geist Mono
64–160px
```

### Editorial heading

```text
Cormorant Garamond
38–72px
```

### Body copy

```text
Cormorant Garamond
20–26px
```

### Interface label

```text
Geist
12–15px
Uppercase
Letter spacing: 0.08em
```

### Metadata

```text
Geist
13–16px
```

---

# 4. Colour System

The palette should derive from:

- faded cinema posters
- black volcanic soil
- deep forest foliage
- fossil bone
- Jurassic Park amber and red
- projected film light
- night skies

## 4.1 Primary Palette

```css
:root {
  --black: #080907;
  --charcoal: #11130f;
  --deep-green: #162018;
  --forest: #27372a;

  --bone: #e7dfcc;
  --paper: #d6cdb8;
  --muted-paper: #aaa28f;

  --amber: #d49a3a;
  --fossil-amber: #b87925;

  --tribute-red: #9e3027;
  --dark-red: #5f211d;

  --night: #080b14;
  --night-blue: #111827;
  --star: #ece6d7;
}
```

## 4.2 Jurassic Red

Red should be used sparingly.

Appropriate uses:

- active timeline marker
- selected mood
- small underlines
- movie-ticket edges
- submission confirmation
- a featured Jurassic Park milestone
- one visual accent in the hero

Do not use red as the default button colour throughout the website.

Too much red would make the site resemble franchise merchandise.

## 4.3 Amber

Amber should be the primary interactive accent.

Use it for:

- stars
- focus rings
- hover glows
- timeline progress
- important metadata
- links
- projector light
- selected memory nodes

Amber communicates both cinema projection and preserved history.

## 4.4 Section Palettes

### Timeline

```text
Background: charcoal / forest-black
Text: bone
Accent: aged amber
Secondary accent: muted red
```

### Memory Machine

```text
Background: night-black
Text: pale bone
Accent: star white
Interactive accent: amber
Secondary accent: muted blue
```

---

# 5. Texture and Material

The interface should not be perfectly flat.

Use subtle layered textures:

- film grain
- paper fibre
- dust particles
- projector flicker
- scratched film
- aged photograph edges
- faint topographic or fossil contour lines

Textures must remain subtle.

Recommended opacity:

```text
Film grain: 2–5%
Paper texture: 4–8%
Dust: 8–16%
Scratches: below 4%
```

Never place a strong texture behind long body copy.

## Texture configuration

All textures must be replaceable through the asset registry.

```json
{
  "textures": {
    "filmGrain": {
      "src": "/images/textures/film-grain.webp",
      "opacity": 0.04
    },
    "paper": {
      "src": "/images/textures/paper.webp",
      "opacity": 0.06
    },
    "projectorDust": {
      "src": "/images/textures/projector-dust.webp",
      "opacity": 0.12
    }
  }
}
```

---

# 6. Global Layout

Use a wide cinematic layout.

```text
Maximum content width: 1440px
Editorial text width: 620–760px
Page gutters:
- mobile: 20px
- tablet: 40px
- desktop: 64–96px
```

Most sections should occupy at least one viewport height.

Avoid placing content inside conventional cards unless the interaction specifically requires one.

Images should often bleed beyond the grid.

Use asymmetrical composition.

The site should feel art-directed rather than generated from a repeated component library.

---

# 7. Navigation

Navigation should be minimal and persistent.

Desktop:

```text
SAM NEILL                      TIMELINE   MEMORIES   WATCH
```

Mobile:

```text
SAM NEILL                                  MENU
```

Style:

- transparent initially
- small uppercase Geist
- bone text
- subtle blurred background after scrolling
- 1px bottom border after leaving the hero

The active section should be indicated with a tiny amber dot rather than a heavy underline.

## Navigation behaviour

Selecting “Timeline” should navigate to the Timeline experience.

Selecting “Memories” should transition into the Memory Machine.

The navigation should never display the Timeline and Memory Machine together.

---

# 8. Landing Page

## 8.1 Composition

The hero fills the viewport.

A replaceable portrait of Sam occupies approximately:

```text
Desktop: right 55–65%
Mobile: full background
```

The portrait should not be perfectly centred.

Prefer a candid or thoughtful image rather than a red-carpet photograph.

The left side contains:

```text
SAM
NEILL
```

in very large Tribeca lettering.

Below:

```text
1947 — 2026
```

Then:

```text
One life.
Millions of memories.
```

## 8.2 Image Treatment

The hero photograph should use:

- desaturated colour
- warm highlights
- crushed dark greens
- mild grain
- subtle dark gradient behind text

Avoid pure black-and-white unless the chosen image specifically benefits from it.

## 8.3 Jurassic Reference

A very thin dark-red circular arc may sit partially behind the name.

It should suggest the shape of the Jurassic Park logo without reproducing the trademarked logo or dinosaur emblem.

This reference should be abstract enough that it reads as a design motif rather than imitation.

## 8.4 Scroll Prompt

At the bottom:

```text
EXPLORE HIS LIFE
```

Beside a thin vertical amber line that slowly grows downward.

No bouncing arrow.

---

# 9. Timeline Section

## 9.1 Opening Screen

The hero fades into black.

A title appears:

```text
A LIFE
IN STORIES
```

Tribeca, centred.

Underneath in serif:

```text
Before the memories, there was the life that created them.
```

## 9.2 Timeline Structure

The timeline should be visually spacious.

Only one major timeline event should dominate the viewport at a time.

Desktop structure:

```text
[ large year ]    [ photograph ]
                  [ event title ]
                  [ description ]
```

The arrangement alternates between image-left and image-right according to JSON configuration.

Mobile structure:

```text
YEAR
IMAGE
TITLE
DESCRIPTION
```

## 9.3 Timeline Line

Do not use a standard solid vertical line.

Instead, use a hand-drawn or brushed path resembling:

- a pencil expedition route
- a fossil excavation mark
- a thin crack in stone
- an animated ink line

The path gradually draws itself as the visitor scrolls.

Colour:

```text
muted amber at 35–60% opacity
```

## 9.4 Year Typography

Years should be enormous and partly cropped by the viewport.

Example:

```text
1993
```

Use either:

- Tribeca for major cultural moments
- Geist Mono for smaller life milestones

The year may sit behind the photograph at low opacity.

## 9.5 Timeline Images

Images should appear like cinematic frames rather than scrapbook polaroids.

Use:

- 3:2
- 4:3
- 16:9
- occasional full-bleed panoramas

Each image can have:

- caption
- credit
- focal point
- crop position
- optional monochrome treatment
- optional hover zoom

All image behaviour must be configurable through JSON.

## 9.6 Featured Milestones

Major films such as Jurassic Park may receive a full-screen feature treatment.

Example:

- background changes to deep forest
- distant ambient insects become audible, when sound is enabled
- title appears in Tribeca
- enormous “1993” sits behind the image
- faint red circle motif appears
- timeline slows slightly while scrolling through the section

This treatment should be reusable through:

```json
{
  "animation": {
    "preset": "film-feature",
    "intensity": "cinematic"
  }
}
```

## 9.7 Quotes

Quotes should interrupt the timeline occasionally.

Full-screen quote layout:

```text
“QUOTE TEXT APPEARS HERE.”
```

Use Cormorant Garamond, not Tribeca.

Attribution beneath in Geist.

The background should contain either:

- a very dark portrait
- softly moving dust
- no image at all

## 9.8 Timeline Ending

The final milestone should not end with a conventional date card.

The timeline path reaches the centre of the screen and gradually transforms into a line of light.

Text:

```text
Every role became
someone’s memory.
```

A button appears:

```text
ENTER THE MEMORY MACHINE
```

When selected, the Timeline visually disappears.

---

# 10. Transition Into the Memory Machine

The transition should be one of the website’s defining moments.

Sequence:

1. Timeline imagery fades to black.
2. The thin amber timeline line remains.
3. The line begins breaking into individual particles.
4. Particles drift outward.
5. Each particle becomes a star.
6. The background shifts from charcoal to deep night-blue.
7. The Memory Machine title fades in.

Duration:

```text
2.0–3.5 seconds
```

The transition should be skippable for reduced-motion users.

Text:

```text
THE MEMORY
MACHINE
```

Tribeca.

Below:

```text
A living archive of the moments his work left behind.
```

---

# 11. Memory Machine

## 11.1 Main Composition

The Memory Machine should feel more open and less editorial than the Timeline.

The primary viewport contains:

- a WebGL or Canvas star field
- memory count
- subtle navigation controls
- floating action buttons
- occasional memory previews

The star field should extend beyond the viewport and respond gently to cursor or device motion.

Avoid excessive parallax.

## 11.2 Stars

Each memory is represented by one star.

Star properties may derive from memory data:

```text
Brightness: recency or featured status
Size: story length or reactions
Hue: movie category
Position: deterministic hash from memory ID
```

A memory’s placement must remain stable across page loads.

Stars should not resemble social-media profile bubbles.

## 11.3 Memory Count

Position near the top-left:

```text
243,812
MEMORIES PRESERVED
```

Number:

- large serif or Tribeca
- animated on entry
- not constantly counting

Label:

- Geist uppercase
- small tracking

## 11.4 Hover Interaction

Hovering or focusing on a star shows a minimal preview:

```text
JURASSIC PARK · INDIA

“I watched it with my sister every time
it appeared on television...”
```

The preview should feel like a piece of projected text suspended in space.

Clicking opens the complete memory.

---

# 12. Memory Detail Popup

All popups belong only to the Memory Machine experience.

## 12.1 Visual Style

Memory popups should resemble a combination of:

- a projected cinema subtitle
- an archival record
- a softly illuminated paper card

Desktop:

```text
Width: 560–720px
Max height: 80vh
```

Mobile:

```text
Near-full-screen bottom sheet
```

Background:

```text
rgba(12, 14, 16, 0.92)
```

With:

- backdrop blur
- 1px warm-white border
- soft amber inner glow
- faint film grain

## 12.2 Content

```text
MOVIE · COUNTRY · YEAR

Memory story in large editorial serif.

— Optional name
Submitted date
```

Controls:

- Close
- Next memory
- Previous memory
- View memories from this movie

Avoid like counters in the initial tribute version.

---

# 13. Share Your Story Popup

## 13.1 Trigger

A persistent floating control appears inside the Memory Machine:

```text
+ SHARE A MEMORY
```

Desktop:

- bottom-left
- compact pill or circular-plus control

Mobile:

- fixed bottom action button

## 13.2 Form Design

The popup begins with:

```text
TELL US
ONE STORY
```

Tribeca.

Supporting copy:

```text
A moment, a film, a person you watched with,
or something his work left with you.
```

Fields should feel spacious.

```text
Your memory
Movie or programme
Country
Your name — optional
Your age when it happened — optional
```

The story textarea should be the visual focus.

Avoid overly formal field borders.

Use a single thin underline or translucent filled field.

## 13.3 Submission Animation

After submission:

1. Form fades.
2. User’s words reduce into a small glowing point.
3. The point travels into the star field.
4. A new star appears.
5. Confirmation text displays.

```text
YOUR MEMORY
IS NOW PART OF THE SKY
```

Do not show a generic success toast.

---

# 14. Movie Suggestor

## 14.1 Trigger

The Movie Suggestor appears only in the Memory Machine.

Use a floating cinema-ticket control:

```text
NEED A FILM TONIGHT?
```

Position:

```text
Desktop: bottom-right
Mobile: inside the Memory actions tray
```

Shape:

- slightly irregular ticket edge
- dark paper
- thin amber outline
- tiny perforation marks

The ticket should unfold or expand into the popup.

## 14.2 Popup Opening

When opened:

- star field blurs
- projector beam sweeps across the modal
- faint mechanical click plays when sound is enabled
- title appears

```text
WHAT SHOULD
YOU WATCH?
```

Use Tribeca.

## 14.3 Mood Selection

Mood options should appear as large typographic rows rather than conventional radio buttons.

```text
ADVENTURE
SOMETHING STRANGE
WARM AND FUNNY
DARK AND UNSETTLING
CLASSIC SAM
SURPRISE ME
```

Hovering a mood:

- shifts it slightly right
- illuminates a small amber indicator
- reveals a one-line description

Selected moods use muted Jurassic red.

## 14.4 Selection Sequence

After choosing:

```text
SEARCHING THE ARCHIVE
```

Years rapidly cycle:

```text
1981
1993
1997
2004
2016
```

Then stop.

Use a subtle film splice or projector shutter animation.

Do not make the sequence longer than approximately 1.2 seconds.

## 14.5 Recommendation Card

The card contains:

```text
Poster
Film title
Release year
Character
Runtime
Short explanation
```

Title may use Tribeca when short.

Body uses serif.

Metadata uses Geist.

Actions:

```text
WATCH TRAILER
ANOTHER SUGGESTION
CLOSE
```

## 14.6 Connected Memories

Below the recommendation:

```text
WHY PEOPLE REMEMBER IT
```

Show up to three related fan memories.

They should appear as short serif excerpts separated by thin lines.

This connects the utility of the movie recommendation back to the emotional purpose of the site.

---

# 15. Search and Filters

Memory search should open as a floating overlay inside the Memory Machine.

Search field:

```text
Search films, places, people or memories...
```

Suggested searches:

```text
Jurassic Park
Childhood
My father
Dinosaurs
Event Horizon
New Zealand
```

Filters may appear as small outlined chips.

Use Geist, never Tribeca, for search controls.

Results should remain visually connected to the star field.

Selecting a result should cause its corresponding star to brighten and move into focus.

---

# 16. Final Memory Sequence

The Memory Machine should have an optional guided ending.

After enough exploration, a quiet prompt appears:

```text
SEE THE WHOLE SKY
```

Selecting it hides all interface controls.

The camera slowly pulls back.

Thousands of stars become visible.

Several stars gently connect for a moment, forming an abstract constellation rather than a literal portrait.

Text appears one line at a time:

```text
ACTORS LEAVE.
```

```text
STORIES DON’T.
```

```text
MEMORIES CERTAINLY DON’T.
```

Final action:

```text
SHARE YOURS
```

The UI returns after interaction or a brief pause.

---

# 17. Buttons

Buttons should feel cinematic and tactile, not like SaaS controls.

## Primary button

```text
Bone text
Transparent background
1px amber border
Uppercase Geist
```

Hover:

- background becomes amber
- text becomes black
- slight glow
- no dramatic scale

## Secondary button

```text
Text only
Small arrow
Muted bone
```

Hover:

- arrow shifts 4px
- text brightens

## Destructive or cancel action

Use muted paper text.

Avoid bright red destructive buttons unless moderation tools are introduced.

---

# 18. Icons

Use a minimal line-icon set.

Suitable styles:

- Lucide
- custom 1.5px SVG icons
- simple hand-drawn archival marks

Possible custom icons:

- cinema ticket
- projector
- star
- fossil brush
- film strip
- compass point
- archive tag

Do not use dinosaur icons throughout the interface.

A dinosaur motif should remain an occasional emotional reference.

---

# 19. Motion System

Motion should feel slow, physical, and cinematic.

## Motion vocabulary

- fade
- drift
- reveal
- dissolve
- focus pull
- projector shutter
- dust movement
- line drawing
- subtle image push-in

Avoid:

- bouncy springs
- playful overshoot
- rapid card flips
- excessive cursor followers
- rotating 3D panels
- aggressive scroll hijacking

## Durations

```text
Micro interaction: 120–220ms
Button transition: 180ms
Popup entrance: 350–550ms
Image reveal: 700–1100ms
Section transition: 1200–3000ms
```

## Easing

```css
--ease-cinematic: cubic-bezier(0.22, 1, 0.36, 1);
--ease-soft: cubic-bezier(0.33, 1, 0.68, 1);
```

## Image reveal

Images can reveal through:

- dark mask moving vertically
- exposure fading from black
- blurred-to-focused transition
- simulated projector illumination

Do not use the same reveal for every image.

The chosen preset should come from timeline JSON.

---

# 20. Audio

Audio is optional and disabled by default.

Possible ambient layers:

### Timeline

- quiet wind
- distant birds
- subtle room tone
- projector hum during film milestones

### Memory Machine

- faint atmospheric drone
- extremely subtle stellar ambience
- projector clicks in Movie Suggestor

Provide a visible audio toggle.

Never autoplay audible sound.

Sound URLs and volume must be configurable.

```json
{
  "audio": {
    "enabled": false,
    "timelineAmbience": "/audio/timeline-wind.mp3",
    "memoryAmbience": "/audio/memory-night.mp3",
    "projectorClick": "/audio/projector-click.mp3",
    "defaultVolume": 0.18
  }
}
```

---

# 21. Image Direction

## Suitable images

Use a balanced collection of:

- professional portraits
- candid photographs
- film stills
- behind-the-scenes photography
- interviews
- archival childhood images, where licensed
- landscapes connected to his life
- subtle detail photographs such as scripts or sets

## Avoid

- low-resolution fan edits
- heavily watermarked images
- screenshots with subtitles
- AI-generated portraits presented as authentic
- images without known usage rights
- using only Jurassic Park imagery

## Photography treatment

Create a consistent colour grade:

```text
Saturation: slightly reduced
Contrast: moderate
Highlights: warm
Blacks: mildly green
Grain: subtle
```

Each image must remain replaceable through configuration.

No React component should directly import a Sam Neill photograph.

---

# 22. Responsive Design

## Mobile

The mobile version should remain emotionally rich without reproducing every desktop effect.

Changes:

- simplified star field
- smaller particle count
- single-column Timeline
- reduced image parallax
- popups become bottom sheets
- floating controls combine into one action tray
- Tribeca titles use shorter line lengths
- timeline years may be partially cropped
- disable hover-dependent interactions

## Tablet

Use alternating timeline layouts only where space permits.

## Desktop

Provide:

- large editorial whitespace
- immersive image placement
- cursor-based star response
- wider typography
- layered timeline compositions

---

# 23. Accessibility

The cinematic design must not compromise usability.

Requirements:

- minimum AA contrast for body text
- visible keyboard focus states
- all star memories reachable without precise pointer interaction
- list-based fallback for Memory Machine
- alt text for meaningful images
- captions and credits available to screen readers
- no information represented only by colour
- popup focus trapping
- Escape closes popups
- body scroll restored after popup closure
- minimum 44px touch targets
- adjustable or disabled audio
- reduced-motion support
- no flashing film-burn effects

## Reduced Motion

When `prefers-reduced-motion` is enabled:

- timeline entries fade rather than parallax
- the line-to-stars transition becomes a crossfade
- stars remain mostly static
- projector effects become simple opacity changes
- counters display immediately
- popup movement is minimal

---

# 24. Reduced Data and Performance

When reduced-data mode is detected or selected:

- load static hero artwork
- use a CSS star field instead of WebGL
- remove background video
- disable high-resolution textures
- load timeline images on demand
- avoid ambient audio downloads
- use compressed WebP or AVIF images

Target:

```text
Initial page payload below 1.5 MB where practical
No layout shifts caused by images
60fps on normal desktop hardware
Stable 30–60fps on mid-range mobile hardware
```

---

# 25. Loading Experience

Avoid a percentage-based loading screen unless the immersive assets genuinely require it.

Preferred loading state:

Black screen.

A tiny amber line slowly appears.

Text:

```text
PRESERVING THE STORIES
```

Once essential assets load, the line expands into the hero composition.

The site should still display basic content if WebGL fails.

---

# 26. Empty and Error States

## No memories yet

```text
THE SKY IS QUIET.

Be the first to place a memory here.
```

## Search has no results

```text
NO MEMORY FOUND.

Try another film, place or moment.
```

## Image unavailable

Display:

- dark textured placeholder
- event title
- optional image caption
- no broken-image icon

## Star field unavailable

Display memories in a scrollable editorial list.

---

# 27. Design Tokens

```css
:root {
  --font-display: "Tribeca", "Arial Black", sans-serif;
  --font-editorial: "Cormorant Garamond", Georgia, serif;
  --font-ui: "Geist", Arial, sans-serif;

  --color-black: #080907;
  --color-charcoal: #11130f;
  --color-deep-green: #162018;
  --color-forest: #27372a;

  --color-bone: #e7dfcc;
  --color-paper: #d6cdb8;
  --color-muted: #aaa28f;

  --color-amber: #d49a3a;
  --color-dark-amber: #b87925;
  --color-red: #9e3027;
  --color-dark-red: #5f211d;

  --color-night: #080b14;
  --color-night-blue: #111827;
  --color-star: #ece6d7;

  --space-page-mobile: 20px;
  --space-page-tablet: 40px;
  --space-page-desktop: 72px;

  --radius-small: 4px;
  --radius-medium: 10px;
  --radius-popup: 14px;

  --ease-cinematic: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-soft: cubic-bezier(0.33, 1, 0.68, 1);
}
```

Corners should remain subtle.

Avoid heavily rounded cards and pill-shaped interfaces except for small filters or action controls.

---

# 28. Configurable Visual Content

The visual design must remain entirely content-configurable.

Files:

```text
/content/site.json
/content/assets.json
/content/timeline.json
/content/movies.json
/content/memory-machine.json
/content/theme.json
```

## `theme.json`

```json
{
  "fonts": {
    "display": "Tribeca",
    "editorial": "Cormorant Garamond",
    "ui": "Geist"
  },
  "colours": {
    "black": "#080907",
    "charcoal": "#11130f",
    "deepGreen": "#162018",
    "bone": "#e7dfcc",
    "amber": "#d49a3a",
    "red": "#9e3027",
    "night": "#080b14",
    "star": "#ece6d7"
  },
  "textures": {
    "filmGrain": "filmGrain",
    "timelinePaper": "paper",
    "memoryDust": "projectorDust"
  },
  "motion": {
    "enabled": true,
    "defaultIntensity": "cinematic",
    "timelineTransition": "line-to-stars"
  }
}
```

## Visual preset configuration

```json
{
  "presets": {
    "life-default": {
      "layout": "image-right",
      "background": "charcoal",
      "imageTreatment": "warm-archive",
      "titleFont": "editorial"
    },
    "film-feature": {
      "layout": "full-image",
      "background": "deepGreen",
      "imageTreatment": "cinematic",
      "titleFont": "display"
    },
    "tribute-final": {
      "layout": "text-only",
      "background": "black",
      "titleFont": "editorial"
    }
  }
}
```

---

# 29. Font Loading and Licensing

The Tribeca font file must not be committed or distributed until its licence has been verified for the intended deployment.

The implementation should support replacing it through configuration.

```css
@font-face {
  font-family: "Tribeca";
  src:
    url("/fonts/tribeca.woff2") format("woff2"),
    url("/fonts/tribeca.woff") format("woff");
  font-display: swap;
}
```

Provide a visual fallback stack:

```css
font-family: "Tribeca", "Arial Black", "Arial Narrow", sans-serif;
```

Because the fallback will not perfectly match, layout testing must be performed both before and after the custom font loads.

Avoid using the font as a raster image because:

- it reduces accessibility
- it prevents responsive resizing
- it complicates localisation
- it performs poorly on smaller displays

---

# 30. Final Visual Summary

The final site should feel like:

```text
An old adventure film discovered in an archive,
slowly transforming into a sky made from the
memories of everyone who watched it.
```

The Timeline should make visitors appreciate the scale and variety of Sam Neill’s life.

The Memory Machine should make them feel that his work still exists inside thousands of private moments.

The Jurassic-inspired typography should provide recognition and childhood familiarity, but the photography, serif writing, restrained colour palette, and spacious composition should ensure that the tribute remains about Sam Neill—not only one role he played.

---

# 31. Visual Definition of Done

The visual design is complete when:

- Tribeca is used only for major display moments.
- Body copy remains highly readable.
- Timeline and Memory Machine have clearly distinct atmospheres.
- The two primary sections are never displayed simultaneously.
- The transition from timeline line to stars works smoothly.
- All images and textures can be replaced through configuration.
- Timeline layouts are controlled through JSON presets.
- Movie Suggestor and memory popups exist only in the Memory Machine.
- Jurassic Park influences are recognisable but restrained.
- Mobile retains the emotional character of the desktop experience.
- Reduced-motion and non-WebGL fallbacks are complete.
- No page resembles a generic card grid or movie database.
- Photography credits and usage rights can be stored alongside every asset.
