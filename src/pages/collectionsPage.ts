/**
 * Collections & Category Page Logic
 * Phase 4 Compliance: Modular, typed, < 450 lines.
 */

import { renderNavbar, initNavbarInteractions } from '../components/Navbar';
import { renderFooter } from '../components/Footer';
import { GRADIENTS_DATA, GradientItem } from '../data/gradients';
import { createGradientCardElement } from '../components/GradientCard';

export function initCollectionsPage(defaultCategory: string = 'all'): void {
  const navRoot = document.getElementById('navbar-root');
  if (navRoot) navRoot.innerHTML = renderNavbar(defaultCategory === 'all' ? 'collections' : defaultCategory);

  const footerRoot = document.getElementById('footer-root');
  if (footerRoot) footerRoot.innerHTML = renderFooter();

  initNavbarInteractions();

  const gridContainer = document.getElementById('collections-grid');
  const searchInput = document.getElementById('gallery-search') as HTMLInputElement | null;
  const sortSelect = document.getElementById('gallery-sort') as HTMLSelectElement | null;
  const categoryFilters = document.querySelectorAll('.cat-pill');

  let activeCategory = defaultCategory;
  let searchQuery = '';
  let sortBy = 'featured';

  function renderGrid(): void {
    if (!gridContainer) return;
    gridContainer.innerHTML = '';

    let items = GRADIENTS_DATA.filter((item: GradientItem) => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch = !searchQuery ||
        item.name.toLowerCase().includes(searchQuery) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery));
      return matchCat && matchSearch;
    });

    if (sortBy === 'name') {
      items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'pro') {
      items.sort((a, b) => (b.isPro ? 1 : 0) - (a.isPro ? 1 : 0));
    }

    if (items.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <h3 class="text-h4" style="color: var(--text-muted);">No gradient assets found</h3>
          <p class="text-p-sm">Try clearing your search filter or selecting another category.</p>
        </div>
      `;
      return;
    }

    items.forEach(item => {
      gridContainer.appendChild(createGradientCardElement(item));
    });
  }

  categoryFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.getAttribute('data-cat') || 'all';
      categoryFilters.forEach(b => {
        if (b === btn) {
          b.classList.add('btn-primary');
          b.classList.remove('btn-secondary');
        } else {
          b.classList.remove('btn-primary');
          b.classList.add('btn-secondary');
        }
      });
      renderGrid();
    });
  });

  searchInput?.addEventListener('input', () => {
    searchQuery = (searchInput.value || '').trim().toLowerCase();
    renderGrid();
  });

  sortSelect?.addEventListener('change', () => {
    sortBy = sortSelect.value;
    renderGrid();
  });

  renderGrid();
}

