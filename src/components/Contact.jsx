import { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });

            setTimeout(() => setSubmitStatus(null), 5000);
        }, 1500);
    };

    const contactInfo = [
        {
            icon: '📍 ',
            label: 'Location',
            value: 'Rupakot-7, Damuka, Gulmi',
            link: null
        },
        {
            icon: '📞',
            label: 'Phone',
            value: '+977 9861639050',
            link: 'tel:+9779861639050'
        },
        {
            icon: '📧',
            label: 'Email',
            value: 'sandeepgaire8@gmail.com',
            link: 'mailto:sandeepgaire8@gmail.com'
        },
        {
            icon: '🌐',
            label: 'Website',
            value: 'sandeepgaire.com.np',
            link: 'https://sandeepgaire.com.np'
        }
    ];

    const socialLinks = [
        { icon: '📘', name: 'Facebook', url: 'https://www.facebook.com/share/1HAjLZ4yM8/' },
        { icon: '📷', name: 'Instagram', url: 'https://www.instagram.com/7sandeep_gaire?igsh=Znh2eWp4YnNqNXF0' },
        { icon: '🎥', name: 'YouTube', url: '#' },
        { icon: '💼', name: 'LinkedIn', url: '#' },
        { icon: '📦', name: 'GitHub', url: '#' }
    ];

    return (
        <section id="contact" className="section contact">
            <div className="container">
                <div className="section-title">
                    <h2>Get In Touch</h2>
                    <p className="section-subtitle">Let's work together</p>
                </div>

                <div className="contact-content">
                    <div className="contact-info-section">
                        <h3>Contact Information</h3>
                        <p className="contact-intro">
                            Feel free to reach out for collaborations, questions, or just to say hello!
                        </p>

                        <div className="contact-info-list">
                            {contactInfo.map((info, index) => (
                                <div key={index} className="contact-info-item">
                                    <span className="contact-icon">{info.icon}</span>
                                    <div>
                                        <h4>{info.label}</h4>
                                        {info.link ? (
                                            <a href={info.link}>{info.value}</a>
                                        ) : (
                                            <p>{info.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="social-links">
                            <h4>Follow Me</h4>
                            <div className="social-icons">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        className="social-icon"
                                        title={social.name}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Your name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Subject *</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                placeholder="What's this about?"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message *</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                placeholder="Your message..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary submit-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>

                        {submitStatus === 'success' && (
                            <div className="submit-message success">
                                ✓ Message sent successfully! I'll get back to you soon.
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
