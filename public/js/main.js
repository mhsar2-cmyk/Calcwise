/**
 * CalcWise — Main JavaScript
 * Handles navigation, auth, tools, dashboard, and UI interactions
 */

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    initNavbar();
    initScrollReveal();
    initTicker();
    initParticles();
    initDashboard();
    updateLastUpdated();
    checkAuth();
});

// ===== THEME TOGGLE (Dark / Light) =====
function initTheme() {
    const saved = localStorage.getItem('calcwise_theme') || 'dark';
    applyTheme(saved);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('calcwise_theme', theme);

    // Update toggle UI
    document.querySelectorAll('.theme-toggle .toggle-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.value === theme);
    });
}

function toggleTheme(theme) {
    applyTheme(theme);
}

// ===== LANGUAGE TOGGLE (EN / AR) =====
const translations = {
    // ---- NAVIGATION ----
    'nav-home': { en: 'Home', ar: 'الرئيسية' },
    'nav-markets': { en: 'Markets', ar: 'الأسواق' },
    'nav-blog': { en: 'Blog', ar: 'المدونة' },
    'nav-tools': { en: 'Tools', ar: 'الأدوات' },
    'nav-login': { en: 'Log In', ar: 'تسجيل الدخول' },
    'nav-get-started': { en: 'Get Started', ar: 'ابدأ الآن' },
    'nav-crypto': { en: 'Cryptocurrency', ar: 'العملات الرقمية' },
    'nav-forex': { en: 'Forex', ar: 'الفوركس' },
    'nav-us-stocks': { en: 'US Stocks', ar: 'الأسهم الأمريكية' },
    'nav-saudi': { en: 'Saudi Market', ar: 'السوق السعودي' },

    // ---- HERO ----
    'hero-badge': { en: 'Live Markets — 24/7 Real-Time Data', ar: 'أسواق حيّة — بيانات لحظية على مدار الساعة' },
    'hero-title-1': { en: 'Your All-In-One', ar: 'منصتك الشاملة' },
    'hero-title-2': { en: 'Financial', ar: 'للذكاء' },
    'hero-title-3': { en: 'Intelligence Platform', ar: 'المالي' },
    'hero-desc': { en: 'Track crypto, forex, US stocks, and Saudi markets with real-time data, expert insights, and powerful analytical tools — all in one place.', ar: 'تابع العملات الرقمية، الفوركس، الأسهم الأمريكية، والسوق السعودي ببيانات لحظية وتحليلات متقدمة — في مكان واحد.' },
    'hero-cta-1': { en: 'Start Free Today →', ar: 'ابدأ مجاناً اليوم ←' },
    'hero-cta-2': { en: 'Explore Markets', ar: 'استكشف الأسواق' },
    'hero-stat-1-val': { en: '4', ar: '٤' },
    'hero-stat-1-label': { en: 'Market Platforms', ar: 'منصات أسواق' },
    'hero-stat-2-val': { en: '10K+', ar: '+١٠ آلاف' },
    'hero-stat-2-label': { en: 'Tracked Assets', ar: 'أصل مُتتبّع' },
    'hero-stat-3-val': { en: '24/7', ar: '٢٤/٧' },
    'hero-stat-3-label': { en: 'Live Data', ar: 'بيانات حيّة' },
    'hero-stat-4-val': { en: 'Free', ar: 'مجاني' },
    'hero-stat-4-label': { en: 'To Get Started', ar: 'للبدء' },

    // ---- MARKET PLATFORMS SECTION ----
    'platforms-title-1': { en: 'Explore', ar: 'استكشف' },
    'platforms-title-2': { en: 'Global Markets', ar: 'الأسواق العالمية' },
    'platforms-desc': { en: 'Dive into four major financial markets with real-time data, charts, and actionable insights.', ar: 'انغمس في أربعة أسواق مالية رئيسية مع بيانات لحظية ورسوم بيانية وتحليلات قابلة للتنفيذ.' },
    'platform-crypto-title': { en: 'Cryptocurrency', ar: 'العملات الرقمية' },
    'platform-crypto-desc': { en: 'Bitcoin, Ethereum, and 10,000+ digital assets with live prices, heatmaps, and advanced charts.', ar: 'بتكوين، إيثريوم، و+١٠,٠٠٠ أصل رقمي مع أسعار حيّة وخرائط حرارية ورسوم بيانية متقدمة.' },
    'platform-crypto-link': { en: 'Explore Crypto →', ar: '← استكشف العملات الرقمية' },
    'platform-forex-title': { en: 'Forex', ar: 'الفوركس' },
    'platform-forex-desc': { en: 'Major, minor, and exotic currency pairs with real-time exchange rates and technical analysis.', ar: 'أزواج العملات الرئيسية والثانوية والغريبة مع أسعار صرف حيّة وتحليل فني.' },
    'platform-forex-link': { en: 'Explore Forex →', ar: '← استكشف الفوركس' },
    'platform-us-title': { en: 'US Stocks', ar: 'الأسهم الأمريكية' },
    'platform-us-desc': { en: 'S&P 500, NASDAQ, Dow Jones — track America\'s leading companies and market indices.', ar: 'مؤشر S&P 500، ناسداك، داو جونز — تتبع أكبر الشركات الأمريكية.' },
    'platform-us-link': { en: 'Explore US Market →', ar: '← استكشف السوق الأمريكي' },
    'platform-saudi-title': { en: 'Saudi Market', ar: 'السوق السعودي' },
    'platform-saudi-desc': { en: 'Tadawul (TASI) stocks and indices — comprehensive coverage of the Saudi Arabian exchange.', ar: 'أسهم ومؤشرات تداول (تاسي) — تغطية شاملة للسوق المالية السعودية.' },
    'platform-saudi-link': { en: 'Explore Saudi Market →', ar: '← استكشف السوق السعودي' },

    // ---- LIVE MARKET OVERVIEW ----
    'live-title-1': { en: 'Live', ar: 'نظرة' },
    'live-title-2': { en: 'Market Overview', ar: 'عامة على الأسواق' },
    'live-desc': { en: 'Real-time market data powered by TradingView', ar: 'بيانات السوق اللحظية مدعومة من TradingView' },
    'widget-heatmap': { en: '🔥 Market Heatmap', ar: '🔥 خريطة حرارية' },
    'widget-crypto': { en: '📊 Crypto Overview', ar: '📊 نظرة عامة على الكريبتو' },

    // ---- FEATURES ----
    'features-title-1': { en: 'Why Choose', ar: 'لماذا تختار' },
    'features-title-2': { en: 'CalcWise', ar: 'CalcWise' },
    'features-desc': { en: 'Powerful features designed for both beginners and professionals', ar: 'ميزات قوية مصممة للمبتدئين والمحترفين على حد سواء' },
    'feature-1-title': { en: 'Real-Time Data', ar: 'بيانات لحظية' },
    'feature-1-desc': { en: 'Live prices, charts, and market data updated in real-time across all four market platforms.', ar: 'أسعار ورسوم بيانية وبيانات سوقية محدّثة لحظياً عبر المنصات الأربع.' },
    'feature-2-title': { en: 'Financial Calculators', ar: 'حاسبات مالية' },
    'feature-2-desc': { en: 'Position sizer, profit calculator, currency converter, and more tools at your fingertips.', ar: 'حاسبة حجم المركز، حاسبة الأرباح، محوّل العملات، والمزيد.' },
    'feature-3-title': { en: 'Expert Blog', ar: 'مدونة الخبراء' },
    'feature-3-desc': { en: 'Stay informed with daily market analysis, trading strategies, and financial education.', ar: 'ابقَ على اطلاع بتحليلات السوق اليومية واستراتيجيات التداول والتعليم المالي.' },
    'feature-4-title': { en: 'Advanced Charts', ar: 'رسوم بيانية متقدمة' },
    'feature-4-desc': { en: 'Interactive TradingView charts with technical indicators, drawing tools, and multi-timeframe analysis.', ar: 'رسوم بيانية تفاعلية من TradingView مع مؤشرات فنية وأدوات رسم.' },
    'feature-5-title': { en: 'Portfolio Dashboard', ar: 'لوحة المحفظة' },
    'feature-5-desc': { en: 'Track your holdings in crypto, stocks, and forex with a personalized dashboard and alerts.', ar: 'تتبع ممتلكاتك في العملات الرقمية والأسهم والفوركس بلوحة تحكم مخصصة.' },
    'feature-6-title': { en: 'Multi-Market Access', ar: 'وصول متعدد الأسواق' },
    'feature-6-desc': { en: 'One platform covering crypto, forex, American stocks, and the Saudi Arabian exchange.', ar: 'منصة واحدة تغطي الكريبتو والفوركس والأسهم الأمريكية والسوق السعودي.' },

    // ---- BLOG SECTION (HOME) ----
    'blog-section-title-1': { en: 'Latest from the', ar: 'آخر مقالات' },
    'blog-section-title-2': { en: 'Blog', ar: 'المدونة' },
    'blog-section-desc': { en: 'Market insights, trading strategies, and financial education', ar: 'رؤى سوقية، استراتيجيات تداول، وتعليم مالي' },
    'blog-view-all': { en: 'View All Articles →', ar: '← عرض جميع المقالات' },

    // ---- TOOLS SECTION (HOME) ----
    'tools-section-title-1': { en: 'Powerful', ar: 'أدوات' },
    'tools-section-title-2': { en: 'Financial Tools', ar: 'مالية قوية' },
    'tools-section-desc': { en: 'Free calculators and tools to help you make smarter financial decisions', ar: 'حاسبات وأدوات مجانية لمساعدتك على اتخاذ قرارات مالية أذكى' },
    'tool-1-title': { en: 'Position Sizer', ar: 'حاسبة المركز' },
    'tool-1-desc': { en: 'Calculate optimal position sizes based on your risk tolerance.', ar: 'احسب حجم المركز الأمثل بناءً على مدى تحملك للمخاطر.' },
    'tool-2-title': { en: 'Profit Calculator', ar: 'حاسبة الأرباح' },
    'tool-2-desc': { en: 'Estimate potential profits and losses before entering trades.', ar: 'قدّر الأرباح والخسائر المحتملة قبل الدخول في الصفقات.' },
    'tool-3-title': { en: 'Currency Converter', ar: 'محوّل العملات' },
    'tool-3-desc': { en: 'Convert between fiat currencies with live exchange rates.', ar: 'حوّل بين العملات بأسعار صرف حيّة.' },
    'tool-4-title': { en: 'Compound Interest', ar: 'الفائدة المركبة' },
    'tool-4-desc': { en: 'Visualize growth of your investments over time.', ar: 'تصوّر نمو استثماراتك عبر الزمن.' },

    // ---- CTA ----
    'cta-title-1': { en: 'Ready to Take Control of Your', ar: 'مستعد للسيطرة على' },
    'cta-title-2': { en: 'Finances', ar: 'أموالك' },
    'cta-desc': { en: 'Join thousands of traders and investors using CalcWise to make data-driven decisions across global markets.', ar: 'انضم لآلاف المتداولين والمستثمرين الذين يستخدمون CalcWise لاتخاذ قرارات مبنية على البيانات.' },
    'cta-btn-1': { en: 'Create Free Account →', ar: '← إنشاء حساب مجاني' },
    'cta-btn-2': { en: 'Log In', ar: 'تسجيل الدخول' },

    // ---- FOOTER ----
    'footer-desc': { en: 'Your all-in-one financial intelligence platform. Track markets, read expert analysis, and use powerful tools — all for free.', ar: 'منصتك الشاملة للذكاء المالي. تابع الأسواق، اقرأ التحليلات، واستخدم أدوات قوية — كل ذلك مجاناً.' },
    'footer-markets': { en: 'Markets', ar: 'الأسواق' },
    'footer-resources': { en: 'Resources', ar: 'الموارد' },
    'footer-account': { en: 'Account', ar: 'الحساب' },
    'footer-blog': { en: 'Blog', ar: 'المدونة' },
    'footer-tools': { en: 'Financial Tools', ar: 'الأدوات المالية' },
    'footer-dashboard': { en: 'Dashboard', ar: 'لوحة التحكم' },
    'footer-login': { en: 'Log In', ar: 'تسجيل الدخول' },
    'footer-signup': { en: 'Sign Up', ar: 'إنشاء حساب' },
    'footer-copyright': { en: '© 2026 CalcWise. All rights reserved.', ar: '© 2026 CalcWise. جميع الحقوق محفوظة.' },

    // ---- PAGE HEADERS ----
    'page-crypto-title': { en: 'Cryptocurrency', ar: 'العملات الرقمية' },
    'page-crypto-desc': { en: 'Real-time prices, interactive charts, and market analytics for 10,000+ digital assets.', ar: 'أسعار لحظية ورسوم بيانية تفاعلية وتحليلات سوقية لأكثر من ١٠,٠٠٠ أصل رقمي.' },
    'page-forex-title': { en: 'Forex', ar: 'الفوركس' },
    'page-forex-desc': { en: 'Real-time exchange rates, interactive charts, and analysis for all major, minor, and exotic currency pairs.', ar: 'أسعار صرف لحظية ورسوم بيانية تفاعلية وتحليلات لجميع أزواج العملات.' },
    'page-us-title': { en: 'US Stock', ar: 'سوق الأسهم' },
    'page-us-desc': { en: 'Real-time data for S&P 500, NASDAQ, Dow Jones, and thousands of individual stocks.', ar: 'بيانات لحظية لمؤشر S&P 500 وناسداك وداو جونز وآلاف الأسهم الفردية.' },
    'page-saudi-title': { en: 'Saudi Market', ar: 'السوق السعودي' },
    'page-saudi-desc': { en: 'Tadawul (TASI) — Real-time data, charts, and analytics for the Saudi Arabian stock exchange.', ar: 'تداول (تاسي) — بيانات لحظية ورسوم بيانية وتحليلات للسوق المالية السعودية.' },
    'page-blog-title': { en: 'Finance', ar: 'المدونة' },
    'page-blog-title-2': { en: 'Blog', ar: 'المالية' },
    'page-blog-desc': { en: 'Market insights, trading strategies, and financial education written by industry experts.', ar: 'رؤى سوقية واستراتيجيات تداول وتعليم مالي من خبراء الصناعة.' },
    'page-tools-title': { en: 'Financial', ar: 'الأدوات' },
    'page-tools-title-2': { en: 'Tools', ar: 'المالية' },
    'page-tools-desc': { en: 'Free calculators and tools to help you make smarter, data-driven financial decisions.', ar: 'حاسبات وأدوات مجانية لمساعدتك على اتخاذ قرارات مالية أذكى.' },

    // ---- AUTH ----
    'auth-welcome': { en: 'Welcome Back', ar: 'مرحباً بعودتك' },
    'auth-login-desc': { en: 'Log in to your account to access your portfolio and tools.', ar: 'سجّل دخولك للوصول إلى محفظتك وأدواتك.' },
    'auth-email': { en: 'Email Address', ar: 'البريد الإلكتروني' },
    'auth-password': { en: 'Password', ar: 'كلمة المرور' },
    'auth-forgot': { en: 'Forgot password?', ar: 'نسيت كلمة المرور؟' },
    'auth-remember': { en: 'Remember me for 30 days', ar: 'تذكرني لمدة 30 يوم' },
    'auth-login-btn': { en: 'Log In', ar: 'تسجيل الدخول' },
    'auth-no-account': { en: "Don't have an account?", ar: 'ليس لديك حساب؟' },
    'auth-signup-link': { en: 'Sign up free', ar: 'إنشاء حساب مجاني' },
    'auth-create-title': { en: 'Create Your Account', ar: 'أنشئ حسابك' },
    'auth-create-desc': { en: 'Start tracking markets and managing your portfolio — 100% free.', ar: 'ابدأ بتتبع الأسواق وإدارة محفظتك — مجاني ١٠٠٪.' },
    'auth-first-name': { en: 'First Name', ar: 'الاسم الأول' },
    'auth-last-name': { en: 'Last Name', ar: 'اسم العائلة' },
    'auth-confirm': { en: 'Confirm Password', ar: 'تأكيد كلمة المرور' },
    'auth-terms': { en: 'I agree to the', ar: 'أوافق على' },
    'auth-tos': { en: 'Terms of Service', ar: 'شروط الخدمة' },
    'auth-privacy': { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
    'auth-create-btn': { en: 'Create Free Account', ar: 'إنشاء حساب مجاني' },
    'auth-has-account': { en: 'Already have an account?', ar: 'لديك حساب بالفعل؟' },
    'auth-login-link': { en: 'Log in', ar: 'تسجيل الدخول' },
    'auth-or-email': { en: 'or continue with email', ar: 'أو المتابعة بالبريد الإلكتروني' },
    'auth-or-signup': { en: 'or sign up with email', ar: 'أو التسجيل بالبريد الإلكتروني' },

    // ---- DASHBOARD ----
    'dash-title': { en: 'Portfolio Dashboard', ar: 'لوحة المحفظة' },
    'dash-add-asset': { en: '+ Add Asset', ar: '+ إضافة أصل' },
    'dash-refresh': { en: '↻ Refresh', ar: '↻ تحديث' },
    'dash-total-value': { en: 'Total Portfolio Value', ar: 'إجمالي قيمة المحفظة' },
    'dash-today-pl': { en: "Today's P/L", ar: 'الربح/الخسارة اليوم' },
    'dash-holdings': { en: 'Total Holdings', ar: 'إجمالي الممتلكات' },
    'dash-best': { en: 'Best Performer', ar: 'الأفضل أداءً' },
    'dash-across': { en: 'Across 4 markets', ar: 'عبر ٤ أسواق' },
    'dash-performance': { en: 'Portfolio Performance', ar: 'أداء المحفظة' },
    'dash-allocation': { en: 'Asset Allocation', ar: 'توزيع الأصول' },
    'dash-your-holdings': { en: 'Your Holdings', ar: 'ممتلكاتك' },
    'dash-watchlist': { en: '👁️ Watchlist', ar: '👁️ قائمة المراقبة' },
    'dash-activity': { en: '📋 Recent Activity', ar: '📋 النشاط الأخير' },
    'dash-add-track': { en: '+ Add a new asset to track', ar: '+ أضف أصلاً جديداً للتتبع' },
    'dash-th-asset': { en: 'Asset', ar: 'الأصل' },
    'dash-th-market': { en: 'Market', ar: 'السوق' },
    'dash-th-qty': { en: 'Quantity', ar: 'الكمية' },
    'dash-th-avg': { en: 'Avg. Cost', ar: 'متوسط التكلفة' },
    'dash-th-price': { en: 'Current Price', ar: 'السعر الحالي' },
    'dash-th-value': { en: 'Value', ar: 'القيمة' },
    'dash-th-pl': { en: 'P/L', ar: 'الربح/الخسارة' },
    'dash-th-change': { en: 'Change', ar: 'التغيير' },
    'dash-logout': { en: 'Log Out', ar: 'تسجيل الخروج' },

    // ---- SIDEBAR ----
    'sidebar-overview': { en: 'Overview', ar: 'نظرة عامة' },
    'sidebar-portfolio': { en: 'Portfolio', ar: 'المحفظة' },
    'sidebar-watchlist': { en: 'Watchlist', ar: 'المراقبة' },
    'sidebar-alerts': { en: 'Alerts', ar: 'التنبيهات' },
    'sidebar-markets': { en: 'Markets', ar: 'الأسواق' },
    'sidebar-tools': { en: 'Tools', ar: 'الأدوات' },
    'sidebar-settings': { en: 'Settings', ar: 'الإعدادات' },
    'sidebar-logout': { en: 'Log Out', ar: 'تسجيل الخروج' },

    // ---- MODAL ----
    'modal-add-title': { en: 'Add Asset to Portfolio', ar: 'إضافة أصل إلى المحفظة' },
    'modal-market': { en: 'Market', ar: 'السوق' },
    'modal-asset-name': { en: 'Asset Name / Symbol', ar: 'اسم / رمز الأصل' },
    'modal-qty': { en: 'Quantity', ar: 'الكمية' },
    'modal-avg-cost': { en: 'Average Cost / Entry Price', ar: 'متوسط التكلفة / سعر الدخول' },
    'modal-add-btn': { en: 'Add to Portfolio', ar: 'إضافة إلى المحفظة' },

    // ---- BLOG PAGE FILTERS ----
    'filter-all': { en: 'All Posts', ar: 'جميع المقالات' },
    'filter-crypto': { en: 'Crypto', ar: 'كريبتو' },
    'filter-forex': { en: 'Forex', ar: 'فوركس' },
    'filter-stocks': { en: 'US Stocks', ar: 'أسهم أمريكية' },
    'filter-saudi': { en: 'Saudi Market', ar: 'السوق السعودي' },
    'filter-education': { en: 'Education', ar: 'تعليم' },
    'filter-tools': { en: 'Tools & Strategy', ar: 'أدوات واستراتيجيات' },
    'filter-strategy': { en: 'Strategy', ar: 'استراتيجيات' },
    'blog-subscribe': { en: 'Subscribe', ar: 'اشتراك' },
    'blog-newsletter-title-1': { en: 'Stay', ar: 'ابقَ' },
    'blog-newsletter-title-2': { en: 'Informed', ar: 'مطّلعاً' },
    'blog-newsletter-desc': { en: 'Get weekly market insights, trading tips, and exclusive analysis delivered to your inbox.', ar: 'احصل على رؤى سوقية أسبوعية ونصائح تداول وتحليلات حصرية في بريدك الإلكتروني.' },
    'blog-featured-tag': { en: 'Featured', ar: 'مميز' },

    // ---- BLOG SPECIFIC ----
    'blog-hero-title': { en: 'Finance <span class="text-gold">Blog</span>', ar: 'المدونة <span class="text-gold">المالية</span>' },
    'blog-hero-sub': { en: 'Expert analysis, trading strategies, and market insights to help you make smarter financial decisions.', ar: 'تحليلات الخبراء، استراتيجيات التداول، ورؤى السوق لمساعدتك على اتخاذ قرارات مالية أذكى.' },

    // Blog Cards
    'blog-card-1-title': { en: 'Altcoin Season 2026: Top 10 Tokens to Watch', ar: 'موسم العملات البديلة ٢٠٢٦: أفضل ١٠ عملات للمراقبة' },
    'blog-card-1-desc': { en: 'Identifying the most promising altcoins with strong fundamentals and technical setups for this cycle.', ar: 'تحديد العملات البديلة الواعدة بأساسيات قوية وإعدادات فنية لهذه الدورة.' },
    'blog-card-2-title': { en: 'Euro vs Dollar: How Interest Rate Decisions Shape EUR/USD', ar: 'اليورو مقابل الدولار: كيف تشكل قرارات أسعار الفائدة زوج EUR/USD' },
    'blog-card-2-desc': { en: 'Understanding the impact of central bank policies on the world\'s most traded currency pair.', ar: 'فهم تأثير سياسات البنوك المركزية على أكثر أزواج العملات تداولاً في العالم.' },
    'blog-card-3-title': { en: 'Mastering Forex Risk Management: The 2% Rule Explained', ar: 'إتقان إدارة مخاطر الفوركس: شرح قاعدة الـ ٢٪' },
    'blog-card-3-desc': { en: 'Why professional traders never risk more than 2% per trade and how to implement this rule.', ar: 'لماذا لا يخاطر المتداولون المحترفون أبداً بأكثر من ٢٪ في الصفقة الواحدة وكيفية تطبيق هذه القاعدة.' },
    'blog-card-4-title': { en: 'NVIDIA & AI Boom: Is the Tech Rally Sustainable?', ar: 'نفايديا وطفرة الذكاء الاصطناعي: هل استمرار رالي التكنولوجيا مستدام؟' },
    'blog-card-4-desc': { en: 'Analyzing whether AI-driven tech stocks can maintain their momentum amid rising valuations.', ar: 'تحليل ما إذا كان بإمكان أسهم التكنولوجيا المدفوعة بالذكاء الاصطناعي الحفاظ على زخمها وسط ارتفاع التقييمات.' },
    'blog-card-5-title': { en: 'Best Dividend Stocks for Passive Income in 2026', ar: 'أفضل أسهم التوزيعات للدخل السلبي في عام ٢٠٢٦' },
    'blog-card-5-desc': { en: 'Build a reliable income stream with these high-yield, fundamentally strong dividend payers.', ar: 'أنشئ تدفقاً موثوقاً للدخل مع موزعي الأرباح ذوي العائد المرتفع والأساسيات القوية.' },
    'blog-card-6-title': { en: 'Vision 2030 Update: Top Saudi Stocks to Watch This Quarter', ar: 'تحديث رؤية ٢٠٣٠: أفضل الأسهم السعودية للمراقبة هذا الربع' },
    'blog-card-6-desc': { en: 'As Saudi Arabia\'s transformation accelerates, these sectors and stocks offer significant opportunities.', ar: 'مع تسارع تحول المملكة العربية السعودية، توفر هذه القطاعات والأسهم فرصاً كبيرة.' },
    'blog-card-7-title': { en: 'Saudi Aramco Deep Dive: Is the World\'s Largest Company Still Undervalued?', ar: 'تحليل معمق لأرامكو السعودية: هل لا تزال أكبر شركة في العالم مقومة بأقل من قيمتها؟' },
    'blog-card-7-desc': { en: 'A fundamental analysis of Saudi Aramco\'s earnings, dividends, and growth potential.', ar: 'تحليل أساسي لأرباح أرامكو السعودية، توزيعات الأرباح، وإمكانيات النمو.' },
    'blog-card-8-title': { en: 'Trading Psychology: How to Control Fear and Greed', ar: 'علم نفس التداول: كيف تتحكم في الخوف والطمع' },
    'blog-card-8-desc': { en: 'The mental frameworks professional traders use to stay disciplined during volatile markets.', ar: 'الأطر الذهنية التي يستخدمها المتداولون المحترفون للبقاء منضبطين خلال تقلبات السوق.' },
    'blog-card-9-title': { en: 'Technical Analysis 101: Chart Patterns Every Trader Must Know', ar: 'أساسيات التحليل الفني: نماذج الرسوم البيانية التي يجب على كل متداول معرفتها' },
    'blog-card-9-desc': { en: 'From head and shoulders to double bottoms — the patterns that signal major moves.', ar: 'من نمط الرأس والكتفين إلى القيعان المزدوجة — الأنماط التي تشير إلى تحركات كبرى.' },
    'blog-card-10-title': { en: 'Position Sizing: The Most Important Tool You\'re Not Using', ar: 'تحديد حجم المركز: الأداة الأكثر أهمية التي لا تستخدمها' },
    'blog-card-10-desc': { en: 'Why proper position sizing matters more than your entry strategy and how CalcWise tools can help.', ar: 'لماذا يهم تحديد حجم المركز الصحيح أكثر من استراتيجية الدخول وكيف تساعد أدوات CalcWise.' },
    'blog-read-more': { en: 'Read More →', ar: 'اقرأ المزيد ←' },

    // ---- TOOLS PAGE ----
    'tools-hero-title': { en: 'Financial <span class="text-gradient">Tools</span>', ar: 'الأدوات <span class="text-gradient">المالية</span>' },
    'tools-hero-sub': { en: 'Free calculators to help you plan trades, manage risk, and grow your portfolio.', ar: 'حاسبات مجانية لمساعدتك في التخطيط للصفقات، إدارة المخاطر، وتنمية محفظتك.' },
    'tab-position-sizer': { en: '📐 Position Sizer', ar: '📐 حجم المركز' },
    'tab-profit-calc': { en: '💰 Profit/Loss', ar: '💰 الربح والخسارة' },
    'tab-currency-converter': { en: '🔄 Currency Converter', ar: '🔄 محول العملات' },
    'tab-compound': { en: '📊 Compound Interest', ar: '📊 الفائدة المركبة' },
    'tab-pip-calc': { en: '📏 Pip Calculator', ar: '📏 حاسبة النقاط' },
    'tab-risk-reward': { en: '⚖️ Risk/Reward', ar: '⚖️ المخاطرة/العائد' },

    'tool-pos-title': { en: '📐 Position Size Calculator', ar: '📐 حاسبة حجم المركز' },
    'tool-pl-title': { en: '💰 Profit/Loss Calculator', ar: '💰 حاسبة الربح والخسارة' },
    'tool-cc-title': { en: '🔄 Currency Converter', ar: '🔄 محول العملات' },
    'tool-ci-title': { en: '📊 Compound Interest Calculator', ar: '📊 حاسبة الفائدة المركبة' },
    'tool-pip-title': { en: '📏 Forex Pip Calculator', ar: '📏 حاسبة نقاط الفوركس (Pip)' },
    'tool-rr-title': { en: '⚖️ Risk/Reward Calculator', ar: '⚖️ حاسبة المخاطرة مقابل العائد' },

    'label-account-balance': { en: 'Account Balance ($)', ar: 'رصيد الحساب ($)' },
    'label-risk-pct': { en: 'Risk per Trade (%)', ar: 'المخاطرة لكل صفقة (%)' },
    'label-entry-price': { en: 'Entry Price', ar: 'سعر الدخول' },
    'label-stop-loss': { en: 'Stop Loss Price', ar: 'سعر وقف الخسارة' },
    'label-exit-price': { en: 'Exit Price', ar: 'سعر الخروج' },
    'label-qty': { en: 'Quantity / Units', ar: 'الكمية / الوحدات' },
    'label-direction': { en: 'Direction', ar: ' الاتجاه' },
    'label-amount': { en: 'Amount', ar: 'المبلغ' },
    'label-from-currency': { en: 'From Currency', ar: 'من عملة' },
    'label-to-currency': { en: 'To Currency', ar: 'إلى عملة' },
    'label-initial-investment': { en: 'Initial Investment ($)', ar: 'الاستثمار الأولي ($)' },
    'label-monthly-contribution': { en: 'Monthly Contribution ($)', ar: 'المساهمة الشهرية ($)' },
    'label-annual-rate': { en: 'Annual Interest Rate (%)', ar: 'معدل الفائدة السنوي (%)' },
    'label-period-years': { en: 'Investment Period (Years)', ar: 'مدة الاستثمار (سنوات)' },
    'label-currency-pair': { en: 'Currency Pair', ar: 'زوج العملات' },
    'label-lot-size': { en: 'Lot Size', ar: 'حجم اللوت' },
    'label-num-pips': { en: 'Number of Pips', ar: 'عدد النقاط' },
    'label-take-profit': { en: 'Take Profit Price', ar: 'سعر جني الأرباح' },

    'option-long': { en: 'Long (Buy)', ar: 'شراء (Long)' },
    'option-short': { en: 'Short (Sell)', ar: 'بيع (Short)' },
    'option-lot-standard': { en: 'Standard (100,000)', ar: 'قياسي (100,000)' },
    'option-lot-mini': { en: 'Mini (10,000)', ar: 'ميني (10,000)' },
    'option-lot-micro': { en: 'Micro (1,000)', ar: 'ميكرو (1,000)' },

    'btn-calculate-pos': { en: 'Calculate Position Size', ar: 'احسب حجم المركز' },
    'btn-calculate-pl': { en: 'Calculate P/L', ar: 'احسب الربح/الخسارة' },
    'btn-convert': { en: 'Convert', ar: 'تحويل' },
    'btn-calculate-growth': { en: 'Calculate Growth', ar: 'احسب النمو' },
    'btn-calculate-pip': { en: 'Calculate Pip Value', ar: 'احسب قيمة النقطة' },
    'btn-calculate-rr': { en: 'Calculate R:R', ar: 'احسب المخاطرة/العائد' },

    // ---- TOOL INFO & USAGE ----
    'tool-info-desc-title': { en: 'About this Tool', ar: 'عن هذه الأداة' },
    'tool-info-usage-title': { en: 'How to Use', ar: 'طريقة الاستخدام' },

    'tool-pos-info-desc': {
        en: 'This tool helps you calculate the optimal trade size based on your account balance and risk tolerance. It ensures you never lose more than a predefined percentage of your capital on a single trade, which is the cornerstone of professional risk management.',
        ar: 'تساعدك هذه الأداة في حساب حجم الصفقة الأمثل بناءً على رصيد حسابك ونسبة المخاطرة التي حددتها. وهي تضمن عدم خسارة أكثر من نسبة مئوية محددة مسبقاً من رأس مالك في صفقة واحدة، وهو حجر الزاوية في إدارة المخاطر الاحترافية.'
    },
    'tool-pos-usage-steps': {
        en: '1. Enter your total Account Balance.<br>2. Set your Risk percentage (e.g., 1% or 2%).<br>3. Enter your Entry Price and Stop Loss Price levels.<br>4. Click Calculate to see the exact position size in units or lots.',
        ar: '1. أدخل رصيد حسابك الإجمالي.<br>2. حدد نسبة المخاطرة المئوية (مثلاً 1% أو 2%).<br>3. أدخل مستويات سعر الدخول وسعر وقف الخسارة.<br>4. اضغط على احسب لمعرفة حجم المركز الدقيق بالوحدات أو العقود.'
    },

    'tool-pl-info-desc': {
        en: 'Quickly estimate your potential profit or loss for a trade. By entering your entry and exit points along with the position size, you can visualize the financial outcome before executing the trade.',
        ar: 'قم بتقدير أرباحك أو خسائرك المحتملة لصفقة ما بسرعة. من خلال إدخال نقاط الدخول والخروج مع حجم المركز، يمكنك تصور النتيجة المالية قبل تنفيذ الصفقة.'
    },
    'tool-pl-usage-steps': {
        en: '1. Enter your Entry Price and target Exit Price.<br>2. Provide the Quantity/Units you plan to trade.<br>3. Select the trade Direction (Long for buying, Short for selling).<br>4. Click Calculate to see the P/L amount and percentage return.',
        ar: '1. أدخل سعر الدخول وسعر الخروج المستهدف.<br>2. أدخل الكمية/الوحدات التي تنوي تداولها.<br>3. اختر اتجاه الصفقة (Long للشراء، Short للبيع).<br>4. اضغط على احسب لرؤية مبلغ الربح/الخسارة ونسبة العائد.'
    },

    'tool-cc-info-desc': {
        en: 'Convert amounts between major global currencies using real-time exchange rates. Essential for international traders and investors to understand their buying power and portfolio value in different denominations.',
        ar: 'تحويل المبالغ بين العملات العالمية الكبرى باستخدام أسعار الصرف الفورية. ضروري للمتداولين والمستثمرين الدوليين لفهم قوتهم الشرائية وقيمة محفظتهم بمختلف العملات.'
    },
    'tool-cc-usage-steps': {
        en: '1. Enter the Amount you want to convert.<br>2. Select the base currency from the "From" dropdown.<br>3. Select the target currency from the "To" dropdown.<br>4. Click Convert to see the current value in the target currency.',
        ar: '1. أدخل المبلغ الذي تريد تحويله.<br>2. اختر العملة الأساسية من قائمة "من".<br>3. اختر العملة المستهدفة من قائمة "إلى".<br>4. اضغط على تحويل لرؤية القيمة الحالية بالعملة المستهدفة.'
    },

    'tool-ci-info-desc': {
        en: 'Visualize the power of long-term investing. This calculator shows how initial investments and regular contributions grow over time when interest is reinvested, helping you plan for retirement or long-term wealth goals.',
        ar: 'تصور قوة الاستثمار طويل الأجل. توضح هذه الحاسبة كيف تنمو الاستثمارات الأولية والمساهمات المنتظمة بمرور الوقت عند إعادة استثمار الفوائد، مما يساعدك على التخطيط للتقاعد أو أهداف الثروة طويلة الأجل.'
    },
    'tool-ci-usage-steps': {
        en: '1. Enter your Starting Principal.<br>2. Add any Monthly Contribution you plan to make.<br>3. Input the expected Annual Interest Rate.<br>4. Set the Investment Period in years.<br>5. Click Calculate Growth to see your projected future balance.',
        ar: '1. أدخل رأس المال المبدئي.<br>2. أضف أي مساهمة شهرية تخطط للقيام بها.<br>3. أدخل معدل الفائدة السنوي المتوقع.<br>4. حدد فترة الاستثمار بالسنوات.<br>5. اضغط على احسب النمو لرؤية رصيدك المستقبلي المتوقع.'
    },

    'tool-pip-info-desc': {
        en: 'In Forex trading, knowing the dollar value of a single pip is crucial for managing risk. This tool calculates the pip value based on your chosen currency pair and lot size, allowing for precise trade planning.',
        ar: 'في تداول الفوركس، معرفة قيمة الدولار لنقطة واحدة (Pip) أمر بالغ الأهمية لإدارة المخاطر. تحسب هذه الأداة قيمة النقطة بناءً على زوج العملات المختار وحجم اللوت، مما يسمح بتخطيط دقيق للصفقات.'
    },
    'tool-pip-usage-steps': {
        en: '1. Choose the Currency Pair you are trading.<br>2. Select your Lot Size (Standard, Mini, or Micro).<br>3. Enter the Number of Pips for your target or stop.<br>4. Click Calculate to see the total monetary value of those pips.',
        ar: '1. اختر زوج العملات الذي تتداوله.<br>2. حدد حجم اللوت الخاص بك (قياسي، ميني، أو ميكرو).<br>3. أدخل عدد النقاط لهدفك أو وقفك.<br>4. اضغط على احسب لرؤية القيمة المالية الإجمالية لتلك النقاط.'
    },

    'tool-rr-info-desc': {
        en: 'Professional trading is a game of probabilities. This tool compares your potential profit against your potential loss. A positive risk/reward ratio helps ensure long-term profitability, even if you don\'t win every trade.',
        ar: 'التداول الاحترافي هو لعبة احتمالات. تقارن هذه الأداة ربحك المحتمل بخصارتك المحتملة. تساعد نسبة المخاطرة/العائد الإيجابية في ضمان الربحية على المدى الطويل، حتى لو لم تربح كل صفقة.'
    },
    'tool-rr-usage-steps': {
        en: '1. Enter your Entry Price.<br>2. Specify your Stop Loss level (max loss).<br>3. Input your Take Profit target.<br>4. Click Calculate to see your R:R ratio and whether the trade meets your strategy criteria.',
        ar: '1. أدخل سعر الدخول الخاص بك.<br>2. حدد مستوى وقف الخسارة (أقصى خسارة).<br>3. أدخل هدف جني الأرباح.<br>4. اضغط على احسب لرؤية نسبة المخاطرة/العائد وما إذا كانت الصفقة تلبي معايير استراتيجيتك.'
    },

    'results-title': { en: 'Results', ar: 'النتائج' },
    'results-pos-desc': { en: 'Enter your trade details to calculate the optimal position size.', ar: 'أدخل تفاصيل الصفقة لحساب حجم المركز الأمثل.' },
    'results-pl-desc': { en: 'Enter trade details to calculate your potential profit or loss.', ar: 'أدخل تفاصيل الصفقة لحساب ربحك أو خسارتك المحتملة.' },
    'results-cc-desc': { en: 'Select currencies and amount to see the conversion.', ar: 'اختر العملات والمبلغ لمعرفة التحويل.' },
    'results-ci-desc': { en: 'Enter investment details to see how your money grows.', ar: 'أدخل تفاصيل الاستثمار لترى كيف تنمو أموالك.' },
    'results-pip-desc': { en: 'Select pair and lot size to calculate pip value.', ar: 'اختر الزوج وحجم اللوت لحساب قيمة النقطة.' },
    'results-rr-desc': { en: 'Enter trade levels to calculate your risk/reward ratio.', ar: 'أدخل مستويات التداول لحساب نسبة المخاطرة إلى العائد.' },

    // ---- MARKET PAGES SPECIFIC ----
    'crypto-hero-title': { en: 'Cryptocurrency <span class="text-gold">Markets</span>', ar: 'أسواق <span class="text-gold">العملات الرقمية</span>' },
    'crypto-hero-sub': { en: 'Real-time crypto prices, heatmaps, and comprehensive market data for 10,000+ digital assets.', ar: 'أسعار الكريبتو اللحظية، الخرائط الحرارية، وبيانات السوق الشاملة لأكثر من ١٠,٠٠٠ أصل رقمي.' },
    'forex-hero-title': { en: 'Forex <span class="text-gold">Markets</span>', ar: 'أسواق <span class="text-gold">الفوركس</span>' },
    'forex-hero-sub': { en: 'Real-time exchange rates, interactive charts, and analysis for all major, minor, and exotic currency pairs.', ar: 'أسعار صرف لحظية، رسوم بيانية تفاعلية، وتحليلات لجميع أزواج العملات الرئيسية والثانوية والغريبة.' },
    'us-hero-title': { en: 'US Stock <span class="text-gold">Market</span>', ar: 'سوق <span class="text-gold">الأسهم الأمريكية</span>' },
    'us-hero-sub': { en: 'Real-time data for S&amp;P 500, NASDAQ, Dow Jones, and thousands of individual stocks.', ar: 'بيانات لحظية لمؤشر S&P 500 وناسداك وداو جونز وآلاف الأسهم الفردية.' },
    'saudi-hero-title': { en: 'Saudi <span class="text-gradient">Market</span>', ar: 'السوق <span class="text-gradient">السعودي</span>' },
    'saudi-hero-sub': { en: 'Tadawul index, Saudi Aramco charts, and a full stock screener for the Saudi Arabian market.', ar: 'مؤشر تداول، رسوم بيانية لأرامكو السعودية، وفاحص أسهم كامل للسوق المالي السعودي.' },

    'widget-heatmap-title': { en: '🔥 Market Heatmap', ar: '🔥 خريطة السوق الحرارية' },
    'widget-screener-title': { en: 'Market Screener', ar: 'فاحص السوق' },
    'widget-crypto-screener': { en: 'Crypto <span class="text-gold">Screener</span>', ar: 'فاحص <span class="text-gold">الكريبتو</span>' },
    'widget-saudi-screener': { en: 'Saudi <span class="text-gradient">Stock Screener</span>', ar: 'فاحص <span class="text-gradient">الأسهم السعودية</span>' },
    'widget-us-screener': { en: 'US <span class="text-gold">Stock Screener</span>', ar: 'فاحص <span class="text-gold">الأسهم الأمريكية</span>' },
    'widget-screener-desc': { en: 'Browse and filter assets by market cap, price, volume, and more.', ar: 'تصفح وقم بتصفية الأصول حسب القيمة السوقية والسعر والحجم والمزيد.' },
    'widget-saudi-desc': { en: 'Browse all Tadawul-listed companies filtered by performance, sector, and market metrics.', ar: 'تصفح جميع الشركات المدرجة في تداول والمصنفة حسب الأداء والقطاع ومقاييس السوق.' },
};

function initLanguage() {
    const saved = localStorage.getItem('calcwise_lang') || 'en';
    applyLanguage(saved);
}

function applyLanguage(lang) {
    localStorage.setItem('calcwise_lang', lang);

    // Set direction
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);

    // Update toggle UI
    document.querySelectorAll('.lang-toggle .toggle-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.value === lang);
    });

    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key] && translations[key][lang]) {
            // Use innerHTML for keys that might contain spans/gradients
            if (translations[key][lang].includes('<')) {
                el.innerHTML = translations[key][lang];
            } else {
                el.textContent = translations[key][lang];
            }
        }
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[key] && translations[key][lang]) {
            el.placeholder = translations[key][lang];
        }
    });

    // Fix TradingView widgets locale if they exist
    // Note: TradingView widgets often need a reload or specific container update to change locale
}

