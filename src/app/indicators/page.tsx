"use client";
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import {
    Code,
    Download,
    Copy,
    Check,
    ExternalLink,
    Shield,
    Zap,
    BarChart3,
    Target,
    Activity,
    Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INDICATORS = [
    {
        id: "smc-toolkit",
        title: "حقيبة أدوات SMC المتكاملة",
        description: "أقوى أداة لتحديد هيكل السوق (BoS/ChoCH)، كتل الأوامر (Order Blocks)، فجوات القيمة العادلة (FVG)، والسيولة.",
        features: ["رسم آلي لهيكل السوق", "تحديد مناطق العرض والطلب بدقة", "تنبيهات عند كسر المستويات"],
        icon: Shield,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        file: "SMC_Toolkit.pine",
        premium: true
    },
    {
        id: "liq-sweep",
        title: "كاشف سحب السيولة (Liquidity Sweep)",
        description: "يكتشف عمليات 'ضرب الستوبات' وسحب السيولة من القمم والقيعان المتساوية لتحديد الانعكاسات المحتملة.",
        features: ["تنبيهات فورية عند Sweep", "تحديد Equal Highs/Lows", "دقيق جداً في صيد الانعكاسات"],
        icon: Target,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        file: "LiquiditySweepDetector.pine",
        premium: false
    },
    {
        id: "ai-prob",
        title: "احتمالية الشموع بالذكاء الاصطناعي",
        description: "يستخدم خوارزميات إحصائية لتحليل سلوك السعر الحالي وتوقع احتمالية اتجاه الشمعة القادمة.",
        features: ["تحليل احتمالي للاتجاه", "تصفية الإشارات الكاذبة", "متوافق مع جميع الأطر الزمنية"],
        icon: Zap,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        file: "AIProbabilityCandle.pine",
        premium: true
    },
    {
        id: "mtf-trend",
        title: "محرك الاتجاه المتعدد (MTF)",
        description: "عرض اتجاه السوق عبر 4 أطر زمنية مختلفة في جدول واحد بسيط لاتخاذ قرارات تداول أكثر دقة.",
        features: ["رؤية بانورامية للسوق", "تجنب التداول عكس الاتجاه الكبير", "تحديث لحظي لجميع الأطر"],
        icon: BarChart3,
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        file: "MTF_TrendEngine.pine",
        premium: false
    },
    {
        id: "vol-exp",
        title: "مؤشر انفجار السيولة (Volatility Expansion)",
        description: "تحديد مناطق ضيق السيولة التي يتبعها انفجارات سعرية كبيرة لالتقاط بداية الحركات العنيفة.",
        features: ["كشف فخاخ التداول العرضي", "تحديد بداية الرالي (Rally)", "إشارات دخول واضحة وعالية الجودة"],
        icon: Activity,
        color: "text-cyan-500",
        bg: "bg-cyan-500/10",
        file: "VolatilityExpansion.pine",
        premium: true
    }
];

export default function IndicatorsPage() {
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleCopy = (id: string) => {
        // In a real app, you would fetch and copy the actual file content
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const filteredIndicators = INDICATORS.filter(ind =>
        ind.title.includes(searchTerm) || ind.description.includes(searchTerm)
    );

    return (
        <main className="min-h-screen bg-slate-950 pt-20 text-right">
            <Navbar />

            <div className="max-w-7xl mx-auto p-6 md:p-12">
                {/* Header Section */}
                <div className="mb-12 text-center md:text-right">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-blue-500/20 text-blue-400 text-sm font-medium mb-6"
                    >
                        <Code size={16} />
                        <span>مستودع الأكواد المفتوحة والحصرية</span>
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">مستودع المؤشرات <span className="gradient-text">الذكية</span></h1>
                    <p className="text-slate-400 max-w-2xl md:mr-0 md:ml-auto">
                        تصفح مجموعتنا الحصرية من مؤشرات Pine Script™ المصممة خصيصاً لمنصة TradingView. تم بناؤها واختبارها بواسطة متداولين محترفين.
                    </p>
                </div>

                {/* Search & Filter */}
                <div className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                        <input
                            type="text"
                            placeholder="ابحث عن مؤشر (مثلاً: SMC)..."
                            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pr-12 pl-6 text-white text-sm outline-none focus:border-blue-500/50 transition-all shadow-xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" className="rounded-xl px-6">الكل</Button>
                        <Button variant="ghost" className="rounded-xl px-6">المجاني</Button>
                        <Button variant="ghost" className="rounded-xl px-6 text-blue-400">Premium</Button>
                    </div>
                </div>

                {/* Indicators Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredIndicators.map((ind, index) => (
                        <motion.div
                            key={ind.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass rounded-3xl border border-white/5 overflow-hidden flex flex-col card-hover relative group"
                        >
                            {ind.premium && (
                                <div className="absolute top-4 left-4 z-20">
                                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold uppercase py-1 px-3 rounded-full flex items-center gap-1.5 shadow-xl border border-blue-400/20">
                                        <Zap size={10} fill="currentColor" />
                                        <span>PRO</span>
                                    </div>
                                </div>
                            )}

                            <div className="p-8">
                                <div className={`w-14 h-14 rounded-2xl ${ind.bg} flex items-center justify-center mb-6 shadow-2xl`}>
                                    <ind.icon className={`w-7 h-7 ${ind.color}`} />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors">{ind.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed mb-6 h-12 overflow-hidden text-ellipsis">
                                    {ind.description}
                                </p>

                                <div className="space-y-3 mb-8">
                                    {ind.features.map((feature, fIdx) => (
                                        <div key={fIdx} className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        className="flex-grow flex items-center justify-center gap-2 font-bold rounded-2xl py-6"
                                        onClick={() => handleCopy(ind.id)}
                                        variant={ind.premium ? 'primary' : 'outline'}
                                    >
                                        {copiedId === ind.id ? (
                                            <>تم النسخ <Check size={18} /></>
                                        ) : (
                                            <>نسخ الكود <Copy size={18} /></>
                                        )}
                                    </Button>
                                    <Button variant="ghost" className="w-14 rounded-2xl border border-white/5">
                                        <ExternalLink size={20} />
                                    </Button>
                                </div>
                            </div>

                            {/* Decorative glow */}
                            <div className={`absolute -bottom-10 -right-10 w-32 h-32 blur-[60px] rounded-full opacity-0 group-hover:opacity-20 transition-opacity ${ind.color.replace('text', 'bg')}`} />
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 glass p-8 md:p-12 rounded-[2.5rem] border border-blue-500/20 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-blue-500/[0.02] -z-10" />
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight">هل لديك استراتيجية خاصة تريد برمجتها؟</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto mb-10">
                        نحن نقدم خدمات برمجة مخصصة لكبار المتداولين والمؤسسات المالية. حول فكرتك إلى أداة تداول آلية الآن.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button className="px-10 py-4 font-bold rounded-2xl shadow-xl shadow-blue-500/20">تواصل مع المبرمجين</Button>
                        <Button variant="outline" className="px-10 py-4 font-bold rounded-2xl border-white/10">عرض نماذج الأعمال</Button>
                    </div>
                </div>
            </div>

            {/* Footer space */}
            <div className="py-12" />
        </main>
    );
}
