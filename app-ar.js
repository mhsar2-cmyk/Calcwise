// ═══════════════════════════════════════════
//  SEARCH & FILTER
// ═══════════════════════════════════════════
function searchCalcs(q) {
  q = q.toLowerCase().trim();
  const cards = document.querySelectorAll(".calc-card");
  const sections = document.querySelectorAll(".calc-section");
  let anyVisible = false;
  cards.forEach((c) => {
    const name = c.dataset.name || "";
    const title = c.querySelector("h3").textContent;
    const match = !q || name.includes(q) || title.includes(q);
    c.classList.toggle("hidden", !match);
    if (match) anyVisible = true;
  });
  sections.forEach((s) => {
    const visible = s.querySelectorAll(".calc-card:not(.hidden)").length > 0;
    s.style.display = q && !visible ? "none" : "";
  });
  const noR = document.getElementById("no-results");
  noR.style.display = q && !anyVisible ? "block" : "none";
  if (!anyVisible && q)
    document.getElementById("no-results-term").textContent = q;
}

function scrollToSection(id) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    const el = document.getElementById(id);
    if (el) {
      const offset = 70;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }
}

function filterCat(cat) {
  document
    .querySelectorAll(".cat-tab")
    .forEach((t) => t.classList.remove("active"));
  document
    .querySelectorAll(".nav-cats button")
    .forEach((b) => b.classList.remove("active"));
  const tab = document.getElementById("tab-" + cat);
  const navBtn = document.getElementById("nav-" + cat);
  if (tab) tab.classList.add("active");
  if (navBtn) navBtn.classList.add("active");
  const cards = document.querySelectorAll(".calc-card");
  const sections = document.querySelectorAll(".calc-section");
  cards.forEach((c) =>
    c.classList.toggle("hidden", cat !== "all" && c.dataset.cat !== cat),
  );
  sections.forEach((s) => {
    if (cat === "all") {
      s.style.display = "";
      return;
    }
    s.style.display = s.id.replace("section-", "") === cat ? "" : "none";
  });
  document.getElementById("global-search").value = "";
}

// ═══════════════════════════════════════════
//  CALCULATORS DATA (Arabic UI)
// ═══════════════════════════════════════════
const calculators = {
  mortgage: {
    icon: "🏠",
    title: "حاسبة الرهن العقاري",
    desc: "احسب الدفعات الشهرية والفوائد الإجمالية وتكلفة القرض.",
  },
  loan: {
    icon: "💳",
    title: "حاسبة القروض",
    desc: "الدفعات الشهرية والتكلفة الإجمالية لأي قرض.",
  },
  compound: {
    icon: "📈",
    title: "حاسبة الفائدة المركبة",
    desc: "شاهد كيف تنمو مدخراتك بقوة الفائدة المركبة.",
  },
  tip: {
    icon: "🍽️",
    title: "حاسبة البقشيش",
    desc: "قسّم الفاتورة واحسب البقشيش لكل شخص.",
  },
  bmi: {
    icon: "⚖️",
    title: "حاسبة مؤشر كتلة الجسم",
    desc: "مؤشر كتلة الجسم مع نطاق الوزن الصحي ومقياس بصري.",
  },
  calories: {
    icon: "🔥",
    title: "حاسبة السعرات الحرارية",
    desc: "احتياجك اليومي من السعرات بناءً على جسمك وهدفك.",
  },
  macros: {
    icon: "🥩",
    title: "حاسبة الماكرو",
    desc: "أهداف البروتين والكربوهيدرات والدهون لهدفك.",
  },
  bodyfat: {
    icon: "💪",
    title: "حاسبة نسبة الدهون",
    desc: "تقدير نسبة الدهون في الجسم باستخدام طريقة البحرية الأمريكية.",
  },
  salary: {
    icon: "💼",
    title: "حاسبة الراتب",
    desc: "حوّل بين الأجر بالساعة واليومي والأسبوعي والشهري والسنوي.",
  },
  percentage: {
    icon: "%",
    title: "حاسبة النسبة المئوية",
    desc: "ثلاث طرق لحساب النسب المئوية فوراً.",
  },
  tax: {
    icon: "🧾",
    title: "حاسبة ضريبة القيمة المضافة",
    desc: "أضف أو استخرج الضريبة من أي سعر.",
  },
  inflation: {
    icon: "🛒",
    title: "حاسبة التضخم",
    desc: "اكتشف كيف يؤدي التضخم إلى تآكل القوة الشرائية بمرور الوقت.",
  },
  roi: {
    icon: "📊",
    title: "حاسبة العائد على الاستثمار",
    desc: "احسب نسبة العائد والربح من أي استثمار.",
  },
  creditcard: {
    icon: "💳",
    title: "حاسبة سداد بطاقة الائتمان",
    desc: "كم يستغرق سداد رصيدك وإجمالي الفوائد.",
  },
  age: {
    icon: "🎂",
    title: "حاسبة العمر",
    desc: "عمرك الدقيق بالسنوات والأشهر والأيام من تاريخ ميلادك.",
  },
  gpa: {
    icon: "🎓",
    title: "حاسبة المعدل التراكمي GPA",
    desc: "احسب معدلك التراكمي من درجات المواد والساعات الدراسية.",
  },
  fuel: {
    icon: "⛽",
    title: "حاسبة تكلفة الوقود",
    desc: "كم ستكلفك رحلتك في الوقود؟",
  },
  water: {
    icon: "💧",
    title: "حاسبة شرب الماء",
    desc: "كم لتراً من الماء تحتاج يومياً؟",
  },
  pregnancy: {
    icon: "🤰",
    title: "حاسبة موعد الولادة",
    desc: "حساب موعد الولادة المتوقع بناءً على آخر دورة شهرية.",
  },
  heartrate: {
    icon: "❤️",
    title: "مناطق معدل ضربات القلب",
    desc: "مناطق معدل ضربات القلب المستهدفة لحرق الدهون وتمارين الكارديو.",
  },
  idealweight: {
    icon: "🎯",
    title: "الوزن المثالي",
    desc: "تقدير نطاق الوزن الصحي المناسب لطولك وبنية جسمك.",
  },
  sleep: {
    icon: "🌙",
    title: "حاسبة دورات النوم",
    desc: "أفضل وقت للاستيقاظ أو النوم بناءً على دورات النوم (90 دقيقة).",
  },
  datediff: {
    icon: "📅",
    title: "الفرق بين تاريخين",
    desc: "عدد الأيام والأسابيع والأشهر بين أي تاريخين.",
  },
  random: {
    icon: "🎲",
    title: "مولّد الأرقام العشوائية",
    desc: "ولّد أرقاماً عشوائية ضمن أي نطاق تحدده.",
  },
  quadratic: {
    icon: "📈",
    title: "حاسبة المعادلة التربيعية",
    desc: "إيجاد الجذور للمعادلات بصيغة أ س² + ب س + ج = 0.",
  },
  probability: {
    icon: "🎲",
    title: "حاسبة الاحتمالات",
    desc: "حساب التوافيق والتباديل واحتمالات الأحداث.",
  },
  geometry: {
    icon: "📐",
    title: "حاسبة الهندسة",
    desc: "حساب المساحة والمحيط للأشكال الأساسية ثنائية الأبعاد.",
  },
  base: {
    icon: "💻",
    title: "محول أنظمة الأعداد",
    desc: "تحويل الأرقام بين الأنظمة الثنائية والثمانية والعشرية والست عشرية.",
  },
  speed: {
    icon: "⚡",
    title: "حاسبة السرعة والمسافة والزمن",
    desc: "إيجاد السرعة أو المسافة أو الزمن بمعلومية القيمتين الأخريين.",
  },
  timezone: {
    icon: "🌍",
    title: "محول المناطق الزمنية",
    desc: "تحويل الوقت بين المدن العالمية الكبرى على الفور.",
  },
  cooking: {
    icon: "🍳",
    title: "محول أدوات الطبخ",
    desc: "التحويل السريع بين الأكواب والملاعق والأونصات والمليلترات.",
  },
  scientific: {
    icon: "🔢",
    title: "الآلة الحاسبة العلمية",
    desc: "آلة حاسبة علمية كاملة مع دوال المثلثات واللوغاريتم.",
  },
  units: {
    icon: "📏",
    title: "محول الوحدات",
    desc: "حوّل بين وحدات الطول والوزن ودرجة الحرارة وغيرها.",
  },
  pace: {
    icon: "🏃",
    title: "حاسبة إيقاع الجري",
    desc: "احسب الإيقاع أو وقت الإنهاء أو المسافة.",
  },
  retirement: {
    icon: "🏖️",
    title: "حاسبة مدخرات التقاعد",
    desc: "اكتشف كم تحتاج أن تدخر شهرياً للتقاعد بشكل مريح.",
  },
  currency: {
    icon: "💱",
    title: "محوّل العملات",
    desc: "حوّل بين أكثر من 30 عملة بأسعار صرف حية.",
  },
  countdown: {
    icon: "⏳",
    title: "العد التنازلي",
    desc: "حدد تاريخاً مستهدفاً وشاهد العد التنازلي بالعرض الرقمي أو التناظري.",
  },
  hijri: {
    icon: "🗓️",
    title: "تحويل التاريخ الهجري",
    desc: "حوّل بين التاريخين الهجري والميلادي مع أحداث تاريخية.",
  },
  contraception: {
    icon: "📅",
    title: "حاسبة منع الحمل بالتقويم",
    desc: "حساب الأيام الآمنة وفترة الخصوبة بناءً على دورتك الشهرية.",
  },
  typing: {
    icon: "⌨️",
    title: "التدريب على الطباعة",
    desc: "اختبر وحسّن سرعتك ودقتك في الطباعة.",
  },
};

// ═══════════════════════════════════════════
//  MODAL OPEN/CLOSE
// ═══════════════════════════════════════════
function openCalc(id, skipHistory = false) {
  const c = calculators[id];
  if (!c) {
    alert("هذه الآلة الحاسبة قريباً!");
    return;
  }
  document.getElementById("modal-icon").textContent = c.icon;
  document.getElementById("modal-title").textContent = c.title;
  document.getElementById("modal-desc").textContent = c.desc;

  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML =
    '<div style="padding: 2rem; text-align: center; color: var(--muted);">جاري التحميل...</div>';

  fetch(`/templates/ar/${id}.html`)
    .then((response) => {
      if (!response.ok) throw new Error("Template not found");
      return response.text();
    })
    .then((html) => {
      modalBody.innerHTML = html;

      // Post-inject setups that depend on the DOM being present
      if (id === "age") {
        const today = new Date().toISOString().split("T")[0];
        const todayEl = document.getElementById("age-today");
        if (todayEl) todayEl.value = today;
        const dobStr = new Date();
        dobStr.setFullYear(dobStr.getFullYear() - 30);
        const dobEl = document.getElementById("age-dob");
        if (dobEl) dobEl.value = dobStr.toISOString().split("T")[0];
      }
      if (id === "datediff") {
        const t = new Date();
        const endEl = document.getElementById("dd-end");
        if (endEl) endEl.value = t.toISOString().split("T")[0];
        t.setMonth(t.getMonth() - 3);
        const startEl = document.getElementById("dd-start");
        if (startEl) startEl.value = t.toISOString().split("T")[0];
      }
      if (id === "gpa") initGPA();
      if (id === "units") updateUnitOptions();
      if (id === "scientific") {
        if (typeof initScientific === "function") initScientific();
      }
      if (id === "currency") {
        curPopulate();
        loadCurrencyRates();
      }
      if (id === "countdown") initCountdown();
      if (id === "hijri") initHijri();
      if (id === "contraception") initContraception();
      if (id === "typing") initTyping();

      setTimeout(() => {
        const firstInput = document.querySelector(
          "#modal-body input:not([type='hidden']), #modal-body select",
        );
        if (firstInput) firstInput.focus();
      }, 50);
    })
    .catch((err) => {
      modalBody.innerHTML = "<p>تعذر العثور على القالب.</p>";
      console.error(err);
    });

  document.getElementById("modal-overlay").classList.add("open");
  document.body.style.overflow = "hidden";

  if (!skipHistory) {
    window.history.pushState({ calc: id }, "", "?calc=" + id);
  }
}

function closeModal(skipHistory = false) {
  if (window._countdownInterval) {
    clearInterval(window._countdownInterval);
    window._countdownInterval = null;
  }
  document.getElementById("modal-overlay").classList.remove("open");
  document.body.style.overflow = "";
  if (!skipHistory) {
    window.history.pushState({}, "", window.location.pathname);
  }

  // a11y: restore focus to the element that triggered the modal
  if (window.lastActiveTrigger) {
    window.lastActiveTrigger.focus();
  }
}
function closeModalOutside(e) {
  if (e.target === document.getElementById("modal-overlay")) closeModal();
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();

  // A11y: Trap focus inside modal when open
  if (e.key === "Tab" && document.getElementById("modal-overlay").classList.contains("open")) {
    const modal = document.getElementById("modal");
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) { // Shift + Tab
      if (document.activeElement === firstElement || document.activeElement === document.body) {
        lastElement.focus();
        e.preventDefault();
      }
    } else { // Tab
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }
});

// Handle Browser Back/Forward
window.addEventListener("popstate", (e) => {
  if (e.state && e.state.calc) {
    openCalc(e.state.calc, true);
  } else {
    const urlParams = new URLSearchParams(window.location.search);
    const calcParam = urlParams.get("calc");
    if (calcParam) {
      openCalc(calcParam, true);
    } else {
      closeModal(true);
    }
  }
});

// Handle Deep Links on Load
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const calcParam = urlParams.get("calc");
  if (calcParam && calculators[calcParam]) {
    openCalc(calcParam, true);
  }
});

// ═══════════════════════════════════════════
//  CALCULATION LOGIC (same as English)
// ═══════════════════════════════════════════
const fmt = (n, d = 0) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });
const fmtM = (n) => fmt(n, 2) + " ر.س";

