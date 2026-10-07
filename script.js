/* =========================================================
   FARIHA ISLAM — PORTFOLIO JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const backToTop = document.getElementById("backToTop");
  const currentYear = document.getElementById("currentYear");
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const typingText = document.getElementById("typingText");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Current year ---------- */
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* ---------- Sticky header + back to top ---------- */
  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (header) {
      header.classList.toggle("scrolled", scrollY > 20);
    }

    if (backToTop) {
      backToTop.classList.toggle("show", scrollY > 500);
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  /* ---------- Mobile menu ---------- */
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );

      const icon = menuToggle.querySelector("i");
      if (icon) {
        icon.className = isOpen
          ? "fa-solid fa-xmark"
          : "fa-solid fa-bars";
      }

      document.body.classList.toggle("menu-open", isOpen);
    });
  }

  /* ---------- Close mobile menu after clicking a link ---------- */
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (!navMenu || !menuToggle) return;

      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");

      const icon = menuToggle.querySelector("i");
      if (icon) icon.className = "fa-solid fa-bars";

      document.body.classList.remove("menu-open");
    });
  });

  /* ---------- Active navigation section ---------- */
  const sections = document.querySelectorAll("main section[id]");

  const updateActiveNav = () => {
    const scrollPosition = window.scrollY + 180;
    let currentSection = "home";

    sections.forEach((section) => {
      if (scrollPosition >= section.offsetTop) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${currentSection}`;
      link.classList.toggle("active", isActive);
    });
  };

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  /* ---------- Reveal-on-scroll animations ---------- */
  const revealElements = document.querySelectorAll(".reveal");

  if (prefersReducedMotion) {
    revealElements.forEach((element) => element.classList.add("visible"));
  } else if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("visible"));
  }

  /* ---------- Animate skill bars when visible ---------- */
  const skillsPanel = document.querySelector(".skills-panel");

  if (skillsPanel && "IntersectionObserver" in window && !prefersReducedMotion) {
    const skillsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            skillsPanel.classList.add("animated");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    skillsObserver.observe(skillsPanel);
  } else if (skillsPanel) {
    skillsPanel.classList.add("animated");
  }

  /* ---------- Typing effect ---------- */
  if (typingText && !prefersReducedMotion) {
    const phrases = [
      "CSE Student @ Daffodil International University",
      "Learning Java, C & Python",
      "Exploring Competitive Programming",
      "Learning • Building • Improving"
    ];

    let phraseIndex = 0;
    let charIndex = phrases[0].length;
    let deleting = true;

    const typeLoop = () => {
      const currentPhrase = phrases[phraseIndex];

      if (deleting) {
        charIndex--;

        if (charIndex <= 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          charIndex = 0;
        }
      } else {
        charIndex++;

        if (charIndex >= phrases[phraseIndex].length) {
          deleting = true;
          setTimeout(typeLoop, 1700);
          return;
        }
      }

      typingText.textContent = phrases[phraseIndex].slice(0, charIndex);

      setTimeout(typeLoop, deleting ? 38 : 65);
    };

    setTimeout(typeLoop, 2200);
  }

  /* ---------- Back to top ---------- */
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    });
  }

  /* ---------- Contact form validation + mailto ---------- */
  if (contactForm) {
    const fields = {
      name: contactForm.querySelector("#name"),
      email: contactForm.querySelector("#email"),
      message: contactForm.querySelector("#message")
    };

    const setError = (field, message) => {
      const group = field.closest(".form-group");
      const error = group.querySelector(".error-message");

      group.classList.toggle("invalid", Boolean(message));
      error.textContent = message;
    };

    const validateForm = () => {
      let valid = true;

      const name = fields.name.value.trim();
      const email = fields.email.value.trim();
      const message = fields.message.value.trim();

      if (name.length < 2) {
        setError(fields.name, "Please enter your name.");
        valid = false;
      } else {
        setError(fields.name, "");
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        setError(fields.email, "Please enter a valid email.");
        valid = false;
      } else {
        setError(fields.email, "");
      }

      if (message.length < 10) {
        setError(fields.message, "Please write at least 10 characters.");
        valid = false;
      } else {
        setError(fields.message, "");
      }

      return valid;
    };

    Object.values(fields).forEach((field) => {
      field.addEventListener("input", () => {
        if (field.closest(".form-group").classList.contains("invalid")) {
          validateForm();
        }
      });
    });

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!validateForm()) {
        formStatus.className = "form-status error";
        formStatus.textContent = "Please fix the highlighted fields.";
        return;
      }

      const name = fields.name.value.trim();
      const email = fields.email.value.trim();
      const message = fields.message.value.trim();

      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );

      formStatus.className = "form-status success";
      formStatus.textContent = "Opening your email app...";

      window.location.href =
        `mailto:252-15-882@diu.edu.bd?subject=${subject}&body=${body}`;
    });
  }

  /* ---------- Prevent placeholder social links from jumping ---------- */
  document.querySelectorAll('a[href="#contact"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      // Normal contact links should still scroll.
      if (link.getAttribute("aria-label")?.toLowerCase().includes("instagram")) {
        event.preventDefault();
        const contact = document.getElementById("contact");
        if (contact) {
          contact.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth"
          });
        }
      }
    });
  });
});
