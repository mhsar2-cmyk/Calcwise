const express = require('express');
const cors = require('cors');
const path = require('path');
const { getCourses } = require('./src/services/courseData');
const { getProgress, updateProgress } = require('./src/services/learningProgress');
const { login, signup } = require('./src/services/auth');
const { getBank, addWord, removeWord } = require('./src/services/vocabularyBank');
const authenticate = require('./src/middleware/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', platform: 'LingoWise', version: '2.5.0' });
});

// Courses
app.get('/api/courses', async (req, res) => {
    const courses = await getCourses();
    res.json({ courses, timestamp: new Date().toISOString() });
});

// User Learning Progress
app.get('/api/learning/progress', authenticate, async (req, res) => {
    const userId = req.user.id;
    const progress = await getProgress(userId);
    res.json({ userId, progress, timestamp: new Date().toISOString() });
});

app.post('/api/learning/progress', authenticate, async (req, res) => {
    try {
        const update = await updateProgress({ ...req.body, userId: req.user.id });
        res.status(200).json({ success: true, update });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Vocabulary Bank
app.get('/api/learning/vocabulary', authenticate, async (req, res) => {
    const userId = req.user.id;
    const bank = await getBank(userId);
    res.json({ success: true, bank });
});

app.post('/api/learning/vocabulary', authenticate, async (req, res) => {
    try {
        const word = await addWord({ ...req.body, userId: req.user.id });
        res.status(201).json({ success: true, word });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.delete('/api/learning/vocabulary/:id', authenticate, async (req, res) => {
    try {
        await removeWord(req.params.id);
        res.json({ success: true });
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

// ──────────────────────────────────────────────
// Environment-aware: works both locally AND on Vercel
// ──────────────────────────────────────────────

if (process.env.VERCEL) {
    module.exports = app;
} else {
    const PORT = process.env.PORT || 3000;
    app.use(express.static(path.join(__dirname, '..', 'public')));

    // SPA fallback
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
    });

    app.listen(PORT, () => {
        console.log(`\n  🎓 LingoWise is running!\n`);
        console.log(`  → Local:   http://localhost:${PORT}`);
    });
}
