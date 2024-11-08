// Enhanced smooth scrolling with adjustable speed and easing
document.querySelectorAll("a.nav-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = link.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    const targetPosition =
      targetElement.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 800; // Scroll duration in milliseconds
    let start = null;

    window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const scrollToPosition = easeInOutCubic(
        progress,
        startPosition,
        distance,
        duration
      );
      window.scrollTo(0, scrollToPosition);

      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    });
  });
});

// Easing function for smooth animation effect
function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t + 2) + b;
}

// Intersection Observer to detect section visibility and change background color
const sections = document.querySelectorAll(".section");

const observerOptions = {
  root: null, // Use the viewport as the root
  threshold: 0.5, // Trigger when 50% of the section is visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("section-active"); // Add active class
    } else {
      entry.target.classList.remove("section-active"); // Remove active class
    }
  });
}, observerOptions);

// Observe each section
sections.forEach((section) => {
  observer.observe(section);
});
