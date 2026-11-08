/**
 * Toast Notification System
 * Phase 1 & 4 Compliance: Reusable, accessible, lightweight notification
 */

export function showToast(message: string, duration = 2500): void {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.position = 'fixed';
    toastContainer.style.bottom = '2rem';
    toastContainer.style.right = '2rem';
    toastContainer.style.zIndex = '9999';
    toastContainer.style.display = 'flex';
    toastContainer.style.flexDirection = 'column';
    toastContainer.style.gap = '0.75rem';
    toastContainer.style.pointerEvents = 'none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'card-glass animate-fade-in';
  toast.style.pointerEvents = 'auto';
  toast.style.padding = '0.75rem 1.25rem';
  toast.style.borderRadius = 'var(--radius-full)';
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.gap = '0.5rem';
  toast.style.border = '1px solid var(--border-highlight)';
  toast.style.boxShadow = '0 8px 24px rgba(0,0,0,0.8), 0 0 16px var(--color-brand-glow)';
  toast.style.backgroundColor = 'var(--bg-elevated)';
  toast.style.color = '#fff';
  toast.style.fontSize = '0.875rem';
  toast.style.fontWeight = '500';

  toast.innerHTML = `
    <span style="color: var(--color-brand-primary); display: flex;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </span>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => {
      toast.remove();
    }, 250);
  }, duration);
}
