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

// Serving frontend static files
app.use(express.static(path.join(__dirname, '../frontend/src')));

// API Placeholder Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Calcwise API is running' });
});

// Market Data Routes (Placeholder)
app.get('/api/market/sentiment', (req, res) => {
    res.json({ message: 'AI Sentiment route placeholder' });
});

// Subscription Routes (Placeholder)
app.post('/api/subscribe', (req, res) => {
    res.json({ message: 'Stripe subscription route placeholder' });
});

// Stripe Webhook (Placeholder)
app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), (req, res) => {
    res.json({ received: true });
});

// Fallback to index.html for SPA-like behavior
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/src/index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Calcwise Server running on http://localhost:${PORT}`);
});
