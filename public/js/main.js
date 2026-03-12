let lang = localStorage.getItem('calcwise_lang') || 'en';

const COURSE_POOL = [
    { id: 'beg-1', name: { en: 'Beginner English 101', ar: 'أساسيات الإنجليزية ١٠١' }, level: 'Beginner', category: { en: 'General', ar: 'عام' }, icon: '🌱', color: '#00d2d3' },
    { id: 'int-1', name: { en: 'Intermediate Grammar', ar: 'قواعد المستوى المتوسط' }, level: 'Intermediate', category: { en: 'Grammar', ar: 'قواعد' }, icon: '📝', color: '#6c5ce7' },
    { id: 'adv-1', name: { en: 'Advanced Speaking', ar: 'مهارات التحدث المتقدمة' }, level: 'Advanced', category: { en: 'Speaking', ar: 'محادثة' }, icon: '🎙️', color: '#ff9f43' },
    { id: 'bus-1', name: { en: 'Business Writing', ar: 'الكتابة للأعمال' }, level: 'Business', category: { en: 'Writing', ar: 'كتابة' }, icon: '💼', color: '#2e86de' },
    { id: 'ielt-1', name: { en: 'IELTS Prep Masterclass', ar: 'دورة التحضير للآيلتس' }, level: 'Advanced', category: { en: 'Exam', ar: 'اختبارات' }, icon: '🎓', color: '#ee5253' }
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
    initDashboard();
    updateLastUpdated();
    checkAuth();
    initAIAssistant();

    // Global click listener to close modals/dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Auto-refresh dashboard every 60s
    setInterval(() => {
        if (document.getElementById('activeCoursesContainer')) {
            initDashboard();
        }
    }, 60000);
});

