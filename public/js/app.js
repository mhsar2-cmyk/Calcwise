const translations = {
    en: {
        'nav-dashboard': 'Dashboard',
        'nav-market': 'Market',
        'nav-ai': 'AI Tools',
        'nav-subs': 'Subscriptions',
        'btn-login': 'Login',
        'btn-register': 'Register',
        'search-placeholder': 'Search Markets (e.g. BTC, TSLA, EUR/USD)',
        'card-title-ai': 'AI Sentiment Analysis',
        'card-title-strategy': 'Strategy Builder',
        'card-title-watchlist': 'Watchlist',
        'card-title-news': 'Market News',
        'label-fear': 'Extreme Fear',
        'label-greed': 'Extreme Greed',
        'ai-sentiment-summary': 'Strong bullish momentum detected in social trends and news volume.',
        'strategy-help': 'Ask AI to generate a Pine Script or explain patterns.',
        'btn-chat': 'Start New Session'
    },
    ar: {
        'nav-dashboard': 'لوحة التحكم',
        'nav-market': 'السوق',
        'nav-ai': 'أدوات الذكاء الاصطناعي',
        'nav-subs': 'الاشتراكات',
        'btn-login': 'تسجيل الدخول',
        'btn-register': 'تسجيل جديد',
        'search-placeholder': 'بحث في الأسواق (مثلاً BTC, TSLA)',
        'card-title-ai': 'تحليل مشاعر الذكاء الاصطناعي',
        'card-title-strategy': 'منشئ الاستراتيجيات',
        'card-title-watchlist': 'قائمة المراقبة',
        'card-title-news': 'أخبار السوق',
        'label-fear': 'خوف شديد',
        'label-greed': 'طمع شديد',
        'ai-sentiment-summary': 'تم اكتشاف زخم صعودي قوي في الاتجاهات الاجتماعية وحجم الأخبار.',
        'strategy-help': 'اطلب من الذكاء الاصطناعي إنشاء Pine Script أو شرح الأنماط.',
        'btn-chat': 'بدء جلسة جديدة'
    }
};

class App {
    constructor() {
        this.currentLang = localStorage.getItem('lang') || 'en';
        this.currentTheme = localStorage.getItem('theme') || 'dark';
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
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.addEventListener('click', (e) => {
                document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Language Toggle
        const langBtn = document.getElementById('lang-toggle');
        langBtn.addEventListener('click', () => {
            const nextLang = this.currentLang === 'en' ? 'ar' : 'en';
            this.applyLanguage(nextLang);
        });

        // Theme Toggle
        const themeBtn = document.getElementById('theme-toggle');
        themeBtn.addEventListener('click', () => {
            const nextTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
            this.applyTheme(nextTheme);
        });
    }

    applyTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        const sunIcon = document.querySelector('.sun-icon');
        const moonIcon = document.querySelector('.moon-icon');
        if (sunIcon && moonIcon) {
            sunIcon.style.display = theme === 'dark' ? 'block' : 'none';
            moonIcon.style.display = theme === 'dark' ? 'none' : 'block';
        }

        if (this.chart) {
            const isDark = theme === 'dark';
            this.chart.applyOptions({
                layout: {
                    background: { color: isDark ? '#16181b' : '#ffffff' },
                    textColor: isDark ? '#848e9c' : '#5e6673',
                },
                grid: {
                    vertLines: { color: isDark ? '#2b3139' : '#eaecef' },
                    horzLines: { color: isDark ? '#2b3139' : '#eaecef' },
                },
                rightPriceScale: { borderColor: isDark ? '#2b3139' : '#eaecef' },
                timeScale: { borderColor: isDark ? '#2b3139' : '#eaecef' },
            });
        }
    }

    applyLanguage(lang) {
        this.currentLang = lang;
        const html = document.documentElement;
        html.setAttribute('lang', lang);
        html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        localStorage.setItem('lang', lang);

        const langText = document.querySelector('.lang-text');
        if (langText) langText.innerText = lang.toUpperCase();

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerText = translations[lang][key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });
    }

    initRealTimeData() {
        // Binance Public WebSocket for BTCUSDT
        const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1m');

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const kline = data.k;
            const price = parseFloat(kline.c);
            const change = ((price - parseFloat(kline.o)) / parseFloat(kline.o) * 100).toFixed(2);

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
        const priceEl = document.querySelector('.market-price');
        const changeEl = document.querySelector('.market-change');
        if (!priceEl || !changeEl) return;

        priceEl.innerText = `$${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
        changeEl.innerText = `${change > 0 ? '+' : ''}${change}%`;

        const isUp = change >= 0;
        priceEl.className = `market-price ${isUp ? 'up' : 'down'}`;
        changeEl.className = `market-change ${isUp ? 'up' : 'down'}`;
    }

    async fetchAISentiment() {
        try {
            const response = await fetch('/api/market/sentiment');
            const data = await response.json();

            if (data.success) {
                this.updateSentimentUI(data.sentiment);
                this.updateNewsUI(data.news);
            }
        } catch (error) {
            console.error('Sentiment Fetch Error:', error);
        }
    }

    updateSentimentUI(sentiment) {
        const pointer = document.querySelector('.meter-pointer');
        const summary = document.querySelector('.ai-summary');
        if (!pointer || !summary) return;

        pointer.style.left = `${sentiment.score}%`;
        summary.innerText = sentiment.summary;
    }

    updateNewsUI(news) {
        const newsList = document.querySelector('.news-list');
        if (!newsList) return;

        newsList.innerHTML = news.map(item => `
            <div class="news-item">
                <span class="news-time">${item.time}</span>
                <p>${item.title}</p>
            </div>
        `).join('');
    }

    initChart() {
        const chartContainer = document.getElementById('main-chart');
        if (!chartContainer) return;

        const isDark = this.currentTheme === 'dark';
        this.chart = LightweightCharts.createChart(chartContainer, {
            layout: {
                background: { color: isDark ? '#16181b' : '#ffffff' },
                textColor: isDark ? '#848e9c' : '#5e6673',
            },
            grid: {
                vertLines: { color: isDark ? '#2b3139' : '#eaecef' },
                horzLines: { color: isDark ? '#2b3139' : '#eaecef' },
            },
            crosshair: { mode: LightweightCharts.CrosshairMode.Normal },
            rightPriceScale: { borderColor: isDark ? '#2b3139' : '#eaecef' },
            timeScale: { borderColor: isDark ? '#2b3139' : '#eaecef' },
        });

        this.candleSeries = this.chart.addCandlestickSeries({
            upColor: '#00c076',
            downColor: '#ff3b3b',
            borderVisible: false,
            wickUpColor: '#00c076',
            wickDownColor: '#ff3b3b',
        });

        window.addEventListener('resize', () => {
            this.chart.applyOptions({ width: chartContainer.clientWidth });
        });
    }

    updateChartData(kline) {
        if (this.candleSeries) {
            this.candleSeries.update(kline);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});
