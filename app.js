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
    const title = c.querySelector("h3").textContent.toLowerCase();
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
      const offset = 70; // sticky nav height
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }
}

function filterCat(cat) {
  // update tabs
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
    const id = s.id.replace("section-", "");
    s.style.display = id === cat ? "" : "none";
  });
  // clear search
  document.getElementById("global-search").value = "";
}

// ═══════════════════════════════════════════
//  MODAL
// ═══════════════════════════════════════════
const calculators = {
  mortgage: {
    icon: "🏠",
    title: "Mortgage Calculator",
    desc: "Estimate monthly payments, total interest paid, and loan cost.",
  },
  loan: {
    icon: "💳",
    title: "Loan Calculator",
    desc: "Monthly payments and total cost for any personal or auto loan.",
  },
  compound: {
    icon: "📈",
    title: "Compound Interest Calculator",
    desc: "Watch your savings grow with the power of compounding.",
  },
  tip: {
    icon: "🍽️",
    title: "Tip Calculator",
    desc: "Split a bill and calculate tip per person.",
  },
  bmi: {
    icon: "⚖️",
    title: "BMI Calculator",
    desc: "Body Mass Index with healthy weight range, BMI Prime, and visual gauge.",
  },
  calories: {
    icon: "🔥",
    title: "Calorie Calculator",
    desc: "Daily calorie needs based on your body and goal.",
  },
  macros: {
    icon: "🥩",
    title: "Macro Calculator",
    desc: "Protein, carb and fat targets for your fitness goal.",
  },
  bodyfat: {
    icon: "💪",
    title: "Body Fat Calculator",
    desc: "Estimate body fat percentage using the US Navy method.",
  },
  salary: {
    icon: "💼",
    title: "Salary Calculator",
    desc: "Convert between hourly, daily, weekly, monthly, and annual salary.",
  },
  percentage: {
    icon: "%",
    title: "Percentage Calculator",
    desc: "Three ways to calculate percentages instantly.",
  },
  age: {
    icon: "🎂",
    title: "Age Calculator",
    desc: "Exact age in years, months, and days from your birthdate.",
  },
  gpa: {
    icon: "🎓",
    title: "GPA Calculator",
    desc: "Calculate your GPA from course grades and credit hours.",
  },
  fuel: {
    icon: "⛽",
    title: "Fuel Cost Calculator",
    desc: "How much will your road trip cost in gas?",
  },
  roi: {
    icon: "📊",
    title: "ROI Calculator",
    desc: "Calculate return on investment and profit percentage.",
  },
  quadratic: {
    icon: "📈",
    title: "Quadratic Equation solver",
    desc: "Find roots for equations in the form ax² + bx + c = 0.",
  },
  probability: {
    icon: "🎲",
    title: "Probability Calculator",
    desc: "Calculate combinations, permutations, and event probabilities.",
  },
  geometry: {
    icon: "📐",
    title: "Geometry Calculator",
    desc: "Calculate area and perimeter for basic 2D shapes.",
  },
  base: {
    icon: "💻",
    title: "Number Base Converter",
    desc: "Convert numbers between binary, octal, decimal, and hexadecimal.",
  },
  speed: {
    icon: "⚡",
    title: "Speed Distance Time",
    desc: "Solve for speed, distance, or time given the other two values.",
  },
  timezone: {
    icon: "🌍",
    title: "Time Zone Converter",
    desc: "Convert time between major world cities instantly.",
  },
  cooking: {
    icon: "🍳",
    title: "Cooking Converter",
    desc: "Quickly convert between cups, spoons, fluid ounces, and milliliters.",
  },
  scientific: {
    icon: "🔢",
    title: "Scientific Calculator",
    desc: "Full scientific calculator with trig and log functions.",
  },
  units: {
    icon: "📏",
    title: "Unit Converter",
    desc: "Convert between units of length, weight, temperature, and more.",
  },
  creditcard: {
    icon: "💳",
    title: "Credit Card Payoff Calculator",
    desc: "See how long it takes to pay off your balance and total interest cost.",
  },
  water: {
    icon: "💧",
    title: "Water Intake Calculator",
    desc: "How much water should you drink each day?",
  },
  pregnancy: {
    icon: "🤰",
    title: "Pregnancy Due Date",
    desc: "Calculate expected due date from last menstrual period.",
  },
  heartrate: {
    icon: "❤️",
    title: "Heart Rate Zones",
    desc: "Target heart rate zones for fat burn and cardio training.",
  },
  idealweight: {
    icon: "🎯",
    title: "Ideal Weight Calculator",
    desc: "Estimate healthy weight range for your height and frame.",
  },
  sleep: {
    icon: "🌙",
    title: "Sleep Cycle Calculator",
    desc: "Find the best bedtime or wake time based on 90-minute sleep cycles.",
  },
  datediff: {
    icon: "📅",
    title: "Date Difference Calculator",
    desc: "Number of days, weeks, and months between two dates.",
  },
  pace: {
    icon: "🏃",
    title: "Running Pace Calculator",
    desc: "Calculate pace, finish time, or distance for any run.",
  },
  random: {
    icon: "🎲",
    title: "Random Number Generator",
    desc: "Generate random numbers within any range.",
  },
  tax: {
    icon: "🧾",
    title: "Sales Tax Calculator",
    desc: "Add or remove sales tax from any price.",
  },
  inflation: {
    icon: "🛒",
    title: "Inflation Calculator",
    desc: "See how inflation erodes purchasing power over time.",
  },
  retirement: {
    icon: "🏖️",
    title: "Retirement Savings Calculator",
    desc: "Find out how much you need to save monthly to retire comfortably.",
  },
  currency: {
    icon: "💱",
    title: "Currency Converter",
    desc: "Convert between 30+ currencies with live exchange rates.",
  },
  countdown: {
    icon: "⏳",
    title: "Countdown Timer",
    desc: "Set a target date and watch the countdown with analog or digital display.",
  },
  hijri: {
    icon: "🗓️",
    title: "Hijri Date Converter",
    desc: "Convert dates between Hijri and Gregorian calendars with history.",
  },
  contraception: {
    icon: "📅",
    title: "Calendar Contraception",
    desc: "Calculate safe days and fertile windows based on your menstrual cycle.",
  },
  typing: {
    icon: "⌨️",
    title: "Typing Practice",
    desc: "Test and improve your typing speed (WPM) and accuracy.",
  },
};

// ── OPEN/CLOSE MODAL ──
function openCalc(id, skipHistory = false) {
  const c = calculators[id];
  if (!c) {
    alert(`The ${id} calculator is coming soon!`);
    return;
  }
  document.getElementById("modal-icon").textContent = c.icon;
  document.getElementById("modal-title").textContent = c.title;
  document.getElementById("modal-desc").textContent = c.desc;

  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML =
    '<div style="padding: 2rem; text-align: center; color: var(--muted);">Loading...</div>';

  fetch(`/templates/en/${id}.html`)
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
      modalBody.innerHTML = "<p>Template not found.</p>";
      console.error(err);
    });

  document.getElementById("modal-overlay").classList.add("open");
  document.body.style.overflow = "hidden";

  if (!skipHistory) {
    window.history.pushState({ calc: id }, "", "?calc=" + id);
  }
}

function closeModal(skipHistory = false) {
  // cleanup countdown interval
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
//  CALCULATOR LOGIC
// ═══════════════════════════════════════════
const fmt = (n, d = 0) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });
const fmtM = (n) => "$" + fmt(n, 0);
const fmtD = (n) => "$" + fmt(Math.abs(n), 0);

// MORTGAGE
function calcMortgage() {
  const price = parseFloat(document.getElementById("m-price").value) || 0;
  const down = parseFloat(document.getElementById("m-down").value) || 0;
  const rate = parseFloat(document.getElementById("m-rate").value) || 0;
  const term = parseInt(document.getElementById("m-term").value);
  const loan = price - down;
  const r = rate / 100 / 12,
    n = term * 12;
  const monthly =
    r === 0
      ? loan / n
      : (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const total = monthly * n;
  const interest = total - loan;
  document.getElementById("r-m-monthly").textContent = fmtM(monthly);
  document.getElementById("r-m-total").textContent = fmtM(total);
  document.getElementById("r-m-interest").textContent = fmtM(interest);
  document.getElementById("r-m-loan").textContent = fmtM(loan);
  const pct = (interest / total) * 100;
  document.getElementById("r-m-bar").innerHTML = `
    <div class="bar-row"><span class="bar-label">Principal</span><div class="bar-track"><div class="bar-fill" style="width:${100 - pct}%;background:var(--accent)"></div></div><span class="bar-val">${fmtM(loan)}</span></div>
    <div class="bar-row"><span class="bar-label">Total Interest</span><div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:var(--orange)"></div></div><span class="bar-val">${fmtM(interest)}</span></div>`;
  document.getElementById("r-mortgage").classList.add("show");
}

// LOAN
function calcLoan() {
  const amt = parseFloat(document.getElementById("l-amount").value) || 0;
  const rate = parseFloat(document.getElementById("l-rate").value) || 0;
  const n = parseInt(document.getElementById("l-term").value);
  const r = rate / 100 / 12;
  const monthly =
    r === 0
      ? amt / n
      : (amt * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const total = monthly * n;
  document.getElementById("r-l-monthly").textContent = fmtM(monthly);
  document.getElementById("r-l-total").textContent = fmtM(total);
  document.getElementById("r-l-interest").textContent = fmtM(total - amt);
  document.getElementById("r-loan").classList.add("show");
}

// COMPOUND INTEREST
function calcCompound() {
  const p = parseFloat(document.getElementById("ci-principal").value) || 0;
  const r = parseFloat(document.getElementById("ci-rate").value) / 100;
  const t = parseFloat(document.getElementById("ci-years").value) || 0;
  const n = parseInt(document.getElementById("ci-freq").value);
  const contrib = parseFloat(document.getElementById("ci-contrib").value) || 0;
  const fv = p * Math.pow(1 + r / n, n * t);
  const rn = r / n;
  const fvContrib =
    rn > 0 ? contrib * ((Math.pow(1 + rn, n * t) - 1) / rn) : contrib * n * t;
  const total = fv + fvContrib;
  const contributed = p + contrib * 12 * t;
  document.getElementById("r-ci-final").textContent = fmtM(total);
  document.getElementById("r-ci-contributed").textContent = fmtM(contributed);
  document.getElementById("r-ci-earned").textContent = fmtM(
    total - contributed,
  );
  document.getElementById("r-compound").classList.add("show");
}

// TIP
const fmtC = (n) =>
  "$" +
  n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
function calcTip() {
  const bill = parseFloat(document.getElementById("t-bill").value) || 0;
  const tipPct = parseFloat(document.getElementById("t-tip").value) || 0;
  const people = parseInt(document.getElementById("t-people").value) || 1;
  const tip = (bill * tipPct) / 100;
  const total = bill + tip;
  document.getElementById("r-t-tip").textContent = fmtC(tip);
  document.getElementById("r-t-total").textContent = fmtC(total);
  document.getElementById("r-t-per").textContent = fmtC(total / people);
  document.getElementById("r-tip").classList.add("show");
}

// BMI
function updateBmiFields() {
  const u = document.getElementById("bmi-unit").value;
  document.getElementById("bmi-imperial-fields").style.display =
    u === "imperial" ? "" : "none";
  document.getElementById("bmi-metric-fields").style.display =
    u === "metric" ? "" : "none";
  const waistUnit = document.getElementById("bmi-waist-unit");
  if (waistUnit) waistUnit.textContent = u === "imperial" ? "in" : "cm";
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
    const lowLbs = (18.5 * totalIn * totalIn) / 703;
    const highLbs = (24.9 * totalIn * totalIn) / 703;
    document.getElementById("r-bmi-low").textContent = fmt(lowLbs, 0) + " lbs";
    document.getElementById("r-bmi-high").textContent =
      fmt(highLbs, 0) + " lbs";
    document.getElementById("r-bmi-low-lbl").textContent = "Healthy Min";
    document.getElementById("r-bmi-high-lbl").textContent = "Healthy Max";
  } else {
    const kg = parseFloat(document.getElementById("bmi-kg").value) || 0;
    const cm = parseFloat(document.getElementById("bmi-cm").value) || 1;
    if (cm <= 0 || kg <= 0) return;
    heightM = cm / 100;
    weightKg = kg;
    bmi = kg / (heightM * heightM);
    const lowKg = 18.5 * heightM * heightM,
      highKg = 24.9 * heightM * heightM;
    document.getElementById("r-bmi-low").textContent = fmt(lowKg, 1) + " kg";
    document.getElementById("r-bmi-high").textContent = fmt(highKg, 1) + " kg";
    document.getElementById("r-bmi-low-lbl").textContent = "Healthy Min";
    document.getElementById("r-bmi-high-lbl").textContent = "Healthy Max";
  }

  // BMI value
  document.getElementById("r-bmi-val").textContent = fmt(bmi, 1);

  // BMI Prime (ratio to upper limit of normal BMI 25)
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

  // Category with descriptions
  const cats = [
    [
      16,
      "Severely Underweight",
      "var(--blue)",
      "Significant health risks. Consult a healthcare provider about nutrition and weight gain strategies.",
    ],
    [
      18.5,
      "Underweight",
      "var(--blue)",
      "You may be at risk for nutritional deficiencies. Consider consulting a dietitian.",
    ],
    [
      25,
      "Normal Weight",
      "var(--green)",
      "Great! You are within the healthy range. Maintain your current lifestyle with balanced nutrition and regular exercise.",
    ],
    [
      30,
      "Overweight",
      "var(--yellow)",
      "Slightly above the healthy range. Small lifestyle changes like increased activity and balanced diet can help.",
    ],
    [
      35,
      "Obese (Class I)",
      "var(--orange)",
      "Moderate health risk. A combination of diet, exercise, and medical guidance is recommended.",
    ],
    [
      40,
      "Obese (Class II)",
      "var(--pink)",
      "High health risk. Strongly consider professional medical and nutritional support.",
    ],
    [
      Infinity,
      "Obese (Class III)",
      "#DC2626",
      "Very high health risk. Seek comprehensive medical support for weight management.",
    ],
  ];
  const cat = cats.find((c) => bmi < c[0]);
  const catEl = document.getElementById("r-bmi-cat");
  catEl.textContent = cat[1];
  catEl.style.color = cat[2];

  // Category description
  const descEl = document.getElementById("r-bmi-cat-desc");
  if (descEl) descEl.textContent = cat[3];

  // Visual gauge needle position (BMI 10-45 mapped to 0-100%)
  const gaugeNeedle = document.getElementById("r-bmi-needle");
  if (gaugeNeedle) {
    const pct = Math.max(0, Math.min(100, ((bmi - 10) / 35) * 100));
    gaugeNeedle.style.left = `calc(${pct}% - 2px)`;
  }

  // Waist-to-Height Ratio (optional)
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
      whrNoteEl.textContent =
        "May indicate underweight — consider consulting a healthcare provider.";
    } else if (whr < 0.5) {
      whrValEl.style.color = "var(--green)";
      whrNoteEl.textContent =
        "✓ Healthy range — lower risk of obesity-related diseases.";
    } else if (whr < 0.6) {
      whrValEl.style.color = "var(--yellow)";
      whrNoteEl.textContent =
        "Elevated risk — consider increasing physical activity and improving diet.";
    } else {
      whrValEl.style.color = "var(--pink)";
      whrNoteEl.textContent =
        "High risk — strongly consider lifestyle changes and medical consultation.";
    }
    whrDiv.style.display = "block";
  } else if (whrDiv) {
    whrDiv.style.display = "none";
  }

  document.getElementById("r-bmi").classList.add("show");
}

