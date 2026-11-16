// ai-excited-01 entry (Node 22, standard library only).
//
// The whole entry is the single image file sitting next to this script.
// This program's only job is to hand that image to the grader untouched:
// it reads entry.png byte for byte and writes those same bytes into the
// output directory, so what the judge opens is exactly what is in the repo.
//
// Where the copy goes:
//   - inside the grader's container the output directory is /output;
//   - anywhere else, point MAKEFUN_OUTPUT_DIR at a folder of your own:
//       mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Note the file's name is a formality: the bytes are JPEG (the gate
// decides by the first bytes it sees, not by the extension), which is how
// a 1920x1280 source fits under the 1 MiB cap once scaled.

import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The gate's hard limit: an empty image, or anything over 1 MiB, is refused.
const BYTE_LIMIT = 1048576;
const FILE_NAME = 'entry.png';

// The destination folder: the grader's /output unless the caller says
// otherwise through the environment.
function resolveTargetDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
}

// The image lives beside this script, whatever the working directory is.
function locateEntry(): URL {
  return new URL(`./${FILE_NAME}`, import.meta.url);
}

// Refuse the image here, with a readable error, rather than handing the
// grader a file it will reject on arrival.
function loadEntry(entry: URL): Buffer {
  const size = statSync(entry).size;
  if (size === 0) {
    throw new Error(`${FILE_NAME} is empty; there is no image to deliver`);
  }
  if (size > BYTE_LIMIT) {
    throw new Error(
      `${FILE_NAME} is ${size} bytes, over the gate's ${BYTE_LIMIT}-byte limit`,
    );
  }
  const bytes = readFileSync(entry);
  // The gate tells PNG from JPEG by the first bytes, not the extension,
  // so refuse anything that is neither before the grader sees it.
  const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const isPng =
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47;
  if (!isJpeg && !isPng) {
    throw new Error(
      `${FILE_NAME} is not a JPEG or PNG image ` +
        `(first bytes: ${bytes.subarray(0, 4).toString('hex')})`,
    );
  }
  return bytes;
}

// Copy the image's bytes to the output directory, creating it if needed.
function handOver(): void {
  const image = loadEntry(locateEntry());
  const targetDir = resolveTargetDir();
  mkdirSync(targetDir, { recursive: true });
  const target = join(targetDir, FILE_NAME);
  writeFileSync(target, image);
  // Prove the handover landed whole: the grader's two runs must agree
  // byte for byte, so a short or torn write is caught here, not by it.
  const written = readFileSync(target);
  if (!written.equals(image)) {
    throw new Error(
      `${FILE_NAME} was not written whole: ${written.length} bytes on disk, ` +
        `${image.length} bytes expected`,
    );
  }
  console.log(`wrote ${FILE_NAME} (${image.length} bytes)`);
}

handOver();
