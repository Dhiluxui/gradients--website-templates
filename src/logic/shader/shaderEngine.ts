/**
 * Real-Time Shader Simulation Engine
 * Phase 5 Compliance: Uses requestAnimationFrame with Delta Time (dt) for frame-rate independence.
 * Decoupled entirely from DOM/React render cycles to prevent render thrashing.
 */

import { hexToRgb, clamp, RGB } from '../color/colorSpace';
import { applyGrainToImageData } from '../noise/proceduralNoise';

export interface ShaderParams {
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  speed: number;       // Range 0.1 to 3.0
  turbulence: number;  // Range 0.1 to 2.0
  grain: number;       // Range 0 to 100
  scale: number;       // Range 0.5 to 2.0
}

export class ShaderEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private animFrameId: number | null = null;
  private lastTime = 0;
  private elapsedSeconds = 0;
  private isRunning = false;
  private params: ShaderParams;

  // Cached RGB colors
  private rgb1: RGB;
  private rgb2: RGB;
  private rgb3: RGB;
  private rgb4: RGB;

  constructor(canvas: HTMLCanvasElement, initialParams: ShaderParams) {
    this.canvas = canvas;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) {
      throw new Error('Canvas 2D context not supported');
    }
    this.ctx = context;
    this.params = { ...initialParams };

    this.rgb1 = hexToRgb(this.params.color1);
    this.rgb2 = hexToRgb(this.params.color2);
    this.rgb3 = hexToRgb(this.params.color3);
    this.rgb4 = hexToRgb(this.params.color4);
  }

  public updateParams(newParams: Partial<ShaderParams>): void {
    this.params = { ...this.params, ...newParams };
    if (newParams.color1) this.rgb1 = hexToRgb(newParams.color1);
    if (newParams.color2) this.rgb2 = hexToRgb(newParams.color2);
    if (newParams.color3) this.rgb3 = hexToRgb(newParams.color3);
    if (newParams.color4) this.rgb4 = hexToRgb(newParams.color4);
  }

  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.loop = this.loop.bind(this);
    this.animFrameId = requestAnimationFrame(this.loop);
  }

  public stop(): void {
    this.isRunning = false;
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  private loop(currentTime: number): void {
    if (!this.isRunning) return;

    // Delta Time in seconds
    const dt = Math.min((currentTime - this.lastTime) / 1000, 0.1);
    this.lastTime = currentTime;

    // Advance time accumulator with user speed
    const speed = clamp(this.params.speed, 0.05, 5.0, 1.0);
    this.elapsedSeconds += dt * speed;

    this.render();

    this.animFrameId = requestAnimationFrame(this.loop);
  }

  public render(): void {
    const width = this.canvas.width;
    const height = this.canvas.height;
    if (width === 0 || height === 0) return;

    const t = this.elapsedSeconds;
    const turb = clamp(this.params.turbulence, 0.1, 3.0, 1.0);

    // Dynamic wave positions (Math harmonics)
    const x1 = (Math.sin(t * 0.8) * 0.3 + 0.35) * width;
    const y1 = (Math.cos(t * 0.6) * 0.3 + 0.35) * height;

    const x2 = (Math.cos(t * 0.7 + 1.2) * 0.35 + 0.65) * width;
    const y2 = (Math.sin(t * 0.9 + 0.8) * 0.35 + 0.4) * height;

    const x3 = (Math.sin(t * 0.5 + 2.5) * 0.4 + 0.5) * width;
    const y3 = (Math.cos(t * 0.8 + 2.0) * 0.4 + 0.75) * height;

    // Base background gradient
    const baseGrad = this.ctx.createLinearGradient(0, 0, width, height);
    baseGrad.addColorStop(0, `rgb(${this.rgb1.r}, ${this.rgb1.g}, ${this.rgb1.b})`);
    baseGrad.addColorStop(1, `rgb(${this.rgb4.r}, ${this.rgb4.g}, ${this.rgb4.b})`);
    this.ctx.fillStyle = baseGrad;
    this.ctx.fillRect(0, 0, width, height);

    // Node 2 (Radial blob with blend mode)
    this.ctx.save();
    this.ctx.globalCompositeOperation = 'screen';
    const rad2 = (width * 0.6) * turb;
    const grad2 = this.ctx.createRadialGradient(x1, y1, 0, x1, y1, Math.max(rad2, 10));
    grad2.addColorStop(0, `rgba(${this.rgb2.r}, ${this.rgb2.g}, ${this.rgb2.b}, 0.9)`);
    grad2.addColorStop(1, `rgba(${this.rgb2.r}, ${this.rgb2.g}, ${this.rgb2.b}, 0)`);
    this.ctx.fillStyle = grad2;
    this.ctx.fillRect(0, 0, width, height);

    // Node 3 (Radial blob)
    const rad3 = (width * 0.55) * turb;
    const grad3 = this.ctx.createRadialGradient(x2, y2, 0, x2, y2, Math.max(rad3, 10));
    grad3.addColorStop(0, `rgba(${this.rgb3.r}, ${this.rgb3.g}, ${this.rgb3.b}, 0.85)`);
    grad3.addColorStop(1, `rgba(${this.rgb3.r}, ${this.rgb3.g}, ${this.rgb3.b}, 0)`);
    this.ctx.fillStyle = grad3;
    this.ctx.fillRect(0, 0, width, height);

    // Node 4 (Radial blob)
    const rad4 = (width * 0.5) * turb;
    const grad4 = this.ctx.createRadialGradient(x3, y3, 0, x3, y3, Math.max(rad4, 10));
    grad4.addColorStop(0, `rgba(${this.rgb1.r}, ${this.rgb1.g}, ${this.rgb1.b}, 0.7)`);
    grad4.addColorStop(1, `rgba(${this.rgb1.r}, ${this.rgb1.g}, ${this.rgb1.b}, 0)`);
    this.ctx.fillStyle = grad4;
    this.ctx.fillRect(0, 0, width, height);
    this.ctx.restore();

    // Apply procedural grain if enabled
    if (this.params.grain > 0 && width <= 400 && height <= 300) {
      try {
        const imgData = this.ctx.getImageData(0, 0, width, height);
        applyGrainToImageData(imgData, this.params.grain, Math.floor(t * 100));
        this.ctx.putImageData(imgData, 0, 0);
      } catch {
        // Fallback gracefully if context security restricts ImageData
      }
    }
  }
}

