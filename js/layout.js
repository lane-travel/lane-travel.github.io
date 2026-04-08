// ========================================
// SHARED LAYOUT INJECTOR
// Automatically injects header and footer
// into every page
// ========================================

function initLayout() {
  injectLayoutStyles();
  injectHeader();
  injectFooter();
}

function injectLayoutStyles() {
  if (document.getElementById('layout-styles')) return; // Already injected

  const styles = document.createElement('style');
  styles.id = 'layout-styles';
  styles.textContent = `
    :root {
      --brand: #1749FF;
      --brand-mid: #1235CC;
      --brand-light: #4A6FFF;
      --brand-pale: #EEF2FF;
      --bg: #FFFFFF;
      --bg-mid: #F5F7FF;
      --bg-dark: #E2E8F0;
      --ink: #0A0A14;
      --ink-mid: #1E1E2E;
      --ink-light: #4A4A6A;
      --muted: #94A3B8;
    }

    /* ─── NAV ─── */
    nav#mainNav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      padding: 18px 48px;
      display: flex; align-items: center; justify-content: space-between;
      background: rgba(10, 10, 20, 0.96);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      transition: all 0.4s ease;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    nav#mainNav.scrolled {
      padding: 12px 48px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .nav-logo {
      display: flex; align-items: center; gap: 10px; cursor: pointer; text-decoration: none;
    }
    .nav-logo img { height: 30px; width: auto; display: block; }
    .nav-logo-text { display: flex; flex-direction: column; gap: 0; }
    .nav-logo-name { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 15px; color: white; letter-spacing: -0.3px; line-height: 1.1; }
    .nav-logo-sub { font-family: 'Outfit', sans-serif; font-size: 9.5px; font-weight: 500; color: rgba(255,255,255,0.45); letter-spacing: 2px; text-transform: uppercase; }
    .nav-links { display: flex; gap: 28px; list-style: none; }
    .nav-links a {
      font-family: 'Outfit', sans-serif; font-size: 0.82rem; font-weight: 500;
      color: rgba(255,255,255,0.6); transition: color 0.3s; letter-spacing: 0.01em; text-decoration: none;
    }
    .nav-links a:hover { color: white; }
    .nav-right { display: flex; align-items: center; gap: 20px; }
    .nav-cta {
      display: inline-flex; align-items: center; gap: 7px;
      padding: 10px 22px; border-radius: 100px;
      background: var(--brand, #1749FF); color: white;
      font-family: 'Outfit', sans-serif; font-size: 0.8rem; font-weight: 700;
      transition: all 0.3s; cursor: pointer; border: none;
      letter-spacing: 0.01em; text-decoration: none;
    }
    .nav-cta:hover { background: var(--brand-light, #4A6FFF); transform: translateY(-1px); }

    /* Hamburger */
    .hamburger {
      display: none; flex-direction: column; gap: 5px;
      cursor: pointer; padding: 4px; background: none; border: none;
    }
    .hamburger span { display: block; width: 22px; height: 1.5px; background: white; transition: all 0.3s; }
    .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(4px, 4px); }
    .hamburger.open span:nth-child(2) { opacity: 0; }
    .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(4px, -4px); }

    /* Mobile nav */
    .mobile-nav {
      display: none;
      position: fixed;
      top: 70px; left: 0; right: 0; bottom: 0;
      background: rgba(10, 10, 20, 0.98);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      flex-direction: column;
      padding: 32px 48px;
      z-index: 99;
      gap: 0;
    }
    .mobile-nav.open { display: flex; }
    .mobile-nav a {
      display: block;
      padding: 16px 0;
      color: rgba(255,255,255,0.7);
      text-decoration: none;
      font-size: 1.1rem;
      font-weight: 500;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      transition: color 0.3s;
    }
    .mobile-nav a:hover { color: white; }
    .mobile-nav .mobile-cta {
      margin-top: 20px;
      background: var(--brand, #1749FF);
      color: white;
      text-align: center;
      padding: 14px;
      border-radius: 100px;
      font-weight: 700;
      border-bottom: none;
    }

    @media (max-width: 768px) {
      nav#mainNav { padding: 14px 20px; }
      .nav-links { display: none; }
      .nav-right { gap: 15px; }
      .hamburger { display: flex; }
      .mobile-nav { top: 60px; padding: 20px; }
    }

    body { padding-top: 80px; }
    @media (max-width: 768px) {
      body { padding-top: 70px; }
    }

    /* ─── FOOTER ─── */
    footer {
      border-top: 1px solid rgba(0, 0, 0, 0.08);
      padding: 64px 48px 20px;
      background: var(--ink-mid);
      color: white;
    }

    .footer-top {
      max-width: 1400px;
      margin: 0 auto 48px;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
      gap: 48px;
    }

    .footer-brand {
      max-width: 280px;
    }

    .footer-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 16px;
    }

    .footer-logo img {
      height: 36px;
      width: auto;
    }

    .footer-tagline {
      font-family: 'Outfit', sans-serif;
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.5);
      line-height: 1.7;
    }

    .footer-links-col h4 {
      font-family: 'Sora', sans-serif;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: rgba(255, 255, 255, 0.4);
      margin-bottom: 16px;
    }

    .footer-links-col ul {
      list-style: none;
    }

    .footer-links-col li {
      margin-bottom: 12px;
    }

    .footer-links-col a {
      font-family: 'Outfit', sans-serif;
      font-size: 0.88rem;
      color: rgba(255, 255, 255, 0.65);
      text-decoration: none;
      transition: color 0.3s;
    }

    .footer-links-col a:hover {
      color: white;
    }

    .footer-bottom {
      max-width: 1400px;
      margin: 20px auto 0;
      padding: 16px 0;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.35);
      text-align: center;
    }

    .footer-love {
      font-family: 'Outfit', sans-serif;
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.45);
    }

    .footer-love a {
      color: rgba(255, 255, 255, 0.65);
      text-decoration: none;
    }

    .footer-love a:hover {
      color: white;
    }

    .footer-copy {
      font-family: 'Outfit', sans-serif;
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.45);
    }

    .footer-divider {
      font-family: 'Outfit', sans-serif;
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.3);
    }

    .footer-contact {
      font-family: 'Outfit', sans-serif;
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.45);
    }

    .footer-florida {
      font-family: 'Outfit', sans-serif;
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.45);
    }

    @media (max-width: 1024px) {
      .footer-top {
        grid-template-columns: 1.5fr 1fr 1fr;
        gap: 40px;
      }
    }

    @media (max-width: 768px) {
      footer {
        padding: 40px 20px 16px;
      }

      .footer-top {
        grid-template-columns: 1fr;
        gap: 30px;
      }

      .footer-bottom {
        flex-direction: column;
        text-align: center;
        gap: 4px;
      }

      .footer-copy {
        text-align: center;
      }

      .footer-divider {
        display: none;
      }
    }

  `;
  document.head.appendChild(styles);
}

