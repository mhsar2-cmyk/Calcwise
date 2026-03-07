"use client";
import React, { useEffect, useRef, memo } from 'react';

function MarketTicker() {
    const container = useRef<HTMLDivElement>(null);

    useEffect(
        () => {
            if (!container.current) return;
            if (container.current.querySelector('script')) return;

            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
        {
          "symbols": [
            { "proName": "FOREXCOM:SPX500", "title": "S&P 500" },
            { "proName": "FOREXCOM:NSXUSD", "title": "Nasdaq 100" },
            { "proName": "FX_IDC:EURUSD", "title": "EUR/USD" },
            { "proName": "BITSTAMP:BTCUSD", "title": "BTC/USD" },
            { "proName": "BITSTAMP:ETHUSD", "title": "ETH/USD" },
            { "description": "Gold", "proName": "OANDA:XAUUSD" },
            { "description": "Brent Crude", "proName": "TVC:UKOIL" }
          ],
          "showSymbolLogo": true,
          "colorTheme": "dark",
          "isTransparent": true,
          "displayMode": "adaptive",
          "locale": "ar"
        }`;
            container.current.appendChild(script);
        },
        []
    );

    return (
        <div className="tradingview-widget-container border-b border-white/5 bg-slate-950/80 backdrop-blur-xl" ref={container}>
            <div className="tradingview-widget-container__widget"></div>
        </div>
    );
}

export default memo(MarketTicker);
