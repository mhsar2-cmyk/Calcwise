let lang = localStorage.getItem('lingowise_lang') || 'ar';

const COURSE_POOL = [
    { 
        id: 'beg-1', 
        name: { en: 'Complete English Foundations', ar: 'أساسيات اللغة الإنجليزية الكاملة' }, 
        level: { en: 'Beginner', ar: 'مبتدئ' }, 
        category: { en: 'General', ar: 'عام' }, 
        icon: '🌱', 
        color: '#00d2d3',
        videoUrl: 'https://www.youtube.com/embed/juKDRv6S32I',
        lessons: [
            { id: 1, title: { en: 'Introduction to Tenses', ar: 'مقدمة في الأزمنة' }, duration: '12:05' },
            { id: 2, title: { en: 'Present Simple vs Continuous', ar: 'المضارع البسيط مقابل المستمر' }, duration: '15:20' },
            { id: 3, title: { en: 'Daily Life Vocabulary', ar: 'مفردات الحياة اليومية' }, duration: '10:45' }
        ]
    },
    { 
        id: 'int-1', 
        name: { en: 'Mastering English Grammar', ar: 'إتقان قواعد اللغة الإنجليزية' }, 
        level: { en: 'Intermediate', ar: 'متوسط' }, 
        category: { en: 'Grammar', ar: 'قواعد' }, 
        icon: '📝', 
        color: '#6c5ce7',
        videoUrl: 'https://www.youtube.com/embed/pSj7S9Wp17A',
        lessons: [
            { id: 1, title: { en: 'The Passive Voice', ar: 'المبني للمجهول' }, duration: '18:10' },
            { id: 2, title: { en: 'Conditional Sentences', ar: 'الجمل الشرطية' }, duration: '22:30' },
            { id: 3, title: { en: 'Relative Clauses', ar: 'جمل الوصل' }, duration: '14:50' }
        ]
    },
    { 
        id: 'adv-1', 
        name: { en: 'Advanced Conversation & Fluency', ar: 'المحادثة والطلاقة المتقدمة' }, 
        level: { en: 'Advanced', ar: 'متقدم' }, 
        category: { en: 'Speaking', ar: 'تحدث' }, 
        icon: '🎙️', 
        color: '#ff9f43',
        videoUrl: 'https://www.youtube.com/embed/6_fJ_Wv8n9U',
        lessons: [
            { id: 1, title: { en: 'Native-like Pronunciation', ar: 'نطق مثل المتحدثين الأصليين' }, duration: '25:00' },
            { id: 2, title: { en: 'Slang & Idioms', ar: 'العامية والاصطلاحات' }, duration: '19:15' },
            { id: 3, title: { en: 'Public Speaking in English', ar: 'التحدث أمام الجمهور بالإنجليزية' }, duration: '30:40' }
        ]
    },
    { 
        id: 'bus-1', 
        name: { en: 'English for Business Professionals', ar: 'الإنجليزية للمحترفين في الأعمال' }, 
        level: { en: 'Business', ar: 'أعمال' }, 
        category: { en: 'Workplace', ar: 'مكان العمل' }, 
        icon: '💼', 
        color: '#2e86de', 
        videoUrl: 'https://www.youtube.com/embed/nU0lS9T7mE0', 
        lessons: [
            { id: 1, title: { en: 'Business Email Writing', ar: 'كتابة رسائل البريد الإلكتروني للأعمال' }, duration: '10:00' },
            { id: 2, title: { en: 'Negotiation Phrases', ar: 'عبارات التفاوض' }, duration: '15:00' }
        ] 
    },
    { 
        id: 'ielt-1', 
        name: { en: 'IELTS Success Masterclass', ar: 'ماستر كلاس النجاح في الآيلتس' }, 
        level: { en: 'Advanced', ar: 'متقدم' }, 
        category: { en: 'Exams', ar: 'امتحانات' }, 
        icon: '🎓', 
        color: '#ee5253', 
        videoUrl: 'https://www.youtube.com/embed/juKDRv6S32I', 
        lessons: [
            { id: 1, title: { en: 'IELTS Speaking Intro', ar: 'مقدمة تحدث الآيلتس' }, duration: '15:00' },
            { id: 2, title: { en: 'Writing Task 2 Strategies', ar: 'استراتيجيات مهمة الكتابة 2' }, duration: '25:00' }
        ] 
    },
    { 
        id: 'acad-1', 
        name: { en: 'Academic Writing Excellence', ar: 'التميز في الكتابة الأكاديمية' }, 
        level: { en: 'Advanced', ar: 'متقدم' }, 
        category: { en: 'Writing', ar: 'كتابة' }, 
        icon: '✍️', 
        color: '#54a0ff', 
        videoUrl: 'https://www.youtube.com/embed/pSj7S9Wp17A', 
        lessons: [
            { id: 1, title: { en: 'Academic Essay Structure', ar: 'هيكل المقال الأكاديمي' }, duration: '20:00' },
            { id: 2, title: { en: 'Citations and Referencing', ar: 'الاقتباسات والمراجع' }, duration: '12:00' }
        ] 
    }
];

// ===== CORE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    initNavbar();
    initScrollReveal();
    initParticles();
    
    // Page-specific initializers
    if (document.getElementById('activeCoursesContainer')) initDashboard();
    if (document.getElementById('coursesGrid')) initCourses();
    if (document.getElementById('vocabularyGrid')) initVocabularyPage();
    if (document.getElementById('myCoursesGrid')) initMyCoursesPage();
    
    initAIAssistant();
    checkAuth();
    initSessionClock();
    updateLastUpdated();

    // Global Modal Click Background Close
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal(e.target.id);
        }
    });

    // Learning Time Increment
    if (document.getElementById('learningTime')) {
        setInterval(() => {
            let totalMin = parseFloat(localStorage.getItem('lingowise_total_min') || "750");
            totalMin += 1;
            localStorage.setItem('lingowise_total_min', totalMin);
            document.getElementById('learningTime').innerText = (totalMin / 60).toFixed(1) + " hrs";
        }, 60000);
    }
});

