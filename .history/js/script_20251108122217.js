// Fade-in effect
window.addEventListener('load', () => {
  document.body.classList.add('loaded');

  // Hide preloader after load
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 600);

  // Initialize AOS animation
  AOS.init({ duration: 1000, once: true });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 80);
});
