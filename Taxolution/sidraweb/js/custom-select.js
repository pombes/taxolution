// Custom Select Dropdown for Mobile
document.addEventListener('DOMContentLoaded', function() {
  // Only activate on mobile/tablet
  function isMobile() {
    return window.innerWidth <= 900;
  }

  // Initialize custom selects
  function initCustomSelects() {
    const selects = document.querySelectorAll('select[name="service"], select[name="revenue"]');
    
    selects.forEach(select => {
      // Skip if already initialized
      if (select.dataset.customized) return;
      
      select.dataset.customized = 'true';
      
      // Create custom select container
      const customSelect = document.createElement('div');
      customSelect.className = 'custom-select';
      
      // Create selected display
      const selectedDisplay = document.createElement('div');
      selectedDisplay.className = 'custom-select-trigger';
      const selectedText = select.options[select.selectedIndex].text;
      selectedDisplay.innerHTML = `<span>${selectedText}</span><ion-icon name="chevron-down-sharp"></ion-icon>`;
      
      // Create options overlay
      const optionsOverlay = document.createElement('div');
      optionsOverlay.className = 'custom-select-overlay';
      
      const optionsContainer = document.createElement('div');
      optionsContainer.className = 'custom-select-options';
      
      // Add close button
      const closeBtn = document.createElement('div');
      closeBtn.className = 'custom-select-close';
      closeBtn.innerHTML = '<ion-icon name="close-sharp"></ion-icon>';
      optionsContainer.appendChild(closeBtn);
      
      // Add title
      const title = document.createElement('div');
      title.className = 'custom-select-title';
      title.textContent = select.options[0].text.replace(' *', '');
      optionsContainer.appendChild(title);
      
      // Add options
      Array.from(select.options).forEach((option, index) => {
        if (index === 0) return; // Skip placeholder
        
        const optionDiv = document.createElement('div');
        optionDiv.className = 'custom-select-option';
        optionDiv.textContent = option.text;
        optionDiv.dataset.value = option.value;
        
        if (option.selected && index !== 0) {
          optionDiv.classList.add('selected');
        }
        
        optionDiv.addEventListener('click', () => {
          // Update native select
          select.selectedIndex = index;
          select.dispatchEvent(new Event('change'));
          
          // Update display
          selectedDisplay.querySelector('span').textContent = option.text;
          
          // Update selected state
          optionsContainer.querySelectorAll('.custom-select-option').forEach(opt => {
            opt.classList.remove('selected');
          });
          optionDiv.classList.add('selected');
          
          // Close overlay
          closeOverlay();
        });
        
        optionsContainer.appendChild(optionDiv);
      });
      
      optionsOverlay.appendChild(optionsContainer);
      
      // Assemble custom select
      customSelect.appendChild(selectedDisplay);
      customSelect.appendChild(optionsOverlay);
      
      // Insert after native select
      select.parentNode.insertBefore(customSelect, select.nextSibling);
      
      // Functions to open/close
      function openOverlay() {
        if (!isMobile()) return;
        
        document.body.style.overflow = 'hidden';
        optionsOverlay.classList.add('active');
        
        // Animate options
        const options = optionsContainer.querySelectorAll('.custom-select-option');
        gsap.fromTo(optionsContainer, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
        );
        gsap.fromTo(options,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, stagger: 0.03, delay: 0.1, ease: 'power2.out' }
        );
      }
      
      function closeOverlay() {
        document.body.style.overflow = '';
        gsap.to(optionsContainer, {
          y: 50,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            optionsOverlay.classList.remove('active');
            gsap.set(optionsContainer, { y: 0, opacity: 1 });
          }
        });
      }
      
      // Event listeners
      selectedDisplay.addEventListener('click', (e) => {
        if (isMobile()) {
          e.preventDefault();
          e.stopPropagation();
          openOverlay();
        }
      });
      
      closeBtn.addEventListener('click', closeOverlay);
      
      optionsOverlay.addEventListener('click', (e) => {
        if (e.target === optionsOverlay) {
          closeOverlay();
        }
      });
      
      // Update visibility based on screen size
      function updateSelectVisibility() {
        if (isMobile()) {
          select.style.display = 'none';
          customSelect.style.display = 'block';
        } else {
          select.style.display = '';
          customSelect.style.display = 'none';
        }
      }
      
      updateSelectVisibility();
      window.addEventListener('resize', updateSelectVisibility);
    });
  }
  
  // Initialize
  initCustomSelects();
  
  // Reinitialize if new forms are added dynamically
  const observer = new MutationObserver(() => {
    initCustomSelects();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
