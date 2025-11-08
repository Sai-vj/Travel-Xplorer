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

document.addEventListener("DOMContentLoaded", () => {
  const percentEl = document.querySelector(".stats-card .percent");
  let count = 0;
  const target = 47;
  const duration = 2000;
  const step = duration / target;

  const counter = setInterval(() => {
    count++;
    percentEl.textContent = count + "%";
    if (count >= target) clearInterval(counter);
  }, step);
});

// DESTINATION SLIDER LOGIC
const track = document.querySelector(".destination-track");
const nextBtn = document.querySelector(".slide-btn.next");
const prevBtn = document.querySelector(".slide-btn.prev");

let index = 0;
const cardWidth = 325; // card width + gap
const totalCards = document.querySelectorAll(".destination-card").length;
const visibleCards = 3; // number of cards visible per slide

nextBtn.addEventListener("click", () => {
  if (index < totalCards - visibleCards) index++;
  slide();
});

prevBtn.addEventListener("click", () => {
  if (index > 0) index--;
  slide();
});

function slide() {
  track.style.transform = `translateX(-${index * cardWidth}px)`;
}

