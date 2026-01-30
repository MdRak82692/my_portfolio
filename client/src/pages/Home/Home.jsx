import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import './Home.css';


const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <Hero />
      <div className="container py-5 text-center fade-in">
        <h2 className="text-gradient">Professional Journey</h2>
        <p className="mb-4">Explore my expertise across different vertical areas</p>
        <div className="flex justify-center flex-wrap gap-2">
            <Link to="/projects" className="btn btn-primary">Featured Work</Link>
            <Link to="/skills" className="btn btn-secondary">My Skills</Link>
            <Link to="/experience" className="btn btn-secondary">Career History</Link>
            <Link to="/contact" className="btn btn-primary">Hire Me</Link>
        </div>
      </div>
      <footer className="footer">
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
