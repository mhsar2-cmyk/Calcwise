const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

// استخدام SQLite للتطوير المحلي (أخف ولا يحتاج تثبيت)
const dbPath = path.join(__dirname, '../../calcwise.db');
const db = new sqlite3.Database(dbPath);

// محاكاة واجهة Pool لـ PostgreSQL للتوافق
const pool = {
    connect: () => {
        return Promise.resolve({
            query: (sql, params) => {
                return new Promise((resolve, reject) => {
                    db.all(sql, params || [], (err, rows) => {
                        if (err) reject(err);
                        else resolve({ rows });
                    });
                });
            },
            release: () => {}
        });
    }
};

// نموذج إنشاء الجداول
const createTables = async () => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // جدول المستخدمين (SQLite compatible)
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                subscription_type TEXT DEFAULT 'Free' CHECK (subscription_type IN ('Free', 'Premium')),
                alert_settings TEXT DEFAULT '{}',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // جدول الأصول
        await client.query(`
            CREATE TABLE IF NOT EXISTS assets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                symbol TEXT UNIQUE NOT NULL,
                name TEXT NOT NULL,
                market_type TEXT CHECK (market_type IN ('crypto', 'stock', 'forex', 'commodity')),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // جدول المحافظ
        await client.query(`
            CREATE TABLE IF NOT EXISTS portfolios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                asset_id INTEGER,
                average_buy_price REAL NOT NULL,
                quantity REAL NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(user_id, asset_id),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE
            )
        `);

        // جدول قوائم المراقبة
        await client.query(`
            CREATE TABLE IF NOT EXISTS watchlists (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                asset_id INTEGER,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(user_id, asset_id),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE
            )
        `);

        // جدول المقالات والأخبار
        await client.query(`
            CREATE TABLE IF NOT EXISTS articles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                author TEXT,
                tags TEXT DEFAULT '[]',
                asset_symbols TEXT,
                sentiment_score REAL,
                published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await client.query('COMMIT');
        console.log('✅ تم إنشاء الجداول بنجاح');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ خطأ في إنشاء الجداول:', error);
        throw error;
    } finally {
        client.release();
    }
};

// إدراج بيانات أولية
const seedInitialData = async () => {
    const client = await pool.connect();
    try {
        // أصول افتراضية
        const defaultAssets = [
            { symbol: 'BTC', name: 'Bitcoin', market_type: 'crypto' },
            { symbol: 'ETH', name: 'Ethereum', market_type: 'crypto' },
            { symbol: 'AAPL', name: 'Apple Inc', market_type: 'stock' },
            { symbol: 'XAUUSD', name: 'Gold/USD', market_type: 'forex' },
            { symbol: 'MSFT', name: 'Microsoft', market_type: 'stock' },
            { symbol: 'TSLA', name: 'Tesla', market_type: 'stock' }
        ];

        for (const asset of defaultAssets) {
            await client.query(
                'INSERT INTO assets (symbol, name, market_type) VALUES ($1, $2, $3) ON CONFLICT (symbol) DO NOTHING',
                [asset.symbol, asset.name, asset.market_type]
            );
        }

        console.log('✅ تم إدراج البيانات الأولية بنجاح');
    } catch (error) {
        console.error('❌ خطأ في إدراج البيانات:', error);
    } finally {
        client.release();
    }
};

module.exports = {
    pool,
    createTables,
    seedInitialData
};