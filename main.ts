// Phoenix Rising — ai-excited-01 entry.
//
// Copies the entry image sitting next to this script into the output
// folder, after checking that it is a real JPEG or PNG inside the
// competition's size limits. Standard library only, no build step.

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1024 * 1024;
const MAX_PIXELS = 1024;
const IMAGE_NAME = "entry.png";

const JPEG_MAGIC = [0xff, 0xd8, 0xff];
const PNG_MAGIC = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

function fail(message: string): never {
  throw new Error(`phoenix-rising: ${message}`);
}

function startsWith(bytes: Buffer, magic: number[]): boolean {
  return magic.every((byte, index) => bytes[index] === byte);
}

// Reads the width and height the image itself declares in its header,
// so a file whose pixels break the competition's limit is refused even
// when its byte count and magic bytes look fine.
function readDimensions(image: Buffer, isJpeg: boolean): { width: number; height: number } {
  if (!isJpeg) {
    // PNG: the IHDR chunk starts right after the 8-byte signature;
    // width and height are the first two big-endian 32-bit words in it.
    const width = image.readUInt32BE(16);
    const height = image.readUInt32BE(20);
    return { width, height };
  }

  // JPEG: walk the segments after the SOI marker until a start-of-frame
  // marker (SOF0..SOF15, skipping the Huffman/arithmetic markers) gives
  // the height then the width as big-endian 16-bit values.
  let offset = 2;
  while (offset + 9 < image.length) {
    if (image[offset] !== 0xff) {
      fail("malformed JPEG: expected a segment marker");
    }
    const marker = image[offset + 1];
    const length = image.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      const height = image.readUInt16BE(offset + 5);
      const width = image.readUInt16BE(offset + 7);
      return { width, height };
    }
    offset += 2 + length;
  }
  fail("malformed JPEG: no start-of-frame segment found");
}

function main(): void {
  const scriptDir = dirname(fileURLToPath(import.meta.url));
  const sourcePath = join(scriptDir, IMAGE_NAME);

  if (!existsSync(sourcePath)) {
    fail(`source image not found: ${sourcePath}`);
  }

  const size = statSync(sourcePath).size;
  if (size === 0) {
    fail(`source image is empty: ${sourcePath}`);
  }
  if (size > MAX_BYTES) {
    fail(`source image is ${size} bytes, over the ${MAX_BYTES} byte limit`);
  }

  const image = readFileSync(sourcePath);
  const isJpeg = startsWith(image, JPEG_MAGIC);
  const isPng = startsWith(image, PNG_MAGIC);
  if (!isJpeg && !isPng) {
    fail("source image is neither JPEG nor PNG (unrecognised first bytes)");
  }

  const { width, height } = readDimensions(image, isJpeg);
  if (width > MAX_PIXELS || height > MAX_PIXELS) {
    fail(`source image is ${width}x${height} pixels, over the ${MAX_PIXELS}x${MAX_PIXELS} limit`);
  }

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });

  const targetPath = join(outputDir, basename(sourcePath));
  copyFileSync(sourcePath, targetPath);

  const written = readFileSync(targetPath);
  if (!written.equals(image)) {
    fail(`written file differs from source: ${targetPath}`);
  }

  console.log(`Wrote ${targetPath} (${written.length} bytes)`);
}

main();
