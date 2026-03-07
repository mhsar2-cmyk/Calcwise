const translations = {
  en: {
    "nav-dashboard": "Dashboard",
    "nav-market": "Market",
    "nav-ai": "AI Tools",
    "nav-subs": "Subscriptions",
    "btn-login": "Login",
    "btn-register": "Register",
    "search-placeholder": "Search Markets (e.g. BTC, TSLA, EUR/USD)",
    "card-title-ai": "AI Sentiment Analysis",
    "card-title-strategy": "Strategy Builder",
    "card-title-watchlist": "Watchlist",
    "card-title-news": "Market News",
    "label-fear": "Extreme Fear",
    "label-greed": "Extreme Greed",
    "ai-sentiment-summary":
      "Strong bullish momentum detected in social trends and news volume.",
    "strategy-help": "Ask AI to generate a Pine Script or explain patterns.",
    "btn-chat": "Start New Session",
  },
  ar: {
    "nav-dashboard": "لوحة التحكم",
    "nav-market": "السوق",
    "nav-ai": "أدوات الذكاء الاصطناعي",
    "nav-subs": "الاشتراكات",
    "btn-login": "تسجيل الدخول",
    "btn-register": "تسجيل جديد",
    "search-placeholder": "بحث في الأسواق (مثلاً BTC, TSLA)",
    "card-title-ai": "تحليل مشاعر الذكاء الاصطناعي",
    "card-title-strategy": "منشئ الاستراتيجيات",
    "card-title-watchlist": "قائمة المراقبة",
    "card-title-news": "أخبار السوق",
    "label-fear": "خوف شديد",
    "label-greed": "طمع شديد",
    "ai-sentiment-summary":
      "تم اكتشاف زخم صعودي قوي في الاتجاهات الاجتماعية وحجم الأخبار.",
    "strategy-help":
      "اطلب من الذكاء الاصطناعي إنشاء Pine Script أو شرح الأنماط.",
    "btn-chat": "بدء جلسة جديدة",
  },
};

class App {
  constructor() {
    this.currentLang = localStorage.getItem("lang") || "en";
    this.currentTheme = localStorage.getItem("theme") || "dark";
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.applyTheme(this.currentTheme);
    this.applyLanguage(this.currentLang);
    this.initChart();
    this.initRealTimeData();
    this.fetchAISentiment();
  }

