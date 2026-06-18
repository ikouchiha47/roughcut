# kinecut

A Remotion-based video engine for building short-form vertical videos from a scene DSL. Write a spec, preview in Remotion Studio, export.

![demo](public/example/demo.gif)

---

## What it is

- **Platform** - generic scene engine: text, screenshot, slideshow, chips, lockup, effects, overlays, presets, motions
- **Projects** - your videos live in `src/projects/<name>/`, gitignored by default
- **Example** - a working project in `src/projects/example/` showing all scene types

---

## Quick start

```bash
npm install

# Add your images
node scripts/collect-assets.js \
  --dest     public/example \
  --manifest src/projects/example/assets.yaml \
  --name screen --src /path/to/screenshot.png

# Preview
npm run preview
# -> http://localhost:3000
```

---

## Adding a project

1. Copy `src/projects/example/` to `src/projects/<your-project>/`
2. Add `"<your-project>"` to `projects.json`
3. Run `npm run preview`

`scripts/sync-projects.js` auto-generates the import glue - you never touch `Root.tsx`.

---

## Scene types

| Type | Description |
|------|-------------|
| `text` | Bold lines animating in independently |
| `screenshot` | Single image with camera motion + element overlays |
| `slideshow` | Multiple images with horizontal swipe |
| `chips` | Elements radiating from center (radiate / radial-spoke) |
| `lockup` | Branding end card - word slam + logo |

See `references/scene-types.md` for all fields.

---

## Built-in overlays

`core:vignette` · `core:film-grain` · `core:lens-flare` · `core:color-grade` · `core:light-leak` · `core:confetti`

---

## Workflow

Read `SKILLS.md` - it walks through the full 5-stage workflow (Collect -> Understand -> Propose -> Refine -> Build) designed to be driven by an AI agent in Claude Code.

---

## Stack

- [Remotion](https://remotion.dev) - React-based video renderer
- TypeScript
- No runtime dependencies beyond Remotion + React
