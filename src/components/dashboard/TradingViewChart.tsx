"use client";
import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
    const container = useRef<HTMLDivElement>(null);

    useEffect(
        () => {
            if (!container.current) return;

            // Prevent multiple injections
            if (container.current.querySelector('script')) return;

            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
        {
          "autosize": true,
          "symbol": "FX:EURUSD",
          "interval": "60",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "ar",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
            container.current.appendChild(script);
        },
        []
    );

    return (
        <div className="tradingview-widget-container glass rounded-2xl border border-white/5 overflow-hidden w-full" style={{ height: '220px' }} ref={container}>
            <div className="tradingview-widget-container__widget h-full w-full"></div>
        </div>
    );
}

export default memo(TradingViewWidget);