// CALORIES
function updateCalFields() {
  const u = document.getElementById("cal-unit")?.value || "imperial";
  document.getElementById("cal-imperial-fields").style.display =
    u === "imperial" ? "" : "none";
  document.getElementById("cal-metric-fields").style.display =
    u === "metric" ? "" : "none";
}
function calcCalories() {
  const age = parseFloat(document.getElementById("cal-age").value) || 0;
  const sex = document.getElementById("cal-sex").value;
  const u = document.getElementById("cal-unit")?.value || "imperial";
  let kg, cm;
  if (u === "metric") {
    kg = parseFloat(document.getElementById("cal-weight-kg").value) || 0;
    cm = parseFloat(document.getElementById("cal-height-cm").value) || 0;
  } else {
    const wt = parseFloat(document.getElementById("cal-weight").value) || 0;
    const ht = parseFloat(document.getElementById("cal-height").value) || 0;
    kg = wt * 0.453592;
    cm = ht * 2.54;
  }
  const act = parseFloat(document.getElementById("cal-activity").value);
  const goal = parseInt(document.getElementById("cal-goal").value);
  const bmr =
    sex === "male"
      ? 10 * kg + 6.25 * cm - 5 * age + 5
      : 10 * kg + 6.25 * cm - 5 * age - 161;
  const tdee = bmr * act;
  const target = tdee + goal;
  document.getElementById("r-cal-bmr").textContent = fmt(bmr, 0) + " cal";
  document.getElementById("r-cal-tdee").textContent = fmt(tdee, 0) + " cal";
  document.getElementById("r-cal-target").textContent = fmt(target, 0);
  document.getElementById("r-calories").classList.add("show");
}

// MACROS
function calcMacros() {
  const cals = parseFloat(document.getElementById("mac-cal").value) || 2000;
  const goal = document.getElementById("mac-goal").value;
  const splits = {
    cut: [0.4, 0.35, 0.25],
    maintain: [0.3, 0.4, 0.3],
    bulk: [0.25, 0.5, 0.25],
  };
  const [p, c, f] = splits[goal];
  const protein = (cals * p) / 4,
    carbs = (cals * c) / 4,
    fat = (cals * f) / 9;
  document.getElementById("r-mac-protein").textContent = fmt(protein, 0) + "g";
  document.getElementById("r-mac-carbs").textContent = fmt(carbs, 0) + "g";
  document.getElementById("r-mac-fat").textContent = fmt(fat, 0) + "g";
  document.getElementById("r-mac-bar").innerHTML = `
    <div class="bar-row"><span class="bar-label">Protein</span><div class="bar-track"><div class="bar-fill" style="width:${p * 100}%;background:var(--pink)"></div></div><span class="bar-val">${(p * 100).toFixed(0)}%</span></div>
    <div class="bar-row"><span class="bar-label">Carbs</span><div class="bar-track"><div class="bar-fill" style="width:${c * 100}%;background:var(--yellow)"></div></div><span class="bar-val">${(c * 100).toFixed(0)}%</span></div>
    <div class="bar-row"><span class="bar-label">Fats</span><div class="bar-track"><div class="bar-fill" style="width:${f * 100}%;background:var(--orange)"></div></div><span class="bar-val">${(f * 100).toFixed(0)}%</span></div>`;
  document.getElementById("r-macros").classList.add("show");
}

// BODY FAT
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

  if (isNaN(bf) || bf < 1 || bf > 80) bf = 0; // fallback

  const fm = w * (bf / 100);
  const lm = w - fm;

  let cat = "—";
  if (bf > 0) {
    if (g === "male") {
      if (bf < 6) cat = "Essential Fat";
      else if (bf < 14) cat = "Athletes";
      else if (bf < 18) cat = "Fitness";
      else if (bf < 25) cat = "Average";
      else cat = "Obese";
    } else {
      if (bf < 14) cat = "Essential Fat";
      else if (bf < 21) cat = "Athletes";
      else if (bf < 25) cat = "Fitness";
      else if (bf < 32) cat = "Average";
      else cat = "Obese";
    }
  }

  document.getElementById("r-bf-pct").textContent =
    bf > 0 ? fmt(bf, 1) + "%" : "Invalid metrics";
  document.getElementById("r-bf-category").textContent = cat;
  document.getElementById("r-bf-fatmass").textContent =
    bf > 0 ? fmt(fm, 1) + " kg" : "—";
  document.getElementById("r-bf-leanmass").textContent =
    bf > 0 ? fmt(lm, 1) + " kg" : "—";

  document.getElementById("r-bodyfat").classList.add("show");
}