function injectHeader() {
  if (document.querySelector('#mainNav')) return; // Already exists

  // Detect if we're in a subdirectory
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const htmlFile = pathParts[pathParts.length - 1] || '';
  const depth = pathParts.length - (htmlFile.endsWith('.html') ? 1 : 0);
  const prefix = depth > 0 ? '../'.repeat(depth) : '';
  // For GitHub Pages or similar where site is at root
  const isSubdir = window.location.pathname.includes('/thank-you/');
  const p = isSubdir ? '../' : '';

  const nav = document.createElement('nav');
  nav.id = 'mainNav';
  nav.innerHTML = `
    <a href="${p}index.html" class="nav-logo">
      <img src="${p}assets/weekndr-logo-white.png" alt="Weekndr" style="height:30px;width:auto;">
      <div class="nav-logo-text">
        <span class="nav-logo-name">Nathan Lane</span>
        <span class="nav-logo-sub">Travel Agent</span>
      </div>
    </a>
    <ul class="nav-links">
      <li><a href="${p}index.html#how">How It Works</a></li>
      <li><a href="${p}services.html">Services</a></li>
      <li><a href="${p}destinations.html">Destinations</a></li>
      <li><a href="${p}index.html#about">About</a></li>
      <li><a href="${p}index.html#contact">Contact</a></li>
    </ul>
    <div class="nav-right">
      <a href="${p}index.html#contact" class="nav-cta">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 19-7z"/></svg>
        Book a Trip
      </a>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  `;

  const mobileNav = document.createElement('div');
  mobileNav.className = 'mobile-nav';
  mobileNav.id = 'mobileNav';
  mobileNav.innerHTML = `
    <a href="${p}index.html#how">How It Works</a>
    <a href="${p}services.html">Services</a>
    <a href="${p}destinations.html">Destinations</a>
    <a href="${p}index.html#about">About</a>
    <a href="${p}index.html#contact" class="mobile-cta">Book a Trip</a>
  `;

  document.body.insertBefore(mobileNav, document.body.firstChild);
  document.body.insertBefore(nav, document.body.firstChild);

  // Scroll listener
  window.addEventListener('scroll', () => {
    document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 40);
  });

  // Mobile nav
  const hamburger = document.getElementById('hamburger');
  const mobileNavEl = document.getElementById('mobileNav');

  hamburger.addEventListener('click', () => {
    mobileNavEl.classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  mobileNavEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNavEl.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });
}

