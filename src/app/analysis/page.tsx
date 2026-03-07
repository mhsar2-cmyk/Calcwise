"use client";
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import {
    BrainCircuit,
    Target,
    LineChart,
    Zap,
    Activity,
    PieChart,
    ChevronLeft,
    Share2,
    Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';

const ANALYSIS_DATA = {
    pair: "EURUSD",
    sentiment: "65% شراء",
    bias: "صاعد (Bullish)",
    probability: 78,
    reasons: [
        "كسر هيكل السوق (BoS) على الـ 4 ساعات.",
        "سحب السيولة من القاع المتساوي الأخير.",
        "وصول السعر لمنطقة طلب مدعومة بـ FVG.",
        "تزايد العائد على السندات الأوروبية."
    ]
};

export default function AnalysisPage() {
    return (
        <main className="min-h-screen bg-slate-950 pt-32 text-right">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
                {/* Left Side: Deep Dive Analysis */}
                <div className="flex-grow space-y-8">
                    <div className="mb-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-blue-500/20 text-blue-400 text-xs font-bold mb-6"
                        >
                            <BrainCircuit size={16} />
                            <span>محلل التحيز الذكي (Smart Bias)</span>
                        </motion.div>

                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">تحليل الاتجاه لـ <span className="gradient-text">{ANALYSIS_DATA.pair}</span></h1>
                            <div className="flex gap-2">
                                <button className="p-4 hover:bg-white/5 bg-white/5 rounded-2xl text-slate-400 border border-white/10 transition-colors shadow-xl">
                                    <Share2 size={20} />
                                </button>
                                <button className="p-4 hover:bg-white/5 bg-white/5 rounded-2xl text-slate-400 border border-white/10 transition-colors shadow-xl">
                                    <Calendar size={20} />
                                </button>
                            </div>
                        </div>

                        <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
                            يقوم محركنا العصبي بمسح وتحليل أكثر من 15 مؤشراً تقنياً ومؤسسياً لتحديد التحيز اليومي الأكثر احتمالاً.
                        </p>
                    </div>

                    {/* Analysis Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="glass p-10 rounded-[3rem] border border-white/5 relative group overflow-hidden shadow-2xl">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                    <Target size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">التحيز الحالي</h3>
                                    <p className="text-sm text-slate-500">الاتجاه المتوقع اليوم</p>
                                </div>
                            </div>
                            <div className="text-5xl font-black text-emerald-500 mb-4 tracking-tighter">{ANALYSIS_DATA.bias}</div>
                            <div className="text-sm text-slate-400 font-medium">دقة التوقع: {ANALYSIS_DATA.probability}% بناءً على 1000 محاكاة سابقة.</div>
                        </div>

                        <div className="glass p-10 rounded-[3rem] border border-white/5 relative group overflow-hidden shadow-2xl">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                                    <Activity size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">مشاعر المتداولين</h3>
                                    <p className="text-sm text-slate-500">السيولة والحجم</p>
                                </div>
                            </div>
                            <div className="text-5xl font-black text-white mb-4 tracking-tighter">{ANALYSIS_DATA.sentiment}</div>
                            <div className="text-sm text-slate-400 font-medium">تزايد الحجم الشرائي عند مستويات الدعم الحالية.</div>
                        </div>
                    </div>

                    {/* Reasons Section */}
                    <div className="glass p-10 rounded-[3rem] border border-white/5 shadow-2xl">
                        <h3 className="text-2xl font-bold text-white mb-8 border-r-4 border-blue-600 pr-6">لماذا هذا التحيز؟</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {ANALYSIS_DATA.reasons.map((reason, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 rounded-3xl bg-white/5 border border-white/5 flex gap-4 items-start group hover:border-blue-500/20 transition-all hover:bg-white/[0.08]"
                                >
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 text-xs font-bold">
                                        {i + 1}
                                    </div>
                                    <p className="text-slate-300 text-sm font-medium leading-relaxed">{reason}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side Tools */}
                <aside className="w-full lg:w-96 space-y-6">
                    <div className="glass p-8 rounded-[2.5rem] border border-emerald-500/20 bg-emerald-500/5 shadow-2xl shadow-emerald-500/5">
                        <div className="flex items-center gap-3 mb-6">
                            <PieChart className="text-emerald-500" size={24} />
                            <h3 className="text-lg font-bold text-white tracking-tight">جاهزية التداول</h3>
                        </div>
                        <div className="space-y-6">
                            {[
                                { label: "السيولة (Liquidity)", val: 92 },
                                { label: "الفصل بين الجلسات", val: 85 },
                                { label: "بيانات التضخم", val: 40 },
                            ].map((item, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold mb-1">
                                        <span className="text-slate-400">{item.label}</span>
                                        <span className="text-white">{item.val}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.val}%` }}
                                            className={`h-full ${item.val > 80 ? 'bg-emerald-500' : (item.val > 50 ? 'bg-blue-500' : 'bg-red-500')}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8">
                            <button className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white font-black text-sm shadow-xl shadow-blue-500/30 active:scale-95 transition-transform flex items-center justify-center gap-3">
                                <Zap size={18} fill="currentColor" />
                                تفعيل التنبيهات الذكية
                            </button>
                        </div>
                    </div>

                    <div className="glass p-8 rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden relative">
                        <div className="absolute -top-10 -left-10 w-32 h-32 blur-[60px] bg-blue-500/10 rounded-full" />
                        <h3 className="text-lg font-bold text-white mb-6 pr-2">أحداث اقتصادية مؤثره</h3>
                        <div className="space-y-4">
                            {[
                                { title: "معدل البطالة الأمريكي", time: "15:30", impact: "High" },
                                { title: "خطاب المركزي الأوروبي", time: "17:00", impact: "Medium" }
                            ].map((e, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                    <div>
                                        <div className="text-sm font-bold text-white mb-1">{e.title}</div>
                                        <div className="text-xs text-slate-500">{e.time}</div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${e.impact === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                        {e.impact}
                                    </span >
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
}
