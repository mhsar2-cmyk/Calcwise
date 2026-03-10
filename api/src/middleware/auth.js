const supabase = require('../supabase');

/**
 * Middleware to verify Supabase JWT
 */
const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({ success: false, message: 'Invalid or expired token' });
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (e) {
        return res.status(500).json({ success: false, message: 'Internal server error during auth' });
    }
};

module.exports = authenticate;
