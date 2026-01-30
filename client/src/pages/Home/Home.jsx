import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import Projects from '../../components/Projects/Projects';
import Skills from '../../components/Skills/Skills';
import Experience from '../../components/Experience/Experience';
import Contact from '../../components/Contact/Contact';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <footer className="footer">
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
