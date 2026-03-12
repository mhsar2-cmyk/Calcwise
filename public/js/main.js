let lang = localStorage.getItem('calcwise_lang') || 'en';

const COURSE_POOL = [
    { id: 'beg-1', name: 'Beginner English 101', level: 'Beginner', category: 'General', icon: '🌱', color: '#00d2d3' },
    { id: 'int-1', name: 'Intermediate Grammar', level: 'Intermediate', category: 'Grammar', icon: '📝', color: '#6c5ce7' },
    { id: 'adv-1', name: 'Advanced Speaking', level: 'Advanced', category: 'Speaking', icon: '🎙️', color: '#ff9f43' },
    { id: 'bus-1', name: 'Business Writing', level: 'Business', category: 'Writing', icon: '💼', color: '#2e86de' },
    { id: 'ielt-1', name: 'IELTS Prep Masterclass', level: 'Advanced', category: 'Exam', icon: '🎓', color: '#ee5253' }
];

async function secureFetch(url, options = {}) {
    const token = localStorage.getItem('calcwise_token');
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return fetch(url, { ...options, headers });
}

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
    initAIAssistant();
    initEconomicCalendar();
    initSessionClock();

    // Global click listener to close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        const portfolioSearch = document.getElementById('portfolioSearchResults');
        const portfolioInput = document.getElementById('asset-name');
        if (portfolioSearch && portfolioInput && !portfolioSearch.contains(e.target) && e.target !== portfolioInput) {
            portfolioSearch.style.display = 'none';
        }

        const watchlistSearch = document.getElementById('watchlistSearchResults');
        const watchlistInput = document.getElementById('watchlistSearch');
        if (watchlistSearch && watchlistInput && !watchlistSearch.contains(e.target) && e.target !== watchlistInput) {
            watchlistSearch.style.display = 'none';
        }

        const modalWatchlistResults = document.getElementById('modalSearchResults');
        const modalWatchlistInput = document.getElementById('modalSearchInput');
        if (modalWatchlistResults && modalWatchlistInput && !modalWatchlistResults.contains(e.target) && e.target !== modalWatchlistInput) {
            modalWatchlistResults.style.display = 'none';
        }
    });

    // Auto-refresh dashboard progress every 30s
    setInterval(() => {
        if (document.getElementById('activeCoursesContainer')) {
            initDashboard();
        }
    }, 30000);
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
    'nav-courses': { en: 'Courses', ar: 'الدورات' },
    'nav-labs': { en: 'Live Labs', ar: 'مختبرات مباشرة' },
    'nav-blog': { en: 'Blog', ar: 'المدونة' },
    'nav-community': { en: 'Community', ar: 'المجتمع' },
    'nav-login': { en: 'Log In', ar: 'تسجيل الدخول' },
    'nav-get-started': { en: 'Get Started', ar: 'ابدأ الآن' },

    // ---- HERO ----
    'hero-badge': { en: 'New: AI Conversation Practice Now Live!', ar: 'جديد: ممارسة المحادثة بالذكاء الاصطناعي متاحة الآن!' },
    'hero-title-1': { en: 'Unlock Your Potential', ar: 'أطلق العنان لإمكانياتك' },
    'hero-title-2': { en: 'English', ar: 'اللغة الإنجليزية' },
    'hero-title-3': { en: 'Mastery Awaits', ar: 'في انتظارك' },
    'hero-desc': { en: 'Master English with interactive courses, real-time progress tracking, and personalized learning paths designed by linguistic experts.', ar: 'أتقن اللغة الإنجليزية من خلال دورات تفاعلية، وتتبع التقدم في الوقت الفعلي، ومسارات تعلم مخصصة صممها خبراء لغويون.' },
    'hero-cta-1': { en: 'Start Learning for Free →', ar: 'ابدأ التعلم مجاناً ←' },
    'hero-cta-2': { en: 'View Courses', ar: 'عرض الدورات' },

    // ---- LEVELS SECTION ----
    'levels-title-1': { en: 'Choose Your', ar: 'اختر مستوى' },
    'levels-title-2': { en: 'Learning Level', ar: 'التعلم الخاص بك' },
    'levels-desc': { en: 'From beginner to professional, we have a path for every learner.', ar: 'من المبتدئ إلى المحترف، لدينا مسار لكل متعلم.' },
    'level-beginner-title': { en: 'Beginner (A1-A2)', ar: 'مبتدئ (A1-A2)' },
    'level-beginner-desc': { en: 'Build a strong foundation with essential vocabulary, basic grammar, and simple conversational skills.', ar: 'ابنِ أساساً قوياً مع المفردات الأساسية، والقواعد البسيطة، ومهارات المحادثة الأساسية.' },
    'level-beginner-link': { en: 'Start Journey →', ar: 'ابدأ الرحلة ←' },
    'level-intermediate-title': { en: 'Intermediate (B1-B2)', ar: 'متوسط (B1-B2)' },
    'level-intermediate-desc': { en: 'Expand your fluency, tackle complex grammar, and engage in more sophisticated discussions.', ar: 'وسع طلاقتك، وتناول القواعد المعقدة، وشارك في مناقشات أكثر تطوراً.' },
    'level-intermediate-link': { en: 'Level Up →', ar: 'ارتقِ بمستواك ←' },
    'level-advanced-title': { en: 'Advanced (C1-C2)', ar: 'متقدم (C1-C2)' },
    'level-advanced-desc': { en: 'Refine your nuances, master academic English, and sound like a near-native speaker.', ar: 'صقل مهاراتك، وأتقن الإنجليزية الأكاديمية، وتحدث كالمحترفين.' },
    'level-advanced-link': { en: 'Refine Skills →', ar: 'صقل المهارات ←' },
    'level-business-title': { en: 'Business English', ar: 'الإنجليزية للأعمال' },
    'level-business-desc': { en: 'Professional communication, workplace etiquette, and technical terminology for your career.', ar: 'التواصل المهني، وآداب العمل، والمصطلحات التقنية لمستقبلك المهني.' },
    'level-business-link': { en: 'Go Pro →', ar: 'كن محترفاً ←' },

    // ---- LEARNING STATS ----
    'stats-title-1': { en: 'Join a', ar: 'انضم إلى' },
    'stats-title-2': { en: 'Global Community', ar: 'مجتمع عالمي' },
    'stats-desc': { en: 'Empowering learners from every corner of the world.', ar: 'تمكين المتعلمين من كل ركن في العالم.' },
    'stat-learners': { en: 'Active Learners', ar: 'متعلم نشط' },
    'stat-countries': { en: 'Countries Represented', ar: 'دولة ممثلة' },
    'stat-satisfaction': { en: 'Success Rate', ar: 'نسبة النجاح' },
    'stat-learners-val': { en: '50k+', ar: '٥٠ ألف+' },
    'stat-countries-val': { en: '150+', ar: '١٥٠+' },
    'stat-satisfaction-val': { en: '98%', ar: '٩٨٪' },

    // ---- FEATURES ----
    'features-title-1': { en: 'Why Choose', ar: 'لماذا تختار' },
    'features-title-2': { en: 'LingoWise', ar: 'LingoWise' },
    'features-desc': { en: 'Innovative tools designed to make language learning effective and fun', ar: 'أدوات مبتكرة مصممة لجعل تعلم اللغة فعالاً وممتعاً' },
    'feature-1-title': { en: 'AI Speaking Lab ⚡', ar: 'مختبر التحدث بالذكاء الاصطناعي ⚡' },
    'feature-1-desc': { en: 'Practice real conversations with our AI tutor and get instant feedback on pronunciation.', ar: 'مارس محادثات حقيقية مع مدرسنا الآلي واحصل على ملاحظات فورية حول النطق.' },
    'feature-2-title': { en: 'Progress Trackers 📊', ar: 'متتبعات التقدم 📊' },
    'feature-2-desc': { en: 'Visualize your growth with detailed analytics for vocabulary, grammar, and fluency.', ar: 'تصور نموك مع تحليلات مفصلة للمفردات والقواعد والطلاقة.' },
    'feature-3-title': { en: 'Active Recall ✨', ar: 'الاستدعاء النشط ✨' },
    'feature-3-desc': { en: 'Spaced repetition system (SRS) for long-term vocabulary retention and mastery.', ar: 'نظام التكرار المتباعد (SRS) للاحتفاظ بالمفردات وإتقانها على المدى الطويل.' },
    'feature-4-title': { en: 'Live Study Groups 💬', ar: 'مجموعات الدراسة المباشرة 💬' },
    'feature-4-desc': { en: 'Join small, interactive groups led by native speakers for real-world practice.', ar: 'انضم إلى مجموعات صغيرة وتفاعلية بقيادة متحدثين أصليين للممارسة الواقعية.' },
    'feature-5-title': { en: 'Certified Courses 🔐', ar: 'دورات معتمدة 🔐' },
    'feature-5-desc': { en: 'Pathways aligned with CEFR standards (A1 to C2) to help you achieve your goals.', ar: 'مسارات تتماشى مع معايير CEFR (من A1 إلى C2) لمساعدتك في تحقيق أهدافك.' },
    'feature-6-title': { en: 'Multi-Device Learning 🌍', ar: 'التعلم عبر أجهزة متعددة 🌍' },
    'feature-6-desc': { en: 'Learn on the go. Sync your progress across desktop, tablet, and mobile devices.', ar: 'تعلم أثناء التنقل. زامن تقدمك عبر الكمبيوتر والجهاز اللوحي والهاتف.' },
    
    // ---- HOME BLOG SECTION ----
    'blog-section-title-1': { en: 'Latest from the', ar: 'آخر المقالات من' },
    'blog-section-title-2': { en: 'Learning Blog', ar: 'مدونة التعلم' },
    'blog-section-desc': { en: 'Language tips, study strategies, and expert advice', ar: 'نصائح لغوية، استراتيجيات دراسية، ونصائح الخبراء' },
    'blog-view-all': { en: 'View All Articles →', ar: 'عرض جميع المقالات ←' },

    // ---- HOME TOOLS SECTION ----
    'tools-section-title-1': { en: 'Powerful', ar: 'أدوات' },
    'tools-section-title-2': { en: 'Learning Tools', ar: 'تعلم قوية' },
    'tools-section-desc': { en: 'Free tools to help you master vocabulary, grammar, and speaking skills', ar: 'أدوات مجانية لمساعدتك في إتقان المفردات والقواعد مهارات التحدث' },

    // ---- CTA ----
    'cta-title-1': { en: 'Ready to Master', ar: 'مستعد لإتقان' },
    'cta-title-2': { en: 'English', ar: 'الإنجليزية' },
    'cta-desc': { en: 'Join thousands of learners achieving fluency with LingoWise. Your global career starts here.', ar: 'انضم إلى آلاف المتعلمين الذين يحققون الطلاقة مع LingoWise. مسيرتك العالمية تبدأ من هنا.' },
    'cta-btn-1': { en: 'Create Free Account →', ar: 'إنشاء حساب مجاني ←' },
    'cta-btn-2': { en: 'Log In', ar: 'تسجيل الدخول' },

    // ---- FOOTER ----
    'footer-tagline': { en: 'Your all-in-one English language learning platform.', ar: 'منصتك الشاملة لتعلم اللغة الإنجليزية.' },
    'footer-courses': { en: 'Courses', ar: 'الدورات' },
    'footer-resources': { en: 'Resources', ar: 'الموارد' },
    'footer-legal': { en: 'Legal', ar: 'قانوني' },
    'footer-about': { en: 'About Us', ar: 'من نحن' },
    'footer-privacy': { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
    'footer-terms': { en: 'Terms of Service', ar: 'شروط الخدمة' },
    'footer-contact': { en: 'Contact Us', ar: 'اتصل بنا' },
    'footer-account': { en: 'Account', ar: 'الحساب' },
    'footer-blog': { en: 'Learning Blog', ar: 'مدونة التعلم' },
    'footer-tools': { en: 'Learning Tools', ar: 'أدوات التعلم' },
    'footer-copyright': { en: '© 2026 LingoWise. All rights reserved.', ar: '© 2026 LingoWise. جميع الحقوق محفوظة.' },

    // ---- PAGE HEADERS ----
    'page-crypto-title': { en: 'Cryptocurrency', ar: 'العملات الرقمية' },
    'page-crypto-desc': { en: 'Real-time prices, interactive charts, and market analytics for 10,000+ digital assets.', ar: 'أسعار لحظية ورسوم بيانية تفاعلية وتحليلات سوقية لأكثر من ١٠,٠٠٠ أصل رقمي.' },
    'page-forex-title': { en: 'Forex', ar: 'الفوركس' },
    'page-forex-desc': { en: 'Real-time exchange rates, interactive charts, and analysis for all major, minor, and exotic currency pairs.', ar: 'أسعار صرف لحظية ورسوم بيانية تفاعلية وتحليلات لجميع أزواج العملات.' },
    'page-us-title': { en: 'US Stock', ar: 'سوق الأسهم' },
    'page-us-desc': { en: 'Real-time data for S&P 500, NASDAQ, Dow Jones, and thousands of individual stocks.', ar: 'بيانات لحظية لمؤشر S&P 500 وناسداك وداو جونز وآلاف الأسهم الفردية.' },
    'page-saudi-title': { en: 'Saudi Market', ar: 'السوق السعودي' },
    'page-saudi-desc': { en: 'Tadawul (TASI) — Real-time data, charts, and analytics for the Saudi Arabian stock exchange.', ar: 'تداول (تاسي) — بيانات لحظية ورسوم بيانية وتحليلات للسوق المالية السعودية.' },
    'page-blog-title': { en: 'Learning', ar: 'مدونة' },
    'page-blog-title-2': { en: 'Blog', ar: 'التعلم' },
    'page-blog-desc': { en: 'Language tips, study strategies, and expert advice for every level.', ar: 'نصائح لغوية، استراتيجيات دراسية، ونصائح الخبراء لكل المستويات.' },
    'page-tools-title': { en: 'Learning', ar: 'أدوات' },
    'page-tools-title-2': { en: 'Tools', ar: 'التعلم' },
    'page-tools-desc': { en: 'Interactive tools to help you master vocabulary, grammar, and speaking skills.', ar: 'أدوات تفاعلية لمساعدتك في إتقان المفردات والقواعد ومهارات التحدث.' },

    // ---- AUTH ----
    'auth-welcome': { en: 'Welcome Back', ar: 'مرحباً بعودتك' },
    'auth-login-desc': { en: 'Log in to your account to access your portfolio and tools.', ar: 'سجّل دخولك للوصول إلى محفظتك وأدواتك.' },
    'auth-email': { en: 'Email Address', ar: 'البريد الإلكتروني' },
    'auth-password': { en: 'Password', ar: 'كلمة المرور' },
    'auth-password-ph': { en: 'Min. 8 characters', ar: '٨ أحرف على الأقل' },
    'auth-confirm-ph': { en: 'Re-enter password', ar: 'أعد إدخال كلمة المرور' },
    'auth-email-ph': { en: 'you@example.com', ar: 'you@example.com' },
    'auth-first-ph': { en: 'John', ar: 'مثلاً: علي' },
    'auth-last-ph': { en: 'Doe', ar: 'مثلاً: أحمد' },
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
    'auth-login-success': { en: 'Login successful! Redirecting...', ar: 'تم تسجيل الدخول بنجاح! جاري التحويل...' },
    'auth-signup-success': { en: 'Account created! Welcome to LingoWise.', ar: 'تم إنشاء الحساب! مرحباً بك في لينغو وايز.' },
    'auth-error-password': { en: 'Passwords do not match!', ar: 'كلمات المرور غير متطابقة!' },

    // ---- DASHBOARD ----
    'dash-hi': { en: 'Hi', ar: 'مرحباً' },
    'dash-welcome': { en: 'Good morning, Student! ☀️', ar: 'صباح الخير، أيها الطالب! ☀️' },
    'dash-learning-time': { en: 'Learning Time ⏱️', ar: 'وقت التعلم ⏱️' },
    'dash-courses-done': { en: 'Courses Completed 🏆', ar: 'الدورات المكتملة 🏆' },
    'dash-vocab-mastery': { en: 'Vocab Mastery 🔤', ar: 'إتقان المفردات 🔤' },
    'dash-speaking-score': { en: 'Speaking Score 🎙️', ar: 'درجة التحدث 🎙️' },
    'dash-active-courses': { en: 'Current Courses', ar: 'الدورات الحالية' },
    'dash-daily-goals': { en: 'Daily Learning Goals', ar: 'أهداف التعلم اليومية' },
    'dash-recent-vocab': { en: 'Recently Learned Words', ar: 'كلمات تعلمتها مؤخراً' },
    'dash-upcoming-labs': { en: 'Upcoming Live Labs', ar: 'المختبرات المباشرة القادمة' },
    'dash-browse-courses': { en: 'Browse Courses', ar: 'تصفح الدورات' },
    'dash-vocab-add': { en: '+ Add Word', ar: '+ إضافة كلمة' },
    'dash-streak-title': { en: 'Current Streak 🔥', ar: 'السلسلة الحالية 🔥' },
    'dash-streak-days': { en: '5 Days', ar: '٥ أيام' },
    'dash-streak-sub': { en: 'Keep it up! Reach 7 for a bonus.', ar: 'استمر! صل إلى ٧ للحصول على مكافأة.' },
    'dash-welcome-sub': { en: 'Track your progress and continue your journey.', ar: 'تتبع تقدمك وواصل رحلتك.' },
    'dash-view-all': { en: 'View All', ar: 'عرض الكل' },
    'dash-stat-time-sub': { en: '+2.5 hrs this week', ar: '+٢.٥ ساعة هذا الأسبوع' },
    'dash-stat-courses-sub': { en: 'Next: Business English', ar: 'التالي: الإنجليزية للأعمال' },
    'dash-stat-vocab-sub': { en: '↑ 15 new today', ar: '↑ ١٥ كلمة جديدة اليوم' },
    'dash-stat-speak-sub': { en: '↑ Improved 5%', ar: '↑ تحسن بنسبة ٥٪' },
    'dash-lab-native': { en: 'Native Slang & Idioms', ar: 'العامية والاصطلاحات الأصلية' },
    'dash-lab-starting': { en: 'Starting in 45 minutes', ar: 'يبدأ خلال ٤٥ دقيقة' },
    'dash-lab-join': { en: 'Join Lab', ar: 'انضم للمختبر' },
    'dash-lab-ielts': { en: 'IELTS Strategy Intensive', ar: 'استراتيجية الآيلتس المكثفة' },
    'dash-lab-tomorrow': { en: 'Tomorrow at 6:00 PM', ar: 'غداً الساعة ٦:٠٠ مساءً' },
    'dash-lab-reminder': { en: 'Set Reminder', ar: 'تعيين تذكير' },
    
    'market-crypto': { en: 'Crypto', ar: 'كريبتو' },
    'market-forex': { en: 'Forex', ar: 'فوركس' },
    'market-us-stocks': { en: 'US Stocks', ar: 'أسهم أمريكية' },
    'market-saudi': { en: 'Saudi Market', ar: 'السوق السعودي' },

    'modal-add-title': { en: 'Add Asset to Portfolio', ar: 'إضافة أصل للمحفظة' },
    'modal-market': { en: 'Market', ar: 'السوق' },
    'modal-asset-name': { en: 'Asset Name / Symbol', ar: 'اسم الأصل / الرمز' },
    'modal-qty': { en: 'Quantity', ar: 'الكمية' },
    'modal-avg-cost': { en: 'Average Cost', ar: 'متوسط التكلفة' },
    'modal-add-btn': { en: 'Add to Portfolio', ar: 'إضافة للمحفظة' },
    
    'watchlist-modal-title': { en: 'Add to Watchlist', ar: 'إضافة لقائمة المراقبة' },
    'watchlist-add-btn': { en: '+ Add Asset', ar: '+ إضافة أصل' },
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
    'dash-clear-all': { en: 'Clear All', ar: 'مسح الكل' },
    'dash-logout': { en: 'Log Out', ar: 'تسجيل الخروج' },

    // ---- SIDEBAR ----
    'sidebar-overview': { en: 'Learning Hub', ar: 'مركز التعلم' },
    'sidebar-dashboard': { en: 'Dashboard', ar: 'لوحة التحكم' },
    'sidebar-courses': { en: 'My Courses', ar: 'دوراتي' },
    'sidebar-vocabulary': { en: 'Vocabulary Bank', ar: 'بنك الكلمات' },
    'sidebar-speaking': { en: 'AI Speaking Lab', ar: 'مختبر التحدث' },
    'sidebar-resources': { en: 'Resources', ar: 'الموارد' },
    'sidebar-grammar': { en: 'Grammar Guide', ar: 'دليل القواعد' },
    'sidebar-labs': { en: 'Live Labs', ar: 'مختبرات مباشرة' },
    'sidebar-settings': { en: 'Settings', ar: 'الإعدادات' },
    'sidebar-logout': { en: 'Log Out', ar: 'تسجيل الخروج' },
    'sidebar-streak': { en: 'Current Streak', ar: 'السلسلة الحالية' },
    'sidebar-streak-info': { en: 'Keep it up! Reach 7 for a bonus.', ar: 'استمر! صل إلى ٧ للحصول على مكافأة.' },
    'sidebar-days': { en: 'Days', ar: 'أيام' },

    // ---- JOURNAL PAGE ----
    'journal-title': { en: 'Trade Journal 📓', ar: 'سجل التداول 📓' },
    'journal-subtitle': { en: 'Reflect on your trades to become a better investor.', ar: 'حلل تداولاتك لتصبح مستثمراً أفضل.' },
    'journal-log-btn': { en: '+ Log Trade', ar: '+ تسجيل صفقة' },
    'journal-stat-winrate': { en: 'Win Rate', ar: 'نسبة الربح' },
    'journal-stat-netpl': { en: 'Total Net Profit', ar: 'صافي الربح الكلي' },
    'journal-stat-across': { en: 'Across all assets', ar: 'عبر جميع الأصول' },
    'journal-stat-avgprofit': { en: 'Avg. Profit / Trade', ar: 'متوسط الربح / صفقة' },
    'journal-stat-best': { en: 'Best Performing Asset', ar: 'أفضل أصل أداءاً' },
    'journal-stat-best-sub': { en: 'Highest P/L Contribution', ar: 'أعلى مساهمة ر/خ' },
    'journal-add-title': { en: 'Log New Trade', ar: 'تسجيل صفقة جديدة' },
    'journal-th-date': { en: 'Date', ar: 'التاريخ' },
    'journal-th-asset': { en: 'Asset', ar: 'الأصل' },
    'journal-th-type': { en: 'Type', ar: 'النوع' },
    'journal-th-entry': { en: 'Entry', ar: 'الدخول' },
    'journal-th-exit': { en: 'Exit', ar: 'الخروج' },
    'journal-th-pnl': { en: 'P/L', ar: 'الربح/الخسارة' },
    'journal-th-notes': { en: 'Notes', ar: 'ملاحظات' },
    'journal-form-asset': { en: 'Asset (e.g. BTC)', ar: 'الأصل (مثال: BTC)' },
    'journal-form-type': { en: 'Type', ar: 'النوع' },
    'journal-form-entry': { en: 'Entry Price', ar: 'سعر الدخول' },
    'journal-form-exit': { en: 'Exit Price', ar: 'سعر الخروج' },
    'journal-form-qty': { en: 'Quantity', ar: 'الكمية' },
    'journal-form-notes': { en: 'Notes', ar: 'ملاحظات' },
    'journal-form-submit': { en: 'Save Trade Record', ar: 'حفظ سجل الصفقة' },
    'journal-type-long': { en: 'Long ↑', ar: 'شراء ↑' },
    'journal-type-short': { en: 'Short ↓', ar: 'بيع ↓' },
    'journal-empty': { en: 'No trades logged yet. Click "+ Log Trade" to add your first entry.', ar: 'لا توجد صفقات بعد. اضغط "+ تسجيل صفقة" لإضافة أول سجل.' },

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
    'filter-tools': { en: 'Study Strategies', ar: 'استراتيجيات الدراسة' },
    'filter-strategy': { en: 'Fluency', ar: 'الطلاقة' },
    'filter-grammar': { en: 'Grammar Guide', ar: 'دليل القواعد' },
    'blog-subscribe': { en: 'Subscribe', ar: 'اشتراك' },
    'blog-newsletter-title-1': { en: 'Stay', ar: 'ابقَ' },
    'blog-newsletter-title-2': { en: 'Informed', ar: 'مطّلعاً' },
    'blog-newsletter-desc': { en: 'Get weekly market insights, trading tips, and exclusive analysis delivered to your inbox.', ar: 'احصل على رؤى سوقية أسبوعية ونصائح تداول وتحليلات حصرية في بريدك الإلكتروني.' },
    'blog-featured-tag': { en: 'Featured', ar: 'مميز' },

    // ---- BLOG SPECIFIC ----
    'blog-hero-title': { en: 'Finance <span class="text-gold">Blog</span>', ar: 'المدونة <span class="text-gold">المالية</span>' },
    'blog-hero-sub': { en: 'Expert analysis, trading strategies, and market insights to help you make smarter financial decisions.', ar: 'تحليلات الخبراء، استراتيجيات التداول، ورؤى السوق لمساعدتك على اتخاذ قرارات مالية أذكى.' },

    // Blog Cards
    'blog-card-1-title': { en: 'Top 10 Phrasal Verbs for Business English 💼', ar: 'أهم ١٠ أفعال مركبة للغة الإنجليزية للأعمال 💼' },
    'blog-card-1-desc': { en: 'Master the most common expressions used in professional settings to sound more natural. 📈', ar: 'أتقن التعبيرات الأكثر شيوعاً في البيئات المهنية لتبدو أكثر طبيعية. 📈' },
    'blog-card-2-title': { en: 'How to Prepare for the IELTS Speaking Test 🎙️', ar: 'كيفية التحضير لاختبار التحدث في الآيلتس 🎙️' },
    'blog-card-2-desc': { en: 'Expert tips and strategies to help you achieve a Band 7+ score in your next exam. 🏛️', ar: 'نصائح واستراتيجيات الخبراء لمساعدتك في الحصول على ٧+ في اختبارك القادم. 🏛️' },
    'blog-card-3-title': { en: 'The Secret to Mastering English Pronunciation 🗣️', ar: 'سر إتقان نطق اللغة الإنجليزية 🗣️' },
    'blog-card-3-desc': { en: 'Learn the techniques native speakers use to improve their clarity and accent. 🛡️', ar: 'تعلم التقنيات التي يستخدمها المتحدثون الأصليون لتحسين وضوحهم ولهجتهم. 🛡️' },
    'blog-card-4-title': { en: 'English vs Arabic: Common Grammar Hurdles 🌍', ar: 'الإنجليزية مقابل العربية: عقبات القواعد الشائعة 🌍' },
    'blog-card-4-desc': { en: 'Understanding the key differences between the two languages to avoid common mistakes. 🤖', ar: 'فهم الاختلافات الرئيسية بين اللغتين لتجنب الأخطاء الشائعة. 🤖' },
    'blog-card-5-title': { en: '15 Idioms to Sound Like a Native Speaker ✨', ar: '١٥ عبارة اصطلاحية لتبدو كمتحدث أصلي ✨' },
    'blog-card-5-desc': { en: 'Add these fun and common idioms to your daily vocabulary to impress your friends. 💰', ar: 'أضف هذه العبارات الاصطلاحية الممتعة والشائعة إلى مفرداتك اليومية لإبهار أصدقائك. 💰' },
    'blog-card-6-title': { en: 'Effective Ways to Learn Vocabulary Fast 💡', ar: 'طرق فعالة لتعلم المفردات بسرعة 💡' },
    'blog-card-6-desc': { en: 'Using science-backed methods like spaced repetition and active recall. 🏗️', ar: 'باستخدام طرق مدعومة علمياً مثل التكرار المتباعد والاسترجاع النشط. 🏗️' },
    'blog-card-7-title': { en: 'Writing the Perfect Resume in English 👔', ar: 'كتابة السيرة الذاتية المثالية باللغة الإنجليزية 👔' },
    'blog-card-7-desc': { en: 'A step-by-step guide to showcasing your skills for international career opportunities. 📈', ar: 'دليل خطوة بخطوة لعرض مهاراتك لفرص العمل الدولية. 📈' },
    'blog-card-8-title': { en: 'Overcoming the Fear of Speaking English 🧠', ar: 'التغلب على الخوف من التحدث بالإنجليزية 🧠' },
    'blog-card-8-desc': { en: 'Psychological strategies to build confidence and start conversing fluently. 🧘', ar: 'استراتيجيات نفسية لبناء الثقة والبدء في التحدث بطلاقة. 🧘' },
    'blog-card-9-title': { en: 'Mastering English Tenses Once and For All 📉', ar: 'إتقان أزمنة الإنجليزية مرة واحدة وللأبد 📉' },
    'blog-card-9-desc': { en: 'A clear and simple guide to understanding when to use each tense. 📐', ar: 'دليل واضح وبسيط لفهم متى تستخدم كل زمن. 📐' },
    'blog-card-10-title': { en: 'Is Daily Practice Better Than Weekly Study? 📏', ar: 'هل الممارسة اليومية أفضل من الدراسة الأسبوعية؟ 📏' },
    'blog-card-10-desc': { en: 'Why consistency matters more than intensity and how LingoWise tools can help you stay on track. 🎓', ar: 'لماذا يهم الاستمرار أكثر من الكثافة وكيف تساعد أدوات LingoWise في البقاء على المسار الصحيح. 🎓' },
    'blog-read-more': { en: 'Read More →', ar: 'اقرأ المزيد ←' },

    // ---- TOOLS PAGE ----
    'tools-hero-title': { en: 'Language Learning <span class="text-gradient">Tools</span>', ar: 'أدوات <span class="text-gradient">تعلم اللغة</span>' },
    'tools-hero-sub': { en: 'Free resources to help you practice speaking, expand vocabulary, and track your metrics.', ar: 'موارد مجانية لمساعدتك في ممارسة التحدث، وتوسيع المفردات، وتتبع مقاييسك.' },
    'sidebar-watchlist': { en: 'Watchlist', ar: 'قائمة المراقبة' },
    'watchlist-title': { en: 'Market Watchlist 👁️', ar: 'قائمة مراقبة السوق 👁️' },
    'watchlist-subtitle': { en: 'Keep an eye on the assets that matter most to you.', ar: 'راقب الأصول التي تهمك أكثر من غيرها.' },
    'watchlist-search-placeholder': { en: 'Search for assets to add...', ar: 'ابحث عن أصل لإضافته...' },
    'watchlist-add-btn': { en: '+ Add Asset', ar: '+ إضافة أصل' },
    'watchlist-modal-title': { en: 'Add to Watchlist', ar: 'إضافة لقائمة المراقبة' },
    'watchlist-modal-desc': { en: 'Type asset name or ticker to add it to your monitor.', ar: 'اكتب اسم الأصل أو رمزه لإضافته للمراقبة.' },
    'watchlist-empty-msg': { en: 'Your watchlist is empty. Start adding assets to track them!', ar: 'قائمة المراقبة فارغة. ابدأ بإضافة الأصول لتتبعها!' },
    'watchlist-remove-confirm': { en: 'Remove {name} from your watchlist?', ar: 'إزالة {name} من قائمة المراقبة؟' },
    'session-open': { en: 'OPEN', ar: 'مفتوح' },
    'session-closed': { en: 'CLOSED', ar: 'مغلق' },
    'session-tadawul': { en: 'Tadawul', ar: 'تداول' },

    'tab-speaking-lab': { en: '🎙️ Speaking Lab', ar: '🎙️ مختبر التحدث' },
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

    // ---- BLOG CONTENT ----
    'blog-read-more': { en: 'Read Full Article', ar: 'اقرأ المقال كاملاً' },
    'blog-1-content': {
        en: `<h3>The Altcoin Season of 2026: A Deep Dive</h3>
             <p>As Bitcoin stabilizes after its historic run, the spotlight is shifting to the altcoin market. Historically, capital flows from BTC into high-cap altcoins and then descends into smaller projects. This cycle, we are seeing strong fundamental growth in AI-driven tokens and DePIN (Decentralized Physical Infrastructure Networks).</p>
             <p>Our top picks to watch include projects focused on scaling Ethereum and those providing verifiable AI compute. Remember, risk management is key. Never chase green candles without a clear exit plan.</p>
             <ul>
               <li><b>AI Integration:</b> Look for tokens providing actual utility in the AI space.</li>
               <li><b>Gaming Evolution:</b> High-quality games are finally launching on-chain.</li>
               <li><b>Layer 2 Solutions:</b> Scalability remains the top priority for adoption.</li>
             </ul>`,
        ar: `<h3>موسم العملات البديلة 2026: نظرة عميقة</h3>
             <p>بينما يستقر البيتكوين بعد ارتفاعه التاريخي، ينتقل الضوء إلى سوق العملات البديلة. تاريخياً، تدفقات رأس المال تنتقل من البيتكوين إلى العملات الكبيرة ثم إلى المشاريع الأصغر. في هذه الدورة، نرى نمواً قوياً في العملات المرتبطة بالذكاء الاصطناعي وشبكات البنية التحتية اللامركزية (DePIN).</p>
             <p>ترشيحاتنا للمراقبة تشمل مشاريع تحجيم إيثيريوم وتلك التي توفر حوسبة ذكاء اصطناعي موثقة. تذكر، إدارة المخاطر هي المفتاح. لا تطارد الشموع الخضراء دون خطة خروج واضحة.</p>
             <ul>
               <li><b>تكامل الذكاء الاصطناعي:</b> ابحث عن العملات التي تقدم فائدة حقيقية.</li>
               <li><b>تطور الألعاب:</b> بدأت الألعاب عالية الجودة في الإطلاق الفعلي.</li>
               <li><b>حلول الطبقة الثانية:</b> تظل القدرة على التحجيم هي الأولوية القصوى.</li>
             </ul>`
    },
    'blog-2-content': {
        en: `<h3>EUR/USD: The Central Bank Tug-of-War</h3>
             <p>The currency markets are currently dominated by the divergence between Federal Reserve and European Central Bank policies. While the Fed signals a "higher for longer" stance to combat sticky inflation, the ECB is grappling with sluggish growth in the Eurozone.</p>
             <p>Traders should monitor the monthly CPI data and unemployment rates closely. A break below the 1.05 level would signal further bearish momentum for the Euro.</p>`,
        ar: `<h3>اليورو مقابل الدولار: صراع البنوك المركزية</h3>
             <p>تهيمن الفوارق بين سياسات الاحتياطي الفيدرالي والبنك المركزي الأوروبي حالياً على أسواق العملات. بينما يشير الفيدرالي إلى سياسة "أسعار فائدة أعلى لفترة أطول"، يعاني المركزي الأوروبي من نمو متباطئ في منطقة اليورو.</p>
             <p>يجب على المتداولين مراقبة بيانات التضخم ومعدلات البطالة الشهرية بدقة. كسر مستوى 1.05 سيشير إلى المزيد من الزخم السلبي لليورو.</p>`
    },
    'blog-3-content': {
        en: `<h3>The 2% Rule: Professional Risk Management</h3>
             <p>Why do most retail traders fail? Poor risk management. Professional traders use the "2% Rule" — never risking more than 2% of their total equity on any single trade.</p>
             <p>By using CalcWise's Position Sizer, you can automatically calculate exactly how many lots or units to trade based on your stop-loss distance. This ensures that even a string of losses won't wipe out your account.</p>`,
        ar: `<h3>قاعدة الـ 2%: إدارة المخاطر الاحترافية</h3>
             <p>لماذا يفشل معظم المتداولين الأفراد؟ بسبب سوء إدارة المخاطر. يستخدم المتداولون المحترفون "قاعدة الـ 2%" - والتي تنص على عدم المخاطرة بأكثر من 2% من إجمالي رأس المال في أي صفقة واحدة.</p>
             <p>باستخدام حاسبة حجم المركز في كالك وايز، يمكنك حساب عدد العقود بدقة بناءً على مسافة الوقف. هذا يضمن أن حتى سلسلة من الخسائر لن تمحو حسابك.</p>`
    },
    'blog-4-content': {
        en: `<h3>NVIDIA and the AI Revolution: Market Outlook</h3>
             <p>NVIDIA has become the bellwether of the US stock market. Its quarterly earnings reports now carry more weight than some economic indicators. But is the valuation justified?</p>
             <p>While the AI boom is real, we are seeing signs of institutional profit-taking. Diversifying into AI software and energy sectors might be a smarter move for the second half of 2026.</p>`,
        ar: `<h3>إنفيديا وثورة الذكاء الاصطناعي: نظرة على السوق</h3>
             <p>أصبحت شركة إنفيديا (NVIDIA) هي المحرك الأساسي لسوق الأسهم الأمريكي. تقارير أرباحها الفصلية أصبحت تزن أكثر من بعض المؤشرات الاقتصادية. لكن هل التقييم الحالي عادل؟</p>
             <p>بينما طفرة الذكاء الاصطناعي حقيقية، نرى بوادر لجني أرباح من قِبل المؤسسات. التنويع في برمجيات الذكاء الاصطناعي وقطاعات الطاقة قد يكون خطوة أذكى للنصف الثاني من 2026.</p>`
    },
    'blog-5-content': {
        en: `<h3>Dividend Investing in 2026: Building Wealth</h3>
             <p>In a volatile market, dividend-paying stocks provide a safety net. Focus on "Dividend Aristocrats" — companies that have consistently raised their payouts for over 25 years.</p>
             <p>Our top sectors for 2026 include Utilities, Consumer Staples, and specialized Real Estate Investment Trusts (REITs).</p>`,
        ar: `<h3>استثمار توزيعات الأرباح في 2026: بناء الثروة</h3>
             <p>في سوق متقلب، توفر الشركات التي توزع أرباحاً شبكة أمان. ركز على "أرستقراطيي التوزيعات" - الشركات التي رفعت توزيعاتها باستمرار لأكثر من 25 عاماً.</p>
             <p>قطاعاتنا المفضلة لعام 2026 تشمل المرافق، السلع الاستهلاكية الأساسية، وصناديق الاستثمار العقاري (REITs).</p>`
    },
    'blog-6-content': {
        en: `<h3>Saudi Vision 2030: The Industrial Transformation</h3>
             <p>The Saudi Arabian market (TASI) is evolving beyond oil. Large-scale projects like NEOM and Qiddiya are creating massive opportunities in the construction, financial, and tourism sectors.</p>
             <p>Watch for banks like Al Rajhi and SNB, as they are central to financing this historic transformation.</p>`,
        ar: `<h3>رؤية السعودية 2030: التحول الصناعي</h3>
             <p>يتطور السوق السعودي (تاسي) ليتجاوز النفط. المشاريع الكبرى مثل نيوم والقدية تخلق فرصاً هائلة في قطاعات الإنشاءات، التمويل، والسياحة.</p>
             <p>راقب البنوك مثل الراجحي والأهلي (SNB)، حيث أنها ركيزة أساسية في تمويل هذا التحول التاريخي.</p>`
    },
    'blog-7-content': {
        en: `<h3>Saudi Aramco: The Global Energy Giant</h3>
             <p>Saudi Aramco remains the most profitable company in history. With its pivot into hydrogen and renewed focus on natural gas, its long-term dividend yield remains attractive for conservative investors.</p>`,
        ar: `<h3>أرامكو السعودية: عملاق الطاقة العالمي</h3>
             <p>تظل أرامكو السعودية الشركة الأكثر ربحية في التاريخ. مع توجهها نحو الهيدروجين والتركيز المتجدد على الغاز الطبيعي، يظل عائد التوزيعات طويل الأجل جذاباً للمستثمرين المتحفظين.</p>`
    },
    'blog-8-content': {
        en: `<h3>The Psychological Edge in Trading</h3>
             <p>Trading is 10% strategy and 90% psychology. The ability to stay disciplined when a trade goes against you is what separates the winners from the losers.</p>
             <p>Avoid "revenge trading" and always stick to your pre-defined plan. Remember, the market doesn't care about your feelings.</p>`,
        ar: `<h3>التفوق النفسي في التداول</h3>
             <p>التداول عبارة عن 10% استراتيجية و 90% علم نفس. القدرة على البقاء منضبطاً عندما تسير الصفقة ضدك هي ما يفصل الرابحين عن الخاسرين.</p>
             <p>تجنب "تداول الانتقام" والتزم دائماً بخطتك المحددة مسبقاً. تذكر، السوق لا يهتم بمشاعرك.</p>`
    },
    'blog-9-content': {
        en: `<h3>Chart Patterns: The Language of the Market</h3>
             <p>Technical analysis is about reading the footprints of money. Patterns like Head and Shoulders or Cup and Handle occur because human behavior in markets is repetitive.</p>
             <p>Learn to identify these patterns along with volume confirmation to increase your win rate.</p>`,
        ar: `<h3>نماذج الشموع: لغة السوق</h3>
             <p>التحليل الفني هو قراءة آثار أقدام المال. تظهر نماذج مثل "الرأس والكتفين" أو "الكوب والعروة" لأن السلوك البشري في الأسواق متكرر.</p>
             <p>تعلم تحديد هذه النماذج مع تأكيد الحجم (Volume) لزيادة نسبة نجاحك.</p>`
    },
    'blog-10-content': {
        en: `<h3>Why Position Sizing is Everything</h3>
             <p>Most traders focus on "where to enter." Professional traders focus on "how much to risk." Proper position sizing ensures that no single trade can ruin your account.</p>
             <p>Use our tools to calculate your risk based on your account equity and stop loss distance.</p>`,
        ar: `<h3>لماذا حجم المركز هو كل شيء</h3>
             <p>يركز معظم المتداولين على "أين يتم الدخول". يركز المتداولون المحترفون على "كم سنخاطر". يضمن حجم المركز الصحيح عدم قدرة أي صفقة فردية على تدمير حسابك.</p>
             <p>استخدم أدواتنا لحساب مخاطرك بناءً على رأس مال حسابك ومسافة وقف الخسارة.</p>`
    },

    // ---- CALCULATION RESULTS & ERRORS ----
    'res-pos-size': { en: 'Position Size Results', ar: 'نتائج حجم المركز' },
    'res-units': { en: 'units', ar: 'وحدة' },
    'res-risk-amount': { en: 'Risk Amount', ar: 'مبلغ المخاطرة' },
    'res-pos-value': { en: 'Position Value', ar: 'قيمة المركز' },
    'res-stop-dist': { en: 'Stop Distance', ar: 'مسافة الوقف' },
    'res-risk-trade': { en: 'Risk/Trade', ar: 'المخاطرة/الصفقة' },

    'res-pl-results': { en: 'P/L Results', ar: 'نتائج الربح/الخسارة' },
    'res-return-pct': { en: 'Return %', ar: 'العائد %' },
    'res-entry-val': { en: 'Entry Value', ar: 'قيمة الدخول' },
    'res-exit-val': { en: 'Exit Value', ar: 'قيمة الخروج' },
    'res-direction': { en: 'Direction', ar: 'الاتجاه' },

    'res-cc-results': { en: 'Conversion Result', ar: 'نتيجة التحويل' },
    'res-from': { en: 'From', ar: 'من' },
    'res-to': { en: 'To', ar: 'إلى' },
    'res-rate': { en: 'Rate', ar: 'السعر' },
    'res-cc-note': { en: '* Rates are approximate and for reference only.', ar: '* الأسعار تقريبية وللعلم فقط.' },

    'res-ci-growth': { en: 'Growth Projection', ar: 'توقعات النمو' },
    'res-total-invested': { en: 'Total Invested', ar: 'إجمالي المستثمر' },
    'res-interest-earned': { en: 'Interest Earned', ar: 'الفائدة المكتسبة' },
    'res-growth': { en: 'Growth', ar: 'النمو' },
    'res-period': { en: 'Period', ar: 'المدة' },
    'res-years': { en: 'years', ar: 'سنوات' },

    'res-pip-results': { en: 'Pip Value Results', ar: 'نتائج قيمة النقطة' },
    'res-per-pip': { en: 'Per Pip', ar: 'للنقطة الواحدة' },
    'res-total-pips': { en: 'Total Pips', ar: 'إجمالي النقاط' },
    'res-lot-size': { en: 'Lot Size', ar: 'حجم اللوت' },
    'res-pair': { en: 'Pair', ar: 'الزوج' },

    'res-rr-analysis': { en: 'Risk/Reward Analysis', ar: 'تحليل المخاطرة/العائد' },
    'res-risk-sl': { en: 'Risk (SL)', ar: 'المخاطرة (وقف)' },
    'res-reward-tp': { en: 'Reward (TP)', ar: 'العائد (هدف)' },
    'res-quality': { en: 'Quality', ar: 'الجودة' },
    'res-win-rate-needed': { en: 'Win Rate Needed', ar: 'نسبة الفوز المطلوبة' },
    'res-rr-good': { en: 'Good', ar: 'جيد' },
    'res-rr-bad': { en: 'Below 2:1', ar: 'أقل من ٢:١' },
    'res-rr-msg-good': { en: 'This trade has a favorable risk/reward ratio. ✅', ar: 'هذه الصفقة لديها نسبة مخاطرة/عائد جيدة. ✅' },
    'res-rr-msg-bad': { en: 'Consider adjusting your levels for a minimum 2:1 ratio. ⚠️', ar: 'فكر في تعديل مستوياتك للحصول على نسبة ٢:١ كحد أدنى. ⚠️' },

    'error-all-fields': { en: 'Please fill in all fields.', ar: 'برجاء ملء جميع الحقول.' },
    'error-amount': { en: 'Please enter an amount.', ar: 'برجاء إدخال المبلغ.' },

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
    // Blog Metadata
    'blog-date-1': { en: '📅 Mar 8, 2026', ar: '📅 ٨ مارس ٢٠٢٦' },
    'blog-date-2': { en: '📅 Mar 6, 2026', ar: '📅 ٦ مارس ٢٠٢٦' },
    'blog-date-3': { en: '📅 Mar 3, 2026', ar: '📅 ٣ مارس ٢٠٢٦' },
    'blog-date-4': { en: '📅 Mar 7, 2026', ar: '📅 ٧ مارس ٢٠٢٦' },
    'blog-date-5': { en: '📅 Mar 1, 2026', ar: '📅 ١ مارس ٢٠٢٦' },
    'blog-date-6': { en: '📅 Mar 4, 2026', ar: '📅 ٤ مارس ٢٠٢٦' },
    'blog-date-7': { en: '📅 Feb 28, 2026', ar: '📅 ٢٨ فبراير ٢٠٢٦' },
    'blog-date-8': { en: '📅 Feb 25, 2026', ar: '📅 ٢٥ فبراير ٢٠٢٦' },
    'blog-date-9': { en: '📅 Feb 22, 2026', ar: '📅 ٢٢ فبراير ٢٠٢٦' },
    'blog-date-10': { en: '📅 Feb 20, 2026', ar: '📅 ٢٠ فبراير ٢٠٢٦' },
    'blog-read-5m': { en: '⏱ 5 min read', ar: '⏱ ٥ دقائق للقراءة' },
    'blog-read-6m': { en: '⏱ 6 min read', ar: '⏱ ٦ دقائق للقراءة' },
    'blog-read-7m': { en: '⏱ 7 min read', ar: '⏱ ٧ دقائق للقراءة' },
    'blog-read-8m': { en: '⏱ 8 min read', ar: '⏱ ٨ دقائق للقراءة' },
    'blog-read-9m': { en: '⏱ 9 min read', ar: '⏱ ٩ دقائق للقراءة' },
    'blog-read-10m': { en: '⏱ 10 min read', ar: '⏱ ١٠ دقائق للقراءة' },

    // ---- ABOUT PAGE ----
    'about-title': { en: 'Empowering Your <span class="text-gradient">Financial Future</span>', ar: 'تمكين <span class="text-gradient">مستقبلك المالي</span>' },
    'about-subtitle': { en: 'We build the tools that professionals use, and we give them to you for free.', ar: 'نحن نبني الأدوات التي يستخدمها المحترفون، ونقدمها لك مجاناً.' },
    'about-mission-title': { en: 'Our Mission', ar: 'مهمتنا' },

    'about-stat-assets': { en: 'Assets Tracked', ar: 'أصل يتم تتبعه' },
    'about-stat-data': { en: 'Live Data', ar: 'بيانات لحظية' },
    'about-stat-free': { en: 'Free to Use', ar: 'مجاني تماماً' },
    'about-stat-tools': { en: 'Expert Tools', ar: 'أداة خبيرة' },

    'value-transparency-title': { en: 'Transparency', ar: 'الشفافية' },
    'value-transparency-desc': { en: 'We believe in honest data. No hidden fees, no obscured metrics, just clear financial intelligence.', ar: 'نحن نؤمن بالبيانات الصادقة. لا توجد رسوم مخفية، ولا مقاييس غامضة، فقط معلومات مالية واضحة.' },
    'value-speed-title': { en: 'Speed', ar: 'السرعة' },
    'value-speed-desc': { en: 'In the markets, milliseconds matter. Our platform is optimized for the fastest data delivery possible.', ar: 'في الأسواق، الأجزاء من الثانية تهم. تم تحسين منصتنا لأسرع توصيل ممكن للبيانات.' },
    'value-reliability-title': { en: 'Reliability', ar: 'الموثوقية' },
    'value-reliability-desc': { en: 'Our infrastructure is built to handle high volatility and high traffic, ensuring you never miss a beat.', ar: 'بنيتنا التحتية مصممة للتعامل مع التقلبات العالية والضغط الكبير، مما يضمن عدم تفويت أي حركة.' },

    // ---- CONTACT PAGE ----
    'contact-title': { en: 'Get in <span class="text-gradient">Touch</span> ✉️', ar: 'تواصل <span class="text-gradient">معنا</span> ✉️' },
    'contact-subtitle': { en: 'Have questions? We\'re here to help you navigate the platform.', ar: 'لديك استفسارات؟ نحن هنا لمساعدتك في استخدام المنصة.' },
    'contact-email-label': { en: 'Email Us', ar: 'راسلنا' },
    'contact-social-label': { en: 'Social Media', ar: 'وسائل التواصل' },
    'contact-office-label': { en: 'Offices', ar: 'مكاتبنا' },
    'contact-form-name': { en: 'Full Name', ar: 'الاسم الكامل' },
    'contact-form-email': { en: 'Email Address', ar: 'البريد الإلكتروني' },
    'contact-form-subject': { en: 'Subject', ar: 'الموضوع' },
    'contact-form-message': { en: 'Message', ar: 'الرسالة' },
    'contact-form-submit': { en: 'Send Message →', ar: 'إرسال الرسالة ←' },

    // ---- PRIVACY & TERMS ----
    'privacy-title': { en: 'Privacy <span class="text-gradient">Policy</span> 🛡️', ar: 'سياسة <span class="text-gradient">الخصوصية</span> 🛡️' },
    'privacy-subtitle': { en: 'Your data is yours. Learn how we protect it.', ar: 'بياناتك ملك لك. تعرف على كيفية حمايتها.' },
    'terms-title': { en: 'Terms of <span class="text-gradient">Service</span> ⚖️', ar: 'شروط <span class="text-gradient">الخدمة</span> ⚖️' },
    'terms-subtitle': { en: 'The rules of the road for using LingoWise.', ar: 'قواعد الاستخدام لمنصة لينغو وايز.' },

    'market-crypto': { en: 'Crypto', ar: 'عملات رقمية' },
    'market-us-stocks': { en: 'US Stocks', ar: 'أسم أمريكية' },
    'market-saudi': { en: 'Saudi', ar: 'سوق سعودي' },
    'market-forex': { en: 'Forex', ar: 'فوركس' },

    // ---- PRICE ALERTS PAGE ----
    'alerts-badge': { en: '🔔 Smart Price Alerts', ar: '🔔 تنبيهات الأسعار الذكية' },
    'alerts-title': { en: 'Never Miss a <span class="text-gradient">Market Move</span>', ar: 'لا تفوّت أي <span class="text-gradient">تحرك للسوق</span>' },
    'alerts-subtitle': { en: 'Set custom price alerts for any asset. Get notified the moment markets reach your target price.', ar: 'اضبط تنبيهات أسعار مخصصة لأي أصل. احصل على إشعار فور وصول السوق إلى سعرك المستهدف.' },
    'alerts-stat-active': { en: 'Active Alerts', ar: 'تنبيهات نشطة' },
    'alerts-stat-triggered': { en: 'Triggered Today', ar: 'تفعّلت اليوم' },
    'alerts-stat-above': { en: 'Above Target', ar: 'فوق الهدف' },
    'alerts-form-title': { en: '➕ Create New Alert', ar: '➕ إنشاء تنبيه جديد' },
    'alerts-form-symbol': { en: 'Asset Symbol / Name', ar: 'رمز الأصل / الاسم' },
    'alerts-form-symbol-ph': { en: 'e.g. BTC, AAPL, EURUSD', ar: 'مثال: BTC، AAPL، EURUSD' },
    'alerts-form-market': { en: 'Market', ar: 'السوق' },
    'alerts-form-direction': { en: 'Alert Direction', ar: 'اتجاه التنبيه' },
    'alerts-form-above': { en: '📈 Price Above', ar: '📈 السعر فوق' },
    'alerts-form-below': { en: '📉 Price Below', ar: '📉 السعر دون' },
    'alerts-form-target': { en: 'Target Price ($)', ar: 'السعر المستهدف ($)' },
    'alerts-form-note': { en: 'Note (optional)', ar: 'ملاحظة (اختياري)' },
    'alerts-form-note-ph': { en: 'e.g. Resistance level break', ar: 'مثال: كسر مستوى المقاومة' },
    'alerts-form-submit': { en: '🔔 Set Alert', ar: '🔔 ضبط التنبيه' },
    'alerts-presets': { en: '⚡ Quick Presets', ar: '⚡ إعدادات سريعة' },
    'alerts-your-alerts': { en: 'Your Alerts', ar: 'تنبيهاتك' },
    'alerts-clear-all': { en: '🗑️ Clear All', ar: '🗑️ مسح الكل' },
    'alerts-empty': { en: 'No alerts set yet. Create your first price alert to get started.', ar: 'لا توجد تنبيهات بعد. أنشئ أول تنبيه سعر للبدء.' },
    'alerts-status-watching': { en: '⏳ Watching', ar: '⏳ جاري المتابعة' },
    'alerts-status-triggered': { en: '⚡ Triggered', ar: '⚡ تفعّل' },

    // ---- SETTINGS PAGE ----
    'settings-title': { en: 'Settings', ar: 'الإعدادات' },
    'settings-back': { en: '← Back to Dashboard', ar: '→ العودة للوحة' },
    'settings-nav-profile': { en: 'Profile', ar: 'الملف الشخصي' },
    'settings-nav-prefs': { en: 'Preferences', ar: 'التفضيلات' },
    'settings-nav-notifs': { en: 'Notifications', ar: 'الإشعارات' },
    'settings-nav-security': { en: 'Security', ar: 'الأمان' },
    'settings-nav-data': { en: 'My Data', ar: 'بياناتي' },
    'settings-nav-danger': { en: 'Danger Zone', ar: 'منطقة الخطر' },
    'settings-profile-title': { en: '👤 Profile Information', ar: '👤 معلومات الملف الشخصي' },
    'settings-first-name': { en: 'First Name', ar: 'الاسم الأول' },
    'settings-last-name': { en: 'Last Name', ar: 'اسم العائلة' },
    'settings-email': { en: 'Email Address', ar: 'البريد الإلكتروني' },
    'settings-experience': { en: 'Trading Experience', ar: 'خبرة التداول' },
    'settings-exp-beginner': { en: 'Beginner (Less than 1 year)', ar: 'مبتدئ (أقل من سنة)' },
    'settings-exp-intermediate': { en: 'Intermediate (1–3 years)', ar: 'متوسط (1–3 سنوات)' },
    'settings-exp-advanced': { en: 'Advanced (3–7 years)', ar: 'متقدم (3–7 سنوات)' },
    'settings-exp-expert': { en: 'Expert (7+ years)', ar: 'خبير (أكثر من 7 سنوات)' },
    'settings-bio': { en: 'Bio / Trading Style', ar: 'نبذة / أسلوب التداول' },
    'settings-save': { en: '💾 Save Profile', ar: '💾 حفظ الملف' },
    'settings-currency': { en: '💰 Default Currency', ar: '💰 العملة الافتراضية' },
    'settings-currency-desc': { en: 'Portfolio values will be displayed in this currency.', ar: 'ستُعرض قيم المحفظة بهذه العملة.' },
    'settings-notif-title': { en: '🔔 Notification Settings', ar: '🔔 إعدادات الإشعارات' },
    'settings-notif-price': { en: 'Price Alert Notifications', ar: 'إشعارات تنبيهات الأسعار' },
    'settings-notif-price-desc': { en: 'Get notified when your price alerts trigger', ar: 'احصل على إشعار عند تفعّل تنبيهات الأسعار' },
    'settings-notif-portfolio': { en: 'Portfolio Performance Summary', ar: 'ملخص أداء المحفظة' },
    'settings-notif-portfolio-desc': { en: 'Daily digest of your portfolio\'s performance', ar: 'ملخص يومي لأداء محفظتك' },
    'settings-notif-market': { en: 'Market Open / Close Alerts', ar: 'تنبيهات فتح/إغلاق السوق' },
    'settings-notif-market-desc': { en: 'Alerts at NYSE, LSE, and Tadawul market open/close', ar: 'تنبيهات عند فتح وإغلاق بورصات NYSE وLSE وتداول' },
    'settings-notif-blog': { en: 'New Blog & Market Insights', ar: 'مقالات ورؤى السوق الجديدة' },
    'settings-notif-blog-desc': { en: 'Get notified when we publish new expert analysis', ar: 'اعلم حين ننشر تحليلات خبراء جديدة' },
    'settings-notif-updates': { en: 'Product Updates', ar: 'تحديثات المنصة' },
    'settings-notif-updates-desc': { en: 'New features, tools, and platform improvements', ar: 'ميزات وأدوات وتحسينات جديدة للمنصة' },
    'settings-pw-title': { en: '🔐 Change Password', ar: '🔐 تغيير كلمة المرور' },
    'settings-pw-current': { en: 'Current Password', ar: 'كلمة المرور الحالية' },
    'settings-pw-new': { en: 'New Password', ar: 'كلمة المرور الجديدة' },
    'settings-pw-confirm': { en: 'Confirm New Password', ar: 'تأكيد كلمة المرور الجديدة' },
    'settings-pw-save': { en: '🔐 Update Password', ar: '🔐 تحديث كلمة المرور' },
    'settings-stats-title': { en: '📊 My Stats', ar: '📊 إحصائياتي' },
    'settings-export-title': { en: '📥 Data Export', ar: '📥 تصدير البيانات' },
    'settings-export-desc': { en: 'Download all your LingoWise progress data.', ar: 'حمّل جميع بيانات تقدمك من لينغو وايز.' },
    'settings-export-portfolio': { en: '📊 Export Portfolio', ar: '📊 تصدير المحفظة' },
    'settings-export-journal': { en: '📓 Export Journal', ar: '📓 تصدير السجل' },
    'settings-export-alerts': { en: '🔔 Export Alerts', ar: '🔔 تصدير التنبيهات' },
    'settings-danger-title': { en: '⚠️ Danger Zone', ar: '⚠️ منطقة الخطر' },
    'settings-clear-portfolio': { en: 'Clear Portfolio', ar: 'مسح المحفظة' },
    'settings-clear-portfolio-desc': { en: 'Remove all holdings from your portfolio. This cannot be undone.', ar: 'إزالة جميع الأصول من محفظتك. لا يمكن التراجع.' },
    'settings-clear-alerts': { en: 'Clear Alerts', ar: 'مسح التنبيهات' },
    'settings-delete-account': { en: 'Delete Account', ar: 'حذف الحساب' },
    'settings-delete-account-desc': { en: 'Permanently delete your account and all associated data.', ar: 'حذف حسابك وجميع بياناتك المرتبطة به نهائياً.' },

    // ---- AI ASSISTANT ----
    'ai-name': { en: 'LingoWise AI', ar: 'مساعد لينغو وايز' },
    'ai-status': { en: '● Online · Language Tutor', ar: '● متصل · معلم لغة' },
    'ai-greeting': { en: "👋 Hi! I'm your <strong>LingoWise AI Tutor</strong>. Ask me about grammar, vocabulary, or how to use LingoWise features!", ar: '👋 مرحباً! أنا <strong>معلمك الذكي</strong>. اسألني عن القواعد، المفردات، أو كيفية استخدام ميزات لينغو وايز!' },
    'ai-placeholder': { en: 'Ask anything about English...', ar: 'اسأل أي شيء عن الإنجليزية...' },
    'ai-quick-grammar': { en: '📝 Grammar Check', ar: '📝 فحص القواعد' },
    'ai-quick-tip': { en: '💡 Study Tip', ar: '💡 نصيحة دراسية' },
    'ai-quick-speak': { en: '🎙️ Speak Practice', ar: '🎙️ ممارسة التحدث' },
    'ai-quick-exam': { en: '🎓 Exam Prep', ar: '🎓 تحضير الاختبار' },

    // ---- ECONOMIC CALENDAR ----
    'econ-cal-title': { en: '📅 Economic Calendar', ar: '📅 التقويم الاقتصادي' },
    'econ-cal-subtitle': { en: "Today's key events", ar: 'أهم أحداث اليوم' },
    'econ-impact-high': { en: 'High', ar: 'عالي' },
    'econ-impact-medium': { en: 'Medium', ar: 'متوسط' },
    'econ-impact-low': { en: 'Low', ar: 'منخفض' },

    // ---- DASHBOARD ADDITIONS ----
    'sidebar-alerts': { en: 'Price Alerts', ar: 'تنبيهات الأسعار' },

    // ---- SPEAKING LAB ----
    'speaking-hero-sub': { en: 'Improve your fluency and pronunciation with real-time AI feedback.', ar: 'حسن طلاقتك ونطقك مع تقييم فوري من الذكاء الاصطناعي.' },
    'speaking-topics': { en: 'Practice Topics', ar: 'مواضيع الممارسة' },
    'topic-1-title': { en: 'Job Interview Preparation', ar: 'التحضير لمقابلة عمل' },
    'topic-1-desc': { en: 'Practice answering common career questions.', ar: 'تدرب على الإجابة على أسئلة العمل الشائعة.' },
    'topic-2-title': { en: 'Ordering Food at a Restaurant', ar: 'طلب الطعام في المطعم' },
    'topic-2-desc': { en: 'Master social interactions in dining.', ar: 'أتقن التعاملات الاجتماعية في المطاعم.' },
    'topic-3-title': { en: 'Travel & Directions', ar: 'السفر والاتجاهات' },
    'topic-3-desc': { en: 'Essential phrases for your next trip.', ar: 'عبارات أساسية لرحلتك القادمة.' },
    'topic-4-title': { en: 'Daily Conversation', ar: 'محادثات يومية' },
    'topic-4-desc': { en: 'Casual talk with friends and colleagues.', ar: 'حديث غير رسمي مع الأصدقاء والزملاء.' },
    'speaking-ready': { en: 'Ready to practice? Click the button.', ar: 'مستعد للممارسة؟ اضغط على الزر.' },
    'speaking-transcript-hint': { en: 'Your speech will appear here...', ar: 'سيظهر كلامك هنا...' },
    'speaking-hold': { en: 'Hold button to speak', ar: 'استمر في الضغط للتحدث' },
    'speaking-live-feedback': { en: 'Live Feedback', ar: 'تقييم فوري' },
    'speaking-initial-tip': { en: 'Select a topic and start speaking to get personalized tips!', ar: 'اختر موضوعاً وابدأ التحدث للحصول على نصائح مخصصة!' },
    'filter-strategy': { en: 'Fluency', ar: 'الطلاقة' },
    'sidebar-grammar': { en: 'Grammar Accuracy', ar: 'دقة القواعد' },

    // ---- SPEAKING LAB SIMULATION ----
    'speaking-listening': { en: 'Listening...', ar: 'جاري الاستماع...' },
    'speaking-analyzing': { en: 'Analyzing...', ar: 'جاري التحليل...' },
    'speaking-complete': { en: 'Analysis Complete!', ar: 'اكتمل التحليل!' },
    'speaking-phrase-1': { en: 'I am highly interested in the marketing manager position at your company.', ar: 'أنا مهتم جداً بمنصب مدير التسويق في شركتكم.' },
    'speaking-phrase-2': { en: 'Would you like to try the specialty pasta with our homemade white sauce?', ar: 'هل ترغب في تجربة الباستا مع صوص الكريمة الخاص بنا؟' },
    'speaking-phrase-3': { en: 'Excuse me, could you tell me the fastest way to get to the main square?', ar: 'معذرة، هل يمكنك إخباري بأسرع طريق للوصول إلى الميدان الرئيسي؟' },
    'speaking-tip-1': { en: "Focus on the 'th' sound in 'the' and 'thirsty'.", ar: "ركز على نطق حرف الـ 'ث' بشكل أوضح." },
    'speaking-tip-2': { en: 'Try to reduce the pauses between words to improve your flow.', ar: 'حاول تقليل الوقفات بين الكلمات لتحسين الطلاقة.' },
    'speaking-tip-3': { en: 'Excellent grammar! Try to use more complex sentence structures.', ar: 'قواعد ممتازة! حاول استخدام هياكل جمل أكثر تعقيداً.' },
};

