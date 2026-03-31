#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'seo_data.json'), 'utf8'));
const outDir = path.join(__dirname, 'calculators');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const BASE = 'https://calcwises.com';
const TODAY = '2026-03-04';

// Read all templates upfront
const enTemplates = {}, arTemplates = {};
data.forEach(c => {
  const enPath = path.join(__dirname, 'templates', 'en', c.id + '.html');
  const arPath = path.join(__dirname, 'templates', 'ar', c.id + '.html');
  enTemplates[c.id] = fs.existsSync(enPath) ? fs.readFileSync(enPath, 'utf8') : '<p>Calculator coming soon.</p>';
  arTemplates[c.id] = fs.existsSync(arPath) ? fs.readFileSync(arPath, 'utf8') : '<p>الآلة الحاسبة قريباً.</p>';
});

function faqHtml(items) {
  return items.map((f, i) => `
      <div class="faq-item">
        <button class="faq-q" onclick="this.parentElement.classList.toggle('open')" aria-expanded="false">
          <span>${f.q}</span><span class="faq-arrow">▸</span>
        </button>
        <div class="faq-a"><p>${f.a}</p></div>
      </div>`).join('\n');
}

function faqJsonLd(items, url) {
  const entities = items.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a }
  }));
  return JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": entities }, null, 2);
}

function relatedCalcs(currentId, cat, lang) {
  const same = data.filter(c => c.cat === cat && c.id !== currentId).slice(0, 4);
  const isAr = lang === 'ar';
  return same.map(c => {
    const href = isAr ? `${c.id}-ar.html` : `${c.id}.html`;
    const title = isAr ? c.titleAr : c.title;
    return `<a href="${href}" class="related-card"><span class="related-icon">${c.icon}</span><span>${title}</span></a>`;
  }).join('\n            ');
}

function generateEN(c) {
  const url = `${BASE}/calculators/${c.id}.html`;
  const arUrl = `${BASE}/calculators/${c.id}-ar.html`;
  const seoTitle = `${c.title} - Free Online | CalcWise`;
  const template = enTemplates[c.id];

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#6C63FF">
  <title>${seoTitle}</title>
  <meta name="description" content="${c.desc} Free online calculator with instant results. No signup required.">
  <meta name="keywords" content="${c.kw}">
  <link rel="canonical" href="${url}">
  <link rel="alternate" hreflang="en" href="${url}">
  <link rel="alternate" hreflang="ar" href="${arUrl}">
  <link rel="alternate" hreflang="x-default" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="CalcWise">
  <meta property="og:title" content="${seoTitle}">
  <meta property="og:description" content="${c.desc}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${BASE}/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${seoTitle}">
  <meta name="twitter:description" content="${c.desc}">
  <meta name="twitter:image" content="${BASE}/og-image.png">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "${c.title}",
    "url": "${url}",
    "description": "${c.desc}",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "inLanguage": ["en", "ar"],
    "creator": { "@type": "Organization", "name": "CalcWise", "url": "${BASE}" }
  }
  </script>
  <script type="application/ld+json">
  ${faqJsonLd(c.faq, url)}
  </script>
  <script>
    (function(){const s=localStorage.getItem("cw-theme");if(s==="light")document.documentElement.setAttribute("data-theme","light");})();
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-JXGRCF9TPP"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","G-JXGRCF9TPP");</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5388783007820121" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="../styles.css">
  <link rel="stylesheet" href="../theme.css">
  <link rel="manifest" href="../manifest.json">
  <link rel="apple-touch-icon" href="../icon-192.png">
  <style>
    .calc-page-wrap{max-width:800px;margin:0 auto;padding:2rem 1.5rem}
    .calc-page-header{text-align:center;margin-bottom:2rem}
    .calc-page-header .page-icon{font-size:3rem;margin-bottom:0.5rem}
    .calc-page-header h1{font-size:1.8rem;margin:0.5rem 0;font-family:'Outfit',sans-serif}
    .calc-page-header .page-desc{color:var(--muted2);font-size:1rem;max-width:600px;margin:0 auto}
    .calc-inline-body{background:var(--card);border-radius:20px;padding:2rem;box-shadow:var(--shadow-card);margin-bottom:2rem}
    .seo-content{margin-top:2rem}
    .seo-content h2{font-size:1.3rem;margin:1.5rem 0 0.75rem;font-family:'Outfit',sans-serif}
    .seo-content p{color:var(--muted2);line-height:1.7;font-size:0.95rem}
    .faq-section{margin-top:2rem}
    .faq-item{border:1px solid var(--border);border-radius:12px;margin-bottom:0.75rem;overflow:hidden}
    .faq-q{width:100%;display:flex;justify-content:space-between;align-items:center;padding:1rem 1.25rem;background:var(--card);border:none;cursor:pointer;font-size:0.95rem;font-weight:600;color:var(--text);font-family:inherit;text-align:left}
    .faq-q:hover{background:var(--hover)}
    .faq-arrow{transition:transform 0.3s;font-size:0.8rem;color:var(--muted)}
    .faq-item.open .faq-arrow{transform:rotate(90deg)}
    .faq-a{max-height:0;overflow:hidden;transition:max-height 0.3s ease}
    .faq-item.open .faq-a{max-height:300px}
    .faq-a p{padding:0 1.25rem 1rem;margin:0;color:var(--muted2);line-height:1.6;font-size:0.9rem}
    .related-section{margin-top:2rem}
    .related-section h2{font-size:1.2rem;margin-bottom:1rem;font-family:'Outfit',sans-serif}
    .related-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1rem}
    .related-card{display:flex;align-items:center;gap:0.75rem;padding:1rem;background:var(--card);border-radius:14px;border:1px solid var(--border);text-decoration:none;color:var(--text);transition:transform 0.2s,box-shadow 0.2s;font-size:0.9rem;font-weight:500}
    .related-card:hover{transform:translateY(-2px);box-shadow:var(--shadow-card)}
    .related-icon{font-size:1.5rem}
    .breadcrumb{font-size:0.85rem;color:var(--muted);margin-bottom:1rem}
    .breadcrumb a{color:var(--accent);text-decoration:none}
    .breadcrumb a:hover{text-decoration:underline}
  </style>
