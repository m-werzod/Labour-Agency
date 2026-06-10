# Self-hosted photography (optional)

By default, real editorial photography is loaded from a CDN (see
`src/config/images.ts`, with photographer credits). **No AI-generated imagery is
used.**

To self-host licensed photography instead:

1. Set `NEXT_PUBLIC_LOCAL_IMAGES=true` in your environment.
2. Add 4K JPGs here using the manifest keys as filenames, e.g.
   `hero.jpg`, `construction.jpg`, `healthcare.jpg`, `team.jpg`, …
   (see the keys in `src/config/images.ts`).

`<SmartImage>` will lazy-load and blur-up these files, and fall back to a branded
placeholder for any missing image so the layout is never broken.
