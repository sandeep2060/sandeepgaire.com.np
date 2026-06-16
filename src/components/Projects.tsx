import { useState } from "react";
import { HiArrowUpRight } from "react-icons/hi2";
import { FaGithub } from "react-icons/fa";
import { profile } from "../data/profile";
import { ScrollReveal } from "./ScrollReveal";
import "./Projects.css";

type Filter = "all" | "featured";

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered =
    filter === "featured" ? profile.projects.filter((p) => p.featured) : profile.projects;

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <ScrollReveal>
          <div className="projects__header">
            <div className="section-header">
              <p className="section-eyebrow">My Work</p>
              <h2 className="section-title">Explore My Professional Projects</h2>
              <p className="section-subtitle">
                Real applications built and deployed - click any project to view it live.
              </p>
            </div>
            <div className="projects__filters">
              {(["all", "featured"] as const).map((f) => (
                <button
                  key={f}
                  className={`projects__filter ${filter === f ? "projects__filter--on" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f === "all" ? "All" : "Featured"}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="projects__grid">
          {filtered.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 0.06}>
              <article className="projects__card card">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="projects__image-link"
                >
                  <img src={project.image} alt="" loading="lazy" width={800} height={500} />
                  <span className="projects__view">
                    View live <HiArrowUpRight size={12} />
                  </span>
                </a>
                <div className="projects__body">
                  <div className="projects__top">
                    <h3>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        {project.title}
                      </a>
                    </h3>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="projects__gh"
                      aria-label="GitHub"
                    >
                      <FaGithub size={16} />
                    </a>
                  </div>
                  <p>{project.description}</p>
                  <ul className="projects__tags">
                    {project.tags.map((tag) => (
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
