import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import NoticeModal from './components/ui/NoticeModal';

function AppContent() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app-wrapper">
      {!isAdminRoute && <Navbar theme={theme} toggleTheme={toggleTheme} />}
      {!isAdminRoute && <NoticeModal />}
      <main>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/*" element={<AdminDashboard theme={theme} toggleTheme={toggleTheme} />} />
          </Routes>
        </main>
        {/* Hide footer on admin routes */}
        <Routes>
          <Route path="/admin/*" element={null} />
          <Route path="*" element={!isAdminRoute ? <Footer /> : null} />
        </Routes>
      </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
