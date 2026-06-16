import { ScrollReveal } from "./ScrollReveal";
import "./WhyWorkWithMe.css";

const reasons = [
  {
    num: "01",
    title: "Fast & reliable",
    description: "Sites optimized for speed - quick loads, smooth interactions, solid performance scores.",
  },
  {
    num: "02",
    title: "Thoughtful design",
    description: "Layouts and typography chosen with purpose. No clutter, no stock-template feel.",
  },
  {
    num: "03",
    title: "Works everywhere",
    description: "Mobile-first builds that look and function correctly on every screen size.",
  },
  {
    num: "04",
    title: "Clear communication",
    description: "You always know where the project stands. Deadlines met, expectations aligned.",
  },
];

export function WhyWorkWithMe() {
  return (
    <section className="why section">
      <div className="container">
        <ScrollReveal>
          <div className="section-header section-header--center">
            <p className="section-eyebrow">02 - Approach</p>
            <h2 className="section-title">How I work with clients</h2>
          </div>
        </ScrollReveal>

        <div className="why__list">
          {reasons.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.06}>
              <article className="why__row card">
                <span className="why__num">{item.num}</span>
                <div className="why__content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
