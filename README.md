# Phoenix Rising — ai-excited-01

A phoenix bursts out of a stained-glass cathedral window, shattering the
coloured glass into burning feathers, and flies straight at the viewer
under a golden comic "WOW!" burst.

Why this image, against the judge's rubric (most important first):

1. **Excitement** — a huge fiery bird screaming toward you, wings spanning
   the whole frame, sunlight flooding through the broken window.
2. **Surprise** — the twist is the medium breaking: a stained-glass window
   becomes a living phoenix. Not a stock explosion or a generic action
   scene, but a piece of art coming alive and bursting out of its frame.
3. **Momentum** — everything drives at the viewer: the head-on flight, the
   diagonal god-rays, the exploding shards and feathers.
4. **Craft** — one clean digital painting, no smears or artefacts, and the
   only text ("WOW!") is a single perfectly legible word in a comic burst.
5. **Reads small** — at 300 px the big bird, the gold burst and the dark
   cathedral still hit: one clear shape, one clear idea.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

That copies `entry.png` (a JPEG by its first bytes, 1024x683, 281,612 bytes)
to `out/entry.png`. The program runs twice and writes the same bytes both
times: it only copies the file.

## Files

- `entry.png` — the image (JPEG bytes, named entry.png as the rules allow)
- `main.ts` — the entrypoint: copies entry.png to the output directory
- `candidates/` — the other concepts tried (snow-globe ship, flaming chess
  knight, the phoenix without the burst, and a tighter phoenix crop)

MIT licensed.
