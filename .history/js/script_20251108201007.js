/* ================= PRELOADER ================= */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  document.body.classList.add("loaded");
  setTimeout(() => preloader.classList.add("hidden"), 600);
});

/* ================= NAVBAR SCROLL EFFECT ================= */
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* ================= CTA RIPPLE EFFECT ================= */
document.querySelectorAll("#cta .btn-light").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const ripple = document.createElement("span");
    ripple.classList.add("cta-ripple");
    ripple.style.left = `${e.offsetX}px`;
    ripple.style.top = `${e.offsetY}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

/* ================= AOS INIT ================= */
if (typeof AOS !== "undefined") {
  AOS.init({
    once: true,
    duration: 800,
    offset: 120,
    easing: "ease-in-out",
  });
}

/* ================= STATS COUNTER (for About Section) ================= */
const counters = document.querySelectorAll(".count");
const observerOptions = { threshold: 0.5 };

const startCounter = (el) => {
  let target = +el.dataset.target;
  let count = 0;
  const step = Math.ceil(target / 100);
  const interval = setInterval(() => {
    count += step;
    if (count >= target) {
      el.textContent = target + "+";
      clearInterval(interval);
    } else {
      el.textContent = count + "+";
    }
  }, 25);
};

const counterObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      startCounter(entry.target);
      obs.unobserve(entry.target);
    }
  });
}, observerOptions);

counters.forEach((c) => counterObserver.observe(c));

/* ================= STATS CARD PROGRESS ANIMATION ================= */
document.addEventListener("DOMContentLoaded", () => {
  const statsCard = document.querySelector(".floating-card.stats-card");
  if (!statsCard) return;

  const progressPath = statsCard.querySelector(".progress");
  const percentEl = statsCard.querySelector(".percent");
  const targetPercent =
    parseInt(percentEl?.textContent?.replace("%", "")) || 47;

  const animateNumber = (el, target, duration = 1200) => {
    let start = 0;
    const range = target - start;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(start + eased * range) + "%";
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        statsCard.classList.add("visible", "floating");
        progressPath.style.strokeDasharray = 100;
        const offset = Math.max(0, 100 - targetPercent);
        setTimeout(() => {
          progressPath.style.strokeDashoffset = offset;
        }, 80);
        animateNumber(percentEl, targetPercent, 1400);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.3 }
  );
  io.observe(statsCard);
});

/* ================= DESTINATION SLIDER ================= */
const track = document.querySelector(".destination-track");
const prevBtn = document.querySelector(".slide-btn.prev");
const nextBtn = document.querySelector(".slide-btn.next");

if (track && prevBtn && nextBtn) {
  let index = 0;
  const slides = document.querySelectorAll(".destination-card");
  const slideWidth = slides[0].offsetWidth + 30; // includes gap

  const moveSlider = () => {
    track.style.transform = `translateX(-${index * slideWidth}px)`;
  };

  nextBtn.addEventListener("click", () => {
    index++;
    if (index >= slides.length - 3) index = 0;
    moveSlider();
  });

  prevBtn.addEventListener("click", () => {
    index--;
    if (index < 0) index = slides.length - 3;
    moveSlider();
  });

  // optional auto-slide
  setInterval(() => {
    index++;
    if (index >= slides.length - 3) index = 0;
    moveSlider();
  }, 5000);
}

/* ================= CTA ENTRANCE ANIMATION ================= */
const ctaBox = document.querySelector("#cta .bg-gradient");
if (ctaBox) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          ctaBox.classList.add("entered");
        }
      });
    },
    { threshold: 0.3 }
  );
  observer.observe(ctaBox);
}

/* ================= PARALLAX FLOAT (OPTIONAL UPGRADE) ================= */
window.addEventListener("mousemove", (e) => {
  const heroImg = document.querySelector(".hero-img");
  if (!heroImg) return;
  const x = (window.innerWidth - e.pageX * 2) / 90;
  const y = (window.innerHeight - e.pageY * 2) / 90;
  heroImg.style.transform = `translateY(${y / 3}px) translateX(${x / 5}px)`;
});