// ===== THEME TOGGLE (Dark / Light) =====
function initTheme() {
    const saved = localStorage.getItem('calcwise_theme') || 'dark';
    applyTheme(saved);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('calcwise_theme', theme);
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
    'nav-community': { en: 'Community', ar: 'الممجتمع' },
    'nav-login': { en: 'Log In', ar: 'تسجيل الدخول' },
    'nav-get-started': { en: 'Get Started', ar: 'ابدأ الآن' },
    'ticker-learners': { en: '2,450 learners online', ar: '٢,٤٥٠ متعلم متصل الآن' },
    'ticker-speaking': { en: 'Advanced Speaking Lab', ar: 'مختبر التحدث المتقدم' },
    'ticker-satisfaction': { en: '98% satisfaction rate', ar: '٩٨٪ نسبة الرضا' },
    'ticker-ielts': { en: '150+ IELTS resources', ar: '١٥٠+ مرجع للآيلتس' },

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

    'sidebar-vocabulary': { en: 'Vocabulary Bank', ar: 'بنك المفردات' },
    'sidebar-speaking': { en: 'AI Speaking Lab', ar: 'مختبر التحدث الذكي' },
    'sidebar-grammar': { en: 'Grammar Guide', ar: 'دليل القواعد' },
    'sidebar-settings': { en: 'Settings', ar: 'الإعدادات' },
    'sidebar-logout': { en: 'Logout', ar: 'تسجيل الخروج' },
    'sidebar-profile': { en: 'Profile', ar: 'الملف الشخصي' },
    'sidebar-notifications': { en: 'Notifications', ar: 'التنبيهات' },
    'sidebar-security': { en: 'Security', ar: 'الأمان' },
    'sidebar-data': { en: 'My Data', ar: 'بياناتي' },
    'sidebar-danger': { en: 'Danger Zone', ar: 'منطقة الخطر' },

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
    
    // ---- BLOG SECTION ----
    'blog-section-title-1': { en: 'Latest from the', ar: 'آخر المقالات من' },
    'blog-section-title-2': { en: 'Learning Blog', ar: 'مدونة التعلم' },
    'blog-section-desc': { en: 'Language tips, study strategies, and expert advice', ar: 'نصائح لغوية، استراتيجيات دراسية، ونصائح الخبراء' },
    'blog-view-all': { en: 'View All Articles →', ar: 'عرض جميع المقالات ←' },

    // ---- TOOLS SECTION ----
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

    // ---- AUTH ----
    'auth-welcome': { en: 'Welcome Back', ar: 'مرحباً بعودتك' },
    'auth-login-desc': { en: 'Log in to your account to access your courses and trackers.', ar: 'سجّل دخولك للوصول إلى دوراتك ومتتبعاتك.' },
    'auth-email': { en: 'Email Address', ar: 'البريد الإلكتروني' },
    'auth-password': { en: 'Password', ar: 'كلمة المرور' },
    'auth-login-btn': { en: 'Log In', ar: 'تسجيل الدخول' },
    'auth-signup-link': { en: 'Sign up free', ar: 'إنشاء حساب مجاني' },
    'auth-create-title': { en: 'Create Your Account', ar: 'أنشئ حسابك' },
    'auth-create-desc': { en: 'Start your language learning journey — 100% free.', ar: 'ابدأ رحلة تعلم اللغة الخاصة بك - مجانية ١٠٠٪.' },
    'auth-first-name': { en: 'First Name', ar: 'الاسم الأول' },
    'auth-last-name': { en: 'Last Name', ar: 'اسم العائلة' },
    'auth-login-success': { en: 'Login successful! Redirecting...', ar: 'تم تسجيل الدخول بنجاح! جاري التحويل...' },
    'auth-signup-success': { en: 'Account created! Welcome to LingoWise.', ar: 'تم إنشاء الحساب! مرحباً بك في لينغو وايز.' },

    // ---- DASHBOARD ----
    'dash-hi': { en: 'Hi', ar: 'مرحباً' },
    'dash-welcome': { en: 'Good morning, Student! ☀️', ar: 'صباح الخير، أيها الطالب! ☀️' },
    'dash-learning-time': { en: 'Learning Time ⏱️', ar: 'وقت التعلم ⏱️' },
    'dash-courses-done': { en: 'Courses Completed 🏆', ar: 'الدورات المكتملة 🏆' },
    'dash-vocab-mastery': { en: 'Vocab Mastery 🔢', ar: 'إتقان المفردات 🔢' },
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
    'dash-logout': { en: 'Log Out', ar: 'تسجيل الخروج' },

    // ---- SPEAKING LAB ----
    'lab-title': { en: 'AI Speaking Lab', ar: 'مختبر التحدث بالذكاء الاصطناعي' },
    'lab-desc': { en: 'Improve your fluency with real-time AI conversation partner.', ar: 'حسن طلاقتك مع شريك محادثة آلي في الوقت الفعلي.' },
    'lab-status': { en: 'Ready to chat', ar: 'جاهز للمحادثة' },
    'lab-feedback': { en: 'Session Feedback', ar: 'ملاحظات الجلسة' },
    'lab-topics': { en: 'Conversation Topics', ar: 'مواضيع المحادثة' },
    'lab-end': { en: 'End Session', ar: 'إنهاء الجلسة' },
    'lab-history': { en: 'History', ar: 'السجل' },
    'lab-settings': { en: 'Settings', ar: 'الإعدادات' },
    'lab-pronunciation': { en: 'Pronunciation', ar: 'النطق' },
    'lab-fluency': { en: 'Fluency', ar: 'الطلاقة' },
    'lab-more': { en: 'View More Topics →', ar: 'عرض المزيد من المواضيع ←' },

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

    // ---- BLOG CARDS ----
    'blog-card-8-title': { en: 'Mastering English Fluency: Tips for Busy Professionals 🚀', ar: 'إتقان طلاقة الإنجليزية: نصائح للمحترفين المشغولين 🚀' },
    'blog-card-8-desc': { en: 'How to integrate language learning into your daily routine effectively. 📈', ar: 'كيفية دمج تعلم اللغة في روتينك اليومي بفعالية. 📈' },
    'blog-card-9-title': { en: 'Common Grammar Pitfalls and How to Avoid Them', ar: 'أخطاء القواعد الشائعة وكيفية تجنبها' },
    'blog-card-9-desc': { en: 'Mastering complex tenses and nuances of modern English communication.', ar: 'إتقان الأزمنة المعقدة وفوارق التواصل بالإنجليزية الحديثة.' },
    'blog-card-10-title': { en: 'The Power of Spaced Repetition for Vocabulary Mastery 🔱', ar: 'قوة التكرار المتباعد لإتقان المفردات 🔱' },
    'blog-card-10-desc': { en: 'Why consistency matters more than intensity and how LingoWise can help.', ar: 'لماذا تهم الاستمرارية أكثر من الكثافة وكيف يساعد لينغو وايز.' },
    'blog-date-1': { en: 'Mar 8, 2026', ar: '٨ مارس ٢٠٢٦' },
    'blog-date-2': { en: 'Mar 6, 2026', ar: '٦ مارس ٢٠٢٦' },
    'blog-date-6': { en: 'Mar 4, 2026', ar: '٤ مارس ٢٠٢٦' },
    'blog-read-5m': { en: '5 min read', ar: '٥ دقائق للقراءة' },
    'blog-read-6m': { en: '6 min read', ar: '٦ دقائق للقراءة' },
    'blog-read-7m': { en: '7 min read', ar: '٧ دقائق للقراءة' },

    // ---- AI ASSISTANT ----
    'ai-name': { en: 'LingoWise AI', ar: 'مساعد لينغو وايز' },
    'ai-status': { en: '● Online · Language Tutor', ar: '● متصل · معلم لغة' },
    'ai-greeting': { en: "👋 Hi! I'm your <strong>LingoWise AI Tutor</strong>. Ask me about grammar, vocabulary, or practice speaking!", ar: '👋 مرحباً! أنا <strong>معلمك الذكي</strong>. اسألني عن القواعد، المفردات، أو تدرب على التحدث!' },
    'ai-placeholder': { en: 'Ask anything about English...', ar: 'اسأل أي شيء عن الإنجليزية...' },
    'ai-quick-grammar': { en: '📝 Grammar Check', ar: '📝 فحص القواعد' },
    'ai-quick-tip': { en: '💡 Study Tip', ar: '💡 نصيحة دراسية' },
    'ai-quick-speak': { en: '🎙️ Speak Practice', ar: '🎙️ ممارسة التحدث' },

    // ---- MODALS / LABELS ----
    'modal-add-word-title': { en: 'Add New Word', ar: 'إضافة كلمة جديدة' },
    'label-word': { en: 'Word / Phrase', ar: 'الكلمة / العبارة' },
    'label-translation': { en: 'Translation', ar: 'الترجمة' },
    'label-category': { en: 'Category', ar: 'الفئة' },
    'btn-save-word': { en: 'Save to Bank', ar: 'حفظ في البنك' },
    'dash-learning-time': { en: 'Learning Time', ar: 'وقت التعلم' },
    'dash-courses-done': { en: 'Courses Completed', ar: 'الدورات المنجزة' },
    'dash-vocab-mastery': { en: 'Vocab Mastery', ar: 'إتقان المفردات' },
    'dash-speaking-score': { en: 'Speaking Score', ar: 'درجة التحدث' },
    'dash-activity-chart': { en: 'Learning Activity', ar: 'نشاط التعلم' },
    'dash-active-courses': { en: 'Active Courses', ar: 'الدورات الحالية' },
    'dash-upcoming-labs': { en: 'Upcoming Labs', ar: 'المختبرات القادمة' },
    'dash-view-all': { en: 'View All', ar: 'عرض الكل' },
    'dash-welcome-sub': { en: 'Welcome back! Ready to continue your English journey?', ar: 'أهلاً بك مجدداً! هل أنت مستعد لمواصلة رحلتك؟' },
    'dash-user-rank': { en: 'Premium Learner', ar: 'متعلم متميز' }
};

