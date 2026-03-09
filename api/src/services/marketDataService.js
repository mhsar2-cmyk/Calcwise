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
            this.yf = yahooFinance; // Might be a singleton
        }
    }

    // جلب سعر الأصل من Yahoo Finance
    async getStockPriceFromYahoo(symbol) {
        console.log(`[MarketData] Fetching ${symbol} from Yahoo...`);
        try {
            // تحويل الرموز للسوق السعودي إذا كانت أرقام فقط
            let yahooSymbol = symbol;

            // Mapping common US and Saudi indices
            const indexMap = {
                'SPX': '^GSPC',
                'NDX': '^IXIC',
                'DJI': '^DJI',
                'TASI': '^TASI'
            };

            if (indexMap[symbol]) {
                yahooSymbol = indexMap[symbol];
            } else if (/^\d{4}$/.test(symbol)) {
                yahooSymbol = `${symbol}.SR`;
            } else if (symbol.endsWith('.SR')) {
                // Keep it as is
            }

            // تحويل الرموز للعملات (Forex)
            if (['EURUSD', 'GBPUSD', 'USDJPY', 'XAUUSD', 'XAGUSD'].includes(symbol)) {
                if (symbol === 'XAUUSD') yahooSymbol = 'GC=F'; // Gold Futures
                else if (symbol === 'XAGUSD') yahooSymbol = 'SI=F'; // Silver Futures
                else yahooSymbol = `${symbol}=X`;
            }

            // Creating a timeout for yahooFinance.quote
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Yahoo Finance timeout')), 6000)
            );

            const result = await Promise.race([
                this.yf.quote(yahooSymbol),
                timeoutPromise
            ]);

            console.log(`[MarketData] ${symbol} fetched from Yahoo.`);
            if (!result || !result.regularMarketPrice) {
                return this.getMockStockData(symbol);
            }

            return {
                price: result.regularMarketPrice,
                change: result.regularMarketChange || 0,
                changePercent: result.regularMarketChangePercent || 0,
                volume: result.regularMarketVolume || 0,
                marketCap: result.marketCap ? this.formatMarketCap(result.marketCap) : 'N/A',
                source: 'yahoo_finance',
                symbol: symbol,
                name: result.shortName || result.longName || symbol
            };
        } catch (error) {
            console.error(`Yahoo Finance API error for ${symbol}:`, error.message);
            return this.getMockStockData(symbol);
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

    // جلب سعر الأصل من CoinGecko
    async getCryptoPriceFromCoinGecko(coinId) {
        console.log(`[MarketData] Fetching ${coinId} from CoinGecko...`);
        try {
            const response = await axios.get(`${this.cryptoApis.coingecko}/simple/price?ids=${coinId}&vs_currencies=usd`, { timeout: 4000 });
            if (response.data && response.data[coinId]) {
                return {
                    price: response.data[coinId].usd,
                    source: 'coingecko',
                    symbol: coinId
                };
            }
            return null;
        } catch (error) {
            console.error(`CoinGecko API error for ${coinId}:`, error.message);
            return null;
        }
    }

    // جلب سعر السهم من Alpha Vantage (يدعم السوق السعودي .SR)
    async getStockPriceFromAlphaVantage(symbol, apiKey) {
        try {
            // تحويل الرموز السعودية للتنسيق الصحيح إذا لزم الأمر
            const avSymbol = symbol.includes('.') ? symbol : `${symbol}.SR`; // افتراضي للسوق السعودي إذا لم يوجد امتداد

            // التحقق من وجود مفتاح API
            if (!apiKey || apiKey === 'your_polygon_key' || apiKey === 'demo') {
                return this.getMockStockData(symbol);
            }

            const response = await axios.get(`${this.stockApis.alphaVantage}?function=GLOBAL_QUOTE&symbol=${avSymbol}&apikey=${apiKey}`);
            const data = response.data['Global Quote'];

            if (!data || !data['05. price']) {
                return this.getMockStockData(symbol);
            }

            return {
                price: parseFloat(data['05. price']),
                change: parseFloat(data['09. change']),
                changePercent: parseFloat(data['10. change percent'].replace('%', '')),
                source: 'alpha_vantage',
                symbol: symbol
            };
        } catch (error) {
            console.error(`Alpha Vantage API error for ${symbol}:`, error.message);
            return this.getMockStockData(symbol);
        }
    }

    // بيانات وهمية للعرض (Fallback)
    getMockStockData(symbol) {
        const mockData = {
            // مؤشر السوق الرئيسي
            'TASI': { price: 12450.30, change: 45.20, changePercent: 0.36, volume: 250000000, marketCap: '10.5T' },

            // الطاقة والمواد الأساسية
            '2222.SR': { price: 32.50, change: -0.15, changePercent: -0.46, volume: 15420300, marketCap: '7.8T' }, // Aramco
            '2010.SR': { price: 79.10, change: 0.50, changePercent: 0.64, volume: 2300500, marketCap: '237B' },   // SABIC
            '2020.SR': { price: 145.20, change: 1.80, changePercent: 1.25, volume: 450000, marketCap: '72B' },    // SAFCO (SABIC Agri)
            '2290.SR': { price: 62.40, change: -0.60, changePercent: -0.95, volume: 890000, marketCap: '45B' },    // Yansab
            '2310.SR': { price: 38.90, change: 0.20, changePercent: 0.52, volume: 1200000, marketCap: '28B' },    // Sipchem

            // البنوك والخدمات المالية
            '1120.SR': { price: 88.40, change: 1.20, changePercent: 1.38, volume: 3450000, marketCap: '350B' },   // Al Rajhi
            '1180.SR': { price: 54.20, change: -0.30, changePercent: -0.55, volume: 2100000, marketCap: '240B' }, // SNB
            '1010.SR': { price: 36.80, change: 0.40, changePercent: 1.10, volume: 1500000, marketCap: '110B' },   // Riyad Bank
            '1050.SR': { price: 28.50, change: -0.10, changePercent: -0.35, volume: 980000, marketCap: '85B' },    // Banque Saudi Fransi
            '1060.SR': { price: 24.10, change: 0.15, changePercent: 0.63, volume: 850000, marketCap: '72B' },     // SAB
            '1150.SR': { price: 42.60, change: 0.70, changePercent: 1.67, volume: 1800000, marketCap: '125B' },   // Alinma

            // الاتصالات والتقنية
            '7010.SR': { price: 41.80, change: 0.90, changePercent: 2.20, volume: 1250000, marketCap: '208B' },   // STC
            '7020.SR': { price: 52.30, change: -0.50, changePercent: -0.95, volume: 650000, marketCap: '40B' },    // Etihad Etisalat (Mobily)
            '7030.SR': { price: 12.40, change: 0.05, changePercent: 0.40, volume: 3200000, marketCap: '18B' },    // Zain KSA
            '7202.SR': { price: 185.60, change: 5.40, changePercent: 3.00, volume: 120000, marketCap: '22B' },    // Elm

            // الخدمات والمرافق
            '5110.SR': { price: 18.90, change: -0.20, changePercent: -1.05, volume: 4500000, marketCap: '95B' },  // Saudi Electricity
            '2080.SR': { price: 68.50, change: 1.10, changePercent: 1.63, volume: 320000, marketCap: '16B' },     // Gas & Industrialization

            // الإسمنت والبناء
            '3030.SR': { price: 48.20, change: 0.30, changePercent: 0.63, volume: 150000, marketCap: '7B' },      // Saudi Cement
            '3050.SR': { price: 39.50, change: -0.40, changePercent: -1.00, volume: 120000, marketCap: '6B' },    // Southern Cement

            // الأغذية والتجزئة
            '2280.SR': { price: 72.40, change: 0.80, changePercent: 1.12, volume: 420000, marketCap: '55B' },     // Almarai
            '4002.SR': { price: 112.60, change: -1.50, changePercent: -1.31, volume: 85000, marketCap: '9B' },    // Mouwasat
            '4190.SR': { price: 85.20, change: 1.50, changePercent: 1.79, volume: 210000, marketCap: '12B' },     // Jarir

            // US Market Data
            // Indices
            'SPX': { price: 4780.25, change: 25.40, changePercent: 0.53, volume: 2500000000, marketCap: '40T' }, // S&P 500
            'NDX': { price: 16850.60, change: 120.30, changePercent: 0.72, volume: 1800000000, marketCap: '25T' }, // NASDAQ 100
            'DJI': { price: 37650.10, change: 150.20, changePercent: 0.40, volume: 350000000, marketCap: '12T' },  // Dow Jones

            // Tech Giants
            'AAPL': { price: 185.90, change: 1.20, changePercent: 0.65, volume: 55000000, marketCap: '2.9T' },   // Apple
            'MSFT': { price: 375.40, change: 2.50, changePercent: 0.67, volume: 22000000, marketCap: '2.8T' },   // Microsoft
            'GOOGL': { price: 140.50, change: 1.10, changePercent: 0.79, volume: 18000000, marketCap: '1.75T' }, // Google
            'AMZN': { price: 153.20, change: 1.80, changePercent: 1.19, volume: 35000000, marketCap: '1.58T' },  // Amazon
            'META': { price: 358.30, change: 4.20, changePercent: 1.19, volume: 15000000, marketCap: '920B' },   // Meta
            'TSLA': { price: 248.50, change: -2.10, changePercent: -0.84, volume: 95000000, marketCap: '780B' }, // Tesla
            'NVDA': { price: 495.20, change: 8.50, changePercent: 1.75, volume: 42000000, marketCap: '1.22T' },  // NVIDIA
            'NFLX': { price: 475.20, change: 3.50, changePercent: 0.74, volume: 4500000, marketCap: '210B' },    // Netflix
            'ADBE': { price: 585.40, change: -2.10, changePercent: -0.36, volume: 2100000, marketCap: '265B' },  // Adobe
            'CRM': { price: 265.80, change: 1.80, changePercent: 0.68, volume: 3800000, marketCap: '258B' },     // Salesforce

            // Financials
            'JPM': { price: 170.20, change: 0.80, changePercent: 0.47, volume: 8500000, marketCap: '490B' },     // JPMorgan
            'V': { price: 260.40, change: 1.10, changePercent: 0.42, volume: 4500000, marketCap: '530B' },       // Visa

            // Retail & Consumer
            'WMT': { price: 158.60, change: 0.40, changePercent: 0.25, volume: 5500000, marketCap: '425B' },     // Walmart
            'HD': { price: 345.20, change: -1.20, changePercent: -0.35, volume: 2800000, marketCap: '345B' },    // Home Depot
            'COST': { price: 660.50, change: 2.50, changePercent: 0.38, volume: 1800000, marketCap: '295B' },    // Costco
            'NKE': { price: 105.80, change: -0.50, changePercent: -0.47, volume: 6500000, marketCap: '160B' },     // Nike

            // Healthcare
            'JNJ': { price: 160.40, change: 0.30, changePercent: 0.19, volume: 6200000, marketCap: '385B' },     // Johnson & Johnson
            'PFE': { price: 28.50, change: -0.10, changePercent: -0.35, volume: 25000000, marketCap: '160B' },     // Pfizer
            'MRK': { price: 115.20, change: 0.80, changePercent: 0.70, volume: 7500000, marketCap: '290B' },     // Merck
            'UNH': { price: 535.60, change: 4.20, changePercent: 0.79, volume: 3200000, marketCap: '495B' },     // UnitedHealth

            // Energy
            'XOM': { price: 102.40, change: 1.10, changePercent: 1.09, volume: 15000000, marketCap: '405B' },    // Exxon Mobil
            'CVX': { price: 148.50, change: 1.50, changePercent: 1.02, volume: 8500000, marketCap: '280B' },     // Chevron

            // Automotive
            'F': { price: 12.20, change: 0.15, changePercent: 1.24, volume: 45000000, marketCap: '48B' },        // Ford
            'GM': { price: 35.80, change: 0.45, changePercent: 1.27, volume: 12000000, marketCap: '49B' },       // General Motors

            // Food & Beverage
            'KO': { price: 59.80, change: 0.25, changePercent: 0.42, volume: 11000000, marketCap: '258B' },      // Coca-Cola
            'PEP': { price: 168.50, change: 0.60, changePercent: 0.36, volume: 4500000, marketCap: '230B' },     // PepsiCo
            'MCD': { price: 295.40, change: 1.20, changePercent: 0.41, volume: 2800000, marketCap: '215B' },     // McDonald's
            'SBUX': { price: 94.20, change: -0.80, changePercent: -0.84, volume: 6500000, marketCap: '108B' },   // Starbucks

            // Telecom
            'VZ': { price: 38.50, change: 0.15, changePercent: 0.39, volume: 18000000, marketCap: '160B' },      // Verizon
            'T': { price: 16.80, change: 0.10, changePercent: 0.60, volume: 25000000, marketCap: '120B' },       // AT&T
            'TMUS': { price: 162.40, change: 1.80, changePercent: 1.12, volume: 4200000, marketCap: '190B' },    // T-Mobile

            // Entertainment
            'DIS': { price: 92.50, change: 0.75, changePercent: 0.82, volume: 9500000, marketCap: '168B' },      // Disney

            // Industrials & Aerospace
            'BA': { price: 210.50, change: -1.20, changePercent: -0.57, volume: 4500000, marketCap: '128B' },    // Boeing
            'LMT': { price: 450.20, change: 2.50, changePercent: 0.56, volume: 1200000, marketCap: '110B' },     // Lockheed Martin
            'GE': { price: 130.80, change: 1.10, changePercent: 0.85, volume: 5500000, marketCap: '142B' },      // GE Aerospace
            'CAT': { price: 290.40, change: 3.20, changePercent: 1.11, volume: 2100000, marketCap: '145B' },     // Caterpillar
            'HON': { price: 202.60, change: 0.80, changePercent: 0.40, volume: 1800000, marketCap: '132B' },     // Honeywell

            // More Financials
            'BAC': { price: 34.20, change: 0.45, changePercent: 1.33, volume: 35000000, marketCap: '270B' },     // Bank of America
            'WFC': { price: 48.50, change: 0.60, changePercent: 1.25, volume: 18000000, marketCap: '175B' },     // Wells Fargo
            'GS': { price: 385.40, change: 4.20, changePercent: 1.10, volume: 2500000, marketCap: '130B' },      // Goldman Sachs
            'MS': { price: 92.80, change: 1.10, changePercent: 1.20, volume: 6500000, marketCap: '150B' },       // Morgan Stanley
            'BLK': { price: 790.50, change: 8.50, changePercent: 1.09, volume: 850000, marketCap: '118B' },      // BlackRock

            // More Tech
            'AMD': { price: 145.60, change: 4.20, changePercent: 2.97, volume: 65000000, marketCap: '235B' },    // AMD
            'INTC': { price: 48.20, change: -0.50, changePercent: -1.03, volume: 42000000, marketCap: '205B' },    // Intel
            'ORCL': { price: 105.40, change: 1.20, changePercent: 1.15, volume: 12000000, marketCap: '290B' },     // Oracle
            'CSCO': { price: 50.80, change: 0.30, changePercent: 0.59, volume: 18000000, marketCap: '205B' },      // Cisco
            'IBM': { price: 162.50, change: 0.80, changePercent: 0.49, volume: 4500000, marketCap: '148B' },       // IBM

            // More Consumer
            'PG': { price: 148.20, change: 0.50, changePercent: 0.34, volume: 6500000, marketCap: '350B' },      // Procter & Gamble
            'CL': { price: 80.40, change: 0.20, changePercent: 0.25, volume: 3500000, marketCap: '66B' },        // Colgate-Palmolive
            'TGT': { price: 142.50, change: 1.50, changePercent: 1.06, volume: 4200000, marketCap: '65B' },        // Target

            // Crypto Market
            'BTC': { price: 45250.00, change: 1200.50, changePercent: 2.72, volume: 35000000000, marketCap: '885B' }, // Bitcoin
            'ETH': { price: 2350.20, change: 85.30, changePercent: 3.77, volume: 15000000000, marketCap: '282B' },    // Ethereum
            'SOL': { price: 98.40, change: 5.20, changePercent: 5.58, volume: 3500000000, marketCap: '42B' },         // Solana
            'XRP': { price: 0.58, change: 0.01, changePercent: 1.75, volume: 1200000000, marketCap: '31B' },          // Ripple
            'ADA': { price: 0.55, change: 0.02, changePercent: 3.77, volume: 850000000, marketCap: '19B' },           // Cardano
            'DOGE': { price: 0.082, change: 0.003, changePercent: 3.80, volume: 650000000, marketCap: '11B' },        // Dogecoin
            'AVAX': { price: 36.50, change: 2.10, changePercent: 6.10, volume: 550000000, marketCap: '13B' },         // Avalanche
            'BNB': { price: 305.20, change: 4.50, changePercent: 1.50, volume: 950000000, marketCap: '46B' },         // Binance Coin
            'DOT': { price: 7.20, change: 0.15, changePercent: 2.10, volume: 180000000, marketCap: '9B' },            // Polkadot
            'MATIC': { price: 0.85, change: 0.02, changePercent: 2.40, volume: 320000000, marketCap: '8B' },          // Polygon
            'LINK': { price: 14.50, change: 0.40, changePercent: 2.80, volume: 450000000, marketCap: '8.2B' },        // Chainlink
            'LTC': { price: 65.40, change: 1.20, changePercent: 1.85, volume: 350000000, marketCap: '4.8B' },         // Litecoin
            'BCH': { price: 235.60, change: 5.40, changePercent: 2.35, volume: 220000000, marketCap: '4.6B' },        // Bitcoin Cash
            'SHIB': { price: 0.0000095, change: 0.0000002, changePercent: 2.15, volume: 150000000, marketCap: '5.6B' }, // Shiba Inu
            'UNI': { price: 6.20, change: 0.18, changePercent: 2.95, volume: 120000000, marketCap: '3.7B' },          // Uniswap
            'ATOM': { price: 9.80, change: 0.25, changePercent: 2.60, volume: 140000000, marketCap: '3.8B' },         // Cosmos
            'XLM': { price: 0.115, change: 0.002, changePercent: 1.75, volume: 85000000, marketCap: '3.2B' },         // Stellar
            'ALGO': { price: 0.185, change: 0.005, changePercent: 2.75, volume: 45000000, marketCap: '1.5B' },        // Algorand
            'TRX': { price: 0.105, change: 0.001, changePercent: 0.95, volume: 210000000, marketCap: '9.3B' },        // TRON

            // Forex & Commodities
            'EURUSD': { price: 1.0950, change: 0.0020, changePercent: 0.18, volume: 0, marketCap: '-' },
            'GBPUSD': { price: 1.2720, change: 0.0015, changePercent: 0.12, volume: 0, marketCap: '-' },
            'USDJPY': { price: 144.50, change: 0.30, changePercent: 0.21, volume: 0, marketCap: '-' },
            'XAUUSD': { price: 2045.50, change: 12.50, changePercent: 0.61, volume: 0, marketCap: '-' }, // Gold
            'WTI': { price: 72.50, change: 1.20, changePercent: 1.68, volume: 0, marketCap: '-' },       // Oil
            'XAGUSD': { price: 23.20, change: 0.40, changePercent: 1.75, volume: 0, marketCap: '-' }     // Silver
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

    // جلب جميع أسعار المحفظة
    async getPortfolioPrices(assets) {
        const prices = {};

        try {
            const pricePromises = assets.map(async (asset) => {
                let priceData = null;
                try {
                    switch (asset.market_type) {
                        case 'crypto':
                            priceData = await this.getCryptoPriceFromBinance(asset.symbol);
                            if (!priceData || priceData.source === 'mock_data') {
                                const cgId = this.coinGeckoMap[asset.symbol] || asset.symbol.toLowerCase();
                                const cgData = await this.getCryptoPriceFromCoinGecko(cgId);
                                if (cgData) priceData = cgData;
                            }
                            break;

                        case 'stock':
                        case 'forex':
                            priceData = await this.getStockPriceFromYahoo(asset.symbol);
                            break;
                    }
                } catch (err) {
                    console.error(`Error fetching price for ${asset.symbol}:`, err.message);
                    priceData = this.getMockStockData(asset.symbol);
                }
                return { symbol: asset.symbol, data: priceData };
            });

            const results = await Promise.all(pricePromises);
            results.forEach(result => {
                if (result.data) {
                    prices[result.symbol] = result.data;
                }
            });
        } catch (error) {
            console.error('Global error in getPortfolioPrices:', error.message);
        }

        return prices;
    }

    // جلب البيانات التاريخية (للتحليل الفني)
    async getHistoricalData(symbol, marketType, days = 30) {
        try {
            let url = '';

            if (marketType === 'crypto') {
                url = `${this.cryptoApis.coingecko}/coins/${symbol}/market_chart?vs_currency=usd&days=${days}`;
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