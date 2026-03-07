"use client";

import { useEffect, useRef } from "react";
import {
    createChart,
    ColorType,
    IChartApi,
    ISeriesApi,
    CandlestickData,
    CandlestickSeries,
    UTCTimestamp
} from "lightweight-charts";

interface ChartProps {
    data: any[];
    symbol: string;
}

export default function CandlestickChart({ data, symbol }: ChartProps) {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        // Create chart
        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: "transparent" },
                textColor: "#94a3b8",
            },
            grid: {
                vertLines: { color: "rgba(148, 163, 184, 0.05)" },
                horzLines: { color: "rgba(148, 163, 184, 0.05)" },
            },
            width: chartContainerRef.current.clientWidth,
            height: 300,
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
                borderColor: "rgba(148, 163, 184, 0.1)",
            },
            rightPriceScale: {
                borderColor: "rgba(148, 163, 184, 0.1)",
            }
        });

        const series = chart.addSeries(CandlestickSeries, {
            upColor: "#10b981",
            downColor: "#f43f5e",
            borderVisible: false,
            wickUpColor: "#10b981",
            wickDownColor: "#f43f5e",
        });

        chartRef.current = chart;
        seriesRef.current = series;

        // Handle resize
        const handleResize = () => {
            if (chartContainerRef.current) {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            }
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            chart.remove();
        };
    }, []);

    const hasLoadedHistory = useRef<string | null>(null);

    // Initial Data Load (History)
    useEffect(() => {
        if (seriesRef.current && data && data.length > 0) {
            const liveAsset = data.find(a => a.symbol === symbol);
            if (liveAsset && liveAsset.candles && liveAsset.candles.length > 1 && hasLoadedHistory.current !== symbol) {
                const formatted = liveAsset.candles.map((c: any) => ({
                    time: c.time as UTCTimestamp,
                    open: c.open,
                    high: c.high,
                    low: c.low,
                    close: c.close,
                }));
                seriesRef.current.setData(formatted);
                hasLoadedHistory.current = symbol;
            }
        }
    }, [data, symbol]);

    // Real-time Update (Ticks)
    useEffect(() => {
        if (seriesRef.current && data && data.length > 0) {
            const liveAsset = data.find(a => a.symbol === symbol);
            if (liveAsset && liveAsset.candles && liveAsset.candles.length === 1) {
                const c = liveAsset.candles[0];
                seriesRef.current.update({
                    time: c.time as UTCTimestamp,
                    open: c.open,
                    high: c.high,
                    low: c.low,
                    close: c.close,
                });
            }
        }
    }, [data, symbol]);

    return (
        <div className="relative w-full h-full min-h-[300px]">
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <div className="px-2 py-1 rounded bg-slate-900/80 border border-white/10 text-[10px] font-bold text-yellow-500 uppercase tracking-widest">
                    {symbol} · LIVE · 1m
                </div>
            </div>
            <div ref={chartContainerRef} className="w-full h-full" />
        </div>
    );
}