function calcMortgage() {
  const price = parseFloat(document.getElementById("m-price").value) || 0,
    down = parseFloat(document.getElementById("m-down").value) || 0,
    rate = parseFloat(document.getElementById("m-rate").value) || 0,
    term = parseInt(document.getElementById("m-term").value),
    loan = price - down,
    r = rate / 100 / 12,
    n = term * 12,
    monthly =
      r === 0
        ? loan / n
        : (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1),
    total = monthly * n,
    interest = total - loan;
  document.getElementById("r-m-monthly").textContent = fmtM(monthly);
  document.getElementById("r-m-total").textContent = fmtM(total);
  document.getElementById("r-m-interest").textContent = fmtM(interest);
  document.getElementById("r-m-loan").textContent = fmtM(loan);
  const pct = (interest / total) * 100;
  document.getElementById("r-m-bar").innerHTML =
    `<div class="bar-row"><span class="bar-label">أصل الدين</span><div class="bar-track"><div class="bar-fill" style="width:${100 - pct}%;background:var(--accent)"></div></div><span class="bar-val">${fmtM(loan)}</span></div><div class="bar-row"><span class="bar-label">إجمالي الفوائد</span><div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:var(--orange)"></div></div><span class="bar-val">${fmtM(interest)}</span></div>`;
  document.getElementById("r-mortgage").classList.add("show");
}
function calcLoan() {
  const amt = parseFloat(document.getElementById("l-amount").value) || 0,
    rate = parseFloat(document.getElementById("l-rate").value) || 0,
    n = parseInt(document.getElementById("l-term").value),
    r = rate / 100 / 12,
    monthly =
      r === 0
        ? amt / n
        : (amt * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1),
    total = monthly * n;
  document.getElementById("r-l-monthly").textContent = fmtM(monthly);
  document.getElementById("r-l-total").textContent = fmtM(total);
  document.getElementById("r-l-interest").textContent = fmtM(total - amt);
  document.getElementById("r-loan").classList.add("show");
}
function calcCompound() {
  const p = parseFloat(document.getElementById("ci-principal").value) || 0,
    r = parseFloat(document.getElementById("ci-rate").value) / 100,
    t = parseFloat(document.getElementById("ci-years").value) || 0,
    n = parseInt(document.getElementById("ci-freq").value),
    contrib = parseFloat(document.getElementById("ci-contrib").value) || 0,
    fv = p * Math.pow(1 + r / n, n * t),
    rn = r / n,
    fvC =
      rn > 0 ? contrib * ((Math.pow(1 + rn, n * t) - 1) / rn) : contrib * n * t,
    total = fv + fvC,
    contributed = p + contrib * 12 * t;
  document.getElementById("r-ci-final").textContent = fmtM(total);
  document.getElementById("r-ci-contributed").textContent = fmtM(contributed);
  document.getElementById("r-ci-earned").textContent = fmtM(
    total - contributed,
  );
  document.getElementById("r-compound").classList.add("show");
}
function calcTip() {
  const bill = parseFloat(document.getElementById("t-bill").value) || 0,
    tipPct = parseFloat(document.getElementById("t-tip").value) || 0,
    people = parseInt(document.getElementById("t-people").value) || 1,
    tip = (bill * tipPct) / 100,
    total = bill + tip;
  document.getElementById("r-t-tip").textContent = fmtM(tip);
  document.getElementById("r-t-total").textContent = fmtM(total);
  document.getElementById("r-t-per").textContent = fmtM(total / people);
  document.getElementById("r-tip").classList.add("show");
}
function updateBmiFields() {
  const u = document.getElementById("bmi-unit").value;
  document.getElementById("bmi-imperial-fields").style.display =
    u === "imperial" ? "" : "none";
  document.getElementById("bmi-metric-fields").style.display =
    u === "metric" ? "" : "none";
  const waistUnit = document.getElementById("bmi-waist-unit");
  if (waistUnit) waistUnit.textContent = u === "imperial" ? "بوصة" : "سم";
}
function calcBMI() {
  const u = document.getElementById("bmi-unit").value;
  const gender = document.getElementById("bmi-gender")?.value || "male";
  const age = parseInt(document.getElementById("bmi-age")?.value) || 30;
  let bmi, heightM, weightKg;
  if (u === "imperial") {
    const lbs = parseFloat(document.getElementById("bmi-lbs").value) || 0;
    const ft = parseInt(document.getElementById("bmi-ft").value) || 0;
    const inches = parseInt(document.getElementById("bmi-in").value) || 0;
    const totalIn = ft * 12 + inches;
    if (totalIn <= 0 || lbs <= 0) return;
    heightM = totalIn * 0.0254;
    weightKg = lbs * 0.453592;
    bmi = (lbs / (totalIn * totalIn)) * 703;
    const lowLbs = (18.5 * totalIn * totalIn) / 703,
      highLbs = (24.9 * totalIn * totalIn) / 703;
    document.getElementById("r-bmi-low").textContent = fmt(lowLbs, 0) + " رطل";
    document.getElementById("r-bmi-high").textContent =
      fmt(highLbs, 0) + " رطل";
  } else {
    const kg = parseFloat(document.getElementById("bmi-kg").value) || 0;
    const cm = parseFloat(document.getElementById("bmi-cm").value) || 1;
    if (cm <= 0 || kg <= 0) return;
    heightM = cm / 100;
    weightKg = kg;
    bmi = kg / (heightM * heightM);
    document.getElementById("r-bmi-low").textContent =
      fmt(18.5 * heightM * heightM, 1) + " كجم";
    document.getElementById("r-bmi-high").textContent =
      fmt(24.9 * heightM * heightM, 1) + " كجم";
  }
  document.getElementById("r-bmi-val").textContent = fmt(bmi, 1);
  // BMI Prime
  const bmiPrime = bmi / 25;
  const primeEl = document.getElementById("r-bmi-prime");
  if (primeEl) {
    primeEl.textContent = bmiPrime.toFixed(2);
    primeEl.style.color =
      bmiPrime <= 1
        ? "var(--green)"
        : bmiPrime <= 1.2
          ? "var(--yellow)"
          : "var(--pink)";
  }
  // Categories
  const cats = [
    [
      16,
      "نحافة شديدة",
      "var(--blue)",
      "مخاطر صحية كبيرة. استشر مقدم رعاية صحية حول التغذية.",
    ],
    [
      18.5,
      "نحافة",
      "var(--blue)",
      "قد تكون معرضاً لنقص التغذية. استشر أخصائي تغذية.",
    ],
    [
      25,
      "وزن طبيعي ✓",
      "var(--green)",
      "ممتاز! أنت في النطاق الصحي. حافظ على نمط حياتك الحالي.",
    ],
    [
      30,
      "زيادة وزن",
      "var(--yellow)",
      "أعلى قليلاً من النطاق الصحي. تغييرات بسيطة في نمط الحياة يمكن أن تساعد.",
    ],
    [
      35,
      "سمنة (الدرجة الأولى)",
      "var(--orange)",
      "خطر صحي متوسط. يُنصح بالتغذية السليمة والرياضة.",
    ],
    [
      40,
      "سمنة (الدرجة الثانية)",
      "var(--pink)",
      "خطر صحي مرتفع. يُنصح بدعم طبي وتغذوي متخصص.",
    ],
    [
      Infinity,
      "سمنة (الدرجة الثالثة)",
      "#DC2626",
      "خطر صحي مرتفع جداً. اطلب الدعم الطبي الشامل.",
    ],
  ];
  const cat = cats.find((c) => bmi < c[0]);
  const catEl = document.getElementById("r-bmi-cat");
  catEl.textContent = cat[1];
  catEl.style.color = cat[2];
  const descEl = document.getElementById("r-bmi-cat-desc");
  if (descEl) descEl.textContent = cat[3];
  // Gauge
  const gaugeNeedle = document.getElementById("r-bmi-needle");
  if (gaugeNeedle) {
    const pct = Math.max(0, Math.min(100, ((bmi - 10) / 35) * 100));
    gaugeNeedle.style.left = `calc(${pct}% - 2px)`;
  }
  // Waist-to-Height
  const waistVal = parseFloat(document.getElementById("bmi-waist")?.value);
  const whrDiv = document.getElementById("r-bmi-whr");
  if (waistVal && waistVal > 0 && heightM > 0) {
    let waistCm = waistVal;
    if (u === "imperial") waistCm = waistVal * 2.54;
    const whr = waistCm / (heightM * 100);
    const whrValEl = document.getElementById("r-bmi-whr-val");
    const whrNoteEl = document.getElementById("r-bmi-whr-note");
    whrValEl.textContent = whr.toFixed(3);
    if (whr < 0.4) {
      whrValEl.style.color = "var(--blue)";
      whrNoteEl.textContent = "قد يشير إلى نحافة — استشر مقدم رعاية صحية.";
    } else if (whr < 0.5) {
      whrValEl.style.color = "var(--green)";
      whrNoteEl.textContent = "✓ نطاق صحي — خطر أقل للأمراض المرتبطة بالسمنة.";
    } else if (whr < 0.6) {
      whrValEl.style.color = "var(--yellow)";
      whrNoteEl.textContent =
        "خطر مرتفع — زيادة النشاط البدني وتحسين النظام الغذائي.";
    } else {
      whrValEl.style.color = "var(--pink)";
      whrNoteEl.textContent =
        "خطر عالٍ — يُنصح بتغييرات في نمط الحياة واستشارة طبية.";
    }
    whrDiv.style.display = "block";
  } else if (whrDiv) {
    whrDiv.style.display = "none";
  }
  document.getElementById("r-bmi").classList.add("show");
}
function updateCalFields() {
  const u = document.getElementById("cal-unit")?.value || "metric";
  document.getElementById("cal-imperial-fields").style.display =
    u === "imperial" ? "" : "none";
  document.getElementById("cal-metric-fields").style.display =
    u === "metric" ? "" : "none";
}
function calcCalories() {
  const age = parseFloat(document.getElementById("cal-age").value) || 0,
    sex = document.getElementById("cal-sex").value,
    u = document.getElementById("cal-unit")?.value || "metric";
  let kg, cm;
  if (u === "metric") {
    kg = parseFloat(document.getElementById("cal-weight-kg").value) || 0;
    cm = parseFloat(document.getElementById("cal-height-cm").value) || 0;
  } else {
    const wt = parseFloat(document.getElementById("cal-weight").value) || 0,
      ht = parseFloat(document.getElementById("cal-height").value) || 0;
    kg = wt * 0.453592;
    cm = ht * 2.54;
  }
  const act = parseFloat(document.getElementById("cal-activity").value),
    goal = parseInt(document.getElementById("cal-goal").value),
    bmr =
      sex === "male"
        ? 10 * kg + 6.25 * cm - 5 * age + 5
        : 10 * kg + 6.25 * cm - 5 * age - 161,
    tdee = bmr * act,
    target = tdee + goal;
  document.getElementById("r-cal-bmr").textContent = fmt(bmr, 0) + " سعرة";
  document.getElementById("r-cal-tdee").textContent = fmt(tdee, 0) + " سعرة";
  document.getElementById("r-cal-target").textContent = fmt(target, 0);
  document.getElementById("r-calories").classList.add("show");
}
function calcMacros() {
  const cals = parseFloat(document.getElementById("mac-cal").value) || 2000,
    goal = document.getElementById("mac-goal").value,
    splits = {
      cut: [0.4, 0.35, 0.25],
      maintain: [0.3, 0.4, 0.3],
      bulk: [0.25, 0.5, 0.25],
    },
    [p, c, f] = splits[goal],
    protein = (cals * p) / 4,
    carbs = (cals * c) / 4,
    fat = (cals * f) / 9;
  document.getElementById("r-mac-protein").textContent = fmt(protein, 0) + "g";
  document.getElementById("r-mac-carbs").textContent = fmt(carbs, 0) + "g";
  document.getElementById("r-mac-fat").textContent = fmt(fat, 0) + "g";
  document.getElementById("r-mac-bar").innerHTML =
    `<div class="bar-row"><span class="bar-label">بروتين</span><div class="bar-track"><div class="bar-fill" style="width:${p * 100}%;background:var(--pink)"></div></div><span class="bar-val">${(p * 100).toFixed(0)}٪</span></div><div class="bar-row"><span class="bar-label">كربوهيدرات</span><div class="bar-track"><div class="bar-fill" style="width:${c * 100}%;background:var(--yellow)"></div></div><span class="bar-val">${(c * 100).toFixed(0)}٪</span></div><div class="bar-row"><span class="bar-label">دهون</span><div class="bar-track"><div class="bar-fill" style="width:${f * 100}%;background:var(--orange)"></div></div><span class="bar-val">${(f * 100).toFixed(0)}٪</span></div>`;
  document.getElementById("r-macros").classList.add("show");
}

// BODY FAT (AR)
function calcBodyFat() {
  const g = document.getElementById("bf-gender").value;
  const w = parseFloat(document.getElementById("bf-weight").value) || 0;
  const h = parseFloat(document.getElementById("bf-height").value) || 0;
  const n = parseFloat(document.getElementById("bf-neck").value) || 0;
  const wa = parseFloat(document.getElementById("bf-waist").value) || 0;
  const hip = parseFloat(document.getElementById("bf-hip").value) || 0;
  if (!w || !h || !n || !wa || (g === "female" && !hip)) return;

  let bf = 0;
  if (g === "male") {
    const val = wa - n;
    if (val > 0)
      bf =
        495 / (1.0324 - 0.19077 * Math.log10(val) + 0.15456 * Math.log10(h)) -
        450;
  } else {
    const val = wa + hip - n;
    if (val > 0)
      bf =
        495 / (1.29579 - 0.35004 * Math.log10(val) + 0.221 * Math.log10(h)) -
        450;
  }

  if (isNaN(bf) || bf < 1 || bf > 80) bf = 0;

  const fm = w * (bf / 100);
  const lm = w - fm;

  let cat = "—";
  if (bf > 0) {
    if (g === "male") {
      if (bf < 6) cat = "دهون أساسية";
      else if (bf < 14) cat = "رياضيون";
      else if (bf < 18) cat = "لياقة";
      else if (bf < 25) cat = "متوسط";
      else cat = "سمنة";
    } else {
      if (bf < 14) cat = "دهون أساسية";
      else if (bf < 21) cat = "رياضيون";
      else if (bf < 25) cat = "لياقة";
      else if (bf < 32) cat = "متوسط";
      else cat = "سمنة";
    }
  }

  document.getElementById("r-bf-pct").textContent =
    bf > 0 ? fmt(bf, 1) + "٪" : "قياسات غير صالحة";
  document.getElementById("r-bf-category").textContent = cat;
  document.getElementById("r-bf-fatmass").textContent =
    bf > 0 ? fmt(fm, 1) + " كجم" : "—";
  document.getElementById("r-bf-leanmass").textContent =
    bf > 0 ? fmt(lm, 1) + " كجم" : "—";

  document.getElementById("r-bodyfat").classList.add("show");
}
function calcSalary() {
  const amt = parseFloat(document.getElementById("sal-amount").value) || 0,
    period = document.getElementById("sal-period").value,
    hrs = parseFloat(document.getElementById("sal-hours").value) || 40;
  let annual;
  if (period === "hour") annual = amt * hrs * 52;
  else if (period === "day") annual = amt * 5 * 52;
  else if (period === "week") annual = amt * 52;
  else if (period === "month") annual = amt * 12;
  else annual = amt;
  document.getElementById("r-sal-hour").textContent = fmtM(annual / 52 / hrs);
  document.getElementById("r-sal-day").textContent = fmtM(annual / 260);
  document.getElementById("r-sal-week").textContent = fmtM(annual / 52);
  document.getElementById("r-sal-month").textContent = fmtM(annual / 12);
  document.getElementById("r-sal-year").textContent = fmtM(annual);
  document.getElementById("r-salary").classList.add("show");
}
function calcPct1() {
  document.getElementById("r-p1").textContent = fmt(
    ((parseFloat(document.getElementById("p1-x").value) || 0) / 100) *
    (parseFloat(document.getElementById("p1-y").value) || 0),
    2,
  );
}
function calcPct2() {
  document.getElementById("r-p2").textContent =
    fmt(
      ((parseFloat(document.getElementById("p2-x").value) || 0) /
        (parseFloat(document.getElementById("p2-y").value) || 1)) *
      100,
      2,
    ) + "٪";
}
function calcPct3() {
  const x = parseFloat(document.getElementById("p3-x").value) || 0,
    y = parseFloat(document.getElementById("p3-y").value) || 0,
    pct = ((y - x) / Math.abs(x || 1)) * 100;
  const el = document.getElementById("r-p3");
  el.textContent = (pct >= 0 ? "+" : "") + fmt(pct, 2) + "٪";
  el.style.color = pct >= 0 ? "var(--green)" : "var(--pink)";
}
function calcAge() {
  const dob = new Date(document.getElementById("age-dob").value),
    ref = new Date(document.getElementById("age-today").value);
  let years = ref.getFullYear() - dob.getFullYear(),
    months = ref.getMonth() - dob.getMonth();
  if (months < 0 || (months === 0 && ref.getDate() < dob.getDate())) {
    years--;
    months += 12;
  }
  const days = Math.floor((ref - dob) / 86400000);
  const next = new Date(ref.getFullYear(), dob.getMonth(), dob.getDate());
  if (next <= ref) next.setFullYear(next.getFullYear() + 1);
  const daysToB = Math.floor((next - ref) / 86400000);
  document.getElementById("r-age-years").textContent = years;
  document.getElementById("r-age-months").textContent = fmt(
    years * 12 + months,
    0,
  );
  document.getElementById("r-age-days").textContent = fmt(days, 0);
  document.getElementById("r-age-next").textContent =
    daysToB === 0 ? "🎉 اليوم!" : daysToB;
  document.getElementById("r-age").classList.add("show");
}
function initGPA() {
  document.getElementById("gpa-rows").innerHTML = "";
  for (let i = 0; i < 4; i++) addGpaRow();
}
function addGpaRow() {
  const d = document.createElement("div");
  d.style.cssText =
    "display:grid;grid-template-columns:1fr 110px 80px;gap:0.5rem;margin-bottom:0.5rem;";
  d.innerHTML = `<input type="text" placeholder="اسم المادة" style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:0.55rem 0.75rem;font-family:'IBM Plex Sans Arabic',sans-serif;font-size:0.9rem;color:var(--text);outline:none;text-align:right;"><select style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:0.55rem;font-family:'IBM Plex Sans Arabic',sans-serif;font-size:0.88rem;color:var(--text);outline:none;"><option value="4">A (4.0)</option><option value="3.7">A- (3.7)</option><option value="3.3">B+ (3.3)</option><option value="3">B (3.0)</option><option value="2.7">B- (2.7)</option><option value="2.3">C+ (2.3)</option><option value="2">C (2.0)</option><option value="1">D (1.0)</option><option value="0">F (0.0)</option></select><input type="number" value="3" min="0" max="6" style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:0.55rem;font-family:'IBM Plex Sans Arabic',sans-serif;font-size:0.9rem;color:var(--text);outline:none;">`;
  document.getElementById("gpa-rows").appendChild(d);
}
function calcGPA() {
  const rows = document.getElementById("gpa-rows").children;
  let pts = 0,
    creds = 0;
  for (const row of rows) {
    const grade = parseFloat(row.querySelector("select").value),
      credits = parseFloat(
        row.querySelectorAll("input[type=number]")[0]?.value || 3,
      );
    if (isNaN(grade) || isNaN(credits)) continue;
    pts += grade * credits;
    creds += credits;
  }
  const gpa = creds > 0 ? pts / creds : 0;
  document.getElementById("r-gpa-val").textContent = gpa.toFixed(2);
  document.getElementById("r-gpa-credits").textContent = creds;
  const letter =
    gpa >= 3.7
      ? "A+"
      : gpa >= 3.3
        ? "A"
        : gpa >= 3
          ? "A-"
          : gpa >= 2.7
            ? "B+"
            : gpa >= 2.3
              ? "B"
              : gpa >= 2
                ? "B-"
                : gpa >= 1.7
                  ? "C+"
                  : gpa >= 1
                    ? "C"
                    : "F";
  document.getElementById("r-gpa-letter").textContent = letter;
  document.getElementById("r-gpa").classList.add("show");
}
function calcFuelAR() {
  const dist = parseFloat(document.getElementById("fuel-dist").value) || 0,
    l100 = parseFloat(document.getElementById("fuel-mpg").value) || 1,
    price = parseFloat(document.getElementById("fuel-price").value) || 0,
    liters = (dist * l100) / 100,
    cost = liters * price;
  document.getElementById("r-fuel-cost").textContent = fmt(cost, 2);
  document.getElementById("r-fuel-liters").textContent =
    fmt(liters, 1) + " لتر";
  document.getElementById("r-fuel-per100").textContent =
    fmt(l100 * price, 2) + " ر.س";
  document.getElementById("r-fuel").classList.add("show");
}
function calcWaterAR() {
  const kg = parseFloat(document.getElementById("wat-weight").value) || 0,
    act = parseFloat(document.getElementById("wat-activity").value),
    ml = kg * 35 * act;
  document.getElementById("r-wat-liters").textContent =
    fmt(ml / 1000, 1) + " لتر";
  document.getElementById("r-wat-cups").textContent = fmt(ml / 240, 1);
  document.getElementById("r-wat-ml").textContent = fmt(ml, 0) + " مل";
  document.getElementById("r-water").classList.add("show");
}
function calcTax() {
  const price = parseFloat(document.getElementById("stax-price").value) || 0,
    rate = parseFloat(document.getElementById("stax-rate").value) || 0,
    mode = document.getElementById("stax-mode").value;
  let pre, taxAmt, total;
  if (mode === "add") {
    pre = price;
    taxAmt = (price * rate) / 100;
    total = pre + taxAmt;
  } else {
    total = price;
    pre = price / (1 + rate / 100);
    taxAmt = total - pre;
  }
  document.getElementById("r-tax-pre").textContent = fmtM(pre);
  document.getElementById("r-tax-amount").textContent = fmtM(taxAmt);
  document.getElementById("r-tax-total").textContent = fmtM(total);
  document.getElementById("r-tax").classList.add("show");
}

// INFLATION (AR)
function calcInflation() {
  const amount = parseFloat(document.getElementById("inf-amount").value) || 0;
  const rate = parseFloat(document.getElementById("inf-rate").value) / 100 || 0;
  const years = parseInt(document.getElementById("inf-years").value) || 0;
  const futureNeed = amount * Math.pow(1 + rate, years);
  const futureValue = amount / Math.pow(1 + rate, years);
  const lost = amount - futureValue;
  const cumulative = (Math.pow(1 + rate, years) - 1) * 100;
  const futureYear = new Date().getFullYear() + years;

  document.getElementById("r-inf-value").textContent = fmtM(futureValue);
  document.getElementById("r-inf-cumulative").textContent =
    fmt(cumulative, 1) + "٪";
  document.getElementById("r-inf-lost").textContent = fmtM(lost);

  const noteAmountEl = document.getElementById("r-inf-amount-note");
  if (noteAmountEl)
    noteAmountEl.textContent = amount.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

  const noteNeedEl = document.getElementById("r-inf-future-need");
  if (noteNeedEl) noteNeedEl.textContent = fmtM(futureNeed);

  const yearEl = document.getElementById("r-inf-future-year");
  if (yearEl) yearEl.textContent = futureYear;

  document.getElementById("r-inflation").classList.add("show");
}

