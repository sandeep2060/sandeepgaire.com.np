import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
    getProjects, addProject, updateProject, deleteProject,
    getBlogs, addBlog, updateBlog, deleteBlog, getAdminStats
} from '../../services/api';
import './Admin.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('projects');
    const [isLoading, setIsLoading] = useState(false);

    // Data State
    const [projects, setProjects] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [stats, setStats] = useState({ views: 0, likes: 0, dislikes: 0 });

    // Form State
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const [projectForm, setProjectForm] = useState({ title: '', category: '', description: '', tags: '', liveUrl: '', thumbnail: '' });
    const [blogForm, setBlogForm] = useState({ title: '', author: '', content: '' });

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (!isAdmin) {
            navigate('/admin');
            return;
        }
        loadData();
    }, [navigate]);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [p, b, s] = await Promise.all([
                getProjects(),
                getBlogs(),
                getAdminStats()
            ]);
            setProjects(p || []);
            setBlogs(b || []);
            setStats(s || { views: 0, likes: 0, dislikes: 0 });
        } catch (error) {
            console.error(error);
            toast.error('Failed to load data');
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/admin');
    };

    // --- Project Handlers ---
    const handleProjectSubmit = async (e) => {
        e.preventDefault();
        if (!projectForm.title || !projectForm.description) return toast.error('Fill required fields');

        // Process tags
        const tagsArray = Array.isArray(projectForm.tags)
            ? projectForm.tags
            : projectForm.tags.split(',').map(t => t.trim());

        // Map form fields to DB columns
        // Note: DB expects camelCase or snake_case depending entirely on Supabase columns.
        // Based on api.js seeding, it seems we use: title, description, thumbnail, category, tags, live_url, github_url
        // Adjusted to match potential DB schema (using snake_case for Supabase usually)
        const projectData = {
            title: projectForm.title,
            category: projectForm.category,
            description: projectForm.description,
            tags: tagsArray,
            live_url: projectForm.liveUrl, // api.js map suggests live_url
            // github_url not in form? Assuming not needed or mapped from liveUrl for now? 
            // Let's assume the form state liveUrl maps to live_url column
            thumbnail: projectForm.thumbnail
        };

        setIsLoading(true);
        try {
            if (isEditing) {
                await updateProject(editId, projectData);
                toast.success('Project Updated');
            } else {
                await addProject(projectData);
                toast.success('Project Added');
            }
            exitEditMode();
            loadData();
        } catch (error) {
            console.error(error);
            toast.error('Operation failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditProject = (project) => {
        setIsEditing(true);
        setEditId(project.id);
        setActiveTab('projects');
        setProjectForm({
            title: project.title,
            category: project.category,
            description: project.description,
            tags: project.tags ? project.tags.join(', ') : '',
            liveUrl: project.live_url || '', // Handle DB column name
            thumbnail: project.thumbnail || ''
        });
        window.scrollTo(0, 0);
    };

    // --- Blog Handlers ---
    const handleBlogSubmit = async (e) => {
        e.preventDefault();
        if (!blogForm.title || !blogForm.content) return toast.error('Fill required fields');

        setIsLoading(true);
        try {
            if (isEditing) {
                await updateBlog(editId, blogForm);
                toast.success('Blog Updated');
            } else {
                await addBlog(blogForm);
                toast.success('Blog Published');
            }
            exitEditMode();
            loadData();
        } catch (error) {
            console.error(error);
            toast.error('Operation failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditBlog = (blog) => {
        setIsEditing(true);
        setEditId(blog.id);
        setActiveTab('blogs');
        setBlogForm({
            title: blog.title,
            author: blog.author,
            content: blog.content
        });
        window.scrollTo(0, 0);
    };

    const exitEditMode = () => {
        setIsEditing(false);
        setEditId(null);
        setProjectForm({ title: '', category: '', description: '', tags: '', liveUrl: '', thumbnail: '' });
        setBlogForm({ title: '', author: '', content: '' });
    };

    const handleDelete = async (id, type) => {
        if (window.confirm('Are you sure? This cannot be undone.')) {
            setIsLoading(true);
            try {
                if (type === 'project') await deleteProject(id);
                if (type === 'blog') await deleteBlog(id);
                toast.success('Deleted successfully');
                loadData();
                if (isEditing && editId === id) exitEditMode();
            } catch (error) {
                console.error(error);
                toast.error('Delete failed');
            } finally {
                setIsLoading(false);
            }
        }
    };

    if (isLoading && projects.length === 0 && blogs.length === 0) {
        return <div className="loading-screen">Loading Admin Dashboard...</div>;
    }

    return (
        <div className="dashboard-page section">
            <div className="container">
                <div className="dashboard-header">
                    <h2>Admin Dashboard</h2>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="btn btn-sm btn-outline" onClick={loadData} disabled={isLoading}>
                            {isLoading ? '...' : 'Refresh'}
                        </button>
                        <button className="btn btn-outline" onClick={logout}>Logout</button>
                    </div>
                </div>

                {/* Analytics Cards */}
                <div className="stats-grid">
                    <div className="stat-card glass">
                        <h3>{stats.views}</h3>
                        <p>Total Views</p>
                    </div>
                    <div className="stat-card glass">
                        <h3>{stats.likes}</h3>
                        <p>Total Likes</p>
                    </div>
                    <div className="stat-card glass">
                        <h3>{stats.dislikes}</h3>
                        <p>Total Dislikes</p>
                    </div>
                </div>

                <div className="dashboard-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('projects'); exitEditMode(); }}
                    >
                        Manage Projects
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'blogs' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('blogs'); exitEditMode(); }}
                    >
                        Manage Blogs
                    </button>
                </div>

                <div className="admin-content">
                    {activeTab === 'projects' ? (
                        <div className="admin-section">
                            <div className="admin-form-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                    <h3>{isEditing ? 'Edit Project' : 'Add New Project'}</h3>
                                    {isEditing && <button className="btn btn-outline btn-sm" onClick={exitEditMode}>Cancel Edit</button>}
                                </div>

                                <form onSubmit={handleProjectSubmit}>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} disabled={isLoading} />
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <input value={projectForm.category} onChange={e => setProjectForm({ ...projectForm, category: e.target.value })} disabled={isLoading} />
                                    </div>
                                    <div className="form-group">
                                        <label>Thumbnail URL (Image Link)</label>
                                        <input value={projectForm.thumbnail} onChange={e => setProjectForm({ ...projectForm, thumbnail: e.target.value })} placeholder="https://example.com/image.jpg" disabled={isLoading} />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} disabled={isLoading} />
                                    </div>
                                    <div className="form-group">
                                        <label>Tags (comma separated)</label>
                                        <input value={projectForm.tags} onChange={e => setProjectForm({ ...projectForm, tags: e.target.value })} disabled={isLoading} />
                                    </div>
                                    <div className="form-group">
                                        <label>Live URL</label>
                                        <input value={projectForm.liveUrl} onChange={e => setProjectForm({ ...projectForm, liveUrl: e.target.value })} disabled={isLoading} />
                                    </div>
                                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                        {isLoading ? 'Processing...' : (isEditing ? 'Update Project' : 'Add Project')}
                                    </button>
                                </form>
                            </div>

                            <div className="preview-grid">
                                <h3>Existing Projects ({projects.length})</h3>
                                {projects.map(p => (
                                    <div key={p.id} className="preview-item">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            {p.thumbnail && <img src={p.thumbnail} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />}
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: '500' }}>{p.title}</span>
                                                <span style={{ fontSize: '0.8em', opacity: 0.7 }}>{p.views || 0} views</span>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button className="edit-btn" onClick={() => handleEditProject(p)}>Edit</button>
                                            <button className="delete-btn" onClick={() => handleDelete(p.id, 'project')}>Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="admin-section">
                            <div className="admin-form-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                    <h3>{isEditing ? 'Edit Blog' : 'Publish New Blog'}</h3>
                                    {isEditing && <button className="btn btn-outline btn-sm" onClick={exitEditMode}>Cancel Edit</button>}
                                </div>
                                <form onSubmit={handleBlogSubmit}>
                                    <div className="form-group">
                                        <label>Blog Title</label>
                                        <input value={blogForm.title} onChange={e => setBlogForm({ ...blogForm, title: e.target.value })} disabled={isLoading} />
                                    </div>
                                    <div className="form-group">
                                        <label>Author</label>
                                        <input value={blogForm.author} onChange={e => setBlogForm({ ...blogForm, author: e.target.value })} disabled={isLoading} />
                                    </div>
                                    <div className="form-group">
                                        <label>Content (HTML supported)</label>
                                        <textarea rows="10" value={blogForm.content} onChange={e => setBlogForm({ ...blogForm, content: e.target.value })} disabled={isLoading} />
                                    </div>
                                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                        {isLoading ? 'Processing...' : (isEditing ? 'Update Blog' : 'Publish Blog')}
                                    </button>
                                </form>
                            </div>

                            <div className="preview-grid">
                                <h3>Recent Blogs ({blogs.length})</h3>
                                {blogs.map(b => (
                                    <div key={b.id} className="preview-item">
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontWeight: '500' }}>{b.title}</span>
                                            <span style={{ fontSize: '0.8em', opacity: 0.7 }}>{b.views || 0} views</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button className="edit-btn" onClick={() => handleEditBlog(b)}>Edit</button>
                                            <button className="delete-btn" onClick={() => handleDelete(b.id, 'blog')}>Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
