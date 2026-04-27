document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // ELEMENTS
  // =========================
  const nav = document.getElementById("nav-links");
  const toggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelectorAll("#nav-links a");
  const sections = document.querySelectorAll("section");
  const navbar = document.querySelector(".navbar");

  // =========================
  // MOBILE MENU
  // =========================
  window.toggleMenu = function () {
    if (nav) nav.classList.toggle("active");
  };

  document.addEventListener("click", (e) => {
    if (nav && toggle && !nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove("active");
    }
  });

  // =========================
  // SMOOTH SCROLL
  // =========================
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      if (href && href.startsWith("#")) {
        e.preventDefault();

        const target = document.querySelector(href);

        if (target) {
          window.scrollTo({
            top: target.offsetTop - 100,
            behavior: "smooth"
          });
        }

        if (nav) nav.classList.remove("active");
      }
    });
  });

  // =========================
  // ACTIVE LINK ON SCROLL
  // =========================
  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });

    // Navbar shadow
    if (navbar) {
      navbar.style.boxShadow =
        window.scrollY > 50
          ? "0 8px 30px rgba(0,0,0,0.12)"
          : "none";
    }
  });

  // =========================
  // SCROLL REVEAL ANIMATION (ONLY UPDATED PART)
  // =========================
  const revealElements = document.querySelectorAll(
    ".service-card, .project-card, .stat, .about-text, .about-image, .about-details"
  );

  // NEW (separate so it doesn't affect Services)
  const valueElements = document.querySelectorAll(
    ".value-item, .values-images"
  );

  if (revealElements.length > 0 || valueElements.length > 0) {

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.2 });

    // original elements
    revealElements.forEach(el => observer.observe(el));

    // core values elements (added safely)
    valueElements.forEach(el => observer.observe(el));
  }

  // =========================
  // PROJECT FILTER SYSTEM
  // =========================
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const grid = document.querySelector(".projects-grid");

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {

        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        if (grid) {
          grid.classList.toggle("filtered", filter !== "all");
        }

        projectCards.forEach(card => {
          const match =
            filter === "all" || card.dataset.category === filter;

          card.style.display = match ? "block" : "none";
        });

      });
    });
  }

  // =========================
  // OPTIONAL MODAL
  // =========================
  const modal = document.getElementById("projectModal");
  const modalImg = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const closeBtn = document.querySelector(".close");

  if (modal && modalImg && modalTitle && modalDesc && projectCards.length > 0) {

    projectCards.forEach(card => {

      card.addEventListener("click", () => {
        const img = card.querySelector("img");
        const title = card.querySelector("h3");
        const desc = card.querySelector("p");

        modal.style.display = "flex";

        modalImg.src = img ? img.src : "";
        modalTitle.innerText = title ? title.innerText : "";
        modalDesc.innerText = desc ? desc.innerText : "";
      });

      card.setAttribute("tabindex", "0");

      card.addEventListener("keypress", (e) => {
        if (e.key === "Enter") card.click();
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        modal.style.display = "none";
      }
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

});