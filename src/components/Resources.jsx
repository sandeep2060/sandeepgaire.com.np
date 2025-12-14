import './Resources.css';

const Resources = () => {
    const resources = [
        {
            id: 1,
            icon: '📚',
            title: 'BCA Notes',
            description: 'Comprehensive study materials and notes for BCA students covering all subjects.',
            link: '#',
            color: 'var(--gradient-primary)'
        },
        {
            id: 2,
            icon: '💻',
            title: 'Web Development Tutorials',
            description: 'Step-by-step tutorials on HTML, CSS, JavaScript, and modern web technologies.',
            link: '#',
            color: 'var(--gradient-secondary)'
        },
        {
            id: 3,
            icon: '🎓',
            title: 'Programming Guides',
            description: 'Learn programming fundamentals with easy-to-follow guides and examples.',
            link: '#',
            color: 'var(--gradient-accent)'
        },
        {
            id: 4,
            icon: '🎥',
            title: 'Video Tutorials',
            description: 'Watch technical videos, coding tutorials, and educational content on YouTube.',
            link: '#',
            color: 'var(--gradient-primary)'
        },
        {
            id: 5,
            icon: '📝',
            title: 'Important Essays',
            description: 'Collection of important essays for Class 12 board exam preparation.',
            link: '/essay.html',
            color: 'var(--gradient-secondary)'
        },
        {
            id: 6,
            icon: '🌐',
            title: 'Web Resources',
            description: 'Free web development resources, tools, and learning materials for students.',
            link: '#',
            color: 'var(--gradient-accent)'
        }
    ];

    return (
        <section id="resources" className="section resources">
            <div className="container">
                <div className="section-title">
                    <h2>Student Resources</h2>
                    <p className="section-subtitle">Free learning materials for students & developers</p>
                </div>

                <div className="resources-grid">
                    {resources.map((resource, index) => (
                        <a
                            key={resource.id}
                            href={resource.link}
                            className="resource-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="resource-icon" style={{ background: resource.color }}>
                                {resource.icon}
                            </div>
                            <h3>{resource.title}</h3>
                            <p>{resource.description}</p>
                            <span className="resource-arrow">→</span>
                        </a>
                    ))}
                </div>

                <div className="resources-cta">
                    <div className="cta-card glass">
                        <h3>📖 First Website in History</h3>
                        <p>Learn about the world's first website created by Tim Berners-Lee on August 6, 1991 at CERN.</p>
                        <a
                            href="http://info.cern.ch/hypertext/WWW/TheProject.html"
                            className="btn btn-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Browse the First Website
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Resources;
