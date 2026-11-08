/**
 * Gradient Inspector Modal
 * Phase 1 & 4 Compliance: Accessible modal dialog, tabs for multiple export formats, one-click copy.
 */

import { GradientItem } from '../data/gradients';
import { generateStandardCss, generateTailwindClasses, generateSvgNoiseFilter, generateReactSnippet } from '../logic/export/cssGenerator';
import { showToast } from './Toast';

export function openGradientModal(item: GradientItem): void {
  const existing = document.getElementById('gradient-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'gradient-modal';
  modal.style.position = 'fixed';
  modal.style.inset = '0';
  modal.style.zIndex = '99999';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.padding = '1.5rem';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
  modal.style.backdropFilter = 'blur(12px)';

  const params = {
    color1: item.colors[0] || '#09090b',
    color2: item.colors[1] || '#c2f13c',
    color3: item.colors[2] || '#15803d',
    color4: item.colors[3] || '#09090b',
    speed: 1.0,
    turbulence: 1.0,
    grain: 25,
    scale: 1.0,
  };

  const cssCode = generateStandardCss(params);
  const tailwindCode = generateTailwindClasses(params);
  const svgFilterCode = generateSvgNoiseFilter(25);
  const reactCode = generateReactSnippet(item.name, params);

  modal.innerHTML = `
    <div class="card-glass animate-fade-in" style="width: 100%; max-width: 840px; max-height: 90vh; overflow-y: auto; background: var(--bg-card); border-radius: var(--radius-xl); border: 1px solid var(--border-hover); padding: 2rem; position: relative;">
      
      <!-- Close button -->
      <button id="modal-close-btn" class="btn btn-tertiary btn-sm" style="position: absolute; top: 1.25rem; right: 1.25rem; padding: 0.5rem;" aria-label="Close modal">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <!-- Modal Header -->
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
        <span class="badge-pill">${item.category.replace('-', ' ').toUpperCase()}</span>
        ${item.isPro ? '<span class="badge-pill" style="background: rgba(255,255,255,0.1); color: #fff; border-color: rgba(255,255,255,0.2);">PRO</span>' : ''}
        <h3 class="text-h4" style="margin: 0;">${item.name}</h3>
      </div>

      <!-- Preview Box -->
      <div style="width: 100%; height: 260px; border-radius: var(--radius-lg); position: relative; overflow: hidden; background: ${item.css}; margin-bottom: 1.75rem; border: 1px solid var(--border-subtle); box-shadow: var(--shadow-lg);">
        <div class="noise-overlay"></div>
        <div style="position: absolute; bottom: 1rem; right: 1rem; display: flex; gap: 0.5rem;">
          <button id="copy-css-quick" class="btn btn-primary btn-sm">Copy CSS</button>
        </div>
      </div>

      <!-- Code Format Tabs -->
      <div style="display: flex; gap: 0.5rem; border-bottom: 1px solid var(--border-subtle); margin-bottom: 1.25rem;">
        <button class="tab-btn active" data-tab="css" style="padding: 0.5rem 1rem; background: none; border: none; border-bottom: 2px solid var(--color-brand-primary); color: #fff; font-weight: 600; cursor: pointer;">CSS</button>
        <button class="tab-btn" data-tab="tailwind" style="padding: 0.5rem 1rem; background: none; border: none; border-bottom: 2px solid transparent; color: var(--text-muted); font-weight: 600; cursor: pointer;">Tailwind</button>
        <button class="tab-btn" data-tab="svg" style="padding: 0.5rem 1rem; background: none; border: none; border-bottom: 2px solid transparent; color: var(--text-muted); font-weight: 600; cursor: pointer;">SVG Filter</button>
        <button class="tab-btn" data-tab="react" style="padding: 0.5rem 1rem; background: none; border: none; border-bottom: 2px solid transparent; color: var(--text-muted); font-weight: 600; cursor: pointer;">React Component</button>
      </div>

      <!-- Code Block Container -->
      <div style="position: relative; background: var(--bg-primary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; font-family: monospace; font-size: 0.85rem; overflow-x: auto;">
        <pre id="code-content" style="margin: 0; color: #e4e4e7; white-space: pre-wrap;">${cssCode}</pre>
        <button id="copy-active-code" class="btn btn-secondary btn-sm" style="position: absolute; top: 0.75rem; right: 0.75rem;">
          <span>Copy</span>
        </button>
      </div>

      <!-- Color Swatches & Details -->
      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-top: 1.75rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span class="text-p-caption" style="text-transform: uppercase;">Palette:</span>
          ${item.colors.map(c => `
            <div style="display: flex; align-items: center; gap: 0.25rem; background: rgba(255,255,255,0.05); padding: 0.2rem 0.5rem; border-radius: 4px; border: 1px solid var(--border-subtle);">
              <span style="width: 12px; height: 12px; border-radius: 2px; background: ${c}; border: 1px solid rgba(255,255,255,0.2);"></span>
              <span class="text-mono" style="font-size: 0.75rem;">${c}</span>
            </div>
          `).join('')}
        </div>
        <a href="/pricing.html" class="btn btn-primary btn-sm">Download 8K Ultra Assets</a>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Close handlers
  const closeBtn = modal.querySelector('#modal-close-btn');
  closeBtn?.addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  // Tab switching
  const tabs = modal.querySelectorAll('.tab-btn');
  const codeContent = modal.querySelector('#code-content');
  let currentActiveCode = cssCode;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        (t as HTMLElement).style.color = 'var(--text-muted)';
        (t as HTMLElement).style.borderBottomColor = 'transparent';
      });
      (tab as HTMLElement).style.color = '#fff';
      (tab as HTMLElement).style.borderBottomColor = 'var(--color-brand-primary)';

      const type = tab.getAttribute('data-tab');
      if (type === 'css') currentActiveCode = cssCode;
      else if (type === 'tailwind') currentActiveCode = tailwindCode;
      else if (type === 'svg') currentActiveCode = svgFilterCode;
      else if (type === 'react') currentActiveCode = reactCode;

      if (codeContent) codeContent.textContent = currentActiveCode;
    });
  });

  // Copy button handlers
  const copyBtn = modal.querySelector('#copy-active-code');
  copyBtn?.addEventListener('click', () => {
    navigator.clipboard.writeText(currentActiveCode);
    showToast('Code copied to clipboard!');
  });

  const quickCopy = modal.querySelector('#copy-css-quick');
  quickCopy?.addEventListener('click', () => {
    navigator.clipboard.writeText(item.css);
    showToast('CSS Gradient copied!');
  });
}
