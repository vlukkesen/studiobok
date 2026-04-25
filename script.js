(() => {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (nav && navToggle && navMenu) {
    const closeNav = () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
      document.body.style.overflow = '';
    };
    const openNav = () => {
      nav.classList.add('is-open');
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', 'Sluit menu');
      document.body.style.overflow = 'hidden';
    };
    navToggle.addEventListener('click', () => {
      nav.classList.contains('is-open') ? closeNav() : openNav();
    });
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNav);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) closeNav();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860 && nav.classList.contains('is-open')) closeNav();
    });
  }

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = lightbox?.querySelector('.lightbox-close');
  const cards = document.querySelectorAll('.cards-showcase .card');

  if (!lightbox || !lightboxImg || !lightboxCaption) return;

  const open = (src, caption, alt) => {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  };

  cards.forEach((card) => {
    const handler = () => {
      const src = card.dataset.src || card.querySelector('img')?.src;
      const caption = card.dataset.caption || card.querySelector('figcaption')?.textContent;
      const alt = card.querySelector('img')?.alt;
      if (src) open(src, caption, alt);
    };
    card.addEventListener('click', handler);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handler();
      }
    });
  });

  closeBtn?.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) close();
  });
})();