// RETIREMENT (AR)
function calcRetirement() {
  const currentAge = parseFloat(document.getElementById("ret-age").value) || 30;
  const retireAge =
    parseFloat(document.getElementById("ret-retire").value) || 60;
  const currentSav =
    parseFloat(document.getElementById("ret-current").value) || 0;
  const monthlyContr =
    parseFloat(document.getElementById("ret-contrib").value) || 0;
  const annualReturn =
    parseFloat(document.getElementById("ret-return").value) / 100 || 0.06;
  const inflation =
    parseFloat(document.getElementById("ret-inflation").value) / 100 || 0.03;
  const monthlyGoal =
    parseFloat(document.getElementById("ret-goal").value) || 15000;

  const years = Math.max(retireAge - currentAge, 1);
  const months = years * 12;
  const r = annualReturn / 12;

  const fvCurrent = currentSav * Math.pow(1 + r, months);
  const fvContrib =
    r > 0
      ? monthlyContr * ((Math.pow(1 + r, months) - 1) / r)
      : monthlyContr * months;
  const projectedNestEgg = fvCurrent + fvContrib;

  const inflatedGoal = monthlyGoal * Math.pow(1 + inflation, years);
  const neededNestEgg = (inflatedGoal * 12) / 0.04;

  const supportedMonthlyInflated = (projectedNestEgg * 0.04) / 12;
  const supportedMonthlyToday =
    supportedMonthlyInflated / Math.pow(1 + inflation, years);

  const gap = neededNestEgg - fvCurrent;
  let recommendedMonthly =
    r > 0 ? (gap * r) / (Math.pow(1 + r, months) - 1) : gap / months;
  recommendedMonthly = Math.max(0, recommendedMonthly);

  const fmtAR = (n) => fmt(Math.abs(n), 0) + " ر.س";

  document.getElementById("ret-r-nest").textContent = fmtAR(projectedNestEgg);
  document.getElementById("ret-r-needed").textContent = fmtAR(neededNestEgg);
  document.getElementById("ret-r-income").textContent =
    fmtAR(supportedMonthlyToday) + "/شهر";
  document.getElementById("ret-r-monthly").textContent =
    fmtAR(recommendedMonthly) + "/شهر";
  document.getElementById("ret-r-years").textContent = years + " سنة";

  const verdict = document.getElementById("ret-r-verdict");
  if (projectedNestEgg >= neededNestEgg) {
    verdict.style.background = "rgba(34,211,160,0.12)";
    verdict.style.border = "1px solid rgba(34,211,160,0.3)";
    verdict.style.color = "#22d3a0";
    const surplus = projectedNestEgg - neededNestEgg;
    verdict.textContent = `✅ أنت في المسار الصحيح! تتجاوز خطتك الهدف بفائض ${fmtAR(surplus)}.`;
  } else {
    const shortfall = neededNestEgg - projectedNestEgg;
    verdict.style.background = "rgba(255,140,66,0.1)";
    verdict.style.border = "1px solid rgba(255,140,66,0.3)";
    verdict.style.color = "#ff8c42";
    verdict.textContent = `⚠️ عجز بمقدار ${fmtAR(shortfall)}. زد ادخارك الشهري إلى ${fmtAR(recommendedMonthly)} لتحقيق هدفك.`;
  }
  document.getElementById("r-retirement").classList.add("show");
}

function calcROI() {
  const invest = parseFloat(document.getElementById("roi-invest").value) || 1,
    final = parseFloat(document.getElementById("roi-final").value) || 0,
    years = parseFloat(document.getElementById("roi-years").value) || 1,
    profit = final - invest,
    roi = (profit / invest) * 100,
    annualRoi = (Math.pow(final / invest, 1 / years) - 1) * 100;
  const el = document.getElementById("r-roi-pct");
  el.textContent = (roi >= 0 ? "+" : "") + fmt(roi, 1) + "٪";
  el.style.color = roi >= 0 ? "var(--green)" : "var(--pink)";
  document.getElementById("r-roi-profit").textContent =
    (profit >= 0 ? "" : "-") + fmt(Math.abs(profit), 2) + " ر.س";
  document.getElementById("r-roi-annual").textContent =
    (annualRoi >= 0 ? "+" : "") + fmt(annualRoi, 1) + "٪";
  document.getElementById("r-roi").classList.add("show");
}
function calcCreditCard() {
  const balance = parseFloat(document.getElementById("cc-balance").value) || 0,
    apr = parseFloat(document.getElementById("cc-apr").value) || 0,
    payment = parseFloat(document.getElementById("cc-payment").value) || 0,
    r = apr / 100 / 12;
  if (payment <= balance * r) {
    document.getElementById("r-cc-months").textContent =
      "∞ (الدفعة منخفضة جداً)";
    document.getElementById("r-cc-interest").textContent = "∞";
    document.getElementById("r-cc-total").textContent = "∞";
    document.getElementById("r-cc").classList.add("show");
    return;
  }
  const months = Math.ceil(
    -Math.log(1 - (r * balance) / payment) / Math.log(1 + r),
  ),
    totalPaid = payment * months;
  document.getElementById("r-cc-months").textContent =
    months < 12 ? months + " شهر" : (months / 12).toFixed(1) + " سنوات";
  document.getElementById("r-cc-interest").textContent = fmtM(
    totalPaid - balance,
  );
  document.getElementById("r-cc-total").textContent = fmtM(totalPaid);
  document.getElementById("r-cc").classList.add("show");
}
// PREGNANCY (AR)
function calcPregnancy() {
  const lmpVal = document.getElementById("preg-lmp").value;
  if (!lmpVal) {
    alert("الرجاء اختيار اليوم الأول من آخر دورة شهرية.");
    return;
  }
  const lmpDate = new Date(lmpVal);
  lmpDate.setHours(0, 0, 0, 0);

  const cycleLen = parseInt(document.getElementById("preg-cycle").value) || 28;
  const adjustedDays = 280 + (cycleLen - 28);

  const edd = new Date(lmpDate);
  edd.setDate(edd.getDate() + adjustedDays);

  const conception = new Date(edd);
  conception.setDate(conception.getDate() - 266);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffMs = today - lmpDate;
  const currentDays = Math.floor(diffMs / 86400000);

  let weekDayStr = "—";
  let trimester = "—";
  let remaining = "—";

  if (currentDays >= 0 && currentDays <= adjustedDays) {
    const weeks = Math.floor(currentDays / 7);
    const days = currentDays % 7;
    weekDayStr = `الأسبوع ${weeks}، اليوم ${days}`;

    if (weeks < 13) trimester = "الأول (١-١٢ أسبوع)";
    else if (weeks < 27) trimester = "الثاني (١٣-٢٦ أسبوع)";
    else trimester = "الثالث (٢٧-٤٠+ أسبوع)";

    remaining = adjustedDays - currentDays + " يوم";
  } else if (currentDays > adjustedDays) {
    weekDayStr = "تجاوزت الموعد";
    remaining = "٠ يوم";
    trimester = "الثالث (متأخرة)";
  } else {
    weekDayStr = "تم اختيار تاريخ مستقبلي";
  }

  const opts = { month: "long", day: "numeric", year: "numeric" };
  document.getElementById("r-preg-edd").textContent = edd.toLocaleDateString(
    "ar-SA",
    opts,
  );
  document.getElementById("r-preg-days-left").textContent = remaining;
  document.getElementById("r-preg-week").textContent = weekDayStr;
  document.getElementById("r-preg-trimester").textContent = trimester;
  document.getElementById("r-preg-conception").textContent =
    conception.toLocaleDateString("ar-SA", opts);

  // ── Fetus visualization (AR) ──
  const fetusData = [
    ["🔬", "مجهري", "< 0.1 مم", "—", "البويضة المخصبة تبدأ بالانقسام"],
    ["🔬", "مجهري", "< 0.1 مم", "—", "الخلايا تستمر بالانقسام السريع"],
    ["🔬", "مجهري", "0.1 مم", "—", "الكيسة الأريمية تنغرس في الرحم"],
    ["🔬", "مجهري", "0.2 مم", "—", "يبدأ تكوّن الجنين والأنبوب العصبي"],
    ["🌰", "بذرة خشخاش", "1 مم", "< 1 غ", "يبدأ القلب بالنبض والدماغ بالتشكّل"],
    ["🫘", "بذرة سمسم", "2 مم", "< 1 غ", "تظهر براعم الذراعين والساقين"],
    ["🫐", "حبة عدس", "5 مم", "< 1 غ", "يتشكل الأنف والفم والأذنان"],
    ["🫐", "حبة توت", "1.3 سم", "< 1 غ", "تبدأ الأصابع بالتكوّن"],
    ["🍇", "حبة توت كبيرة", "1.6 سم", "1 غ", "جميع الأعضاء الرئيسية تتشكّل"],
    ["🫒", "زيتونة", "2.3 سم", "2 غ", "العظام تبدأ بالتصلّب"],
    ["🍓", "فراولة", "3.1 سم", "4 غ", "الأظافر تنمو ويبدأ بالفواق"],
    ["🍋", "ليمونة خضراء", "4.1 سم", "7 غ", "الحبال الصوتية تتشكّل"],
    ["🍋", "ليمونة", "5.4 سم", "14 غ", "البصمات تتشكّل"],
    ["🍊", "برتقالة", "7.4 سم", "23 غ", "يستشعر الضوء وينمو الشعر"],
    ["🍎", "تفاحة", "8.7 سم", "42 غ", "يسمع الأصوات وبراعم التذوق تنشط"],
    ["🍐", "أفوكادو", "10.1 سم", "70 غ", "الهيكل يتصلّب ويمكنه عمل تعابير"],
    ["🫑", "كمثرى", "11.6 سم", "100 غ", "يتثاءب ويتمدد"],
    ["🥭", "مانجو", "13.2 سم", "140 غ", "الجهاز العصبي ينضج"],
    ["🥭", "مانجو", "14.2 سم", "190 غ", "الشعر ينمو على الرأس"],
    ["🍌", "موزة", "15.3 سم", "240 غ", "يبتلع السائل الأمنيوسي بانتظام"],
    ["🥕", "جزرة", "16.7 سم", "300 غ", "دورات النوم والاستيقاظ تبدأ"],
    ["🥕", "قرعة صغيرة", "19.2 سم", "350 غ", "الجفون تنفتح والرئتان تتطوران"],
    ["🌽", "كوز ذرة", "21.6 سم", "430 غ", "يستجيب للأصوات والموسيقى"],
    ["🌽", "كوز ذرة كبير", "22.0 سم", "500 غ", "الدماغ ينمو بسرعة"],
    ["🥒", "كوسة", "23.0 سم", "570 غ", "حاسة التوازن تتطوّر"],
    [
      "🥦",
      "قرنبيط",
      "24.0 سم",
      "660 غ",
      "العيون تنفتح والرئتان تنتجان مادة السرفاكتانت",
    ],
    ["🥦", "رأس خس", "25.0 سم", "760 غ", "يحلم (نوم حركة العين السريعة)"],
    ["🍆", "باذنجان", "27.0 سم", "875 غ", "الحواس الخمس مكتملة"],
    ["🍆", "قرع عسلي", "28.0 سم", "1.0 كغ", "يكتسب وزناً بسرعة"],
    ["🥥", "جوز هند", "30.0 سم", "1.2 كغ", "العظام مكتملة (لا تزال لينة)"],
    ["🥥", "جوز هند", "32.0 سم", "1.5 كغ", "يدير رأسه يميناً ويساراً"],
    ["🍍", "أناناس", "34.0 سم", "1.7 كغ", "طبقة الدهون تتراكم"],
    ["🍍", "أناناس", "35.0 سم", "1.9 كغ", "الجهاز المناعي يقوى"],
    ["🍍", "شمّام", "37.0 سم", "2.1 كغ", "الرئتان شبه ناضجتين"],
    ["🎃", "كانتالوب", "38.0 سم", "2.4 كغ", "روابط الدماغ تزداد بسرعة"],
    ["🎃", "كانتالوب", "40.0 سم", "2.6 كغ", "الرأس للأسفل مستعد للنزول"],
    ["🍉", "شمّام كبير", "43.0 سم", "2.9 كغ", "الرئتان ناضجتان تماماً"],
    ["🍉", "بطيخ صغير", "46.0 سم", "3.1 كغ", "اكتمال النمو! جاهز للولادة"],
    ["🍉", "بطيخ", "48.0 سم", "3.3 كغ", "الحركة قد تكون أقل"],
    ["🍉", "بطيخ", "50.0 سم", "3.5 كغ", "طفلك جاهز تماماً!"],
    [
      "🍉",
      "بطيخ كبير",
      "51.0 سم",
      "3.6 كغ",
      "أسبوع الولادة — مرحباً بالمولود!",
    ],
  ];

  const weeks =
    currentDays >= 0 ? Math.min(Math.floor(currentDays / 7), 40) : 0;
  const viz = document.getElementById("preg-fetus-viz");

  if (currentDays >= 0 && currentDays <= adjustedDays + 14) {
    const data = fetusData[weeks] || fetusData[40];
    viz.style.display = "block";

    const iconSize = Math.max(2.5, Math.min(6, 2.5 + (weeks / 40) * 3.5));
    const icon = document.getElementById("preg-fetus-icon");
    icon.textContent = data[0];
    icon.style.fontSize = iconSize + "rem";

    document.getElementById("preg-size-compare").textContent =
      `${data[0]} بحجم ${data[1]} تقريباً`;
    document.getElementById("preg-size-detail").textContent =
      `${data[2]} طول · ${data[3]}`;
    document.getElementById("preg-dev-note").textContent = data[4];

    const pctProgress = Math.min(100, (weeks / 40) * 100);
    document.getElementById("preg-progress-bar").style.width =
      pctProgress + "%";
    document.getElementById("preg-progress-week").textContent =
      `الأسبوع ${weeks}`;
  } else {
    viz.style.display = "none";
  }

  document.getElementById("r-pregnancy").classList.add("show");
}

// HEART RATE ZONES (AR)
function calcHeartRate() {
  const age = parseInt(document.getElementById("hr-age").value) || 30;
  const rest = parseInt(document.getElementById("hr-rest").value) || 60;

  const maxHr = 220 - age;
  const hrr = maxHr - rest;

  const calcZone = (pct) => Math.round(rest + hrr * pct);

  document.getElementById("r-hr-max").textContent = maxHr;
  document.getElementById("r-hr-z1").textContent =
    `${calcZone(0.5)} - ${calcZone(0.6)}`;
  document.getElementById("r-hr-z2").textContent =
    `${calcZone(0.6)} - ${calcZone(0.7)}`;
  document.getElementById("r-hr-z3").textContent =
    `${calcZone(0.7)} - ${calcZone(0.8)}`;
  document.getElementById("r-hr-z4").textContent =
    `${calcZone(0.8)} - ${calcZone(0.9)}`;
  document.getElementById("r-hr-z5").textContent =
    `${calcZone(0.9)} - ${calcZone(1.0)}`;

  document.getElementById("r-heartrate").classList.add("show");
}

// IDEAL WEIGHT (AR)
function calcIdealWeight() {
  const g = document.getElementById("iw-gender").value;
  const hCm = parseFloat(document.getElementById("iw-height").value) || 0;
  const frame = document.getElementById("iw-frame").value;

  if (hCm < 100 || hCm > 250) {
    alert("الرجاء إدخال طول صحيح (100-250 سم).");
    return;
  }

  const hInches = hCm / 2.54;
  const over5Ft = Math.max(0, hInches - 60);

  let robinson = g === "male" ? 52 + 1.9 * over5Ft : 49 + 1.7 * over5Ft;
  let miller = g === "male" ? 56.2 + 1.41 * over5Ft : 53.1 + 1.36 * over5Ft;
  let devine = g === "male" ? 50 + 2.3 * over5Ft : 45.5 + 2.3 * over5Ft;

  const adj = frame === "small" ? 0.9 : frame === "large" ? 1.1 : 1;
  robinson *= adj;
  miller *= adj;
  devine *= adj;

  const avg = (robinson + miller + devine) / 3;
  const low = avg * 0.9;
  const high = avg * 1.1;

  document.getElementById("r-iw-primary").textContent =
    `${fmt(low, 1)} - ${fmt(high, 1)} كجم`;
  document.getElementById("r-iw-robinson").textContent =
    `${fmt(robinson, 1)} كجم`;
  document.getElementById("r-iw-miller").textContent = `${fmt(miller, 1)} كجم`;
  document.getElementById("r-iw-devine").textContent = `${fmt(devine, 1)} كجم`;

  document.getElementById("r-idealweight").classList.add("show");
}

// SLEEP CALCULATOR (AR)
function calcSleep() {
  const mode = document.getElementById("slp-mode").value;
  const timeVal = document.getElementById("slp-time").value;
  if (!timeVal) {
    alert("الرجاء اختيار الوقت.");
    return;
  }

  const [h, m] = timeVal.split(":").map(Number);
  const baseDate = new Date();
  baseDate.setHours(h, m, 0, 0);

  const cycles = [6, 5, 4, 3];
  const resultsHTML = [];

  for (let c of cycles) {
    const target = new Date(baseDate);
    if (mode === "wake") {
      target.setTime(target.getTime() - c * 5400000 - 900000);
    } else {
      target.setTime(target.getTime() + 900000 + c * 5400000);
    }

    const timeStr = target.toLocaleTimeString("ar-SA", {
      hour: "numeric",
      minute: "2-digit",
    });
    const hours = (c * 90) / 60;

    const color =
      c === 5 || c === 6
        ? "var(--green)"
        : c === 4
          ? "var(--yellow)"
          : "var(--orange)";

    resultsHTML.push(`
          <div class="result-item">
            <span class="result-value" style="color:${color}">${timeStr}</span>
            <div class="result-label">${c} دورات (${hours} ساعات)</div>
          </div>
        `);
  }

  document.getElementById("r-slp-cycles").innerHTML = resultsHTML.join("");
  document.getElementById("r-sleep").classList.add("show");
}

function calcDateDiff() {
  const start = new Date(document.getElementById("dd-start").value),
    end = new Date(document.getElementById("dd-end").value),
    days = Math.floor(Math.abs(end - start) / 86400000);
  document.getElementById("r-dd-days").textContent = fmt(days, 0);
  document.getElementById("r-dd-weeks").textContent = fmt(days / 7, 1);
  document.getElementById("r-dd-months").textContent = fmt(days / 30.44, 1);
  document.getElementById("r-datediff").classList.add("show");
}
function calcRandom() {
  const min = parseInt(document.getElementById("rng-min").value) || 0,
    max = parseInt(document.getElementById("rng-max").value) || 100,
    count = Math.min(
      parseInt(document.getElementById("rng-count").value) || 1,
      50,
    ),
    nums = Array.from(
      { length: count },
      () => Math.floor(Math.random() * (max - min + 1)) + min,
    );
  document.getElementById("r-rng-numbers").innerHTML = nums.join("  ·  ");
  document.getElementById("r-random").classList.add("show");
}
function updatePaceFields() {
  const s = document.getElementById("pace-solve").value;
  document.getElementById("pace-pace-field").style.display =
    s === "pace" ? "none" : "";
}
function calcPace() {
  const solve = document.getElementById("pace-solve").value,
    dist = parseFloat(document.getElementById("pace-dist").value) || 0,
    h = parseInt(document.getElementById("pace-h").value) || 0,
    m = parseInt(document.getElementById("pace-m").value) || 0,
    s = parseInt(document.getElementById("pace-s").value) || 0,
    totalSec = h * 3600 + m * 60 + s,
    pMin = parseInt(document.getElementById("pace-min")?.value || 0),
    pSec = parseInt(document.getElementById("pace-sec")?.value || 0);
  let result, label;
  if (solve === "pace") {
    const spk = totalSec / dist;
    result =
      Math.floor(spk / 60) +
      ":" +
      String(Math.round(spk % 60)).padStart(2, "0") +
      " /كم";
    label = "الإيقاع";
  } else if (solve === "time") {
    const ps = pMin * 60 + pSec,
      tt = ps * dist;
    result =
      Math.floor(tt / 3600) +
      "س " +
      Math.floor((tt % 3600) / 60) +
      "د " +
      Math.round(tt % 60) +
      "ث";
    label = "وقت الإنهاء";
  } else {
    result = fmt(totalSec / (pMin * 60 + pSec), 2) + " كم";
    label = "المسافة";
  }
  document.getElementById("r-pace-result").textContent = result;
  document.getElementById("r-pace-label").textContent = label;
  document.getElementById("r-pace").classList.add("show");
}