// SALARY
function calcSalary() {
  const amt = parseFloat(document.getElementById("sal-amount").value) || 0;
  const period = document.getElementById("sal-period").value;
  const hrs = parseFloat(document.getElementById("sal-hours").value) || 40;
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

// PERCENTAGE
function calcPct1() {
  const r =
    ((parseFloat(document.getElementById("p1-x").value) || 0) / 100) *
    (parseFloat(document.getElementById("p1-y").value) || 0);
  document.getElementById("r-p1").textContent = fmt(r, 2);
}
function calcPct2() {
  const x = parseFloat(document.getElementById("p2-x").value) || 0,
    y = parseFloat(document.getElementById("p2-y").value) || 1;
  document.getElementById("r-p2").textContent = fmt((x / y) * 100, 2) + "%";
}
function calcPct3() {
  const x = parseFloat(document.getElementById("p3-x").value) || 0,
    y = parseFloat(document.getElementById("p3-y").value) || 0;
  const pct = ((y - x) / Math.abs(x || 1)) * 100;
  const el = document.getElementById("r-p3");
  el.textContent = (pct >= 0 ? "+" : "") + fmt(pct, 2) + "%";
  el.style.color = pct >= 0 ? "var(--green)" : "var(--pink)";
}

// AGE
function calcAge() {
  const dob = new Date(document.getElementById("age-dob").value);
  const ref = new Date(document.getElementById("age-today").value);
  let years = ref.getFullYear() - dob.getFullYear();
  let months = ref.getMonth() - dob.getMonth();
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
    daysToB === 0 ? "🎉 Today!" : daysToB;
  document.getElementById("r-age").classList.add("show");
}

// GPA
function initGPA() {
  document.getElementById("gpa-rows").innerHTML = "";
  for (let i = 0; i < 4; i++) addGpaRow();
}
function addGpaRow() {
  const d = document.createElement("div");
  d.style.cssText =
    "display:grid;grid-template-columns:1fr 100px 80px;gap:0.5rem;margin-bottom:0.5rem;";
  d.innerHTML = `
    <input type="text" placeholder="Course name" style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:0.55rem 0.75rem;font-family:inherit;font-size:0.9rem;color:var(--text);outline:none;">
    <select style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:0.55rem;font-family:inherit;font-size:0.9rem;color:var(--text);outline:none;">
      <option value="4">A (4.0)</option><option value="3.7">A- (3.7)</option>
      <option value="3.3">B+ (3.3)</option><option value="3">B (3.0)</option>
      <option value="2.7">B- (2.7)</option><option value="2.3">C+ (2.3)</option>
      <option value="2">C (2.0)</option><option value="1.7">C- (1.7)</option>
      <option value="1">D (1.0)</option><option value="0">F (0.0)</option>
    </select>
    <input type="number" value="3" min="0" max="6" placeholder="Credits" style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:0.55rem;font-family:inherit;font-size:0.9rem;color:var(--text);outline:none;">`;
  document.getElementById("gpa-rows").appendChild(d);
}
function calcGPA() {
  const rows = document.getElementById("gpa-rows").children;
  let totalPts = 0,
    totalCredits = 0;
  for (const row of rows) {
    const grade = parseFloat(
      row.querySelectorAll("select, input[type=number]")[0]?.value ||
      row.querySelector("select").value,
    );
    const credits = parseFloat(
      row.querySelectorAll("input[type=number]")[0]?.value || 3,
    );
    if (isNaN(grade) || isNaN(credits)) continue;
    totalPts += grade * credits;
    totalCredits += credits;
  }
  const gpa = totalCredits > 0 ? totalPts / totalCredits : 0;
  document.getElementById("r-gpa-val").textContent = gpa.toFixed(2);
  document.getElementById("r-gpa-credits").textContent = totalCredits;
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

// FUEL
function updateFuelFields() {
  const u = document.getElementById("fuel-unit")?.value || "imperial";
  document.getElementById("fuel-imperial-fields").style.display =
    u === "imperial" ? "" : "none";
  document.getElementById("fuel-metric-fields").style.display =
    u === "metric" ? "" : "none";
}
function calcFuel() {
  const u = document.getElementById("fuel-unit")?.value || "imperial";
  let cost, volume, costPer100, volLabel, effLabel;
  if (u === "metric") {
    const distKm =
      parseFloat(document.getElementById("fuel-dist-km").value) || 0;
    const l100 = parseFloat(document.getElementById("fuel-l100").value) || 1;
    const priceL =
      parseFloat(document.getElementById("fuel-price-l").value) || 0;
    volume = (distKm / 100) * l100;
    cost = volume * priceL;
    costPer100 = l100 * priceL;
    volLabel = "Liters Needed";
    effLabel = "Cost per 100 km";
  } else {
    const dist = parseFloat(document.getElementById("fuel-dist").value) || 0;
    const mpg = parseFloat(document.getElementById("fuel-mpg").value) || 1;
    const price = parseFloat(document.getElementById("fuel-price").value) || 0;
    volume = dist / mpg;
    cost = volume * price;
    costPer100 = dist > 0 ? (cost * 100) / dist : 0;
    volLabel = "Gallons Needed";
    effLabel = "Cost per 100 miles";
  }
  document.getElementById("r-fuel-cost").textContent = fmtM(cost);
  document.getElementById("r-fuel-gallons").textContent = fmt(volume, 1);
  document.getElementById("r-fuel-per100").textContent = fmtM(costPer100);
  const vlEl = document.getElementById("r-fuel-vol-lbl");
  const elEl = document.getElementById("r-fuel-eff-lbl");
  if (vlEl) vlEl.textContent = volLabel;
  if (elEl) elEl.textContent = effLabel;
  document.getElementById("r-fuel").classList.add("show");
}

// ROI
function calcROI() {
  const invest = parseFloat(document.getElementById("roi-invest").value) || 1;
  const final = parseFloat(document.getElementById("roi-final").value) || 0;
  const years = parseFloat(document.getElementById("roi-years").value) || 1;
  const profit = final - invest;
  const roi = (profit / invest) * 100;
  const annualRoi = (Math.pow(final / invest, 1 / years) - 1) * 100;
  const el = document.getElementById("r-roi-pct");
  el.textContent = (roi >= 0 ? "+" : "") + fmt(roi, 1) + "%";
  el.style.color = roi >= 0 ? "var(--green)" : "var(--pink)";
  document.getElementById("r-roi-profit").textContent =
    (profit >= 0 ? "" : "-") + "$" + fmt(Math.abs(profit), 0);
  document.getElementById("r-roi-annual").textContent =
    (annualRoi >= 0 ? "+" : "") + fmt(annualRoi, 1) + "%";
  document.getElementById("r-roi").classList.add("show");
}

// CREDIT CARD
function calcCreditCard() {
  const balance = parseFloat(document.getElementById("cc-balance").value) || 0;
  const apr = parseFloat(document.getElementById("cc-apr").value) || 0;
  const payment = parseFloat(document.getElementById("cc-payment").value) || 0;
  const r = apr / 100 / 12;
  if (payment <= balance * r) {
    document.getElementById("r-cc-months").textContent = "∞ (payment too low)";
    document.getElementById("r-cc-interest").textContent = "∞";
    document.getElementById("r-cc-total").textContent = "∞";
    document.getElementById("r-cc").classList.add("show");
    return;
  }
  const months = Math.ceil(
    -Math.log(1 - (r * balance) / payment) / Math.log(1 + r),
  );
  const totalPaid = payment * months;
  document.getElementById("r-cc-months").textContent =
    months < 12 ? months + " months" : (months / 12).toFixed(1) + " years";
  document.getElementById("r-cc-interest").textContent = fmtM(
    totalPaid - balance,
  );
  document.getElementById("r-cc-total").textContent = fmtM(totalPaid);
  document.getElementById("r-cc").classList.add("show");
}

// WATER
function calcWater() {
  const u = document.getElementById("wat-unit")?.value || "lbs";
  let lbs;
  if (u === "kg") {
    const kgVal = parseFloat(document.getElementById("wat-weight").value) || 0;
    lbs = kgVal * 2.20462;
  } else {
    lbs = parseFloat(document.getElementById("wat-weight").value) || 0;
  }
  const act = parseFloat(document.getElementById("wat-activity").value);
  const oz = lbs * 0.5 * act;
  document.getElementById("r-wat-oz").textContent = fmt(oz, 0) + " oz";
  document.getElementById("r-wat-cups").textContent = fmt(oz / 8, 1);
  document.getElementById("r-wat-liters").textContent =
    fmt(oz * 0.0295735, 1) + " L";
  document.getElementById("r-water").classList.add("show");
}

// PREGNANCY
function calcPregnancy() {
  const lmpVal = document.getElementById("preg-lmp").value;
  if (!lmpVal) {
    alert("Please select your Last Menstrual Period date.");
    return;
  }
  const lmpDate = new Date(lmpVal);
  // Ensure the time component doesn't mess with day calculation (set to midnight local time)
  lmpDate.setHours(0, 0, 0, 0);

  const cycleLen = parseInt(document.getElementById("preg-cycle").value) || 28;

  // Naegele's rule: LMP + 280 days + (cycleLength - 28)
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
    weekDayStr = `Week ${weeks}, Day ${days}`;

    if (weeks < 13) trimester = "1st (1-12 weeks)";
    else if (weeks < 27) trimester = "2nd (13-26 weeks)";
    else trimester = "3rd (27-40+ weeks)";

    remaining = adjustedDays - currentDays + " days";
  } else if (currentDays > adjustedDays) {
    weekDayStr = "Overdue";
    remaining = "0 days";
    trimester = "3rd (Overdue)";
  } else {
    weekDayStr = "Future Date Selected";
  }

  const opts = { month: "short", day: "numeric", year: "numeric" };
  document.getElementById("r-preg-edd").textContent = edd.toLocaleDateString(
    "en-US",
    opts,
  );
  document.getElementById("r-preg-days-left").textContent = remaining + " left";
  document.getElementById("r-preg-week").textContent = weekDayStr;
  document.getElementById("r-preg-trimester").textContent = trimester;
  document.getElementById("r-preg-conception").textContent =
    conception.toLocaleDateString("en-US", opts);

  // ── Fetus visualization ──
  const fetusData = [
    // [emoji, sizeComparison, length, weight, developmentNote]  — per week (index 0 = week 0)
    ["🔬", "Microscopic", "< 0.1 mm", "—", "Fertilized egg begins dividing"],
    ["🔬", "Microscopic", "< 0.1 mm", "—", "Cells continue rapid division"],
    ["🔬", "Microscopic", "0.1 mm", "—", "Blastocyst implants in uterus"],
    [
      "🔬",
      "Microscopic",
      "0.2 mm",
      "—",
      "Embryo begins forming; neural tube develops",
    ],
    [
      "🌰",
      "Poppy Seed",
      "1 mm",
      "< 1 g",
      "Heart begins to beat; brain forming",
    ],
    ["🫘", "Sesame Seed", "2 mm", "< 1 g", "Arm and leg buds appear"],
    ["🫐", "Lentil", "5 mm", "< 1 g", "Nose, mouth & ears forming"],
    ["🫐", "Blueberry", "1.3 cm", "< 1 g", "Fingers and toes begin forming"],
    ["🍇", "Raspberry", "1.6 cm", "1 g", "All major organs forming; can move"],
    ["🫒", "Olive", "2.3 cm", "2 g", "Bones begin hardening; tiny teeth buds"],
    ["🍓", "Strawberry", "3.1 cm", "4 g", "Fingernails developing; can hiccup"],
    ["🍋", "Lime", "4.1 cm", "7 g", "Vocal cords forming; reflexes developing"],
    ["🍋", "Lemon", "5.4 cm", "14 g", "Fingerprints forming; can squint"],
    [
      "🍊",
      "Navel Orange",
      "7.4 cm",
      "23 g",
      "Can sense light; lanugo hair grows",
    ],
    ["🍎", "Apple", "8.7 cm", "42 g", "Can hear sounds; taste buds active"],
    ["🍐", "Avocado", "10.1 cm", "70 g", "Skeleton hardening; can make faces"],
    ["🫑", "Pear", "11.6 cm", "100 g", "Can yawn and stretch"],
    [
      "🥭",
      "Mango",
      "13.2 cm",
      "140 g",
      "Nervous system maturing; vernix forms",
    ],
    ["🥭", "Mango", "14.2 cm", "190 g", "Hair growing on head; can grip"],
    ["🍌", "Banana", "15.3 cm", "240 g", "Swallowing amniotic fluid regularly"],
    ["🥕", "Carrot", "16.7 cm", "300 g", "Sleep-wake cycles beginning"],
    [
      "🥕",
      "Spaghetti Squash",
      "19.2 cm",
      "350 g",
      "Eyelids can open; lungs developing",
    ],
    ["🌽", "Corn Cob", "21.6 cm", "430 g", "Responds to sound and music"],
    [
      "🌽",
      "Ear of Corn",
      "22.0 cm",
      "500 g",
      "Brain growing rapidly; viable if born",
    ],
    ["🥒", "Zucchini", "23.0 cm", "570 g", "Developing sense of balance"],
    [
      "🥦",
      "Cauliflower",
      "24.0 cm",
      "660 g",
      "Can open eyes; lungs producing surfactant",
    ],
    [
      "🥦",
      "Head of Lettuce",
      "25.0 cm",
      "760 g",
      "Can dream (REM sleep detected!)",
    ],
    ["🍆", "Eggplant", "27.0 cm", "875 g", "Five senses fully developed"],
    [
      "🍆",
      "Butternut Squash",
      "28.0 cm",
      "1.0 kg",
      "Gaining weight rapidly now",
    ],
    [
      "🥥",
      "Coconut",
      "30.0 cm",
      "1.2 kg",
      "Bones fully developed (still soft)",
    ],
    ["🥥", "Coconut", "32.0 cm", "1.5 kg", "Can turn head side to side"],
    [
      "🍍",
      "Pineapple",
      "34.0 cm",
      "1.7 kg",
      "Fat layer building; skin smoothing",
    ],
    ["🍍", "Pineapple", "35.0 cm", "1.9 kg", "Immune system strengthening"],
    ["🍍", "Honeydew Melon", "37.0 cm", "2.1 kg", "Lungs nearly mature"],
    [
      "🎃",
      "Cantaloupe",
      "38.0 cm",
      "2.4 kg",
      "Brain connections increasing rapidly",
    ],
    [
      "🎃",
      "Cantaloupe",
      "40.0 cm",
      "2.6 kg",
      "Baby is head-down, ready to drop",
    ],
    [
      "🍉",
      "Honeydew Melon",
      "43.0 cm",
      "2.9 kg",
      "Lungs mature; gaining 30g/day",
    ],
    ["🍉", "Winter Melon", "46.0 cm", "3.1 kg", "Full term! Ready for birth"],
    [
      "🍉",
      "Small Watermelon",
      "48.0 cm",
      "3.3 kg",
      "Movements may feel tighter",
    ],
    ["🍉", "Watermelon", "50.0 cm", "3.5 kg", "Your baby is fully ready!"],
    ["🍉", "Watermelon", "51.0 cm", "3.6 kg", "Due date week — welcome baby!"],
  ];

  const weeks =
    currentDays >= 0 ? Math.min(Math.floor(currentDays / 7), 40) : 0;
  const viz = document.getElementById("preg-fetus-viz");

  if (currentDays >= 0 && currentDays <= adjustedDays + 14) {
    const data = fetusData[weeks] || fetusData[40];
    viz.style.display = "block";

    // Animated icon scaling (smaller early, bigger later)
    const iconSize = Math.max(2.5, Math.min(6, 2.5 + (weeks / 40) * 3.5));
    const icon = document.getElementById("preg-fetus-icon");
    icon.textContent = data[0];
    icon.style.fontSize = iconSize + "rem";

    document.getElementById("preg-size-compare").textContent =
      `${data[0]} About the size of a ${data[1]}`;
    document.getElementById("preg-size-detail").textContent =
      `${data[2]} long · ${data[3]}`;
    document.getElementById("preg-dev-note").textContent = data[4];

    // Progress bar
    const pctProgress = Math.min(100, (weeks / 40) * 100);
    document.getElementById("preg-progress-bar").style.width =
      pctProgress + "%";
    document.getElementById("preg-progress-week").textContent = `Week ${weeks}`;
  } else {
    viz.style.display = "none";
  }

  document.getElementById("r-pregnancy").classList.add("show");
}

// HEART RATE ZONES
function calcHeartRate() {
  const age = parseInt(document.getElementById("hr-age").value) || 30;
  const rest = parseInt(document.getElementById("hr-rest").value) || 60;

  const maxHr = 220 - age;
  const hrr = maxHr - rest; // Heart Rate Reserve (Karvonen)

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

// IDEAL WEIGHT
function calcIdealWeight() {
  const g = document.getElementById("iw-gender").value;
  const hCm = parseFloat(document.getElementById("iw-height").value) || 0;
  const frame = document.getElementById("iw-frame").value;

  if (hCm < 100 || hCm > 250) {
    alert("Please enter a valid height (100-250cm).");
    return;
  }

  const hInches = hCm / 2.54;
  const over5Ft = Math.max(0, hInches - 60); // inches over 5 feet

  // J.D. Robinson (1983)
  let robinson = g === "male" ? 52 + 1.9 * over5Ft : 49 + 1.7 * over5Ft;

  // D.R. Miller (1983)
  let miller = g === "male" ? 56.2 + 1.41 * over5Ft : 53.1 + 1.36 * over5Ft;

  // B.J. Devine (1974)
  let devine = g === "male" ? 50 + 2.3 * over5Ft : 45.5 + 2.3 * over5Ft;

  // Apply frame adjustment (+/- 10%)
  const adj = frame === "small" ? 0.9 : frame === "large" ? 1.1 : 1;
  robinson *= adj;
  miller *= adj;
  devine *= adj;

  // Primary range: +/- 10% from the average of the three formulas
  const avg = (robinson + miller + devine) / 3;
  const low = avg * 0.9;
  const high = avg * 1.1;

  document.getElementById("r-iw-primary").textContent =
    `${fmt(low, 1)} - ${fmt(high, 1)} kg`;
  document.getElementById("r-iw-robinson").textContent =
    `${fmt(robinson, 1)} kg`;
  document.getElementById("r-iw-miller").textContent = `${fmt(miller, 1)} kg`;
  document.getElementById("r-iw-devine").textContent = `${fmt(devine, 1)} kg`;

  document.getElementById("r-idealweight").classList.add("show");
}

// SLEEP CALCULATOR
function calcSleep() {
  const mode = document.getElementById("slp-mode").value;
  const timeVal = document.getElementById("slp-time").value;
  if (!timeVal) {
    alert("Please select a time.");
    return;
  }

  const [h, m] = timeVal.split(":").map(Number);
  const baseDate = new Date();
  baseDate.setHours(h, m, 0, 0);

  const cycles = [6, 5, 4, 3]; // 9h, 7.5h, 6h, 4.5h
  const resultsHTML = [];

  for (let c of cycles) {
    const target = new Date(baseDate);
    // 1 cycle = 90 mins = 5400000 ms. Fall asleep time = 15 mins = 900000 ms.
    if (mode === "wake") {
      // Time to go to bed = Wake time - (cycles * 90) - 15 mins to fall asleep
      target.setTime(target.getTime() - c * 5400000 - 900000);
    } else {
      // Time to wake up = Bed time + 15 mins to fall asleep + (cycles * 90)
      target.setTime(target.getTime() + 900000 + c * 5400000);
    }

    const timeStr = target.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
    const hours = (c * 90) / 60;

    // Highlight 5 and 6 cycles as optimal
    const color =
      c === 5 || c === 6
        ? "var(--green)"
        : c === 4
          ? "var(--yellow)"
          : "var(--orange)";

    resultsHTML.push(`
          <div class="result-item">
            <span class="result-value" style="color:${color}">${timeStr}</span>
            <div class="result-label">${c} Cycles (${hours} Hours)</div>
          </div>
        `);
  }

  document.getElementById("r-slp-cycles").innerHTML = resultsHTML.join("");
  document.getElementById("r-sleep").classList.add("show");
}

// DATE DIFF
function calcDateDiff() {
  const start = new Date(document.getElementById("dd-start").value);
  const end = new Date(document.getElementById("dd-end").value);
  const diffMs = Math.abs(end - start);
  const days = Math.floor(diffMs / 86400000);
  document.getElementById("r-dd-days").textContent = fmt(days, 0);
  document.getElementById("r-dd-weeks").textContent = fmt(days / 7, 1);
  document.getElementById("r-dd-months").textContent = fmt(days / 30.44, 1);
  document.getElementById("r-datediff").classList.add("show");
}

// TAX
function calcTax() {
  const price = parseFloat(document.getElementById("stax-price").value) || 0;
  const rate = parseFloat(document.getElementById("stax-rate").value) || 0;
  const mode = document.getElementById("stax-mode").value;
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

// INFLATION
function calcInflation() {
  const amount = parseFloat(document.getElementById("inf-amount").value) || 0;
  const rate = parseFloat(document.getElementById("inf-rate").value) / 100 || 0;
  const years = parseInt(document.getElementById("inf-years").value) || 0;

  // Future Need = amount * (1 + rate)^years
  // How much money you will need in the future to have the same buying power as 'amount' today
  const futureNeed = amount * Math.pow(1 + rate, years);

  // Future Value (Purchasing Power) = amount / (1 + rate)^years
  // What 'amount' today will feel like it's worth in the future
  const futureValue = amount / Math.pow(1 + rate, years);

  const lost = amount - futureValue;
  const cumulative = (Math.pow(1 + rate, years) - 1) * 100;
  const futureYear = new Date().getFullYear() + years;

  document.getElementById("r-inf-value").textContent = fmtM(futureValue);
  document.getElementById("r-inf-cumulative").textContent =
    fmt(cumulative, 1) + "%";
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

// RETIREMENT
function calcRetirement() {
  const currentAge = parseFloat(document.getElementById("ret-age").value) || 30;
  const retireAge =
    parseFloat(document.getElementById("ret-retire").value) || 65;
  const currentSav =
    parseFloat(document.getElementById("ret-current").value) || 0;
  const monthlyContr =
    parseFloat(document.getElementById("ret-contrib").value) || 0;
  const annualReturn =
    parseFloat(document.getElementById("ret-return").value) / 100 || 0.07;
  const inflation =
    parseFloat(document.getElementById("ret-inflation").value) / 100 || 0.03;
  const monthlyGoal =
    parseFloat(document.getElementById("ret-goal").value) || 4000;

  const years = Math.max(retireAge - currentAge, 1);
  const months = years * 12;
  const r = annualReturn / 12; // monthly rate

  // Future value of current savings
  const fvCurrent = currentSav * Math.pow(1 + r, months);

  // Future value of monthly contributions (annuity)
  const fvContrib =
    r > 0
      ? monthlyContr * ((Math.pow(1 + r, months) - 1) / r)
      : monthlyContr * months;

  const projectedNestEgg = fvCurrent + fvContrib;

  // Inflation-adjust the monthly goal to retirement date (today's dollars shown)
  const inflatedGoal = monthlyGoal * Math.pow(1 + inflation, years);
  // Nest egg needed: 4% safe withdrawal (annual = monthlyGoal*12, so nest egg = goal*12/0.04 = goal*300)
  const neededNestEgg = (inflatedGoal * 12) / 0.04;

  // Monthly income the projected nest egg supports (inflation-adjusted, in today's dollars)
  const supportedMonthlyInflated = (projectedNestEgg * 0.04) / 12;
  const supportedMonthlyToday =
    supportedMonthlyInflated / Math.pow(1 + inflation, years);

  // Monthly savings needed to hit the target (if there's a gap)
  const gap = neededNestEgg - fvCurrent; // what contributions need to cover
  let recommendedMonthly =
    r > 0 ? (gap * r) / (Math.pow(1 + r, months) - 1) : gap / months;
  recommendedMonthly = Math.max(0, recommendedMonthly);

  // Render
  document.getElementById("ret-r-nest").textContent = fmtM(projectedNestEgg);
  document.getElementById("ret-r-needed").textContent = fmtM(neededNestEgg);
  document.getElementById("ret-r-income").textContent =
    fmtM(supportedMonthlyToday) + "/mo";
  document.getElementById("ret-r-monthly").textContent =
    fmtM(recommendedMonthly) + "/mo";
  document.getElementById("ret-r-years").textContent = years + " yrs";

  // Verdict
  const verdict = document.getElementById("ret-r-verdict");
  if (projectedNestEgg >= neededNestEgg) {
    verdict.style.background = "rgba(34,211,160,0.12)";
    verdict.style.border = "1px solid rgba(34,211,160,0.3)";
    verdict.style.color = "#22d3a0";
    const surplus = projectedNestEgg - neededNestEgg;
    verdict.textContent = `✅ You're on track! Your plan projects a surplus of ${fmtM(surplus)} above your goal.`;
  } else {
    const shortfall = neededNestEgg - projectedNestEgg;
    verdict.style.background = "rgba(255,140,66,0.1)";
    verdict.style.border = "1px solid rgba(255,140,66,0.3)";
    verdict.style.color = "#ff8c42";
    verdict.textContent = `⚠️ Shortfall of ${fmtM(shortfall)}. Increase monthly savings to ${fmtM(recommendedMonthly)}/mo to reach your goal.`;
  }
  document.getElementById("r-retirement").classList.add("show");
}

// CURRENCY CONVERTER
const CURRENCY_LIST = [
  ["USD", "$ US Dollar"],
  ["EUR", "€ Euro"],
  ["GBP", "£ British Pound"],
  ["SAR", "ر.س Saudi Riyal"],
  ["AED", "د.إ UAE Dirham"],
  ["JPY", "¥ Japanese Yen"],
  ["CNY", "¥ Chinese Yuan"],
  ["INR", "₹ Indian Rupee"],
  ["KWD", "د.ك Kuwaiti Dinar"],
  ["QAR", "ر.ق Qatari Riyal"],
  ["BHD", "BD Bahraini Dinar"],
  ["OMR", "ر.ع Omani Rial"],
  ["EGP", "ج.م Egyptian Pound"],
  ["JOD", "د.ا Jordanian Dinar"],
  ["TRY", "₺ Turkish Lira"],
  ["CAD", "C$ Canadian Dollar"],
  ["AUD", "A$ Australian Dollar"],
  ["CHF", "Fr Swiss Franc"],
  ["SEK", "kr Swedish Krona"],
  ["NOK", "kr Norwegian Krone"],
  ["DKK", "kr Danish Krone"],
  ["HKD", "HK$ Hong Kong Dollar"],
  ["SGD", "S$ Singapore Dollar"],
  ["KRW", "₩ South Korean Won"],
  ["MYR", "RM Malaysian Ringgit"],
  ["THB", "฿ Thai Baht"],
  ["IDR", "Rp Indonesian Rupiah"],
  ["PKR", "₨ Pakistani Rupee"],
  ["BDT", "৳ Bangladeshi Taka"],
  ["NGN", "₦ Nigerian Naira"],
  ["ZAR", "R South African Rand"],
  ["BRL", "R$ Brazilian Real"],
  ["MXN", "$ Mexican Peso"],
];
// Base: USD fallback rates (approximate, updated Feb 2026)
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
let curRates = null; // will be {base:'USD', rates:{...}}
const POPULAR_TARGETS = [
  "USD",
  "EUR",
  "GBP",
  "SAR",
  "AED",
  "JPY",
  "CAD",
  "AUD",
  "CHF",
  "INR",
];

function curPopulate() {
  const fromSel = document.getElementById("cur-from");
  const toSel = document.getElementById("cur-to");
  if (!fromSel || !toSel) return;
  fromSel.innerHTML = "";
  toSel.innerHTML = "";
  CURRENCY_LIST.forEach(([code, label]) => {
    const o1 = `<option value="${code}" ${code === "USD" ? "selected" : ""}>${code} — ${label.split(" ").slice(1).join(" ")}</option>`;
    const o2 = `<option value="${code}" ${code === "SAR" ? "selected" : ""}>${code} — ${label.split(" ").slice(1).join(" ")}</option>`;
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
  // E.g., if live EUR->USD is 1.08, and fallback USD->SAR is 3.75, live EUR->SAR = 1.08 * 3.75 = 4.05
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
    rateEl.textContent =
      rate.toFixed(rate < 0.01 ? 6 : rate < 1 ? 4 : 4) + " " + to;
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
  document.getElementById("cur-r-main").textContent =
    result.toLocaleString("en-US", {
      minimumFractionDigits: dp,
      maximumFractionDigits: dp,
    }) +
    " " +
    to;
  document.getElementById("cur-r-label").textContent =
    `${amount.toLocaleString()} ${from} →`;

  // Multi grid
  const grid = document.getElementById("cur-multi-grid");
  grid.innerHTML = POPULAR_TARGETS.filter((c) => c !== to)
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
    statusEl.textContent = "⏳ Fetching live rates...";
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
      statusEl.textContent = "🟢 Live rates · " + data.date;
      statusEl.className = "cur-status live";
    }
    updateRateTag();
  } catch (e) {
    if (statusEl) {
      statusEl.textContent =
        "⚪ Offline mode — using approximate rates (Feb 2026)";
      statusEl.className = "cur-status offline";
    }
  }
}

// RANDOM
function calcRandom() {
  const min = parseInt(document.getElementById("rng-min").value) || 0;
  const max = parseInt(document.getElementById("rng-max").value) || 100;
  const count = Math.min(
    parseInt(document.getElementById("rng-count").value) || 1,
    50,
  );
  const nums = Array.from(
    { length: count },
    () => Math.floor(Math.random() * (max - min + 1)) + min,
  );
  document.getElementById("r-rng-numbers").innerHTML = nums.join("  ·  ");
  document.getElementById("r-random").classList.add("show");
}

// PACE
function updatePaceFields() {
  const solve = document.getElementById("pace-solve").value;
  document.getElementById("pace-pace-field").style.display =
    solve === "pace" ? "none" : "";
}
function calcPace() {
  const solve = document.getElementById("pace-solve").value;
  const dist = parseFloat(document.getElementById("pace-dist").value) || 0;
  const h = parseInt(document.getElementById("pace-h").value) || 0;
  const m = parseInt(document.getElementById("pace-m").value) || 0;
  const s = parseInt(document.getElementById("pace-s").value) || 0;
  const totalSec = h * 3600 + m * 60 + s;
  const pMin = parseInt(document.getElementById("pace-min")?.value || 0);
  const pSec = parseInt(document.getElementById("pace-sec")?.value || 0);
  let result, label;
  if (solve === "pace") {
    const secPerKm = totalSec / dist;
    result =
      Math.floor(secPerKm / 60) +
      ":" +
      String(Math.round(secPerKm % 60)).padStart(2, "0") +
      " /km";
    label = "Pace";
  } else if (solve === "time") {
    const paceSec = pMin * 60 + pSec;
    const totalT = paceSec * dist;
    result =
      Math.floor(totalT / 3600) +
      "h " +
      Math.floor((totalT % 3600) / 60) +
      "m " +
      Math.round(totalT % 60) +
      "s";
    label = "Finish Time";
  } else {
    const paceSec = pMin * 60 + pSec;
    result = fmt(totalSec / paceSec, 2) + " km";
    label = "Distance";
  }
  document.getElementById("r-pace-result").textContent = result;
  document.getElementById("r-pace-label").textContent = label;
  document.getElementById("r-pace").classList.add("show");
}

// ── UNIT CONVERTER ──
const unitData = {
  length: {
    units: [
      "Millimeter",
      "Centimeter",
      "Meter",
      "Kilometer",
      "Inch",
      "Foot",
      "Yard",
      "Mile",
    ],
    toBase: [0.001, 0.01, 1, 1000, 0.0254, 0.3048, 0.9144, 1609.344],
  },
  weight: {
    units: [
      "Milligram",
      "Gram",
      "Kilogram",
      "Tonne",
      "Ounce",
      "Pound",
      "Stone",
    ],
    toBase: [0.000001, 0.001, 1, 1000, 0.0283495, 0.453592, 6.35029],
  },
  temp: { units: ["Celsius", "Fahrenheit", "Kelvin"], toBase: null },
  volume: {
    units: [
      "Milliliter",
      "Liter",
      "Cup",
      "Fluid Ounce",
      "Pint",
      "Quart",
      "Gallon",
    ],
    toBase: [0.001, 1, 0.236588, 0.0295735, 0.473176, 0.946353, 3.78541],
  },
  speed: {
    units: ["m/s", "km/h", "mph", "knot"],
    toBase: [1, 0.277778, 0.44704, 0.514444],
  },
};
function updateUnitOptions() {
  const cat = document.getElementById("unit-cat").value;
  const data = unitData[cat];
  const fromSel = document.getElementById("unit-from");
  const toSel = document.getElementById("unit-to");
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
  const cat = document.getElementById("unit-cat").value;
  const fromI = parseInt(document.getElementById("unit-from").value);
  const toI = parseInt(document.getElementById("unit-to").value);
  const val = parseFloat(document.getElementById("unit-val").value) || 0;
  const data = unitData[cat];
  let result;
  if (cat === "temp") {
    const units = data.units;
    let celsius;
    if (fromI === 0) celsius = val;
    else if (fromI === 1) celsius = ((val - 32) * 5) / 9;
    else celsius = val - 273.15;
    if (toI === 0) result = celsius;
    else if (toI === 1) result = (celsius * 9) / 5 + 32;
    else result = celsius + 273.15;
  } else {
    const base = val * data.toBase[fromI];
    result = base / data.toBase[toI];
  }
  const el = document.getElementById("r-unit-result");
  if (el) {
    el.textContent =
      Math.abs(result) < 0.001 || Math.abs(result) > 1e7
        ? result.toExponential(4)
        : fmt(result, 4).replace(/\.?0+$/, "");
    document.getElementById("r-unit-label").textContent =
      `${data.units[fromI]} → ${data.units[toI]}`;
  }
}

// GEOMETRY
function updateGeoFields() {
  const shape = document.getElementById("geo-shape").value;
  document.getElementById("geo-circle-fields").style.display =
    shape === "circle" ? "block" : "none";
  document.getElementById("geo-rect-fields").style.display =
    shape === "rectangle" ? "block" : "none";
  document.getElementById("geo-tri-fields").style.display =
    shape === "triangle" ? "block" : "none";
  document.getElementById("r-geo-perim-lbl").textContent =
    shape === "circle" ? "Circumference" : "Perimeter";
}

function calcGeometry() {
  const shape = document.getElementById("geo-shape").value;
  let area = 0,
    perim = 0;

  if (shape === "circle") {
    const r = parseFloat(document.getElementById("geo-r").value) || 0;
    if (r < 0) {
      alert("Radius cannot be negative.");
      return;
    }
    area = Math.PI * r * r;
    perim = 2 * Math.PI * r;
  } else if (shape === "rectangle") {
    const l = parseFloat(document.getElementById("geo-l").value) || 0;
    const w = parseFloat(document.getElementById("geo-w").value) || 0;
    if (l < 0 || w < 0) {
      alert("Length and Width cannot be negative.");
      return;
    }
    area = l * w;
    perim = 2 * (l + w);
  } else if (shape === "triangle") {
    const b = parseFloat(document.getElementById("geo-b").value) || 0;
    const h = parseFloat(document.getElementById("geo-h").value) || 0;
    if (b < 0 || h < 0) {
      alert("Base and Height cannot be negative.");
      return;
    }
    area = (b * h) / 2;
    // Assume isosceles for perimeter
    const side = Math.sqrt((b / 2) ** 2 + h ** 2);
    perim = b + 2 * side;
  }

  document.getElementById("r-geo-area").textContent = fmt(area, 2);
  document.getElementById("r-geo-perim").textContent = fmt(perim, 2);

  document.getElementById("r-geometry").classList.add("show");
}

// PROBABILITY
function updateProbFields() {
  const type = document.getElementById("prob-type").value;
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
        "Invalid input. Total must be > 0 and Favorable cannot exceed Total.",
      );
      return;
    }

    const prob = fav / total;
    document.getElementById("r-prob-main").textContent = `${fav} in ${total}`;
    document.getElementById("r-prob-label").textContent =
      "Probability (as fraction)";

    document.getElementById("r-prob-pct").textContent =
      `${fmt(prob * 100, 2)}%`;

    const unfav = total - fav;
    if (fav === 0) {
      document.getElementById("r-prob-odds").textContent = "0 to " + unfav;
    } else {
      // Simplify odds roughly
      document.getElementById("r-prob-odds").textContent = `${fav} to ${unfav}`;
    }
    document.getElementById("r-prob-extras").style.display = "grid";
  } else {
    const n = parseInt(document.getElementById("prob-n").value) || 0;
    const r = parseInt(document.getElementById("prob-r").value) || 0;

    if (n < 0 || r < 0 || r > n) {
      alert("Invalid input. n and r must be >= 0, and r cannot exceed n.");
      return;
    }

    if (type === "comb") {
      const c = fact(n) / (fact(r) * fact(n - r));
      document.getElementById("r-prob-main").textContent = c.toLocaleString();
      document.getElementById("r-prob-label").textContent =
        `Combinations (${n}C${r})`;
    } else if (type === "perm") {
      const p = fact(n) / fact(n - r);
      document.getElementById("r-prob-main").textContent = p.toLocaleString();
      document.getElementById("r-prob-label").textContent =
        `Permutations (${n}P${r})`;
    }
    document.getElementById("r-prob-extras").style.display = "none";
  }

  document.getElementById("r-probability").classList.add("show");
}

// QUADRATIC EQUATION
function calcQuadratic() {
  const a = parseFloat(document.getElementById("quad-a").value);
  const b = parseFloat(document.getElementById("quad-b").value) || 0;
  const c = parseFloat(document.getElementById("quad-c").value) || 0;

  if (isNaN(a) || a === 0) {
    alert("Coefficient 'a' cannot be 0 for a quadratic equation.");
    return;
  }

  const disc = b * b - 4 * a * c;
  let rootsStr = "";
  let typeStr = "";
  let x1 = "—",
    x2 = "—";

  if (disc > 0) {
    typeStr = "Two Real Roots";
    const root1 = (-b + Math.sqrt(disc)) / (2 * a);
    const root2 = (-b - Math.sqrt(disc)) / (2 * a);
    x1 = fmt(root1, 4);
    x2 = fmt(root2, 4);
    rootsStr = `x = ${x1}, x = ${x2}`;
  } else if (disc === 0) {
    typeStr = "One Real Root (Repeated)";
    const root = -b / (2 * a);
    x1 = fmt(root, 4);
    x2 = x1;
    rootsStr = `x = ${x1}`;
  } else {
    typeStr = "Complex/Imaginary Roots";
    const real = -b / (2 * a);
    const img = Math.sqrt(-disc) / (2 * a);
    const rm = fmt(real, 4);
    const im = fmt(Math.abs(img), 4);

    x1 = `${rm} + ${im}i`;
    x2 = `${rm} - ${im}i`;
    rootsStr = `x = ${x1}, x = ${x2}`;
  }

  document.getElementById("r-quad-type").textContent = typeStr;
  document.getElementById("r-quad-roots").textContent = rootsStr;
  document.getElementById("r-quad-disc").textContent = fmt(disc, 4);
  document.getElementById("r-quad-x1").textContent = x1;
  document.getElementById("r-quad-x2").textContent = x2;

  document.getElementById("r-quadratic").classList.add("show");
}

// BASE CONVERTER
function calcBase() {
  const val = document.getElementById("base-val").value.trim();
  const fromBase = parseInt(document.getElementById("base-from").value);

  if (!val) {
    alert("Please enter a value.");
    return;
  }

  // Parse the input value using the selected base
  const num = parseInt(val, fromBase);
  if (isNaN(num)) {
    alert("Invalid number for the selected base.");
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

// SPEED DISTANCE TIME
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

  let resultVal = 0;
  let resultLbl = "";
  let formatted = "";

  if (solveFor === "speed") {
    const d = getDistKm();
    const t = getTimeHr();
    if (t <= 0) {
      alert("Time must be greater than zero.");
      return;
    }

    const speedKph = d / t;
    resultLbl = "Speed";

    // Output in all 3 formats for convenience
    const mph = speedKph / 1.60934;
    const mps = speedKph / 3.6;
    formatted = `${fmt(speedKph, 2)} km/h<br><span style="font-size:1rem;color:var(--muted)">${fmt(mph, 2)} mph<br>${fmt(mps, 2)} m/s</span>`;
  } else if (solveFor === "distance") {
    const s = getSpeedKph();
    const t = getTimeHr();

    const distKm = s * t;
    resultLbl = "Distance";

    const mi = distKm / 1.60934;
    const m = distKm * 1000;
    formatted = `${fmt(distKm, 2)} km<br><span style="font-size:1rem;color:var(--muted)">${fmt(mi, 2)} mi<br>${fmt(m, 2)} m</span>`;
  } else if (solveFor === "time") {
    const d = getDistKm();
    const s = getSpeedKph();
    if (s <= 0) {
      alert("Speed must be greater than zero.");
      return;
    }

    const timeHr = d / s;
    resultLbl = "Time";

    const totalMin = timeHr * 60;
    const hrs = Math.floor(totalMin / 60);
    const mins = Math.round(totalMin % 60);
    formatted = `${hrs > 0 ? hrs + " hr " : ""}${mins} min<br><span style="font-size:1rem;color:var(--muted)">${fmt(timeHr, 2)} decimal hours</span>`;
  }

  document.getElementById("r-spd-val").innerHTML = formatted;
  document.getElementById("r-spd-lbl").textContent = resultLbl;
  document.getElementById("r-speed").classList.add("show");
}

// TIMEZONE
function calcTimezone() {
  const timeVal = document.getElementById("tz-time").value;
  const fromOffset = parseFloat(document.getElementById("tz-from").value);
  const toOffset = parseFloat(document.getElementById("tz-to").value);

  if (!timeVal) {
    alert("Please enter a time.");
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
    dayOffset = " (Previous Day)";
  } else if (totalMins >= 24 * 60) {
    totalMins -= 24 * 60;
    dayOffset = " (Next Day)";
  }

  // Format back to HH:MM
  const finalH = Math.floor(totalMins / 60);
  const finalM = Math.round(totalMins % 60);

  const pad = (n) => n.toString().padStart(2, "0");
  const formattedTime = `${pad(finalH)}:${pad(finalM)}` + dayOffset;

  // Difference string
  const sign = diffHours > 0 ? "+" : "";
  const diffStr = diffHours === 0 ? "Same Zone" : `${sign}${diffHours} Hours`;

  document.getElementById("r-tz-val").textContent = formattedTime;
  document.getElementById("r-tz-diff").textContent =
    `Time Difference: ${diffStr}`;

  document.getElementById("r-timezone").classList.add("show");
}

// COOKING CONVERTER
function calcCooking() {
  const val = parseFloat(document.getElementById("cook-val").value) || 0;
  const fromUnit = document.getElementById("cook-from").value;
  const toUnit = document.getElementById("cook-to").value;

  if (val < 0) {
    alert("Amount cannot be negative.");
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
    alert(
      "Cannot directly convert between volume and weight without knowing the ingredient density.",
    );
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

// ── SCIENTIFIC CALCULATOR ──
let sciExpr = "",
  sciResult = null;
function sciDisplay(val) {
  if (document.getElementById("sci-display"))
    document.getElementById("sci-display").textContent = val;
}
function sciExprDisplay(val) {
  if (document.getElementById("sci-expr"))
    document.getElementById("sci-expr").textContent = val;
}
function sciKey(k) {
  if (k === "C") {
    sciExpr = "";
    sciResult = null;
    sciDisplay("0");
    sciExprDisplay("");
    return;
  }
  if (k === "CE") {
    sciExpr = sciExpr.slice(0, -1) || "";
    sciDisplay(sciExpr || "0");
    return;
  }
  if (k === "⌫") {
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
      sciExprDisplay(sciExpr + " =");
      sciExpr = String(parseFloat(res.toFixed(10)));
      sciDisplay(sciExpr);
    } catch (e) {
      sciDisplay("Error");
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
  sciExprDisplay("");
}

// ── INIT ──
document.getElementById("global-search").addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    e.target.value = "";
    searchCalcs("");
  }
});

// Set today's date for age calc if needed
window.addEventListener("load", () => { });

// ═══════════════════════════════════════════
//  UX POLISH: 5 Features
// ═══════════════════════════════════════════

// ── 1. SMOOTH SCROLL TO RESULTS ──
// After any .results div gets .show, scroll it into view
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
// Observe all current and future .results elements
function observeResults() {
  document.querySelectorAll(".results").forEach((r) => {
    resultsObserver.observe(r, {
      attributes: true,
      attributeFilter: ["class"],
    });
  });
}
// Re-observe when modal opens (new results elements are injected)
const origOpenCalc = window.openCalc;
window.openCalc = function (id) {
  origOpenCalc(id);
  setTimeout(observeResults, 50);
};
observeResults();

// ── 2. SHAKE VALIDATION (replaces alert for inputs) ──
window.shakeField = function (fieldId, message) {
  const el = document.getElementById(fieldId);
  if (!el) {
    alert(message);
    return;
  }
  // Find the closest input wrapper or the element itself
  const target = el.closest(".input-wrap") || el.closest(".field-group") || el;
  target.classList.remove("shake");
  void target.offsetWidth; // force reflow
  target.classList.add("shake");
  target.style.outline = "2px solid var(--pink)";
  setTimeout(() => {
    target.classList.remove("shake");
    target.style.outline = "";
  }, 600);

  // Show a subtle inline message
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

// Hook confetti into pregnancy & age calculators
const origCalcPregnancy = window.calcPregnancy;
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
  // Don't trigger if user is inside a textarea
  if (e.target.tagName === "TEXTAREA") return;

  const calcBtn = modal.querySelector(".calc-btn");
  if (calcBtn) {
    e.preventDefault();
    calcBtn.click();
  }
});

// ── 5. CURRENCY LOADING SKELETON ──
const origLoadCurrencyRates = window.loadCurrencyRates;
if (typeof loadCurrencyRates === "function") {
  const _origLoad = loadCurrencyRates;
  window.loadCurrencyRates = function () {
    // Show skeleton while loading
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
//  PREMIUM FEATURES: 6 Features
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

// ── 2. COPY RESULTS BUTTON ──
// Auto-inject copy button into every .results panel
const _origOpenCalcPremium = window.openCalc;
window.openCalc = function (id) {
  _origOpenCalcPremium(id);
  setTimeout(() => {
    document.querySelectorAll(".results").forEach((r) => {
      if (r.querySelector(".copy-results-btn")) return;
      const btn = document.createElement("button");
      btn.className = "copy-results-btn";
      btn.innerHTML = "📋 Copy Results";
      btn.onclick = function (e) {
        e.stopPropagation();
        const text = r.innerText
          .replace("📋 Copy Results", "")
          .replace("✅ Copied!", "")
          .replace("🔗 Share", "")
          .replace("✅ Link Copied!", "")
          .trim();
        navigator.clipboard.writeText(text).then(() => {
          btn.innerHTML = "✅ Copied!";
          btn.classList.add("copied");
          setTimeout(() => {
            btn.innerHTML = "📋 Copy Results";
            btn.classList.remove("copied");
          }, 2000);
        });
      };
      r.appendChild(btn);

      // Also add share button
      if (!r.querySelector(".share-btn")) {
        const shareBtn = document.createElement("button");
        shareBtn.className = "share-btn";
        shareBtn.innerHTML = "🔗 Share";
        shareBtn.onclick = function (e) {
          e.stopPropagation();
          // Get current calculator inputs
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
            shareBtn.innerHTML = "✅ Link Copied!";
            shareBtn.classList.add("shared");
            setTimeout(() => {
              shareBtn.innerHTML = "🔗 Share";
              shareBtn.classList.remove("shared");
            }, 2000);
          });
        };
        r.appendChild(shareBtn);
      }
    });
  }, 100);
};

// ── 3. CHARTS (Mortgage, Compound Interest, BMI) ──
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
  let totalInterest = 0;
  let totalPrincipal = 0;
  const balances = [];
  const intData = [];
  const prinData = [];
  for (let i = 0; i <= n; i += Math.max(1, Math.floor(n / 50))) {
    balances.push(balance);
    intData.push(totalInterest);
    prinData.push(totalPrincipal);
    for (let j = 0; j < Math.max(1, Math.floor(n / 50)) && balance > 0; j++) {
      const intPmt = balance * rate;
      totalInterest += intPmt;
      const prinPmt = payment - intPmt;
      totalPrincipal += prinPmt;
      balance = Math.max(0, balance - prinPmt);
    }
  }
  const maxVal = Math.max(principal, totalInterest + totalPrincipal);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const w = canvas.width;
  const h = canvas.height - 20;
  // Draw balance line
  ctx.beginPath();
  ctx.strokeStyle = "#6C63FF";
  ctx.lineWidth = 2;
  balances.forEach((b, i) => {
    const x = (i / (balances.length - 1)) * w;
    const y = h - (b / maxVal) * h;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();
  // Fill under
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fillStyle = "rgba(108,99,255,0.1)";
  ctx.fill();
  // Labels
  ctx.fillStyle = "#8888a0";
  ctx.font = "10px Outfit";
  ctx.fillText("Year 0", 2, h + 14);
  ctx.fillText("Year " + years, w - 45, h + 14);
  ctx.fillText("Balance", 2, 14);
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
  // Gradient fill
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
  ctx.font = "10px Outfit";
  ctx.fillText("Year 0", 2, h + 14);
  ctx.fillText("Year " + years, w - 45, h + 14);
  ctx.fillText("$" + Math.round(maxVal).toLocaleString(), 2, 14);
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
  // BMI scale bar: 15 to 40
  const zones = [
    { min: 15, max: 18.5, color: "#42A5F5", label: "Under" },
    { min: 18.5, max: 25, color: "#00D4AA", label: "Normal" },
    { min: 25, max: 30, color: "#FFD93D", label: "Over" },
    { min: 30, max: 40, color: "#FF6B9D", label: "Obese" },
  ];
  zones.forEach((z) => {
    const x1 = ((z.min - 15) / 25) * w;
    const x2 = ((z.max - 15) / 25) * w;
    ctx.fillStyle = z.color;
    ctx.globalAlpha = 0.3;
    ctx.fillRect(x1, 5, x2 - x1, h);
    ctx.globalAlpha = 1;
    ctx.fillStyle = z.color;
    ctx.font = "9px Outfit";
    ctx.fillText(z.label, x1 + 4, h + 18);
  });
  // Marker
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
  ctx.font = "bold 10px Outfit";
  ctx.fillText(bmi.toFixed(1), markerX - 10, h + 30);
};

// ── 4. PWA SERVICE WORKER ──
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => { });
}

