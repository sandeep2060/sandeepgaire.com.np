import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
    getProjects, addProject, deleteProject,
    getBlogs, addBlog, deleteBlog, getInteractions
} from '../../services/storage';
import './Admin.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('projects');

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

    const loadData = () => {
        const p = getProjects();
        const b = getBlogs();
        setProjects(p);
        setBlogs(b);

        // Calculate Stats
        let totalLikes = 0;
        let totalDislikes = 0;

        const allInteractions = JSON.parse(localStorage.getItem('portfolio_likes') || '{}');
        Object.values(allInteractions).forEach(val => {
            totalLikes += val.likes || 0;
            totalDislikes += val.dislikes || 0;
        });

        const totalViews = b.reduce((acc, curr) => acc + (curr.views || 0), 0);
        setStats({ likes: totalLikes, dislikes: totalDislikes, views: totalViews });
    };

    const logout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/admin');
    };

    // --- Project Handlers ---
    const handleProjectSubmit = (e) => {
        e.preventDefault();
        if (!projectForm.title || !projectForm.description) return toast.error('Fill required fields');

        // Process tags
        const tagsArray = Array.isArray(projectForm.tags)
            ? projectForm.tags
            : projectForm.tags.split(',').map(t => t.trim());

        const projectData = {
            ...projectForm,
            tags: tagsArray
        };

        if (isEditing) {
            // Update existing project
            // Since our storage helper is simple (just add/delete), we'll implement update here
            // manually by replacing the item in the list
            const updatedProjects = projects.map(p => p.id === editId ? { ...projectData, id: editId } : p);
            localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));
            toast.success('Project Updated');
            exitEditMode();
        } else {
            addProject(projectData);
            toast.success('Project Added');
            setProjectForm({ title: '', category: '', description: '', tags: '', liveUrl: '', thumbnail: '' });
        }

        loadData();
    };

    const handleEditProject = (project) => {
        setIsEditing(true);
        setEditId(project.id);
        setActiveTab('projects');
        setProjectForm({
            title: project.title,
            category: project.category,
            description: project.description,
            tags: project.tags.join(', '),
            liveUrl: project.liveUrl,
            thumbnail: project.thumbnail || ''
        });
        window.scrollTo(0, 0);
    };

    // --- Blog Handlers ---
    const handleBlogSubmit = (e) => {
        e.preventDefault();
        if (!blogForm.title || !blogForm.content) return toast.error('Fill required fields');

        if (isEditing) {
            const updatedBlogs = blogs.map(b => b.id === editId ? { ...b, ...blogForm } : b);
            localStorage.setItem('portfolio_blogs', JSON.stringify(updatedBlogs));
            toast.success('Blog Updated');
            exitEditMode();
        } else {
            addBlog(blogForm);
            toast.success('Blog Published');
            setBlogForm({ title: '', author: '', content: '' });
        }

        loadData();
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

    const handleDelete = (id, type) => {
        if (window.confirm('Are you sure?')) {
            if (type === 'project') deleteProject(id);
            if (type === 'blog') deleteBlog(id);
            loadData();
            toast.success('Deleted successfully');
            if (isEditing && editId === id) exitEditMode();
        }
    };

    return (
        <div className="dashboard-page section">
            <div className="container">
                <div className="dashboard-header">
                    <h2>Admin Dashboard</h2>
                    <button className="btn btn-outline" onClick={logout}>Logout</button>
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
                                        <input value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <input value={projectForm.category} onChange={e => setProjectForm({ ...projectForm, category: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Thumbnail URL (Image Link)</label>
                                        <input value={projectForm.thumbnail} onChange={e => setProjectForm({ ...projectForm, thumbnail: e.target.value })} placeholder="https://example.com/image.jpg" />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Tags (comma separated)</label>
                                        <input value={projectForm.tags} onChange={e => setProjectForm({ ...projectForm, tags: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Live URL</label>
                                        <input value={projectForm.liveUrl} onChange={e => setProjectForm({ ...projectForm, liveUrl: e.target.value })} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">{isEditing ? 'Update Project' : 'Add Project'}</button>
                                </form>
                            </div>

                            <div className="preview-grid">
                                <h3>Existing Projects</h3>
                                {projects.map(p => (
                                    <div key={p.id} className="preview-item">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            {p.thumbnail && <img src={p.thumbnail} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />}
                                            <span>{p.title}</span>
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
                                        <input value={blogForm.title} onChange={e => setBlogForm({ ...blogForm, title: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Author</label>
                                        <input value={blogForm.author} onChange={e => setBlogForm({ ...blogForm, author: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Content (HTML supported)</label>
                                        <textarea rows="10" value={blogForm.content} onChange={e => setBlogForm({ ...blogForm, content: e.target.value })} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">{isEditing ? 'Update Blog' : 'Publish Blog'}</button>
                                </form>
                            </div>

                            <div className="preview-grid">
                                <h3>Recent Blogs</h3>
                                {blogs.map(b => (
                                    <div key={b.id} className="preview-item">
                                        <span>{b.title}</span>
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
