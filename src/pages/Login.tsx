import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import styles from './Login.module.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Mock Login
    setTimeout(() => {
      if (email === 'admin@sandeepgaire.com.np' && password === 'admin123') {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/admin');
      } else {
        setError('Invalid credentials. Use admin@sandeepgaire.com.np / admin123');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginWrapper}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card className={styles.loginCard}>
            <div className={styles.loginHeader}>
              <div className={styles.iconBox}>
                <Lock size={24} />
              </div>
              <h2 className="text-gradient">Admin Login</h2>
              <p>Sign in to access the dashboard</p>
            </div>

            <form onSubmit={handleLogin} className={styles.loginForm}>
              {error && <div className={styles.errorMessage}>{error}</div>}
              
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email Address</label>
                <div className={styles.inputWrapper}>
                  <Mail size={18} className={styles.inputIcon} />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password">Password</label>
                <div className={styles.inputWrapper}>
                  <Lock size={18} className={styles.inputIcon} />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                isFullWidth 
                disabled={isLoading}
                className={styles.submitBtn}
              >
                {isLoading ? 'Authenticating...' : (
                  <>Sign In <ArrowRight size={18} /></>
                )}
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
