const express = require('express');
const cors = require('cors');
const path = require('path');
const { getMockPrices, getWatchlist } = require('./src/services/marketData');
const { getPortfolio, addAsset, removeAsset } = require('./src/services/portfolio');
const { login, signup } = require('./src/services/auth');
const { getJournal, addTrade, removeTrade } = require('./src/services/journal');
const authenticate = require('./src/middleware/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', platform: 'CalcWise', version: '2.1.0' });
});

// Real-time Market Prices
app.get('/api/market/prices', async (req, res) => {
    const prices = await getMockPrices();
    res.json({
        prices,
        timestamp: new Date().toISOString()
    });
});

// Real-time Watchlist
app.get('/api/market/watchlist', async (req, res) => {
    const watchlist = await getWatchlist();
    res.json({
        watchlist,
        timestamp: new Date().toISOString()
    });
});

// User Portfolio
app.get('/api/portfolio', authenticate, async (req, res) => {
    const userId = req.user.id;
    const holdings = await getPortfolio(userId);
    const prices = await getMockPrices();

    // Map current prices to holdings
    const enrichedHoldings = holdings.map(h => ({
        ...h,
        currentPrice: prices[h.symbol] || prices[h.name] || h.avg_cost || h.avgCost // Handle both cases
    }));

    res.json({
        userId,
        holdings: enrichedHoldings,
        timestamp: new Date().toISOString()
    });
});

app.post('/api/portfolio', authenticate, async (req, res) => {
    try {
        const asset = await addAsset({ ...req.body, userId: req.user.id });
        res.status(201).json({ success: true, asset });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

app.delete('/api/portfolio/:id', authenticate, async (req, res) => {
    try {
        await removeAsset(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Authentication Routes
app.post('/api/auth/signup', async (req, res) => {
    try {
        const user = await signup(req.body);
        res.status(201).json({ success: true, user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await login(email, password);
        res.json({ success: true, user });
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
});

// Trade Journal Routes
app.get('/api/journal', authenticate, async (req, res) => {
    const userId = req.user.id;
    const journal = await getJournal(userId);
    res.json({ success: true, journal });
});

app.post('/api/journal', authenticate, async (req, res) => {
    try {
        const trade = await addTrade({ ...req.body, userId: req.user.id });
        res.status(201).json({ success: true, trade });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.delete('/api/journal/:id', authenticate, async (req, res) => {
    try {
        await removeTrade(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Approximate exchange rates
app.get('/api/rates', (req, res) => {
    res.json({
        base: 'USD',
        rates: {
            USD: 1, EUR: 0.922, GBP: 0.789, SAR: 3.75, JPY: 149.50,
            AUD: 1.535, CAD: 1.357, CHF: 0.878, CNY: 7.24, INR: 83.10,
            KRW: 1325, SGD: 1.345, HKD: 7.82, NZD: 1.64, SEK: 10.45,
            NOK: 10.60, DKK: 6.88, TRY: 30.15, BRL: 4.95, ZAR: 18.70
        },
        updated: new Date().toISOString()
    });
});

// ──────────────────────────────────────────────
// Environment-aware: works both locally AND on Vercel
// ──────────────────────────────────────────────

if (process.env.VERCEL) {
    // On Vercel: export the Express app as a serverless function
    module.exports = app;
} else {
    // Locally: serve static files and listen on a port
    const PORT = process.env.PORT || 3000;

    app.use(express.static(path.join(__dirname, '..', 'public')));

    // SPA fallback — serve index.html for any unmatched routes
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
    });

    app.listen(PORT, () => {
        console.log(`\n  📊 CalcWise is running!\n`);
        console.log(`  → Local:   http://localhost:${PORT}`);
        console.log(`  → Network: http://0.0.0.0:${PORT}\n`);
    });
}
