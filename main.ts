// ai-excited-01 entry (Node 22, standard library only): the image is the
// entry.png beside this file, and the program copies it to /output/entry.png.
// The gate takes a whole PNG or JPEG of at most 1 MiB and 1024 by 1024 pixels,
// and the judge sees exactly the bytes copied.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const src = new URL('./entry.png', import.meta.url);

// The gate refuses an empty or missing image, so fail loudly here instead
// of copying nothing and letting the grader find out.
const size = statSync(src).size;
if (size === 0 || size > 1048576) {
  throw new Error(`entry.png is ${size} bytes; the gate takes at most 1048576`);
}
mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, 'entry.png'));
console.log(`wrote entry.png (${size} bytes)`);
