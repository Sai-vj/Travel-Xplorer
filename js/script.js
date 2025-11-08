// ==================== PRELOADER + FADE-IN ====================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  document.body.classList.add("loaded");
  setTimeout(() => preloader.classList.add("hidden"), 600);

  // Initialize AOS animations
  AOS.init({ duration: 1000, once: true });
});

// ==================== NAVBAR SCROLL EFFECT ====================
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 80);
});

// ==================== HERO PARALLAX EFFECT ====================
const heroWrapper = document.querySelector(".hero-image-wrapper");
if (heroWrapper) {
  let x = 0,
    y = 0;
  document.addEventListener("mousemove", (e) => {
    window.requestAnimationFrame(() => {
      x = (e.clientX / window.innerWidth - 0.5) * 20;
      y = (e.clientY / window.innerHeight - 0.5) * 20;
      heroWrapper.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
  document.addEventListener("mouseleave", () => {
    heroWrapper.style.transform = "translate(0, 0)";
  });
}

// ==================== STATS COUNTER (PERCENT) ====================
document.addEventListener("DOMContentLoaded", () => {
  const percentEl = document.querySelector(".stats-card .percent");
  if (!percentEl) return;

  const target = parseInt(percentEl.dataset.target || 47);
  const duration = 2000;
  let start = 0;
  const increment = target / (duration / 16);

  const updateCounter = () => {
    start += increment;
    percentEl.textContent = Math.round(start) + "%";
    if (start < target) requestAnimationFrame(updateCounter);
    else percentEl.textContent = target + "%";
  };
  requestAnimationFrame(updateCounter);
});

// ==================== DESTINATION CAROUSEL ====================
const track = document.querySelector(".destination-track");
const nextBtn = document.querySelector(".slide-btn.next");
const prevBtn = document.querySelector(".slide-btn.prev");

if (track && nextBtn && prevBtn) {
  const cardWidth = 330;
  const totalCards = document.querySelectorAll(".destination-card").length;
  const visibleCards = 3;
  let index = 0;

  const slide = () => {
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  };

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % (totalCards - visibleCards + 1);
    slide();
  });
  prevBtn.addEventListener("click", () => {
    index = (index - 1 + totalCards - visibleCards + 1) % (totalCards - visibleCards + 1);
    slide();
  });

  // Auto-scroll
  let autoSlide = setInterval(() => {
    index = (index + 1) % (totalCards - visibleCards + 1);
    slide();
  }, 4000);

  // Pause on hover
  const slider = document.querySelector(".destination-slider");
  slider.addEventListener("mouseenter", () => clearInterval(autoSlide));
  slider.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => {
      index = (index + 1) % (totalCards - visibleCards + 1);
      slide();
    }, 4000);
  });
}

// ==================== CTA ENTRANCE + RIPPLE ====================
document.addEventListener("DOMContentLoaded", () => {
  const ctaBg = document.querySelector("#cta .bg-gradient");
  if (ctaBg) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("entered");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(ctaBg);
  }

  // Ripple effect
  const ctaBtn = document.querySelector("#cta .btn-light");
  if (ctaBtn) {
    ctaBtn.addEventListener("click", (e) => {
      const rect = ctaBtn.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "cta-ripple";
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;
      ripple.style.width = ripple.style.height = `${Math.max(rect.width, rect.height) * 0.6}px`;
      ctaBtn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  }
});

// ==================== COUNTER ANIMATION (About Section) ====================
const counters = document.querySelectorAll(".counter");
let counterStarted = false;

const animateCounters = () => {
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const duration = 1500;
    let current = 0;
    const increment = target / (duration / 16);

    const update = () => {
      current += increment;
      if (current < target) {
        counter.innerText = Math.ceil(current);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };
    requestAnimationFrame(update);
  });
};

const aboutSection = document.querySelector("#about");
if (aboutSection) {
  window.addEventListener("scroll", () => {
    const sectionTop = aboutSection.getBoundingClientRect().top;
    if (!counterStarted && sectionTop < window.innerHeight - 100) {
      counterStarted = true;
      animateCounters();
    }
  });
}

// ==================== AUTO DATE FILL (Search Box) ====================
document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("trip-date");
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }
});


// ========== Smooth Scroll Animation for Features ==========
document.addEventListener("DOMContentLoaded", () => {
  const featureBoxes = document.querySelectorAll("#features .feature-box");

  const revealFeatures = () => {
    const triggerBottom = window.innerHeight * 0.85;

    featureBoxes.forEach(box => {
      const boxTop = box.getBoundingClientRect().top;

      if (boxTop < triggerBottom && !box.classList.contains("visible")) {
        box.classList.add("visible");
      }
    });
  };

  // Run on scroll and once at load
  window.addEventListener("scroll", revealFeatures);
  revealFeatures();
});

