const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', platform: 'CalcWise', version: '2.0.0' });
});

// Approximate exchange rates (for the currency converter tool)
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
    // Static files are served by @vercel/static (configured in vercel.json)
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
