const axios = require('axios');
let yahooFinance;
try {
    yahooFinance = require('yahoo-finance2').default;
    if (!yahooFinance) yahooFinance = require('yahoo-finance2');
} catch (e) {
    console.error('Failed to load yahoo-finance2:', e.message);
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
            'UNI': 'uniswap', 'ALGO': 'algorand', 'SHIB': 'shiba-inu', 'TRX': 'tron'
        };

        this.stockApis = {
            alphaVantage: 'https://www.alphavantage.co/query',
            polygon: 'https://api.polygon.io/v2'
        };

        // Instantiate Yahoo Finance with suppressed notices
        if (typeof yahooFinance === 'function') {
            this.yf = new yahooFinance({ suppressNotices: ['yahooSurvey'] });
        } else {
            this.yf = yahooFinance;
        }

        // Pricing Cache (In-memory)
        this.cache = new Map();
        this.cacheExpiry = 60 * 1000; // 1 minute
    }

    // Helper to map internal symbols to Yahoo Finance symbols
    getYahooSymbol(symbol) {
        const indexMap = {
            'SPX': '^GSPC',
            'NDX': '^IXIC',
            'DJI': '^DJI',
            'TASI': '^TASI'
        };

        if (indexMap[symbol]) return indexMap[symbol];
        if (/^\d{4}$/.test(symbol)) return `${symbol}.SR`;

        const forexMap = {
            'XAUUSD': 'GC=F',   // Gold
            'XAGUSD': 'SI=F',   // Silver
            'EURUSD': 'EURUSD=X',
            'GBPUSD': 'GBPUSD=X',
            'USDJPY': 'USDJPY=X',
            'WTI': 'CL=F'       // Crude Oil
        };

        if (forexMap[symbol]) return forexMap[symbol];
        return symbol;
    }

    // جلب سعر الأصل من Yahoo Finance (Single Symbol)
    async getStockPriceFromYahoo(symbol) {
        try {
            const results = await this.batchGetStockPricesFromYahoo([symbol]);
            return results[symbol] || this.getMockStockData(symbol);
        } catch (error) {
            console.error(`Yahoo Finance individual fetch error for ${symbol}:`, error.message);
            return this.getMockStockData(symbol);
        }
    }

    // New: Batch fetch from Yahoo Finance to prevent timeouts
    async batchGetStockPricesFromYahoo(symbols) {
        if (!symbols || symbols.length === 0) return {};

        const mappedSymbols = symbols.map(s => this.getYahooSymbol(s));
        console.log(`[MarketData] Batch fetching ${symbols.length} stocks from Yahoo...`);

        try {
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Yahoo Batch timeout')), 8000)
            );

            const quoteResults = await Promise.race([
                this.yf.quote(mappedSymbols),
                timeoutPromise
            ]);

            const results = {};

            // Normalize result to array if it's a single object
            const quotes = Array.isArray(quoteResults) ? quoteResults : [quoteResults];

            quotes.forEach(res => {
                if (!res || !res.symbol) return;

                // Find which original symbol this corresponds to
                const originalSymbol = symbols.find(s => this.getYahooSymbol(s) === res.symbol);
                if (!originalSymbol) return;

                results[originalSymbol] = {
                    price: res.regularMarketPrice,
                    change: res.regularMarketChange || 0,
                    changePercent: res.regularMarketChangePercent || 0,
                    volume: res.regularMarketVolume || 0,
                    marketCap: res.marketCap ? this.formatMarketCap(res.marketCap) : 'N/A',
                    source: 'yahoo_finance',
                    symbol: originalSymbol,
                    name: res.shortName || res.longName || originalSymbol
                };
            });

            return results;
        } catch (error) {
            console.error('Yahoo Batch API error:', error.message);
            return {};
        }
    }

    formatMarketCap(val) {
        if (val >= 1e12) return (val / 1e12).toFixed(2) + 'T';
        if (val >= 1e9) return (val / 1e9).toFixed(2) + 'B';
        if (val >= 1e6) return (val / 1e6).toFixed(2) + 'M';
        return val.toString();
    }

    // جلب سعر الأصل من Binance (مع بيانات التغير والحجم)
    async getCryptoPriceFromBinance(symbol) {
        console.log(`[MarketData] Fetching ${symbol} from Binance...`);
        try {
            const response = await axios.get(`${this.cryptoApis.binance}/ticker/24hr?symbol=${symbol}USDT`, { timeout: 4000 });
            const data = response.data;
            console.log(`[MarketData] ${symbol} fetched from Binance.`);

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
            console.error(`Binance API error for ${symbol}:`, error.message);
            return this.getMockStockData(symbol);
        }
    }

    // Batch fetch from CoinGecko to prevent rate limiting and timeouts
    async batchGetCryptoPricesFromCoinGecko(coinIds) {
        if (!coinIds || coinIds.length === 0) return {};
        const ids = coinIds.join(',');
        console.log(`[MarketData] Batch fetching ${coinIds.length} assets from CoinGecko...`);

        try {
            const url = `${this.cryptoApis.coingecko}/simple/price?ids=${ids}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`;
            const response = await axios.get(url, { timeout: 6000 });

            const results = {};
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
            return results;
        } catch (error) {
            console.error(`CoinGecko Batch API error:`, error.message);
            return {};
        }
    }

    // بيانات وهمية للعرض (Fallback)
    getMockStockData(symbol) {
        const mockData = {
            'TASI': { price: 12450.30, change: 45.20, changePercent: 0.36, volume: 250000000, marketCap: '10.5T' },
            '2222.SR': { price: 32.50, change: -0.15, changePercent: -0.46, volume: 15420300, marketCap: '7.8T' },
            '2010.SR': { price: 79.10, change: 0.50, changePercent: 0.64, volume: 2300500, marketCap: '237B' },
            'SPX': { price: 4780.25, change: 25.40, changePercent: 0.53, volume: 2500000000, marketCap: '40T' },
            'NDX': { price: 16850.60, change: 120.30, changePercent: 0.72, volume: 1800000000, marketCap: '25T' },
            'DJI': { price: 37650.10, change: 150.20, changePercent: 0.40, volume: 350000000, marketCap: '12T' },
            'AAPL': { price: 185.90, change: 1.20, changePercent: 0.65, volume: 55000000, marketCap: '2.9T' },
            'BTC': { price: 45250.00, change: 1200.50, changePercent: 2.72, volume: 35000000000, marketCap: '885B' },
            'ETH': { price: 2350.20, change: 85.30, changePercent: 3.77, volume: 15000000000, marketCap: '282B' },
            'EURUSD': { price: 1.0950, change: 0.0020, changePercent: 0.18, volume: 0, marketCap: '-' },
            'XAUUSD': { price: 2045.50, change: 12.50, changePercent: 0.61, volume: 0, marketCap: '-' }
        };

        const defaultData = { price: 100.00, change: 0.00, changePercent: 0.00, volume: 100000, marketCap: '1B' };
        const data = mockData[symbol] || defaultData;

        return {
            ...data,
            source: 'mock_data',
            symbol: symbol
        };
    }

    // جلب سعر الذهب (XAU/USD)
    async getGoldPrice() {
        return this.getStockPriceFromYahoo('XAUUSD');
    }

    // جلب جميع أسعار المحفظة - Optimized with Batching & Caching
    async getPortfolioPrices(assets) {
        const prices = {};
        if (!assets || assets.length === 0) return prices;

        try {
            // Group assets by market type
            const cryptoAssets = assets.filter(a => a.market_type === 'crypto');
            const stockAssets = assets.filter(a => a.market_type === 'stock' || a.market_type === 'forex');

            // 1. Batch Fetch Crypto from CoinGecko
            if (cryptoAssets.length > 0) {
                const cryptoIds = cryptoAssets.map(a => this.coinGeckoMap[a.symbol] || a.symbol.toLowerCase());
                const cgResults = await this.batchGetCryptoPricesFromCoinGecko(cryptoIds);

                cryptoAssets.forEach(asset => {
                    const id = this.coinGeckoMap[asset.symbol] || asset.symbol.toLowerCase();
                    if (cgResults[id]) {
                        prices[asset.symbol] = cgResults[id];
                        this.cache.set(asset.symbol, { data: cgResults[id], timestamp: Date.now() });
                    }
                });
            }

            // 2. Fetch remaining crypto from Binance fallback
            const missingCrypto = cryptoAssets.filter(a => !prices[a.symbol]);
            if (missingCrypto.length > 0) {
                const binancePromises = missingCrypto.map(async (asset) => {
                    const data = await this.getCryptoPriceFromBinance(asset.symbol);
                    if (data && data.source !== 'mock_data') {
                        prices[asset.symbol] = data;
                        this.cache.set(asset.symbol, { data, timestamp: Date.now() });
                    }
                });
                await Promise.all(binancePromises);
            }

            // 3. Batch Fetch Stocks & Forex from Yahoo
            if (stockAssets.length > 0) {
                const stockSymbols = stockAssets.map(a => a.symbol);
                const yahooResults = await this.batchGetStockPricesFromYahoo(stockSymbols);

                stockAssets.forEach(asset => {
                    if (yahooResults[asset.symbol]) {
                        prices[asset.symbol] = yahooResults[asset.symbol];
                        this.cache.set(asset.symbol, { data: yahooResults[asset.symbol], timestamp: Date.now() });
                    }
                });
            }

            // 4. Final Fallback Sequence: Cache -> Mock
            assets.forEach(asset => {
                if (!prices[asset.symbol]) {
                    const cached = this.cache.get(asset.symbol);
                    if (cached && (Date.now() - cached.timestamp < this.cacheExpiry * 60)) { // 60 min cache for fallbacks
                        prices[asset.symbol] = cached.data;
                    } else {
                        prices[asset.symbol] = this.getMockStockData(asset.symbol);
                    }
                }
            });

        } catch (error) {
            console.error('Global error in getPortfolioPrices:', error.message);
            assets.forEach(asset => {
                if (!prices[asset.symbol]) {
                    const cached = this.cache.get(asset.symbol);
                    prices[asset.symbol] = cached ? cached.data : this.getMockStockData(asset.symbol);
                }
            });
        }

        return prices;
    }

    // جلب البيانات التاريخية (للتحليل الفني)
    async getHistoricalData(symbol, marketType, days = 30) {
        try {
            let url = '';

            if (marketType === 'crypto') {
                const cgId = this.coinGeckoMap[symbol] || symbol.toLowerCase();
                url = `${this.cryptoApis.coingecko}/coins/${cgId}/market_chart?vs_currency=usd&days=${days}`;
                const response = await axios.get(url);

                return response.data.prices.map(([timestamp, price]) => ({
                    timestamp,
                    price,
                    time: new Date(timestamp).toISOString()
                }));
            }

            return [];
        } catch (error) {
            console.error(`Historical data error for ${symbol}:`, error.message);
            return [];
        }
    }
}

module.exports = new MarketDataService();