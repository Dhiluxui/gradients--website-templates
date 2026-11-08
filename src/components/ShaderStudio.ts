/**
 * Interactive Shader Studio Component
 * Connects the ShaderEngine to live UI controls.
 * Phase 4 & 5 Compliance: Decoupled logic, delta-time RAF rendering, responsive controls.
 */

import { ShaderEngine, ShaderParams } from '../logic/shader/shaderEngine';
import { generateStandardCss } from '../logic/export/cssGenerator';
import { showToast } from './Toast';

export function initShaderStudio(containerId: string): ShaderEngine | null {
  const container = document.getElementById(containerId);
  if (!container) return null;

  const defaultParams: ShaderParams = {
    color1: '#09090b',
    color2: '#c2f13c',
    color3: '#059669',
    color4: '#1e1b4b',
    speed: 1.0,
    turbulence: 1.0,
    grain: 25,
    scale: 1.0,
  };

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; lg:flex-row; gap: 2rem; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: clamp(1rem, 3vw, 2rem);">
      
      <!-- Canvas Display -->
      <div style="flex: 1; display: flex; flex-direction: column; gap: 1rem;">
        <div style="position: relative; width: 100%; height: 380px; border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border-subtle); box-shadow: var(--shadow-lg);">
          <canvas id="shader-canvas" width="600" height="380" style="width: 100%; height: 100%; display: block;"></canvas>
          <div class="noise-overlay" style="opacity: 0.3;"></div>
          
          <div style="position: absolute; top: 1rem; left: 1rem; display: flex; gap: 0.5rem;">
            <span class="badge-pill" style="backdrop-filter: blur(8px);">REAL-TIME GLSL / RAF ENGINE</span>
          </div>
        </div>

        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem;">
          <div style="display: flex; gap: 0.5rem;">
            <button id="shader-randomize-btn" class="btn btn-secondary btn-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
              </svg>
              <span>Randomize Colors</span>
            </button>
            <button id="shader-copy-css-btn" class="btn btn-primary btn-sm">
              <span>Copy CSS Code</span>
            </button>
          </div>
          <span class="text-p-caption">60 FPS Independent Delta Time</span>
        </div>
      </div>

      <!-- Controls Panel -->
      <div style="width: 100%; max-width: 360px; display: flex; flex-direction: column; gap: 1.25rem;">
        <h4 class="text-h5" style="margin: 0;">Shader Parameters</h4>

        <!-- Color Stops -->
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <label class="text-p-caption" style="text-transform: uppercase;">Color Palette</label>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem;">
            <div>
              <input type="color" id="color-picker-1" value="${defaultParams.color1}" style="width: 100%; height: 38px; border: none; border-radius: var(--radius-sm); cursor: pointer; background: transparent;" />
            </div>
            <div>
              <input type="color" id="color-picker-2" value="${defaultParams.color2}" style="width: 100%; height: 38px; border: none; border-radius: var(--radius-sm); cursor: pointer; background: transparent;" />
            </div>
            <div>
              <input type="color" id="color-picker-3" value="${defaultParams.color3}" style="width: 100%; height: 38px; border: none; border-radius: var(--radius-sm); cursor: pointer; background: transparent;" />
            </div>
            <div>
              <input type="color" id="color-picker-4" value="${defaultParams.color4}" style="width: 100%; height: 38px; border: none; border-radius: var(--radius-sm); cursor: pointer; background: transparent;" />
            </div>
          </div>
        </div>

        <!-- Sliders -->
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
              <span class="text-p-caption">Animation Speed</span>
              <span id="speed-val" class="text-mono" style="font-size: 0.75rem;">1.0x</span>
            </div>
            <input type="range" id="speed-slider" min="0.1" max="3.0" step="0.1" value="1.0" style="width: 100%; accent-color: var(--color-brand-primary);" />
          </div>

          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
              <span class="text-p-caption">Turbulence &amp; Chaos</span>
              <span id="turb-val" class="text-mono" style="font-size: 0.75rem;">1.0</span>
            </div>
            <input type="range" id="turb-slider" min="0.2" max="2.5" step="0.1" value="1.0" style="width: 100%; accent-color: var(--color-brand-primary);" />
          </div>

          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
              <span class="text-p-caption">Film Grain Density</span>
              <span id="grain-val" class="text-mono" style="font-size: 0.75rem;">25%</span>
            </div>
            <input type="range" id="grain-slider" min="0" max="100" step="5" value="25" style="width: 100%; accent-color: var(--color-brand-primary);" />
          </div>
        </div>

        <!-- Presets -->
        <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem;">
          <span class="text-p-caption" style="text-transform: uppercase;">Presets</span>
          <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
            <button class="badge-tag preset-btn" data-c1="#09090b" data-c2="#c2f13c" data-c3="#15803d" data-c4="#09090b" style="cursor: pointer;">Lime Matrix</button>
            <button class="badge-tag preset-btn" data-c1="#030712" data-c2="#6366f1" data-c3="#ec4899" data-c4="#030712" style="cursor: pointer;">Cyberpunk</button>
            <button class="badge-tag preset-btn" data-c1="#022c22" data-c2="#06b6d4" data-c3="#3b82f6" data-c4="#022c22" style="cursor: pointer;">Deep Ocean</button>
            <button class="badge-tag preset-btn" data-c1="#450a0a" data-c2="#f97316" data-c3="#fbbf24" data-c4="#450a0a" style="cursor: pointer;">Solar Flare</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('#shader-canvas') as HTMLCanvasElement;
  if (!canvas) return null;

  const engine = new ShaderEngine(canvas, defaultParams);
  engine.start();

  // Wire up controls
  const c1 = container.querySelector('#color-picker-1') as HTMLInputElement;
  const c2 = container.querySelector('#color-picker-2') as HTMLInputElement;
  const c3 = container.querySelector('#color-picker-3') as HTMLInputElement;
  const c4 = container.querySelector('#color-picker-4') as HTMLInputElement;

  const speedSlider = container.querySelector('#speed-slider') as HTMLInputElement;
  const speedVal = container.querySelector('#speed-val') as HTMLElement;

  const turbSlider = container.querySelector('#turb-slider') as HTMLInputElement;
  const turbVal = container.querySelector('#turb-val') as HTMLElement;

  const grainSlider = container.querySelector('#grain-slider') as HTMLInputElement;
  const grainVal = container.querySelector('#grain-val') as HTMLElement;

  const updateEngine = () => {
    engine.updateParams({
      color1: c1.value,
      color2: c2.value,
      color3: c3.value,
      color4: c4.value,
      speed: parseFloat(speedSlider.value),
      turbulence: parseFloat(turbSlider.value),
      grain: parseInt(grainSlider.value, 10),
    });
  };

  [c1, c2, c3, c4].forEach(picker => picker.addEventListener('input', updateEngine));

  speedSlider.addEventListener('input', () => {
    speedVal.textContent = `${speedSlider.value}x`;
    updateEngine();
  });

  turbSlider.addEventListener('input', () => {
    turbVal.textContent = turbSlider.value;
    updateEngine();
  });

  grainSlider.addEventListener('input', () => {
    grainVal.textContent = `${grainSlider.value}%`;
    updateEngine();
  });

  // Randomize button
  const randomBtn = container.querySelector('#shader-randomize-btn');
  const paletteSamples = [
    ['#09090b', '#c2f13c', '#059669', '#1e1b4b'],
    ['#020617', '#38bdf8', '#818cf8', '#020617'],
    ['#18181b', '#f43f5e', '#fb923c', '#18181b'],
    ['#0f172a', '#a855f7', '#ec4899', '#0f172a'],
    ['#052e16', '#22c55e', '#a3e635', '#052e16'],
  ];

  randomBtn?.addEventListener('click', () => {
    const pal = paletteSamples[Math.floor(Math.random() * paletteSamples.length)];
    c1.value = pal[0];
    c2.value = pal[1];
    c3.value = pal[2];
    c4.value = pal[3];
    updateEngine();
    showToast('New random color harmonics applied!');
  });

  // Presets
  const presetBtns = container.querySelectorAll('.preset-btn');
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      c1.value = btn.getAttribute('data-c1') || '#09090b';
      c2.value = btn.getAttribute('data-c2') || '#c2f13c';
      c3.value = btn.getAttribute('data-c3') || '#15803d';
      c4.value = btn.getAttribute('data-c4') || '#09090b';
      updateEngine();
    });
  });

  // Copy CSS Code
  const copyBtn = container.querySelector('#shader-copy-css-btn');
  copyBtn?.addEventListener('click', () => {
    const css = generateStandardCss({
      color1: c1.value,
      color2: c2.value,
      color3: c3.value,
      color4: c4.value,
      speed: parseFloat(speedSlider.value),
      turbulence: parseFloat(turbSlider.value),
      grain: parseInt(grainSlider.value, 10),
      scale: 1.0,
    });
    navigator.clipboard.writeText(css);
    showToast('Shader CSS copied to clipboard!');
  });

  return engine;
}
