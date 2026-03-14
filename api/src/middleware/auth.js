/**
 * Simple Authentication Middleware
 */
const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1];

    // Simple Admin Token check for now to fix connection
    if (token.startsWith('dummy-admin-token-')) {
        req.user = { email: 'admin@calcwises.com', id: 'admin-1' };
        return next();
    }

    // Normally would verify with Supabase here
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
};

module.exports = authenticate;