// CURRENCY CONVERTER (AR)
const CURRENCY_LIST = [
  ["USD", "$ دولار أمريكي"],
  ["EUR", "€ يورو"],
  ["GBP", "£ جنيه إسترليني"],
  ["SAR", "ر.س ريال سعودي"],
  ["AED", "د.إ درهم إماراتي"],
  ["JPY", "¥ ين ياباني"],
  ["CNY", "¥ يوان صيني"],
  ["INR", "₹ روبية هندية"],
  ["KWD", "د.ك دينار كويتي"],
  ["QAR", "ر.ق ريال قطري"],
  ["BHD", "BD دينار بحريني"],
  ["OMR", "ر.ع ريال عماني"],
  ["EGP", "ج.م جنيه مصري"],
  ["JOD", "د.ا دينار أردني"],
  ["TRY", "₺ ليرة تركية"],
  ["CAD", "C$ دولار كندي"],
  ["AUD", "A$ دولار أسترالي"],
  ["CHF", "Fr فرنك سويسري"],
  ["SEK", "kr كرونة سويدية"],
  ["NOK", "kr كرونة نرويجية"],
  ["DKK", "kr كرونة دنماركية"],
  ["HKD", "HK$ دولار هونغ كونغ"],
  ["SGD", "S$ دولار سنغافوري"],
  ["KRW", "₩ وون كوري"],
  ["MYR", "RM رينغيت ماليزي"],
  ["THB", "฿ بات تايلندي"],
  ["IDR", "Rp روبية إندونيسية"],
  ["PKR", "₨ روبية باكستانية"],
  ["BDT", "৳ تاكا بنغلاديشية"],
  ["NGN", "₦ نايرا نيجيرية"],
  ["ZAR", "R راند جنوب أفريقي"],
  ["BRL", "R$ ريال برازيلي"],
  ["MXN", "$ بيزو مكسيكي"],
];
// Base: USD fallback rates
const CUR_FALLBACK = {
  USD: 1,
  EUR: 0.924,
  GBP: 0.791,
  SAR: 3.751,
  AED: 3.673,
  JPY: 149.5,
  CNY: 7.24,
  INR: 83.1,
  KWD: 0.307,
  QAR: 3.641,
  BHD: 0.377,
  OMR: 0.385,
  EGP: 30.9,
  JOD: 0.709,
  TRY: 32.5,
  CAD: 1.356,
  AUD: 1.535,
  CHF: 0.878,
  SEK: 10.45,
  NOK: 10.58,
  DKK: 6.9,
  HKD: 7.824,
  SGD: 1.344,
  KRW: 1327,
  MYR: 4.74,
  THB: 35.5,
  IDR: 15700,
  PKR: 278,
  BDT: 110,
  NGN: 1580,
  ZAR: 18.8,
  BRL: 4.98,
  MXN: 17.15,
};
let curRates = null; // {base:'USD', rates:{...}}
const POPULAR_TARGETS = [
  "SAR",
  "AED",
  "USD",
  "EUR",
  "GBP",
  "KWD",
  "EGP",
  "QAR",
  "TRY",
  "INR",
];

function curPopulate() {
  const fromSel = document.getElementById("cur-from");
  const toSel = document.getElementById("cur-to");
  if (!fromSel || !toSel) return;
  fromSel.innerHTML = "";
  toSel.innerHTML = "";
  CURRENCY_LIST.forEach(([code, label]) => {
    const o1 = `<option value="${code}" ${code === "SAR" ? "selected" : ""}>${code} — ${label.split(" ").slice(1).join(" ")}</option>`;
    const o2 = `<option value="${code}" ${code === "USD" ? "selected" : ""}>${code} — ${label.split(" ").slice(1).join(" ")}</option>`;
    fromSel.insertAdjacentHTML("beforeend", o1);
    toSel.insertAdjacentHTML("beforeend", o2);
  });
  const triggerCalc = () => {
    updateRateTag();
    convertCurrency();
  };
  fromSel.addEventListener("change", triggerCalc);
  toSel.addEventListener("change", triggerCalc);
  document
    .getElementById("cur-amount")
    .addEventListener("input", convertCurrency);
}

function getRate(from, to) {
  if (!curRates) return CUR_FALLBACK[to] / CUR_FALLBACK[from];
  const base = curRates.rates;
  // The API base is EUR.
  // If a currency is missing from the API (like SAR, AED), we anchor it to the live USD rate.
  const liveUSD = base["USD"] || 1 / CUR_FALLBACK["EUR"];

  const getRateToBase = (c) => {
    if (c === "EUR") return 1;
    if (base[c]) return base[c];
    // Missing from API: use (Live USD/EUR) * (Fallback CUR/USD)
    return liveUSD * CUR_FALLBACK[c];
  };

  const fromEUR = getRateToBase(from);
  const toEUR = getRateToBase(to);
  return toEUR / fromEUR;
}

function updateRateTag() {
  const from = document.getElementById("cur-from")?.value;
  const to = document.getElementById("cur-to")?.value;
  if (!from || !to) return;
  const rate = getRate(from, to);
  const rateEl = document.getElementById("cur-rate-display");
  const tagEl = document.getElementById("cur-rate-tag");
  if (rateEl)
    rateEl.innerHTML =
      rate.toFixed(rate < 0.01 ? 6 : rate < 1 ? 4 : 4) +
      ' <span dir="ltr">' +
      to +
      "</span>";
  if (tagEl) tagEl.firstChild.textContent = "1 " + from + " = ";
}

function swapCurrency() {
  const f = document.getElementById("cur-from");
  const t = document.getElementById("cur-to");
  if (!f || !t) return;
  [f.value, t.value] = [t.value, f.value];
  updateRateTag();
}

function convertCurrency() {
  const amount = parseFloat(document.getElementById("cur-amount").value) || 0;
  const from = document.getElementById("cur-from").value;
  const to = document.getElementById("cur-to").value;
  const rate = getRate(from, to);
  const result = amount * rate;
  const dp = result < 0.1 ? 6 : result < 1 ? 4 : 2;
  document.getElementById("cur-r-main").innerHTML =
    result.toLocaleString("en-US", {
      minimumFractionDigits: dp,
      maximumFractionDigits: dp,
    }) +
    ' <span dir="ltr">' +
    to +
    "</span>";
  document.getElementById("cur-r-label").textContent =
    `${amount.toLocaleString()} ${from} →`;

  // Multi grid
  const grid = document.getElementById("cur-multi-grid");
  grid.innerHTML = POPULAR_TARGETS.filter((c) => c !== to && c !== from)
    .slice(0, 8)
    .map((c) => {
      const r = getRate(from, c);
      const v = amount * r;
      const d = v < 1 ? 4 : 2;
      return `<div class="cur-multi-item"><div class="cur-code">${c}</div><div class="cur-val">${v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d })}</div></div>`;
    })
    .join("");
  document.getElementById("r-currency").classList.add("show");
}

async function loadCurrencyRates() {
  const statusEl = document.getElementById("cur-status");

  // Show skeleton loader
  if (statusEl) {
    statusEl.textContent = "⏳ جارٍ تحميل الأسعار الحية...";
    statusEl.className = "cur-status";
  }
  document.getElementById("cur-rate-display").innerHTML =
    '<span class="skeleton skeleton-text" style="width:60px;"></span>';
  document.getElementById("cur-r-main").innerHTML =
    '<div class="skeleton skeleton-block" style="height:48px;"></div>';

  // Generate skeleton grid
  document.getElementById("cur-multi-grid").innerHTML = Array(8)
    .fill(
      '<div class="cur-multi-item"><div class="cur-code"><div class="skeleton skeleton-text" style="width:40px;"></div></div><div class="cur-val"><div class="skeleton skeleton-text" style="width:80px; margin-top:0.3rem;"></div></div></div>',
    )
    .join("");
  document.getElementById("r-currency").classList.add("show");

  try {
    const res = await fetch(
      "https://api.frankfurter.app/latest?base=EUR&symbols=USD,GBP,SAR,AED,JPY,CNY,INR,KWD,QAR,BHD,OMR,EGP,JOD,TRY,CAD,AUD,CHF,SEK,NOK,DKK,HKD,SGD,KRW,MYR,THB,IDR,PKR,BDT,NGN,ZAR,BRL,MXN",
    );
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    curRates = { base: "EUR", rates: { ...data.rates, EUR: 1 } };
    if (statusEl) {
      statusEl.textContent = "🟢 أسعار حية · " + data.date;
      statusEl.className = "cur-status live";
    }
    updateRateTag();
  } catch (e) {
    if (statusEl) {
      statusEl.textContent =
        "⚪ وضع عدم الاتصال — استخدام أسعار تقريبية (فبراير ٢٠٢٦)";
      statusEl.className = "cur-status offline";
    }
  }
}

// UNIT CONVERTER
const unitData = {
  length: {
    units: [
      "مليمتر",
      "سنتيمتر",
      "متر",
      "كيلومتر",
      "بوصة",
      "قدم",
      "ياردة",
      "ميل",
    ],
    toBase: [0.001, 0.01, 1, 1000, 0.0254, 0.3048, 0.9144, 1609.344],
  },
  weight: {
    units: ["ملليجرام", "جرام", "كيلوجرام", "طن", "أونصة", "رطل", "ستون"],
    toBase: [0.000001, 0.001, 1, 1000, 0.0283495, 0.453592, 6.35029],
  },
  temp: { units: ["مئوية", "فهرنهايت", "كلفن"], toBase: null },
  volume: {
    units: ["مليلتر", "لتر", "كوب", "أونصة سائلة", "باينت", "كوارت", "جالون"],
    toBase: [0.001, 1, 0.236588, 0.0295735, 0.473176, 0.946353, 3.78541],
  },
  speed: {
    units: ["م/ث", "كم/س", "ميل/س", "عقدة"],
    toBase: [1, 0.277778, 0.44704, 0.514444],
  },
};
function updateUnitOptions() {
  const cat = document.getElementById("unit-cat").value,
    data = unitData[cat],
    fromSel = document.getElementById("unit-from"),
    toSel = document.getElementById("unit-to");
  fromSel.innerHTML = data.units
    .map((u, i) => `<option value="${i}">${u}</option>`)
    .join("");
  toSel.innerHTML = data.units
    .map((u, i) => `<option value="${i}">${u}</option>`)
    .join("");
  toSel.selectedIndex = 1;
  calcUnits();
}
function calcUnits() {
  if (!document.getElementById("unit-cat")) return;
  const cat = document.getElementById("unit-cat").value,
    fromI = parseInt(document.getElementById("unit-from").value),
    toI = parseInt(document.getElementById("unit-to").value),
    val = parseFloat(document.getElementById("unit-val").value) || 0,
    data = unitData[cat];
  let result;
  if (cat === "temp") {
    let c;
    if (fromI === 0) c = val;
    else if (fromI === 1) c = ((val - 32) * 5) / 9;
    else c = val - 273.15;
    if (toI === 0) result = c;
    else if (toI === 1) result = (c * 9) / 5 + 32;
    else result = c + 273.15;
  } else {
    result = (val * data.toBase[fromI]) / data.toBase[toI];
  }
  const el = document.getElementById("r-unit-result");
  if (el) {
    el.textContent =
      Math.abs(result) < 0.001 || Math.abs(result) > 1e7
        ? result.toExponential(4)
        : fmt(result, 4).replace(/\.?0+$/, "");
    document.getElementById("r-unit-label").textContent =
      `${data.units[fromI]} ← ${data.units[toI]}`;
  }
}

// GEOMETRY (AR)
function updateGeoFields() {
  const shape = document.getElementById("geo-shape").value;
  document.getElementById("geo-circle-fields").style.display =
    shape === "circle" ? "block" : "none";
  document.getElementById("geo-rect-fields").style.display =
    shape === "rectangle" ? "block" : "none";
  document.getElementById("geo-tri-fields").style.display =
    shape === "triangle" ? "block" : "none";
  document.getElementById("r-geo-perim-lbl").textContent =
    shape === "circle" ? "المحيط (الدائرة)" : "المحيط";
}

function calcGeometry() {
  const shape = document.getElementById("geo-shape").value;
  let area = 0,
    perim = 0;

  if (shape === "circle") {
    const r = parseFloat(document.getElementById("geo-r").value) || 0;
    if (r < 0) {
      alert("لا يمكن أن يكون نصف القطر سالباً.");
      return;
    }
    area = Math.PI * r * r;
    perim = 2 * Math.PI * r;
  } else if (shape === "rectangle") {
    const l = parseFloat(document.getElementById("geo-l").value) || 0;
    const w = parseFloat(document.getElementById("geo-w").value) || 0;
    if (l < 0 || w < 0) {
      alert("لا يمكن أن يكون الطول والعرض سالبين.");
      return;
    }
    area = l * w;
    perim = 2 * (l + w);
  } else if (shape === "triangle") {
    const b = parseFloat(document.getElementById("geo-b").value) || 0;
    const h = parseFloat(document.getElementById("geo-h").value) || 0;
    if (b < 0 || h < 0) {
      alert("لا يمكن أن تكون القاعدة والارتفاع سالبين.");
      return;
    }
    area = (b * h) / 2;
    const side = Math.sqrt((b / 2) ** 2 + h ** 2);
    perim = b + 2 * side;
  }

  document.getElementById("r-geo-area").textContent = fmt(area, 2);
  document.getElementById("r-geo-perim").textContent = fmt(perim, 2);

  document.getElementById("r-geometry").classList.add("show");
}

// PROBABILITY (AR)
function calcProbability() {
  document.getElementById("prob-basic-fields").style.display =
    type === "basic" ? "block" : "none";
  document.getElementById("prob-cp-fields").style.display =
    type !== "basic" ? "block" : "none";
  document.getElementById("r-prob-extras").style.display =
    type === "basic" ? "grid" : "none";
}

function calcProbability() {
  const type = document.getElementById("prob-type").value;
  const fact = (n) => {
    if (n < 0) return 0;
    if (n === 0 || n === 1) return 1;
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
  };

  if (type === "basic") {
    const fav = parseFloat(document.getElementById("prob-fav").value) || 0;
    const total = parseFloat(document.getElementById("prob-total").value) || 0;

    if (total === 0 || fav < 0 || total < 0 || fav > total) {
      alert(
        "إدخال غير صالح. يجب أن يكون الإجمالي > 0 والنتائج المطلوبة لا يمكن أن تتجاوز الإجمالي.",
      );
      return;
    }

    const prob = fav / total;
    document.getElementById("r-prob-main").textContent = `${fav} من ${total}`;
    document.getElementById("r-prob-label").textContent = "الاحتمال (كسر)";

    document.getElementById("r-prob-pct").textContent =
      `${fmt(prob * 100, 2)}%`;

    const unfav = total - fav;
    if (fav === 0) {
      document.getElementById("r-prob-odds").textContent = "0 إلى " + unfav;
    } else {
      document.getElementById("r-prob-odds").textContent =
        `${fav} إلى ${unfav}`;
    }
    document.getElementById("r-prob-extras").style.display = "grid";
  } else {
    const n = parseInt(document.getElementById("prob-n").value) || 0;
    const r = parseInt(document.getElementById("prob-r").value) || 0;

    if (n < 0 || r < 0 || r > n) {
      alert(
        "إدخال غير صالح. يجب أن يكون n و r >= 0، ولا يمكن أن يتجاوز r قيمة n.",
      );
      return;
    }

    if (type === "comb") {
      const c = fact(n) / (fact(r) * fact(n - r));
      document.getElementById("r-prob-main").textContent =
        c.toLocaleString("en-US");
      document.getElementById("r-prob-label").textContent =
        `التوافيق (${n}C${r})`;
    } else if (type === "perm") {
      const p = fact(n) / fact(n - r);
      document.getElementById("r-prob-main").textContent =
        p.toLocaleString("en-US");
      document.getElementById("r-prob-label").textContent =
        `التباديل (${n}P${r})`;
    }
    document.getElementById("r-prob-extras").style.display = "none";
  }

  document.getElementById("r-probability").classList.add("show");
}

// QUADRATIC EQUATION (AR)
function calcQuadratic() {
  const a = parseFloat(document.getElementById("quad-a").value);
  const b = parseFloat(document.getElementById("quad-b").value) || 0;
  const c = parseFloat(document.getElementById("quad-c").value) || 0;

  if (isNaN(a) || a === 0) {
    alert("المعامل 'أ' لا يمكن أن يكون صفراً في المعادلة التربيعية.");
    return;
  }

  const disc = b * b - 4 * a * c;
  let rootsStr = "";
  let typeStr = "";
  let x1 = "—",
    x2 = "—";

  if (disc > 0) {
    typeStr = "جذران حقيقيان";
    const root1 = (-b + Math.sqrt(disc)) / (2 * a);
    const root2 = (-b - Math.sqrt(disc)) / (2 * a);
    x1 = fmt(root1, 4);
    x2 = fmt(root2, 4);
    rootsStr = `س = ${x1} ، س = ${x2}`;
  } else if (disc === 0) {
    typeStr = "جذر حقيقي واحد (مكرر)";
    const root = -b / (2 * a);
    x1 = fmt(root, 4);
    x2 = x1;
    rootsStr = `س = ${x1}`;
  } else {
    typeStr = "جذور تخيلية / مركبة";
    const real = -b / (2 * a);
    const img = Math.sqrt(-disc) / (2 * a);
    const rm = fmt(real, 4);
    const im = fmt(Math.abs(img), 4);

    x1 = `${rm} + ${im}i`;
    x2 = `${rm} - ${im}i`;
    rootsStr = `س = ${x1} ، س = ${x2}`;
  }

  document.getElementById("r-quad-type").textContent = typeStr;
  document.getElementById("r-quad-roots").textContent = rootsStr;
  document.getElementById("r-quad-disc").textContent = fmt(disc, 4);
  document.getElementById("r-quad-x1").textContent = x1;
  document.getElementById("r-quad-x2").textContent = x2;

  document.getElementById("r-quadratic").classList.add("show");
}

