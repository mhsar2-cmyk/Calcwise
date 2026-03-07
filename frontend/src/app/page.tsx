import Link from "next/link";
import {
  ArrowLeft,
  TrendingUp,
  Zap,
  Shield,
  Activity,
  BrainCircuit,
  Clock,
  Layers,
  Target,
  BarChart3,
  Bot
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 glass-panel border-b border-white/10">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-extrabold tracking-tight flex items-center gap-2">
            كالك وايز
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
          </Link>
        </div>

        <ul className="hidden md:flex items-center gap-8">
          <li><Link href="#tools" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">الأدوات</Link></li>
          <li><Link href="#indicators" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">المؤشرات</Link></li>
          <li><Link href="#ai" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">المساعد الذكي</Link></li>
          <li><Link href="#pricing" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">الأسعار</Link></li>
        </ul>

        <button className="px-6 py-2 bg-white text-slate-950 text-sm font-bold rounded-md hover:bg-yellow-500 hover:text-white transition-all">
          ابدأ مجاناً
        </button>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-8 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] uppercase tracking-widest font-mono mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
              منصة ذكاء التداول
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-6 tracking-tight">
              تداول <span className="gold-gradient">بذكاء.</span> <br />
              خطط بدقة.
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-xl ml-auto">
              مؤشرات احترافية، تحليل مدعوم بالذكاء الاصطناعي، وأدوات إدارة مخاطر دقيقة — كل ما يحتاجه المتداول الجاد في منصة واحدة.
            </p>

            <div className="flex flex-wrap gap-4 justify-start lg:justify-end mb-8 flex-row-reverse">
              <button className="px-8 py-3 bg-yellow-500 text-white font-bold rounded-md hover:shadow-lg hover:shadow-yellow-500/20 transition-all">
                ابدأ تجارتك المجانية
              </button>
              <button className="px-8 py-3 bg-slate-900 border border-slate-800 text-white font-medium rounded-md hover:bg-slate-800 transition-all">
                شاهد العرض التجريبي
              </button>
            </div>

            <div className="flex items-center gap-6 justify-start lg:justify-end text-sm text-slate-500 flex-row-reverse">
              <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-green-500" /> لا يلزم بطاقة ائتمان</div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-green-500" /> تجربة مجانية 14 يوماً</div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-yellow-500/10 blur-[100px] rounded-full group-hover:bg-yellow-500/20 transition-all" />
            <div className="relative glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="bg-slate-950 px-6 py-4 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-[10px] font-mono text-slate-500 tracking-wider">CALCWISE DASHBOARD</div>
              </div>
              <div className="p-8 space-y-6">
                {[
                  { label: "رصيد الحساب", val: "$10,000.00", color: "text-white" },
                  { label: "المخاطرة لكل صفقة", val: "1.5%", color: "text-white" },
                  { label: "حجم العقد المقترح", val: "3.41 عقد", color: "text-yellow-500" },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-slate-500 text-sm">{row.label}</span>
                    <span className={`font-mono font-medium ${row.color}`}>{row.val}</span>
                  </div>
                ))}
                <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-green-500 font-mono tracking-widest uppercase mb-1">النتيجة المتوقعة</span>
                    <span className="text-green-500 font-bold text-xl">+$340.00</span>
                  </div>
                  <TrendingUp className="text-green-500 w-8 h-8" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee Ticker */}
        <div className="bg-slate-950 border-y border-white/5 py-3 overflow-hidden">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[
              { sym: "BTC/USD", price: "68,432.10", up: true },
              { sym: "ETH/USD", price: "3,842.15", up: true },
              { sym: "GOLD", price: "2,154.20", up: false },
              { sym: "EUR/USD", price: "1.0842", up: true },
              { sym: "GBP/USD", price: "1.2641", up: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-xs font-mono">
                <span className="text-white font-bold">{item.sym}</span>
                <span className={item.up ? "text-green-500" : "text-red-500"}>{item.price}</span>
                <span className={item.up ? "text-green-500/50" : "text-red-500/50"}>{item.up ? "▲" : "▼"}</span>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {[
              { sym: "BTC/USD", price: "68,432.10", up: true },
              { sym: "ETH/USD", price: "3,842.15", up: true },
              { sym: "GOLD", price: "2,154.20", up: false },
              { sym: "EUR/USD", price: "1.0842", up: true },
              { sym: "GBP/USD", price: "1.2641", up: false },
            ].map((item, i) => (
              <div key={`dup-${i}`} className="flex items-center gap-3 text-xs font-mono">
                <span className="text-white font-bold">{item.sym}</span>
                <span className={item.up ? "text-green-500" : "text-red-500"}>{item.price}</span>
                <span className={item.up ? "text-green-500/50" : "text-red-500/50"}>{item.up ? "▲" : "▼"}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <section id="tools" className="py-24 px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-yellow-500 text-[10px] font-mono tracking-[0.3em] uppercase mb-4">مجموعة الأدوات</div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">كل أداة يحتاجها المتداول الجاد</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">من حساب أحجام العقود بدقة إلى التحليل المدعوم بالذكاء الاصطناعي — كالك وايز توفر لك المزايا التي يدفع المتداولون آلاف الدولارات مقابلها.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Activity className="w-6 h-6" />, title: "نبض الزخم", desc: "مؤشر RSI/MACD متعدد الأطر الزمنية مع تنبيهات الاختلاف.", tag: "مدعوم بالذكاء الاصطناعي" },
              { icon: <Zap className="w-6 h-6" />, title: "خريطة السيولة الحرارية", desc: "خريطة مرئية لمستويات العرض والطلب وعمق سجل الأوامر.", tag: "بيانات مباشرة" },
              { icon: <BrainCircuit className="w-6 h-6" />, title: "درجة الثقة في الاتجاه", desc: "درجة (0-100) مرجحة بالذكاء الاصطناعي تقيس قوة الاتجاه.", tag: "AI متقدم" },
              { icon: <Target className="w-6 h-6" />, title: "حاسبة العقود الاحترافية", desc: "تحسب حجم اللوت تلقائياً بناءً على نسبة المخاطرة المحددة.", tag: "أداة مخاطرة" },
              { icon: <Clock className="w-6 h-6" />, title: "ساعة الجلسات", desc: "مؤقت حي لجلسات لندن/نيويورك/طوكيو مع بيانات التقلب.", tag: "ديناميكي" },
              { icon: <Layers className="w-6 h-6" />, title: "مستويات الدعم والمقاومة", desc: "يكتشف تلقائياً مستويات الدعم والمقاومة عالية الاحتمالية.", tag: "مسح فني" },
            ].map((tool, i) => (
              <div key={i} className="glass-panel p-8 rounded-xl border border-white/5 hover:border-yellow-500/30 transition-all group">
                <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500 mb-6 group-hover:scale-110 transition-transform">
                  {tool.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{tool.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{tool.desc}</p>
                <span className="text-[10px] font-mono text-yellow-500/50 uppercase tracking-widest">{tool.tag}</span>
              </div>
            ))}
          </div>
        </section>

        {/* AI Assistant Preview */}
        <section id="ai" className="py-24 bg-slate-950 border-y border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -mr-64 -mt-64" />
          <div className="px-8 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative">
              <div className="bg-slate-900 px-6 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-bold">CalcWise AI Assistant</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">ONLINE</div>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex justify-start">
                  <div className="bg-slate-800 rounded-2xl rounded-tl-none p-4 max-w-[80%] text-sm">
                    هل EURUSD صاعد اليوم؟ — أحصل على مستويات التحيز مع الأسباب.
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-yellow-500 text-slate-950 font-medium rounded-2xl rounded-tr-none p-4 max-w-[80%] text-sm">
                    يُظهر هيكل 4H تحيزاً صاعداً قوياً. السعر فوق EMA 50 حالياً.
                  </div>
                </div>
                <div className="pt-4 border-t border-white/5 flex gap-4">
                  <div className="flex-1 bg-slate-900 rounded-full px-6 py-3 text-xs text-slate-500 flex items-center">
                    اسأل المساعد الذكي أي شيء...
                  </div>
                  <button className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-slate-950 shadow-lg shadow-yellow-500/20">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 text-right">
              <div className="text-blue-400 text-[10px] font-mono tracking-[0.3em] uppercase mb-4">مساعد التداول الذكي</div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">دردش مع بيانات السوق الخاصة بك</h2>
              <p className="text-slate-400 leading-relaxed mb-8">اسأل كالك وايز أي شيء عن أي سوق. حيث تقوم بتحويل آلاف البيانات التاريخية والتقنيات وتوفر لك إجابات منظمة مقابلة للتنفيذ.</p>
              <ul className="space-y-4">
                {[
                  "تحليل هيكل السوق في الوقت الحقيقي",
                  "توصيات إدارة المخاطر المخصصة",
                  "شرح مبسط لاستراتيجيات التداول المعقدة",
                  "تنبيهات الفرص بناءً على تفضيلاتك"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-300 justify-start lg:justify-end flex-row-reverse">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 text-center text-slate-500 text-sm">
        <div className="mb-8">
          <Link href="/" className="text-xl font-extrabold text-white">كالك وايز</Link>
        </div>
        <p className="mb-4">© {new Date().getFullYear()} كالك وايز. جميع الحقوق محفوظة.</p>
        <p className="max-w-xl mx-auto px-8">إخلاء مسؤولية: التداول يحتوي على مخاطر خسارة كبيرة. المعلومات المقدمة هي للأغراض التعليمية فقط.</p>
      </footer>
    </div>
  );
}
