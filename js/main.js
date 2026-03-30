/* ========================================
   Website RJU — UPT PPD Nganjuk
   Shared JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile Hamburger Menu ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Scroll Reveal ---- */
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ---- Counter Animation ---- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 2000;
          const start = performance.now();

          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quad
            const eased = 1 - (1 - progress) * (1 - progress);
            el.textContent = Math.floor(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(update);
          }
          requestAnimationFrame(update);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(el => counterObserver.observe(el));
  }

  /* ---- Navbar Scroll Shadow ---- */
  const navbar = document.querySelector('nav.fixed');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        navbar.classList.add('shadow-md');
        navbar.classList.remove('shadow-sm');
      } else {
        navbar.classList.remove('shadow-md');
        navbar.classList.add('shadow-sm');
      }
    }, { passive: true });
  }

  /* ---- Back to Top ---- */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- FAQ Search Filter ---- */
  const faqSearch = document.getElementById('faq-search');
  const faqItems = document.querySelectorAll('.faq-item');

  if (faqSearch && faqItems.length > 0) {
    faqSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      faqItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }

  /* ---- FAQ Category Filter ---- */
  const faqFilterBtns = document.querySelectorAll('.faq-filter-btn');
  if (faqFilterBtns.length > 0) {
    faqFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        faqFilterBtns.forEach(b => {
          b.classList.remove('bg-primary', 'text-on-primary', 'shadow-md');
          b.classList.add('bg-surface-container-highest', 'text-on-surface-variant');
        });
        btn.classList.add('bg-primary', 'text-on-primary', 'shadow-md');
        btn.classList.remove('bg-surface-container-highest', 'text-on-surface-variant');

        const category = btn.getAttribute('data-category');
        faqItems.forEach(item => {
          if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---- Contact Form Handling ---- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const nama = formData.get('nama');
      const hp = formData.get('hp');
      const kategori = formData.get('kategori');
      const pesan = formData.get('pesan');

      // Basic validation
      if (!nama || !hp || !pesan) {
        alert('Mohon lengkapi semua data yang diperlukan.');
        return;
      }

      // Build WhatsApp message
      const waMessage = encodeURIComponent(
        `*Formulir Pengaduan - Website RJU*\n\n` +
        `*Nama:* ${nama}\n` +
        `*No. HP:* ${hp}\n` +
        `*Kategori:* ${kategori}\n` + 
        `*Pesan:*\n${pesan}`
      );
      
      // Open WhatsApp with pre-filled message
      window.open(`https://wa.me/628113136111?text=${waMessage}`, '_blank');
      
      // Show success feedback
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="material-symbols-outlined text-sm">check_circle</span> Terkirim!';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }

  /* ---- Smooth Scroll for Anchor Links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