function initLanguage() {
    const saved = localStorage.getItem('calcwise_lang') || 'en';
    applyLanguage(saved);
}

function applyLanguage(newLang) {
    lang = newLang; // Update global
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

    // Update AI Assistant if initialized
    updateAIAssistant();
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
async function initTicker() {
    const track = document.getElementById('tickerTrack');
    if (!track) return;

    let tickerData = [
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
        { symbol: 'TASI', price: '12,450', change: '+0.34%', up: true }
    ];

    try {
        const response = await fetch('/api/market/prices');
        const data = await response.json();

        if (data && data.prices) {
            tickerData = Object.entries(data.prices).map(([symbol, price]) => ({
                symbol: symbol.toUpperCase(),
                price: typeof price === 'number' ? `$${price.toLocaleString()}` : price,
                change: (Math.random() * 4 - 1.5).toFixed(2) + '%',
                up: Math.random() > 0.3
            }));
        }
    } catch (error) {
        console.error('Ticker fetch error:', error);
    }

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
    const isLoggedIn = localStorage.getItem('calcwise_logged_in') === 'true';
    const user = JSON.parse(localStorage.getItem('calcwise_user') || 'null');
    const lang = localStorage.getItem('calcwise_lang') || 'en';
    const href = window.location.href;

    // Guard: protect dashboard and journal — redirect to login if not authenticated
    const isPrivatePage = href.includes('dashboard.html') || href.includes('journal.html');
    if (isPrivatePage && !isLoggedIn) {
        window.location.replace('login.html');
        return;
    }

    // Update Header UI for all pages (swap Log In / Sign Up with Dashboard / Log Out)
    const navActions = document.querySelector('.nav-actions');
    if (navActions && isLoggedIn) {
        if (navActions.querySelector('[data-i18n="nav-login"]')) {
            const dashText = lang === 'ar' ? 'لوحة التحكم' : 'Dashboard';
            const logoutText = translations['dash-logout'][lang] || 'Log Out';
            navActions.innerHTML = `
                <div class="toggle-pill lang-toggle" title="Toggle language">
                    <span class="toggle-option ${lang === 'en' ? 'active' : ''}" data-value="en" onclick="toggleLanguage('en')">EN</span>
                    <span class="toggle-option ${lang === 'ar' ? 'active' : ''}" data-value="ar" onclick="toggleLanguage('ar')">عر</span>
                </div>
                <a href="dashboard.html" class="btn btn-ghost btn-sm">${dashText}</a>
                <button class="btn btn-primary btn-sm" onclick="handleLogout()">${logoutText}</button>
            `;
        }
    }

    // Update greeting on dashboard
    const dashboardUser = document.getElementById('dashboardUser');
    if (dashboardUser && user) {
        const hiText = translations['dash-hi'][lang] || 'Hi';
        dashboardUser.textContent = `${hiText}, ${user.firstName} 👋`;
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const lang = localStorage.getItem('calcwise_lang') || 'en';
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        showToast('error', 'Please fill in all fields.');
        return;
    }

    try {
        const response = await secureFetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem('calcwise_logged_in', 'true');
            localStorage.setItem('calcwise_user', JSON.stringify(data.user));
            // Store the JWT token for secure API calls
            if (data.session) {
                localStorage.setItem('calcwise_token', data.session.access_token);
            }
            showToast('success', translations['auth-login-success'][lang] || 'Login successful!');
            setTimeout(() => window.location.href = 'dashboard.html', 1500);
        } else {
            // Fallback for demo if user not found in mock DB
            localStorage.setItem('calcwise_logged_in', 'true');
            localStorage.setItem('calcwise_user', JSON.stringify({ firstName: 'User', email }));
            showToast('success', translations['auth-login-success'][lang] || 'Login successful!');
            setTimeout(() => window.location.href = 'dashboard.html', 1500);
        }
    } catch (error) {
        console.error('Login error:', error);
        // Fallback
        localStorage.setItem('calcwise_logged_in', 'true');
        showToast('success', 'Demo login successful! (API failed)');
        setTimeout(() => window.location.href = 'dashboard.html', 1500);
    }
}

