const CACHE_NAME = "calcwise-v1772760428303";
const ASSETS = [
  "/",
  "/index.html",
  "/index-ar.html",
  "/styles.min.css",
  "/styles-rtl.min.css",
  "/theme.min.css",
  "/app.min.js",
  "/app-ar.min.js",
  "/about.html",
  "/about-ar.html",
  "/blog.html",
  "/blog-ar.html",
  "/privacy.html",
  "/privacy-ar.html",
  "/terms.html",
  "/terms-ar.html",
  "/og-image.png",
  "/icon-192.png",
  "/icon-512.png",
  "/offline.html",
  "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500;600;700&display=swap",
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Amiri:ital@0;1&display=swap",
  "/templates/en/age.html",
  "/templates/en/base.html",
  "/templates/en/bmi.html",
  "/templates/en/bodyfat.html",
  "/templates/en/calories.html",
  "/templates/en/compound.html",
  "/templates/en/contraception.html",
  "/templates/en/cooking.html",
  "/templates/en/countdown.html",
  "/templates/en/creditcard.html",
  "/templates/en/currency.html",
  "/templates/en/datediff.html",
  "/templates/en/fuel.html",
  "/templates/en/geometry.html",
  "/templates/en/gpa.html",
  "/templates/en/heartrate.html",
  "/templates/en/hijri.html",
  "/templates/en/idealweight.html",
  "/templates/en/inflation.html",
  "/templates/en/loan.html",
  "/templates/en/macros.html",
  "/templates/en/mortgage.html",
  "/templates/en/pace.html",
  "/templates/en/percentage.html",
  "/templates/en/pregnancy.html",
  "/templates/en/probability.html",
  "/templates/en/quadratic.html",
  "/templates/en/random.html",
  "/templates/en/retirement.html",
  "/templates/en/roi.html",
  "/templates/en/salary.html",
  "/templates/en/scientific.html",
  "/templates/en/sleep.html",
  "/templates/en/speed.html",
  "/templates/en/tax.html",
  "/templates/en/timezone.html",
  "/templates/en/tip.html",
  "/templates/en/typing.html",
  "/templates/en/units.html",
  "/templates/en/water.html",
  "/templates/ar/age.html",
  "/templates/ar/base.html",
  "/templates/ar/bmi.html",
  "/templates/ar/bodyfat.html",
  "/templates/ar/calories.html",
  "/templates/ar/compound.html",
  "/templates/ar/contraception.html",
  "/templates/ar/cooking.html",
  "/templates/ar/countdown.html",
  "/templates/ar/creditcard.html",
  "/templates/ar/currency.html",
  "/templates/ar/datediff.html",
  "/templates/ar/fuel.html",
  "/templates/ar/geometry.html",
  "/templates/ar/gpa.html",
  "/templates/ar/heartrate.html",
  "/templates/ar/hijri.html",
  "/templates/ar/idealweight.html",
  "/templates/ar/inflation.html",
  "/templates/ar/loan.html",
  "/templates/ar/macros.html",
  "/templates/ar/mortgage.html",
  "/templates/ar/pace.html",
  "/templates/ar/percentage.html",
  "/templates/ar/pregnancy.html",
  "/templates/ar/probability.html",
  "/templates/ar/quadratic.html",
  "/templates/ar/random.html",
  "/templates/ar/retirement.html",
  "/templates/ar/roi.html",
  "/templates/ar/salary.html",
  "/templates/ar/scientific.html",
  "/templates/ar/sleep.html",
  "/templates/ar/speed.html",
  "/templates/ar/tax.html",
  "/templates/ar/timezone.html",
  "/templates/ar/tip.html",
  "/templates/ar/typing.html",
  "/templates/ar/units.html",
  "/templates/ar/water.html",
  "/blog/body-fat-vs-bmi-which-is-better-ar.html",
  "/blog/body-fat-vs-bmi-which-is-better.html",
  "/blog/buying-vs-renting-hidden-costs-ar.html",
  "/blog/buying-vs-renting-hidden-costs.html",
  "/blog/compound-interest-explained-ar.html",
  "/blog/compound-interest-explained.html",
  "/blog/cooking-unit-conversions-math-ar.html",
  "/blog/cooking-unit-conversions-math.html",
  "/blog/credit-card-minimum-payment-trap-ar.html",
  "/blog/credit-card-minimum-payment-trap.html",
  "/blog/date-difference-math-of-time-ar.html",
  "/blog/date-difference-math-of-time.html",
  "/blog/eisenhower-matrix-guide-ar.html",
  "/blog/eisenhower-matrix-guide.html",
  "/blog/emergency-fund-guide-ar.html",
  "/blog/emergency-fund-guide.html",
  "/blog/fuel-efficiency-myths-debunked-ar.html",
  "/blog/fuel-efficiency-myths-debunked.html",
  "/blog/geometry-in-daily-architecture-ar.html",
  "/blog/geometry-in-daily-architecture.html",
  "/blog/global-tipping-etiquette-math-ar.html",
  "/blog/global-tipping-etiquette-math.html",
  "/blog/heart-rate-zones-training-ar.html",
  "/blog/heart-rate-zones-training.html",
  "/blog/how-gpa-is-actually-calculated-ar.html",
  "/blog/how-gpa-is-actually-calculated.html",
  "/blog/how-many-calories-should-you-eat-ar.html",
  "/blog/how-many-calories-should-you-eat.html",
  "/blog/how-to-calculate-mortgage-ar.html",
  "/blog/how-to-calculate-mortgage.html",
  "/blog/how-to-calculate-percentage-change-ar.html",
  "/blog/how-to-calculate-percentage-change.html",
  "/blog/ideal-weight-vs-healthy-weight-ar.html",
  "/blog/ideal-weight-vs-healthy-weight.html",
  "/blog/inflation-impact-on-savings-ar.html",
  "/blog/inflation-impact-on-savings.html",
  "/blog/intermittent-fasting-for-beginners-ar.html",
  "/blog/intermittent-fasting-for-beginners.html",
  "/blog/macronutrients-explained-ar.html",
  "/blog/macronutrients-explained.html",
  "/blog/math-of-hydration-ar.html",
  "/blog/math-of-hydration.html",
  "/blog/mental-math-tricks-ar.html",
  "/blog/mental-math-tricks.html",
  "/blog/metric-vs-imperial-conversion-ar.html",
  "/blog/metric-vs-imperial-conversion.html",
  "/blog/personal-vs-auto-loans-ar.html",
  "/blog/personal-vs-auto-loans.html",
  "/blog/power-of-consistent-savings-ar.html",
  "/blog/power-of-consistent-savings.html",
  "/blog/pregnancy-due-date-expectations-ar.html",
  "/blog/pregnancy-due-date-expectations.html",
  "/blog/probability-and-chance-math-ar.html",
  "/blog/probability-and-chance-math.html",
  "/blog/roi-measuring-investment-success-ar.html",
  "/blog/roi-measuring-investment-success.html",
  "/blog/salary-vs-hourly-pay-ar.html",
  "/blog/salary-vs-hourly-pay.html",
  "/blog/science-of-age-chronology-ar.html",
  "/blog/science-of-age-chronology.html",
  "/blog/scientific-math-language-of-universe-ar.html",
  "/blog/scientific-math-language-of-universe.html",
  "/blog/sleep-cycles-explained-ar.html",
  "/blog/sleep-cycles-explained.html",
  "/blog/starting-retirement-at-25-vs-35-ar.html",
  "/blog/starting-retirement-at-25-vs-35.html",
  "/blog/strength-vs-cardio-calories-ar.html",
  "/blog/strength-vs-cardio-calories.html",
  "/blog/student-loans-avalanche-vs-snowball-ar.html",
  "/blog/student-loans-avalanche-vs-snowball.html",
  "/blog/the-50-30-20-budgeting-rule-ar.html",
  "/blog/the-50-30-20-budgeting-rule.html",
  "/blog/the-pomodoro-technique-for-productivity-ar.html",
  "/blog/the-pomodoro-technique-for-productivity.html",
  "/blog/the-rule-of-72-math-ar.html",
  "/blog/the-rule-of-72-math.html",
  "/blog/typing-speed-career-success-ar.html",
  "/blog/typing-speed-career-success.html",
  "/blog/what-bmi-really-tells-you-ar.html",
  "/blog/what-bmi-really-tells-you.html"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((c) => c.addAll(ASSETS))
      .catch((err) => console.error("SW Install Error", err)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // Bypass SW for API calls (local python backend)
  if (url.pathname.startsWith("/extract") || url.port === "8000") {
    return;
  }

  // HTML pages: Network-first, fallback to cache, then offline.html
  if (
    e.request.mode === "navigate" ||
    url.pathname.endsWith(".html") ||
    url.pathname === "/"
  ) {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
          return response;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(e.request);
          if (cachedResponse) return cachedResponse;

          // Fallbacks based on language (optional, falling back to offline.html for now)
          return caches.match("/offline.html");
        }),
    );
    return;
  }

  // Stale-while-Revalidate for CSS/JS/Fonts/Images
  if (
    e.request.destination === "style" ||
    e.request.destination === "script" ||
    url.origin.includes("fonts.")
  ) {
    e.respondWith(
      caches.match(e.request).then((cachedResponse) => {
        const fetchPromise = fetch(e.request)
          .then((networkResponse) => {
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(e.request, networkResponse.clone()));
            return networkResponse;
          })
          .catch(() => {
            // Ignore fetch errors to simply use the cache
          });
        return cachedResponse || fetchPromise;
      }),
    );
    return;
  }

  // Default Cache-first for other assets (Images)
  e.respondWith(
    caches.match(e.request).then((r) => {
      if (r) return r;
      return fetch(e.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
          return response;
        })
        .catch(() => new Response("Offline", { status: 503 }));
    }),
  );
});
