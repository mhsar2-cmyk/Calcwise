"use client";

import { useState, useEffect, useRef } from "react";

export interface CryptoPrice {
    symbol: string;
    price: number;
    change: number;
    timestamp: string;
}

export function useCryptoData() {
    const [data, setData] = useState<CryptoPrice[]>([]);
    const [status, setStatus] = useState<"connecting" | "open" | "closed">("connecting");
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8000/ws/crypto");
        ws.current = socket;

        socket.onopen = () => setStatus("open");
        socket.onclose = () => setStatus("closed");
        socket.onmessage = (event) => {
            const prices = JSON.parse(event.data);
            setData(prices);
        };

        return () => {
            socket.close();
        };
    }, []);

    return { data, status };
}
