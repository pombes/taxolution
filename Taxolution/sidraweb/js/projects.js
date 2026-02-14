gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
  const footer = document.querySelector(".footer");
  const lastCard = document.querySelector(".card.scroll");
  const pinnedSections = gsap.utils.toArray(".pinned");

  pinnedSections.forEach((section, index, sections) => {
    let project = section.querySelector(".project");

    let nextSection = sections[index + 1] || lastCard;
    let endScalePoint = `top+=${nextSection.offsetTop - section.offsetTop} top`;

    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end:
          index === sections.length
            ? `+=${lastCard.offsetHeight / 2}`
            : footer.offsetTop - window.innerHeight,
        pin: true,
        pinSpacing: false,
        scrub: 1,
      },
    });

    gsap.fromTo(
      project,
      { scale: 1 },
      {
        scale: 0.5,
        filter: "blur(10px)",
        // top: "40%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: endScalePoint,
          scrub: 1,
        },
      }
    );
  });

  // Force scrollbar to be visible on macOS by triggering a scroll event
  function forceScrollbarVisibility() {
    const contentWrappers = document.querySelectorAll('.project-copy-content');
    
    contentWrappers.forEach(wrapper => {
      // Check if content actually overflows
      if (wrapper.scrollHeight > wrapper.clientHeight) {
        // Force scrollbar visibility by triggering scroll
        // Store current scroll position
        const currentScroll = wrapper.scrollTop;
        
        // Trigger minimal scroll to activate scrollbar on macOS
        wrapper.scrollTop = 1;
        
        // Use requestAnimationFrame to ensure scrollbar appears
        requestAnimationFrame(() => {
          wrapper.scrollTop = currentScroll;
          
          // Trigger another minimal scroll after a delay to keep it visible
          setTimeout(() => {
            if (wrapper.scrollHeight > wrapper.clientHeight) {
              wrapper.scrollTop = currentScroll + 0.5;
              requestAnimationFrame(() => {
                wrapper.scrollTop = currentScroll;
              });
            }
          }, 100);
        });
      }
    });
  }

  // Run multiple times to ensure scrollbar appears
  forceScrollbarVisibility();
  setTimeout(forceScrollbarVisibility, 200);
  setTimeout(forceScrollbarVisibility, 500);
  setTimeout(forceScrollbarVisibility, 1000);
  
  // Also run on resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(forceScrollbarVisibility, 100);
  });
});
