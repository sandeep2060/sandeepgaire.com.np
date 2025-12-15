import { supabase } from './supabase';
import projectsData from '../data/projects';

// --- Projects ---

export const getProjects = async () => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
    return data;
};

export const addProject = async (project) => {
    const { data, error } = await supabase
        .from('projects')
        .insert([project])
        .select();

    if (error) throw error;
    return data[0];
};

export const updateProject = async (id, updates) => {
    const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select();

    if (error) throw error;
    return data[0];
};

export const deleteProject = async (id) => {
    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

// --- Blogs ---

export const getBlogs = async () => {
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching blogs:', error);
        return [];
    }
    return data;
};

export const addBlog = async (blog) => {
    // Add default date if not present
    const blogWithDate = {
        ...blog,
        created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
        .from('blogs')
        .insert([blogWithDate])
        .select();

    if (error) throw error;
    return data[0];
};

export const updateBlog = async (id, updates) => {
    const { data, error } = await supabase
        .from('blogs')
        .update(updates)
        .eq('id', id)
        .select();

    if (error) throw error;
    return data[0];
};

export const deleteBlog = async (id) => {
    const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

// --- Interactions (Likes/Dislikes) ---

export const getInteractions = async (itemId) => {
    // Get counts
    const { count: likes } = await supabase
        .from('interactions')
        .select('*', { count: 'exact', head: true })
        .eq('item_id', itemId)
        .eq('action', 'like');

    const { count: dislikes } = await supabase
        .from('interactions')
        .select('*', { count: 'exact', head: true })
        .eq('item_id', itemId)
        .eq('action', 'dislike');

    return { likes: likes || 0, dislikes: dislikes || 0 };
};

export const getUserInteraction = async (itemId) => {
    const fp = await getFingerprint();
    const { data } = await supabase
        .from('interactions')
        .select('action')
        .eq('item_id', itemId)
        .eq('user_fingerprint', fp)
        .single();

    return data ? data.action : null;
};

export const toggleInteraction = async (itemId, type, action) => {
    const fp = await getFingerprint();

    // Check existing
    const { data: existing } = await supabase
        .from('interactions')
        .select('id, action')
        .eq('item_id', itemId)
        .eq('user_fingerprint', fp)
        .single();

    if (existing) {
        if (existing.action === action) {
            // Remove (toggle off)
            await supabase.from('interactions').delete().eq('id', existing.id);
            return null;
        } else {
            // Change (like -> dislike or vice versa)
            await supabase
                .from('interactions')
                .update({ action })
                .eq('id', existing.id);
            return action;
        }
    } else {
        // Create new
        await supabase
            .from('interactions')
            .insert([{ item_id: itemId, type, user_fingerprint: fp, action }]);
        return action;
    }
};

// Increment view count
export const incrementView = async (table, id) => {
    // Using rpc would be better for atomicity, but simple update is fine for this scale
    // First get current
    const { data } = await supabase.from(table).select('views').eq('id', id).single();
    if (data) {
        await supabase.from(table).update({ views: (data.views || 0) + 1 }).eq('id', id);
    }
};

// --- Stats for Admin ---
export const getAdminStats = async () => {
    // Calculate total views from Projects and Blogs
    // Note: Ideally use a Database Function (RPC) for this, but client-side sum is okay for small portfolio
    const { data: projects } = await supabase.from('projects').select('views');
    const projectViews = projects ? projects.reduce((acc, curr) => acc + (curr.views || 0), 0) : 0;

    const { data: blogs } = await supabase.from('blogs').select('views');
    const blogViews = blogs ? blogs.reduce((acc, curr) => acc + (curr.views || 0), 0) : 0;

    // Count Likes/Dislikes
    const { count: likes } = await supabase
        .from('interactions')
        .select('*', { count: 'exact', head: true })
        .eq('action', 'like');

    const { count: dislikes } = await supabase
        .from('interactions')
        .select('*', { count: 'exact', head: true })
        .eq('action', 'dislike');

    return {
        views: projectViews + blogViews,
        likes: likes || 0,
        dislikes: dislikes || 0
    };
};

// Simple fingerprint for demo (using IP or user agent hash ideally, but here just localstorage ID)
// Simple fingerprint using UUID to match Supabase schema
const getFingerprint = async () => {
    let fp = localStorage.getItem('site_fingerprint');

    // Check if existing fingerprint is a valid UUID
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(fp || '');

    if (!fp || !isUUID) {
        // Generate new UUID
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            fp = crypto.randomUUID();
        } else {
            // Fallback UUID generator
            fp = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        localStorage.setItem('site_fingerprint', fp);
    }
    return fp;
};

// --- Seeding ---
export const seedInitialData = async () => {
    const { count } = await supabase.from('projects').select('*', { count: 'exact', head: true });
    if (count === 0 && projectsData.length > 0) {
        // Map data structure if needed
        const formatted = projectsData.map(p => ({
            title: p.title,
            description: p.description,
            thumbnail: p.thumbnail,
            category: p.category,
            tags: p.tags,
            live_url: p.liveUrl,
            github_url: p.githubUrl,
            views: 0
        }));
        await supabase.from('projects').insert(formatted);
        console.log('Seeded initial projects');
    }
};
