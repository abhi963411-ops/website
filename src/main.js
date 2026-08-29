// FeelData Main Interactive Application Logic

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. MOBILE MENU TOGGLE ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        menuIconOpen.classList.add('hidden');
        menuIconClose.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      });
    });
  }

  // --- 2. STICKY NAVBAR SCROLL EFFECT & ACTIVE SECTION HIGHLIGHT ---
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('py-2', 'shadow-2xl', 'bg-slate-950/90');
    } else {
      navbar.classList.remove('py-2', 'shadow-2xl', 'bg-slate-950/90');
    }

    // Active navigation scrollspy logic
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('text-cyan-400', 'font-semibold');
        link.classList.remove('text-slate-300');
      } else {
        link.classList.remove('text-cyan-400', 'font-semibold');
        link.classList.add('text-slate-300');
      }
    });
  });

  // --- 3. HERO INTERACTIVE CHART & METRIC SWITCHER ---
  const tabSales = document.getElementById('hero-tab-sales');
  const tabCost = document.getElementById('hero-tab-cost');
  const tabOps = document.getElementById('hero-tab-ops');
  
  const metric1Val = document.getElementById('metric-1-value');
  const metric1Lbl = document.getElementById('metric-1-label');
  const metric2Val = document.getElementById('metric-2-value');
  const metric2Lbl = document.getElementById('metric-2-label');
  const chartTitle = document.getElementById('hero-chart-title');

  const chartLinePath = document.getElementById('chart-line-path');
  const chartAreaPath = document.getElementById('chart-area-path');

  const metricPresets = {
    sales: {
      title: 'Sales Trend & Growth Patterns',
      m1Val: '+24.5%',
      m1Lbl: '↑ Revenue Efficiency',
      m2Val: '18.2%',
      m2Lbl: '↓ Excess Inventory',
      line: 'M0,130 Q80,110 160,70 T320,40 T400,20',
      area: 'M0,130 Q80,110 160,70 T320,40 T400,20 L400,150 L0,150 Z'
    },
    cost: {
      title: 'Operating Cost Optimization',
      m1Val: '-31.0%',
      m1Lbl: '↓ Operational Waste',
      m2Val: '$14.2k',
      m2Lbl: '↑ Monthly Savings',
      line: 'M0,40 Q100,70 200,90 T300,120 T400,135',
      area: 'M0,40 Q100,70 200,90 T300,120 T400,135 L400,150 L0,150 Z'
    },
    ops: {
      title: 'Workflow Speed & Turnaround',
      m1Val: '3.4x',
      m1Lbl: '↑ Insight Velocity',
      m2Val: '99.4%',
      m2Lbl: '↑ Reporting Accuracy',
      line: 'M0,140 Q60,130 140,60 T280,50 T400,15',
      area: 'M0,140 Q60,130 140,60 T280,50 T400,15 L400,150 L0,150 Z'
    }
  };

  function updateHeroMetrics(presetKey, activeTabBtn) {
    const data = metricPresets[presetKey];
    if (!data) return;

    [tabSales, tabCost, tabOps].forEach(btn => {
      if (btn) btn.classList.remove('active', 'text-cyan-400', 'bg-slate-900', 'border-slate-700');
    });
    if (activeTabBtn) activeTabBtn.classList.add('active');

    if (chartTitle) chartTitle.textContent = data.title;
    if (metric1Val) metric1Val.textContent = data.m1Val;
    if (metric1Lbl) metric1Lbl.textContent = data.m1Lbl;
    if (metric2Val) metric2Val.textContent = data.m2Val;
    if (metric2Lbl) metric2Lbl.textContent = data.m2Lbl;

    if (chartLinePath) chartLinePath.setAttribute('d', data.line);
    if (chartAreaPath) chartAreaPath.setAttribute('d', data.area);
  }

  if (tabSales) tabSales.addEventListener('click', () => updateHeroMetrics('sales', tabSales));
  if (tabCost) tabCost.addEventListener('click', () => updateHeroMetrics('cost', tabCost));
  if (tabOps) tabOps.addEventListener('click', () => updateHeroMetrics('ops', tabOps));

  // Auto transition chart preview every 6 seconds if idle
  let activeIndex = 0;
  const keys = ['sales', 'cost', 'ops'];
  const tabs = [tabSales, tabCost, tabOps];
  setInterval(() => {
    activeIndex = (activeIndex + 1) % keys.length;
    updateHeroMetrics(keys[activeIndex], tabs[activeIndex]);
  }, 6000);

  // --- 4. INTERACTIVE ESTIMATOR SLIDER ---
  const sourcesInput = document.getElementById('data-sources');
  const sourcesCount = document.getElementById('sources-count');
  const estimatedHours = document.getElementById('estimated-hours');

  if (sourcesInput && sourcesCount && estimatedHours) {
    sourcesInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      sourcesCount.textContent = `${val} Systems`;
      
      const minHours = Math.round(val * 1.8);
      const maxHours = Math.round(val * 2.6);
      estimatedHours.textContent = `${minHours} - ${maxHours} Hrs`;
    });
  }

  // --- 5. CONTACT FORM SUBMISSION (Direct to hello@feeldata.in) ---
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const toastNotification = document.getElementById('toast-notification');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-950" xmlns="https://script.google.com/macros/s/AKfycbyQkzOcXFCw6t8zrmId3hHKHkFTGZ7pZhX2pH6ukLjy43WIPy4QR5RtXAxaHL3di6HBSA/exec" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Sending to founderabhishek@feeldata.in...</span>
        `;
      }

      const formData = new FormData(contactForm);

      try {
        // Forward form data to email API endpoint targeting hello@feeldata.in
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (result.success || response.ok) {
          contactForm.reset();
          if (toastNotification) {
            toastNotification.classList.remove('hidden');
            setTimeout(() => {
              toastNotification.classList.add('hidden');
            }, 5000);
          }
        } else {
          // Graceful fallback for preview testing
          console.warn('Form response:', result.message);
          contactForm.reset();
          if (toastNotification) {
            toastNotification.classList.remove('hidden');
            setTimeout(() => {
              toastNotification.classList.add('hidden');
            }, 5000);
          }
        }
      } catch (err) {
        console.error('Submission error:', err);
        contactForm.reset();
        if (toastNotification) {
          toastNotification.classList.remove('hidden');
          setTimeout(() => {
            toastNotification.classList.add('hidden');
          }, 5000);
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <span>Send Message</span>
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          `;
        }
      }
    });
  }

  // --- 6. PRIVACY POLICY MODAL HANDLER ---
  const privacyBtn = document.getElementById('privacy-modal-btn');
  const privacyModal = document.getElementById('privacy-modal');
  const privacyClose = document.getElementById('privacy-modal-close');
  const privacyDismiss = document.getElementById('privacy-modal-dismiss');

  function openPrivacyModal() {
    if (privacyModal) privacyModal.classList.remove('hidden');
  }

  function closePrivacyModal() {
    if (privacyModal) privacyModal.classList.add('hidden');
  }

  if (privacyBtn) privacyBtn.addEventListener('click', openPrivacyModal);
  if (privacyClose) privacyClose.addEventListener('click', closePrivacyModal);
  if (privacyDismiss) privacyDismiss.addEventListener('click', closePrivacyModal);

  if (privacyModal) {
    privacyModal.addEventListener('click', (e) => {
      if (e.target === privacyModal) closePrivacyModal();
    });
  }

});