// ── 5. FAVORITES / RECENTLY USED ──
window.cwFavorites = JSON.parse(localStorage.getItem("cw-favorites") || "[]");
window.toggleFavorite = function (calcId, e) {
  if (e) e.stopPropagation();
  const idx = cwFavorites.indexOf(calcId);
  if (idx > -1) cwFavorites.splice(idx, 1);
  else cwFavorites.push(calcId);
  localStorage.setItem("cw-favorites", JSON.stringify(cwFavorites));
  renderFavorites();
  // Update star buttons
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

// Add star buttons to all calc cards and insert favorites section
(function initFavorites() {
  // Insert favorites section before the first section
  const firstSection = document.querySelector(".section-title");
  if (firstSection) {
    const favSection = document.createElement("div");
    favSection.id = "fav-section";
    favSection.className = "fav-section";
    favSection.innerHTML = '<h3>⭐ Favorites</h3><div class="fav-grid"></div>';
    firstSection.parentElement.insertBefore(favSection, firstSection);
  }
  // Add stars to cards
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

// ── 6. SHARE RESULT LINKS (auto-open from URL) ──
(function checkShareURL() {
  const params = new URLSearchParams(window.location.search);
  const calcId = params.get("calc");
  if (calcId) {
    setTimeout(() => {
      openCalc(calcId);
      // Fill in inputs
      setTimeout(() => {
        params.forEach((val, key) => {
          if (key === "calc") return;
          const el = document.getElementById(key);
          if (el) {
            el.value = val;
            el.dispatchEvent(new Event("input"));
          }
        });
        // Try clicking the calculate button
        setTimeout(() => {
          const btn = document.querySelector("#modal-overlay .calc-btn");
          if (btn) btn.click();
        }, 200);
      }, 200);
    }, 500);
  }
})();

// ═══════════════════════════════════════════
//  NEW FEATURES
// ═══════════════════════════════════════════

// ── 7. MOBILE HAMBURGER MENU ──
window.toggleMobileMenu = function () {
  const menu = document.getElementById("mobile-menu");
  const btn = document.getElementById("hamburger-btn");
  menu.classList.toggle("open");
  btn.textContent = menu.classList.contains("open") ? "✕" : "☰";
  btn.setAttribute(
    "aria-label",
    menu.classList.contains("open")
      ? "Close navigation menu"
      : "Open navigation menu",
  );
};
window.closeMobileMenu = function () {
  const menu = document.getElementById("mobile-menu");
  const btn = document.getElementById("hamburger-btn");
  if (menu) {
    menu.classList.remove("open");
    btn.textContent = "☰";
    btn.setAttribute("aria-label", "Open navigation menu");
  }
};

// ── 8. BACK TO TOP ──
(function initBackToTop() {
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

// ── 9. KEYBOARD SHORTCUTS ──
document.addEventListener("keydown", function (e) {
  // "/" to focus search
  if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
    const active = document.activeElement;
    const isInput =
      active &&
      (active.tagName === "INPUT" ||
        active.tagName === "TEXTAREA" ||
        active.tagName === "SELECT");
    if (!isInput) {
      e.preventDefault();
      const search = document.getElementById("global-search");
      if (search) search.focus();
    }
  }
  // Escape to close modal
  if (e.key === "Escape") {
    const modal = document.getElementById("modal-overlay");
    if (modal && modal.classList.contains("open")) {
      closeModal();
      return;
    }
    // Also close mobile menu
    closeMobileMenu();
  }
});

// ── 10. ACCESSIBILITY: KEYBOARD NAV FOR CALC CARDS ──
(function initCardA11y() {
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
})();

// ── 11. INPUT VALIDATION ──
window.validateInput = function (inputId, errorId, min, max, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (!input || !error) return true;
  const val = parseFloat(input.value);
  if (isNaN(val) || val < min || (max !== undefined && val > max)) {
    input.classList.add("input-invalid");
    error.textContent = "⚠ " + message;
    error.classList.add("show");
    input.classList.add("shake");
    setTimeout(() => input.classList.remove("shake"), 500);
    return false;
  }
  input.classList.remove("input-invalid");
  error.classList.remove("show");
  return true;
};

// Override calcMortgage to add validation
const _origCalcMortgage = window.calcMortgage;
if (typeof _origCalcMortgage === "function") {
  window.calcMortgage = function () {
    let valid = true;
    const price = parseFloat(document.getElementById("m-price")?.value);
    const down = parseFloat(document.getElementById("m-down")?.value);
    const rate = parseFloat(document.getElementById("m-rate")?.value);

    if (
      !validateInput(
        "m-price",
        "err-m-price",
        1,
        undefined,
        "Please enter a valid home price",
      )
    )
      valid = false;
    if (
      !validateInput(
        "m-rate",
        "err-m-rate",
        0,
        50,
        "Rate must be between 0% and 50%",
      )
    )
      valid = false;
    if (down > price) {
      const err = document.getElementById("err-m-down");
      const inp = document.getElementById("m-down");
      if (err && inp) {
        inp.classList.add("input-invalid", "shake");
        err.textContent = "⚠ Down payment cannot exceed home price";
        err.classList.add("show");
        setTimeout(() => inp.classList.remove("shake"), 500);
        valid = false;
      }
    } else {
      const err = document.getElementById("err-m-down");
      const inp = document.getElementById("m-down");
      if (err && inp) {
        inp.classList.remove("input-invalid");
        err.classList.remove("show");
      }
    }
    if (!valid) return;
    _origCalcMortgage();
    // Save to history
    const monthly = document.getElementById("r-m-monthly")?.textContent;
    if (monthly) saveHistory("mortgage", "🏠", "Mortgage: " + monthly + "/mo");
  };
}

// ── 12. CALCULATOR HISTORY ──
window.cwHistory = JSON.parse(localStorage.getItem("cw-history") || "[]");

window.saveHistory = function (calcId, icon, summary) {
  const entry = {
    id: calcId,
    icon: icon,
    summary: summary,
    time: Date.now(),
  };
  // Remove duplicates of same calc
  cwHistory = cwHistory.filter((h) => h.id !== calcId);
  cwHistory.unshift(entry);
  // Keep max 10
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
    const ago = timeAgo(h.time);
    item.innerHTML =
      '<span class="history-item-icon">' +
      h.icon +
      "</span>" +
      '<span class="history-item-text">' +
      h.summary +
      "</span>" +
      '<span class="history-item-time">' +
      ago +
      "</span>";
    list.appendChild(item);
  });
}

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return mins + "m ago";
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + "h ago";
  const days = Math.floor(hrs / 24);
  return days + "d ago";
}

window.clearHistory = function () {
  cwHistory = [];
  localStorage.removeItem("cw-history");
  renderHistory();
};

// Insert history section into DOM
(function initHistory() {
  const mainContent = document.querySelector(".main-content");
  if (!mainContent) return;
  const catTabs = mainContent.querySelector(".cat-tabs");
  const histSection = document.createElement("div");
  histSection.id = "history-section";
  histSection.className = "history-section";
  histSection.innerHTML =
    '<div class="history-header"><h3>🕐 Recent Calculations</h3><button class="history-clear-btn" onclick="clearHistory()">Clear</button></div><div class="history-list"></div>';
  if (catTabs) {
    catTabs.parentNode.insertBefore(histSection, catTabs.nextSibling);
  }
  renderHistory();
})();

// Hook history into other calculators
const calcHistoryHooks = {
  calcLoan: {
    id: "loan",
    icon: "💳",
    resultEl: "r-l-monthly",
    prefix: "Loan: ",
  },
  calcCompound: {
    id: "compound",
    icon: "📈",
    resultEl: "r-ci-final",
    prefix: "Compound: ",
  },
  calcTip: {
    id: "tip",
    icon: "🍽️",
    resultEl: "r-t-total",
    prefix: "Tip Total: ",
  },
  calcBMI: { id: "bmi", icon: "⚖️", resultEl: "r-bmi-val", prefix: "BMI: " },
  calcCalories: {
    id: "calories",
    icon: "🔥",
    resultEl: "r-cal-target",
    prefix: "Calories: ",
  },
  calcSalary: {
    id: "salary",
    icon: "💼",
    resultEl: "r-sal-year",
    prefix: "Salary: ",
  },
  calcBodyFat: {
    id: "bodyfat",
    icon: "💪",
    resultEl: "r-bf-pct",
    prefix: "Body Fat: ",
  },
  calcMacros: {
    id: "macros",
    icon: "🥗",
    resultEl: "r-mac-protein",
    prefix: "Macros: Protein ",
  },
  calcROI: { id: "roi", icon: "📊", resultEl: "r-roi-pct", prefix: "ROI: " },
  calcCreditCard: {
    id: "creditcard",
    icon: "💳",
    resultEl: "r-cc-months",
    prefix: "Payoff: ",
  },
  calcWater: {
    id: "water",
    icon: "💧",
    resultEl: "r-wat-oz",
    prefix: "Water: ",
  },
  calcPregnancy: {
    id: "pregnancy",
    icon: "🤰",
    resultEl: "r-preg-edd",
    prefix: "Due Date: ",
  },
  calcHeartRate: {
    id: "heartrate",
    icon: "❤️",
    resultEl: "r-hr-max",
    prefix: "Max HR: ",
  },
  calcIdealWeight: {
    id: "idealweight",
    icon: "🎯",
    resultEl: "r-iw-primary",
    prefix: "Ideal Weight: ",
  },
  calcSleep: {
    id: "sleep",
    icon: "🌙",
    resultEl: "r-slp-cycles",
    prefix: "Sleep Cycles",
  },
  calcDateDiff: {
    id: "datediff",
    icon: "📅",
    resultEl: "r-dd-days",
    prefix: "Date Diff: ",
  },
  calcTax: {
    id: "tax",
    icon: "🧾",
    resultEl: "r-tax-total",
    prefix: "Tax Total: ",
  },
  calcInflation: {
    id: "inflation",
    icon: "📉",
    resultEl: "r-inf-value",
    prefix: "Future Value: ",
  },
  calcRetirement: {
    id: "retirement",
    icon: "🏖️",
    resultEl: "ret-r-nest",
    prefix: "Nest Egg: ",
  },
  convertCurrency: {
    id: "currency",
    icon: "💱",
    resultEl: "cur-r-main",
    prefix: "Currency: ",
  },
  calcRandom: {
    id: "random",
    icon: "🎲",
    resultEl: "r-rng-numbers",
    prefix: "Random: ",
  },
  calcPace: {
    id: "pace",
    icon: "🏃",
    resultEl: "r-pace-result",
    prefix: "Pace: ",
  },
  calcGeometry: {
    id: "geometry",
    icon: "📐",
    resultEl: "r-geo-area",
    prefix: "Area: ",
  },
  calcProbability: {
    id: "probability",
    icon: "🎰",
    resultEl: "r-prob-main",
    prefix: "Probability: ",
  },
  calcQuadratic: {
    id: "quadratic",
    icon: "📏",
    resultEl: "r-quad-roots",
    prefix: "Roots: ",
  },
  calcBase: {
    id: "base",
    icon: "🔢",
    resultEl: "r-base-dec",
    prefix: "Base: ",
  },
  calcSpeed: {
    id: "speed",
    icon: "🚀",
    resultEl: "r-spd-val",
    prefix: "Speed: ",
  },
  calcTimezone: {
    id: "timezone",
    icon: "🌍",
    resultEl: "r-tz-val",
    prefix: "Time: ",
  },
  calcCooking: {
    id: "cooking",
    icon: "👨‍🍳",
    resultEl: "r-cook-val",
    prefix: "Cooking: ",
  },
  calcUnits: {
    id: "units",
    icon: "📏",
    resultEl: "r-unit-result",
    prefix: "Unit: ",
  },
  calcAge: { id: "age", icon: "🎂", resultEl: "r-age-years", prefix: "Age: " },
  calcGPA: { id: "gpa", icon: "🎓", resultEl: "r-gpa-val", prefix: "GPA: " },
  calcFuel: {
    id: "fuel",
    icon: "⛽",
    resultEl: "r-fuel-cost",
    prefix: "Fuel Cost: ",
  },
  calcPct1: {
    id: "percentage",
    icon: "➗",
    resultEl: "r-p1",
    prefix: "Percentage: ",
  },
  calcPct2: {
    id: "percentage",
    icon: "➗",
    resultEl: "r-p2",
    prefix: "Percentage: ",
  },
  calcPct3: {
    id: "percentage",
    icon: "➗",
    resultEl: "r-p3",
    prefix: "% Change: ",
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
        if (val && val !== "0" && val !== "$0" && val !== "—") {
          saveHistory(cfg.id, cfg.icon, cfg.prefix + val);
        }
      }
    };
  }
});

