const supabase = require('./api/src/supabase');
require('dotenv').config();

async function createAdmin() {
    if (!supabase) return console.log("No Supabase");

    const email = 'admin@calcwises.com';
    const password = 'AdminPassword123!'; // User should change this after first login

    console.log(`Creating admin user: ${email}...`);
    
    const { data, error } = await supabase.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true,
        user_metadata: { first_name: 'Admin', last_name: 'User' }
    });

    if (error) {
        if (error.message.includes('already registered')) {
            console.log("Admin user already exists.");
        } else {
            console.error("Error creating admin:", error.message);
        }
    } else {
        console.log("Admin user created successfully!");
        console.log("Email:", email);
        console.log("Password:", password);
    }
}

createAdmin();
