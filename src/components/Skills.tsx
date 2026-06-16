import { profile } from "../data/profile";
import { ScrollReveal } from "./ScrollReveal";
import "./Skills.css";

const categories = [...new Set(profile.skills.map((s) => s.category))];

export function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <p className="section-eyebrow">03 - Skills</p>
            <h2 className="section-title">Tools & technologies</h2>
            <p className="section-subtitle">
              The stack I reach for when building production-ready websites and applications.
            </p>
          </div>
        </ScrollReveal>

        <div className="skills__grid">
          {categories.map((category, ci) => (
            <ScrollReveal key={category} delay={ci * 0.08}>
              <div className="skills__group card">
                <h3 className="skills__group-title">{category}</h3>
                <ul className="skills__list">
                  {profile.skills
                    .filter((s) => s.category === category)
                    .map((skill, si) => (
                      <li key={skill.name} className="skills__item">
                        <div className="skills__item-top">
                          <span>{skill.name}</span>
                          <span className="skills__pct">{skill.level}%</span>
                        </div>
                        <div className="skills__bar">
                          <div
                            className="skills__bar-fill"
                            style={{ width: `${skill.level}%`, transitionDelay: `${si * 0.06}s` }}
                          />
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
