// ai-excited-01 entry (Node 22, standard library only).
//
// The entry is the image file entry.png next to this script. The program
// hands it to the grader unchanged: it copies those exact bytes to the
// output directory, so the judge sees the same file that is in this repo.
//
// The grader's container writes to /output. Outside it, set
// MAKEFUN_OUTPUT_DIR to point the copy elsewhere:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// The image is JPEG bytes that happen to be named entry.png; the gate reads
// the file by its first bytes, not its extension.

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const MAX_IMAGE_BYTES = 1048576;
const IMAGE_NAME = 'entry.png';

function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
}

function imagePath(): URL {
  return new URL(`./${IMAGE_NAME}`, import.meta.url);
}

// The gate rejects an empty image and anything over 1 MiB, so check the
// file here and fail with a clear message instead of handing the grader
// a copy it will refuse.
function checkImageSize(path: URL): number {
  const bytes = statSync(path).size;
  if (bytes === 0 || bytes > MAX_IMAGE_BYTES) {
    throw new Error(
      `${IMAGE_NAME} is ${bytes} bytes; the gate takes at most ${MAX_IMAGE_BYTES}`,
    );
  }
  return bytes;
}

function deliver(): void {
  const source = imagePath();
  const bytes = checkImageSize(source);
  const destination = join(outputDir(), IMAGE_NAME);
  mkdirSync(outputDir(), { recursive: true });
  copyFileSync(source, destination);
  console.log(`wrote ${IMAGE_NAME} (${bytes} bytes)`);
}

deliver();
