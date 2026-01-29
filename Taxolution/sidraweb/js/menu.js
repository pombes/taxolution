document.addEventListener("DOMContentLoaded", function () {
  const tl = gsap.timeline({ paused: true });
  const nav = document.querySelector("nav");
  const menuToggleBtn = document.querySelector(".menu");
  const menuItemsContainer = document.querySelector(".menu-container");
  const menuItems = document.querySelectorAll(".menu-item");
  let isMenuOpen = false;
  let lastScrollY = window.scrollY;

  gsap.set(menuItemsContainer, { y: 50, opacity: 0 });
  gsap.set(menuItems, { y: 50, opacity: 0 });

  // Show nav background on scroll
  let scrollTimeout;
  let isHovering = false;
  let isScrolling = false;
  
  function handleScroll() {
    const currentScrollY = window.scrollY;
    
    // Always show nav when scrolling
    if (currentScrollY > 50) {
      isScrolling = true;
      nav.classList.add("scrolling");
      nav.classList.add("visible");
    } else {
      // At the top: show nav but without scrolling class (transparent)
      isScrolling = false;
      nav.classList.remove("scrolling");
      nav.classList.add("visible");
    }
    
    // Clear existing timeout
    clearTimeout(scrollTimeout);
    
    // Hide nav after 1.5 seconds of no scrolling (only if not at top and not hovering)
    if (currentScrollY > 50) {
      scrollTimeout = setTimeout(() => {
        if (!isHovering) {
          nav.classList.remove("scrolling");
          nav.classList.remove("visible");
          isScrolling = false;
        }
      }, 1500);
    }
    
    lastScrollY = currentScrollY;
  }

  // Keep nav visible when hovering
  nav.addEventListener("mouseenter", () => {
    isHovering = true;
    const currentScrollY = window.scrollY;
    nav.classList.add("visible");
    if (currentScrollY > 50) {
      nav.classList.add("scrolling");
    }
  });

  nav.addEventListener("mouseleave", () => {
    isHovering = false;
    const currentScrollY = window.scrollY;
    
    // Clear existing timeout
    clearTimeout(scrollTimeout);
    
    // Hide nav after leaving if scrolled down
    if (currentScrollY > 50) {
      scrollTimeout = setTimeout(() => {
        if (!isHovering) {
          nav.classList.remove("scrolling");
          nav.classList.remove("visible");
        }
      }, 1500);
    }
    // If at top, keep visible
  });

  // Initial state: show nav if at top
  if (window.scrollY <= 50) {
    nav.classList.add("visible");
  }

  window.addEventListener("scroll", handleScroll);

  function toggleMenu() {
    if (!isMenuOpen) {
      menuToggleBtn.classList.add("active");

      gsap.to(menuItemsContainer, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(
        menuItems,
        {
          pointerEvents: "all",
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          onComplete: () => {
            isMenuOpen = true;
          },
        },
        "<"
      );
    } else {
      if (isMenuOpen) {
        menuToggleBtn.classList.remove("active");

        gsap.to(menuItemsContainer, {
          y: -50,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            gsap.set(menuItemsContainer, { y: 50, opacity: 0 });
            gsap.set(menuItems, { y: 50, opacity: 0, pointerEvents: "none" });
            isMenuOpen = false;
          },
        });
      }
    }
  }

  menuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", toggleMenu);
  });

  menuToggleBtn.addEventListener("click", toggleMenu);
});
