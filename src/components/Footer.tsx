import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ padding: '2rem 0', textAlign: 'center', marginTop: '4rem', color: 'var(--text-secondary)' }}>
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Sandeep Gaire. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