function initLanguage() {
    const saved = localStorage.getItem('calcwise_lang') || 'en';
    applyLanguage(saved);
}

function applyLanguage(newLang) {
    lang = newLang;
    localStorage.setItem('calcwise_lang', lang);

    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('.lang-toggle .toggle-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.value === lang);
    });

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key] && translations[key][lang]) {
            if (translations[key][lang].includes('<')) {
                el.innerHTML = translations[key][lang];
            } else {
                el.textContent = translations[key][lang];
            }
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[key] && translations[key][lang]) {
            el.placeholder = translations[key][lang];
        }
    });

    updateAIAssistant();
}

function toggleLanguage(newLang) {
    applyLanguage(newLang);
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
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ===== AUTHENTICATION =====
function checkAuth() {
    const isLoggedIn = localStorage.getItem('calcwise_logged_in') === 'true';
    const user = JSON.parse(localStorage.getItem('calcwise_user') || 'null');
    const lang = localStorage.getItem('calcwise_lang') || 'en';
    const href = window.location.href;

    // Direct dashboard protection
    if (href.includes('dashboard.html') && !isLoggedIn) {
        window.location.replace('login.html');
        return;
    }

    const navActions = document.querySelector('.nav-actions');
    if (navActions && isLoggedIn) {
        if (navActions.querySelector('[data-i18n="nav-login"]')) {
            const dashText = lang === 'ar' ? 'لوحة التحكم' : 'Dashboard';
            const logoutText = translations['dash-logout'][lang] || 'Log Out';
            // Note: Keep language toggle in the dash header too
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

    if (user) {
        const userNameEl = document.getElementById('userName');
        if (userNameEl) userNameEl.textContent = user.firstName;
        
        const dashGreetingEl = document.getElementById('dashboardUser');
        if (dashGreetingEl) {
            const hiText = translations['dash-hi'][lang] || 'Hi';
            dashGreetingEl.textContent = `${hiText}, ${user.firstName} 👋`;
        }
    }

    if (document.getElementById('progressChart')) {
        initProgressChart();
    }
}

let progressChartInstance = null;
function initProgressChart() {
    const ctx = document.getElementById('progressChart').getContext('2d');
    if (progressChartInstance) progressChartInstance.destroy();

    const isAr = lang === 'ar';
    const labels = isAr 
        ? ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
        : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    progressChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: isAr ? 'وقت التعلم (دقائق)' : 'Learning Time (mins)',
                data: [30, 45, 60, 20, 90, 120, 45],
                borderColor: '#6c5ce7',
                backgroundColor: 'rgba(108, 92, 231, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } },
                x: { grid: { display: false } }
            }
        }
    });
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        showToast('error', 'Please fill in all fields.');
        return;
    }

    // Mock login for demo
    localStorage.setItem('calcwise_logged_in', 'true');
    localStorage.setItem('calcwise_user', JSON.stringify({ firstName: 'Student', email }));
    showToast('success', translations['auth-login-success'][lang] || 'Login successful!');
    setTimeout(() => window.location.href = 'dashboard.html', 1500);
}

