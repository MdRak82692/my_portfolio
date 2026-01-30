import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo">
            <span className="logo-text">Portfolio</span>
          </Link>

          <button 
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
            <a href="/home" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="/projects" onClick={() => setMenuOpen(false)}>Projects</a>
            <a href="/skills" onClick={() => setMenuOpen(false)}>Skills</a>
            <a href="/experience" onClick={() => setMenuOpen(false)}>Experience</a>
            <a href="/contact" onClick={() => setMenuOpen(false)}>Contact</a>
            {isAuthenticated ? (
              <Link to="/admin/dashboard" className="btn btn-primary btn-sm">
                Dashboard
              </Link>
            ) : (
              <Link to="/admin" className="btn btn-primary btn-sm">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
