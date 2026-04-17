import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';
import Card from '../components/ui/Card';
import styles from './About.module.css';

const timelineData = [
  {
    id: 1,
    type: 'work',
    title: 'Senior Full-Stack Developer',
    organization: 'Tech Innovations Inc.',
    date: '2021 - Present',
    description: 'Lead developer for enterprise web applications using React, Node.js, and PostgreSQL. Architected scalable solutions and mentored junior developers.',
  },
  {
    id: 2,
    type: 'work',
    title: 'UI/UX Designer & Frontend Dev',
    organization: 'Creative Digital Agency',
    date: '2019 - 2021',
    description: 'Designed and implemented responsive interfaces for over 20 client projects. Focused on user-centered design principles and modern web standards.',
  },
  {
    id: 3,
    type: 'education',
    title: 'Bachelor of Computer Science',
    organization: 'Tribhuvan University',
    date: '2015 - 2019',
    description: 'Graduated with honors. Specialized in software engineering and web technologies.',
  }
];

const About: React.FC = () => {
  return (
    <div className={styles.aboutContainer}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.header}
        >
          <h2 className="text-gradient">About Me</h2>
          <p className={styles.subtitle}>My background, experience, and educational journey.</p>
        </motion.div>

        <div className={styles.contentGrid}>
          {/* Summary Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className={styles.summaryCard}>
              <h3 className={styles.cardTitle}>Professional Summary</h3>
              <p className={styles.text}>
                I'm a passionate developer and designer based in Nepal with over 5 years of experience creating digital solutions for businesses worldwide. My journey started with a computer science degree and has evolved through working with startups, agencies, and freelance clients.
              </p>
              <p className={styles.text}>
                I believe in clean, efficient code and intuitive design that puts users first. Every project is an opportunity to solve problems creatively and deliver value to both businesses and their customers. My goal is to bridge the gap between design and engineering.
              </p>
              
              <div className={styles.statsGrid}>
                <div className={styles.statBox}>
                  <h4 className="neon-cyan-text">5+</h4>
                  <span>Years Experience</span>
                </div>
                <div className={styles.statBox}>
                  <h4 className="neon-pink-text">50+</h4>
                  <span>Projects Completed</span>
                </div>
                <div className={styles.statBox}>
                  <h4 className="text-gradient">30+</h4>
                  <span>Happy Clients</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Timeline Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3 className={styles.sectionTitle}>Experience & Education</h3>
            <div className={styles.timeline}>
              {timelineData.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  className={styles.timelineItem}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className={styles.timelineIcon}>
                    {item.type === 'work' ? <Briefcase size={20} /> : <GraduationCap size={20} />}
                  </div>
                  <Card hoverEffect className={styles.timelineCard}>
                    <div className={styles.timelineHeader}>
                      <h4>{item.title}</h4>
                      <span className={styles.date}>
                        <Calendar size={14} /> {item.date}
                      </span>
                    </div>
                    <h5 className={styles.organization}>{item.organization}</h5>
                    <p className={styles.description}>{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
