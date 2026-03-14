const supabase = require('./api/src/supabase');
require('dotenv').config();

async function updateAdminPassword() {
    if (!supabase) return console.log("No Supabase connection.");

    const email = 'admin@calcwises.com';
    const newPassword = 'Admin010509';

    console.log(`Updating password for: ${email}...`);
    
    // 1. Find the user ID by email
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) return console.error("Error listing users:", listError.message);
    
    const adminUser = users.find(u => u.email === email);
    
    if (!adminUser) return console.error("Admin user not found.");

    // 2. Update the user password
    const { data, error } = await supabase.auth.admin.updateUserById(
        adminUser.id,
        { password: newPassword }
    );

    if (error) {
        console.error("Error updating password:", error.message);
    } else {
        console.log("✅ Admin password updated successfully!");
        console.log("New Password:", newPassword);
    }
}

updateAdminPassword();
