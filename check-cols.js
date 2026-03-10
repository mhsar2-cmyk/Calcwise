require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function checkColumns() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
    const supabase = createClient(url, key);

    // Check columns of profiles
    const { data, error } = await supabase.rpc('get_columns', { table_name: 'profiles' });
    // If RPC isn't available, we can try a simple query and check the returned object keys
    const { data: sample } = await supabase.from('profiles').select('*').limit(1);

    console.log('Sample data keys:', sample && sample[0] ? Object.keys(sample[0]) : 'No data');

    // Alternative: try to insert with lowercase and see if it works
    const { error: err2 } = await supabase.from('profiles').insert([{ email: 'test_col@ex.com', firstname: 'Test' }]);
    console.log('Insert firstname trial error:', err2 ? err2.message : 'SUCCESS');
}

checkColumns();
