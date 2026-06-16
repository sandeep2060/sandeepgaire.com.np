import { type FormEvent, useState } from "react";
import { FaGithub, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { profile } from "../data/profile";
import { ScrollReveal } from "./ScrollReveal";
import "./Contact.css";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const subject = String(formData.get("subject") ?? "Website project inquiry");
    const message = String(formData.get("message") ?? "");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    const mailSubject = encodeURIComponent(subject);

    window.location.href = `mailto:${profile.email}?subject=${mailSubject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <p className="section-eyebrow">06 - Contact</p>
            <h2 className="section-title">Start a conversation</h2>
            <p className="section-subtitle">
              Share a bit about your project. I'll reply with thoughts on scope, timeline, and next steps.
            </p>
          </div>
        </ScrollReveal>

        <div className="contact__layout">
          <ScrollReveal className="contact__details" delay={0.08}>
            <dl className="contact__list">
              <div>
                <dt>Email</dt>
                <dd><a href={`mailto:${profile.email}`}>{profile.email}</a></dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd><a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a></dd>
              </div>
              <div>
                <dt>Based in</dt>
                <dd>{profile.location}</dd>
              </div>
            </dl>

            <div className="contact__socials">
              <a href={profile.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub size={18} />
              </a>
              <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn size={16} />
              </a>
              {profile.social.facebook && (
                <a href={profile.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FaFacebookF size={16} />
                </a>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <form className="contact__form card" onSubmit={handleSubmit}>
              <div className="contact__row">
                <label>
                  <span>Name</span>
                  <input type="text" name="name" required placeholder="Your name" />
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" name="email" required placeholder="you@email.com" />
                </label>
              </div>
              <label>
                <span>Subject</span>
                <input type="text" name="subject" required placeholder="Website, web app, redesign..." />
              </label>
              <label>
                <span>Message</span>
                <textarea name="message" required rows={5} placeholder="What are you looking to build?" />
              </label>
              <button type="submit" className="btn btn-primary">
                {submitted ? "Opening email..." : "Send message"}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
