/* ============================================================
   CORRETOR CAMPEÃO — main.js
   Funcionalidades:
   - Scroll animations (IntersectionObserver)
   - Smooth scroll nos links âncora
   - Sticky header appearance on scroll
   - Smooth counter animation nas stats
   - Parallax sutil no hero
   - Highlight do botão CTA ao scroll
   ============================================================ */

(function () {
  'use strict';

  /* ─────────────────────────────────
     1. SCROLL ANIMATIONS
  ───────────────────────────────── */
  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // stagger para filhos
          const siblings = Array.from(
            entry.target.parentElement.querySelectorAll('.animate-on-scroll')
          );
          const idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${idx * 0.07}s`;
          entry.target.classList.add('visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    scrollObserver.observe(el);
  });

  /* ─────────────────────────────────
     2. SMOOTH SCROLL EM ÂNCORAS
  ───────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ─────────────────────────────────
     3. PARALLAX SUTIL NO HERO BG
  ───────────────────────────────── */
  const heroBg = document.querySelector('.hero__bg-overlay');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      heroBg.style.transform = `translateY(${scrollY * 0.25}px)`;
    }, { passive: true });
  }

  /* ─────────────────────────────────
     4. COUNTER ANIMATION NAS STATS
  ───────────────────────────────── */
  function animateCounter(el, target, suffix, duration = 1200) {
    let start = 0;
    const step = target / (duration / 16);
    const isFloat = String(target).includes('.');
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      el.textContent = (isFloat ? start.toFixed(1) : Math.floor(start)) + suffix;
    }, 16);
  }

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const raw = el.getAttribute('data-target');
          const suffix = el.getAttribute('data-suffix') || '';
          if (raw) animateCounter(el, parseFloat(raw), suffix);
          statsObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  // Configura os contadores nas stat cards
  const statMap = [
    { selector: '.hero__stats .stat:nth-child(1) .stat__number', target: 60, suffix: '' },
    { selector: '.hero__stats .stat:nth-child(3) .stat__number', target: 25, suffix: '+' },
  ];

  statMap.forEach(({ selector, target, suffix }) => {
    const el = document.querySelector(selector);
    if (el) {
      el.setAttribute('data-target', target);
      el.setAttribute('data-suffix', suffix);
      el.textContent = '0' + suffix;
      statsObserver.observe(el);
    }
  });

  /* ─────────────────────────────────
     5. BOTÃO CTA — PULSE AFTER SCROLL
  ───────────────────────────────── */
  const ctaHero = document.getElementById('cta-hero');
  if (ctaHero) {
    // Adiciona pulso depois de 3 s para chamar atenção
    setTimeout(() => {
      ctaHero.classList.add('pulse');
    }, 3000);
  }

  /* ─────────────────────────────────
     6. HEADER MINI (aparece ao scrollar)
  ───────────────────────────────── */
  let miniHeader = null;

  function createMiniHeader() {
    miniHeader = document.createElement('div');
    miniHeader.classList.add('mini-header');
    miniHeader.innerHTML = `
      <div class="mini-header__inner">
        <span class="mini-header__brand">Corretor Campeão</span>
        <a href="#inscricao" class="btn btn--primary" style="padding:10px 24px;font-size:0.82rem;">
          <i class="fa-solid fa-bolt"></i> Garantir Acesso
        </a>
      </div>
    `;
    document.body.appendChild(miniHeader);

    // Adiciona CSS inline para o mini-header (evita outro arquivo)
    const style = document.createElement('style');
    style.textContent = `
      .mini-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9998;
        background: rgba(10,10,10,0.92);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid rgba(45,92,219,0.2);
        transform: translateY(-100%);
        transition: transform 0.35s ease;
        padding: 12px 0;
      }
      .mini-header.visible {
        transform: translateY(0);
      }
      .mini-header__inner {
        max-width: 1100px;
        margin: 0 auto;
        padding: 0 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .mini-header__brand {
        font-family: 'Montserrat', sans-serif;
        font-weight: 800;
        font-size: 1rem;
        background: linear-gradient(90deg, #4e8bff 0%, #a0c4ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .btn.pulse {
        animation: btnPulse 2s ease infinite;
      }
      @keyframes btnPulse {
        0%,100% { box-shadow: 0 0 0 0 rgba(58,111,255,0.5); }
        50%      { box-shadow: 0 0 0 12px rgba(58,111,255,0); }
      }
    `;
    document.head.appendChild(style);
  }

  createMiniHeader();

  const heroSection = document.getElementById('hero');

  window.addEventListener('scroll', () => {
    if (!miniHeader) return;
    const heroBottom = heroSection ? heroSection.getBoundingClientRect().bottom : 600;
    if (heroBottom < 0) {
      miniHeader.classList.add('visible');
    } else {
      miniHeader.classList.remove('visible');
    }
  }, { passive: true });

  /* ─────────────────────────────────
     7. HOVER EFEITO NOS MÓDULOS
  ───────────────────────────────── */
  document.querySelectorAll('.module-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = 'rgba(58,111,255,0.4)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = '';
    });
  });

  /* ─────────────────────────────────
     8. CLICK NOS PLACEHOLDERS → alerta de instrução
  ───────────────────────────────── */
  const placeholders = document.querySelectorAll(
    '.course-image-placeholder, .bonus-image-placeholder, .mentor__photo-placeholder'
  );

  placeholders.forEach((ph) => {
    ph.setAttribute('title', 'Clique para ver como substituir esta imagem');
    ph.style.cursor = 'pointer';
    ph.addEventListener('click', () => {
      showToast('Para adicionar sua foto, substitua o elemento placeholder pelo tag <img src="sua-foto.jpg" /> no HTML.');
    });
  });

  /* ─────────────────────────────────
     9. TOAST NOTIFICATION
  ───────────────────────────────── */
  function showToast(message, duration = 5000) {
    // Remove toast existente
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 28px;
      background: #1a3fa3;
      color: #e8eaf0;
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      padding: 14px 20px;
      border-radius: 12px;
      max-width: 340px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      z-index: 99999;
      border: 1px solid rgba(58,111,255,0.4);
      line-height: 1.5;
      animation: toastIn 0.3s ease;
    `;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes toastIn {
        from { opacity: 0; transform: translateY(12px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s ease';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 400);
    }, duration);
  }

  // Link Hotmart configurado corretamente

  console.log('%c🏆 Corretor Campeão — Landing Page', 'color:#4e8bff;font-weight:bold;font-size:14px;');
  console.log('%cPara personalizar: substitua #LINK_HOTMART_AQUI pelo link real do seu produto.', 'color:#9ba3b8;font-size:12px;');

})();
