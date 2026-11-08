/**
 * Navigation Bar Component
 * Phase 1 & 4 Compliance: Auto layout flexbox, responsive mobile drawer, accessible states.
 */

export function renderNavbar(activePage: string = 'home'): string {
  const links = [
    { id: 'collections', label: 'Collections', href: '/collections.html' },
    { id: 'animated', label: 'Animated Gradients', href: '/animated-gradients.html' },
    { id: 'shader', label: 'Shader Tool', href: '/shader.html' },
    { id: 'pricing', label: 'Pricing', href: '/pricing.html' },
    { id: 'faq', label: 'FAQ', href: '/faq.html' },
  ];

  const navLinksHtml = links
    .map(link => {
      const isActive = activePage === link.id;
      const activeClass = isActive
        ? 'color: #fff; background: rgba(255,255,255,0.08);'
        : 'color: var(--text-secondary);';
      return `
        <a href="${link.href}" class="nav-link" style="padding: 0.4rem 0.85rem; border-radius: var(--radius-full); text-decoration: none; font-size: 0.875rem; font-weight: 500; transition: all 0.15s ease; ${activeClass}">
          ${link.label}
        </a>
      `;
    })
    .join('');

  return `
    <header id="site-header" style="position: sticky; top: 0; z-index: 50; width: 100%; backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); background: rgba(9, 9, 11, 0.75); border-bottom: 1px solid var(--border-subtle);">
      <div class="container" style="display: flex; align-items: center; justify-content: space-between; height: 4.25rem;">
        
        <!-- Brand Logo -->
        <a href="/" style="display: flex; align-items: center; gap: 0.75rem; text-decoration: none;">
          <div style="width: 32px; height: 32px; border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #C2F13C;">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
              <path fill="#000" d="M24.239 15.668a10.3 10.3 0 0 0-.974-2.409c-.35-.632-.578-1.33-.596-2.051a3.54 3.54 0 0 1 .342-1.652q.12-.253.32-.526a.4.4 0 0 0-.069-.553l-.006-.005a.4.4 0 0 0-.471-.028 4.3 4.3 0 0 1-1.357.59c-1.492.363-2.763-.19-3.321-.492a.3.3 0 0 0-.376.07l-.003.005a.3.3 0 0 0 .034.421c.354.304.853.852.934 1.608.058.537-.117.97-.274 1.304-.757 1.598-2.23 3.167-2.987 3.924a.22.22 0 0 0 .014.325l.003.003a.22.22 0 0 0 .3-.015c2.367-2.4 4.96-3.357 6.396-2.488q.144.085.302.223c.413.37.636.906.655 1.462q.005.158.003.316c-.033 2.162-1.707 3.987-3.866 4.108-1.925.107-4.015-.671-5.63-2.286-1.396-1.396-2.168-3.148-2.281-4.84-.167-2.483 1.803-4.586 4.24-4.647a.215.215 0 0 0 .204-.254v-.005a.22.22 0 0 0-.175-.173 8.4 8.4 0 0 0-1.625-.137c-1.774.025-3.421.633-4.647 1.86-2.938 2.938-2.332 8.307 1.352 11.991 3.686 3.685 9.055 4.292 11.993 1.353 1.758-1.758 2.246-4.385 1.566-7.003z"/>
            </svg>
          </div>
          <span style="font-size: 1.15rem; font-weight: 700; letter-spacing: -0.02em; color: #fff;">Grainient</span>
          <span class="badge-pill" style="font-size: 0.65rem; padding: 0.15rem 0.45rem;">v2.0</span>
        </a>

        <!-- Desktop Navigation Pill -->
        <nav class="desktop-nav" style="display: none; align-items: center; gap: 0.25rem; background: rgba(20, 20, 24, 0.8); border: 1px solid var(--border-subtle); padding: 0.35rem 0.5rem; border-radius: var(--radius-full);">
          ${navLinksHtml}
        </nav>

        <!-- Right Action Items -->
        <div style="display: flex; align-items: center; gap: 0.85rem;">
          <a href="/sign-in.html" class="btn btn-tertiary btn-sm" style="display: none;">Sign in</a>
          <a href="/pricing.html" class="btn btn-primary btn-sm" style="font-weight: 700;">
            <span>Get Pro Access</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>

          <!-- Mobile Hamburger Button -->
          <button id="mobile-menu-btn" class="btn btn-secondary btn-sm" aria-label="Toggle menu" style="padding: 0.45rem;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Drawer Menu -->
      <div id="mobile-drawer" style="display: none; border-top: 1px solid var(--border-subtle); background: var(--bg-card); padding: 1.5rem;">
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          ${links
            .map(
              link => `
              <a href="${link.href}" style="padding: 0.65rem 1rem; border-radius: var(--radius-md); text-decoration: none; color: var(--text-primary); font-weight: 500; background: rgba(255,255,255,0.03);">
                ${link.label}
              </a>
            `
            )
            .join('')}
          <div style="border-top: 1px solid var(--border-subtle); margin-top: 0.5rem; padding-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
            <a href="/sign-in.html" class="btn btn-secondary btn-md" style="width: 100%;">Sign In</a>
            <a href="/pricing.html" class="btn btn-primary btn-md" style="width: 100%;">Get Pro Access</a>
          </div>
        </div>
      </div>
    </header>

    <style>
      @media (min-width: 860px) {
        .desktop-nav { display: flex !important; }
        .desktop-nav + div a[href*="sign-in"] { display: inline-flex !important; }
        #mobile-menu-btn { display: none !important; }
      }
      .nav-link:hover {
        color: #fff !important;
        background: rgba(255,255,255,0.06) !important;
      }
    </style>
  `;
}

export function initNavbarInteractions(): void {
  const btn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  if (btn && drawer) {
    btn.addEventListener('click', () => {
      const isClosed = drawer.style.display === 'none' || !drawer.style.display;
      drawer.style.display = isClosed ? 'block' : 'none';
    });
  }
}
