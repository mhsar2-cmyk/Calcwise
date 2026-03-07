"use client";

import { Bell, Search, Settings, HelpCircle, User } from "lucide-react";

interface TopBarProps {
    activeLabel: string;
}

export default function TopBar({ activeLabel }: TopBarProps) {
    return (
        <header className="h-16 bg-slate-950 border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-40">
            <div className="flex items-center gap-4">
                <h2 className="text-lg font-bold text-white">{activeLabel}</h2>
                <div className="h-4 w-px bg-white/10 hidden md:block" />
                <div className="hidden md:flex items-center gap-2 text-[10px] text-slate-500 font-mono tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    متصل · الأسواق المفتوحة
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden lg:flex items-center bg-white/5 border border-white/5 rounded-lg px-3 py-1.5 gap-2 group focus-within:border-yellow-500/50 transition-all">
                    <Search className="w-4 h-4 text-slate-500 group-hover:text-yellow-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="بحث عن رمز أو أداة..."
                        className="bg-transparent border-none outline-none text-xs text-white placeholder:text-slate-600 w-48 text-right"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <button className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-all relative">
                        <Bell className="w-4 h-4" />
                        <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                    </button>
                    <button className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                        <Settings className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </header>
    );
}
