import experienceData from '../data/experience';
import './Experience.css';

const Experience = () => {
    return (
        <section id="experience" className="section experience">
            <div className="container">
                <div className="section-title">
                    <span className="section-subtitle">My Journey</span>
                    <h2>Work Experience & Education</h2>
                </div>

                <div className="experience-container">
                    {experienceData.map((item, index) => (
                        <div key={item.id} className="experience-card">
                            <div className="experience-period">
                                {item.period}
                            </div>
                            <div className="experience-content">
                                <h3 className="experience-title">{item.title}</h3>
                                <h4 className="experience-org">{item.organization}</h4>
                                <p className="experience-desc">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
