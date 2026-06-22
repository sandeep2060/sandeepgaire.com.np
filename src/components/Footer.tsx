import { profile } from "../data/profile";
import "./Footer.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <div>
            <p className="footer__name">{profile.name}</p>
            <p className="footer__tagline">{profile.title}</p>
          </div>
          <nav className="footer__nav" aria-label="Footer">
            <a href="#home">Home</a>
            <a href="#projects">Work</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
        <div className="footer__bottom">
          <p>&copy; {year} {profile.name}</p>
          <p className="footer__built">Designed & built by <a href="https:sandeepgaire.com.np">Sandeep Gaire</a></p>
        </div>
      </div>
    </footer>
  );
}
