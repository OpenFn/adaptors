/**
 * Benchmark: jimp vs @jsquash/jpeg
 *
 * Runs both pipelines on the same images and reports time, output size,
 * and memory deltas so you can compare JS heap vs WebAssembly (external) usage.
 *
 * Basic:           pnpm benchmark
 * With forced GC:  node --expose-gc --experimental-specifier-resolution=node benchmark.js
 *
 * Memory columns:
 *   heap Δ      — V8 JS heap growth (objects, buffers allocated in JS)
 *   external Δ  — memory outside the V8 heap; WebAssembly lives here
 *   rss Δ       — total process resident set size change
 */

import { readFileSync } from 'fs';
import { createRequire } from 'module';
import { performance } from 'perf_hooks';
import { Jimp } from 'jimp';
import decode, { init as initDecode } from '@jsquash/jpeg/decode.js';
import encode, { init as initEncode } from '@jsquash/jpeg/encode.js';
import resize, { initResize } from '@jsquash/resize';
import { injectExifComment } from './src/Utils.js';

// ─── WASM bootstrap ───────────────────────────────────────────────────────────
// @jsquash defaults to fetch() for WASM loading which doesn't work in Node.js.
// We resolve the .wasm files from node_modules and pass the binaries directly.

const require = createRequire(import.meta.url);

function loadWasm(packagePath) {
  const buf = readFileSync(require.resolve(packagePath));
  // slice() produces a clean ArrayBuffer with no byteOffset (required by Emscripten)
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

await initDecode({ wasmBinary: loadWasm('@jsquash/jpeg/codec/dec/mozjpeg_dec.wasm') });
await initEncode({ wasmBinary: loadWasm('@jsquash/jpeg/codec/enc/mozjpeg_enc.wasm') });
await initResize(loadWasm('@jsquash/resize/lib/resize/pkg/squoosh_resize_bg.wasm'));

// ─── config ───────────────────────────────────────────────────────────────────

const IMAGES = [
  'test/images/portrait-large.jpg',  // 1643×2408  2.9MB  portrait
  'test/images/landscape-large.jpg', // 4000×2667  4.1MB  landscape
  'test/images/heavy-noise.jpg',     // 3200×4000  2.6MB  high-entropy portrait
];

const WIDTH = 1200;
const HEIGHT = 1600;
const MAX_BYTES = 700 * 1024;
const MIN_QUALITY = 20;
const COMMENT = 'benchmark';

// ─── helpers ──────────────────────────────────────────────────────────────────

const kb = n => `${(n / 1024).toFixed(1)}KB`;
const mb = n => `${(n / 1048576).toFixed(2)}MB`;
const sign = n => (n >= 0 ? '+' : '') + mb(n);

function snap() {
  if (typeof global.gc === 'function') global.gc();
  return process.memoryUsage();
}

function memDelta(before, after) {
  return {
    heap: after.heapUsed - before.heapUsed,
    external: after.external - before.external,
    rss: after.rss - before.rss,
  };
}

// Node Buffer → clean ArrayBuffer (avoids shared-backing-buffer offset issues)
function toArrayBuffer(buf) {
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

// ─── jimp pipeline ────────────────────────────────────────────────────────────

async function runJimp(inputBuffer) {
  const before = snap();
  const t0 = performance.now();

  const image = await Jimp.read(inputBuffer);
  image.resize({ w: WIDTH, h: HEIGHT });

  let quality = 80;
  let outBuffer;
  while (true) {
    outBuffer = await image.getBuffer('image/jpeg', { quality });
    outBuffer = injectExifComment(outBuffer, COMMENT);
    if (outBuffer.length <= MAX_BYTES || quality <= MIN_QUALITY) break;
    quality -= 5;
  }

  return { elapsed: performance.now() - t0, size: outBuffer.length, quality, mem: memDelta(before, snap()) };
}

// ─── @jsquash pipeline ────────────────────────────────────────────────────────

async function runJsquash(inputBuffer) {
  const before = snap();
  const t0 = performance.now();

  // decode → raw RGBA ImageData  (MozJPEG decoder)
  const imageData = await decode(toArrayBuffer(inputBuffer));

  // resize using Lanczos3 (same algorithm jimp uses by default)
  const resized = await resize(imageData, { width: WIDTH, height: HEIGHT });

  // quality loop — MozJPEG encoder, quality scale 0-100 same as jimp
  let quality = 80;
  let outBuffer;
  while (true) {
    outBuffer = Buffer.from(await encode(resized, { quality }));
    outBuffer = injectExifComment(outBuffer, COMMENT);
    if (outBuffer.length <= MAX_BYTES || quality <= MIN_QUALITY) break;
    quality -= 5;
  }

  return { elapsed: performance.now() - t0, size: outBuffer.length, quality, mem: memDelta(before, snap()) };
}

// ─── reporting ────────────────────────────────────────────────────────────────

function printRow(label, r) {
  const w = 16;
  console.log(`  ${label.padEnd(w)}time ${String(r.elapsed.toFixed(0) + 'ms').padStart(7)}  |  output ${kb(r.size).padStart(9)} @ q${r.quality}`);
  console.log(`  ${''.padEnd(w)}heap  ${sign(r.mem.heap).padStart(9)}  |  external ${sign(r.mem.external).padStart(9)}  |  rss ${sign(r.mem.rss).padStart(9)}`);
}

// ─── main ─────────────────────────────────────────────────────────────────────

console.log('\n=== image-fn: jimp vs @jsquash/jpeg ===');
console.log(`Target: ${WIDTH}×${HEIGHT}px, max ${kb(MAX_BYTES)}`);
if (typeof global.gc !== 'function') {
  console.log('Tip: rerun with --expose-gc for GC-forced memory snapshots');
}
console.log('');

for (const imagePath of IMAGES) {
  const inputBuffer = readFileSync(imagePath);
  console.log(`── ${imagePath} (${kb(inputBuffer.length)}) ──`);

  const jimp = await runJimp(inputBuffer);
  const jsquash = await runJsquash(inputBuffer);

  printRow('jimp', jimp);
  printRow('@jsquash/jpeg', jsquash);

  const speedup = (jimp.elapsed / jsquash.elapsed).toFixed(1);
  console.log(`  ${''.padEnd(16)}@jsquash was ${speedup}x ${Number(speedup) >= 1 ? 'faster' : 'slower'} than jimp`);
  console.log('');
}
