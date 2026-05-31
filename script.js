/**
 * SITEIN24 Official Website JS Script
 * Premium Vanilla JavaScript Actions
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. MOBILE MENU BURGER TRANSITIONS
  // ==========================================
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-item');

  const toggleMobileMenu = () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  };

  const closeMobileMenu = () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  };

  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }

  navItems.forEach(item => {
    item.addEventListener('click', closeMobileMenu);
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      closeMobileMenu();
    }
  });


  // ==========================================
  // 2. SCROLL STATE FOR GLASSY STICKY NAVBAR
  // ==========================================
  const navbar = document.querySelector('.navbar');
  const handleNavbarScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  if (navbar) {
    window.addEventListener('scroll', handleNavbarScroll);
    // Initial load check
    handleNavbarScroll();
  }


  // ==========================================
  // 3. SECURE ACTIVE NAV LINK ON SCROLL (IO)
  // ==========================================
  const sections = document.querySelectorAll('section, header.hero');
  const navAnchorLinks = document.querySelectorAll('.nav-item');

  const activeLinkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id') || 'home';
        navAnchorLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}` || (id === 'home' && link.getAttribute('href') === '#')) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.25,
    rootMargin: "-80px 0px 0px 0px"
  });

  sections.forEach(section => {
    activeLinkObserver.observe(section);
  });


  // ==========================================
  // 4. PORTFOLIO TABS CATEGORY FILTER ENGINE
  // ==========================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active tab buttons
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCategory = btn.getAttribute('data-category');

      portfolioCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        // Add a smooth fade-scale animation
        card.style.transition = 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });


  // ==========================================
  // 5. ACCORDION ENGINE FOR FAQ INTERACTIVE FLOW
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other FAQ items for a clean native look
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('open')) {
          otherItem.classList.remove('open');
          otherItem.querySelector('.faq-content').style.maxHeight = '0';
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('open');
        content.style.maxHeight = '0';
      } else {
        item.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });


  // ==========================================
  // 6. SCROLL REVEAL (PREMIUM MOTION DESIGN)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // Unobserve once animated
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });


  // ==========================================
  // 7. PREMIUM SERVICE HOVER RADIAL GRADIENTS
  // ==========================================
  const interactiveCards = document.querySelectorAll('.service-card, .metric-card');
  interactiveCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });


  // ==========================================
  // 8. CONTACT FORM SUBMISSION ENHANCEMENT (WEB3FORMS API)
  // ==========================================
  const form = document.getElementById('projectInquiryForm');
  const successBanner = document.getElementById('formSuccessBanner');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple HTML Form Validation check
      const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#EF4444';
        } else {
          input.style.borderColor = '';
        }
      });

      if (!isValid) return;

      // Disable submit button temporarily to prevent double submissions
      const submitBtn = form.querySelector('.form-submit-btn');
      const submitBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Processing Request...</span>`;

      // Bundle all inputs automatically (including the hidden access_key)
      const formData = new FormData(form);
      const jsonObject = Object.fromEntries(formData);
      const jsonPayload = JSON.stringify(jsonObject);

      // Send data directly to the Web3Forms submission endpoint
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: jsonPayload
      })
      .then(async (response) => {
        let res = await response.json();
        
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = submitBtnText;

        if (response.status === 200) {
          // Success: Reset the input elements
          form.reset();

          // Display your custom premium success banner
          if (successBanner) {
            successBanner.style.display = 'block';
            successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            setTimeout(() => {
              successBanner.style.display = 'none';
            }, 8000);
          }
        } else {
          console.log(res);
          alert(res.message || "Something went wrong. Please check your token settings.");
        }
      })
      .catch(error => {
        console.error("Submission Error: ", error);
        alert("Network error. Please verify your connection and try again.");
        submitBtn.disabled = false;
        submitBtn.innerHTML = submitBtnText;
      });
    });

    form.querySelectorAll('input, select, textarea').forEach(el => {
      el.addEventListener('focus', () => {
        el.style.borderColor = '';
      });
    });
  }


  // ==========================================
  // 9. DYNAMIC STATS COUNTER TICKER
  // ==========================================
  const counterMetrics = document.querySelectorAll('.metric-number[data-target]');
  const countSpeed = 200; // Counter trigger speeds

  const tickerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetValue = parseInt(el.getAttribute('data-target'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        let currentValue = 0;

        const increment = targetValue / countSpeed;

        const updateCounter = () => {
          currentValue += increment;
          if (currentValue < targetValue) {
            el.textContent = Math.ceil(currentValue) + suffix;
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = targetValue + suffix;
          }
        };

        updateCounter();
        tickerObserver.unobserve(el); // Count only once on scroll viewport
      }
    });
  }, {
    threshold: 0.5
  });

  counterMetrics.forEach(metric => {
    tickerObserver.observe(metric);
  });

});
