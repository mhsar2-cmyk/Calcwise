const { GoogleGenerativeAI } = require('@google/generative-ai');

async function analyzeSpeech(transcript, topic) {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not configured');
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
        You are an expert AI Language Coach. Analyze the following English transcript from a student practicing for the topic: "${topic}".
        
        Transcript: "${transcript}"
        
        Provide feedback in the following JSON format:
        {
          "metrics": {
            "pronunciation": <number 0-100, estimate based on transcript clarity>,
            "fluency": <number 0-100>,
            "grammar": <number 0-100>
          },
          "tip": "<a helpful, short tip in English>",
          "tip_ar": "<the same tip translated to Arabic>",
          "suggestedVocab": {
            "word": "<a relevant advanced English word>",
            "translation": "<Arabic translation>",
            "cat": "<category like Academic, Business, etc.>"
          }
        }
        
        Only return the JSON object.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        const cleanedJson = text.replace(/```json|```/g, '').trim();
        return JSON.parse(cleanedJson);
    } catch (error) {
        console.error('Gemini Analysis Error:', error);
        if (error.message.includes('429')) throw new Error('API Quota Exceeded');
        throw new Error('Failed to analyze speech');
    }
}

async function chatWithAI(message, history = []) {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not configured');
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const chat = model.startChat({
        history: history.map(h => ({
            role: h.role === 'bot' ? 'model' : 'user',
            parts: [{ text: h.text }]
        })),
        generationConfig: {
            maxOutputTokens: 500,
        },
    });

    try {
        const systemPrompt = "You are LingoWise AI, a friendly and helpful language learning assistant. Help the user with English grammar, vocabulary, speaking tips, or general language learning advice. Keep responses concise and encouraging. If they speak Arabic, you can respond in a mix of English and Arabic if helpful.";
        const fullMessage = history.length === 0 ? `${systemPrompt}\n\nUser: ${message}` : message;
        
        const result = await chat.sendMessage(fullMessage);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini Chat Error:', error);
        if (error.message.includes('429')) throw new Error('API Quota Exceeded');
        throw new Error('Failed to chat with Gemini');
    }
}

async function generateQuiz(topic, content) {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not configured');
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
        As an expert language educator, generate a 3-question multiple choice quiz in English based on the following content related to the topic "${topic}".
        
        Content: "${content}"
        
        Provide the quiz in the following JSON format:
        {
          "quiz": [
            {
              "question": { "en": "...", "ar": "..." },
              "options": { 
                "en": ["opt1", "opt2", "opt3", "opt4"],
                "ar": ["opt1", "opt2", "opt3", "opt4"]
              },
              "answer": <index of correct option 0-3>
            }
          ]
        }
        
        Only return the JSON object.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const cleanedJson = text.replace(/```json|```/g, '').trim();
        return JSON.parse(cleanedJson).quiz;
    } catch (error) {
        console.error('Gemini Quiz Error:', error);
        if (error.message.includes('429')) throw new Error('API Quota Exceeded');
        throw new Error('Failed to generate quiz');
    }
}

async function extractVocab(content) {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not configured');
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
        Analyze the following text and extract 5 advanced or useful English words for a language learner.
        Text: "${content}"
        
        Return the result in the following JSON format:
        {
          "vocab": [
            { "en": "word", "ar": "translation" }
          ]
        }
        
        Only return the JSON object.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const cleanedJson = text.replace(/```json|```/g, '').trim();
        return JSON.parse(cleanedJson).vocab;
    } catch (error) {
        console.error('Gemini Vocab Extraction Error:', error);
        if (error.message.includes('429')) throw new Error('API Quota Exceeded');
        throw new Error('Failed to extract vocabulary');
    }
}

module.exports = { analyzeSpeech, chatWithAI, generateQuiz, extractVocab };
