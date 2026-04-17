import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Download, ArrowRight, Code, Palette, Zap, Calendar, ThumbsUp, ThumbsDown, Eye } from 'lucide-react';
import Hero3D from '../components/ui/Hero3D';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { supabase } from '../lib/supabase';
import { getStats, incrementStat, type ItemStats } from '../lib/statsManager';
import styles from './Home.module.css';

const TypingText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(intervalId);
    }, 100);
    return () => clearInterval(intervalId);
  }, [text]);

  return <span>{displayedText}<span className={styles.cursor}>|</span></span>;
};

// Mini-component for Home Project Card
const HomeProjectCard = ({ project }: { project: any }) => {
  const [stats, setStats] = useState<ItemStats>({ likes: 0, dislikes: 0, views: 0 });
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  useEffect(() => {
    setStats(getStats('projects', project.id));
    setStats(incrementStat('projects', project.id, 'views'));
  }, [project.id]);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (!hasLiked && !hasDisliked) { setStats(incrementStat('projects', project.id, 'likes')); setHasLiked(true); }
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (!hasLiked && !hasDisliked) { setStats(incrementStat('projects', project.id, 'dislikes')); setHasDisliked(true); }
  };

  return (
    <Card hoverEffect className={styles.recentProjectCard}>
      <a href={project.demo} target="_blank" rel="noreferrer" className={styles.cardLinkWrapper}>
        <img src={project.image} alt={project.title} className={styles.projectImage} />
        <div className={styles.projectContent}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
      </a>
      <div className={styles.projectFooter}>
        <div className={styles.techTags}>
          {project.tags?.slice(0, 3).map(tag => (
            <span key={tag} className={styles.techBadge}>{tag}</span>
          ))}
        </div>
        <div className={styles.projectStats}>
          <button className={`${styles.statBtn} ${hasLiked ? styles.activeLike : ''}`} onClick={handleLike} disabled={hasLiked || hasDisliked}>
            <ThumbsUp size={14} /> {stats.likes}
          </button>
          <button className={`${styles.statBtn} ${hasDisliked ? styles.activeDislike : ''}`} onClick={handleDislike} disabled={hasLiked || hasDisliked}>
            <ThumbsDown size={14} />
          </button>
          <span className={styles.statView}><Eye size={14} /> {stats.views}</span>
        </div>
      </div>
    </Card>
  );
};

// Mini-component for Home Blog Card
const HomeBlogCard = ({ post }: { post: any }) => {
  const [stats, setStats] = useState<ItemStats>({ likes: 0, dislikes: 0, views: 0 });
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  useEffect(() => {
    setStats(getStats('blogs', post.id));
    setStats(incrementStat('blogs', post.id, 'views'));
  }, [post.id]);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!hasLiked && !hasDisliked) { setStats(incrementStat('blogs', post.id, 'likes')); setHasLiked(true); }
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!hasLiked && !hasDisliked) { setStats(incrementStat('blogs', post.id, 'dislikes')); setHasDisliked(true); }
  };

  return (
    <Card hoverEffect className={styles.recentBlogCard}>
      <div className={styles.blogCategory}>{post.category}</div>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <div className={styles.blogMeta}>
        <span className={styles.metaItem}><Calendar size={14} /> {post.date}</span>
      </div>
      <div className={styles.blogFooter}>
        <Link to="/blog" className={styles.readMoreBtn}>
          Read <ArrowRight size={14} />
        </Link>
        <div className={styles.blogStats}>
          <button className={`${styles.statBtn} ${hasLiked ? styles.activeLike : ''}`} onClick={handleLike} disabled={hasLiked || hasDisliked}>
            <ThumbsUp size={14} /> {stats.likes}
          </button>
          <button className={`${styles.statBtn} ${hasDisliked ? styles.activeDislike : ''}`} onClick={handleDislike} disabled={hasLiked || hasDisliked}>
            <ThumbsDown size={14} />
          </button>
          <span className={styles.statView}><Eye size={14} /> {stats.views}</span>
        </div>
      </div>
    </Card>
  );
};