</head>
<body>
  <div class="lang-toggle">
    <a href="${c.id}.html" class="lang-en" data-tooltip="English (current)">EN</a>
    <a href="${c.id}-ar.html" class="lang-ar" data-tooltip="العربية" style="font-family:'Cairo',sans-serif">ع</a>
  </div>
  <button class="back-to-top" id="back-to-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">↑</button>
  <button class="theme-toggle" id="theme-toggle" data-action="toggleTheme" title="Toggle light/dark mode">🌙</button>
  <nav>
    <div class="nav-inner">
      <a href="../index.html" class="logo">Calc<span class="logo-dot">Wise</span></a>
      <div class="nav-search">
        <span style="color:var(--muted);font-size:0.8rem">⌕</span>
        <input type="text" id="global-search" placeholder="Search calculators…" aria-label="Search calculators">
      </div>
      <ul class="nav-cats">
        <li><a href="../index.html" style="text-decoration:none;color:inherit">Start</a></li>
        <li><a href="../blog.html" class="nav-blog-link">📝 Blog</a></li>
      </ul>
      <button class="hamburger-btn" id="hamburger-btn" aria-label="Open navigation menu">☰</button>
    </div>
  </nav>

  <main class="calc-page-wrap">
    <div class="breadcrumb">
      <a href="../index.html">Home</a> › <a href="../index.html#section-${c.cat}">${c.cat.charAt(0).toUpperCase() + c.cat.slice(1)}</a> › ${c.title}
    </div>

    <div class="ad-unit leaderboard" style="margin-bottom:1.5rem">Advertisement · 728×90</div>

    <div class="calc-page-header">
      <div class="page-icon">${c.icon}</div>
      <h1>${c.title}</h1>
      <p class="page-desc">${c.desc}</p>
    </div>

    <div class="calc-inline-body" id="calc-body">
      ${template}
    </div>


    <div class="seo-content">
      ${c.guide ? c.guide : `
      <h2>About This Calculator</h2>
      <p>The CalcWise ${c.title} gives you instant, accurate results right in your browser. All calculations happen locally — we never store or transmit your data. Whether you're on desktop or mobile, this free tool is always available with no signup required.</p>
      `}

      <div class="faq-section">
        <h2>Frequently Asked Questions</h2>
        ${faqHtml(c.faq)}
      </div>
    </div>

    <div class="ad-unit leaderboard" style="margin:2rem 0">Advertisement · 728×90</div>

    <div class="related-section">
      <h2>Related Calculators</h2>
      <div class="related-grid">
        ${relatedCalcs(c.id, c.cat, 'en')}
      </div>
    </div>
  </main>

  <footer>
    <div class="footer-inner">
      <div class="footer-brand">
        <a href="../index.html" class="logo">Calc<span class="logo-dot">Wise</span></a>
        <p>Free online calculators for finance, health, math, and everyday decisions. All calculations happen in your browser — we never store your data.</p>
      </div>
      <div>
        <h4>Finance</h4>
        <ul>
          <li><a href="mortgage.html">Mortgage</a></li>
          <li><a href="loan.html">Loan Payment</a></li>
          <li><a href="compound.html">Compound Interest</a></li>
          <li><a href="tip.html">Tip Calculator</a></li>
          <li><a href="percentage.html">Percentage</a></li>
        </ul>
      </div>
      <div>
        <h4>Health</h4>
        <ul>
          <li><a href="bmi.html">BMI</a></li>
          <li><a href="calories.html">Calories</a></li>
          <li><a href="macros.html">Macros</a></li>
          <li><a href="bodyfat.html">Body Fat</a></li>
          <li><a href="pace.html">Running Pace</a></li>
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="../privacy.html">Privacy Policy</a></li>
          <li><a href="../terms.html">Terms of Use</a></li>
          <li><a href="../about.html">About</a></li>
          <li><a href="../blog.html">Blog</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 CalcWise. Free calculators for everyone.</span>
      <span>Results are for informational purposes only.</span>
    </div>
  </footer>

  <script defer src="../app.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => {
        const initFn = "init" + "${c.id}".charAt(0).toUpperCase() + "${c.id}".slice(1);
        if (typeof window[initFn] === "function") window[initFn]();
      }, 100);
    });
  </script>
