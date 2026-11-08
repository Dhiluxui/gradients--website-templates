/**
 * Gradient Card Component
 * Phase 1 & 4 Compliance: Accessible card markup, hover zoom, quick copy action.
 */

import { GradientItem } from '../data/gradients';
import { openGradientModal } from './Modal';
import { showToast } from './Toast';

export function createGradientCardElement(item: GradientItem): HTMLElement {
  const card = document.createElement('div');
  card.className = 'card-glass gradient-card';
  card.setAttribute('data-category', item.category);
  card.setAttribute('data-id', item.id);
  card.style.display = 'flex';
  card.style.flexDirection = 'column';
  card.style.cursor = 'pointer';

  card.innerHTML = `
    <!-- Thumbnail Preview Box -->
    <div class="gradient-preview-box" style="position: relative; width: 100%; aspect-ratio: 16/10; overflow: hidden; background: ${item.css};">
      <div class="noise-overlay"></div>
      
      <!-- Top Badges -->
      <div style="position: absolute; top: 0.75rem; left: 0.75rem; display: flex; gap: 0.35rem; z-index: 2;">
        <span class="badge-tag" style="background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); color: #fff;">
          ${item.category.replace('-', ' ')}
        </span>
        ${item.isPro ? '<span class="badge-pill" style="padding: 0.15rem 0.4rem; font-size: 0.65rem;">PRO</span>' : ''}
      </div>

      <!-- Quick Copy Action Overlay (Appears on Hover) -->
      <div class="card-hover-actions" style="position: absolute; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; gap: 0.5rem; opacity: 0; transition: opacity 0.2s ease; z-index: 3;">
        <button class="btn btn-primary btn-sm quick-copy-btn">
          <span>Copy CSS</span>
        </button>
        <button class="btn btn-secondary btn-sm inspect-btn">
          <span>Inspect</span>
        </button>
      </div>
    </div>

    <!-- Card Metadata -->
    <div style="padding: 1.15rem; display: flex; flex-direction: column; gap: 0.5rem; background: var(--bg-card); flex: 1;">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <h4 class="text-h5" style="margin: 0; font-size: 1rem; color: #fff;">${item.name}</h4>
      </div>
      
      <p class="text-p-sm" style="margin: 0; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
        ${item.description}
      </p>

      <!-- Color Dots & Tags -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 0.5rem;">
        <div style="display: flex; gap: 0.25rem;">
          ${item.colors.map(c => `
            <span style="width: 10px; height: 10px; border-radius: 50%; background: ${c}; border: 1px solid rgba(255,255,255,0.2);"></span>
          `).join('')}
        </div>
        <div style="display: flex; gap: 0.25rem;">
          ${item.tags.slice(0, 2).map(tag => `
            <span class="badge-tag">${tag}</span>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Hover effect styles
  const previewBox = card.querySelector('.gradient-preview-box') as HTMLElement;
  const hoverActions = card.querySelector('.card-hover-actions') as HTMLElement;

  previewBox.addEventListener('mouseenter', () => {
    hoverActions.style.opacity = '1';
  });
  previewBox.addEventListener('mouseleave', () => {
    hoverActions.style.opacity = '0';
  });

  // Action listeners
  const copyBtn = card.querySelector('.quick-copy-btn');
  copyBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.css);
    showToast(`CSS for "${item.name}" copied!`);
  });

  const inspectBtn = card.querySelector('.inspect-btn');
  inspectBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    openGradientModal(item);
  });

  card.addEventListener('click', () => {
    openGradientModal(item);
  });

  return card;
}
