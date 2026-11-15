/**
 * ====================================================================
 * MAYAPUR SOLAR - HIGH-PERFORMANCE CORE APPLICATION LOGIC
 * ====================================================================
 * Optimized for minimum execution time, zero layout shift (CLS = 0),
 * smooth 60fps/120fps touch interactions, and non-blocking rendering.
 * ====================================================================
 */

(() => {
  "use strict";

  // Execute as soon as DOM is ready or immediately if already loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }

  function initApp() {
    const activeConfig = getActiveConfig();

    // 1. Bind Dynamic Configuration to DOM (Phone, WhatsApp, Text)
    applyConfigToDOM(activeConfig);

    // 2. Only re-render dynamic arrays if custom overrides exist in localStorage
    if (activeConfig._hasCustomOverrides) {
      if (activeConfig.services) renderServices(activeConfig.services);
      if (activeConfig.whyChooseUs) renderWhyChooseUs(activeConfig.whyChooseUs);
      if (activeConfig.steps) renderSteps(activeConfig.steps);
      if (activeConfig.testimonials) renderTestimonials(activeConfig.testimonials);
      if (activeConfig.faqs) renderFaqs(activeConfig.faqs);
    } else {
      // Static HTML is already pre-rendered in index.html for instant paint!
      // Just initialize accordion click handlers on existing DOM
      initFaqAccordion();
    }

    // 3. Initialize Interactive Components
    initMobileMenu();
    initSolarCalculator(activeConfig);
    initInquiryForm(activeConfig);
    initLiveEditor(activeConfig);

    // 4. Update Footer Copyright Year
    const yearEl = document.getElementById("currentYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /**
   * Retrieves active config: merges site-config.js with any localStorage overrides
   */
  function getActiveConfig() {
    const baseConfig = window.SITE_CONFIG || {};
    try {
      const saved = localStorage.getItem("mayapur_solar_custom_config");
      if (saved) {
        const parsed = JSON.parse(saved);
        const merged = deepMerge(Object.assign({}, baseConfig), parsed);
        merged._hasCustomOverrides = true;
        return merged;
      }
    } catch (e) {
      console.warn("Could not read localStorage config:", e);
    }
    return baseConfig;
  }

  function deepMerge(target, source) {
    for (const key of Object.keys(source)) {
      if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
        if (!target[key]) target[key] = {};
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  }

  /**
   * Fast DOM binding for phone, whatsapp, email, and company details
   */
  function applyConfigToDOM(config) {
    // Text bindings
    const textElements = document.querySelectorAll("[data-bind]");
    for (let i = 0; i < textElements.length; i++) {
      const el = textElements[i];
      const keyPath = el.getAttribute("data-bind");
      const val = getNestedValue(config, keyPath);
      if (val !== undefined && val !== null) {
        el.textContent = val;
      }
    }

    // Phone & WhatsApp links
    const phoneCall = config.contact?.phoneNumberCall || "+919876543210";
    const waNum = config.contact?.whatsappNumber || "919876543210";
    const waMsg = encodeURIComponent(config.contact?.whatsappDefaultMessage || "Hello Mayapur Solar! Please share details.");

    const telLinks = document.querySelectorAll("[data-bind-href='tel']");
    for (let i = 0; i < telLinks.length; i++) {
      telLinks[i].setAttribute("href", `tel:${phoneCall}`);
    }

    const waLinks = document.querySelectorAll("[data-bind-href='whatsapp']");
    for (let i = 0; i < waLinks.length; i++) {
      waLinks[i].setAttribute("href", `https://wa.me/${waNum}?text=${waMsg}`);
    }
  }

  function getNestedValue(obj, path) {
    if (!path || !obj) return undefined;
    if (obj[path] !== undefined) return obj[path];
    if (obj.contact && obj.contact[path] !== undefined) return obj.contact[path];
    if (obj.hero && obj.hero[path] !== undefined) return obj.hero[path];
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  }

  /**
   * Mobile Menu Drawer with Smooth Backdrop, Touch Support & ESC key
   */
  function initMobileMenu() {
    const toggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const backdrop = document.getElementById("menuBackdrop");

    if (!toggle || !navMenu) return;

    function openMenu() {
      toggle.classList.add("active");
      navMenu.classList.add("open");
      if (backdrop) backdrop.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function closeMenu() {
      toggle.classList.remove("active");
      navMenu.classList.remove("open");
      if (backdrop) backdrop.classList.remove("open");
      document.body.style.overflow = "";
    }

    toggle.addEventListener("click", () => {
      if (navMenu.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (backdrop) {
      backdrop.addEventListener("click", closeMenu);
    }

    // Close when clicking any nav link
    const links = navMenu.querySelectorAll(".nav-link");
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener("click", closeMenu);
    }

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("open")) {
        closeMenu();
      }
    });
  }

  /**
   * Interactive Solar Savings Calculator (Optimized 60fps/120fps with requestAnimationFrame)
   */
  function initSolarCalculator(config) {
    const slider = document.getElementById("billSlider");
    const billDisplay = document.getElementById("billValueDisplay");
    const kwDisplay = document.getElementById("calcKwResult");
    const subsidyDisplay = document.getElementById("calcSubsidyResult");
    const roofDisplay = document.getElementById("calcRoofArea");
    const savingsDisplay = document.getElementById("calcMonthlySavings");
    const waCta = document.getElementById("calcWhatsAppCta");
    const note = document.getElementById("subsidyNote");
    const typePills = document.querySelectorAll(".type-pill");

    if (!slider) return;

    let currentType = "residential";
    let isTicking = false;

    // Unit constants
    const unitRate = config.calculator?.averageUnitRateINR || 8.5;
    const unitsPerKw = config.calculator?.unitsGeneratedPerKWPerMonth || 120;
    const subsidies = config.calculator?.subsidies || { 1: 30000, 2: 60000, 3: 78000 };
    const waNum = config.contact?.whatsappNumber || "919876543210";

    typePills.forEach(pill => {
      pill.addEventListener("click", () => {
        typePills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        currentType = pill.getAttribute("data-type");

        if (note) {
          if (currentType === "commercial") {
            note.textContent = "Commercial units get up to 40% Accelerated Depreciation tax benefits & steep bill reduction!";
          } else {
            note.textContent = "Residential users get direct bank subsidy up to ₹78,000 deposited in their bank account!";
          }
        }
        requestUpdate();
      });
    });

    function requestUpdate() {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          updateCalculator();
          isTicking = false;
        });
        isTicking = true;
      }
    }

    function updateCalculator() {
      const bill = parseInt(slider.value, 10);
      const min = parseInt(slider.min, 10) || 800;
      const max = parseInt(slider.max, 10) || 15000;
      const pct = ((bill - min) / (max - min)) * 100;

      // Dynamic slider track fill gradient
      slider.style.background = `linear-gradient(to right, #d97706 0%, #d97706 ${pct}%, #cbd5e1 ${pct}%, #cbd5e1 100%)`;

      if (billDisplay) billDisplay.textContent = `₹ ${bill.toLocaleString("en-IN")}`;

      // Calculate recommended kW
      const unitsPerMonth = bill / unitRate;
      let recommendedKw = Math.max(1, Math.round(unitsPerMonth / unitsPerKw));
      if (recommendedKw > 25) recommendedKw = 25;

      const roofArea = Math.round(recommendedKw * 90);

      // Subsidy
      let subsidyAmount = 0;
      if (currentType === "residential") {
        if (recommendedKw === 1) subsidyAmount = subsidies[1] || 30000;
        else if (recommendedKw === 2) subsidyAmount = subsidies[2] || 60000;
        else subsidyAmount = subsidies[3] || 78000;
      }

      // Savings
      const monthlySavings = Math.round(Math.min(bill * 0.9, recommendedKw * unitsPerKw * unitRate));

      if (kwDisplay) kwDisplay.textContent = `${recommendedKw} kW`;

      if (subsidyDisplay) {
        if (currentType === "residential") {
          subsidyDisplay.textContent = `₹ ${subsidyAmount.toLocaleString("en-IN")}`;
          const subText = subsidyDisplay.parentElement.querySelector(".stat-sub");
          if (subText) subText.textContent = "Direct Bank Credit";
        } else {
          subsidyDisplay.textContent = "Tax Benefits";
          const subText = subsidyDisplay.parentElement.querySelector(".stat-sub");
          if (subText) subText.textContent = "40% Depreciation";
        }
      }

      if (roofDisplay) roofDisplay.textContent = `~${roofArea} sq. ft.`;
      if (savingsDisplay) savingsDisplay.textContent = `₹ ${monthlySavings.toLocaleString("en-IN")}/mo`;

      if (waCta) {
        const msg = encodeURIComponent(
          `Hello Mayapur Solar! I checked your Solar Calculator on your website.\n\n` +
          `• Monthly Bill: ₹${bill.toLocaleString("en-IN")}\n` +
          `• Type: ${currentType === "residential" ? "Residential Home" : "Commercial Unit"}\n` +
          `• Recommended Size: ${recommendedKw} kW\n` +
          `• Expected Subsidy: ${currentType === "residential" ? "₹" + subsidyAmount.toLocaleString("en-IN") : "Commercial Benefits"}\n\n` +
          `Please provide a formal quotation and arrange a free rooftop site survey for me in Mayapur / Nadia.`
        );
        waCta.href = `https://wa.me/${waNum}?text=${msg}`;
      }
    }

    slider.addEventListener("input", requestUpdate, { passive: true });
    updateCalculator(); // Initial calculation
  }

  /**
   * FAQ Accordion Click Handler
   */
  function initFaqAccordion() {
    const questions = document.querySelectorAll(".faq-question");
    for (let i = 0; i < questions.length; i++) {
      const btn = questions[i];
      btn.addEventListener("click", () => {
        const item = btn.parentElement;
        const isOpen = item.classList.contains("active");

        // Close siblings
        const allItems = document.querySelectorAll(".faq-item");
        for (let j = 0; j < allItems.length; j++) {
          allItems[j].classList.remove("active");
          const q = allItems[j].querySelector(".faq-question");
          if (q) q.setAttribute("aria-expanded", "false");
        }

        if (!isOpen) {
          item.classList.add("active");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    }
  }

  /**
   * Contact Form WhatsApp Integration
   */
  function initInquiryForm(config) {
    const form = document.getElementById("solarInquiryForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = (document.getElementById("formName")?.value || "").trim();
      const phone = (document.getElementById("formPhone")?.value || "").trim();
      const location = (document.getElementById("formLocation")?.value || "").trim();
      const bill = (document.getElementById("formBill")?.value || "").trim();
      const type = document.getElementById("formType")?.value || "Residential Rooftop";
      const message = (document.getElementById("formMessage")?.value || "").trim();

      if (!name || !phone || !location) {
        alert("Please fill in your Name, Phone Number, and Location.");
        return;
      }

      const waNum = config.contact?.whatsappNumber || "919876543210";

      const formatted =
        `*🌞 NEW SOLAR INQUIRY - MAYAPUR SOLAR*\n` +
        `------------------------------------\n` +
        `👤 *Name:* ${name}\n` +
        `📞 *Phone:* ${phone}\n` +
        `📍 *Location:* ${location}\n` +
        `⚡ *System Needed:* ${type}\n` +
        (bill ? `💰 *Monthly Bill:* ₹${bill}\n` : "") +
        (message ? `📝 *Requirements:* ${message}\n` : "") +
        `------------------------------------\n` +
        `Sent via Mayapur Solar Official Website. Please respond with quotation and subsidy details.`;

      const waUrl = `https://wa.me/${waNum}?text=${encodeURIComponent(formatted)}`;
      window.open(waUrl, "_blank");
      form.reset();
    });
  }

  /**
   * Built-in Live In-Browser Settings & Editor Modal
   */
  function initLiveEditor(config) {
    const modal = document.getElementById("editorModal");
    const openBtn = document.getElementById("openEditorBtn");
    const closeBtn = document.getElementById("closeEditorBtn");
    const form = document.getElementById("liveEditorForm");
    const copyBtn = document.getElementById("copyConfigBtn");
    const resetBtn = document.getElementById("resetDefaultsBtn");
    const statusMsg = document.getElementById("editorStatusMsg");

    if (!modal || !openBtn) return;

    openBtn.addEventListener("click", () => {
      document.getElementById("editCompanyName").value = config.companyName || "Mayapur Solar";
      document.getElementById("editPhoneDisplay").value = config.contact?.phoneNumberDisplay || "";
      document.getElementById("editPhoneCall").value = config.contact?.phoneNumberCall || "";
      document.getElementById("editWaNumber").value = config.contact?.whatsappNumber || "";
      document.getElementById("editWaDisplay").value = config.contact?.whatsappDisplay || "";
      document.getElementById("editEmail").value = config.contact?.email || "";
      document.getElementById("editAddress1").value = config.contact?.addressLine1 || "";
      document.getElementById("editAddress2").value = config.contact?.addressLine2 || "";
      document.getElementById("editHours").value = config.contact?.workingHours || "";
      document.getElementById("editTagline").value = config.tagline || "";
      modal.classList.add("open");
    });

    function closeModal() {
      modal.classList.remove("open");
    }

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
    });

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const updated = {
          companyName: document.getElementById("editCompanyName").value.trim(),
          tagline: document.getElementById("editTagline").value.trim(),
          contact: {
            phoneNumberDisplay: document.getElementById("editPhoneDisplay").value.trim(),
            phoneNumberCall: document.getElementById("editPhoneCall").value.trim(),
            whatsappNumber: document.getElementById("editWaNumber").value.trim(),
            whatsappDisplay: document.getElementById("editWaDisplay").value.trim(),
            email: document.getElementById("editEmail").value.trim(),
            addressLine1: document.getElementById("editAddress1").value.trim(),
            addressLine2: document.getElementById("editAddress2").value.trim(),
            workingHours: document.getElementById("editHours").value.trim()
          }
        };

        localStorage.setItem("mayapur_solar_custom_config", JSON.stringify(updated));
        deepMerge(config, updated);
        applyConfigToDOM(config);

        if (statusMsg) {
          statusMsg.textContent = "✅ Changes applied live! To make them permanent across all devices, click 'Copy Updated site-config.js Code' below.";
          statusMsg.classList.add("success");
          statusMsg.style.display = "block";
        }
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        const phoneDisplay = document.getElementById("editPhoneDisplay").value.trim() || config.contact.phoneNumberDisplay;
        const phoneCall = document.getElementById("editPhoneCall").value.trim() || config.contact.phoneNumberCall;
        const waNum = document.getElementById("editWaNumber").value.trim() || config.contact.whatsappNumber;
        const waDisplay = document.getElementById("editWaDisplay").value.trim() || config.contact.whatsappDisplay;
        const email = document.getElementById("editEmail").value.trim() || config.contact.email;
        const address1 = document.getElementById("editAddress1").value.trim() || config.contact.addressLine1;
        const address2 = document.getElementById("editAddress2").value.trim() || config.contact.addressLine2;
        const hours = document.getElementById("editHours").value.trim() || config.contact.workingHours;
        const company = document.getElementById("editCompanyName").value.trim() || config.companyName;

        const exportCode =
`// Copy and paste this into mayapur-solar/site-config.js:
const SITE_CONFIG = {
  companyName: ${JSON.stringify(company)},
  tagline: ${JSON.stringify(config.tagline)},
  subTagline: ${JSON.stringify(config.subTagline)},
  contact: {
    phoneNumberDisplay: ${JSON.stringify(phoneDisplay)},
    phoneNumberCall: ${JSON.stringify(phoneCall)},
    whatsappNumber: ${JSON.stringify(waNum)},
    whatsappDisplay: ${JSON.stringify(waDisplay)},
    whatsappDefaultMessage: ${JSON.stringify(config.contact.whatsappDefaultMessage)},
    email: ${JSON.stringify(email)},
    addressLine1: ${JSON.stringify(address1)},
    addressLine2: ${JSON.stringify(address2)},
    googleMapsSearchUrl: ${JSON.stringify(config.contact.googleMapsSearchUrl)},
    workingHours: ${JSON.stringify(hours)}
  },
  hero: ${JSON.stringify(config.hero, null, 2)},
  metrics: ${JSON.stringify(config.metrics, null, 2)},
  calculator: ${JSON.stringify(config.calculator, null, 2)},
  services: ${JSON.stringify(config.services, null, 2)},
  whyChooseUs: ${JSON.stringify(config.whyChooseUs, null, 2)},
  steps: ${JSON.stringify(config.steps, null, 2)},
  faqs: ${JSON.stringify(config.faqs, null, 2)},
  testimonials: ${JSON.stringify(config.testimonials, null, 2)},
  socialLinks: ${JSON.stringify(config.socialLinks, null, 2)}
};

if (typeof window !== "undefined") {
  window.SITE_CONFIG = SITE_CONFIG;
}`;

        navigator.clipboard.writeText(exportCode).then(() => {
          if (statusMsg) {
            statusMsg.textContent = "📋 Updated configuration code copied to clipboard! Paste it into site-config.js.";
            statusMsg.classList.add("success");
            statusMsg.style.display = "block";
          }
        }).catch(() => {
          alert("Could not copy automatically. Please verify clipboard permissions.");
        });
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (confirm("Reset all browser modifications back to default settings?")) {
          localStorage.removeItem("mayapur_solar_custom_config");
          location.reload();
        }
      });
    }
  }

  // Fallback dynamic rendering methods if custom overrides are loaded
  function renderServices(services) {
    const grid = document.getElementById("servicesGrid");
    if (!grid || !services) return;
    grid.innerHTML = services.map(svc => `
      <div class="service-card" id="service-${svc.id}">
        <div class="service-card-top">
          ${svc.badge ? `<span class="service-badge">${svc.badge}</span>` : ""}
          <div class="service-icon-box">
            <svg class="icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>
          </div>
          <h3>${svc.title}</h3>
          <p>${svc.desc}</p>
          <ul class="service-features-list">
            ${svc.features.map(f => `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg><span>${f}</span></li>`).join("")}
          </ul>
        </div>
        <div class="service-card-action">
          <a href="#contact" class="service-link"><span>Inquire About This Service</span><svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
        </div>
      </div>
    `).join("");
  }

  function renderWhyChooseUs(list) {
    const container = document.getElementById("whyChooseUsList");
    if (!container || !list) return;
    container.innerHTML = list.map(item => `
      <div class="benefit-item">
        <div class="benefit-icon-wrap"><svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
        <div><h4>${item.title}</h4><p>${item.desc}</p></div>
      </div>
    `).join("");
  }

  function renderSteps(steps) {
    const container = document.getElementById("stepsGrid");
    if (!container || !steps) return;
    container.innerHTML = steps.map(s => `
      <div class="process-step-card">
        <div class="step-num-pill">${s.step}</div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </div>
    `).join("");
  }

  function renderTestimonials(testimonials) {
    const container = document.getElementById("testimonialsGrid");
    if (!container || !testimonials) return;
    container.innerHTML = testimonials.map(t => `
      <div class="testimonial-card">
        <div><div class="stars-row">${"★".repeat(t.rating || 5)}</div><p class="testimonial-quote">"${t.quote}"</p></div>
        <div class="customer-info"><span class="customer-name">${t.name}</span><span class="customer-loc">${t.location}</span><span class="customer-system">${t.system}</span></div>
      </div>
    `).join("");
  }

  function renderFaqs(faqs) {
    const container = document.getElementById("faqsAccordion");
    if (!container || !faqs) return;
    container.innerHTML = faqs.map((faq, idx) => `
      <div class="faq-item ${idx === 0 ? "active" : ""}">
        <button class="faq-question" type="button" aria-expanded="${idx === 0 ? "true" : "false"}">
          <span>${faq.q}</span>
          <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
        <div class="faq-answer"><p>${faq.a}</p></div>
      </div>
    `).join("");
    initFaqAccordion();
  }

})();