// ── 13. MORTGAGE COMPARISON MODE ──
window.toggleMortgageCompare = function () {
  const toggle = document.getElementById("mortgage-compare-toggle");
  const single = document.getElementById("mortgage-single");
  const cols = document.getElementById("mortgage-compare-cols");
  const compareBtn = document.getElementById("mortgage-compare-btn");
  const results = document.getElementById("r-mortgage");

  if (!toggle) return;
  toggle.classList.toggle("active");
  const active = toggle.classList.contains("active");

  if (single) single.style.display = active ? "none" : "";
  if (cols) cols.classList.toggle("show", active);
  if (compareBtn) compareBtn.style.display = active ? "" : "none";
  if (results && active) results.classList.remove("show");
};

window.calcMortgageCompare = function () {
  function calcMort(price, down, rate, years) {
    const principal = price - down;
    const r = rate / 100 / 12;
    const n = years * 12;
    if (r === 0)
      return {
        monthly: principal / n,
        total: principal,
        interest: 0,
        principal: principal,
      };
    const monthly =
      (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    return { monthly, total, interest: total - principal, principal };
  }
  const a = calcMort(
    parseFloat(document.getElementById("mc-a-price")?.value) || 0,
    parseFloat(document.getElementById("mc-a-down")?.value) || 0,
    parseFloat(document.getElementById("mc-a-rate")?.value) || 0,
    parseFloat(document.getElementById("mc-a-term")?.value) || 30,
  );
  const b = calcMort(
    parseFloat(document.getElementById("mc-b-price")?.value) || 0,
    parseFloat(document.getElementById("mc-b-down")?.value) || 0,
    parseFloat(document.getElementById("mc-b-rate")?.value) || 0,
    parseFloat(document.getElementById("mc-b-term")?.value) || 30,
  );
  const fmt = (v) => "$" + Math.round(v).toLocaleString();
  document.getElementById("mc-a-monthly").textContent = fmt(a.monthly);
  document.getElementById("mc-b-monthly").textContent = fmt(b.monthly);
  document.getElementById("mc-a-total").textContent =
    "Total: " + fmt(a.total) + " | Interest: " + fmt(a.interest);
  document.getElementById("mc-b-total").textContent =
    "Total: " + fmt(b.total) + " | Interest: " + fmt(b.interest);

  document.getElementById("mortgage-compare-results").classList.add("show");
  const diff = Math.abs(a.monthly - b.monthly);
  const cheaper = a.monthly < b.monthly ? "A" : "B";
  const diffEl = document.getElementById("mortgage-compare-diff");
  diffEl.style.display = "";
  diffEl.textContent =
    "Scenario " +
    cheaper +
    " saves " +
    fmt(diff) +
    "/mo (" +
    fmt(Math.abs(a.total - b.total)) +
    " total)";

  saveHistory(
    "mortgage",
    "🏠",
    "Mortgage Compare: " + fmt(a.monthly) + " vs " + fmt(b.monthly),
  );
};

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
//  COUNTDOWN CALCULATOR
// ═══════════════════════════════════════════
function initCountdown() {
  // Set default target date to tomorrow
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
  // Reset date to tomorrow
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

  // Clear previous interval
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
      // Time's up!
      clearInterval(window._countdownInterval);
      window._countdownInterval = null;
      updateDigital(0, 0, 0, 0);
      updateAnalog(0, 0, 0);
      updateAnalogReadout(0, 0, 0, 0);
      updateProgress(100);
      if (statusEl) {
        statusEl.textContent = '🎉 Time\'s Up!';
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

    // Progress
    if (totalDuration > 0) {
      const elapsed = now - startTime;
      const pct = Math.min(100, (elapsed / totalDuration) * 100);
      updateProgress(pct);
    }

    if (statusEl) {
      statusEl.textContent = '⏱ Counting down...';
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
      void el.offsetWidth; // trigger reflow
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
    // Progress ring shows seconds progress within the minute
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
//  HIJRI ↔ GREGORIAN DATE CONVERTER
// ═══════════════════════════════════════════

// ── Core conversion: Julian Day Number method ──
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
  return {
    d: e - Math.floor((153 * m + 2) / 5) + 1,
    m: m + 3 - 12 * Math.floor(m / 10),
    y: 100 * b + d2 - 4800 + Math.floor(m / 10)
  };
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
  const day = z3 - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;
  return { d: day, m: month, y: year };
}

function _hToJDN(hy, hm, hd) {
  return Math.floor((11 * hy + 3) / 30) + 354 * hy + 30 * hm -
    Math.floor((hm - 1) / 2) + hd + 1948440 - 385;
}

// ── Accurate Hijri conversion using browser Intl API (Umm al-Qura) ──
// Fallback to tabular for environments without islamic-umalqura support

let _intlHijriFormatter = null;
function _getHijriFormatter() {
  if (_intlHijriFormatter) return _intlHijriFormatter;
  try {
    const f = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC'
    });
    // Sanity-check: 1 Jan 2000 should be 24/9/1420
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
  // Fallback: tabular JDN method
  return _jdnToH(_gToJDN(gy, gm, gd));
}

function hijriToGregorian(hy, hm, hd) {
  const fmt = _getHijriFormatter();
  if (fmt) {
    // Get a tabular approximate date, then search ±3 days for the accurate match
    const approxJdn = Math.floor((11 * hy + 3) / 30) + 354 * hy + 30 * hm -
      Math.floor((hm - 1) / 2) + hd + 1948440 - 385;
    const approx = _jdnToG(approxJdn);
    const approxMs = Date.UTC(approx.y, approx.m - 1, approx.d);
    for (let delta = -3; delta <= 3; delta++) {
      const testMs = approxMs + delta * 86400000;
      const testDate = new Date(testMs);
      const check = gregorianToHijri(testDate.getUTCFullYear(), testDate.getUTCMonth() + 1, testDate.getUTCDate());
      if (check.y === hy && check.m === hm && check.d === hd) {
        return { y: testDate.getUTCFullYear(), m: testDate.getUTCMonth() + 1, d: testDate.getUTCDate() };
      }
    }
  }
  // Fallback: pure tabular
  return _jdnToG(_hToJDN(hy, hm, hd));
}

// ── Populate day selects ──
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
  // Populate Gregorian day select (31 days)
  _populateDays('hg-day', 31);
  const gDay = document.getElementById('hg-day');
  const gMonth = document.getElementById('hg-month');
  const gYear = document.getElementById('hg-year');
  if (gDay) gDay.value = now.getDate();
  if (gMonth) gMonth.value = now.getMonth() + 1;
  if (gYear) gYear.value = now.getFullYear();
  // Populate Hijri day select (30 days)
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
  // Hide result on direction change
  const res = document.getElementById('hijri-result');
  const cals = document.getElementById('hijri-calendars');
  const evts = document.getElementById('hijri-events-wrap');
  if (res) res.style.display = 'none';
  if (cals) cals.style.display = 'none';
  if (evts) evts.style.display = 'none';
}

// ── Hijri month names ──
const HIJRI_MONTHS_EN = ['', 'Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani',
  'Jumada al-Ula', 'Jumada al-Akhira', 'Rajab', 'Sha\'ban', 'Ramadan', 'Shawwal',
  'Dhu al-Qi\'da', 'Dhu al-Hijja'];
const GREG_MONTHS_EN = ['', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function convertHijri() {
  const dir = window._hijriDirection || 'g2h';
  let gDate, hDate;

  if (dir === 'g2h') {
    const gy = parseInt(document.getElementById('hg-year')?.value);
    const gm = parseInt(document.getElementById('hg-month')?.value);
    const gd = parseInt(document.getElementById('hg-day')?.value);
    if (!gy || !gm || !gd || gy < 1900 || gy > 2100) {
      alert('Please enter a valid Gregorian date.'); return;
    }
    hDate = gregorianToHijri(gy, gm, gd);
    gDate = { y: gy, m: gm, d: gd };
    const dayName = DAYS_EN[new Date(Date.UTC(gy, gm - 1, gd)).getUTCDay()];
    const lbl = document.getElementById('hijri-result-label');
    const main = document.getElementById('hijri-result-main');
    const sub = document.getElementById('hijri-result-sub');
    if (lbl) lbl.textContent = 'Hijri Date';
    if (main) main.textContent = `${hDate.d} ${HIJRI_MONTHS_EN[hDate.m]} ${hDate.y} AH`;
    if (sub) sub.textContent = `${dayName} · ${gd} ${GREG_MONTHS_EN[gm]} ${gy}`;
  } else {
    const hy = parseInt(document.getElementById('hh-year')?.value);
    const hm = parseInt(document.getElementById('hh-month')?.value);
    const hd = parseInt(document.getElementById('hh-day')?.value);
    if (!hy || !hm || !hd || hy < 1200 || hy > 1600) {
      alert('Please enter a valid Hijri date.'); return;
    }
    gDate = hijriToGregorian(hy, hm, hd);
    hDate = { y: hy, m: hm, d: hd };
    const dayName = DAYS_EN[new Date(Date.UTC(gDate.y, gDate.m - 1, gDate.d)).getUTCDay()];
    const lbl = document.getElementById('hijri-result-label');
    const main = document.getElementById('hijri-result-main');
    const sub = document.getElementById('hijri-result-sub');
    if (lbl) lbl.textContent = 'Gregorian Date';
    if (main) main.textContent = `${dayName}, ${gDate.d} ${GREG_MONTHS_EN[gDate.m]} ${gDate.y}`;
    if (sub) sub.textContent = `Hijri: ${hDate.d} ${HIJRI_MONTHS_EN[hDate.m]} ${hDate.y} AH`;
  }

  const res = document.getElementById('hijri-result');
  if (res) { res.style.display = ''; res.style.animation = 'none'; void res.offsetWidth; res.style.animation = ''; }

  renderHijriCalendar(gDate, hDate);
  showHistoricalEvents(gDate);
}

// ── Dual calendar renderer ──
function renderHijriCalendar(gDate, hDate) {
  const cals = document.getElementById('hijri-calendars');
  if (!cals) return;
  cals.style.display = '';

  const today = new Date();
  const todayY = today.getFullYear(), todayM = today.getMonth() + 1, todayD = today.getDate();

  // Gregorian calendar for gDate.m / gDate.y
  const gregTitle = document.getElementById('hijri-greg-title');
  const gregGrid = document.getElementById('hijri-greg-grid');
  if (gregTitle) gregTitle.textContent = `${GREG_MONTHS_EN[gDate.m]} ${gDate.y}`;
  if (gregGrid) {
    gregGrid.innerHTML = '';
    const firstDay = new Date(gDate.y, gDate.m - 1, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(gDate.y, gDate.m, 0).getDate();
    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      const cell = document.createElement('div');
      cell.className = 'hijri-cal-cell empty';
      gregGrid.appendChild(cell);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const cell = document.createElement('div');
      let cls = 'hijri-cal-cell';
      if (d === gDate.d) cls += ' selected';
      else if (d === todayD && gDate.m === todayM && gDate.y === todayY) cls += ' today';
      const dow = new Date(gDate.y, gDate.m - 1, d).getDay();
      if (dow === 0 || dow === 6) cls += ' weekend';
      cell.className = cls;
      cell.textContent = d;
      gregGrid.appendChild(cell);
    }
  }

  // Hijri calendar for hDate.m / hDate.y
  const hijrTitle = document.getElementById('hijri-hijr-title');
  const hijrGrid = document.getElementById('hijri-hijr-grid');
  if (hijrTitle) hijrTitle.textContent = `${HIJRI_MONTHS_EN[hDate.m]} ${hDate.y} AH`;
  if (hijrGrid) {
    hijrGrid.innerHTML = '';
    // Get day of week for 1st of this Hijri month
    const firstGOf1st = hijriToGregorian(hDate.y, hDate.m, 1);
    const firstDow = new Date(firstGOf1st.y, firstGOf1st.m - 1, firstGOf1st.d).getDay();
    const hijriMonthLen = _hijriMonthLength(hDate.y, hDate.m);
    // In RTL/Saturday-first layout: offset from Saturday (6)
    // Sunday-first grid: offset = day of week (0=Sun)
    for (let i = 0; i < firstDow; i++) {
      const cell = document.createElement('div');
      cell.className = 'hijri-cal-cell empty';
      hijrGrid.appendChild(cell);
    }
    for (let d = 1; d <= hijriMonthLen; d++) {
      const cell = document.createElement('div');
      let cls = 'hijri-cal-cell';
      if (d === hDate.d) cls += ' selected';
      // Friday = off day in Islamic calendar (day index 5)
      const gOfD = hijriToGregorian(hDate.y, hDate.m, d);
      const dow = new Date(gOfD.y, gOfD.m - 1, gOfD.d).getDay();
      if (dow === 5 || dow === 6) cls += ' weekend';
      cell.className = cls;
      cell.textContent = d;
      hijrGrid.appendChild(cell);
    }
  }
}

function _hijriMonthLength(hy, hm) {
  // Accurate: convert 1st of this month and 1st of next month to Gregorian, diff the ms
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
  // Fallback: tabular rule
  if (hm % 2 === 1) return 30;
  if (hm === 12) {
    const leap = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29];
    return leap.includes(((hy % 30) + 30) % 30) ? 30 : 29;
  }
  return 29;
}

// ── Historical events dataset (keyed by "MM-DD") ──
const HIJRI_EVENTS = {
  '01-01': [{ y: '1492', e: 'Christopher Columbus lands in the Americas (Santo Domingo).' },
  { y: '1801', e: 'United Kingdom of Great Britain and Ireland proclaimed.' }],
  '01-06': [{ y: '1412', e: 'Joan of Arc born in Domrémy, France.' }],
  '01-15': [{ y: '1559', e: 'Elizabeth I crowned Queen of England.' },
  { y: '2001', e: 'Wikipedia launched online.' }],
  '01-25': [{ y: '1858', e: 'Marriage overture Mendelssohn first played at a royal wedding.' }],
  '02-04': [{ y: '1783', e: 'Ottoman Empire recognises US independence.' },
  { y: '2004', e: 'Facebook founded by Mark Zuckerberg.' }],
  '02-12': [{ y: '1809', e: 'Charles Darwin and Abraham Lincoln born on the same day.' }],
  '02-14': [{ y: '1929', e: 'St. Valentine\'s Day Massacre in Chicago.' }],
  '02-23': [{ y: '1945', e: 'US Marines raise flag on Iwo Jima.' }],
  '03-04': [{ y: '1681', e: 'William Penn granted charter for Pennsylvania.' },
  { y: '1877', e: 'Tchaikovsky\'s Swan Lake premieres in Moscow.' }],
  '03-14': [{ y: '1879', e: 'Albert Einstein born in Ulm, Germany.' },
  { y: '1950', e: 'Israel becomes member of the United Nations.' }],
  '03-20': [{ y: '1413', e: 'Henry V becomes King of England.' },
  { y: '1995', e: 'Sarin gas attack on Tokyo subway.' }],
  '04-01': [{ y: '1976', e: 'Apple Inc. founded by Steve Jobs, Steve Wozniak, and Ronald Wayne.' }],
  '04-06': [{ y: '1453', e: 'Fall of Constantinople begins; Ottoman siege intensifies.' }],
  '04-12': [{ y: '1961', e: 'Yuri Gagarin becomes first human in space.' },
  { y: '1955', e: 'Polio vaccine declared safe and effective.' }],
  '04-14': [{ y: '1912', e: 'RMS Titanic strikes iceberg and sinks.' }],
  '04-22': [{ y: '1970', e: 'First Earth Day celebrated.' }],
  '05-06': [{ y: '1937', e: 'Hindenburg airship disaster at Lakehurst, NJ.' }],
  '05-10': [{ y: '1869', e: 'First transcontinental railroad completed in the US.' }],
  '05-14': [{ y: '1948', e: 'State of Israel declared; David Ben-Gurion becomes PM.' }],
  '05-25': [{ y: '1977', e: 'Star Wars (Episode IV) premieres in theatres.' }],
  '06-04': [{ y: '1989', e: 'Tiananmen Square massacre, Beijing.' }],
  '06-06': [{ y: '1944', e: 'D-Day: Allied forces launch Normandy invasion (WWII).' }],
  '06-16': [{ y: '1963', e: 'Valentina Tereshkova becomes first woman in space.' }],
  '07-04': [{ y: '1776', e: 'United States Declaration of Independence signed.' },
  { y: '1054', e: 'Supernova creating Crab Nebula observed in China and Islamic world.' }],
  '07-16': [{ y: '622', e: 'Prophet Muhammad\'s Hijra from Mecca to Medina — start of Islamic calendar.' }],
  '07-20': [{ y: '1969', e: 'Apollo 11 Moon landing; Neil Armstrong walks on the Moon.' }],
  '07-28': [{ y: '1914', e: 'World War I begins with Austria–Hungary declares war on Serbia.' }],
  '08-06': [{ y: '1945', e: 'US drops atomic bomb on Hiroshima, Japan.' }],
  '08-09': [{ y: '1945', e: 'US drops atomic bomb on Nagasaki, Japan.' }],
  '08-15': [{ y: '1947', e: 'India gains independence from British rule.' }],
  '09-11': [{ y: '2001', e: 'Terrorist attacks destroy World Trade Center towers in New York.' }],
  '09-17': [{ y: '1978', e: 'Camp David Accords signed between Egypt and Israel.' }],
  '10-04': [{ y: '1957', e: 'Sputnik 1 launched — first artificial Earth satellite.' }],
  '10-12': [{ y: '1492', e: 'Columbus sights the Bahamas; first European contact with Americas.' }],
  '10-23': [{ y: '1956', e: 'Hungarian Revolution begins against Soviet rule.' }],
  '10-29': [{ y: '1929', e: 'Black Tuesday — Wall Street crash triggers Great Depression.' }],
  '11-02': [{ y: '1917', e: 'Balfour Declaration: Britain pledges support for Jewish homeland.' }],
  '11-04': [{ y: '1979', e: 'Iranian students take US embassy in Tehran hostage crisis.' }],
  '11-09': [{ y: '1989', e: 'Berlin Wall falls, reuniting East and West Germany.' },
  { y: '1938', e: 'Kristallnacht (Night of Broken Glass) pogroms in Nazi Germany.' }],
  '11-11': [{ y: '1918', e: 'Armistice signed; World War I ends.' }],
  '11-19': [{ y: '1863', e: 'Lincoln delivers Gettysburg Address.' }],
  '11-22': [{ y: '1963', e: 'President John F. Kennedy assassinated in Dallas, Texas.' }],
  '12-07': [{ y: '1941', e: 'Japan attacks Pearl Harbor; US enters World War II.' }],
  '12-10': [{ y: '1948', e: 'UN adopts the Universal Declaration of Human Rights.' }],
  '12-17': [{ y: '1903', e: 'Wright Brothers make first powered airplane flight.' }],
  '12-25': [{ y: '800', e: 'Charlemagne crowned Holy Roman Emperor.' },
  { y: '1991', e: 'Soviet Union officially dissolved.' }],
};

function showHistoricalEvents(gDate) {
  const evtsWrap = document.getElementById('hijri-events-wrap');
  const evtsList = document.getElementById('hijri-events-list');
  if (!evtsWrap || !evtsList) return;

  const key = String(gDate.m).padStart(2, '0') + '-' + String(gDate.d).padStart(2, '0');
  const events = HIJRI_EVENTS[key] || [];
  evtsWrap.style.display = '';
  evtsList.innerHTML = '';

  if (events.length === 0) {
    evtsList.innerHTML = '<div class="hijri-no-events">No major events recorded on this specific day.</div>';
    return;
  }

  events.forEach(ev => {
    const item = document.createElement('div');
    item.className = 'hijri-event-item';
    item.innerHTML = `<div class="hijri-event-dot"></div>
      <div class="hijri-event-text">${ev.e}</div>
      <div class="hijri-event-year">${ev.y}</div>`;
    evtsList.appendChild(item);
  });
}

// ═══════════════════════════════════════════
//  CALENDAR CONTRACEPTION
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

  document.getElementById("r-contra-fertile").textContent = `${fertileStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${fertileEnd.toLocaleDateString('en-US', fmtOptions)}`;
  document.getElementById("r-contra-ovulation").textContent = ovulation.toLocaleDateString('en-US', fmtOptions);
  document.getElementById("r-contra-next").textContent = nextPeriod.toLocaleDateString('en-US', fmtOptions);

  document.getElementById("r-contra-safe").textContent = `Safe days are outside the fertile window (${fertileStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${fertileEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}).`;

  document.getElementById("r-contra").classList.add("show");
}