// BASE CONVERTER (AR)
function calcBase() {
  const val = document.getElementById("base-val").value.trim();
  const fromBase = parseInt(document.getElementById("base-from").value);

  if (!val) {
    alert("الرجاء إدخال قيمة.");
    return;
  }

  // Parse the input value using the selected base
  const num = parseInt(val, fromBase);
  if (isNaN(num)) {
    alert("رقم غير صالح للنظام المحدد.");
    return;
  }

  // Convert to requested bases and update UI
  document.getElementById("r-base-dec").textContent = num.toString(10);
  document.getElementById("r-base-bin").textContent = num.toString(2);
  document.getElementById("r-base-oct").textContent = num.toString(8);
  document.getElementById("r-base-hex").textContent = num
    .toString(16)
    .toUpperCase();

  document.getElementById("r-base").classList.add("show");
}

// SPEED DISTANCE TIME (AR)
function updateSpeedFields() {
  const solveFor = document.getElementById("spd-solve").value;
  document.getElementById("spd-dist-field").style.display =
    solveFor === "distance" ? "none" : "block";
  document.getElementById("spd-time-field").style.display =
    solveFor === "time" ? "none" : "block";
  document.getElementById("spd-speed-field").style.display =
    solveFor === "speed" ? "none" : "block";
}

function calcSpeed() {
  const solveFor = document.getElementById("spd-solve").value;

  const getDistKm = () => {
    const d = parseFloat(document.getElementById("spd-dist").value) || 0;
    const u = document.getElementById("spd-dist-unit").value;
    if (u === "mi") return d * 1.60934;
    if (u === "m") return d / 1000;
    return d;
  };

  const getTimeHr = () => {
    const h = parseFloat(document.getElementById("spd-h").value) || 0;
    const m = parseFloat(document.getElementById("spd-m").value) || 0;
    return h + m / 60;
  };

  const getSpeedKph = () => {
    const s = parseFloat(document.getElementById("spd-speed").value) || 0;
    const u = document.getElementById("spd-speed-unit").value;
    if (u === "mph") return s * 1.60934;
    if (u === "mps") return s * 3.6;
    return s;
  };

  let resultLbl = "";
  let formatted = "";

  if (solveFor === "speed") {
    const d = getDistKm();
    const t = getTimeHr();
    if (t <= 0) {
      alert("يجب أن يكون الزمن أكبر من الصفر.");
      return;
    }

    const speedKph = d / t;
    resultLbl = "السرعة";

    const mph = speedKph / 1.60934;
    const mps = speedKph / 3.6;
    formatted = `${fmt(speedKph, 2)} كم/س<br><span style="font-size:1rem;color:var(--muted)">${fmt(mph, 2)} ميل/س<br>${fmt(mps, 2)} م/ث</span>`;
  } else if (solveFor === "distance") {
    const s = getSpeedKph();
    const t = getTimeHr();

    const distKm = s * t;
    resultLbl = "المسافة";

    const mi = distKm / 1.60934;
    const m = distKm * 1000;
    formatted = `${fmt(distKm, 2)} كم<br><span style="font-size:1rem;color:var(--muted)">${fmt(mi, 2)} ميل<br>${fmt(m, 2)} متر</span>`;
  } else if (solveFor === "time") {
    const d = getDistKm();
    const s = getSpeedKph();
    if (s <= 0) {
      alert("يجب أن تكون السرعة أكبر من الصفر.");
      return;
    }

    const timeHr = d / s;
    resultLbl = "الزمن";

    const totalMin = timeHr * 60;
    const hrs = Math.floor(totalMin / 60);
    const mins = Math.round(totalMin % 60);
    formatted = `${hrs > 0 ? hrs + " ساعة و " : ""}${mins} دقيقة<br><span style="font-size:1rem;color:var(--muted)">${fmt(timeHr, 2)} ساعات عشرية</span>`;
  }

  document.getElementById("r-spd-val").innerHTML = formatted;
  document.getElementById("r-spd-lbl").textContent = resultLbl;
  document.getElementById("r-speed").classList.add("show");
}

// TIMEZONE (AR)
function calcTimezone() {
  const timeVal = document.getElementById("tz-time").value;
  const fromOffset = parseFloat(document.getElementById("tz-from").value);
  const toOffset = parseFloat(document.getElementById("tz-to").value);

  if (!timeVal) {
    alert("الرجاء إدخال وقت.");
    return;
  }

  // Parse input time
  const [hours, mins] = timeVal.split(":").map(Number);

  // Calculate minutes from midnight in the FROM zone
  let totalMins = hours * 60 + mins;

  // Difference in hours
  const diffHours = toOffset - fromOffset;
  const diffMins = diffHours * 60;

  // Apply offset
  totalMins += diffMins;

  let dayOffset = "";
  if (totalMins < 0) {
    totalMins += 24 * 60;
    dayOffset = " (اليوم السابق)";
  } else if (totalMins >= 24 * 60) {
    totalMins -= 24 * 60;
    dayOffset = " (اليوم التالي)";
  }

  // Format back to HH:MM
  const finalH = Math.floor(totalMins / 60);
  const finalM = Math.round(totalMins % 60);

  const pad = (n) => n.toString().padStart(2, "0");
  const formattedTime = `${pad(finalH)}:${pad(finalM)}` + dayOffset;

  // Difference string
  const sign = diffHours > 0 ? "+" : "";
  const diffStr =
    diffHours === 0 ? "نفس المنطقة الزمنية" : `${sign}${diffHours} ساعة/ساعات`;

  document.getElementById("r-tz-val").textContent = formattedTime;
  document.getElementById("r-tz-diff").textContent = `فرق التوقيت: ${diffStr}`;

  document.getElementById("r-timezone").classList.add("show");
}

// COOKING CONVERTER (AR)
function calcCooking() {
  const val = parseFloat(document.getElementById("cook-val").value) || 0;
  const fromUnit = document.getElementById("cook-from").value;
  const toUnit = document.getElementById("cook-to").value;

  if (val < 0) {
    alert("الكمية لا يمكن أن تكون سالبة.");
    return;
  }

  // Define bases
  // Volume: base is ML
  const volUnits = {
    ml: 1,
    l: 1000,
    tsp: 4.92892,
    tbsp: 14.7868,
    floz: 29.5735,
    cup: 236.588,
  };

  // Weight: base is Grams
  const wtUnits = {
    g: 1,
    kg: 1000,
    oz: 28.3495,
    lb: 453.592,
  };

  const isVolFrom = volUnits.hasOwnProperty(fromUnit);
  const isVolTo = volUnits.hasOwnProperty(toUnit);

  if (isVolFrom !== isVolTo) {
    alert("لا يمكن التحويل المباشر بين الحجم والوزن بدون معرفة كثافة المكون.");
    return;
  }

  let result = 0;
  if (isVolFrom) {
    const inMl = val * volUnits[fromUnit];
    result = inMl / volUnits[toUnit];
  } else {
    const inG = val * wtUnits[fromUnit];
    result = inG / wtUnits[toUnit];
  }

  const selTo = document.getElementById("cook-to");
  let lblText = selTo.options[selTo.selectedIndex].text;

  document.getElementById("r-cook-val").textContent = fmt(result, 2);
  document.getElementById("r-cook-lbl").textContent = lblText;
  document.getElementById("r-cooking").classList.add("show");
}

// SCIENTIFIC CALCULATOR
let sciExpr = "",
  sciResult = null;
function sciDisplay(val) {
  if (document.getElementById("sci-display"))
    document.getElementById("sci-display").textContent = val;
}
function sciKey(k) {
  if (k === "C") {
    sciExpr = "";
    sciResult = null;
    sciDisplay("0");
    if (document.getElementById("sci-expr"))
      document.getElementById("sci-expr").textContent = "";
    return;
  }
  if (k === "CE" || k === "⌫") {
    sciExpr = sciExpr.slice(0, -1);
    sciDisplay(sciExpr || "0");
    return;
  }
  if (k === "=") {
    try {
      let expr = sciExpr
        .replace(/÷/g, "/")
        .replace(/×/g, "*")
        .replace(/π/g, "Math.PI")
        .replace(/e(?!xp)/g, "Math.E")
        .replace(/sin\(/g, "Math.sin(")
        .replace(/cos\(/g, "Math.cos(")
        .replace(/tan\(/g, "Math.tan(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/ln\(/g, "Math.log(")
        .replace(/√\(/g, "Math.sqrt(")
        .replace(/x²/g, "**2")
        .replace(/\^/g, "**")
        .replace(/%/g, "/100");
      const res = Function('"use strict";return(' + expr + ")")();
      if (document.getElementById("sci-expr"))
        document.getElementById("sci-expr").textContent = sciExpr + " =";
      sciExpr = String(parseFloat(res.toFixed(10)));
      sciDisplay(sciExpr);
    } catch (e) {
      sciDisplay("خطأ");
      sciExpr = "";
    }
    return;
  }
  const funcs = ["sin", "cos", "tan", "log", "ln"];
  if (funcs.includes(k)) {
    sciExpr += k + "(";
  } else {
    sciExpr += k;
  }
  sciDisplay(sciExpr);
}

function initScientific() {
  sciExpr = "";
  sciResult = null;
  sciDisplay("0");
  if (document.getElementById("sci-expr"))
    document.getElementById("sci-expr").textContent = "";
}

document.getElementById("global-search").addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    e.target.value = "";
    searchCalcs("");
  }
});

// ═══════════════════════════════════════════
//  UX POLISH: 5 Features (AR)
// ═══════════════════════════════════════════

// ── 1. SMOOTH SCROLL TO RESULTS ──
const resultsObserver = new MutationObserver((mutations) => {
  mutations.forEach((m) => {
    if (m.type === "attributes" && m.attributeName === "class") {
      const el = m.target;
      if (el.classList.contains("results") && el.classList.contains("show")) {
        setTimeout(
          () => el.scrollIntoView({ behavior: "smooth", block: "nearest" }),
          100,
        );
      }
    }
  });
});
function observeResults() {
  document.querySelectorAll(".results").forEach((r) => {
    resultsObserver.observe(r, {
      attributes: true,
      attributeFilter: ["class"],
    });
  });
}
const origOpenCalc = window.openCalc;
window.openCalc = function (id) {
  origOpenCalc(id);
  setTimeout(observeResults, 50);
};
observeResults();

// ── 2. SHAKE VALIDATION ──
window.shakeField = function (fieldId, message) {
  const el = document.getElementById(fieldId);
  if (!el) {
    alert(message);
    return;
  }
  const target = el.closest(".input-wrap") || el.closest(".field-group") || el;
  target.classList.remove("shake");
  void target.offsetWidth;
  target.classList.add("shake");
  target.style.outline = "2px solid var(--pink)";
  setTimeout(() => {
    target.classList.remove("shake");
    target.style.outline = "";
  }, 600);

  let tip = target.parentElement.querySelector(".shake-tip");
  if (!tip) {
    tip = document.createElement("div");
    tip.className = "shake-tip";
    tip.style.cssText =
      "font-size:0.75rem;color:var(--pink);margin-top:0.25rem;font-weight:600;transition:opacity 0.3s;";
    target.parentElement.appendChild(tip);
  }
  tip.textContent = message;
  tip.style.opacity = "1";
  setTimeout(() => {
    tip.style.opacity = "0";
    setTimeout(() => tip.remove(), 300);
  }, 2500);
};

// ── 3. CONFETTI CELEBRATION ──
window.launchConfetti = function () {
  let canvas = document.getElementById("confetti-canvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "confetti-canvas";
    document.body.appendChild(canvas);
  }
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  const colors = [
    "#6C63FF",
    "#FF6B9D",
    "#00D4AA",
    "#FFD93D",
    "#FF8A65",
    "#AB47BC",
    "#42A5F5",
  ];
  const particles = [];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: Math.random() * 10 + 4,
      h: Math.random() * 6 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2,
      rot: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 8,
      opacity: 1,
    });
  }

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.rot += p.rotV;
      if (frame > 60) p.opacity -= 0.015;
      if (p.opacity <= 0) return;
      alive = true;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (alive) requestAnimationFrame(animate);
    else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.remove();
    }
  }
  requestAnimationFrame(animate);
};

// Hook confetti into pregnancy calculator
if (typeof calcPregnancy === "function") {
  const _origPreg = calcPregnancy;
  window.calcPregnancy = function () {
    _origPreg();
    if (document.getElementById("r-pregnancy")?.classList.contains("show")) {
      setTimeout(launchConfetti, 300);
    }
  };
}

// ── 4. ENTER KEY TO SUBMIT ──
document.addEventListener("keydown", function (e) {
  if (e.key !== "Enter") return;
  const modal = document.getElementById("modal-overlay");
  if (!modal || !modal.classList.contains("open")) return;
  if (e.target.tagName === "TEXTAREA") return;

  const calcBtn = modal.querySelector(".calc-btn");
  if (calcBtn) {
    e.preventDefault();
    calcBtn.click();
  }
});

// ── 5. CURRENCY LOADING SKELETON ──
if (typeof loadCurrencyRates === "function") {
  const _origLoad = loadCurrencyRates;
  window.loadCurrencyRates = function () {
    const grid = document.getElementById("cur-multi-grid");
    if (grid) {
      grid.innerHTML = `
            <div class="cur-multi-item"><div class="skeleton-line w40"></div><div class="skeleton-line w60"></div></div>
            <div class="cur-multi-item"><div class="skeleton-line w40"></div><div class="skeleton-line w60"></div></div>
            <div class="cur-multi-item"><div class="skeleton-line w40"></div><div class="skeleton-line w60"></div></div>
            <div class="cur-multi-item"><div class="skeleton-line w40"></div><div class="skeleton-line w60"></div></div>
            <div class="cur-multi-item"><div class="skeleton-line w40"></div><div class="skeleton-line w60"></div></div>
            <div class="cur-multi-item"><div class="skeleton-line w40"></div><div class="skeleton-line w60"></div></div>
          `;
    }
    _origLoad();
  };
}

// ═══════════════════════════════════════════
//  PREMIUM FEATURES (AR)
// ═══════════════════════════════════════════

// ── 1. LIGHT/DARK MODE TOGGLE ──
window.toggleTheme = function () {
  const html = document.documentElement;
  const current = html.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  html.setAttribute("data-theme", next);
  localStorage.setItem("cw-theme", next);
  const btn = document.getElementById("theme-toggle");
  if (btn) btn.textContent = next === "light" ? "☀️" : "🌙";
};
// Initialize toggle icon
setTimeout(() => {
  const btn = document.getElementById("theme-toggle");
  if (btn) {
    const current = document.documentElement.getAttribute("data-theme");
    btn.textContent = current === "light" ? "☀️" : "🌙";
  }
}, 100);

// ── 2. COPY RESULTS + 6. SHARE ──
const _origOpenCalcPremium = window.openCalc;
window.openCalc = function (id) {
  _origOpenCalcPremium(id);
  setTimeout(() => {
    document.querySelectorAll(".results").forEach((r) => {
      if (r.querySelector(".copy-results-btn")) return;
      const btn = document.createElement("button");
      btn.className = "copy-results-btn";
      btn.innerHTML = "📋 نسخ النتائج";
      btn.onclick = function (e) {
        e.stopPropagation();
        const text = r.innerText
          .replace("📋 نسخ النتائج", "")
          .replace("✅ تم النسخ!", "")
          .replace("🔗 مشاركة", "")
          .replace("✅ تم نسخ الرابط!", "")
          .trim();
        navigator.clipboard.writeText(text).then(() => {
          btn.innerHTML = "✅ تم النسخ!";
          btn.classList.add("copied");
          setTimeout(() => {
            btn.innerHTML = "📋 نسخ النتائج";
            btn.classList.remove("copied");
          }, 2000);
        });
      };
      r.appendChild(btn);

      if (!r.querySelector(".share-btn")) {
        const shareBtn = document.createElement("button");
        shareBtn.className = "share-btn";
        shareBtn.innerHTML = "🔗 مشاركة";
        shareBtn.onclick = function (e) {
          e.stopPropagation();
          const modal = document.getElementById("modal-overlay");
          const inputs = modal.querySelectorAll("input, select");
          const params = new URLSearchParams();
          params.set("calc", id);
          inputs.forEach((inp) => {
            if (inp.id && inp.value) params.set(inp.id, inp.value);
          });
          const url =
            window.location.origin +
            window.location.pathname +
            "?" +
            params.toString();
          navigator.clipboard.writeText(url).then(() => {
            shareBtn.innerHTML = "✅ تم نسخ الرابط!";
            shareBtn.classList.add("shared");
            setTimeout(() => {
              shareBtn.innerHTML = "🔗 مشاركة";
              shareBtn.classList.remove("shared");
            }, 2000);
          });
        };
        r.appendChild(shareBtn);
      }
    });
  }, 100);
};

