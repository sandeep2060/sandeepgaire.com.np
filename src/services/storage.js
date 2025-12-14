// Simple storage service to simulate backend
// Using localStorage to persist data

const STORAGE_KEYS = {
    PROJECTS: 'portfolio_projects',
    BLOGS: 'portfolio_blogs',
    LIKES: 'portfolio_likes'
};

// --- Projects ---
export const getProjects = () => {
    const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return stored ? JSON.parse(stored) : [];
};

export const addProject = (project) => {
    const projects = getProjects();
    const newProject = { ...project, id: Date.now() }; // Simple ID generation
    const updated = [newProject, ...projects];
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
    return newProject;
};

export const deleteProject = (id) => {
    const projects = getProjects();
    const updated = projects.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
};

// --- Blogs ---
export const getBlogs = () => {
    const stored = localStorage.getItem(STORAGE_KEYS.BLOGS);
    return stored ? JSON.parse(stored) : [];
};

export const addBlog = (blog) => {
    const blogs = getBlogs();
    const newBlog = {
        ...blog,
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        views: 0,
        likes: 0,
        dislikes: 0
    };
    const updated = [newBlog, ...blogs];
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(updated));
    return newBlog;
};

export const deleteBlog = (id) => {
    const blogs = getBlogs();
    const updated = blogs.filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(updated));
};

// --- Likes/Dislikes ---
export const getInteractions = (itemId) => {
    const allInteractions = JSON.parse(localStorage.getItem(STORAGE_KEYS.LIKES) || '{}');
    return allInteractions[itemId] || { likes: 0, dislikes: 0, userAction: null };
};

export const toggleInteraction = (itemId, type) => { // type: 'like' or 'dislike'
    const allInteractions = JSON.parse(localStorage.getItem(STORAGE_KEYS.LIKES) || '{}');
    const itemData = allInteractions[itemId] || { likes: 0, dislikes: 0, userAction: null };

    // If clicking the same action, remove it (toggle off)
    if (itemData.userAction === type) {
        if (type === 'like') itemData.likes--;
        if (type === 'dislike') itemData.dislikes--;
        itemData.userAction = null;
    } else {
        // If changing action (e.g. was like, now dislike)
        if (itemData.userAction === 'like') itemData.likes--;
        if (itemData.userAction === 'dislike') itemData.dislikes--;

        // Apply new action
        if (type === 'like') itemData.likes++;
        if (type === 'dislike') itemData.dislikes++;
        itemData.userAction = type;
    }

    allInteractions[itemId] = itemData;
    localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(allInteractions));
    return itemData;
};