function toggleLanguage(lang) {
    applyLanguage(lang);
}

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('mobile-open');
    }
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
}

// ===== HERO PARTICLES =====
function initParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (6 + Math.random() * 6) + 's';
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;

        const colors = ['var(--primary-light)', 'var(--accent-gold)', 'var(--accent-teal)', 'var(--accent-emerald)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(particle);
    }
}

// ===== MARKET TICKER =====
function initTicker() {
    const track = document.getElementById('tickerTrack');
    if (!track) return;

    const tickerData = [
        { symbol: 'BTC', price: '$101,234.00', change: '+2.45%', up: true },
        { symbol: 'ETH', price: '$4,123.50', change: '+1.82%', up: true },
        { symbol: 'SOL', price: '$245.30', change: '+5.12%', up: true },
        { symbol: 'EUR/USD', price: '1.0845', change: '+0.15%', up: true },
        { symbol: 'GBP/USD', price: '1.2680', change: '-0.22%', up: false },
        { symbol: 'USD/SAR', price: '3.7500', change: '0.00%', up: true },
        { symbol: 'S&P 500', price: '5,823.40', change: '+0.68%', up: true },
        { symbol: 'NASDAQ', price: '18,745.20', change: '+0.92%', up: true },
        { symbol: 'AAPL', price: '$245.67', change: '-0.85%', up: false },
        { symbol: 'NVDA', price: '$890.50', change: '+3.21%', up: true },
        { symbol: 'ARAMCO', price: 'SAR 32.10', change: '+1.20%', up: true },
        { symbol: 'TASI', price: '12,450', change: '+0.34%', up: true },
        { symbol: 'XRP', price: '$2.45', change: '+4.30%', up: true },
        { symbol: 'DOGE', price: '$0.4520', change: '+6.10%', up: true },
    ];

    // Double the items for seamless loop
    const items = [...tickerData, ...tickerData];

    track.innerHTML = items.map(item => `
    <div class="ticker-item">
      <span class="symbol">${item.symbol}</span>
      <span class="price">${item.price}</span>
      <span class="change ${item.up ? 'up' : 'down'}">${item.change}</span>
    </div>
  `).join('');
}

