/**
 * Learning Progress Service
 * Manages user's course progress and stats.
 */
const supabase = require('../supabase');

const getProgress = async (userId) => {
    // Return mock data for demo if DB not available
    if (!supabase) return [
        { courseId: 'beg-1', progress: 65, status: 'active' },
        { courseId: 'int-1', progress: 12, status: 'active' }
    ];

    const { data, error } = await supabase
        .from('learning_progress')
        .select('*')
        .eq('user_id', userId);

    if (error) {
        console.warn('Progress fetch failed, using fallback.');
        return [];
    }
    return data;
};

const updateProgress = async (progressData) => {
    const { userId, courseId, progress, status } = progressData;

    if (!supabase) return { success: true, mock: true };

    const { data, error } = await supabase
        .from('learning_progress')
        .upsert([{
            user_id: userId,
            course_id: courseId,
            progress: parseFloat(progress),
            status,
            updated_at: new Date()
        }])
        .select();

    if (error) throw new Error(error.message);
    return data[0];
};

module.exports = { getProgress, updateProgress };