// ── 3. CHARTS ──
window.drawMortgageChart = function () {
  const container = document.getElementById("mortgage-chart");
  if (!container) return;
  let canvas = container.querySelector("canvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    container.appendChild(canvas);
  }
  canvas.width = container.clientWidth - 20;
  canvas.height = 200;
  const ctx = canvas.getContext("2d");
  const principal =
    parseFloat(document.getElementById("mort-principal")?.value) || 300000;
  const rate =
    (parseFloat(document.getElementById("mort-rate")?.value) || 6) / 100 / 12;
  const years = parseFloat(document.getElementById("mort-years")?.value) || 30;
  const n = years * 12;
  const payment =
    (principal * (rate * Math.pow(1 + rate, n))) / (Math.pow(1 + rate, n) - 1);
  let balance = principal;
  const balances = [];
  for (let i = 0; i <= n; i += Math.max(1, Math.floor(n / 50))) {
    balances.push(balance);
    for (let j = 0; j < Math.max(1, Math.floor(n / 50)) && balance > 0; j++) {
      balance = Math.max(0, balance - (payment - balance * rate));
    }
  }
  const w = canvas.width;
  const h = canvas.height - 20;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.strokeStyle = "#6C63FF";
  ctx.lineWidth = 2;
  balances.forEach((b, i) => {
    const x = (i / (balances.length - 1)) * w;
    const y = h - (b / principal) * h;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fillStyle = "rgba(108,99,255,0.1)";
  ctx.fill();
  ctx.fillStyle = "#8888a0";
  ctx.font = "10px IBM Plex Sans Arabic";
  ctx.fillText("سنة 0", 2, h + 14);
  ctx.fillText("سنة " + years, w - 50, h + 14);
};

window.drawCompoundChart = function () {
  const container = document.getElementById("compound-chart");
  if (!container) return;
  let canvas = container.querySelector("canvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    container.appendChild(canvas);
  }
  canvas.width = container.clientWidth - 20;
  canvas.height = 200;
  const ctx = canvas.getContext("2d");
  const init =
    parseFloat(document.getElementById("ci-principal")?.value) || 10000;
  const rate =
    (parseFloat(document.getElementById("ci-rate")?.value) || 7) / 100;
  const years = parseFloat(document.getElementById("ci-years")?.value) || 10;
  const monthly =
    parseFloat(document.getElementById("ci-monthly")?.value) || 200;
  const points = [];
  for (let y = 0; y <= years; y++) {
    let val = init * Math.pow(1 + rate, y);
    if (monthly > 0) val += monthly * 12 * ((Math.pow(1 + rate, y) - 1) / rate);
    points.push(val);
  }
  const maxVal = points[points.length - 1] || 1;
  const w = canvas.width;
  const h = canvas.height - 20;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, "rgba(0,212,170,0.3)");
  grad.addColorStop(1, "rgba(0,212,170,0.02)");
  ctx.beginPath();
  ctx.strokeStyle = "#00D4AA";
  ctx.lineWidth = 2;
  points.forEach((v, i) => {
    const x = (i / years) * w;
    const y = h - (v / maxVal) * h;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.fillStyle = "#8888a0";
  ctx.font = "10px IBM Plex Sans Arabic";
  ctx.fillText("سنة 0", 2, h + 14);
  ctx.fillText("سنة " + years, w - 50, h + 14);
};

window.drawBMIChart = function (bmi) {
  const container = document.getElementById("bmi-chart");
  if (!container) return;
  let canvas = container.querySelector("canvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    container.appendChild(canvas);
  }
  canvas.width = container.clientWidth - 20;
  canvas.height = 60;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = 30;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const zones = [
    { min: 15, max: 18.5, color: "#42A5F5", label: "نقص" },
    { min: 18.5, max: 25, color: "#00D4AA", label: "طبيعي" },
    { min: 25, max: 30, color: "#FFD93D", label: "زيادة" },
    { min: 30, max: 40, color: "#FF6B9D", label: "سمنة" },
  ];
  zones.forEach((z) => {
    const x1 = ((z.min - 15) / 25) * w;
    const x2 = ((z.max - 15) / 25) * w;
    ctx.fillStyle = z.color;
    ctx.globalAlpha = 0.3;
    ctx.fillRect(x1, 5, x2 - x1, h);
    ctx.globalAlpha = 1;
    ctx.fillStyle = z.color;
    ctx.font = "9px IBM Plex Sans Arabic";
    ctx.fillText(z.label, x1 + 4, h + 18);
  });
  const markerX = Math.min(w, Math.max(0, ((bmi - 15) / 25) * w));
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(markerX, 5 + h / 2, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#6C63FF";
  ctx.beginPath();
  ctx.arc(markerX, 5 + h / 2, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#e8e8f0";
  ctx.font = "bold 10px IBM Plex Sans Arabic";
  ctx.fillText(bmi.toFixed(1), markerX - 10, h + 30);
};

// ── 4. PWA ──
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => { });
}

// ── 5. FAVORITES ──
window.cwFavorites = JSON.parse(localStorage.getItem("cw-favorites") || "[]");
window.toggleFavorite = function (calcId, e) {
  if (e) e.stopPropagation();
  const idx = cwFavorites.indexOf(calcId);
  if (idx > -1) cwFavorites.splice(idx, 1);
  else cwFavorites.push(calcId);
  localStorage.setItem("cw-favorites", JSON.stringify(cwFavorites));
  renderFavorites();
  document.querySelectorAll(".fav-star").forEach((s) => {
    s.classList.toggle("active", cwFavorites.includes(s.dataset.calc));
    s.textContent = cwFavorites.includes(s.dataset.calc) ? "⭐" : "☆";
  });
};
function renderFavorites() {
  const section = document.getElementById("fav-section");
  if (!section) return;
  const grid = section.querySelector(".fav-grid");
  if (cwFavorites.length === 0) {
    section.classList.remove("has-favs");
    return;
  }
  section.classList.add("has-favs");
  grid.innerHTML = "";
  cwFavorites.forEach((id) => {
    const card = document.querySelector(`.calc-card[onclick*="${id}"]`);
    if (!card) return;
    const name = card.querySelector("h3")?.textContent || id;
    const emoji = card.querySelector(".card-emoji")?.textContent || "🧮";
    const chip = document.createElement("div");
    chip.className = "fav-chip";
    chip.textContent = emoji + " " + name;
    chip.onclick = () => openCalc(id);
    grid.appendChild(chip);
  });
}
(function initFavorites() {
  const firstSection = document.querySelector(".section-title");
  if (firstSection) {
    const favSection = document.createElement("div");
    favSection.id = "fav-section";
    favSection.className = "fav-section";
    favSection.innerHTML = '<h3>⭐ المفضلة</h3><div class="fav-grid"></div>';
    firstSection.parentElement.insertBefore(favSection, firstSection);
  }
  document.querySelectorAll(".calc-card").forEach((card) => {
    const onclick = card.getAttribute("onclick") || "";
    const match = onclick.match(/openCalc\('([^']+)'\)/);
    if (!match) return;
    const calcId = match[1];
    const star = document.createElement("button");
    star.className =
      "fav-star" + (cwFavorites.includes(calcId) ? " active" : "");
    star.dataset.calc = calcId;
    star.textContent = cwFavorites.includes(calcId) ? "⭐" : "☆";
    star.onclick = function (e) {
      toggleFavorite(calcId, e);
    };
    card.style.position = "relative";
    card.appendChild(star);
  });
  renderFavorites();
})();

// ── 6. SHARE URL AUTO-OPEN ──
(function checkShareURL() {
  const params = new URLSearchParams(window.location.search);
  const calcId = params.get("calc");
  if (calcId) {
    setTimeout(() => {
      openCalc(calcId);
      setTimeout(() => {
        params.forEach((val, key) => {
          if (key === "calc") return;
          const el = document.getElementById(key);
          if (el) {
            el.value = val;
            el.dispatchEvent(new Event("input"));
          }
        });
        setTimeout(() => {
          const btn = document.querySelector("#modal-overlay .calc-btn");
          if (btn) btn.click();
        }, 200);
      }, 200);
    }, 500);
  }
})();

// ═══ NEW FEATURES (Arabic mirror) ═══

// ═══ NEW FEATURES (Arabic mirror) ═══

// Mobile hamburger menu
window.toggleMobileMenu = function () {
  const menu = document.getElementById("mobile-menu");
  const btn = document.getElementById("hamburger-btn");
  menu.classList.toggle("open");
  btn.textContent = menu.classList.contains("open") ? "✕" : "☰";
};
window.closeMobileMenu = function () {
  const menu = document.getElementById("mobile-menu");
  const btn = document.getElementById("hamburger-btn");
  if (menu) {
    menu.classList.remove("open");
    btn.textContent = "☰";
  }
};

// Back to top
(function () {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;
  window.addEventListener(
    "scroll",
    function () {
      btn.classList.toggle("visible", window.pageYOffset > 500);
    },
    { passive: true },
  );
})();

// Keyboard shortcuts
document.addEventListener("keydown", function (e) {
  if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
    const active = document.activeElement;
    const isInput =
      active &&
      (active.tagName === "INPUT" ||
        active.tagName === "TEXTAREA" ||
        active.tagName === "SELECT");
    if (!isInput) {
      e.preventDefault();
      document.getElementById("global-search")?.focus();
    }
  }
  if (e.key === "Escape") {
    const modal = document.getElementById("modal-overlay");
    if (modal && modal.classList.contains("open")) {
      closeModal();
      return;
    }
    closeMobileMenu();
  }
});

// Accessibility: keyboard nav for calc cards
document.querySelectorAll(".calc-card").forEach(function (card) {
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.click();
    }
  });
});

// Calculator history
window.cwHistory = JSON.parse(localStorage.getItem("cw-history") || "[]");
window.saveHistory = function (calcId, icon, summary) {
  cwHistory = cwHistory.filter((h) => h.id !== calcId);
  cwHistory.unshift({ id: calcId, icon, summary, time: Date.now() });
  if (cwHistory.length > 10) cwHistory = cwHistory.slice(0, 10);
  localStorage.setItem("cw-history", JSON.stringify(cwHistory));
  renderHistory();
};
function renderHistory() {
  const section = document.getElementById("history-section");
  if (!section) return;
  const list = section.querySelector(".history-list");
  if (cwHistory.length === 0) {
    section.classList.remove("has-history");
    return;
  }
  section.classList.add("has-history");
  list.innerHTML = "";
  cwHistory.slice(0, 5).forEach(function (h) {
    const item = document.createElement("div");
    item.className = "history-item";
    item.onclick = function () {
      openCalc(h.id);
    };
    const diff = Date.now() - h.time;
    const mins = Math.floor(diff / 60000);
    let ago = "الآن";
    if (mins >= 1 && mins < 60) ago = mins + " دقيقة";
    else if (mins >= 60 && mins < 1440) ago = Math.floor(mins / 60) + " ساعة";
    else if (mins >= 1440) ago = Math.floor(mins / 1440) + " يوم";
    item.innerHTML =
      '<span class="history-item-icon">' +
      h.icon +
      '</span><span class="history-item-text">' +
      h.summary +
      '</span><span class="history-item-time">' +
      ago +
      "</span>";
    list.appendChild(item);
  });
}
window.clearHistory = function () {
  cwHistory = [];
  localStorage.removeItem("cw-history");
  renderHistory();
};
(function initHistory() {
  const mainContent = document.querySelector(".main-content");
  if (!mainContent) return;
  const catTabs = mainContent.querySelector(".cat-tabs");
  const histSection = document.createElement("div");
  histSection.id = "history-section";
  histSection.className = "history-section";
  histSection.innerHTML =
    '<div class="history-header"><h3>🕐 الحسابات الأخيرة</h3><button class="history-clear-btn" onclick="clearHistory()">مسح</button></div><div class="history-list"></div>';
  if (catTabs)
    catTabs.parentNode.insertBefore(histSection, catTabs.nextSibling);
  renderHistory();
})();

// Hook history into calculators
const calcHistoryHooks = {
  calcLoan: {
    id: "loan",
    icon: "💳",
    resultEl: "r-l-monthly",
    prefix: "القرض: ",
  },
  calcCompound: {
    id: "compound",
    icon: "📈",
    resultEl: "r-ci-final",
    prefix: "الفائدة: ",
  },
  calcTip: {
    id: "tip",
    icon: "🍽️",
    resultEl: "r-t-total",
    prefix: "إكرامية: ",
  },
  calcBMI: { id: "bmi", icon: "⚖️", resultEl: "r-bmi-val", prefix: "BMI: " },
  calcCalories: {
    id: "calories",
    icon: "🔥",
    resultEl: "r-cal-target",
    prefix: "سعرات: ",
  },
  calcMortgage: {
    id: "mortgage",
    icon: "🏠",
    resultEl: "r-m-monthly",
    prefix: "رهن: ",
  },
  calcSalary: {
    id: "salary",
    icon: "💼",
    resultEl: "r-sal-year",
    prefix: "الراتب: ",
  },
  calcBodyFat: {
    id: "bodyfat",
    icon: "💪",
    resultEl: "r-bf-pct",
    prefix: "الدهون: ",
  },
  calcMacros: {
    id: "macros",
    icon: "🥗",
    resultEl: "r-mac-protein",
    prefix: "بروتين: ",
  },
  calcROI: { id: "roi", icon: "📊", resultEl: "r-roi-pct", prefix: "العائد: " },
  calcCreditCard: {
    id: "creditcard",
    icon: "💳",
    resultEl: "r-cc-months",
    prefix: "السداد: ",
  },
  calcWaterAR: {
    id: "water",
    icon: "💧",
    resultEl: "r-wat-liters",
    prefix: "الماء: ",
  },
  calcPregnancy: {
    id: "pregnancy",
    icon: "🤰",
    resultEl: "r-preg-edd",
    prefix: "موعد الولادة: ",
  },
  calcHeartRate: {
    id: "heartrate",
    icon: "❤️",
    resultEl: "r-hr-max",
    prefix: "نبضات القلب: ",
  },
  calcIdealWeight: {
    id: "idealweight",
    icon: "🎯",
    resultEl: "r-iw-primary",
    prefix: "الوزن المثالي: ",
  },
  calcSleep: {
    id: "sleep",
    icon: "🌙",
    resultEl: "r-slp-cycles",
    prefix: "دورات النوم",
  },
  calcDateDiff: {
    id: "datediff",
    icon: "📅",
    resultEl: "r-dd-days",
    prefix: "فرق التاريخ: ",
  },
  calcTax: {
    id: "tax",
    icon: "🧾",
    resultEl: "r-tax-total",
    prefix: "الضريبة: ",
  },
  calcInflation: {
    id: "inflation",
    icon: "📉",
    resultEl: "r-inf-value",
    prefix: "القيمة المستقبلية: ",
  },
  calcRetirement: {
    id: "retirement",
    icon: "🏖️",
    resultEl: "ret-r-nest",
    prefix: "التقاعد: ",
  },
  convertCurrency: {
    id: "currency",
    icon: "💱",
    resultEl: "cur-r-main",
    prefix: "العملة: ",
  },
  calcRandom: {
    id: "random",
    icon: "🎲",
    resultEl: "r-rng-numbers",
    prefix: "عشوائي: ",
  },
  calcPace: {
    id: "pace",
    icon: "🏃",
    resultEl: "r-pace-result",
    prefix: "الإيقاع: ",
  },
  calcGeometry: {
    id: "geometry",
    icon: "📐",
    resultEl: "r-geo-area",
    prefix: "المساحة: ",
  },
  calcProbability: {
    id: "probability",
    icon: "🎰",
    resultEl: "r-prob-main",
    prefix: "الاحتمال: ",
  },
  calcQuadratic: {
    id: "quadratic",
    icon: "📏",
    resultEl: "r-quad-roots",
    prefix: "الجذور: ",
  },
  calcBase: {
    id: "base",
    icon: "🔢",
    resultEl: "r-base-dec",
    prefix: "تحويل: ",
  },
  calcSpeed: {
    id: "speed",
    icon: "🚀",
    resultEl: "r-spd-val",
    prefix: "السرعة: ",
  },
  calcTimezone: {
    id: "timezone",
    icon: "🌍",
    resultEl: "r-tz-val",
    prefix: "الوقت: ",
  },
  calcCooking: {
    id: "cooking",
    icon: "👨‍🍳",
    resultEl: "r-cook-val",
    prefix: "القياس: ",
  },
  calcUnits: {
    id: "units",
    icon: "📏",
    resultEl: "r-unit-result",
    prefix: "التحويل: ",
  },
  calcAge: {
    id: "age",
    icon: "🎂",
    resultEl: "r-age-years",
    prefix: "العمر: ",
  },
  calcGPA: { id: "gpa", icon: "🎓", resultEl: "r-gpa-val", prefix: "المعدل: " },
  calcFuelAR: {
    id: "fuel",
    icon: "⛽",
    resultEl: "r-fuel-cost",
    prefix: "الوقود: ",
  },
  calcPct1: {
    id: "percentage",
    icon: "➗",
    resultEl: "r-p1",
    prefix: "النسبة: ",
  },
  calcPct2: {
    id: "percentage",
    icon: "➗",
    resultEl: "r-p2",
    prefix: "النسبة: ",
  },
  calcPct3: {
    id: "percentage",
    icon: "➗",
    resultEl: "r-p3",
    prefix: "التغيير: ",
  },
};
Object.entries(calcHistoryHooks).forEach(function ([fnName, cfg]) {
  const orig = window[fnName];
  if (typeof orig === "function") {
    window[fnName] = function () {
      orig.apply(this, arguments);
      const el = document.getElementById(cfg.resultEl);
      if (el) {
        const val = el.textContent;
        if (val && val !== "0" && val !== "$0" && val !== "—")
          saveHistory(cfg.id, cfg.icon, cfg.prefix + val);
      }
    };
  }
});

// ═══════════════════════════════════════════
//  GLOBAL EVENT DELEGATION
// ═══════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
  // Global search input
  const searchInput = document.getElementById("global-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      if (typeof searchCalcs === "function") searchCalcs(e.target.value);
    });
  }

  // Handle generalized actions (clicks)
  document.addEventListener("click", (e) => {
    // 1. Calculators opening
    const calcCard = e.target.closest("[data-calc-id]");
    if (calcCard) {
      // Don't follow real links if wrapped in a tag
      e.preventDefault();

      // a11y: remember what opened the modal to restore focus later
      window.lastActiveTrigger = calcCard;

      const calcId = calcCard.dataset.calcId;
      if (typeof openCalc === "function") openCalc(calcId);
      return;
    }

    // 2. Category filtering
    const catTab = e.target.closest("[data-filter-cat]");
    if (catTab) {
      e.preventDefault();
      if (typeof filterCat === "function") filterCat(catTab.dataset.filterCat);
      return;
    }

    // 3. Actions (buttons inside modals, theme toggle, etc.)
    const actionBtn = e.target.closest("[data-action]");
    if (actionBtn) {
      const action = actionBtn.dataset.action;

      if (action === "toggleTheme") {
        if (typeof toggleTheme === "function") toggleTheme();
      } else if (action === "toggleMobileMenu") {
        if (typeof toggleMobileMenu === "function") toggleMobileMenu();
      } else if (action === "closeModal") {
        if (typeof closeModal === "function") closeModal();
      } else if (action === "calcMortgageCompare") {
        if (typeof calcMortgageCompare === "function") calcMortgageCompare();
      } else if (action.startsWith("scrollToSection(")) {
        const match = action.match(/scrollToSection\('([^']+)'\)/);
        if (match && typeof scrollToSection === "function") {
          scrollToSection(match[1]);
        }
      } else if (action.startsWith("filterCat(")) {
        const match = action.match(/filterCat\('([^']+)'\)/);
        if (match && typeof filterCat === "function") {
          filterCat(match[1]);
        }
        if (
          action.includes("closeMobileMenu") &&
          typeof closeMobileMenu === "function"
        ) {
          closeMobileMenu();
        }
      } else if (action.startsWith("sciKey(")) {
        const match = action.match(/sciKey\('([^']+)'\)/);
        if (match && typeof sciKey === "function") {
          sciKey(match[1]);
        }
      } else {
        // Assume it's a global calculator function (e.g., calcMortgage)
        if (typeof window[action] === "function") {
          window[action]();
        }
      }
    }
  });

  // Global change logic (for selects like mortgage term)
  document.addEventListener("change", (e) => {
    const changeEl = e.target.closest("[data-change]");
    if (changeEl) {
      const funcName = changeEl.dataset.change;
      if (typeof window[funcName] === "function") {
        window[funcName]();
      }
    }
  });
});


