"use client";
import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { TrendingUp } from 'lucide-react';
import MarketTicker from './MarketTicker';


export const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 bg-slate-950/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 cursor-pointer transition-transform active:scale-95">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <TrendingUp className="text-white w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold tracking-tighter text-white">كالك<span className="text-blue-500">وايز</span></span>
                </Link>

                <div className="flex items-center gap-8">
                    <Link href="/#features" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">المميزات</Link>
                    <Link href="/indicators" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">المؤشرات</Link>
                    <Link href="/#pricing" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">الأسعار</Link>
                    <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">لوحة التحكم</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" className="hidden sm:block">تسجيل الدخول</Button>
                    </Link>
                    <Link href="/login">
                        <Button>ابدأ الآن</Button>
                    </Link>
                </div>
            </div>

            <div className="border-t border-white/5 h-11 flex items-center bg-black/20">
                <MarketTicker />
            </div>
        </nav>

    );
};

