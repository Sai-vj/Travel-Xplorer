// ========== PRELOADER + FADE-IN ==========
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  const preloader = document.getElementById('preloader');
  setTimeout(() => preloader.classList.add('hidden'), 600);
  AOS.init({ duration: 1000, once: true });
});

// ========== NAVBAR SCROLL EFFECT ==========
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 80);
});

// ========== HERO PARALLAX EFFECT ==========
const heroWrapper = document.querySelector('.hero-image-wrapper');
document.addEventListener('mousemove', (e) => {
  const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
  const moveY = (e.clientY / window.innerHeight - 0.5) * 20;
  heroWrapper.style.transform = `translate(${moveX}px, ${moveY}px)`;
});
document.addEventListener('mouseleave', () => {
  heroWrapper.style.transform = 'translate(0,0)';
});

