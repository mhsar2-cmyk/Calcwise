"use client";
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { PositionSizeCalculator } from '@/components/tools/PositionSizeCalculator';
import { MarketBiasAI } from '@/components/dashboard/MarketBiasAI';
import { CurrencyStrength } from '@/components/dashboard/CurrencyStrength';
import {
    BarChart3,
    Activity,
    Clock,
    Smartphone,
    Bell,
    Settings,
    LayoutDashboard,
    Search,
    BookOpen
} from 'lucide-react';

import Link from 'next/link';

interface SidebarLinkProps {
    icon: React.ElementType;
    label: string;
    href?: string;
    active?: boolean;
}

const SidebarLink = ({ icon: Icon, label, href = "#", active = false }: SidebarLinkProps) => (
    <Link href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}>
        <Icon size={20} />
        <span className="font-medium text-sm">{label}</span>
    </Link>
);


import TradingViewChart from '@/components/dashboard/TradingViewChart';

export default function Dashboard() {
    return (
        <main className="min-h-screen bg-slate-950 pt-20 text-right">
            <Navbar />

            <div className="max-w-[1600px] mx-auto flex gap-6 p-6">
                {/* Sidebar */}
                <aside className="w-64 hidden xl:block flex-shrink-0">
                    <div className="space-y-1">
                        <SidebarLink icon={LayoutDashboard} label="نظرة عامة" href="/dashboard" active />
                        <SidebarLink icon={Activity} label="ماسحات السوق" href="/scanners" />
                        <SidebarLink icon={Search} label="محلل التحيز الذكي" href="/analysis" />
                        <SidebarLink icon={BarChart3} label="مركز المؤشرات" href="/indicators" />
                        <SidebarLink icon={BookOpen} label="سجل الصفقات" href="/journal" />
                        <SidebarLink icon={Settings} label="الإعدادات" href="/dashboard" />

                    </div>


                    <div className="mt-8 p-4 rounded-2xl glass border border-blue-500/20 text-right">
                        <h4 className="text-sm font-bold text-white mb-2">خطة Pro مفعلة</h4>
                        <p className="text-xs text-slate-400 mb-4">لديك وصول كامل لجميع المؤشرات والأدوات الذكية.</p>
                        <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                            <div className="w-3/4 h-full bg-blue-500" />
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-grow space-y-6 overflow-hidden">
                    {/* Top Bar / Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: "حجم التداول اليومي", val: "$4,281", change: "+12%" },
                            { label: "مشاعر السوق", val: "طمع", change: "78/100" },
                            { label: "إشارات نشطة", val: "12", change: "4 جديدة" },
                            { label: "نسبة الربح", val: "68.4%", change: "+2.1%" },
                        ].map((stat, i) => (
                            <div key={i} className="glass p-4 rounded-2xl border border-white/5">
                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">{stat.label}</p>
                                <div className="flex items-end justify-between">
                                    <span className="text-2xl font-bold text-white tracking-tight">{stat.val}</span>
                                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">{stat.change}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Main Interactive Map / Grid */}
                        <div className="lg:col-span-8 space-y-6">
                            <TradingViewChart />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <MarketBiasAI />
                                <div className="glass p-6 rounded-2xl border border-white/5">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                                            <Bell size={20} />
                                        </div>
                                        <h3 className="text-lg font-semibold text-white">الإشارات الأخيرة</h3>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { pair: "EURUSD", type: "شراء", level: "1.0850", time: "منذ 12 دقيقة" },
                                            { pair: "XAUUSD", type: "بيع", level: "2165.2", time: "منذ 45 دقيقة" },
                                            { pair: "BTCUSD", type: "شراء", level: "67800", time: "منذ ساعة" },
                                        ].map((sig, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                                                <div>
                                                    <span className="text-sm font-bold text-white ml-2 dir-ltr">{sig.pair}</span>
                                                    <span className={`text-[10px] font-bold uppercase ${sig.type === 'شراء' ? 'text-emerald-500' : 'text-red-500'}`}>{sig.type} معلق (Limit)</span>
                                                </div>
                                                <div className="text-left">
                                                    <div className="text-xs font-mono text-slate-300">{sig.level}</div>
                                                    <div className="text-[10px] text-slate-500">{sig.time}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Side Tools */}
                        <div className="lg:col-span-4 space-y-6">
                            <CurrencyStrength />
                            <PositionSizeCalculator />
                            <div className="glass p-6 rounded-2xl border border-white/5">

                                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">تنبيهات نشطة</h3>
                                <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs flex gap-3">
                                    <Clock size={16} className="shrink-0" />
                                    <span>صدور بيانات NFP خلال 14:20 دقيقة. توقعات بتقلبات عالية، يفضل تجنب فتح صفقات.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

