import { useState, useEffect } from 'react';
import { getProjects, seedInitialData } from '../services/api'; // Updated import
import { projectCategories } from '../data/projects';
import LikeDislikeBtn from './LikeDislikeBtn';
import './Projects.css';

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            // Try to seed first
            await seedInitialData();
            const data = await getProjects();
            setProjects(data || []);
        };
        fetchProjects();
    }, []);

    const filteredProjects = activeFilter === 'All'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    return (
        <section id="projects" className="section projects">
            <div className="container">
                <div className="section-title">
                    <span className="section-subtitle">Portfolio</span>
                    <h2>My Recent Work</h2>
                </div>

                <div className="project-filters">
                    {projectCategories.map(category => (
                        <button
                            key={category}
                            className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                            onClick={() => setActiveFilter(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="projects-grid">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className="project-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="project-image-container">
                                {project.thumbnail ? (
                                    <img src={project.thumbnail} alt={project.title} className="project-thumbnail-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div className="project-image-placeholder">
                                        <span>🚀</span>
                                    </div>
                                )}
                            </div>

                            <div className="project-content">
                                <div className="project-header">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '8px' }}>
                                        <span className="project-category-tag">{project.category}</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            👁️ {Math.floor(Math.random() * 500) + 100}
                                        </span>
                                    </div>
                                    <h3 className="project-title">{project.title}</h3>
                                </div>
                                <p className="project-desc">{project.description}</p>

                                <div className="project-tech-stack">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="tech-tag">{tag}</span>
                                    ))}
                                </div>

                                <div className="project-footer">
                                    <div className="project-links">
                                        {project.liveUrl && (
                                            <a href={project.liveUrl} className="btn-link" target="_blank" rel="noopener noreferrer">
                                                <span>👁️ Live Demo</span>
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a href={project.githubUrl} className="btn-link" target="_blank" rel="noopener noreferrer">
                                                <span>💻 Code</span>
                                            </a>
                                        )}
                                    </div>
                                    <div className="project-interactions">
                                        <LikeDislikeBtn itemId={project.id} type="project" hideDislikeCount={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
