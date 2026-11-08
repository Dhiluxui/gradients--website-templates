/**
 * Dedicated Shader Tool Page Logic
 * Phase 4 & 5 Compliance: Decoupled WebGL/Canvas simulation, pure mathematical color & noise calculation.
 */

import { renderNavbar, initNavbarInteractions } from '../components/Navbar';
import { renderFooter } from '../components/Footer';
import { ShaderEngine, ShaderParams } from '../logic/shader/shaderEngine';
import { generateStandardCss, generateTailwindClasses, generateReactSnippet } from '../logic/export/cssGenerator';
import { showToast } from '../components/Toast';

export function initDedicatedShaderPage(): void {
  const navRoot = document.getElementById('navbar-root');
  if (navRoot) navRoot.innerHTML = renderNavbar('shader');

  const footerRoot = document.getElementById('footer-root');
  if (footerRoot) footerRoot.innerHTML = renderFooter();

  initNavbarInteractions();

  const canvas = document.getElementById('main-shader-canvas') as HTMLCanvasElement | null;
  if (!canvas) return;

  const currentParams: ShaderParams = {
    color1: '#09090b',
    color2: '#c2f13c',
    color3: '#059669',
    color4: '#1e1b4b',
    speed: 1.0,
    turbulence: 1.0,
    grain: 30,
    scale: 1.0,
  };

  const engine = new ShaderEngine(canvas, currentParams);
  engine.start();

  // Inputs
  const c1 = document.getElementById('sc-1') as HTMLInputElement;
  const c2 = document.getElementById('sc-2') as HTMLInputElement;
  const c3 = document.getElementById('sc-3') as HTMLInputElement;
  const c4 = document.getElementById('sc-4') as HTMLInputElement;

  const speedRange = document.getElementById('sc-speed') as HTMLInputElement;
  const turbRange = document.getElementById('sc-turb') as HTMLInputElement;
  const grainRange = document.getElementById('sc-grain') as HTMLInputElement;

  const codeArea = document.getElementById('shader-code-output') as HTMLElement;

  function refreshCode(): void {
    if (!codeArea) return;
    codeArea.textContent = generateStandardCss(currentParams);
  }

  function handleParamChange(): void {
    currentParams.color1 = c1.value;
    currentParams.color2 = c2.value;
    currentParams.color3 = c3.value;
    currentParams.color4 = c4.value;
    currentParams.speed = parseFloat(speedRange.value);
    currentParams.turbulence = parseFloat(turbRange.value);
    currentParams.grain = parseInt(grainRange.value, 10);

    engine.updateParams(currentParams);
    refreshCode();
  }

  [c1, c2, c3, c4, speedRange, turbRange, grainRange].forEach(el => {
    el?.addEventListener('input', handleParamChange);
  });

  // Copy buttons
  document.getElementById('copy-css-btn')?.addEventListener('click', () => {
    navigator.clipboard.writeText(generateStandardCss(currentParams));
    showToast('CSS Gradient copied!');
  });

  document.getElementById('copy-tw-btn')?.addEventListener('click', () => {
    navigator.clipboard.writeText(generateTailwindClasses(currentParams));
    showToast('Tailwind classes copied!');
  });

  document.getElementById('copy-react-btn')?.addEventListener('click', () => {
    navigator.clipboard.writeText(generateReactSnippet('GrainientShader', currentParams));
    showToast('React component code copied!');
  });

  // Export 4K PNG
  document.getElementById('download-png-btn')?.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = `grainient-shader-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('Snapshot PNG downloaded!');
  });

  // Randomize
  document.getElementById('randomize-btn')?.addEventListener('click', () => {
    const randomHex = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    c1.value = '#09090b';
    c2.value = randomHex();
    c3.value = randomHex();
    c4.value = randomHex();
    handleParamChange();
    showToast('Randomized color harmonies!');
  });

  refreshCode();
}
