require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const keyToUse = supabaseServiceKey || supabaseAnonKey;

if (!supabaseUrl || !keyToUse) {
    console.warn('⚠️ Supabase credentials missing. Backend will fall back to mock data.');
}

const supabase = (supabaseUrl && keyToUse)
    ? createClient(supabaseUrl, keyToUse)
    : null;

module.exports = supabase;
