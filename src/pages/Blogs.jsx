import { useState, useEffect } from 'react';
import { getBlogs } from '../services/api';
import LikeDislikeBtn from '../components/LikeDislikeBtn';
import './Blogs.css';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await getBlogs();
                setBlogs(data || []);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className="blogs-page pt-100 section">
            <div className="container">
                <div className="section-title text-center">
                    <span className="section-subtitle">Our Updates</span>
                    <h2>Latest Blog Posts</h2>
                </div>

                {isLoading ? (
                    <div style={{ textAlign: 'center' }}>Loading...</div>
                ) : (
                    <div className="blogs-grid">
                        {blogs.map(blog => (
                            <article key={blog.id} className="blog-card">
                                <div className="blog-image-header">
                                    <div className="blog-category-badge">Article</div>
                                    <div className="blog-views">👁️ {blog.views || 0}</div>
                                </div>
                                <div className="blog-content">
                                    <div className="blog-meta">
                                        <span>📅 {new Date(blog.created_at).toLocaleDateString()}</span>
                                        <span>✍️ {blog.author}</span>
                                    </div>
                                    <h3 className="blog-title">{blog.title}</h3>
                                    <div className="blog-body" dangerouslySetInnerHTML={{ __html: blog.content }} />

                                    <div className="blog-footer">
                                        <LikeDislikeBtn itemId={blog.id} type="blog" />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blogs;