// ===== TOAST NOTIFICATIONS =====
function showToast(type, message) {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        container.id = 'toastContainer';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: '✅', error: '❌', warning: '⚠️' };
    toast.innerHTML = `<span>${icons[type] || '📢'}</span> ${message}`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ===== AUTHENTICATION =====
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('calcwise_user') || 'null');
    const dashboardUser = document.getElementById('dashboardUser');

    if (dashboardUser && user) {
        dashboardUser.textContent = `Hi, ${user.firstName} 👋`;
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        showToast('error', 'Please fill in all fields.');
        return;
    }

    // Simulate login
    const user = JSON.parse(localStorage.getItem('calcwise_user') || 'null');
    if (user && user.email === email) {
        localStorage.setItem('calcwise_logged_in', 'true');
        showToast('success', 'Login successful! Redirecting...');
        setTimeout(() => window.location.href = 'dashboard.html', 1500);
    } else {
        // For demo, log in with any credentials
        localStorage.setItem('calcwise_logged_in', 'true');
        if (!user) {
            localStorage.setItem('calcwise_user', JSON.stringify({ firstName: 'User', email }));
        }
        showToast('success', 'Login successful! Redirecting...');
        setTimeout(() => window.location.href = 'dashboard.html', 1500);
    }
}

function handleSignup(e) {
    e.preventDefault();
    const firstName = document.getElementById('signup-first').value;
    const lastName = document.getElementById('signup-last').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;

    if (password !== confirm) {
        showToast('error', 'Passwords do not match!');
        return;
    }

    const user = { firstName, lastName, email };
    localStorage.setItem('calcwise_user', JSON.stringify(user));
    localStorage.setItem('calcwise_logged_in', 'true');
    showToast('success', `Welcome, ${firstName}! Redirecting to dashboard...`);
    setTimeout(() => window.location.href = 'dashboard.html', 1500);
}

