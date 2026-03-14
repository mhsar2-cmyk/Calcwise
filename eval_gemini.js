require('dotenv').config();
const { extractVocab } = require('./api/src/services/aiService');

(async () => {
    try {
        const vocab = await extractVocab("Hello world, this is a test.");
        console.log("Success:", vocab);
    } catch (err) {
        console.error("Error:", err);
    }
})();
