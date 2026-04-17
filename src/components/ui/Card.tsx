import React, { HTMLAttributes } from 'react';
import styles from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'solid';
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'glass', 
  hoverEffect = false,
  className = '',
  ...props 
}) => {
  return (
    <div 
      className={`${styles.card} ${variant === 'glass' ? 'glass' : styles.solid} ${hoverEffect ? styles.hoverEffect : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
