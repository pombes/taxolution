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
  
  // Check if we're on pricing or contact page
  const isPricingOrContactPage = window.location.pathname.includes('pricing.html') || window.location.pathname.includes('contact.html');
  
  function handleScroll() {
    const currentScrollY = window.scrollY;
    const footer = document.querySelector('footer');
    const contactForm = document.querySelector('.contact-form-container');
    
    // Only check footer position if footer exists
    let isNearFooter = false;
    let isAtBottom = false;
    
    // Check for contact page form (contact.html)
    if (contactForm) {
      const isMobile = window.innerWidth <= 900;
      
      if (isMobile) {
        // On mobile: hide nav when Contact Information title is almost at top (overlapping nav)
        const contactInfoHeader = document.querySelector('.contact-info-header');
        if (contactInfoHeader) {
          const headerTop = contactInfoHeader.getBoundingClientRect().top;
          // Hide when Contact Information header (title) is within 80px of top
          // Nav stays visible for a very long time until title would overlap with nav
          isNearFooter = headerTop < 80;
        } else {
          // Fallback to contact-info if header not found
          const contactInfo = document.querySelector('.contact-info');
          if (contactInfo) {
            const infoTop = contactInfo.getBoundingClientRect().top;
            isNearFooter = infoTop < 80;
          } else {
            const formTop = contactForm.getBoundingClientRect().top;
            isNearFooter = formTop < 80;
          }
        }
      } else {
        // Desktop: hide when form is close (50px - stays longer)
        const formTop = contactForm.getBoundingClientRect().top;
        isNearFooter = formTop < 50;
      }
    } else if (footer) {
      // Homepage footer form detection
      const footerTop = footer.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Check if we're at the very bottom of the page
      isAtBottom = currentScrollY + windowHeight >= documentHeight - 50;
      
      // Hide nav only when footer form is actually visible in viewport
      // This allows scrolling through "How It Works" while nav stays visible
      const footerForm = footer.querySelector('.footer-form');
      if (footerForm) {
        const formTop = footerForm.getBoundingClientRect().top;
        // Check if mobile (screen width <= 900px)
        const isMobile = window.innerWidth <= 900;
        // Desktop: disappears at 500px, Mobile: disappears at 300px (stays longer)
        const threshold = isMobile ? 300 : 500;
        isNearFooter = formTop < threshold;
      } else {
        // Fallback: use footer top
        isNearFooter = footerTop < 0; // Footer has entered viewport
      }
    }
    
    const isScrollingUp = currentScrollY < lastScrollY;
    
    // Check if we're past the hide threshold (same point where nav disappeared)
    let isPastHideThreshold = false;
    
    if (contactForm) {
      const isMobile = window.innerWidth <= 900;
      if (isMobile) {
        const contactInfoHeader = document.querySelector('.contact-info-header');
        if (contactInfoHeader) {
          const headerTop = contactInfoHeader.getBoundingClientRect().top;
          // Show nav again when Contact Information header is above 80px (same threshold as hide)
          isPastHideThreshold = headerTop >= 80;
        } else {
          const contactInfo = document.querySelector('.contact-info');
          if (contactInfo) {
            const infoTop = contactInfo.getBoundingClientRect().top;
            isPastHideThreshold = infoTop >= 80;
          } else {
            const formTop = contactForm.getBoundingClientRect().top;
            isPastHideThreshold = formTop >= 80;
          }
        }
      } else {
        const formTop = contactForm.getBoundingClientRect().top;
        isPastHideThreshold = formTop >= 50;
      }
    } else if (footer) {
      const footerForm = footer.querySelector('.footer-form');
      if (footerForm) {
        const formTop = footerForm.getBoundingClientRect().top;
        const isMobile = window.innerWidth <= 900;
        const threshold = isMobile ? 300 : 500;
        // Show nav again when form is above threshold (same threshold as hide)
        isPastHideThreshold = formTop >= threshold;
      }
    }
    
    // If scrolling up AND past the hide threshold, OR at top of page, show nav again
    if ((isScrollingUp && isPastHideThreshold) || currentScrollY <= 50) {
      // Normal scroll behavior when past threshold or at top
      if (currentScrollY > 50) {
        isScrolling = true;
        nav.classList.add("scrolling");
        nav.classList.add("visible");
      } else {
        // At the top: on pricing/contact pages add scrolling class (white background), on homepage make transparent
        isScrolling = false;
        if (isPricingOrContactPage) {
          nav.classList.add("scrolling");
        } else {
          nav.classList.remove("scrolling");
        }
        nav.classList.add("visible");
      }
      
      // Clear existing timeout
      clearTimeout(scrollTimeout);
      
      // Hide nav after 1.5 seconds of no scrolling (only if not at top, not hovering, and menu is closed)
      if (currentScrollY > 50) {
        scrollTimeout = setTimeout(() => {
          if (!isHovering && !isMenuOpen) {
            nav.classList.remove("scrolling");
            nav.classList.remove("visible");
            isScrolling = false;
          }
        }, 1500);
      }
      
      lastScrollY = currentScrollY;
      return;
    }
    
    // If not near footer, use normal scroll behavior
    if (!isNearFooter && !isAtBottom) {
      // Normal scroll behavior when not near footer
      if (currentScrollY > 50) {
        isScrolling = true;
        nav.classList.add("scrolling");
        nav.classList.add("visible");
      } else {
        // At the top: on pricing/contact pages add scrolling class (white background), on homepage make transparent
        isScrolling = false;
        if (isPricingOrContactPage) {
          nav.classList.add("scrolling");
        } else {
          nav.classList.remove("scrolling");
        }
        nav.classList.add("visible");
      }
      
      // Clear existing timeout
      clearTimeout(scrollTimeout);
      
      // Hide nav after 1.5 seconds of no scrolling (only if not at top, not hovering, and menu is closed)
      if (currentScrollY > 50) {
        scrollTimeout = setTimeout(() => {
          if (!isHovering && !isMenuOpen) {
            nav.classList.remove("scrolling");
            nav.classList.remove("visible");
            isScrolling = false;
          }
        }, 1500);
      }
      
      lastScrollY = currentScrollY;
      return;
    }
    
    // Hide nav when footer/form is coming into view OR when at bottom, unless scrolling up or menu is open
    if ((isNearFooter || isAtBottom) && !isScrollingUp && !isMenuOpen && !isHovering) {
      nav.classList.remove("visible");
      nav.classList.remove("scrolling");
      lastScrollY = currentScrollY;
      return;
    }
    
  }

  // Keep nav visible when hovering (but not if form is in view or at bottom)
  nav.addEventListener("mouseenter", () => {
    const footer = document.querySelector('footer');
    const contactForm = document.querySelector('.contact-form-container');
    let isNearFooter = false;
    let isAtBottom = false;
    
    // Check for contact page form first
    if (contactForm) {
      const isMobile = window.innerWidth <= 900;
      
      if (isMobile) {
        // On mobile: hide nav when Contact Information section comes into view
        const contactInfo = document.querySelector('.contact-info');
        if (contactInfo) {
          const infoTop = contactInfo.getBoundingClientRect().top;
          isNearFooter = infoTop < 200; // Hide when Contact Information is within 200px of top
        } else {
          // Fallback to form if contact-info not found
          const formTop = contactForm.getBoundingClientRect().top;
          isNearFooter = formTop < 50;
        }
      } else {
        // Desktop: hide when form is close (100px)
        const formTop = contactForm.getBoundingClientRect().top;
        isNearFooter = formTop < 100;
      }
    } else if (footer) {
      const footerForm = footer.querySelector('.footer-form');
      const documentHeight = document.documentElement.scrollHeight;
      
      isAtBottom = window.scrollY + window.innerHeight >= documentHeight - 50;
      
      if (footerForm) {
        const formTop = footerForm.getBoundingClientRect().top;
        const isMobile = window.innerWidth <= 900;
        const threshold = isMobile ? 300 : 500;
        isNearFooter = formTop < threshold; // Mobile stays longer (300px), desktop earlier (500px)
      }
    }
    
    // Don't show nav on hover if footer is in view or at bottom
    if (isNearFooter || isAtBottom) {
      return;
    }
    
    isHovering = true;
    const currentScrollY = window.scrollY;
    nav.classList.add("visible");
    if (currentScrollY > 50 || isPricingOrContactPage) {
      nav.classList.add("scrolling");
    }
  });

  nav.addEventListener("mouseleave", () => {
    isHovering = false;
    const currentScrollY = window.scrollY;
    
    // Clear existing timeout
    clearTimeout(scrollTimeout);
    
    // Hide nav after leaving if scrolled down and menu is closed
    if (currentScrollY > 50) {
      scrollTimeout = setTimeout(() => {
        if (!isHovering && !isMenuOpen) {
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
      
      // Keep nav visible when menu opens
      nav.classList.add("visible");
      if (window.scrollY > 50 || isPricingOrContactPage) {
        nav.classList.add("scrolling");
      }

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
