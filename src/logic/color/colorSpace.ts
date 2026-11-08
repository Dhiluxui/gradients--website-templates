/**
 * Pure Mathematical Color Space Transformations
 * Strict Phase 5 protocol compliance: No side effects, handles floating-point errors, NaN, and bounds checking.
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

/**
 * Bounds checking utility to clamp numbers within [min, max]
 * Replaces NaN or Infinity with fallback value.
 */
export function clamp(value: number, min: number, max: number, fallback = min): number {
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
    return fallback;
  }
  return Math.min(Math.max(value, min), max);
}

/**
 * Parses Hex string (#rgb, #rgba, #rrggbb, #rrggbbaa) to RGB object
 */
export function hexToRgb(hexInput: string): RGB {
  let hex = (hexInput || '#000000').trim().replace(/^#/, '');

  if (hex.length === 3 || hex.length === 4) {
    hex = hex.split('').map(c => c + c).join('');
  }

  if (hex.length < 6) {
    hex = hex.padEnd(6, '0');
  }

  const num = parseInt(hex.slice(0, 6), 16);
  if (isNaN(num)) {
    return { r: 0, g: 0, b: 0 };
  }

  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/**
 * Converts RGB components to a standard 6-character Hex string
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const safeR = Math.round(clamp(r, 0, 255));
  const safeG = Math.round(clamp(g, 0, 255));
  const safeB = Math.round(clamp(b, 0, 255));

  const hexR = safeR.toString(16).padStart(2, '0');
  const hexG = safeG.toString(16).padStart(2, '0');
  const hexB = safeB.toString(16).padStart(2, '0');

  return `#${hexR}${hexG}${hexB}`;
}

/**
 * Converts RGB to HSL color space with precision handling
 */
export function rgbToHsl(r: number, g: number, b: number): HSL {
  const normR = clamp(r, 0, 255) / 255;
  const normG = clamp(g, 0, 255) / 255;
  const normB = clamp(b, 0, 255) / 255;

  const max = Math.max(normR, normG, normB);
  const min = Math.min(normR, normG, normB);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta > 0.00001) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    if (max === normR) {
      h = (normG - normB) / delta + (normG < normB ? 6 : 0);
    } else if (max === normG) {
      h = (normB - normR) / delta + 2;
    } else {
      h = (normR - normG) / delta + 4;
    }
    h = h / 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Linear color interpolation between two colors at fraction t [0, 1]
 */
export function lerpColor(hexA: string, hexB: string, tInput: number): string {
  const t = clamp(tInput, 0, 1);
  const colorA = hexToRgb(hexA);
  const colorB = hexToRgb(hexB);

  const r = colorA.r + (colorB.r - colorA.r) * t;
  const g = colorA.g + (colorB.g - colorA.g) * t;
  const b = colorA.b + (colorB.b - colorA.b) * t;

  return rgbToHex(r, g, b);
}