async function handleSignup(e) {
    e.preventDefault();
    const lang = localStorage.getItem('calcwise_lang') || 'en';
    const firstName = document.getElementById('signup-first').value;
    const lastName = document.getElementById('signup-last').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;

    if (password !== confirm) {
        showToast('error', translations['auth-error-password'][lang]);
        return;
    }

    try {
        const response = await secureFetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ firstName, lastName, email, password })
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem('calcwise_logged_in', 'true');
            localStorage.setItem('calcwise_user', JSON.stringify(data.user));
            if (data.session) {
                localStorage.setItem('calcwise_token', data.session.access_token);
            }
            showToast('success', `Welcome, ${firstName}! Redirecting...`);
            setTimeout(() => window.location.href = 'dashboard.html', 1500);
        } else {
            showToast('error', data.message || 'Signup failed.');
        }
    } catch (error) {
        console.error('Signup error:', error);
        // Fallback for demo
        const user = { firstName, lastName, email };
        localStorage.setItem('calcwise_user', JSON.stringify(user));
        localStorage.setItem('calcwise_logged_in', 'true');
        showToast('success', `Welcome, ${firstName}! (Local Mode)`);
        setTimeout(() => window.location.href = 'dashboard.html', 1500);
    }
}

function handleLogout() {
    localStorage.removeItem('calcwise_logged_in');
    localStorage.removeItem('calcwise_token');
    localStorage.removeItem('calcwise_user');
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
    const lang = localStorage.getItem('calcwise_lang') || 'en';
    const balance = parseFloat(document.getElementById('ps-balance').value);
    const riskPct = parseFloat(document.getElementById('ps-risk').value);
    const entry = parseFloat(document.getElementById('ps-entry').value);
    const stopLoss = parseFloat(document.getElementById('ps-stoploss').value);

    if (!balance || !riskPct || !entry || !stopLoss) {
        showToast('error', translations['error-all-fields'][lang]);
        return;
    }

    const riskAmount = balance * (riskPct / 100);
    const priceDiff = Math.abs(entry - stopLoss);
    const positionSize = riskAmount / priceDiff;
    const positionValue = positionSize * entry;

    document.getElementById('ps-result').innerHTML = `
    <h4>📐 ${translations['res-pos-size'][lang]}</h4>
    <div class="result-value text-gradient">${positionSize.toFixed(6)} ${translations['res-units'][lang]}</div>
    <div class="result-breakdown">
      <div class="result-item"><div class="label">${translations['res-risk-amount'][lang]}</div><div class="value text-danger">$${riskAmount.toFixed(2)}</div></div>
      <div class="result-item"><div class="label">${translations['res-pos-value'][lang]}</div><div class="value">$${positionValue.toFixed(2)}</div></div>
      <div class="result-item"><div class="label">${translations['res-stop-dist'][lang]}</div><div class="value">${priceDiff.toFixed(2)}</div></div>
      <div class="result-item"><div class="label">${translations['res-risk-trade'][lang]}</div><div class="value">${riskPct}%</div></div>
    </div>
  `;
}

