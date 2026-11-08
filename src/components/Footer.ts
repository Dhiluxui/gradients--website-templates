/**
 * Footer Component
 * Phase 1 & 4 Compliance: Auto layout, semantic tags, zero broken links.
 */

export function renderFooter(): string {
  return `
    <footer style="border-top: 1px solid var(--border-subtle); background: var(--bg-secondary); margin-top: auto; padding-top: 4.5rem; padding-bottom: 3rem;">
      <div class="container">
        <!-- Main Footer Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 3rem; margin-bottom: 3.5rem;">
          
          <!-- Column 1: Brand Info -->
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <div style="width: 28px; height: 28px; border-radius: 6px; overflow: hidden; background: #C2F13C; display: flex; align-items: center; justify-content: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 32 32">
                  <path fill="#000" d="M24.239 15.668a10.3 10.3 0 0 0-.974-2.409c-.35-.632-.578-1.33-.596-2.051a3.54 3.54 0 0 1 .342-1.652q.12-.253.32-.526a.4.4 0 0 0-.069-.553l-.006-.005a.4.4 0 0 0-.471-.028 4.3 4.3 0 0 1-1.357.59c-1.492.363-2.763-.19-3.321-.492a.3.3 0 0 0-.376.07l-.003.005a.3.3 0 0 0 .034.421c.354.304.853.852.934 1.608.058.537-.117.97-.274 1.304-.757 1.598-2.23 3.167-2.987 3.924a.22.22 0 0 0 .014.325l.003.003a.22.22 0 0 0 .3-.015c2.367-2.4 4.96-3.357 6.396-2.488q.144.085.302.223c.413.37.636.906.655 1.462q.005.158.003.316c-.033 2.162-1.707 3.987-3.866 4.108-1.925.107-4.015-.671-5.63-2.286-1.396-1.396-2.168-3.148-2.281-4.84-.167-2.483 1.803-4.586 4.24-4.647a.215.215 0 0 0 .204-.254v-.005a.22.22 0 0 0-.175-.173 8.4 8.4 0 0 0-1.625-.137c-1.774.025-3.421.633-4.647 1.86-2.938 2.938-2.332 8.307 1.352 11.991 3.686 3.685 9.055 4.292 11.993 1.353 1.758-1.758 2.246-4.385 1.566-7.003z"/>
                </svg>
              </div>
              <span style="font-size: 1.15rem; font-weight: 700; color: #fff;">Grainient</span>
            </div>
            <p class="text-p-sm" style="max-width: 320px; text-wrap: balance;">
              Curated gradients, animated backgrounds, and real-time shader generation tools built specifically for modern UI/UX designers and creative developers.
            </p>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--color-brand-primary); display: inline-block;"></span>
              <span class="text-p-caption" style="color: var(--color-brand-primary); font-weight: 600;">Grainient v2.0 Operational</span>
            </div>
          </div>

          <!-- Column 2: Collections -->
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <span class="text-h6" style="margin-bottom: 0.5rem;">Collections</span>
            <a href="/noisy-grainy.html" class="footer-link">Noisy &amp; Grainy Gradients</a>
            <a href="/smooth-blend.html" class="footer-link">Smooth Blend Gradients</a>
            <a href="/animated-gradients.html" class="footer-link">Abstract Animated Loops</a>
            <a href="/ai-generated.html" class="footer-link">AI Generated Backgrounds</a>
            <a href="/collections.html" class="footer-link">All Collections (1000+)</a>
          </div>

          <!-- Column 3: Tools & Resources -->
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <span class="text-h6" style="margin-bottom: 0.5rem;">Tools &amp; Resources</span>
            <a href="/shader.html" class="footer-link">Real-Time Shader Tool</a>
            <a href="/pricing.html" class="footer-link">Pro Pricing &amp; Licenses</a>
            <a href="/request.html" class="footer-link">Request Custom Pack</a>
            <a href="/faq.html" class="footer-link">Frequently Asked Questions</a>
            <a href="/sign-in.html" class="footer-link">Account Sign In</a>
          </div>

          <!-- Column 4: Community & Licensing -->
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <span class="text-h6" style="margin-bottom: 0.5rem;">Commercial Use</span>
            <p class="text-p-sm">
              All Pro assets include 100% royalty-free commercial licenses for unlimited client &amp; SaaS projects.
            </p>
            <div style="margin-top: 0.5rem;">
              <a href="/pricing.html" class="btn btn-secondary btn-sm" style="width: fit-content;">Unlock Unlimited</a>
            </div>
          </div>
        </div>

        <!-- Bottom Copyright & Socials -->
        <div style="border-top: 1px solid var(--border-subtle); padding-top: 2rem; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem;">
          <p class="text-p-caption">
            &copy; ${new Date().getFullYear()} Grainient.supply. All rights reserved. Built with precision craft.
          </p>
          <div style="display: flex; align-items: center; gap: 1.5rem;">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="footer-link text-p-caption">Twitter / X</a>
            <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" class="footer-link text-p-caption">Dribbble</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="footer-link text-p-caption">GitHub</a>
          </div>
        </div>
      </div>
    </footer>

    <style>
      .footer-link {
        color: var(--text-muted);
        text-decoration: none;
        font-size: 0.875rem;
        transition: color 0.15s ease;
      }
      .footer-link:hover {
        color: var(--color-brand-primary);
      }
    </style>
  `;
}

