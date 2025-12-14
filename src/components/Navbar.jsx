import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const navLinks = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'blog', label: 'Blog', isPage: true }, // New Link
        { id: 'contact', label: 'Contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Update active section based on scroll position
            const sections = navLinks.filter(link => !link.isPage).map(link => link.id); // Filter out page links
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (link) => {
        setIsMobileMenuOpen(false);

        if (link.isPage) {
            window.location.href = `/${link.id}`;
            return;
        }

        // If we really are on the home page (pathname is '/' or empty)
        if (window.location.pathname === '/' || window.location.pathname === '') {
            const element = document.getElementById(link.id);
            if (element) {
                const headerOffset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                setActiveSection(link.id);
            }
        } else {
            // Navigate to home page with hash
            window.location.href = `/#${link.id}`;
            // We rely on the hash to scroll after load, but basic anchor behavior might need help 
            // if we want smooth scroll after page load. 
            // For now standard behavior is fine.
        }
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                <a href="/" className="navbar-logo gradient-text">
                    Sandeep Gaire
                </a>

                <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                    {navLinks.map(link => (
                        <button
                            key={link.id}
                            className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                            onClick={() => handleNavClick(link)}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>

                <div className="navbar-actions">
                    <ThemeToggle />
                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