async function handleSignup(e) {
    e.preventDefault();
    const firstName = document.getElementById('signup-first').value;
    const email = document.getElementById('signup-email').value;
    
    localStorage.setItem('calcwise_logged_in', 'true');
    localStorage.setItem('calcwise_user', JSON.stringify({ firstName, email }));
    showToast('success', translations['auth-signup-success'][lang] || 'Account created!');
    setTimeout(() => window.location.href = 'dashboard.html', 1500);
}

function handleLogout() {
    localStorage.removeItem('calcwise_logged_in');
    localStorage.removeItem('calcwise_user');
    showToast('success', 'Logged out successfully.');
    setTimeout(() => window.location.href = 'index.html', 1000);
}

// ===== DASHBOARD LOGIC =====
function initDashboard() {
    if (!document.getElementById('activeCoursesContainer')) return;
    updateCoursesUI();
    initDailyGoals();
    updateVocabUI();
    initUpcomingLabs();
}

function initUpcomingLabs() {
    const container = document.getElementById('upcomingLabs');
    if (!container) return;

    const isAr = lang === 'ar';
    const labs = [
        { 
            title: isAr ? 'دورة المصطلحات العامية' : 'Native Slang & Idioms',
            time: isAr ? 'يبدأ خلال ٤٥ دقيقة' : 'Starting in 45 minutes',
            icon: '🎙️', color: 'var(--info-bg)'
        },
        { 
            title: isAr ? 'التحضير المكثف للآيلتس' : 'IELTS Strategy Intensive',
            time: isAr ? 'غداً في ٦:٠٠ مساءً' : 'Tomorrow at 6:00 PM',
            icon: '📝', color: 'var(--warning-bg)'
        }
    ];

    container.innerHTML = labs.map(l => `
        <div class="activity-item">
            <div class="activity-icon" style="background:${l.color};">${l.icon}</div>
            <div class="activity-info">
                <div class="title">${l.title}</div>
                <div class="time">${l.time}</div>
            </div>
            <button class="btn btn-primary btn-xs">${isAr ? 'انضم' : 'Join'}</button>
        </div>
    `).join('');
}

