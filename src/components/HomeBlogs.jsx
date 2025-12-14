import { useState, useEffect } from 'react';
import { getBlogs } from '../services/api';
import { useNavigate } from 'react-router-dom';
import LikeDislikeBtn from './LikeDislikeBtn';
import '../pages/Blogs.css';

const HomeBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allBlogs = await getBlogs();
                if (allBlogs) {
                    // Add mock views if needed or rely on DB
                    const enhanced = allBlogs.map(b => ({
                        ...b,
                        views: b.views || 0
                    }));
                    setBlogs(enhanced.slice(0, 3));
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);

    if (blogs.length === 0) return null;

    return (
        <section id="blogs" className="section blogs box-white">
            <div className="container">
                <div className="section-title">
                    <span className="section-subtitle">Latest Articles</span>
                    <h2>From The Blog</h2>
                </div>

                <div className="blogs-grid">
                    {blogs.map((blog) => (
                        <article key={blog.id} className="blog-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/blog')}>
                            <div className="blog-image-header" style={{ height: '140px' }}>
                                <div className="blog-category-badge">Article</div>
                                <div className="blog-views">
                                    👁️ {blog.views}
                                </div>
                            </div>

                            <div className="blog-content" style={{ padding: '20px' }}>
                                <div className="blog-meta">
                                    <span className="blog-date">📅 {new Date(blog.created_at).toLocaleDateString()}</span>
                                    <span className="blog-author">✍️ {blog.author}</span>
                                </div>
                                <h3 className="blog-title" style={{ fontSize: '1.2rem' }}>{blog.title}</h3>
                                <div className="blog-excerpt" dangerouslySetInnerHTML={{ __html: (blog.content || '').substring(0, 80) + '...' }} />

                                <div className="blog-footer" onClick={(e) => e.stopPropagation()}>
                                    <span className="read-more-btn" onClick={() => navigate('/blog')}>Read More</span>
                                    <LikeDislikeBtn itemId={blog.id} type="blog" hideDislikeCount={true} />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <button className="btn btn-outline" onClick={() => navigate('/blog')}>View All Posts</button>
                </div>
            </div>
        </section>
    );
};

export default HomeBlogs;
