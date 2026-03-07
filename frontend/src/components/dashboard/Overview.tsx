"use client";

import { useState } from "react";
import {
    TrendingUp,
    TrendingDown,
    CheckCircle2,
    XCircle,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    Zap,
    Bot
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCryptoData } from "@/hooks/useCryptoData";
import CandlestickChart from "./Chart";

const recentTrades = [
    { id: 1, pair: "EUR/USD", dir: "LONG", entry: 1.0798, exit: 1.0865, sl: 1.0764, tp: 1.0872, rr: 2.0, result: "WIN", pnl: 134, date: "06 مارس" },
    { id: 2, pair: "GOLD", dir: "SHORT", entry: 2934, exit: 2901, sl: 2950, tp: 2895, rr: 2.4, result: "WIN", pnl: 330, date: "05 مارس" },
    { id: 3, pair: "BTC/USD", dir: "LONG", entry: 82100, exit: 81200, sl: 81000, tp: 84500, rr: 2.0, result: "LOSS", pnl: -150, date: "04 مارس" },
];

export default function Overview() {
    const { data: livePrices, status: wsStatus } = useCryptoData();
    const [aiAnalysis, setAiAnalysis] = useState<any>(null);
    const [loadingAi, setLoadingAi] = useState(false);
    const [chartSymbol, setChartSymbol] = useState("BTC/USD");

    const onAssetClick = async (symbol: string) => {
        setChartSymbol(symbol);
        setLoadingAi(true);
        try {
            const res = await fetch(`http://localhost:8000/ai/analyze?symbol=${encodeURIComponent(symbol)}`);
            const data = await res.json();
            setAiAnalysis(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingAi(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "رصيد الحساب", val: "$11,540", change: "+340$ اليوم", up: true, color: "text-white" },
                    { label: "الثقة في الاتجاه", val: aiAnalysis ? `${aiAnalysis.score}%` : "84%", change: aiAnalysis ? aiAnalysis.sentiment : "ارتباط قوي", up: true, color: "text-yellow-500" },
                    { label: "نسبة النجاح", val: "80%", change: "4 من 5 صفقات", up: true, color: "text-green-500" },
                    { label: "متوسط العائد:المخاطرة", val: "2.3x", change: "هذا الشهر", up: true, color: "text-blue-500" },
                ].map((k, i) => (
                    <div key={i} className="glass-panel p-6 rounded-xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[50px] -mr-16 -mt-16 group-hover:bg-white/10 transition-all" />
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-3">{k.label}</div>
                        <div className={cn("text-3xl font-black mb-2 tracking-tight transition-all", k.color)}>{k.val}</div>
                        <div className={cn(
                            "text-[10px] font-bold flex items-center gap-1",
                            k.up ? "text-green-500" : "text-red-500"
                        )}>
                            {k.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            {k.change}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Main Chart Logic Sidebar */}
                    <div className="glass-panel p-6 rounded-xl border border-white/5">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">منحنى حقوق الملكية</div>
                                <div className="text-2xl font-black text-green-500">$11,540</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "px-2 py-1 rounded-full text-[8px] font-bold uppercase tracking-tighter",
                                    wsStatus === "open" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                                )}>
                                    {wsStatus === "open" ? "LIVE DATA ON" : "CONNECTING..."}
                                </div>
                            </div>
                        </div>
                        <div className="h-[300px] w-full bg-slate-900/10 rounded-lg border border-white/5 overflow-hidden">
                            <CandlestickChart data={livePrices} symbol={chartSymbol} />
                        </div>
                    </div>

                    {/* AI Assistant Quick View */}
                    <div className="glass-panel p-6 rounded-xl border border-white/5 bg-gradient-to-br from-blue-500/5 to-transparent relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                                <Bot className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-sm">مساعد CalcWise الذكي</h3>
                        </div>
                        {aiAnalysis ? (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <p className="text-sm text-slate-300 leading-relaxed">{aiAnalysis.message}</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                        <div className="text-[10px] text-slate-500 uppercase mb-1">الدعم المتوقع</div>
                                        <div className="text-sm font-mono font-bold text-green-500">{aiAnalysis.levels.support}</div>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                        <div className="text-[10px] text-slate-500 uppercase mb-1">المقاومة المتوقعة</div>
                                        <div className="text-sm font-mono font-bold text-red-500">{aiAnalysis.levels.resistance}</div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-xs text-slate-500">اختر رمزًا من القائمة الجانبية للحصول على تحليل فوري مدعوم بالذكاء الاصطناعي.</p>
                        )}
                    </div>
                </div>

                {/* Market Bias Card - Live Updates */}
                <div className="glass-panel p-6 rounded-xl border border-white/5 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">الأسعار المباشرة (WS)</div>
                        <Zap className="w-3 h-3 text-yellow-500 animate-pulse" />
                    </div>
                    <div className="space-y-3 flex-1">
                        {(livePrices.length > 0 ? livePrices : [
                            { symbol: "BTC/USD", price: 84210, change: 0.12 },
                            { symbol: "ETH/USD", price: 3420, change: -0.05 },
                            { symbol: "GOLD", price: 2914.5, change: 0.08 },
                            { symbol: "EUR/USD", price: 1.0842, change: -0.01 },
                            { symbol: "GBP/USD", price: 1.2641, change: 0.02 },
                        ]).map((a: any, i) => (
                            <div
                                key={i}
                                onClick={() => onAssetClick(a.symbol)}
                                className="flex items-center gap-4 p-3 bg-white/5 border border-white/5 rounded-lg hover:border-yellow-500/20 transition-all cursor-pointer group active:scale-95"
                            >
                                <div className="flex-1">
                                    <div className="text-sm font-bold group-hover:text-yellow-500 transition-colors uppercase">{a.symbol}</div>
                                    <div className="text-[10px] font-mono text-slate-500">{a.timestamp || "--:--:--"}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-mono font-bold">{a.price.toLocaleString()}</div>
                                    <div className={cn(
                                        "text-[10px] font-mono",
                                        a.change >= 0 ? "text-green-500" : "text-red-500"
                                    )}>{a.change >= 0 ? "+" : ""}{a.change.toFixed(3)}%</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {loadingAi && (
                        <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-yellow-500 font-bold uppercase tracking-widest">
                            <div className="w-3 h-3 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                            جاري التحليل...
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Trades Table */}
            <div className="glass-panel rounded-xl border border-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">سجل العمليات الأخير</div>
                    <button className="text-xs text-yellow-500 font-bold hover:underline">المزيد من التفاصيل</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-right border-collapse text-sm">
                        <thead>
                            <tr className="bg-white/[0.02]">
                                {["الزوج", "الاتجاه", "الدخول", "الخروج", "PNL", "النتيجة", "التاريخ"].map(h => (
                                    <th key={h} className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {recentTrades.map((t) => (
                                <tr key={t.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="p-4 font-bold">{t.pair}</td>
                                    <td className="p-4">
                                        <span className={cn(
                                            "px-2 py-0.5 rounded text-[10px] font-black border",
                                            t.dir === "LONG" ? "bg-green-500/10 border-green-500/20 text-green-500" : "bg-red-500/10 border-red-500/20 text-red-500"
                                        )}>
                                            {t.dir === "LONG" ? "شراء" : "بيع"}
                                        </span>
                                    </td>
                                    <td className="p-4 font-mono text-slate-400">{t.entry}</td>
                                    <td className="p-4 font-mono text-slate-400">{t.exit}</td>
                                    <td className={cn(
                                        "p-4 font-black font-mono",
                                        t.pnl > 0 ? "text-green-500" : "text-red-500"
                                    )}>
                                        {t.pnl > 0 ? "+" : ""}${t.pnl}
                                    </td>
                                    <td className="p-4">
                                        {t.result === "WIN" ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                                    </td>
                                    <td className="p-4 text-slate-500 text-xs">{t.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