function updateCoursesUI() {
    const container = document.getElementById('activeCoursesContainer');
    if (!container) return;

    const isAr = lang === 'ar';
    const active = [
        { 
            name: isAr ? COURSE_POOL[1].name.ar : COURSE_POOL[1].name.en, 
            progress: 65, color: 'var(--primary)' 
        },
        { 
            name: isAr ? COURSE_POOL[3].name.ar : COURSE_POOL[3].name.en, 
            progress: 42, color: 'var(--accent-teal)' 
        }
    ];

    container.innerHTML = active.map(c => `
        <div class="course-progress-item">
            <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-xs);">
                <span style="font-weight:600; font-size:0.9rem;">${c.name}</span>
                <span style="color:var(--primary-light); font-weight:700; font-size:0.85rem;">${c.progress}%</span>
            </div>
            <div style="height:8px; background:var(--bg-secondary); border-radius:4px; overflow:hidden;">
                <div style="width:${c.progress}%; height:100%; background:${c.color}; transition: width 0.3s ease;"></div>
            </div>
        </div>
    `).join('');
}

function initDailyGoals() {
    const container = document.getElementById('dailyGoalsContainer');
    if (!container) return;

    const isAr = lang === 'ar';
    const goals = [
        { 
            name: isAr ? 'المفردات الجديدة' : 'New Vocabulary', 
            current: 10, target: 10, done: true, icon: '✓', color: 'var(--success)',
            sub: isAr ? 'تم الإنجاز اليوم!' : 'Completed for today!'
        },
        { 
            name: isAr ? 'ممارسة التحدث' : 'Speaking Practice', 
            current: 5, target: 15, done: false, icon: '5m', color: 'var(--primary)',
            sub: isAr ? 'تبقى ١٠ دقائق' : '10 minutes remaining'
        }
    ];

    container.innerHTML = goals.map(g => `
        <div style="display:flex; align-items:center; gap:var(--space-md);">
            <div style="width:40px; height:40px; border-radius:50%; border:3px solid ${g.color}; display:flex; align-items:center; justify-content:center; color:${g.color}; font-weight:800; font-size:0.8rem;">${g.icon}</div>
            <div style="flex:1;">
                <div style="font-weight:600; font-size:0.9rem;">${g.name} (${g.current}/${g.target}${g.done ? '' : (isAr ? ' د' : ' min')})</div>
                <div style="font-size:0.75rem; color:var(--text-muted);">${g.sub}</div>
            </div>
        </div>
    `).join('');
}

function updateVocabUI() {
    const container = document.getElementById('recentVocabContainer');
    if (!container) return;

    const mockVocab = [
        { word: 'Resilience', trans: 'المرونة' },
        { word: 'Ambiguous', trans: 'غامض' },
        { word: 'Innovation', trans: 'ابتكار' },
        { word: 'Proactive', trans: 'مبادر' }
    ];

    container.innerHTML = mockVocab.map(v => `
        <div class="vocab-card-mini card text-center p-1" style="background:var(--bg-secondary);">
            <div style="font-weight:700; font-size:1rem;">${v.word}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${v.trans}</div>
        </div>
    `).join('');
}

function addVocabulary(e) {
    e.preventDefault();
    showToast('success', 'Word added to your bank! ✨');
    closeModal('addWordModal');
    e.target.reset();
}

// ===== LINGOWISE AI ASSISTANT =====
function initAIAssistant() {
    if (document.getElementById('aiAssistantBtn')) return;

    const btn = document.createElement('button');
    btn.id = 'aiAssistantBtn';
    btn.innerHTML = '🤖<span class="notif-dot"></span>';
    btn.onclick = toggleAIChat;
    document.body.appendChild(btn);

    const chat = document.createElement('div');
    chat.id = 'aiChat';
    chat.innerHTML = `
        <div class="ai-chat-header">
            <div class="ai-avatar">🤖</div>
            <div class="ai-info">
                <div class="name">LingoWise AI</div>
                <div class="status">● Online · Language Tutor</div>
            </div>
            <button class="ai-chat-close" onclick="toggleAIChat()">✕</button>
        </div>
        <div class="ai-chat-messages" id="aiMessages">
            <div class="ai-msg bot">👋 Hi! I'm your AI Tutor. Ask me anything!</div>
        </div>
        <div class="ai-quick-replies">
            <button class="ai-quick-btn" onclick="sendAIMessage('Explain Present Perfect')">📝 Grammar</button>
            <button class="ai-quick-btn" onclick="sendAIMessage('IELTS Speaking tips')">💡 Study Tip</button>
            <button class="ai-quick-btn" onclick="sendAIMessage('Practice conversation')">🎙️ Speak Practice</button>
        </div>
        <div class="ai-chat-input">
            <input type="text" id="aiInput" placeholder="Ask anything..." onkeydown="if(event.key==='Enter') sendAIMessage()">
            <button onclick="sendAIMessage()">➤</button>
        </div>
    `;
    document.body.appendChild(chat);
    updateAIAssistant();
}

