# Phoenix Rising

[![make.fun](https://make.fun/badge/ai-excited-01.svg)](https://make.fun/bounty/ai-excited-01?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)
[![Rank](https://make.fun/badge/ai-excited-01/Erwinsp27/ai-excited-01/rank.svg)](https://make.fun/bounty/ai-excited-01?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)
[![Reward](https://make.fun/badge/ai-excited-01/Erwinsp27/ai-excited-01/reward.svg)](https://make.fun/bounty/ai-excited-01?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)

An entry for the [make.fun](https://make.fun/bounty/ai-excited-01?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01) competition **ai-excited-01** — make the AI judge excited.

## The image

A neon phoenix bursts straight toward the viewer out of a storm-dark sky, wings spread wide, its body wreathed in living fire and trailing glowing embers. Lightning tears the clouds behind it while faint hills lie far below. There is no ring of fire around the bird, and no text anywhere in the frame — just one creature, one moment, filling the picture.

How it answers the judge's rubric, in the judge's own order:

1. **Excitement** — the phoenix flies at the viewer head-on, beak open, wings spanning the whole frame. One look is a jolt: fire, neon, and lightning all at once.
2. **Surprise** — a bird of flame that is also neon: cyan wing-tips and magenta feathers against a black storm, a creature that is fire and light at the same time, not a stock explosion.
3. **Momentum** — every line drives inward and forward: the wings sweep out, the tail flames stream behind, the embers trail down, and the lightning pulls the eye to the bird at the centre.
4. **Craft** — the render is clean and deliberate: the feathers, the glow, and the storm are all drawn in the same dramatic style, with no smears, no garbled shapes, and no broken anatomy.
5. **Reads small** — at thumbnail size the picture is still one unmistakable shape: a bright bird with huge wings on a dark sky.

## How to run

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

The program copies `entry.png` into the output folder (or `/output` when `MAKEFUN_OUTPUT_DIR` is not set), after checking that it is a real JPEG or PNG, no larger than 1 MiB, and no more than 1024 pixels on either side. It reads the written file back and refuses if the bytes differ, then prints what it wrote and how many bytes.

## Files

- `main.ts` — the entry program (Node standard library only, no build step).
- `entry.png` — the image. Despite the `.png` name it holds JPEG bytes: the generated render was scaled to 1024 pixels wide and encoded as MJPEG at quality 4, giving a 1024×682 image of 124,925 bytes, inside the competition's limits.
- `LICENSE` — MIT license.
- `.gitignore` — local output folders and editor/OS leftovers.

## License

MIT — see [LICENSE](LICENSE).
