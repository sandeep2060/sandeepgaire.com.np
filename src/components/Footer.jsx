import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <h2 className="footer-logo gradient-text">Sandeep Gaire</h2>
                        <p className="footer-bio">
                            Building digital experiences with passion and precision.
                            Let's create something amazing together.
                        </p>
                    </div>

                    <div className="footer-nav">
                        <div className="footer-col">
                            <h4>Navigation</h4>
                            <ul>
                                <li><a href="#home">Home</a></li>
                                <li><a href="#about">About</a></li>
                                <li><a href="#projects">Portfolio</a></li>
                                <li><a href="#contact">Contact</a></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Resources</h4>
                            <ul>
                                <li><a href="#">BCA Notes</a></li>
                                <li><a href="#">Tutorials</a></li>
                                <li><a href="#">Snippets</a></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Social</h4>
                            <ul>
                                <li><a href="#">LinkedIn</a></li>
                                <li><a href="#">GitHub</a></li>
                                <li><a href="#">YouTube</a></li>
                                <li><a href="#">Instagram</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} Sandeep Gaire. All rights reserved.</p>
                    <p className="footer-credit"></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
