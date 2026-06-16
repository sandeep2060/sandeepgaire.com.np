import { profile } from "../data/profile";
import { ScrollReveal } from "./ScrollReveal";
import "./Experience.css";

export function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <p className="section-eyebrow">04 - Experience</p>
            <h2 className="section-title">Where I've been building</h2>
          </div>
        </ScrollReveal>

        <div className="experience__list">
          {profile.experience.map((job, i) => (
            <ScrollReveal key={job.company + job.role} delay={i * 0.08}>
              <article className="experience__row">
                <div className="experience__meta">
                  <span className="experience__period">{job.period}</span>
                </div>
                <div className="experience__body">
                  <h3 className="experience__role">{job.role}</h3>
                  <p className="experience__company">{job.company}</p>
                  <p className="experience__desc">{job.description}</p>
                  <ul className="experience__tags">
                    {job.highlights.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
