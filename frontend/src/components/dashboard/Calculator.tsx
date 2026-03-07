"use client";

import { useCalc } from "@/hooks/useCalc";
import { Calculator as CalcIcon, Percent, DollarSign, Target, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Calculator() {
    const calc = useCalc();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="glass-panel p-8 rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent">
                    <div className="text-[10px] text-green-500 font-bold uppercase tracking-widest mb-6">نتيجة الحساب</div>
                    <div className="flex items-baseline gap-3 mb-8">
                        <span className="text-6xl font-black text-white">{calc.lotSize}</span>
                        <span className="text-xl text-slate-500 font-bold">عقد (Lot)</span>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: "المخاطرة ($)", val: `$${calc.riskAmt.toFixed(2)}`, color: "text-red-500", icon: <DollarSign className="w-3 h-3" /> },
                            { label: "العائد:المخاطرة", val: `${calc.rr}x`, color: "text-yellow-500", icon: <Target className="w-3 h-3" /> },
                            { label: "الوقف (نقطة)", val: (calc.pips * 100000).toFixed(0), color: "text-slate-400", icon: <Percent className="w-3 h-3" /> },
                            { label: "الربح المتوقع", val: `$${(calc.riskAmt * parseFloat(calc.rr)).toFixed(2)}`, color: "text-green-500", icon: <ShieldCheck className="w-3 h-3" /> },
                        ].map((item, i) => (
                            <div key={i} className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
                                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase mb-2">
                                    {item.icon}
                                    {item.label}
                                </div>
                                <div className={cn("text-lg font-mono font-bold", item.color)}>{item.val}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-white/5">
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-6">توزيع المخاطر المقترح</div>
                    <div className="space-y-6">
                        {[
                            { pair: "EUR/USD", risk: "1.5%", pnl: "+$340" },
                            { pair: "BTC/USD", risk: "1.0%", pnl: "-$120" },
                            { pair: "GOLD", risk: "2.5%", pnl: "+$680" },
                        ].map((p, i) => (
                            <div key={i} className="flex items-center gap-6">
                                <div className="w-20 font-bold">{p.pair}</div>
                                <div className="flex-1 h-2 bg-slate-900 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-yellow-500 rounded-full"
                                        style={{ width: p.risk === "1.5%" ? "60%" : p.risk === "1.0%" ? "40%" : "85%" }}
                                    />
                                </div>
                                <div className="w-20 text-left font-mono text-sm text-slate-400">{p.risk}</div>
                                <div className={cn("w-20 text-left font-bold", p.pnl.startsWith("+") ? "text-green-500" : "text-red-500")}>{p.pnl}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="glass-panel p-6 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500">
                            <CalcIcon className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold">إعدادات الحاسبة</h3>
                    </div>

                    <div className="space-y-6">
                        {[
                            { label: "رصيد الحساب ($)", val: calc.balance, set: calc.setBalance },
                            { label: "المخاطرة (%)", val: calc.risk, set: calc.setRisk },
                            { label: "سعر الدخول", val: calc.entry, set: calc.setEntry },
                            { label: "سعر الوقف", val: calc.sl, set: calc.setSl },
                            { label: "سعر الهدف", val: calc.tp, set: calc.setTp },
                        ].map((f, i) => (
                            <div key={i} className="space-y-2">
                                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{f.label}</label>
                                <input
                                    type="text"
                                    value={f.val}
                                    onChange={(e) => f.set(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm font-mono text-white focus:border-yellow-500/50 outline-none transition-all"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
