/* Trofej Martina na H. — skripty v4
   Vanilla JS pro navigaci a odpočet;
   jQuery zůstává pouze kvůli Magnific Popup.
*/

(function () {
  'use strict';

  // Začátek TMNH 2026:
  // 20. září 2026 ve 14:00 v Praze = CEST (UTC+2)
  const EVENT_START = '2026-09-20T14:00:00+02:00';

  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  function scrollToTarget(selector) {
    if (!selector) return;

    const target = document.querySelector(selector);
    if (!target) return;

    target.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start'
    });
  }

  function initScrollButtons() {
    document.querySelectorAll('[data-scroll-target]').forEach((button) => {
      button.addEventListener('click', () => {
        scrollToTarget(button.dataset.scrollTarget);
      });
    });
  }

  function initCountdown() {
    const element = document.getElementById('dday');
    if (!element) return;

    const finishMessage =
      element.dataset.finishMessage || 'HURA!';

    const countDownDate = Date.parse(EVENT_START);

    if (Number.isNaN(countDownDate)) return;

    let timerId = null;

    const update = () => {
      const distance = countDownDate - Date.now();

      if (distance <= 0) {
        element.textContent = finishMessage;

        if (timerId !== null) {
          window.clearInterval(timerId);
        }

        return;
      }

      const days =
        Math.floor(distance / 86400000);

      const hours =
        Math.floor((distance % 86400000) / 3600000);

      const minutes =
        Math.floor((distance % 3600000) / 60000);

      const seconds =
        Math.floor((distance % 60000) / 1000);

      element.textContent =
        `${days} d. ${hours} h. ${minutes} m. ${seconds} s.`;
    };

    update();

    timerId = window.setInterval(update, 1000);
  }

  
  function initMagnificPopup() {
    if (
      !window.jQuery ||
      !window.jQuery.fn ||
      !window.jQuery.fn.magnificPopup
    ) {
      return;
    }

    const $galleryItems =
      window.jQuery('.gallery-item');

    $galleryItems.magnificPopup({
      type: 'image',

      closeBtnInside: false,
      showCloseBtn: true,
      closeOnContentClick: false,
      closeOnBgClick: true,
      fixedContentPos: true,

      image: {
        verticalFit: true
      },

      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1],

        tPrev: 'Předchozí fotografie',
        tNext: 'Další fotografie',
        tCounter: '%curr% / %total%'
      },

      callbacks: {
        open: function () {
          window.jQuery('.mfp-wrap').attr({
            role: 'dialog',
            'aria-modal': 'true',
            'aria-label': 'Fotogalerie'
          });
        }
      }
    });

    window.jQuery('.video-popup').magnificPopup({
      type: 'iframe',

      closeBtnInside: false,
  showCloseBtn: true,
  closeOnBgClick: true,
  fixedContentPos: true
    });
  }

  document.addEventListener(
    'DOMContentLoaded',
    () => {
      initScrollButtons();
      initCountdown();
      
      initMagnificPopup();
    }
  );
})();