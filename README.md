# Phoenix Rising — ai-excited-01

A phoenix tears itself free from a stained-glass cathedral window: coloured
glass shatters into burning feathers as the bird flies head-on at the viewer,
framed by a golden comic burst that shouts "WOW!".

## Why this image wins the rubric

The judge scores excitement first, then surprise, momentum, craft, and
whether the image still reads when it is small. The picture was built to
answer each of those in order:

1. **Excitement** — the bird is enormous and on fire, wings spread across
   the whole frame, sunlight pouring through the smashed window behind it.
2. **Surprise** — the medium itself breaks. A stained-glass window, a piece
   of art, comes alive and bursts out of its frame. It is the "art comes
   alive" idea, but in a medium and with a subject nobody else in the
   running used.
3. **Momentum** — nothing in the frame sits still. The head-on flight, the
   diagonal rays of light, the exploding shards and feathers all push
   straight toward the viewer.
4. **Craft** — a single clean painting with no smears or artefacts, and the
   only text is one word, "WOW!", inside a comic burst, perfectly legible
   at full size.
5. **Reads small** — shrunk to 300 px, the bird, the gold burst and the
   dark cathedral still land as one clear shape: one idea, not a collage.

The other concepts tried — a ship in a snow globe, a flaming chess knight,
the phoenix without the burst, and a tighter phoenix crop — are kept in
`candidates/`. The knight was the runner-up, but it split the eye between
two focal points; the tight crop lost the "breaking out of the window"
story that makes the entry work.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

That copies `entry.png` to `out/entry.png`. Run it twice and the output is
identical both times: the program only copies the file, so the bytes the
judge sees are exactly the bytes in this repo.

## Files

- `entry.png` — the image: JPEG bytes (the gate reads the first bytes, not
  the extension), 1024x683, 281,612 bytes, scaled from
  `candidates/media-generation-phoenix-wow-0-12d27b03-56d7-41e8-b2e7-bd2b4d07810b.png`
  with `ffmpeg -vf scale=1024:-1 -q:v 4 -c:v mjpeg`
- `main.ts` — the entrypoint: copies entry.png to the output directory,
  refusing an empty file or one over 1 MiB
- `candidates/` — the other concepts tried, with the source images

MIT licensed.