function injectFooter() {
  if (document.querySelector('footer')) return;

  const isSubdir = window.location.pathname.includes('/thank-you/');
  const p = isSubdir ? '../' : '';

  const footer = document.createElement('footer');
  footer.innerHTML = `
    <div class="footer-top">
      <div class="footer-brand">
        <div class="footer-logo">
          <img src="${p}assets/weekndr-logo-white.png" alt="Weekndr">
        </div>
        <p class="footer-tagline">Las Vegas–based independent travel agent. Hotels, experiences, and digital itineraries — all built around you.</p>
      </div>
      <div class="footer-links-col">
        <h4>Plan a Trip</h4>
        <ul>
          <li><a href="${p}index.html#how">How It Works</a></li>
          <li><a href="${p}services.html">Services</a></li>
          <li><a href="${p}index.html#contact">Start Planning</a></li>
        </ul>
      </div>
      <div class="footer-links-col">
        <h4>Destinations</h4>
        <ul>
          <li><a href="${p}destinations.html">All Destinations</a></li>
          <li><a href="${p}index.html#how">Popular Spots</a></li>
          <li><a href="${p}destinations.html">Browse by Type</a></li>
        </ul>
      </div>
      <div class="footer-links-col">
        <h4>Connect</h4>
        <ul>
          <li><a href="mailto:GoWeekndr@outlook.com">Email</a></li>
          <li><a href="https://instagram.com/LasVegasTravelAgent" target="_blank">Instagram</a></li>
          <li><a href="https://tiktok.com/@NathanLane.LV" target="_blank">TikTok</a></li>
        </ul>
      </div>
      <div class="footer-links-col">
        <h4>Legal</h4>
        <ul>
          <li><a href="${p}legal.html">Privacy & Terms</a></li>
          <li><a href="${p}legal.html#fcc-affiliate-disclosure">Affiliate Disclosure</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span class="footer-copy">© ${new Date().getFullYear()} Weekndr · Nathan Lane Travel</span>
      <span class="footer-divider">·</span>
      <span class="footer-love">Made with ❤️ in Las Vegas</span>
      <span class="footer-divider">·</span>
      <span class="footer-contact"><a href="mailto:GoWeekndr@outlook.com" style="color:rgba(255,255,255,0.65);text-decoration:none;">GoWeekndr@outlook.com</a></span>
      <span class="footer-divider">·</span>
      <span class="footer-florida">Services not available to residents of Florida.</span>
    </div>
  `;

  document.body.appendChild(footer);
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLayout);
} else {
  initLayout();
}
