/**
 * Course Data Service
 * Provides course information for the LingoWise platform.
 */

const getCourses = async () => {
    // In a real app, this would come from a DB
    return [
        { 
            id: 'beg-1', 
            name: 'Beginner English 101', 
            level: 'Beginner', 
            category: 'General', 
            icon: '🌱', 
            color: '#00d2d3',
            description: 'Build a strong foundation with essential vocabulary and basic grammar.',
            students: '12k+'
        },
        { 
            id: 'int-1', 
            name: 'Intermediate Grammar', 
            level: 'Intermediate', 
            category: 'Grammar', 
            icon: '📝', 
            color: '#6c5ce7',
            description: 'Expand your fluency and tackle complex sentence structures.',
            students: '8k+'
        },
        { 
            id: 'adv-1', 
            name: 'Advanced Speaking', 
            level: 'Advanced', 
            category: 'Speaking', 
            icon: '🎙️', 
            color: '#ff9f43',
            description: 'Refine your nuances and sound like a near-native speaker.',
            students: '5k+'
        },
        { 
            id: 'bus-1', 
            name: 'Business Writing', 
            level: 'Business', 
            category: 'Writing', 
            icon: '💼', 
            color: '#2e86de',
            description: 'Professional communication and workplace etiquette.',
            students: '3k+'
        }
    ];
};

module.exports = {
    getCourses
};
