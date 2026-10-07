/* ============ 1. НАВИГАЦИЯ ПРИ СКРОЛЛЕ ============ */
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  });
}

/* ============ 2. БУРГЕР-МЕНЮ ============ */
const burger = document.getElementById('navBurger');
const navMenu = document.getElementById('navMenu');
if (burger && navMenu) {
  burger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    burger.classList.toggle('is-open', isOpen);
  });

  navMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      burger.classList.remove('is-open');
    })
  );
}

/* ============ 3. SCROLL REVEAL ============ */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ============ 4. PARALLAX (hero) ============ */
const heroBg = document.querySelector('.hero__bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroBg.style.transform = `translate3d(0, ${y * 0.4}px, 0)`;
    }
  });
}

/* ============ 5. 3D TILT ============ */
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform =
      `perspective(1000px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateZ(8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ============ 6. ЧАСТИЦЫ В HERO ============ */
const particlesBox = document.getElementById('particles');
if (particlesBox) {
  const PARTICLE_COUNT = 40;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('span');
    p.style.position = 'absolute';
    p.style.left = Math.random() * 100 + '%';
    p.style.top  = Math.random() * 100 + '%';
    p.style.width = p.style.height = (1 + Math.random() * 2) + 'px';
    p.style.background = 'rgba(201,169,97,' + (0.3 + Math.random() * 0.5) + ')';
    p.style.borderRadius = '50%';
    p.style.boxShadow = '0 0 6px rgba(201,169,97,.8)';
    p.style.animation = `float ${6 + Math.random() * 8}s ease-in-out ${Math.random() * 5}s infinite alternate`;
    particlesBox.appendChild(p);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%   { transform: translate(0, 0); opacity: .2; }
      100% { transform: translate(${(Math.random()-0.5)*80}px, -80px); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

/* ============ 7. ПЛАВНЫЙ ПЕРЕХОД МЕЖДУ СТРАНИЦАМИ ============ */
document.querySelectorAll('a[href$=".html"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('http') || href.startsWith('#')) return;
    e.preventDefault();
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity .35s';
    setTimeout(() => location.href = href, 350);
  });
});

/* ============ 8. LIGHTBOX ============ */
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

if (lightbox) {
  const items = Array.from(document.querySelectorAll('[data-lightbox]'));
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const item = items[currentIndex];
    const src = item.getAttribute('data-lightbox');
    const caption = item.getAttribute('data-caption') || '';

    lightboxImage.src = src || '';
    lightboxImage.alt = caption;
    lightboxCaption.textContent = caption;

    // Если картинки нет — оставляем alt-подсказку
    lightboxImage.onerror = () => {
      lightboxCaption.textContent = caption + ' (картинка не найдена)';
    };
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % items.length;
    updateLightbox();
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateLightbox();
  }

  items.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext)  lightboxNext.addEventListener('click', nextImage);
  if (lightboxPrev)  lightboxPrev.addEventListener('click', prevImage);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft')  prevImage();
  });
}

/* ============ 9. PRELOADER ============ */
window.addEventListener('load', () => {
  const pre = document.querySelector('.preloader');
  if (pre) {
    setTimeout(() => pre.classList.add('is-hidden'), 400);
  }
});

/* ============ 10. КАСТОМНЫЙ КУРСОР ============ */
(function initCursor() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  cursor.innerHTML = '<div class="cursor__ring"></div><div class="cursor__dot"></div>';
  document.body.appendChild(cursor);

  const ring = cursor.querySelector('.cursor__ring');
  const dot  = cursor.querySelector('.cursor__dot');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  // Сразу ставим в центр, чтобы не мигало в углу
  dot.style.left = mouseX + 'px';
  dot.style.top  = mouseY + 'px';
  ring.style.left = mouseX + 'px';
  ring.style.top  = mouseY + 'px';

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  function tick() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(tick);
  }
  tick();

  // Увеличение при наведении на кликабельные элементы
  function attachHover() {
    document.querySelectorAll('a, button, [data-lightbox], input, textarea, label').forEach(el => {
      if (el.dataset.cursorBound) return;
      el.dataset.cursorBound = '1';
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
    });
  }
  attachHover();
})();