"use client";
import React, { useState, useEffect } from 'react';
import { Calculator, AlertCircle, Info } from 'lucide-react';

export const PositionSizeCalculator = () => {
    const [balance, setBalance] = useState<number>(10000);
    const [riskPercent, setRiskPercent] = useState<number>(1);
    const [entry, setEntry] = useState<number>(1.0850);
    const [stopLoss, setStopLoss] = useState<number>(1.0800);
    const [positionSize, setPositionSize] = useState<number>(0);
    const [riskAmount, setRiskAmount] = useState<number>(0);

    useEffect(() => {
        const riskAmt = balance * (riskPercent / 100);
        const pips = Math.abs(entry - stopLoss);

        if (pips > 0) {
            const size = riskAmt / pips;
            setPositionSize(Math.round(size));
            setRiskAmount(riskAmt);
        }
    }, [balance, riskPercent, entry, stopLoss]);

    return (
        <div className="glass p-6 rounded-2xl border border-white/5 text-right">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Calculator size={20} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">حاسبة حجم الصفقة</h3>
                    <p className="text-xs text-slate-500">احسب حجم العقود بناءً على المخاطرة</p>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1.5 flex items-center gap-2">
                        رصيد الحساب ($)
                    </label>
                    <input
                        type="number"
                        value={balance}
                        onChange={(e) => setBalance(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 transition-colors text-left dir-ltr"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">المخاطرة (%)</label>
                        <input
                            type="number"
                            value={riskPercent}
                            onChange={(e) => setRiskPercent(Number(e.target.value))}
                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 transition-colors text-left dir-ltr"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5 flex items-center gap-2">
                            المخاطرة ($) <Info size={12} className="text-slate-500" />
                        </label>
                        <div className="w-full bg-slate-900/50 border border-white/5 rounded-lg px-4 py-2 text-slate-300 text-left dir-ltr">
                            {riskAmount.toFixed(2)}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">سعر الدخول</label>
                        <input
                            type="number"
                            step="0.0001"
                            value={entry}
                            onChange={(e) => setEntry(Number(e.target.value))}
                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 transition-colors text-left dir-ltr"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">وقف الخسارة</label>
                        <input
                            type="number"
                            step="0.0001"
                            value={stopLoss}
                            onChange={(e) => setStopLoss(Number(e.target.value))}
                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 transition-colors text-left dir-ltr"
                        />
                    </div>
                </div>

                <div className="mt-8 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <div className="text-sm text-slate-400 mb-1 text-center">حجم الصفقة الموصى به</div>
                    <div className="text-3xl font-bold text-white text-center tracking-tight">
                        {positionSize.toLocaleString()} <span className="text-sm font-normal text-slate-500 underline underline-offset-4 decoration-blue-500/50">وحدة</span>
                    </div>
                    <div className="text-xs text-blue-400 text-center mt-2 flex items-center justify-center gap-1">
                        <AlertCircle size={12} /> {(positionSize / 100000).toFixed(2)} لوط قياسي (Standard Lots)
                    </div>
                </div>
            </div>
        </div>
    );
};

