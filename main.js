/* ============================================================
   main.js — IA_Estudiantes
   Vanilla JS — sin dependencias externas
   ============================================================ */

'use strict';

/* ----------------------------------------------------------
   1. MENÚ MÓVIL (hamburguesa)
   ---------------------------------------------------------- */
(function initMobileMenu() {
  const btn  = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', function () {
    const isOpen = !menu.classList.contains('hidden');
    menu.classList.toggle('hidden', isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
  });

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();


/* ----------------------------------------------------------
   2. TOGGLE MODO CLARO / OSCURO
   ---------------------------------------------------------- */
(function initThemeToggle() {
  const btn  = document.getElementById('theme-toggle');
  const html = document.documentElement;
  if (!btn) return;

  // Aplicar tema guardado
  const saved = localStorage.getItem('ia-theme');
  if (saved === 'light') {
    html.setAttribute('data-theme', 'light');
    btn.textContent = '🌙';
    btn.setAttribute('aria-label', 'Cambiar a modo oscuro');
  } else {
    btn.textContent = '☀️';
    btn.setAttribute('aria-label', 'Cambiar a modo claro');
  }

  btn.addEventListener('click', function () {
    const isLight = html.getAttribute('data-theme') === 'light';
    if (isLight) {
      html.removeAttribute('data-theme');
      btn.textContent = '☀️';
      btn.setAttribute('aria-label', 'Cambiar a modo claro');
      localStorage.setItem('ia-theme', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
      btn.textContent = '🌙';
      btn.setAttribute('aria-label', 'Cambiar a modo oscuro');
      localStorage.setItem('ia-theme', 'light');
    }
  });
})();


/* ----------------------------------------------------------
   3. ANIMACIONES DE TARJETAS — IntersectionObserver
   ---------------------------------------------------------- */
(function initCardAnimations() {
  const cards = document.querySelectorAll('.card-animate');
  if (!cards.length) return;

  // Si el navegador no soporta IntersectionObserver, mostrar todo
  if (!('IntersectionObserver' in window)) {
    cards.forEach(function (c) { c.classList.add('card-visible'); });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('card-visible');
          observer.unobserve(entry.target); // solo se anima una vez
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  cards.forEach(function (card) { observer.observe(card); });
})();


/* ----------------------------------------------------------
   4. FILTRO DE TARJETAS DEL DIRECTORIO
   ---------------------------------------------------------- */
(function initDirectoryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const toolCards  = document.querySelectorAll('.tool-card');
  const noResults  = document.getElementById('no-results');

  if (!filterBtns.length || !toolCards.length) return;

  // Referencia al filtro actualmente activo
  let activeFilter = 'all';

  function applyVisibility() {
    const searchVal = (document.getElementById('search-input')?.value || '').toLowerCase().trim();
    let visible = 0;

    toolCards.forEach(function (card) {
      const categories = (card.dataset.category || '').split(' ');
      const matchesFilter = activeFilter === 'all' || categories.includes(activeFilter);

      const title = (card.querySelector('h3')?.textContent || '').toLowerCase();
      const desc  = (card.querySelector('p')?.textContent  || '').toLowerCase();
      const cats  = (card.dataset.category || '').toLowerCase();
      const matchesSearch = !searchVal ||
        title.includes(searchVal) ||
        desc.includes(searchVal)  ||
        cats.includes(searchVal);

      const show = matchesFilter && matchesSearch;
      card.classList.toggle('hidden-by-filter', !show);
      if (show) visible++;
    });

    if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activeFilter = btn.dataset.filter;

      filterBtns.forEach(function (b) {
        b.classList.remove('active', 'bg-brand-600', 'text-white');
        b.classList.add('bg-slate-800', 'text-slate-300');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active', 'bg-brand-600', 'text-white');
      btn.classList.remove('bg-slate-800', 'text-slate-300');
      btn.setAttribute('aria-pressed', 'true');

      applyVisibility();
    });
  });

  // Exponer para el buscador
  window._applyCardVisibility = applyVisibility;
})();


/* ----------------------------------------------------------
   5. BUSCADOR EN TIEMPO REAL
   ---------------------------------------------------------- */
(function initSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;

  input.addEventListener('input', function () {
    if (typeof window._applyCardVisibility === 'function') {
      window._applyCardVisibility();
    }
  });

  // Limpiar con Escape
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      input.value = '';
      if (typeof window._applyCardVisibility === 'function') {
        window._applyCardVisibility();
      }
      input.blur();
    }
  });
})();


/* ----------------------------------------------------------
   6. BOTÓN VOLVER ARRIBA
   ---------------------------------------------------------- */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ----------------------------------------------------------
   7. AÑO DINÁMICO EN EL FOOTER
   ---------------------------------------------------------- */
(function setCurrentYear() {
  const year = new Date().getFullYear();
  document.querySelectorAll('#current-year').forEach(function (el) {
    el.textContent = year;
  });
})();


/* ----------------------------------------------------------
   8. SMOOTH SCROLL PARA ANCLAS (compatibilidad safari/older)
   ---------------------------------------------------------- */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = anchor.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