// ===== CORE UTILITIES =====
function initTheme() {
    const saved = localStorage.getItem('lingowise_theme') || 'dark';
    applyTheme(saved);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('lingowise_theme', theme);
    document.querySelectorAll('.theme-toggle i, .floating-toggles .theme-icon').forEach(icon => {
        // Simplified theme icon handling
    });
}
function toggleTheme(theme) { applyTheme(theme); }

function initLanguage() {
    const saved = localStorage.getItem('lingowise_lang') || 'ar';
    applyLanguage(saved);
}

function applyLanguage(newLang) {
    lang = newLang;
    localStorage.setItem('lingowise_lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('.lang-toggle .toggle-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.value === lang);
    });

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key] && translations[key][lang]) {
            if (translations[key][lang].includes('<')) el.innerHTML = translations[key][lang];
            else el.textContent = translations[key][lang];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[key] && translations[key][lang]) el.placeholder = translations[key][lang];
    });

    if (typeof updateAIAssistant === 'function') updateAIAssistant();
}
function toggleLanguage(l) { applyLanguage(l); }

function handleSignup(e) {
    e.preventDefault();
    const first = document.getElementById('signup-first').value;
    const last = document.getElementById('signup-last').value;
    const email = document.getElementById('signup-email').value;
    const pass = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;

    if (pass !== confirm) {
        showToast('error', translations['auth-error-match'][lang]);
        return;
    }

    // Simulate account creation
    const user = { firstName: first, lastName: last, email: email };
    localStorage.setItem('lingowise_user', JSON.stringify(user));
    localStorage.setItem('lingowise_logged_in', 'true');
    localStorage.setItem('lingowise_token', 'simulated-jwt-token');

    showToast('success', translations['auth-success-signup'][lang]);
    setTimeout(() => window.location.href = 'dashboard.html', 1500);
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;

    // Simulate login logic - just accept any valid looking email for demo
    if (email && pass.length >= 8) {
        const existingUser = JSON.parse(localStorage.getItem('lingowise_user') || '{}');
        const user = { 
            firstName: existingUser.firstName || 'Learner', 
            lastName: existingUser.lastName || '', 
            email: email 
        };
        
        localStorage.setItem('lingowise_user', JSON.stringify(user));
        localStorage.setItem('lingowise_logged_in', 'true');
        localStorage.setItem('lingowise_token', 'simulated-jwt-token');
        
        showToast('success', translations['auth-success-login'][lang]);
        setTimeout(() => window.location.href = 'dashboard.html', 1500);
    } else {
        showToast('error', translations['auth-error-invalid'][lang]);
    }
}

function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.toggle('mobile-open');
}

function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
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

function initParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 8 + 's';
        p.style.animationDuration = (6 + Math.random() * 6) + 's';
        container.appendChild(p);
    }
}

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

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('active');
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('active');
        if (id === 'videoPlayerModal') {
            const iframe = modal.querySelector('iframe');
            if (iframe) iframe.src = '';
        }
    }
}

function checkAuth() {
    const isLoggedIn = localStorage.getItem('lingowise_logged_in') === 'true';
    const href = window.location.href;
    const isPrivatePage = href.includes('dashboard.html') || href.includes('my-courses.html') || href.includes('vocabulary.html');
    
    if (isPrivatePage && !isLoggedIn) {
        window.location.replace('login.html');
        return;
    }
    updateAuthUI();
}

function handleLogout() {
    localStorage.removeItem('lingowise_logged_in');
    localStorage.removeItem('lingowise_token');
    localStorage.removeItem('lingowise_user');
    window.location.href = 'index.html';
}

function updateAuthUI() {
    const authContainer = document.getElementById('auth-container');
    const isLoggedIn = localStorage.getItem('lingowise_logged_in') === 'true';
    const user = JSON.parse(localStorage.getItem('lingowise_user') || '{}');
    const lang = localStorage.getItem('lingowise_lang') || 'en';

    if (authContainer) {
        if (isLoggedIn && user.firstName) {
            authContainer.innerHTML = `
                <div style="display:flex; align-items:center; gap:12px;">
                    <a href="dashboard.html" style="font-weight:600; font-size:0.9rem; color:var(--primary-light); text-decoration:none;">${translations['nav-welcome'][lang]}, ${user.firstName}</a>
                    <button class="btn btn-ghost btn-sm" onclick="handleLogout()">${translations['nav-logout'][lang]}</button>
                </div>
            `;
        } else {
            authContainer.innerHTML = `
                <a href="login.html" class="btn btn-ghost btn-sm" data-i18n="nav-login">${translations['nav-login'][lang]}</a>
                <a href="signup.html" class="btn btn-primary btn-sm" data-i18n="nav-get-started">${translations['nav-get-started'][lang]}</a>
            `;
        }
    }
}

function initSessionClock() {
    const clock = document.getElementById('sessionClock');
    if (!clock) return;
    let sec = 0;
    setInterval(() => {
        sec++;
        const h = Math.floor(sec / 3600);
        const m = Math.floor((sec % 3600) / 60);
        const s = sec % 60;
        clock.innerText = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
    }, 1000);
}

function updateLastUpdated() {
    const el = document.getElementById('lastUpdated');
    if (el) el.textContent = new Date().toLocaleString();
}

