/**
 * Course Management Service
 * Handles relational storage of courses and lessons.
 */
const supabase = require('../supabase');

/**
 * Fetch all courses with nested lessons
 */
const getCourses = async () => {
    if (!supabase) return [];

    // Fetch all courses
    const { data: courses, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: true });

    if (courseError) throw courseError;

    // Fetch all lessons
    const { data: lessons, error: lessonError } = await supabase
        .from('lessons')
        .select('*')
        .order('order_index', { ascending: true });

    if (lessonError) throw lessonError;

    // Map lessons back to courses
    return courses.map(course => {
        return {
            ...course,
            lessons: lessons.filter(l => l.course_id === course.id)
        };
    });
};

/**
 * Synchronize the entire course pool from the admin dashboard
 * This is an efficient 'wipe and reload' or 'upsert' logic.
 */
const saveCoursePool = async (coursePool) => {
    if (!supabase) throw new Error('Database connection missing');

    // 1. Prepare Courses for upsert
    const coursesToUpsert = coursePool.map((c, idx) => ({
        id: c.uuid || c.id, // Support existing UUIDs or fall back to client IDs
        name: c.name,
        level: c.level,
        category: c.category || { en: 'General', ar: 'عام' },
        icon: c.icon,
        color: c.color,
        video_url: c.videoUrl || c.video_url,
        updated_at: new Date().toISOString()
    }));

    // Perform upsert (using ID as matching key)
    const { error: courseError } = await supabase
        .from('courses')
        .upsert(coursesToUpsert);

    if (courseError) throw courseError;

    // 2. Prepare Lessons for upsert
    let allLessonsToUpsert = [];
    coursePool.forEach(course => {
        if (course.lessons) {
            course.lessons.forEach((lesson, idx) => {
                allLessonsToUpsert.push({
                    course_id: course.uuid || course.id,
                    title: lesson.title,
                    duration: lesson.duration,
                    order_index: idx + 1,
                    exercises: lesson.exercises || [],
                    vocab: lesson.vocab || []
                });
            });
        }
    });

    // Clear old lessons to avoid duplicates and handle deletions 
    // (Simple approach for now: clear lessons of the touched courses)
    const courseIds = coursesToUpsert.map(c => c.id);
    await supabase.from('lessons').delete().in('course_id', courseIds);

    // Batch insert new ones
    if (allLessonsToUpsert.length > 0) {
        const { error: lessonError } = await supabase
            .from('lessons')
            .insert(allLessonsToUpsert);
        if (lessonError) throw lessonError;
    }

    return { success: true };
};

module.exports = { getCourses, saveCoursePool };
