/**
 * Auth Service (Direct SQL / Simple Version)
 */
const { pool } = require('../supabase');

const signup = async (userData) => {
    // Basic signup logic (not used for admin dashboard in this demo)
    return { success: false, message: "Signup disabled in this mode. Use SQL to add users." };
};

const login = async (email, password) => {
    // Hardcoded Admin for immediate fix, or you can implement SQL hashing
    if (email === 'admin@calcwises.com' && password === 'Admin010509') {
        return {
            success: true,
            user: { id: 'admin-1', email: 'admin@calcwises.com', firstName: 'Admin', lastName: 'User' },
            session: { access_token: 'dummy-admin-token-' + Date.now() }
        };
    }
    
    // For other users, we would normally check the DB, 
    // but without Supabase Auth REST keys, we'd need to manage hashes manually.
    throw new Error('Invalid credentials');
};

module.exports = { signup, login };
