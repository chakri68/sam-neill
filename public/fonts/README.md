# Fonts

## Tribeca (display face)

Drop the font files here:

- `tribeca.woff2`  (required)
- `tribeca.woff`   (optional fallback)

The `@font-face` in `app/globals.css` already points at `/fonts/tribeca.woff2`.
Until the files exist, the site silently falls back to `"Arial Black"` — no
build error. Tribeca is **free for personal use only**; do not commit the file
to a public repo or use it commercially without a licence.

To swap the display font entirely, change `--font-display` in `app/globals.css`
and `fonts.display` in `content/theme.json`.
