/**
 * Pure Mathematical Procedural Noise & Grain Synthesis
 * Phase 5 Compliance: Decoupled pure functions, bounds checked, zero NaN risks.
 */

import { clamp } from '../color/colorSpace';

/**
 * Deterministic PRNG using Mulberry32 algorithm
 */
export function createPRNG(seed: number): () => number {
  let s = Math.floor(Math.abs(seed)) || 1337;
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generates an SVG Data URI containing an SVG noise filter
 */
export function generateSvgNoiseDataUrl(baseFrequency = 0.85, numOctaves = 3): string {
  const safeFreq = clamp(baseFrequency, 0.01, 2.0, 0.85).toFixed(3);
  const safeOct = Math.round(clamp(numOctaves, 1, 6, 3));

  const svg = `<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'>` +
    `<filter id='noise'>` +
    `<feTurbulence type='fractalNoise' baseFrequency='${safeFreq}' numOctaves='${safeOct}' stitchTiles='stitch'/>` +
    `</filter>` +
    `<rect width='100%' height='100%' filter='url(#noise)'/>` +
    `</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Synthesizes a high-frequency grain overlay directly into an ImageData buffer
 */
export function applyGrainToImageData(
  imageData: ImageData,
  intensity = 25,
  seed = 42
): void {
  const data = imageData.data;
  const len = data.length;
  const safeIntensity = clamp(intensity, 0, 100, 25);
  const rng = createPRNG(seed);

  const factor = (safeIntensity / 100) * 128;

  for (let i = 0; i < len; i += 4) {
    const grain = (rng() - 0.5) * factor;

    data[i] = clamp(data[i] + grain, 0, 255);         // R
    data[i + 1] = clamp(data[i + 1] + grain, 0, 255); // G
    data[i + 2] = clamp(data[i + 2] + grain, 0, 255); // B
    // Alpha is preserved
  }
}
