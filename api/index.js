require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for easier integration of external charts in dev
}));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Serving frontend static files (for local development)
if (process.env.NODE_ENV !== 'production') {
    app.use(express.static(path.join(__dirname, '../public')));
}

const newsService = require('./src/services/newsService');
const aiService = require('./src/services/aiService');

// API Placeholder Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Calcwise API is running' });
});

// Market Data Routes
app.get('/api/market/sentiment', async (req, res) => {
    try {
        const news = await newsService.getMarketNews(req.query.asset || 'crypto');
        const sentiment = await aiService.analyzeSentiment(news);
        res.json({
            success: true,
            sentiment,
            news
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Subscription Routes (Placeholder)
app.post('/api/subscribe', (req, res) => {
    res.json({ message: 'Stripe subscription route placeholder' });
});

// Stripe Webhook (Placeholder)
app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), (req, res) => {
    res.json({ received: true });
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
