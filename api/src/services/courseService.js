/**
 * Course Management Service (Direct SQL Version)
 * Handles storage of courses and lessons using PostgreSQL.
 */
const { pool } = require('../supabase');

/**
 * Fetch all courses with nested lessons
 */
const getCourses = async () => {
    const client = await pool.connect();
    try {
        // Fetch all courses
        const courseRes = await client.query('SELECT * FROM public.courses ORDER BY created_at ASC');
        const courses = courseRes.rows;

        // Fetch all lessons
        const lessonRes = await client.query('SELECT * FROM public.lessons ORDER BY order_index ASC');
        const lessons = lessonRes.rows;

        // Map lessons back to courses
        return courses.map(course => {
            return {
                ...course,
                lessons: lessons.filter(l => l.course_id === course.id)
            };
        });
    } catch (err) {
        console.error('Error fetching courses:', err.message);
        throw err;
    } finally {
        client.release();
    }
};

/**
 * Synchronize the entire course pool
 */
const saveCoursePool = async (coursePool) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        for (const c of coursePool) {
            const courseId = c.uuid || c.id;
            
            // Upsert Course
            const courseSql = `
                INSERT INTO public.courses (id, name, level, category, icon, color, video_url, updated_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
                ON CONFLICT (id) DO UPDATE SET 
                    name = EXCLUDED.name,
                    level = EXCLUDED.level,
                    category = EXCLUDED.category,
                    icon = EXCLUDED.icon,
                    color = EXCLUDED.color,
                    video_url = EXCLUDED.video_url,
                    updated_at = NOW()
            `;
            await client.query(courseSql, [
                courseId,
                JSON.stringify(c.name),
                JSON.stringify(c.level),
                JSON.stringify(c.category || { en: 'General', ar: 'عام' }),
                c.icon,
                c.color,
                c.videoUrl || c.video_url
            ]);

            // Clear old lessons for this course
            await client.query('DELETE FROM public.lessons WHERE course_id = $1', [courseId]);

            // Insert new lessons
            if (c.lessons && c.lessons.length > 0) {
                for (let i = 0; i < c.lessons.length; i++) {
                    const l = c.lessons[i];
                    const lessonSql = `
                        INSERT INTO public.lessons (course_id, title, duration, order_index, video_url, exercises, vocab)
                        VALUES ($1, $2, $3, $4, $5, $6, $7)
                    `;
                    await client.query(lessonSql, [
                        courseId,
                        JSON.stringify(l.title),
                        l.duration,
                        i + 1,
                        l.videoUrl || l.video_url,
                        JSON.stringify(l.exercises || []),
                        JSON.stringify(l.vocab || [])
                    ]);
                }
            }
        }

        await client.query('COMMIT');
        return { success: true };
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error saving courses:', err.message);
        throw err;
    } finally {
        client.release();
    }
};

module.exports = { getCourses, saveCoursePool };
