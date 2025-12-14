import { useState } from 'react';
import skillsData from '../data/skills';
import './Skills.css';

const Skills = () => {
    return (
        <section id="skills" className="section skills">
            <div className="container">
                <div className="section-title">
                    <span className="section-subtitle">My Expertise</span>
                    <h2>Skills & Experience</h2>
                </div>

                <div className="skills-wrapper">
                    {Object.entries(skillsData).map(([category, skills]) => (
                        <div key={category} className="skills-category-card">
                            <h3 className="category-title">
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </h3>
                            <div className="skills-list">
                                {skills.map((skill) => (
                                    <div key={skill.name} className="skill-item">
                                        <div className="skill-info">
                                            <span className="skill-icon">{skill.icon}</span>
                                            <span className="skill-name">{skill.name}</span>
                                        </div>
                                        <div className="skill-bar-container">
                                            <div className="skill-bar" style={{ width: `${skill.level}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
