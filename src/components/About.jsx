import './About.css';

const About = () => {
    return (
        <section id="about" className="section about">
            <div className="container">
                <div className="about-wrapper">
                    <div className="about-image-col">
                        <div className="about-stats-card">
                            <div className="stat-row">
                                <h3>6+</h3>
                                <p>Years Experience</p>
                            </div>
                            <div className="stat-separator"></div>
                            <div className="stat-row">
                                <h3>250+</h3>
                                <p>Projects Done</p>
                            </div>
                        </div>
                        {/* We could use another image here or a decorative element */}
                        <div className="about-decorative-box"></div>
                    </div>

                    <div className="about-content">
                        <span className="section-subtitle">About Me</span>
                        <h2 className="about-title">
                            I develop products that delight and inspire people.
                        </h2>
                        <p className="about-description">
                            Hello! I'm Sandeep Gaire, a passionate web designer and developer based in Nepal.
                            With over 6 years of experience, I specialize in creating meaningful digital experiences
                            that help businesses attract and engage their customers.
                        </p>
                        <p className="about-description">
                            I love learning new technologies and sharing my knowledge with students.
                            Through my various platforms, I help aspiring developers master the art of coding.
                        </p>

                        <div className="about-features">
                            <div className="feature-item">
                                <div className="feature-icon">🚀</div>
                                <div>
                                    <h4>Fast Performance</h4>
                                    <p>Optimized for speed and efficiency</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">📱</div>
                                <div>
                                    <h4>Responsive Design</h4>
                                    <p>Looks great on all devices</p>
                                </div>
                            </div>
                        </div>

                        <div className="about-actions">
                            <a href="#contact" className="btn btn-primary">Contact Me</a>
                            <a href="#portfolio" className="btn btn-outline">My Portfolio</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
