"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const CURRENCIES = [
    { name: "USD", strength: 85, color: "bg-emerald-500" },
    { name: "EUR", strength: 72, color: "bg-emerald-400" },
    { name: "GBP", strength: 60, color: "bg-blue-500" },
    { name: "JPY", strength: 30, color: "bg-red-500" },
    { name: "AUD", strength: 45, color: "bg-yellow-500" },
    { name: "CHF", strength: 55, color: "bg-blue-400" },
    { name: "CAD", strength: 40, color: "bg-orange-500" },
];

export const CurrencyStrength = () => {
    return (
        <div className="glass p-6 rounded-2xl border border-white/5 h-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-slate-400">
                    <Zap size={16} className="text-yellow-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">ميزان قوة العملات</span>
                </div>
                <span className="text-[10px] text-slate-500">محدث لحظياً</span>
            </div>

            <div className="space-y-4">
                {CURRENCIES.sort((a, b) => b.strength - a.strength).map((curr, i) => (
                    <div key={curr.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] font-bold">
                            <span className="text-white">{curr.name}</span>
                            <span className="text-slate-500">{curr.strength}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${curr.strength}%` }}
                                transition={{ delay: i * 0.1, duration: 1 }}
                                className={`h-full rounded-full ${curr.color}`}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
                <p className="text-[10px] text-slate-500 leading-relaxed">
                    يتم احتساب القوة بناءً على مؤشر DXY وتحركات الأسعار في الأطر الزمنية الصغرى.
                </p>
            </div>
        </div>
    );
};
