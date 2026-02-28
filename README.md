# CalcWise 🧮

> **Free online calculator site** — 36 fully working calculators for Finance, Health, Math & Everyday life. Built as a single HTML file with zero dependencies, zero backend, and zero cost to host.

![CalcWise Preview](https://img.shields.io/badge/Calculators-36-6c63ff?style=for-the-badge)
![HTML](https://img.shields.io/badge/HTML-Single%20File-orange?style=for-the-badge)
![Hosting](https://img.shields.io/badge/Hosting-Free%20on%20Vercel-black?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## ✨ Features

- **36 Calculators** across 4 categories — all fully functional
- **Zero dependencies** — pure HTML, CSS, and JavaScript
- **Client-side only** — no server, no backend, no database
- **AdSense ready** — 4 pre-placed ad zones for monetization
- **Live search** — find any calculator instantly
- **Dark modern UI** — mobile responsive, fast loading
- **Free to host** — deploy on Vercel, Netlify, or GitHub Pages

---

## 📊 Calculator Categories

### 💰 Finance (12 Calculators)
| Calculator | Description |
|---|---|
| Mortgage | Monthly payments, total interest, amortization |
| Loan | Personal & auto loan payments |
| Compound Interest | Investment growth with contributions |
| Credit Card Payoff | Payoff timeline and total interest |
| Salary | Hourly ↔ Annual conversion |
| Tip | Bill splitting and tip per person |
| ROI | Return on investment percentage |
| Percentage | 3-in-1 percentage calculations |
| Sales Tax | Add or reverse sales tax |
| Retirement Savings | Monthly savings needed to retire |
| Currency Converter | Major world currencies |
| Inflation | Purchasing power over time |

### ❤️ Health & Fitness (10 Calculators)
| Calculator | Description |
|---|---|
| BMI | Body mass index with healthy range |
| Calorie (TDEE) | Daily needs based on goal |
| Macros | Protein, carb & fat targets |
| Body Fat | Estimate from measurements |
| Running Pace | Pace, time, or distance |
| Water Intake | Daily hydration needs |
| Sleep | Optimal bedtime from sleep cycles |
| Pregnancy Due Date | From last menstrual period |
| Heart Rate Zones | Fat burn & cardio zones |
| Ideal Weight | Healthy range for your height |

### 📐 Math & Science (8 Calculators)
| Calculator | Description |
|---|---|
| Scientific | Full trig, log, and exponent functions |
| Unit Converter | Length, weight, temp, volume, speed |
| GPA | Cumulative GPA with multiple courses |
| Quadratic Equation | Solve ax² + bx + c = 0 |
| Probability | Combinations and permutations |
| Geometry | Area, perimeter, volume |
| Speed Distance Time | Solve for any variable |
| Number Base Converter | Binary, hex, octal, decimal |

### 🌟 Everyday Life (6 Calculators)
| Calculator | Description |
|---|---|
| Age | Exact age in years, months, days |
| Date Difference | Days, weeks, months between dates |
| Time Zone | Convert between world time zones |
| Fuel Cost | Road trip gas cost estimator |
| Cooking Converter | Cups, tbsp, ml, oz conversions |
| Random Number | Generate numbers in any range |

---

## 🚀 Deploy in 60 Seconds

### Option 1 — Vercel (Recommended)
1. Fork this repository
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your fork → click **Deploy**
4. Done ✅ — live at `yourproject.vercel.app`

### Option 2 — GitHub Pages
1. Go to your repo → **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / `root`
4. Save — live at `yourusername.github.io/calcwise`

### Option 3 — Netlify
1. Drag and drop the `calcwise.html` file at [netlify.com/drop](https://app.netlify.com/drop)
2. Instant live URL — no account needed

---

## 💰 Monetization (AdSense)

The site has **4 AdSense placeholder zones** already placed in optimal positions:

| Zone | Location | Size | Why It Earns |
|---|---|---|---|
| Top Banner | Below hero | 728×90 | First thing users see |
| Mid Banner 1 | Between Finance & Health | 728×90 | Catches scrollers |
| Mid Banner 2 | Between Health & Math | 728×90 | High scroll depth |
| Sidebar | Sticky beside calculators | 160×600 | Always visible |
| Modal Ad | Inside every result panel | 728×90 | Highest attention moment |

**To activate:** Replace each `<div class="ad-unit ...">Advertisement...` placeholder with your real AdSense `<ins>` code.

---

## 🔧 Customization

### Change Site Name
Find and replace `CalcWise` with your brand name throughout `calcwise.html`.

### Add a New Calculator
1. Add a card in the appropriate grid section:
```html
<div class="calc-card" data-cat="finance" data-name="your calculator keywords" onclick="openCalc('myCalc')">
  <div class="card-icon">🔢</div>
  <h3>My Calculator</h3>
  <p>Short description of what it does.</p>
</div>
```

2. Add the calculator definition to the `calculators` object in the `<script>` section:
```javascript
myCalc: {
  icon: '🔢',
  title: 'My Calculator',
  desc: 'What this calculator does.',
  html: `<!-- your inputs and results HTML here -->`
}
```

3. Add your calculation function:
```javascript
function calcMyCalc() {
  const val = parseFloat(document.getElementById('my-input').value) || 0;
  // your logic here
  document.getElementById('r-my-result').textContent = val * 2;
  document.getElementById('r-myCalc').classList.add('show');
}
```

### Change Colors
All colors are CSS variables at the top of the `<style>` block:
```css
:root {
  --accent: #6c63ff;   /* Main purple — change to your brand color */
  --green:  #22d3a0;
  --orange: #ff8c42;
  --pink:   #ff6b9d;
  --blue:   #4da6ff;
}
```

---

## 📁 File Structure

```
calcwise/
├── calcwise.html      ← Entire site (rename to index.html before deploying)
├── README.md          ← This file
└── (optional)
    ├── privacy.html   ← Required for AdSense approval
    ├── terms.html     ← Terms of service
    └── sitemap.xml    ← For Google Search Console
```

> ⚠️ **Important:** Rename `calcwise.html` to `index.html` before deploying so your domain root loads correctly.

---

## 📈 SEO Tips

Each calculator is a potential Google ranking target. To maximize traffic:

- Add individual HTML pages per calculator (e.g. `/mortgage-calculator.html`)
- Each page should have a unique `<title>` and `<meta description>`
- Target long-tail keywords: *"mortgage calculator with amortization"*, *"BMI calculator for women"*
- Submit `sitemap.xml` to [Google Search Console](https://search.google.com/search-console)

---

## 📄 Pages to Add Before AdSense Approval

Google requires these pages before approving your site:

- **Privacy Policy** — use [privacypolicygenerator.info](https://privacypolicygenerator.info)
- **Terms of Service** — use [termsofservicegenerator.net](https://www.termsofservicegenerator.net)
- **About Us** — a simple paragraph about the site

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML5, CSS3, JavaScript (ES6+) |
| Fonts | Google Fonts — Instrument Serif + Outfit |
| Backend | None — 100% client-side |
| Hosting | Vercel / Netlify / GitHub Pages (free) |
| Analytics | Add Google Analytics `gtag.js` to `<head>` |

---

## 📜 License

MIT License — free to use, modify, and deploy commercially.

---

## 🙏 Credits

Built with [Claude](https://claude.ai) by Anthropic.

---

*⭐ If this project helped you, consider starring the repo!*