function calculateProfitLoss() {
    const lang = localStorage.getItem('calcwise_lang') || 'en';
    const entry = parseFloat(document.getElementById('pl-entry').value);
    const exit = parseFloat(document.getElementById('pl-exit').value);
    const qty = parseFloat(document.getElementById('pl-qty').value);
    const direction = document.getElementById('pl-direction').value;

    if (!entry || !exit || !qty) {
        showToast('error', translations['error-all-fields'][lang]);
        return;
    }

    let pnl = direction === 'long' ? (exit - entry) * qty : (entry - exit) * qty;
    let pnlPct = direction === 'long' ? ((exit - entry) / entry) * 100 : ((entry - exit) / entry) * 100;
    const isProfit = pnl >= 0;

    document.getElementById('pl-result').innerHTML = `
    <h4>💰 ${translations['res-pl-results'][lang]}</h4>
    <div class="result-value ${isProfit ? 'text-success' : 'text-danger'}">${isProfit ? '+' : ''}$${pnl.toFixed(2)}</div>
    <div class="result-breakdown">
      <div class="result-item"><div class="label">${translations['res-return-pct'][lang]}</div><div class="value ${isProfit ? 'text-success' : 'text-danger'}">${isProfit ? '+' : ''}${pnlPct.toFixed(2)}%</div></div>
      <div class="result-item"><div class="label">${translations['res-entry-val'][lang]}</div><div class="value">$${(entry * qty).toFixed(2)}</div></div>
      <div class="result-item"><div class="label">${translations['res-exit-val'][lang]}</div><div class="value">$${(exit * qty).toFixed(2)}</div></div>
      <div class="result-item"><div class="label">${translations['res-direction'][lang]}</div><div class="value">${direction === 'long' ? '📈 ' + translations['option-long'][lang] : '📉 ' + translations['option-short'][lang]}</div></div>
    </div>
  `;
}

