const { GoogleGenerativeAI } = require('@google/generative-ai');

async function analyzeSpeech(transcript, topic) {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not configured');
    }
    if (!transcript || transcript.trim().length < 2) {
        throw new Error('No speech detected');
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
        You are a World-Class English Language Coach (CELTA/DELTA certified, 20+ years experience).
        A student is practicing speaking English on the topic: "${topic}".
        
        Here is the EXACT transcript from the speech recognition system:
        "${transcript}"
        
        IMPORTANT ANALYSIS RULES:
        
        1. GRAMMAR ANALYSIS (be extremely thorough):
           - Check subject-verb agreement (e.g., "he go" → "he goes")
           - Check article usage (a/an/the or missing articles)
           - Check preposition usage (in/on/at/to/for etc.)
           - Check tense consistency and correctness
           - Check plural/singular agreement
           - Check word order
           - Check pronoun usage
           - Check conditional structures
           - Check gerund vs infinitive usage
           - Check comparative/superlative forms
           
        2. PRONUNCIATION ESTIMATION:
           - Analyze transcription for likely pronunciation errors based on common non-native patterns
           - Words that recognition might have misheard suggest pronunciation issues
           - Check for commonly mispronounced words
           - Note: The transcript comes from speech recognition, so certain transcription oddities indicate pronunciation issues
           
        3. FLUENCY ANALYSIS:
           - Check for filler words (um, uh, like, you know, basically, actually overuse)
           - Check sentence length and complexity
           - Check for repetitions or self-corrections
           - Check for natural connectors and transitions
           - Check vocabulary range and sophistication
           
        4. FOR EACH ERROR FOUND, provide:
           - The exact error in their speech
           - The correction
           - A clear explanation of the grammar rule
           - An example of correct usage
        
        You MUST respond with this EXACT JSON structure (no markdown, no extra text):
        {
          "metrics": {
            "pronunciation": <0-100 score>,
            "fluency": <0-100 score>,
            "grammar": <0-100 score>,
            "overall": <0-100 weighted average>
          },
          "correction": {
            "original": "<their exact speech>",
            "corrected": "<the polished, natural version a native speaker would say>",
            "explanation": "<detailed but concise English explanation of ALL grammar/pronunciation issues found>",
            "explanation_ar": "<same explanation in Arabic>"
          },
          "errors": [
            {
              "type": "grammar|pronunciation|vocabulary|fluency",
              "original": "<the error phrase>",
              "corrected": "<the corrected phrase>",
              "rule": "<the specific rule name, e.g. 'Subject-Verb Agreement'>",
              "explanation": "<why this is wrong and how to fix it>",
              "explanation_ar": "<Arabic explanation>"
            }
          ],
          "pronunciationNotes": [
            {
              "word": "<word with pronunciation concern>",
              "phonetic": "<IPA or simplified phonetic guide>",
              "tip": "<how to pronounce it correctly>",
              "tip_ar": "<Arabic tip>"
            }
          ],
          "tip": "<specific, actionable strategy to improve based on their biggest weakness>",
          "tip_ar": "<same tip in Arabic>",
          "strengths": ["<something they did well>"],
          "suggestedVocab": {
            "word": "<a more sophisticated word they could use instead of a simple one they used>",
            "translation": "<Arabic translation>",
            "cat": "<Academic/Professional/Daily>",
            "example": "<example sentence using this word>"
          }
        }
        
        BE STRICT but ENCOURAGING. Find real errors. Do not fabricate errors that don't exist.
        If the speech is very short, still provide meaningful analysis.
        Only return the JSON object, nothing else.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        const cleanedJson = text.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(cleanedJson);
        
        // Ensure all required fields exist
        parsed.metrics = parsed.metrics || { pronunciation: 50, fluency: 50, grammar: 50, overall: 50 };
        parsed.errors = parsed.errors || [];
        parsed.pronunciationNotes = parsed.pronunciationNotes || [];
        parsed.strengths = parsed.strengths || [];
        
        return parsed;
    } catch (error) {
        console.error('Gemini Analysis Error:', error);
        if (error.message && error.message.includes('429')) throw new Error('API Quota Exceeded');
        throw new Error('Failed to analyze speech');
    }
}

async function chatWithAI(message, history = []) {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not configured');
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const systemPrompt = `You are LingoWise AI — a friendly, expert English language tutor and conversation partner.

YOUR CORE RESPONSIBILITIES:
1. **Grammar Correction**: If the user writes in English, ALWAYS check their message for grammar mistakes FIRST. If you find errors:
   - Show the corrected version
   - Explain what was wrong using simple terms
   - Give the grammar rule name
   
2. **Teaching**: Explain grammar rules, vocabulary, idioms, and pronunciation clearly with examples.

3. **Conversation Practice**: Engage naturally while gently correcting errors. Don't just fix — teach WHY.

4. **Bilingual Support**: If the user writes in Arabic, respond in Arabic with English examples. If in English, respond primarily in English.

RESPONSE FORMAT RULES:
- Use clear formatting with line breaks
- Use emojis sparingly for friendliness (✅ ❌ 💡 📝)
- Keep responses focused and under 300 words
- Always end with an encouraging note or follow-up question
- When correcting, use this pattern:
  ❌ Their version
  ✅ Correct version
  📝 Rule: [explanation]

PERSONALITY:
- Warm, encouraging, patient
- Celebrate small wins
- Make learning fun
- Never condescending`;

    const chat = model.startChat({
        history: history.map(h => ({
            role: h.role === 'bot' ? 'model' : 'user',
            parts: [{ text: h.text }]
        })),
        generationConfig: {
            maxOutputTokens: 800,
        },
    });

    try {
        const fullMessage = history.length === 0 ? `${systemPrompt}\n\nUser: ${message}` : message;
        
        const result = await chat.sendMessage(fullMessage);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini Chat Error:', error);
        if (error.message && error.message.includes('429')) throw new Error('API Quota Exceeded');
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
        if (error.message && error.message.includes('429')) throw new Error('API Quota Exceeded');
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
        if (error.message && error.message.includes('429')) throw new Error('API Quota Exceeded');
        throw new Error('Failed to extract vocabulary');
    }
}

module.exports = { analyzeSpeech, chatWithAI, generateQuiz, extractVocab };
