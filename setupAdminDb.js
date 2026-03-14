const { Client } = require('pg');
require('dotenv').config();

// Attempt to parse the password from the bracketed version in .env
const dbUrl = process.env.DATABASE_URL;
let password = '';
if (dbUrl) {
    const match = dbUrl.match(/:\/\/postgres:(.*)@/);
    if (match) {
        password = match[1];
        // Remove brackets if they were used as placeholders
        if (password.startsWith('[') && password.endsWith(']')) {
            password = password.substring(1, password.length - 1);
        }
    }
}

const client = new Client({
  user: 'postgres',
  host: 'db.derljusujdlevflbnswp.supabase.co',
  database: 'postgres',
  password: password,
  port: 5432,
});

async function setup() {
  try {
    console.log(`Attempting to connect with password: ${password.substring(0, 2)}...`);
    await client.connect();
    console.log("Connected to Supabase PostgreSQL.");

    const sql = `
      -- 1. Ensure courses has JSONB fields for flexibility
      ALTER TABLE public.courses 
      ALTER COLUMN title TYPE jsonb USING to_jsonb(title),
      ALTER COLUMN level TYPE jsonb USING to_jsonb(level),
      ALTER COLUMN category TYPE jsonb USING to_jsonb(category);
      
      -- Rename title to name to match main.js
      ALTER TABLE public.courses RENAME COLUMN title TO name;

      -- 2. Add exercises and vocab to lessons
      ALTER TABLE public.lessons 
      ADD COLUMN IF NOT EXISTS exercises jsonb DEFAULT '[]',
      ADD COLUMN IF NOT EXISTS vocab jsonb DEFAULT '[]',
      ALTER COLUMN title TYPE jsonb USING to_jsonb(title);
      
      -- 3. Create a settings/app_data table for global state if needed
      CREATE TABLE IF NOT EXISTS public.app_config (
        key text PRIMARY KEY,
        value jsonb,
        updated_at timestamp with time zone DEFAULT now()
      );
    `;

    await client.query(sql);
    console.log("Database schema updated successfully.");

  } catch (err) {
    console.error("Error setting up DB", err);
    console.log("\nIf password failed, please ensure the password in .env is correct and doesn't have extra brackets.");
  } finally {
    await client.end();
  }
}

setup();
