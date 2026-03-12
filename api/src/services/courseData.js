/**
 * Market Data Service
 * Provides real-time market data for the CalcWise platform.
 */

/**
 * Fetch real prices from Binance for Crypto
 * For Stocks/Forex, we use mock data in this demo.
 */
const getMockPrices = async () => {
    let prices = {
        BTC: 101234.50,
        ETH: 4123.75,
        BNB: 680.20,
        SOL: 245.30,
        AAPL: 245.67,
        NVDA: 890.50,
        ARAMCO: 32.10,
        RAJHI: 82.30,
        "EUR/USD": 1.0845
    };

    try {
        // Fetch top crypto prices from Binance (Public API - no key needed)
        const response = await fetch('https://api.binance.com/api/v3/ticker/price');
        const data = await response.json();

        const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT'];
        data.forEach(item => {
            if (symbols.includes(item.symbol)) {
                const key = item.symbol.replace('USDT', '');
                prices[key] = parseFloat(item.price);
            }
        });
    } catch (error) {
        console.warn('Live price fetch failed, using internal sims.');
        // Add some random noise to mock data so it feels alive
        Object.keys(prices).forEach(k => {
            prices[k] *= (1 + (Math.random() * 0.002 - 0.001));
        });
    }

    return prices;
};

const getWatchlist = async () => {
    const prices = await getMockPrices();
    return [
        { name: 'Bitcoin', symbol: 'BTC', price: prices.BTC, change: '+2.4%', icon: '₿', bg: 'rgba(240,185,11,0.15)' },
        { name: 'Ethereum', symbol: 'ETH', price: prices.ETH, change: '+1.8%', icon: '⟠', bg: 'rgba(108,92,231,0.15)' },
        { name: 'NV9D', symbol: 'NVDA', price: prices.NVDA, change: '+3.2%', icon: '🟢', bg: 'rgba(0,184,148,0.15)' },
        { name: 'EUR/USD', symbol: 'Forex', price: prices['EUR/USD'], change: '+0.15%', icon: '💱', bg: 'rgba(0,210,211,0.15)' }
    ];
};

module.exports = {
    getMockPrices,
    getWatchlist
};
