// Projects data - will be managed via admin panel later
// This is placeholder structure for now
export const projectsData = [
    {
        id: 1,
        title: 'Portfolio Website',
        category: 'Web Development',
        description: 'Modern portfolio website built with React.js featuring smooth animations and responsive design.',
        image: '/placeholder-project.jpg',
        tags: ['React', 'CSS', 'JavaScript'],
        liveUrl: '#',
        githubUrl: '#',
        featured: true
    },
    {
        id: 2,
        title: 'BCA Notes Platform',
        category: 'Education',
        description: 'Educational platform providing comprehensive BCA notes and study materials for students.',
        image: '/placeholder-project.jpg',
        tags: ['HTML', 'CSS', 'JavaScript', 'PHP'],
        liveUrl: '#',
        githubUrl: '#',
        featured: true
    },
    {
        id: 3,
        title: 'Web Development Tutorial',
        category: 'Education',
        description: 'Complete web development tutorial series covering HTML, CSS, and JavaScript fundamentals.',
        image: '/placeholder-project.jpg',
        tags: ['HTML', 'CSS', 'JavaScript'],
        liveUrl: '#',
        githubUrl: '#',
        featured: false
    }
];

export const projectCategories = [
    'All',
    'Web Development',
    'Education',
    'Tools',
    'Mobile Apps'
];

export default projectsData;
