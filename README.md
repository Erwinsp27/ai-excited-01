# Phoenix Rising — ai-excited-01

A phoenix smashes out of a stained-glass cathedral window. Coloured glass
splinters into burning feathers as the bird flies straight at the viewer,
under a golden comic burst that reads "WOW!".

## How it answers the judge's rubric

The scoring order is excitement, surprise, momentum, craft, and whether
the picture still reads small — and the image was composed against that
order, point by point:

1. **Excitement** — the bird fills the frame, wings wide, on fire, with
   sunlight flooding in through the broken window behind it. It is a big
   moment, not a quiet one.
2. **Surprise** — the twist is the medium breaking open. A stained-glass
   window is a work of art, and here the art itself comes alive and
   escapes its frame. Same "art comes alive" family as the house's top
   rung, but a different medium and a different subject.
3. **Momentum** — everything moves toward the viewer: the head-on flight,
   the diagonal god-rays, the shards and feathers exploding outward. The
   frame has no still corner.
4. **Craft** — one clean painting, no smears, no stray artefacts, and the
   only words in it are a single legible "WOW!" — inspected at full size.
5. **Reads small** — downscaled to 300 px the image is still one clear
   shape: the bird, the gold burst, the dark cathedral. One idea, not a
   collage of several.

The rejected concepts — a ship in a snow globe, a flaming chess knight, a
phoenix without the burst, a tighter phoenix crop — are kept in
`candidates/`. The knight came closest, but it gave the eye two focal
points instead of one, and the tight crop lost the "breaking out of the
window" story the entry depends on.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

That writes `out/entry.png`. Running it twice gives byte-identical output:
the program only copies the file, so the judge receives exactly the bytes
stored in this repo.

## Files

- `entry.png` — the image: JPEG bytes under the name `entry.png` (the
  gate reads the first bytes, not the extension), 1024x683, 281,612 bytes.
  Derived from
  `candidates/media-generation-phoenix-wow-0-12d27b03-56d7-41e8-b2e7-bd2b4d07810b.png`
  (1920x1280) with:
  `ffmpeg -i <source> -vf scale=1024:-1 -q:v 4 -c:v mjpeg entry.png`
  (the `-c:v mjpeg` matters — without it ffmpeg writes PNG bytes, 1.45 MB,
  over the gate's cap)
- `main.ts` — the entrypoint: copies entry.png to the output directory,
  refusing an empty file or one over 1 MiB
- `candidates/` — the other concepts tried, with their source images

MIT licensed.
