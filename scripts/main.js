/* ═══════════════════════════════════════════════════════════
   main.js — Audiosensible
   Scroll-top · Nav scroll · Burger menu · Dropdown clavier
   Hero canvas waveform · Compteur Hz · Scroll reveal
   ═══════════════════════════════════════════════════════════ */

// ── SCROLL TOP ──
const scrollTopBtn = document.getElementById('scroll-top');

if (scrollTopBtn) {
  window.addEventListener('scroll', function () {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });

  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── NAV SCROLL ──
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ── DROPDOWN RESSOURCES (support clavier) ──
const dropdownTrigger = document.getElementById('btn-ressources');
const dropdownMenu    = document.getElementById('dropdown-ressources');

if (dropdownTrigger && dropdownMenu) {
  // Keyboard: Enter/Space ouvre/ferme, Escape ferme
  dropdownTrigger.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const isOpen = dropdownTrigger.getAttribute('aria-expanded') === 'true';
      dropdownTrigger.setAttribute('aria-expanded', !isOpen);
    }
    if (e.key === 'Escape') {
      dropdownTrigger.setAttribute('aria-expanded', 'false');
      dropdownTrigger.focus();
    }
  });

  // Fermer dropdown si focus quitte la zone
  dropdownMenu.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      dropdownTrigger.setAttribute('aria-expanded', 'false');
      dropdownTrigger.focus();
    }
  });

  // Fermer dropdown si clic en dehors
  document.addEventListener('click', function (e) {
    if (!dropdownTrigger.closest('li').contains(e.target)) {
      dropdownTrigger.setAttribute('aria-expanded', 'false');
    }
  });
}

// ── BURGER / MENU MOBILE ──
const burger    = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');

if (burger && mobileNav) {
  function toggleMenu() {
    const isOpen = mobileNav.classList.toggle('open');
    mobileNav.style.display = isOpen ? 'flex' : 'none';
    mobileNav.setAttribute('aria-hidden', !isOpen);
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
    burger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  burger.addEventListener('click', toggleMenu);
  burger.addEventListener('keydown', function (e) {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggleMenu(); }
  });

  document.querySelectorAll('.mobile-link').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      mobileNav.style.display = 'none';
      mobileNav.setAttribute('aria-hidden', 'true');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Ouvrir le menu');
      document.body.style.overflow = '';
    });
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024) {
      mobileNav.classList.remove('open');
      mobileNav.style.display = 'none';
      mobileNav.setAttribute('aria-hidden', 'true');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// ── HERO CANVAS — WAVEFORM ──
const heroCanvas = document.getElementById('heroCanvas');

if (heroCanvas) {
  const hCtx  = heroCanvas.getContext('2d');
  const LINES = 28;
  let heroT   = 0;

  function resizeHero() {
    heroCanvas.width  = heroCanvas.offsetWidth  * devicePixelRatio;
    heroCanvas.height = heroCanvas.offsetHeight * devicePixelRatio;
    hCtx.scale(devicePixelRatio, devicePixelRatio);
  }
  resizeHero();
  window.addEventListener('resize', resizeHero);

  function drawHeroWave() {
    const W = heroCanvas.offsetWidth;
    const H = heroCanvas.offsetHeight;
    hCtx.clearRect(0, 0, W, H);
    heroT += 0.008;

    for (let i = 0; i < LINES; i++) {
      const y0    = (i / LINES) * H;
      const freq  = 0.3 + (i / LINES) * 2.5;
      const amp   = 8 + (i / LINES) * 40;
      const phase = i * 0.4 + heroT * (0.5 + i * 0.08);
      const alpha = 0.04 + (i / LINES) * 0.18;

      hCtx.beginPath();
      for (let x = 0; x <= W; x += 2) {
        const nx = x / W;
        const y  = y0
          + Math.sin(nx * Math.PI * 2 * freq + phase) * amp
          + Math.sin(nx * Math.PI * 3 * freq + phase * 1.3) * (amp * 0.4);
        x === 0 ? hCtx.moveTo(x, y) : hCtx.lineTo(x, y);
      }
      hCtx.strokeStyle = `rgba(139,26,26,${alpha})`;
      hCtx.lineWidth   = 0.8;
      hCtx.stroke();
    }

    // Ligne centrale accentuée
    const midPhase = heroT * 1.2;
    hCtx.beginPath();
    for (let x = 0; x <= W; x += 2) {
      const nx = x / W;
      const y  = H * 0.5
        + Math.sin(nx * Math.PI * 4 + midPhase) * 60
        + Math.sin(nx * Math.PI * 7 + midPhase * 1.5) * 25;
      x === 0 ? hCtx.moveTo(x, y) : hCtx.lineTo(x, y);
    }
    hCtx.strokeStyle = 'rgba(139,26,26,0.45)';
    hCtx.lineWidth   = 1.5;
    hCtx.stroke();

    requestAnimationFrame(drawHeroWave);
  }
  drawHeroWave();
}

// ── COMPTEUR FRÉQUENCES ──
const freqEl = document.getElementById('freqCounter');
if (freqEl) {
  let freqVal   = 20;
  let freqDir   = 1;
  let freqSpeed = 48;

  setInterval(function () {
    freqVal += freqDir * freqSpeed;
    if (freqVal >= 20000) { freqVal = 20000; freqDir = -1; freqSpeed = 1200; }
    if (freqVal <= 20)    { freqVal = 20;    freqDir =  1; freqSpeed = 48;   }
    freqEl.textContent = freqVal >= 1000
      ? (freqVal / 1000).toFixed(1) + 'k'
      : freqVal;
  }, 60);
}

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(function (el) { revealObserver.observe(el); });
}