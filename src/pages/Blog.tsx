import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, ThumbsUp, ThumbsDown, Eye } from 'lucide-react';
import { getStats, incrementStat, type ItemStats } from '../lib/statsManager';
import Card from '../components/ui/Card';
import styles from './Blog.module.css';

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Web Development with React 19',
    excerpt: 'Exploring the new features in React 19 and how they will change the way we build web applications.',
    date: 'Oct 15, 2023',
    readTime: '5 min read',
    category: 'React',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Mastering CSS Grid and Flexbox for Modern Layouts',
    excerpt: 'A comprehensive guide to creating complex responsive layouts using modern CSS techniques without frameworks.',
    date: 'Sep 28, 2023',
    readTime: '8 min read',
    category: 'CSS',
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Why Supabase is the Ultimate Firebase Alternative',
    excerpt: 'Comparing Supabase and Firebase for your next side project. Performance, pricing, and developer experience analyzed.',
    date: 'Sep 10, 2023',
    readTime: '6 min read',
    category: 'Backend',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

const BlogCardItem = ({ post }: { post: typeof blogPosts[0] }) => {
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

        <div className={styles.blogGrid}>
          {blogPosts.map((post, index) => (
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
      </div>
    </div>
  );
};

export default Blog;
