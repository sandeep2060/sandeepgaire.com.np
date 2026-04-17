import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, ThumbsUp, ThumbsDown, Eye } from 'lucide-react';
import { getStats, incrementStat, type ItemStats } from '../lib/statsManager';
import { supabase } from '../lib/supabase';

const GithubIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.5-1.4 6.5-7a4.6 4.6 0 0 0-1.39-3.23 4.2 4.2 0 0 0-.14-3.19s-1.14-.36-3.7 1.37a13.3 13.3 0 0 0-7 0C6.27 1.73 5.13 2.1 5.13 2.1a4.2 4.2 0 0 0-.14 3.19 4.6 4.6 0 0 0-1.39 3.23c0 5.6 3.36 6.65 6.5 7a4.8 4.8 0 0 0-1 3.02v4"></path><path d="M9 20c-5 1.5-5-2.5-7-3"></path></svg>
);
import styles from './Projects.module.css';

const TiltCard = ({ project }: { project: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [stats, setStats] = useState<ItemStats>({ likes: 0, dislikes: 0, views: 0 });
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  useEffect(() => {
    // Load initial stats
    const initialStats = getStats('projects', project.id);
    setStats(initialStats);
    
    // Increment view on load (simplistic view tracking)
    const newStats = incrementStat('projects', project.id, 'views');
    setStats(newStats);
  }, [project.id]);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating if clicking a link
    e.stopPropagation();
    if (!hasLiked && !hasDisliked) {
      const newStats = incrementStat('projects', project.id, 'likes');
      setStats(newStats);
      setHasLiked(true);
    }
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!hasLiked && !hasDisliked) {
      const newStats = incrementStat('projects', project.id, 'dislikes');
      setStats(newStats);
      setHasDisliked(true);
    }
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      className={styles.projectCardContainer}
    >
      <div className={`${styles.projectCard} glass`}>
        <a href={project.demo} target="_blank" rel="noreferrer" className={styles.cardLinkWrapper}>
          <div className={styles.imageWrapper}>
            <img src={project.image} alt={project.title} className={styles.projectImage} />
            <div className={styles.imageOverlay}>
              <div className={styles.links}>
                <div className={styles.iconLink}>
                  <ExternalLink size={20} />
                </div>
                {/* Wrap the github link in an object or span with onClick stopPropagation */}
                <span className={styles.iconLink} onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.github, '_blank'); }}>
                  <GithubIcon size={20} />
                </span>
              </div>
            </div>
          </div>
          
          <div className={styles.projectContent}>
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <p className={styles.projectDescription}>{project.description}</p>
          </div>
        </a>
        
        <div className={styles.projectFooter}>
          <div className={styles.techStack}>
            {project.tech && Array.isArray(project.tech) && project.tech.map((tech: string) => (
              <span key={tech} className={styles.techBadge}>{tech}</span>
            ))}
          </div>
          
          <div className={styles.projectStats}>
            <button 
              className={`${styles.statBtn} ${hasLiked ? styles.activeLike : ''}`} 
              onClick={handleLike}
              disabled={hasLiked || hasDisliked}
            >
              <ThumbsUp size={16} /> {stats.likes}
            </button>
            <button 
              className={`${styles.statBtn} ${hasDisliked ? styles.activeDislike : ''}`} 
              onClick={handleDislike}
              disabled={hasLiked || hasDisliked}
            >
              <ThumbsDown size={16} />
            </button>
            <span className={styles.stat}><Eye size={16} /> {stats.views}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('id', { ascending: false });
        
        if (error) throw error;
        setProjects(data || []);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className={styles.projectsContainer}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.header}
        >
          <h2 className="text-gradient">Featured Projects</h2>
          <p className={styles.subtitle}>Some of my recent work.</p>
        </motion.div>

        {loading ? (
          <div className={styles.loaderWrapper}>
            <div className="loader"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>No projects found</h3>
            <p>Check back later or add some in the admin panel.</p>
          </div>
        ) : (
          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <TiltCard project={project} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