function handleLogout() {
    localStorage.removeItem('calcwise_logged_in');
    showToast('success', 'Logged out successfully.');
    setTimeout(() => window.location.href = 'index.html', 1000);
}

// ===== BLOG FILTER =====
function filterBlog(category, btn) {
    const cards = document.querySelectorAll('.blog-card[data-category]');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.3s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

// ===== TOOL TABS =====
function switchTool(toolId, btn) {
    const panels = document.querySelectorAll('.tool-panel');
    const tabs = document.querySelectorAll('.tool-tab');

    tabs.forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    panels.forEach(p => {
        p.classList.remove('active');
        if (p.id === toolId) {
            p.classList.add('active');
        }
    });
}

// ===== FINANCIAL TOOLS CALCULATORS =====
function calculatePositionSize() {
    const balance = parseFloat(document.getElementById('ps-balance').value);
    const riskPct = parseFloat(document.getElementById('ps-risk').value);
    const entry = parseFloat(document.getElementById('ps-entry').value);
    const stopLoss = parseFloat(document.getElementById('ps-stoploss').value);

    if (!balance || !riskPct || !entry || !stopLoss) {
        showToast('error', 'Please fill in all fields.');
        return;
    }

    const riskAmount = balance * (riskPct / 100);
    const priceDiff = Math.abs(entry - stopLoss);
    const positionSize = riskAmount / priceDiff;
    const positionValue = positionSize * entry;

    document.getElementById('ps-result').innerHTML = `
    <h4>📐 Position Size Results</h4>
    <div class="result-value text-gradient">${positionSize.toFixed(6)} units</div>
    <div class="result-breakdown">
      <div class="result-item"><div class="label">Risk Amount</div><div class="value text-danger">$${riskAmount.toFixed(2)}</div></div>
      <div class="result-item"><div class="label">Position Value</div><div class="value">$${positionValue.toFixed(2)}</div></div>
      <div class="result-item"><div class="label">Stop Distance</div><div class="value">${priceDiff.toFixed(2)}</div></div>
      <div class="result-item"><div class="label">Risk/Trade</div><div class="value">${riskPct}%</div></div>
    </div>
  `;
}

function calculateProfitLoss() {
    const entry = parseFloat(document.getElementById('pl-entry').value);
    const exit = parseFloat(document.getElementById('pl-exit').value);
    const qty = parseFloat(document.getElementById('pl-qty').value);
    const direction = document.getElementById('pl-direction').value;

    if (!entry || !exit || !qty) {
        showToast('error', 'Please fill in all fields.');
        return;
    }

    let pnl = direction === 'long' ? (exit - entry) * qty : (entry - exit) * qty;
    let pnlPct = direction === 'long' ? ((exit - entry) / entry) * 100 : ((entry - exit) / entry) * 100;
    const isProfit = pnl >= 0;

    document.getElementById('pl-result').innerHTML = `
    <h4>💰 P/L Results</h4>
    <div class="result-value ${isProfit ? 'text-success' : 'text-danger'}">${isProfit ? '+' : ''}$${pnl.toFixed(2)}</div>
    <div class="result-breakdown">
      <div class="result-item"><div class="label">Return %</div><div class="value ${isProfit ? 'text-success' : 'text-danger'}">${isProfit ? '+' : ''}${pnlPct.toFixed(2)}%</div></div>
      <div class="result-item"><div class="label">Entry Value</div><div class="value">$${(entry * qty).toFixed(2)}</div></div>
      <div class="result-item"><div class="label">Exit Value</div><div class="value">$${(exit * qty).toFixed(2)}</div></div>
      <div class="result-item"><div class="label">Direction</div><div class="value">${direction === 'long' ? '📈 Long' : '📉 Short'}</div></div>
    </div>
  `;
}

function convertCurrency() {
    const amount = parseFloat(document.getElementById('cc-amount').value);
    const from = document.getElementById('cc-from').value;
    const to = document.getElementById('cc-to').value;

    if (!amount) {
        showToast('error', 'Please enter an amount.');
        return;
    }

    // Approximate rates (in production, use a live API)
    const rates = {
        USD: 1, EUR: 0.922, GBP: 0.789, SAR: 3.75, JPY: 149.50,
        AUD: 1.535, CAD: 1.357, CHF: 0.878
    };

    const inUSD = amount / rates[from];
    const result = inUSD * rates[to];

    document.getElementById('cc-result').innerHTML = `
    <h4>🔄 Conversion Result</h4>
    <div class="result-value text-gold">${result.toFixed(2)} ${to}</div>
    <div class="result-breakdown">
      <div class="result-item"><div class="label">From</div><div class="value">${amount.toFixed(2)} ${from}</div></div>
      <div class="result-item"><div class="label">To</div><div class="value">${result.toFixed(2)} ${to}</div></div>
      <div class="result-item"><div class="label">Rate</div><div class="value">1 ${from} = ${(rates[to] / rates[from]).toFixed(4)} ${to}</div></div>
    </div>
    <p style="margin-top:var(--space-md);font-size:0.78rem;color:var(--text-muted);">* Rates are approximate and for reference only.</p>
  `;
}

function calculateCompound() {
    const principal = parseFloat(document.getElementById('ci-principal').value);
    const monthly = parseFloat(document.getElementById('ci-monthly').value);
    const rate = parseFloat(document.getElementById('ci-rate').value) / 100;
    const years = parseInt(document.getElementById('ci-years').value);

    if (!principal || !years) {
        showToast('error', 'Please fill in all fields.');
        return;
    }

    const monthlyRate = rate / 12;
    const months = years * 12;
    let total = principal;
    let totalContributions = principal;

    for (let i = 0; i < months; i++) {
        total = total * (1 + monthlyRate) + (monthly || 0);
        totalContributions += (monthly || 0);
    }

    const interestEarned = total - totalContributions;

    document.getElementById('ci-result').innerHTML = `
    <h4>📊 Growth Projection</h4>
    <div class="result-value text-gradient">$${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
    <div class="result-breakdown">
      <div class="result-item"><div class="label">Total Invested</div><div class="value">$${totalContributions.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div></div>
      <div class="result-item"><div class="label">Interest Earned</div><div class="value text-success">$${interestEarned.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div></div>
      <div class="result-item"><div class="label">Growth</div><div class="value text-success">${((total / totalContributions - 1) * 100).toFixed(1)}%</div></div>
      <div class="result-item"><div class="label">Period</div><div class="value">${years} years</div></div>
    </div>
  `;
}

function calculatePip() {
    const pair = document.getElementById('pip-pair').value;
    const lotSize = parseInt(document.getElementById('pip-lot').value);
    const pips = parseFloat(document.getElementById('pip-pips').value);

    const jpyPairs = ['USDJPY'];
    const pipSize = jpyPairs.includes(pair) ? 0.01 : 0.0001;
    const pipValue = (pipSize * lotSize);
    const totalValue = pipValue * pips;

    document.getElementById('pip-result').innerHTML = `
    <h4>📏 Pip Value Results</h4>
    <div class="result-value text-teal">$${totalValue.toFixed(2)}</div>
    <div class="result-breakdown">
      <div class="result-item"><div class="label">Per Pip</div><div class="value">$${pipValue.toFixed(2)}</div></div>
      <div class="result-item"><div class="label">Total Pips</div><div class="value">${pips}</div></div>
      <div class="result-item"><div class="label">Lot Size</div><div class="value">${lotSize.toLocaleString()}</div></div>
      <div class="result-item"><div class="label">Pair</div><div class="value">${pair}</div></div>
    </div>
  `;
}

function calculateRiskReward() {
    const entry = parseFloat(document.getElementById('rr-entry').value);
    const stoploss = parseFloat(document.getElementById('rr-stoploss').value);
    const takeprofit = parseFloat(document.getElementById('rr-takeprofit').value);

    if (!entry || !stoploss || !takeprofit) {
        showToast('error', 'Please fill in all fields.');
        return;
    }

    const risk = Math.abs(entry - stoploss);
    const reward = Math.abs(takeprofit - entry);
    const ratio = reward / risk;
    const isGood = ratio >= 2;

    document.getElementById('rr-result').innerHTML = `
    <h4>⚖️ Risk/Reward Analysis</h4>
    <div class="result-value" style="color:${isGood ? 'var(--success)' : 'var(--warning)'};">1 : ${ratio.toFixed(2)}</div>
    <div class="result-breakdown">
      <div class="result-item"><div class="label">Risk (SL)</div><div class="value text-danger">${risk.toFixed(2)}</div></div>
      <div class="result-item"><div class="label">Reward (TP)</div><div class="value text-success">${reward.toFixed(2)}</div></div>
      <div class="result-item"><div class="label">Quality</div><div class="value" style="color:${isGood ? 'var(--success)' : 'var(--warning)'};">${isGood ? '✅ Good' : '⚠️ Below 2:1'}</div></div>
      <div class="result-item"><div class="label">Win Rate Needed</div><div class="value">${(100 / (1 + ratio)).toFixed(1)}%</div></div>
    </div>
    <p style="margin-top:var(--space-md);font-size:0.82rem;color:var(--text-muted);">
      ${isGood ? 'This trade has a favorable risk/reward ratio. ✅' : 'Consider adjusting your levels for a minimum 2:1 ratio. ⚠️'}
    </p>
  `;
}

// ===== DASHBOARD =====
function initDashboard() {
    const holdingsBody = document.getElementById('holdingsBody');
    if (!holdingsBody) return;

    const holdings = getHoldings();
    renderHoldings(holdings);
    updateStats(holdings);
    renderPortfolioChart();
}

function getHoldings() {
    const defaults = [
        { name: 'Bitcoin', symbol: 'BTC', market: 'Crypto', qty: 0.5, avgCost: 68000, currentPrice: 101234, icon: '₿', color: 'var(--accent-gold)' },
        { name: 'Ethereum', symbol: 'ETH', market: 'Crypto', qty: 5, avgCost: 3200, currentPrice: 4123, icon: '⟠', color: 'var(--primary-light)' },
        { name: 'Apple Inc.', symbol: 'AAPL', market: 'US Stocks', qty: 20, avgCost: 180, currentPrice: 245.67, icon: '🍎', color: 'var(--text-primary)' },
        { name: 'NVIDIA', symbol: 'NVDA', market: 'US Stocks', qty: 10, avgCost: 500, currentPrice: 890.50, icon: '🟢', color: 'var(--success)' },
        { name: 'Saudi Aramco', symbol: '2222', market: 'Saudi', qty: 100, avgCost: 28, currentPrice: 32.10, icon: '🇸🇦', color: 'var(--accent-emerald)' },
        { name: 'Al Rajhi Bank', symbol: '1180', market: 'Saudi', qty: 50, avgCost: 75, currentPrice: 82.30, icon: '🏦', color: 'var(--accent-teal)' },
    ];

    return JSON.parse(localStorage.getItem('calcwise_holdings') || JSON.stringify(defaults));
}

function renderHoldings(holdings) {
    const tbody = document.getElementById('holdingsBody');
    if (!tbody) return;

    tbody.innerHTML = holdings.map(h => {
        const value = h.qty * h.currentPrice;
        const pnl = (h.currentPrice - h.avgCost) * h.qty;
        const change = ((h.currentPrice - h.avgCost) / h.avgCost) * 100;
        const isPositive = pnl >= 0;

        return `
      <tr>
        <td>
          <div class="asset-name">
            <span class="asset-icon" style="background:${h.color}22;">${h.icon}</span>
            <div>
              <div style="font-weight:500;">${h.name}</div>
              <div style="font-size:0.78rem;color:var(--text-muted);">${h.symbol}</div>
            </div>
          </div>
        </td>
        <td><span style="font-size:0.82rem;color:var(--text-secondary);">${h.market}</span></td>
        <td style="font-family:var(--font-mono);">${h.qty}</td>
        <td style="font-family:var(--font-mono);">$${h.avgCost.toLocaleString()}</td>
        <td style="font-family:var(--font-mono);">$${h.currentPrice.toLocaleString()}</td>
        <td style="font-family:var(--font-mono);font-weight:600;">$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        <td style="font-family:var(--font-mono);color:${isPositive ? 'var(--success)' : 'var(--danger)'};">${isPositive ? '+' : ''}$${pnl.toFixed(2)}</td>
        <td style="font-family:var(--font-mono);color:${isPositive ? 'var(--success)' : 'var(--danger)'};">${isPositive ? '↑' : '↓'} ${Math.abs(change).toFixed(2)}%</td>
      </tr>
    `;
    }).join('');
}

function updateStats(holdings) {
    const totalValue = holdings.reduce((sum, h) => sum + h.qty * h.currentPrice, 0);
    const totalCost = holdings.reduce((sum, h) => sum + h.qty * h.avgCost, 0);
    const totalPL = totalValue - totalCost;
    const totalPLPct = (totalPL / totalCost) * 100;

    const el = (id) => document.getElementById(id);
    if (el('totalValue')) el('totalValue').textContent = `$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (el('totalChange')) {
        el('totalChange').textContent = `${totalPL >= 0 ? '↑' : '↓'} ${totalPL >= 0 ? '+' : ''}${totalPLPct.toFixed(2)}%`;
        el('totalChange').className = `stat-change ${totalPL >= 0 ? 'positive' : 'negative'}`;
    }

    // Simulated daily P/L
    const dailyPL = totalValue * 0.012;
    if (el('todayPL')) el('todayPL').textContent = `+$${dailyPL.toFixed(2)}`;
    if (el('todayPLPct')) el('todayPLPct').textContent = `↑ +1.20%`;
    if (el('totalHoldings')) el('totalHoldings').textContent = holdings.length;

    // Best performer
    let best = holdings[0];
    holdings.forEach(h => {
        const changePct = ((h.currentPrice - h.avgCost) / h.avgCost) * 100;
        const bestChange = ((best.currentPrice - best.avgCost) / best.avgCost) * 100;
        if (changePct > bestChange) best = h;
    });

    if (el('bestPerformer')) el('bestPerformer').textContent = best.symbol;
    const bestChangePct = ((best.currentPrice - best.avgCost) / best.avgCost) * 100;
    if (el('bestPerformerChange')) el('bestPerformerChange').textContent = `↑ +${bestChangePct.toFixed(1)}%`;
}

function renderPortfolioChart() {
    const chart = document.getElementById('portfolioChart');
    if (!chart) return;

    // Generate sample performance data
    const bars = 28;
    const data = [];
    let val = 80;
    for (let i = 0; i < bars; i++) {
        val += (Math.random() - 0.35) * 10;
        val = Math.max(20, Math.min(100, val));
        data.push(val);
    }

    chart.innerHTML = data.map(v => {
        const height = v + '%';
        const isUp = v > 50;
        return `<div class="bar" style="height:${height};background:${isUp ? 'var(--primary)' : 'var(--danger)'};opacity:0.8;"></div>`;
    }).join('');
}

function openAddAssetModal() {
    const modal = document.getElementById('addAssetModal');
    if (modal) modal.classList.add('active');
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('active');
}

function addAsset(e) {
    e.preventDefault();
    const market = document.getElementById('asset-market').value;
    const name = document.getElementById('asset-name').value;
    const qty = parseFloat(document.getElementById('asset-quantity').value);
    const cost = parseFloat(document.getElementById('asset-cost').value);

    const marketIcons = { crypto: '₿', forex: '💱', 'us-stocks': '🏛', saudi: '🇸🇦' };
    const marketNames = { crypto: 'Crypto', forex: 'Forex', 'us-stocks': 'US Stocks', saudi: 'Saudi' };
    const marketColors = { crypto: 'var(--accent-gold)', forex: 'var(--accent-teal)', 'us-stocks': 'var(--primary)', saudi: 'var(--accent-emerald)' };

    const holdings = getHoldings();
    holdings.push({
        name: name,
        symbol: name.substring(0, 4).toUpperCase(),
        market: marketNames[market],
        qty: qty,
        avgCost: cost,
        currentPrice: cost * (1 + (Math.random() * 0.2 - 0.05)),
        icon: marketIcons[market],
        color: marketColors[market]
    });

    localStorage.setItem('calcwise_holdings', JSON.stringify(holdings));
    renderHoldings(holdings);
    updateStats(holdings);
    closeModal('addAssetModal');
    showToast('success', `${name} added to your portfolio! 🎉`);
}

function refreshDashboard() {
    const holdings = getHoldings();
    // Simulate price changes
    holdings.forEach(h => {
        h.currentPrice *= (1 + (Math.random() * 0.04 - 0.02));
    });
    localStorage.setItem('calcwise_holdings', JSON.stringify(holdings));
    renderHoldings(holdings);
    updateStats(holdings);
    renderPortfolioChart();
    updateLastUpdated();
    showToast('success', 'Dashboard refreshed with latest data! 📊');
}

function updateLastUpdated() {
    const el = document.getElementById('lastUpdated');
    if (el) {
        el.textContent = new Date().toLocaleString();
    }
}

// ===== MODAL CLOSE ON OUTSIDE CLICK =====
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
    }
});

// ===== CHECK URL HASH FOR TOOL TABS =====
if (window.location.hash) {
    const toolId = window.location.hash.substring(1);
    const panel = document.getElementById(toolId);
    if (panel && panel.classList.contains('tool-panel')) {
        document.querySelectorAll('.tool-panel').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.tool-tab').forEach(t => t.classList.remove('active'));
        panel.classList.add('active');
        // Find matching tab
        document.querySelectorAll('.tool-tab').forEach(t => {
            if (t.getAttribute('onclick')?.includes(toolId)) {
                t.classList.add('active');
            }
        });
    }
}