// ===== TRANSLATIONS =====
const translations = {
    'nav-home': { en: 'Home', ar: 'الرئيسية' },
    'nav-courses': { en: 'Courses', ar: 'الدورات' },
    'nav-blog': { en: 'Blog', ar: 'المدونة' },
    'nav-community': { en: 'Community', ar: 'المجتمع' },
    'nav-login': { en: 'Log In', ar: 'تسجيل الدخول' },
    'nav-get-started': { en: 'Get Started', ar: 'ابدأ الآن' },
    'nav-signup': { en: 'Sign Up', ar: 'إنشاء حساب' },
    'nav-logout': { en: 'Logout', ar: 'تسجيل الخروج' },
    'nav-welcome': { en: 'Welcome', ar: 'مرحباً' },
    'sidebar-dashboard': { en: 'Dashboard', ar: 'لوحة التحكم' },
    'sidebar-courses': { en: 'My Courses', ar: 'دوراتي' },
    'sidebar-vocabulary': { en: 'Vocabulary Bank', ar: 'بنك المفردات' },
    'sidebar-speaking': { en: 'AI Speaking Lab', ar: 'مختبر التحدث' },
    'sidebar-grammar': { en: 'Grammar Guide', ar: 'دليل القواعد' },
    
    'hero-badge': { en: 'New: AI Conversation Practice Now Live!', ar: 'جديد: ممارسة المحادثة متاحة الآن!' },
    'hero-title-1': { en: 'Unlock Your Potential', ar: 'أطلق العنان لإمكانياتك' },
    'hero-title-2': { en: 'English', ar: 'اللغة الإنجليزية' },
    'hero-title-3': { en: 'Mastery Awaits', ar: 'في انتظارك' },
    'hero-desc': { en: 'Master English with interactive courses, real-time progress tracking, and personalized learning paths.', ar: 'أتقن الإنجليزية من خلال دورات تفاعلية وتتبع التقدم في الوقت الفعلي ومسارات تعلم مخصصة.' },
    'hero-cta-1': { en: 'Start Learning for Free →', ar: 'ابدأ التعلم مجاناً ←' },
    'hero-cta-2': { en: 'View Courses', ar: 'عرض الدورات' },
    
    'levels-title-1': { en: 'Choose Your', ar: 'اختر' },
    'levels-title-2': { en: 'Learning Level', ar: 'مستوى التعلم' },
    'levels-desc': { en: 'From beginner to professional, we have a path for every learner.', ar: 'من المبتدئ إلى المحترف، لدينا مسار لكل متعلم.' },
    
    'dash-hi': { en: 'Hi', ar: 'مرحباً' },
    'dash-welcome': { en: 'Good morning, Student! ☀️', ar: 'صباح الخير، أيها الطالب! ☀️' },
    'dash-learning-time': { en: 'Learning Time ⏱️', ar: 'وقت التعلم ⏱️' },
    'dash-courses-done': { en: 'Courses Completed 🏆', ar: 'الدورات المكتملة 🏆' },
    'dash-vocab-mastery': { en: 'Vocab Mastery 🔤', ar: 'إتقان المفردات 🔤' },
    'dash-speaking-score': { en: 'Speaking Score 🎙️', ar: 'درجة التحدث 🎙️' },
    'dash-active-courses': { en: 'Current Courses', ar: 'الدورات الحالية' },
    'dash-daily-goals': { en: 'Daily Learning Goals', ar: 'أهداف التعلم اليومية' },
    'dash-recent-vocab': { en: 'Recently Learned Words', ar: 'كلمات تعلمتها مؤخراً' },
    
    'course-enroll': { en: 'Start Lesson', ar: 'ابدأ الدرس' },
    'course-details': { en: 'Course Details', ar: 'تفاصيل الدورة' },
    'course-lessons': { en: 'Lessons', ar: 'الدروس' },
    'course-resume': { en: 'Resume Course', ar: 'متابعة الدورة' },
    'course-watch-again': { en: 'Watch Again', ar: 'شاهد مجدداً' },
    'course-status-in-progress': { en: 'In Progress', ar: 'قيد التنفيذ' },
    'course-status-completed': { en: 'Completed', ar: 'مكتمل' },
    
    'vocab-add-btn': { en: '+ Add Word', ar: '+ إضافة كلمة' },
    'vocab-empty': { en: 'Your vocabulary bank is empty.', ar: 'بنك المفردات الخاص بك فارغ.' },
    'vocab-search-ph': { en: 'Search words...', ar: 'ابحث عن كلمات...' },
    
    'ai-name': { en: 'LingoWise AI', ar: 'مساعد لينغو وايز' },
    'ai-status': { en: '● Online · Language Tutor', ar: '● متصل · معلم لغة' },
    'ai-greeting': { en: "👋 Hi! I'm your AI Tutor. Ask me about grammar, words, or practice!", ar: '👋 مرحباً! أنا معلمك الذكي. اسألني عن القواعد أو الكلمات أو مارس اللغة!' },
    'ai-placeholder': { en: 'Ask anything...', ar: 'اسأل أي شيء...' },
    'ai-quick-grammar': { en: '📝 Grammar', ar: '📝 القواعد' },
    'ai-quick-tip': { en: '💡 Study Tip', ar: '💡 نصيحة' },
    'ai-quick-speak': { en: '🎙️ Speak', ar: '🎙️ تحدث' },

    'speaking-listening': { en: 'Listening...', ar: 'جاري الاستماع...' },
    'speaking-analyzing': { en: 'Analyzing...', ar: 'جاري التحليل...' },
    'speaking-complete': { en: 'Analysis Complete!', ar: 'اكتمل التحليل!' },
    'speaking-ready': { en: 'Ready to practice? Click the button.', ar: 'جاهز للممارسة؟ اضغط على الزر.' },
    'speaking-transcript-hint': { en: 'Your speech will appear here...', ar: 'سيظهر كلامك هنا...' },
    'speaking-hold': { en: 'Hold button to speak', ar: 'استمر في الضغط للتحدث' },
    'speaking-live-feedback': { en: 'Live Feedback', ar: 'تقييم فوري' },
    // Home Page Additions
    'level-beginner-title': { en: 'Beginner (A1-A2)', ar: 'مستوى مبتدئ (A1-A2)' },
    'level-beginner-desc': { en: 'Build a strong foundation with essential vocabulary and basic grammar.', ar: 'ابنِ أساساً قوياً مع المفردات الأساسية والقواعد البسيطة.' },
    'level-intermediate-title': { en: 'Intermediate (B1-B2)', ar: 'مستوى متوسط (B1-B2)' },
    'level-intermediate-desc': { en: 'Expand your fluency and engage in sophisticated discussions.', ar: 'وسع طلاقتك وشارك في نقاشات أكثر تعقيداً.' },
    'level-advanced-title': { en: 'Advanced (C1-C2)', ar: 'مستوى متقدم (C1-C2)' },
    'level-advanced-desc': { en: 'Refine your nuances and master academic English.', ar: 'أتقن الفروق الدقيقة واللغة الأكاديمية.' },
    'level-business-title': { en: 'Business English', ar: 'الإنجليزية للأعمال' },
    'level-business-desc': { en: 'Professional communication and technical terminology for your career.', ar: 'التواصل المهني والمصطلحات التقنية لمسارك الوظيفي.' },
    'footer-tagline': { en: 'Your all-in-one English language learning platform.', ar: 'منصتك الشاملة لتعلم اللغة الإنجليزية.' },
    'footer-copyright': { en: '© 2026 LingoWise. All rights reserved.', ar: '© 2026 لينغو وايز. جميع الحقوق محفوظة.' },
    'stats-title-1': { en: 'Join a', ar: 'انضم إلى' },
    'stats-title-2': { en: 'Global Community', ar: 'مجتمع عالمي' },
    'stats-desc': { en: 'Empowering learners from every corner of the world.', ar: 'تمكين المتعلمين من كل ركن في العالم.' },
    'features-title-1': { en: 'Why Choose', ar: 'لماذا تختار' },
    'features-title-2': { en: 'LingoWise', ar: 'لينغو وايز' },
    'features-desc': { en: 'Innovative tools designed to make language learning effective and fun', ar: 'أدوات مبتكرة مصممة لجعل تعلم اللغة فعالاً وممتعاً' },
    
    // Blog Page
    'blog-hero-title': { en: 'Learning Blog', ar: 'مدونة التعلم' },
    'blog-hero-sub': { en: 'Expert language tips, study strategies, and guides.', ar: 'نصائح لغوية من الخبراء، استراتيجيات دراسية، وأدلة.' },
    'filter-all': { en: 'All', ar: 'الكل' },
    'filter-grammar': { en: 'Grammar', ar: 'القواعد' },
    'filter-education': { en: 'Study Tips', ar: 'نصائح دراسية' },
    'blog-newsletter-title-1': { en: 'Stay', ar: 'ابقَ' },
    'blog-newsletter-title-2': { en: 'Informed', ar: 'على اطلاع' },
    'blog-newsletter-desc': { en: 'Get weekly language learning tips delivered to your inbox.', ar: 'احصل على نصائح تعلم اللغة أسبوعياً في بريدك الوارد.' },
    'blog-subscribe': { en: 'Subscribe', ar: 'اشترك الآن' },
    
    // Blog Cards
    'blog-card-1-title': { en: 'Top 10 Phrasal Verbs for Business', ar: 'أهم 10 أفعال مركبة للأعمال' },
    'blog-card-1-desc': { en: 'Master common expressions in professional settings.', ar: 'أتقن التعبيرات الشائعة في الأماكن المهنية.' },
    'blog-card-2-title': { en: 'IELTS Preparation Guide 2026', ar: 'دليل التحضير لـ IELTS 2026' },
    'blog-card-2-desc': { en: 'Expert strategies for a higher score on your first try.', ar: 'استراتيجيات الخبراء للحصول على درجة أعلى من المحاولة الأولى.' },
    'blog-card-3-title': { en: 'Mastering Pronunciation', ar: 'إتقان النطق' },
    'blog-card-3-desc': { en: 'Techniques used by native speakers for clear speech.', ar: 'تقنيات يستخدمها المتحدثون الأصليون للتحدث بوضوح.' },
    'blog-card-8-title': { en: 'English Fluency for Professionals', ar: 'الطلاقة الإنجليزية للمحترفين' },
    'blog-card-8-desc': { en: 'How to integrate learning into your busy schedule.', ar: 'كيفية دمج التعلم في جدولك المزدحم.' },
    'blog-card-9-title': { en: 'Common Grammar Pitfalls', ar: 'أخطاء القواعد الشائعة' },
    'blog-card-9-desc': { en: 'How to avoid them and speak more naturally.', ar: 'كيفية تجنبها والتحدث بشكل طبيعي أكثر.' },
    'blog-card-10-title': { en: 'Spaced Repetition Mastery', ar: 'إتقان التكرار المتباعد' },
    'blog-card-10-desc': { en: 'Why consistency is key to vocabulary growth.', ar: 'لماذا الاستمرارية هي مفتاح نمو المفردات.' },
    'blog-view-all': { en: 'View All Articles →', ar: 'عرض جميع المقالات ←' },
    'blog-date-1': { en: 'Mar 8, 2026', ar: '٨ مارس ٢٠٢٦' },
    'blog-date-2': { en: 'Mar 6, 2026', ar: '٦ مارس ٢٠٢٦' },
    'blog-date-6': { en: 'Mar 4, 2026', ar: '٤ مارس ٢٠٢٦' },
    'blog-date-8': { en: 'Feb 25, 2026', ar: '٢٥ فبراير ٢٠٢٦' },
    'blog-date-9': { en: 'Feb 22, 2026', ar: '٢٢ فبراير ٢٠٢٦' },
    'blog-date-10': { en: 'Feb 20, 2026', ar: '٢٠ فبراير ٢٠٢٦' },

    'auth-email': { en: 'Email Address', ar: 'البريد الإلكتروني' },
    'auth-welcome': { en: 'Welcome Back', ar: 'مرحباً بعودتك' },
    'auth-login-desc': { en: 'Access your learning progress.', ar: 'الوصول إلى تقدمك في التعلم.' },

    // About Page
    'about-title': { en: 'Empowering Your Language Future', ar: 'تمكين مستقبلك اللغوي' },
    'about-subtitle': { en: 'Professional tools, 100% free.', ar: 'أدوات احترافية، مجانية ١٠٠٪.' },
    'about-mission-title': { en: 'Our Mission', ar: 'مهمتنا' },
    'value-transparency-title': { en: 'Accessibility', ar: 'سهولة الوصول' },
    'value-speed-title': { en: 'Innovation', ar: 'الابتكار' },
    'value-reliability-title': { en: 'Community', ar: 'المجتمع' },
    'footer-learning': { en: 'Learning Hub', ar: 'مركز التعلم' },

    // Community Page
    'community-title': { en: 'Join the Community', ar: 'انضم للمجتمع' },
    'community-subtitle': { en: 'Connect with thousands of learners.', ar: 'تواصل مع آلاف المتعلمين.' },
    'community-groups': { en: 'Study Groups', ar: 'مجموعات الدراسة' },
    'community-events': { en: 'Live Events', ar: 'فعاليات مباشرة' },
    'comm-hero-title': { en: 'Global', ar: 'مجتمع' },
    'comm-hero-title-2': { en: 'Community', ar: 'عالمي' },
    'comm-hero-sub': { en: 'Connect with fellow learners and practice together.', ar: 'تواصل مع زملائك المتعلمين وتدربوا معاً.' },
    'comm-groups-title': { en: 'Active Study Groups', ar: 'مجموعات الدراسة النشطة' },
    'comm-members': { en: 'members', ar: 'عضو' },
    'comm-online': { en: 'Online Now', ar: 'متصل الآن' },
    'comm-join-btn': { en: 'Join Group', ar: 'انضم للمجموعة' },
    'comm-events-title': { en: 'Upcoming Live Events', ar: 'الفعاليات المباشرة القادمة' },
    'comm-event-reminder': { en: 'Set Reminder', ar: 'تعيين تذكير' },

    // Contact & Misc
    'contact-title': { en: 'Get in Touch', ar: 'تواصل معنا' },
    'contact-desc': { en: 'We are here to help you.', ar: 'نحن هنا لمساعدتك.' },
    'contact-send': { en: 'Send Message', ar: 'إرسال الرسالة' },
    'contact-name': { en: 'Your Name', ar: 'اسمك' },
    'contact-msg': { en: 'Your Message', ar: 'رسالتك' },
    'sidebar-community': { en: 'Community', ar: 'المجتمع' },
    'dash-logout': { en: 'Log Out', ar: 'تسجيل الخروج' },
    
    // Contact Details
    'contact-office': { en: 'Our Office', ar: 'مكتبنا' },
    'contact-riyadh': { en: 'Riyadh, Saudi Arabia', ar: 'الرياض، المملكة العربية السعودية' },
    'contact-email-us': { en: 'Email Us', ar: 'راسلنا' },
    'contact-follow-us': { en: 'Follow Us', ar: 'تابعنا' },
    'contact-full-name': { en: 'Full Name', ar: 'الاسم الكامل' },
    'contact-subject': { en: 'Subject', ar: 'الموضوع' },
    'contact-msg-label': { en: 'Message', ar: 'الرسالة' },
    'contact-success': { en: 'Message sent! We will get back to you soon.', ar: 'تم إرسال الرسالة! سنقوم بالرد عليك قريباً.' },
    
    // Common Headings
    'nav-home': { en: 'Home', ar: 'الرئيسية' },
    'nav-courses': { en: 'Courses', ar: 'الدورات' },
    'nav-blog': { en: 'Blog', ar: 'المدونة' },
    'nav-community': { en: 'Community', ar: 'المجتمع' },
    
    // Grammar
    'grammar-hero-title': { en: 'Grammar', ar: 'دليل' },
    'grammar-hero-title-2': { en: 'Guide', ar: 'القواعد' },
    'grammar-hero-sub': { en: 'Essential grammar rules explained simply.', ar: 'قواعد اللغة الأساسية مشروحة ببساطة.' },
    'grammar-topic-tenses': { en: 'Verb Tenses', ar: 'أزمنة الأفعال' },
    'grammar-topic-tenses-desc': { en: 'Master Past, Present, and Future forms.', ar: 'أتقن صيغ الماضي والمضارع والمستقبل.' },
    'grammar-topic-parts': { en: 'Parts of Speech', ar: 'أقسام الكلام' },
    'grammar-topic-parts-desc': { en: 'Nouns, verbs, adjectives, and more.', ar: 'الأسماء والأفعال والصفات والمزيد.' },
    'grammar-topic-sentence': { en: 'Sentence Structure', ar: 'بناء الجملة' },
    'grammar-topic-sentence-desc': { en: 'Clauses, phrases, and complex types.', ar: 'الجمل والعبارات والأنواع المعقدة.' },
    'grammar-topic-punctuation': { en: 'Punctuation', ar: 'علامات الترقيم' },
    'grammar-topic-punctuation-desc': { en: 'Commas, semicolons, and rules.', ar: 'الفاصلة والفاصلة المنقوطة والقواعد.' },
    'grammar-view-guide': { en: 'View Guide', ar: 'عرض الدليل' },
    'filter-business': { en: 'Business', ar: 'الأعمال' },
    'filter-beginner': { en: 'Beginner', ar: 'مبتدئ' },
    'filter-intermediate': { en: 'Intermediate', ar: 'متوسط' },
    'filter-advanced': { en: 'Advanced', ar: 'متقدم' },
    'courses-hero-title': { en: 'Our English', ar: 'دوراتنا في' },
    'courses-hero-title-2': { en: 'Courses', ar: 'اللغة الإنجليزية' },
    'courses-hero-sub': { en: 'Comprehensive learning paths designed to take you from beginner to native-like fluency.', ar: 'مسارات تعلم شاملة مصممة لتنقلك من المستوى المبتدئ إلى الطلاقة.' },
    'cta-title-1': { en: 'Ready to Master English?', ar: 'جاهز لإتقان الإنجليزية؟' },
    'cta-desc': { en: 'Join thousands of learners achieving fluency with LingoWise. Your global career starts here.', ar: 'انضم إلى آلاف المتعلمين الذين يحققون الطلاقة مع لينغو وايز. مسيرتك العالمية تبدأ من هنا.' },
    'stat-learners': { en: 'Active Learners', ar: 'متعلم نشط' },
    'stat-countries': { en: 'Countries Represented', ar: 'دولة ممثلة' },
    'stat-satisfaction': { en: 'Success Rate', ar: 'معدل النجاح' },
    'feature-1-title': { en: 'AI Speaking Lab ⚡', ar: 'مختبر التحدث الذكي ⚡' },
    'feature-1-desc': { en: 'Practice real conversations with our AI tutor and get instant feedback on pronunciation.', ar: 'مارس محادثات حقيقية مع مدرسنا الذكي واحصل على تعليقات فورية على نطقك.' },
    'feature-2-title': { en: 'Progress Trackers 🎓', ar: 'تتبع التقدم 🎓' },
    'feature-2-desc': { en: 'Visualize your growth with detailed analytics for vocabulary, grammar, and fluency.', ar: 'تصور نموك مع تحليلات مفصلة للمفردات والقواعد والطلاقة.' },
    'dash-learner-default': { en: 'Learner', ar: 'متعلم' },
    'sidebar-overview': { en: 'Learning Hub', ar: 'مركز التعلم' },
    'sidebar-resources': { en: 'Resources', ar: 'المصادر' },
    'sidebar-settings': { en: 'Settings', ar: 'الإعدادات' },
    'sidebar-logout': { en: 'Log Out', ar: 'تسجيل الخروج' },
    'dash-streak-title': { en: 'Current Streak 🔥', ar: 'النشاط الحالي 🔥' },
    'dash-streak-sub': { en: 'Keep it up! Reach 7 for a bonus.', ar: 'استمر! صل إلى 7 أيام للحصول على مكافأة.' },
    'dash-welcome-sub': { en: 'Track your progress and continue your journey.', ar: 'تتبع تقدمك وواصل رحلتك.' },
    'dash-browse-courses': { en: 'Browse Courses', ar: 'تصفح الدورات' },
    'dash-stat-time-sub': { en: '+2.5 hrs this week', ar: '+2.5 ساعة هذا الأسبوع' },
    'dash-stat-courses-sub': { en: 'Next: Business English', ar: 'التالي: الإنجليزية للأعمال' },
    'dash-stat-vocab-sub': { en: '↑ 15 new today', ar: '↑ 15 كلمة جديدة اليوم' },
    'dash-stat-speak-sub': { en: '↑ Improved 5%', ar: '↑ تحسن بنسبة 5%' },
    'dash-view-all': { en: 'View All', ar: 'عرض الكل' },
    'dash-vocab-add': { en: '+ Add Word', ar: '+ إضافة كلمة' },
    'modal-add-word-title': { en: 'Add New Word', ar: 'إضافة كلمة جديدة' },
    'label-word': { en: 'Word / Phrase', ar: 'الكلمة / العبارة' },
    'label-translation': { en: 'Translation', ar: 'الترجمة' },
    'label-category': { en: 'Category', ar: 'الفئة' },
    'btn-save-word': { en: 'Save to Bank', ar: 'حفظ في البنك' },
    'footer-account': { en: 'Account', ar: 'الحساب' },
    'auth-error-match': { en: 'Passwords do not match!', ar: 'كلمات المرور غير متطابقة!' },
    'auth-success-signup': { en: 'Account created! Redirecting...', ar: 'تم إنشاء الحساب! جاري التحويل...' },
    'auth-success-login': { en: 'Welcome back! Redirecting...', ar: 'مرحباً بعودتك! جاري التحويل...' },
    'auth-error-invalid': { en: 'Invalid email or password.', ar: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' },
    'unit-hrs': { en: 'hrs', ar: 'ساعة' },
    'dash-goal-vocab': { en: 'New Vocabulary', ar: 'مفردات جديدة' },
    'dash-goal-speak': { en: 'Speaking Practice', ar: 'ممارسة التحدث' },
    'dash-goal-done': { en: 'Completed for today!', ar: 'اكتمل لهذا اليوم!' },
    'dash-goal-rem': { en: 'minutes remaining', ar: 'دقيقة متبقية' },
};

// ===== DASHBOARD LOGIC =====
function initDashboard() {
    const user = JSON.parse(localStorage.getItem('lingowise_user') || '{}');
    const hiEl = document.getElementById('dashboardUser');
    const nameEl = document.getElementById('userName');
    const defaultName = translations['dash-learner-default'][lang];
    if (hiEl) hiEl.innerText = `${translations['dash-hi'][lang]}, ${user.firstName || defaultName} 👋`;
    if (nameEl) nameEl.innerText = user.firstName || defaultName;
    
    updateDashboardStats();
    updateActiveCourses();
    updateVocabUIStrip();
}

function updateDashboardStats() {
    const vocabCount = getVocab().length;
    if (document.getElementById('vocabMastery')) document.getElementById('vocabMastery').innerText = vocabCount;
    const totalMin = parseFloat(localStorage.getItem('lingowise_total_min') || "750");
    const hrsUnit = translations['unit-hrs'][lang];
    if (document.getElementById('learningTime')) document.getElementById('learningTime').innerText = `${(totalMin / 60).toFixed(1)} ${hrsUnit}`;
    
    const streak = localStorage.getItem('lingowise_streak') || '5';
    const streakEl = document.querySelector('[data-i18n="dash-streak-days"]');
    if (streakEl) streakEl.innerText = lang === 'ar' ? `${streak} أيام` : `${streak} Days`;
}

function updateActiveCourses() {
    const container = document.getElementById('activeCoursesContainer');
    if (!container) return;
    const activeIds = ['beg-1', 'int-1']; // Dynamic IDs in real app
    const active = activeIds.map(id => {
        const c = COURSE_POOL.find(item => item.id === id);
        return { ...c, progress: id === 'beg-1' ? 85 : 45 };
    });
    container.innerHTML = active.map(c => `
        <div class="course-progress-item" onclick="playLesson('${c.id}')" style="cursor:pointer;">
            <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                <span style="font-weight:600; font-size:0.9rem;">${c.name[lang]}</span>
                <span style="color:${c.color}; font-weight:700; font-size:0.85rem;">${c.progress}%</span>
            </div>
            <div style="height:8px; background:var(--bg-secondary); border-radius:4px; overflow:hidden;">
                <div style="width:${c.progress}%; height:100%; background:${c.color}"></div>
            </div>
        </div>
    `).join('');
}

// ===== COURSES LOGIC =====
function initCourses() {
    const params = new URLSearchParams(window.location.search);
    const filter = params.get('level') || 'all';
    renderCoursesGrid(filter);
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.level === filter);
        btn.onclick = () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCoursesGrid(btn.dataset.level);
        };
    });
}

