const { createTables, seedInitialData } = require('./db');

async function initializeDatabase() {
    try {
        console.log('🚀 بدء تهيئة قاعدة البيانات...');
        
        await createTables();
        await seedInitialData();
        
        console.log('✅ تم تهيئة قاعدة البيانات بنجاح!');
        process.exit(0);
    } catch (error) {
        console.error('❌ فشل في تهيئة قاعدة البيانات:', error);
        process.exit(1);
    }
}

// إذا تم تشغيل الملف مباشرة
if (require.main === module) {
    initializeDatabase();
}

module.exports = initializeDatabase;