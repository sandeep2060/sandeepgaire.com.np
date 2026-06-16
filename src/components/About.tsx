import { HiLocationMarker, HiCode, HiColorSwatch, HiAcademicCap, HiBriefcase } from "react-icons/hi";
import { profile } from "../data/profile";
import { useCountUp } from "../hooks/useCountUp";
import { ScrollReveal } from "./ScrollReveal";
import "./About.css";

const serviceIcons: Record<string, typeof HiCode> = {
  code: HiCode,
  design: HiColorSwatch,
  mobile: HiAcademicCap,
  api: HiBriefcase,
};

function StatCard({ value, label }: { value: string; label: string }) {
  const { ref, display } = useCountUp(value);
  return (
    <div className="about__stat">
      <span className="about__stat-value" ref={ref}>{display}</span>
      <span className="about__stat-label">{label}</span>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <p className="section-eyebrow">01 - About</p>
            <h2 className="section-title">
              Building for the web with care and <span className="accent-word">craft</span>
            </h2>
            <p className="section-subtitle">
              {profile.title} based in {profile.location}. I focus on clarity, performance, and interfaces that feel intentional.
            </p>
          </div>
        </ScrollReveal>

        <div className="about__grid">
          <ScrollReveal className="about__bio" delay={0.08}>
            {profile.bio.split("\n\n").map((paragraph) => (
              <p key={paragraph.slice(0, 30)}>{paragraph}</p>
            ))}
            <p className="about__location">
              <HiLocationMarker size={16} />
              {profile.location}
            </p>
          </ScrollReveal>

          <ScrollReveal className="about__stats-grid" delay={0.12}>
            {profile.stats.map((stat) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </ScrollReveal>
        </div>

        <div className="about__services">
          {profile.services.map((service, i) => {
            const Icon = serviceIcons[service.icon] ?? HiCode;
            return (
              <ScrollReveal key={service.title} delay={0.06 * i}>
                <article className="about__service card">
                  <span className="about__service-num">0{i + 1}</span>
                  <Icon size={20} className="about__service-icon" />
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
