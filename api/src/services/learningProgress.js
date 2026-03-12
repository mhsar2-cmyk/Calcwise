/**
 * Portfolio Service
 * Manages user's asset holdings.
 */
const supabase = require('../supabase');

const getPortfolio = async (userId) => {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .eq('user_id', userId);

    if (error) {
        console.error('Portfolio fetch error:', error);
        return [];
    }
    return data;
};

const addAsset = async (assetData) => {
    const { userId, name, symbol, market, qty, avgCost, icon, color } = assetData;

    if (!supabase) throw new Error('Database connection missing');

    const { data, error } = await supabase
        .from('portfolio')
        .insert([{
            user_id: userId,
            name, symbol, market,
            qty: parseFloat(qty),
            avg_cost: parseFloat(avgCost),
            icon, color
        }])
        .select();

    if (error) throw new Error(error.message);
    return data[0];
};

const removeAsset = async (id) => {
    if (!supabase) return false;
    const { error } = await supabase.from('portfolio').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return true;
};

module.exports = { getPortfolio, addAsset, removeAsset };
