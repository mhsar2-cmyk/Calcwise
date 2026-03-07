"use client";
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import {
    Plus,
    Filter,
    BarChart2,
    CheckCircle2,
    XCircle,
    Clock,
    ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function JournalPage() {
    return (
        <main className="min-h-screen bg-slate-950 pt-20 text-right">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">سجل الصفقات</h1>
                        <p className="text-slate-400 text-lg italic">"لا يمكنك إدارة ما لا تقيسه."</p>
                    </div>
                    <Button className="flex items-center gap-2">
                        <Plus size={20} /> تسجيل صفقة جديدة
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: "إجمالي الصفقات", val: "142", icon: BarChart2, color: "text-blue-500" },
                        { label: "نسبة الربح", val: "64.2%", icon: CheckCircle2, color: "text-emerald-500" },
                        { label: "عامل الربح", val: "2.4", icon: ArrowUpRight, color: "text-purple-500" },
                        { label: "متوسط المخاطرة/العائد", val: "1:2.5", icon: Clock, color: "text-orange-500" },
                    ].map((stat, i) => (
                        <div key={i} className="glass p-6 rounded-2xl border border-white/5">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</span>
                                <stat.icon size={20} className={stat.color} />
                            </div>
                            <div className="text-3xl font-bold text-white tracking-tight">{stat.val}</div>
                        </div>
                    ))}
                </div>

                <div className="glass rounded-2xl border border-white/5 overflow-hidden">
                    <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
                        <h3 className="text-white font-semibold">الأداء الأخير</h3>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex items-center gap-2">
                                <Filter size={14} /> تصفية
                            </Button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-right">
                            <thead>
                                <tr className="text-[10px] text-slate-500 uppercase tracking-widest border-b border-white/5">
                                    <th className="px-6 py-4">التاريخ</th>
                                    <th className="px-6 py-4">الزوج</th>
                                    <th className="px-6 py-4">الحالة</th>
                                    <th className="px-6 py-4">نسبة العائد</th>
                                    <th className="px-6 py-4">الربح/الخسارة ($)</th>
                                    <th className="px-6 py-4">ملاحظات</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-white/5">
                                {[
                                    { date: "24 أكتوبر، 2023", pair: "EURUSD", status: "ربح", rr: "1:3.2", pl: "+$420.00", notes: "دخول عند كسر الهيكل (SMC)" },
                                    { date: "23 أكتوبر، 2023", pair: "XAUUSD", status: "خسارة", rr: "1:2.0", pl: "-$150.00", notes: "اصطياد سيولة (Liquidity sweep)" },
                                    { date: "22 أكتوبر، 2023", pair: "BTCUSD", status: "ربح", rr: "1:4.5", pl: "+$890.00", notes: "محاذاة مع التحيز اليومي" },
                                    { date: "21 أكتوبر، 2023", pair: "GBPUSD", status: "ربح", rr: "1:1.5", pl: "+$210.00", notes: "سكالبينج عند الدعم" },
                                ].map((trade, i) => (
                                    <tr key={i} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4 text-slate-400">{trade.date}</td>
                                        <td className="px-6 py-4 font-bold text-white dir-ltr">{trade.pair}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${trade.status === 'ربح' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                                {trade.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-300 font-mono text-left dir-ltr">{trade.rr}</td>
                                        <td className={`px-6 py-4 font-bold text-left dir-ltr ${trade.status === 'ربح' ? 'text-emerald-400' : 'text-red-400'}`}>{trade.pl}</td>
                                        <td className="px-6 py-4 text-slate-500 group-hover:text-slate-300 transition-colors">{trade.notes}</td>
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

