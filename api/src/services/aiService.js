const { OpenAI } = require('openai');

/**
 * AI Sentiment Service
 * Analyzes market news to generate sentiment scores.
 */
class AIService {
    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async analyzeSentiment(newsItems) {
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('sk-...')) {
            console.warn('OpenAI API Key not set. Returning mock sentiment.');
            return this.getMockSentiment();
        }

        try {
            const prompt = `
                Analyze the following market news items and provide a unified sentiment score between 0 (Extreme Fear) and 100 (Extreme Greed).
                Also provide a 1-sentence summary of the overall market mood.
                
                News:
                ${newsItems.map(item => `- ${item.title}: ${item.content}`).join('\n')}
                
                Respond in JSON format: { "score": number, "mood": "string", "summary": "string" }
            `;

            const response = await this.openai.chat.completions.create({
                model: "gpt-3.5-turbo-1106", // or gpt-4
                messages: [{ role: "user", content: prompt }],
                response_format: { type: "json_object" },
            });

            return JSON.parse(response.choices[0].message.content);
        } catch (error) {
            console.error('AI Analysis Error:', error);
            return this.getMockSentiment();
        }
    }

    getMockSentiment() {
        // Return a realistic mock if API key is missing
        const scores = [65, 72, 45, 80, 55];
        const score = scores[Math.floor(Math.random() * scores.length)];
        return {
            score: score,
            mood: score > 60 ? "Greed" : score < 40 ? "Fear" : "Neutral",
            summary: "Positive ETF momentum is currently outweighing macroeconomic concerns."
        };
    }
}

module.exports = new AIService();
