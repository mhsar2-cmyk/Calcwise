/**
 * Auth Service (Production Grade)
 * Handles user identity and security via Supabase Auth.
 */
const supabase = require('../supabase');

/**
 * Register a new user with Supabase Auth
 */
const signup = async (userData) => {
    const { email, password, firstName, lastName } = userData;

    if (!supabase) throw new Error('Database connection missing');

    // 1. Create the user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name: firstName,
                last_name: lastName,
            }
        }
    });

    if (error) throw new Error(error.message);

    // 2. Return the user public data
    return {
        id: data.user.id,
        email: data.user.email,
        firstName: firstName,
        lastName: lastName
    };
};

/**
 * Log in an existing user
 */
const login = async (email, password) => {
    if (!supabase) throw new Error('Database connection missing');

    // 1. Verify credentials via Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) throw new Error(error.message);

    // 2. Return User + Session Token
    return {
        user: {
            id: data.user.id,
            email: data.user.email,
            firstName: data.user.user_metadata.first_name,
            lastName: data.user.user_metadata.last_name
        },
        session: data.session // Includes the JWT access_token
    };
};

module.exports = { signup, login };
