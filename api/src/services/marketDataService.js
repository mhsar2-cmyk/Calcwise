const axios = require('axios');
const path = require('path');

// Safe Yahoo Finance Loading
let yfModule = null;
try {
    yfModule = require('yahoo-finance2').default || require('yahoo-finance2');
} catch (e) {
    console.error('[MarketData] CRITICAL: Failed to load yahoo-finance2:', e.message);
}

class MarketDataService {
    constructor() {
        this.cryptoApis = {
            binance: 'https://api.binance.com/api/v3',
            coingecko: 'https://api.coingecko.com/api/v3'
        };

        this.coinGeckoMap = {
            'BTC': 'bitcoin', 'ETH': 'ethereum', 'SOL': 'solana', 'XRP': 'ripple',
            'ADA': 'cardano', 'DOGE': 'dogecoin', 'AVAX': 'avalanche-2', 'DOT': 'polkadot',
            'BNB': 'binancecoin', 'MATIC': 'matic-network', 'LINK': 'chainlink',
            'LTC': 'litecoin', 'BCH': 'bitcoin-cash', 'XLM': 'stellar', 'ATOM': 'cosmos',
            'UNI': 'uniswap', 'ALGO': 'algorand', 'SHIB': 'shiba-inu', 'TRX': 'tron',
            'TON': 'the-open-network', 'NEAR': 'near', 'STX': 'stack', 'ORDI': 'ordi',
            'RNDR': 'render-token', 'KAS': 'kaspa', 'PEPE': 'pepe', 'INJ': 'injective-protocol'
        };

        this.yf = yfModule;
        // Suppress notices if possible
        if (this.yf && typeof this.yf.setGlobalConfig === 'function') {
            try {
                this.yf.setGlobalConfig({ suppressNotices: ['yahooSurvey'] });
            } catch (e) { }
        }

        // Pricing Cache (In-memory) - Very important for serverless stability
        this.cache = new Map();
        this.cacheExpiry = 60 * 1000; // 1 minute fresh
        this.cacheStaleLimit = 60 * 60 * 1000; // 1 hour stale fallback
    }

    // Helper to map internal symbols to Yahoo Finance symbols
    getYahooSymbol(symbol) {
        const indexMap = {
            'SPX': '^GSPC', 'NDX': '^IXIC', 'DJI': '^DJI', 'TASI': '^TASI'
        };

        if (indexMap[symbol]) return indexMap[symbol];
        if (/^\d{4}$/.test(symbol)) return `${symbol}.SR`;

        const forexMap = {
            'XAUUSD': 'GC=F', 'XAGUSD': 'SI=F',
            'EURUSD': 'EURUSD=X', 'GBPUSD': 'GBPUSD=X', 'USDJPY': 'USDJPY=X',
            'WTI': 'CL=F', 'BRN': 'BZ=F'
        };

        if (forexMap[symbol]) return forexMap[symbol];
        return symbol;
    }

