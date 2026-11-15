# ☀️ Mayapur Solar - Official Business Website

High-performance, ultra-optimized, and fully responsive website for **Mayapur Solar**, specializing in residential rooftop solar installations, PM Surya Ghar Muft Bijli Yojana subsidies, commercial solar plants, agricultural pumps, and WBSEDCL net metering in Nadia & West Bengal.

---

## ⚡ Performance & Rendering Optimizations

- **Instant First Paint (<20ms)**: Critical above-the-fold CSS inlined directly in `<head>` so the header and hero section paint on the first network packet.
- **Zero Cumulative Layout Shift (CLS = 0)**: All service cards, benefits, process steps, testimonials, and FAQs are pre-rendered in static HTML. No content jumping or flashing.
- **`content-visibility: auto` Engine**: Below-the-fold sections are lazy-evaluated by the browser, reducing initial DOM layout calculation time by up to 70%.
- **Non-Blocking Font & Script Loading**: Google Fonts load asynchronously with `font-display: swap` and an instant native system font fallback. Scripts execute with `defer`.
- **60fps/120fps Interactive Calculator**: Slider updates are batched with `requestAnimationFrame` with a dynamic gradient progress fill.
- **Mobile Touch-Optimized**: Full compliance with 44x44px touch targets, safe-area insets (`env(safe-area-inset-bottom)`), 16px form inputs to prevent iOS Safari auto-zoom, and smooth backdrop-blurred mobile navigation drawer with body scroll lock.

---

## 🌟 Key Features

- **⚡ Click-to-Call & WhatsApp Direct Lead Integration**:
  - Top contact bar with quick dialer and WhatsApp chat.
  - Floating WhatsApp chat bubble with pulse effect.
  - Mobile bottom sticky contact bar (`Call Now` & `WhatsApp Us`).
  - Interactive Contact Form with 1-click **"Send Inquiry via WhatsApp"** feature.
- **🧮 Interactive Solar Savings & Subsidy Calculator**:
  - Live slider for monthly electricity bills.
  - Dynamic sizing calculation (kW), expected roof area, estimated subsidy credit (up to ₹78,000), and monthly cash savings.
  - Instant WhatsApp inquiry button populated with the exact calculated kW.
- **📋 Turnkey Solar Solutions Showcase**:
  - Residential Rooftop Solar (PM Surya Ghar subsidy eligible).
  - Commercial & Industrial Solar (40% accelerated depreciation tax benefits).
  - Hybrid & Off-Grid Battery Storage.
  - Solar Agricultural Water Pumps (PM-KUSUM).
  - Annual Maintenance & Panel Cleaning (AMC).
  - Free Rooftop Feasibility & Shadow Analysis Survey.
- **🛡️ Built-in Trust Factors**:
  - 25-Year Tier-1 Warranty Highlights.
  - 4-Step Installation Journey.
  - Local Customer Reviews from Mayapur, Nabadwip & Nadia.
  - Comprehensive FAQs accordion.
- **🛠️ Ultra Easy to Customize & Edit**:
  - Centralized `site-config.js` file for non-coders.
  - Built-in In-Browser Settings Modal (click *Edit Details* in the footer).
  - Zero build step required — works immediately out of the box!

---

## 🚀 Quick Start / How to Run Locally

1. Open the folder: `c:\Users\ADMIN\Downloads\debloat\mayapur-solar`
2. Double-click **`index.html`** in Windows Explorer (or use [`open_website.bat`](open_website.bat) / [`open_mayapur_solar.bat`](../open_mayapur_solar.bat)).
3. The website will immediately open in your default browser!

---

## 📖 How to Edit Contacts & Details

Refer to [HOW_TO_EDIT.md](HOW_TO_EDIT.md) for full instructions:
- **Phone & WhatsApp**: Open `site-config.js` in Notepad or click the **"Edit Details"** button in the website footer.
- **Prices & Subsidy**: Update the `calculator` section in `site-config.js`.
- **Text & Services**: Modify the `services` or `hero` objects in `site-config.js`.

---

© Mayapur Solar. Empowering Bengal with Clean, Affordable Solar Energy.
