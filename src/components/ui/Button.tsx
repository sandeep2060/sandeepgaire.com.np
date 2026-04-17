import React, { type ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'neon-cyan' | 'neon-pink';
  isFullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isFullWidth = false, 
  className = '', 
  ...props 
}) => {
  return (
    <button 
      className={`${styles.btn} ${styles[variant]} ${isFullWidth ? styles.fullWidth : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
