import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, ThumbsUp, ThumbsDown, Eye } from 'lucide-react';
import { getStats, incrementStat, type ItemStats } from '../lib/statsManager';
import { supabase } from '../lib/supabase';
import Card from '../components/ui/Card';
import styles from './Blog.module.css';

const BlogCardItem = ({ post }: { post: any }) => {
  const [stats, setStats] = useState<ItemStats>({ likes: 0, dislikes: 0, views: 0 });
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  useEffect(() => {
    const initialStats = getStats('blogs', post.id);
    setStats(initialStats);
    
    // Increment view
    const newStats = incrementStat('blogs', post.id, 'views');
    setStats(newStats);
  }, [post.id]);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!hasLiked && !hasDisliked) {
      setStats(incrementStat('blogs', post.id, 'likes'));
      setHasLiked(true);
    }
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!hasLiked && !hasDisliked) {
      setStats(incrementStat('blogs', post.id, 'dislikes'));
      setHasDisliked(true);
    }
  };

  return (
    <Card hoverEffect className={styles.blogCard}>
      <div className={styles.imageWrapper}>
        <img src={post.image} alt={post.title} className={styles.blogImage} />
        <span className={styles.category}>{post.category}</span>
      </div>
      
      <div className={styles.blogContent}>
        <div className={styles.meta}>
          <span className={styles.date}><Calendar size={14} /> {post.date}</span>
          <span className={styles.readTime}>{post.readTime}</span>
        </div>
        
        <h3 className={styles.blogTitle}>{post.title}</h3>
        <p className={styles.blogExcerpt}>{post.excerpt}</p>
        
        <div className={styles.blogFooter}>
          <button className={styles.readMoreBtn}>
            Read Article <ArrowRight size={16} />
          </button>
          
          <div className={styles.blogStats}>
            <button 
              className={`${styles.statBtn} ${hasLiked ? styles.activeLike : ''}`} 
              onClick={handleLike} disabled={hasLiked || hasDisliked}
            >
              <ThumbsUp size={16} /> {stats.likes}
            </button>
            <button 
              className={`${styles.statBtn} ${hasDisliked ? styles.activeDislike : ''}`} 
              onClick={handleDislike} disabled={hasLiked || hasDisliked}
            >
              <ThumbsDown size={16} />
            </button>
            <span className={styles.statView}><Eye size={16} /> {stats.views}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('id', { ascending: false });
        
        if (error) throw error;
        setPosts(data || []);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className={styles.blogContainer}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.header}
        >
          <h2 className="text-gradient">Latest Articles</h2>
          <p className={styles.subtitle}>Thoughts, tutorials, and insights.</p>
        </motion.div>

        {loading ? (
          <div className={styles.loaderWrapper}>
            <div className="loader"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>No articles found</h3>
            <p>Write something in the admin panel to get started.</p>
          </div>
        ) : (
          <div className={styles.blogGrid}>
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
              >
                <BlogCardItem post={post} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
