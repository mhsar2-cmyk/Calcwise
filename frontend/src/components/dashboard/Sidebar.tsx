"use client";

import Link from "next/link";
import {
    LayoutDashboard,
    Zap,
    Waves,
    Coins,
    Calculator,
    Target,
    ShieldAlert,
    Calendar,
    Clock,
    Sparkles,
    Radio,
    Radar,
    BookOpen,
    ChevronRight,
    ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
    active: string;
    setActive: (id: string) => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const navGroups = [
    {
        group: "عام",
        items: [
            { id: "overview", label: "لوحة التحكم", icon: <LayoutDashboard className="w-4 h-4" /> },
        ]
    },
    {
        group: "المؤشرات الذكية",
        items: [
            { id: "momentum", label: "نبض الزخم", icon: <Zap className="w-4 h-4" /> },
            { id: "liquidity", label: "خريطة السيولة", icon: <Waves className="w-4 h-4" /> },
            { id: "smartmoney", label: "الأموال الذكية", icon: <Coins className="w-4 h-4" /> },
        ]
    },
    {
        group: "المخاطر والصفقات",
        items: [
            { id: "calculator", label: "حاسبة العقود", icon: <Calculator className="w-4 h-4" /> },
            { id: "rr_viz", label: "مخطط العائد:المخاطرة", icon: <Target className="w-4 h-4" /> },
            { id: "drawdown", label: "حماية التراجع", icon: <ShieldAlert className="w-4 h-4" /> },
        ]
    },
    {
        group: "تحليل السوق",
        items: [
            { id: "calendar", label: "المفكرة الاقتصادية", icon: <Calendar className="w-4 h-4" /> },
            { id: "sessions", label: "ساعة الجلسات", icon: <Clock className="w-4 h-4" /> },
            { id: "sr_ai", label: "مستويات الدعم والمقاومة", icon: <Sparkles className="w-4 h-4" /> },
        ]
    },
    {
        group: "التنبيهات والأتمتة",
        items: [
            { id: "signals", label: "مركز الإشارات", icon: <Radio className="w-4 h-4" /> },
            { id: "scanner", label: "الماسح الشامل", icon: <Radar className="w-4 h-4" /> },
            { id: "journal", label: "سجل التداول", icon: <BookOpen className="w-4 h-4" /> },
        ]
    },
];

export default function Sidebar({ active, setActive, isOpen, setIsOpen }: SidebarProps) {
    return (
        <aside className={cn(
            "h-screen bg-slate-950 border-l border-white/10 flex flex-col transition-all duration-300 ease-in-out shrink-0 overflow-hidden",
            isOpen ? "w-64" : "w-20"
        )}>
            <div
                className="p-6 border-b border-white/5 flex items-center gap-3 cursor-pointer group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center text-slate-950 font-black shrink-0 shadow-lg shadow-yellow-500/20 group-hover:scale-110 transition-transform">
                    C
                </div>
                <div className={cn(
                    "font-black text-lg transition-opacity duration-200 whitespace-nowrap",
                    isOpen ? "opacity-100" : "opacity-0"
                )}>
                    Calc<span className="text-yellow-500">Wise</span>
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-8 scrollbar-hide">
                {navGroups.map((group, idx) => (
                    <div key={idx} className="space-y-2">
                        <h4 className={cn(
                            "text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] px-3 mb-4",
                            !isOpen && "hidden"
                        )}>
                            {group.group}
                        </h4>
                        <ul className="space-y-1">
                            {group.items.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => setActive(item.id)}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm group relative",
                                            active === item.id
                                                ? "bg-yellow-500/10 text-yellow-500 font-bold"
                                                : "text-slate-400 hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        <span className={cn(
                                            "shrink-0 transition-transform group-hover:scale-110",
                                            active === item.id ? "text-yellow-500" : "text-slate-500"
                                        )}>
                                            {item.icon}
                                        </span>
                                        <span className={cn(
                                            "transition-opacity duration-200 whitespace-nowrap",
                                            isOpen ? "opacity-100" : "opacity-0"
                                        )}>
                                            {item.label}
                                        </span>
                                        {!isOpen && (
                                            <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
                                                {item.label}
                                            </div>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>

            <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3 px-2 py-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-500 to-orange-500 flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-lg">
                        YA
                    </div>
                    <div className={cn(
                        "transition-opacity duration-200 overflow-hidden",
                        isOpen ? "opacity-100" : "opacity-0"
                    )}>
                        <div className="text-xs font-bold truncate">ياسر أحمد</div>
                        <div className="text-[10px] text-slate-500 truncate">برو إيليت</div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
