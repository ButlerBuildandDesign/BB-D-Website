/* ============================================
   BUTLER BUILD & DESIGN — JAVASCRIPT
   ============================================ */

(function () {
  'use strict';

  // ========= PAGE ROUTING =========
  const pages = {
    home: document.getElementById('page-home'),
    about: document.getElementById('page-about'),
    services: document.getElementById('page-services'),
    portfolio: document.getElementById('page-portfolio'),
    contact: document.getElementById('page-contact'),
  };

  const navLinks = document.querySelectorAll('.nav-link');
  let currentPage = 'home';

  function navigateTo(pageId) {
    if (!pages[pageId]) return;

    // Hide current page
    if (pages[currentPage]) {
      pages[currentPage].classList.remove('active');
    }

    // Show new page
    pages[pageId].classList.add('active');
    currentPage = pageId;

    // Update nav links
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.page === pageId);
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close mobile nav
    const mobileNav = document.getElementById('mobile-nav');
    mobileNav.classList.remove('open');

    // Trigger animations for the new page
    setTimeout(() => triggerAnimations(), 100);

    // Update URL hash for bookmarking
    history.pushState({ page: pageId }, '', `#${pageId}`);
  }

  // Handle all [data-page] clicks
  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('[data-page]');
    if (!trigger) return;

    const pageId = trigger.dataset.page;
    if (pages[pageId]) {
      e.preventDefault();
      navigateTo(pageId);
    }
  });

  // Handle browser back/forward
  window.addEventListener('popstate', function (e) {
    const pageId = (e.state && e.state.page) || 'home';
    navigateTo(pageId);
  });

  // Handle initial hash
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && pages[initialHash]) {
    navigateTo(initialHash);
  }

  // ========= HAMBURGER MENU =========
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  hamburger.addEventListener('click', function () {
    mobileNav.classList.toggle('open');
  });

  // ========= HEADER SCROLL =========
  const header = document.getElementById('site-header');
  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 80) {
      header.style.background = 'rgba(10,10,10,0.98)';
      header.style.boxShadow = '0 2px 40px rgba(0,0,0,0.4)';
    } else {
      header.style.background = 'rgba(10,10,10,0.95)';
      header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  }, { passive: true });

  // ========= SCROLL ANIMATIONS =========
  function triggerAnimations() {
    const elements = document.querySelectorAll('.page.active .fade-up');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
  }

  // Add fade-up to key elements after DOM is ready
  function setupAnimations() {
    const animateSelectors = [
      '.intro-text',
      '.intro-stat-stack',
      '.service-card',
      '.billing-text',
      '.billing-card',
      '.stat-card',
      '.accent-card',
      '.ethos-card',
      '.service-detail-card',
      '.rate-card',
      '.portfolio-card',
      '.contact-info',
      '.contact-form-wrap',
    ];

    animateSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.classList.add('fade-up');
      });
    });

    triggerAnimations();
  }

  // ========= CONTACT FORM =========
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      btn.textContent = 'Sending...';
      btn.style.opacity = '0.7';
      btn.disabled = true;

      // Simulate send (replace with real form handler like Netlify Forms or Formspree)
      setTimeout(() => {
        contactForm.style.display = 'none';
        formSuccess.classList.add('visible');

        btn.textContent = originalText;
        btn.style.opacity = '1';
        btn.disabled = false;
      }, 1200);
    });
  }

  // ========= PORTFOLIO FILTERS =========
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    const filter = btn.dataset.filter;

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Show/hide categories
    document.querySelectorAll('.portfolio-category').forEach(cat => {
      if (filter === 'all' || cat.dataset.category === filter) {
        cat.classList.remove('hidden');
      } else {
        cat.classList.add('hidden');
      }
    });
  });

  // ========= LIGHTBOX =========
  window.openLightbox = function (card) {
    const img = card.querySelector('img');
    const label = card.querySelector('.ba-label');
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbCaption = document.getElementById('lightbox-caption');

    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCaption.textContent = label ? label.textContent : '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function () {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
  };

  // Close lightbox on escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  // Prevent lightbox close when clicking image itself
  document.addEventListener('click', function (e) {
    if (e.target.id === 'lightbox-img') e.stopPropagation();
  });

  // ========= HERO TEXT ENTRANCE =========
  function heroEntrance() {
    const heroEyebrow = document.querySelector('.hero-eyebrow');
    const heroHeadline = document.querySelector('.hero-headline');
    const heroSub = document.querySelector('.hero-sub');
    const heroActions = document.querySelector('.hero-actions');
    const heroBadge = document.querySelector('.hero-badge');

    const elements = [heroEyebrow, heroHeadline, heroSub, heroActions, heroBadge];

    elements.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.8s ease ${i * 0.12}s, transform 0.8s ease ${i * 0.12}s`;

      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100 + i * 120);
    });
  }

  // ========= TRUST STRIP MARQUEE ON MOBILE =========
  function setupTrustStrip() {
    if (window.innerWidth < 768) {
      const strip = document.querySelector('.trust-strip');
      if (strip) {
        strip.style.justifyContent = 'flex-start';
        strip.style.overflowX = 'auto';
        strip.style.gap = '0';
        strip.style.scrollbarWidth = 'none';
      }
    }
  }

  // ========= BILLING CARD HOVER COUNTER =========
  function setupBillingInteraction() {
    document.querySelectorAll('.billing-card, .rate-card').forEach(card => {
      card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateX(4px)';
      });
      card.addEventListener('mouseleave', function () {
        if (!this.classList.contains('featured') && !this.classList.contains('featured-rate')) {
          this.style.transform = '';
        }
      });
    });
  }

  // ========= SMOOTH NUMBER REVEAL =========
  function animateValue(el, start, end, duration, prefix = '', suffix = '') {
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
      const current = Math.floor(eased * (end - start) + start);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // ========= ACTIVE SECTION DETECTION =========
  function detectActiveSection() {
    const scrollY = window.scrollY;

    // Highlight nav based on scroll position within home page
    if (currentPage === 'home') {
      // Nothing needed for single-page sections currently
    }
  }

  window.addEventListener('scroll', detectActiveSection, { passive: true });

  // ========= LOGO CLICK =========
  document.querySelectorAll('.logo[data-page]').forEach(logo => {
    logo.addEventListener('click', function () {
      navigateTo(this.dataset.page || 'home');
    });
  });

  // ========= INIT =========
  document.addEventListener('DOMContentLoaded', function () {
    setupAnimations();
    heroEntrance();
    setupTrustStrip();
    setupBillingInteraction();

    // Set initial active nav
    navLinks.forEach(link => {
      if (link.dataset.page === currentPage) {
        link.classList.add('active');
      }
    });
  });

  // Re-trigger animations on page navigation (already called in navigateTo)
  // Also handle resize
  window.addEventListener('resize', function () {
    setupTrustStrip();
  }, { passive: true });

})();