const Home: React.FC = () => {
  const [timeGreeting, setTimeGreeting] = useState('Hello');
  const [projects, setProjects] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeGreeting('Good Morning');
    else if (hour < 18) setTimeGreeting('Good Afternoon');
    else setTimeGreeting('Good Evening');

    const fetchFeatured = async () => {
      setLoading(true);
      try {
        const { data: projectsData } = await supabase
          .from('projects')
          .select('*')
          .limit(3)
          .order('id', { ascending: false });
        
        const { data: blogsData } = await supabase
          .from('blogs')
          .select('*')
          .limit(3)
          .order('id', { ascending: false });

        setProjects(projectsData || []);
        setPosts(blogsData || []);
      } catch (err) {
        console.error('Error fetching featured content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div className={styles.homeWrapper}>
      <Helmet>
        <title>Sandeep Gaire | Full-Stack Developer & Designer</title>
        <meta name="description" content="Welcome to my official portfolio. I am a full-stack developer focused on creating premium digital experiences." />
      </Helmet>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <Hero3D />
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroGrid}>
            
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`${styles.glassPanel} glass`}
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={styles.greetingBadge}
              >
                <span className={styles.pulseDot}></span>
                {timeGreeting}! Welcome to my portfolio.
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className={`text-gradient ${styles.name}`}
              >
                Sandeep Gaire
              </motion.h1>
              
              <div className={styles.titleWrapper}>
                <h3 className={styles.title}>
                  <TypingText text="IT Student & Full-Stack Developer" />
                </h3>
              </div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className={styles.description}
              >
                I specialize in building scalable digital experiences that are beautiful, functional, and user-focused. 
                Currently exploring advanced React patterns, 3D web experiences, and scalable backend systems.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.5 }}
                className={styles.ctaGroup}
              >
                <Link to="/contact">
                  <Button variant="neon-cyan">Hire Me <ArrowRight size={18} style={{ marginLeft: 8 }} /></Button>
                </Link>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary">Download CV <Download size={18} style={{ marginLeft: 8 }} /></Button>
                </a>
              </motion.div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className={styles.imageContainer}
            >
              <div className={styles.imageWrapper}>
                <div className={styles.imageGlow}></div>
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Sandeep Gaire - Full Stack Developer Profile" 
                  className={styles.profilePic} 
                  loading="eager"
                  width="320"
                  height="420"
                />
                
                {/* Floating Badges */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className={`${styles.floatingBadge} ${styles.badgeReact} glass`}
                >
                  <Code size={20} color="#0ea5e9" />
                  <span>React / Next.js</span>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 15, 0] }} 
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                  className={`${styles.floatingBadge} ${styles.badgeDesign} glass`}
                >
                  <Palette size={20} color="#db2777" />
                  <span>UI/UX Design</span>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className={styles.quickInfoSection}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.servicesGrid}
          >
            <Card hoverEffect className={styles.serviceCard}>
              <div className={styles.serviceIconWrapper} style={{ color: '#0ea5e9', background: 'rgba(14, 165, 233, 0.1)' }}>
                <Code size={32} />
              </div>
              <h3>Web Development</h3>
              <p>Custom, scalable websites using modern frameworks like React, Vite, and Node.js with a focus on performance.</p>
            </Card>

            <Card hoverEffect className={styles.serviceCard}>
              <div className={styles.serviceIconWrapper} style={{ color: '#db2777', background: 'rgba(219, 39, 119, 0.1)' }}>
                <Palette size={32} />
              </div>
              <h3>UI/UX Design</h3>
              <p>User-centered designs with modern aesthetics, glassmorphism, and intuitive navigation that users love.</p>
            </Card>

            <Card hoverEffect className={styles.serviceCard}>
              <div className={styles.serviceIconWrapper} style={{ color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.1)' }}>
                <Zap size={32} />
              </div>
              <h3>Fast & Optimized</h3>
              <p>Implementing best SEO practices, lazy loading, and micro-animations to ensure a blazing fast experience.</p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Latest Projects Section */}
      <section className={styles.recentSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className="text-gradient">Featured Projects</h2>
            <Link to="/projects" className={styles.viewAllLink}>
              View All <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className={styles.projectsGrid}>
            {loading ? (
              [1, 2, 3].map(i => <div key={i} className={styles.skeletonCard}></div>)
            ) : projects.length === 0 ? (
              <p className={styles.emptyMsg}>No projects to show yet.</p>
            ) : (
              projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <HomeProjectCard project={project} />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className={styles.recentSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className="text-gradient">Latest Articles</h2>
            <Link to="/blog" className={styles.viewAllLink}>
              Read More <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className={styles.blogGrid}>
            {loading ? (
              [1, 2, 3].map(i => <div key={i} className={styles.skeletonCard}></div>)
            ) : posts.length === 0 ? (
              <p className={styles.emptyMsg}>No articles to show yet.</p>
            ) : (
              posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <HomeBlogCard post={post} />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
