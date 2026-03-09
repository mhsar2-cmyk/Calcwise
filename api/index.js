require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// Security & Logging
// Disable CSP in production as it can block API calls and external assets
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
app.use(
    cors({
        origin: allowedOrigin,
    })
);
app.use(morgan('dev'));

// Stripe Webhook must be defined BEFORE express.json()
app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), (req, res) => {
    res.json({ received: true });
});

// JSON body parser for all other routes
app.use(express.json());

// Serving frontend static files (for local development)
if (process.env.NODE_ENV !== 'production') {
    app.use(express.static(path.join(__dirname, '../public')));
}

const newsService = require('./src/services/newsService');
const aiService = require('./src/services/aiService');
const { pool } = require('./src/database/db');
const marketDataService = require('./src/services/marketDataService');
const aiAnalysisService = require('./src/services/aiAnalysisService');

// Basic Health Check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        status: 'ok',
        message: 'Calcwise API is running',
        env: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    });
});

// Market Data Routes
app.get('/api/diagnostics', async (req, res) => {
    try {
        const testSymbols = [{ symbol: 'BTC', market_type: 'crypto' }, { symbol: 'AAPL', market_type: 'stock' }];
        const results = await marketDataService.getPortfolioPrices(testSymbols);
        res.json({
            success: true,
            results,
            node_env: process.env.NODE_ENV,
            allowed_origin: process.env.ALLOWED_ORIGIN || '*'
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/api/market/sentiment', async (req, res) => {
    try {
        const news = await newsService.getMarketNews(req.query.asset || 'crypto');
        const sentiment = await aiService.analyzeSentiment(news);
        res.json({
            success: true,
            sentiment,
            news,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// New Market Data Endpoints
app.get('/api/market/prices', async (req, res) => {
    const symbols = req.query.symbols;
    console.log(`[API] Market Prices Request: ${symbols}`);

    try {
        const symbolList = symbols ? symbols.split(',') : ['BTC', 'ETH', 'AAPL', 'XAUUSD'];

        // Define crypto and forex symbols for proper classification
        const cryptoSymbols = [
            'BTC', 'ETH', 'SOL', 'XRP', 'ADA', 'DOGE', 'AVAX', 'DOT', 'BNB',
            'MATIC', 'LINK', 'LTC', 'BCH', 'XLM', 'ATOM', 'UNI', 'ALGO', 'SHIB', 'TRX'
        ];
        const forexSymbols = ['XAUUSD', 'EURUSD', 'GBPUSD', 'USDJPY', 'WTI', 'XAGUSD'];

        const assets = symbolList.map(symbol => {
            let marketType = 'stock';
            if (forexSymbols.includes(symbol)) {
                marketType = 'forex';
            } else if (cryptoSymbols.includes(symbol) || symbol.includes('USDT')) {
                marketType = 'crypto';
            }
            return { symbol, market_type: marketType };
        });

        // Timeout the entire service call just in case
        const pricePromise = marketDataService.getPortfolioPrices(assets);
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Service timeout')), 8000)
        );

        const prices = await Promise.race([pricePromise, timeoutPromise]);
        res.json({ success: true, prices });
    } catch (error) {
        console.error('[API Error] /api/market/prices:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch market data',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

app.get('/api/market/analysis/:symbol', async (req, res) => {
    try {
        const { symbol } = req.params;
        const marketType = ['BTC', 'ETH'].includes(symbol) ? 'crypto' : 'stock';

        const technicalAnalysis = await aiAnalysisService.analyzeTechnical(symbol, marketType);
        res.json({ success: true, analysis: technicalAnalysis });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Portfolio Management Endpoints
app.get('/api/portfolio/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const client = await pool.connect();

        const portfolioResult = await client.query(
            `SELECT p.*, a.symbol, a.name, a.market_type 
             FROM portfolios p 
             JOIN assets a ON p.asset_id = a.id 
             WHERE p.user_id = $1`,
            [userId]
        );

        const watchlistResult = await client.query(
            `SELECT w.*, a.symbol, a.name, a.market_type 
             FROM watchlists w 
             JOIN assets a ON w.asset_id = a.id 
             WHERE w.user_id = $1`,
            [userId]
        );

        client.release();

        res.json({
            success: true,
            portfolio: portfolioResult.rows,
            watchlist: watchlistResult.rows
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// User Authentication Endpoints
app.post('/api/auth/register', async (req, res) => {
    res.json({ success: true, message: 'Registration placeholder' });
});

app.post('/api/auth/login', async (req, res) => {
    res.json({ success: true, message: 'Login placeholder' });
});

// Subscription Routes (Placeholder)
app.post('/api/subscribe', (req, res) => {
    const plan = req.body?.plan || 'starter';
    res.json({ message: `Subscription initialized for plan: ${plan}` });
});

// Alerts endpoint (Placeholder)
app.post('/api/alerts', (req, res) => {
    const { symbol, operator, target, channel } = req.body || {};
    if (!symbol || !operator || typeof target !== 'number' || Number.isNaN(target)) {
        return res.status(400).json({ success: false, message: 'Invalid alert payload' });
    }
    console.log(`[alert] ${symbol} ${operator} ${target} via ${channel || 'email'}`);
    res.json({ success: true, message: 'Alert created' });
});

// Lead capture (Placeholder)
app.post('/api/lead', (req, res) => {
    const email = (req.body?.email || '').trim();
    if (!email || !email.includes('@')) {
        return res.status(400).json({ success: false, message: 'Invalid email' });
    }
    console.log(`[lead] ${email}`);
    res.json({ success: true, message: 'Thanks! You are on the list.' });
});

// Fallback to index.html for SPA-like behavior (local dev)
if (process.env.NODE_ENV !== 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
}

// Export for Vercel
module.exports = app;

// Listen only if running directly (local dev)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Calcwise Server running on http://localhost:${PORT}`);
    });
}
