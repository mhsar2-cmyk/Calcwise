const { OpenAI } = require('openai');
const marketDataService = require('./marketDataService');

class AIAnalysisService {
    constructor() {
        this.openai = null;
        if (process.env.OPENAI_API_KEY) {
            this.openai = new OpenAI({
                apiKey: process.env.OPENAI_API_KEY
            });
        }
    }

    // تحليل المشاعر للأخبار والمقالات
    async analyzeSentiment(text, assetSymbol) {
        try {
            if (!this.openai) {
                // نموذج بديل إذا لم يكن هناك API key
                return this.fallbackSentimentAnalysis(text);
            }

            const prompt = `
Analyze the market sentiment for ${assetSymbol} based on the following news/article content.

Content: ${text}

Please provide:
1. Sentiment score from -1.0 (very bearish) to +1.0 (very bullish)
2. Brief summary of the sentiment
3. Key factors influencing the sentiment

Respond in JSON format:
{
  "sentiment_score": number,
  "summary": string,
  "key_factors": string[]
}
            `;

            const response = await this.openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 500,
                temperature: 0.3
            });

            const result = JSON.parse(response.choices[0].message.content);
            return result;

        } catch (error) {
            console.error('AI sentiment analysis error:', error);
            return this.fallbackSentimentAnalysis(text);
        }
    }

    // تحليل فني باستخدام بيانات الشموع
    async analyzeTechnical(symbol, marketType) {
        try {
            // جلب البيانات التاريخية (30 يوم)
            const historicalData = await marketDataService.getHistoricalData(symbol, marketType, 30);
            
            if (historicalData.length === 0) {
                return this.fallbackTechnicalAnalysis(symbol);
            }

            // تحضير البيانات للتحليل
            const prices = historicalData.map(d => d.price);
            const latestPrice = prices[prices.length - 1];
            
            // تحليل فني بسيط
            const analysis = {
                current_price: latestPrice,
                price_change_30d: this.calculatePriceChange(prices),
                support_level: this.calculateSupportLevel(prices),
                resistance_level: this.calculateResistanceLevel(prices),
                trend: this.determineTrend(prices),
                volatility: this.calculateVolatility(prices),
                rsi: this.calculateRSI(prices),
                recommendation: this.generateRecommendation(prices)
            };

            return analysis;

        } catch (error) {
            console.error('Technical analysis error:', error);
            return this.fallbackTechnicalAnalysis(symbol);
        }
    }

    // دعم تحليلي محلي بدون AI
    fallbackSentimentAnalysis(text) {
        // تحليل بسيط للمشاعر بناء على كلمات مفتاحية
        const positiveWords = ['bullish', 'growth', 'profit', 'gain', 'positive', 'optimistic', 'strong'];
        const negativeWords = ['bearish', 'drop', 'loss', 'decline', 'negative', 'pessimistic', 'weak'];
        
        const textLower = text.toLowerCase();
        let positiveCount = 0;
        let negativeCount = 0;
        
        positiveWords.forEach(word => {
            if (textLower.includes(word)) positiveCount++;
        });
        
        negativeWords.forEach(word => {
            if (textLower.includes(word)) negativeCount++;
        });
        
        const total = positiveCount + negativeCount || 1;
        const sentimentScore = (positiveCount - negativeCount) / total;
        
        return {
            sentiment_score: sentimentScore,
            summary: sentimentScore > 0 ? 'Generally positive sentiment' : 
                     sentimentScore < 0 ? 'Generally negative sentiment' : 'Neutral sentiment',
            key_factors: []
        };
    }

    fallbackTechnicalAnalysis(symbol) {
        return {
            current_price: 0,
            price_change_30d: 0,
            support_level: 0,
            resistance_level: 0,
            trend: 'neutral',
            volatility: 'medium',
            rsi: 50,
            recommendation: 'hold',
            note: 'Analysis based on limited data'
        };
    }

    // وظائف مساعدة للتحليل الفني
    calculatePriceChange(prices) {
        if (prices.length < 2) return 0;
        const first = prices[0];
        const last = prices[prices.length - 1];
        return ((last - first) / first) * 100;
    }

    calculateSupportLevel(prices) {
        return Math.min(...prices) * 0.95;
    }

    calculateResistanceLevel(prices) {
        return Math.max(...prices) * 1.05;
    }

    determineTrend(prices) {
        if (prices.length < 10) return 'neutral';
        
        const firstThird = prices.slice(0, Math.floor(prices.length / 3));
        const lastThird = prices.slice(-Math.floor(prices.length / 3));
        
        const avgFirst = firstThird.reduce((a, b) => a + b, 0) / firstThird.length;
        const avgLast = lastThird.reduce((a, b) => a + b, 0) / lastThird.length;
        
        if (avgLast > avgFirst * 1.05) return 'upward';
        if (avgLast < avgFirst * 0.95) return 'downward';
        return 'neutral';
    }

    calculateVolatility(prices) {
        if (prices.length < 2) return 'low';
        
        const returns = [];
        for (let i = 1; i < prices.length; i++) {
            returns.push((prices[i] - prices[i-1]) / prices[i-1]);
        }
        
        const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
        const variance = returns.reduce((a, b) => a + Math.pow(b - avgReturn, 2), 0) / returns.length;
        const volatility = Math.sqrt(variance);
        
        if (volatility < 0.01) return 'low';
        if (volatility < 0.03) return 'medium';
        return 'high';
    }

    calculateRSI(prices, period = 14) {
        if (prices.length <= period) return 50;
        
        const gains = [];
        const losses = [];
        
        for (let i = 1; i < prices.length; i++) {
            const change = prices[i] - prices[i-1];
            gains.push(change > 0 ? change : 0);
            losses.push(change < 0 ? Math.abs(change) : 0);
        }
        
        const avgGain = gains.slice(0, period).reduce((a, b) => a + b, 0) / period;
        const avgLoss = losses.slice(0, period).reduce((a, b) => a + b, 0) / period;
        
        if (avgLoss === 0) return 100;
        
        const rs = avgGain / avgLoss;
        return 100 - (100 / (1 + rs));
    }

    generateRecommendation(prices) {
        const rsi = this.calculateRSI(prices);
        const trend = this.determineTrend(prices);
        
        if (rsi < 30 && trend === 'upward') return 'strong_buy';
        if (rsi < 30) return 'buy';
        if (rsi > 70 && trend === 'downward') return 'strong_sell';
        if (rsi > 70) return 'sell';
        return 'hold';
    }
}

module.exports = new AIAnalysisService();