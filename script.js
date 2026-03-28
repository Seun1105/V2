/* ==============================================
   NCDPF — JavaScript
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {

  // YEAR
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();


  // SCROLL REVEAL
  const fadeEls = document.querySelectorAll('.fade-up');
  const fadeObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = Array.from(
        entry.target.parentElement.querySelectorAll('.fade-up:not(.in)')
      );
      const idx = siblings.indexOf(entry.target);
      const delay = Math.min(idx * 80, 360);
      setTimeout(() => entry.target.classList.add('in'), delay);
      fadeObs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => fadeObs.observe(el));


  // HERO — immediate reveal
  const heroFades = document.querySelectorAll('.hero .fade-up');
  heroFades.forEach((el, i) => {
    setTimeout(() => el.classList.add('in'), 200 + i * 130);
  });


  // NAV — scroll shadow + sticky behavior
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });


  // NAV — mobile toggle
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && menu.classList.contains('open')) {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }


  // ACTIVE NAV LINK
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = 'var(--charcoal)';
          }
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => sectionObs.observe(s));


  // PARALLAX — hero stat badges
  const badge1 = document.querySelector('.hero__stat-badge--1');
  const badge2 = document.querySelector('.hero__stat-badge--2');

  if (badge1 && badge2 && window.matchMedia('(min-width: 1100px)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        badge1.style.transform = `translateY(${y * -0.15}px)`;
        badge2.style.transform = `translateY(${y * -0.1}px)`;
      }
    }, { passive: true });
  }


  // PILLAR IMAGE REVEAL — subtle brightness on scroll
  const pillars = document.querySelectorAll('.pillar__media');
  const pillarObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const img = entry.target.querySelector('img');
      if (!img) return;
      if (entry.isIntersecting) {
        img.style.filter = 'brightness(1)';
      } else {
        img.style.filter = 'brightness(0.85)';
      }
    });
  }, { threshold: 0.3 });

  pillars.forEach(p => {
    const img = p.querySelector('img');
    if (img) img.style.transition = 'filter 0.6s ease, transform 0.8s ease';
    pillarObs.observe(p);
  });


  // TICKER — duplicate check (for smaller screens where it stops)
  const ticker = document.querySelector('.ticker__track');
  if (ticker) {
    const totalWidth = ticker.scrollWidth;
    const viewWidth = ticker.parentElement.offsetWidth;
    if (totalWidth < viewWidth * 2) {
      ticker.innerHTML += ticker.innerHTML;
    }
  }


  // CONTACT FORM
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const nameEl = form.querySelector('#cName');
      const emailEl = form.querySelector('#cEmail');
      const btn = document.getElementById('submitBtn');

      if (!nameEl.value.trim()) { shake(nameEl); return; }
      if (!emailEl.value.trim() || !validEmail(emailEl.value)) { shake(emailEl); return; }

      const orig = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;
      btn.style.opacity = '0.65';

      setTimeout(() => {
        btn.textContent = '✓ Message Sent';
        btn.style.background = 'var(--forest-mid)';
        btn.style.opacity = '1';
        form.reset();
        setTimeout(() => {
          btn.textContent = orig;
          btn.disabled = false;
          btn.style.background = '';
        }, 3500);
      }, 1400);
    });
  }

  function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function shake(el) {
    el.style.borderColor = '#c45c35';
    el.style.animation = 'none';
    requestAnimationFrame(() => {
      el.style.animation = 'formShake 0.45s ease';
    });
    el.addEventListener('input', () => {
      el.style.borderColor = '';
      el.style.animation = '';
    }, { once: true });
  }


  // SMOOTH LINK OVERRIDE — for hash links to account for nav height
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = nav ? nav.offsetHeight + 16 : 86;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});


// INJECT SHAKE KEYFRAME
const style = document.createElement('style');
style.textContent = `
  @keyframes formShake {
    0%,100% { transform: translateX(0); }
    20% { transform: translateX(-7px); }
    40% { transform: translateX(7px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }
`;
document.head.appendChild(style);
