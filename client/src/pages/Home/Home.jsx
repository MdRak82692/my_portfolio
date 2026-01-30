import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import './Home.css';


const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <Hero />
      <section className="professional-journey section-spacing">
        <div className="container text-center fade-in">
          <header className="section-header mb-4">
            <h2 className="text-gradient">Professional Journey</h2>
            <p className="subtitle">Explore my expertise across different vertical areas</p>
          </header>
          
          <div className="journey-grid">
            <Link to="/projects" className="journey-card card">
              <div className="journey-icon">
                <i className="fas fa-folder-open"></i>
              </div>
              <h3>Featured Work</h3>
              <p>Explore my latest Flutter and web projects</p>
              <span className="btn-text">View Projects <i className="fas fa-arrow-right"></i></span>
            </Link>

            <Link to="/skills" className="journey-card card">
              <div className="journey-icon">
                <i className="fas fa-laptop-code"></i>
              </div>
              <h3>My Skills</h3>
              <p>Technical expertise and toolset breakdown</p>
              <span className="btn-text">See Expertise <i className="fas fa-arrow-right"></i></span>
            </Link>

            <Link to="/experience" className="journey-card card">
              <div className="journey-icon">
                <i className="fas fa-briefcase"></i>
              </div>
              <h3>Career History</h3>
              <p>Professional timeline and key milestones</p>
              <span className="btn-text">Experience <i className="fas fa-arrow-right"></i></span>
            </Link>

            <Link to="/contact" className="journey-card card highlight">
              <div className="journey-icon">
                <i className="fas fa-paper-plane"></i>
              </div>
              <h3>Hire Me</h3>
              <p>Available for freelance and full-time roles</p>
              <span className="btn-text">Get In Touch <i className="fas fa-arrow-right"></i></span>
            </Link>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
