/* ============================================================
   main.js — IA_Estudiantes
   Vanilla JS — sin dependencias externas
   ============================================================ */

'use strict';

/* ----------------------------------------------------------
   1. MENÚ MÓVIL (hamburguesa)
   ---------------------------------------------------------- */
(function initMobileMenu() {
  const btn      = document.getElementById('mobile-menu-btn');
  const menu     = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', function () {
    const isOpen = !menu.classList.contains('hidden');
    menu.classList.toggle('hidden', isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
  });

  // Cerrar al hacer clic en un enlace del menú
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();


/* ----------------------------------------------------------
   3. FILTRO DE TARJETAS DEL DIRECTORIO
   ---------------------------------------------------------- */
(function initDirectoryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const toolCards  = document.querySelectorAll('.tool-card');

  if (!filterBtns.length || !toolCards.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = btn.dataset.filter;

      // Actualizar estado activo de los botones
      filterBtns.forEach(function (b) {
        b.classList.remove('active', 'bg-brand-600', 'text-white');
        b.classList.add('bg-slate-800', 'text-slate-300');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active', 'bg-brand-600', 'text-white');
      btn.classList.remove('bg-slate-800', 'text-slate-300');
      btn.setAttribute('aria-pressed', 'true');

      // Mostrar/ocultar tarjetas según el filtro
      toolCards.forEach(function (card) {
        const categories = (card.dataset.category || '').split(' ');

        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('hidden-by-filter');
          // Reiniciar animación de entrada
          card.style.animation = 'none';
          void card.offsetWidth; // reflow
          card.style.animation = '';
        } else {
          card.classList.add('hidden-by-filter');
        }
      });
    });
  });
})();


/* ----------------------------------------------------------
   4. AÑO DINÁMICO EN EL FOOTER
   ---------------------------------------------------------- */
(function setCurrentYear() {
  const yearEls = document.querySelectorAll('#current-year');
  const year    = new Date().getFullYear();
  yearEls.forEach(function (el) { el.textContent = year; });
})();


/* ----------------------------------------------------------
   5. SMOOTH SCROLL PARA ANCLAS (compatibilidad safari/older)
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
