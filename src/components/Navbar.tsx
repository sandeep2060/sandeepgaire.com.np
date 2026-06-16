import { useEffect, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import {
  HiHome,
  HiUser,
  HiSparkles,
  HiBriefcase,
  HiCheckCircle,
  HiMail,
} from "react-icons/hi";
import { profile } from "../data/profile";
import "./Navbar.css";

const links = [
  { href: "#home", label: "Home", icon: HiHome },
  { href: "#about", label: "About", icon: HiUser },
  { href: "#skills", label: "Skills", icon: HiSparkles },
  { href: "#experience", label: "Experience", icon: HiBriefcase },
  { href: "#projects", label: "Projects", icon: HiCheckCircle },
  { href: "#contact", label: "Contact", icon: HiMail },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links.map((l) => document.querySelector(l.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s!));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const firstName = profile.name.split(" ")[0];

  return (
    <>
      <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <a href="#home" className="navbar__brand" onClick={() => setMenuOpen(false)}>
          <span className="navbar__brand-mark">S</span>
          <span>{firstName}</span>
        </a>

        <nav className="navbar__links" aria-label="Main navigation">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`navbar__link ${active === link.href ? "navbar__link--active" : ""}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn-primary navbar__cta">
          Contact
        </a>

        <button
          className="navbar__toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
      </div>

      {menuOpen && (
          <div className="navbar__mobile">
            {links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                className={`navbar__mobile-link ${active === link.href ? "navbar__mobile-link--active" : ""}`}
                onClick={() => setMenuOpen(false)}
                style={{ transitionDelay: `${i * 0.03}s` }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn btn-primary navbar__mobile-cta"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        )}
    </header>

    {/* Mobile Bottom Navigation */}
    <nav className="navbar__bottom" aria-label="Mobile navigation">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.href}
            href={link.href}
            className={`navbar__bottom-item ${active === link.href ? "navbar__bottom-item--active" : ""}`}
          >
            <Icon size={24} />
            <span className="navbar__bottom-label">{link.label}</span>
          </a>
        );
      })}
    </nav>
    </>
  );
}