function renderCoursesGrid(level) {
    const container = document.getElementById('coursesGrid');
    if (!container) return;
    const filtered = level === 'all' ? COURSE_POOL : COURSE_POOL.filter(c => c.level.en.toLowerCase() === level.toLowerCase());
    container.innerHTML = filtered.map(c => `
        <div class="card course-card reveal active">
            <div class="course-icon" style="background:${c.color}20; color:${c.color}">${c.icon}</div>
            <div class="course-tag" style="background:${c.color}15; color:${c.color}">${c.level[lang]}</div>
            <h3>${c.name[lang]}</h3>
            <div class="course-meta">📚 ${c.lessons.length} ${lang === 'ar' ? 'دروس' : 'Lessons'} • ⏱️ 12h</div>
            <button class="btn btn-primary btn-sm w-full mt-2" onclick="playLesson('${c.id}')">${translations['course-enroll'][lang]}</button>
        </div>
    `).join('');
}

function playLesson(id) {
    const c = COURSE_POOL.find(item => item.id === id);
    if (!c) return;
    if (!document.getElementById('videoPlayerModal')) injectVideoModal();
    document.getElementById('playerCourseTitle').innerText = c.name[lang];
    document.getElementById('lessonIframe').src = c.videoUrl;
    const list = document.getElementById('playerLessonList');
    list.innerHTML = c.lessons.map((l, i) => `
        <div class="lesson-item ${i === 0 ? 'active' : ''}" onclick="changeVideo('${c.videoUrl}', this)">
            <div class="lesson-num">${i + 1}</div>
            <div class="lesson-info">
                <div class="lesson-title">${l.title[lang]}</div>
                <div class="lesson-duration">⏱️ ${l.duration}</div>
            </div>
        </div>
    `).join('');
    openModal('videoPlayerModal');
}

