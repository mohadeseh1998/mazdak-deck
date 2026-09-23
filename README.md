# Mazdak Atlantic AgriAqua investor deck

A five-slide, keyboard-driven presentation built from `mazdak-pitch-deck-build-brief.md` (the single source of truth). Vite, React and TypeScript, plain CSS, no UI framework.

## Run it

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # static build in dist/, opens from any subpath or straight from disk
```

`dist/index.html` also works when double-clicked from a USB stick: the build emits one classic script, so it does not need a web server.

## Presenter keys

| Key | Action |
|---|---|
| Right, Space, Page Down | Next slide |
| Left, Shift+Space, Page Up | Previous slide |
| Home, End | First, last slide |
| A | Audit mode: highlight every unproven claim, with a count in the footer |
| N | Presenter note for the current slide |
| S | Source register |
| Escape | Close the note, sources or lightbox; leave the video panel |

Deep links: `#/1` to `#/5`. Moving the mouse shows on-screen arrows for 2.5 seconds.

## Where things live

- `src/content/chemistry.ts`: the chelating agent, named once. Change it here and every slide follows.
- `src/content/slides.ts`: all copy, verbatim from the brief, plus presenter notes.
- `src/content/claims.ts`: every assumption and how it gets proven (the hover card text).
- `src/content/sources.ts`: the source register behind every source line.
- `assets/`: the client's images. They are picked up by a build-time glob, so a missing file degrades gracefully and a new one appears on the next build (or instantly in dev).

## Dropping in new assets

- `assets/problem-chlorosis.jpg`: fills the right 38 percent of the Problem slide.
- `assets/demo.mp4`: the video panel plays this local file first, then YouTube, then falls back to the poster and a link. Recommended, so the most important slide does not depend on venue wifi.

## Content guard

`npm run check` (also run by `npm run build` and a pre-commit hook in `.githooks/`) fails on the em dash character anywhere in the repository, on the chelate being named outside `chemistry.ts`, on DTPA other than as the Fe-DTPA product growers buy, and on any withdrawn claim from Section 11 of the brief.

## Open questions for the client

Search the code for `BRIEF-QUESTION` for each decision made where the brief was ambiguous or could not be met exactly. In short:

1. The approved copy does not fit the 1600 by 900 canvas at the specified sizes on slides 2 to 4, so dense columns use 15 to 18px body text and top margins are tighter than 96px.
2. `--slate` fails WCAG AA as text on both grounds and `--iron` fails 3:1 as a focus ring on `--ink`; the nearest passing variants are in `tokens.css`.
3. `field-trials.jpg` is a four-panel strip, so it is shown whole (not cropped to 4:3) under the left column of slide 3.
4. Keystrokes inside the YouTube player never reach the page, so Escape cannot be caught there; the hint says to click outside instead. Embedding must be enabled on the unlisted video in YouTube Studio before the dry run.
5. The video duration caption ("Two minutes") is a placeholder until the real runtime is known.
6. Slide 5 column one has no heading in the approved copy; it uses "How we make money" from the brief's own description.
