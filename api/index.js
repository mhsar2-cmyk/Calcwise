const express = require('express');
require('dotenv').config();
const cors = require('cors');

const path = require('path');
const { login, signup } = require('./src/services/auth');
const authenticate = require('./src/middleware/auth');
const { getCourses, saveCoursePool } = require('./src/services/courseService');
const { analyzeSpeech, chatWithAI, generateQuiz, extractVocab } = require('./src/services/aiService');

const ADMIN_EMAILS = ['admin@calcwises.com', 'mhro@calcwises.com']; // User can add their email here

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', platform: 'LingoWise', version: '2.1.0' });
});

// Course Routes (Public)
app.get('/api/courses', async (req, res) => {
    try {
        const courses = await getCourses();
        res.json({ success: true, courses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Admin Course Update (Protected)
app.post('/api/admin/courses', authenticate, async (req, res) => {
    if (!ADMIN_EMAILS.includes(req.user.email)) {
        return res.status(403).json({ success: false, message: 'Admin privileges required' });
    }
    try {
        await saveCoursePool(req.body);
        res.json({ success: true, message: 'Course pool updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Authentication Routes
app.post('/api/auth/signup', async (req, res) => {
    try {
        const result = await signup(req.body);
        res.status(201).json({ success: true, ...result });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await login(email, password);
        res.json({ success: true, ...result });
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
});
// AI Chat Route
app.post('/api/ai/chat', async (req, res) => {
    const { message, history } = req.body;
    try {
        const response = await chatWithAI(message, history);
        res.json({ success: true, response });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// AI Quiz Route
app.post('/api/ai/quiz', async (req, res) => {
    const { topic, content } = req.body;
    try {
        const quiz = await generateQuiz(topic, content);
        res.json({ success: true, quiz });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// AI Vocab Extraction Route
app.post('/api/ai/extract-vocab', async (req, res) => {
    const { content } = req.body;
    try {
        const vocab = await extractVocab(content);
        res.json({ success: true, vocab });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// AI Analysis Route
app.post('/api/ai/analyze', async (req, res) => {
    const { transcript, topic } = req.body;
    try {
        const analysis = await analyzeSpeech(transcript, topic);
        res.json({ success: true, analysis });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
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
        console.log(`\n  🎓 LingoWise Admin Server is running!\n`);
        console.log(`  → Local:   http://localhost:${PORT}`);
        console.log(`  → Network: http://0.0.0.0:${PORT}\n`);
    });
}
