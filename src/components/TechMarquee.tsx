import { profile } from "../data/profile";
import "./TechMarquee.css";

const techs = [...new Set(profile.skills.map((s) => s.name))];

export function TechMarquee() {
  const items = [...techs, ...techs];

  return (
    <section className="marquee-section" aria-label="Technologies">
      <div className="marquee-track">
        <div className="marquee-track__inner">
          {items.map((tech, i) => (
            <span key={`${tech}-${i}`} className="marquee-item">{tech}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
