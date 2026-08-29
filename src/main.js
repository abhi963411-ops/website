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

  // --- 5. ADMIN DASHBOARD & INQUIRY STORAGE SYSTEM ---
  const STORAGE_KEY = 'feeldata_inquiries_db';

  // Pre-seeded sample inquiries for rich immediate demonstration
  const demoInquiries = [
    {
      id: 'fd-101',
      timestamp: '2026-08-29 09:30 AM',
      fullName: 'Vikram Sharma',
      businessName: 'Apex Retail Logistics',
      email: 'vikram@apexretail.in',
      phone: '+91 98765 43210',
      helpType: 'Data Organization & Cleanup',
      message: 'We have inventory data scattered across 5 POS locations in Excel. We want to consolidate inventory trends to reduce stockouts.',
      status: 'New'
    },
    {
      id: 'fd-102',
      timestamp: '2026-08-28 04:15 PM',
      fullName: 'Priya Mehta',
      businessName: 'Urban Crafts E-commerce',
      email: 'priya@urbancrafts.com',
      phone: '+91 91234 56789',
      helpType: 'Business Insights & Reporting',
      message: 'Looking for a monthly dashboard that translates customer purchase history into clear profit margin reports.',
      status: 'Contacted'
    },
    {
      id: 'fd-103',
      timestamp: '2026-08-27 11:45 AM',
      fullName: 'Arjun Patel',
      businessName: 'BlueSky Health Systems',
      email: 'arjun@blueskyhealth.in',
      phone: '+91 99887 76655',
      helpType: 'Process & Cost Improvement',
      message: 'We need help auditing operational delay patterns in supplier invoicing. Privacy is top priority.',
      status: 'Resolved'
    }
  ];

  // Helper functions for LocalStorage management
  function getInquiries() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(demoInquiries));
        return demoInquiries;
      }
      return JSON.parse(data);
    } catch (e) {
      return demoInquiries;
    }
  }

  function saveInquiries(inquiries) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
    } catch (e) {
      console.error('Storage save error:', e);
    }
    renderAdminDashboard();
  }

  // --- CONTACT FORM SUBMISSION TO DASHBOARD STORE ---
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const toastNotification = document.getElementById('toast-notification');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Saving to Dashboard...</span>
        `;
      }

      const nameInput = document.getElementById('full-name');
      const businessInput = document.getElementById('business-name');
      const emailInput = document.getElementById('email');
      const phoneInput = document.getElementById('phone');
      const helpInput = document.getElementById('help-type');
      const messageInput = document.getElementById('message');

      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

      const newInquiry = {
        id: 'fd-' + Date.now().toString().slice(-4),
        timestamp: formattedDate,
        fullName: nameInput ? nameInput.value.trim() : 'Anonymous',
        businessName: businessInput ? businessInput.value.trim() : 'N/A',
        email: emailInput ? emailInput.value.trim() : '',
        phone: phoneInput ? phoneInput.value.trim() : 'Not provided',
        helpType: helpInput ? helpInput.options[helpInput.selectedIndex].text : 'General Inquiry',
        message: messageInput ? messageInput.value.trim() : '',
        status: 'New'
      };

      setTimeout(() => {
        const currentList = getInquiries();
        currentList.unshift(newInquiry);
        saveInquiries(currentList);

        contactForm.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <span>Send Message</span>
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          `;
        }

        if (toastNotification) {
          toastNotification.classList.remove('hidden');
          setTimeout(() => {
            toastNotification.classList.add('hidden');
          }, 5000);
        }
      }, 700);
    });
  }

  // --- ADMIN DASHBOARD RENDER & FILTER LOGIC ---
  const closeAdminBtn = document.getElementById('close-admin-btn');
  const adminModal = document.getElementById('admin-modal');
  const inquiryListContainer = document.getElementById('admin-inquiry-list');

  const statTotalCount = document.getElementById('stat-total-count');
  const statNewCount = document.getElementById('stat-new-count');
  const statWorkingCount = document.getElementById('stat-working-count');
  const statResolvedCount = document.getElementById('stat-resolved-count');

  const searchInput = document.getElementById('admin-search-input');
  const filterBtns = document.querySelectorAll('.admin-filter-btn');
  const exportCsvBtn = document.getElementById('export-csv-btn');
  const seedDemoBtn = document.getElementById('seed-demo-btn');

  let activeFilter = 'all';
  let activeSearchTerm = '';

  function renderAdminDashboard() {
    const inquiries = getInquiries();

    // Stats calculations
    const total = inquiries.length;
    const newCount = inquiries.filter(i => i.status === 'New').length;
    const workingCount = inquiries.filter(i => i.status === 'Contacted').length;
    const resolvedCount = inquiries.filter(i => i.status === 'Resolved').length;

    if (statTotalCount) statTotalCount.textContent = total;
    if (statNewCount) statNewCount.textContent = newCount;
    if (statWorkingCount) statWorkingCount.textContent = workingCount;
    if (statResolvedCount) statResolvedCount.textContent = resolvedCount;

    if (!inquiryListContainer) return;

    // Filter & Search matching
    const filtered = inquiries.filter(item => {
      const matchesFilter = (activeFilter === 'all') || (item.status === activeFilter);
      const matchesSearch = activeSearchTerm === '' ||
        item.fullName.toLowerCase().includes(activeSearchTerm) ||
        item.businessName.toLowerCase().includes(activeSearchTerm) ||
        item.email.toLowerCase().includes(activeSearchTerm) ||
        item.message.toLowerCase().includes(activeSearchTerm);

      return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
      inquiryListContainer.innerHTML = `
        <div class="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <div class="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h4 class="text-base font-bold text-white">No Inquiries Found</h4>
          <p class="text-xs text-slate-400 max-w-sm mx-auto">No queries match your current filter or search criteria.</p>
        </div>
      `;
      return;
    }

    inquiryListContainer.innerHTML = filtered.map(item => {
      let statusClass = 'bg-cyan-950 text-cyan-400 border-cyan-800';
      if (item.status === 'Contacted') statusClass = 'bg-amber-950 text-amber-400 border-amber-800';
      if (item.status === 'Resolved') statusClass = 'bg-emerald-950 text-emerald-400 border-emerald-800';

      return `
        <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition-all">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div class="flex items-center gap-3">
              <span class="text-xs font-mono px-2.5 py-1 rounded-lg border ${statusClass}">${item.status.toUpperCase()}</span>
              <span class="text-xs font-mono text-slate-400">${item.timestamp}</span>
              <span class="text-xs font-mono text-slate-500">ID: ${item.id}</span>
            </div>
            
            <div class="flex items-center gap-2">
              <label class="text-xs text-slate-400">Status:</label>
              <select data-id="${item.id}" class="status-change-select bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500">
                <option value="New" ${item.status === 'New' ? 'selected' : ''}>New</option>
                <option value="Contacted" ${item.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
                <option value="Resolved" ${item.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
              </select>
              
              <button data-id="${item.id}" class="delete-inquiry-btn p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors" title="Delete Inquiry">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <span class="text-slate-500 block mb-0.5 font-mono uppercase text-[10px]">Client / Business</span>
              <strong class="text-white text-sm block font-semibold">${escapeHtml(item.fullName)}</strong>
              <span class="text-cyan-400 font-medium">${escapeHtml(item.businessName)}</span>
            </div>
            <div>
              <span class="text-slate-500 block mb-0.5 font-mono uppercase text-[10px]">Contact Info</span>
              <a href="mailto:${escapeHtml(item.email)}" class="text-slate-200 hover:text-cyan-400 block transition-colors">${escapeHtml(item.email)}</a>
              <a href="tel:${escapeHtml(item.phone)}" class="text-slate-400 hover:text-white block transition-colors">${escapeHtml(item.phone)}</a>
            </div>
            <div>
              <span class="text-slate-500 block mb-0.5 font-mono uppercase text-[10px]">Requested Category</span>
              <span class="inline-block bg-slate-950 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-md font-medium">${escapeHtml(item.helpType)}</span>
            </div>
          </div>

          <div class="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 text-xs text-slate-300 leading-relaxed">
            <span class="text-slate-500 font-mono text-[10px] uppercase block mb-1">Inquiry Details:</span>
            <p>${escapeHtml(item.message)}</p>
          </div>
        </div>
      `;
    }).join('');

    // Attach status dropdown change listeners
    document.querySelectorAll('.status-change-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-id');
        const newStatus = e.target.value;
        const currentList = getInquiries();
        const item = currentList.find(i => i.id === id);
        if (item) {
          item.status = newStatus;
          saveInquiries(currentList);
        }
      });
    });

    // Attach delete listeners
    document.querySelectorAll('.delete-inquiry-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this query?')) {
          const currentList = getInquiries().filter(i => i.id !== id);
          saveInquiries(currentList);
        }
      });
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function(m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
  }

  // --- ADMIN AUTHENTICATION & ACCESS CONTROL (SECRET OWNER ACCESS) ---
  const ADMIN_PASSCODE = 'feeldata2026';
  const AUTH_KEY = 'feeldata_admin_authenticated';

  const secretAdminTrigger = document.getElementById('secret-admin-trigger');
  const adminAuthModal = document.getElementById('admin-auth-modal');
  const authModalClose = document.getElementById('auth-modal-close');
  const adminAuthForm = document.getElementById('admin-auth-form');
  const adminPasscode = document.getElementById('admin-passcode');
  const authErrorMsg = document.getElementById('auth-error-msg');
  const adminLogoutBtn = document.getElementById('admin-logout-btn');

  function isOwnerAuthenticated() {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  }

  function requestAdminAccess() {
    if (isOwnerAuthenticated()) {
      if (adminModal) adminModal.classList.remove('hidden');
      renderAdminDashboard();
    } else {
      if (adminAuthModal) {
        adminAuthModal.classList.remove('hidden');
        if (adminPasscode) adminPasscode.focus();
      }
    }
  }

  function lockAdminDashboard() {
    sessionStorage.removeItem(AUTH_KEY);
    if (adminModal) adminModal.classList.add('hidden');
    if (adminAuthModal) adminAuthModal.classList.add('hidden');
  }

  // 1. Secret Lock Icon Click in Footer
  if (secretAdminTrigger) {
    secretAdminTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      requestAdminAccess();
    });
  }

  // 2. Secret Keyboard Shortcut: Ctrl + Shift + A (or Cmd + Shift + A)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      requestAdminAccess();
    }
  });

  // 3. Secret URL Hash: #admin
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#admin') {
      requestAdminAccess();
    }
  });
  if (window.location.hash === '#admin') {
    requestAdminAccess();
  }

  // Passcode Form Submit Handler
  if (adminAuthForm) {
    adminAuthForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredCode = adminPasscode ? adminPasscode.value.trim() : '';
      
      if (enteredCode === ADMIN_PASSCODE) {
        sessionStorage.setItem(AUTH_KEY, 'true');
        if (authErrorMsg) authErrorMsg.classList.add('hidden');
        if (adminPasscode) adminPasscode.value = '';
        if (adminAuthModal) adminAuthModal.classList.add('hidden');
        if (adminModal) adminModal.classList.remove('hidden');
        renderAdminDashboard();
      } else {
        if (authErrorMsg) authErrorMsg.classList.remove('hidden');
      }
    });
  }

  if (authModalClose && adminAuthModal) {
    authModalClose.addEventListener('click', () => {
      adminAuthModal.classList.add('hidden');
      if (authErrorMsg) authErrorMsg.classList.add('hidden');
    });
  }

  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', () => {
      lockAdminDashboard();
    });
  }

  // Admin Modal Close handler
  if (closeAdminBtn && adminModal) {
    closeAdminBtn.addEventListener('click', () => {
      adminModal.classList.add('hidden');
    });
  }

  // Admin Filter Button Handlers
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-cyan-500', 'text-slate-950', 'font-semibold');
        b.classList.add('bg-slate-950', 'text-slate-300', 'border', 'border-slate-800');
      });
      btn.classList.remove('bg-slate-950', 'text-slate-300', 'border', 'border-slate-800');
      btn.classList.add('bg-cyan-500', 'text-slate-950', 'font-semibold');
      
      activeFilter = btn.getAttribute('data-filter');
      renderAdminDashboard();
    });
  });

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeSearchTerm = e.target.value.toLowerCase().trim();
      renderAdminDashboard();
    });
  }

  // Seed Demo Data Button
  if (seedDemoBtn) {
    seedDemoBtn.addEventListener('click', () => {
      saveInquiries(demoInquiries);
    });
  }

  // Export to CSV Functionality
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', () => {
      const inquiries = getInquiries();
      if (inquiries.length === 0) {
        alert('No inquiries available to export.');
        return;
      }

      const headers = ['ID', 'Date & Time', 'Full Name', 'Business Name', 'Email', 'Phone', 'Help Type', 'Status', 'Message'];
      const csvRows = [headers.join(',')];

      inquiries.forEach(item => {
        const row = [
          `"${item.id}"`,
          `"${item.timestamp}"`,
          `"${item.fullName.replace(/"/g, '""')}"`,
          `"${item.businessName.replace(/"/g, '""')}"`,
          `"${item.email.replace(/"/g, '""')}"`,
          `"${item.phone.replace(/"/g, '""')}"`,
          `"${item.helpType.replace(/"/g, '""')}"`,
          `"${item.status}"`,
          `"${item.message.replace(/"/g, '""')}"`
        ];
        csvRows.push(row.join(','));
      });

      const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvRows.join('\n'));
      const downloadLink = document.createElement('a');
      downloadLink.setAttribute('href', csvContent);
      downloadLink.setAttribute('download', `FeelData_Inquiries_${new Date().toISOString().slice(0,10)}.csv`);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  }

  // Initial load check for badge counter
  renderAdminDashboard();

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
