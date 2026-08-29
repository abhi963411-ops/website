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
const form = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");

form.addEventListener("submit", async function (event) {

  // Stop browser from redirecting to Google Apps Script
  event.preventDefault();

  const originalButtonText = submitBtn.innerHTML;

  // Disable button while submitting
  submitBtn.disabled = true;
  submitBtn.innerHTML = "<span>Sending...</span>";

  try {

    const formData = new FormData(form);

    await fetch(form.action, {
      method: "POST",
      body: formData
    });

    // Reset form
    form.reset();

    // Show success message
    showFormMessage(
      "Thank you for contacting FeelData! We will get back to you soon.",
      "success"
    );

  } catch (error) {

    console.error(error);

    showFormMessage(
      "Something went wrong. Please try again.",
      "error"
    );

  }

  // Enable button again
  submitBtn.disabled = false;
  submitBtn.innerHTML = originalButtonText;

});


function showFormMessage(message, type) {

  // Remove previous message if it exists
  const oldMessage = document.getElementById("form-message");

  if (oldMessage) {
    oldMessage.remove();
  }

  const messageBox = document.createElement("div");

  messageBox.id = "form-message";

  if (type === "success") {

    messageBox.className =
      "mt-6 p-4 rounded-xl border border-green-500/50 bg-green-500/10 text-green-400 text-center font-medium";

  } else {

    messageBox.className =
      "mt-6 p-4 rounded-xl border border-red-500/50 bg-red-500/10 text-red-400 text-center font-medium";
  }

  messageBox.innerHTML = message;

  // Show message below the form
  form.appendChild(messageBox);

  // Automatically hide after 8 seconds
  setTimeout(() => {

    if (messageBox) {
      messageBox.remove();
    }

  }, 8000);

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
