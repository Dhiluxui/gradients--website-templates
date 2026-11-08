/**
 * Home Page Logic & Interactive Mounting
 * Phase 4 & 5 Compliance: Modular logic, keeps HTML lean, strict TS typing.
 */

import { renderNavbar, initNavbarInteractions } from '../components/Navbar';
import { renderFooter } from '../components/Footer';
import { GRADIENTS_DATA, GradientItem } from '../data/gradients';
import { createGradientCardElement } from '../components/GradientCard';
import { initShaderStudio } from '../components/ShaderStudio';
import { showToast } from '../components/Toast';

export function initHomePage(): void {
  // Mount Navigation and Footer
  const navRoot = document.getElementById('navbar-root');
  if (navRoot) navRoot.innerHTML = renderNavbar('home');

  const footerRoot = document.getElementById('footer-root');
  if (footerRoot) footerRoot.innerHTML = renderFooter();

  initNavbarInteractions();

  // Initialize embedded Interactive Shader Studio
  initShaderStudio('shader-studio-root');

  // Mount Gradient Grid
  const gridContainer = document.getElementById('curated-grid');
  const searchInput = document.getElementById('gradient-search') as HTMLInputElement | null;
  const categoryFilters = document.querySelectorAll('.cat-filter-btn');

  let activeCategory = 'all';
  let searchQuery = '';

  function renderGrid(): void {
    if (!gridContainer) return;
    gridContainer.innerHTML = '';

    const filtered = GRADIENTS_DATA.filter((item: GradientItem) => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = !searchQuery || 
        item.name.toLowerCase().includes(searchQuery) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery));
      return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem;">
          <p class="text-p-lead" style="color: var(--text-muted);">No gradients matched your search criteria.</p>
          <button id="reset-filter-btn" class="btn btn-secondary btn-sm" style="margin-top: 1rem;">Reset Filters</button>
        </div>
      `;
      const resetBtn = gridContainer.querySelector('#reset-filter-btn');
      resetBtn?.addEventListener('click', () => {
        activeCategory = 'all';
        searchQuery = '';
        if (searchInput) searchInput.value = '';
        updateCategoryButtons();
        renderGrid();
      });
      return;
    }

    filtered.forEach(item => {
      gridContainer.appendChild(createGradientCardElement(item));
    });
  }

  function updateCategoryButtons(): void {
    categoryFilters.forEach(btn => {
      const cat = btn.getAttribute('data-category');
      if (cat === activeCategory) {
        btn.classList.add('btn-primary');
        btn.classList.remove('btn-secondary');
      } else {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
      }
    });
  }

  categoryFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.getAttribute('data-category') || 'all';
      updateCategoryButtons();
      renderGrid();
    });
  });

  searchInput?.addEventListener('input', () => {
    searchQuery = (searchInput.value || '').trim().toLowerCase();
    renderGrid();
  });

  renderGrid();

  // FAQ Accordions
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const answer = item.querySelector('.faq-answer') as HTMLElement | null;
    const icon = item.querySelector('.faq-icon') as HTMLElement | null;

    trigger?.addEventListener('click', () => {
      const isOpen = answer && answer.style.display === 'block';
      faqItems.forEach(other => {
        const otherAns = other.querySelector('.faq-answer') as HTMLElement | null;
        const otherIcon = other.querySelector('.faq-icon') as HTMLElement | null;
        if (otherAns) otherAns.style.display = 'none';
        if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
      });

      if (!isOpen && answer) {
        answer.style.display = 'block';
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // Newsletter form
  const newsletterForm = document.getElementById('newsletter-form');
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]') as HTMLInputElement | null;
    if (emailInput && emailInput.value) {
      showToast('Subscribed! We will notify you when new drop arrives.');
      emailInput.value = '';
    }
  });
}