</body>
</html>`;
}

function generateAR(c) {
  const url = `${BASE}/calculators/${c.id}-ar.html`;
  const enUrl = `${BASE}/calculators/${c.id}.html`;
  const seoTitle = `${c.titleAr} - مجاناً أونلاين | كالك وايز`;
  const template = arTemplates[c.id];

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#6C63FF">
  <title>${seoTitle}</title>
  <meta name="description" content="${c.descAr} آلة حاسبة مجانية مع نتائج فورية. بدون تسجيل.">
  <meta name="keywords" content="${c.kwAr}">
  <link rel="canonical" href="${url}">
  <link rel="alternate" hreflang="ar" href="${url}">
  <link rel="alternate" hreflang="en" href="${enUrl}">
  <link rel="alternate" hreflang="x-default" href="${enUrl}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="كالك وايز">
  <meta property="og:title" content="${seoTitle}">
  <meta property="og:description" content="${c.descAr}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${BASE}/og-image.png">
  <meta property="og:locale" content="ar_SA">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${seoTitle}">
  <meta name="twitter:description" content="${c.descAr}">
  <meta name="twitter:image" content="${BASE}/og-image.png">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "${c.titleAr}",
    "url": "${url}",
    "description": "${c.descAr}",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "SAR" },
    "inLanguage": ["ar", "en"],
    "creator": { "@type": "Organization", "name": "CalcWise", "url": "${BASE}" }
  }
  </script>
  <script type="application/ld+json">
  ${faqJsonLd(c.faqAr, url)}
  </script>
  <script>
    (function(){const s=localStorage.getItem("cw-theme");if(s==="light")document.documentElement.setAttribute("data-theme","light");})();
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-JXGRCF9TPP"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","G-JXGRCF9TPP");</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Amiri:ital@0;1&display=swap" rel="stylesheet">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5388783007820121" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="../styles-rtl.css">
  <link rel="stylesheet" href="../theme.css">
  <link rel="manifest" href="../manifest.json">
  <link rel="apple-touch-icon" href="../icon-192.png">
  <style>
    .calc-page-wrap{max-width:800px;margin:0 auto;padding:2rem 1.5rem}
    .calc-page-header{text-align:center;margin-bottom:2rem}
    .calc-page-header .page-icon{font-size:3rem;margin-bottom:0.5rem}
    .calc-page-header h1{font-size:1.8rem;margin:0.5rem 0;font-family:'IBM Plex Sans Arabic',sans-serif}
    .calc-page-header .page-desc{color:var(--muted2);font-size:1rem;max-width:600px;margin:0 auto}
    .calc-inline-body{background:var(--card);border-radius:20px;padding:2rem;box-shadow:var(--shadow-card);margin-bottom:2rem}
    .seo-content{margin-top:2rem}
    .seo-content h2{font-size:1.3rem;margin:1.5rem 0 0.75rem;font-family:'IBM Plex Sans Arabic',sans-serif}
    .seo-content p{color:var(--muted2);line-height:1.7;font-size:0.95rem}
    .faq-section{margin-top:2rem}
    .faq-item{border:1px solid var(--border);border-radius:12px;margin-bottom:0.75rem;overflow:hidden}
    .faq-q{width:100%;display:flex;justify-content:space-between;align-items:center;padding:1rem 1.25rem;background:var(--card);border:none;cursor:pointer;font-size:0.95rem;font-weight:600;color:var(--text);font-family:inherit;text-align:right}
    .faq-q:hover{background:var(--hover)}
    .faq-arrow{transition:transform 0.3s;font-size:0.8rem;color:var(--muted)}
    .faq-item.open .faq-arrow{transform:rotate(90deg)}
    .faq-a{max-height:0;overflow:hidden;transition:max-height 0.3s ease}
    .faq-item.open .faq-a{max-height:300px}
    .faq-a p{padding:0 1.25rem 1rem;margin:0;color:var(--muted2);line-height:1.6;font-size:0.9rem}
    .related-section{margin-top:2rem}
    .related-section h2{font-size:1.2rem;margin-bottom:1rem;font-family:'IBM Plex Sans Arabic',sans-serif}
    .related-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1rem}
    .related-card{display:flex;align-items:center;gap:0.75rem;padding:1rem;background:var(--card);border-radius:14px;border:1px solid var(--border);text-decoration:none;color:var(--text);transition:transform 0.2s,box-shadow 0.2s;font-size:0.9rem;font-weight:500}
    .related-card:hover{transform:translateY(-2px);box-shadow:var(--shadow-card)}
    .related-icon{font-size:1.5rem}
    .breadcrumb{font-size:0.85rem;color:var(--muted);margin-bottom:1rem}
    .breadcrumb a{color:var(--accent);text-decoration:none}
    .breadcrumb a:hover{text-decoration:underline}
  </style>
</head>
<body>
  <div class="lang-toggle">
    <a href="${c.id}.html" class="lang-en" data-tooltip="English">EN</a>
    <a href="${c.id}-ar.html" class="lang-ar active-lang" data-tooltip="العربية">ع</a>
  </div>
  <button class="back-to-top" id="back-to-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="العودة للأعلى">↑</button>
  <button class="theme-toggle" id="theme-toggle" data-action="toggleTheme" title="تبديل الوضع الفاتح/الداكن">🌙</button>
  <nav>
    <div class="nav-inner">
      <a href="../index-ar.html" class="logo" dir="ltr">Calc<span class="logo-dot">Wise</span></a>
      <div class="nav-search">
        <span style="color:var(--muted);font-size:0.9rem">⌕</span>
        <input type="text" id="global-search" placeholder="ابحث عن آلة حاسبة..." aria-label="ابحث عن آلة حاسبة">
      </div>
      <ul class="nav-cats">
        <li><a href="../index-ar.html" style="text-decoration:none;color:inherit">البداية</a></li>
        <li><a href="../blog-ar.html" class="nav-blog-link" style="font-family:'Cairo',sans-serif">📝 المدونة</a></li>
      </ul>
      <button class="hamburger-btn" id="hamburger-btn" aria-label="فتح قائمة التنقل">☰</button>
    </div>
  </nav>

  <main class="calc-page-wrap">
    <div class="breadcrumb">
      <a href="../index-ar.html">الرئيسية</a> › <a href="../index-ar.html#section-${c.cat}">${{ finance: 'المال', health: 'الصحة', math: 'الرياضيات', everyday: 'يومي' }[c.cat]}</a> › ${c.titleAr}
    </div>

    <div class="ad-unit leaderboard" style="margin-bottom:1.5rem">إعلان · 728×90</div>

    <div class="calc-page-header">
      <div class="page-icon">${c.icon}</div>
      <h1>${c.titleAr}</h1>
      <p class="page-desc">${c.descAr}</p>
    </div>

    <div class="calc-inline-body" id="calc-body">
      ${template}
    </div>

    <div class="seo-content">
      ${c.guideAr ? c.guideAr : `
      <h2>عن هذه الآلة الحاسبة</h2>
      <p>تقدم حاسبة كالك وايز ${c.titleAr} نتائج فورية ودقيقة مباشرة في متصفحك. تتم جميع العمليات الحسابية محلياً - نحن لا نخزن بياناتك أو ننقلها أبداً. سواء كنت على سطح المكتب أو الهاتف، هذه الأداة المجانية متاحة دائماً دون الحاجة للتسجيل.</p>
      `}

      <div class="faq-section">
        <h2>الأسئلة الشائعة</h2>
        ${faqHtml(c.faqAr)}
      </div>
    </div>

    <div class="ad-unit leaderboard" style="margin:2rem 0">إعلان · 728×90</div>

    <div class="related-section">
      <h2>آلات حاسبة ذات صلة</h2>
      <div class="related-grid">
        ${relatedCalcs(c.id, c.cat, 'ar')}
      </div>
    </div>
  </main>

  <footer>
    <div class="footer-inner">
      <div class="footer-brand">
        <a href="../index-ar.html" class="logo" dir="ltr">Calc<span class="logo-dot">Wise</span></a>
        <p>آلات حاسبة مجانية للمال والصحة والرياضيات والحياة اليومية. جميع العمليات تتم في متصفحك — لا نخزن بياناتك أبداً.</p>
      </div>
      <div>
        <h4>المال والتمويل</h4>
        <ul>
          <li><a href="mortgage-ar.html">حاسبة الرهن العقاري</a></li>
          <li><a href="loan-ar.html">حاسبة القروض</a></li>
          <li><a href="compound-ar.html">الفائدة المركبة</a></li>
          <li><a href="tip-ar.html">حاسبة البقشيش</a></li>
          <li><a href="percentage-ar.html">حاسبة النسبة</a></li>
        </ul>
      </div>
      <div>
        <h4>الصحة</h4>
        <ul>
          <li><a href="bmi-ar.html">مؤشر كتلة الجسم</a></li>
          <li><a href="calories-ar.html">السعرات الحرارية</a></li>
          <li><a href="macros-ar.html">الماكرو</a></li>
          <li><a href="bodyfat-ar.html">نسبة الدهون</a></li>
          <li><a href="pace-ar.html">إيقاع الجري</a></li>
        </ul>
      </div>
      <div>
        <h4>الموقع</h4>
        <ul>
          <li><a href="../privacy-ar.html">سياسة الخصوصية</a></li>
          <li><a href="../terms-ar.html">شروط الاستخدام</a></li>
          <li><a href="../about-ar.html">معلومات عنا</a></li>
          <li><a href="../blog-ar.html">المدونة</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© ٢٠٢٦ كالك وايز · جميع الحقوق محفوظة</span>
      <span>النتائج لأغراض إعلامية فقط.</span>
    </div>
  </footer>

  <script defer src="../app-ar.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => {
        const initFn = "init" + "${c.id}".charAt(0).toUpperCase() + "${c.id}".slice(1);
        if (typeof window[initFn] === "function") window[initFn]();
      }, 100);
    });
  </script>
</body>
</html>`;
}


// ── MAIN ──
let enCount = 0, arCount = 0;

data.forEach(c => {
  // EN page
  fs.writeFileSync(path.join(outDir, `${c.id}.html`), generateEN(c), 'utf8');
  enCount++;

  // AR page
  fs.writeFileSync(path.join(outDir, `${c.id}-ar.html`), generateAR(c), 'utf8');
  arCount++;
});

console.log(`✅ Generated ${enCount} EN pages + ${arCount} AR pages = ${enCount + arCount} total`);

console.log('\n🎉 All SEO pages generated successfully!');
console.log(`   Output: ${outDir}/`);
