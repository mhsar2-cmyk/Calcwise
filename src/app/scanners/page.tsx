"use client";
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import {
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    Zap,
    TrendingUp,
    Filter,
    BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';

const SCANNER_DATA = [
    { pair: "EURUSD", trend: "BULLISH", volatility: "عالية", rsi: 65, strength: 82, signal: "شراء" },
    { pair: "XAUUSD", trend: "BEARISH", volatility: "متوسطة", rsi: 35, strength: 91, signal: "بيع" },
    { pair: "BTCUSD", trend: "BULLISH", volatility: "انفجارية", rsi: 78, strength: 65, signal: "صبر" },
    { pair: "GBPUSD", trend: "NEUTRAL", volatility: "ضعيفة", rsi: 50, strength: 40, signal: "لا يوجد" },
    { pair: "USDJPY", trend: "BULLISH", volatility: "عالية", rsi: 72, strength: 88, signal: "شراء" },
    { pair: "AUDUSD", trend: "BEARISH", volatility: "متوسطة", rsi: 42, strength: 55, signal: "بيع" },
];

export default function ScannersPage() {
    return (
        <main className="min-h-screen bg-slate-950 pt-32 text-right">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">ماسحات <span className="gradient-text">السيولة</span> والاتجاه</h1>
                        <p className="text-slate-400">تحليل لحظي لجميع أزواج العملات والأصول الرئيسية بناءً على البيانات المؤسسية.</p>
                    </div>

                    <div className="flex gap-3">
                        <div className="glass px-6 py-3 rounded-2xl border border-white/5 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-bold text-white uppercase">مباشر</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: "أزواج صاعدة", val: "12", color: "text-emerald-500" },
                        { label: "أزواج هابطة", val: "8", color: "text-red-500" },
                        { label: "أزواج عرضية", val: "5", color: "text-blue-500" },
                        { label: "تنبيهات انفجارية", val: "3", color: "text-orange-500" },
                    ].map((stat, i) => (
                        <div key={i} className="glass p-6 rounded-3xl border border-white/5 text-center">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
                            <div className={`text-4xl font-bold ${stat.color}`}>{stat.val}</div>
                        </div>
                    ))}
                </div>

                <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden">
                    <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                        <h3 className="text-xl font-bold text-white">النتائج اللحظية</h3>
                        <div className="flex gap-2">
                            <button className="p-3 hover:bg-white/5 rounded-xl text-slate-400 transition-colors">
                                <Filter size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-right">
                            <thead>
                                <tr className="text-[10px] text-slate-500 uppercase tracking-widest border-b border-white/5">
                                    <th className="px-8 py-6">الأصل / الزوج</th>
                                    <th className="px-8 py-6">الاتجاه العام</th>
                                    <th className="px-8 py-6">التقلب (Volatility)</th>
                                    <th className="px-8 py-6">قوة الإشارة</th>
                                    <th className="px-8 py-6">التوصية الآلية</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {SCANNER_DATA.map((row, i) => (
                                    <tr key={i} className="hover:bg-white/[0.03] transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                                    <TrendingUp size={20} className="text-blue-500" />
                                                </div>
                                                <span className="font-bold text-white dir-ltr">{row.pair}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                {row.trend === 'BULLISH' ? <ArrowUpRight size={16} className="text-emerald-500" /> : <ArrowDownRight size={16} className="text-red-500" />}
                                                <span className={`text-xs font-bold ${row.trend === 'BULLISH' ? 'text-emerald-500' : 'text-red-500'}`}>
                                                    {row.trend === 'BULLISH' ? 'صاعد' : (row.trend === 'NEUTRAL' ? 'عرضي' : 'هابط')}
                                                </span>
                                            </div>
                                        </td>
                                        <td className={`px-8 py-6 text-xs font-medium ${row.volatility === 'انفجارية' ? 'text-orange-500' : 'text-slate-400'}`}>
                                            {row.volatility}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="w-full max-w-[100px] h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${row.strength}%` }}
                                                    className={`h-full rounded-full ${row.strength > 75 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                                                />
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold border ${row.signal === 'شراء' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : (row.signal === 'بيع' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-white/5 border-white/5 text-slate-500')}`}>
                                                {row.signal}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}
