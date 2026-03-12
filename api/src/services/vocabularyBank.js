/**
 * Vocabulary Bank Service
 * Manages user's saved words and phrases.
 */
const supabase = require('../supabase');

const getBank = async (userId) => {
    if (!supabase) return [
        { id: 1, word: 'Resilience', translation: 'المرونة', category: 'General' },
        { id: 2, word: 'Ambiguous', translation: 'غامض', category: 'General' }
    ];

    const { data, error } = await supabase
        .from('vocabulary_bank')
        .select('*')
        .eq('user_id', userId);

    if (error) {
        console.error('Bank fetch error:', error);
        return [];
    }
    return data;
};

const addWord = async (wordData) => {
    const { userId, word, translation, category } = wordData;

    if (!supabase) return { success: true, mock: true };

    const { data, error } = await supabase
        .from('vocabulary_bank')
        .insert([{
            user_id: userId,
            word,
            translation,
            category
        }])
        .select();

    if (error) throw new Error(error.message);
    return data[0];
};

const removeWord = async (id) => {
    if (!supabase) return true;
    const { error } = await supabase.from('vocabulary_bank').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return true;
};

module.exports = { getBank, addWord, removeWord };