function changeVideo(url, el) {
    document.getElementById('lessonIframe').src = url;
    document.querySelectorAll('.lesson-item').forEach(item => item.classList.remove('active'));
    el.classList.add('active');
}

function injectVideoModal() {
    const html = `
        <div id="videoPlayerModal" class="modal-overlay">
            <div class="modal video-player-content" style="max-width:1100px; padding:0; overflow:hidden;">
                <div class="player-grid">
                    <div class="player-main">
                        <div class="player-header">
                            <h3 id="playerCourseTitle" style="margin:0; font-size:1.1rem;">Course</h3>
                            <button class="close-modal" onclick="closeModal('videoPlayerModal')" style="font-size:1.2rem; opacity:0.6; cursor:pointer; border:none; background:none; color:white;">✕</button>
                        </div>
                        <div class="video-container">
                            <iframe id="lessonIframe" src="" allowfullscreen frameborder="0"></iframe>
                        </div>
                    </div>
                    <div class="player-sidebar">
                        <h4 style="margin-bottom:var(--space-md); font-size:0.85rem; opacity:0.7;">COURSE LESSONS</h4>
                        <div id="playerLessonList" class="lesson-list"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
}

// ===== VOCABULARY LOGIC =====
function getVocab() {
    const defaults = [{ id:'1', word: 'Resilience', translation: 'المرونة', category: 'General', date: '2026-03-10' }];
    return JSON.parse(localStorage.getItem('lingowise_vocab')) || defaults;
}
function saveVocab(v) { localStorage.setItem('lingowise_vocab', JSON.stringify(v)); }

function initVocabularyPage() { renderVocabGrid(); }

function renderVocabGrid(filterTerm = '', filterCat = 'all') {
    const grid = document.getElementById('vocabularyGrid');
    if (!grid) return;
    const items = getVocab().filter(v => {
        const matchesTerm = v.word.toLowerCase().includes(filterTerm.toLowerCase()) || v.translation.toLowerCase().includes(filterTerm.toLowerCase());
        const matchesCat = filterCat === 'all' || v.category.toLowerCase() === filterCat.toLowerCase();
        return matchesTerm && matchesCat;
    });
    
    if (items.length === 0) {
        grid.innerHTML = `<div class="text-center p-3" style="grid-column:1/-1;">${translations['vocab-empty'][lang]}</div>`;
        return;
    }
    
    grid.innerHTML = items.map(v => `
        <div class="card vocab-card reveal active">
            <button class="delete-btn" onclick="deleteWord('${v.id}')">✕</button>
            <div class="vocab-word">${v.word}</div>
            <div class="vocab-translation">${v.translation}</div>
            <div class="vocab-footer">
                <span class="vocab-tag">${v.category}</span>
                <span class="vocab-date">${v.date}</span>
            </div>
        </div>
    `).join('');
}

function handleVocabSearch(q) { 
    const cat = document.getElementById('vocabFilterCat')?.value || 'all';
    renderVocabGrid(q, cat); 
}
function handleVocabFilter(c) {
    const q = document.getElementById('vocabSearch')?.value || '';
    renderVocabGrid(q, c);
}

function addVocabulary(e) {
    if(e) e.preventDefault();
    const word = document.getElementById('vocab-word').value;
    const trans = document.getElementById('vocab-translation').value;
    const cat = document.getElementById('vocab-category').value;
    if(!word || !trans) return;
    const vocab = getVocab();
    vocab.unshift({ id: Date.now().toString(), word, translation: trans, category: cat, date: new Date().toISOString().split('T')[0] });
    saveVocab(vocab);
    showToast('success', 'Word added!');
    closeModal('addWordModal');
    if (document.getElementById('vocabularyGrid')) renderVocabGrid();
    updateVocabUIStrip();
}

function deleteWord(id) {
    let vocab = getVocab();
    vocab = vocab.filter(v => v.id !== id);
    saveVocab(vocab);
    renderVocabGrid();
    updateVocabUIStrip();
}

function updateVocabUIStrip() {
    const container = document.getElementById('recentVocabContainer');
    if (!container) return;
    const vocab = getVocab().slice(0, 4);
    container.innerHTML = vocab.map(v => `
        <div class="vocab-card-mini card p-1" style="background:var(--bg-secondary);">
            <div style="font-weight:700;">${v.word}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${v.translation}</div>
        </div>
    `).join('');
    if (document.getElementById('vocabMastery')) document.getElementById('vocabMastery').innerText = getVocab().length;
}

// ===== MY COURSES LOGIC =====
function initMyCoursesPage() { renderMyCoursesGrid(); }

function renderMyCoursesGrid() {
    const grid = document.getElementById('myCoursesGrid');
    if (!grid) return;
    const myIds = ['beg-1', 'int-1'];
    const myItems = myIds.map(id => {
        const c = COURSE_POOL.find(item => item.id === id);
        return { ...c, progress: id === 'beg-1' ? 85 : 100, status: id === 'beg-1' ? 'in-progress' : 'completed' };
    });
    grid.innerHTML = myItems.map(c => `
        <div class="card p-3 reveal active">
            <div style="font-size:2.5rem; margin-bottom:15px;">${c.icon}</div>
            <h3>${c.name[lang]}</h3>
            <div class="progress-bar mt-2 mb-3" style="height:8px; background:var(--bg-secondary); border-radius:4px;">
                <div style="width:${c.progress}%; height:100%; background:${c.color}; border-radius:4px;"></div>
            </div>
            <button class="btn btn-primary btn-sm w-full" onclick="playLesson('${c.id}')">${c.status === 'completed' ? translations['course-watch-again'][lang] : translations['course-resume'][lang]}</button>
        </div>
    `).join('');
}

// ===== AI ASSISTANT =====
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
        <div class="ai-chat-header"><span>${translations['ai-name'][lang]}</span><button onclick="toggleAIChat()" style="border:none;background:none;color:white;cursor:pointer;">✕</button></div>
        <div class="ai-chat-messages" id="aiMessages"><div class="ai-msg bot">${translations['ai-greeting'][lang]}</div></div>
        <div class="ai-chat-input"><input type="text" id="aiInput" placeholder="${translations['ai-placeholder'][lang]}" onkeydown="if(event.key==='Enter') sendAIMessage()"><button onclick="sendAIMessage()">➤</button></div>
    `;
    document.body.appendChild(chat);
}

