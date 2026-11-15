# 🛠️ How to Edit & Customize "Mayapur Solar" Website

This website was specifically designed so that **you do not need coding knowledge** to update your phone numbers, WhatsApp link, services, address, or prices.

Everything can be customized in **two super simple ways**:

---

## ⚡ Method 1: Edit Live in Your Web Browser (Easiest & Fastest)

1. Open `index.html` in your web browser (Google Chrome, Edge, Brave, Firefox, etc.).
2. Scroll to the very bottom (footer) and click the button:  
   👉 **`[⚙️ Edit Phone/WhatsApp/Details]`**
3. A settings window will pop up right on your screen.
4. Type in your real:
   - **Calling Phone Number**
   - **WhatsApp Number** (with country code, e.g. `919876543210`)
   - **Office Address**
   - **Email Address**
   - **Working Hours**
5. Click **"Apply & Save in Browser"** — the entire site updates instantly!
6. *(Optional)* Click **"Copy Updated site-config.js Code"** to copy the code so you can paste it into `site-config.js` for permanent saving across all devices.

---

## 📝 Method 2: Edit `site-config.js` in Notepad (Permanent & Direct)

Open the file `site-config.js` using **Notepad** (right-click `site-config.js` -> *Open with* -> *Notepad*).

You will see clean, well-commented settings at the top:

```javascript
  // CONTACT INFORMATION (EDIT THESE WITH YOUR REAL NUMBERS)
  contact: {
    // Primary phone for calling
    phoneNumberDisplay: "+91 98765 43210",
    phoneNumberCall: "+919876543210", // No spaces, with country code

    // Secondary / Alternative Phone (optional)
    altPhoneDisplay: "+91 87654 32109",
    altPhoneCall: "+918765432109",

    // WhatsApp Number (Country code + 10 digits without '+' or spaces)
    whatsappNumber: "919876543210",
    whatsappDisplay: "+91 98765 43210",
    
    // Default message when customer clicks WhatsApp
    whatsappDefaultMessage: "Hello Mayapur Solar! Please share details...",

    // Email address
    email: "info@mayapursolar.com",

    // Physical Address
    addressLine1: "Near ISKCON Temple Road, Bamanpukur",
    addressLine2: "Mayapur, Nadia District, West Bengal - 741313",

    // Working Hours
    workingHours: "Monday – Saturday: 9:00 AM – 7:30 PM | Sunday: 10:00 AM – 4:00 PM"
  },
```

### What to change:
1. **To change the Phone Number**:
   - Change `phoneNumberDisplay` to your preferred format, e.g., `"+91 98321 00000"`.
   - Change `phoneNumberCall` to the exact dialable digits, e.g., `"+919832100000"`.
2. **To change the WhatsApp Number**:
   - Change `whatsappNumber` to country code followed by 10 digits (e.g., `"919832100000"` for India).
   - Change `whatsappDisplay` to what users see (e.g., `"+91 98321 00000"`).
3. **To change the Address or Email**:
   - Change `addressLine1`, `addressLine2`, and `email`.

Save the file (`Ctrl + S`) and reload `index.html` in your browser. All phone buttons, WhatsApp chat links, header tags, footer notes, and forms will update automatically!

---

## 🧮 How to Edit the Solar Savings Calculator

Inside `site-config.js`, locate the `calculator` section:

```javascript
  calculator: {
    averageUnitRateINR: 8.5, // Average cost per unit of electricity in West Bengal
    unitsGeneratedPerKWPerMonth: 120, // Approx 4 units/day * 30 days = 120 units/kW
    costPerKWApprox: 60000, // Estimated benchmark cost per kW
    subsidies: {
      1: 30000, // 1 kW subsidy = ₹30,000
      2: 60000, // 2 kW subsidy = ₹60,000
      3: 78000  // 3 kW & above subsidy = ₹78,000 (PM Surya Ghar benchmark)
    }
  },
```

You can adjust:
- `averageUnitRateINR`: Electricity tariff rate per unit (e.g., 7.5, 8.5, 9.0).
- `subsidies`: Subsidy amounts for 1kW, 2kW, 3kW+.

---

## 💼 How to Add or Change Services

In `site-config.js`, find the `services: [...]` list:
You can edit the `title`, `desc`, and bullet points (`features`) of any service, or duplicate a block to add a new service!

```javascript
    {
      id: "residential",
      icon: "solar-home",
      title: "Residential Rooftop Solar",
      badge: "Govt. Subsidy Eligible",
      desc: "Grid-tied solar systems for independent houses...",
      features: [
        "Up to ₹78,000 Direct Bank Subsidy",
        "Net Metering Setup & Approvals",
        "Zero Maintenance Mono PERC Panels",
        "25 Years Linear Power Warranty"
      ]
    },
```

---

## 💬 How Customer WhatsApp Leads Work

When a customer fills out the "Request Free Site Survey" form on the website and clicks **"Send Inquiry via WhatsApp"**, the website automatically formats their inquiry nicely:

```
🌞 NEW SOLAR INQUIRY - MAYAPUR SOLAR
------------------------------------
👤 Name: Sujoy Mondal
📞 Phone: 9832100000
📍 Location/Area: Mayapur Bamanpukur
⚡ System Needed: Residential Rooftop
💰 Monthly Electricity Bill: ₹4200
📝 Notes: South-facing RCC roof, 400 sq.ft.
------------------------------------
Sent via Mayapur Solar Official Website.
```

And opens their WhatsApp directly to send the message straight to your phone!

---

## 🌐 How to Publish This Website Online for Free

When you are ready to put this website online on the internet:

### Option A: Netlify (Free & takes 30 seconds)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `mayapur-solar` folder into your browser window.
3. Your website is live immediately with a free SSL (https) link!
4. You can also connect a custom domain like `www.mayapursolar.com`.

### Option B: GitHub Pages (Free forever)
1. Create a repository on GitHub named `mayapur-solar`.
2. Upload the files (`index.html`, `site-config.js`, `styles.css`, `app.js`).
3. Enable GitHub Pages in repository Settings -> Pages.

### Option C: Any Hosting (Hostinger, GoDaddy, Bluehost, cPanel)
1. Open File Manager / `public_html`.
2. Upload all files from `mayapur-solar/` directly into your web root.