  setupEventListeners() {
    // Sidebar link active state
    document.querySelectorAll(".sidebar-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        document
          .querySelectorAll(".sidebar-link")
          .forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      });
    });

    // Language Toggle
    const langBtn = document.getElementById("lang-toggle");
    langBtn.addEventListener("click", () => {
      const nextLang = this.currentLang === "en" ? "ar" : "en";
      this.applyLanguage(nextLang);
    });

    // Theme Toggle
    const themeBtn = document.getElementById("theme-toggle");
    themeBtn.addEventListener("click", () => {
      const nextTheme = this.currentTheme === "dark" ? "light" : "dark";
      this.applyTheme(nextTheme);
    });

    // Mobile Menu Toggle
    const menuBtn = document.getElementById("menu-toggle");
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".sidebar-overlay");

    const toggleSidebar = () => {
      sidebar.classList.toggle("active");
      overlay.classList.toggle("active");
      // Trigger chart resize after transition
      setTimeout(() => this.resizeCharts(), 300);
    };

    if (menuBtn) menuBtn.addEventListener("click", toggleSidebar);
    if (overlay) overlay.addEventListener("click", toggleSidebar);

    // Close sidebar on link click (mobile)
    document.querySelectorAll(".sidebar-link").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          toggleSidebar();
        }
      });
    });
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    const sunIcon = document.querySelector(".sun-icon");
    const moonIcon = document.querySelector(".moon-icon");
    if (sunIcon && moonIcon) {
      sunIcon.style.display = theme === "dark" ? "block" : "none";
      moonIcon.style.display = theme === "dark" ? "none" : "block";
    }

    if (this.chart) {
      const isDark = theme === "dark";
      this.chart.applyOptions({
        layout: {
          background: { color: isDark ? "#16181b" : "#ffffff" },
          textColor: isDark ? "#848e9c" : "#5e6673",
        },
        grid: {
          vertLines: { color: isDark ? "#2b3139" : "#eaecef" },
          horzLines: { color: isDark ? "#2b3139" : "#eaecef" },
        },
        rightPriceScale: { borderColor: isDark ? "#2b3139" : "#eaecef" },
        timeScale: { borderColor: isDark ? "#2b3139" : "#eaecef" },
      });
    }
  }

  applyLanguage(lang) {
    this.currentLang = lang;
    const html = document.documentElement;
    html.setAttribute("lang", lang);
    html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    localStorage.setItem("lang", lang);

    const langText = document.querySelector(".lang-text");
    if (langText) langText.innerText = lang.toUpperCase();

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        el.innerText = translations[lang][key];
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (translations[lang] && translations[lang][key]) {
        el.placeholder = translations[lang][key];
      }
    });
  }

  initRealTimeData() {
    // Binance Public WebSocket for BTCUSDT
    const ws = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@kline_1m",
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const kline = data.k;
      const price = parseFloat(kline.c);
      const change = (
        ((price - parseFloat(kline.o)) / parseFloat(kline.o)) *
        100
      ).toFixed(2);

      this.updatePriceUI(price, change);
      this.updateChartData({
        time: kline.t / 1000,
        open: parseFloat(kline.o),
        high: parseFloat(kline.h),
        low: parseFloat(kline.l),
        close: parseFloat(kline.c),
      });
    };
  }

  updatePriceUI(price, change) {
    const priceEl = document.querySelector(".market-price");
    const changeEl = document.querySelector(".market-change");
    if (!priceEl || !changeEl) return;

    priceEl.innerText = `$${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
    changeEl.innerText = `${change > 0 ? "+" : ""}${change}%`;

    const isUp = change >= 0;
    priceEl.className = `market-price ${isUp ? "up" : "down"}`;
    changeEl.className = `market-change ${isUp ? "up" : "down"}`;
  }

  async fetchAISentiment() {
    try {
      const response = await fetch("/api/market/sentiment");
      const data = await response.json();

      if (data.success) {
        this.updateSentimentUI(data.sentiment);
        this.updateNewsUI(data.news);
      }
    } catch (error) {
      console.error("Sentiment Fetch Error:", error);
    }
  }

  updateSentimentUI(sentiment) {
    const pointer = document.querySelector(".meter-pointer");
    const summary = document.querySelector(".ai-summary");
    if (!pointer || !summary) return;

    pointer.style.left = `${sentiment.score}%`;
    summary.innerText = sentiment.summary;
  }

  updateNewsUI(news) {
    const newsList = document.querySelector(".news-list");
    if (!newsList) return;

    newsList.innerHTML = news
      .map(
        (item) => `
            <div class="news-item">
                <span class="news-time">${item.time}</span>
                <p>${item.title}</p>
            </div>
        `,
      )
      .join("");
  }

  initChart() {
    const chartContainer = document.getElementById("main-chart");
    const rsiContainer = document.getElementById("rsi-chart");
    if (!chartContainer || !rsiContainer) return;

    this.history = []; // Price history buffer

    const isDark = this.currentTheme === "dark";
    const chartOptions = {
      layout: {
        background: { color: isDark ? "#16181b" : "#ffffff" },
        textColor: isDark ? "#848e9c" : "#5e6673",
      },
      grid: {
        vertLines: { color: isDark ? "#2b3139" : "#eaecef" },
        horzLines: { color: isDark ? "#2b3139" : "#eaecef" },
      },
      crosshair: { mode: LightweightCharts.CrosshairMode.Normal },
      rightPriceScale: { borderColor: isDark ? "#2b3139" : "#eaecef" },
      timeScale: { borderColor: isDark ? "#2b3139" : "#eaecef", visible: true },
    };

    // Main Chart
    this.chart = LightweightCharts.createChart(chartContainer, chartOptions);
    this.candleSeries = this.chart.addCandlestickSeries({
      upColor: "#00c076",
      downColor: "#ff3b3b",
      borderVisible: false,
      wickUpColor: "#00c076",
      wickDownColor: "#ff3b3b",
    });

    // SMA Series
    this.sma20Series = this.chart.addLineSeries({
      color: "#3d6eff",
      lineWidth: 1,
      title: "SMA 20",
    });
    this.sma50Series = this.chart.addLineSeries({
      color: "#f0b90b",
      lineWidth: 1,
      title: "SMA 50",
    });

    // RSI Chart
    this.rsiChart = LightweightCharts.createChart(rsiContainer, {
      ...chartOptions,
      timeScale: { ...chartOptions.timeScale, visible: false }, // Hide time scale on RSI
    });

    this.rsiSeries = this.rsiChart.addLineSeries({
      color: "#a020f0",
      lineWidth: 2,
      title: "RSI 14",
    });

    // Add RSI Overbought/Oversold levels
    this.rsiSeries.createPriceLine({
      price: 70,
      color: "#ff3b3b",
      lineWidth: 1,
      lineStyle: 2,
      axisLabelVisible: true,
      title: "70",
    });
    this.rsiSeries.createPriceLine({
      price: 30,
      color: "#00c076",
      lineWidth: 1,
      lineStyle: 2,
      axisLabelVisible: true,
      title: "30",
    });

    window.addEventListener("resize", () => this.resizeCharts());
  }

  resizeCharts() {
    const chartContainer = document.getElementById("main-chart");
    const rsiContainer = document.getElementById("rsi-chart");
    if (!chartContainer || !rsiContainer) return;

    if (this.chart) {
      this.chart.applyOptions({
        width: chartContainer.clientWidth,
        height: chartContainer.clientHeight,
      });
    }
    if (this.rsiChart) {
      this.rsiChart.applyOptions({
        width: rsiContainer.clientWidth,
        height: rsiContainer.clientHeight,
      });
    }
  }

  updateChartData(kline) {
    if (!this.candleSeries) return;

    this.candleSeries.update(kline);

    // Update history for indicators
    const lastBar = this.history[this.history.length - 1];
    if (!lastBar || lastBar.time !== kline.time) {
      this.history.push(kline);
      if (this.history.length > 200) this.history.shift(); // Keep buffer sane
    } else {
      this.history[this.history.length - 1] = kline;
    }

    this.updateIndicators(kline.time);
  }

  updateIndicators(time) {
    if (this.history.length < 2) return;

    const closes = this.history.map((bar) => bar.close);

    // SMA 20
    if (closes.length >= 20) {
      const sma20 = this.calculateSMA(closes, 20);
      this.sma20Series.update({ time, value: sma20 });
    }

    // SMA 50
    if (closes.length >= 50) {
      const sma50 = this.calculateSMA(closes, 50);
      this.sma50Series.update({ time, value: sma50 });
    }

    // RSI 14
    if (closes.length >= 14) {
      const rsi = this.calculateRSI(closes, 14);
      this.rsiSeries.update({ time, value: rsi });
    }
  }

  calculateSMA(data, period) {
    const slice = data.slice(-period);
    return slice.reduce((a, b) => a + b, 0) / period;
  }

  calculateRSI(data, period) {
    let gains = 0;
    let losses = 0;

    for (let i = data.length - period; i < data.length; i++) {
      const diff = data[i] - data[i - 1];
      if (diff >= 0) gains += diff;
      else losses -= diff;
    }

    const avgGain = gains / period;
    const avgLoss = losses / period;

    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return 100 - 100 / (1 + rs);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new App();
});
