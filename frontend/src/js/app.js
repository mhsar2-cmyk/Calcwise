/**
 * Calcwise App Entry Point
 * Handles i18n, RTL/LTR switching, and Chart Initialization
 */

const translations = {
    en: {
        'nav-dashboard': 'Dashboard',
        'nav-market': 'Market',
        'nav-ai': 'AI Tools',
        'btn-login': 'Login',
        'hero-title': 'Trade Smarter with AI',
        'hero-subtitle': 'Real-time market data and AI-powered sentiment analysis for Crypto, Stocks, and Forex.',
        'btn-start': 'Start Free Trial',
        'card-title-chart': 'BTC/USDT Live Chart',
        'card-title-ai': 'AI Sentiment',
        'label-greed': 'Fear vs Greed'
    },
    ar: {
        'nav-dashboard': 'لوحة التحكم',
        'nav-market': 'السوق',
        'nav-ai': 'أدوات الذكاء الاصطناعي',
        'btn-login': 'تسجيل الدخول',
        'hero-title': 'تداول بذكاء مع الذكاء الاصطناعي',
        'hero-subtitle': 'بيانات السوق في الوقت الفعلي وتحليل المشاعر المدعوم بالذكاء الاصطناعي للعملات المشفرة والأسهم والفوركس.',
        'btn-start': 'ابدأ الفترة التجريبية مجاناً',
        'card-title-chart': 'مخطط BTC/USDT المباشر',
        'card-title-ai': 'مشاعر الذكاء الاصطناعي',
        'label-greed': 'الخوف مقابل الطمع'
    }
};

class App {
    constructor() {
        this.currentLang = 'en';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initChart();
        this.updateUI();
    }

    setupEventListeners() {
        const langToggle = document.getElementById('lang-toggle');
        langToggle.addEventListener('click', () => this.toggleLanguage());
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
        const html = document.documentElement;

        html.setAttribute('lang', this.currentLang);
        html.setAttribute('dir', this.currentLang === 'ar' ? 'rtl' : 'ltr');

        document.querySelector('.lang-text').innerText = this.currentLang.toUpperCase();
        this.updateUI();
    }

    updateUI() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[this.currentLang][key]) {
                el.innerText = translations[this.currentLang][key];
            }
        });
    }

    initChart() {
        const chartContainer = document.getElementById('main-chart');
        if (!chartContainer) return;

        const chart = LightweightCharts.createChart(chartContainer, {
            layout: {
                background: { color: '#16181b' },
                textColor: '#848e9c',
            },
            grid: {
                vertLines: { color: '#2b2f36' },
                horzLines: { color: '#2b2f36' },
            },
            crosshair: {
                mode: LightweightCharts.CrosshairMode.Normal,
            },
            rightPriceScale: {
                borderColor: '#2b2f36',
            },
            timeScale: {
                borderColor: '#2b2f36',
            },
        });

        const lineSeries = chart.addLineSeries({
            color: '#3d6eff',
            lineWidth: 2,
        });

        // Placeholder data
        lineSeries.setData([
            { time: '2023-12-01', value: 38000 },
            { time: '2023-12-02', value: 39500 },
            { time: '2023-12-03', value: 41000 },
            { time: '2023-12-04', value: 42500 },
            { time: '2023-12-05', value: 44000 },
            { time: '2023-12-06', value: 43200 },
            { time: '2023-12-07', value: 45000 },
        ]);

        window.addEventListener('resize', () => {
            chart.applyOptions({ width: chartContainer.clientWidth });
        });
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