function toggleAIChat() { 
    document.getElementById('aiChat').classList.toggle('open');
    const dot = document.querySelector('#aiAssistantBtn .notif-dot');
    if (dot) dot.style.display = 'none';
}

function sendAIMessage(preset) {
    const input = document.getElementById('aiInput');
    const msg = preset || input.value.trim();
    if (!msg) return;
    const msgs = document.getElementById('aiMessages');
    msgs.innerHTML += `<div class="ai-msg user">${msg}</div>`;
    if (input) input.value = '';
    setTimeout(() => {
        msgs.innerHTML += `<div class="ai-msg bot">I'm here to help! Whether it's grammar, vocabulary, or speaking practice, I've got you covered.</div>`;
        msgs.scrollTop = msgs.scrollHeight;
    }, 1000);
}

function updateAIAssistant() {
    const input = document.getElementById('aiInput');
    if (input) input.placeholder = translations['ai-placeholder'][lang];
}

// ===== SPEAKING LAB HOOKS =====
function getSpeakingAnalysis(topicId) {
    const scores = { pronunciation: 70+Math.floor(Math.random()*25), fluency: 65+Math.floor(Math.random()*30), grammar: 60+Math.floor(Math.random()*35) };
    const phrases = { job: "Leadership and teamwork are my main strengths.", food: "I'll have the vegetarian pizza, please.", travel: "Where is the nearest tourist information center?", general: "Practice makes perfect when learning English." };
    return {
        transcript: phrases[topicId] || phrases.general,
        metrics: scores,
        tip: "Great job! Try to stress the key words for more natural rhythm.",
        suggestedVocab: { word: 'Consistency', translation: lang === 'ar' ? 'الاستمرارية' : 'Consistency', cat: 'Academic' }
    };
}

