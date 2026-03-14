const { createClient } = require('@supabase/supabase-js');
const { Pool } = require('pg');

const supabaseUrl = process.env.SUPABASE_URL;
const keyToUse = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

// REST Client (Note: If keys are invalid Stripe keys, this will fail)
const supabase = (supabaseUrl && keyToUse && keyToUse.startsWith('eyJ'))
    ? createClient(supabaseUrl, keyToUse)
    : null;

if (!supabase) {
    console.warn('⚠️ Supabase REST client not initialized (Keys might be missing or invalid JWTs).');
}

// PostgreSQL Pool (Direct Connection - Most Reliable)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});

module.exports = { supabase, pool };
