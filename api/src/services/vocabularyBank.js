/**
 * Trade Journal Service
 * Manages user's past trades and notes.
 */
const supabase = require('../supabase');

const getJournal = async (userId) => {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('journals')
        .select('*')
        .eq('user_id', userId);

    if (error) {
        console.error('Journal fetch error:', error);
        return [];
    }
    return data;
};

const addTrade = async (tradeData) => {
    const { userId, asset, type, entry, exit, qty, pnl, notes } = tradeData;

    if (!supabase) throw new Error('Database connection missing');

    const { data, error } = await supabase
        .from('journals')
        .insert([{
            user_id: userId,
            asset, type, entry, exit, qty, pnl, notes
        }])
        .select();

    if (error) throw new Error(error.message);
    return data[0];
};

const removeTrade = async (id) => {
    if (!supabase) return false;
    const { error } = await supabase.from('journals').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return true;
};

module.exports = { getJournal, addTrade, removeTrade };