// ===== BLOG LOGIC =====
function filterBlog(category, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cards = document.querySelectorAll('.blog-card');
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

const BLOG_CONTENT = {
    1: {
        title: { en: 'Top 10 Phrasal Verbs for Business', ar: 'أهم 10 أفعال مركبة للأعمال' },
        content: { 
            en: 'Phrasal verbs are essential for natural English. In business, we use "bring up" (suggest), "call off" (cancel), and "put off" (postpone)...',
            ar: 'الأفعال المركبة ضرورية للغة إنجليزية طبيعية. في الأعمال، نستخدم "bring up" (اقتراح)، "call off" (إلغاء)، و "put off" (تأجيل)...'
        }
    },
    2: {
        title: { en: 'IELTS Speaking Success', ar: 'نجاح التحدث في الايلتس' },
        content: { 
            en: 'To score Band 7+, focus on lexical resource and grammatical range. Don\'t just use "good", use "exceptional" or "remarkable"...',
            ar: 'للحصول على درجة 7+، ركز على الموارد المعجمية والنطاق النحوي. لا تستخدم فقط "good"، بل استخدم "exceptional" أو "remarkable"...'
        }
    }
};

function openBlogModal(id) {
    const modal = document.getElementById('blogModal');
    const contentArea = document.getElementById('blogContentArea');
    const post = BLOG_CONTENT[id] || { title: { en: 'New Post', ar: 'مقال جديد' }, content: { en: 'Content coming soon...', ar: 'المحتوى قريباً...' } };
    
    if (modal && contentArea) {
        contentArea.innerHTML = `
            <h2 style="margin-bottom:20px;">${post.title[lang]}</h2>
            <div style="line-height:1.6; font-size:1.1rem; color:var(--text-secondary);">
                ${post.content[lang]}
            </div>
            <div style="margin-top:30px; padding-top:20px; border-top:1px solid var(--border-subtle);">
                <button class="btn btn-primary" onclick="closeBlogModal()">Close</button>
            </div>
        `;
        modal.classList.add('active');
    }
}

function closeBlogModal() {
    const modal = document.getElementById('blogModal');
    if (modal) modal.classList.remove('active');
}

