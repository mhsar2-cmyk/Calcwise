import asyncio
import json
import random
import httpx
from datetime import datetime
from typing import Dict, List
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import websockets

app = FastAPI(title="Calcwise AI Engine")

# Configure CORS for Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Shared price state
prices: Dict[str, Dict] = {
    "BTC/USD": {"price": 0.0, "change": 0.0, "candles": []},
    "ETH/USD": {"price": 0.0, "change": 0.0, "candles": []},
    "EUR/USD": {"price": 1.0842, "change": 0.0, "candles": []},
    "GOLD": {"price": 2914.5, "change": 0.0, "candles": []},
    "GBP/USD": {"price": 1.2641, "change": 0.0, "candles": []}
}

# Mapping our symbols to Binance symbols
BINANCE_SYMBOLS = {
    "btcusdt": "BTC/USD",
    "ethusdt": "ETH/USD",
}

async def fetch_historical_candles(symbol: str, limit: int = 100):
    """Fetch recent klines from Binance REST API"""
    binance_symbol = symbol.replace("/", "").upper()
    if "USD" in binance_symbol:
        binance_symbol = binance_symbol.replace("USD", "USDT")
        
    url = f"https://api.binance.com/api/v3/klines?symbol={binance_symbol}&interval=1m&limit={limit}"
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            if response.status_code == 200:
                data = response.json()
                candles = []
                for k in data:
                    candles.append({
                        "time": k[0] // 1000,
                        "open": float(k[1]),
                        "high": float(k[2]),
                        "low": float(k[3]),
                        "close": float(k[4]),
                    })
                return candles
    except Exception as e:
        print(f"Error fetching historical candles for {symbol}: {e}")
    return []

async def binance_listener():
    """Background task to fetch real-time data from Binance"""
    # Pre-populate with historical candles
    for our_sym in ["BTC/USD", "ETH/USD"]:
        candles = await fetch_historical_candles(our_sym)
        if candles:
            prices[our_sym]["candles"] = candles
            prices[our_sym]["price"] = candles[-1]["close"]

    uri = "wss://stream.binance.com:9443/ws"
    subscribe_msg = {
        "method": "SUBSCRIBE",
        "params": [
            "btcusdt@ticker",
            "ethusdt@ticker",
            "btcusdt@kline_1m",
            "ethusdt@kline_1m"
        ],
        "id": 1
    }
    
    while True:
        try:
            async with websockets.connect(uri) as websocket:
                await websocket.send(json.dumps(subscribe_msg))
                print("Subscribed to Binance WebSocket (Tickers & Klines)")
                
                while True:
                    message = await websocket.recv()
                    data = json.loads(message)
                    
                    if "e" in data:
                        event_type = data["e"]
                        symbol_lower = data["s"].lower()
                        our_symbol = BINANCE_SYMBOLS.get(symbol_lower)
                        
                        if not our_symbol: continue

                        if event_type == "24hrTicker":
                            prices[our_symbol]["price"] = float(data["c"])
                            prices[our_symbol]["change"] = float(data["P"])
                            prices[our_symbol]["timestamp"] = datetime.now().strftime("%H:%M:%S")
                        
                        elif event_type == "kline":
                            k = data["k"]
                            candle = {
                                "time": k["t"] // 1000,
                                "open": float(k["o"]),
                                "high": float(k["h"]),
                                "low": float(k["l"]),
                                "close": float(k["c"]),
                            }
                            if not prices[our_symbol]["candles"]:
                                prices[our_symbol]["candles"] = [candle]
                            else:
                                if prices[our_symbol]["candles"][-1]["time"] == candle["time"]:
                                    prices[our_symbol]["candles"][-1] = candle
                                else:
                                    prices[our_symbol]["candles"].append(candle)
                                    if len(prices[our_symbol]["candles"]) > 300: # Extra buffer
                                        prices[our_symbol]["candles"].pop(0)

        except Exception as e:
            print(f"Binance WS Error: {e}. Retrying in 5s...")
            await asyncio.sleep(5)

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(binance_listener())

@app.get("/ai/analyze")
async def analyze_market(symbol: str = "BTC/USD"):
    symbol_data = prices.get(symbol, {"price": 0.0})
    current_price = symbol_data.get("price", 0.0)
    change = symbol_data.get("change", 0.0)
    
    sentiment_score = 50 + (change * 5)
    sentiment_score = max(0, min(100, sentiment_score))
    bias = "BULL" if sentiment_score > 55 else "BEAR" if sentiment_score < 45 else "NEUTRAL"
    
    return {
        "symbol": symbol,
        "sentiment": bias,
        "score": round(sentiment_score, 1),
        "levels": {
            "support": round(current_price * 0.992, 2 if current_price > 100 else 4),
            "resistance": round(current_price * 1.008, 2 if current_price > 100 else 4)
        },
        "message": f"التحليل الفني المباشر لـ {symbol} (السعر: {current_price}) يظهر ميلاً { 'صاعداً' if bias == 'BULL' else 'هابطاً' if bias == 'BEAR' else 'محايداً' } بناءً على زخم التداول في بينانس."
    }

@app.websocket("/ws/crypto")
async def crypto_stream(websocket: WebSocket):
    await websocket.accept()
    # On initial connect, send some history
    initial_payload = []
    for sym, data in prices.items():
        initial_payload.append({
            "symbol": sym,
            "price": data.get("price", 0),
            "change": data.get("change", 0),
            "timestamp": data.get("timestamp", "--:--:--"),
            "candles": data.get("candles", []) # Full history for first sync
        })
    await websocket.send_json(initial_payload)

    try:
        while True:
            # Prepare incremental update
            output_data = []
            for sym, data in prices.items():
                output_data.append({
                    "symbol": sym,
                    "price": data.get("price", 0),
                    "change": data.get("change", 0),
                    "timestamp": data.get("timestamp", "--:--:--"),
                    "candles": data.get("candles", [])[-1:] # Just latest candle
                })
            await websocket.send_json(output_data)
            await asyncio.sleep(1)
    except WebSocketDisconnect:
        pass

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