// ═══════════════════════════════════════════
//  ACCESSIBILITY (FOCUS TRAP)
// ═══════════════════════════════════════════
function trapFocus(element) {
  const focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), input[type="number"]:not([disabled])');

  if (focusableEls.length === 0) return;

  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];

  element.addEventListener('keydown', function (e) {
    const isTabPressed = (e.key === 'Tab' || e.keyCode === 9);

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) /* shift + tab */ {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        e.preventDefault();
      }
    } else /* tab */ {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    }
  });
}

// Attach focus trap to modal
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  if (modal) {
    trapFocus(modal);
  }
});

// ═══════════════════════════════════════════
//  COUNTDOWN CALCULATOR (Arabic)
// ═══════════════════════════════════════════
function initCountdown() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateEl = document.getElementById('cd-date');
  if (dateEl && !dateEl.value) {
    dateEl.value = tomorrow.toISOString().split('T')[0];
  }
}

function resetCountdown() {
  if (window._countdownInterval) {
    clearInterval(window._countdownInterval);
    window._countdownInterval = null;
  }
  updateDigital(0, 0, 0, 0);
  updateAnalog(0, 0, 0);
  updateAnalogReadout(0, 0, 0, 0);
  const statusEl = document.getElementById('cd-status');
  if (statusEl) { statusEl.textContent = ''; statusEl.className = 'countdown-status'; }
  const progressWrap = document.getElementById('cd-progress-wrap');
  if (progressWrap) progressWrap.style.display = 'none';
  const fill = document.getElementById('cd-progress-fill');
  if (fill) fill.style.width = '0%';
  const pctEl = document.getElementById('cd-progress-pct');
  if (pctEl) pctEl.textContent = '0%';
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateEl = document.getElementById('cd-date');
  if (dateEl) dateEl.value = tomorrow.toISOString().split('T')[0];
  const timeEl = document.getElementById('cd-time');
  if (timeEl) timeEl.value = '00:00';
}

function setCountdownMode(mode) {
  const digitalBtn = document.getElementById('cd-mode-digital');
  const analogBtn = document.getElementById('cd-mode-analog');
  const digitalDisplay = document.getElementById('cd-display-digital');
  const analogDisplay = document.getElementById('cd-display-analog');
  if (!digitalBtn || !analogBtn) return;

  if (mode === 'digital') {
    digitalBtn.classList.add('active');
    analogBtn.classList.remove('active');
    if (digitalDisplay) digitalDisplay.style.display = '';
    if (analogDisplay) analogDisplay.style.display = 'none';
  } else {
    analogBtn.classList.add('active');
    digitalBtn.classList.remove('active');
    if (digitalDisplay) digitalDisplay.style.display = 'none';
    if (analogDisplay) analogDisplay.style.display = '';
  }
}

function startCountdown() {
  const dateVal = document.getElementById('cd-date')?.value;
  const timeVal = document.getElementById('cd-time')?.value || '00:00';
  if (!dateVal) return;

  const target = new Date(dateVal + 'T' + timeVal + ':00');
  if (isNaN(target.getTime())) return;

  const startTime = Date.now();
  const totalDuration = target.getTime() - startTime;

  if (window._countdownInterval) {
    clearInterval(window._countdownInterval);
  }

  const statusEl = document.getElementById('cd-status');
  const progressWrap = document.getElementById('cd-progress-wrap');
  if (progressWrap) progressWrap.style.display = '';

  function tick() {
    const now = Date.now();
    const diff = target.getTime() - now;

    if (diff <= 0) {
      clearInterval(window._countdownInterval);
      window._countdownInterval = null;
      updateDigital(0, 0, 0, 0);
      updateAnalog(0, 0, 0);
      updateAnalogReadout(0, 0, 0, 0);
      updateProgress(100);
      if (statusEl) {
        statusEl.textContent = '🎉 انتهى الوقت!';
        statusEl.className = 'countdown-status finished';
      }
      return;
    }

    const totalSecs = Math.floor(diff / 1000);
    const days = Math.floor(totalSecs / 86400);
    const hours = Math.floor((totalSecs % 86400) / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;

    updateDigital(days, hours, mins, secs);
    updateAnalog(hours, mins, secs);
    updateAnalogReadout(days, hours, mins, secs);

    if (totalDuration > 0) {
      const elapsed = now - startTime;
      const pct = Math.min(100, (elapsed / totalDuration) * 100);
      updateProgress(pct);
    }

    if (statusEl) {
      statusEl.textContent = '⏱ جاري العد التنازلي...';
      statusEl.className = 'countdown-status';
    }
  }

  tick();
  window._countdownInterval = setInterval(tick, 1000);
}

function updateDigital(d, h, m, s) {
  const pad = (n) => String(n).padStart(2, '0');
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el && el.textContent !== val) {
      el.textContent = val;
      el.classList.remove('pulse');
      void el.offsetWidth;
      el.classList.add('pulse');
    }
  };
  setVal('cd-days', pad(d));
  setVal('cd-hours', pad(h));
  setVal('cd-mins', pad(m));
  setVal('cd-secs', pad(s));
}

function updateAnalog(h, m, s) {
  const hourHand = document.getElementById('cd-hand-hour');
  const minHand = document.getElementById('cd-hand-min');
  const secHand = document.getElementById('cd-hand-sec');
  const ring = document.getElementById('cd-progress-ring');

  if (hourHand) {
    const hourDeg = ((h % 12) / 12) * 360 + (m / 60) * 30;
    hourHand.setAttribute('transform', `rotate(${hourDeg} 100 100)`);
  }
  if (minHand) {
    const minDeg = (m / 60) * 360 + (s / 60) * 6;
    minHand.setAttribute('transform', `rotate(${minDeg} 100 100)`);
  }
  if (secHand) {
    const secDeg = (s / 60) * 360;
    secHand.setAttribute('transform', `rotate(${secDeg} 100 100)`);
  }
  if (ring) {
    const circumference = 597;
    const offset = circumference - (s / 60) * circumference;
    ring.setAttribute('stroke-dashoffset', offset);
  }
}

function updateAnalogReadout(d, h, m, s) {
  const pad = (n) => String(n).padStart(2, '0');
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('cd-analog-days', d);
  set('cd-analog-hours', pad(h));
  set('cd-analog-mins', pad(m));
  set('cd-analog-secs', pad(s));
}

function updateProgress(pct) {
  const fill = document.getElementById('cd-progress-fill');
  const pctEl = document.getElementById('cd-progress-pct');
  if (fill) fill.style.width = pct.toFixed(1) + '%';
  if (pctEl) pctEl.textContent = pct.toFixed(1) + '%';
}

// ═══════════════════════════════════════════
//  تحويل التاريخ هجري ↔ ميلادي
// ═══════════════════════════════════════════
function _gToJDN(y, m, d) {
  const a = Math.floor((14 - m) / 12);
  const yr = y + 4800 - a;
  const mo = m + 12 * a - 3;
  return d + Math.floor((153 * mo + 2) / 5) + 365 * yr +
    Math.floor(yr / 4) - Math.floor(yr / 100) + Math.floor(yr / 400) - 32045;
}
function _jdnToG(jdn) {
  const a = jdn + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor((146097 * b) / 4);
  const d2 = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d2) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  return { d: e - Math.floor((153 * m + 2) / 5) + 1, m: m + 3 - 12 * Math.floor(m / 10), y: 100 * b + d2 - 4800 + Math.floor(m / 10) };
}
function _jdnToH(jdn) {
  const z = jdn - 1948440 + 10632;
  const n = Math.floor((z - 1) / 10631);
  const z2 = z - 10631 * n + 354;
  const j = Math.floor((10985 - z2) / 5316) * Math.floor((50 * z2) / 17719) +
    Math.floor(z2 / 5670) * Math.floor((43 * z2) / 15238);
  const z3 = z2 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const month = Math.floor((24 * z3) / 709);
  return { d: z3 - Math.floor((709 * month) / 24), m: month, y: 30 * n + j - 30 };
}
function _hToJDN(hy, hm, hd) {
  return Math.floor((11 * hy + 3) / 30) + 354 * hy + 30 * hm -
    Math.floor((hm - 1) / 2) + hd + 1948440 - 385;
}

let _intlHijriFormatter = null;
function _getHijriFormatter() {
  if (_intlHijriFormatter) return _intlHijriFormatter;
  try {
    const f = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC'
    });
    const parts = f.formatToParts(new Date(Date.UTC(2000, 0, 1)));
    const y = parseInt(parts.find(p => p.type === 'year')?.value);
    if (y === 1420) { _intlHijriFormatter = f; return f; }
  } catch (e) { }
  return null;
}

function gregorianToHijri(gy, gm, gd) {
  const fmt = _getHijriFormatter();
  if (fmt) {
    try {
      const parts = fmt.formatToParts(new Date(Date.UTC(gy, gm - 1, gd)));
      return {
        y: parseInt(parts.find(p => p.type === 'year').value),
        m: parseInt(parts.find(p => p.type === 'month').value),
        d: parseInt(parts.find(p => p.type === 'day').value)
      };
    } catch (e) { }
  }
  return _jdnToH(_gToJDN(gy, gm, gd));
}

function hijriToGregorian(hy, hm, hd) {
  const fmt = _getHijriFormatter();
  if (fmt) {
    const approxJdn = Math.floor((11 * hy + 3) / 30) + 354 * hy + 30 * hm -
      Math.floor((hm - 1) / 2) + hd + 1948440 - 385;
    const approx = _jdnToG(approxJdn);
    const approxMs = Date.UTC(approx.y, approx.m - 1, approx.d);
    for (let delta = -3; delta <= 3; delta++) {
      const testDate = new Date(approxMs + delta * 86400000);
      const check = gregorianToHijri(testDate.getUTCFullYear(), testDate.getUTCMonth() + 1, testDate.getUTCDate());
      if (check.y === hy && check.m === hm && check.d === hd) {
        return { y: testDate.getUTCFullYear(), m: testDate.getUTCMonth() + 1, d: testDate.getUTCDate() };
      }
    }
  }
  return _jdnToG(_hToJDN(hy, hm, hd));
}

function _populateDays(selectId, count) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  const cur = parseInt(sel.value) || 1;
  sel.innerHTML = '';
  for (let i = 1; i <= count; i++) {
    const o = document.createElement('option');
    o.value = i; o.textContent = i;
    if (i === cur) o.selected = true;
    sel.appendChild(o);
  }
}

function initHijri() {
  const now = new Date();
  _populateDays('hg-day', 31);
  const gDay = document.getElementById('hg-day');
  const gMonth = document.getElementById('hg-month');
  const gYear = document.getElementById('hg-year');
  if (gDay) gDay.value = now.getDate();
  if (gMonth) gMonth.value = now.getMonth() + 1;
  if (gYear) gYear.value = now.getFullYear();
  _populateDays('hh-day', 30);
  const todayH = gregorianToHijri(now.getFullYear(), now.getMonth() + 1, now.getDate());
  const hDay = document.getElementById('hh-day');
  const hMonth = document.getElementById('hh-month');
  const hYear = document.getElementById('hh-year');
  if (hDay) hDay.value = todayH.d;
  if (hMonth) hMonth.value = todayH.m;
  if (hYear) hYear.value = todayH.y;
  window._hijriDirection = 'g2h';
}

function setHijriDirection(dir) {
  window._hijriDirection = dir;
  const g2hBtn = document.getElementById('hd-g2h');
  const h2gBtn = document.getElementById('hd-h2g');
  const panelG2H = document.getElementById('hijri-panel-g2h');
  const panelH2G = document.getElementById('hijri-panel-h2g');
  if (!g2hBtn) return;
  if (dir === 'g2h') {
    g2hBtn.classList.add('active'); h2gBtn.classList.remove('active');
    panelG2H.style.display = ''; panelH2G.style.display = 'none';
  } else {
    h2gBtn.classList.add('active'); g2hBtn.classList.remove('active');
    panelH2G.style.display = ''; panelG2H.style.display = 'none';
  }
  const res = document.getElementById('hijri-result');
  const cals = document.getElementById('hijri-calendars');
  const evts = document.getElementById('hijri-events-wrap');
  if (res) res.style.display = 'none';
  if (cals) cals.style.display = 'none';
  if (evts) evts.style.display = 'none';
}

