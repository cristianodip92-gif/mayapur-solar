/**
 * ====================================================================
 * MAYAPUR SOLAR - EASY CONFIGURATION FILE
 * ====================================================================
 * You can edit your contact numbers, WhatsApp message, address,
 * prices, and text right here without touching complex HTML/CSS code!
 * 
 * After making changes, just save this file and refresh your browser.
 * ====================================================================
 */

const SITE_CONFIG = {
  // BRANDING
  companyName: "Mayapur Solar",
  tagline: "Empowering Nadia & Bengal with Clean, Affordable Solar Energy",
  subTagline: "Authorized Solar Rooftop Solutions | PM Surya Ghar Subsidy Partner | Residential & Commercial",

  // CONTACT INFORMATION (EDIT THESE WITH YOUR REAL NUMBERS)
  contact: {
    // Primary phone for calling
    phoneNumberDisplay: "+91 9958989083", 
    phoneNumberCall: "+919958989083", // No spaces, with country code

    // Secondary / Alternative Phone (optional)
    altPhoneDisplay: "+91 9958989083",
    altPhoneCall: "+919958989083",

    // WhatsApp Number (Country code + 10 digits without '+' or spaces, e.g. '919876543210')
    whatsappNumber: "919958989083",
    whatsappDisplay: "+91 9958989083",
    
    // Default WhatsApp message when a customer clicks "Chat on WhatsApp"
    whatsappDefaultMessage: "Hello Mayapur Solar! I am interested in installing solar panels for my home/business. Please share price details and subsidy information.",

    // Email address
    email: "mayapursolar@gmail.com",

    // Physical Address
    addressLine1: "Near ISKCON Temple Road, Bamanpukur",
    addressLine2: "Mayapur, Nadia District, West Bengal - 741313",
    googleMapsSearchUrl: "https://maps.google.com/?q=Mayapur+Nadia+West+Bengal",

    // Operating Hours
    workingHours: "Monday – Saturday: 9:00 AM – 7:30 PM | Sunday: 10:00 AM – 4:00 PM"
  },

  // HERO SECTION DETAILS
  hero: {
    badge: "☀️ Approved PM Surya Ghar Muft Bijli Yojana Partner",
    title: "Cut Your Electricity Bill by up to 90% with Mayapur Solar",
    description: "Get government subsidy up to ₹78,000 on residential rooftop solar in West Bengal. Premium Tier-1 panels, 25-year performance warranty, and end-to-end installation by local certified engineers.",
    primaryCtaText: "Get Free Solar Quote",
    secondaryCtaText: "Chat on WhatsApp"
  },

  // QUICK HIGHLIGHT METRICS
  metrics: [
    { value: "500+", label: "Solar Installations Completed" },
    { value: "₹78,000", label: "Max Govt. Subsidy Available" },
    { value: "25 Yrs", label: "Solar Panel Warranty" },
    { value: "4.9 ★", label: "Local Customer Rating" }
  ],

  // SOLAR SAVINGS CALCULATOR DEFAULTS
  // Users can slide their electricity bill to estimate kW and savings
  calculator: {
    averageUnitRateINR: 8.5, // Average cost per unit of electricity in West Bengal
    unitsGeneratedPerKWPerMonth: 120, // Approx 4 units/day * 30 days = 120 units/kW
    costPerKWApprox: 60000, // Estimated benchmark cost per kW before subsidy
    subsidies: {
      1: 30000, // 1 kW subsidy = ₹30,000
      2: 60000, // 2 kW subsidy = ₹60,000
      3: 78000  // 3 kW & above subsidy = ₹78,000 (PM Surya Ghar benchmark)
    }
  },

  // SERVICES OFFERED
  services: [
    {
      id: "residential,industrial",
      icon: "solar-home",
      title: "Residential,Industrial Rooftop Solar",
      badge: "Govt. Subsidy Eligible",
      desc: "Grid-tied solar systems for independent houses, villas, and apartments. Slash your monthly power bill and get net metering benefits with WBSEDCL.",
      features: [
        "Up to ₹78,000 Direct Bank Subsidy",
        "Net Metering Setup & Approvals",
        "Zero Maintenance Mono PERC / TOPCon Panels",
        "25 Years Linear Power Warranty"
      ]
    },
    {
      id: "commercial",
      icon: "solar-building",
      title: "Commercial & Industrial Solar",
      badge: "High ROI & Tax Benefits",
      desc: "Customized large-scale rooftop solar plants for hotels, ashrams, schools, hospitals, factories, and commercial shops across Nadia & Bengal.",
      features: [
        "40% Accelerated Depreciation Tax Benefit",
        "Drastic Reduction in Commercial Tariff Bills",
        "Remote Cloud Monitoring App",
        "Quick Payback Period of 3 to 4 Years"
      ]
    },
    {
      id: "offgrid",
      icon: "solar-battery",
      title: "Hybrid & Off-Grid Energy Storage",
      badge: "24/7 Power Backup",
      desc: "Solar systems paired with advanced Lithium or Tubular battery banks to guarantee uninterrupted power even during frequent power cuts and storms.",
      features: [
        "Continuous 24/7 Power Supply",
        "High-efficiency Hybrid Inverters",
        "Long-life Lithium-ion / Solar Tubular Batteries",
        "Protection from Grid Surges & Voltage Drops"
      ]
    },
    {
      id: "agricultural",
      icon: "solar-pump",
      title: "Solar Water Pump & Agriculture",
      badge: "PM-KUSUM Friendly",
      desc: "Solar-powered irrigation solutions for farmers and agricultural lands around Mayapur, Nabadwip, and Krishnanagar.",
      features: [
        "Eliminate Diesel & Costly Grid Electricity",
        "High-discharge Submersible & Surface Pumps",
        "Robust Weather-proof Mounting Structures",
        "Local Service & Support within 24 Hours"
      ]
    },
    {
      id: "maintenance",
      icon: "solar-wrench",
      title: "Solar AMC & Panel Cleaning",
      badge: "Maximum Efficiency",
      desc: "Routine preventive maintenance, panel chemical/de-ionized cleaning, wiring audits, and inverter health checks to maximize generation.",
      features: [
        "Scheduled Bi-monthly / Quarterly Cleaning",
        "Thermal Imaging & Fault Diagnostics",
        "Inverter In-warranty Claim Handling",
        "Emergency On-site Repair Support"
      ]
    },
    {
      id: "consultation",
      icon: "solar-chart",
      title: "Free Rooftop Survey & Paperwork",
      badge: "100% Free",
      desc: "Our certified engineers visit your property, assess shadow-free roof area, prepare 3D generation design, and handle all government subsidy paperwork.",
      features: [
        "Free Drone / Shadow Analysis Survey",
        "Exact Monthly Savings Forecast",
        "Complete WBSEDCL & Subsidy Filing",
        "Easy 0% Interest EMI Loan Assistance"
      ]
    }
  ],

  // WHY CHOOSE MAYAPUR SOLAR
  whyChooseUs: [
    {
      icon: "badge-check",
      title: "Local & Trusted in Mayapur",
      desc: "Based directly in Mayapur-Nadia. Fast, same-day site visits and local technicians who are always a phone call away."
    },
    {
      icon: "zap",
      title: "100% Hassle-Free Subsidy Support",
      desc: "We manage the entire PM Surya Ghar portal paperwork, technical feasibility approval, and bank subsidy credit for you."
    },
    {
      icon: "shield-check",
      title: "Tier-1 Certified Hardware",
      desc: "We only use top-grade MNRE-approved panels (Tata, Waaree, Adani, Goldi) and certified string inverters (Growatt, Sungrow, Solis)."
    },
    {
      icon: "headphones",
      title: "25-Year Long-Term Peace of Mind",
      desc: "Comprehensive 25-year panel performance warranty, 5-10 year inverter warranty, plus complimentary 1-year free maintenance service."
    }
  ],

  // INSTALLATION PROCESS STEPS
  steps: [
    { step: "01", title: "Free Site Assessment", desc: "Contact us or chat on WhatsApp. Our engineer visits your roof to check shadow and space." },
    { step: "02", title: "Custom Design & Quote", desc: "Receive an engineering blueprint, expected unit generation, exact cost, and subsidy estimate." },
    { step: "03", title: "Approvals & Subsidy Filing", desc: "We complete portal registrations, DISCOM net-metering approvals, and bank subsidy applications." },
    { step: "04", title: "Fast Installation & Commissioning", desc: "Our certified team installs the system within 3-7 business days. Turn on the sun!" }
  ],

  // FREQUENTLY ASKED QUESTIONS (FAQS)
  faqs: [
    {
      q: "How much government subsidy do I get under PM Surya Ghar Muft Bijli Yojana?",
      a: "Under the current government scheme for residential consumers, you receive ₹30,000 for a 1 kW system, ₹60,000 for a 2 kW system, and a maximum of ₹78,000 for 3 kW and higher systems. Mayapur Solar handles 100% of the portal registration and bank subsidy credit process for you."
    },
    {
      q: "How much roof area is needed for a rooftop solar system?",
      a: "As a rule of thumb, approximately 80 to 100 square feet of shadow-free rooftop space is required for every 1 kW of solar panel installation. For example, a 3 kW system needs around 250 to 300 sq. ft."
    },
    {
      q: "What is Net Metering and how does it reduce my electricity bill?",
      a: "With a bi-directional Net Meter installed by WBSEDCL, electricity generated by your solar panels powers your home first. Any surplus energy flows into the main power grid and earns you credit units. At night or on cloudy days, you draw from these earned credits, reducing your bill up to 90%."
    },
    {
      q: "Will solar work during rainy days or cloudy monsoon weather in Bengal?",
      a: "Yes! Modern Mono PERC and TOPCon panels use diffuse daylight and still generate between 25% and 50% of their peak power on cloudy days. Over the course of the full year, the sunny days balance out your overall generation."
    },
    {
      q: "What is the warranty and lifespan of the solar system?",
      a: "Solar panels have a performance lifespan of 25 to 30 years with a 25-year manufacturer warranty. Inverters typically carry a 5 to 10-year warranty, and Mayapur Solar provides full service warranty on installation and workmanship."
    },
    {
      q: "Can I get solar on EMI / Bank financing?",
      a: "Yes! Government-backed low-interest solar rooftop loans (as low as ~7% p.a.) are available from leading public and private banks through the national portal. We assist you with instant documentation."
    }
  ],

  // CUSTOMER REVIEWS / TESTIMONIALS
  testimonials: [
    {
      name: "Radhe Shyam Ghosh",
      location: "Mayapur Ghat Road",
      system: "3 kW Residential On-Grid",
      quote: "My electric bill was around ₹3,200 every month. After Mayapur Solar installed a 3kW system, my last bill was under ₹350! The subsidy of ₹78,000 was credited directly to my bank account. Excellent service!",
      rating: 5
    },
    {
      name: "Amitabha Mondal",
      location: "Nabadwip Dham",
      system: "5 kW Commercial Plant",
      quote: "Installed for our sweet manufacturing and cold storage unit. The installation team was punctual, neat, and handled all WBSEDCL net-metering paperwork seamlessly. Highly recommended for all local businesses.",
      rating: 5
    },
    {
      name: "Subrata Roy",
      location: "Krishnanagar Road",
      system: "2 kW Hybrid System with Battery",
      quote: "We faced frequent load shedding during storms. Now we have 24-hour power backup plus minimal power bills. Mayapur Solar’s local team is always available on WhatsApp for any questions.",
      rating: 5
    }
  ],

  // SOCIAL LINKS (Leave empty "#" if not yet created)
  socialLinks: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
    whatsapp: "https://wa.me/919958989083"
  }
};

// Make accessible to window
if (typeof window !== "undefined") {
  window.SITE_CONFIG = SITE_CONFIG;
}
