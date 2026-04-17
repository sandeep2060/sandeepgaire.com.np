import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Wrench } from 'lucide-react';
import Card from '../components/ui/Card';
import styles from './Skills.module.css';

const skillsData = [
  {
    category: 'Frontend Development',
    icon: <Layout size={24} />,
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Three.js / WebGL', level: 60 },
    ]
  },
  {
    category: 'Backend Development',
    icon: <Server size={24} />,
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express', level: 80 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'Supabase / Firebase', level: 85 },
      { name: 'GraphQL', level: 70 },
    ]
  },
  {
    category: 'Tools & Others',
    icon: <Wrench size={24} />,
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'Figma (UI/UX)', level: 85 },
      { name: 'Docker', level: 65 },
      { name: 'SEO Optimization', level: 80 },
      { name: 'Jest / Testing', level: 70 },
    ]
  }
];

const SkillBar = ({ name, level, index }: { name: string, level: number, index: number }) => {
  return (
    <div className={styles.skillItem}>
      <div className={styles.skillHeader}>
        <span className={styles.skillName}>{name}</span>
        <span className={styles.skillLevel}>{level}%</span>
      </div>
      <div className={styles.progressBarBg}>
        <motion.div 
          className={styles.progressBarFill}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 * index, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  return (
    <div className={styles.skillsContainer}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.header}
        >
          <h2 className="text-gradient">My Skills</h2>
          <p className={styles.subtitle}>Technologies and tools I work with.</p>
        </motion.div>

        <div className={styles.skillsGrid}>
          {skillsData.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.2, duration: 0.5 }}
            >
              <Card hoverEffect className={styles.categoryCard}>
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryIcon}>
                    {category.icon}
                  </div>
                  <h3>{category.category}</h3>
                </div>
                
                <div className={styles.skillsList}>
                  {category.skills.map((skill, index) => (
                    <SkillBar 
                      key={skill.name} 
                      name={skill.name} 
                      level={skill.level} 
                      index={index} 
                    />
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