    // New: Batch fetch from Yahoo Finance with internal safety
    async batchGetStockPricesFromYahoo(symbols) {
        if (!symbols || symbols.length === 0 || !this.yf) return {};

        const mappedSymbols = symbols.map(s => this.getYahooSymbol(s));
        console.log(`[MarketData] Yahoo Batch: ${mappedSymbols.join(',')}`);

        try {
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Yahoo Timeout')), 7000)
            );

            // Important: validate that mapping symbols works
            const quoteResults = await Promise.race([
                this.yf.quote(mappedSymbols),
                timeoutPromise
            ]);

            const results = {};
            const quotes = Array.isArray(quoteResults) ? quoteResults : [quoteResults];

            quotes.forEach(res => {
                if (!res || !res.symbol) return;

                // Find matching original symbol (Yahoo symbols might be uppercase or have suffixes)
                const originalSymbol = symbols.find(s =>
                    this.getYahooSymbol(s).toLowerCase() === res.symbol.toLowerCase()
                );

                if (originalSymbol) {
                    results[originalSymbol] = {
                        price: res.regularMarketPrice || res.preMarketPrice || 0,
                        change: res.regularMarketChange || 0,
                        changePercent: res.regularMarketChangePercent || 0,
                        volume: res.regularMarketVolume || 0,
                        marketCap: res.marketCap ? this.formatMarketCap(res.marketCap) : 'N/A',
                        source: 'yahoo_finance',
                        symbol: originalSymbol,
                        name: res.shortName || res.longName || originalSymbol
                    };
                }
            });
            return results;
        } catch (error) {
            console.error('[MarketData] Yahoo Batch Error:', error.message);
            return {};
        }
    }

    // Batch fetch from CoinGecko
    async batchGetCryptoPricesFromCoinGecko(coinIds) {
        if (!coinIds || coinIds.length === 0) return {};
        const ids = coinIds.join(',');
        console.log(`[MarketData] CoinGecko Batch: ${ids}`);

        try {
            const url = `${this.cryptoApis.coingecko}/simple/price?ids=${ids}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`;
            const response = await axios.get(url, { timeout: 6000 });

            const results = {};
            if (response.data) {
                Object.keys(response.data).forEach(id => {
                    const data = response.data[id];
                    results[id] = {
                        price: data.usd,
                        change: (data.usd * (data.usd_24h_change / 100)) || 0,
                        changePercent: data.usd_24h_change || 0,
                        volume: data.usd_24h_vol || 0,
                        marketCap: data.usd_market_cap ? this.formatMarketCap(data.usd_market_cap) : 'N/A',
                        source: 'coingecko',
                        symbol: id.toUpperCase()
                    };
                });
            }
            return results;
        } catch (error) {
            console.error(`[MarketData] CoinGecko Batch Error:`, error.message);
            return {};
        }
    }

    // Individual Binance fetch (Backup)
    async getCryptoPriceFromBinance(symbol) {
        try {
            const response = await axios.get(`${this.cryptoApis.binance}/ticker/24hr?symbol=${symbol}USDT`, { timeout: 4000 });
            const data = response.data;
            return {
                price: parseFloat(data.lastPrice),
                change: parseFloat(data.priceChange),
                changePercent: parseFloat(data.priceChangePercent),
                volume: parseFloat(data.volume),
                marketCap: 'N/A',
                source: 'binance',
                symbol: symbol
            };
        } catch (error) {
            return null;
        }
    }

    formatMarketCap(val) {
        if (val >= 1e12) return (val / 1e12).toFixed(2) + 'T';
        if (val >= 1e9) return (val / 1e9).toFixed(2) + 'B';
        if (val >= 1e6) return (val / 1e6).toFixed(2) + 'M';
        return val.toString();
    }

    // Primary Orchestrator - Optimized for Speed and Safety
    async getPortfolioPrices(assets) {
        const prices = {};
        if (!assets || assets.length === 0) return prices;

        try {
            const cryptoAssets = assets.filter(a => a.market_type === 'crypto');
            const stockAssets = assets.filter(a => a.market_type === 'stock' || a.market_type === 'forex');

            // RUN ALL BATCH FETCHES IN PARALLEL to beat serverless timeouts
            const fetchPromises = [];

            // 1. CoinGecko
            if (cryptoAssets.length > 0) {
                const cryptoIds = cryptoAssets.map(a => this.coinGeckoMap[a.symbol.toUpperCase()] || a.symbol.toLowerCase());
                fetchPromises.push(this.batchGetCryptoPricesFromCoinGecko(cryptoIds).then(results => {
                    cryptoAssets.forEach(asset => {
                        const id = this.coinGeckoMap[asset.symbol.toUpperCase()] || asset.symbol.toLowerCase();
                        if (results[id]) {
                            prices[asset.symbol] = results[id];
                            this.cache.set(asset.symbol, { data: results[id], timestamp: Date.now() });
                        }
                    });
                }));
            }

            // 2. Yahoo Finance
            if (stockAssets.length > 0) {
                const stockSymbols = stockAssets.map(a => a.symbol);
                fetchPromises.push(this.batchGetStockPricesFromYahoo(stockSymbols).then(results => {
                    stockAssets.forEach(asset => {
                        if (results[asset.symbol]) {
                            prices[asset.symbol] = results[asset.symbol];
                            this.cache.set(asset.symbol, { data: results[asset.symbol], timestamp: Date.now() });
                        }
                    });
                }));
            }

            // Wait for batches (with overall 7s timeout for this phase)
            await Promise.all(fetchPromises);

            // 3. Fallback for remaining crypto (Binance) - Parallel
            const missingCrypto = cryptoAssets.filter(a => !prices[a.symbol]);
            if (missingCrypto.length > 0) {
                const binancePromises = missingCrypto.map(async (asset) => {
                    const data = await this.getCryptoPriceFromBinance(asset.symbol);
                    if (data) {
                        prices[asset.symbol] = data;
                        this.cache.set(asset.symbol, { data, timestamp: Date.now() });
                    }
                });
                await Promise.all(binancePromises);
            }

            // 4. Final Fallback Loop: Check Cache -> Mock
            assets.forEach(asset => {
                if (!prices[asset.symbol]) {
                    const cached = this.cache.get(asset.symbol);
                    if (cached && (Date.now() - cached.timestamp < this.cacheStaleLimit)) {
                        prices[asset.symbol] = cached.data;
                    } else {
                        prices[asset.symbol] = this.getMockStockData(asset.symbol);
                    }
                }
            });

        } catch (error) {
            console.error('[MarketData] Global Error:', error.message);
            // Emergency fallback for all
            assets.forEach(asset => {
                if (!prices[asset.symbol]) {
                    const cached = this.cache.get(asset.symbol);
                    prices[asset.symbol] = cached ? cached.data : this.getMockStockData(asset.symbol);
                }
            });
        }

        return prices;
    }

    getMockStockData(symbol) {
        const mockData = {
            'TASI': { price: 12450.30, change: 45.20, changePercent: 0.36 },
            'SPX': { price: 4780.25, change: 25.40, changePercent: 0.53 },
            'BTC': { price: 45250.00, change: 1200.50, changePercent: 2.72 },
            'AAPL': { price: 185.90, change: 1.20, changePercent: 0.65 }
        };
        const data = mockData[symbol] || { price: 100, change: 0, changePercent: 0 };
        return { ...data, volume: 100000, marketCap: '1B', source: 'mock_data', symbol };
    }

    async getHistoricalData(symbol, marketType, days = 30) {
        try {
            if (marketType === 'crypto') {
                const cgId = this.coinGeckoMap[symbol.toUpperCase()] || symbol.toLowerCase();
                const url = `${this.cryptoApis.coingecko}/coins/${cgId}/market_chart?vs_currency=usd&days=${days}`;
                const response = await axios.get(url, { timeout: 5000 });
                return response.data.prices.map(([timestamp, price]) => ({
                    timestamp, price, time: new Date(timestamp).toISOString()
                }));
            }
        } catch (error) {
            console.error(`[MarketData] Historical Error: ${symbol}`, error.message);
        }
        return [];
    }
}

module.exports = new MarketDataService();