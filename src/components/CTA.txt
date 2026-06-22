import { HiArrowRight } from "react-icons/hi";
import { ScrollReveal } from "./ScrollReveal";
import "./CTASection.css";

export function CTASection() {
  return (
    <section className="cta section">
      <div className="container">
        <ScrollReveal>
          <div className="cta__inner">
            <div className="cta__content">
              <p className="section-eyebrow">Let's collaborate</p>
              <h2 className="cta__title">
                Have a project in mind?
              </h2>
              <p className="cta__text">
                I'm available for freelance web development - business sites, web apps,
                and custom digital products. Tell me what you need and we'll figure out the right approach.
              </p>
            </div>
            <div className="cta__action">
              <a href="#contact" className="btn btn-primary cta__btn">
                Discuss your project
                <HiArrowRight size={18} />
              </a>
              <p className="cta__note">Usually responds within 24 hours</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