// ═══════════════════════════════════════════
// 34. TYPING PRACTICE CALCULATOR
// ═══════════════════════════════════════════
function initTyping() {
  const sampleTexts = [
    "Typing is the process of writing or inputting text by pressing keys on a typewriter, computer keyboard, cell phone, or calculator.",
    "The quick brown fox jumps over the lazy dog. This sentence contains every letter in the English alphabet.",
    "Technology is best when it brings people together. Learning to type efficiently is a valuable skill in the modern world.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. Keep practicing to improve.",
    "Programming is thinking, not typing. However, being able to type quickly allows programmers to express their thoughts faster.",
    "In the middle of every difficulty lies opportunity. Challenge yourself to reach higher typing speeds with better accuracy.",
    "Water is the driving force of all nature. Remember to stay hydrated during long coding or typing sessions.",
    "The only limit to our realization of tomorrow will be our doubts of today. Push your boundaries and watch your WPM soar.",
    "Simplicity is the soul of efficiency. Clear your mind, focus on the screen, and let your fingers glide across the keys automatically.",
    "Reading is to the mind what exercise is to the body. Practicing typing regularly keeps your muscle memory sharp and ready.",
    "Do what you can, with what you have, where you are. Every minute of practice brings you closer to your ultimate typing goal."
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
    const savedLayout = localStorage.getItem('keyboard-layout-en') || (navigator.platform.toUpperCase().indexOf('MAC') >= 0 ? 'mac' : 'pc');
    layoutSelect.value = savedLayout;

    function applyLayout() {
      const layout = layoutSelect.value;
      localStorage.setItem('keyboard-layout-en', layout);

      const enterKey = document.querySelector('.key[data-code="Enter"]');
      const backspaceKey = document.querySelector('.key[data-code="Backspace"]');
      const backquoteKey = document.querySelector('.key[data-code="Backquote"]');
      const backslashKey = document.querySelector('.key[data-code="Backslash"]');
      const intlBackslashKey = document.querySelector('.key[data-code="IntlBackslash"]');

      if (layout === 'mac') {
        if (enterKey) enterKey.textContent = 'return';
        if (backspaceKey) backspaceKey.textContent = 'delete';
        if (backquoteKey) backquoteKey.innerHTML = '<span style="font-size: 0.7rem; opacity: 0.8;">±</span><span style="font-size: 0.9rem;">§</span>';
        if (backslashKey) backslashKey.innerHTML = '<span style="font-size: 0.7rem; opacity: 0.8;">|</span><span style="font-size: 0.9rem;">\\</span>';
        if (intlBackslashKey) {
          intlBackslashKey.style.display = 'flex';
          intlBackslashKey.innerHTML = '<span style="font-size: 0.7rem; opacity: 0.8;">~</span><span style="font-size: 0.9rem;">`</span>';
        }
      } else {
        if (enterKey) enterKey.textContent = 'Enter';
        if (backspaceKey) backspaceKey.textContent = '←';
        if (backquoteKey) backquoteKey.textContent = '`';
        if (backslashKey) backslashKey.textContent = '\\';
        if (intlBackslashKey) intlBackslashKey.style.display = 'none';
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
        // If it's a character-producing key (standard typing)
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
        const char = keyEl.innerText.trim().charAt(0).toLowerCase();
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


