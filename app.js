// Setup Three.js scene for background animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("background"),
});
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// Create a rotating 3D Torus object
const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
const material = new THREE.MeshBasicMaterial({
  color: 0x0077ff,
  wireframe: true,
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// ... (existing code)

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Add point light
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Create a large number of stars
const starGeometry = new THREE.BufferGeometry();
const starVertices = [];
for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 200;
  const y = (Math.random() - 0.5) * 200;
  const z = (Math.random() - 0.5) * 200;
  starVertices.push(x, y, z);
}
starGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(starVertices, 3)
);

const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.1,
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// ... (existing animation function)

// Animation function
function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Smooth background transition on scroll for navbar
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Navbar underline animation for active link
const navLinks = document.querySelectorAll(".nav-link");
const underline = document.querySelector(".underline");

navLinks.forEach((link) => {
  link.addEventListener("mouseenter", (e) => {
    const rect = e.target.getBoundingClientRect();
    underline.style.width = `${rect.width}px`;
    underline.style.left = `${rect.left}px`;
  });

  link.addEventListener("mouseleave", () => {
    underline.style.width = 0;
  });
});

// JavaScript to add focus effect to the active section
document.addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".section-focus");
  let scrollPosition = window.scrollY;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    // Check if the section is in the viewport
    if (
      scrollPosition >= sectionTop - sectionHeight / 3 &&
      scrollPosition < sectionTop + sectionHeight - sectionHeight / 3
    ) {
      section.classList.remove("dimmed");
    } else {
      section.classList.add("dimmed");
    }
  });
});

// Background animation setup with Three.js
const sections = document.querySelectorAll(".section-focus");
sections.forEach((section, index) => {
  const canvas = document.createElement("canvas");
  canvas.classList.add("three-canvas");
  section.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.z = 5;

  const geometry = new THREE.SphereGeometry(0.05, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const particles = [];

  for (let i = 0; i < 500; i++) {
    const particle = new THREE.Mesh(geometry, material);
    particle.position.x = (Math.random() - 0.5) * 10;
    particle.position.y = (Math.random() - 0.5) * 10;
    particle.position.z = (Math.random() - 0.5) * 10;
    scene.add(particle);
    particles.push(particle);
  }

  function animate() {
    requestAnimationFrame(animate);
    particles.forEach((particle) => {
      particle.position.y -= 0.02;
      if (particle.position.y < -5) particle.position.y = 5;
    });
    renderer.render(scene, camera);
  }

  animate();
});

animate();
