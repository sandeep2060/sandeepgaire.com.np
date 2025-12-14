import { useState, useEffect } from 'react';
import sandeepImg from '../assets/sandeep.jpeg'; // Importing the user's image
import './Hero.css';

const Hero = () => {
    const [typedText, setTypedText] = useState('');
    const roles = ['Web Designer', 'Web Developer', 'Content Creator', 'Tech Educator'];
    const [roleIndex, setRoleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentRole = roles[roleIndex];
        const typingSpeed = isDeleting ? 50 : 100;

        const timer = setTimeout(() => {
            if (!isDeleting && typedText === currentRole) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && typedText === '') {
                setIsDeleting(false);
                setRoleIndex((prev) => (prev + 1) % roles.length);
            } else {
                setTypedText(
                    isDeleting
                        ? currentRole.substring(0, typedText.length - 1)
                        : currentRole.substring(0, typedText.length + 1)
                );
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [typedText, isDeleting, roleIndex]);

    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (

        <section id="home" className="hero">

            <div className="hero-background">
                <div className="gradient-shape shape-1"></div>
                <div className="gradient-shape shape-2"></div>
            </div>

            <div className="container hero-container">
                <div className="hero-content">
                    <br></br><br></br>
                    <div className="hero-greeting fade-in-down">
                        <span className="greeting-badge">👋 {getGreeting()}</span>
                    </div>

                    <h1 className="hero-name fade-in-up">
                        Hi, I'm <span className="gradient-text">Sandeep Gaire</span>
                        <br />
                        <span className="hero-title-subtitle"> Its me IT aspirant who loves to learn <span className="highlight"> new technology </span> </span>
                    </h1>

                    <div className="hero-role">
                        <span className="role-prefix">Expert in </span>
                        <span className="typed-text">{typedText}</span>
                        <span className="cursor">|</span>
                    </div>



                    <div className="hero-cta fade-in-up">
                        <button className="btn btn-primary" onClick={scrollToContact}>
                            Hire Me
                        </button>
                        <button className="btn btn-outline" onClick={scrollToProjects}>
                            See Portfolio
                        </button>
                    </div>

                    <div className="social-proof fade-in-up">
                        <div className="proof-item">
                            <strong>50+</strong> Projects
                        </div>
                        <div className="proof-item">
                            <strong>6+</strong> Years
                        </div>
                        <div className="proof-item">
                            <strong>100+</strong> Clients
                        </div>
                    </div>
                </div>

                <div className="hero-image-container">
                    <div className="hero-image-wrapper">
                        <div className="hero-image-card">
                            <img src={sandeepImg} alt="Sandeep Gaire" className="profile-image" />

                            {/* Floating Badges */}
                            <div className="floating-badge badge-1 glass">
                                <span className="badge-icon">💻</span>
                                <div className="badge-text">
                                    <strong>Web Developer</strong>
                                    <span>Frontend & Backend</span>
                                </div>
                            </div>

                            <div className="floating-badge badge-2 glass">
                                <span className="badge-icon">✨</span>
                                <div className="badge-text">
                                    <strong>UI/UX Design</strong>
                                    <span>Creative Solutions</span>
                                </div>
                            </div>
                        </div>
                        <div className="hero-image-bg"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Hero;
