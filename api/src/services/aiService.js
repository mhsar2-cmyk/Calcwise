const { GoogleGenerativeAI } = require('@google/generative-ai');

async function analyzeSpeech(transcript, topic) {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not configured');
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
        You are a World-Class English Language Coach (CELTA/DELTA certified). 
        Analyze the following transcript from a student practicing the topic: "${topic}".
        
        Transcript: "${transcript}"
        
        Your goal is to provide deep, actionable, and pedagogical feedback.
        
        Rules for Analysis:
        1. Metrics: Be honest but encouraging. 
           - Pronunciation: Estimate based on phonetic likelyhood of transcription errors.
           - Fluency: Look for "filler" words or short, choppy sentences.
           - Grammar: Check for tense consistency, articles, and prepositions.
        2. Correction: 
           - Provide the "Natural Version": How a native speaker would actually say it.
           - Explanation: Explain WHY. Don't just say "it's wrong". Mention the specific grammar rule (e.g., "Present Perfect vs Past Simple").
        3. Suggested Vocab: Provide a "Power Word"—something that replaces a simple word they used (e.g., if they said "big", suggest "colossal").
        
        Provide feedback in this JSON format:
        {
          "metrics": {
            "pronunciation": <0-100>,
            "fluency": <0-100>,
            "grammar": <0-100>
          },
          "correction": {
            "original": "${transcript}",
            "corrected": "<natural, polished version>",
            "explanation": "<detailed pedagogical explanation in English>",
            "explanation_ar": "<شرح تعليمي مفصل باللغة العربية يوضح القاعدة النحوية المستخدمة>"
          },
          "tip": "<specific strategy to improve based on this specific attempt>",
          "tip_ar": "<نصيحة استراتيجية محددة بناءً على هذه المحاولة>",
          "suggestedVocab": {
            "word": "<high-level synonym>",
            "translation": "<Arabic translation>",
            "cat": "<Academic/Professional>",
            "example": "<short example sentence using the new word>"
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
