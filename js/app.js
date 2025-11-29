// Interactions: mobile menu, portfolio filter, contact form, smooth scroll, small animations
document.addEventListener('DOMContentLoaded', () => {
  // year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // mobile menu
  const menuBtn = document.getElementById('menu-btn');
  const nav = document.querySelector('.main-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
      nav.style.display = expanded ? 'none' : 'flex';
    });
    if (window.innerWidth < 980) nav.style.display = 'none';
  }

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav
        if (window.innerWidth < 980 && nav) { nav.style.display = 'none'; menuBtn.setAttribute('aria-expanded','false'); }
      }
    });
  });

  // portfolio filtering
  const filters = document.querySelectorAll('.filter');
  const items = document.querySelectorAll('.portfolio-item');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      items.forEach(it => {
        if (f === 'all' || it.dataset.category === f) {
          it.style.display = '';
          it.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 260, easing: 'ease-out' });
        } else {
          it.style.display = 'none';
        }
      });
    });
  });

  // contact form (client-side only)
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if (!name || !email || !message) {
        status.textContent = 'Merci de remplir tous les champs.';
        status.style.color = 'crimson';
        return;
      }
      // simulate send: show success and mailto fallback
      const mailto = `mailto:hello@novacomm.example?subject=${encodeURIComponent('Demande depuis le site')}&body=${encodeURIComponent(`${name}\n\n${message}\n\n${email}`)}`;
      status.innerHTML = `Merci ! <a href="${mailto}">Cliquez ici</a> pour envoyer votre email ou utilisez <strong>hello@novacomm.example</strong>.`;
      status.style.color = 'green';
      form.reset();
    });
  }

  // small reveal: fade-in sections on scroll
  const reveal = (entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'none';
        obs.unobserve(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(reveal, { threshold: 0.08 });
  document.querySelectorAll('.section, .hero, .service, .portfolio-item, .testimonial').forEach(el => {
    el.style.opacity = 0; el.style.transform = 'translateY(10px)';
    observer.observe(el);
  });
});
