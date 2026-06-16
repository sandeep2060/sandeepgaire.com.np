import { useEffect, useState } from "react";
import { FaGithub, FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";
import { HiBriefcase, HiSearch } from "react-icons/hi";
import { profile } from "../data/profile";
import { PortraitFrame } from "./PortraitFrame";
import "./Hero.css";

const highlights = ["Web Development", "UI/UX Design", "React Apps", "Freelance Projects"];

const socials = [
  { href: profile.social.github, icon: FaGithub, label: "GitHub" },
  { href: profile.social.linkedin, icon: FaLinkedinIn, label: "LinkedIn" },
  ...(profile.social.facebook
    ? [{ href: profile.social.facebook, icon: FaFacebookF, label: "Facebook" }]
    : []),
  ...(profile.social.instagram
    ? [{ href: profile.social.instagram, icon: FaInstagram, label: "Instagram" }]
    : []),
];

interface HeroProps {
  introReady?: boolean;
}

export function Hero({ introReady = true }: HeroProps) {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((i) => (i + 1) % highlights.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero__blobs" aria-hidden>
        <span className="hero__blob hero__blob--1" />
        <span className="hero__blob hero__blob--2" />
        <span className="hero__blob hero__blob--3" />
      </div>

      <div className="container hero__layout">
        <div
          className="hero__content"
        >
          <h1 className="hero__headline">
            <span className="hero__headline-top">I Build</span>
            <span className="hero__headline-accent">
              <span key={highlights[wordIndex]}>{highlights[wordIndex]}</span>
            </span>
            <span className="hero__headline-bottom">For Your Every Need!</span>
          </h1>

          <p className="hero__desc">{profile.tagline}</p>

          <div className="hero__stats">
            <div>
              <strong>{profile.stats[1]?.value}</strong>
              <span>Live Projects</span>
            </div>
            <div>
              <strong>{profile.stats[2]?.value}</strong>
              <span>Years Coding</span>
            </div>
          </div>

          <div className="hero__actions">
            <a href="#projects" className="btn btn-primary">
              <HiSearch size={18} />
              View My Work
            </a>
            <a href="#contact" className="btn btn-outline">
              <HiBriefcase size={18} />
              Hire Me
            </a>
          </div>

          <div className="hero__proof">
            <div className="hero__avatars" aria-hidden>
              {["S", "A", "N", "D", "E", "E", "P"].map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
            <p>Trusted developer from <strong>{profile.location}</strong> - open for freelance work</p>
          </div>
        </div>

        <div
          className="hero__visual"
        >
          <PortraitFrame reveal={introReady} />
          
        </div>
      </div>

      <div className="hero__socials">
        {socials.map(({ href, icon: Icon, label }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
            <Icon size={17} />
          </a>
        ))}
      </div>
    </section>
  );
}
