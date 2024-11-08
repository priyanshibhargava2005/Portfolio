// section-bg.js

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const section = entry.target;
        const bgColor = section.getAttribute("data-bgcolor");
        section.style.backgroundColor = bgColor;
      }
    });
  },
  { threshold: 0.5 }
);

sections.forEach((section) => observer.observe(section));
