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

  // Force scrollbar to be visible on macOS when content overflows
  function showScrollbars() {
    const contentWrappers = document.querySelectorAll('.project-copy-content');
    
    contentWrappers.forEach(wrapper => {
      // Check if content overflows
      if (wrapper.scrollHeight > wrapper.clientHeight) {
        // Trigger a minimal scroll to make scrollbar visible on macOS
        const currentScroll = wrapper.scrollTop;
        wrapper.scrollTop = currentScroll + 1;
        // Immediately scroll back
        setTimeout(() => {
          wrapper.scrollTop = currentScroll;
        }, 10);
        
        // Add a class to indicate scrollbar should be visible
        wrapper.classList.add('has-scrollbar');
      }
    });
  }

  // Run on load and after a short delay to ensure layout is complete
  showScrollbars();
  setTimeout(showScrollbars, 100);
  setTimeout(showScrollbars, 500);
  
  // Also run when window is resized
  window.addEventListener('resize', showScrollbars);
});
