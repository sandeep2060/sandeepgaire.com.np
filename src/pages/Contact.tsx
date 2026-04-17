import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone } from 'lucide-react';

const GithubIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.5-1.4 6.5-7a4.6 4.6 0 0 0-1.39-3.23 4.2 4.2 0 0 0-.14-3.19s-1.14-.36-3.7 1.37a13.3 13.3 0 0 0-7 0C6.27 1.73 5.13 2.1 5.13 2.1a4.2 4.2 0 0 0-.14 3.19 4.6 4.6 0 0 0-1.39 3.23c0 5.6 3.36 6.65 6.5 7a4.8 4.8 0 0 0-1 3.02v4"></path><path d="M9 20c-5 1.5-5-2.5-7-3"></path></svg>
);

const LinkedinIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const TwitterIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to Supabase
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div className={styles.contactContainer}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.header}
        >
          <h2 className="text-gradient">Get In Touch</h2>
          <p className={styles.subtitle}>Let's discuss your project and create something amazing together.</p>
        </motion.div>

        <div className={styles.contactGrid}>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className={styles.infoCard}>
              <h3 className={styles.cardTitle}>Contact Information</h3>
              <p className={styles.cardDesc}>
                I'm currently available for freelance projects and full-time opportunities. Feel free to reach out!
              </p>
              
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <div className={styles.iconBox}><MapPin size={20} /></div>
                  <div>
                    <h4>Location</h4>
                    <p>Butwal, Nepal</p>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.iconBox}><Mail size={20} /></div>
                  <div>
                    <h4>Email</h4>
                    <p>contact@sandeepgaire.com.np</p>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.iconBox}><Phone size={20} /></div>
                  <div>
                    <h4>Phone</h4>
                    <p>+977 9861639050</p>
                  </div>
                </div>
              </div>
              
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialIcon}><GithubIcon size={20} /></a>
                <a href="#" className={styles.socialIcon}><LinkedinIcon size={20} /></a>
                <a href="#" className={styles.socialIcon}><TwitterIcon size={20} /></a>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className={styles.formCard}>
              <h3 className={styles.cardTitle}>Send a Message</h3>
              
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                    placeholder="John Doe"
                  />
                </div>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="message">Your Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    required 
                    placeholder="Hello, I'd like to talk about..."
                    rows={5}
                  ></textarea>
                </div>
                
                <Button 
                  type="submit" 
                  variant="primary" 
                  isFullWidth 
                  disabled={isSubmitting}
                  className={styles.submitBtn}
                >
                  {isSubmitting ? 'Sending...' : (
                    <>Send Message <Send size={18} /></>
                  )}
                </Button>
                
                {submitStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className={styles.successMessage}
                  >
                    Your message has been sent successfully!
                  </motion.div>
                )}
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
