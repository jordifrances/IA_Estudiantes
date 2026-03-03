/* ============================================================
   main.js — IA_Estudiantes
   Vanilla JS — sin dependencias externas
   ============================================================ */

'use strict';

/* ----------------------------------------------------------
   1. BANNER DE CONSENTIMIENTO DE COOKIES
   ---------------------------------------------------------- */
(function initCookieBanner() {
  const STORAGE_KEY = 'cookie_consent';
  const banner      = document.getElementById('cookie-banner');
  const btnAccept   = document.getElementById('cookie-accept');
  const btnDecline  = document.getElementById('cookie-decline');

  if (!banner) return;

  const savedConsent = localStorage.getItem(STORAGE_KEY);

  // Si ya hay una preferencia guardada, no mostrar el banner
  if (savedConsent) {
    // Si aceptó, podríamos inicializar analytics/ads aquí
    if (savedConsent === 'accepted') {
      loadThirdPartyScripts();
    }
    return;
  }

  // Mostrar el banner con animación
  setTimeout(() => {
    banner.classList.remove('hidden');
    banner.classList.add('visible');
    // Accesibilidad: enfocar el primer botón del banner
    if (btnDecline) btnDecline.focus();
  }, 800);

  // Aceptar todas las cookies
  if (btnAccept) {
    btnAccept.addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, 'accepted');
      hideBanner();
      loadThirdPartyScripts(); // Carga Google Analytics/AdSense si procede
    });
  }

  // Rechazar (solo cookies esenciales)
  if (btnDecline) {
    btnDecline.addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, 'declined');
      hideBanner();
    });
  }

  function hideBanner() {
    banner.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    banner.style.opacity    = '0';
    banner.style.transform  = 'translateY(100%)';
    setTimeout(() => {
      banner.classList.add('hidden');
      banner.classList.remove('visible');
      banner.style.opacity   = '';
      banner.style.transform = '';
    }, 320);
  }

  /**
   * Placeholder: aquí se inicializarían Google Analytics y AdSense 
   * solo DESPUÉS de obtener el consentimiento del usuario.
   * Ejemplo:
   * function loadThirdPartyScripts() {
   *   // window.dataLayer = window.dataLayer || [];
   *   // function gtag(){dataLayer.push(arguments);}
   *   // gtag('js', new Date());
   *   // gtag('config', 'G-XXXXXXXXXX');
   *   // (adsbygoogle = window.adsbygoogle || []).push({});
   * }
   */
  function loadThirdPartyScripts() {
    // TODO: descomenta e integra tu código de GA4 y AdSense aquí
    console.log('[IA_Estudiantes] Consentimiento aceptado — cargando scripts de terceros.');
  }
})();


/* ----------------------------------------------------------
   2. MENÚ MÓVIL (hamburguesa)
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
