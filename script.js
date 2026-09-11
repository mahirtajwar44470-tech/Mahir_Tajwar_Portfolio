document.addEventListener("DOMContentLoaded", () => {
  const navLinks   = document.getElementById("navLinks");
  const menuBtn    = document.getElementById("menuBtn");
  const logo       = document.querySelector(".logo");
  const themeToggle = document.getElementById("themeToggle");

  // ── Active nav link ──
  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    if (a.getAttribute("href") === currentPage) a.classList.add("active");
  });

  // ── Dark / Light mode ──
  const saved = localStorage.getItem("theme");
  if (saved === "light") document.body.classList.add("light");

  // Dark mode toggle disabled for testing purposes
  // if (themeToggle) {
  //   themeToggle.addEventListener("click", () => {
  //     document.body.classList.toggle("light");
  //     localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
  //   });
  // }

  // ── Mobile nav ──
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", e => {
      e.stopPropagation();
      navLinks.classList.toggle("open");
      menuBtn.classList.toggle("active");
    });
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtn.classList.remove("active");
      });
    });
    document.addEventListener("click", e => {
      if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
        navLinks.classList.remove("open");
        menuBtn.classList.remove("active");
      }
    });
  }

  // ── Logo hide on scroll (mobile) ──
  window.addEventListener("scroll", () => {
    if (window.innerWidth > 960) return;
    logo?.classList.toggle("hide", window.scrollY > 60);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) {
      navLinks?.classList.remove("open");
      menuBtn?.classList.remove("active");
      logo?.classList.remove("hide");
    }
  });

  // ── Lightbox ──
  const lightbox    = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  if (lightbox) {
    // Gallery image click-to-enlarge disabled for testing purposes
    // document.querySelectorAll(".g-item img").forEach(img => {
    //   img.addEventListener("click", () => {
    //     lightboxImg.src = img.src;
    //     lightbox.classList.add("open");
    //   });
    // });
    document.getElementById("lightboxClose")?.addEventListener("click", () => {
      lightbox.classList.remove("open");
    });
    lightbox.addEventListener("click", e => {
      if (e.target === lightbox) lightbox.classList.remove("open");
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") lightbox.classList.remove("open");
    });
  }
});