function updateAIAssistant() {
    const btn = document.getElementById('aiAssistantBtn');
    const chat = document.getElementById('aiChat');
    if (!btn || !chat) return;

    const currentLang = localStorage.getItem('calcwise_lang') || 'en';
    
    btn.title = translations['ai-name'][currentLang];
    chat.querySelector('.name').textContent = translations['ai-name'][currentLang];
    chat.querySelector('.status').textContent = translations['ai-status'][currentLang];
    chat.querySelector('#aiInput').placeholder = translations['ai-placeholder'][currentLang];

    const qbtns = chat.querySelectorAll('.ai-quick-btn');
    if (qbtns.length >= 3) {
        qbtns[0].textContent = translations['ai-quick-grammar'][currentLang];
        qbtns[1].textContent = translations['ai-quick-tip'][currentLang];
        qbtns[2].textContent = translations['ai-quick-speak'][currentLang];
    }
}

function toggleAIChat() {
    const chat = document.getElementById('aiChat');
    if (chat) chat.classList.toggle('open');
    const dot = document.querySelector('#aiAssistantBtn .notif-dot');
    if (dot) dot.style.display = 'none';
}

const AI_RESPONSES = {
    'grammar|tense|verb|قواعد|زمن|فعل': {
        en: '📝 <strong>Grammar Tip:</strong> Focus on Present Simple, Continuous, and Perfect. <a href="grammar.html" style="color:var(--primary-light)">Guide →</a>',
        ar: '📝 <strong>نصيحة:</strong> ركّز على المضارع البسيط، المستمر، والتام. <a href="grammar.html" style="color:var(--primary-light)">الدليل ←</a>'
    },
    'vocabulary|word|vocab|مفردات|كلمات|كلمة': {
        en: '🔤 <strong>Vocab Hack:</strong> Use SRS (Spaced Repetition). <a href="vocabulary.html" style="color:var(--primary-light)">Bank →</a>',
        ar: '🔤 <strong>حيلة:</strong> استخدم نظام التكرار المتباعد. <a href="vocabulary.html" style="color:var(--primary-light)">البنك ←</a>'
    }
};

function getAIResponse(msg) {
    const currentLang = localStorage.getItem('calcwise_lang') || 'en';
    const lowerMsg = msg.toLowerCase();
    
    for (const [key, resp] of Object.entries(AI_RESPONSES)) {
        if (key.split('|').some(k => lowerMsg.includes(k))) {
            return resp[currentLang] || resp.en;
        }
    }
    
    const defaults = {
        en: ['🤔 Good question! Visit our blog for tips.', '💡 Practice makes perfect! Try the Speaking Lab.'],
        ar: ['🤔 سؤال جيد! زر مدونتنا للنصائح.', '💡 الممارسة سر الإتقان! جرب معمل التحدث.']
    };
    const arr = defaults[currentLang] || defaults.en;
    return arr[Math.floor(Math.random() * arr.length)];
}

function sendAIMessage(preset) {
    const input = document.getElementById('aiInput');
    const msg = preset || (input ? input.value.trim() : '');
    if (!msg) return;

    const messages = document.getElementById('aiMessages');
    messages.innerHTML += `<div class="ai-msg user">${msg}</div>`;
    if (input) input.value = '';

    const typing = document.createElement('div');
    typing.className = 'ai-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(typing);

    setTimeout(() => {
        typing.remove();
        messages.innerHTML += `<div class="ai-msg bot">${getAIResponse(msg)}</div>`;
        messages.scrollTop = messages.scrollHeight;
    }, 1000);
}

// ===== BLOG =====
function filterBlog(category, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    document.querySelectorAll('.blog-card').forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ===== UTILS =====
function openModal(id) {
    const m = document.getElementById(id);
    if (m) {
        m.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(id) {
    const m = document.getElementById(id);
    if (m) {
        m.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function updateLastUpdated() {
    const el = document.getElementById('lastUpdated');
    if (el) el.textContent = new Date().toLocaleDateString();
}
