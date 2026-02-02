// Contact Form Handler with Brevo API
document.addEventListener('DOMContentLoaded', function() {
  // Handle actual <form> elements (contact.html)
  const formElements = document.querySelectorAll('form.contact-form');
  formElements.forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
  });
  
  // Handle div.footer-form elements
  const footerForms = document.querySelectorAll('div.footer-form');
  footerForms.forEach(formDiv => {
    // Check if it has a button or just a div
    const submitBtn = formDiv.querySelector('button.submit-btn') || formDiv.querySelector('div.submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        handleFormSubmit.call(formDiv, e);
      });
    }
  });
  
  async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = this;
    const submitBtn = form.querySelector('button.submit-btn') || form.querySelector('div.submit-btn') || form.querySelector('.submit-btn');
    
    // Get all input values
    const data = {
      name: form.querySelector('input[name="name"]')?.value || '',
      email: form.querySelector('input[name="email"]')?.value || '',
      phone: form.querySelector('input[name="phone"]')?.value || '',
      company: form.querySelector('input[name="company"]')?.value || '',
      service: form.querySelector('select[name="service"]')?.value || '',
      revenue: form.querySelector('select[name="revenue"]')?.value || '',
      message: form.querySelector('textarea[name="message"]')?.value || '',
      website: form.querySelector('input[name="website"]')?.value || '' // Honeypot field
    };
      
      // Basic validation
      if (!data.name || !data.email || !data.phone || !data.service || !data.message) {
        showMessage(form, 'Please fill in all required fields', 'error');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        showMessage(form, 'Please enter a valid email address', 'error');
        return;
      }
      
      // Disable button and show loading state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span style="opacity: 0.7;">Sending...</span>';
      submitBtn.style.cursor = 'not-allowed';
      
      try {
        // Send to PHP handler
        const response = await fetch('form-handler.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
          // Success! Show success message
          showMessage(form, result.message || 'Thank you! We\'ll contact you within 24 hours.', 'success');
          
          // Reset form after short delay
          setTimeout(() => {
            if (form.tagName === 'FORM') {
              form.reset();
            } else {
              form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea').forEach(input => {
                input.value = '';
              });
              form.querySelectorAll('select').forEach(select => {
                select.selectedIndex = 0;
              });
            }
          }, 500);
          
        } else {
          // Error from server
          showMessage(form, result.message || 'Something went wrong. Please try again.', 'error');
        }
        
      } catch (error) {
        console.error('Form submission error:', error);
        showMessage(form, 'Network error. Please check your connection and try again.', 'error');
      } finally {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        submitBtn.style.cursor = 'pointer';
      }
    }
  }
  
  // Show message function
  function showMessage(form, message, type) {
    // Remove existing messages
    const existingMsg = form.querySelector('.form-message');
    if (existingMsg) {
      existingMsg.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;
    
    // Style the message
    Object.assign(messageDiv.style, {
      padding: '1em 1.5em',
      marginTop: '1em',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      textAlign: 'center',
      animation: 'slideIn 0.3s ease-out',
      backgroundColor: type === 'success' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
      color: type === 'success' ? '#2e7d32' : '#c62828',
      border: `1px solid ${type === 'success' ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)'}`
    });
    
    // Insert message after submit button
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.parentElement.appendChild(messageDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      messageDiv.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
  }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
  
  .honeypot {
    position: absolute !important;
    left: -9999px !important;
    width: 1px !important;
    height: 1px !important;
    overflow: hidden !important;
  }
`;
document.head.appendChild(style);
