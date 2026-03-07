"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import Overview from "./Overview";
import Calculator from "./Calculator";
import { cn } from "@/lib/utils";

const labels: Record<string, string> = {
    overview: "لوحة التحكم",
    momentum: "نبض الزخم",
    liquidity: "خريطة السيولة",
    smartmoney: "الأموال الذكية",
    calculator: "حاسبة العقود",
    rr_viz: "مخطط العائد:المخاطرة",
    drawdown: "حماية التراجع",
    calendar: "المفكرة الاقتصادية",
    sessions: "ساعة الجلسات",
    sr_ai: "الدعم والمقاومة بالذكاء الاصطناعي",
    signals: "مركز الإشارات",
    scanner: "الماسح الشامل",
    journal: "سجل التداول",
};

export default function DashboardMain() {
    const [active, setActive] = useState("overview");
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const renderContent = () => {
        switch (active) {
            case "overview":
                return <Overview />;
            case "calculator":
                return <Calculator />;
            // For other pages, we can implement them later or show a placeholder
            default:
                return (
                    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
                        <div className="text-4xl">🏗️</div>
                        <h3 className="text-xl font-bold">قيد التطوير</h3>
                        <p className="text-slate-500 max-w-sm">
                            يتم حالياً تطوير هذه الأداة كجزء من النظام الاحترافي الجديد. شكراً لصبرك.
                        </p>
                        <button
                            onClick={() => setActive("overview")}
                            className="px-6 py-2 bg-yellow-500 text-slate-950 font-bold rounded-lg"
                        >
                            العودة للوحة التحكم
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="flex bg-slate-950 text-white min-h-screen overflow-hidden" dir="rtl">
            <Sidebar
                active={active}
                setActive={setActive}
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <TopBar activeLabel={labels[active] || "كالك وايز"} />

                <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}
