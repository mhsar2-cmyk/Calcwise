"use client";
import React from 'react';
import { BrainCircuit, TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const BIAS_DATA = [
    { pair: "EURUSD", bias: "صعودي", strength: 85, reason: "ضعف مؤشر الدولار + تغير هيكلي على H4" },
    { pair: "GBPUSD", bias: "صعودي", strength: 72, reason: "بيانات بنك كندا + استمرارية الاتجاه" },
    { pair: "XAUUSD", bias: "محايد", strength: 50, reason: "تذبذب أسفل مستوى 2150$" },
    { pair: "BTCUSD", bias: "هبوطي", strength: 68, reason: "اصطياد سيولة عند 69 ألف + دايفرجنس RSI" },
];

export const MarketBiasAI = () => {
    return (
        <div className="glass p-6 rounded-2xl border border-white/5 h-full text-right">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                        <BrainCircuit size={20} />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">ذكاء اصطناعي لتحليل السوق</h3>
                        <p className="text-xs text-slate-500">تحليل اتجاهي ذكي</p>
                    </div>
                </div>
                <div className="px-2 py-1 rounded bg-slate-900 border border-white/5 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                    تم التحديث منذ 3 دقائق
                </div>
            </div>

            <div className="space-y-3">
                {BIAS_DATA.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                            <span className="text-sm font-bold text-slate-200 dir-ltr">{item.pair}</span>
                            <div className="flex items-center gap-1.5">
                                {item.bias === "صعودي" ? <TrendingUp size={14} className="text-emerald-500" /> :
                                    item.bias === "هبوطي" ? <TrendingDown size={14} className="text-red-500" /> :
                                        <Minus size={14} className="text-slate-500" />}
                                <span className={`text-[10px] font-bold uppercase ${item.bias === "صعودي" ? "text-emerald-500" : item.bias === "هبوطي" ? "text-red-500" : "text-slate-500"}`}>
                                    {item.bias}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    className={`h-full ${item.bias === "صعودي" ? "bg-emerald-500" : item.bias === "هبوطي" ? "bg-red-500" : "bg-slate-500"}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.strength}%` }}
                                    transition={{ duration: 1, delay: idx * 0.1 }}
                                />
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono tracking-tighter w-6 text-left">{item.strength}%</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 p-3 bg-white/5 rounded-lg border border-white/5 flex gap-3 items-start">
                <Info size={16} className="text-blue-400 mt-0.5 shrink-0" />
                <p className="text-[11px] text-slate-500 leading-relaxed italic">
                    &quot;يظهر مؤشر الدولار (DXY) علامات إنهاك على الإطار الزمني H4.
                    توقع استمرار الصعود على الأزواج الرئيسية حتى افتتاح بورصة نيويورك.&quot;
                </p>
            </div>
        </div>
    );
};