const HIJRI_MONTHS_AR = ['', 'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني',
  'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];
const GREG_MONTHS_AR = ['', 'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
const DAYS_AR = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

function convertHijri() {
  const dir = window._hijriDirection || 'g2h';
  let gDate, hDate;
  if (dir === 'g2h') {
    const gy = parseInt(document.getElementById('hg-year')?.value);
    const gm = parseInt(document.getElementById('hg-month')?.value);
    const gd = parseInt(document.getElementById('hg-day')?.value);
    if (!gy || !gm || !gd || gy < 1900 || gy > 2100) { alert('يرجى إدخال تاريخ ميلادي صحيح.'); return; }
    hDate = gregorianToHijri(gy, gm, gd);
    gDate = { y: gy, m: gm, d: gd };
    const dayName = DAYS_AR[new Date(Date.UTC(gy, gm - 1, gd)).getUTCDay()];
    const lbl = document.getElementById('hijri-result-label');
    const main = document.getElementById('hijri-result-main');
    const sub = document.getElementById('hijri-result-sub');
    if (lbl) lbl.textContent = 'التاريخ الهجري';
    if (main) main.textContent = `${hDate.d} ${HIJRI_MONTHS_AR[hDate.m]} ${hDate.y} هـ`;
    if (sub) sub.textContent = `${dayName} · ${gd} ${GREG_MONTHS_AR[gm]} ${gy}`;
  } else {
    const hy = parseInt(document.getElementById('hh-year')?.value);
    const hm = parseInt(document.getElementById('hh-month')?.value);
    const hd = parseInt(document.getElementById('hh-day')?.value);
    if (!hy || !hm || !hd || hy < 1200 || hy > 1600) { alert('يرجى إدخال تاريخ هجري صحيح.'); return; }
    gDate = hijriToGregorian(hy, hm, hd);
    hDate = { y: hy, m: hm, d: hd };
    const dayName = DAYS_AR[new Date(Date.UTC(gDate.y, gDate.m - 1, gDate.d)).getUTCDay()];
    const lbl = document.getElementById('hijri-result-label');
    const main = document.getElementById('hijri-result-main');
    const sub = document.getElementById('hijri-result-sub');
    if (lbl) lbl.textContent = 'التاريخ الميلادي';
    if (main) main.textContent = `${dayName}، ${gDate.d} ${GREG_MONTHS_AR[gDate.m]} ${gDate.y}`;
    if (sub) sub.textContent = `الهجري: ${hDate.d} ${HIJRI_MONTHS_AR[hDate.m]} ${hDate.y} هـ`;
  }
  const res = document.getElementById('hijri-result');
  if (res) { res.style.display = ''; res.style.animation = 'none'; void res.offsetWidth; res.style.animation = ''; }
  renderHijriCalendar(gDate, hDate);
  showHistoricalEvents(gDate);
}

function renderHijriCalendar(gDate, hDate) {
  const cals = document.getElementById('hijri-calendars');
  if (!cals) return;
  cals.style.display = '';
  const today = new Date();
  const todayY = today.getFullYear(), todayM = today.getMonth() + 1, todayD = today.getDate();
  const gregTitle = document.getElementById('hijri-greg-title');
  const gregGrid = document.getElementById('hijri-greg-grid');
  if (gregTitle) gregTitle.textContent = `${GREG_MONTHS_AR[gDate.m]} ${gDate.y}`;
  if (gregGrid) {
    gregGrid.innerHTML = '';
    const firstDay = new Date(gDate.y, gDate.m - 1, 1).getDay();
    const daysInMonth = new Date(gDate.y, gDate.m, 0).getDate();
    for (let i = 0; i < firstDay; i++) { const c = document.createElement('div'); c.className = 'hijri-cal-cell empty'; gregGrid.appendChild(c); }
    for (let d = 1; d <= daysInMonth; d++) {
      const cell = document.createElement('div');
      let cls = 'hijri-cal-cell';
      if (d === gDate.d) cls += ' selected';
      else if (d === todayD && gDate.m === todayM && gDate.y === todayY) cls += ' today';
      const dow = new Date(gDate.y, gDate.m - 1, d).getDay();
      if (dow === 0 || dow === 6) cls += ' weekend';
      cell.className = cls; cell.textContent = d; gregGrid.appendChild(cell);
    }
  }
  const hijrTitle = document.getElementById('hijri-hijr-title');
  const hijrGrid = document.getElementById('hijri-hijr-grid');
  if (hijrTitle) hijrTitle.textContent = `${HIJRI_MONTHS_AR[hDate.m]} ${hDate.y} هـ`;
  if (hijrGrid) {
    hijrGrid.innerHTML = '';
    const firstGOf1st = hijriToGregorian(hDate.y, hDate.m, 1);
    const firstDow = new Date(firstGOf1st.y, firstGOf1st.m - 1, firstGOf1st.d).getDay();
    const hijriMonthLen = _hijriMonthLengthAr(hDate.y, hDate.m);
    for (let i = 0; i < firstDow; i++) { const c = document.createElement('div'); c.className = 'hijri-cal-cell empty'; hijrGrid.appendChild(c); }
    for (let d = 1; d <= hijriMonthLen; d++) {
      const cell = document.createElement('div');
      let cls = 'hijri-cal-cell';
      if (d === hDate.d) cls += ' selected';
      const gOfD = hijriToGregorian(hDate.y, hDate.m, d);
      const dow = new Date(gOfD.y, gOfD.m - 1, gOfD.d).getDay();
      if (dow === 5 || dow === 6) cls += ' weekend';
      cell.className = cls; cell.textContent = d; hijrGrid.appendChild(cell);
    }
  }
}

function _hijriMonthLengthAr(hy, hm) {
  try {
    const nextHy = hm === 12 ? hy + 1 : hy;
    const nextHm = hm === 12 ? 1 : hm + 1;
    const g1 = hijriToGregorian(hy, hm, 1);
    const g2 = hijriToGregorian(nextHy, nextHm, 1);
    const ms1 = Date.UTC(g1.y, g1.m - 1, g1.d);
    const ms2 = Date.UTC(g2.y, g2.m - 1, g2.d);
    const len = Math.round((ms2 - ms1) / 86400000);
    if (len === 29 || len === 30) return len;
  } catch (e) { }
  if (hm % 2 === 1) return 30;
  if (hm === 12) { const leap = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29]; return leap.includes(((hy % 30) + 30) % 30) ? 30 : 29; }
  return 29;
}

const HIJRI_EVENTS_AR = {
  '01-01': [{ y: '1492', e: 'كريستوفر كولومبوس يصل إلى الأمريكتين.' }, { y: '1801', e: 'إعلان المملكة المتحدة لبريطانيا العظمى وإيرلندا.' }],
  '02-04': [{ y: '2004', e: 'تأسيس فيسبوك على يد مارك زوكربيرغ.' }],
  '02-12': [{ y: '1809', e: 'ميلاد تشارلز داروين وإبراهام لينكولن في نفس اليوم.' }],
  '03-14': [{ y: '1879', e: 'ميلاد ألبرت أينشتاين في أولم بألمانيا.' }],
  '04-01': [{ y: '1976', e: 'تأسيس شركة آبل على يد ستيف جوبز وستيف ووزنياك.' }],
  '04-12': [{ y: '1961', e: 'يوري غاغارين يصبح أول إنسان في الفضاء.' }],
  '04-14': [{ y: '1912', e: 'غرق سفينة تيتانيك بعد ارتطامها بجبل جليدي.' }],
  '05-14': [{ y: '1948', e: 'إعلان قيام دولة إسرائيل.' }],
  '06-06': [{ y: '1944', e: 'يوم D: حملة الإنزال الحلفاء في نورماندي (WWII).' }],
  '07-04': [{ y: '1776', e: 'توقيع إعلان استقلال الولايات المتحدة.' }, { y: '1054', e: 'مشاهدة المستعر اخلو سديم في الصين والعالم الإسلامي.' }],
  '07-16': [{ y: '622', e: 'هجرة النبي محمد من مكة إلى المدينة — بداية التقويم الهجري.' }],
  '07-20': [{ y: '1969', e: 'هبوط أبولو 11 على سطح القمر; نيل آرمسترونج يمشي على القمر.' }],
  '07-28': [{ y: '1914', e: 'بداية الحرب العالمية الأولى.' }],
  '08-06': [{ y: '1945', e: 'إلقاء القنبلة الذرية على هيروشيما.' }],
  '08-15': [{ y: '1947', e: 'استقلال الهند من بريطانيا.' }],
  '09-11': [{ y: '2001', e: 'هجمات مركز التجارة العالمي في نيويورك.' }],
  '10-04': [{ y: '1957', e: 'إطلاق سبوتنيك 1 — أول قمر صناعي.' }],
  '11-02': [{ y: '1917', e: 'وعد بلفور: بريطانيا تعد بإنشاء وطن قومي يهودي.' }],
  '11-09': [{ y: '1989', e: 'سقوط جدار برلين وتوحيد ألمانيا.' }],
  '11-11': [{ y: '1918', e: 'التوقيع على هدنة الحرب العالمية الأولى.' }],
  '12-07': [{ y: '1941', e: 'اليابان تهاجم بيرل هاربور.' }],
  '12-10': [{ y: '1948', e: 'الأمم المتحدة تعتمد الإعلان العالمي لحقوق الإنسان.' }],
  '12-17': [{ y: '1903', e: 'أخوا رايت ينجزان أول طيران بمحرك.' }],
  '12-25': [{ y: '1991', e: 'الاتحاد السوفييتي يتفكك رسمياً.' }],
};

function showHistoricalEvents(gDate) {
  const evtsWrap = document.getElementById('hijri-events-wrap');
  const evtsList = document.getElementById('hijri-events-list');
  if (!evtsWrap || !evtsList) return;
  const key = String(gDate.m).padStart(2, '0') + '-' + String(gDate.d).padStart(2, '0');
  const events = HIJRI_EVENTS_AR[key] || [];
  evtsWrap.style.display = '';
  evtsList.innerHTML = '';
  if (events.length === 0) {
    evtsList.innerHTML = '<div class="hijri-no-events">لا توجد أحداث بارزة مسجلة في هذا اليوم تحديداً.</div>';
    return;
  }
  events.forEach(ev => {
    const item = document.createElement('div');
    item.className = 'hijri-event-item';
    item.innerHTML = `<div class="hijri-event-dot"></div><div class="hijri-event-text">${ev.e}</div><div class="hijri-event-year">${ev.y}</div>`;
    evtsList.appendChild(item);
  });
}

// ═══════════════════════════════════════════
//  CALENDAR CONTRACEPTION (AR)
// ═══════════════════════════════════════════
function initContraception() {
  const today = new Date();
  today.setDate(today.getDate() - 10);
  const dp = document.getElementById("contra-date");
  if (dp) dp.value = today.toISOString().split("T")[0];
}

function calcContraception() {
  const lmpStr = document.getElementById("contra-date").value;
  if (!lmpStr) return;
  const cycleLen = parseInt(document.getElementById("contra-cycle").value) || 28;

  const lmp = new Date(lmpStr);

  // Next period = LMP + cycle length
  const nextPeriod = new Date(lmp);
  nextPeriod.setDate(lmp.getDate() + cycleLen);

  // Ovulation = Next Period - 14 days
  const ovulation = new Date(nextPeriod);
  ovulation.setDate(nextPeriod.getDate() - 14);

  // Fertile Window: 5 days before ovulation to 1 day after
  const fertileStart = new Date(ovulation);
  fertileStart.setDate(ovulation.getDate() - 5);

  const fertileEnd = new Date(ovulation);
  fertileEnd.setDate(ovulation.getDate() + 1);

  const fmtOptions = { month: 'short', day: 'numeric', year: 'numeric' };

  document.getElementById("r-contra-fertile").textContent = `${fertileStart.toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })} - ${fertileEnd.toLocaleDateString('ar-SA', fmtOptions)}`;
  document.getElementById("r-contra-ovulation").textContent = ovulation.toLocaleDateString('ar-SA', fmtOptions);
  document.getElementById("r-contra-next").textContent = nextPeriod.toLocaleDateString('ar-SA', fmtOptions);

  document.getElementById("r-contra-safe").textContent = `الأيام الآمنة هي الأيام التي تقع خارج فترة الخصوبة (${fertileStart.toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })} إلى ${fertileEnd.toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })}).`;

  document.getElementById("r-contra").classList.add("show");
}

// ═══════════════════════════════════════════
// 34. TYPING PRACTICE CALCULATOR (ARABIC)
// ═══════════════════════════════════════════
function initTyping() {
  const sampleTexts = [
    "الطباعة هي عملية كتابة أو إدخال نص عن طريق الضغط على مفاتيح الآلة الكاتبة، أو لوحة مفاتيح الكمبيوتر، أو الهاتف الخلوي.",
    "تعتبر التكنولوجيا أفضل ما يكون عندما تجمع بين الناس معًا. يمثل تعلم الطباعة بكفاءة مهارة قيمة في العالم الحديث المنفتح.",
    "النجاح ليس نهائيًا، والفشل ليس قاتلًا: بل الشجاعة على مواصلة المحاولة هي ما يهم. استمر في التدريب لتحسين مهاراتك بشكل مستمر.",
    "البرمجة هي التفكير، وليست الطباعة. لكن القدرة على الطباعة بسرعة تتيح للمبرمجين التعبير عن أفكارهم بشكل أسرع وأفضل بكثير.",
    "نص عربي بسيط للتدريب على الطباعة. تأكد من وضع أصابعك بشكل صحيح على لوحة المفاتيح والتركيز على الدقة قبل السرعة لضمان التطور.",
    "العقل السليم في الجسم السليم بالأساس. حافظ على صحتك الجسدية والعقلية لتتمكن من تطوير أدائك في الكتابة والإبداع مع الوقت.",
    "لا يقاس النجاح بالموقع الذي يتبوأه المرء في حياته، بل بالصعاب التي يتغلب عليها. اجعل من أخطائك في الطباعة دافعاً للتطور.",
    "القراءة تغذي العقل، والطباعة المستمرة تبني الذاكرة العضلية. واظب على التدريب اليومي لتحقيق سرعات لم تكن تتخيلها من قبل.",
    "الوقت عملة نادرة في عصرنا الحالي. كل دقيقة تقضيها في تدريب مهاراتك ستوفر عليك ساعات من العمل الشاق في المستقبل.",
    "التركيز هو المفتاح الذهبي للنجاح. تجاهل المشتتات، ركز عينيك على الشاشة، ودع أصابعك تتحرك بتلقائية للوصول إلى الدقة التامة.",
    "الكتابة السريعة لم تعد مجرد مهارة إضافية، بل متطلب أساسي في أغلب الوظائف الحديثة. استثمر في نفسك وواصل التمرن يومياً."
  ];

  const textDisplay = document.getElementById('text-display');
  const inputField = document.getElementById('typing-input');
  const timeLeftEl = document.getElementById('time-left');
  const wpmEl = document.getElementById('wpm');
  const accuracyEl = document.getElementById('accuracy');
  const errorsEl = document.getElementById('errors');
  const restartBtn = document.getElementById('restart-btn');
  const resultSummary = document.getElementById('result-summary');

  const finalWpmEl = document.getElementById('final-wpm');
  const finalAccEl = document.getElementById('final-acc');
  const finalErrEl = document.getElementById('final-err');

  if (!textDisplay || !inputField) return;

  let timer;
  let timeElapsed = 0;
  let isTyping = false;
  let charIndex = 0;
  let mistakes = 0;
  let currentText = "";

  function formatTime(seconds) {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  function renderText() {
    const typedString = inputField.value;
    mistakes = 0;
    let html = '';
    let lastStatus = null;
    let groupStr = '';

    for (let i = 0; i < currentText.length; i++) {
      let char = currentText[i];
      let typedChar = typedString[i];

      let status;
      if (i < charIndex) {
        if (typedChar === char) {
          status = 'correct';
        } else {
          status = 'incorrect';
          mistakes++;
        }
      } else if (i === charIndex) {
        status = 'current';
      } else {
        status = 'untyped';
      }

      if (status !== lastStatus) {
        if (lastStatus !== null) {
          html += `<span class="${lastStatus}">${groupStr}</span>`;
        }
        groupStr = char;
        lastStatus = status;
      } else {
        groupStr += char;
      }
    }
    if (lastStatus !== null) {
      html += `<span class="${lastStatus}">${groupStr}</span>`;
    }

    textDisplay.innerHTML = html;
  }

  function loadParagraph() {
    const randomIndex = Math.floor(Math.random() * sampleTexts.length);
    currentText = sampleTexts[randomIndex];

    // Reset state
    inputField.value = '';
    inputField.disabled = false;
    charIndex = 0;
    mistakes = 0;
    timeElapsed = 0;
    isTyping = false;
    clearInterval(timer);

    renderText();
    updateStats();
    timeLeftEl.innerText = formatTime(timeElapsed);
    resultSummary.classList.add('hidden');
    inputField.focus();
  }

  function handleTyping() {
    const typedString = inputField.value;
    charIndex = typedString.length;

    if (!isTyping) {
      if (charIndex > 0) {
        timer = setInterval(initTimer, 1000);
        isTyping = true;
      }
    }

    renderText();

    if (charIndex >= currentText.length) {
      // Finished text before time is up
      clearInterval(timer);
      endTest();
      return;
    }

    updateStats();
  }

  function initTimer() {
    timeElapsed++;
    timeLeftEl.innerText = formatTime(timeElapsed);
    let wpm = timeElapsed > 0 ? Math.round((((charIndex - mistakes) / 5) / (timeElapsed / 60))) : 0;
    if (wpm < 0 || !wpm || wpm === Infinity) wpm = 0;
    wpmEl.innerText = wpm;
  }

  function updateStats() {
    errorsEl.innerText = mistakes;

    // Calculate accuracy
    let totalTyped = charIndex;
    let accuracy = totalTyped > 0 ? Math.round(((totalTyped - mistakes) / totalTyped) * 100) : 100;
    if (accuracy < 0) accuracy = 0;
    accuracyEl.innerText = `${accuracy}%`;

    // Calculate WPM dynamically
    let wpm = timeElapsed > 0 ? Math.round((((charIndex - mistakes) / 5) / (timeElapsed / 60))) : 0;
    if (wpm < 0 || !wpm || wpm === Infinity) wpm = 0;
    wpmEl.innerText = wpm;
  }

  function endTest() {
    // Stop timer safely
    clearInterval(timer);
    isTyping = false;
    inputField.disabled = true;

    finalWpmEl.innerText = wpmEl.innerText;
    finalAccEl.innerText = accuracyEl.innerText;
    finalErrEl.innerText = errorsEl.innerText;

    resultSummary.classList.remove('hidden');
  }

  // Layout switcher
  const layoutSelect = document.getElementById('keyboard-layout');
  if (layoutSelect) {
    const savedLayout = localStorage.getItem('keyboard-layout-ar') || (navigator.platform.toUpperCase().indexOf('MAC') >= 0 ? 'mac' : 'pc');
    layoutSelect.value = savedLayout;

    function applyLayout() {
      const layout = layoutSelect.value;
      localStorage.setItem('keyboard-layout-ar', layout);

      const enterKey = document.querySelector('.key[data-code="Enter"]');
      const backspaceKey = document.querySelector('.key[data-code="Backspace"]');
      const backquoteKey = document.querySelector('.key[data-code="Backquote"]');
      const backslashKey = document.querySelector('.key[data-code="Backslash"]');
      const intlBackslashKey = document.querySelector('.key[data-code="IntlBackslash"]');

      const allKeys = document.querySelectorAll('.key');

      if (layout === 'mac') {
        if (enterKey) enterKey.textContent = 'return';
        if (backspaceKey) backspaceKey.textContent = 'delete';

        const m = {
          'Backquote': '§',
          'Digit1': '1', 'Digit2': '2', 'Digit3': '3', 'Digit4': '4', 'Digit5': '5',
          'Digit6': '6', 'Digit7': '7', 'Digit8': '8', 'Digit9': '9', 'Digit0': '0',
          'Minus': '-', 'Equal': '=',

          'KeyQ': 'ض', 'KeyW': 'ص', 'KeyE': 'ث', 'KeyR': 'ق', 'KeyT': 'ف',
          'KeyY': 'غ', 'KeyU': 'ع', 'KeyI': 'ه', 'KeyO': 'خ', 'KeyP': 'ح',
          'BracketLeft': 'ج', 'BracketRight': 'ة', 'Backslash': '\\',

          'KeyA': 'ش', 'KeyS': 'س', 'KeyD': 'ي', 'KeyF': 'ب', 'KeyG': 'ل',
          'KeyH': 'ا', 'KeyJ': 'ت', 'KeyK': 'ن', 'KeyL': 'م',
          'Semicolon': 'ك', 'Quote': 'ط',

          'KeyZ': 'ظ', 'KeyX': 'ط', 'KeyC': 'ذ', 'KeyV': 'د', 'KeyB': 'ز',
          'KeyN': 'ر', 'KeyM': 'و', 'Comma': '،', 'Period': '.', 'Slash': '؟'
        };

        if (intlBackslashKey) {
          intlBackslashKey.style.display = 'flex';
          intlBackslashKey.innerHTML = '`';
        }

        allKeys.forEach(k => {
          const code = k.getAttribute('data-code');
          if (m[code]) {
            k.innerHTML = m[code];
          }
        });
      } else {
        if (enterKey) enterKey.textContent = 'Enter';
        if (backspaceKey) backspaceKey.textContent = '←';
        if (intlBackslashKey) intlBackslashKey.style.display = 'none';

        const p = {
          'Backquote': 'ذ', 'Digit1': '١', 'Digit2': '٢', 'Digit3': '٣', 'Digit4': '٤', 'Digit5': '٥',
          'Digit6': '٦', 'Digit7': '٧', 'Digit8': '٨', 'Digit9': '٩', 'Digit0': '٠',
          'Minus': '-', 'Equal': '=',
          'KeyQ': 'ض', 'KeyW': 'ص', 'KeyE': 'ث', 'KeyR': 'ق', 'KeyT': 'ف',
          'KeyY': 'غ', 'KeyU': 'ع', 'KeyI': 'ه', 'KeyO': 'خ', 'KeyP': 'ح',
          'BracketLeft': 'ج', 'BracketRight': 'د', 'Backslash': '\\',
          'KeyA': 'ش', 'KeyS': 'س', 'KeyD': 'ي', 'KeyF': 'ب', 'KeyG': 'ل',
          'KeyH': 'ا', 'KeyJ': 'ت', 'KeyK': 'ن', 'KeyL': 'م', 'Semicolon': 'ك', 'Quote': 'ط',
          'KeyZ': 'ئ', 'KeyX': 'ء', 'KeyC': 'ؤ', 'KeyV': 'ر', 'KeyB': 'لا',
          'KeyN': 'ى', 'KeyM': 'ة', 'Comma': 'و', 'Period': 'ز', 'Slash': 'ظ'
        };

        allKeys.forEach(k => {
          const code = k.getAttribute('data-code');
          if (p[code]) k.innerHTML = p[code];
        });
      }
    }
    layoutSelect.addEventListener('change', applyLayout);
    applyLayout();
  }

  if (!window._typingListenersAdded) {
    document.addEventListener('keydown', (e) => {
      const kb = document.getElementById('keyboard');
      const keyEl = kb?.querySelector(`.key[data-code="${e.code}"]`);
      if (keyEl) {
        // Correctness feedback for character keys
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          const expectedChar = currentText[charIndex];
          if (e.key === expectedChar) {
            keyEl.classList.add('correct');
          } else {
            keyEl.classList.add('incorrect');
          }
        } else {
          keyEl.classList.add('active');
        }
      }
    });

    document.addEventListener('keyup', (e) => {
      const kb = document.getElementById('keyboard');
      const keyEl = kb?.querySelector(`.key[data-code="${e.code}"]`);
      if (keyEl) {
        keyEl.classList.remove('active', 'correct', 'incorrect');
      }
    });
    window._typingListenersAdded = true;
  }

  // Make text display focus the hidden input
  const typingContainer = textDisplay.parentElement;
  if (typingContainer) {
    typingContainer.addEventListener('click', () => {
      inputField.focus();
    });
  }

  const keyboard = document.getElementById('keyboard');
  // Make virtual keyboard clickable
  if (keyboard) {
    keyboard.addEventListener('click', (e) => {
      const keyEl = e.target.closest('.key');
      if (!keyEl) return;

      const isModifiers = keyEl.classList.contains('shift') ||
        keyEl.classList.contains('enter') ||
        keyEl.classList.contains('tab') ||
        keyEl.classList.contains('capslock');
      if (isModifiers) return;

      if (keyEl.classList.contains('backspace')) {
        inputField.value = inputField.value.slice(0, -1);
      } else if (keyEl.classList.contains('space')) {
        const char = ' ';
        const isCorrect = currentText[charIndex] === char;
        keyEl.classList.add(isCorrect ? 'correct' : 'incorrect');
        setTimeout(() => keyEl.classList.remove('correct', 'incorrect'), 150);
        inputField.value += char;
      } else {
        const char = keyEl.innerText;
        const isCorrect = currentText[charIndex] === char;
        keyEl.classList.add(isCorrect ? 'correct' : 'incorrect');
        setTimeout(() => keyEl.classList.remove('correct', 'incorrect'), 150);
        inputField.value += char;
      }

      inputField.dispatchEvent(new Event('input'));
      inputField.focus();
    });
  }

  inputField.addEventListener('input', handleTyping);
  restartBtn.addEventListener('click', loadParagraph);

  // Load first paragraph
  loadParagraph();
}

