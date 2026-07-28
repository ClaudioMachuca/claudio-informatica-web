// Nav scroll state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive:true });

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal, .reveal-scale');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in'), i * 60);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Stagger for service cards specifically (slightly larger delay step)
const cards = document.querySelectorAll('.service-card');
const cardIo = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const idx = Array.from(cards).indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('in'), idx * 90);
      cardIo.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
cards.forEach(c => cardIo.observe(c));

// Counter animation
const counters = document.querySelectorAll('[data-count]');
const counterIo = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'), 10);
      let current = 0;
      const duration = 1200;
      const stepTime = Math.max(Math.floor(duration / target), 30);
      const timer = setInterval(() => {
        current += 1;
        el.textContent = current;
        if (current >= target) clearInterval(timer);
      }, stepTime);
      counterIo.unobserve(el);
    }
  });
}, { threshold: 0.4 });
counters.forEach(c => counterIo.observe(c));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form (no backend yet)
document.querySelector('.contact-form').addEventListener('submit', function(e){
  e.preventDefault();
  alert('Formulario de contacto listo para conectar a un backend o servicio de email.');
});