function convertCurrency() {
    const lang = localStorage.getItem('calcwise_lang') || 'en';
    const amount = parseFloat(document.getElementById('cc-amount').value);
    const from = document.getElementById('cc-from').value;
    const to = document.getElementById('cc-to').value;

    if (!amount) {
        showToast('error', translations['error-amount'][lang]);
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
    <h4>🔄 ${translations['res-cc-results'][lang]}</h4>
    <div class="result-value text-gold">${result.toFixed(2)} ${to}</div>
    <div class="result-breakdown">
      <div class="result-item"><div class="label">${translations['res-from'][lang]}</div><div class="value">${amount.toFixed(2)} ${from}</div></div>
      <div class="result-item"><div class="label">${translations['res-to'][lang]}</div><div class="value">${result.toFixed(2)} ${to}</div></div>
      <div class="result-item"><div class="label">${translations['res-rate'][lang]}</div><div class="value">1 ${from} = ${(rates[to] / rates[from]).toFixed(4)} ${to}</div></div>
    </div>
    <p style="margin-top:var(--space-md);font-size:0.78rem;color:var(--text-muted);">${translations['res-cc-note'][lang]}</p>
  `;
}

function calculateCompound() {
    const lang = localStorage.getItem('calcwise_lang') || 'en';
    const principal = parseFloat(document.getElementById('ci-principal').value);
    const monthly = parseFloat(document.getElementById('ci-monthly').value);
    const rate = parseFloat(document.getElementById('ci-rate').value) / 100;
    const years = parseInt(document.getElementById('ci-years').value);

    if (!principal || !years) {
        showToast('error', translations['error-all-fields'][lang]);
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
    <h4>📊 ${translations['res-ci-growth'][lang]}</h4>
    <div class="result-value text-gradient">$${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
    <div class="result-breakdown">
      <div class="result-item"><div class="label">${translations['res-total-invested'][lang]}</div><div class="value">$${totalContributions.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div></div>
      <div class="result-item"><div class="label">${translations['res-interest-earned'][lang]}</div><div class="value text-success">$${interestEarned.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div></div>
      <div class="result-item"><div class="label">${translations['res-growth'][lang]}</div><div class="value text-success">${((total / totalContributions - 1) * 100).toFixed(1)}%</div></div>
      <div class="result-item"><div class="label">${translations['res-period'][lang]}</div><div class="value">${years} ${translations['res-years'][lang]}</div></div>
    </div>
  `;
}

function calculatePip() {
    const lang = localStorage.getItem('calcwise_lang') || 'en';
    const pair = document.getElementById('pip-pair').value;
    const lotSize = parseInt(document.getElementById('pip-lot').value);
    const pips = parseFloat(document.getElementById('pip-pips').value);

    const jpyPairs = ['USDJPY'];
    const pipSize = jpyPairs.includes(pair) ? 0.01 : 0.0001;
    const pipValue = (pipSize * lotSize);
    const totalValue = pipValue * pips;

    document.getElementById('pip-result').innerHTML = `
    <h4>📏 ${translations['res-pip-results'][lang]}</h4>
    <div class="result-value text-teal">$${totalValue.toFixed(2)}</div>
    <div class="result-breakdown">
      <div class="result-item"><div class="label">${translations['res-per-pip'][lang]}</div><div class="value">$${pipValue.toFixed(2)}</div></div>
      <div class="result-item"><div class="label">${translations['res-total-pips'][lang]}</div><div class="value">${pips}</div></div>
      <div class="result-item"><div class="label">${translations['res-lot-size'][lang]}</div><div class="value">${lotSize.toLocaleString()}</div></div>
      <div class="result-item"><div class="label">${translations['res-pair'][lang]}</div><div class="value">${pair}</div></div>
    </div>
  `;
}

function calculateRiskReward() {
    const lang = localStorage.getItem('calcwise_lang') || 'en';
    const entry = parseFloat(document.getElementById('rr-entry').value);
    const stoploss = parseFloat(document.getElementById('rr-stoploss').value);
    const takeprofit = parseFloat(document.getElementById('rr-takeprofit').value);

    if (!entry || !stoploss || !takeprofit) {
        showToast('error', translations['error-all-fields'][lang]);
        return;
    }

    const risk = Math.abs(entry - stoploss);
    const reward = Math.abs(takeprofit - entry);
    const ratio = reward / risk;
    const isGood = ratio >= 2;

    document.getElementById('rr-result').innerHTML = `
    <h4>⚖️ ${translations['res-rr-analysis'][lang]}</h4>
    <div class="result-value" style="color:${isGood ? 'var(--success)' : 'var(--warning)'};">1 : ${ratio.toFixed(2)}</div>
    <div class="result-breakdown">
      <div class="result-item"><div class="label">${translations['res-risk-sl'][lang]}</div><div class="value text-danger">${risk.toFixed(2)}</div></div>
      <div class="result-item"><div class="label">${translations['res-reward-tp'][lang]}</div><div class="value text-success">${reward.toFixed(2)}</div></div>
      <div class="result-item"><div class="label">${translations['res-quality'][lang]}</div><div class="value" style="color:${isGood ? 'var(--success)' : 'var(--warning)'};">${isGood ? '✅ ' + translations['res-rr-good'][lang] : '⚠️ ' + translations['res-rr-bad'][lang]}</div></div>
      <div class="result-item"><div class="label">${translations['res-win-rate-needed'][lang]}</div><div class="value">${(100 / (1 + ratio)).toFixed(1)}%</div></div>
    </div>
    <p style="margin-top:var(--space-md);font-size:0.82rem;color:var(--text-muted);">
      ${isGood ? translations['res-rr-msg-good'][lang] : translations['res-rr-msg-bad'][lang]}
    </p>
  `;
}

// ===== DASHBOARD =====
async function initDashboard() {
    const lang = localStorage.getItem('calcwise_lang') || 'en';
    const activeCoursesContainer = document.getElementById('activeCoursesContainer');
    if (!activeCoursesContainer) return;

    try {
        const user = JSON.parse(localStorage.getItem('calcwise_user') || '{}');
        const userEl = document.getElementById('dashboardUser');
        const nameEl = document.getElementById('userName');
        const firstName = user.firstName || (lang === 'ar' ? 'أيها المتعلّم' : 'Learner');
        
        if (userEl) userEl.innerText = `${lang === 'ar' ? 'مرحباً' : 'Hi'}, ${firstName} 👋`;
        if (nameEl) nameEl.innerText = firstName;

        // Statistics initialization (simulated)
        if (document.getElementById('learningTime')) document.getElementById('learningTime').innerText = lang === 'ar' ? '١٢.٥ ساعة' : "12.5 hrs";
        if (document.getElementById('coursesDone')) document.getElementById('coursesDone').innerText = lang === 'ar' ? '٣' : "3";
        if (document.getElementById('vocabMastery')) document.getElementById('vocabMastery').innerText = (localStorage.getItem('lingowise_vocab_count') || (lang === 'ar' ? "٤٥٠" : "450"));
        if (document.getElementById('speakingScore')) document.getElementById('speakingScore').innerText = lang === 'ar' ? '٨٢٪' : "82%";

        // Populate Courses
        updateCoursesUI();
        
        // Populate Daily Goals
        initDailyGoals();

        // Populate Vocabulary
        updateVocabUI();

    } catch (e) {
        console.error("Dashboard init error:", e);
    }
}

function updateCoursesUI() {
    const container = document.getElementById('activeCoursesContainer');
    if (!container) return;
    const lang = localStorage.getItem('calcwise_lang') || 'en';

    const activeCourses = [
        { 
            name: lang === 'ar' ? 'إتقان قواعد المستوى المتوسط' : 'Intermediate Grammar Mastery', 
            progress: 65, 
            color: 'var(--primary)' 
        },
        { 
            name: lang === 'ar' ? 'أساسيات الكتابة للأعمال' : 'Business Writing Essentials', 
            progress: 42, 
            color: 'var(--accent-teal)' 
        }
    ];

    container.innerHTML = activeCourses.map(course => `
        <div class="course-progress-item">
            <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-xs);">
                <span style="font-weight:600; font-size:0.9rem;">${course.name}</span>
                <span style="color:${course.color}; font-weight:700; font-size:0.85rem;">${course.progress}%</span>
            </div>
            <div style="height:8px; background:var(--bg-secondary); border-radius:4px; overflow:hidden;">
                <div style="width:${course.progress}%; height:100%; background:${course.color}; transition: width 0.3s ease;"></div>
            </div>
        </div>
    `).join('');
}

async function initDailyGoals() {
    const container = document.getElementById('dailyGoalsContainer');
    if (!container) return;
    const lang = localStorage.getItem('calcwise_lang') || 'en';

    const goals = [
        { 
            title: lang === 'ar' ? 'مفردات جديدة' : 'New Vocabulary', 
            progress: '10/10', 
            done: true, 
            icon: '✓', 
            color: 'var(--success)',
            status: lang === 'ar' ? 'مكتمل!' : 'Completed!'
        },
        { 
            title: lang === 'ar' ? 'ممارسة التحدث' : 'Speaking Practice', 
            progress: lang === 'ar' ? '٥/١٥ دقيقة' : '5/15 min', 
            done: false, 
            icon: '🎙️', 
            color: 'var(--primary)',
            status: lang === 'ar' ? 'قيد التنفيذ' : 'In progress'
        },
        { 
            title: lang === 'ar' ? 'اختبار قواعد' : 'Grammar Quiz', 
            progress: '0/1', 
            done: false, 
            icon: '📝', 
            color: 'var(--accent-gold)',
            status: lang === 'ar' ? 'قيد التنفيذ' : 'In progress'
        }
    ];

    container.innerHTML = goals.map(goal => `
        <div style="display:flex; align-items:center; gap:var(--space-md);">
            <div style="width:40px; height:40px; border-radius:50%; border:3px solid ${goal.color}; display:flex; align-items:center; justify-content:center; color:${goal.color}; font-weight:800; font-size:0.8rem;">
                ${goal.icon}
            </div>
            <div style="flex:1;">
                <div style="font-weight:600; font-size:0.9rem;">${goal.title} (${goal.progress})</div>
                <div style="font-size:0.75rem; color:var(--text-muted);">${goal.status}</div>
            </div>
        </div>
    `).join('');
}

function updateVocabUI() {
    const container = document.getElementById('recentVocabContainer');
    if (!container) return;

    const defaults = [
        { word: 'Resilience', translation: 'المرونة' },
        { word: 'Ambiguous', translation: 'غامض' },
        { word: 'Innovation', translation: 'ابتكار' },
        { word: 'Proactive', translation: 'مبادر' }
    ];

    const vocabList = JSON.parse(localStorage.getItem('lingowise_vocab') || '[]');
    const displayList = vocabList.length > 0 ? vocabList.slice(0, 4) : defaults;

    container.innerHTML = displayList.map(v => `
        <div class="vocab-card-mini card text-center p-1" style="background:var(--bg-secondary); border:1px solid var(--border-subtle); transition:all 0.2s ease;">
            <div style="font-weight:700; font-size:1rem; color:var(--text-primary);">${v.word}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${v.translation}</div>
        </div>
    `).join('');
}

function addVocabulary(event) {
    event.preventDefault();
    const word = document.getElementById('vocab-word').value;
    const translation = document.getElementById('vocab-translation').value;
    const category = document.getElementById('vocab-category').value;

    if (!word || !translation) return;

    const vocabList = JSON.parse(localStorage.getItem('lingowise_vocab') || '[]');
    vocabList.unshift({ word, translation, category, date: new Date().toISOString() });
    localStorage.setItem('lingowise_vocab', JSON.stringify(vocabList));

    const currentCount = parseInt(localStorage.getItem('lingowise_vocab_count') || "450");
    localStorage.setItem('lingowise_vocab_count', currentCount + 1);

    showToast('success', `"${word}" added to your vocabulary bank! 🔤`);
    closeModal('addWordModal');
    
    // Refresh dashboard if on dashboard
    const vocabEl = document.getElementById('vocabMastery');
    if (vocabEl) vocabEl.innerText = (currentCount + 1);
    
    updateVocabUI();
    
    event.target.reset();
}

async function initWatchlist() {
    const container = document.getElementById('watchlistContainer');
    if (!container) return;

    try {
        const response = await fetch('/api/market/watchlist');
        if (!response.ok) throw new Error('API failed');
        const data = await response.json();
        renderWatchlistItems(data.watchlist, container);
    } catch (error) {
        console.warn('Watchlist API failed, using local storage.');
        const localWatchlist = JSON.parse(localStorage.getItem('calcwise_watchlist')) || [
            { name: 'Bitcoin', symbol: 'BTC', icon: '₿', bg: 'rgba(240,185,11,0.15)', price: '101,234', change: '+2.4%' },
            { name: 'Apple Inc.', symbol: 'AAPL', icon: '🏛', bg: 'rgba(108,92,231,0.15)', price: '245.67', change: '-0.8%' },
            { name: 'Saudi Aramco', symbol: '2222', icon: '🇸🇦', bg: 'rgba(0,184,148,0.15)', price: '32.10', change: '+1.2%' },
            { name: 'EUR/USD', symbol: 'Forex', icon: '💱', bg: 'rgba(0,210,211,0.15)', price: '1.0845', change: '+0.15%' }
        ];
        renderWatchlistItems(localWatchlist, container);
    }
}


function renderAssetIcon(icon, name, color = '#6C5CE7') {
    if (!icon) return `<span class="asset-icon" style="background:${color}22;color:${color}">💰</span>`;
    
    // Check if icon is a URL
    if (icon.startsWith('http') || icon.startsWith('/') || icon.includes('.')) {
        return `
            <span class="asset-icon" style="background:${color}22; overflow:hidden;">
                <img src="${icon}" 
                     style="width:100%;height:100%;object-fit:contain;padding:2px;" 
                     alt="${name}" 
                     onerror="this.parentElement.innerHTML='${name ? name[0] : '💰'}'">
            </span>
        `;
    }
    
    // Default to emoji/text
    return `<span class="asset-icon" style="background:${color}22;color:${color}">${icon}</span>`;
}

function renderWatchlistItems(items, container) {
    if (!items || !Array.isArray(items)) return;
    container.innerHTML = items.slice(0, 4).map(item => {
        const isPositive = item.change && !item.change.startsWith('-');
        return `
            <div class="watchlist-item">
                <div class="asset-name">
                    ${renderAssetIcon(item.icon, item.name, item.color || item.bg)}
                    <div>
                        <div style="font-weight:500;">${item.name}</div>
                        <div style="font-size:0.78rem;color:var(--text-muted);">${item.symbol}</div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-family:var(--font-mono);font-weight:500;">${item.price}</div>
                    <div style="font-size:0.78rem;color:${isPositive ? 'var(--success)' : 'var(--danger)'};">${item.change}</div>
                </div>
            </div>
        `;
    }).join('');
}

async function initActivity() {
    const container = document.getElementById('activityContainer');
    if (!container) return;

    try {
        const response = await secureFetch('/api/journal');
        const data = await response.json();

        if (data.success && data.journal.length > 0) {
            container.innerHTML = data.journal.slice(0, 5).map(j => `
                <div class="activity-item">
                    <div class="activity-icon" style="background:${j.pnl >= 0 ? 'var(--success-bg)' : 'var(--danger-bg)'};">${j.pnl >= 0 ? '📈' : '📉'}</div>
                    <div class="activity-info">
                        <div class="title">Journaled: ${j.asset} ${j.type}</div>
                        <div class="time">${j.date}</div>
                    </div>
                    <div class="activity-amount" style="color:${j.pnl >= 0 ? 'var(--success)' : 'var(--danger)'};">${j.pnl >= 0 ? '+' : ''}$${j.pnl.toFixed(0)}</div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Activity fetch error:', error);
    }
}

// ===== SESSION CLOCK =====
function initSessionClock() {
    const el = document.getElementById('sessionClock');
    if (!el) return;

    function updateSessions() {
        const now = new Date();
        const hours = now.getUTCHours();

        // Simplified session times (UTC)
        const sessions = [
            { name: 'London', start: 8, end: 17, icon: '🇬🇧' },
            { name: 'New York', start: 13, end: 22, icon: '🇺🇸' },
            { name: 'Tadawul', start: 7, end: 12, icon: '🇸🇦' },
            { name: 'Tokyo', start: 0, end: 9, icon: '🇯🇵' },
            { name: 'Sydney', start: 22, end: 7, icon: '🇦🇺' }
        ];

        el.innerHTML = sessions.map(s => {
            let isOpen = false;
            if (s.start < s.end) {
                isOpen = hours >= s.start && hours < s.end;
            } else { // Over midnight
                isOpen = hours >= s.start || hours < s.end;
            }

            const statusKey = isOpen ? 'session-open' : 'session-closed';
            const statusLabel = translations[statusKey] ? translations[statusKey][lang] : (isOpen ? 'OPEN' : 'CLOSED');
            const sessionName = s.name === 'Tadawul' ? (translations['session-tadawul'] ? translations['session-tadawul'][lang] : 'Tadawul') : s.name;

            return `
                <div style="display:flex; justify-content:space-between; margin-bottom:8px; color:${isOpen ? 'var(--text-primary)' : 'var(--text-muted)'};">
                    <span>${s.icon} ${sessionName}</span>
                    <span style="font-weight:600; color:${isOpen ? 'var(--success)' : 'var(--text-muted)'};">${statusLabel}</span>
                </div>
            `;
        }).join('');
    }

    updateSessions();
    setInterval(updateSessions, 60000);
}

function getHoldings() {
    const defaults = [
        { id: 'def-btc', name: 'Bitcoin', symbol: 'BTC', market: 'Crypto', qty: 0.5, avgCost: 68000, currentPrice: 101234, icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png', color: 'var(--accent-gold)' },
        { id: 'def-eth', name: 'Ethereum', symbol: 'ETH', market: 'Crypto', qty: 5, avgCost: 3200, currentPrice: 4123, icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', color: 'var(--primary-light)' },
        { id: 'def-aapl', name: 'Apple Inc.', symbol: 'AAPL', market: 'US Stocks', qty: 20, avgCost: 180, currentPrice: 245.67, icon: 'https://logo.clearbit.com/apple.com', color: 'var(--text-primary)' },
        { id: 'def-nvda', name: 'NVIDIA', symbol: 'NVDA', market: 'US Stocks', qty: 10, avgCost: 500, currentPrice: 890.50, icon: 'https://logo.clearbit.com/nvidia.com', color: 'var(--success)' },
        { id: 'def-aramco', name: 'Saudi Aramco', symbol: '2222', market: 'Saudi', qty: 100, avgCost: 28, currentPrice: 32.10, icon: 'https://logo.clearbit.com/saudiaramco.com', color: 'var(--accent-emerald)' },
        { id: 'def-rajhi', name: 'Al Rajhi Bank', symbol: '1120', market: 'Saudi', qty: 50, avgCost: 75, currentPrice: 82.30, icon: 'https://logo.clearbit.com/alrajhibank.com.sa', color: 'var(--accent-teal)' },
    ];

    const stored = localStorage.getItem('calcwise_holdings');
    if (!stored) return defaults;

    let holdings = JSON.parse(stored);
    
    // Auto-repair: Give IDs to assets that don't have them
    let repaired = false;
    holdings = holdings.map((h, index) => {
        if (!h.id) {
            h.id = 'legacy-' + index + '-' + Date.now();
            repaired = true;
        }
        return h;
    });

    if (repaired) saveHoldings(holdings);
    return holdings;
}

function saveHoldings(holdings) {
    localStorage.setItem('calcwise_holdings', JSON.stringify(holdings));
}

function renderHoldings(holdings) {
    const lang = localStorage.getItem('calcwise_lang') || 'en';
    const tbody = document.getElementById('holdingsBody');
    if (!tbody) return;

    tbody.innerHTML = holdings.map(h => {
        const avgCost = parseFloat(h.avg_cost || h.avgCost || 0);
        const currentPrice = parseFloat(h.currentPrice || avgCost || 0);
        const qty = parseFloat(h.qty || 0);
        
        const value = qty * currentPrice;
        const pnl = (currentPrice - avgCost) * qty;
        const change = avgCost > 0 ? ((currentPrice - avgCost) / avgCost) * 100 : 0;
        const isPositive = pnl >= 0;

        const marketKey = 'market-' + (h.market || 'crypto').toLowerCase().replace(' ', '-');
        const marketName = (translations[marketKey] && translations[marketKey][lang]) ? translations[marketKey][lang] : (h.market || 'Crypto');

        return `
      <tr>
        <td>
          <div class="asset-name">
            ${renderAssetIcon(h.icon, h.name, h.color)}
            <div>
              <div style="font-weight:500;">${h.name || 'Unknown'}</div>
              <div style="font-size:0.78rem;color:var(--text-muted);">${h.symbol || '---'}</div>
            </div>
          </div>
        </td>
        <td><span style="font-size:0.82rem;color:var(--text-secondary);">${marketName}</span></td>
        <td style="font-family:var(--font-mono);">${qty}</td>
        <td style="font-family:var(--font-mono);">$${avgCost.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
        <td style="font-family:var(--font-mono);">$${currentPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
        <td style="font-family:var(--font-mono);font-weight:600;">$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        <td style="font-family:var(--font-mono);color:${isPositive ? 'var(--success)' : 'var(--danger)'};"> ${isPositive ? '+' : ''}$${pnl.toFixed(2)}</td>
        <td style="font-family:var(--font-mono);color:${isPositive ? 'var(--success)' : 'var(--danger)'};"> ${isPositive ? '↑' : '↓'} ${Math.abs(change).toFixed(2)}%</td>
        <td style="text-align:right;"><button class="btn btn-ghost btn-sm" onclick="handleDeleteAsset('${h.id}')" style="color:var(--danger);padding:2px 8px;">✕</button></td>
      </tr>
    `;
    }).join('');
}

function updateStats(holdings) {
    if (!holdings || !Array.isArray(holdings) || holdings.length === 0) return;

    const totalValue = holdings.reduce((sum, h) => sum + (parseFloat(h.qty || 0) * parseFloat(h.currentPrice || h.avgCost || 0)), 0);
    const totalCost = holdings.reduce((sum, h) => sum + (parseFloat(h.qty || 0) * parseFloat(h.avg_cost || h.avgCost || 0)), 0);
    const totalPL = totalValue - totalCost;
    const totalPLPct = totalCost > 0 ? (totalPL / totalCost) * 100 : 0;

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
        const hAvgCost = h.avg_cost || h.avgCost;
        const bestAvgCost = best.avg_cost || best.avgCost;
        const changePct = ((h.currentPrice - hAvgCost) / hAvgCost) * 100;
        const bestChange = ((best.currentPrice - bestAvgCost) / bestAvgCost) * 100;
        if (changePct > bestChange) best = h;
    });

    if (el('bestPerformer')) el('bestPerformer').textContent = best.symbol;
    const lastBestAvgCost = best.avg_cost || best.avgCost;
    const bestChangePct = ((best.currentPrice - lastBestAvgCost) / lastBestAvgCost) * 100;
    if (el('bestPerformerChange')) el('bestPerformerChange').textContent = `↑ +${bestChangePct.toFixed(1)}%`;

    // --- Dynamic Allocation ---
    const markets = {};
    holdings.forEach(h => {
        const val = h.qty * h.currentPrice;
        markets[h.market] = (markets[h.market] || 0) + val;
    });

    const marketColors = {
        'Crypto': 'var(--accent-gold)',
        'Forex': 'var(--accent-teal)',
        'US Stocks': 'var(--primary)',
        'Saudi': 'var(--accent-emerald)'
    };

    const allocationContainer = document.querySelector('.allocation-chart');
    if (allocationContainer && totalValue > 0) {
        let gradientStr = '';
        let currentDeg = 0;
        let html = '';

        Object.keys(markets).forEach(market => {
            const pct = (markets[market] / totalValue) * 100;
            const deg = (pct / 100) * 360;
            const color = marketColors[market] || 'var(--text-muted)';
            
            gradientStr += `${color} ${currentDeg}deg ${currentDeg + deg}deg,`;
            currentDeg += deg;

            html += `
                <div class="allocation-item">
                    <span class="allocation-dot" style="background:${color};"></span>
                    <span>${market} — ${pct.toFixed(0)}%</span>
                </div>
            `;
        });

        // Update Pie
        const pie = document.querySelector('[style*="conic-gradient"]');
        if (pie) pie.style.background = `conic-gradient(${gradientStr.slice(0, -1)})`;
        
        // Update labels
        allocationContainer.innerHTML = html;
    }
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

function initAIAssistant() {
    if (document.getElementById('aiAssistantBtn')) return;
    const lang = localStorage.getItem('calcwise_lang') || 'en';

    const btn = document.createElement('button');
    btn.id = 'aiAssistantBtn';
    btn.title = translations['ai-name'] ? translations['ai-name'][lang] : 'LingoWise AI';
    btn.innerHTML = '🤖<span class="notif-dot"></span>';
    btn.onclick = toggleAIChat;
    document.body.appendChild(btn);

    const aiName = translations['ai-name'] ? translations['ai-name'][lang] : 'LingoWise AI';
    const aiStatus = translations['ai-status'] ? translations['ai-status'][lang] : '● Online · Language Tutor';
    const aiGreeting = translations['ai-greeting'] ? translations['ai-greeting'][lang] : "👋 Hi! I'm your AI Tutor.";
    const aiPlaceholder = translations['ai-placeholder'] ? translations['ai-placeholder'][lang] : 'Ask anything...';

    const chat = document.createElement('div');
    chat.id = 'aiChat';
    chat.innerHTML = `
        <div class="ai-chat-header">
            <div class="ai-avatar">🤖</div>
            <div class="ai-info">
                <div class="name">${aiName}</div>
                <div class="status">${aiStatus}</div>
            </div>
            <button class="ai-chat-close" onclick="toggleAIChat()">✕</button>
        </div>
        <div class="ai-chat-messages" id="aiMessages">
            <div class="ai-msg bot">${aiGreeting}</div>
        </div>
        <div class="ai-quick-replies">
            <button class="ai-quick-btn" onclick="sendAIMessage('${lang === 'ar' ? 'اشرح المضارع التام' : 'Explain Present Perfect'}')" data-i18n="ai-quick-grammar">Grammar Check</button>
            <button class="ai-quick-btn" onclick="sendAIMessage('${lang === 'ar' ? 'نصيحة دراسية' : 'Study Tip'}')" data-i18n="ai-quick-tip">Study Tip</button>
            <button class="ai-quick-btn" onclick="sendAIMessage('${lang === 'ar' ? 'ممارسة المحادثة' : 'Practice conversation'}')" data-i18n="ai-quick-speak">Speak Practice</button>
        </div>
        <div class="ai-chat-input">
            <input type="text" id="aiInput" placeholder="${aiPlaceholder}" onkeydown="if(event.key==='Enter') sendAIMessage()">
            <button onclick="sendAIMessage()">➤</button>
        </div>
    `;
    document.body.appendChild(chat);
}

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('active');
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('active');
}

/**
 * Direct Asset Addition (from Market Pages)
 */
async function deepAddAsset(symbol, name, market, icon, color) {
    if (!localStorage.getItem('calcwise_logged_in')) {
        showToast('warning', 'Please log in to manage your portfolio.');
        setTimeout(() => window.location.href = 'login.html', 1500);
        return;
    }

    const qty = prompt(`How many ${symbol} tokens/shares do you hold?`, "1");
    if (qty === null || isNaN(parseFloat(qty))) return;

    const cost = prompt(`What was your average entry price for ${symbol}?`, "0");
    if (cost === null || isNaN(parseFloat(cost))) return;

    const assetData = {
        name: name,
        symbol: symbol,
        market: market,
        qty: parseFloat(qty),
        avgCost: parseFloat(cost),
        icon: icon,
        color: color
    };

    try {
        const response = await secureFetch('/api/portfolio', {
            method: 'POST',
            body: JSON.stringify(assetData)
        });
        const data = await response.json();
        if (data.success) {
            showToast('success', `${name} added to your portfolio! 🚀`);
        }
    } catch (error) {
        showToast('error', 'Failed to add asset.');
    }
}

async function addAsset(e) {
    e.preventDefault();
    const market = document.getElementById('asset-market').value;
    const name = document.getElementById('asset-name').value;
    const qty = parseFloat(document.getElementById('asset-quantity').value);
    const cost = parseFloat(document.getElementById('asset-cost').value);

    const form = e.target;
    const selectedSymbol = form.dataset.selectedSymbol;
    const selectedIcon = form.dataset.selectedIcon;
    const selectedColor = form.dataset.selectedColor;

    const marketIcons = { crypto: '₿', forex: '💱', 'us-stocks': '🏛', saudi: '🇸🇦' };
    const marketNames = { crypto: 'Crypto', forex: 'Forex', 'us-stocks': 'US Stocks', saudi: 'Saudi Market' };
    const marketColors = { crypto: 'var(--accent-gold)', forex: 'var(--accent-teal)', 'us-stocks': 'var(--primary)', saudi: 'var(--accent-emerald)' };

    const assetData = {
        name: name,
        symbol: selectedSymbol || name.substring(0, 4).toUpperCase(),
        market: marketNames[market] || (market.charAt(0).toUpperCase() + market.slice(1)),
        qty: qty,
        avgCost: cost,
        icon: selectedIcon || marketIcons[market] || '💰',
        color: selectedColor || marketColors[market] || '#6C5CE7'
    };

    const id = Date.now().toString();
    const assetDataWithId = { ...assetData, id: id, currentPrice: cost }; // Initial current price is cost

    try {
        const response = await secureFetch('/api/portfolio', {
            method: 'POST',
            body: JSON.stringify(assetDataWithId)
        });

        const data = await response.json();

        if (data.success) {
            showToast('success', 'Asset added to portfolio! 🚀');
        } else {
            throw new Error('API failed');
        }
    } catch (error) {
        console.warn('API save failed, using local fallback:', error);
        const holdings = getHoldings();
        holdings.push(assetDataWithId);
        saveHoldings(holdings);
        showToast('success', 'Asset saved to local portfolio! 🏠');
    } finally {
        closeModal('addAssetModal');
        form.reset();
        delete form.dataset.selectedSymbol;
        delete form.dataset.selectedIcon;
        delete form.dataset.selectedColor;
        initDashboard();
    }
}

async function refreshDashboard() {
    await initDashboard();
    showToast('success', 'Dashboard refreshed with latest data! 📊');
}

async function handleDeleteAsset(id) {
    const lang = localStorage.getItem('calcwise_lang') || 'en';
    const confirmMsg = lang === 'ar' ? 'هل أنت متأكد من حذف هذا الأصل؟' : 'Are you sure you want to remove this asset?';
    if (!confirm(confirmMsg)) return;

    try {
        const response = await secureFetch(`/api/portfolio/${id}`, { method: 'DELETE' });
        const data = await response.json();

        if (data.success) {
            showToast('success', lang === 'ar' ? 'تم حذف الأصل.' : 'Asset removed from portfolio.');
            initDashboard();
        } else {
            throw new Error('API delete failed');
        }
    } catch (error) {
        console.warn('API delete error, using local fallback:', error);
        let holdings = getHoldings();
        const initialCount = holdings.length;
        holdings = holdings.filter(h => h.id !== id);
        
        if (holdings.length < initialCount) {
            saveHoldings(holdings);
            showToast('success', lang === 'ar' ? 'تم الحذف من التخزين المحلي.' : 'Removed from local portfolio.');
            initDashboard();
        } else {
            showToast('error', lang === 'ar' ? 'فشل الحذف.' : 'Failed to remove asset.');
        }
    }
}

function clearAllAssets() {
    const lang = localStorage.getItem('calcwise_lang') || 'en';
    const msg = lang === 'ar' ? 'هل تريد مسح جميع الممتلكات؟' : 'Are you sure you want to clear all holdings?';
    if (!confirm(msg)) return;

    saveHoldings([]);
    showToast('success', lang === 'ar' ? 'تم مسح المحفظة.' : 'Portfolio cleared.');
    initDashboard();
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

// ===== BLOG MODAL SYSTEM =====
function openBlogModal(postId) {
    console.log('Opening blog modal for post:', postId);
    const lang = localStorage.getItem('calcwise_lang') || 'en';
    const modal = document.getElementById('blogModal');
    const contentArea = document.getElementById('blogContentArea');

    if (!modal || !contentArea) return;

    const content = translations[`blog-${postId}-content`] ? translations[`blog-${postId}-content`][lang] : '<p>Content coming soon...</p>';
    const titleKey = `blog-card-${postId}-title`;
    const title = translations[titleKey] ? translations[titleKey][lang] : 'Article';

    contentArea.innerHTML = `
        <div class="blog-full-article">
            <h2 class="mb-2" style="color:var(--accent-gold);">${title}</h2>
            <div class="article-body" style="font-size:1.1rem; line-height:1.7; color:var(--text-primary);">
                ${content}
            </div>
            <div class="mt-4" style="border-top:1px solid var(--border-subtle); padding-top:var(--space-lg); text-align:center;">
                <button class="btn btn-gold" onclick="closeBlogModal()">Close Article</button>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBlogModal() {
    const modal = document.getElementById('blogModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ===== TRADE JOURNAL =====
async function initJournal() {
    const journalBody = document.getElementById('journalBody');
    if (!journalBody) return;

    try {
        const response = await secureFetch('/api/journal');
        const data = await response.json();

        if (data.success) {
            renderJournal(data.journal);
        }

        // Update User Name
        const user = JSON.parse(localStorage.getItem('calcwise_user') || '{"firstName": "User"}');
        const userEl = document.getElementById('dashboardUser');
        if (userEl) userEl.innerText = `${translations['dash-hi'][lang]}, ${user.firstName} 👋`;
    } catch (error) {
        console.error('Journal fetch error:', error);
    }
}

function renderJournal(entries) {
    const tbody = document.getElementById('journalBody');
    if (!tbody) return;

    if (entries.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:var(--space-xl);color:var(--text-muted);">No trades logged yet. Start your journey today!</td></tr>';
        return;
    }

    // --- Calculate Stats ---
    const totalTrades = entries.length;
    const wins = entries.filter(j => j.pnl > 0).length;
    const winRate = (wins / totalTrades) * 100;
    const totalPnL = entries.reduce((sum, j) => sum + j.pnl, 0);
    const avgProfit = totalPnL / totalTrades;

    // Find best asset
    const assetPnL = {};
    entries.forEach(j => {
        assetPnL[j.asset] = (assetPnL[j.asset] || 0) + j.pnl;
    });
    let bestAsset = '-';
    let maxPnL = -Infinity;
    for (const asset in assetPnL) {
        if (assetPnL[asset] > maxPnL) {
            maxPnL = assetPnL[asset];
            bestAsset = asset;
        }
    }

    // --- Update UI Stats ---
    if (el('journalWinRate')) el('journalWinRate').textContent = `${winRate.toFixed(1)}%`;
    if (el('journalCount')) el('journalCount').textContent = `${totalTrades} Trades Total`;
    if (el('journalTotalPnL')) el('journalTotalPnL').textContent = `${totalPnL >= 0 ? '+' : ''}$${totalPnL.toLocaleString()}`;
    if (el('journalAvgProfit')) el('journalAvgProfit').textContent = `${avgProfit >= 0 ? '+' : ''}$${avgProfit.toLocaleString()}`;
    if (el('journalBestAsset')) el('journalBestAsset').textContent = bestAsset;
    
    if (el('journalProfitability')) {
        el('journalProfitability').textContent = avgProfit > 0 ? 'Highly Profitable' : 'Attention Needed';
        el('journalProfitability').className = `stat-footer ${avgProfit > 0 ? 'positive' : 'negative'}`;
    }

    // --- Render Table ---
    tbody.innerHTML = entries.map(j => `
        <tr>
            <td style="font-size:0.85rem;color:var(--text-muted);">${j.date}</td>
            <td style="font-weight:600;">${j.asset}</td>
            <td><span class="journal-badge" style="background:${j.type === 'Long' ? 'var(--success-bg)' : 'var(--danger-bg)'};color:${j.type === 'Long' ? 'var(--success)' : 'var(--danger)'};">${j.type}</span></td>
            <td style="font-family:var(--font-mono);">$${j.entry.toLocaleString()}</td>
            <td style="font-family:var(--font-mono);">$${j.exit.toLocaleString()}</td>
            <td style="font-family:var(--font-mono);color:${j.pnl >= 0 ? 'var(--success)' : 'var(--danger)'};font-weight:600;">${j.pnl >= 0 ? '+' : ''}$${j.pnl.toLocaleString()}</td>
            <td style="font-size:0.85rem;color:var(--text-secondary);max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${j.notes}">${j.notes}</td>
            <td style="text-align:right;"><button class="btn btn-ghost btn-sm" onclick="handleDeleteTrade('${j.id}')" style="color:var(--danger);padding:2px 8px;">✕</button></td>
        </tr>
    `).join('');
}

async function handleDeleteTrade(id) {
    const lang = localStorage.getItem('calcwise_lang') || 'en';
    const msg = lang === 'ar' ? 'هل أنت متأكد من حذف هذا السجل؟' : 'Are you sure you want to delete this trade record?';
    if (!confirm(msg)) return;

    try {
        const response = await secureFetch(`/api/journal/${id}`, { method: 'DELETE' });
        const data = await response.json();

        if (data.success) {
            showToast('success', lang === 'ar' ? 'تم حذف سجل الصفقة.' : 'Trade record deleted.');
            initJournal();
        }
    } catch (error) {
        console.error('Delete error:', error);
        showToast('error', lang === 'ar' ? 'فشل حذف السجل.' : 'Failed to delete record.');
    }
}

async function handleJournalSubmit(e) {
    e.preventDefault();
    const asset = document.getElementById('trade-asset').value;
    const type = document.getElementById('trade-type').value;
    const entry = parseFloat(document.getElementById('trade-entry').value);
    const exit = parseFloat(document.getElementById('trade-exit').value);
    const qty = parseFloat(document.getElementById('trade-qty').value);
    const notes = document.getElementById('trade-notes').value;

    const pnl = (type === 'Long' ? (exit - entry) : (entry - exit)) * qty;

    const tradeData = {
        asset, type, entry, exit, qty, notes, pnl
    };

    try {
        const response = await secureFetch('/api/journal', {
            method: 'POST',
            body: JSON.stringify(tradeData)
        });
        const data = await response.json();

        if (data.success) {
            showToast('success', 'Trade logged successfully! 📓');
            closeModal('addTradeModal');
            initJournal(); // Refresh
        }
    } catch (error) {
        console.error('Journal save error:', error);
        showToast('error', 'Failed to save trade record.');
    }
}

// ===== LINGOWISE AI ASSISTANT =====
function initAIAssistant() {
    if (document.getElementById('aiAssistantBtn')) return;
    const lang = localStorage.getItem('calcwise_lang') || 'en';

    const btn = document.createElement('button');
    btn.id = 'aiAssistantBtn';
    btn.title = lang === 'ar' ? 'مساعد لينغو وايز' : 'LingoWise Assistant';
    btn.innerHTML = '🤖<span class="notif-dot"></span>';
    btn.onclick = toggleAIChat;
    document.body.appendChild(btn);

    const aiName = "LingoWise AI";
    const aiStatus = "● Online · Language Tutor";
    const aiGreeting = "👋 Hi! I'm your <strong>LingoWise AI Tutor</strong>. Ask me about grammar, vocabulary, or practice speaking!";
    const aiPlaceholder = lang === 'ar' ? 'اسأل أي شيء عن اللغة الإنجليزية...' : 'Ask anything about English...';

    const chat = document.createElement('div');
    chat.id = 'aiChat';
    chat.innerHTML = `
        <div class="ai-chat-header">
            <div class="ai-avatar">🤖</div>
            <div class="ai-info">
                <div class="name">${aiName}</div>
                <div class="status">${aiStatus}</div>
            </div>
            <button class="ai-chat-close" onclick="toggleAIChat()">✕</button>
        </div>
        <div class="ai-chat-messages" id="aiMessages">
            <div class="ai-msg bot">${aiGreeting}</div>
        </div>
        <div class="ai-quick-replies">
            <button class="ai-quick-btn" onclick="sendAIMessage('Explain Present Perfect')">Present Perfect</button>
            <button class="ai-quick-btn" onclick="sendAIMessage('IELTS Speaking tips')">IELTS Tips</button>
            <button class="ai-quick-btn" onclick="sendAIMessage('Practice conversation')">Practice</button>
        </div>
        <div class="ai-chat-input">
            <input type="text" id="aiInput" placeholder="${aiPlaceholder}" onkeydown="if(event.key==='Enter') sendAIMessage()">
            <button onclick="sendAIMessage()">➤</button>
        </div>
    `;
    document.body.appendChild(chat);
}

function updateAIAssistant() {
    const lang = localStorage.getItem('calcwise_lang') || 'en';
    const btn = document.getElementById('aiAssistantBtn');
    const chat = document.getElementById('aiChat');
    const input = document.getElementById('aiInput');

    if (!btn) return;

    // Reposition button & chat (for redundancy with CSS)
    btn.style.left = lang === 'ar' ? '24px' : 'auto';
    btn.style.right = lang === 'ar' ? 'auto' : '24px';
    if (chat) {
        chat.style.left = lang === 'ar' ? '24px' : 'auto';
        chat.style.right = lang === 'ar' ? 'auto' : '24px';
    }

    // Update button title
    btn.title = translations['ai-name'] ? translations['ai-name'][lang] : 'LingoWise AI';

    // Update Chat UI text if open
    const aiName = translations['ai-name'] ? translations['ai-name'][lang] : 'LingoWise AI';
    const aiStatus = translations['ai-status'] ? translations['ai-status'][lang] : '● Online · Language Tutor';
    const aiPlaceholder = translations['ai-placeholder'] ? translations['ai-placeholder'][lang] : 'Ask anything...';

    const headerName = document.querySelector('#aiChat .ai-info .name');
    const headerStatus = document.querySelector('#aiChat .ai-info .status');
    if (headerName) headerName.textContent = aiName;
    if (headerStatus) headerStatus.textContent = aiStatus;
    if (input) input.placeholder = aiPlaceholder;

    // Update quick replies
    const q1 = translations['ai-quick-grammar'] ? translations['ai-quick-grammar'][lang] : '📝 Grammar';
    const q2 = translations['ai-quick-tip'] ? translations['ai-quick-tip'][lang] : '💡 Study Tip';
    const q3 = translations['ai-quick-speak'] ? translations['ai-quick-speak'][lang] : '🎙️ Speak Practice';

    const qbtns = document.querySelectorAll('#aiChat .ai-quick-btn');
    if (qbtns.length >= 3) {
        qbtns[0].textContent = q1;
        qbtns[1].textContent = q2;
        qbtns[2].textContent = q3;
    }
}

function toggleAIChat() {
    const chat = document.getElementById('aiChat');
    if (chat) chat.classList.toggle('open');
    const dot = document.querySelector('#aiAssistantBtn .notif-dot');
    if (dot) dot.style.display = 'none';
}

const AI_RESPONSES = {
    // Language Learning
    'grammar|tense|verb|قواعد|زمن|فعل': {
        en: '📝 <strong>Grammar Tip:</strong> Master the basics first. Focus on Present Simple, Continuous, and Perfect. Use our AI Tutor to check your sentences! <a href="grammar.html" style="color:var(--primary-light)">Grammar Guide →</a>',
        ar: '📝 <strong>نصيحة في القواعد:</strong> أتقن الأساسيات أولاً. ركّز على المضارع البسيط، المستمر، والتام. استخدم مساعدنا الذكي لفحص جملك! <a href="grammar.html" style="color:var(--primary-light)">دليل القواعد ←</a>'
    },
    'vocabulary|word|vocab|مفردات|كلمات|كلمة': {
        en: '🔤 <strong>Vocabulary Hack:</strong> use Spaced Repetition (SRS). Learning 5-10 words daily is better than 100 once a week. <a href="vocabulary.html" style="color:var(--primary-light)">Vocab Bank →</a>',
        ar: '🔤 <strong>حيلة المفردات:</strong> استخدم نظام التكرار المتباعد (SRS). تعلم 5-10 كلمات يومياً أفضل من تعلم 100 كلمة مرة واحدة في الأسبوع. <a href="vocabulary.html" style="color:var(--primary-light)">بنك المفردات ←</a>'
    },
    'speaking|pronunciation|accent|تحدث|نطق|لهجة': {
        en: '🎙️ <strong>Speaking Practice:</strong> Record yourself and listen back. Consistency is key. Practice 15 minutes daily. <a href="speaking-lab.html" style="color:var(--primary-light)">Speaking Lab →</a>',
        ar: '🎙️ <strong>ممارسة التحدث:</strong> سجل صوتك واستمع إليه. الاستمرارية هي السر. تدرب لمدة 15 دقيقة يومياً. <a href="speaking-lab.html" style="color:var(--primary-light)">معمل التحدث ←</a>'
    },
    'ielts|exam|test|toefl|آيلتس|اختبار|امتحان': {
        en: '📚 <strong>Exam Prep:</strong> Understanding the test format is 50% of the battle. Use practice tests and time yourself. <a href="labs.html" style="color:var(--primary-light)">Live Labs →</a>',
        ar: '📚 <strong>التحضير للاختبار:</strong> فهم نظام الاختبار هو نصف المعركة. استخدم الاختبارات التجريبية وراقب وقتك. <a href="labs.html" style="color:var(--primary-light)">المختبرات الحية ←</a>'
    },
    'fluency|level|fluent|طلاقة|مستوى': {
        en: '🚀 <strong>Fluency Path:</strong> Immersion is great, but structured learning helps you cross the plateau. Join our Live Labs! <a href="labs.html" style="color:var(--primary-light)">Live Labs →</a>',
        ar: '🚀 <strong>طريق الطلاقة:</strong> الانغماس رائع، لكن التعلم المنظم يساعدك على تجاوز العقبات. انضم لمختبراتنا المباشرة! <a href="labs.html" style="color:var(--primary-light)">المختبرات المباشرة ←</a>'
    },
    'tip|hack|study|نصيحة|دراسة': {
        en: '💡 <strong>Study Tip:</strong> Don\'t just read, use Active Recall. Quiz yourself regularly on what you\'ve learned.',
        ar: '💡 <strong>نصيحة دراسية:</strong> لا تكتفِ بالقراءة، استخدم الاسترجاع النشط. اختبر نفسك بانتظام فيما تعلمته.'
    },
    'lingowise|features|tools|platform|ميزات|المنصة': {
        en: '✨ <strong>LingoWise Features:</strong><br>📊 Dashboard • 📚 Courses • 🎙️ Speaking Lab • 📝 Grammar Guide • 🔤 Vocabulary • 🤖 AI Tutor<br>Master English, today.',
        ar: '✨ <strong>ميزات لينغو وايز:</strong><br>📊 لوحة التحكم • 📚 الدورات • 🎙️ مختبر التحدث • 📝 دليل القواعد • 🔤 المفردات • 🤖 المعلم الذكي<br>أتقن الإنجليزية اليوم.'
    }
};

function getAIResponse(msg) {
    const lang = localStorage.getItem('calcwise_lang') || 'en';
    const lowerMsg = msg.toLowerCase();
    for (const [keywords, response] of Object.entries(AI_RESPONSES)) {
        if (keywords.split('|').some(k => lowerMsg.includes(k))) {
            return typeof response === 'object' ? (response[lang] || response.en) : response;
        }
    }
    const defaults = {
        en: [
            '🤔 Great question! Check our <a href="blog.html" style="color:var(--primary-light)">blog</a> for in-depth language learning tips.',
            '📊 Try our <a href="vocabulary.html" style="color:var(--primary-light)">Vocabulary Bank</a> to expand your word count!',
            '💡 Practice makes perfect. Have you tried the <a href="speaking-lab.html" style="color:var(--primary-light)">AI Speaking Lab</a> today?',
            '🎯 Learning a language takes time. Stay consistent and join a <a href="labs.html" style="color:var(--primary-light)">Live Lab</a> for real-time practice.',
        ],
        ar: [
            '🤔 سؤال رائع! اطّلع على <a href="blog.html" style="color:var(--primary-light)">مدونتنا</a> للحصول على نصائح لغوية متعمقة.',
            '📊 جرّب <a href="vocabulary.html" style="color:var(--primary-light)">بنك المفردات</a> لتوسيع عدد كلماتك!',
            '💡 الممارسة تجعل العمل متقناً. هل جربت <a href="speaking-lab.html" style="color:var(--primary-light)">معمل التحدث</a> اليوم؟',
            '🎯 تعلم اللغة يستغرق وقتاً. كن مستمراً وانضم إلى <a href="labs.html" style="color:var(--primary-light)">المختبرات المباشرة</a> للممارسة الحقيقية.',
        ]
    };
    const arr = defaults[lang] || defaults.en;
    return arr[Math.floor(Math.random() * arr.length)];
}

function sendAIMessage(preset) {
    const input = document.getElementById('aiInput');
    const msg = preset || (input ? input.value.trim() : '');
    if (!msg) return;

    const messages = document.getElementById('aiMessages');
    if (!messages) return;

    messages.innerHTML += `<div class="ai-msg user">${msg}</div>`;
    if (input) input.value = '';

    const typing = document.createElement('div');
    typing.className = 'ai-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {
        typing.remove();
        const response = getAIResponse(msg);
        messages.innerHTML += `<div class="ai-msg bot">${response}</div>`;
        messages.scrollTop = messages.scrollHeight;
    }, 800 + Math.random() * 600);
}

// ===== ECONOMIC CALENDAR =====
function initEconomicCalendar() {
    const container = document.getElementById('economicCalendar');
    if (!container) return;

    const lang = localStorage.getItem('calcwise_lang') || 'en';
    const today = new Date();
    const fmt = (h, m) => { const d = new Date(today); d.setHours(h, m, 0); return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); };

    const events = [
        { time: fmt(9, 30), name: lang === 'ar' ? 'الرواتب خارج القطاع الزراعي الأمريكي' : 'US Non-Farm Payrolls', country: '🇺🇸 USD', impact: 'high' },
        { time: fmt(10, 0),  name: lang === 'ar' ? 'مؤشر أسعار المستهلكين الأمريكي (CPI)' : 'US Consumer Price Index (CPI)', country: '🇺🇸 USD', impact: 'high' },
        { time: fmt(14, 0),  name: lang === 'ar' ? 'قرار الاحتياطي الفيدرالي بشأن الفائدة' : 'Federal Reserve Interest Decision', country: '🇺🇸 USD', impact: 'high' },
        { time: fmt(10, 30), name: lang === 'ar' ? 'طلبيات إعانات البطالة الأمريكية' : 'US Initial Jobless Claims', country: '🇺🇸 USD', impact: 'medium' },
        { time: fmt(12, 0),  name: lang === 'ar' ? 'قرار سعر الفائدة للبنك المركزي الأوروبي' : 'EU ECB Rate Decision', country: '🇪🇺 EUR', impact: 'high' },
        { time: fmt(8, 30),  name: lang === 'ar' ? 'تقديرات الناتج المحلي الإجمالي البريطاني' : 'UK GDP Monthly Estimate', country: '🇬🇧 GBP', impact: 'medium' },
        { time: fmt(11, 0),  name: lang === 'ar' ? 'افتتاح السوق السعودية (تاسي)' : 'Saudi TASI Open', country: '🇸🇦 SAR', impact: 'low' },
        { time: fmt(16, 0),  name: lang === 'ar' ? 'مؤشر PMI التصنيعي ISM الأمريكي' : 'US ISM Manufacturing PMI', country: '🇺🇸 USD', impact: 'medium' },
    ].sort((a, b) => a.time.localeCompare(b.time));

    const highLabel  = translations['econ-impact-high']   ? translations['econ-impact-high'][lang]   : 'High';
    const medLabel   = translations['econ-impact-medium'] ? translations['econ-impact-medium'][lang]  : 'Medium';
    const lowLabel   = translations['econ-impact-low']    ? translations['econ-impact-low'][lang]     : 'Low';

    container.innerHTML = events.map(ev => `
        <div class="calendar-event">
            <div class="event-impact ${ev.impact}" title="${ev.impact}"></div>
            <div class="event-info">
                <div class="event-name">${ev.name}</div>
                <div class="event-meta">${ev.country} · ${ev.impact === 'high' ? `🔴 ${highLabel}` : ev.impact === 'medium' ? `🟡 ${medLabel}` : `🟢 ${lowLabel}`}</div>
            </div>
            <div class="event-time">${ev.time}</div>
        </div>
    `).join('');
}

// ===== WATCHLIST SYSTEM =====
function getWatchlist() {
    const defaults = [
        { id: 'btc', name: 'Bitcoin', symbol: 'BTC', price: 98450.25, change: 2.45, icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png', color: '#f7931a' },
        { id: 'eth', name: 'Ethereum', symbol: 'ETH', price: 3840.12, change: -1.20, icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', color: '#627eea' },
        { id: 'aapl', name: 'Apple Inc.', symbol: 'AAPL', price: 245.67, change: 0.85, icon: 'https://logo.clearbit.com/apple.com', color: '#555555' },
        { id: 'nvda', name: 'NVIDIA', symbol: 'NVDA', price: 142.33, change: 5.12, icon: 'https://logo.clearbit.com/nvidia.com', color: '#76b900' }
    ];
    return JSON.parse(localStorage.getItem('calcwise_watchlist') || JSON.stringify(defaults));
}

function saveWatchlist(list) {
    localStorage.setItem('calcwise_watchlist', JSON.stringify(list));
}

function initWatchlist() {
    const grid = document.getElementById('watchlistGrid');
    if (!grid) return;
    renderWatchlist();
}

function renderWatchlist() {
    const grid = document.getElementById('watchlistGrid');
    if (!grid) return;

    const list = getWatchlist();
    const lang = localStorage.getItem('calcwise_lang') || 'en';

    if (list.length === 0) {
        grid.innerHTML = `
            <div class="empty-watchlist">
                <div style="font-size:3rem;margin-bottom:var(--space-md);">👁️</div>
                <h3>${translations['watchlist-empty-msg'][lang]}</h3>
                <button class="btn btn-primary mt-1" onclick="openModal('addWatchlistModal')">${translations['watchlist-add-btn'][lang]}</button>
            </div>
        `;
        return;
    }

    grid.innerHTML = list.map(item => {
        const isPos = item.change >= 0;
        return `
            <div class="card watchlist-card reveal">
                <button class="remove-btn" onclick="removeWatchlistAsset('${item.id}', '${item.name}')">✕</button>
                <div class="asset-info">
                    ${renderAssetIcon(item.icon, item.name, item.color)}
                    <div>
                        <div style="font-weight:700;font-size:1.1rem;">${item.name}</div>
                        <div style="color:var(--text-muted);font-size:0.85rem;">${item.symbol}</div>
                    </div>
                </div>
                <div class="price-info">
                    <div class="price-value">$${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                    <div class="price-change" style="color:${isPos ? 'var(--success)' : 'var(--danger)'}">
                        ${isPos ? '↑' : '↓'} ${Math.abs(item.change).toFixed(2)}%
                    </div>
                </div>
                <div class="watchlist-chart" id="chart-${item.id}">
                    <!-- Simplified sparkline placeholder -->
                    <div style="width:100%;height:100%;display:flex;align-items:flex-end;gap:2px;padding:10px;">
                        ${Array.from({length: 20}).map(() => `<div style="flex:1;background:${isPos ? 'var(--success)' : 'var(--danger)'};opacity:0.3;height:${Math.random()*100}%;border-radius:2px;"></div>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function handleWatchlistSearch(query, isModal = false) {
    const resultsContainer = document.getElementById(isModal ? 'modalSearchResults' : 'watchlistSearchResults');
    if (!query) {
        resultsContainer.style.display = 'none';
        resultsContainer.innerHTML = '';
        return;
    }

    const filtered = ASSET_POOL.filter(a => 
        a.name.toLowerCase().includes(query.toLowerCase()) || 
        a.symbol.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length === 0) {
        resultsContainer.innerHTML = '<div class="search-result-item">No assets found</div>';
    } else {
        resultsContainer.innerHTML = filtered.map(a => `
            <div class="search-result-item" onclick="addWatchlistAsset('${a.id}', '${a.name}', '${a.symbol}', '${a.icon}', '${a.color}')">
                <div style="display:flex;align-items:center;gap:12px;">
                    ${renderAssetIcon(a.icon, a.name, a.color)}
                    <div>
                        <strong>${a.name}</strong>
                        <div style="font-size:0.75rem;color:var(--text-muted);">${a.symbol}</div>
                    </div>
                </div>
                <button class="btn btn-ghost btn-sm">+</button>
            </div>
        `).join('');
    }
    resultsContainer.style.display = 'block';
}

function handlePortfolioSearch(query) {
    const resultsContainer = document.getElementById('portfolioSearchResults');
    const selectedMarket = document.getElementById('asset-market').value;
    
    // Filter pool by market first
    let poolToUse = ASSET_POOL.filter(a => a.market === selectedMarket);

    if (query && query.length >= 1) {
        poolToUse = poolToUse.filter(a => 
            a.name.toLowerCase().includes(query.toLowerCase()) || 
            a.symbol.toLowerCase().includes(query.toLowerCase())
        );
    }

    if (poolToUse.length === 0) {
        resultsContainer.innerHTML = '<div class="search-result-item">No assets found</div>';
    } else {
        const title = query ? '' : `<div style="padding:10px var(--space-md); font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px; border-bottom:1px solid var(--border-subtle);">${lang === 'ar' ? 'أصول مقترحة' : 'Suggested Assets'}</div>`;
        resultsContainer.innerHTML = title + poolToUse.map(a => `
            <div class="search-result-item" onclick="selectPortfolioAsset('${a.name}', '${a.symbol}', '${a.market}', '${a.icon}', '${a.color}')">
                <div style="display:flex;align-items:center;gap:12px;">
                    ${renderAssetIcon(a.icon, a.name, a.color)}
                    <div>
                        <strong>${a.name}</strong>
                        <div style="font-size:0.75rem;color:var(--text-muted);">${a.symbol}</div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    resultsContainer.style.display = 'block';
}

function selectPortfolioAsset(name, symbol, market, icon, color) {
    document.getElementById('asset-name').value = name;
    document.getElementById('asset-market').value = market;
    document.getElementById('portfolioSearchResults').style.display = 'none';
    
    // Store metadata for the submission
    const form = document.querySelector('#addAssetModal form');
    form.dataset.selectedSymbol = symbol;
    form.dataset.selectedIcon = icon;
    form.dataset.selectedColor = color;
    
    // Auto-focus quantity
    document.getElementById('asset-quantity').focus();
}

function addWatchlistAsset(id, name, symbol, icon, color) {
    let list = getWatchlist();
    if (list.find(a => a.id === id)) {
        showToast('error', `${name} is already in your watchlist.`);
        return;
    }

    const newAsset = {
        id, name, symbol, icon, color,
        price: 100 + Math.random() * 1000, // Simulated price
        change: (Math.random() * 10) - 5 // Simulated change
    };

    list.push(newAsset);
    saveWatchlist(list);
    showToast('success', `${name} added to watchlist! 👁️`);
    
    // Clear UI
    const searchDash = document.getElementById('watchlistSearch');
    const searchModal = document.getElementById('modalSearchInput');
    if (searchDash) searchDash.value = '';
    if (searchModal) searchModal.value = '';
    
    const resultsDash = document.getElementById('watchlistSearchResults');
    if (resultsDash) resultsDash.style.display = 'none';
    
    const resultsModal = document.getElementById('modalSearchResults');
    if (resultsModal) resultsModal.innerHTML = '';
    
    closeModal('addWatchlistModal');
    
    renderWatchlist(); // Refresh full grid (watchlist.html)
    initWatchlist();   // Refresh dashboard widget (dashboard.html)
}

function removeWatchlistAsset(id, name) {
    const lang = localStorage.getItem('calcwise_lang') || 'en';
    const confirmMsg = translations['watchlist-remove-confirm'][lang].replace('{name}', name);
    
    if (confirm(confirmMsg)) {
        let list = getWatchlist();
        list = list.filter(a => a.id !== id);
        saveWatchlist(list);
        showToast('success', `${name} removed.`);
        renderWatchlist();
    }
}
