require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function testSupabase() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    console.log('Testing connection to:', url);
    console.log('Using Key:', key ? key.substring(0, 15) + '...' : 'MISSING');

    if (!url || !key) {
        console.error('Missing credentials!');
        return;
    }

    const supabase = createClient(url, key);

    try {
        const { data, error } = await supabase.from('profiles').select('*').limit(1);
        if (error) {
            console.error('Database Error:', error.message);
            console.error('Details:', error.details);
            console.error('Hint:', error.hint);
        } else {
            console.log('Successfully connected to profiles table!');
            console.log('Data sample:', data);
        }
    } catch (e) {
        console.error('Execution Error:', e.message);
    }
}

testSupabase();
